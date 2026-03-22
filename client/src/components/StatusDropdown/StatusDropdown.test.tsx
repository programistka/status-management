import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StatusDropdown from "./StatusDropdown";

describe("StatusDropdown", () => {
  it("renders current status label", () => {
    render(<StatusDropdown status="Working" onStatusChange={vi.fn()} />);

    expect(screen.getByText("Working")).toBeInTheDocument();
  });

  it("does not show options initially", () => {
    render(<StatusDropdown status="Working" onStatusChange={vi.fn()} />);

    expect(screen.queryByText("On Vacation")).not.toBeInTheDocument();
  });

  it("shows all status options after click", async () => {
    render(<StatusDropdown status="Working" onStatusChange={vi.fn()} />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("On Vacation")).toBeInTheDocument();
    expect(screen.getByText("Lunch Time")).toBeInTheDocument();
    expect(screen.getByText("Business Trip")).toBeInTheDocument();
  });

  it("calls onStatusChange with selected status", async () => {
    const onStatusChange = vi.fn();
    render(<StatusDropdown status="Working" onStatusChange={onStatusChange} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("On Vacation"));

    expect(onStatusChange).toHaveBeenCalledWith("OnVacation");
  });

  it("closes dropdown when Escape is pressed", async () => {
    render(<StatusDropdown status="Working" onStatusChange={vi.fn()} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByText("On Vacation")).not.toBeInTheDocument();
  });

  it("closes dropdown after selecting a status", async () => {
    render(<StatusDropdown status="Working" onStatusChange={vi.fn()} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("On Vacation"));

    expect(screen.queryByText("Lunch Time")).not.toBeInTheDocument();
  });
});
