import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle2,
  X,
  Loader2,
  Send,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import Swal from "sweetalert2";

// API Hooks
import {
  useCreateReviewMutation,
  useGetProductBySlugQuery,
} from "@/redux/features/admin/products";
import { useGetMeQuery } from "@/redux/features/authApi";

const IMG_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Review States
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const { data: user } = useGetMeQuery(undefined);
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductBySlugQuery(slug as string);
  const [createReview, { isLoading: isReviewSubmitting }] =
    useCreateReviewMutation();

  const isAdmin = user?.role === "ADMIN";
  const isLoggedIn = !!user;

  // Helper logic for rating breakdown bars
  const getStarPercentage = (starLevel: number) => {
    if (!product?.reviews?.length) return 0;
    const count = product.reviews.filter(
      (r: any) => Math.round(r.rating) === starLevel,
    ).length;
    return (count / product.reviews.length) * 100;
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1F5E3B]" size={40} />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20 font-bold text-red-500 font-sans uppercase tracking-widest">
        Product Not Found!
      </div>
    );
  }

  const images =
    product?.images?.map((img: string) => `${IMG_URL}${img}`) || [];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.title,
        price: product.price,
        qty: quantity,
        img: images[0],
        desc: product?.desc,
        slug: product.slug,
      }),
    );

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Added to cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return Swal.fire("Error", "Please write a comment", "error");

    try {
      await createReview({
        id: product._id,
        rating,
        comment,
      }).unwrap();

      Swal.fire("Success", "Review added successfully!", "success");
      setComment("");
      setRating(5);
      refetch();
    } catch (err: any) {
      Swal.fire("Error", err?.data?.message || "Failed to add review", "error");
    }
  };

  return (
    <div className="md:mx-14 mx-4 py-10 font-sans">
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform">
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={images[selectedImage]}
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">
        Home &nbsp;›&nbsp; {product?.category?.title || "Category"}{" "}
        &nbsp;›&nbsp; <span className="text-[#1A2E1A]">{product?.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div className="space-y-4">
          <div
            className="aspect-square rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          >
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={images[selectedImage]}
              alt={product?.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                  i === selectedImage
                    ? "border-[#1F5E3B] scale-95"
                    : "border-transparent opacity-60"
                }`}
              >
                <img
                  src={img}
                  alt="Thumb"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 mb-4">
            <Badge
              variant="outline"
              className="text-[10px] font-bold text-[#1F5E3B] border-[#1F5E3B] uppercase px-3"
            >
              <CheckCircle2 size={12} className="mr-1" /> Certified Halal
            </Badge>
          </div>

          <h1 className="text-4xl font-black text-[#1A2E1A] leading-tight mb-2 uppercase">
            {product?.title}
          </h1>

          <div className="flex items-center gap-2 mb-6 text-[#FACC15]">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  fill={
                    s <= (product?.ratings?.average || 0)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-800">
              {product?.ratings?.average?.toFixed(1) || 0} (
              {product?.ratings?.count || 0} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-black text-[#1F5E3B]">
              ¥{product?.price?.toLocaleString()}
            </span>
          </div>

          <div className="space-y-6 mb-10">
            <h4 className="font-bold text-[#1A2E1A] text-sm uppercase">
              Product Description
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line font-sans">
              {product?.desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-6 py-2 gap-6 min-w-[140px]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="hover:text-[#1F5E3B]"
              >
                <Minus size={18} />
              </button>
              <span className="font-black text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="hover:text-[#1F5E3B]"
              >
                <Plus size={18} />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={isAdmin}
              className={`flex-1 rounded-2xl h-16 font-black text-lg gap-3 shadow-xl transition-all ${
                isAdmin
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#1F5E3B] hover:bg-[#16432a] text-white active:scale-95"
              }`}
            >
              <ShoppingCart size={22} />{" "}
              {isAdmin ? "Admin View Only" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>

      {/* --- IMPROVED REVIEW SECTION --- */}
      <section className="mt-20 border-t border-gray-100 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Summary & Form (Left 5 Columns) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-3xl font-black text-[#1A2E1A] mb-4 flex items-center gap-3">
                Ratings & Reviews{" "}
                <MessageSquare className="text-[#1F5E3B]" size={24} />
              </h2>

              {/* Rating Breakdown Card */}
              <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-black text-[#1A2E1A]">
                      {product?.ratings?.average?.toFixed(1) || 0}
                    </div>
                    <div className="flex text-[#FACC15] justify-center my-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          fill={
                            s <= Math.round(product?.ratings?.average || 0)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Product Rating
                    </p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-gray-500 w-3">
                          {star}
                        </span>
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${getStarPercentage(star)}%`,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-[#1F5E3B]"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 w-6">
                          {Math.round(getStarPercentage(star))}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {isLoggedIn && !isAdmin ? (
                  <form
                    onSubmit={handleReviewSubmit}
                    className="space-y-4 pt-6 border-t border-gray-200"
                  >
                    <div>
                      <label className="text-[10px] font-black uppercase text-gray-400 mb-3 block tracking-widest">
                        Rate this product
                      </label>
                      <div className="flex gap-2 text-[#FACC15]">
                        {[1, 2, 3, 4, 5].map((index) => {
                          const starValue = index;
                          return (
                            <button
                              type="button"
                              key={index}
                              onClick={() => setRating(starValue)}
                              onMouseEnter={() => setHover(starValue)}
                              onMouseLeave={() => setHover(0)}
                              className="transition-transform hover:scale-125 focus:outline-none"
                            >
                              <Star
                                size={28}
                                fill={
                                  (hover || rating) >= starValue
                                    ? "currentColor"
                                    : "none"
                                }
                                className="transition-colors duration-200"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="relative">
                      <Textarea
                        placeholder="Share your experience with this product..."
                        className="rounded-2xl border-none bg-white min-h-[120px] p-4 text-sm shadow-inner focus-visible:ring-1 focus-visible:ring-[#1F5E3B]"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isReviewSubmitting}
                      className="w-full bg-[#1A2E1A] hover:bg-black text-white rounded-xl h-14 font-bold gap-3 transition-all"
                    >
                      {isReviewSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Submit Feedback <Send size={18} />
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="bg-[#1F5E3B]/5 p-4 rounded-2xl text-center border border-[#1F5E3B]/10">
                    <p className="text-xs font-bold text-[#1F5E3B]">
                      {isAdmin
                        ? "Admins are not permitted to review."
                        : "Login to share your thoughts."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Review List (Right 7 Columns) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-[#1A2E1A] uppercase tracking-tighter">
                Verified Reviews
              </h3>
              <Badge className="bg-gray-100 text-gray-600 border-none hover:bg-gray-100 px-4">
                {product?.reviews?.length || 0} Total
              </Badge>
            </div>

            <div className="space-y-6">
              {product?.reviews?.length > 0 ? (
                product.reviews.map((rev: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white border border-gray-100 p-6 rounded-[2rem] hover:shadow-xl hover:shadow-gray-100 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#1F5E3B]/10 flex items-center justify-center text-[#1F5E3B] font-black uppercase text-sm">
                          {rev.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-[#1A2E1A] text-sm">
                              {rev.name}
                            </h5>
                            <Badge className="bg-blue-50 text-blue-600 text-[8px] font-black h-4 px-1 border-none">
                              Verified
                            </Badge>
                          </div>
                          <div className="flex text-[#FACC15] mt-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={10}
                                fill={s <= rev.rating ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-300">
                        {new Date(
                          rev.createdAt || Date.now(),
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                    <div className="mt-4 flex items-center gap-4 border-t border-gray-50 pt-4">
                      <button className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-[#1F5E3B] transition-colors">
                        <ThumbsUp size={12} /> Helpful
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="text-gray-300" size={30} />
                  </div>
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                    No reviews yet. Start the conversation!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
