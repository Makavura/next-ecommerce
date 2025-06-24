import axios from "axios";
import { IProduct } from "@/lib/types";
import ProductItemCard from "@/components/ProductItemCard";

type TProductItemParams = {
  id: string;
};

export async function generateStaticParams() {
  
  const response = await axios.get<IProduct[]>(
    `https://api.escuelajs.co/api/v1/products`
  );

  if (!response.data) {
    throw new Error("Failed to fetch product list for static export.");
  }

  const products = response.data;

  return products?.map((product) => ({
    id: product.id.toLocaleString(),
  }));
}


const ProductItem = async ({ params }: {params: Promise<TProductItemParams>}) => {
  const productId = (await params).id
  return <ProductItemCard productId={productId} />;
};

export default ProductItem;
