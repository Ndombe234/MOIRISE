import { redirect } from "next/navigation";
import type { Player } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";
import { validateDisplayName } from "@/lib/player/validation";

export async function getCurrentPlayer() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const { data: existing, error: readError } = await supabase
    .from("players")
    .select("*")
    .eq("id", data.user.id)
    .maybeSingle();

  if (readError) {
    throw new Error("Unable to load the Player.");
  }

  if (existing) {
    return existing as Player;
  }

  const candidate =
    typeof data.user.user_metadata?.display_name === "string"
      ? data.user.user_metadata.display_name
      : "Player";
  const displayName = validateDisplayName(candidate) === null ? candidate.trim() : "Player";

  const { data: created, error: createError } = await supabase
    .from("players")
    .insert({
      id: data.user.id,
      display_name: displayName,
    })
    .select("*")
    .single();

  if (!createError && created) {
    return created as Player;
  }

  const { data: raced } = await supabase
    .from("players")
    .select("*")
    .eq("id", data.user.id)
    .maybeSingle();

  if (raced) {
    return raced as Player;
  }

  throw new Error("Unable to initialize the Player.");
}

export async function requireCurrentPlayer() {
  const player = await getCurrentPlayer();

  if (!player) {
    redirect("/auth/sign-in");
  }

  return player;
}
