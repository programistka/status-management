import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { type Employee, type Status } from "../../types";

interface EmployeesListProps {
  employees: Employee[];
  onStatusChange: (id: number, status: Status) => void;
}

const EmployeesList = ({ employees, onStatusChange }: EmployeesListProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    {employees.map((employee) => (
      <EmployeeCard
        key={employee.id}
        employee={employee}
        onStatusChange={onStatusChange}
      />
    ))}
  </div>
);

export default EmployeesList;