"use client";
import Link from "next/link";

import { anonymousPro } from "@/lib/fonts";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";

const ShoppingCart = () => {
  const { cart, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <div className="md:grid md:grid-cols-3">
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
          className={`${anonymousPro.className} text-black mt-3 text-lg text-bold mb-5`}
        >
          Total price: $ {totalPrice}.00
        </p>
        <div className="mt-5">
          <Link
            href="/checkout"
            className={`${anonymousPro.className} mt-5 bg-gray-800 text-white px-8 py-4 rounded-none shadow-md hover:bg-gray-700 transition duration-300 transform hover:-translate-y-0.5`}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
