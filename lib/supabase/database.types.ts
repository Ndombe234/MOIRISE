export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      play_attempts: {
        Row: {
          attempt_id: string
          created_at: string
          duration_ms: number
          game_id: string
          moment_candidate: Json | null
          player_id: string
          score: number
          signals: Json
          status: string
        }
        Insert: {
          attempt_id: string
          created_at?: string
          duration_ms: number
          game_id: string
          moment_candidate?: Json | null
          player_id: string
          score: number
          signals?: Json
          status: string
        }
        Update: {
          attempt_id?: string
          created_at?: string
          duration_ms?: number
          game_id?: string
          moment_candidate?: Json | null
          player_id?: string
          score?: number
          signals?: Json
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "play_attempts_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      play_game_runs: {
        Row: {
          client_run_id: string
          completed_at: string | null
          created_at: string
          duration_ms: number | null
          game_id: string
          game_version: number
          id: string
          idempotency_key: string
          metadata: Json
          player_id: string
          score: number | null
          seed: string
          started_at: string
          status: string
          updated_at: string
        }
        Insert: {
          client_run_id: string
          completed_at?: string | null
          created_at?: string
          duration_ms?: number | null
          game_id: string
          game_version: number
          id?: string
          idempotency_key: string
          metadata?: Json
          player_id: string
          score?: number | null
          seed: string
          started_at?: string
          status: string
          updated_at?: string
        }
        Update: {
          client_run_id?: string
          completed_at?: string | null
          created_at?: string
          duration_ms?: number | null
          game_id?: string
          game_version?: number
          id?: string
          idempotency_key?: string
          metadata?: Json
          player_id?: string
          score?: number | null
          seed?: string
          started_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "play_game_runs_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string
          handle: string | null
          id: string
          onboarding_completed: boolean
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          handle?: string | null
          id: string
          onboarding_completed?: boolean
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          handle?: string | null
          id?: string
          onboarding_completed?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      social_comments: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      social_follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      social_posts: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          media_url: string | null
          published: boolean
          updated_at: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          id?: string
          media_url?: string | null
          published?: boolean
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          media_url?: string | null
          published?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      social_reactions: {
        Row: {
          created_at: string
          player_id: string
          post_id: string
          reaction_type: string
        }
        Insert: {
          created_at?: string
          player_id: string
          post_id: string
          reaction_type?: string
        }
        Update: {
          created_at?: string
          player_id?: string
          post_id?: string
          reaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_reactions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      system_dimensions: {
        Row: {
          dimension_key: string
          player_id: string
          updated_at: string
          xp: number
        }
        Insert: {
          dimension_key: string
          player_id: string
          updated_at?: string
          xp?: number
        }
        Update: {
          dimension_key?: string
          player_id?: string
          updated_at?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "system_dimensions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      system_memories: {
        Row: {
          created_at: string
          description: string
          id: string
          importance: number
          memory_key: string
          player_id: string
          source_event_id: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          importance?: number
          memory_key: string
          player_id: string
          source_event_id?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          importance?: number
          memory_key?: string
          player_id?: string
          source_event_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_memories_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "system_memories_source_event_id_fkey"
            columns: ["source_event_id"]
            isOneToOne: false
            referencedRelation: "system_progression_events"
            referencedColumns: ["id"]
          },
        ]
      }
      system_profiles: {
        Row: {
          created_at: string
          level: number
          player_id: string
          total_xp: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          level?: number
          player_id: string
          total_xp?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          level?: number
          player_id?: string
          total_xp?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_profiles_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      system_progression_events: {
        Row: {
          created_at: string
          dimension_key: string | null
          event_type: string
          id: string
          idempotency_key: string
          metadata: Json
          player_id: string
          source_id: string | null
          source_type: string
          xp_delta: number
        }
        Insert: {
          created_at?: string
          dimension_key?: string | null
          event_type: string
          id?: string
          idempotency_key: string
          metadata?: Json
          player_id: string
          source_id?: string | null
          source_type: string
          xp_delta: number
        }
        Update: {
          created_at?: string
          dimension_key?: string | null
          event_type?: string
          id?: string
          idempotency_key?: string
          metadata?: Json
          player_id?: string
          source_id?: string | null
          source_type?: string
          xp_delta?: number
        }
        Relationships: [
          {
            foreignKeyName: "system_progression_events_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ensure_system_profile: {
        Args: { target_player_id: string }
        Returns: undefined
      }
      record_play_completion: {
        Args: {
          attempt_id_value: string
          duration_ms_value: number
          game_id_value: string
          moment_candidate_value?: Json
          score_value: number
          signals_value?: Json
          status_value: string
        }
        Returns: Json
      }
      record_system_progress_event: {
        Args: {
          dimension_key_value: string
          event_type_value: string
          idempotency_key_value: string
          metadata_value?: Json
          source_id_value?: string
          source_type_value: string
          target_player_id: string
          xp_delta_value: number
        }
        Returns: Json
      }
      system_level_for_xp: { Args: { total_xp_value: number }; Returns: number }
      system_level_threshold: {
        Args: { target_level: number }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
