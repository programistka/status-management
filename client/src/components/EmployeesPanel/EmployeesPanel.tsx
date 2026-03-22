import { useDeferredValue, useMemo, useState } from "react";
import Toolbar from "../Toolbar/Toolbar";
import EmployeesList from "../EmployeesList/EmployeesList";
import EmptyState from "../EmptyState/EmptyState";
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
        <EmptyState />
      ) : (
        <EmployeesList employees={filteredEmployees} onStatusChange={updateStatus} />
      )}
    </main>
  );
};

export default EmployeesPanel;
