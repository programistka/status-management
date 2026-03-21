import { use } from "react";

type Status = "Working" | "OnVacation" | "LunchTime" | "BusinessTrip";

interface Employee {
  id: number;
  name: string;
  status: Status;
  img: string;
}

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch("http://localhost:3001/users");
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
};

let employeesPromise: Promise<Employee[]> | null = null;

export const useEmployees = () => {
  if (!employeesPromise) {
    employeesPromise = fetchEmployees();
  }

  const employees = use(employeesPromise);
  return { employees };
};
