import { useStatusFilter, useSetStatusFilter } from "@/context/FiltersContext";
import StatusSelect from "@/components/StatusSelect/StatusSelect";

const FilterByStatus = () => {
  const statusFilter = useStatusFilter();
  const setStatusFilter = useSetStatusFilter();

  return (
    <StatusSelect
      value={statusFilter}
      onChange={setStatusFilter}
      nullable
      placeholder="Filter by status"
      align="right"
    />
  );
};

export default FilterByStatus;
