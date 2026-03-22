import { use, useOptimistic, useState, useTransition } from "react";
import { type Status, type Employee } from "../types";

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch("http://localhost:3001/users");
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
};

const employeesPromise: Promise<Employee[]> = fetchEmployees();

export const useEmployees = () => {
  const initialEmployees = use(employeesPromise);
  const [employees, setEmployees] = useState(initialEmployees);
  const [, startTransition] = useTransition();
  const [optimisticEmployees, setOptimisticStatus] = useOptimistic(
    employees,
    (state, { id, status }: { id: number; status: Status }) =>
      state.map((e) => (e.id === id ? { ...e, status } : e)),
  );

  const updateStatus = (id: number, status: Status) => {
    startTransition(async () => {
      setOptimisticStatus({ id, status });
      await fetch(`http://localhost:3001/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setEmployees((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e)),
      );
    });
  };

  return { employees: optimisticEmployees, updateStatus };
};
