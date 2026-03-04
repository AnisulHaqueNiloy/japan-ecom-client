import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const categoryData = [
  { id: 1, name: "Masala & Spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300" },
  { id: 2, name: "Snacks & Biscuits", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?q=80&w=300" },
  { id: 3, name: "Grocery", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300" },
  { id: 4, name: "Pickles", image: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=300" },
  { id: 5, name: "Oils", image: "https://images.unsplash.com/photo-1474979266404-7eaacbadb8c5?q=80&w=300" },
  { id: 6, name: "Beverages", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300" }
];

const bannerSlides = [
  {
    id: 1,
    title: "Premium Halal Groceries Delivered Nationwide.",
    subtitle: "Experience the finest selection of certified halal meats, aromatic spices, and global pantry essentials.",
    type: "image",
    url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920",
  },
  {
    id: 2,
    title: "Freshness You Can Trust, Quality You Deserve.",
    subtitle: "Bringing the authentic taste of home right to your doorstep in Japan.",
    type: "video",
    url: "https://www.shutterstock.com/shutterstock/videos/3603393187/preview/stock-footage-stylish-african-american-woman-in-a-yellow-sweater-shopping-for-fresh-produce-in-a-vibrant.webm",
  }
];

const HeroSection = () => {
  const [adminConfig, setAdminConfig] = useState({
    showHeadline: true,
    headlineText: "🚀 FREE SHIPPING OVER ¥8,000 | 100% HALAL CERTIFIED | EXPRESS 24H DELIVERY | 10% OFF FIRST ORDER CODE: HALALJP",
    currentSlide: 0
  });

  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Banner Auto-slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setAdminConfig(prev => ({
        ...prev,
        currentSlide: (prev.currentSlide + 1) % bannerSlides.length
      }));
    }, 10000);
    return () => clearInterval(slideInterval);
  }, []);

  // GSAP Scroll Animation
  useEffect(() => {
    const el = categoryContainerRef.current;
    
    // কার্ডগুলো ডান দিক থেকে বামে স্লাইড হবে
    gsap.fromTo(
      cardsRef.current,
      { 
        x: 100, 
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1, // একটির পর একটি আসবে
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // যখন সেকশনটি স্ক্রিনের ৮৫% এ আসবে
          end: "top 30%",
          scrub: 1, // স্ক্রলিং এর সাথে অ্যানিমেশন সিঙ্ক হবে (স্মুথ রিভার্স কাজ করবে)
          toggleActions: "play reverse play reverse",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* --- Headline Marquee --- */}
      {adminConfig.showHeadline && (
        <div className="bg-[#1F5E3B] text-white py-2 overflow-hidden relative z-[60]">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-10 text-[10px] md:text-xs font-bold tracking-widest uppercase">
            <p>{adminConfig.headlineText}</p>
            <p>{adminConfig.headlineText}</p>
          </div>
        </div>
      )}

      {/* --- Banner Slider --- */}
      <div className="relative h-[90vh] w-full bg-gray-900">
        {bannerSlides.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === adminConfig.currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 w-full h-full">
              {item.type === "video" ? (
                <video autoPlay muted loop playsInline key={item.url} className="w-full h-full object-cover">
                  <source src={item.url} type="video/mp4" />
                </video>
              ) : (
                <img src={item.url} alt="Banner" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-black/40 z-[15]" />
            </div>

            <div className="relative z-[20] md:mx-14 mx-4 px-6 h-full flex flex-col justify-center items-start text-white">
              <div className="max-w-4xl space-y-6">
                <span className="inline-block bg-[#1F5E3B] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                  The Standard of Purity in Japan
                </span>
                <h2 className="text-4xl md:text-7xl font-black leading-[1.1] drop-shadow-lg">
                  {item.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed opacity-90 drop-shadow-md">
                  {item.subtitle}
                </p>
                <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
                  <Button className="bg-[#1F5E3B] hover:bg-[#16432a] text-white rounded-full px-10 h-14 text-lg font-bold shadow-xl transition-transform hover:scale-105">
                    Start Shopping
                  </Button>
                  <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white rounded-full px-10 h-14 text-lg font-bold hover:bg-white hover:text-black transition-all shadow-xl">
                    View Offers
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- GSAP Animated Category Cards --- */}
      <div className="bg-white py-20 overflow-hidden" ref={categoryContainerRef}>
        <div className="md:mx-14 mx-4 px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {categoryData.map((cat, index) => (
              <div 
                key={cat.id} 
                ref={el => cardsRef.current[index] = el}
                className="group cursor-pointer flex flex-col items-center"
              >
                <div className="w-full aspect-square rounded-[2rem] overflow-hidden bg-[#F1F5F1] mb-5 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <h4 className="font-bold text-[#1A2E1A] text-sm uppercase tracking-widest group-hover:text-[#1F5E3B] transition-colors text-center">
                  {cat.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;