import { useDeferredValue, useMemo } from "react";
import { useQuery, useStatusFilter } from "@/context/FiltersContext";
import { useEmployees } from "@/hooks/useEmployees";

export const useFilteredEmployees = () => {
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

  return { filtered, updateStatus };
};
