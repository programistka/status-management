import { useEffect, useRef, useState } from "react";
import { type Status, STATUSES } from "../../types";
import { STATUS_CONFIG } from "../../statusConfig";

interface StatusDropdownProps {
  status: Status;
  onStatusChange: (status: Status) => void;
}

const StatusDropdown = ({ status, onStatusChange }: StatusDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const config = STATUS_CONFIG[status];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <span className={`w-2 h-2 rounded-full ${config.color} shrink-0`} />
        <span>{config.label}</span>
        <svg
          className={`w-3 h-3 ml-0.5 transition-transform ${open ? "rotate-180" : ""}`}
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

      {open && (
        <div className="absolute left-0 top-full mt-1 w-40 bg-white rounded shadow-lg border border-gray-100 z-10 py-1">
          {STATUSES.map((s) => {
            const sc = STATUS_CONFIG[s];
            return (
              <button
                key={s}
                onClick={() => {
                  onStatusChange(s);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                  s === status ? "font-medium text-gray-800" : "text-gray-600"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${sc.color} shrink-0`} />
                {sc.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
