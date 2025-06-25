import fs from "fs";

import { ICategory } from "@/lib/types";

const MOCK_CATEGORIES_PATH = "./src/utils/tests/mockCategories.json";

const readMockCategories = (): ICategory[] => {
  try {
    if (fs.existsSync(MOCK_CATEGORIES_PATH)) {
      const fileContent = fs.readFileSync(MOCK_CATEGORIES_PATH, "utf-8");
      const categories: ICategory[] = JSON.parse(fileContent);
      console.log(
        `Successfully loaded ${categories.length} products from ${MOCK_CATEGORIES_PATH}`
      );
      return categories;
    } else {
      console.warn(
        `Mock categories file not found at ${MOCK_CATEGORIES_PATH}. Returning empty array.`
      );
      return [];
    }
  } catch (error: unknown) {
    console.error("Error reading or parsing mock categories file:", error);
    return [];
  }
};

export { readMockCategories };
