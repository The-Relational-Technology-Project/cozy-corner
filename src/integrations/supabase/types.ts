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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      block_party_ideas: {
        Row: {
          created_at: string
          email: string
          id: string
          idea: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          idea: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          idea?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      block_party_signups: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          role_category: string
          role_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          role_category: string
          role_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          role_category?: string
          role_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      coupon_claims: {
        Row: {
          admin_notes: string | null
          claimer_email: string | null
          claimer_name: string | null
          coupon_id: string
          created_at: string
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          claimer_email?: string | null
          claimer_name?: string | null
          coupon_id: string
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          claimer_email?: string | null
          claimer_name?: string | null
          coupon_id?: string
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupon_claims_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "neighbor_coupons"
            referencedColumns: ["id"]
          },
        ]
      }
      event_suggestions: {
        Row: {
          contact_info: string | null
          created_at: string
          email: string | null
          event_description: string | null
          event_title: string
          id: string
          name: string | null
          suggested_date: string | null
          suggested_location: string | null
        }
        Insert: {
          contact_info?: string | null
          created_at?: string
          email?: string | null
          event_description?: string | null
          event_title: string
          id?: string
          name?: string | null
          suggested_date?: string | null
          suggested_location?: string | null
        }
        Update: {
          contact_info?: string | null
          created_at?: string
          email?: string | null
          event_description?: string | null
          event_title?: string
          id?: string
          name?: string | null
          suggested_date?: string | null
          suggested_location?: string | null
        }
        Relationships: []
      }
      neighbor_coupons: {
        Row: {
          availability: string | null
          contributor_email: string | null
          contributor_name: string | null
          created_at: string
          description: string
          icon: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          availability?: string | null
          contributor_email?: string | null
          contributor_name?: string | null
          created_at?: string
          description: string
          icon?: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          availability?: string | null
          contributor_email?: string | null
          contributor_name?: string | null
          created_at?: string
          description?: string
          icon?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      neighborhood_contributions: {
        Row: {
          availability: string | null
          contribution_type: string
          created_at: string
          email: string
          existing_idea: string | null
          id: string
          message: string | null
          name: string | null
          phone: string | null
          suggested_idea: string | null
          updated_at: string
        }
        Insert: {
          availability?: string | null
          contribution_type: string
          created_at?: string
          email: string
          existing_idea?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          suggested_idea?: string | null
          updated_at?: string
        }
        Update: {
          availability?: string | null
          contribution_type?: string
          created_at?: string
          email?: string
          existing_idea?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          suggested_idea?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sand_accumulation: {
        Row: {
          created_at: string
          id: string
          last_cleared_at: string
          sand_count: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_cleared_at?: string
          sand_count?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_cleared_at?: string
          sand_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      street_cleaning_subscriptions: {
        Row: {
          created_at: string
          east_side: boolean
          email: string
          id: string
          updated_at: string
          west_side: boolean
        }
        Insert: {
          created_at?: string
          east_side?: boolean
          email: string
          id?: string
          updated_at?: string
          west_side?: boolean
        }
        Update: {
          created_at?: string
          east_side?: boolean
          email?: string
          id?: string
          updated_at?: string
          west_side?: boolean
        }
        Relationships: []
      }
      street_cleaning_unsubscribes: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      upcoming_events: {
        Row: {
          created_at: string
          description: string | null
          event_date: string
          event_time: string | null
          id: string
          location: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date: string
          event_time?: string | null
          id?: string
          location?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string
          event_time?: string | null
          id?: string
          location?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_block_party_ideas_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_block_party_ideas_for_admin: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          email: string
          id: string
          idea: string
          phone: string
          updated_at: string
        }[]
      }
      get_coupon_claims_for_admin: {
        Args: Record<PropertyKey, never>
        Returns: {
          admin_notes: string
          claimer_email: string
          claimer_name: string
          contributor_email: string
          contributor_name: string
          coupon_description: string
          coupon_title: string
          created_at: string
          id: string
          status: string
        }[]
      }
      get_event_suggestion_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_event_suggestions_for_admin: {
        Args: Record<PropertyKey, never>
        Returns: {
          contact_info: string
          created_at: string
          email: string
          event_description: string
          event_title: string
          id: string
          name: string
          suggested_date: string
          suggested_location: string
        }[]
      }
      get_neighborhood_contributions_count: {
        Args: Record<PropertyKey, never>
        Returns: {
          suggestions_count: number
          total_contributions: number
          volunteer_count: number
        }[]
      }
      get_neighborhood_contributions_for_admin: {
        Args: Record<PropertyKey, never>
        Returns: {
          availability: string
          contribution_type: string
          created_at: string
          email: string
          existing_idea: string
          id: string
          message: string
          name: string
          phone: string
          suggested_idea: string
          updated_at: string
        }[]
      }
      get_signup_counts: {
        Args: Record<PropertyKey, never>
        Returns: {
          role_category: string
          role_name: string
          signup_count: number
        }[]
      }
      get_subscription_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          both_sides_count: number
          east_side_count: number
          total_subscriptions: number
          west_side_count: number
        }[]
      }
      subscription_exists: {
        Args: { check_email: string }
        Returns: boolean
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
