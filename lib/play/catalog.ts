import type { GameDefinition } from "./types";

export const PLAY_PROTOTYPES: readonly GameDefinition[] = [
  {
    id: "echo-grid",
    name: "ECHO GRID",
    family: "drift",
    version: 1,
    mode: "2d",
    estimatedDurationSeconds: 90,
    solo: true,
    shareable: true,
    isPrototype: true,
    isUnlocked: () => true,
    createMoment: (result) => ({
      gameId: "echo-grid",
      title: "Echo Grid cleared",
      subtitle: `${result.score} points · ${result.metadata.collisions ?? 0} collisions`,
      shareText: `I cleared ECHO GRID with ${result.score}. Can you beat the route?`,
    }),
  },
  {
    id: "shadow-forge",
    name: "SHADOW FORGE",
    family: "forge",
    version: 1,
    mode: "2d",
    estimatedDurationSeconds: 120,
    solo: true,
    shareable: true,
    isPrototype: true,
    isUnlocked: (context) => context.level >= 1,
    createMoment: (result) => ({
      gameId: "shadow-forge",
      title: "Shadow Forge complete",
      subtitle: `${result.score} efficiency · ${result.metadata.editsUsed ?? 0} edits`,
      shareText: `My SHADOW FORGE build scored ${result.score}. Try the same scenario.`,
    }),
  },
  {
    id: "rulefall",
    name: "RULEFALL",
    family: "pulse",
    version: 1,
    mode: "2d",
    estimatedDurationSeconds: 75,
    solo: true,
    shareable: true,
    isPrototype: true,
    isUnlocked: (context) => context.level >= 1,
    createMoment: (result) => ({
      gameId: "rulefall",
      title: "RULEFALL streak",
      subtitle: `${result.score} points · ${result.metadata.ruleStreak ?? 0} rules read`,
      shareText: `I survived RULEFALL with a ${result.metadata.ruleStreak ?? 0}-rule streak.`,
    }),
  },
] as const;

export function getGameDefinition(gameId: string) {
  return PLAY_PROTOTYPES.find((game) => game.id === gameId) ?? null;
}