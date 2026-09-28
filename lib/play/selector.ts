import type { SystemDimensionKey } from "@/lib/system/constants";
import type { GameDefinition, PlayContext, PlaySelection } from "@/lib/play/types";

const difficultyPenalty: Record<GameDefinition["difficulty"], number> = {
  calm: 0,
  focused: 1,
  intense: 2,
};

function dimensionAffinity(
  game: GameDefinition,
  dimensions: PlayContext["dimensions"],
  preferences: PlayContext["preferenceSignals"] = {},
) {
  return Object.entries(game.dimensions).reduce((total, [key, weight]) => {
    const dimension = key as SystemDimensionKey;
    const systemValue = dimensions[dimension] ?? 0;
    const preferenceValue = preferences?.[dimension] ?? 0;
    return total + systemValue * (weight ?? 0) + preferenceValue * (weight ?? 0) * 0.5;
  }, 0);
}

export function selectNextGame(context: PlayContext, definitions: readonly GameDefinition[]): PlaySelection {
  const candidates = definitions.filter((game) => game.requiredLevel <= context.systemLevel);
  const available = candidates.length > 0 ? candidates : definitions.filter((game) => game.requiredLevel === 1);

  if (!available.length) throw new Error("No PLAY experience is available.");

  const recentIndex = new Map(context.recentGameIds.map((id, index) => [id, index]));
  const scored = available.map((game) => {
    const recentPosition = recentIndex.get(game.id);
    const wasRecentlyPlayed = recentPosition !== undefined;
    const affinity = dimensionAffinity(game, context.dimensions, context.preferenceSignals);
    const sessionDelta = Math.abs(game.estimatedSeconds - context.sessionSeconds) / 30;
    const noveltyBonus = wasRecentlyPlayed ? 0 : 2;
    const cooldownPenalty = wasRecentlyPlayed ? Math.max(0, 2 - recentPosition * 0.35) : 0;
    const score = affinity + noveltyBonus - sessionDelta - difficultyPenalty[game.difficulty] - cooldownPenalty;
    return { game, affinity, score, wasRecentlyPlayed };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.affinity !== a.affinity) return b.affinity - a.affinity;
    return a.game.id.localeCompare(b.game.id);
  });

  const chosen = scored[0];
  const reason = !chosen.wasRecentlyPlayed
    ? (chosen.affinity > 4 ? "Ton SYSTEM montre une affinité avec cette expérience." : "Le SYSTEM te fait découvrir une nouvelle expérience.")
    : "Le SYSTEM revient vers une expérience qui correspond à ton évolution.";

  return { game: chosen.game, affinity: chosen.affinity, reason };
}
