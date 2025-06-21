import axios from 'axios';

import { Product } from '@/app/lib/types'

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(
      `https://api.escuelajs.co/api/v1/products`
    );
    return response.data;
  };