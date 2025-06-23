import axios from "axios";

import { ICategory } from "@/lib/types";

const fetchCategories = async (): Promise<ICategory[]> => {
    const response = await axios.get<ICategory[]>(
      `https://api.escuelajs.co/api/v1/categories`
    );
    return response.data;
  };

  export {
    fetchCategories
  }