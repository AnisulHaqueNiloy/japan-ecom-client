import  { useState, useMemo } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,  } from "@/components/ui/pagination";
import SidebarFilter from './components/SidebarFilter';
import ProductCard from '@/components/shared/ProductCard';

// ১. আপনার দেওয়া ক্যাটেগরি ডাটা
const categoryData = [
  { id: 1, name: "Masala & Spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300" },
  { id: 2, name: "Snacks & Biscuits", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?q=80&w=300" },
  { id: 3, name: "Grocery", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300" },
  { id: 4, name: "Pickles", image: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=300" },
  { id: 5, name: "Oils", image: "https://images.unsplash.com/photo-1474979266404-7eaacbadb8c5?q=80&w=300" },
  { id: 6, name: "Beverages", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300" }
];

// ২. ডাইনামিক প্রোডাক্ট লিস্ট (২০টি স্যাম্পল)
const allProducts = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: i % 3 === 0 ? "Premium Basmati Rice" : i % 2 === 0 ? "Pure Mustard Oil" : "Organic Turmeric",
  price: 500 + (i * 450), // Price logic for filtering
  categoryId: (i % 6) + 1, // Linking with categoryData IDs
  categoryName: categoryData[i % 6].name,
  rating: 4.5 + (i % 5) * 0.1,
  reviews: 10 + i * 12,
  tag: i % 5 === 0 ? "NEW" : i === 2 ? "TOP RATED" : null,
  image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400",
}));

const AllProduct  = () => {
  // States for Filtering
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [sortBy, setSortBy] = useState("newest");

  // Filtering Logic (এটি API কানেক্ট করলে অনেক কাজে দেবে)
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(product => {
        const matchesCategory = selectedCategory === "All" || product.categoryName === selectedCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        return 0; // "newest" defaults to initial order
      });
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="md:mx-14 mx-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#1A2E1A]">All Products</h1>
        <p className="text-gray-500 mt-2">Showing {filteredProducts.length} results</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar with Props */}
        <aside className="w-full lg:w-72 shrink-0">
          <SidebarFilter
            categories={categoryData} 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </aside>

        <main className="flex-1">
          {/* Sorting Header */}
          <div className="flex justify-end mb-8">
            <Select onValueChange={(val) => setSortBy(val)}>
              <SelectTrigger className="w-[200px] bg-white border-none shadow-sm rounded-xl font-bold">
                <SelectValue placeholder="Sort by: Newest Arrivals" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="low">Price: Low to High</SelectItem>
                <SelectItem value="high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={{...product, price: `¥${product.price}`}} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400 font-bold">No products found in this range.</div>
            )}
          </div>

          {/* Pagination */}
          <Pagination className="mt-20">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" className="rounded-xl bg-white" /></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive className="rounded-xl bg-[#1F5E3B] text-white">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext href="#" className="rounded-xl bg-white" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
};

export default AllProduct ;