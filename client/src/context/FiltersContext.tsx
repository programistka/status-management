import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type Status } from "../types";

// Four separate contexts instead of one combined object to avoid unnecessary re-renders.
// Consumers of query (Search, EmployeesList) won't re-render when statusFilter changes,
// and vice versa. Setters (SetQueryContext, SetStatusFilterContext) are split from values
// because useState setters are stable references — components that only dispatch
// (e.g. a clear button) never need to re-render when the value itself changes.
const QueryContext = createContext<string>("");
const SetQueryContext = createContext<Dispatch<SetStateAction<string>>>(() => {});
const StatusFilterContext = createContext<Status | null>(null);
const SetStatusFilterContext = createContext<Dispatch<SetStateAction<Status | null>>>(() => {});

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | null>(null);

  return (
    <QueryContext.Provider value={query}>
      <SetQueryContext.Provider value={setQuery}>
        <StatusFilterContext.Provider value={statusFilter}>
          <SetStatusFilterContext.Provider value={setStatusFilter}>
            {children}
          </SetStatusFilterContext.Provider>
        </StatusFilterContext.Provider>
      </SetQueryContext.Provider>
    </QueryContext.Provider>
  );
};

export const useQuery = () => useContext(QueryContext);
export const useSetQuery = () => useContext(SetQueryContext);
export const useStatusFilter = () => useContext(StatusFilterContext);
export const useSetStatusFilter = () => useContext(SetStatusFilterContext);
