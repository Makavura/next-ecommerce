import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { IProduct } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import ProductCard from "../components/ProductCard";
import { readMockProducts } from "@/utils/tests/readMockProducts";

jest.mock("../context/CartContext", () => ({
  useCart: jest.fn(),
}));

const push = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
jest.mock("../components/ExternalImage", () => (props: any) => (
  <img {...props} data-testid="external-image" />
));

jest.mock("../lib/fonts", () => ({
  anonymousPro: { className: "anonymous-pro" },
  robotoMono: { className: "roboto-mono" },
}));

const mockAddToCart = jest.fn();
const mockProducts = readMockProducts();
const mockProduct: IProduct = mockProducts[0];

describe("ProductCard", () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders product content correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("external-image")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProduct.description.slice(0, 300)}...`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add to cart/i })
    ).toBeInTheDocument();
  });

  it("calls addToCart when add button is clicked", () => {
    render(<ProductCard product={mockProduct} />);
    const addButton = screen.getByText("Add to cart");
    fireEvent.click(addButton);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it("calls router.push when view button is clicked", () => {
    render(<ProductCard product={mockProduct} />);
    const viewButton = screen.getAllByRole("button")[1];
    fireEvent.click(viewButton);
    expect(push).toHaveBeenCalledWith(`/products/${mockProduct.id}`);
  });

  it("does not render if product.id === 1", () => {
    const productWithId1 = { ...mockProduct, id: 1 };
    const { container } = render(<ProductCard product={productWithId1} />);
    expect(container).toBeEmptyDOMElement();
  });
});
