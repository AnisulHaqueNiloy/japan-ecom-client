import React, { useEffect, useState } from "react";
import {
  Megaphone,
  Save,
  Loader2,
  Sparkles,
  LayoutDashboard,
  Eye,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  useGetOfferQuery,
  useUpdateOfferMutation,
} from "@/redux/features/admin/offer";

const Addoffer = () => {
  const [text, setText] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { data: offerData, isLoading: isFetching } = useGetOfferQuery({});
  const [updateOffer, { isLoading: isUpdating }] = useUpdateOfferMutation();

  useEffect(() => {
    if (offerData) {
      setText(offerData.text || "");
      setIsActive(offerData.isActive ?? true);
    }
  }, [offerData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      return toast.error("Announcement text is required!");
    }
    try {
      await updateOffer({ text, isActive }).unwrap();
      toast.success("Offer updated successfully! 🚀");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update offer");
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-[#1F5E3B]"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 notranslate">
      {/* --- Header Section --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-8 lg:mb-10">
        <div className="p-4 sm:p-5 bg-[#1F5E3B] text-white rounded-[20px] sm:rounded-[24px] shadow-2xl shadow-green-100 rotate-3 hover:rotate-0 transition-transform duration-300">
          <Megaphone className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1A2E1A] tracking-tight uppercase">
            Marketing Banner
          </h1>
          <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-2 mt-1">
            <Sparkles size={14} className="text-yellow-500" /> Marketplace
            Announcements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* --- Left Column: Form Settings --- */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <section className="bg-white p-5 sm:p-8 rounded-[30px] sm:rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="text-[10px] sm:text-xs font-black text-gray-400 uppercase ml-1 mb-3 block tracking-widest">
                Announcement Message
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ex: Get 20% Discount on all Nordic Seafood! Limited time only..."
                className="w-full px-5 sm:px-8 py-4 sm:py-6 bg-[#F8FAF8] border-none rounded-[20px] sm:rounded-[32px] focus:ring-2 focus:ring-[#1F5E3B] font-bold text-gray-700 min-h-[150px] sm:min-h-[180px] transition-all placeholder:text-gray-300 text-sm sm:text-base"
              />
            </div>

            <div className="flex items-center justify-between p-4 sm:p-6 bg-green-50/50 rounded-[20px] sm:rounded-[28px] border border-green-100/50">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`p-1.5 sm:p-2 rounded-full ${isActive ? "bg-green-500" : "bg-gray-300"} transition-colors duration-500`}
                ></div>
                <div>
                  <p className="font-black text-[#1A2E1A] text-xs sm:text-sm uppercase">
                    Active Status
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold tracking-wide">
                    Visible on top banner
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-success toggle-md sm:toggle-lg cursor-pointer"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-[#1F5E3B] text-white py-4 cursor-pointer rounded-[20px] sm:rounded-[32px] font-black text-base sm:text-lg hover:opacity-95 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-3 active:scale-[0.98] disabled:bg-gray-200"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              {isUpdating ? "PUBLISHING..." : "UPDATE ANNOUNCEMENT"}
            </button>
          </section>
        </form>

        {/* --- Right Column: Live Preview --- */}
        <div className="space-y-6">
          <section className="bg-[#1A2E1A] p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
              <LayoutDashboard size={60} className="sm:w-20 sm:h-20" />
            </div>

            <h3 className="text-[10px] sm:text-xs font-black text-green-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-6 flex items-center gap-2">
              <Eye size={14} className="sm:w-4 sm:h-4" /> Live Preview
            </h3>

            <div className="space-y-4">
              <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Banner Appearance:
              </p>
              {isActive ? (
                <div className="bg-[#1F5E3B] p-4 rounded-xl sm:rounded-2xl text-center font-bold text-xs sm:text-sm shadow-inner border border-white/10 animate-pulse break-words">
                  {text || "Write something to see preview..."}
                </div>
              ) : (
                <div className="bg-gray-800 p-4 rounded-xl sm:rounded-2xl text-center font-bold text-xs sm:text-sm text-gray-500 italic">
                  Banner is currently hidden
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[9px] sm:text-[10px] text-gray-500 leading-relaxed italic">
                * This banner will be displayed at the very top of your
                marketplace homepage.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Addoffer;
