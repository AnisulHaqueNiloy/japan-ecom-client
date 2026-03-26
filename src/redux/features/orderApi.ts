import { baseApi } from "../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/place-order",
        method: "POST",
        body: orderData,
      }),
    }),
    getMyOrders: builder.query({
  query: () => "/user/my-orders", // Backend path: app.use("/api/user") + router.get("/my-orders")
  providesTags: ["Orders"],
}),
  }),
});

export const { usePlaceOrderMutation ,useGetMyOrdersQuery } = orderApi;
