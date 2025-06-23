"use client";

import { useQuery } from "@tanstack/react-query";

import { anonymousPro } from "@/lib/fonts";
import { fetchProducts } from "@/api/products";
import ProductCard from "@/components/Product";
import { ICategory, IProduct } from "@/lib/types";
import { fetchCategories } from "@/api/categories";

export default function Products() {
  const { data: products } = useQuery<IProduct[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories } = useQuery<ICategory[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <div className="container mx-auto">
      <div
        className={`${anonymousPro.className}  flex flex-col md:flex-row justify-between`}
      >
        <div className="flex border items-center border-black bg-white shadow-sm overflow-hidden w-1/2">
          <div className="flex-none py-2 px-3 text-sm text-gray-700 bg-gray-50 border-r border-gray-700">
            Select a category
          </div>
          <select defaultValue="All products" className="w-full h-full">
            <option disabled={true} className="">
              Pick a category
            </option>
            {categories &&
              categories.map((category) => (
                <option key={category.slug} className="">
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center border border-black bg-white shadow-sm w-1/2">
          <input
            type="text"
            placeholder="Search by name or description"
            className="flex-grow p-3 text-gray-800 focus:outline-none focus:ring-0"
          />
          <button className="p-3 bg-white text-gray-600 hover:bg-gray-100 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
