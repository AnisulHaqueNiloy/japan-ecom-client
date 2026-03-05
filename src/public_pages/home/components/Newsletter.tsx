import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="px-4 py-20">
      <div 
        className="md:mx-14 mx-4 rounded-[3rem] overflow-hidden relative min-h-[450px] flex items-center justify-center bg-cover bg-center"
        style={{ 
          // এখানে আপনার পছন্দের ইমেজের লিঙ্ক দিন
          backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200')` 
        }}
      >
        {/* শ্যডো ওভারলে: এটি ইমেজকে ডার্ক করবে যাতে টেক্সট ফুটে ওঠে */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        {/* কন্টেন্ট বক্স */}
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <span className="text-white/90 uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
            Join Our Community
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            Stay updated with fresh arrivals and exclusive offers.
          </h2>
          
          <p className="text-white/80 text-lg mb-10 font-medium">
            Subscribe to our newsletter and get <span className="text-yellow-400 font-bold text-xl px-1">10% OFF</span> your next purchase.
          </p>

          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="h-14 rounded-2xl bg-white/95 border-none text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#1F5E3B]"
              required
            />
            <Button 
              type="submit"
              className="h-14 px-8 bg-[#1F5E3B] hover:bg-[#16432a] text-white rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-xl"
            >
              Subscribe Now
            </Button>
          </form>
          
          <p className="mt-4 text-white/50 text-[10px] uppercase tracking-widest">
            * By subscribing you agree to our Privacy Policy
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;