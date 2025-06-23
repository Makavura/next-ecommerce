"use client";

import { anonymousPro } from "@/lib/fonts";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";

const ShoppingCart = () => {
  const { cart, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        {cart?.map((product) => (
          <CartItem product={product} key={product.id} />
        ))}
      </div>
      <div className="bg-white rounded-none shadow-2xl border-[0.5] border-slate-950 p-4">
        <p className={`${anonymousPro.className} text-xl text-black`}>
          Order summary
        </p>
        <div className="mx-auto mt-4 h-px bg-gray-600"></div>
        <p
          className={`${anonymousPro.className} text-black mt-3 text-lg text-bold`}
        >
          Total price: $ {totalPrice}.00
        </p>
        <button
          className={`${anonymousPro.className} mt-3 bg-gray-800 text-white px-5 py-2 rounded-none shadow-md hover:bg-gray-700 transition duration-300 transform hover:-translate-y-0.5`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
