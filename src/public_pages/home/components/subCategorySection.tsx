import { ShoppingCart, ChevronRight } from "lucide-react";
import { useSubCategoryProducts } from "@/customHooks/useSubCategoryProducts";
import { Link } from "react-router-dom";
const IMG_URL = import.meta.env.VITE_API_URL;

export const SubCategorySection = ({ sub }: { sub: any }) => {
  // Amader custom hook ekhane call hobe
  const { products, isLoading } = useSubCategoryProducts(sub._id);

  // Load houar somoy ba product na thakle kichu dekhabo na
  if (isLoading) return null;
  if (!products || products.length === 0) return null;

  return (
    <div className="category-block animate-in fade-in duration-700">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-[#1A2E1A] flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[#1F5E3B]"></span>
          {sub.name}
        </h2>
        <Link to={`all_products/?subCategory=${sub._id}`}>
          <button className="flex items-center gap-1 cursor-pointer text-gray-500 text-sm font-bold hover:text-[#1F5E3B] transition-all">
            View All <ChevronRight size={16} />
          </button>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {products.map((product: any) => (
          <Link to={`product/${product.slug}`}>
            <div
              key={product._id}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                {product.bestSeller && (
                  <span className="absolute top-4 left-4 bg-[#1F5E3B] text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">
                    HOT
                  </span>
                )}
                <img
                  // Backend theke asha image path fix (http://localhost:5000 add kora hoyeche)
                  src={
                    product.images?.[0]
                      ? `${IMG_URL}${product.images[0]}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute bottom-4 right-4 bg-white p-3 rounded-2xl shadow-lg opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#1F5E3B] hover:text-white">
                  <ShoppingCart size={20} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-[#1F5E3B] text-[10px] font-black tracking-widest uppercase mb-2 opacity-70">
                  {product.title}
                </p>
                <h3 className="font-bold text-[#1A2E1A] text-md mb-3 line-clamp-1 group-hover:text-[#1F5E3B] transition-colors">
                  {product.desc}
                </h3>
                <p className="text-xl font-black text-[#1A2E1A]">
                  ¥{product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
