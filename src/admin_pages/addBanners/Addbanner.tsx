import { useState } from "react";
import {
  useAddBannerMutation,
  useGetBannersQuery,
  useDeleteBannerMutation,
} from "@/redux/features/admin/bannerApi";
import Swal from "sweetalert2";
import { Loader2, Plus, X, Trash2, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

const IMG_URL = import.meta.env.VITE_API_URL;

const AddBanner = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("");

  // RTK Query hooks
  const { data: bannersResponse, isLoading: isFetching } =
    useGetBannersQuery(undefined);
  const [addBanner, { isLoading: isAdding }] = useAddBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const banners = bannersResponse?.data || [];

  // File Selection & Preview Logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setFileType("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !file) {
      return Swal.fire({
        title: "Missing Info!",
        text: "Title and Image/Video are required.",
        icon: "warning",
        confirmButtonColor: "#1F5E3B",
      });
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("image", file);

    try {
      await addBanner(formData).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Banner added successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setTitle("");
      setSubtitle("");
      handleRemoveFile();
    } catch (err: any) {
      Swal.fire("Error", err?.data?.message || "Failed to add banner", "error");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This banner will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1F5E3B",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBanner(id).unwrap();
        Swal.fire("Deleted!", "Banner has been removed.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete banner", "error");
      }
    }
  };

  return (
    <div className="space-y-10 notranslate">
      {/* --- ADD BANNER FORM --- */}
      <div className=" bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#F1F5F1] p-3 rounded-2xl text-[#1F5E3B]">
            <Plus size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#1A2E1A]">
              ADD NEW BANNER
            </h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
              Image, JFIF or Video
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-1">
              Banner Title*
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="w-full px-5 py-4 rounded-2xl bg-[#F8FAF8] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1F5E3B]/20 transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-1">
              Subtitle
            </label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter details..."
              rows={2}
              className="w-full px-5 py-4 rounded-2xl bg-[#F8FAF8] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1F5E3B]/20 transition-all font-medium resize-none"
            />
          </div>

          {/* Upload Area with Video Support */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-1">
              Media (Image/Video)*
            </label>
            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-3xl bg-[#F8FAF8] cursor-pointer hover:bg-[#F1F5F1] transition-colors group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Film className="w-10 h-10 text-gray-400 group-hover:scale-110 transition-transform mb-2" />
                  <p className="text-sm text-gray-500 font-bold">
                    Click to upload
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    Images or MP4 (Max 100MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="relative w-full h-64 rounded-3xl overflow-hidden border border-gray-100 shadow-inner">
                {fileType.startsWith("video/") ? (
                  <video
                    src={preview}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-lg"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isAdding}
            className="w-full bg-[#1F5E3B] hover:bg-[#16432a] text-white rounded-2xl h-14 text-lg font-bold shadow-lg shadow-green-100"
          >
            {isAdding ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Add Banner Slide"
            )}
          </Button>
        </form>
      </div>

      <hr className="border-gray-100" />

      {/* --- BANNER LIST SECTION --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-[#1A2E1A] uppercase tracking-tight">
            Active Banners
          </h3>
          <span className="bg-[#1F5E3B] text-white text-[10px] font-bold px-3 py-1 rounded-full">
            Total: {banners.length}
          </span>
        </div>

        {isFetching ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-[#1F5E3B]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((item: any) => (
              <div
                key={item._id}
                className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm group"
              >
                <div className="h-48 relative overflow-hidden">
                  {item.image.match(/\.(mp4|webm|mov)$/i) ? (
                    <video
                      src={`${IMG_URL}${item.image}`}
                      className="w-full h-full object-cover"
                      muted
                    />
                  ) : (
                    <img
                      src={`${IMG_URL}${item.image}`}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md text-red-500 rounded-2xl shadow-xl hover:bg-red-500 hover:text-white transition-all transform hover:rotate-12"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="p-6">
                  <h4 className="font-black text-[#1A2E1A] text-sm uppercase line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium mt-1 line-clamp-2">
                    {item.subtitle || "No subtitle provided"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBanner;
