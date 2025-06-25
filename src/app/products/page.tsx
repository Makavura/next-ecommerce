"use client";

import { useQuery } from "@tanstack/react-query";

import { anonymousPro } from "@/lib/fonts";
import { fetchProducts } from "@/api/products";
import ProductCard from "@/components/ProductCard";
import { ICategory, IProduct } from "@/lib/types";
import { fetchCategories } from "@/api/categories";
import { ChangeEvent, useMemo, useState } from "react";

export default function Products() {
  const [searchParams, setSearchParams] = useState<string>();
  const [categorySelect, setCategorySelect] = useState<string>("all");
  const [selectedCategoryTags, setSelectedCategoryTags] = useState<string[]>([ ]);

  const { data: products } = useQuery<IProduct[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories } = useQuery<ICategory[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCategorySelect(e.target.value);
  };

  const handleSearchParamsEntry = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchParams(e.target.value);
  };

  const handleTagClick = (slug: string) => {
    if (selectedCategoryTags.includes(slug)) {
      setSelectedCategoryTags(selectedCategoryTags.filter((id) => id !== slug));
    } else {
      setSelectedCategoryTags([...selectedCategoryTags, slug]);
    }
  };

  const searchedAndFilteredProducts = useMemo(() => {
    let result = products ? [...(products as IProduct[])] : [];

    if (categorySelect !== "all") {
      result = result.filter(
        (product) => product.category.slug === categorySelect
      );
    }

    if(selectedCategoryTags.length > 0) {
      result = result.filter((product) => selectedCategoryTags.includes(product.category.slug))
    }

    if (searchParams) {
      const lowerCaseSearchParams = searchParams.toLocaleLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLocaleLowerCase().includes(lowerCaseSearchParams) ||
          product.description
            .toLocaleLowerCase()
            .includes(lowerCaseSearchParams)
      );
    }

    return result;
  }, [products, searchParams, categorySelect, selectedCategoryTags]);

  return (
    <div className="container mx-auto">
      <div
        className={`${anonymousPro.className}  flex flex-col md:flex-row justify-between w-full`}
      >
        <div className="flex border items-center border-black bg-white shadow-sm overflow-hidden w-full md:w-1/2">
          <div className="flex-none py-2 px-3 text-sm text-gray-700 bg-gray-50 border-r border-gray-700">
            Select a category
          </div>
          <select
            defaultValue="All products"
            className="w-full h-full"
            onChange={handleCategoryChange}
          >
            <option disabled={true} className="">
              Pick a category
            </option>
            <option value="all" className="text-slate-700">
              All categories
            </option>
            {categories &&
              categories.map((category) => (
                <option key={category.slug} value={category.slug} className="">
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center border border-black bg-white shadow-sm w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name or description"
            onChange={handleSearchParamsEntry}
            className="flex-grow p-3 text-gray-800 focus:outline-none focus:ring-0"
          />
          <button className="p-3 bg-white text-gray-600 hover:bg-gray-100 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${anonymousPro.className}  flex flex-row justify-between mt-3`}
      >
        {categories &&
          categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleTagClick(category.slug)}
              className={`
              px-3 md:px-10 py-3 text-sm font-medium
              transition-all duration-200 ease-in-out hover:scale-125
              ${
                selectedCategoryTags.includes(category.slug)
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }
            `}
            >
              {category.name}
            </button>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {searchedAndFilteredProducts?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
