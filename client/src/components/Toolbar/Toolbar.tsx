import CreateButton from "../CreateButton/CreateButton";
import Filters from "../Filters/Filters";
import { type Status } from "../../types";

interface ToolbarProps {
  query: string;
  onQueryChange: (query: string) => void;
  statusFilter: Status | null;
  onStatusFilterChange: (status: Status | null) => void;
}

const Toolbar = ({ query, onQueryChange, statusFilter, onStatusFilterChange }: ToolbarProps) => (
  <div className="flex items-center mb-8 bg-white rounded-lg shadow-sm">
    <CreateButton />
    <Filters
      query={query}
      onQueryChange={onQueryChange}
      statusFilter={statusFilter}
      onStatusFilterChange={onStatusFilterChange}
    />
  </div>
);

export default Toolbar;
