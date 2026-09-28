import { describe, expect, it } from "vitest";
import { canRoute } from "../components/play/shadow-courier";

describe("Shadow Courier", () => {
  it("finds a route through a connected light network", () => {
    expect(canRoute([4, 9, 14, 13, 12])).toBe(true);
  });

  it("rejects an incomplete network", () => {
    expect(canRoute([4, 5, 10, 15])).toBe(false);
  });
});