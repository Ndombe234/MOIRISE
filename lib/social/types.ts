import type { Tables } from "@/lib/supabase/database.types";

export type SocialPost = Tables<"social_posts">;
export type SocialComment = Tables<"social_comments">;
export type SocialReaction = Tables<"social_reactions">;
export type SocialFollow = Tables<"social_follows">;

export type SocialAuthor = Pick<Tables<"players">, "id" | "display_name" | "handle" | "avatar_url">;

export type SocialPostCard = SocialPost & {
  author: SocialAuthor;
  reactionCount: number;
  commentCount: number;
  reactedByViewer: boolean;
  followingAuthor: boolean;
};