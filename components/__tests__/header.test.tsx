// __tests__/Header.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@/components/header";

// Mock the Image and UserButton components
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />, // Simple mock for Image component
}));

jest.mock("../user-button", () => ({
  UserButton: () => <button>User Button</button>, // Mock for UserButton component
}));

describe("Header", () => {
  it("renders logo image with correct attributes", () => {
    render(<Header />);
    const logoImage = screen.getByAltText("Logo Options & Company");

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/logo.svg");
    expect(logoImage).toHaveAttribute("height", "39");
    expect(logoImage).toHaveAttribute("width", "100");
  });

  it("renders UserButton component", () => {
    render(<Header />);
    const userButton = screen.getByRole("button", { name: /user button/i });

    expect(userButton).toBeInTheDocument();
  });
});
