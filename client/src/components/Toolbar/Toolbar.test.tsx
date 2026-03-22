import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Toolbar from "./Toolbar";

describe("Toolbar", () => {
  it("renders Create button", () => {
    render(<Toolbar query="" onQueryChange={vi.fn()} statusFilter={null} onStatusFilterChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<Toolbar query="" onQueryChange={vi.fn()} statusFilter={null} onStatusFilterChange={vi.fn()} />);

    expect(screen.getByPlaceholderText("Type to search")).toBeInTheDocument();
  });

  it("renders filter by status", () => {
    render(<Toolbar query="" onQueryChange={vi.fn()} statusFilter={null} onStatusFilterChange={vi.fn()} />);

    expect(screen.getByText("Filter by status")).toBeInTheDocument();
  });
});
