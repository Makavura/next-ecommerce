"use client";

import { useRouter } from "next/navigation";

import { IProduct } from "@/lib/types";
import ExternalImage from "./ExternalImage";
import { useCart } from "@/context/CartContext";
import { anonymousPro, robotoMono } from "@/lib/fonts";
import { useFavorites } from "@/context/FavouriteProductsContext";

const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const toggleFavorite = () => {
    return isFavorite(product.id)
      ? removeFavorite(product.id)
      : addFavorite(product);
  };

  const handleProductView = () => {
    const id = product.id;
    router.push(`/products/${id}`);
  };

  if (product.id !== 1)
    return (
      <div className="bg-white rounded-none shadow-lg overflow-hidden flex flex-col transform transition duration-300 hover:scale-105">
        <div className="relative h-[420px] bg-gray-200 flex items-center justify-center rounded-2xl">
          <ExternalImage
            src={product.images[0]}
            alt={product.slug}
            className="h-full w-full"
            width={390}
            height={390}
          />
          <button
            onClick={toggleFavorite}
            className={`${
              isFavorite(product.id)
                ? "text-red-600"
                : "text-slate-50 hover:text-red-600"
            } absolute top-3 right-3 p-2 rounded-full shadow-md focus:outline-none`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="absolute bottom-3 right-3 flex flex-row">
            <button
              onClick={handleProductView}
              className=" bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-gray-900 focus:outline-none mr-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M21.83 11.442C21.653 11.179 17.441 5 12 5s-9.653 6.179-9.83 6.442L1.8 12l.374.558C2.347 12.821 6.559 19 12 19s9.653-6.179 9.83-6.442L22.2 12zM12 17c-3.531 0-6.664-3.59-7.758-5C5.336 10.59 8.469 7 12 7s6.664 3.59 7.758 5c-1.094 1.41-4.227 5-7.758 5z" />
                <path d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div className="">
            <h2
              className={`${anonymousPro.className} text-xl font-semibold text-gray-900 mb-2 `}
            >
              {product.title}
            </h2>
            <p
              className={`${robotoMono.className}  text-gray-700 text-sm leading-relaxed mb-4`}
            >
              {product.description.slice(0, 300)}...
            </p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span
              className={`${anonymousPro.className} text-2xl font-bold text-gray-900`}
            >
              ${product.price}.00
            </span>
            <button
              onClick={() => addToCart(product, 1)}
              className={`${anonymousPro.className} bg-gray-800 text-white px-5 py-2 rounded-none shadow-md hover:bg-gray-700 transition duration-300 transform hover:-translate-y-0.5`}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
};

export default ProductCard;
