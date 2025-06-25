import axios from "axios";

import { IProduct } from "@/lib/types";

const fetchProductsWithPagination = async (
  page: number,
  pageSize: number
): Promise<IProduct[]> => {
  const offset = page * pageSize;
  const response = await axios.get<IProduct[]>(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${pageSize}`
  );
  return response.data;
};

const fetchProduct = async (id: string): Promise<IProduct> => {
  const response = await axios.get<IProduct>(
    `https://api.escuelajs.co/api/v1/products/${id}`
  );
  return response.data;
};

export { fetchProduct, fetchProductsWithPagination };
