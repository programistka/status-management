import { useFilteredEmployees } from "@/hooks/useFilteredEmployees";
import EmployeeCard from "@/components/EmployeeCard/EmployeeCard";
import EmptyState from "@/components/EmptyState/EmptyState";

const EmployeesList = () => {
  const { filtered, updateStatus } = useFilteredEmployees();

  if (filtered.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {filtered.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onStatusChange={updateStatus}
        />
      ))}
    </div>
  );
};

export default EmployeesList;
