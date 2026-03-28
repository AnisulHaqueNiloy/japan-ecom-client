import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGetCategoriesQuery } from "@/redux/features/admin/category";
import { useGetOfferQuery } from "@/redux/features/admin/offer";
import { useGetBannersQuery } from "@/redux/features/admin/bannerApi"; // Dynamic Banner API
import { Loader2 } from "lucide-react";

const IMG_URL = import.meta.env.VITE_API_URL;

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  // Fetching Dynamic Data
  const { data: category } = useGetCategoriesQuery(undefined);
  const { data: offerData, isLoading: isOfferLoading } = useGetOfferQuery(undefined);
  const { data: bannersResponse, isLoading: isBannersLoading } = useGetBannersQuery(undefined);

  const [currentSlide, setCurrentSlide] = useState(0);
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const banners = bannersResponse?.data || [];

  // Banner Auto-slider logic for dynamic banners
  useEffect(() => {
    if (banners.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 10000); // 10 seconds interval
      return () => clearInterval(slideInterval);
    }
  }, [banners.length]);

  // GSAP Scroll Animation
  useEffect(() => {
    const el = categoryContainerRef.current;
    const validCards = cardsRef.current.filter((card) => card !== null);

    if (validCards.length > 0) {
      gsap.fromTo(
        validCards,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 30%",
            scrub: 1,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [category, banners]); // Added banners to dependency

  // Helper to check if file is a video
  const isVideoFile = (url: string) => {
    return url.match(/\.(mp4|webm|mov|ogg|quicktime)$/i);
  };

  if (isBannersLoading) {
    return (
      <div className="h-[90vh] flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#1F5E3B]" size={40} />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* --- Headline Marquee --- */}
      {/* {!isOfferLoading && offerData?.isActive && (
        <div className="bg-[#1F5E3B] text-white py-2 overflow-hidden relative z-[60]">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-10 text-[10px] md:text-xs font-bold tracking-widest uppercase">
            <p>{offerData.text}</p>
            <p>{offerData.text}</p>
          </div>
        </div>
      )} */}

      {!isOfferLoading && offerData?.isActive && (
        <div className="bg-[#1F5E3B] text-white py-2 overflow-hidden relative z-[60] border-y border-white/10">
          {/* Container-ta flex hobe ebong content repeat hobe */}
          <div className="flex whitespace-nowrap animate-marquee">
            {/* 4-5 bar repeat korle boro screen-e faka hobe na */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-10 mx-5">
                <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                  {offerData.text}
                </p>
                {/* Dot ba Star divider dile repetition sundor lage */}
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Dynamic Banner Slider --- */}
      <div className="relative h-[90vh] w-full bg-gray-900">
        {banners.length > 0 ? (
          banners.map((item: any, index: number) => (
            <div
              key={item._id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="absolute inset-0 w-full h-full">
                {isVideoFile(item.image) ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    key={`${IMG_URL}${item.image}`} // key ensures video reloads on src change if needed
                    className="w-full h-full object-cover"
                  >
                    <source src={`${IMG_URL}${item.image}`} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={`${IMG_URL}${item.image}`} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                  />
                )}
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40 z-[15]" />
              </div>

              {/* Banner Content */}
              <div className="relative z-[20] md:mx-14 mx-4 px-6 h-full flex flex-col justify-center items-start text-white">
                <div className="max-w-4xl space-y-6">
                  <span className="inline-block bg-[#1F5E3B] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                    The Standard of Purity in Japan
                  </span>
                  <h2 className="text-4xl md:text-7xl font-black leading-[1.1] drop-shadow-lg">
                    {item.title}
                  </h2>
                  {item.subtitle && (
                    <p className="text-lg md:text-xl text-gray-100 max-w-2xl leading-relaxed opacity-90 drop-shadow-md">
                      {item.subtitle}
                    </p>
                  )}
                  <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
                    <Button className="bg-[#1F5E3B] hover:bg-[#16432a] text-white rounded-full px-10 h-14 text-lg font-bold shadow-xl transition-transform hover:scale-105">
                      Start Shopping
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white/10 backdrop-blur-md border-white/30 text-white rounded-full px-10 h-14 text-lg font-bold hover:bg-white hover:text-black transition-all shadow-xl"
                    >
                      View Offers
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Fallback when no banners exist */
          <div className="h-full flex items-center justify-center text-white">
            <p className="text-xl font-bold opacity-50 uppercase tracking-widest">No Banners Available</p>
          </div>
        )}
      </div>

      {/* --- Category Cards --- */}
      <div className="bg-white py-20 overflow-hidden" ref={categoryContainerRef}>
        <div className="md:mx-14 mx-4 px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {category?.map((cat: any, index: number) => (
              <div
                key={cat?._id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group cursor-pointer flex flex-col items-center"
              >
                <div className="w-full aspect-square rounded-[2rem] overflow-hidden bg-[#F1F5F1] mb-5 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <img
                    src={`${IMG_URL}${cat.image}`}
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