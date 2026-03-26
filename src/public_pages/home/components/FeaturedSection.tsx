// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import {
//   ShoppingCart,
//   ChevronRight,
//   CheckCircle,
//   Truck,
//   ShieldCheck,
//   Headphones,
// } from "lucide-react";
// import { useGetCategoriesQuery } from "@/redux/features/admin/category";
// import { useSubCategoryProducts } from "@/customHooks/useSubCategoryProducts";

// gsap.registerPlugin(ScrollTrigger);

// // ডাটা স্ট্রাকচার
// const fullData = [
//   {
//     categoryId: 1,
//     categoryName: "Masala & Spices",
//     categoryThumb:
//       "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=300",
//     products: [
//       {
//         id: 101,
//         name: "Organic Ground Turmeric",
//         price: "¥850",
//         category: "SEASONING",
//         image:
//           "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400",
//       },
//       {
//         id: 102,
//         name: "Garam Masala Premium Blend",
//         price: "¥1,200",
//         category: "BLENDS",
//         image:
//           "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400",
//       },
//       {
//         id: 103,
//         name: "Kashmiri Chili Powder",
//         price: "¥780",
//         category: "SPICES",
//         image:
//           "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?q=80&w=400",
//       },
//       {
//         id: 104,
//         name: "Premium Cardamom Pods",
//         price: "¥1,550",
//         category: "WHOLE SPICES",
//         image:
//           "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400",
//       },
//       {
//         id: 105,
//         name: "Premium Cardamom Pods",
//         price: "¥1,550",
//         category: "WHOLE SPICES",
//         image:
//           "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400",
//       },
//     ],
//   },
//   {
//     categoryId: 2,
//     categoryName: "Snacks & Biscuits",
//     categoryThumb:
//       "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?q=80&w=300",
//     products: [
//       {
//         id: 201,
//         name: "Premium Medjool Dates 500g",
//         price: "¥2,450",
//         category: "PREMIUM IMPORTS",
//         tag: "HOT",
//         image:
//           "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=400",
//       },
//       {
//         id: 202,
//         name: "Spicy Chanachur Mix",
//         price: "¥450",
//         category: "SNACKS",
//         image:
//           "https://images.unsplash.com/photo-1605666807844-78fbad023bc3?q=80&w=400",
//       },
//       {
//         id: 203,
//         name: "Butter Cookies",
//         price: "¥600",
//         category: "BISCUITS",
//         image:
//           "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=400",
//       },
//       {
//         id: 204,
//         name: "Peanut Bar",
//         price: "¥200",
//         category: "SNACKS",
//         image:
//           "https://images.unsplash.com/photo-1534119428213-fc4751762cc3?q=80&w=400",
//       },
//       {
//         id: 205,
//         name: "Peanut Bar",
//         price: "¥200",
//         category: "SNACKS",
//         image:
//           "https://images.unsplash.com/photo-1534119428213-fc4751762cc3?q=80&w=400",
//       },
//     ],
//   },
//   {
//     categoryId: 3,
//     categoryName: "Grocery",
//     categoryThumb:
//       "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300",
//     products: [
//       {
//         id: 301,
//         name: "Long Grain Basmati Rice 5kg",
//         price: "¥3,200",
//         category: "GRAINS",
//         image:
//           "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400",
//       },
//       {
//         id: 302,
//         name: "Red Lentils (Masoor Dal)",
//         price: "¥900",
//         category: "PULSES",
//         image:
//           "https://images.unsplash.com/photo-1585996853877-ad9aa5d3362d?q=80&w=400",
//       },
//       {
//         id: 303,
//         name: "Iodized Table Salt",
//         price: "¥150",
//         category: "ESSENTIALS",
//         image:
//           "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
//       },
//       {
//         id: 304,
//         name: "Sugar 1kg",
//         price: "¥350",
//         category: "ESSENTIALS",
//         image:
//           "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?q=80&w=400",
//       },
//       {
//         id: 305,
//         name: "Sugar 1kg",
//         price: "¥350",
//         category: "ESSENTIALS",
//         image:
//           "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?q=80&w=400",
//       },
//     ],
//   },
// ];

// const FeaturedSections = () => {
//   const categorySliderRef = useRef<HTMLDivElement | null>(null);
//   const catCardsRef = useRef<(HTMLDivElement | null)[]>([]);

//   const { data: category, isLoading } = useGetCategoriesQuery();

//   const sublist = category?.map((cat) => cat.subcategories).flat();
//   console.log(sublist);
//   const id = sublist?.[2]._id;

//   console.log(id);

//   const data = useSubCategoryProducts(id);
//   console.log(data);

//   useEffect(() => {
//     // GSAP Animation for Category Icons
//     // Filter out nulls to ensure stability
//     const validCards = catCardsRef.current.filter((el) => el !== null);

