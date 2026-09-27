import { describe, expect, it } from "vitest";
import {
  getLevelForXp,
  getLevelProgress,
  getLevelThreshold,
} from "./progression";

describe("SYSTEM progression", () => {
  it("starts a new Player at level 1 with zero XP", () => {
    expect(getLevelForXp(0)).toBe(1);
    expect(getLevelThreshold(1)).toBe(0);
  });

  it("uses the cumulative level thresholds from the Module 2 specification", () => {
    expect(getLevelThreshold(2)).toBe(100);
    expect(getLevelThreshold(3)).toBe(313);
    expect(getLevelForXp(99)).toBe(1);
    expect(getLevelForXp(100)).toBe(2);
  });

  it("calculates progress inside the current level", () => {
    expect(getLevelProgress(0)).toEqual({
      level: 1,
      currentXp: 0,
      nextLevelXp: 100,
      percent: 0,
    });

    expect(getLevelProgress(50)).toEqual({
      level: 1,
      currentXp: 50,
      nextLevelXp: 100,
      percent: 50,
    });
  });
});
