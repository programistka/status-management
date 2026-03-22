import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";

describe("EmptyState", () => {
  it("renders message", () => {
    render(<EmptyState />);

    expect(screen.getByText("No employees found")).toBeInTheDocument();
  });

  it("renders hint", () => {
    render(<EmptyState />);

    expect(screen.getByText("Try adjusting your search or filter.")).toBeInTheDocument();
  });
});
