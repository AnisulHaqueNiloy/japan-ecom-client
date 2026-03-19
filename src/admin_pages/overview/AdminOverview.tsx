import type { RootState } from '@/redux/store';
import { Package, Clock, CheckCircle2, TrendingUp, ArrowRight, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';

const StatCard = ({ title, value, icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>{icon}</div>
      <div className="flex items-center gap-1 text-green-500 text-[10px] font-black bg-green-50 px-2 py-1 rounded-lg">
        <TrendingUp size={12} /> {trend}%
      </div>
    </div>
    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{title}</p>
    <h3 className="text-3xl font-black text-[#1A2E1A] mt-1">{value}</h3>
  </div>
);

const AdminOverview = () => {
  const navigate = useNavigate();
  const { locale } = useParams();
  const { stats, recentOrders } = useSelector((state: RootState) => state.admin);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* ১. Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#1A2E1A] tracking-tight">Business Overview</h1>
          <p className="text-gray-500 font-medium text-sm">Monitoring your store's performance.</p>
        </div>
      </div>

      {/* ২. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Orders" value={stats?.totalOrders} icon={<Package className="text-blue-600" />} color="bg-blue-600" trend="12" />
        <StatCard title="Pending" value={stats?.pendingOrders} icon={<Clock className="text-orange-600" />} color="bg-orange-600" trend="05" />
        <StatCard title="Completed" value={stats?.completedOrders} icon={<CheckCircle2 className="text-[#1F5E3B]" />} color="bg-[#1F5E3B]" trend="18" />
      </div>

      {/* ৩. Recent Order List */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 flex justify-between items-center border-b border-gray-50">
          <h2 className="text-xl font-black text-[#1A2E1A]">Recent Orders</h2>
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
                <th className="py-5 font-black">Customer Name</th>
                <th className="py-5 font-black">Status</th>
                <th className="py-5 text-right pr-10 font-black">Total Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders?.map((order: any) => (
                <tr key={order.id} className="group hover:bg-[#F8FAF8] transition-colors cursor-pointer">
                  <td className="py-6 pl-10">
                    <span className="font-bold text-[#1A2E1A] text-sm group-hover:text-[#1F5E3B] transition-colors">
                      {order.id}
                    </span>
                  </td>
                  <td className="py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1A2E1A] text-sm">{order.userName}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{order.date}</span>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${
                      order.status === 'Pending' 
                      ? 'bg-orange-50 text-orange-600 border-orange-100' 
                      : 'bg-green-50 text-[#1F5E3B] border-green-100'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-6 text-right pr-10">
                    <span className="font-black text-[#1A2E1A] text-sm">{order.amount}</span>
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