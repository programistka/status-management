import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Filters from "./Filters";

describe("Filters", () => {
  it("renders search input", () => {
    render(<Filters query="" onQueryChange={vi.fn()} statusFilter={null} onStatusFilterChange={vi.fn()} />);

    expect(screen.getByPlaceholderText("Type to search")).toBeInTheDocument();
  });

  it("renders filter by status button", () => {
    render(<Filters query="" onQueryChange={vi.fn()} statusFilter={null} onStatusFilterChange={vi.fn()} />);

    expect(screen.getByText("Filter by status")).toBeInTheDocument();
  });

  it("passes query value to search input", () => {
    render(<Filters query="John" onQueryChange={vi.fn()} statusFilter={null} onStatusFilterChange={vi.fn()} />);

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
  });
});
