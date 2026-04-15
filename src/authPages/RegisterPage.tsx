import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Swal from "sweetalert2";
import { useRegisterMutation } from "@/redux/features/authApi";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(formData).unwrap();

      // Success Alert
      Swal.fire({
        title: "Account Created!",
        text: "Your registration was successful. Welcome to Finn!",
        icon: "success",
        confirmButtonColor: "#1F5E3B",
        iconColor: "#1F5E3B",
      });

      navigate("/"); // Home-e pathiye deya
    } catch (err: any) {
      // Error Alert
      Swal.fire({
        title: "Registration Failed",
        text: err?.data?.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#1F5E3B",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="notranslate min-h-screen flex items-center justify-center bg-[#F4F7F4] p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-green-900/5 p-10 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1F5E3B]/10 rounded-2xl mb-4 text-[#1F5E3B]">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-black text-[#1A2E1A] tracking-tight">
            Join Us
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Create an account to start your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="name"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#1F5E3B] focus:ring-4 focus:ring-[#1F5E3B]/10 transition-all outline-none text-[#1A2E1A]"
                placeholder="Anisul Haque"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#1F5E3B] focus:ring-4 focus:ring-[#1F5E3B]/10 transition-all outline-none text-[#1A2E1A]"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                name="password"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#1F5E3B] focus:ring-4 focus:ring-[#1F5E3B]/10 transition-all outline-none text-[#1A2E1A]"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Terms (Optional Aesthetic) */}
          <div className="flex items-center gap-2 px-1 pb-2">
            <CheckCircle2 size={14} className="text-[#1F5E3B]" />
            <span className="text-[11px] text-gray-500">
              By signing up, you agree to our terms & conditions.
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1F5E3B] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#16452B] active:scale-[0.98] transition-all shadow-xl shadow-green-900/20 disabled:opacity-70 mt-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Free Account"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#1F5E3B] font-bold hover:underline"
          >
            Sign In Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
