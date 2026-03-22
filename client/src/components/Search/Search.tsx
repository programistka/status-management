import { useState } from "react";
import CreateUserModal from "../CreateUserModal/CreateUserModal";
import { type Status, STATUSES } from "../../types";
import { STATUS_CONFIG } from "../../statusConfig";

interface SearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  statusFilter: Status | null;
  onStatusFilterChange: (status: Status | null) => void;
}

const Search = ({ query, onQueryChange, statusFilter, onStatusFilterChange }: SearchProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
    <div className="flex items-center gap-0 mb-8 bg-white rounded-lg shadow-sm">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-colors shrink-0 rounded-l-lg"
      >
        Create
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>

      <div className="flex items-center gap-2 px-4 flex-1">
        <svg
          className="w-4 h-4 text-gray-400 shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={({ target }) => onQueryChange(target.value)}
          placeholder="Type to search"
          className="flex-1 py-3.5 text-sm text-gray-600 placeholder-gray-400 focus:outline-none bg-transparent"
        />
      </div>

      <div className="w-px h-8 bg-gray-200 shrink-0" />

      <div className="relative">
        <button
          onClick={() => setIsFilterOpen((v) => !v)}
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
          <svg
            className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isFilterOpen && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded shadow-lg border border-gray-100 z-10 py-1">
            <button
              onClick={() => { onStatusFilterChange(null); setIsFilterOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 ${statusFilter === null ? "font-medium text-gray-800" : "text-gray-600"}`}
            >
              All statuses
            </button>
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => { onStatusFilterChange(s); setIsFilterOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 ${statusFilter === s ? "font-medium text-gray-800" : "text-gray-600"}`}
              >
                <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[s].color} shrink-0`} />
                {STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
    {isModalOpen && <CreateUserModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Search;
