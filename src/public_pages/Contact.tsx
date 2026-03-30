import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  MessageSquare,
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="text-[#1F5E3B]" size={24} />,
      label: "Call Us",
      value: "+81 80-XXXX-XXXX",
      link: "tel:+8180XXXXXXXX",
    },
    {
      icon: <Mail className="text-[#1F5E3B]" size={24} />,
      label: "Email Support",
      value: "support@japanhalalfood.com",
      link: "mailto:support@japanhalalfood.com",
    },
    {
      icon: <MessageSquare className="text-[#1F5E3B]" size={24} />,
      label: "WhatsApp",
      value: "+81 80-XXXX-XXXX",
      link: "https://wa.me/8180XXXXXXXX",
    },
    {
      icon: <MapPin className="text-[#1F5E3B]" size={24} />,
      label: "Our Location",
      value: "Tokyo, Japan",
      link: "https://maps.google.com/?q=Tokyo,Japan",
    },
  ];

  return (
    <div className="py-20 px-6 bg-white text-[#1A2E1A]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tight mb-4">
            Contact Information
          </h2>
          <div className="w-20 h-1.5 bg-[#1F5E3B] mx-auto rounded-full"></div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-xl hover:shadow-green-900/5 group"
            >
              <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm group-hover:bg-[#1F5E3B] group-hover:text-white transition-colors duration-300">
                {info.icon}
              </div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                {info.label}
              </p>
              <p className="font-bold text-lg">{info.value}</p>
            </motion.a>
          ))}
        </div>

        {/* Business Hours & Socials */}
        <div className="mt-16 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-[#1A2E1A] text-white rounded-2xl">
              <Clock size={32} />
            </div>
            <div>
              <h4 className="font-black uppercase text-sm">Business Hours</h4>
              <p className="text-gray-500">
                Monday — Saturday: 10:00 AM - 08:00 PM
              </p>
              <p className="text-gray-400 text-xs mt-1 italic">
                Closed on Sundays & Public Holidays
              </p>
            </div>
          </div>

          <div className="flex md:justify-end gap-4">
            <a
              href="#"
              className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-100 hover:bg-[#1877F2] hover:text-white transition-all"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-100 hover:bg-[#E4405F] hover:text-white transition-all"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
