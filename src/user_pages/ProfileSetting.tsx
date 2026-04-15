import React, { useState, useEffect } from "react";
import { User, Camera, Lock, Save, Loader2, Mail } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/authApi";

// Base URL configuration
const IMG_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProfileSetting = () => {
  const { data: userData, isLoading: profileLoading } =
    useGetMeQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // Initial data set
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({ ...prev, name: userData.name }));

      // Jodi image URL "http" diye shuru na hoy, tobe age IMG_URL add hobe
      if (userData.image) {
        const fullImageUrl = userData.image.startsWith("http")
          ? userData.image
          : `${IMG_URL}${userData.image}`;
        setPreview(fullImageUrl);
      }
    }
  }, [userData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Noutun image select korle direct preview set hobe (URL.createObjectURL)
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const data = new FormData();
    data.append("name", formData.name);
    if (formData.password) data.append("password", formData.password);
    if (image) data.append("image", image);

    try {
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully!");
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (profileLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#1F5E3B]" />
      </div>
    );
  }

  return (
    <div className="notranslate p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-[#1A2E1A] text-white rounded-3xl shadow-xl shadow-gray-200">
          <User size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#1A2E1A] tracking-tight uppercase">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
            Manage your personal identity
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left: Avatar Upload */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="relative group">
              <div className="h-32 w-32 rounded-[2.5rem] overflow-hidden border-4 border-[#F8FAF8] shadow-inner bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-300">
                    <User size={48} />
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 p-3 bg-[#1F5E3B] text-white rounded-2xl cursor-pointer shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
              Click the camera icon to update photo
            </p>
          </div>
        </div>

        {/* Right: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">
            {/* Email - Disabled */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 block tracking-widest">
                Email Address (Permanent)
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <input
                  type="email"
                  disabled
                  value={userData?.email}
                  className="w-full pl-14 pr-6 py-4 bg-[#F8FAF8] border-none rounded-2xl font-bold text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 block tracking-widest">
                Display Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold text-[#1A2E1A]"
              />
            </div>

            <hr className="border-gray-50 my-4" />

            {/* Password Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 block tracking-widest">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                    size={16}
                  />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-14 pr-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-2 block tracking-widest">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-6 py-4 bg-[#F8FAF8] border-none rounded-2xl focus:ring-2 focus:ring-[#1F5E3B] font-bold"
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-[#1F5E3B] text-white py-6 rounded-[2rem] font-black text-sm hover:opacity-90 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetting;
