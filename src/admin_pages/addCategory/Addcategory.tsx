import { useState } from "react";
const IMG_URL = import.meta.env.VITE_API_URL;
import { Plus, Layers, Image as ImageIcon, Trash2 } from "lucide-react";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/features/admin/category";
import { toast } from "react-hot-toast";

const AddCategory = () => {
  // Category State
  const [catName, setCatName] = useState("");
  const [catImage, setCatImage] = useState<File | null>(null);

  // Sub-Category State
  const [subName, setSubName] = useState("");
  const [selectedCatId, setSelectedCatId] = useState("");
  const [subImage, setSubImage] = useState<File | null>(null); // Sub-category image state

  const { data: categories } = useGetCategoriesQuery();
  console.log(categories);
  const [createCategory, { isLoading: isCatCreating }] =
    useCreateCategoryMutation();
  const [createSubCategory, { isLoading: isSubCreating }] =
    useCreateSubCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCategorySubmit = async (e: any) => {
    e.preventDefault();
    if (!catName || !catImage) return toast.error("Please fill all fields");

    const formData = new FormData();
    formData.append("name", catName);
    formData.append("image", catImage);

    try {
      await createCategory(formData).unwrap();
      toast.success("Category Created!");
      setCatName("");
      setCatImage(null);
    } catch (err) {
      toast.error("Failed to create category");
    }
  };

  const handleSubSubmit = async (e: any) => {
    e.preventDefault();
    if (!subName || !selectedCatId)
      return toast.error("Select Category & Name");

    const formData = new FormData();
    formData.append("name", subName);
    formData.append("category", selectedCatId);
    if (subImage) formData.append("image", subImage); // Image append kora holo

    try {
      await createSubCategory(formData).unwrap();
      toast.success("Sub-category Added!");
      setSubName("");
      setSubImage(null); // Reset image
    } catch (err) {
      toast.error("Failed to create sub-category");
    }
  };

  return (
    <div className="space-y-8 notranslate">
      {/* Header Area */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-[#1F5E3B] text-white rounded-2xl shadow-lg shadow-green-100">
          <Layers size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#1A2E1A]">
            CATEGORY SETTINGS
          </h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            Manage your shop hierarchy
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Add Category Form --- */}
        <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-[#1A2E1A] mb-6 flex items-center gap-2">
            <Plus size={20} className="text-[#1F5E3B]" /> Add Main Category
          </h3>
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-1">
                Category Title
              </label>
              <input
                type="text"
                placeholder="Ex: Fresh Meat"
                className="w-full mt-1 px-5 py-3.5 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold text-sm"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-1">
                Icon/Image
              </label>
              <div className="mt-1 flex items-center gap-4 p-4 bg-[#F8FAF8] rounded-2xl border-2 border-dashed border-gray-200">
                <ImageIcon className="text-gray-300" />
                <input
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0] || null;
                    setCatImage(file);
                  }}
                  className="text-xs font-bold"
                />
              </div>
            </div>
            <button
              disabled={isCatCreating}
              className="w-full bg-[#1F5E3B] text-white py-4 rounded-2xl font-black text-sm hover:opacity-90 shadow-lg shadow-green-100 uppercase tracking-tighter"
            >
              {isCatCreating ? "Creating..." : "Save Category"}
            </button>
          </form>
        </section>

        {/* --- Add Sub-Category Form --- */}
        <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-[#1A2E1A] mb-6 flex items-center gap-2">
            <Plus size={20} className="text-[#1F5E3B]" /> Add Sub-Category
          </h3>
          <form onSubmit={handleSubSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-1">
                Parent Category
              </label>
              <div className="relative">
                <select
                  className="w-full mt-1 px-5 py-3.5 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] text-[#1A2E1A] font-bold text-sm appearance-none cursor-pointer"
                  onChange={(e) => setSelectedCatId(e.target.value)}
                  value={selectedCatId}
                >
                  <option value="" className="text-gray-400">
                    Choose Category
                  </option>
                  {categories?.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                      className="text-black bg-white"
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-1">
                Sub-Category Title
              </label>
              <input
                type="text"
                placeholder="Ex: Chicken"
                className="w-full mt-1 px-5 py-3.5 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold text-sm"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
              />
            </div>
            {/* Sub-Category Image Input added here */}
            <div>
              <label className="text-xs font-black text-gray-400 uppercase ml-1">
                Sub-Category Icon
              </label>
              <div className="mt-1 flex items-center gap-4 p-4 bg-[#F8FAF8] rounded-2xl border-2 border-dashed border-gray-200">
                <ImageIcon className="text-gray-300" />
                <input
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0] || null;
                    setSubImage(file);
                  }}
                  className="text-xs font-bold"
                />
              </div>
            </div>
            <button
              disabled={isSubCreating}
              className="w-full bg-[#1F5E3B] text-white py-4 rounded-2xl font-black text-sm hover:opacity-90 shadow-lg shadow-green-100 uppercase tracking-tighter"
            >
              {isSubCreating ? "Saving..." : "Save Sub-Category"}
            </button>
          </form>
        </section>
      </div>

      {/* --- Visual List View --- */}
      <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-[#1A2E1A] mb-8 uppercase tracking-tight">
          Active Hierarchy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((cat) => (
            <div
              key={cat._id}
              className="group p-6 bg-[#F8FAF8] rounded-[24px] border border-transparent hover:border-green-100 hover:bg-white transition-all duration-300 relative"
            >
              <button
                onClick={() => deleteCategory(cat._id)}
                className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white rounded-2xl p-1 shadow-sm border border-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={`${IMG_URL}${cat.image}`}
                    className="w-full h-full object-contain rounded-xl"
                    alt={cat.name}
                  />
                </div>
                <h4 className="font-black text-[#1A2E1A] uppercase text-sm tracking-tight">
                  {cat.name}
                </h4>
              </div>

              {/* Subcategories list with images */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {cat.subcategories?.map((sub) => (
                  <div
                    key={sub._id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-gray-100 shadow-sm"
                  >
                    {sub.image && (
                      <img
                        src={`${IMG_URL}${sub?.image}`}
                        className="w-4 h-4 object-contain rounded-sm"
                        alt=""
                      />
                    )}
                    <span className="text-[11px] font-black text-[#1F5E3B] uppercase tracking-wider">
                      {sub.name}
                    </span>
                  </div>
                ))}
                {cat.subcategories?.length === 0 && (
                  <p className="text-[10px] text-gray-300 font-bold italic uppercase">
                    No sub-categories yet
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AddCategory;
