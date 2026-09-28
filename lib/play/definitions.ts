import type { GameDefinition } from "@/lib/play/types";

export const PLAY_LAB_DEFINITIONS: GameDefinition[] = [
  {
    id: "echo-trace",
    family: "pulse",
    title: "Echo Trace",
    description: "Mémorise une trace spectrale, puis reconstruis-la sans voir son chemin.",
    estimatedSeconds: 45,
    dimensions: { play: 2, knowledge: 1, precision: 1 } as never,
    difficulty: "focused",
    requiredLevel: 1,
    launchPath: "/play/echo-trace",
  },
  {
    id: "signal-bloom",
    family: "pulse",
    title: "Signal Bloom",
    description: "Stabilise une fréquence mouvante au moment exact où le signal s'ouvre.",
    estimatedSeconds: 35,
    dimensions: { play: 2, exploration: 1, knowledge: 1 } as never,
    difficulty: "calm",
    requiredLevel: 1,
    launchPath: "/play/signal-bloom",
  },
  {
    id: "shadow-courier",
    family: "drift",
    title: "Shadow Courier",
    description: "Pose des portails de lumière pour guider une ombre vers sa destination.",
    estimatedSeconds: 80,
    dimensions: { play: 2, creation: 1, exploration: 1, contribution: 1 } as never,
    difficulty: "intense",
    requiredLevel: 2,
    launchPath: "/play/shadow-courier",
  },
  {
    id: "foldline",
    family: "pulse",
    title: "Foldline",
    description: "Fais pivoter un champ fracturé pour reconnecter les lignes d'énergie.",
    estimatedSeconds: 60,
    dimensions: { play: 2, knowledge: 2, creation: 1 } as never,
    difficulty: "focused",
    requiredLevel: 2,
    launchPath: "/play/foldline",
  },
  {
    id: "gravity-thread",
    family: "drift",
    title: "Gravity Thread",
    description: "Relie des nœuds flottants pendant que la gravité change de direction.",
    estimatedSeconds: 90,
    dimensions: { play: 2, exploration: 2, creation: 1 } as never,
    difficulty: "intense",
    requiredLevel: 3,
    launchPath: "/play/gravity-thread",
  },
  {
    id: "drift-atlas",
    family: "drift",
    title: "Drift Atlas",
    description: "Chaque route que tu choisis modifie les routes qui peuvent apparaître ensuite.",
    estimatedSeconds: 120,
    dimensions: { play: 2, exploration: 3, knowledge: 1 } as never,
    difficulty: "focused",
    requiredLevel: 3,
    launchPath: "/play/drift-atlas",
  },
];

export function getGameDefinition(gameId: string): GameDefinition | null {
  return PLAY_LAB_DEFINITIONS.find((game) => game.id === gameId) ?? null;
}