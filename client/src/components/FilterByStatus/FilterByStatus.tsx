import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { type Status, STATUSES } from "../../types";
import { STATUS_CONFIG } from "../../statusConfig";

interface FilterByStatusProps {
  statusFilter: Status | null;
  onStatusFilterChange: (status: Status | null) => void;
}

const FilterByStatus = ({ statusFilter, onStatusFilterChange }: FilterByStatusProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="px-4 py-3.5 flex items-center gap-2 text-gray-500 text-sm font-medium hover:text-gray-700 focus:outline-none whitespace-nowrap"
      >
        {statusFilter ? (
          <>
            <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[statusFilter].color} shrink-0`} />
            {STATUS_CONFIG[statusFilter].label}
          </>
        ) : (
          "Filter by status"
        )}
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded shadow-lg border border-gray-100 z-10 py-1">
          <button
            onClick={() => { onStatusFilterChange(null); setIsOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 ${statusFilter === null ? "font-medium text-gray-800" : "text-gray-600"}`}
          >
            All statuses
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { onStatusFilterChange(s); setIsOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 ${statusFilter === s ? "font-medium text-gray-800" : "text-gray-600"}`}
            >
              <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[s].color} shrink-0`} />
              {STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByStatus;
