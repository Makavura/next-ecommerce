import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, act, waitFor } from "@testing-library/react";

import { IProduct, ICartItem } from "@/lib/types";
import { CartProvider, useCart } from "@/context/CartContext";
import { readMockProducts } from "../readMockProducts";

const mockProducts = readMockProducts();

const TestComponent = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  return (
    <div>
      <div data-testid="cart-items">{JSON.stringify(cart)}</div>
      <div data-testid="total-items">{getTotalItems()}</div>
      <div data-testid="total-price">{getTotalPrice()}</div>
      <button onClick={() => addToCart(mockProducts[0], 1)}>Add Item</button>
      <button onClick={() => removeFromCart(mockProducts[0].id)}>Remove Item</button>
      <button onClick={() => updateQuantity(mockProducts[0].id, 1)}>Update Item Qty</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

describe("Cart Provider and useCart custom hook", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should initialize with an empty cart if localStorage is empty", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-items")).toHaveTextContent("[]");
    expect(screen.getByTestId("total-items")).toHaveTextContent("0");
    expect(screen.getByTestId("total-price")).toHaveTextContent("0");
  });

  it("should load cart from localStorage on initial render", () => {
    const initialCart: ICartItem[] = [{ ...mockProducts[0], quantity: 2 }];
    localStorage.setItem("cart", JSON.stringify(initialCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      JSON.stringify(initialCart)
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("2");
    expect(screen.getByTestId("total-price")).toHaveTextContent(
      `${mockProducts[0].price * 2}`
    );
  });

  it("should add an item to the cart", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await userEvent.click(screen.getByRole("button", { name: /Add Item/i }));

    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      JSON.stringify([{ ...mockProducts[0], quantity: 1 }])
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("1");
    expect(screen.getByTestId("total-price")).toHaveTextContent(
      `${mockProducts[0].price}`
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([{ ...mockProducts[0], quantity: 1 }])
    );
  });

  it("should increase quantity if item already in cart", async () => {
    const initialCart: ICartItem[] = [{ ...mockProducts[0], quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(initialCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("total-items")).toHaveTextContent("1");

    await userEvent.click(screen.getByRole("button", { name: /Add Item/i }));

    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      JSON.stringify([{ ...mockProducts[0], quantity: 2 }])
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("2");
    expect(screen.getByTestId("total-price")).toHaveTextContent(
      `${mockProducts[0].price * 2}`
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([{ ...mockProducts[0], quantity: 2 }])
    );
  });

  it("should add a new item and keep existing items", async () => {
    const initialCart: ICartItem[] = [{ ...mockProducts[0], quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(initialCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await userEvent.click(screen.getByRole("button", { name: /Add Item/i }));

    const expectedCart = [
      { ...mockProducts[0], quantity: 2 },
    ];
    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      JSON.stringify(expectedCart)
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("2");
    expect(screen.getByTestId("total-price")).toHaveTextContent(`${mockProducts[0].price * 2}`); 
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(expectedCart)
    );
  });

  it("should remove an item from the cart", async () => {
    const initialCart: ICartItem[] = [
      { ...mockProducts[0], quantity: 3 },
    ];
    localStorage.setItem("cart", JSON.stringify(initialCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("total-items")).toHaveTextContent("3");

    await userEvent.click(
      screen.getByRole("button", { name: /Remove Item/i })
    );

    const expectedCart: ICartItem[] = [];
    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      JSON.stringify(expectedCart)
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("0");
    expect(screen.getByTestId("total-price")).toHaveTextContent(`0`);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(expectedCart)
    );
  });

  it("should update an item's quantity in the cart", async () => {
    const initialCart: ICartItem[] = [{ ...mockProducts[0], quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(initialCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await userEvent.click(
      screen.getByRole("button", { name: /Update Item Qty/i })
    );

    const expectedCart: ICartItem[] = [{ ...mockProducts[0], quantity: 2 }];
    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      JSON.stringify(expectedCart)
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("2");
    expect(screen.getByTestId("total-price")).toHaveTextContent(`${mockProducts[0].price * 2}`);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(expectedCart)
    );
  });

  it("should clear the cart", async () => {
    const initialCart: ICartItem[] = [{ ...mockProducts[0], quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(initialCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("total-items")).toHaveTextContent("1");

    await userEvent.click(screen.getByRole("button", { name: /Clear Cart/i }));

    expect(screen.getByTestId("cart-items")).toHaveTextContent("[]");
    expect(screen.getByTestId("total-items")).toHaveTextContent("0");
    expect(screen.getByTestId("total-price")).toHaveTextContent("0");
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", "[]");
  });

  it("should update cart when localStorage changes from another window/tab", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("total-items")).toHaveTextContent("0");

    const newCart: ICartItem[] = [{ ...mockProducts[0], quantity: 3 }];

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "cart",
          newValue: JSON.stringify(newCart),
          oldValue: "[]",
          url: "http://localhost",
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("cart-items")).toHaveTextContent(
        JSON.stringify(newCart)
      );
      expect(screen.getByTestId("total-items")).toHaveTextContent("3");
      expect(screen.getByTestId("total-price")).toHaveTextContent(`${mockProducts[0].price * 3}`);
    });
  });

  it("should throw an error if useCart is not used within a CartProvider", () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useCart must be used within a CartProvider"
    );

    consoleErrorSpy.mockRestore();
  });


  it("should not add item if quantity is zero or less", async () => {
    const product: IProduct = mockProducts[3];

    const TestComponentWithZeroQuantity: React.FC = () => {
      const { cart, addToCart } = useCart();
      return (
        <div>
          <div data-testid="cart-items">{JSON.stringify(cart)}</div>
          <button onClick={() => addToCart(product, 0)}>
            Add Zero Keyboard
          </button>
          <button onClick={() => addToCart(product, -1)}>
            Add Negative Keyboard
          </button>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestComponentWithZeroQuantity />
      </CartProvider>
    );

    await userEvent.click(
      screen.getByRole("button", { name: /Add Zero Keyboard/i })
    );
    expect(screen.getByTestId("cart-items")).toHaveTextContent("[]");

    await userEvent.click(
      screen.getByRole("button", { name: /Add Negative Keyboard/i })
    );
    expect(screen.getByTestId("cart-items")).toHaveTextContent("[]");
  });
});
