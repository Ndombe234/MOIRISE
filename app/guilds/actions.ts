"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error("Authentication required.");
  return { supabase, user };
}

export async function createGuildAction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const visibility = String(formData.get("visibility") ?? "public");
  if (name.length < 2 || name.length > 80) throw new Error("Guild name must contain between 2 and 80 characters.");
  if (description.length > 1000) throw new Error("Guild description is too long.");
  if (!['public','private'].includes(visibility)) throw new Error("Invalid guild visibility.");

  const { data: guild, error } = await supabase.from("social_groups").insert({ owner_id: user.id, name, description, visibility }).select("id").single();
  if (error) throw error;
  const { error: memberError } = await supabase.from("social_group_members").insert({ group_id: guild.id, player_id: user.id, role: "owner" });
  if (memberError) throw memberError;
  revalidatePath("/guilds");
}

export async function joinGuildAction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const groupId = String(formData.get("group_id") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(groupId)) throw new Error("Invalid guild.");
  const { data: guild, error } = await supabase.from("social_groups").select("id, visibility").eq("id", groupId).maybeSingle();
  if (error) throw error;
  if (!guild || guild.visibility !== "public") throw new Error("This guild requires an invitation.");
  const { error: memberError } = await supabase.from("social_group_members").insert({ group_id: groupId, player_id: user.id, role: "member" });
  if (memberError && memberError.code !== "23505") throw memberError;
  revalidatePath("/guilds");
}

export async function leaveGuildAction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const groupId = String(formData.get("group_id") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(groupId)) throw new Error("Invalid guild.");
  const { error } = await supabase.from("social_group_members").delete().eq("group_id", groupId).eq("player_id", user.id).neq("role", "owner");
  if (error) throw error;
  revalidatePath("/guilds");
}
