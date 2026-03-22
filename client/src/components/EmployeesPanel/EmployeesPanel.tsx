import { useDeferredValue, useMemo, useState } from "react";
import Search from "../Search/Search";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { useEmployees } from "../../hooks/useEmployees";

const EmployeesPanel = () => {
  const { employees, updateStatus } = useEmployees();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredEmployees = useMemo(
    () => employees.filter(({ name }) =>
      name.toLowerCase().includes(deferredQuery.toLowerCase()),
    ),
    [employees, deferredQuery],
  );

  return (
    <main className="px-8 pb-8">
      <Search query={query} onQueryChange={setQuery} />
      {filteredEmployees.length === 0 ? (
        <p className="text-gray-400 text-sm mt-6">No employees found for "{query}".</p>
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
