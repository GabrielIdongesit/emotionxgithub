import React from "react";
import { NavLink } from "react-router-dom";

const Delivery = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">

      <h1 className="text-3xl font-bold mb-4 text-center">
        Home Delivery
      </h1>

      <p className="text-gray-600 text-center mb-8">
        Get your bike delivered safely and quickly to your doorstep.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
          <p className="text-gray-600">
            Orders are processed within 24 hours and delivered
            in 2–5 business days depending on your location.
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-bold text-lg mb-2">Safe Packaging</h3>
          <p className="text-gray-600">
            Every bike is securely packaged and handled by
            trusted logistics partners.
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-bold text-lg mb-2">Affordable Fees</h3>
          <p className="text-gray-600">
            Delivery costs are calculated based on your location
            and displayed before checkout.
          </p>
        </div>

      </div>

      <div className="bg-green-50 border border-green-200 p-6 rounded mt-10">
        <h2 className="text-xl font-bold mb-2">
          What you should know
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Delivery is available nationwide</li>
          <li>Ensure your contact details are correct</li>
          <li>Inspection is allowed on delivery</li>
          <li>Returns accepted within 7 days</li>
        </ul>
      </div>

      <div className="text-center mt-10">
        <NavLink
          to="/"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded"
        >
          Continue Shopping
        </NavLink>
      </div>

    </div>
  );
};

export default Delivery;
