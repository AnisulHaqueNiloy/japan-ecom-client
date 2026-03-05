import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface SidebarFilterProps {
  categories: Array<{ id: string | number; name: string }>;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const SidebarFilter = ({ categories, selectedCategory, setSelectedCategory, priceRange, setPriceRange }: SidebarFilterProps) => {
  return (
    <div className="space-y-10">
      {/* ক্যাটেগরি সিলেকশন */}
      <div>
        <h3 className="font-bold text-[#1A2E1A] mb-4 text-sm uppercase tracking-wider">Categories</h3>
        <div className="space-y-1">
          <button 
            onClick={() => setSelectedCategory("All")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === "All" ? "bg-[#1F5E3B] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.name)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat.name ? "bg-[#1F5E3B] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* প্রাইস ফিল্টার */}
      <div className="bg-[#F1F5F1] p-6 rounded-[2rem]">
        <h3 className="font-bold text-[#1A2E1A] mb-6">Price Range</h3>
        <Slider 
          value={priceRange} 
          min={0} 
          max={15000} 
          step={100} 
          // এখানে Type Casting (as [number, number]) ব্যবহার করে সমাধান করা হয়েছে
          onValueChange={(val) => setPriceRange(val as [number, number])} 
          className="mb-6" 
        />
        <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase">
          <span>¥{priceRange[0]}</span> <span>¥{priceRange[1]}</span>
        </div>
        <Button className="w-full bg-[#1F5E3B] hover:bg-[#16432a] text-white rounded-xl font-bold h-12 mt-6 transition-colors">
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default SidebarFilter;