import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { SocialPostCard } from "@/lib/social/types";

const FEED_LIMIT = 30;

export async function getSocialContext() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) return { supabase, user: null };
  return { supabase, user };
}

export async function getSocialFeed(mode: "world" | "following", viewerId: string): Promise<SocialPostCard[]> {
  const supabase = await createClient();

  let authorIds: string[] | null = null;
  if (mode === "following") {
    const { data: follows, error: followError } = await supabase
      .from("social_follows")
      .select("following_id")
      .eq("follower_id", viewerId);
    if (followError) throw followError;
    authorIds = Array.from(new Set([viewerId, ...(follows ?? []).map((row) => row.following_id)]));
  }

  let postQuery = supabase
    .from("social_posts")
    .select("id, author_id, body, media_url, published, created_at, updated_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(FEED_LIMIT);

  if (authorIds) {
    if (authorIds.length === 0) return [];
    postQuery = postQuery.in("author_id", authorIds);
  }

  const { data: posts, error: postError } = await postQuery;
  if (postError) throw postError;
  if (!posts?.length) return [];

  const ids = posts.map((post) => post.id);
  const authors = Array.from(new Set(posts.map((post) => post.author_id)));

  const [{ data: players, error: playersError }, { data: reactions, error: reactionsError }, { data: comments, error: commentsError }, { data: follows, error: followsError }] = await Promise.all([
    supabase.from("players").select("id, display_name, handle, avatar_url").in("id", authors),
    supabase.from("social_reactions").select("post_id, player_id").in("post_id", ids),
    supabase.from("social_comments").select("post_id").in("post_id", ids),
    supabase.from("social_follows").select("following_id").eq("follower_id", viewerId).in("following_id", authors),
  ]);

  if (playersError) throw playersError;
  if (reactionsError) throw reactionsError;
  if (commentsError) throw commentsError;
  if (followsError) throw followsError;

  const playerById = new Map((players ?? []).map((player) => [player.id, player]));
  const reactionCounts = new Map<string, number>();
  const viewerReactions = new Set<string>();
  const commentCounts = new Map<string, number>();
  const followingAuthors = new Set((follows ?? []).map((row) => row.following_id));

  for (const reaction of reactions ?? []) {
    reactionCounts.set(reaction.post_id, (reactionCounts.get(reaction.post_id) ?? 0) + 1);
    if (reaction.player_id === viewerId) viewerReactions.add(reaction.post_id);
  }

  for (const comment of comments ?? []) {
    commentCounts.set(comment.post_id, (commentCounts.get(comment.post_id) ?? 0) + 1);
  }

  return posts.flatMap((post) => {
    const author = playerById.get(post.author_id);
    if (!author) return [];
    return [{
      ...post,
      author,
      reactionCount: reactionCounts.get(post.id) ?? 0,
      commentCount: commentCounts.get(post.id) ?? 0,
      reactedByViewer: viewerReactions.has(post.id),
      followingAuthor: post.author_id === viewerId || followingAuthors.has(post.author_id),
    }];
  });
}