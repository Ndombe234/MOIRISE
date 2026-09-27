import { describe, expect, it } from "vitest";
import { buildIdentityCompletionRequest } from "../lib/system/milestone";

describe("SYSTEM identity milestone", () => {
  it("builds a deterministic 25 XP identity-completion request", () => {
    expect(buildIdentityCompletionRequest("player-123")).toEqual({
      eventType: "player_identity_completed",
      dimensionKey: null,
      xpDelta: 25,
      idempotencyKey: "player_identity_completed:player-123",
      sourceType: "player",
      sourceId: "player-123",
      metadata: { source: "player_identity" },
    });
  });
});
