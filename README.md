# Employee Status Management

A full-stack app for viewing and managing employee statuses in real time.

## Tech Stack

**Client:** React 19, TypeScript, Vite, Tailwind CSS, Vitest
**Server:** Node.js, Express, TypeScript

## Getting Started

```bash
pnpm install:all   # install dependencies for both server and client
pnpm dev           # start server and client concurrently
```

- Client: `http://localhost:5173`
- Server: `http://localhost:3001`

Requires a `.env` file in the `client/` directory:

```
VITE_API_URL=http://localhost:3001
```

An `.env.example` file is provided as a template.

## Features

- View a list of all employees with their current status
- Filter employees by status
- Search employees by name
- Change an employee's status — updates the server via `PATCH /users/:id` with optimistic UI
- Create New User modal (UI only — closes on Create or Cancel)

## Running Tests

```bash
cd client
pnpm test         # watch mode
pnpm test:run     # single run
```

## Project Structure

```
├── client/               # React app
│   └── src/
│       ├── components/   # UI components
│       ├── context/      # FiltersContext (search + status filter)
│       ├── hooks/        # useEmployees, useFilteredEmployees, useDropdown
│       ├── lib/          # cn() utility
│       └── types.ts      # Shared types
└── server/
    └── server.ts         # Express REST API
```

## API

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/users`         | Returns all employees     |
| PATCH  | `/users/:id`     | Updates employee status   |

Request body for PATCH:
```json
{ "status": "Working" }
```

Available statuses: `Working`, `OnVacation`, `LunchTime`, `BusinessTrip`
