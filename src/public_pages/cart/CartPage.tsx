import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Loader2,
  MapPin,
  Phone,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import type { RootState } from "@/redux/store";

import { useGetMeQuery } from "@/redux/features/authApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { usePlaceOrderMutation } from "@/redux/features/orderApi";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { data: user } = useGetMeQuery(undefined);
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();

  // Shipping States (Based on Order Model)
  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  // Totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const tax = Math.round(subtotal * 0.08);
  const shippingFee = cartItems.length > 0 ? 1100 : 0;
  const total = subtotal + tax + shippingFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user)
      return Swal.fire(
        "Login Required",
        "Please login to place an order",
        "warning",
      );
    if (
      !shipping.address ||
      !shipping.city ||
      !shipping.postalCode ||
      !shipping.phone
    ) {
      return Swal.fire(
        "Missing Info",
        "Please fill all shipping fields",
        "info",
      );
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.img,
        price: item.price,
        product: item.id,
      })),
      shippingAddress: shipping,
      paymentMethod: "COD",
      totalPrice: total,
      userEmail: user.email,
    };

    try {
      await placeOrder(orderData).unwrap();
      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Thank you for shopping with Japan Halal Food.",
        confirmButtonColor: "#1F5E3B",
      });
      dispatch(clearCart());
      navigate("/all_products");
    } catch (err: any) {
      Swal.fire("Error", err?.data?.message || "Order failed", "error");
    }
  };

  return (
    <div className="notranslate md:mx-14 mx-4 py-12 bg-white min-h-[80vh] font-sans">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-[#1A2E1A] mb-2 uppercase tracking-tight">
          Checkout Bag
        </h1>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
          {cartItems.length} Items Selected
        </p>
      </header>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Left: Cart Items & Shipping Form */}
          <div className="xl:col-span-8 space-y-12">
            {/* 1. Items List */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase text-[#1A2E1A] border-l-4 border-[#1F5E3B] pl-3 mb-6">
                1. Review Your Items
              </h3>
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex flex-wrap md:flex-nowrap items-center gap-6 py-4"
                  >
                    <img
                      src={item.img}
                      className="w-20 h-20 rounded-2xl object-cover bg-gray-50 border"
                      alt={item.name}
                    />
                    <div className="flex-1 min-w-[200px]">
                      <h4 className="font-bold text-[#1A2E1A] text-lg">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({ id: item.id, delta: -1 }),
                              )
                            }
                            className="p-1 hover:text-[#1F5E3B]"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 font-black text-xs">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({ id: item.id, delta: 1 }),
                              )
                            }
                            className="p-1 hover:text-[#1F5E3B]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right w-full md:w-auto">
                      <p className="text-sm text-gray-400 font-bold uppercase">
                        Total
                      </p>
                      <p className="font-black text-xl text-[#1A2E1A]">
                        ¥{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 2. Shipping Address Form */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase text-[#1A2E1A] border-l-4 border-[#1F5E3B] pl-3">
                2. Shipping Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                    Full Address
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-3 text-gray-300"
                      size={18}
                    />
                    <Input
                      placeholder="Street address, Apartment, Suite"
                      className="pl-12 h-12 rounded-xl bg-white border-none shadow-sm"
                      value={shipping.address}
                      onChange={(e) =>
                        setShipping({ ...shipping, address: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                    City / Prefecture
                  </label>
                  <Input
                    placeholder="e.g. Tokyo, Chiba"
                    className="h-12 rounded-xl bg-white border-none shadow-sm"
                    value={shipping.city}
                    onChange={(e) =>
                      setShipping({ ...shipping, city: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                    Postal Code
                  </label>
                  <div className="relative">
                    <Hash
                      className="absolute left-4 top-3 text-gray-300"
                      size={18}
                    />
                    <Input
                      placeholder="123-4567"
                      className="pl-12 h-12 rounded-xl bg-white border-none shadow-sm"
                      value={shipping.postalCode}
                      onChange={(e) =>
                        setShipping({ ...shipping, postalCode: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-3 text-gray-300"
                      size={18}
                    />
                    <Input
                      placeholder="080-XXXX-XXXX"
                      className="pl-12 h-12 rounded-xl bg-white border-none shadow-sm"
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping({ ...shipping, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Sticky Card */}
          <div className="xl:col-span-4">
            <div className="bg-[#1A2E1A] text-white rounded-[2.5rem] p-8 sticky top-10 shadow-2xl shadow-green-900/20">
              <h2 className="text-xl font-black mb-8 uppercase tracking-widest flex justify-between items-center">
                Summary{" "}
                <span className="text-[10px] bg-[#1F5E3B] px-3 py-1 rounded-full italic">
                  COD
                </span>
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">
                    ¥{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <span>Tax (8%)</span>
                  <span className="text-white">¥{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest pb-4 border-b border-white/10">
                  <span>Shipping</span>
                  <span className="text-white">
                    ¥{shippingFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-lg font-black uppercase">
                    Grand Total
                  </span>
                  <span className="text-4xl font-black text-[#4ADE80]">
                    ¥{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isPlacingOrder}
                className="w-full bg-[#1F5E3B] hover:bg-[#287a4d] text-white rounded-2xl h-16 font-black text-lg gap-3 transition-all active:scale-95 group border-none"
              >
                {isPlacingOrder ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Confirm Order{" "}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </>
                )}
              </Button>

              <div className="mt-6 flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter leading-tight">
                  By clicking, you agree to pay on delivery at your provided
                  address.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-100 flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
            <Trash2 className="text-gray-200" size={40} />
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs mb-8">
            Your cart is empty
          </p>
          <Button
            variant="outline"
            className="rounded-full px-10 h-12 font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