//     gsap.fromTo(
//       validCards,
//       { x: 200, opacity: 0 },
//       {
//         x: 0,
//         opacity: 1,
//         duration: 1.2,
//         stagger: 0.1,
//         ease: "power4.out",
//         scrollTrigger: {
//           trigger: categorySliderRef.current,
//           start: "top 90%",
//           end: "top 20%",
//           scrub: 1,
//           toggleActions: "play reverse play reverse",
//         },
//       },
//     );

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return (
//     <div className="bg-[#fcfcfc] my-6 overflow-hidden">
//       {/* ১. Trust Badges */}
//       <div className="md:mx-14 mx-4 px-6 md:px-14">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             {
//               title: "Halal Certified",
//               desc: "100% Sharia Compliant",
//               icon: <CheckCircle className="text-[#1F5E3B]" />,
//             },
//             {
//               title: "Express Delivery",
//               desc: "Across Japan in 24h",
//               icon: <Truck className="text-[#1F5E3B]" />,
//             },
//             {
//               title: "Japan Quality",
//               desc: "Strict Quality Control",
//               icon: <ShieldCheck className="text-[#1F5E3B]" />,
//             },
//             {
//               title: "Customer Support",
//               desc: "Multi-language Help",
//               icon: <Headphones className="text-[#1F5E3B]" />,
//             },
//           ].map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-white p-6 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-100 transition-all hover:shadow-md"
//             >
//               <div className="w-12 h-12 bg-[#F1F5F1] rounded-full flex items-center justify-center text-xl">
//                 {item.icon}
//               </div>
//               <div>
//                 <h5 className="font-bold text-[#1A2E1A] text-sm uppercase tracking-tight">
//                   {item.title}
//                 </h5>
//                 <p className="text-gray-500 text-xs">{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ২. Category Navigation (GSAP Slide) */}
//       <div ref={categorySliderRef} className="my-4 px-4 md:px-14">
//         <div className="flex flex-col items-center justify-between ">
//           <div className="flex flex-col items-center justify-between">
//             <h2 className="text-3xl font-black text-[#1F5E3B] border-l-4 border-[#1F5E3B] pl-4">
//               Shop by Category
//             </h2>
//             <p className="text-gray-500 mt-2">
//               Find your favorite halal essentials quickly
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ৩. Dynamic Category-wise Product Sections */}
//       <div className="mx-4 md:mx-14  px-6   space-y-20">
//         {fullData.map((catGroup) => (
//           <div key={catGroup.categoryId} className="category-block">
//             {/* Section Header */}
//             <div className="flex justify-between items-center mb-10">
//               <h2 className="text-2xl md:text-3xl font-black text-[#1A2E1A] flex items-center gap-3">
//                 <span className="w-8 h-[2px] bg-[#1F5E3B]"></span>
//                 {catGroup.categoryName}
//               </h2>
//               <button className="flex items-center gap-1 text-gray-500 text-sm font-bold hover:text-[#1F5E3B] transition-all">
//                 View All <ChevronRight size={16} />
//               </button>
//             </div>

//             {/* Product Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
//               {catGroup.products.map((product) => (
//                 <div
//                   key={product.id}
//                   className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-xl"
//                 >
//                   <div className="relative aspect-square overflow-hidden bg-gray-50">
//                     {product.id === 201 && ( // Example tag logic
//                       <span className="absolute top-4 left-4 bg-[#1F5E3B] text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">
//                         HOT
//                       </span>
//                     )}
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                     />
//                     <button className="absolute bottom-4 right-4 bg-white p-3 rounded-2xl shadow-lg opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#1F5E3B] hover:text-white">
//                       <ShoppingCart size={20} />
//                     </button>
//                   </div>
//                   <div className="p-6">
//                     <p className="text-[#1F5E3B] text-[10px] font-black tracking-widest uppercase mb-2 opacity-70">
//                       {product.category}
//                     </p>
//                     <h3 className="font-bold text-[#1A2E1A] text-md mb-3 line-clamp-1 group-hover:text-[#1F5E3B] transition-colors">
//                       {product.name}
//                     </h3>
//                     <p className="text-xl font-black text-[#1A2E1A]">
//                       {product.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedSections;
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  CheckCircle,
  Truck,
  ShieldCheck,
  Headphones,
  Loader2,
} from "lucide-react";
import { useGetCategoriesQuery } from "@/redux/features/admin/category";
import { SubCategorySection } from "./subCategorySection";

gsap.registerPlugin(ScrollTrigger);

const FeaturedSections = () => {
  const categorySliderRef = useRef<HTMLDivElement | null>(null);

  // API theke categories fetch kora (Subcategories shoho)
  const { data: categories, isLoading } = useGetCategoriesQuery(undefined);

  // Shob subcategories ke ekta flat array-te niye asha
  const sublist = categories?.flatMap((cat: any) => cat.subcategories) || [];

  useEffect(() => {
    if (categories) {
      gsap.fromTo(
        ".trust-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
      );
    }
  }, [categories]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1F5E3B]" size={40} />
      </div>
    );

  return (
    <div className="bg-[#fcfcfc] my-6 overflow-hidden">
      {/* ১. Trust Badges */}
      <div className="md:mx-14 mx-4 px-6 md:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Halal Certified",
              desc: "100% Sharia Compliant",
              icon: <CheckCircle className="text-[#1F5E3B]" />,
            },
            {
              title: "Express Delivery",
              desc: "Across Japan in 24h",
              icon: <Truck className="text-[#1F5E3B]" />,
            },
            {
              title: "Japan Quality",
              desc: "Strict Quality Control",
              icon: <ShieldCheck className="text-[#1F5E3B]" />,
            },
            {
              title: "Customer Support",
              desc: "Multi-language Help",
              icon: <Headphones className="text-[#1F5E3B]" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="trust-card bg-white p-6 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-100 transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 bg-[#F1F5F1] rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h5 className="font-bold text-[#1A2E1A] text-sm uppercase">
                  {item.title}
                </h5>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ২. Header Section */}
      <div ref={categorySliderRef} className="my-14 px-4 md:px-14 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#1F5E3B]">
          Shop by Category
        </h2>
        <p className="text-gray-500 mt-2">
          Find your favorite halal essentials quickly
        </p>
      </div>

      {/* ৩. Dynamic Category-wise Product Sections */}
      <div className="mx-4 md:mx-14 px-6 space-y-24 mb-20">
        {sublist.map((sub: any) => (
          <SubCategorySection key={sub._id} sub={sub} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSections;
