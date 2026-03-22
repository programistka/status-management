import { memo, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { type Status, STATUSES } from "../../types";
import { STATUS_CONFIG } from "../../statusConfig";
import { cn } from "../../lib/cn";

interface StatusDropdownProps {
  status: Status;
  onStatusChange: (status: Status) => void;
}

const StatusDropdown = memo(({ status, onStatusChange }: StatusDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const config = STATUS_CONFIG[status];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <span className={cn("w-2 h-2 rounded-full shrink-0", config.color)} />
        <span>{config.label}</span>
        <ChevronDownIcon className={cn("w-3 h-3 ml-0.5 transition-transform", open && "rotate-180")} />
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
                className={cn("w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50", s === status ? "font-medium text-gray-800" : "text-gray-600")}
              >
                <span className={cn("w-2 h-2 rounded-full shrink-0", sc.color)} />
                {sc.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default StatusDropdown;
