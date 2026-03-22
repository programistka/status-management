import Search from "../Search/Search";
import FilterByStatus from "../FilterByStatus/FilterByStatus";
import { type Status } from "../../types";

interface FiltersProps {
  query: string;
  onQueryChange: (query: string) => void;
  statusFilter: Status | null;
  onStatusFilterChange: (status: Status | null) => void;
}

const Filters = ({ query, onQueryChange, statusFilter, onStatusFilterChange }: FiltersProps) => (
  <div className="flex items-center gap-0 flex-1">
    <Search query={query} onQueryChange={onQueryChange} />
    <div className="w-px h-8 bg-gray-200 shrink-0" />
    <FilterByStatus statusFilter={statusFilter} onStatusFilterChange={onStatusFilterChange} />
  </div>
);

export default Filters;