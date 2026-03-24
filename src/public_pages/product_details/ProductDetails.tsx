import { useState } from "react";
import { useParams } from "react-router-dom"; // URL parameters er jonno
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  CheckCircle2,
  Snowflake,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// API Hook
import { useGetProductBySlugQuery } from "@/redux/features/admin/products";

// Base URL for Images
const IMG_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { slug } = useParams(); // URL theke slug dhorchi
  console.log(slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // ১. API theke data fetch (skip logic soho)
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductBySlugQuery(slug as string);

  // ২. Loading State
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1F5E3B]" size={40} />
      </div>
    );
  }

  // ৩. Error State
  if (isError || !product) {
    return (
      <div className="text-center py-20 font-bold text-red-500 font-sans uppercase tracking-widest">
        Product Not Found!
      </div>
    );
  }

  // ৪. Dynamic Images setup
  const images =
    product?.images?.map((img: string) => `${IMG_URL}${img}`) || [];

  // Dummy Related Products (Eita pore api diye dynamic kora jabe)
  const relatedProducts = [
    {
      id: 1,
      name: "Premium Koshihikari Rice",
      desc: "Hokkaido Special Export • 2kg",
      price: "¥3,200",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400",
    },
    {
      id: 2,
      name: "Okinawa Artisan Sea Salt",
      desc: "Natural Minerals • 150g",
      price: "¥1,450",
      image:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
    },
    {
      id: 3,
      name: "Fresh Hon-Wasabi Root",
      desc: "Shizuoka Farmed • 80g",
      price: "¥2,100",
      image:
        "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?q=80&w=400",
    },
  ];

  return (
    <div className="md:mx-14 mx-4 py-10 font-sans">
      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
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

      {/* Breadcrumb - Dynamic */}
      <nav className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">
        Home &nbsp;›&nbsp; {product?.category?.title || "Category"}{" "}
        &nbsp;›&nbsp; <span className="text-[#1A2E1A]">{product?.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {/* Left Side: Product Images */}
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

        {/* Right Side: Product Info */}
        <div className="flex flex-col">
          <div className="flex gap-2 mb-4">
            <Badge
              variant="outline"
              className="text-[10px] font-bold text-[#1F5E3B] border-[#1F5E3B] uppercase px-3"
            >
              <CheckCircle2 size={12} className="mr-1" /> Certified Halal
            </Badge>
            {product?.bestSeller && (
              <Badge
                variant="outline"
                className="text-[10px] font-bold text-[#D97706] border-[#D97706] uppercase px-3"
              >
                Bestseller
              </Badge>
            )}
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
              {product?.ratings?.average || 0} ({product?.ratings?.count || 0}{" "}
              reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-black text-[#1F5E3B]">
              ¥{product?.price?.toLocaleString()}
            </span>
            {product?.discountPrice && (
              <span className="text-lg text-gray-400 line-through font-bold">
                ¥{product?.discountPrice?.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-8">
            {product?.stockQuantity} units available • {product?.stock}
          </p>

          <div className="space-y-6 mb-10">
            <h4 className="font-bold text-[#1A2E1A] text-sm uppercase">
              Product Description
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
              {product?.desc}
            </p>
          </div>

          {/* Action Buttons */}
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
            <Button className="flex-1 bg-[#1F5E3B] hover:bg-[#16432a] text-white rounded-2xl h-16 font-black text-lg gap-3 shadow-xl transition-all active:scale-95">
              <ShoppingCart size={22} /> Add to Cart
            </Button>
          </div>

          <div className="flex justify-between mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
              <Snowflake size={14} className="text-[#1F5E3B]" /> Free chilled
              shipping
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
              <CheckCircle2 size={14} className="text-[#1F5E3B]" /> Full
              Traceability
            </div>
          </div>
        </div>
      </div>

      {/* Related Section logic... (Slider code as before) */}
      <section className="relative">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-black text-[#1A2E1A]">
            Pairs perfectly with
          </h2>
          <div className="flex gap-3">
            <button
              id="prev-btn"
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F5E3B] hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              id="next-btn"
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F5E3B] hover:text-white transition-all shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{ prevEl: "#prev-btn", nextEl: "#next-btn" }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {relatedProducts.map((p) => (
            <SwiperSlide key={p.id}>
              {/* Card UI as before */}
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 mb-4 relative shadow-sm border border-gray-50">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <h4 className="font-bold text-[#1A2E1A] text-md">{p.name}</h4>
                <p className="text-lg font-black text-[#1A2E1A]">{p.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default ProductDetails;
