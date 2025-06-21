
import axios from 'axios';

import { Product } from '@/lib/types'

const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(
      `https://api.escuelajs.co/api/v1/products`
    );
    return response.data;
  };

  export {
    fetchProducts
  }