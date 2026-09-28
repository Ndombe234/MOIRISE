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
    dimensions: { play: 2, exploration: 1 },
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
    dimensions: { creation: 3 },
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

  it("avoids recently played games when an eligible alternative exists", () => {
    const result = selectNextGame({
      playerId: "p",
      systemLevel: 3,
      dimensions: { play: 8, creation: 8 },
      recentGameIds: ["alpha"],
      sessionSeconds: 60,
    }, definitions);

    expect(result.game.id).toBe("beta");
  });

  it("uses preference signals as a secondary affinity", () => {
    const result = selectNextGame({
      playerId: "p",
      systemLevel: 3,
      dimensions: {},
      preferenceSignals: { creation: 10 },
      recentGameIds: [],
      sessionSeconds: 90,
    }, definitions);

    expect(result.game.id).toBe("beta");
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

  it("breaks ties by stable experience id", () => {
    const tied: GameDefinition[] = [
      { ...definitions[0], id: "zeta" },
      { ...definitions[0], id: "alpha-2" },
    ];

    expect(selectNextGame({
      playerId: "p",
      systemLevel: 1,
      dimensions: {},
      recentGameIds: [],
      sessionSeconds: 30,
    }, tied).game.id).toBe("alpha-2");
  });
});
