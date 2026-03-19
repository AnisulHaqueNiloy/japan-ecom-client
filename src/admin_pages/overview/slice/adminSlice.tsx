import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// অর্ডারের ইন্টারফেস
interface Order {
  id: string;
  userName: string;
  status: 'Pending' | 'Completed' | 'Processing';
  amount: string;
  date: string;
}

interface AdminState {
  selectedOrderId: string | null;
  isOrderModalOpen: boolean;
  stats: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
  };
  recentOrders: Order[]; // রিসেন্ট অর্ডারের জন্য স্টেট
}

const initialState: AdminState = {
  selectedOrderId: null,
  isOrderModalOpen: false,
  stats: {
    totalOrders: 1250,
    pendingOrders: 45,
    completedOrders: 1205
  },
  // এখানে ডামি অর্ডার ডাটা যোগ করা হলো
  recentOrders: [
    { 
      id: '#JPN-9901', 
      userName: 'Ariful Islam', 
      status: 'Pending', 
      amount: '¥4,500', 
      date: '2 mins ago' 
    },
    { 
      id: '#JPN-9902', 
      userName: 'Tanvir Ahmed', 
      status: 'Completed', 
      amount: '¥12,200', 
      date: '1 hour ago' 
    },
    { 
      id: '#JPN-9903', 
      userName: 'Sakib Khan', 
      status: 'Pending', 
      amount: '¥2,100', 
      date: '3 hours ago' 
    },
    { 
      id: '#JPN-9904', 
      userName: 'Naimur Rahman', 
      status: 'Completed', 
      amount: '¥7,800', 
      date: '5 hours ago' 
    },
    { 
      id: '#JPN-9905', 
      userName: 'Rashedul Islam', 
      status: 'Completed', 
      amount: '¥3,450', 
      date: 'Yesterday' 
    },
  ]
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setOrderModal: (state, action: PayloadAction<{ id: string | null; open: boolean }>) => {
      state.selectedOrderId = action.payload.id;
      state.isOrderModalOpen = action.payload.open;
    },
    // এপিআই থেকে ডাটা পাওয়ার পর আপডেট করার জন্য রিডিউসার এখানে যোগ করা যাবে
    setRecentOrders: (state, action: PayloadAction<Order[]>) => {
      state.recentOrders = action.payload;
    }
  },
});

export const { setOrderModal, setRecentOrders } = adminSlice.actions;
export default adminSlice.reducer;