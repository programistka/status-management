import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const EmptyState = () => (
  <div className="py-12 flex flex-col items-center gap-3 text-gray-400">
    <MagnifyingGlassIcon className="w-10 h-10 text-gray-300" />
    <p className="text-sm font-medium text-gray-500">No employees found</p>
    <p className="text-xs">Try adjusting your search or filter.</p>
  </div>
);

export default EmptyState;
