"use client";

import { fetchProduct } from "@/api/products";
import { useCart } from "@/context/CartContext";
import { anonymousPro, robotoMono } from "@/lib/fonts";

import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/lib/types";
import ExternalImage from "./ExternalImage";

const ProductItemCard = ({ id }: { id: string }) => {
  const { addToCart } = useCart();
  const { isLoading, data: product } = useQuery<IProduct, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  if (!isLoading)
    return (
      <div className="border-[0.5] border-slate-500 flex flex-col p-6 bg-white shadow-2xl">
        <div className="flex flex-col md:flex-row w-full">
          {product?.images.map((value: string, index: number) => (
            <ExternalImage
              width={390}
              height={390}
              alt={product.slug}
              className={`${
                index === 1 ? "lg:mx-3 my-3 lg:my-0" : ""
              } flex-grow h-auto`}
              key={value}
              src={value}
            />
          ))}
        </div>
        <div className="mt-10">
          <h2
            className={`${anonymousPro.className} text-xl font-semibold text-gray-900 mb-3 `}
          >
            {product?.title}
          </h2>
          <p
            className={`${robotoMono.className}  text-gray-700 text-sm leading-relaxed mb-4`}
          >
            {product?.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span
              className={`${anonymousPro.className} text-2xl font-bold text-gray-900`}
            >
              ${product?.price}.00
            </span>
            <button
              onClick={() => addToCart(product as IProduct, 1)}
              className={`${anonymousPro.className} bg-gray-800 text-white px-5 py-2 rounded-none shadow-md hover:bg-gray-700 transition duration-300 transform hover:-translate-y-0.5`}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
};

export default ProductItemCard;
