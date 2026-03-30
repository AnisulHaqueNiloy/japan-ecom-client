import { Mail, Globe, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      {/* মেইন কন্টেইনার উইথ রেসপনসিভ মার্জিন */}
      <div className="md:mx-14 mx-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* ১. লোগো এবং ডেসক্রিপশন */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#1F5E3B] rounded-lg flex items-center justify-center">
                <img
                  src="/logo-white.svg" // আপনার লোগো পাথ এখানে দিন
                  alt="Halal Japan"
                  className="w-6 h-6 invert brightness-0"
                />
              </div>
              <h2 className="text-xl font-black text-[#1A2E1A] tracking-tighter">
                HALAL <span className="text-[#1F5E3B]">JAPAN</span>
              </h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Premium halal grocery provider in Japan. We bridge the gap between
              global halal standards and Japanese quality precision.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#F1F5F1] flex items-center justify-center text-[#1F5E3B] hover:bg-[#1F5E3B] hover:text-white transition-all"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#F1F5F1] flex items-center justify-center text-[#1F5E3B] hover:bg-[#1F5E3B] hover:text-white transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* ২. কুইক ক্যাটাগরি */}
          <div>
            <h4 className="font-bold text-[#1A2E1A] mb-6 uppercase tracking-widest text-xs">
              Quick Categories
            </h4>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li className="hover:text-[#1F5E3B] cursor-pointer transition-colors">
                Masala & Spices
              </li>
              <li className="hover:text-[#1F5E3B] cursor-pointer transition-colors">
                Snacks & Biscuits
              </li>
              <li className="hover:text-[#1F5E3B] cursor-pointer transition-colors">
                Oils & Pantry
              </li>
              <li className="hover:text-[#1F5E3B] cursor-pointer transition-colors">
                Frozen Meats
              </li>
            </ul>
          </div>

          {/* ৩. ইনফরমেশন */}
          <div>
            <h4 className="font-bold text-[#1A2E1A] mb-6 uppercase tracking-widest text-xs">
              Information
            </h4>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li className="hover:text-[#1F5E3B] cursor-pointer transition-colors">
                <Link to="/shipping-policy">Shipping Guide</Link>
              </li>
              <li className="hover:text-[#1F5E3B] cursor-pointer transition-colors">
                <Link to="/return-policy">Return Policy</Link>
              </li>
              <li className="hover:text-[#1F5E3B] cursor-pointer transition-colors">
                <Link to="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* ৪. কন্টাক্ট ইনফো */}
          <div>
            <h4 className="font-bold text-[#1A2E1A] mb-6 uppercase tracking-widest text-xs">
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={20} className="text-[#1F5E3B] shrink-0" />
                <span>
                  12-5 Shinjuku City, Tokyo, Japan
                  <br />
                  160-0022
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 font-bold">
                <Phone size={18} className="text-[#1F5E3B] shrink-0" />
                <span>+81 3-5555-0123</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ৫. কপিরাইট এবং লিগ্যাল */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            © {currentYear} HALAL JAPAN CO., LTD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-[#1F5E3B] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#1F5E3B] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#1F5E3B] transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
