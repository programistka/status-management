import Search from "../Search/Search";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { useEmployees } from "../../hooks/useEmployees";

const EmployeesPanel = () => {
  const { employees, updateStatus } = useEmployees();

  return (
    <main className="px-8 pb-8">
      <Search />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onStatusChange={updateStatus}
          />
        ))}
      </div>
    </main>
  );
};

export default EmployeesPanel;
