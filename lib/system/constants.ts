export const SYSTEM_DIMENSIONS = [
  "exploration",
  "creation",
  "knowledge",
  "social",
  "community",
  "play",
  "contribution",
] as const;

export type SystemDimensionKey = (typeof SYSTEM_DIMENSIONS)[number];

export const SYSTEM_DIMENSION_LABELS: Record<SystemDimensionKey, string> = {
  exploration: "Exploration",
  creation: "Création",
  knowledge: "Connaissance",
  social: "Social",
  community: "Communauté",
  play: "Jeu",
  contribution: "Contribution",
};
