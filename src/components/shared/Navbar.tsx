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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
// RTK Query Hook Import
import { useGetCategoriesQuery } from "@/redux/features/admin/category";

const Navbar = () => {
  // @ts-ignore
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isCatExpanded, setIsCatExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Fetch Categories from API
  const { data: categories, isLoading } = useGetCategoriesQuery();

  // প্যানেল ওপেন থাকলে ব্যাকগ্রাউন্ড স্ক্রল বন্ধ রাখা
  useEffect(() => {
    if (isCatExpanded || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCatExpanded, isMobileMenuOpen]);

  return (
    <nav className="relative w-full border-b bg-white z-[100]">
      {/* --- Main Desktop Header --- */}
      <div className="mx-auto mr-14 ml-14 px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-[#1F5E3B] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white text-lg">🕌</span>
          </div>
          <h1 className="text-xl font-black text-[#1A2E1A] tracking-tighter">
            HALAL <span className="text-[#1F5E3B]">JAPAN</span>
          </h1>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex flex-1 items-center gap-3 ml-8 ">
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

          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1F5E3B]" />
            <Input
              placeholder="Search halal products..."
              className="w-full bg-[#F1F5F1] border-none rounded-full pl-12 h-12 text-[#1F5E3B] focus-visible:ring-2 focus-visible:ring-[#1F5E3B]/20"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden xl:flex items-center gap-6 text-[#4A5568] font-medium mr-4">
            <NavLink className="hover:text-[#1F5E3B] transition-colors" to="/">
              Home
            </NavLink>
            <NavLink
              className="hover:text-[#1F5E3B] transition-colors"
              to="all_products"
            >
              Shop All
            </NavLink>
            <NavLink
              className="hover:text-[#1F5E3B] transition-colors"
              to="contact"
            >
              Contact Us
            </NavLink>
            <NavLink
              className="hover:text-[#1F5E3B] transition-colors"
              to="about"
            >
              About Us
            </NavLink>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <Link to={"cart"}>
              <div className="relative cursor-pointer group">
                <ShoppingCart className="w-6 h-6 text-[#4A5568] group-hover:text-[#1F5E3B]" />
                <span className="absolute -top-2 -right-2 bg-[#1F5E3B] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </div>
            </Link>

            <div className="border-l hidden md:block pl-3 md:pl-5 ml-1 flex items-center">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-10 w-10 rounded-full p-0 bg-[#F1F5F1] hover:bg-[#E2EBE2]"
                    >
                      <User className="w-5 h-5 text-[#1F5E3B]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 mt-2 p-2">
                    <DropdownMenuItem className="cursor-pointer py-2 rounded-md">
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer py-2 rounded-md text-red-600 focus:text-red-600 focus:bg-red-50">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="default"
                  className="bg-[#1F5E3B] hover:bg-[#16432a] rounded-full px-6 text-white"
                >
                  Register
                </Button>
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

      {/* --- Full VH Category Overlay (Desktop) --- */}
      <div
        className={`fixed inset-0 top-20 bg-black/40 backdrop-blur-sm z-[90] transition-opacity duration-500 ${
          isCatExpanded ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsCatExpanded(false)}
      >
        <div
          className={`bg-white w-full border-t shadow-2xl transition-all duration-500 ease-out transform ${
            isCatExpanded
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
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

            {/* Loading State for Categories */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-[#1F5E3B]" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                {categories?.map((cat: any, idx: number) => (
                  <div
                    key={cat._id}
                    className="space-y-4 transition-all duration-700"
                    style={{
                      transitionDelay: `${idx * 50}ms`,
                      transform: isCatExpanded
                        ? "translateY(0)"
                        : "translateY(20px)",
                      opacity: isCatExpanded ? 1 : 0,
                    }}
                  >
                    <h3 className="text-lg font-black text-[#1A2E1A] border-b pb-2">
                      {cat.name}
                    </h3>
                    <ul className="space-y-2">
                      {cat.subcategories?.map((sub: any, i: number) => (
                        <li key={sub._id || i}>
                          <Link
                            to={`all_products?subCategory=${sub._id}`}
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

      {/* --- Smooth Mobile Full Menu --- */}
      <div
        className={`fixed inset-0 bg-white z-[150] md:hidden transition-all duration-500 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1F5E3B] rounded flex items-center justify-center">
              <span className="text-white text-sm">🕌</span>
            </div>
            <h1 className="text-lg font-bold text-[#1A2E1A]">HALAL JAPAN</h1>
          </div>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-8 h-8 text-gray-600" />
          </Button>
        </div>

        <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1F5E3B]" />
            <Input
              placeholder="Search products..."
              className="bg-[#F1F5F1] border-none rounded-2xl h-14 pl-12 text-[#1F5E3B]"
            />
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black text-[#1F5E3B] uppercase tracking-widest opacity-50">
              Main Menu
            </p>
            <div className="flex flex-col gap-5 text-2xl font-bold text-[#1A2E1A]">
              <NavLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex justify-between items-center"
              >
                Home <ChevronRight className="text-gray-200" />
              </NavLink>
              <NavLink
                to="all_products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex justify-between items-center"
              >
                Shop All <ChevronRight className="text-gray-200" />
              </NavLink>
              <NavLink
                to="contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex justify-between items-center"
              >
                Contact Us <ChevronRight className="text-gray-200" />
              </NavLink>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] font-black text-[#1F5E3B] uppercase tracking-widest opacity-50">
              Shop By Category
            </p>
            <div className="grid grid-cols-1 gap-4">
              {isLoading ? (
                <Loader2 className="animate-spin text-[#1F5E3B] mx-auto" />
              ) : (
                categories?.map((cat: any) => (
                  <div
                    key={cat._id}
                    className="bg-[#F1F5F1] p-5 rounded-2xl space-y-4"
                  >
                    <p className="font-bold text-[#1A2E1A] text-lg flex items-center justify-between">
                      {cat.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cat.subcategories?.map((sub: any, i: number) => (
                        <Link
                          key={sub._id || i}
                          to={`all_products?subCategory=${sub._id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-xs bg-white px-3 py-2 rounded-full border border-gray-100 text-gray-600 font-medium hover:text-[#1F5E3B] hover:border-[#1F5E3B] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t">
            {isLoggedIn ? (
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-400">Account</p>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start rounded-xl"
                >
                  Profile Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-12 justify-start text-red-600 hover:bg-red-50 rounded-xl"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button className="w-full h-14 rounded-2xl bg-[#1F5E3B] text-lg font-bold text-white">
                Register Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
