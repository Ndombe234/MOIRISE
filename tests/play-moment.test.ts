import { describe, expect, it } from "vitest";
import { createPlayMoment, parseChallenge } from "../lib/play/moment";

describe("PLAY Moments", () => {
  const result = {
    status: "completed" as const,
    score: 82,
    durationMs: 12345,
    seed: "abcd",
    metadata: { collisions: 0 },
  };

  it("creates a stable deep link", () => {
    const moment = createPlayMoment("echo-grid", result, "https://morise.example");
    expect(moment.deepLink).toContain("/play?game=echo-grid");
    expect(parseChallenge(new URL(moment.deepLink).searchParams.get("challenge") ?? undefined)?.gameId).toBe("echo-grid");
  });

  it("rejects tampered challenge versions and unknown games", () => {
    expect(parseChallenge(encodeURIComponent(JSON.stringify({ gameId: "echo-grid", gameVersion: 99, seed: "abc" })))).toBeNull();
    expect(parseChallenge(encodeURIComponent(JSON.stringify({ gameId: "missing", gameVersion: 1, seed: "abc" })))).toBeNull();
  });
});
