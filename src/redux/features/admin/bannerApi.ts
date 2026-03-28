import { baseApi } from "../../api/baseApi";

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => "/admin/banners",
      providesTags: ["Banner"],
    }),
    addBanner: builder.mutation({
      query: (formData) => ({
        url: "/admin/banners",
        method: "POST",
        body: formData, // FormData pathate hobe file thakle
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/admin/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const { 
  useGetBannersQuery, 
  useAddBannerMutation, 
  useDeleteBannerMutation 
} = bannerApi;