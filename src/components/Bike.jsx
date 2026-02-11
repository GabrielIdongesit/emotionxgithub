// src/components/Bike.jsx
import React, { useState } from "react";
import { data, priceFilters } from "../data/data.js";

const Bike = ({ searchTerm, setSelectedProduct, addToCart }) => {
  const [bikes, setBikes] = useState(data);

  // Filter by type
  const filterType = (category) => {
    if (category === "All") {
      setBikes(data);
    } else {
      setBikes(data.filter((item) => item.category === category));
    }
  };

  // Filter by price (number comparison)
  const filterPrice = (price) => {
    const numericPrice = Number(price); // convert to number
    setBikes(data.filter((item) => Number(item.price) === numericPrice));
  };

  // Search filter
  const filteredBikes = bikes.filter((item) =>
    (item.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  // Format price as USD
  const formatPrice = (price) => {
    const num = Number(price);
    if (!num && num !== 0) return "$0";
    return `$${num.toLocaleString("en-US")}`;
  };

  // WhatsApp share
  const shareOnWhatsApp = (item) => {
    const message = `🔥 ${item.name}
Price: ${formatPrice(item.price)}

${item.description}

Check it out here 👇`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-teal-600 font-bold text-4xl text-center">
        Top Rated Electric Bikes
      </h1>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row justify-between mt-6">
        {/* Type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex flex-wrap mt-2">
            {["All", "AKEZ", "Surron", "StarkVARG", "OUXI", "Bigniu"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() => filterType(type)}
                  className="border-teal-600 text-teal-600 border px-5 py-1 rounded-md hover:bg-teal-600 hover:text-white m-1"
                >
                  {type}
                </button>
              )
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mt-4 lg:mt-0">
          <p className="font-bold text-gray-700">Filter Price</p>
          <div className="flex flex-wrap mt-2">
            {priceFilters.map((price, idx) => (
              <button
                key={idx}
                onClick={() => filterPrice(price)}
                className="border-teal-600 text-teal-600 border px-5 py-1 rounded-md hover:bg-teal-600 hover:text-white m-1"
              >
                {formatPrice(price)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        {filteredBikes.length > 0 ? (
          filteredBikes.map((item) => (
            <div
              key={item.id}
              className="border shadow-2xl rounded-lg overflow-hidden"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  className="w-full h-full object-contain cursor-pointer"
                  src={item.image}
                  alt={item.name}
                  onClick={() => setSelectedProduct(item)}
                />
              </div>

              <div className="flex justify-between px-2 py-4">
                <p className="font-bold">{item.name}</p>
                <span className="bg-teal-500 text-white px-2 rounded-full">
                  {formatPrice(item.price)}
                </span>
              </div>

              <p className="text-gray-800 p-2 text-sm">
                {item.description}
              </p>

              <div className="flex">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-teal-500 text-white w-full py-2 hover:bg-teal-600"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() => shareOnWhatsApp(item)}
                  className="bg-green-500 text-white w-full py-2 hover:bg-green-600"
                >
                  Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No bikes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bike;
