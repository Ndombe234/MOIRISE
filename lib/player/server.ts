import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { Player } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";
import { validateDisplayName } from "@/lib/player/validation";

type ServerClient = Awaited<ReturnType<typeof createClient>>;

export async function ensurePlayerForUser(supabase: ServerClient, user: User) {
  const { data: existing, error: readError } = await supabase
    .from("players")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (readError) {
    throw new Error("Unable to load the Player.");
  }

  if (existing) {
    return existing as Player;
  }

  const candidate =
    typeof user.user_metadata?.display_name === "string"
      ? user.user_metadata.display_name
      : "Player";
  const displayName = validateDisplayName(candidate) === null ? candidate.trim() : "Player";

  const { data: created, error: createError } = await supabase
    .from("players")
    .insert({
      id: user.id,
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
    .eq("id", user.id)
    .maybeSingle();

  if (raced) {
    return raced as Player;
  }

  throw new Error("Unable to initialize the Player.");
}

export async function getCurrentPlayer() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return ensurePlayerForUser(supabase, data.user);
}

export async function requireCurrentPlayer() {
  const player = await getCurrentPlayer();

  if (!player) {
    redirect("/auth/sign-in");
  }

  return player;
}
