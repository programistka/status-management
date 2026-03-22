import { renderHook, act, waitFor } from "@testing-library/react";
import { Suspense, type ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { type Employee, type Status } from "@/types";

const mockEmployees: Employee[] = [
  { id: 1, name: "Alice Johnson", img: "/alice.jpg", status: "Working" },
  { id: 2, name: "Bob Smith", img: "/bob.jpg", status: "Working" },
  { id: 3, name: "Carol White", img: "/carol.jpg", status: "OnVacation" },
];

const mockFetch = vi.fn();
globalThis.fetch = mockFetch as unknown as typeof fetch;

const wrapper = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

const importHook = async () => {
  const module = await import("./useEmployees");
  return module.useEmployees;
};

type UseEmployeesReturn = {
  employees: Employee[];
  updateStatus: (id: number, status: Status) => void;
};

const renderAndResolve = async (useEmployees: () => UseEmployeesReturn) => {
  let hookResult!: { result: { current: UseEmployeesReturn } };

  await act(async () => {
    hookResult = renderHook(() => useEmployees(), { wrapper });
  });

  return hookResult;
};

describe("useEmployees", () => {
  beforeEach(() => {
    vi.resetModules();

    mockFetch.mockImplementation((url: string, options?: RequestInit) => {
      if (url === "http://localhost:3001/users" && !options?.method) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(structuredClone(mockEmployees)),
        });
      }

      if (
        url.startsWith("http://localhost:3001/users/") &&
        options?.method === "PATCH"
      ) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }

      return Promise.resolve({ ok: false, status: 404 });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should load and return initial employees from the API", async () => {
    const useEmployees = await importHook();
    const { result } = await renderAndResolve(useEmployees);

    expect(result.current.employees).toHaveLength(3);
    expect(result.current.employees).toEqual(mockEmployees);
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:3001/users");
  });

  it("should call PATCH and update employee status", async () => {
    const useEmployees = await importHook();
    const { result } = await renderAndResolve(useEmployees);

    await act(async () => {
      result.current.updateStatus(1, "OnVacation");
    });

    await waitFor(() => {
      expect(result.current.employees.find((e) => e.id === 1)?.status).toBe(
        "OnVacation",
      );
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:3001/users/1",
      expect.objectContaining({
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "OnVacation" }),
      }),
    );
  });

  it("should optimistically update status before PATCH resolves", async () => {
    let resolvePatch!: () => void;
    const patchPromise = new Promise<void>((resolve) => {
      resolvePatch = resolve;
    });

    mockFetch.mockImplementation((url: string, options?: RequestInit) => {
      if (url === "http://localhost:3001/users" && !options?.method) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(structuredClone(mockEmployees)),
        });
      }
      if (options?.method === "PATCH") {
        return patchPromise.then(() => ({
          ok: true,
          json: () => Promise.resolve({}),
        }));
      }
      return Promise.resolve({ ok: false });
    });

    const useEmployees = await importHook();
    const { result } = await renderAndResolve(useEmployees);

    await act(async () => {
      result.current.updateStatus(2, "OnVacation");
    });

    expect(result.current.employees.find((e) => e.id === 2)?.status).toBe(
      "OnVacation",
    );

    await act(async () => {
      resolvePatch();
    });

    await waitFor(() => {
      expect(result.current.employees.find((e) => e.id === 2)?.status).toBe(
        "OnVacation",
      );
    });
  });

  it("should not change other employees when updating one", async () => {
    const useEmployees = await importHook();
    const { result } = await renderAndResolve(useEmployees);

    await act(async () => {
      result.current.updateStatus(1, "OnVacation");
    });

    await waitFor(() => {
      expect(result.current.employees.find((e) => e.id === 1)?.status).toBe(
        "OnVacation",
      );
    });

    expect(result.current.employees.find((e) => e.id === 2)?.status).toBe(
      "Working",
    );
    expect(result.current.employees.find((e) => e.id === 3)?.status).toBe(
      "OnVacation",
    );
  });

  it("should throw when initial fetch fails", async () => {
    mockFetch.mockImplementation((url: string) => {
      if (url === "http://localhost:3001/users") {
        return Promise.resolve({ ok: false, status: 500 });
      }
      return Promise.resolve({ ok: false });
    });

    const useEmployees = await importHook();

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(async () => {
      await act(async () => {
        renderHook(() => useEmployees(), { wrapper });
      });
    }).rejects.toThrow("Failed to fetch employees");

    consoleSpy.mockRestore();
  });
});
