import axios from "axios";

import { IProduct } from "@/lib/types";

const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await axios.get<IProduct[]>(
    `https://api.escuelajs.co/api/v1/products`
  );
  return response.data;
};

const fetchProduct = async (id: string): Promise<IProduct> => {
  const response = await axios.get<IProduct>(
    `https://api.escuelajs.co/api/v1/products/${id}`
  );
  return response.data;
};

export { fetchProduct, fetchProducts };
