import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDropdown } from "./useDropdown";

describe("useDropdown", () => {
  it("is closed by default", () => {
    const { result } = renderHook(() => useDropdown());

    expect(result.current.isOpen).toBe(false);
  });

  it("opens when setIsOpen is called with true", () => {
    const { result } = renderHook(() => useDropdown());

    act(() => result.current.setIsOpen(true));

    expect(result.current.isOpen).toBe(true);
  });

  it("closes when Escape is pressed while open", async () => {
    const { result } = renderHook(() => useDropdown());

    act(() => result.current.setIsOpen(true));
    await userEvent.keyboard("{Escape}");

    expect(result.current.isOpen).toBe(false);
  });

  it("does not react to Escape when already closed", async () => {
    const { result } = renderHook(() => useDropdown());

    await userEvent.keyboard("{Escape}");

    expect(result.current.isOpen).toBe(false);
  });

  it("closes when clicking outside the ref element", async () => {
    const { result } = renderHook(() => useDropdown());

    const inner = document.createElement("div");
    document.body.appendChild(inner);
    (result.current.ref as React.MutableRefObject<HTMLDivElement>).current = inner;

    act(() => result.current.setIsOpen(true));
    await userEvent.click(document.body);

    expect(result.current.isOpen).toBe(false);

    document.body.removeChild(inner);
  });

  it("does not close when clicking inside the ref element", async () => {
    const { result } = renderHook(() => useDropdown());

    const div = document.createElement("div");
    document.body.appendChild(div);
    (result.current.ref as React.MutableRefObject<HTMLDivElement>).current = div;

    act(() => result.current.setIsOpen(true));
    await userEvent.click(div);

    expect(result.current.isOpen).toBe(true);

    document.body.removeChild(div);
  });
});
