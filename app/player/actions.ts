"use server";

import { revalidatePath } from "next/cache";
import { shouldRecordIdentityCompletion } from "@/lib/player/system-milestone";
import { recordIdentityCompletion } from "@/lib/system/service";
import { createClient } from "@/lib/supabase/server";
import { normalizeHandle, validateDisplayName, validateHandle } from "@/lib/player/validation";

type UpdatePlayerResult = {
  ok: boolean;
  error?: string;
};

export async function updatePlayer(formData: FormData): Promise<UpdatePlayerResult> {
  const displayName = String(formData.get("displayName") ?? "").trim();
  const handle = normalizeHandle(String(formData.get("handle") ?? ""));

  const displayNameError = validateDisplayName(displayName);
  if (displayNameError) return { ok: false, error: displayNameError };

  const handleError = validateHandle(handle);
  if (handleError) return { ok: false, error: handleError };

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return { ok: false, error: "Your session has expired. Please sign in again." };
  }

  const playerUpdate = {
    display_name: displayName,
    handle: handle || null,
    updated_at: new Date().toISOString(),
  };

  const { data: transitionedPlayer, error: transitionError } = await supabase
    .from("players")
    .update({
      ...playerUpdate,
      onboarding_completed: true,
    })
    .eq("id", userData.user.id)
    .eq("onboarding_completed", false)
    .select("id")
    .maybeSingle();

  if (transitionError) {
    if (transitionError.code === "23505") {
      return { ok: false, error: "That handle is already in use." };
    }
    return { ok: false, error: "Player update failed. Please try again." };
  }

  if (!transitionedPlayer) {
    const { error: existingPlayerUpdateError } = await supabase
      .from("players")
      .update(playerUpdate)
      .eq("id", userData.user.id);

    if (existingPlayerUpdateError) {
      if (existingPlayerUpdateError.code === "23505") {
        return { ok: false, error: "That handle is already in use." };
      }
      return { ok: false, error: "Player update failed. Please try again." };
    }
  }

  const shouldRecord = shouldRecordIdentityCompletion(false, Boolean(transitionedPlayer));

  if (shouldRecord) {
    try {
      await recordIdentityCompletion(userData.user.id);
    } catch {
      revalidatePath("/player");
      revalidatePath("/system");
      return {
        ok: false,
        error: "Player saved, but SYSTEM progress could not be recorded. Please save again.",
      };
    }
  }

  revalidatePath("/player");
  revalidatePath("/system");
  return { ok: true };
}
