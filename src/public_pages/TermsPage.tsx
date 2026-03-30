import { CreditCard, Truck, ShieldCheck } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-sans text-[#1A2E1A]">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">
          Terms & Conditions
        </h1>
        <p className="text-gray-500">
          Please read these terms carefully before placing your order.
        </p>
      </header>

      <div className="space-y-12">
        {/* Payment Policy */}
        <section className="flex gap-6 items-start">
          <CreditCard className="text-[#1F5E3B] shrink-0" size={40} />
          <div>
            <h3 className="font-bold text-2xl mb-4">Payment Terms</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              At <strong>Japan Halal Food</strong>, we prioritize your
              convenience. Regardless of your preferred online ordering method,
              we operate on a<strong> Cash-on-Delivery (COD)</strong> basis.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                All payments, including shipping charges, are to be settled in
                cash.
              </li>
              <li>
                Payment must be made directly to the delivery person at the time
                of arrival.
              </li>
              <li>
                Please ensure you have the exact amount ready upon delivery to
                facilitate a smooth transaction.
              </li>
            </ul>
          </div>
        </section>

        {/* Ordering Policy */}
        <section className="flex gap-6 items-start">
          <Truck className="text-[#1F5E3B] shrink-0" size={40} />
          <div>
            <h3 className="font-bold text-2xl mb-4">
              Order Placement & Delivery
            </h3>
            <p className="text-gray-600 leading-relaxed">
              When a customer places an order, it is processed immediately for
              dispatch. By placing an order, you agree to receive the items at
              your provided address and settle the payment upon arrival.
            </p>
          </div>
        </section>

        {/* Security/Trust */}
        <section className="flex gap-6 items-start">
          <ShieldCheck className="text-[#1F5E3B] shrink-0" size={40} />
          <div>
            <h3 className="font-bold text-2xl mb-4">Our Commitment</h3>
            <p className="text-gray-600 leading-relaxed">
              We are committed to providing high-quality service. Our terms are
              designed to ensure transparency and trust between our store and
              our valued customers.
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
        <p>© 2026 Japan Halal Food. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TermsPage;
