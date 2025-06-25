import fs from "fs";

import { IProduct } from "@/lib/types";

const MOCK_FILE_PATH = "";

const readMockProducts = (): IProduct[] => {
  try {
    if (fs.existsSync(MOCK_FILE_PATH)) {
      const fileContent = fs.readFileSync(MOCK_FILE_PATH, "utf-8");
      const products: IProduct[] = JSON.parse(fileContent);
      console.log(
        `Successfully loaded ${products.length} products from ${MOCK_FILE_PATH}`
      );
      return products;
    } else {
      console.warn(
        `Mock product file not found at ${MOCK_FILE_PATH}. Returning empty array.`
      );
      return [];
    }
  } catch (error: unknown) {
    console.error("Error reading or parsing mock products file:", error);
    return [];
  }
};

export { readMockProducts };
