import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setOrderModal } from '@/redux/features/admin/adminSlice';
import { X, User, MapPin, Phone, Package, CreditCard } from 'lucide-react';

const OrderDetailsModal = () => {
  const dispatch = useDispatch();
  const { selectedOrderId, recentOrders } = useSelector((state: RootState) => state.admin);

  // ডামি ডাটা থেকে নির্দিষ্ট অর্ডারটি খুঁজে বের করা
  const order = recentOrders.find((o: any) => o.id === selectedOrderId);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-[#F8FAF8]">
          <div>
            <h2 className="text-xl font-black text-[#1A2E1A]">Order Details</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{order.id}</p>
          </div>
          <button 
            onClick={() => dispatch(setOrderModal({ id: null, open: false }))}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
          
          {/* User & Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                <User size={14} /> Customer Information
              </h4>
              <div className="bg-[#F8FAF8] p-4 rounded-2xl border border-gray-100">
                <p className="font-bold text-[#1A2E1A]">{order.userName}</p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1"><Phone size={12} /> +81 90-1234-5678</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                <MapPin size={14} /> Shipping Address
              </h4>
              <div className="bg-[#F8FAF8] p-4 rounded-2xl border border-gray-100 text-sm text-gray-500 leading-relaxed">
                123 Halal Street, Shinjuku, <br /> Tokyo 160-0022, Japan
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
              <Package size={14} /> Ordered Items
            </h4>
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black">
                  <tr>
                    <th className="py-3 px-4 text-left">Item</th>
                    <th className="py-3 px-4 text-center">Qty</th>
                    <th className="py-3 px-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-4 px-4 font-bold">Premium Basmati Rice</td>
                    <td className="py-4 px-4 text-center">2</td>
                    <td className="py-4 px-4 text-right font-bold">¥3,000</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-bold">Halal Chicken Thigh</td>
                    <td className="py-4 px-4 text-center">1</td>
                    <td className="py-4 px-4 text-right font-bold">¥1,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Summary & Status Update */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-4 border-t border-gray-50">
            <div className="w-full md:w-1/2 space-y-4">
               <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Update Order Status</h4>
               <select className="w-full bg-[#F8FAF8] border border-gray-200 p-3 rounded-xl font-bold text-sm focus:outline-none focus:border-[#1F5E3B]">
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
               </select>
            </div>
            
            <div className="w-full md:w-1/3 bg-[#1F5E3B] p-6 rounded-[2rem] text-white shadow-xl shadow-green-100">
               <div className="flex justify-between items-center opacity-80 text-xs mb-2 uppercase font-black tracking-widest">
                  <span>Subtotal</span>
                  <span>¥4,500</span>
               </div>
               <div className="flex justify-between items-center border-t border-white/20 pt-2 font-black text-xl">
                  <span>Total</span>
                  <span>{order.amount}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 flex justify-end gap-4">
           <button className="px-6 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-100 transition-all">
              Print Invoice
           </button>
           <button 
             className="px-8 py-3 bg-[#1F5E3B] text-white rounded-xl font-black text-sm shadow-lg shadow-green-200 hover:scale-105 active:scale-95 transition-all"
           >
              Save Changes
           </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;