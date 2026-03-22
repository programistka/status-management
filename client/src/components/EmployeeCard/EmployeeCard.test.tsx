import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmployeeCard from "./EmployeeCard";

const employee = { id: 1, name: "John Doe", img: "/john.jpg", status: "Working" as const };

describe("EmployeeCard", () => {
  it("renders employee name", () => {
    render(<EmployeeCard employee={employee} onStatusChange={vi.fn()} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders employee image with correct alt", () => {
    render(<EmployeeCard employee={employee} onStatusChange={vi.fn()} />);

    expect(screen.getByAltText("John Doe")).toBeInTheDocument();
  });

  it("renders current status", () => {
    render(<EmployeeCard employee={employee} onStatusChange={vi.fn()} />);

    expect(screen.getByText("Working")).toBeInTheDocument();
  });

  it("calls onStatusChange with employee id and new status", async () => {
    const onStatusChange = vi.fn();
    render(<EmployeeCard employee={employee} onStatusChange={onStatusChange} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("On Vacation"));

    expect(onStatusChange).toHaveBeenCalledWith(1, "OnVacation");
  });
});
