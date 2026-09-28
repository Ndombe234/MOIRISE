import { describe, expect, it } from "vitest";
import { clampDodge, scoreSurvival } from "../components/play/last-second";

describe("Last Second", () => {
  it("keeps the player inside the arena", () => {
    expect(clampDodge(-10, 100)).toBe(0);
    expect(clampDodge(130, 100)).toBe(100);
    expect(clampDodge(55, 100)).toBe(55);
  });

  it("turns survival time and clean dodges into a bounded score", () => {
    expect(scoreSurvival(0, 0)).toBe(0);
    expect(scoreSurvival(10, 10)).toBeGreaterThan(0);
    expect(scoreSurvival(100, 100)).toBe(1000);
  });
});
