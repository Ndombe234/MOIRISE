import { describe, expect, it } from "vitest";
import { selectPlayGame } from "../lib/play/selector";

describe("PLAY selector", () => {
  it("honors an unlocked requested game", () => {
    expect(selectPlayGame({ level: 1, totalXp: 0, dimensions: { play: 0 } }, "rulefall").id).toBe("rulefall");
  });

  it("selects deterministically from play progression", () => {
    const context = { level: 1, totalXp: 0, dimensions: { play: 1 } };
    expect(selectPlayGame(context).id).toBe(selectPlayGame(context).id);
  });

  it("falls back when requested game is unavailable", () => {
    expect(selectPlayGame({ level: 1, totalXp: 0, dimensions: { play: 0 } }, "unknown").id).toBe("echo-grid");
  });
});
