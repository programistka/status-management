import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEmployeeModal from "./CreateEmployeeModal";

describe("CreateEmployeeModal", () => {
  it("renders title", () => {
    render(<CreateEmployeeModal onClose={vi.fn()} />);

    expect(screen.getByText("Create New User")).toBeInTheDocument();
  });

  it("renders name input", () => {
    render(<CreateEmployeeModal onClose={vi.fn()} />);

    expect(screen.getByPlaceholderText("Enter user name")).toBeInTheDocument();
  });

  it("renders status select showing the default status", () => {
    render(<CreateEmployeeModal onClose={vi.fn()} />);

    expect(screen.getByText("Working")).toBeInTheDocument();
  });

  it("shows all status options after clicking the status select", async () => {
    render(<CreateEmployeeModal onClose={vi.fn()} />);

    await userEvent.click(screen.getByText("Working"));

    expect(screen.getByText("On Vacation")).toBeInTheDocument();
    expect(screen.getByText("Lunch Time")).toBeInTheDocument();
    expect(screen.getByText("Business Trip")).toBeInTheDocument();
  });

  it("updates name input value when typing", async () => {
    render(<CreateEmployeeModal onClose={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText("Enter user name"), "John");

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
  });

  it("ignores non-alphabetical characters in name input", async () => {
    render(<CreateEmployeeModal onClose={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText("Enter user name"), "John123! Smith");

    expect(screen.getByDisplayValue("John Smith")).toBeInTheDocument();
  });

  it("disables Create button when name is empty", () => {
    render(<CreateEmployeeModal onClose={vi.fn()} />);

    expect(screen.getByRole("button", { name: /create/i })).toBeDisabled();
  });

  it("enables Create button when name is not empty", async () => {
    render(<CreateEmployeeModal onClose={vi.fn()} />);

    await userEvent.type(screen.getByPlaceholderText("Enter user name"), "John");

    expect(screen.getByRole("button", { name: /create/i })).toBeEnabled();
  });

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    render(<CreateEmployeeModal onClose={onClose} />);

    await userEvent.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when Cancel is clicked", async () => {
    const onClose = vi.fn();
    render(<CreateEmployeeModal onClose={onClose} />);

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", async () => {
    const onClose = vi.fn();
    const { container } = render(<CreateEmployeeModal onClose={onClose} />);

    await userEvent.click(container.firstChild as HTMLElement);

    expect(onClose).toHaveBeenCalled();
  });
});
