import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateUserModal from "./CreateUserModal";

describe("CreateUserModal", () => {
  it("renders title", () => {
    render(<CreateUserModal onClose={vi.fn()} />);

    expect(screen.getByText("Create New User")).toBeInTheDocument();
  });

  it("renders name input", () => {
    render(<CreateUserModal onClose={vi.fn()} />);

    expect(screen.getByPlaceholderText("Enter user name")).toBeInTheDocument();
  });

  it("renders status select with all options", () => {
    render(<CreateUserModal onClose={vi.fn()} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Working" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "On Vacation" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Lunch Time" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Business Trip" })).toBeInTheDocument();
  });

  it("updates name input value when typing", async () => {
    render(<CreateUserModal onClose={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText("Enter user name"), "John");

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
  });

  it("ignores non-letter characters in name input", async () => {
    render(<CreateUserModal onClose={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText("Enter user name"), "John123!");

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", async () => {
    const onClose = vi.fn();
    render(<CreateUserModal onClose={onClose} />);

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", async () => {
    const onClose = vi.fn();
    const { container } = render(<CreateUserModal onClose={onClose} />);

    await userEvent.click(container.firstChild as HTMLElement);

    expect(onClose).toHaveBeenCalled();
  });
});
