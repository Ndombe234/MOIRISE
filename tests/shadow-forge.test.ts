import { describe, expect, it } from "vitest";
import { appendForgeAction, createShadowForge, removeForgeAction, shadowForgeScore } from "../lib/play/games/shadow-forge";

describe("SHADOW FORGE", () => {
  it("builds a deterministic target", () => {
    expect(createShadowForge("a").target).toEqual(createShadowForge("a").target);
  });

  it("allows only a limited number of edits", () => {
    let state = createShadowForge("a");
    state = appendForgeAction(state, "forward");
    state = removeForgeAction(state, 0);
    state = removeForgeAction(state, 0);
    state = removeForgeAction(state, 0);
    expect(state.editsLeft).toBe(0);
    expect(removeForgeAction(state, 0)).toEqual(state);
  });

  it("scores a successful exact program", () => {
    let state = createShadowForge("a");
    for (const action of state.target) state = appendForgeAction(state, action);
    expect(state.status).toBe("success");
    expect(shadowForgeScore(state)).toBeGreaterThan(0);
  });
});
