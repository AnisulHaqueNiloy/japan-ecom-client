import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Swal from "sweetalert2"; // SweetAlert2 Import
import { useLoginMutation } from "@/redux/features/authApi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login({ email, password }).unwrap();

      // Success SweetAlert
      Swal.fire({
        title: "Success!",
        text: `Welcome back, ${user.name}!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        iconColor: "#1F5E3B", // Apnar brand color
        didOpen: (modal) => {
          modal.style.borderRadius = "2rem";
        },
      });

      navigate("/");
    } catch (err: any) {
      // Error SweetAlert
      Swal.fire({
        title: "Login Failed",
        text:
          err?.data?.message || "Invalid email or password. Please try again.",
        icon: "error",
        confirmButtonColor: "#1F5E3B",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="notranslate min-h-screen flex items-center justify-center bg-[#F4F7F4] p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-green-900/5 p-10 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1F5E3B]/10 rounded-2xl mb-4">
            <LogIn className="text-[#1F5E3B]" size={32} />
          </div>
          <h2 className="text-3xl font-black text-[#1A2E1A] tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Sign in to continue your halal shopping
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
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
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#1F5E3B] focus:ring-4 focus:ring-[#1F5E3B]/10 transition-all outline-none"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
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
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#1F5E3B] focus:ring-4 focus:ring-[#1F5E3B]/10 transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1F5E3B] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#16452B] active:scale-[0.98] transition-all shadow-xl shadow-green-900/20 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          New here?{" "}
          <Link
            to="/register"
            className="text-[#1F5E3B] font-bold hover:underline"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
