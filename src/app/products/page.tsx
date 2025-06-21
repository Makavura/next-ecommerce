import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "@/app/api/products";
import { Product } from "@/app/lib/types";

export default function Products() {
  const {} = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return <div className=""></div>;
}
