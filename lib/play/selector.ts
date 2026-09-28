import type { SystemDimensionKey } from "@/lib/system/constants";
import type { GameDefinition, PlayContext, PlaySelection } from "@/lib/play/types";

const difficultyPenalty: Record<GameDefinition["difficulty"], number> = {
  calm: 0,
  focused: 1,
  intense: 2,
};

function dimensionAffinity(game: GameDefinition, dimensions: PlayContext["dimensions"]) {
  return Object.entries(game.dimensions).reduce((total, [key, weight]) => {
    const playerValue = dimensions[key as SystemDimensionKey] ?? 0;
    return total + playerValue * (weight ?? 0);
  }, 0);
}

export function selectNextGame(context: PlayContext, definitions: GameDefinition[]): PlaySelection {
  const candidates = definitions.filter((game) => game.requiredLevel <= context.systemLevel);
  const pool = candidates.length ? candidates : definitions.filter((game) => game.requiredLevel === 1);
  if (!pool.length) throw new Error("No PLAY experience is available.");

  const scored = pool.map((game) => {
    const affinity = dimensionAffinity(game, context.dimensions);
    const recencyPenalty = context.recentGameIds.includes(game.id) ? 8 : 0;
    const sessionDelta = Math.abs(game.estimatedSeconds - context.sessionSeconds) / 30;
    const score = affinity - recencyPenalty - sessionDelta - difficultyPenalty[game.difficulty];
    return { game, affinity, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.game.id.localeCompare(b.game.id);
  });

  const chosen = scored[0];
  return {
    game: chosen.game,
    affinity: chosen.affinity,
    reason: chosen.affinity > 4
      ? "Ton SYSTEM montre une affinité avec cette expérience."
      : "Cette expérience complète ton prochain moment de jeu.",
  };
}