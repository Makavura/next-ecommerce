"use client";

import Image from "next/image";
import { ICartItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";

const CartItem = ({ product }: { product: ICartItem }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col md:flex-row bg-white mb-3 shadow-lg overflow-hidden w-full max-w-2xl">
      <div className="relative w-full md:w-1/3 bg-gray-200 flex items-center justify-center p-3">
        <Image
          width={200}
          height={200}
          alt={product.title}
          src={product.images[0]}
          className="rounded-sm object-cover w-full h-auto"
        />
      </div>

      <div className="w-full md:w-2/3 p-3 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
          <div className="fle flex-col">
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              title="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM88,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H88ZM200,72H56V208a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16ZM88,104v72a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v72a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v72a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
              </svg>
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-6 flex-grow">
          {product.description.slice(0, 90)}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center">
            <button
              onClick={() => updateQuantity(product.id, -1)}
              className="bg-gray-900 text-white px-3 py-1 text-lg font-semibold focus:outline-none transition-colors duration-200"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-4 py-1 text-lg font-semibold bg-gray-900 text-white">
              {product.quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, 1)}
              className="bg-gray-900 px-3 py-1 text-white text-lg font-semibold focus:outline-none transition-colors duration-200"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
