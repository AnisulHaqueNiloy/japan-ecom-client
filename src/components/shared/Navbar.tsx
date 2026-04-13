import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  Loader2,
  LogOut,
  Settings,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// RTK Query & Redux Hooks
import { useGetCategoriesQuery } from "@/redux/features/admin/category";
import { useGetMeQuery, useLogoutMutation } from "@/redux/features/authApi";
import { useSelector } from "react-redux";

import LanguageDropdown from "../translation/LanguageDropdown";

const IMG_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Navbar = () => {
  const [isCatExpanded, setIsCatExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Search State ---
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // 1. Auth Status & User Data
  const { data: user, isLoading: isUserLoading } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "ADMIN";

  // 2. Cart Count
  const cartState = useSelector((state: any) => state.cart);
  const items = cartState?.items || cartState?.cartItems || [];
  const totalCartCount = items.reduce(
    (total: number, item: any) => total + (item.quantity || 1),
    0,
  );

  // 3. Categories Fetching
  const { data: categories, isLoading: isCatLoading } =
    useGetCategoriesQuery(undefined);

  // --- Search Handler ---
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Backend service 'keyword' filter support kore, tai query param e keyword pathachchi
      navigate(
        `/all_products?keyword=${encodeURIComponent(searchTerm.trim())}`,
      );
      setIsMobileMenuOpen(false);
      setIsCatExpanded(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      Swal.fire({
        title: "Logged Out",
        text: "You have been successfully logged out.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (err) {
      Swal.fire("Error", "Logout failed. Please try again.", "error");
    }
  };

  const getFullImageUrl = (path: string) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${IMG_URL}${path}`;
  };

  useEffect(() => {
    if (isCatExpanded || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCatExpanded, isMobileMenuOpen]);

  return (
    <nav className="relative w-full border-b bg-white z-[100]">
      <div className="mx-auto mr-4 md:mr-14 ml-4 md:ml-14 px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-[#1F5E3B] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white text-lg">🕌</span>
          </div>
          <h1 className="text-xl font-black text-[#1A2E1A] tracking-tighter">
            MainichiHalal <span className="text-[#1F5E3B]">Shop</span>
          </h1>
        </Link>

        {/* Desktop Search & Categories */}
        <div className="hidden lg:flex flex-1 items-center gap-3 ml-8">
          <Button
            variant="default"
            className={`rounded-full px-6 h-12 flex items-center gap-2 border-none transition-all duration-300 ${
              isCatExpanded
                ? "bg-[#1F5E3B] text-white shadow-lg"
                : "bg-[#F1F5F1] text-[#1F5E3B] hover:bg-[#E2EBE2]"
            }`}
            onClick={() => {
              setIsCatExpanded(!isCatExpanded);
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="grid grid-cols-2 gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-sm transition-colors duration-300 ${isCatExpanded ? "bg-white" : "bg-[#1F5E3B]"}`}
                />
              ))}
            </div>
            <span className="font-semibold">Categories</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-500 ${isCatExpanded ? "rotate-180" : ""}`}
            />
          </Button>

          {/* Desktop Search Form */}
          <form onSubmit={handleSearch} className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1F5E3B]" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search halal products..."
              className="w-full bg-[#F1F5F1] border-none rounded-full pl-12 h-12 text-[#1F5E3B] focus-visible:ring-2 focus-visible:ring-[#1F5E3B]/20"
            />
          </form>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden xl:flex items-center gap-6 text-[#4A5568] font-medium mr-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#1F5E3B] font-bold" : "hover:text-[#1F5E3B]"
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#1F5E3B] font-bold" : "hover:text-[#1F5E3B]"
              }
              to="/all_products"
            >
              Shop All
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#1F5E3B] font-bold" : "hover:text-[#1F5E3B]"
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden md:block">
              <LanguageDropdown />
            </div>

            {!isAdmin && (
              <Link to="/cart">
                <div className="relative cursor-pointer group">
                  <ShoppingCart className="w-6 h-6 text-[#4A5568] group-hover:text-[#1F5E3B]" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#1F5E3B] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {totalCartCount}
                    </span>
                  )}
                </div>
              </Link>
            )}

            <div className="border-l hidden md:block pl-3 md:pl-5 ml-1">
              {isUserLoading ? (
                <Loader2 className="animate-spin text-[#1F5E3B] w-6 h-6" />
              ) : isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-10 px-2 gap-2 rounded-full bg-[#F1F5F1] hover:bg-[#E2EBE2]"
                    >
                      <div className="w-7 h-7 bg-[#1F5E3B] rounded-full flex items-center justify-center text-white overflow-hidden">
                        {user.image ? (
                          <img
                            src={getFullImageUrl(user.image)!}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={16} />
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#1A2E1A] hidden xl:inline-block max-w-[100px] truncate">
                        {user.name.split(" ")[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 mt-2 p-2 rounded-2xl border-gray-100 shadow-xl"
                  >
                    <div className="px-3 py-3">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-[#1A2E1A] truncate">
                        {user.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate(isAdmin ? "/admin" : "/user")}
                      className="cursor-pointer py-3 rounded-xl gap-3"
                    >
                      {isAdmin ? <Settings size={18} /> : <User size={18} />}{" "}
                      {isAdmin ? "Admin Dashboard" : "Dashboard"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer py-3 rounded-xl gap-3 text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut size={18} /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="rounded-full px-6 font-bold text-[#1F5E3B]"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-[#1F5E3B] hover:bg-[#16432a] rounded-full px-6 text-white font-bold">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </Button>
          </div>
        </div>
      </div>

      {/* --- Category Overlay (Desktop) --- */}
      <div
        className={`fixed inset-0 top-20 bg-black/40 backdrop-blur-sm z-[90] transition-opacity duration-500 ${isCatExpanded ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsCatExpanded(false)}
      >
        <div
          className={`bg-white w-full border-t shadow-2xl transition-all duration-500 ease-out transform ${isCatExpanded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container mx-auto py-12 px-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-[#1A2E1A] border-l-4 border-[#1F5E3B] pl-4">
                All Categories
              </h2>
              <Button variant="ghost" onClick={() => setIsCatExpanded(false)}>
                <X className="mr-2 h-4 w-4" /> Close
              </Button>
            </div>
            {isCatLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-[#1F5E3B]" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                {categories?.map((cat: any) => (
                  <div key={cat._id} className="space-y-4">
                    <h3 className="text-lg font-black text-[#1A2E1A] border-b pb-2">
                      {cat.name}
                    </h3>
                    <ul className="space-y-2">
                      {cat.subcategories?.map((sub: any) => (
                        <li key={sub._id}>
                          <Link
                            to={`/all_products?subCategory=${sub._id}`}
                            onClick={() => setIsCatExpanded(false)}
                            className="text-gray-500 hover:text-[#1F5E3B] text-sm flex items-center group transition-colors"
                          >
                            <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-4 group-hover:ml-0" />
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <div
        className={`fixed inset-0 bg-white z-[150] md:hidden transition-all duration-500 ease-in-out transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b">
          <h1 className="text-lg font-bold text-[#1A2E1A]">HALAL JAPAN</h1>
          <Button variant="ghost" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-8 h-8 text-gray-600" />
          </Button>
        </div>
        <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Mobile User Profile */}
          {isLoggedIn && (
            <div className="flex items-center gap-4 bg-[#F1F5F1] p-4 rounded-2xl">
              <div className="w-12 h-12 bg-[#1F5E3B] rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                {user.image ? (
                  <img
                    src={getFullImageUrl(user.image)!}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.name[0]
                )}
              </div>
              <div>
                <p className="font-bold text-[#1A2E1A]">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          {/* Mobile Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1F5E3B]" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="bg-[#F1F5F1] border-none rounded-2xl h-14 pl-12"
            />
          </form>

          <div className="pt-2">
            <LanguageDropdown />
          </div>

          <div className="space-y-4">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-2xl font-bold"
            >
              Home
            </NavLink>
            <NavLink
              to="/all_products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-2xl font-bold"
            >
              Shop All
            </NavLink>
            <NavLink
              to={isAdmin ? "/admin" : "/user"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-2xl font-bold text-[#1F5E3B]"
            >
              {isAdmin ? "Admin Panel" : "User Panel"}
            </NavLink>
            {!isAdmin && (
              <NavLink
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-2xl font-bold"
              >
                My Cart ({totalCartCount})
              </NavLink>
            )}
          </div>

          <div className="pt-4 border-t">
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                className="w-full h-14 rounded-2xl bg-red-50 text-red-600 font-bold"
              >
                Logout
              </Button>
            ) : (
              <div className="grid gap-4">
                <Button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full h-14 rounded-2xl bg-[#F1F5F1] text-[#1F5E3B] font-bold"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate("/register");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full h-14 rounded-2xl bg-[#1F5E3B] text-white font-bold"
                >
                  Register Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
