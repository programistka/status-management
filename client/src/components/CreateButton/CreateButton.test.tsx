import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateButton from "./CreateButton";

describe("CreateButton", () => {
  it("renders Create button", () => {
    render(<CreateButton />);

    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("does not show modal initially", () => {
    render(<CreateButton />);

    expect(screen.queryByText("Create New User")).not.toBeInTheDocument();
  });

  it("opens modal on button click", async () => {
    render(<CreateButton />);

    await userEvent.click(screen.getByRole("button", { name: /create/i }));

    expect(screen.getByText("Create New User")).toBeInTheDocument();
  });

  it("closes modal when onClose is called", async () => {
    render(<CreateButton />);

    await userEvent.click(screen.getByRole("button", { name: /create/i }));
    await userEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByText("Create New User")).not.toBeInTheDocument();
  });
});
