import { describe, expect, it } from "vitest";
import { generateEchoChallenge, validateEchoRun, visibleEchoSequence } from "@/lib/play/games/echo-trace";

describe("Echo Trace", () => {
  it("generates deterministic transformed sequences", () => {
    const a = generateEchoChallenge(42);
    const b = generateEchoChallenge(42);
    expect(a).toEqual(b);
    expect(visibleEchoSequence(a)).toHaveLength(a.sequence.length);
  });

  it("accepts the exact transformed sequence", () => {
    const challenge = generateEchoChallenge(9);
    const result = validateEchoRun(challenge, visibleEchoSequence(challenge));
    expect(result.valid).toBe(true);
    expect(result.score).toBeGreaterThan(0);
  });

  it("rejects tampered moves", () => {
    const challenge = generateEchoChallenge(9);
    const expected = visibleEchoSequence(challenge);
    expected[0] = (expected[0] + 1) % 16;
    expect(validateEchoRun(challenge, expected).valid).toBe(false);
  });
});
