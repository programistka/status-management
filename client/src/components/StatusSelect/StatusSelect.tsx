import { memo } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDropdown } from "@/hooks/useDropdown";
import { type Status, STATUSES } from "@/types";
import { STATUS_CONFIG } from "@/statusConfig";
import { cn } from "@/lib/cn";

interface StatusSelectProps {
  value: Status | null;
  onChange: (status: Status | null) => void;
  nullable?: boolean;
  placeholder?: string;
  variant?: "default" | "compact";
  align?: "left" | "right";
}

const triggerStyles: Record<string, string> = {
  default:
    "px-4 py-3.5 flex items-center gap-2 text-gray-500 text-sm font-medium hover:text-gray-700 focus:outline-none whitespace-nowrap cursor-pointer",
  compact:
    "flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer",
};

const chevronStyles: Record<string, string> = {
  default: "w-4 h-4",
  compact: "w-3 h-3 ml-0.5",
};

const StatusSelect = memo(({
  value,
  onChange,
  nullable = false,
  placeholder = "Select status",
  variant = "default",
  align = "left",
}: StatusSelectProps) => {
  const { isOpen, setIsOpen, ref } = useDropdown();

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={triggerStyles[variant]}
      >
        {value ? (
          <>
            <span className={cn("w-2 h-2 rounded-full shrink-0", STATUS_CONFIG[value].color)} />
            <span>{STATUS_CONFIG[value].label}</span>
          </>
        ) : (
          placeholder
        )}
        <ChevronDownIcon
          className={cn(chevronStyles[variant], "transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-1 w-44 bg-white rounded shadow-lg border border-gray-100 z-10 py-1",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {nullable && (
            <button
              onClick={() => { onChange(null); setIsOpen(false); }}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer",
                value === null ? "font-medium text-gray-800" : "text-gray-600",
              )}
            >
              All statuses
            </button>
          )}
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { onChange(s); setIsOpen(false); }}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer",
                s === value ? "font-medium text-gray-800" : "text-gray-600",
              )}
            >
              <span className={cn("w-2 h-2 rounded-full shrink-0", STATUS_CONFIG[s].color)} />
              {STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default StatusSelect;
