import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorState from "./ErrorState";

describe("ErrorState", () => {
  it("renders error message", () => {
    render(<ErrorState />);

    expect(screen.getByText("Failed to load employees")).toBeInTheDocument();
  });

  it("renders hint to refresh", () => {
    render(<ErrorState />);

    expect(screen.getByText("Check your connection and try refreshing the page.")).toBeInTheDocument();
  });
});
