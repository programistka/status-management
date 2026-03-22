import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar", () => {
  it("renders image with correct src and alt", () => {
    render(<Avatar src="/john.jpg" name="John Doe" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/john.jpg");
    expect(img).toHaveAttribute("alt", "John Doe");
  });

  it("shows initials when image fails to load", () => {
    render(<Avatar src="/broken.jpg" name="John Doe" />);

    fireEvent.error(screen.getByRole("img"));

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("shows single initial for single-word name", () => {
    render(<Avatar src="/broken.jpg" name="John" />);

    fireEvent.error(screen.getByRole("img"));

    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("shows at most two initials for long names", () => {
    render(<Avatar src="/broken.jpg" name="John Michael Doe" />);

    fireEvent.error(screen.getByRole("img"));

    expect(screen.getByText("JM")).toBeInTheDocument();
  });
});
