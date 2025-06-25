import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { ICartItem } from "@/lib/types";
import CartItem from "@/components/CartItem";
import { useCart } from "../src/context/CartContext";
import {readMockProducts} from "../readMockProducts";

jest.mock("../context/CartContext", () => ({
  useCart: jest.fn(),
}));

const mockRemoveFromCart = jest.fn();
const mockUpdateQuantity = jest.fn();

const mockProducts = readMockProducts();
const mockProduct: ICartItem = {...mockProducts[0], quantity: 1}


describe("CartItem", () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders product information", () => {
    render(<CartItem product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(
      screen.getByText(mockProduct.description.slice(0, 90))
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockProduct.quantity.toString())
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      mockProduct.images[0]
    );
  });

  it("calls removeFromCart when delete button is clicked", () => {
    render(<CartItem product={mockProduct} />);
    const deleteButton = screen.getByTitle("Delete");
    fireEvent.click(deleteButton);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct.id);
  });

  it("calls updateQuantity with -1 when decrement button is clicked", () => {
    render(<CartItem product={mockProduct} />);
    const decrementButton = screen.getByLabelText("Decrease quantity");
    fireEvent.click(decrementButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, -1);
  });

  it("calls updateQuantity with +1 when increment button is clicked", () => {
    render(<CartItem product={mockProduct} />);
    const incrementButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(incrementButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 1);
  });
});
