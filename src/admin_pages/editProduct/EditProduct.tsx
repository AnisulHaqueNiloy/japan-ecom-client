import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Package,
  Upload,
  Trash2,
  Image as ImageIcon,
  Save,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Swal from "sweetalert2"; // SweetAlert import
import { useGetCategoriesQuery } from "@/redux/features/admin/category";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "@/redux/features/admin/products";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    title: "",
    desc: "",
    price: "",
    discountPrice: "",
    category: "",
    subCategory: "",
    stockQuantity: "",
    stock: "available",
    bestSeller: false,
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const { data: product, isLoading: isProductLoading } =
    useGetProductDetailsQuery(id as string);
  const { data: categories } = useGetCategoriesQuery();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        desc: product.desc,
        price: product.price,
        discountPrice: product.discountPrice || "",
        category: product.category?._id || "",
        subCategory: product.subCategory?._id || "",
        stockQuantity: product.stockQuantity || "",
        stock: product.stock,
        bestSeller: product.bestSeller,
      });
      setExistingImages(product.images || []);
    }
  }, [product]);

  const filteredSubCategories = useMemo(() => {
    if (!formData.category || !categories) return [];
    const selectedCat = categories.find(
      (c: any) => c._id === formData.category,
    );
    return selectedCat ? selectedCat.subcategories : [];
  }, [formData.category, categories]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length + existingImages.length > 5) {
      return Swal.fire({
        icon: "error",
        title: "Limit Exceeded",
        text: "Maximum 5 images allowed!",
        confirmButtonColor: "#1F5E3B",
      });
    }
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeExistingImage = (imgUrl: string) => {
    setExistingImages(existingImages.filter((url) => url !== imgUrl));
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (existingImages.length === 0 && images.length === 0) {
  //     return Swal.fire({
  //       icon: "warning",
  //       title: "No Images",
  //       text: "Please provide at least one image",
  //       confirmButtonColor: "#1F5E3B",
  //     });
  //   }

  //   const data = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     data.append(key, value.toString());
  //   });
  //   data.append("existingImages", JSON.stringify(existingImages));
  //   images.forEach((file) => {
  //     data.append("images", file);
  //   });

  //   try {
  //     // Loading state dekhate chaile Swal.showLoading() use kora jay
  //     await updateProduct({ id: id as string, formData: data }).unwrap();

  //     Swal.fire({
  //       icon: "success",
  //       title: "Updated!",
  //       text: "Product updated successfully 🚀",
  //       confirmButtonColor: "#1F5E3B",
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });

  //     navigate("/admin/all-product");
  //   } catch (err: any) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: err?.data?.message || "Failed to update product",
  //       confirmButtonColor: "#d33",
  //     });
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (existingImages.length === 0 && images.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Images",
        text: "Please provide at least one image",
        confirmButtonColor: "#1F5E3B",
      });
    }

    const data = new FormData();

    // 🎯 FIXED: TypeScript error fix for 'value' is of type 'unknown'
    Object.entries(formData).forEach(([key, value]) => {
      // Template literal use korle automatic string conversion hoye jay
      if (value !== null && value !== undefined) {
        data.append(key, `${value}`);
      }
    });

    data.append("existingImages", JSON.stringify(existingImages));

    images.forEach((file) => {
      data.append("images", file);
    });

    try {
      await updateProduct({ id: id as string, formData: data }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Product updated successfully 🚀",
        confirmButtonColor: "#1F5E3B",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/admin/all-product");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.data?.message || "Failed to update product",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (isProductLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#1F5E3B]" size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Rest of the UI remains the same */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all text-gray-400"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-[#1A2E1A] tracking-tight">
              EDIT PRODUCT
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Update details for: {product?.title}
            </p>
          </div>
        </div>
        <div className="hidden lg:block p-4 bg-[#1F5E3B]/10 text-[#1F5E3B] rounded-2xl">
          <Package size={24} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] border border-gray-100 shadow-sm space-y-5">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                Product Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold text-gray-700"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                Description
              </label>
              <textarea
                rows={6}
                required
                value={formData.desc}
                className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold text-gray-700"
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                  Price
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                  Discount Price
                </label>
                <input
                  type="number"
                  value={formData.discountPrice}
                  className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, discountPrice: e.target.value })
                  }
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-[#1A2E1A] mb-6 flex items-center gap-2">
              <ImageIcon size={20} className="text-[#1F5E3B]" /> PRODUCT GALLERY
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {existingImages.map((src, index) => (
                <div
                  key={`old-${index}`}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}${src}`}
                    className="w-full h-full object-cover"
                    alt="Server"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(src)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[8px] text-white text-center py-1 font-bold">
                    SAVED
                  </div>
                </div>
              ))}
              {previews.map((src, index) => (
                <div
                  key={`new-${index}`}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-[#1F5E3B]/20 group shadow-md"
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt="New"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-gray-800 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-[#1F5E3B]/80 text-[8px] text-white text-center py-1 font-bold uppercase">
                    New Upload
                  </div>
                </div>
              ))}
              {images.length + existingImages.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition-all group">
                  <Upload
                    className="text-gray-300 group-hover:text-[#1F5E3B] mb-1"
                    size={20}
                  />
                  <span className="text-[9px] font-black text-gray-400 group-hover:text-[#1F5E3B]">
                    ADD MORE
                  </span>
                  <input
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase mb-2 block">
                Category
              </label>
              <select
                required
                value={formData.category}
                className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Choose Main Category</option>
                {categories?.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name || cat.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase mb-2 block">
                Sub-Category
              </label>
              <select
                value={formData.subCategory}
                disabled={!formData.category}
                className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold text-sm disabled:opacity-50"
                onChange={(e) =>
                  setFormData({ ...formData, subCategory: e.target.value })
                }
              >
                <option value="">Select Sub-Category</option>
                {filteredSubCategories?.map((sub: any) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name || sub.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-4 border-t border-gray-50">
              <label className="text-xs font-black text-gray-400 uppercase mb-3 block text-center">
                Stock Availability
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["available", "out of stock"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, stock: s })}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all ${formData.stock === s ? "bg-[#1F5E3B] text-white" : "bg-gray-50 text-gray-400"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase mb-2 block">
                Stock Quantity
              </label>
              <input
                type="number"
                required
                value={formData.stockQuantity}
                className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold"
                onChange={(e) =>
                  setFormData({ ...formData, stockQuantity: e.target.value })
                }
              />
            </div>
            <label className="flex items-center gap-3 p-4 bg-yellow-50/50 rounded-2xl cursor-pointer border border-yellow-100">
              <input
                type="checkbox"
                checked={formData.bestSeller}
                className="w-5 h-5 rounded text-[#1F5E3B] focus:ring-[#1F5E3B] border-none shadow-sm"
                onChange={(e) =>
                  setFormData({ ...formData, bestSeller: e.target.checked })
                }
              />
              <span className="text-xs font-black text-yellow-700 uppercase italic">
                Best Seller Badge
              </span>
            </label>
          </section>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-[#1F5E3B] text-white py-6 rounded-[32px] font-black text-lg hover:shadow-2xl hover:shadow-green-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:bg-gray-200"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={20} />
            )}
            {isUpdating ? "UPDATING..." : "SAVE CHANGES"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
