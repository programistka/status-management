import { use, useCallback, useOptimistic, useState, useTransition } from "react";
import { type Status, type Employee } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
};

export let employeesPromise: Promise<Employee[]> = fetchEmployees();

export const resetEmployeesPromise = () => {
  employeesPromise = fetchEmployees();
};

export const useEmployees = () => {
  const initialEmployees = use(employeesPromise);
  const [employees, setEmployees] = useState(initialEmployees);
  const [, startTransition] = useTransition();
  const [optimisticEmployees, setOptimisticStatus] = useOptimistic(
    employees,
    (state, { id, status }: { id: number; status: Status }) =>
      state.map((e) => (e.id === id ? { ...e, status } : e)),
  );

  const updateStatus = useCallback((id: number, status: Status) => {
    startTransition(async () => {
      setOptimisticStatus({ id, status });
      try {
        await fetch(`${API_URL}/users/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
      } catch {
        // server unavailable — still persist locally
      }
      setEmployees((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e)),
      );
    });
  }, [setOptimisticStatus]);

  return { employees: optimisticEmployees, updateStatus };
};
