import { useParams, useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
   
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  
  Package, 
  CreditCard,
  Loader2
} from "lucide-react";
import { useGetOrderDetailsQuery } from "@/redux/features/admin/adminOrderApi";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Apnar API hook onujayi data fetch korun
  const { data: orderData, isLoading } = useGetOrderDetailsQuery(id);
  const order = orderData?.data;

  if (isLoading) { 
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#1F5E3B]" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6  font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="group -ml-2 text-gray-500 hover:text-[#1F5E3B]"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Orders
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#1A2E1A]">Order #{order?._id.slice(-6).toUpperCase()}</h1>
            <Badge className="bg-[#1F5E3B] hover:bg-[#1F5E3B]">{order?.status}</Badge>
          </div>
          <div className="flex items-center text-sm text-gray-500 gap-4">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(order?.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-1.5"><Package size={14} /> {order?.orderItems.length} Items</span>
          </div>
        </div>
        
        {/* <Button className="bg-[#1F5E3B] hover:bg-[#164229] gap-2 rounded-xl h-11 px-6 shadow-lg shadow-[#1F5E3B]/20">
          <Printer size={18} /> Print Invoice
        </Button> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Items and Totals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <h2 className="font-bold text-[#1A2E1A] flex items-center gap-2">
                <Package size={18} className="text-[#1F5E3B]" /> Order Items
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {order?.orderItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-2xl border border-gray-100 overflow-hidden bg-gray-50 shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#1A2E1A] text-lg truncate">{item.name}</h4>
                      <p className="text-sm text-gray-400">Qty: {item.qty} × ¥{item.price.toLocaleString()}</p>
                    </div>
                    <p className="font-black text-lg text-[#1A2E1A]">¥{(item.qty * item.price).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Summary Container */}
            <div className="p-8 bg-gray-50 border-t border-gray-100">
              <div className="space-y-3 max-w-xs ml-auto">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold">¥{(order?.totalPrice - 148).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping Fee</span>
                  <span className="font-bold">¥148</span>
                </div>
                <div className="h-px bg-gray-200 my-4" />
                <div className="flex justify-between text-[#1A2E1A] text-xl font-black">
                  <span>Total</span>
                  <span>¥{order?.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Customer & Shipping Details */}
        <div className="space-y-6">
          {/* Customer Card */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Customer Details</h3>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#1F5E3B]/10 flex items-center justify-center text-[#1F5E3B]">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#1A2E1A]">{order?.user?.name}</p>
                  <p className="text-xs text-gray-500">{order?.user?.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={16} className="text-gray-400" />
                {order?.shippingAddress?.phone}
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <span>
                  {order?.shippingAddress?.address},<br />
                  {order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-[#1A2E1A] rounded-[2rem] p-6 text-white space-y-4 shadow-xl shadow-gray-200">
            <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Payment Info</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <span className="font-bold uppercase tracking-wider">{order?.paymentMethod}</span>
              </div>
              <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-400/10">
                Paid
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;