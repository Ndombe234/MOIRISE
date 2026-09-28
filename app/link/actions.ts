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

function cleanBody(value: unknown) {
  const body = String(value ?? "").trim();
  if (!body || body.length > 4000) throw new Error("Message must contain between 1 and 4000 characters.");
  return body;
}

export async function startConversationAction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const handle = String(formData.get("handle") ?? "").trim().replace(/^@/, "").toLowerCase();
  if (!/^[a-z0-9_]{3,24}$/.test(handle)) throw new Error("Enter a valid player handle.");

  const { data: target, error: targetError } = await supabase.from("players").select("id").ilike("handle", handle).maybeSingle();
  if (targetError) throw targetError;
  if (!target || target.id === user.id) throw new Error("Player not found or cannot be yourself.");

  const { data: existingMemberships, error: membershipError } = await supabase
    .from("social_conversation_members")
    .select("conversation_id, social_conversations!inner(id)")
    .eq("player_id", user.id);
  if (membershipError) throw membershipError;

  for (const membership of existingMemberships ?? []) {
    const conversationId = membership.conversation_id as string;
    const { data: targetMember, error } = await supabase.from("social_conversation_members").select("player_id").eq("conversation_id", conversationId).eq("player_id", target.id).maybeSingle();
    if (error) throw error;
    if (targetMember) {
      revalidatePath("/link");
      return conversationId;
    }
  }

  const { data: conversation, error: conversationError } = await supabase.from("social_conversations").insert({ created_by: user.id }).select("id").single();
  if (conversationError) throw conversationError;

  const { error: membersError } = await supabase.from("social_conversation_members").insert([
    { conversation_id: conversation.id, player_id: user.id },
    { conversation_id: conversation.id, player_id: target.id },
  ]);
  if (membersError) throw membersError;

  revalidatePath("/link");
  return conversation.id;
}

export async function sendMessageAction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const conversationId = String(formData.get("conversation_id") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(conversationId)) throw new Error("Invalid conversation.");
  const body = cleanBody(formData.get("body"));
  const { error } = await supabase.from("social_messages").insert({ conversation_id: conversationId, sender_id: user.id, body });
  if (error) throw error;
  await supabase.from("social_conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId);
  revalidatePath(`/link/${conversationId}`);
  revalidatePath("/link");
}

export async function markConversationReadAction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const conversationId = String(formData.get("conversation_id") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(conversationId)) throw new Error("Invalid conversation.");
  const { error } = await supabase.from("social_conversation_members").update({ last_read_at: new Date().toISOString() }).eq("conversation_id", conversationId).eq("player_id", user.id);
  if (error) throw error;
  revalidatePath(`/link/${conversationId}`);
  revalidatePath("/link");
}
