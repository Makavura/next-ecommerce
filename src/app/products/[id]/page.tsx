import fs from "fs";
import path from "path";
import axios from "axios";

import { IProduct } from "@/lib/types";
import ProductItemCard from "@/components/ProductItemCard";

type TProductItemParams = {
  id: string;
};

const MOCK_FILE_NAME = "mockProducts.json";
const MOCK_FILE_PATH = path.join(
  "./",
  "src",
  "utils/tests",
  MOCK_FILE_NAME
);

const writeMockProducts = (products: IProduct[]) => {
  const dir = path.dirname(MOCK_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(MOCK_FILE_PATH, JSON.stringify(products, null, 2), "utf-8");
  console.table(products);
  console.log(
    `Successfully saved ${products.length} products to ${MOCK_FILE_PATH}`
  );
};

export async function generateStaticParams() {
  const response = await axios.get<IProduct[]>(
    `https://api.escuelajs.co/api/v1/products`
  );

  if (!response.data) {
    throw new Error("Failed to fetch product list for static export.");
  }

  const products = response.data;

  writeMockProducts(products);

  return products?.map((product) => ({
    id: product.id.toLocaleString(),
  }));
}

const ProductItem = async ({
  params,
}: {
  params: Promise<TProductItemParams>;
}) => {
  const productId = (await params).id;
  return <ProductItemCard productId={productId} />;
};

export default ProductItem;
