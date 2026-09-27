import type {
  Json,
  Player,
  SystemDimension,
  SystemMemory,
  SystemProgressionEvent,
  SystemProfile,
} from "../supabase/database.types";
import type { SystemDimensionKey } from "./constants";

export type SystemProgressionPayload = {
  eventType: string;
  dimensionKey: SystemDimensionKey | null;
  xpDelta: number;
  idempotencyKey: string;
  sourceType: string;
  sourceId?: string | null;
  metadata?: Json;
};

export type SystemViewModel = {
  player: Pick<Player, "id" | "display_name" | "handle" | "avatar_url">;
  profile: SystemProfile;
  level: number;
  totalXp: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
  dimensions: SystemDimension[];
  memories: SystemMemory[];
  recentEvents: SystemProgressionEvent[];
};
