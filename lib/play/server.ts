import "server-only";

import { createClient } from "@/lib/supabase/server";
import { PLAY_EXPERIENCE_DEFINITIONS } from "@/lib/play/definitions";
import { selectNextGame } from "@/lib/play/selector";

export async function getPlayLaunchContext() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) return null;

  const [
    { data: profile, error: profileError },
    { data: system, error: systemError },
    { data: dimensions, error: dimensionsError },
    { data: attempts, error: attemptsError },
  ] = await Promise.all([
    supabase.from("players").select("id, display_name, handle").eq("id", user.id).maybeSingle(),
    supabase.from("system_profiles").select("level, total_xp").eq("player_id", user.id).maybeSingle(),
    supabase.from("system_dimensions").select("dimension_key, xp").eq("player_id", user.id),
    supabase.from("play_attempts").select("game_id, duration_ms, created_at").eq("player_id", user.id).order("created_at", { ascending: false }).limit(8),
  ]);

  if (profileError || systemError || dimensionsError || attemptsError) throw new Error("Unable to load PLAY.");

  const level = system?.level ?? 1;
  const dimensionMap = Object.fromEntries((dimensions ?? []).map((row) => [row.dimension_key, row.xp]));
  const recentGameIds = (attempts ?? []).map((attempt) => attempt.game_id);
  const durations = (attempts ?? []).map((attempt) => attempt.duration_ms).filter((duration): duration is number => Number.isFinite(duration) && duration >= 250);
  const sessionSeconds = durations.length > 0
    ? Math.max(20, Math.min(120, Math.round(durations.reduce((sum, duration) => sum + duration, 0) / durations.length / 1000)))
    : 60;

  const selection = selectNextGame({
    playerId: user.id,
    systemLevel: level,
    dimensions: dimensionMap,
    preferenceSignals: {},
    recentGameIds,
    sessionSeconds,
  }, PLAY_EXPERIENCE_DEFINITIONS);

  return { userId: user.id, profile, level, selection, recentGameIds, sessionSeconds };
}
