import React from "react";
import { NavLink } from "react-router-dom";

const Pickup = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">

      <h1 className="text-3xl font-bold mb-4 text-center">
        Store Pickup
      </h1>

      <p className="text-gray-600 text-center mb-8">
        Pick up your bike at our nearest store at your convenience.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-bold text-lg mb-2">No Delivery Fees</h3>
          <p className="text-gray-600">
            Save money by picking up your order directly
            from our store locations.
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-bold text-lg mb-2">Same-Day Pickup</h3>
          <p className="text-gray-600">
            Orders placed before 12pm may be available
            for pickup the same day.
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-bold text-lg mb-2">Expert Assistance</h3>
          <p className="text-gray-600">
            Our staff will assist you with inspection,
            fitting, and basic setup.
          </p>
        </div>

      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded mt-10">
        <h2 className="text-xl font-bold mb-2">
          Pickup Guidelines
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Bring a valid ID and order confirmation</li>
          <li>Pickup hours: 9am – 6pm (Mon–Sat)</li>
          <li>Uncollected items after 7 days may be returned</li>
          <li>Assembly support available on request</li>
        </ul>
      </div>

      <div className="text-center mt-10">
        <NavLink
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
        >
          Browse Bikes
        </NavLink>
      </div>

    </div>
  );
};

export default Pickup;
