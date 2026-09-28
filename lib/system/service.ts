import { createClient } from "@/lib/supabase/server";
import type { Player } from "@/lib/supabase/database.types";
import { buildIdentityCompletionRequest } from "@/lib/system/milestone";
import { getSystemSnapshot } from "@/lib/system/server";
import type { SystemProgressionPayload, SystemViewModel } from "@/lib/system/types";
import { validateProgressionPayload } from "@/lib/system/validation";

export async function getSystemViewModel(player: Player): Promise<SystemViewModel> {
  const snapshot = await getSystemSnapshot(player.id);

  return {
    player: {
      id: player.id,
      display_name: player.display_name,
      handle: player.handle,
      avatar_url: player.avatar_url,
    },
    profile: snapshot.profile,
    level: snapshot.progress.level,
    totalXp: snapshot.profile.total_xp,
    currentLevelXp: snapshot.progress.currentXp,
    nextLevelXp: snapshot.progress.nextLevelXp,
    progressPercent: snapshot.progress.percent,
    dimensions: snapshot.dimensions,
    memories: snapshot.memories,
    recentEvents: snapshot.recentEvents,
  };
}

export async function recordSystemProgress(
  playerId: string,
  payload: SystemProgressionPayload,
) {
  const validated = validateProgressionPayload(payload);
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("record_system_progress_event", {
    target_player_id: playerId,
    event_type_value: validated.eventType,
    // Supabase's generated RPC type currently models this text argument as non-null,\n    // while the SYSTEM contract intentionally uses null for identity completion.\n    dimension_key_value: validated.dimensionKey as string,
    xp_delta_value: validated.xpDelta,
    idempotency_key_value: validated.idempotencyKey,
    source_type_value: validated.sourceType,
    source_id_value: validated.sourceId ?? undefined,
    metadata_value: validated.metadata ?? {},
  });

  if (error) {
    throw new Error("Unable to record SYSTEM progression.");
  }

  return data;
}

export async function recordIdentityCompletion(playerId: string) {
  return recordSystemProgress(playerId, buildIdentityCompletionRequest(playerId));
}
