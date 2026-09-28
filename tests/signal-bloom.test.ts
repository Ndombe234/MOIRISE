import { describe, expect, it } from "vitest";
import { generateSignalBloomChallenge, validateSignalBloomRun } from "@/lib/play/games/signal-bloom";

describe("Signal Bloom", () => {
  it("generates deterministic timing windows", () => {
    expect(generateSignalBloomChallenge(12)).toEqual(generateSignalBloomChallenge(12));
  });

  it("accepts perfect timing", () => {
    const challenge = generateSignalBloomChallenge(12);
    const result = validateSignalBloomRun(challenge, challenge.targetTimes);
    expect(result.valid).toBe(true);
    expect(result.score).toBe(840);
  });

  it("rejects impossible timing input", () => {
    const challenge = generateSignalBloomChallenge(12);
    expect(() => validateSignalBloomRun(challenge, [1])).toThrow();
  });
});
