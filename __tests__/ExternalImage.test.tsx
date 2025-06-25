import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import ExternalImage from "../src/components/ExternalImage";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    return <img {...props} data-testid="external-image" />;
  },
}));

describe("ExternalImage", () => {
  it("renders an image with the correct src and alt attributes", () => {
    const src = "https://example.com/test.jpg";
    const alt = "Hat";

    render(<ExternalImage src={src} alt={alt} width={100} height={100} />);

    const image = screen.getByTestId("external-image");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", src);
    expect(image).toHaveAttribute("alt", alt);
    expect(image).toHaveAttribute("width", "100");
    expect(image).toHaveAttribute("height", "100");
  });
});
