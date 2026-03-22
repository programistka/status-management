import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

describe("Search", () => {
  it("renders input with placeholder", () => {
    render(<Search query="" onQueryChange={vi.fn()} />);

    expect(screen.getByPlaceholderText("Type to search")).toBeInTheDocument();
  });

  it("calls onQueryChange when typing", async () => {
    const onQueryChange = vi.fn();
    render(<Search query="" onQueryChange={onQueryChange} />);

    await userEvent.type(screen.getByPlaceholderText("Type to search"), "John");

    expect(onQueryChange).toHaveBeenCalled();
  });

  it("does not show clear button when query is empty", () => {
    render(<Search query="" onQueryChange={vi.fn()} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows clear button when query is not empty", () => {
    render(<Search query="John" onQueryChange={vi.fn()} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onQueryChange with empty string when clear button is clicked", async () => {
    const onQueryChange = vi.fn();
    render(<Search query="John" onQueryChange={onQueryChange} />);

    await userEvent.click(screen.getByRole("button"));

    expect(onQueryChange).toHaveBeenCalledWith("");
  });
});
