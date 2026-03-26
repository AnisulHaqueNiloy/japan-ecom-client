import { baseApi } from "@/redux/api/baseApi";

const offerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOffer: builder.query({
      query: () => ({
        url: "/admin/offers",
        method: "GET",
      }),
      providesTags: ["Offer"],

      transformResponse: (response: any) => response?.data || response,
    }),

    updateOffer: builder.mutation({
      query: (data) => ({
        url: "/admin/offers",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Offer"],
    }),

    
  }),
});

export const { useGetOfferQuery, useUpdateOfferMutation } = offerApi;
