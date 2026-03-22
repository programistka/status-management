import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import type { Request, Response } from "express";

type Status = "Working" | "OnVacation" | "LunchTime" | "BusinessTrip";

interface Employee {
  id: number;
  name: string;
  status: Status;
  img: string;
}

interface ApiError {
  error: string;
}

const PORT = 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const employees: Employee[] = [
  { id: 1, name: "John Smith", status: "Working", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Jack Brown", status: "OnVacation", img: "https://randomuser.me/api/portraits/men/44.jpg" },
  { id: 3, name: "Sheli Cohen", status: "Working", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: 4, name: "Eitan Levi", status: "BusinessTrip", img: "https://randomuser.me/api/portraits/men/75.jpg" },
  { id: 5, name: "Sara Miller", status: "LunchTime", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 6, name: "David Wilson", status: "Working", img: "https://randomuser.me/api/portraits/men/22.jpg" },
];

app.get("/users", (_req: Request, res: Response<Employee[]>) => {
  res.json(employees);
});

app.patch<{ id: string }, Employee[] | ApiError, { status: Status }>(
  "/users/:id",
  (req, res) => {
    const index = employees.findIndex((emp) => emp.id === +req.params.id);
    if (index === -1) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    employees[index].status = req.body.status;
    res.json(employees);
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
