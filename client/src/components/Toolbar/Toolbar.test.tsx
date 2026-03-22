import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FiltersProvider } from "@/context/FiltersContext";
import Toolbar from "./Toolbar";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FiltersProvider>{children}</FiltersProvider>
);

describe("Toolbar", () => {
  it("renders Create button", () => {
    render(<Toolbar />, { wrapper });

    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Toolbar />, { wrapper });

    expect(screen.getByPlaceholderText("Type to search")).toBeInTheDocument();
  });

  it("renders filter by status", () => {
    render(<Toolbar />, { wrapper });

    expect(screen.getByText("Filter by status")).toBeInTheDocument();
  });
});
