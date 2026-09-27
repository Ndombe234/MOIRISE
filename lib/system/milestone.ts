export type IdentityCompletionRequest = {
  eventType: "player_identity_completed";
  dimensionKey: null;
  xpDelta: 25;
  idempotencyKey: string;
  sourceType: "player";
  sourceId: string;
  metadata: { source: "player_identity" };
};

export function buildIdentityCompletionRequest(playerId: string): IdentityCompletionRequest {
  if (!playerId.trim()) {
    throw new Error("Player ID is required.");
  }

  return {
    eventType: "player_identity_completed",
    dimensionKey: null,
    xpDelta: 25,
    idempotencyKey: `player_identity_completed:${playerId}`,
    sourceType: "player",
    sourceId: playerId,
    metadata: { source: "player_identity" },
  };
}
