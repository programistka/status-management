import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EmployeesList from "./EmployeesList";

const employees = [
  { id: 1, name: "John Doe", img: "/john.jpg", status: "Working" as const },
  { id: 2, name: "Jane Smith", img: "/jane.jpg", status: "OnVacation" as const },
];

describe("EmployeesList", () => {
  it("renders all employees", () => {
    render(<EmployeesList employees={employees} onStatusChange={vi.fn()} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("renders correct number of cards", () => {
    render(<EmployeesList employees={employees} onStatusChange={vi.fn()} />);

    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("renders nothing when list is empty", () => {
    const { container } = render(<EmployeesList employees={[]} onStatusChange={vi.fn()} />);

    expect(container.querySelectorAll("img")).toHaveLength(0);
  });
});
