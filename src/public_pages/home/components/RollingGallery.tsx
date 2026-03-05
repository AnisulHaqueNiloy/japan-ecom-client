import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

interface ProductData {
  id: number | string;
  image: string;
  name?: string;
}

const DUMMY_PRODUCTS: ProductData[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400" },
  { id: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400" },
  { id: 3, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?q=80&w=400" },
  { id: 4, image: "https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=400" },
  { id: 5, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400" },
];

const RenderRow = ({ 
  rowData, 
  index, 
  rowRefs 
}: { 
  rowData: ProductData[], 
  index: number, 
  rowRefs: React.MutableRefObject<(HTMLDivElement | null)[]> 
}) => {
  // ১০ বার ডুপ্লিকেট করছি যাতে গ্যাপ না আসে
  const repeatedData = Array(10).fill(rowData).flat();

  return (
    <div className="flex mb-4 overflow-hidden select-none w-full">
      <div 
        ref={(el) => { rowRefs.current[index] = el; }} 
        className="flex gap-4 flex-nowrap"
      >
        {repeatedData.map((item, i) => (
          <Link key={`${item.id}-${i}`} to={`/en/product/${item.id}`}>
            <div className="w-[200px] h-[140px] md:w-[350px] md:h-[220px] rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
              <img 
                src={item.image} 
                alt="gallery" 
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

  useEffect(() => {
    rowRefs.current.forEach((row, index) => {
      if (!row) return;

      const totalWidth = row.scrollWidth;
      const direction = index % 2 === 0 ? -1 : 1;

      // প্রাথমিক পজিশন সেট করা
      gsap.set(row, {
        x: direction === 1 ? -totalWidth / 2 : 0
      });

      // অ্যানিমেশন লুপ
      gsap.to(row, {
        x: direction === -1 ? -totalWidth / 2 : 0,
        // স্পিড কমাতে duration বাড়ান (৬০ = ১ মিনিট ধরে এক লুপ ঘুরবে)
        duration: 60 + (index * 15), 
        ease: "none",
        repeat: -1,
      });
    });

    return () => {
      gsap.killTweensOf(rowRefs.current);
    };
  }, []);

  return (
    <section className="py-20 bg-[#fcfcfc] overflow-hidden w-full">
      <div className="relative w-full overflow-hidden">
        <RenderRow rowData={DUMMY_PRODUCTS} index={0} rowRefs={rowRefs} />
        <RenderRow rowData={[...DUMMY_PRODUCTS].reverse()} index={1} rowRefs={rowRefs} />
        <RenderRow rowData={DUMMY_PRODUCTS} index={2} rowRefs={rowRefs} />
        
        {/* শ্যাডো মাস্ক */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-80 bg-gradient-to-r from-[#fcfcfc] via-[#fcfcfc]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-80 bg-gradient-to-l from-[#fcfcfc] via-[#fcfcfc]/90 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default RollingGallery;