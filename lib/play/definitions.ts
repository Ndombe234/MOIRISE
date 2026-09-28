import type { GameDefinition } from "@/lib/play/types";

export const PLAY_LAB_DEFINITIONS: GameDefinition[] = [
  { id: "echo-trace", family: "pulse", title: "Echo Trace", description: "Mémorise une trace spectrale, puis reconstruis-la après une transformation du champ.", estimatedSeconds: 45, dimensions: { play: 2, knowledge: 1 }, difficulty: "focused", requiredLevel: 1, launchPath: "/play/echo-trace" },
  { id: "signal-bloom", family: "pulse", title: "Signal Bloom", description: "Stabilise une floraison de signaux en frappant les fenêtres orbitales au bon moment.", estimatedSeconds: 35, dimensions: { play: 2, exploration: 1, knowledge: 1 }, difficulty: "calm", requiredLevel: 1, launchPath: "/play/signal-bloom" },
  { id: "shadow-courier", family: "drift", title: "Shadow Courier", description: "Guide une ombre à travers des portails en construisant une route qui respecte sa physique.", estimatedSeconds: 80, dimensions: { play: 2, creation: 1, exploration: 1, contribution: 1 }, difficulty: "intense", requiredLevel: 1, launchPath: "/play/shadow-courier" },
  { id: "mirror-run", family: "drift", title: "Mirror Run", description: "Tourne des miroirs pour reconnecter une source de lumière avant que le réseau ne s’éteigne.", estimatedSeconds: 55, dimensions: { play: 2, creation: 1, exploration: 1 }, difficulty: "focused", requiredLevel: 1, launchPath: "/play/mirror-run" },
  { id: "last-second", family: "pulse", title: "Last Second", description: "Esquive des impacts irréguliers et tiens jusqu’à la dernière seconde.", estimatedSeconds: 15, dimensions: { play: 2, exploration: 1 }, difficulty: "intense", requiredLevel: 1, launchPath: "/play/last-second" },
];

export function getGameDefinition(gameId: string): GameDefinition | null {
  return PLAY_LAB_DEFINITIONS.find((game) => game.id === gameId) ?? null;
}
