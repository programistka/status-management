import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StatusSelect from "./StatusSelect";

describe("StatusSelect", () => {
  it("renders current status label", () => {
    render(<StatusSelect value="Working" onChange={vi.fn()} />);

    expect(screen.getByText("Working")).toBeInTheDocument();
  });

  it("renders placeholder when value is null", () => {
    render(<StatusSelect value={null} onChange={vi.fn()} placeholder="Filter by status" />);

    expect(screen.getByText("Filter by status")).toBeInTheDocument();
  });

  it("does not show options initially", () => {
    render(<StatusSelect value="Working" onChange={vi.fn()} />);

    expect(screen.queryByText("On Vacation")).not.toBeInTheDocument();
  });

  it("shows all status options after click", async () => {
    render(<StatusSelect value="Working" onChange={vi.fn()} />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("On Vacation")).toBeInTheDocument();
    expect(screen.getByText("Lunch Time")).toBeInTheDocument();
    expect(screen.getByText("Business Trip")).toBeInTheDocument();
  });

  it("shows All statuses option when nullable", async () => {
    render(<StatusSelect value={null} onChange={vi.fn()} nullable />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("All statuses")).toBeInTheDocument();
  });

  it("does not show All statuses option when not nullable", async () => {
    render(<StatusSelect value="Working" onChange={vi.fn()} />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.queryByText("All statuses")).not.toBeInTheDocument();
  });

  it("calls onChange with selected status", async () => {
    const onChange = vi.fn();
    render(<StatusSelect value="Working" onChange={onChange} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("On Vacation"));

    expect(onChange).toHaveBeenCalledWith("OnVacation");
  });

  it("calls onChange with null when All statuses is clicked", async () => {
    const onChange = vi.fn();
    render(<StatusSelect value="Working" onChange={onChange} nullable />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("All statuses"));

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("closes dropdown after selecting a status", async () => {
    render(<StatusSelect value="Working" onChange={vi.fn()} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("On Vacation"));

    expect(screen.queryByText("Lunch Time")).not.toBeInTheDocument();
  });

  it("closes dropdown when Escape is pressed", async () => {
    render(<StatusSelect value="Working" onChange={vi.fn()} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByText("On Vacation")).not.toBeInTheDocument();
  });
});
