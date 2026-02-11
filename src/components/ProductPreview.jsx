// src/components/ProductPreview.js
import React from "react";

const ProductPreview = ({ product, onClose, addToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 animate-fadeIn">
        
        {/* Product Image */}
        <div className="w-full h-48 md:h-56 overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain cursor-pointer transition-transform hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <h2 className="text-xl font-bold mt-4">{product.name}</h2>

        <p className="text-lg font-semibold mt-1">${product.price}</p>

        <p className="text-sm text-gray-600 mt-2">{product.description}</p>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white w-full py-2 rounded-xl hover:opacity-80 transition"
          >
            Add To Cart
          </button>

          <button
            onClick={onClose}
            className="border w-full py-2 rounded-xl hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
