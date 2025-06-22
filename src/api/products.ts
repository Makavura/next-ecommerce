import axios from "axios";

import { Product } from "@/lib/types";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    `https://api.escuelajs.co/api/v1/products`
  );
  return response.data;
};

const fetchProduct = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(
    `https://api.escuelajs.co/api/v1/products/${id}`
  );
  return response.data;
};

export { fetchProduct, fetchProducts };
