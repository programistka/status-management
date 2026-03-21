import StatusDropdown from "../StatusDropdown/StatusDropdown";

type Status = "Working" | "OnVacation" | "LunchTime" | "BusinessTrip";

interface Employee {
  id: number;
  name: string;
  status: Status;
  img: string;
}

interface EmployeeCardProps {
  employee: Employee;
  onStatusChange: (id: number, status: Status) => void;
}

const EmployeeCard = ({ employee, onStatusChange }: EmployeeCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 p-5 hover:shadow-md transition-shadow">
      <img
        src={employee.img}
        alt={employee.name}
        className="w-20 h-20 rounded-full object-cover shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random`;
        }}
      />
      <div className="min-w-0">
        <p className="font-semibold text-gray-800 text-base mb-1 truncate">
          {employee.name}
        </p>
        <div>
          <StatusDropdown
            status={employee.status}
            onStatusChange={(status) => onStatusChange(employee.id, status)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
