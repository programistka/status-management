import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FiltersProvider } from "@/context/FiltersContext";
import Filters from "./Filters";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FiltersProvider>{children}</FiltersProvider>
);

describe("Filters", () => {
  it("renders search input", () => {
    render(<Filters />, { wrapper });

    expect(screen.getByPlaceholderText("Type to search")).toBeInTheDocument();
  });

  it("renders filter by status button", () => {
    render(<Filters />, { wrapper });

    expect(screen.getByText("Filter by status")).toBeInTheDocument();
  });

  it("shows typed value in search input", async () => {
    render(<Filters />, { wrapper });

    await userEvent.type(screen.getByPlaceholderText("Type to search"), "John");

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
  });
});
