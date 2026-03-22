import { memo, useCallback } from "react";
import Avatar from "@/components/Avatar/Avatar";
import StatusSelect from "@/components/StatusSelect/StatusSelect";
import { type Status, type Employee } from "@/types";

interface EmployeeCardProps {
  employee: Employee;
  onStatusChange: (id: number, status: Status) => void;
}

const EmployeeCard = memo(({ employee: { id, name, img, status }, onStatusChange }: EmployeeCardProps) => {
  const handleStatusChange = useCallback(
    (newStatus: Status | null) => {
      if (newStatus !== null) onStatusChange(id, newStatus);
    },
    [id, onStatusChange],
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex items-end gap-4 p-5 hover:shadow-md transition-shadow">
      <Avatar src={img} name={name} />
      <div className="min-w-0">
        <p className="font-semibold text-gray-800 text-base mb-1 truncate">
          {name}
        </p>
        <div>
          <StatusSelect
            value={status}
            onChange={handleStatusChange}
            variant="compact"
          />
        </div>
      </div>
    </div>
  );
});

export default EmployeeCard;
