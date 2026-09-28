import type { Database, Json } from "@/lib/supabase/database.types";

type SocialTables = {
  social_conversations: {
    Row: { id: string; created_by: string; title: string | null; created_at: string; updated_at: string };
    Insert: { id?: string; created_by: string; title?: string | null; created_at?: string; updated_at?: string };
    Update: { id?: string; created_by?: string; title?: string | null; created_at?: string; updated_at?: string };
    Relationships: [];
  };
  social_conversation_members: {
    Row: { conversation_id: string; player_id: string; last_read_at: string; joined_at: string };
    Insert: { conversation_id: string; player_id: string; last_read_at?: string; joined_at?: string };
    Update: { conversation_id?: string; player_id?: string; last_read_at?: string; joined_at?: string };
    Relationships: [];
  };
  social_messages: {
    Row: { id: string; conversation_id: string; sender_id: string; body: string; created_at: string };
    Insert: { id?: string; conversation_id: string; sender_id: string; body: string; created_at?: string };
    Update: { id?: string; conversation_id?: string; sender_id?: string; body?: string; created_at?: string };
    Relationships: [];
  };
  social_groups: {
    Row: { id: string; owner_id: string; name: string; description: string; visibility: string; created_at: string; updated_at: string };
    Insert: { id?: string; owner_id: string; name: string; description?: string; visibility?: string; created_at?: string; updated_at?: string };
    Update: { id?: string; owner_id?: string; name?: string; description?: string; visibility?: string; created_at?: string; updated_at?: string };
    Relationships: [];
  };
  social_group_members: {
    Row: { group_id: string; player_id: string; role: string; joined_at: string };
    Insert: { group_id: string; player_id: string; role?: string; joined_at?: string };
    Update: { group_id?: string; player_id?: string; role?: string; joined_at?: string };
    Relationships: [];
  };
  social_group_posts: {
    Row: { id: string; group_id: string; author_id: string; body: string; created_at: string; updated_at: string };
    Insert: { id?: string; group_id: string; author_id: string; body: string; created_at?: string; updated_at?: string };
    Update: { id?: string; group_id?: string; author_id?: string; body?: string; created_at?: string; updated_at?: string };
    Relationships: [];
  };
};

export type MoriseDatabase = Omit<Database, "public"> & {
  public: Omit<Database["public"], "Tables"> & { Tables: Database["public"]["Tables"] & SocialTables };
};

export type SocialJson = Json;
