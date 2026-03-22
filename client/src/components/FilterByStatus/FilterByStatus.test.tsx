import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterByStatus from "./FilterByStatus";

describe("FilterByStatus", () => {
  it("renders default label when no filter selected", () => {
    render(<FilterByStatus statusFilter={null} onStatusFilterChange={vi.fn()} />);

    expect(screen.getByText("Filter by status")).toBeInTheDocument();
  });

  it("renders active filter label", () => {
    render(<FilterByStatus statusFilter="Working" onStatusFilterChange={vi.fn()} />);

    expect(screen.getByText("Working")).toBeInTheDocument();
  });

  it("shows all statuses and reset option after click", async () => {
    render(<FilterByStatus statusFilter={null} onStatusFilterChange={vi.fn()} />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("All statuses")).toBeInTheDocument();
    expect(screen.getByText("On Vacation")).toBeInTheDocument();
    expect(screen.getByText("Lunch Time")).toBeInTheDocument();
    expect(screen.getByText("Business Trip")).toBeInTheDocument();
  });

  it("calls onStatusFilterChange with selected status", async () => {
    const onStatusFilterChange = vi.fn();
    render(<FilterByStatus statusFilter={null} onStatusFilterChange={onStatusFilterChange} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("On Vacation"));

    expect(onStatusFilterChange).toHaveBeenCalledWith("OnVacation");
  });

  it("calls onStatusFilterChange with null when All statuses is clicked", async () => {
    const onStatusFilterChange = vi.fn();
    render(<FilterByStatus statusFilter="Working" onStatusFilterChange={onStatusFilterChange} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("All statuses"));

    expect(onStatusFilterChange).toHaveBeenCalledWith(null);
  });
});
