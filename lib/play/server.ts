import "server-only";

import { createClient } from "@/lib/supabase/server";
import { PLAY_LAB_DEFINITIONS } from "@/lib/play/definitions";
import { selectNextGame } from "@/lib/play/selector";

export async function getPlayLaunchContext() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) return null;

  const [{ data: profile, error: profileError }, { data: system, error: systemError }, { data: dimensions, error: dimensionsError }, { data: attempts, error: attemptsError }] = await Promise.all([
    supabase.from("players").select("id, display_name, handle").eq("id", user.id).maybeSingle(),
    supabase.from("system_profiles").select("level, total_xp").eq("player_id", user.id).maybeSingle(),
    supabase.from("system_dimensions").select("dimension_key, xp").eq("player_id", user.id),
    supabase.from("play_attempts").select("game_id, created_at").eq("player_id", user.id).order("created_at", { ascending: false }).limit(8),
  ]);

  if (profileError || systemError || dimensionsError || attemptsError) {
    throw new Error("Unable to load PLAY.");
  }

  const level = system?.level ?? 1;
  const dimensionMap = Object.fromEntries((dimensions ?? []).map((row) => [row.dimension_key, row.xp]));
  const recentGameIds = (attempts ?? []).map((attempt) => attempt.game_id);
  const selection = selectNextGame({
    playerId: user.id,
    systemLevel: level,
    dimensions: dimensionMap,
    recentGameIds,
    sessionSeconds: 60,
  }, PLAY_LAB_DEFINITIONS);

  return { userId: user.id, profile, level, selection, recentGameIds };
}