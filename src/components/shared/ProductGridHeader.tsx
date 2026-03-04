import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Shadcn Select

const ProductGridHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-2 rounded-xl">
      {/* Result Count */}
      <p className="text-sm text-gray-500 font-medium">
        Showing <span className="text-[#1A2E1A] font-bold">12</span> of{" "}
        <span className="text-[#1A2E1A] font-bold">144</span> products
      </p>

      {/* Sorting Dropdown */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400 whitespace-nowrap">Sort by:</span>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[180px] bg-white border-gray-100 rounded-xl font-bold text-[#1A2E1A]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-gray-100">
            <SelectItem value="newest">Newest Arrivals</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="top-rated">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductGridHeader;