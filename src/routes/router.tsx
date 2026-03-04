import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../public_pages/home/Home";
import SearchPage from "../public_pages/search/SearchPage";
import AllProduct from "../public_pages/all_product/AllProduct";
import ProductDetails from "../public_pages/product_details/ProductDetails";
import CartPage from "../public_pages/cart/CartPage";

export const router = createBrowserRouter([
  {
    path: "/:locale",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search/:query",
        element: <SearchPage />,
      },
      {
        path: "all_products",
        element: <AllProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/en" replace />,
  },
]);
