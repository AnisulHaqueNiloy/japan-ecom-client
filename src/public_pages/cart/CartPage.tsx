import   { useState } from 'react';
import { Minus, Plus, Trash2, ArrowRight, Truck,  Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const  CartPage = () => {
  // কার্ট ডাটা স্টেট
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "A5 Halal Wagyu", desc: "Premium Cut • 200g", price: 4500, qty: 1, img: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=200" },
    { id: 2, name: "Organic Ramen Set", desc: "Local Craft • 2 Servings", price: 1200, qty: 2, img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=200" },
    { id: 3, name: "Ajwa Dates Premium", desc: "Imported • 250g", price: 800, qty: 1, img: "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?q=80&w=200" },
  ]);

  const frequentlyBought = [
    { id: 101, name: "Shizuoka Matcha", price: "¥1,100", img: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?q=80&w=400" },
    { id: 102, name: "Pink Salt Mill", price: "¥650", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400" },
    { id: 103, name: "Garam Masala Blend", price: "¥450", img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=400" },
    { id: 104, name: "Hokkaido Spring Water", price: "¥180", img: "https://images.unsplash.com/photo-1559839914-17aae19cea9e?q=80&w=400" },
  ];

  const updateQty = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id:number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.08);
  const shipping = 800;
  const total = subtotal + tax + shipping;

  return (
    <div className="md:mx-14 mx-4 py-12 bg-white">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-[#1A2E1A] mb-2">Shopping Cart</h1>
        <p className="text-gray-500 font-medium">You have {cartItems.length} items in your selection from premium local suppliers.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
        
        {/* Left Side: Cart Items Table */}
        <div className="xl:col-span-2">
          <div className="hidden md:grid grid-cols-4 pb-4 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <div className="col-span-2">Product</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Total</div>
          </div>

          <div className="divide-y divide-gray-50">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-4 py-8 items-center gap-6"
                >
                  <div className="flex items-center gap-5 col-span-2">
                    <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A2E1A] text-lg">{item.name}</h3>
                      <p className="text-xs text-gray-400 font-bold uppercase mb-2">{item.desc}</p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 text-[10px] font-bold uppercase"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-2 gap-4 border border-gray-100">
                      <button onClick={() => updateQty(item.id, -1)} className="text-gray-400 hover:text-[#1F5E3B]"><Minus size={14} /></button>
                      <span className="font-black w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="text-gray-400 hover:text-[#1F5E3B]"><Plus size={14} /></button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-xl text-[#1A2E1A]">¥{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="space-y-6">
          <div className="bg-[#F8FAF8] rounded-[2.5rem] p-8 border border-[#E2EEE2]">
            <h2 className="text-xl font-black text-[#1A2E1A] mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm font-medium text-gray-500">
                <span>Subtotal</span>
                <span className="text-[#1A2E1A]">¥{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-500">
                <span>Tax (8%)</span>
                <span className="text-[#1A2E1A]">¥{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-500 pb-4 border-b border-gray-200/50">
                <span>Shipping Fee</span>
                <span className="text-[#1A2E1A]">¥{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-black text-[#1A2E1A]">Total</span>
                <span className="text-3xl font-black text-[#1F5E3B]">¥{total.toLocaleString()}</span>
              </div>
            </div>

            <Button className="w-full bg-[#1A2E1A] hover:bg-[#2a452a] text-white rounded-2xl h-16 font-black text-lg gap-3 shadow-xl group">
              Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Delivery Info Box */}
          <div className="bg-[#EEF7F2] rounded-3xl p-6 border border-[#DCEEE3]">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1F5E3B] shadow-sm">
                  <Truck size={20} />
               </div>
               <div>
                 <h4 className="text-xs font-black text-[#1F5E3B] uppercase tracking-wider">Delivery Preview</h4>
                 <p className="text-[10px] font-bold text-gray-500 uppercase">Standard Refrigerated (Chilled)</p>
               </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-600">Estimated Delivery:</p>
              <p className="text-sm font-black text-[#1A2E1A]">Oct 24 - Oct 26, 2024</p>
              <div className="bg-white/50 p-3 rounded-xl text-[10px] text-gray-500 leading-relaxed italic border border-white">
                Items will be packed in specialized insulated boxes to maintain freshness across Japan.
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input placeholder="Promo Code" className="pl-11 h-14 rounded-2xl border-gray-100 bg-white" />
            </div>
            <Button variant="outline" className="h-14 px-6 rounded-2xl font-bold border-gray-100 hover:bg-gray-50">Apply</Button>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together */}
      <section className="mt-24">
        <h2 className="text-2xl font-black text-[#1A2E1A] mb-8">Frequently Bought Together</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {frequentlyBought.map((item) => (
            <div key={item.id} className="group">
              <div className="aspect-square rounded-[2rem] overflow-hidden bg-gray-50 mb-4 relative shadow-sm">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A2E1A] shadow-lg hover:bg-[#1F5E3B] hover:text-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <Plus size={20} />
                </button>
              </div>
              <h4 className="font-bold text-[#1A2E1A] text-sm">{item.name}</h4>
              <p className="font-black text-[#1F5E3B] text-sm">{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default  CartPage;