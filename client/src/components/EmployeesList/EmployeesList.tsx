import { useDeferredValue, useMemo } from "react";
import { useQuery, useStatusFilter } from "../../context/FiltersContext";
import { useEmployees } from "../../hooks/useEmployees";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import EmptyState from "../EmptyState/EmptyState";

const EmployeesList = () => {
  const { employees, updateStatus } = useEmployees();
  const query = useQuery();
  const statusFilter = useStatusFilter();
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(
    () =>
      employees.filter(
        ({ name, status }) =>
          name.toLowerCase().includes(deferredQuery.toLowerCase()) &&
          (statusFilter === null || status === statusFilter),
      ),
    [employees, deferredQuery, statusFilter],
  );

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
