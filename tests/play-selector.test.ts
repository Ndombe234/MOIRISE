import { describe, expect, it } from "vitest";
import { selectNextGame } from "../lib/play/selector";
import type { GameDefinition } from "../lib/play/types";

const definitions: GameDefinition[] = [
  {
    id: "alpha",
    family: "pulse",
    title: "Alpha",
    description: "",
    estimatedSeconds: 30,
    dimensions: { play: 2, exploration: 1 } as never,
    difficulty: "calm",
    requiredLevel: 1,
    launchPath: "/play/alpha",
  },
  {
    id: "beta",
    family: "drift",
    title: "Beta",
    description: "",
    estimatedSeconds: 90,
    dimensions: { creation: 3 } as never,
    difficulty: "intense",
    requiredLevel: 3,
    launchPath: "/play/beta",
  },
];

describe("PLAY selector", () => {
  it("respects required level", () => {
    const result = selectNextGame({
      playerId: "p",
      systemLevel: 1,
      dimensions: { play: 5 },
      recentGameIds: [],
      sessionSeconds: 30,
    }, definitions);

    expect(result.game.id).toBe("alpha");
  });

  it("avoids recently played games when alternatives are available", () => {
    const result = selectNextGame({
      playerId: "p",
      systemLevel: 3,
      dimensions: { play: 5 },
      recentGameIds: ["alpha"],
      sessionSeconds: 30,
    }, definitions);

    expect(result.game.id).toBe("beta");
  });

  it("adapts the selected experience to SYSTEM dimensions", () => {
    const playFocused = selectNextGame({
      playerId: "p",
      systemLevel: 3,
      dimensions: { play: 5 },
      recentGameIds: [],
      sessionSeconds: 30,
    }, definitions);
    const creationFocused = selectNextGame({
      playerId: "p",
      systemLevel: 3,
      dimensions: { creation: 5 },
      recentGameIds: [],
      sessionSeconds: 60,
    }, definitions);

    expect(playFocused.game.id).toBe("alpha");
    expect(creationFocused.game.id).toBe("beta");
  });

  it("is deterministic for the same input", () => {
    const context = {
      playerId: "p",
      systemLevel: 3,
      dimensions: { play: 2 },
      recentGameIds: [],
      sessionSeconds: 60,
    };

    expect(selectNextGame(context, definitions)).toEqual(selectNextGame(context, definitions));
  });
});
