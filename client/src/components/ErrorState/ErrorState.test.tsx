import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "react-error-boundary";
import ErrorState from "./ErrorState";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary fallbackRender={() => <ErrorState />}>{children}</ErrorBoundary>
);

const Throw = () => { throw new Error("test error"); };

describe("ErrorState", () => {
  it("renders error message", () => {
    render(<Throw />, { wrapper });

    expect(screen.getByText("Failed to load employees")).toBeInTheDocument();
  });

  it("renders hint to retry", () => {
    render(<Throw />, { wrapper });

    expect(screen.getByText("Check your connection and try again.")).toBeInTheDocument();
  });

  it("renders Try again button", () => {
    render(<Throw />, { wrapper });

    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("calls onReset when Try again is clicked", async () => {
    const onReset = vi.fn();
    render(
      <ErrorBoundary fallbackRender={() => <ErrorState />} onReset={onReset}>
        <Throw />
      </ErrorBoundary>,
    );

    await userEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(onReset).toHaveBeenCalled();
  });
});
