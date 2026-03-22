import type { Status } from "./types";

interface StatusConfig {
    color: string;
    label: string;
}

export const STATUS_CONFIG: Record<Status, StatusConfig> = {
    Working: { color: "bg-green-500", label: "Working" },
    OnVacation: { color: "bg-red-500", label: "On Vacation" },
    LunchTime: { color: "bg-yellow-500", label: "Lunch Time" },
    BusinessTrip: { color: "bg-purple-500", label: "Business Trip" },
};
