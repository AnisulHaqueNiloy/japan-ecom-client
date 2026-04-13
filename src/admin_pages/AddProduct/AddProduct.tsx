import React, { useState, useMemo } from "react";
import {
  Package,
  Upload,
  Trash2,
  Image as ImageIcon,
  Plus,
} from "lucide-react";

import { toast } from "react-hot-toast";
import { useGetCategoriesQuery } from "@/redux/features/admin/category";
import { useCreateProductMutation } from "@/redux/features/admin/products";

const AddProduct = () => {
  // 1. Initial State Definition
  const initialState = {
    title: "",
    desc: "",
    price: "",
    discountPrice: "",
    category: "",
    subCategory: "",
    stockQuantity: "",
    stock: "available",
    bestSeller: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { data: categories } = useGetCategoriesQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  // 🎯 Auto Filter Sub-Categories based on Category selection
  const filteredSubCategories = useMemo(() => {
    if (!formData.category || !categories) return [];
    const selectedCat = categories.find(
      (c: any) => c._id === formData.category,
    );
    return selectedCat ? selectedCat.subcategories : [];
  }, [formData.category, categories]);

  // Handle Multiple Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 5) {
      return toast.error("Maximum 5 images allowed");
    }

    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove Image and Revoke URL to save memory
  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      return toast.error("Please upload at least one image");
    }

    const data = new FormData();
    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });

    // Append image files
    images.forEach((file) => {
      data.append("images", file);
    });

    try {
      await createProduct(data).unwrap();
      toast.success("Product published successfully!");

      // ✅ Form Reset Logic
      setFormData(initialState);
      setImages([]);
      // Revoke all preview URLs before clearing
      previews.forEach((url) => URL.revokeObjectURL(url));
      setPreviews([]);

      // Reset the file input manually if needed
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="p-4 lg:p-8 notranslate">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-[#1F5E3B] text-white rounded-3xl shadow-xl shadow-green-100">
          <Package size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#1A2E1A] tracking-tight">
            ADD NEW PRODUCT
          </h1>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
            Marketplace Inventory Management
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Product Info & Gallery */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-5">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                Product Title
              </label>
              <input
                type="text"
                required
                value={formData.title} // Controlled input
                placeholder="Ex: Fresh Norwegian Salmon"
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
                value={formData.desc} // Controlled input
                placeholder="Describe the product features, quality, and details..."
                className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold text-gray-700"
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                  Price (Base)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price} // Controlled input
                  placeholder="0.00"
                  className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                  Discount Price (Optional)
                </label>
                <input
                  type="number"
                  value={formData.discountPrice} // Controlled input
                  placeholder="0.00"
                  className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, discountPrice: e.target.value })
                  }
                />
              </div>
            </div>
          </section>

          {/* Image Upload Gallery */}
          <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-[#1A2E1A] mb-6 flex items-center gap-2">
              <ImageIcon size={20} className="text-[#1F5E3B]" /> PRODUCT GALLERY
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm"
                >
                  <img
                    src={src}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {images.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 hover:border-[#1F5E3B] transition-all group">
                  <Upload className="text-gray-300 group-hover:text-[#1F5E3B] mb-2" />
                  <span className="text-[10px] font-black text-gray-400 group-hover:text-[#1F5E3B]">
                    ADD IMAGE
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

        {/* Right Column: Category, Stock & Submit */}
        <div className="space-y-6">
          <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                Category
              </label>
              <select
                required
                value={formData.category} // Controlled select
                className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold text-sm appearance-none cursor-pointer"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Choose Main Category</option>
                {categories?.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                Sub-Category
              </label>
              <select
                value={formData.subCategory} // Controlled select
                className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold text-sm appearance-none cursor-pointer disabled:opacity-50"
                disabled={!formData.category}
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

            <hr className="border-gray-50" />

            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                Stock Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, stock: "available" })
                  }
                  className={`py-3 rounded-xl text-xs font-black transition-all ${
                    formData.stock === "available"
                      ? "bg-[#1F5E3B] text-white"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  AVAILABLE
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, stock: "out of stock" })
                  }
                  className={`py-3 rounded-xl text-xs font-black transition-all ${
                    formData.stock === "out of stock"
                      ? "bg-red-500 text-white"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  OUT OF STOCK
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-2 mb-2 block">
                Stock Quantity
              </label>
              <input
                type="number"
                value={formData.stockQuantity} // Controlled input
                placeholder="Ex: 50"
                className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold"
                onChange={(e) =>
                  setFormData({ ...formData, stockQuantity: e.target.value })
                }
              />
            </div>

            <label className="flex items-center gap-3 p-4 bg-yellow-50/50 rounded-2xl cursor-pointer border border-yellow-100">
              <input
                type="checkbox"
                checked={formData.bestSeller} // Controlled checkbox
                className="w-5 h-5 rounded text-[#1F5E3B] focus:ring-[#1F5E3B] border-none bg-white shadow-sm"
                onChange={(e) =>
                  setFormData({ ...formData, bestSeller: e.target.checked })
                }
              />
              <span className="text-xs font-black text-yellow-700 uppercase">
                Mark as Best Seller
              </span>
            </label>
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1F5E3B] text-white py-6 rounded-[32px] font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="animate-pulse">PUBLISHING...</span>
            ) : (
              <>
                <Plus size={20} /> PUBLISH PRODUCT
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
