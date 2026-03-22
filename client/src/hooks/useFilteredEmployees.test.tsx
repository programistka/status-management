import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { type ReactNode } from "react";
import { FiltersProvider } from "@/context/FiltersContext";
import { useEmployees } from "@/hooks/useEmployees";
import { useSetQuery, useSetStatusFilter } from "@/context/FiltersContext";
import { useFilteredEmployees } from "./useFilteredEmployees";

vi.mock("@/hooks/useEmployees");

const mockEmployees = [
  { id: 1, name: "John Doe", img: "/john.jpg", status: "Working" as const },
  { id: 2, name: "Jane Smith", img: "/jane.jpg", status: "OnVacation" as const },
  { id: 3, name: "Bob Brown", img: "/bob.jpg", status: "Working" as const },
];

const wrapper = ({ children }: { children: ReactNode }) => (
  <FiltersProvider>{children}</FiltersProvider>
);

beforeEach(() => {
  vi.mocked(useEmployees).mockReturnValue({
    employees: mockEmployees,
    updateStatus: vi.fn(),
  });
});

describe("useFilteredEmployees", () => {
  it("returns all employees when no filters are active", () => {
    const { result } = renderHook(() => useFilteredEmployees(), { wrapper });

    expect(result.current.filtered).toHaveLength(3);
  });

  it("filters by name query (case-insensitive)", () => {
    const { result } = renderHook(
      () => ({ hook: useFilteredEmployees(), setQuery: useSetQuery() }),
      { wrapper },
    );

    act(() => result.current.setQuery("john"));

    expect(result.current.hook.filtered).toHaveLength(1);
    expect(result.current.hook.filtered[0].name).toBe("John Doe");
  });

  it("filters by status", () => {
    const { result } = renderHook(
      () => ({ hook: useFilteredEmployees(), setStatusFilter: useSetStatusFilter() }),
      { wrapper },
    );

    act(() => result.current.setStatusFilter("OnVacation"));

    expect(result.current.hook.filtered).toHaveLength(1);
    expect(result.current.hook.filtered[0].name).toBe("Jane Smith");
  });

  it("returns empty array when no employees match the query", () => {
    const { result } = renderHook(
      () => ({ hook: useFilteredEmployees(), setQuery: useSetQuery() }),
      { wrapper },
    );

    act(() => result.current.setQuery("xyz"));

    expect(result.current.hook.filtered).toHaveLength(0);
  });

  it("returns all employees when status filter is reset to null", () => {
    const { result } = renderHook(
      () => ({ hook: useFilteredEmployees(), setStatusFilter: useSetStatusFilter() }),
      { wrapper },
    );

    act(() => result.current.setStatusFilter("Working"));
    act(() => result.current.setStatusFilter(null));

    expect(result.current.hook.filtered).toHaveLength(3);
  });

  it("exposes updateStatus from useEmployees", () => {
    const updateStatus = vi.fn();
    vi.mocked(useEmployees).mockReturnValue({ employees: mockEmployees, updateStatus });

    const { result } = renderHook(() => useFilteredEmployees(), { wrapper });

    expect(result.current.updateStatus).toBe(updateStatus);
  });
});
