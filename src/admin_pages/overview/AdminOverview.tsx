import { 
  Package, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  Loader2, 
  Truck, 
  XCircle, 
  BarChart3 
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDashboardStatsQuery, useGetAllOrdersQuery } from "@/redux/features/admin/adminOrderApi"; 

const StatCard = ({ title, value, icon, color, trend }: any) => (
  <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>{icon}</div>
      <div className="flex items-center gap-1 text-green-500 text-[9px] font-black bg-green-50 px-2 py-1 rounded-lg">
        <TrendingUp size={10} /> {trend}%
      </div>
    </div>
    <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">{title}</p>
    <h3 className="text-2xl font-black text-[#1A2E1A] mt-1">{value || 0}</h3>
  </div>
);

const AdminOverview = () => {
  const navigate = useNavigate();
  const { locale } = useParams();

  const { data: statsData, isLoading: statsLoading } = useGetDashboardStatsQuery(undefined);
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery(undefined);

  const stats = statsData?.data;
  const recentOrders = ordersData?.data?.slice(0, 5) || [];

  if (statsLoading || ordersLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#1F5E3B]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-6">
      
      {/* ১. Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#1A2E1A] tracking-tight uppercase">Dashboard</h1>
          <p className="text-gray-500 font-medium text-sm">Welcome back! Here is what's happening today.</p>
        </div>
      </div>

      {/* ২. Top Stats (Revenue & Products) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-[#1A2E1A] p-8 rounded-[2.5rem] text-white flex justify-between items-center shadow-xl shadow-gray-200">
            <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Revenue</p>
                <h2 className="text-4xl font-black">¥{stats?.totalRevenue?.toLocaleString()}</h2>
            </div>
            <div className="h-16 w-16 bg-white/10 rounded-3xl flex items-center justify-center">
                <BarChart3 size={32} className="text-[#34D399]" />
            </div>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex justify-between items-center shadow-sm">
            <div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Inventory</p>
                <h2 className="text-4xl font-black text-[#1A2E1A]">{stats?.totalProducts} <span className="text-sm font-medium text-gray-400">Items</span></h2>
            </div>
            <div className="h-16 w-16 bg-blue-50 rounded-3xl flex items-center justify-center">
                <Package size={32} className="text-blue-600" />
            </div>
         </div>
      </div>

      {/* ৩. Order Status Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          title="Pending" 
          value={stats?.orders?.pending} 
          icon={<Clock className="text-amber-600" />} 
          color="bg-amber-600" 
          trend="02" 
        />
        <StatCard 
          title="Confirmed" 
          value={stats?.orders?.confirmed} 
          icon={<CheckCircle2 className="text-blue-600" />} 
          color="bg-blue-600" 
          trend="12" 
        />
        <StatCard 
          title="Shipped" 
          value={stats?.orders?.shipped} 
          icon={<Truck className="text-purple-600" />} 
          color="bg-purple-600" 
          trend="08" 
        />
        <StatCard 
          title="Delivered" 
          value={stats?.orders?.delivered} 
          icon={<CheckCircle2 className="text-emerald-600" />} 
          color="bg-emerald-600" 
          trend="15" 
        />
        <StatCard 
          title="Cancelled" 
          value={stats?.orders?.cancelled} 
          icon={<XCircle className="text-red-600" />} 
          color="bg-red-600" 
          trend="01" 
        />
      </div>

      {/* ৪. Recent Order List */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 flex justify-between items-center border-b border-gray-50">
          <h2 className="text-xl font-black text-[#1A2E1A] uppercase tracking-tight">Recent Orders</h2>
          <button 
            onClick={() => navigate(`/${locale}/admin/orders`)}
            className="text-[#1F5E3B] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] bg-[#FCFCFC]">
                <th className="py-5 pl-10 font-black">Order ID</th>
                <th className="py-5 font-black">Customer</th>
                <th className="py-5 font-black">Status</th>
                <th className="py-5 text-right pr-10 font-black">Total Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order: any) => (
                <tr 
                  key={order._id} 
                  onClick={() => navigate(`/${locale}/admin/orders/${order._id}`)}
                  className="group hover:bg-[#F8FAF8] transition-colors cursor-pointer"
                >
                  <td className="py-6 pl-10">
                    <span className="font-mono text-xs text-gray-400 group-hover:text-[#1F5E3B] transition-colors">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </td>
                  <td className="py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1A2E1A] text-sm">{order.user?.name || "Guest User"}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                      order.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      order.status === 'Shipped' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                      order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                      'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-6 text-right pr-10">
                    <span className="font-black text-[#1A2E1A] text-sm">¥{order.totalPrice.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;