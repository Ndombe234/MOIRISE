export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      players: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          display_name: string;
          handle: string | null;
          id: string;
          onboarding_completed: boolean;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string;
          handle?: string | null;
          id: string;
          onboarding_completed?: boolean;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string;
          handle?: string | null;
          id?: string;
          onboarding_completed?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      system_profiles: {
        Row: {
          player_id: string;
          level: number;
          total_xp: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          player_id: string;
          level?: number;
          total_xp?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          player_id?: string;
          level?: number;
          total_xp?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [{ foreignKeyName: "system_profiles_player_id_fkey"; columns: ["player_id"]; isOneToOne: true; referencedRelation: "players"; referencedColumns: ["id"] }];
      };
      system_dimensions: {
        Row: {
          player_id: string;
          dimension_key: string;
          xp: number;
          updated_at: string;
        };
        Insert: {
          player_id: string;
          dimension_key: string;
          xp?: number;
          updated_at?: string;
        };
        Update: {
          player_id?: string;
          dimension_key?: string;
          xp?: number;
          updated_at?: string;
        };
        Relationships: [{ foreignKeyName: "system_dimensions_player_id_fkey"; columns: ["player_id"]; isOneToOne: false; referencedRelation: "players"; referencedColumns: ["id"] }];
      };
      system_progression_events: {
        Row: {
          id: string;
          player_id: string;
          event_type: string;
          dimension_key: string | null;
          xp_delta: number;
          idempotency_key: string;
          source_type: string;
          source_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          player_id: string;
          event_type: string;
          dimension_key?: string | null;
          xp_delta: number;
          idempotency_key: string;
          source_type: string;
          source_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: never;
        Relationships: [{ foreignKeyName: "system_progression_events_player_id_fkey"; columns: ["player_id"]; isOneToOne: false; referencedRelation: "players"; referencedColumns: ["id"] }];
      };
      system_memories: {
        Row: {
          id: string;
          player_id: string;
          memory_key: string;
          title: string;
          description: string;
          source_event_id: string | null;
          importance: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          player_id: string;
          memory_key: string;
          title: string;
          description: string;
          source_event_id?: string | null;
          importance?: number;
          created_at?: string;
        };
        Update: never;
        Relationships: [
          { foreignKeyName: "system_memories_player_id_fkey"; columns: ["player_id"]; isOneToOne: false; referencedRelation: "players"; referencedColumns: ["id"] },
          { foreignKeyName: "system_memories_source_event_id_fkey"; columns: ["source_event_id"]; isOneToOne: false; referencedRelation: "system_progression_events"; referencedColumns: ["id"] }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      ensure_system_profile: {
        Args: { target_player_id: string };
        Returns: undefined;
      };
      record_system_progress_event: {
        Args: {
          target_player_id: string;
          event_type_value: string;
          dimension_key_value: string | null;
          xp_delta_value: number;
          idempotency_key_value: string;
          source_type_value: string;
          source_id_value?: string | null;
          metadata_value?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Player = Database["public"]["Tables"]["players"]["Row"];
export type PlayerInsert = Database["public"]["Tables"]["players"]["Insert"];
export type PlayerUpdate = Database["public"]["Tables"]["players"]["Update"];
export type SystemProfile = Database["public"]["Tables"]["system_profiles"]["Row"];
export type SystemDimension = Database["public"]["Tables"]["system_dimensions"]["Row"];
export type SystemProgressionEvent = Database["public"]["Tables"]["system_progression_events"]["Row"];
export type SystemMemory = Database["public"]["Tables"]["system_memories"]["Row"];
