import FilterByStatus from "@/components/FilterByStatus/FilterByStatus";
import Search from "@/components/Search/Search";

const Filters = () => (
  <div className="flex items-center gap-0 flex-1">
    <Search />
    <div className="w-px h-8 bg-gray-200 shrink-0" />
    <FilterByStatus />
  </div>
);

export default Filters;
