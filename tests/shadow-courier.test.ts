import { describe, expect, it } from "vitest";
import { generateShadowChallenge, validateShadowRun } from "../lib/play/games/shadow-courier";

describe("Shadow Courier", () => {
  it("generates deterministic challenges", () => {
    expect(generateShadowChallenge(77)).toEqual(generateShadowChallenge(77));
  });

  it("accepts the designed corridor", () => {
    const challenge = generateShadowChallenge(77);
    const path = [
      [6,0],[5,0],[4,0],[3,0],[2,0],[1,0],[0,0],
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
    ] as [number, number][];
    const result = validateShadowRun(challenge, path);
    expect(result.valid).toBe(true);
  });

  it("rejects malformed movement", () => {
    const challenge = generateShadowChallenge(77);
    const result = validateShadowRun(challenge, [[6,0],[6,3]] as [number, number][]);
    expect(result.valid).toBe(false);
  });
});
