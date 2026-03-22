export const STATUSES = ["Working", "OnVacation", "LunchTime", "BusinessTrip"] as const;
export type Status = (typeof STATUSES)[number];

export interface Employee {
    id: number;
    name: string;
    status: Status;
    img: string;
}
