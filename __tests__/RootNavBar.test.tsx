/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import RootNavBar from "../src/components/RootNavBar";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => (
    <img {...props} alt={props.alt} data-testid="next-image" />
  ),
}));

jest.mock("next/link", () => {
  return ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock("../context/CartContext", () => ({
  useCart: jest.fn(),
}));

import { usePathname } from "next/navigation";
import { useCart } from "../src/context/CartContext";

describe("RootNavBar", () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      getTotalItems: () => 5,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the nav bar with logo, cart count, and login link", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<RootNavBar />);
    expect(screen.getByText("The E-Commerce Store-Front")).toBeInTheDocument();
    expect(screen.getByTestId("next-image")).toHaveAttribute(
      "src",
      "/shopping-bag.svg"
    );
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Login")).toHaveAttribute("href", "/auth/signin");
  });

  it("does not render navbar on auth pages", () => {
    (usePathname as jest.Mock).mockReturnValue("/auth/signin");

    const { container } = render(<RootNavBar />);
    expect(container).toBeEmptyDOMElement();
  });
});
