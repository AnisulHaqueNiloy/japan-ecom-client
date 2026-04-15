import { useGetMyOrdersQuery } from "@/redux/features/orderApi";
import {
  Package,
  Calendar,
  ChevronRight,
  Loader2,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserOrderList = () => {
  const navigate = useNavigate();
  // const { locale } = useParams();
  const { data: orderData, isLoading } = useGetMyOrdersQuery(undefined);

  const orders = orderData?.data || [];

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "shipped":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "delivered":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock size={14} />;
      case "delivered":
        return <CheckCircle2 size={14} />;
      case "shipped":
        return <Truck size={14} />;
      default:
        return <XCircle size={14} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#1F5E3B]" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-[#1A2E1A] tracking-tight uppercase flex items-center gap-2">
          <ShoppingBag className="text-[#1F5E3B]" /> My Orders
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Track and manage your recent purchases.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-dashed border-gray-200">
          <Package size={48} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-lg font-black text-[#1A2E1A]">No Orders Found</h3>
          <p className="text-gray-400 text-sm mb-6">
            Looks like you haven't placed any orders yet.
          </p>
          <button
            onClick={() => navigate(`/all_products`)}
            className="px-8 py-3 bg-[#1F5E3B] text-white rounded-full font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders?.map((order: any) => (
            <div
              key={order._id}
              className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1.5 ${getStatusStyle(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                  <span className="text-[10px] font-black text-gray-300 group-hover:text-[#1F5E3B] transition-colors">
                    #{order._id.slice(-6).toUpperCase()}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Items Preview */}
                  <div className="flex -space-x-3 overflow-hidden">
                    {order.orderItems?.slice(0, 3).map((item: any) => (
                      <div
                        key={item._id}
                        className="h-12 w-12 rounded-xl border-2 border-white bg-gray-50 overflow-hidden shadow-sm"
                      >
                        <img
                          src={item.product?.image || item.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                    {order.orderItems?.length > 3 && (
                      <div className="h-12 w-12 rounded-xl border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-500">
                        +{order.orderItems.length - 3}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-black text-[#1A2E1A] text-lg leading-tight">
                      {order.orderItems?.[0]?.product?.name || "Order Item"}
                      {order.orderItems?.length > 1 &&
                        ` +${order.orderItems.length - 1} more`}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-tight">
                      <Calendar size={12} />
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Total Amount
                  </p>
                  <p className="text-xl font-black text-[#1F5E3B]">
                    ¥{order.totalPrice.toLocaleString()}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#1F5E3B] group-hover:text-white transition-all shadow-sm">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderList;
