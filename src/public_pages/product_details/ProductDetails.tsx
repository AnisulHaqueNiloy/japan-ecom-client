import  { useState } from 'react';
import { Star, ShoppingCart, Minus, Plus, CheckCircle2, Snowflake, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion"; // ফর লাইটবক্স অ্যানিমেশন
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=800",
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800",
    "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800"
  ];

  const relatedProducts = [
    { id: 1, name: "Premium Koshihikari Rice", desc: "Hokkaido Special Export • 2kg", price: "¥3,200", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400" },
    { id: 2, name: "Okinawa Artisan Sea Salt", desc: "Natural Minerals • 150g", price: "¥1,450", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400" },
    { id: 3, name: "Fresh Hon-Wasabi Root", desc: "Shizuoka Farmed • 80g", price: "¥2,100", image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?q=80&w=400" },
    { id: 4, name: "Halal Premium Steak Sauce", desc: "Original Recipe • 250ml", price: "¥890", image: "https://images.unsplash.com/photo-1474979266404-7eaacbadb8c5?q=80&w=400" },
    { id: 5, name: "Japanese Bamboo Coal", desc: "For Perfect Grilling", price: "¥4,500", image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=400" },
  ];

  return (
    <div className="md:mx-14 mx-4 py-10 font-sans">
      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform">
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              src={images[selectedImage]} 
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">
        Home &nbsp;›&nbsp; Premium Meat &nbsp;›&nbsp; <span className="text-[#1A2E1A]">A5 Wagyu Ribeye</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {/* Left Side: Product Images */}
        <div className="space-y-4">
          <div 
            className="aspect-square rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          >
            <motion.img 
              key={selectedImage}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              src={images[selectedImage]} 
              alt="A5 Wagyu Ribeye" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${i === selectedImage ? 'border-[#1F5E3B] scale-95' : 'border-transparent opacity-60'}`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="flex flex-col">
          <div className="flex gap-2 mb-4">
            <Badge variant="outline" className="text-[10px] font-bold text-[#1F5E3B] border-[#1F5E3B] uppercase px-3">
              <CheckCircle2 size={12} className="mr-1" /> Certified Halal
            </Badge>
            <Badge variant="outline" className="text-[10px] font-bold text-[#D97706] border-[#D97706] uppercase px-3">
              A5 Grade
            </Badge>
          </div>

          <h1 className="text-4xl font-black text-[#1A2E1A] leading-tight mb-2">
            Hokkaido Premium Wagyu Ribeye Steak (A5)
          </h1>

          <div className="flex items-center gap-2 mb-6 text-[#FACC15]">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill={s <= 4 ? "currentColor" : "none"} />)}
            </div>
            <span className="text-xs font-bold text-gray-800">4.8 (142 reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-black text-[#1F5E3B]">¥12,800</span>
            <span className="text-lg text-gray-400 line-through font-bold">¥15,000</span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-8">Approx. 300g per serving • Vacuum Sealed</p>

          <div className="space-y-6 mb-10">
            <h4 className="font-bold text-[#1A2E1A] text-sm uppercase">Product Description</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Experience the pinnacle of Japanese culinary excellence. Our Hokkaido-sourced A5 Wagyu is strictly Halal-certified and features incredible shimofuri (marbling) that melts at room temperature.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-6 py-2 gap-6 min-w-[140px]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-[#1F5E3B]"><Minus size={18} /></button>
              <span className="font-black text-xl">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="hover:text-[#1F5E3B]"><Plus size={18} /></button>
            </div>
            <Button className="flex-1 bg-[#1F5E3B] hover:bg-[#16432a] text-white rounded-2xl h-16 font-black text-lg gap-3 shadow-xl transition-all active:scale-95">
              <ShoppingCart size={22} /> Add to Cart
            </Button>
          </div>

          <div className="flex justify-between mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
              <Snowflake size={14} className="text-[#1F5E3B]" /> Free chilled shipping
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
              <CheckCircle2 size={14} className="text-[#1F5E3B]" /> Full Traceability
            </div>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <section className="relative">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-[#1A2E1A]">Pairs perfectly with</h2>
            <p className="text-sm text-gray-500 font-medium">Recommended based on your current selection</p>
          </div>
          
          {/* Custom Navigation Buttons for Slider */}
          <div className="flex gap-3">
             <button id="prev-btn" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F5E3B] hover:text-white transition-all shadow-sm">
                <ChevronLeft size={24} />
             </button>
             <button id="next-btn" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1F5E3B] hover:text-white transition-all shadow-sm">
                <ChevronRight size={24} />
             </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{ prevEl: '#prev-btn', nextEl: '#next-btn' }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }
          }}
          className="pb-12"
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 mb-4 relative shadow-sm border border-gray-50">
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-all z-10 hover:text-red-500">
                     <Star size={18} />
                  </button>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
                <h4 className="font-bold text-[#1A2E1A] text-md line-clamp-1 group-hover:text-[#1F5E3B] transition-colors">{product.name}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider">{product.desc}</p>
                <p className="text-lg font-black text-[#1A2E1A]">{product.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default ProductDetails;