"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { normalizeCommentBody, normalizeMediaUrl, normalizePostBody } from "@/lib/social/validation";

async function requireUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error("Authentication required.");
  return { supabase, user };
}

export async function createPostAction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const body = normalizePostBody(String(formData.get("body") ?? ""));
  const mediaUrl = normalizeMediaUrl(String(formData.get("media_url") ?? ""));
  const { error } = await supabase.from("social_posts").insert({
    author_id: user.id,
    body,
    media_url: mediaUrl,
    published: true,
  });
  if (error) throw error;
  revalidatePath("/social");
  revalidatePath("/home");
}

export async function toggleReactionAction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const postId = String(formData.get("post_id") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(postId)) throw new Error("Invalid post.");

  const { data: existing, error: lookupError } = await supabase
    .from("social_reactions")
    .select("post_id")
    .eq("post_id", postId)
    .eq("player_id", user.id)
    .maybeSingle();
  if (lookupError) throw lookupError;

  if (existing) {
    const { error } = await supabase
      .from("social_reactions")
      .delete()
      .eq("post_id", postId)
      .eq("player_id", user.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("social_reactions")
      .insert({ post_id: postId, player_id: user.id, reaction_type: "like" });
    if (error) throw error;
  }

  revalidatePath("/social");
}

export async function addCommentAction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const postId = String(formData.get("post_id") ?? "");
  const body = normalizeCommentBody(String(formData.get("body") ?? ""));
  if (!/^[0-9a-f-]{36}$/i.test(postId)) throw new Error("Invalid post.");

  const { error } = await supabase.from("social_comments").insert({
    post_id: postId,
    author_id: user.id,
    body,
  });
  if (error) throw error;
  revalidatePath("/social");
}

export async function toggleFollowAction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const followingId = String(formData.get("following_id") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(followingId) || followingId === user.id) {
    throw new Error("Invalid follow target.");
  }

  const { data: existing, error: lookupError } = await supabase
    .from("social_follows")
    .select("following_id")
    .eq("follower_id", user.id)
    .eq("following_id", followingId)
    .maybeSingle();
  if (lookupError) throw lookupError;

  if (existing) {
    const { error } = await supabase
      .from("social_follows")
      .delete()
      .eq("follower_id", user.id)
      .eq("following_id", followingId);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("social_follows").insert({
      follower_id: user.id,
      following_id: followingId,
    });
    if (error) throw error;
  }

  revalidatePath("/social");
}