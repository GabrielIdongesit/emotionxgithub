import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

const Cart = ({ cart, increaseQty, decreaseQty, removeItem }) => {

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/" className="text-teal-600 underline">
            Click here to add bikes
          </Link>
        </p>
      ) : (
        <div className="bg-white p-4 shadow rounded">

          {cart.map(item => {
            const price = Number(item.price) || 0;
            const qty = Number(item.qty) || 1;

            return (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <p className="font-semibold">{item.name}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => decreaseQty(item.id)}>
                    <AiOutlineMinus />
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => increaseQty(item.id)}>
                    <AiOutlinePlus />
                  </button>
                </div>

                <p className="font-bold">
                  ${(price * qty).toFixed(2)}
                </p>

                <button onClick={() => removeItem(item.id)}>
                  <BsFillTrashFill />
                </button>
              </div>
            );
          })}

          <hr className="my-4" />

          <h3 className="text-xl font-bold">
            Total: ${total.toFixed(2)}
          </h3>

          <Link
            to="/checkout"
            className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded"
          >
            Proceed to Checkout
          </Link>

        </div>
      )}
    </div>
  );
};

export default Cart;
