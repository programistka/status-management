import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FiltersProvider } from "../../context/FiltersContext";
import Search from "./Search";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FiltersProvider>{children}</FiltersProvider>
);

describe("Search", () => {
  it("renders input with placeholder", () => {
    render(<Search />, { wrapper });

    expect(screen.getByPlaceholderText("Type to search")).toBeInTheDocument();
  });

  it("updates input value when typing", async () => {
    render(<Search />, { wrapper });

    await userEvent.type(screen.getByPlaceholderText("Type to search"), "John");

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
  });

  it("does not show clear button when query is empty", () => {
    render(<Search />, { wrapper });

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows clear button when query is not empty", async () => {
    render(<Search />, { wrapper });

    await userEvent.type(screen.getByPlaceholderText("Type to search"), "John");

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("clears input when clear button is clicked", async () => {
    render(<Search />, { wrapper });

    await userEvent.type(screen.getByPlaceholderText("Type to search"), "John");
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });
});
