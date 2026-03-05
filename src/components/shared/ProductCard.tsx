import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }: { product: any }) => (
  <Link to={'/en/product/:1'}>
  <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-50 transition-all hover:shadow-2xl">
    <div className="relative aspect-square overflow-hidden bg-gray-50">
      {product.tag && (
        <span className="absolute top-4 left-4 bg-[#1F5E3B] text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 uppercase">
          {product.tag}
        </span>
      )}
      <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm z-10">
        <Heart size={18} />
      </button>
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    </div>
    <div className="p-6">
      <p className="text-[#1F5E3B] text-[10px] font-black tracking-widest uppercase mb-1 opacity-70">{product.category}</p>
      <h3 className="font-bold text-[#1A2E1A] text-md mb-2 line-clamp-1">{product.name}</h3>
      <div className="flex items-center gap-1 mb-4 text-[#FACC15]">
        <Star size={12} fill="currentColor" />
        <span className="text-[10px] font-bold text-gray-800">{product.rating}</span>
        <span className="text-[10px] text-gray-400 font-medium">({product.reviews})</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-black text-[#1A2E1A]">{product.price}</p>
          {product.oldPrice && <p className="text-xs text-gray-400 line-through">{product.oldPrice}</p>}
        </div>
        <button className="bg-[#1F5E3B] text-white p-3 rounded-2xl hover:bg-[#16432a] transition-all shadow-lg">
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  </div></Link>
);

export default ProductCard;