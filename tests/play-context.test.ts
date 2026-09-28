import { describe, expect, it } from "vitest";
import { selectNextGame } from "../lib/play/selector";
import type { GameDefinition } from "../lib/play/types";

const games: GameDefinition[] = [
  {
    id: "calm-path",
    family: "pulse",
    title: "Calm Path",
    description: "",
    estimatedSeconds: 20,
    dimensions: { exploration: 2 },
    difficulty: "calm",
    requiredLevel: 1,
    launchPath: "/play/calm-path",
  },
  {
    id: "deep-build",
    family: "forge",
    title: "Deep Build",
    description: "",
    estimatedSeconds: 110,
    dimensions: { creation: 2, play: 1 },
    difficulty: "focused",
    requiredLevel: 1,
    launchPath: "/play/deep-build",
  },
];

describe("PLAY context selection", () => {
  it("can surface novelty when the strongest-affinity game was already played", () => {
    const result = selectNextGame({
      playerId: "player",
      systemLevel: 1,
      dimensions: { exploration: 10 },
      recentGameIds: ["calm-path"],
      sessionSeconds: 20,
    }, games);

    expect(result.game.id).toBe("deep-build");
    expect(result.reason).toContain("découvrir");
  });

  it("uses session history to prefer a duration-compatible experience", () => {
    const result = selectNextGame({
      playerId: "player",
      systemLevel: 1,
      dimensions: {},
      recentGameIds: ["calm-path"],
      sessionSeconds: 120,
    }, games);

    expect(result.game.id).toBe("deep-build");
  });
});
