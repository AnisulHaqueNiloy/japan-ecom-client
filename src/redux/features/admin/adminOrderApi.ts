import { baseApi } from "@/redux/api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Order Place kora (User-er jonno)
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/place-order",
        method: "POST",
        body: orderData,
      }),
      // Order place hole admin list jeno auto refresh hoy
      invalidatesTags: ["Orders"],
    }),

    // 2. Shob Order dekha (Admin-er jonno)
    getAllOrders: builder.query({
      query: () => "/admin/order",
      providesTags: ["Orders"],
    }),

    // 3. Order Status Update kora (Admin-er jonno)
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/order/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),

    // 4. Order Delete kora (Admin-er jonno)
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrderDetails: builder.query({
      query: (id) => `/admin/order/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),

    getDashboardStats: builder.query({
  query: () => "/admin/overview/summary", // Backend route: /api/admin/stats/summary
  providesTags: ["Orders"],
}),
  }),
});

// Hooks gulo export kora hocche
export const {
  usePlaceOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useGetOrderDetailsQuery,
  useGetDashboardStatsQuery
} = orderApi;
