import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useStatusFilter, useSetStatusFilter } from "../../context/FiltersContext";
import { STATUSES } from "../../types";
import { STATUS_CONFIG } from "../../statusConfig";
import { cn } from "../../lib/cn";

const FilterByStatus = () => {
  const statusFilter = useStatusFilter();
  const setStatusFilter = useSetStatusFilter();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="px-4 py-3.5 flex items-center gap-2 text-gray-500 text-sm font-medium hover:text-gray-700 focus:outline-none whitespace-nowrap"
      >
        {statusFilter ? (
          <>
            <span className={cn("w-2 h-2 rounded-full shrink-0", STATUS_CONFIG[statusFilter].color)} />
            {STATUS_CONFIG[statusFilter].label}
          </>
        ) : (
          "Filter by status"
        )}
        <ChevronDownIcon className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded shadow-lg border border-gray-100 z-10 py-1">
          <button
            onClick={() => { setStatusFilter(null); setIsOpen(false); }}
            className={cn("w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50", statusFilter === null ? "font-medium text-gray-800" : "text-gray-600")}
          >
            All statuses
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setIsOpen(false); }}
              className={cn("w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50", statusFilter === s ? "font-medium text-gray-800" : "text-gray-600")}
            >
              <span className={cn("w-2 h-2 rounded-full shrink-0", STATUS_CONFIG[s].color)} />
              {STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByStatus;
