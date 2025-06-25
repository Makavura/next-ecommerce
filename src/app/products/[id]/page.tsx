import fs from "fs";
import path from "path";
import axios from "axios";

import { ICategory, IProduct } from "@/lib/types";
import ProductItemCard from "@/components/ProductItemCard";

type TProductItemParams = {
  id: string;
};

const MOCK_CATEGORIES_FILE_NAME = "mockCategories.json";
const MOCK_CATEGORIES_FILE_PATH = path.join(
  "./",
  MOCK_CATEGORIES_FILE_NAME
);

const MOCK_PRODUCTS_FILE_NAME = "mockProducts.json";
const MOCK_PRODUCTS_FILE_PATH = path.join(
  "./",
  MOCK_PRODUCTS_FILE_NAME
);

const writeMockCategories = (categories: ICategory[]) => {
  const dir = path.dirname(MOCK_CATEGORIES_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(
    MOCK_CATEGORIES_FILE_PATH,
    JSON.stringify(categories, null, 2),
    "utf-8"
  );
  console.table(categories);
  console.log(
    `Successfully saved ${categories.length} categories to ${MOCK_CATEGORIES_FILE_PATH}`
  );
};

const writeMockProducts = (products: IProduct[]) => {
  const dir = path.dirname(MOCK_PRODUCTS_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(
    MOCK_PRODUCTS_FILE_PATH,
    JSON.stringify(products, null, 2),
    "utf-8"
  );
  console.table(products);
  console.log(
    `Successfully saved ${products.length} products to ${MOCK_PRODUCTS_FILE_PATH}`
  );
};

export async function generateStaticParams() {
  const productsResponse = await axios.get<IProduct[]>(
    `https://api.escuelajs.co/api/v1/products`
  );

  const categoriesResponse = await axios.get<ICategory[]>(
    `https://api.escuelajs.co/api/v1/categories`
  );

  if (!productsResponse.data) {
    throw new Error("Failed to fetch product list for static export.");
  }

  if (!categoriesResponse.data) {
    throw new Error("Failed to fetch product list for e2e mock test data.");
  }

  const products = productsResponse.data;
  const categories = categoriesResponse.data;

  writeMockProducts(products);
  writeMockCategories(categories);

  return products?.map((product) => ({
    id: product.id.toString(),
  }));
}

const ProductItem = async ({
  params,
}: {
  params: Promise<TProductItemParams>;
}) => {
  const id = (await params).id;
  return <ProductItemCard id={id} />;
};

export default ProductItem;
