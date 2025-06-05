import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Home } from "../src/components/Home.jsx";

describe("Home component", () => {
  it("renders the main heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { name: /fromsoftware shop/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the About Us section", () => {
    render(<Home />);
    const subheading = screen.getByRole("heading", { name: /about us/i });
    expect(subheading).toBeInTheDocument();
  });

  it("renders the About Us paragraph", () => {
    render(<Home />);
    const paragraph = screen.getByText(/this is not a real store/i);
    expect(paragraph).toBeInTheDocument();
  });
});
