// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { Link } from 'react-router-dom';

// interface ProductData {
//   id: number | string;
//   image: string;
//   name?: string;
// }

// const DUMMY_PRODUCTS: ProductData[] = [
//   { id: 1, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400" },
//   { id: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400" },
//   { id: 3, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?q=80&w=400" },
//   { id: 4, image: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=400" },
//   { id: 5, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400" },
// ];

// const RenderRow = ({
//   rowData,
//   index,
//   rowRefs
// }: {
//   rowData: ProductData[],
//   index: number,
//   rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
// }) => {
//   // ১০ বার ডুপ্লিকেট করছি যাতে গ্যাপ না আসে
//   const repeatedData = Array(10).fill(rowData).flat();

//   return (
//     <div className="flex mb-4 overflow-hidden select-none w-full">
//       <div
//         ref={(el) => { rowRefs.current[index] = el; }}
//         className="flex gap-4 flex-nowrap"
//       >
//         {repeatedData.map((item, i) => (
//           <Link key={`${item.id}-${i}`} to={`/en/product/${item.id}`}>
//             <div className="w-[200px] h-[140px] md:w-[350px] md:h-[220px] rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
//               <img
//                 src={item.image}
//                 alt="gallery"
//                 className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700"
//               />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// const RollingGallery = () => {
//   const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     rowRefs.current.forEach((row, index) => {
//       if (!row) return;

//       const totalWidth = row.scrollWidth;
//       const direction = index % 2 === 0 ? -1 : 1;

//       // প্রাথমিক পজিশন সেট করা
//       gsap.set(row, {
//         x: direction === 1 ? -totalWidth / 2 : 0
//       });

//       // অ্যানিমেশন লুপ
//       gsap.to(row, {
//         x: direction === -1 ? -totalWidth / 2 : 0,
//         // স্পিড কমাতে duration বাড়ান (৬০ = ১ মিনিট ধরে এক লুপ ঘুরবে)
//         duration: 60 + (index * 15),
//         ease: "none",
//         repeat: -1,
//       });
//     });

//     return () => {
//       gsap.killTweensOf(rowRefs.current);
//     };
//   }, []);

//   return (
//     <section className="py-20 bg-[#fcfcfc] overflow-hidden w-full">
//       <div className="relative w-full overflow-hidden">
//         <RenderRow rowData={DUMMY_PRODUCTS} index={0} rowRefs={rowRefs} />
//         <RenderRow rowData={[...DUMMY_PRODUCTS].reverse()} index={1} rowRefs={rowRefs} />
//         <RenderRow rowData={DUMMY_PRODUCTS} index={2} rowRefs={rowRefs} />

//         {/* শ্যাডো মাস্ক */}
//         <div className="absolute inset-y-0 left-0 w-24 md:w-80 bg-gradient-to-r from-[#fcfcfc] via-[#fcfcfc]/90 to-transparent z-10 pointer-events-none" />
//         <div className="absolute inset-y-0 right-0 w-24 md:w-80 bg-gradient-to-l from-[#fcfcfc] via-[#fcfcfc]/90 to-transparent z-10 pointer-events-none" />
//       </div>
//     </section>
//   );
// };

// export default RollingGallery;
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import { Loader2 } from "lucide-react";
import { useGetProductsQuery } from "../../../redux/features/admin/products";

// API theke asha product er type (Apnar provided interface onujayi)
interface IProduct {
  _id: string;
  title: string;
  images: string[];
}

const IMG_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RenderRow = ({
  rowData,
  index,
  rowRefs,
}: {
  rowData: IProduct[];
  index: number;
  rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) => {
  // Infinite loop er jonno data repeat kora (at least 10-15 ta items thakle bhalo)
  const repeatedData = Array(10).fill(rowData).flat();

  const getFullImageUrl = (path: string) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${IMG_URL}${path}`;
  };

  return (
    <div className="flex mb-4 overflow-hidden select-none w-full">
      <div
        ref={(el) => {
          rowRefs.current[index] = el;
        }}
        className="flex gap-4 flex-nowrap"
      >
        {repeatedData.map((item, i) => (
          <Link
            key={`${item._id}-${i}`}
            to={`/all_products/details/${item.slug || item._id}`}
          >
            <div className="w-[200px] h-[140px] md:w-[350px] md:h-[220px] rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm bg-gray-50">
              <img
                src={getFullImageUrl(item.images[0])}
                alt={item.title}
                className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const RollingGallery = () => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Real API fetching
  const { data, isLoading, isSuccess } = useGetProductsQuery({ limit: 10 });
  const products = data?.data || [];


  
  console.log(products);

  useEffect(() => {
    // Shudhu jokhon data success-fully load hobe tokhon animation shuru hobe
    if (!isSuccess || products.length === 0) return;

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, index) => {
        if (!row) return;

        const totalWidth = row.scrollWidth;
        const direction = index % 2 === 0 ? -1 : 1;

        // Initial Position
        gsap.set(row, {
          x: direction === 1 ? -totalWidth / 2 : 0,
        });

        // Loop Animation
        gsap.to(row, {
          x: direction === -1 ? -totalWidth / 2 : 0,
          duration: 40 + index * 10, // Speed adjust kora hoyeche
          ease: "none",
          repeat: -1,
        });
      });
    });

    return () => ctx.revert(); // GSAP Cleanup
  }, [isSuccess, products]); // Data load holei animation trigger hobe

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center bg-[#fcfcfc]">
        <Loader2 className="animate-spin text-[#1F5E3B]" size={40} />
      </div>
    );
  }

  // Jodi kono product na thake
  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-[#fcfcfc] overflow-hidden w-full">
      <div className="relative w-full overflow-hidden">
        {/* Row 1: Normal order */}
        <RenderRow rowData={products} index={0} rowRefs={rowRefs} />

        {/* Row 2: Reversed order (jodi products 2 tar beshi thake) */}
        <RenderRow
          rowData={[...products].reverse()}
          index={1}
          rowRefs={rowRefs}
        />

        {/* Row 3: Normal order */}
        <RenderRow rowData={products} index={2} rowRefs={rowRefs} />

        {/* Shadow Masks (Left & Right) */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-80 bg-gradient-to-r from-[#fcfcfc] via-[#fcfcfc]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-80 bg-gradient-to-l from-[#fcfcfc] via-[#fcfcfc]/90 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default RollingGallery;
