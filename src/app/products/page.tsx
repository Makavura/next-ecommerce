"use client";

import { useQuery } from "@tanstack/react-query";

import { IProduct } from "@/lib/types";
import { fetchProducts } from "@/api/products";
import ProductCard from "@/components/Product";

export default function Products() {
  const { data: products } = useQuery<IProduct[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products?.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
}
