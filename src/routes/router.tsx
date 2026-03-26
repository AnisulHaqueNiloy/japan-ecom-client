import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../public_pages/home/Home";
import SearchPage from "../public_pages/search/SearchPage";
import AllProduct from "../public_pages/all_product/AllProduct";
import ProductDetails from "../public_pages/product_details/ProductDetails";
import CartPage from "../public_pages/cart/CartPage";
import AdminLayout from "@/layouts/AdminLayout";
import AdminOverview from "@/admin_pages/overview/AdminOverview";
import AllOrders from "@/admin_pages/OrdersAdmin/AllOrders";
import AddProduct from "@/admin_pages/AddProduct/AddProduct";
import Addcategory from "@/admin_pages/addCategory/Addcategory";
import Userinfo from "@/admin_pages/usersinfo/Userinfo";
import Addbanner from "@/admin_pages/addBanners/Addbanner";
import Addoffer from "@/admin_pages/offers/Addoffer";
import ProductList from "@/admin_pages/allProduct/AllProduct";
import EditProduct from "@/admin_pages/editProduct/EditProduct";
import LoginPage from "@/authPages/LoginPage";
import RegisterPage from "@/authPages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
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
        path: "product/:slug",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminOverview />,
      },
      {
        path: "orders",
        element: <AllOrders />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "all-product",
        element: <ProductList></ProductList>,
      },
      {
        path: "add-categories",
        element: <Addcategory />,
      },
      {
        path: "users",
        element: <Userinfo />,
      },
      {
        path: "banners",
        element: <Addbanner />,
      },
      {
        path: "offers",
        element: <Addoffer />,
      },
    ],
  },

  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <Navigate to="/en" replace />,
  },
]);
