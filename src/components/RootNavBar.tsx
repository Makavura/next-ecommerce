"use client";

import Image from "next/image";

import { useCart } from "@/context/CartContext";

const RootNavBar = () => {
  const { getTotalItems } = useCart();

  const cartItemCount = getTotalItems();

  return (
    <nav className="py-4 shadow-lg font-[family-name:var(--font-geist-mono)]">
      <div className="container mx-auto flex justify-between items-center mt-3">
        <a
          href="#"
          className="text-xl md:text-2xl font-bold tracking-wide flex flex-row"
        >
          <Image
            src="/shopping-bag.svg"
            alt="E-commerce store-front"
            className="mr-5"
            height={42}
            width={42}
          />
          <span className="my-auto">The E-Commerce Store-Front</span>
        </a>
        <div className="flex items-center space-x-4 md:space-x-6">
          <a
            href="#"
            className="relative flex items-center justify-center w-14 h-14 rounded-full border-slate-600 border-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="m-auto"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>

            <span
              className="absolute -top-1 -right-1 text-sm font-bold w-6 h-6 flex items-center 
          justify-center rounded-full border-2 border-slate-500"
            >
              {cartItemCount}
            </span>
          </a>
          <a
            href="#"
            className="border-slate-600 border-2 text-lg font-medium px-8 py-3 rounded-none"
          >
            Login
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-4 h-px bg-gray-600"></div>
    </nav>
  );
};

export default RootNavBar;
