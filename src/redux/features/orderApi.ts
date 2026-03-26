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
  }),
});

export const { usePlaceOrderMutation } = orderApi;
