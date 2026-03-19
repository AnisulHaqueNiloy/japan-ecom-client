import { baseApi } from "@/redux/api/baseApi";

// --- Types & Interfaces ---
export interface ISubCategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  category: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  subcategories?: ISubCategory[]; // Nested data-r jonno
}

// API Response type (Jodi success: true ashe)
export interface ICategoryResponse {
  success: boolean;
  data: ICategory[];
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get Categories (Nested)
    // builder.query<ReturnType, ArgumentType>
    getCategories: builder.query<ICategory[], void>({
      query: () => "/admin/categories",
      // Response jodi { success: true, data: [] } hoy, tobe transform kora bhalo
      transformResponse: (response: { data: ICategory[] }) => response.data,
      providesTags: ["Category"],
    }),

    // 2. Add Category
    createCategory: builder.mutation<ICategory, FormData>({
      query: (formData) => ({
        url: "/admin/categories",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    // 3. Add Sub-Category
    createSubCategory: builder.mutation<ISubCategory, FormData>({
      query: (formData) => ({
        url: "/admin/categories/subcategories",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    // 4. Delete Category
    deleteCategory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
