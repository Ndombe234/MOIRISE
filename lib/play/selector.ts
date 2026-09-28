import type { GameDefinition, GameUnlockContext } from "./types";
import { PLAY_PROTOTYPES } from "./catalog";

export function selectPlayGame(
  context: GameUnlockContext,
  requestedGameId?: string,
): GameDefinition {
  const unlocked = PLAY_PROTOTYPES.filter((game) => game.isUnlocked(context));
  if (!unlocked.length) throw new Error("No PLAY experience is available.");

  if (requestedGameId) {
    const requested = unlocked.find((game) => game.id === requestedGameId);
    if (requested) return requested;
  }

  const playXp = context.dimensions.play ?? 0;
  return unlocked[playXp % unlocked.length];
}
