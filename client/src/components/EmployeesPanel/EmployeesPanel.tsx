import { useDeferredValue, useMemo, useState } from "react";
import Filters from "../Filters/Filters";
import CreateButton from "../CreateButton/CreateButton";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { useEmployees } from "../../hooks/useEmployees";
import { type Status } from "../../types";

const EmployeesPanel = () => {
  const { employees, updateStatus } = useEmployees();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);
  const deferredQuery = useDeferredValue(query);

  const filteredEmployees = useMemo(
    () => employees.filter(({ name, status }) =>
      name.toLowerCase().includes(deferredQuery.toLowerCase()) &&
      (statusFilter === null || status === statusFilter),
    ),
    [employees, deferredQuery, statusFilter],
  );

  return (
    <main className="px-8 pb-8">
      <div className="flex items-center mb-8 bg-white rounded-lg shadow-sm">
        <CreateButton />
        <Filters
          query={query}
          onQueryChange={setQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>
      {filteredEmployees.length === 0 ? (
        <p className="text-gray-400 text-sm mt-6">No employees found for filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onStatusChange={updateStatus}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default EmployeesPanel;
