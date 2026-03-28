import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { useGetMeQuery, useLogoutMutation } from "@/redux/features/authApi";
const IMG_URL = import.meta.env.VITE_API_URL
import {
  LayoutDashboard,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  Loader2,
} from "lucide-react";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();


  // API Logout Mutation Hook
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();
  const {data:user} = useGetMeQuery(undefined)
// console.log(user.image)
  // --- Logout Handler with SweetAlert2 ---
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1F5E3B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      background: "#fff",
      color: "#1A2E1A",
    });

    if (result.isConfirmed) {
      try {
        // 1. Call the logout API
        await logoutApi(undefined).unwrap();

        // 2. Clear Redux State
   

        // 3. Clear Token
        localStorage.removeItem("token");

        // 4. Success Alert & Redirect
        Swal.fire({
          title: "Logged Out!",
          text: "See you again soon.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/", { replace: true });
      } catch (error: any) {
        console.error("Logout Error:", error);
        
        // Force logout on error
        
        localStorage.removeItem("token");
        navigate("/");

        Swal.fire({
          title: "Session Cleared",
          text: "You have been logged out.",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Orders", path: `/user` },
    { icon: <ShoppingBag size={20} />, label: "Profile", path: `/user/profile` },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAF8] font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 p-6 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Logo Area */}
        <div className="mb-10 px-4 flex justify-between items-center">
          <div>
            <Link to={"/"}>
              <h1 className="text-2xl font-black text-[#1F5E3B] tracking-tighter">
                HALAL JPN
              </h1>
            </Link>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
              User Panel
            </p>
          </div>
          <button
            className="lg:hidden text-gray-500 hover:bg-gray-50 p-1 rounded-lg"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#1F5E3B] text-white shadow-lg shadow-green-100"
                    : "text-gray-500 hover:bg-[#F1F5F1] hover:text-[#1F5E3B]"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout Area */}
        <div className="absolute bottom-8 left-6 right-6">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 px-5 py-3.5 w-full rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <LogOut
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="font-black text-[#1A2E1A] text-lg uppercase tracking-tight hidden sm:block">
              Welcome Back, {user?.name}
            </h2>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-black text-[#1A2E1A]">User Name</p>
              <p className="text-[10px] text-[#1F5E3B] font-bold uppercase tracking-wider">
                {user?.name}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#F1F5F1] border border-gray-100 flex items-center justify-center text-[#1F5E3B] font-black shadow-sm">
              <img src={`${IMG_URL}${user?.image}`} alt="" className="rounded-full"/>
            </div>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <main className="p-4 md:p-8 lg:p-10 animate-in fade-in duration-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;