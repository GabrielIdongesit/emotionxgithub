// src/pages/SpareParts.js
import React from "react";
import { data } from "../data/data";

const SpareParts = () => {
  // Filter only spare parts
  const spareParts = data.filter(item => item.type === "spare");

  return (
    <div className="max-w-[1640px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Spare Parts</h1>

      {spareParts.length === 0 ? (
        <p className="text-center text-gray-500">No spare parts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {spareParts.map((spare) => (
            <div
              key={spare.id}
              className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              <img
                src={spare.image}
                alt={spare.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="font-bold text-lg text-center">{spare.name}</h3>
              <p className="text-green-600 font-semibold mt-1">${spare.price}</p>
              <p className="text-gray-600 text-sm text-center mt-2">{spare.description}</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpareParts;
