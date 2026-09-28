import { describe, expect, it } from "vitest";
import { createEchoGrid, echoGridScore, stepEchoGrid } from "../lib/play/games/echo-grid";

describe("ECHO GRID", () => {
  it("is deterministic for the same seed", () => {
    expect(createEchoGrid("same").goal).toEqual(createEchoGrid("same").goal);
  });

  it("replays delayed actions into the echo lane", () => {
    let state = createEchoGrid("test");
    state = stepEchoGrid(state, "right");
    state = stepEchoGrid(state, "right");
    state = stepEchoGrid(state, "down");
    expect(state.echo).not.toEqual([4, 0]);
  });

  it("returns a bounded score", () => {
    const state = createEchoGrid("test");
    expect(echoGridScore(state)).toBeGreaterThanOrEqual(0);
    expect(echoGridScore(state)).toBeLessThanOrEqual(100);
  });
});
