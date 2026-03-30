import { RefreshCw, ShieldCheck, HelpCircle } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-sans text-[#1A2E1A]">
      <header className="mb-12">
        <h1 className="text-4xl font-black uppercase mb-4">
          Return & Refund Policy
        </h1>
        <p className="text-gray-500">
          Your satisfaction is our top priority. We strive to make your shopping
          experience hassle-free.
        </p>
      </header>

      <div className="space-y-10">
        {/* Hassle Free Promise */}
        <div className="flex gap-6 items-start">
          <ShieldCheck className="text-[#1F5E3B] shrink-0" size={40} />
          <div>
            <h3 className="font-bold text-xl mb-2">Our Hassle-Free Promise</h3>
            <p className="text-gray-600 leading-relaxed">
              We want you to be completely satisfied with your purchase. If for
              any reason you are not happy with our products, we offer a
              straightforward,
              <strong> hassle-free return policy</strong> to ensure your peace
              of mind.
            </p>
          </div>
        </div>

        {/* The "Latemodel Restoration Supply" Policy */}
        <div className="flex gap-6 items-start">
          <RefreshCw className="text-[#1F5E3B] shrink-0" size={40} />
          <div>
            <h3 className="font-bold text-xl mb-2">
              "Latemodel Restoration Supply"
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our <strong>"Latemodel Restoration Supply"</strong> return
              initiative is designed to make your shopping experience smoother.
              If you find our products unsatisfactory, you are eligible for a{" "}
              <strong>full refund</strong>. We believe in building trust, so
              returning an item with us is quick and simple.
            </p>
          </div>
        </div>

        {/* How to initiate */}
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex gap-6">
          <HelpCircle className="text-[#1F5E3B] shrink-0" size={40} />
          <div>
            <h3 className="font-bold text-xl mb-2">How to Request a Refund?</h3>
            <p className="text-gray-600 mb-4">
              If you wish to return a product, please contact our support team
              with your <strong>Order ID</strong>. We will guide you through the
              restoration process, and once the return is verified, your refund
              will be processed promptly.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-[#1A2E1A] text-white rounded-2xl text-center">
        <p className="font-bold">Need help with a return?</p>
        <p className="text-gray-300 text-sm">
          Contact us at support@japanhalalfood.com
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
