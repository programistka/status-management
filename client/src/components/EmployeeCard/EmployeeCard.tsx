import { memo, useCallback } from "react";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import { type Status, type Employee } from "../../types";

interface EmployeeCardProps {
  employee: Employee;
  onStatusChange: (id: number, status: Status) => void;
}

const EmployeeCard = memo(({ employee: { id, name, img, status }, onStatusChange }: EmployeeCardProps) => {
  const handleStatusChange = useCallback(
    (newStatus: Status) => onStatusChange(id, newStatus),
    [id, onStatusChange],
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 p-5 hover:shadow-md transition-shadow">
      <img
        src={img}
        alt={name}
        className="w-20 h-20 rounded-full object-cover shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
        }}
      />
      <div className="min-w-0">
        <p className="font-semibold text-gray-800 text-base mb-1 truncate">
          {name}
        </p>
        <div>
          <StatusDropdown
            status={status}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
});

export default EmployeeCard;
