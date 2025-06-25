import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { IProduct } from "@/lib/types";
import { fetchProduct } from "@/api/products";
import { useCart } from "@/context/CartContext";
import ProductItemCard from "@/components/ProductItemCard";
import {readMockProducts} from "../readMockProducts";


jest.mock("../context/CartContext", () => ({
  useCart: jest.fn(),
}));


jest.mock("../api/products", () => ({
  fetchProduct: jest.fn(),
}));

jest.mock("../lib/fonts", () => ({
  anonymousPro: { className: "anonymous-pro" },
  robotoMono: { className: "roboto-mono" },
}));

const mockAddToCart = jest.fn();
const mockProducts = readMockProducts();
const mockProduct: IProduct = mockProducts[0]

const renderWithQueryClient = (productId: string) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ProductItemCard id={productId} />
    </QueryClientProvider>
  );
};

describe("ProductItemCard", () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
    (fetchProduct as jest.Mock).mockResolvedValue(mockProduct);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders product data after fetch", async () => {
    renderWithQueryClient("1");

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("calls addToCart when Add to cart button is clicked", async () => {
    renderWithQueryClient("1");

    await waitFor(() => {
      expect(screen.getByText("Add to cart")).toBeInTheDocument();
    });

    const button = screen.getByText("Add to cart");
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });
});
