import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.mainichihalalshop.com/api",
    baseUrl: "http://localhost:5000/api",

    credentials: "include",
  }),

  tagTypes: [
    "User", // Profile & Auth
    "Product", // Product list & details
    "Category", // Category & Subcategory
    "Order", // User orders
    "AdminOrder", // Admin order management
    "AdminUser", // Admin user management
    "Review", // Product reviews & ratings
    "DashboardStats", // Admin dashboard summary
    "SubCategory", // Subcategory filters
    "Offer",
    "Orders",
    "Users",
    "Banner",
  ],

  endpoints: () => ({}),
});
