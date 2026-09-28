import type { GameMoment, GameResult } from "./types";
import { getGameDefinition } from "./catalog";

export function createPlayMoment(
  gameId: string,
  result: GameResult,
  origin: string,
): GameMoment {
  const game = getGameDefinition(gameId);
  if (!game) throw new Error("Unknown game.");
  const base = game.createMoment(result);
  const challenge = encodeURIComponent(JSON.stringify({
    gameId,
    gameVersion: game.version,
    seed: result.seed,
  }));
  return {
    ...base,
    deepLink: `${origin}/play?game=${encodeURIComponent(gameId)}&seed=${encodeURIComponent(result.seed)}&challenge=${challenge}`,
  };
}

export function parseChallenge(value: string | undefined) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(value));
    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.gameId !== "string" ||
      typeof parsed.gameVersion !== "number" ||
      typeof parsed.seed !== "string"
    ) return null;
    const game = getGameDefinition(parsed.gameId);
    if (!game || game.version !== parsed.gameVersion || parsed.seed.length > 64) return null;
    return { gameId: parsed.gameId as string, gameVersion: parsed.gameVersion as number, seed: parsed.seed as string };
  } catch {
    return null;
  }
}
