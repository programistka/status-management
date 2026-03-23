import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmployeesPanel from "./EmployeesPanel";
import { useEmployees } from "@/hooks/useEmployees";

vi.mock("@/hooks/useEmployees", () => ({ useEmployees: vi.fn() }));

const mockEmployees = [
  { id: 1, name: "John Doe", img: "/john.jpg", status: "Working" as const },
  { id: 2, name: "Jane Smith", img: "/jane.jpg", status: "OnVacation" as const },
];

beforeEach(() => {
  vi.mocked(useEmployees).mockReturnValue({
    employees: mockEmployees,
    updateStatus: vi.fn(),
  });
});

describe("EmployeesPanel", () => {
  it("renders all employees", () => {
    render(<EmployeesPanel />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("filters employees by search query", async () => {
    render(<EmployeesPanel />);

    await userEvent.type(screen.getByPlaceholderText("Type to search"), "John");

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("shows EmptyState when no employees match the filter", async () => {
    render(<EmployeesPanel />);

    await userEvent.type(screen.getByPlaceholderText("Type to search"), "xyz");

    expect(screen.getByText("No employees found")).toBeInTheDocument();
  });

  it("filters employees by status", async () => {
    render(<EmployeesPanel />);

    await userEvent.click(screen.getByText("Filter by status"));
    await userEvent.click(screen.getAllByText("On Vacation")[0]);

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});
