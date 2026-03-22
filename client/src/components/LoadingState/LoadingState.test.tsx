import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingState from "./LoadingState";

describe("LoadingState", () => {
  it("renders loading message", () => {
    render(<LoadingState />);

    expect(screen.getByText("Loading employees...")).toBeInTheDocument();
  });

  it("renders spinner element", () => {
    const { container } = render(<LoadingState />);

    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });
});
