import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FiltersProvider } from "@/context/FiltersContext";
import { useEmployees } from "@/hooks/useEmployees";
import EmployeesList from "./EmployeesList";

vi.mock("@/hooks/useEmployees");

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

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FiltersProvider>{children}</FiltersProvider>
);

describe("EmployeesList", () => {
  it("renders all employees", () => {
    render(<EmployeesList />, { wrapper });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("renders correct number of cards", () => {
    render(<EmployeesList />, { wrapper });

    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("renders EmptyState when employees list is empty", () => {
    vi.mocked(useEmployees).mockReturnValue({
      employees: [],
      updateStatus: vi.fn(),
    });

    render(<EmployeesList />, { wrapper });

    expect(screen.getByText("No employees found")).toBeInTheDocument();
  });
});
