import type {
  SystemDimension,
  SystemMemory,
  SystemProfile,
  SystemProgressionEvent,
} from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";
import { getLevelProgress } from "@/lib/system/progression";
export type SystemSnapshot = {
  profile: SystemProfile;
  dimensions: SystemDimension[];
  memories: SystemMemory[];
  recentEvents: SystemProgressionEvent[];
  progress: ReturnType<typeof getLevelProgress>;
};

export async function getSystemSnapshot(playerId: string): Promise<SystemSnapshot> {
  const supabase = await createClient();

  const [{ data: profile, error: profileError }, { data: dimensions, error: dimensionsError }, { data: memories, error: memoriesError }, { data: events, error: eventsError }] = await Promise.all([
    supabase.from("system_profiles").select("*").eq("player_id", playerId).maybeSingle(),
    supabase.from("system_dimensions").select("*").eq("player_id", playerId).order("dimension_key"),
    supabase.from("system_memories").select("*").eq("player_id", playerId).order("created_at", { ascending: false }).limit(6),
    supabase.from("system_progression_events").select("*").eq("player_id", playerId).order("created_at", { ascending: false }).limit(8),
  ]);

  if (profileError || dimensionsError || memoriesError || eventsError) {
    throw new Error("Unable to load the SYSTEM.");
  }

  if (!profile) {
    throw new Error("SYSTEM profile is not initialized.");
  }

  return {
    profile,
    dimensions: dimensions ?? [],
    memories: memories ?? [],
    recentEvents: events ?? [],
    progress: getLevelProgress(profile.total_xp),
  };
}

export async function initializeSystemForCurrentPlayer(playerId: string) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("ensure_system_profile", {
    target_player_id: playerId,
  });

  if (error) {
    throw new Error("Unable to initialize the SYSTEM.");
  }
}
