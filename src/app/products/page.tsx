"use client";

import { useQuery } from "@tanstack/react-query";

import { Product } from "@/lib/types";
import { fetchProducts } from "@/api/products";
import ProductCard from "@/components/Product";

export default function Products() {
  const { data, isLoading } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  /* 
    Setup products listing:
    - 
  */

  if (!isLoading) {
    console.log(data);
  }
  
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {data?.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
}
