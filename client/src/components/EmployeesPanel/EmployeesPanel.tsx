import { useDeferredValue, useMemo, useState } from "react";
import Toolbar from "../Toolbar/Toolbar";
import EmployeesList from "../EmployeesList/EmployeesList";
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
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      {filteredEmployees.length === 0 ? (
        <p className="text-gray-400 text-sm mt-6">No employees found for filter.</p>
      ) : (
        <EmployeesList employees={filteredEmployees} onStatusChange={updateStatus} />
      )}
    </main>
  );
};

export default EmployeesPanel;
