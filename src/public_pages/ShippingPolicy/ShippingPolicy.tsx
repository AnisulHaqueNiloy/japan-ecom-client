import { Truck, Clock, Phone, CreditCard, MapPin } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-sans">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-[#1A2E1A] uppercase mb-4">
          Shipping & Delivery Policy
        </h1>
        <p className="text-gray-500">
          We ensure your orders are delivered safely and efficiently across
          Japan.
        </p>
      </header>

      <div className="grid gap-8">
        {/* Delivery Method */}
        <div className="flex gap-4">
          <Truck className="text-[#1F5E3B] mt-1" size={30} />
          <div>
            <h3 className="font-bold text-lg text-[#1A2E1A]">
              Delivery Method
            </h3>
            <p className="text-gray-600">
              All our products are shipped via Japan's reliable standard surface
              delivery services, known as <strong>'Takkyubin'</strong>. We
              exclusively partner with
              <strong> Sagawa Takkyubin</strong> and{" "}
              <strong>Yamato Takkyubin</strong> to ensure quality service.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex gap-4">
          <Clock className="text-[#1F5E3B] mt-1" size={30} />
          <div>
            <h3 className="font-bold text-lg text-[#1A2E1A]">
              Order & Delivery Timeline
            </h3>
            <p className="text-gray-600">
              Order before <strong>2:00 PM</strong> to qualify for{" "}
              <strong>next-day delivery</strong>. Our service covers all areas
              within Japan.
            </p>
          </div>
        </div>

        {/* Confirmation */}
        <div className="flex gap-4">
          <Phone className="text-[#1F5E3B] mt-1" size={30} />
          <div>
            <h3 className="font-bold text-lg text-[#1A2E1A]">
              Order Confirmation
            </h3>
            <p className="text-gray-600">
              To ensure accuracy, you will receive a{" "}
              <strong>confirmation call</strong> from our team before your
              package is dispatched.
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex gap-4">
          <CreditCard className="text-[#1F5E3B] mt-1" size={30} />
          <div>
            <h3 className="font-bold text-lg text-[#1A2E1A]">Payment Method</h3>
            <p className="text-gray-600">
              We operate exclusively on <strong>Cash-on-Delivery (COD)</strong>.
              The total bill amount is to be paid directly to the delivery
              person upon receiving your package.
            </p>
          </div>
        </div>

        {/* Shipping Charges */}
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <MapPin className="text-[#1F5E3B]" size={30} />
            <h3 className="font-bold text-xl text-[#1A2E1A]">
              Shipping Areas & Charges
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-bold">Tokyo Area</span>
              <span className="text-[#1F5E3B] font-black">1,000 JPY</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="font-bold">Osaka & Other Prefectures</span>
              <span className="text-[#1F5E3B] font-black">1,200 JPY</span>
            </div>
          </div>
          <p className="text-[12px] text-gray-400 mt-6 italic">
            *Note: Shipping charges are subject to change based on specific
            customer location and package weight.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
