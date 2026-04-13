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
import OrderDetails from "@/admin_pages/OrdersAdmin/OrderDetails";
import UserLayout from "@/layouts/UserLayout";
import UserOrderList from "@/user_pages/UserOrderList";
import ProfileSetting from "@/user_pages/ProfileSetting";
import AdminGuard from "./AdminGuarg";
import ShippingPolicy from "@/public_pages/ShippingPolicy/ShippingPolicy";
import ReturnPolicy from "@/public_pages/ReturnPolicy/ReturnPolicy";
import TermsPage from "@/public_pages/TermsPage";
import Contact from "@/public_pages/Contact";
import { useEffect } from "react";
function ErrorBoundary() {
  useEffect(() => {
    window.location.reload();
  }, []);

  return null;
}
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
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
      {
        path: "shipping-policy",
        element: <ShippingPolicy />,
      },
      {
        path: "return-policy",
        element: <ReturnPolicy />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <UserOrderList />,
      },
      {
        path: "profile",
        element: <ProfileSetting />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminGuard />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminOverview /> },
          { path: "orders", element: <AllOrders /> },
          { path: "orders/:id", element: <OrderDetails /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "edit-product/:id", element: <EditProduct /> },
          { path: "all-product", element: <ProductList /> },
          { path: "add-categories", element: <Addcategory /> },
          { path: "users", element: <Userinfo /> },
          { path: "banners", element: <Addbanner /> },
          { path: "offers", element: <Addoffer /> },
        ],
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
