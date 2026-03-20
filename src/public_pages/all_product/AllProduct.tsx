import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination, PaginationContent } from "@/components/ui/pagination";
import SidebarFilter from "./components/SidebarFilter";
import ProductCard from "@/components/shared/ProductCard";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Redux Hooks
import { useGetCategoriesQuery } from "@/redux/features/admin/category";
import { useGetProductsQuery } from "@/redux/features/admin/products";

// 🎯 API Response er structure define korun jate TS error na dey
interface IProductResponse {
  success: boolean;
  data: any[];
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: string | number;
    limit: string | number;
  };
}

const AllProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL parameters
  const subCategory = searchParams.get("subCategory") || "";
  const category = searchParams.get("category") || "";
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page")) || 1;

  // Local states for filtering
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [sortBy, setSortBy] = useState("newest");

  // ১. Categories fetch kora
  const { data: categoriesData } = useGetCategoriesQuery(undefined);

  // ২. Products fetch kora (As IProductResponse type casting)
  const { data: apiResponse, isLoading: isProductsLoading } =
    useGetProductsQuery({
      category,
      subCategory,
      keyword,
      page,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sort:
        sortBy === "low"
          ? "priceLow"
          : sortBy === "high"
            ? "priceHigh"
            : "newest",
      limit: 12,
    }) as { data: IProductResponse | undefined; isLoading: boolean };

  // 🎯 Error Fix: Optional chaining er sathe default value set kora hoyeche
  const products = apiResponse?.data || [];
  const meta = apiResponse?.meta || { totalCount: 0, totalPages: 1 };

  const categories =
    categoriesData?.map((cat: any) => ({
      id: cat._id,
      name: cat.name,
    })) || [];

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  return (
    <div className="md:mx-14 mx-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#1A2E1A]">
          {subCategory || category ? "Filtered Products" : "All Products"}
        </h1>
        <p className="text-gray-500 mt-2">Showing {meta.totalCount} results</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-72 shrink-0">
          <SidebarFilter
            categories={categories}
            selectedCategory={category || subCategory}
            setSelectedCategory={(id) => {
              setSearchParams({ category: id, page: "1" });
            }}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </aside>

        <main className="flex-1">
          <div className="flex justify-end mb-8">
            <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
              <SelectTrigger className="w-[200px] bg-white border-none shadow-sm rounded-xl font-bold">
                <SelectValue placeholder="Sort by: Newest" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="low">Price: Low to High</SelectItem>
                <SelectItem value="high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isProductsLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#1F5E3B]" size={40} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((product: any) => (
                    <ProductCard
                      key={product._id}
                      product={{
                        ...product,
                        name: product.title,
                        image: product.images?.[0] || "",
                      }}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-gray-400 font-bold">
                    No products found in this criteria.
                  </div>
                )}
              </div>

              {meta.totalPages > 1 && (
                <Pagination className="mt-20">
                  <PaginationContent className="gap-2">
                    <Button
                      variant="ghost"
                      disabled={page <= 1}
                      onClick={() => handlePageChange(page - 1)}
                      className="rounded-xl bg-white shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </Button>

                    {[...Array(meta.totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={page === i + 1 ? "default" : "ghost"}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 rounded-xl font-bold ${
                          page === i + 1
                            ? "bg-[#1F5E3B] text-white shadow-md"
                            : "bg-white"
                        }`}
                      >
                        {i + 1}
                      </Button>
                    ))}

                    <Button
                      variant="ghost"
                      disabled={page >= meta.totalPages}
                      onClick={() => handlePageChange(page + 1)}
                      className="rounded-xl bg-white shadow-sm"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllProduct;
