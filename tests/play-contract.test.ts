import { describe, expect, it } from "vitest";
import { PLAY_PROTOTYPES, getGameDefinition } from "../lib/play/catalog";

describe("PLAY contract", () => {
  it("exposes three experimental prototypes", () => {
    expect(PLAY_PROTOTYPES.map((game) => game.id)).toEqual([
      "echo-grid",
      "shadow-forge",
      "rulefall",
    ]);
    expect(PLAY_PROTOTYPES.every((game) => game.isPrototype)).toBe(true);
  });

  it("keeps game definitions valid", () => {
    for (const game of PLAY_PROTOTYPES) {
      expect(game.version).toBeGreaterThan(0);
      expect(game.estimatedDurationSeconds).toBeGreaterThan(0);
      expect(game.solo).toBe(true);
      expect(game.shareable).toBe(true);
      expect(typeof game.isUnlocked).toBe("function");
      expect(typeof game.createMoment).toBe("function");
    }
  });

  it("finds a game by id", () => {
    expect(getGameDefinition("echo-grid")?.name).toBe("ECHO GRID");
    expect(getGameDefinition("missing")).toBeNull();
  });
});
