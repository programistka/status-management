import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FiltersProvider } from "../../context/FiltersContext";
import FilterByStatus from "./FilterByStatus";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FiltersProvider>{children}</FiltersProvider>
);

describe("FilterByStatus", () => {
  it("renders default label when no filter selected", () => {
    render(<FilterByStatus />, { wrapper });

    expect(screen.getByText("Filter by status")).toBeInTheDocument();
  });

  it("shows all statuses and reset option after click", async () => {
    render(<FilterByStatus />, { wrapper });

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("All statuses")).toBeInTheDocument();
    expect(screen.getByText("On Vacation")).toBeInTheDocument();
    expect(screen.getByText("Lunch Time")).toBeInTheDocument();
    expect(screen.getByText("Business Trip")).toBeInTheDocument();
  });

  it("shows selected status label after selection", async () => {
    render(<FilterByStatus />, { wrapper });

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("On Vacation"));

    expect(screen.getByText("On Vacation")).toBeInTheDocument();
    expect(screen.queryByText("Filter by status")).not.toBeInTheDocument();
  });

  it("resets to default label after selecting All statuses", async () => {
    render(<FilterByStatus />, { wrapper });

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("Working"));
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("All statuses"));

    expect(screen.getByText("Filter by status")).toBeInTheDocument();
  });
});
