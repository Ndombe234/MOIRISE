export function createGameSeed(input: string): string {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function createGameRunKey(
  playerId: string,
  gameId: string,
  clientRunId: string,
): string {
  return createGameSeed(`${playerId}:${gameId}:${clientRunId}`);
}