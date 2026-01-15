export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5';
  };
  public: {
    Tables: {
      accommodation_partners: {
        Row: {
          accommodation_type: string | null;
          address: string | null;
          avg_guests_per_day: number | null;
          avg_stay_nights: number | null;
          business_vs_leisure: string | null;
          city: string;
          contact_email: string | null;
          contact_name: string | null;
          contact_phone: string | null;
          country_code: string;
          created_at: string | null;
          data_source: string | null;
          distance_to_merchant_m: number | null;
          guest_nationality_mix: Json | null;
          id: string;
          is_active: boolean | null;
          is_superhost: boolean | null;
          is_verified: boolean | null;
          latitude: number | null;
          longitude: number | null;
          name: string;
          needs_breakfast: boolean | null;
          needs_dinner: boolean | null;
          needs_lunch: boolean | null;
          needs_recommendations: boolean | null;
          properties_count: number | null;
          room_count: number | null;
          star_rating: number | null;
          updated_at: string | null;
          website: string | null;
        };
        Insert: {
          accommodation_type?: string | null;
          address?: string | null;
          avg_guests_per_day?: number | null;
          avg_stay_nights?: number | null;
          business_vs_leisure?: string | null;
          city: string;
          contact_email?: string | null;
          contact_name?: string | null;
          contact_phone?: string | null;
          country_code: string;
          created_at?: string | null;
          data_source?: string | null;
          distance_to_merchant_m?: number | null;
          guest_nationality_mix?: Json | null;
          id?: string;
          is_active?: boolean | null;
          is_superhost?: boolean | null;
          is_verified?: boolean | null;
          latitude?: number | null;
          longitude?: number | null;
          name: string;
          needs_breakfast?: boolean | null;
          needs_dinner?: boolean | null;
          needs_lunch?: boolean | null;
          needs_recommendations?: boolean | null;
          properties_count?: number | null;
          room_count?: number | null;
          star_rating?: number | null;
          updated_at?: string | null;
          website?: string | null;
        };
        Update: {
          accommodation_type?: string | null;
          address?: string | null;
          avg_guests_per_day?: number | null;
          avg_stay_nights?: number | null;
          business_vs_leisure?: string | null;
          city?: string;
          contact_email?: string | null;
          contact_name?: string | null;
          contact_phone?: string | null;
          country_code?: string;
          created_at?: string | null;
          data_source?: string | null;
          distance_to_merchant_m?: number | null;
          guest_nationality_mix?: Json | null;
          id?: string;
          is_active?: boolean | null;
          is_superhost?: boolean | null;
          is_verified?: boolean | null;
          latitude?: number | null;
          longitude?: number | null;
          name?: string;
          needs_breakfast?: boolean | null;
          needs_dinner?: boolean | null;
          needs_lunch?: boolean | null;
          needs_recommendations?: boolean | null;
          properties_count?: number | null;
          room_count?: number | null;
          star_rating?: number | null;
          updated_at?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      account_roles: {
        Row: {
          accepted_at: string | null;
          account_id: string;
          created_at: string;
          id: string;
          invited_at: string | null;
          invited_by_account_id: string | null;
          is_active: boolean;
          is_primary: boolean;
          permissions: Json | null;
          role_type: string;
          tenant_id: string | null;
          tenant_type: string | null;
          updated_at: string;
        };
        Insert: {
          accepted_at?: string | null;
          account_id: string;
          created_at?: string;
          id?: string;
          invited_at?: string | null;
          invited_by_account_id?: string | null;
          is_active?: boolean;
          is_primary?: boolean;
          permissions?: Json | null;
          role_type: string;
          tenant_id?: string | null;
          tenant_type?: string | null;
          updated_at?: string;
        };
        Update: {
          accepted_at?: string | null;
          account_id?: string;
          created_at?: string;
          id?: string;
          invited_at?: string | null;
          invited_by_account_id?: string | null;
          is_active?: boolean;
          is_primary?: boolean;
          permissions?: Json | null;
          role_type?: string;
          tenant_id?: string | null;
          tenant_type?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      accounts: {
        Row: {
          auth_id: string | null;
          avatar_url: string | null;
          badges: Json | null;
          consumer_points: number;
          contributor_points: number;
          created_at: string;
          display_name: string | null;
          email: string;
          email_verified: boolean | null;
          first_name: string | null;
          id: string;
          is_active: boolean;
          is_premium: boolean;
          is_verified: boolean;
          last_login_at: string | null;
          last_name: string | null;
          locale: string | null;
          loyalty_tier: string | null;
          merchant_points: number;
          metadata: Json | null;
          phone: string | null;
          phone_verified: boolean | null;
          premium_expires_at: string | null;
          premium_started_at: string | null;
          premium_type: string | null;
          referral_code: string | null;
          referred_by_account_id: string | null;
          timezone: string | null;
          total_points: number;
          updated_at: string;
        };
        Insert: {
          auth_id?: string | null;
          avatar_url?: string | null;
          badges?: Json | null;
          consumer_points?: number;
          contributor_points?: number;
          created_at?: string;
          display_name?: string | null;
          email: string;
          email_verified?: boolean | null;
          first_name?: string | null;
          id?: string;
          is_active?: boolean;
          is_premium?: boolean;
          is_verified?: boolean;
          last_login_at?: string | null;
          last_name?: string | null;
          locale?: string | null;
          loyalty_tier?: string | null;
          merchant_points?: number;
          metadata?: Json | null;
          phone?: string | null;
          phone_verified?: boolean | null;
          premium_expires_at?: string | null;
          premium_started_at?: string | null;
          premium_type?: string | null;
          referral_code?: string | null;
          referred_by_account_id?: string | null;
          timezone?: string | null;
          total_points?: number;
          updated_at?: string;
        };
        Update: {
          auth_id?: string | null;
          avatar_url?: string | null;
          badges?: Json | null;
          consumer_points?: number;
          contributor_points?: number;
          created_at?: string;
          display_name?: string | null;
          email?: string;
          email_verified?: boolean | null;
          first_name?: string | null;
          id?: string;
          is_active?: boolean;
          is_premium?: boolean;
          is_verified?: boolean;
          last_login_at?: string | null;
          last_name?: string | null;
          locale?: string | null;
          loyalty_tier?: string | null;
          merchant_points?: number;
          metadata?: Json | null;
          phone?: string | null;
          phone_verified?: boolean | null;
          premium_expires_at?: string | null;
          premium_started_at?: string | null;
          premium_type?: string | null;
          referral_code?: string | null;
          referred_by_account_id?: string | null;
          timezone?: string | null;
          total_points?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      ai_alerts: {
        Row: {
          action_url: string | null;
          actionable: boolean | null;
          actioned_at: string | null;
          category: string;
          created_at: string | null;
          dismissed_at: string | null;
          entity_id: string | null;
          entity_type: string | null;
          expires_at: string | null;
          id: string;
          location_id: string | null;
          merchant_id: string;
          message: string;
          priority: number | null;
          read_at: string | null;
          suggested_action: string | null;
          title: string;
          type: string;
        };
        Insert: {
          action_url?: string | null;
          actionable?: boolean | null;
          actioned_at?: string | null;
          category: string;
          created_at?: string | null;
          dismissed_at?: string | null;
          entity_id?: string | null;
          entity_type?: string | null;
          expires_at?: string | null;
          id?: string;
          location_id?: string | null;
          merchant_id: string;
          message: string;
          priority?: number | null;
          read_at?: string | null;
          suggested_action?: string | null;
          title: string;
          type: string;
        };
        Update: {
          action_url?: string | null;
          actionable?: boolean | null;
          actioned_at?: string | null;
          category?: string;
          created_at?: string | null;
          dismissed_at?: string | null;
          entity_id?: string | null;
          entity_type?: string | null;
          expires_at?: string | null;
          id?: string;
          location_id?: string | null;
          merchant_id?: string;
          message?: string;
          priority?: number | null;
          read_at?: string | null;
          suggested_action?: string | null;
          title?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_alerts_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_alerts_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_autonomy_audit_log: {
        Row: {
          action_data: Json | null;
          action_description: string;
          action_type: string;
          approval_requested_at: string | null;
          approval_status: string | null;
          approved_at: string | null;
          approved_by: string | null;
          autonomy_level_at_action: number;
          created_at: string | null;
          executed_at: string | null;
          execution_result: Json | null;
          execution_status: string | null;
          id: string;
          location_id: string;
          rejection_reason: string | null;
          required_level: number;
          was_auto_approved: boolean | null;
        };
        Insert: {
          action_data?: Json | null;
          action_description: string;
          action_type: string;
          approval_requested_at?: string | null;
          approval_status?: string | null;
          approved_at?: string | null;
          approved_by?: string | null;
          autonomy_level_at_action: number;
          created_at?: string | null;
          executed_at?: string | null;
          execution_result?: Json | null;
          execution_status?: string | null;
          id?: string;
          location_id: string;
          rejection_reason?: string | null;
          required_level: number;
          was_auto_approved?: boolean | null;
        };
        Update: {
          action_data?: Json | null;
          action_description?: string;
          action_type?: string;
          approval_requested_at?: string | null;
          approval_status?: string | null;
          approved_at?: string | null;
          approved_by?: string | null;
          autonomy_level_at_action?: number;
          created_at?: string | null;
          executed_at?: string | null;
          execution_result?: Json | null;
          execution_status?: string | null;
          id?: string;
          location_id?: string;
          rejection_reason?: string | null;
          required_level?: number;
          was_auto_approved?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_autonomy_audit_log_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_autonomy_audit_log_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_autonomy_audit_log_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_autonomy_audit_log_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_autonomy_audit_log_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_autonomy_audit_log_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_autonomy_audit_log_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_autonomy_audit_log_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_booking_config: {
        Row: {
          automation_level: string | null;
          blackout_dates: string[] | null;
          blocked_partners: string[] | null;
          created_at: string | null;
          id: string;
          max_group_percent: number | null;
          merchant_id: string;
          min_margin_percent: number | null;
          preferred_partners: string[] | null;
          updated_at: string | null;
          weight_occupancy: number | null;
          weight_relationships: number | null;
          weight_revenue: number | null;
        };
        Insert: {
          automation_level?: string | null;
          blackout_dates?: string[] | null;
          blocked_partners?: string[] | null;
          created_at?: string | null;
          id?: string;
          max_group_percent?: number | null;
          merchant_id: string;
          min_margin_percent?: number | null;
          preferred_partners?: string[] | null;
          updated_at?: string | null;
          weight_occupancy?: number | null;
          weight_relationships?: number | null;
          weight_revenue?: number | null;
        };
        Update: {
          automation_level?: string | null;
          blackout_dates?: string[] | null;
          blocked_partners?: string[] | null;
          created_at?: string | null;
          id?: string;
          max_group_percent?: number | null;
          merchant_id?: string;
          min_margin_percent?: number | null;
          preferred_partners?: string[] | null;
          updated_at?: string | null;
          weight_occupancy?: number | null;
          weight_relationships?: number | null;
          weight_revenue?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_booking_config_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: true;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_bootstrap_results: {
        Row: {
          competitor_count: number | null;
          completed_at: string | null;
          id: string;
          location_id: string;
          marketing_tips: string[] | null;
          merchant_id: string;
          operational_tips: string[] | null;
          suggested_menu: Json | null;
          zone_analysis_id: string | null;
        };
        Insert: {
          competitor_count?: number | null;
          completed_at?: string | null;
          id?: string;
          location_id: string;
          marketing_tips?: string[] | null;
          merchant_id: string;
          operational_tips?: string[] | null;
          suggested_menu?: Json | null;
          zone_analysis_id?: string | null;
        };
        Update: {
          competitor_count?: number | null;
          completed_at?: string | null;
          id?: string;
          location_id?: string;
          marketing_tips?: string[] | null;
          merchant_id?: string;
          operational_tips?: string[] | null;
          suggested_menu?: Json | null;
          zone_analysis_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_bootstrap_results_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: true;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_bootstrap_results_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_bootstrap_results_zone_analysis_id_fkey';
            columns: ['zone_analysis_id'];
            isOneToOne: false;
            referencedRelation: 'ai_zone_analysis';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_budget_plans: {
        Row: {
          budgets: Json | null;
          created_at: string | null;
          id: string;
          insights: string[] | null;
          merchant_id: string;
          month: number;
          recommendations: string[] | null;
          remaining: number | null;
          total_budget: number | null;
          total_spent: number | null;
          updated_at: string | null;
          year: number;
        };
        Insert: {
          budgets?: Json | null;
          created_at?: string | null;
          id?: string;
          insights?: string[] | null;
          merchant_id: string;
          month: number;
          recommendations?: string[] | null;
          remaining?: number | null;
          total_budget?: number | null;
          total_spent?: number | null;
          updated_at?: string | null;
          year: number;
        };
        Update: {
          budgets?: Json | null;
          created_at?: string | null;
          id?: string;
          insights?: string[] | null;
          merchant_id?: string;
          month?: number;
          recommendations?: string[] | null;
          remaining?: number | null;
          total_budget?: number | null;
          total_spent?: number | null;
          updated_at?: string | null;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_budget_plans_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_cash_flow_forecasts: {
        Row: {
          assumptions: string[] | null;
          confidence: number | null;
          created_at: string | null;
          forecast_period: string;
          id: string;
          merchant_id: string;
          projected_costs: number | null;
          projected_profit: number | null;
          projected_revenue: number | null;
          risks: Json | null;
          weekly_projections: Json | null;
        };
        Insert: {
          assumptions?: string[] | null;
          confidence?: number | null;
          created_at?: string | null;
          forecast_period: string;
          id?: string;
          merchant_id: string;
          projected_costs?: number | null;
          projected_profit?: number | null;
          projected_revenue?: number | null;
          risks?: Json | null;
          weekly_projections?: Json | null;
        };
        Update: {
          assumptions?: string[] | null;
          confidence?: number | null;
          created_at?: string | null;
          forecast_period?: string;
          id?: string;
          merchant_id?: string;
          projected_costs?: number | null;
          projected_profit?: number | null;
          projected_revenue?: number | null;
          risks?: Json | null;
          weekly_projections?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_cash_flow_forecasts_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_competitor_profiles: {
        Row: {
          address: string | null;
          business_type: string | null;
          created_at: string | null;
          differentiators: string[] | null;
          distance: number | null;
          id: string;
          is_active: boolean | null;
          location_id: string;
          merchant_id: string;
          name: string;
          popular_items: string[] | null;
          price_range: string | null;
          source: string | null;
          strengths: string[] | null;
          updated_at: string | null;
          weaknesses: string[] | null;
        };
        Insert: {
          address?: string | null;
          business_type?: string | null;
          created_at?: string | null;
          differentiators?: string[] | null;
          distance?: number | null;
          id?: string;
          is_active?: boolean | null;
          location_id: string;
          merchant_id: string;
          name: string;
          popular_items?: string[] | null;
          price_range?: string | null;
          source?: string | null;
          strengths?: string[] | null;
          updated_at?: string | null;
          weaknesses?: string[] | null;
        };
        Update: {
          address?: string | null;
          business_type?: string | null;
          created_at?: string | null;
          differentiators?: string[] | null;
          distance?: number | null;
          id?: string;
          is_active?: boolean | null;
          location_id?: string;
          merchant_id?: string;
          name?: string;
          popular_items?: string[] | null;
          price_range?: string | null;
          source?: string | null;
          strengths?: string[] | null;
          updated_at?: string | null;
          weaknesses?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_competitor_profiles_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_competitor_profiles_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_content_calendars: {
        Row: {
          created_at: string | null;
          id: string;
          merchant_id: string;
          posts: Json | null;
          week_start: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          merchant_id: string;
          posts?: Json | null;
          week_start: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          merchant_id?: string;
          posts?: Json | null;
          week_start?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_content_calendars_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_conversations: {
        Row: {
          account_id: string;
          actions_taken: Json | null;
          content: string;
          context_summary: string | null;
          created_at: string | null;
          id: string;
          input_tokens: number | null;
          merchant_id: string;
          model: string | null;
          output_tokens: number | null;
          role: string;
          session_id: string;
        };
        Insert: {
          account_id: string;
          actions_taken?: Json | null;
          content: string;
          context_summary?: string | null;
          created_at?: string | null;
          id?: string;
          input_tokens?: number | null;
          merchant_id: string;
          model?: string | null;
          output_tokens?: number | null;
          role: string;
          session_id: string;
        };
        Update: {
          account_id?: string;
          actions_taken?: Json | null;
          content?: string;
          context_summary?: string | null;
          created_at?: string | null;
          id?: string;
          input_tokens?: number | null;
          merchant_id?: string;
          model?: string | null;
          output_tokens?: number | null;
          role?: string;
          session_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_conversations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_conversations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_conversations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_conversations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_conversations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_conversations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_conversations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_conversations_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_customer_intelligence: {
        Row: {
          account_id: string;
          churn_factors: Json | null;
          churn_risk_level: string | null;
          churn_risk_score: number | null;
          clv_calculated_at: string | null;
          clv_confidence: number | null;
          clv_estimated: number | null;
          created_at: string | null;
          days_since_last_visit: number | null;
          id: string;
          last_synced_from_analytics_at: string | null;
          merchant_id: string;
          order_pattern: Json | null;
          predicted_days_to_churn: number | null;
          predicted_monthly_spend: number | null;
          predicted_next_order_value: number | null;
          predicted_next_visit_at: string | null;
          recommended_actions: Json | null;
          segment: string | null;
          segment_confidence: number | null;
          updated_at: string | null;
          visit_pattern: Json | null;
        };
        Insert: {
          account_id: string;
          churn_factors?: Json | null;
          churn_risk_level?: string | null;
          churn_risk_score?: number | null;
          clv_calculated_at?: string | null;
          clv_confidence?: number | null;
          clv_estimated?: number | null;
          created_at?: string | null;
          days_since_last_visit?: number | null;
          id?: string;
          last_synced_from_analytics_at?: string | null;
          merchant_id: string;
          order_pattern?: Json | null;
          predicted_days_to_churn?: number | null;
          predicted_monthly_spend?: number | null;
          predicted_next_order_value?: number | null;
          predicted_next_visit_at?: string | null;
          recommended_actions?: Json | null;
          segment?: string | null;
          segment_confidence?: number | null;
          updated_at?: string | null;
          visit_pattern?: Json | null;
        };
        Update: {
          account_id?: string;
          churn_factors?: Json | null;
          churn_risk_level?: string | null;
          churn_risk_score?: number | null;
          clv_calculated_at?: string | null;
          clv_confidence?: number | null;
          clv_estimated?: number | null;
          created_at?: string | null;
          days_since_last_visit?: number | null;
          id?: string;
          last_synced_from_analytics_at?: string | null;
          merchant_id?: string;
          order_pattern?: Json | null;
          predicted_days_to_churn?: number | null;
          predicted_monthly_spend?: number | null;
          predicted_next_order_value?: number | null;
          predicted_next_visit_at?: string | null;
          recommended_actions?: Json | null;
          segment?: string | null;
          segment_confidence?: number | null;
          updated_at?: string | null;
          visit_pattern?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_customer_intelligence_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_customer_intelligence_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_customer_intelligence_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_intelligence_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_intelligence_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_intelligence_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_intelligence_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_intelligence_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_customer_trigger_executions: {
        Row: {
          account_id: string;
          action_details: Json | null;
          action_type: string;
          conversion_order_id: string | null;
          conversion_value: number | null;
          converted_at: string | null;
          created_at: string | null;
          error_message: string | null;
          id: string;
          merchant_id: string;
          next_eligible_at: string | null;
          retry_count: number | null;
          status: string | null;
          trigger_id: string;
          triggered_at: string | null;
          triggered_reason: string | null;
          updated_at: string | null;
        };
        Insert: {
          account_id: string;
          action_details?: Json | null;
          action_type: string;
          conversion_order_id?: string | null;
          conversion_value?: number | null;
          converted_at?: string | null;
          created_at?: string | null;
          error_message?: string | null;
          id?: string;
          merchant_id: string;
          next_eligible_at?: string | null;
          retry_count?: number | null;
          status?: string | null;
          trigger_id: string;
          triggered_at?: string | null;
          triggered_reason?: string | null;
          updated_at?: string | null;
        };
        Update: {
          account_id?: string;
          action_details?: Json | null;
          action_type?: string;
          conversion_order_id?: string | null;
          conversion_value?: number | null;
          converted_at?: string | null;
          created_at?: string | null;
          error_message?: string | null;
          id?: string;
          merchant_id?: string;
          next_eligible_at?: string | null;
          retry_count?: number | null;
          status?: string | null;
          trigger_id?: string;
          triggered_at?: string | null;
          triggered_reason?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_customer_trigger_executions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_customer_trigger_executions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_customer_trigger_executions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_trigger_executions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_trigger_executions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_trigger_executions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_trigger_executions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_trigger_executions_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_customer_trigger_executions_trigger_id_fkey';
            columns: ['trigger_id'];
            isOneToOne: false;
            referencedRelation: 'ai_customer_triggers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_customer_trigger_executions_trigger_id_fkey';
            columns: ['trigger_id'];
            isOneToOne: false;
            referencedRelation: 'v_trigger_performance';
            referencedColumns: ['trigger_id'];
          },
          {
            foreignKeyName: 'ai_customer_trigger_executions_trigger_id_fkey';
            columns: ['trigger_id'];
            isOneToOne: false;
            referencedRelation: 'v_trigger_roi_summary';
            referencedColumns: ['trigger_id'];
          },
        ];
      };
      ai_customer_triggers: {
        Row: {
          action_config: Json;
          action_type: string;
          conditions: Json;
          cooldown_days: number | null;
          created_at: string | null;
          created_by_account_id: string | null;
          description: string | null;
          exclude_segments: string[] | null;
          id: string;
          is_active: boolean | null;
          last_triggered_at: string | null;
          max_clv: number | null;
          max_triggers_per_customer: number | null;
          merchant_id: string;
          min_clv: number | null;
          name: string;
          priority: number | null;
          target_segments: string[] | null;
          total_converted: number | null;
          total_triggered: number | null;
          trigger_type: string;
          updated_at: string | null;
        };
        Insert: {
          action_config?: Json;
          action_type: string;
          conditions?: Json;
          cooldown_days?: number | null;
          created_at?: string | null;
          created_by_account_id?: string | null;
          description?: string | null;
          exclude_segments?: string[] | null;
          id?: string;
          is_active?: boolean | null;
          last_triggered_at?: string | null;
          max_clv?: number | null;
          max_triggers_per_customer?: number | null;
          merchant_id: string;
          min_clv?: number | null;
          name: string;
          priority?: number | null;
          target_segments?: string[] | null;
          total_converted?: number | null;
          total_triggered?: number | null;
          trigger_type: string;
          updated_at?: string | null;
        };
        Update: {
          action_config?: Json;
          action_type?: string;
          conditions?: Json;
          cooldown_days?: number | null;
          created_at?: string | null;
          created_by_account_id?: string | null;
          description?: string | null;
          exclude_segments?: string[] | null;
          id?: string;
          is_active?: boolean | null;
          last_triggered_at?: string | null;
          max_clv?: number | null;
          max_triggers_per_customer?: number | null;
          merchant_id?: string;
          min_clv?: number | null;
          name?: string;
          priority?: number | null;
          target_segments?: string[] | null;
          total_converted?: number | null;
          total_triggered?: number | null;
          trigger_type?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_customer_triggers_created_by_account_id_fkey';
            columns: ['created_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_customer_triggers_created_by_account_id_fkey';
            columns: ['created_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_customer_triggers_created_by_account_id_fkey';
            columns: ['created_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_triggers_created_by_account_id_fkey';
            columns: ['created_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_triggers_created_by_account_id_fkey';
            columns: ['created_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_triggers_created_by_account_id_fkey';
            columns: ['created_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_triggers_created_by_account_id_fkey';
            columns: ['created_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_customer_triggers_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_daily_briefings: {
        Row: {
          alerts: Json | null;
          date: string;
          generated_at: string | null;
          highlights: Json | null;
          id: string;
          location_id: string | null;
          merchant_id: string;
          suggestions: Json | null;
          summary: string;
          viewed_at: string | null;
        };
        Insert: {
          alerts?: Json | null;
          date: string;
          generated_at?: string | null;
          highlights?: Json | null;
          id?: string;
          location_id?: string | null;
          merchant_id: string;
          suggestions?: Json | null;
          summary: string;
          viewed_at?: string | null;
        };
        Update: {
          alerts?: Json | null;
          date?: string;
          generated_at?: string | null;
          highlights?: Json | null;
          id?: string;
          location_id?: string | null;
          merchant_id?: string;
          suggestions?: Json | null;
          summary?: string;
          viewed_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_daily_briefings_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_daily_briefings_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_delegated_tasks: {
        Row: {
          ai_reason: string | null;
          ai_suggestions: string[] | null;
          assigned_role: string | null;
          assigned_to: string | null;
          category: string;
          completed_at: string | null;
          completion_notes: string | null;
          created_at: string | null;
          created_by: string;
          description: string | null;
          due_date: string | null;
          estimated_minutes: number | null;
          id: string;
          merchant_id: string;
          priority: string;
          related_data: Json | null;
          status: string;
          title: string;
          updated_at: string | null;
          was_helpful: boolean | null;
        };
        Insert: {
          ai_reason?: string | null;
          ai_suggestions?: string[] | null;
          assigned_role?: string | null;
          assigned_to?: string | null;
          category: string;
          completed_at?: string | null;
          completion_notes?: string | null;
          created_at?: string | null;
          created_by?: string;
          description?: string | null;
          due_date?: string | null;
          estimated_minutes?: number | null;
          id?: string;
          merchant_id: string;
          priority?: string;
          related_data?: Json | null;
          status?: string;
          title: string;
          updated_at?: string | null;
          was_helpful?: boolean | null;
        };
        Update: {
          ai_reason?: string | null;
          ai_suggestions?: string[] | null;
          assigned_role?: string | null;
          assigned_to?: string | null;
          category?: string;
          completed_at?: string | null;
          completion_notes?: string | null;
          created_at?: string | null;
          created_by?: string;
          description?: string | null;
          due_date?: string | null;
          estimated_minutes?: number | null;
          id?: string;
          merchant_id?: string;
          priority?: string;
          related_data?: Json | null;
          status?: string;
          title?: string;
          updated_at?: string | null;
          was_helpful?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_delegated_tasks_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_expenses: {
        Row: {
          amount: number;
          category: string;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          expense_date: string;
          id: string;
          is_recurring: boolean | null;
          merchant_id: string;
          notes: string | null;
          receipt_url: string | null;
          recurrence_pattern: string | null;
          vendor: string | null;
        };
        Insert: {
          amount: number;
          category: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          expense_date?: string;
          id?: string;
          is_recurring?: boolean | null;
          merchant_id: string;
          notes?: string | null;
          receipt_url?: string | null;
          recurrence_pattern?: string | null;
          vendor?: string | null;
        };
        Update: {
          amount?: number;
          category?: string;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          expense_date?: string;
          id?: string;
          is_recurring?: boolean | null;
          merchant_id?: string;
          notes?: string | null;
          receipt_url?: string | null;
          recurrence_pattern?: string | null;
          vendor?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_expenses_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_feedback: {
        Row: {
          account_id: string;
          ai_priority: number | null;
          ai_sentiment: string | null;
          ai_summary: string | null;
          assigned_to: string | null;
          category: string;
          conversation_context: string | null;
          created_at: string | null;
          description: string;
          id: string;
          merchant_id: string;
          metadata: Json | null;
          resolution: string | null;
          resolved_at: string | null;
          reviewed_at: string | null;
          screenshot_url: string | null;
          session_id: string | null;
          status: string | null;
          subject: string;
          type: string;
        };
        Insert: {
          account_id: string;
          ai_priority?: number | null;
          ai_sentiment?: string | null;
          ai_summary?: string | null;
          assigned_to?: string | null;
          category: string;
          conversation_context?: string | null;
          created_at?: string | null;
          description: string;
          id?: string;
          merchant_id: string;
          metadata?: Json | null;
          resolution?: string | null;
          resolved_at?: string | null;
          reviewed_at?: string | null;
          screenshot_url?: string | null;
          session_id?: string | null;
          status?: string | null;
          subject: string;
          type: string;
        };
        Update: {
          account_id?: string;
          ai_priority?: number | null;
          ai_sentiment?: string | null;
          ai_summary?: string | null;
          assigned_to?: string | null;
          category?: string;
          conversation_context?: string | null;
          created_at?: string | null;
          description?: string;
          id?: string;
          merchant_id?: string;
          metadata?: Json | null;
          resolution?: string | null;
          resolved_at?: string | null;
          reviewed_at?: string | null;
          screenshot_url?: string | null;
          session_id?: string | null;
          status?: string | null;
          subject?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_feedback_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_feedback_responses: {
        Row: {
          created_at: string | null;
          feedback_id: string;
          id: string;
          is_public: boolean | null;
          responder_id: string;
          response: string;
        };
        Insert: {
          created_at?: string | null;
          feedback_id: string;
          id?: string;
          is_public?: boolean | null;
          responder_id: string;
          response: string;
        };
        Update: {
          created_at?: string | null;
          feedback_id?: string;
          id?: string;
          is_public?: boolean | null;
          responder_id?: string;
          response?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_feedback_responses_feedback_id_fkey';
            columns: ['feedback_id'];
            isOneToOne: false;
            referencedRelation: 'ai_feedback';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_financial_summaries: {
        Row: {
          costs: Json | null;
          created_at: string | null;
          gross_margin: number | null;
          gross_profit: number | null;
          id: string;
          merchant_id: string;
          net_margin: number | null;
          net_profit: number | null;
          period: string;
          period_end: string;
          period_start: string;
          revenue: Json | null;
          vs_last_period: Json | null;
        };
        Insert: {
          costs?: Json | null;
          created_at?: string | null;
          gross_margin?: number | null;
          gross_profit?: number | null;
          id?: string;
          merchant_id: string;
          net_margin?: number | null;
          net_profit?: number | null;
          period: string;
          period_end: string;
          period_start: string;
          revenue?: Json | null;
          vs_last_period?: Json | null;
        };
        Update: {
          costs?: Json | null;
          created_at?: string | null;
          gross_margin?: number | null;
          gross_profit?: number | null;
          id?: string;
          merchant_id?: string;
          net_margin?: number | null;
          net_profit?: number | null;
          period?: string;
          period_end?: string;
          period_start?: string;
          revenue?: Json | null;
          vs_last_period?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_financial_summaries_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_inventory_items: {
        Row: {
          avg_daily_usage: number | null;
          category: string;
          current_stock: number | null;
          id: string;
          last_updated: string | null;
          max_stock: number | null;
          merchant_id: string;
          min_stock: number | null;
          name: string;
          supplier_id: string | null;
          unit: string;
          unit_cost: number | null;
        };
        Insert: {
          avg_daily_usage?: number | null;
          category: string;
          current_stock?: number | null;
          id?: string;
          last_updated?: string | null;
          max_stock?: number | null;
          merchant_id: string;
          min_stock?: number | null;
          name: string;
          supplier_id?: string | null;
          unit: string;
          unit_cost?: number | null;
        };
        Update: {
          avg_daily_usage?: number | null;
          category?: string;
          current_stock?: number | null;
          id?: string;
          last_updated?: string | null;
          max_stock?: number | null;
          merchant_id?: string;
          min_stock?: number | null;
          name?: string;
          supplier_id?: string | null;
          unit?: string;
          unit_cost?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_inventory_items_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_inventory_items_supplier_id_fkey';
            columns: ['supplier_id'];
            isOneToOne: false;
            referencedRelation: 'ai_suppliers';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_learning_milestones: {
        Row: {
          acknowledged_at: string | null;
          acknowledged_by: string | null;
          id: string;
          location_id: string;
          milestone_name: string;
          milestone_type: string;
          milestone_value: number | null;
          notified_at: string | null;
          reached_at: string | null;
          unlocked_capability: string | null;
        };
        Insert: {
          acknowledged_at?: string | null;
          acknowledged_by?: string | null;
          id?: string;
          location_id: string;
          milestone_name: string;
          milestone_type: string;
          milestone_value?: number | null;
          notified_at?: string | null;
          reached_at?: string | null;
          unlocked_capability?: string | null;
        };
        Update: {
          acknowledged_at?: string | null;
          acknowledged_by?: string | null;
          id?: string;
          location_id?: string;
          milestone_name?: string;
          milestone_type?: string;
          milestone_value?: number | null;
          notified_at?: string | null;
          reached_at?: string | null;
          unlocked_capability?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_learning_milestones_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_learning_milestones_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_learning_milestones_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_learning_milestones_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_learning_milestones_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_learning_milestones_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_learning_milestones_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_learning_milestones_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_learning_progress: {
        Row: {
          allowed_auto_actions: Json | null;
          autonomy_level: number | null;
          autonomy_override: number | null;
          blocked_auto_actions: Json | null;
          communication_style_learned: boolean | null;
          competitor_prices_tracked: number | null;
          competitors_analyzed: number | null;
          created_at: string | null;
          customer_segments_created: number | null;
          days_of_data: number | null;
          explicit_preferences_set: number | null;
          first_order_date: string | null;
          id: string;
          last_progress_calculation: string | null;
          location_id: string;
          max_auto_spend_limit: number | null;
          menu_categories_count: number | null;
          menu_items_imported: number | null;
          menu_items_with_allergens: number | null;
          menu_items_with_descriptions: number | null;
          menu_items_with_ingredients: number | null;
          menu_items_with_prices: number | null;
          months_of_data: number | null;
          overall_progress: number | null;
          peak_days_identified: boolean | null;
          peak_hours_identified: boolean | null;
          progress_competitor_intel: number | null;
          progress_customer_patterns: number | null;
          progress_manager_preferences: number | null;
          progress_menu_knowledge: number | null;
          progress_seasonal_trends: number | null;
          progress_weather_correlations: number | null;
          progress_zone_analysis: number | null;
          repeat_customers_identified: number | null;
          seasonal_patterns_detected: Json | null;
          seasons_observed: number | null;
          suggestions_accepted: number | null;
          suggestions_modified: number | null;
          suggestions_rejected: number | null;
          total_ai_suggestions: number | null;
          total_orders_processed: number | null;
          unique_customers_seen: number | null;
          updated_at: string | null;
          weather_data_days: number | null;
          weather_predictions_accurate: number | null;
          weather_predictions_made: number | null;
          weather_sales_correlations_found: number | null;
          zone_analysis_completed: boolean | null;
          zone_analysis_completed_at: string | null;
          zone_analysis_data_points: number | null;
        };
        Insert: {
          allowed_auto_actions?: Json | null;
          autonomy_level?: number | null;
          autonomy_override?: number | null;
          blocked_auto_actions?: Json | null;
          communication_style_learned?: boolean | null;
          competitor_prices_tracked?: number | null;
          competitors_analyzed?: number | null;
          created_at?: string | null;
          customer_segments_created?: number | null;
          days_of_data?: number | null;
          explicit_preferences_set?: number | null;
          first_order_date?: string | null;
          id?: string;
          last_progress_calculation?: string | null;
          location_id: string;
          max_auto_spend_limit?: number | null;
          menu_categories_count?: number | null;
          menu_items_imported?: number | null;
          menu_items_with_allergens?: number | null;
          menu_items_with_descriptions?: number | null;
          menu_items_with_ingredients?: number | null;
          menu_items_with_prices?: number | null;
          months_of_data?: number | null;
          overall_progress?: number | null;
          peak_days_identified?: boolean | null;
          peak_hours_identified?: boolean | null;
          progress_competitor_intel?: number | null;
          progress_customer_patterns?: number | null;
          progress_manager_preferences?: number | null;
          progress_menu_knowledge?: number | null;
          progress_seasonal_trends?: number | null;
          progress_weather_correlations?: number | null;
          progress_zone_analysis?: number | null;
          repeat_customers_identified?: number | null;
          seasonal_patterns_detected?: Json | null;
          seasons_observed?: number | null;
          suggestions_accepted?: number | null;
          suggestions_modified?: number | null;
          suggestions_rejected?: number | null;
          total_ai_suggestions?: number | null;
          total_orders_processed?: number | null;
          unique_customers_seen?: number | null;
          updated_at?: string | null;
          weather_data_days?: number | null;
          weather_predictions_accurate?: number | null;
          weather_predictions_made?: number | null;
          weather_sales_correlations_found?: number | null;
          zone_analysis_completed?: boolean | null;
          zone_analysis_completed_at?: string | null;
          zone_analysis_data_points?: number | null;
        };
        Update: {
          allowed_auto_actions?: Json | null;
          autonomy_level?: number | null;
          autonomy_override?: number | null;
          blocked_auto_actions?: Json | null;
          communication_style_learned?: boolean | null;
          competitor_prices_tracked?: number | null;
          competitors_analyzed?: number | null;
          created_at?: string | null;
          customer_segments_created?: number | null;
          days_of_data?: number | null;
          explicit_preferences_set?: number | null;
          first_order_date?: string | null;
          id?: string;
          last_progress_calculation?: string | null;
          location_id?: string;
          max_auto_spend_limit?: number | null;
          menu_categories_count?: number | null;
          menu_items_imported?: number | null;
          menu_items_with_allergens?: number | null;
          menu_items_with_descriptions?: number | null;
          menu_items_with_ingredients?: number | null;
          menu_items_with_prices?: number | null;
          months_of_data?: number | null;
          overall_progress?: number | null;
          peak_days_identified?: boolean | null;
          peak_hours_identified?: boolean | null;
          progress_competitor_intel?: number | null;
          progress_customer_patterns?: number | null;
          progress_manager_preferences?: number | null;
          progress_menu_knowledge?: number | null;
          progress_seasonal_trends?: number | null;
          progress_weather_correlations?: number | null;
          progress_zone_analysis?: number | null;
          repeat_customers_identified?: number | null;
          seasonal_patterns_detected?: Json | null;
          seasons_observed?: number | null;
          suggestions_accepted?: number | null;
          suggestions_modified?: number | null;
          suggestions_rejected?: number | null;
          total_ai_suggestions?: number | null;
          total_orders_processed?: number | null;
          unique_customers_seen?: number | null;
          updated_at?: string | null;
          weather_data_days?: number | null;
          weather_predictions_accurate?: number | null;
          weather_predictions_made?: number | null;
          weather_sales_correlations_found?: number | null;
          zone_analysis_completed?: boolean | null;
          zone_analysis_completed_at?: string | null;
          zone_analysis_data_points?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_learning_progress_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: true;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_market_trends: {
        Row: {
          category: string;
          created_at: string | null;
          description: string | null;
          estimated_impact: string | null;
          expires_at: string | null;
          how_to_apply: string | null;
          id: string;
          merchant_id: string;
          relevance: string | null;
          source: string | null;
          trend_name: string;
        };
        Insert: {
          category: string;
          created_at?: string | null;
          description?: string | null;
          estimated_impact?: string | null;
          expires_at?: string | null;
          how_to_apply?: string | null;
          id?: string;
          merchant_id: string;
          relevance?: string | null;
          source?: string | null;
          trend_name: string;
        };
        Update: {
          category?: string;
          created_at?: string | null;
          description?: string | null;
          estimated_impact?: string | null;
          expires_at?: string | null;
          how_to_apply?: string | null;
          id?: string;
          merchant_id?: string;
          relevance?: string | null;
          source?: string | null;
          trend_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_market_trends_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_merchant_knowledge: {
        Row: {
          content: string;
          created_at: string | null;
          document_type: string;
          expires_at: string | null;
          id: string;
          importance: string | null;
          is_active: boolean | null;
          last_referenced_at: string | null;
          last_updated_by: string;
          last_updated_by_account_id: string | null;
          merchant_id: string;
          metadata: Json | null;
          previous_version_id: string | null;
          summary: string | null;
          tags: string[] | null;
          times_referenced: number | null;
          title: string;
          updated_at: string | null;
          version: number | null;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          document_type: string;
          expires_at?: string | null;
          id?: string;
          importance?: string | null;
          is_active?: boolean | null;
          last_referenced_at?: string | null;
          last_updated_by: string;
          last_updated_by_account_id?: string | null;
          merchant_id: string;
          metadata?: Json | null;
          previous_version_id?: string | null;
          summary?: string | null;
          tags?: string[] | null;
          times_referenced?: number | null;
          title: string;
          updated_at?: string | null;
          version?: number | null;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          document_type?: string;
          expires_at?: string | null;
          id?: string;
          importance?: string | null;
          is_active?: boolean | null;
          last_referenced_at?: string | null;
          last_updated_by?: string;
          last_updated_by_account_id?: string | null;
          merchant_id?: string;
          metadata?: Json | null;
          previous_version_id?: string | null;
          summary?: string | null;
          tags?: string[] | null;
          times_referenced?: number | null;
          title?: string;
          updated_at?: string | null;
          version?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_merchant_knowledge_last_updated_by_account_id_fkey';
            columns: ['last_updated_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_merchant_knowledge_last_updated_by_account_id_fkey';
            columns: ['last_updated_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_merchant_knowledge_last_updated_by_account_id_fkey';
            columns: ['last_updated_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_merchant_knowledge_last_updated_by_account_id_fkey';
            columns: ['last_updated_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_merchant_knowledge_last_updated_by_account_id_fkey';
            columns: ['last_updated_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_merchant_knowledge_last_updated_by_account_id_fkey';
            columns: ['last_updated_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_merchant_knowledge_last_updated_by_account_id_fkey';
            columns: ['last_updated_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_merchant_knowledge_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_merchant_knowledge_previous_version_id_fkey';
            columns: ['previous_version_id'];
            isOneToOne: false;
            referencedRelation: 'ai_merchant_knowledge';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_merchant_preferences: {
        Row: {
          alert_on_negative_feedback: boolean | null;
          alert_threshold_rating: number | null;
          alert_types: string[] | null;
          briefing_time: string | null;
          briefing_timezone: string | null;
          can_create_events: boolean | null;
          can_modify_menu: boolean | null;
          can_read_analytics: boolean | null;
          can_read_events: boolean | null;
          can_read_feedback: boolean | null;
          can_read_menu: boolean | null;
          can_read_orders: boolean | null;
          can_respond_reviews: boolean | null;
          can_send_notifications: boolean | null;
          communication_style: string | null;
          created_at: string | null;
          daily_briefing_enabled: boolean | null;
          email_notifications: boolean | null;
          include_last_n_days_data: number | null;
          limit_reset_at: string | null;
          max_context_items: number | null;
          merchant_id: string;
          monthly_request_limit: number | null;
          monthly_requests_used: number | null;
          preferred_language: string | null;
          push_notifications: boolean | null;
          suggest_events: boolean | null;
          suggest_menu_updates: boolean | null;
          suggestion_frequency: string | null;
          updated_at: string | null;
        };
        Insert: {
          alert_on_negative_feedback?: boolean | null;
          alert_threshold_rating?: number | null;
          alert_types?: string[] | null;
          briefing_time?: string | null;
          briefing_timezone?: string | null;
          can_create_events?: boolean | null;
          can_modify_menu?: boolean | null;
          can_read_analytics?: boolean | null;
          can_read_events?: boolean | null;
          can_read_feedback?: boolean | null;
          can_read_menu?: boolean | null;
          can_read_orders?: boolean | null;
          can_respond_reviews?: boolean | null;
          can_send_notifications?: boolean | null;
          communication_style?: string | null;
          created_at?: string | null;
          daily_briefing_enabled?: boolean | null;
          email_notifications?: boolean | null;
          include_last_n_days_data?: number | null;
          limit_reset_at?: string | null;
          max_context_items?: number | null;
          merchant_id: string;
          monthly_request_limit?: number | null;
          monthly_requests_used?: number | null;
          preferred_language?: string | null;
          push_notifications?: boolean | null;
          suggest_events?: boolean | null;
          suggest_menu_updates?: boolean | null;
          suggestion_frequency?: string | null;
          updated_at?: string | null;
        };
        Update: {
          alert_on_negative_feedback?: boolean | null;
          alert_threshold_rating?: number | null;
          alert_types?: string[] | null;
          briefing_time?: string | null;
          briefing_timezone?: string | null;
          can_create_events?: boolean | null;
          can_modify_menu?: boolean | null;
          can_read_analytics?: boolean | null;
          can_read_events?: boolean | null;
          can_read_feedback?: boolean | null;
          can_read_menu?: boolean | null;
          can_read_orders?: boolean | null;
          can_respond_reviews?: boolean | null;
          can_send_notifications?: boolean | null;
          communication_style?: string | null;
          created_at?: string | null;
          daily_briefing_enabled?: boolean | null;
          email_notifications?: boolean | null;
          include_last_n_days_data?: number | null;
          limit_reset_at?: string | null;
          max_context_items?: number | null;
          merchant_id?: string;
          monthly_request_limit?: number | null;
          monthly_requests_used?: number | null;
          preferred_language?: string | null;
          push_notifications?: boolean | null;
          suggest_events?: boolean | null;
          suggest_menu_updates?: boolean | null;
          suggestion_frequency?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_merchant_preferences_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: true;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_negotiation_drafts: {
        Row: {
          created_at: string | null;
          email_draft: string;
          id: string;
          merchant_id: string;
          subject: string;
          supplier_id: string;
          supplier_name: string;
          talking_points: string[] | null;
          target_savings: number | null;
          type: string;
        };
        Insert: {
          created_at?: string | null;
          email_draft: string;
          id?: string;
          merchant_id: string;
          subject: string;
          supplier_id: string;
          supplier_name: string;
          talking_points?: string[] | null;
          target_savings?: number | null;
          type: string;
        };
        Update: {
          created_at?: string | null;
          email_draft?: string;
          id?: string;
          merchant_id?: string;
          subject?: string;
          supplier_id?: string;
          supplier_name?: string;
          talking_points?: string[] | null;
          target_savings?: number | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_negotiation_drafts_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_negotiation_drafts_supplier_id_fkey';
            columns: ['supplier_id'];
            isOneToOne: false;
            referencedRelation: 'ai_suppliers';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_partnership_opportunities: {
        Row: {
          contact_info: string | null;
          created_at: string | null;
          effort: string | null;
          estimated_value: string | null;
          id: string;
          merchant_id: string;
          opportunity_type: string | null;
          partner_description: string | null;
          partner_name: string;
          partner_type: string;
          potential_benefit: string | null;
          status: string | null;
          updated_at: string | null;
        };
        Insert: {
          contact_info?: string | null;
          created_at?: string | null;
          effort?: string | null;
          estimated_value?: string | null;
          id?: string;
          merchant_id: string;
          opportunity_type?: string | null;
          partner_description?: string | null;
          partner_name: string;
          partner_type: string;
          potential_benefit?: string | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Update: {
          contact_info?: string | null;
          created_at?: string | null;
          effort?: string | null;
          estimated_value?: string | null;
          id?: string;
          merchant_id?: string;
          opportunity_type?: string | null;
          partner_description?: string | null;
          partner_name?: string;
          partner_type?: string;
          potential_benefit?: string | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_partnership_opportunities_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_price_comparisons: {
        Row: {
          created_at: string | null;
          currency: string | null;
          id: string;
          item_category: string | null;
          item_name: string;
          market_average: number | null;
          market_high: number | null;
          market_low: number | null;
          merchant_id: string;
          merchant_price: number;
          percentage_diff: number | null;
          price_position: string | null;
          reasoning: string | null;
          recommendation: string | null;
        };
        Insert: {
          created_at?: string | null;
          currency?: string | null;
          id?: string;
          item_category?: string | null;
          item_name: string;
          market_average?: number | null;
          market_high?: number | null;
          market_low?: number | null;
          merchant_id: string;
          merchant_price: number;
          percentage_diff?: number | null;
          price_position?: string | null;
          reasoning?: string | null;
          recommendation?: string | null;
        };
        Update: {
          created_at?: string | null;
          currency?: string | null;
          id?: string;
          item_category?: string | null;
          item_name?: string;
          market_average?: number | null;
          market_high?: number | null;
          market_low?: number | null;
          merchant_id?: string;
          merchant_price?: number;
          percentage_diff?: number | null;
          price_position?: string | null;
          reasoning?: string | null;
          recommendation?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_price_comparisons_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_purchase_orders: {
        Row: {
          created_at: string | null;
          expected_delivery: string | null;
          id: string;
          items: Json;
          merchant_id: string;
          notes: string | null;
          status: string;
          subtotal: number | null;
          supplier_id: string;
          supplier_name: string;
          tax: number | null;
          total: number | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          expected_delivery?: string | null;
          id?: string;
          items?: Json;
          merchant_id: string;
          notes?: string | null;
          status?: string;
          subtotal?: number | null;
          supplier_id: string;
          supplier_name: string;
          tax?: number | null;
          total?: number | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          expected_delivery?: string | null;
          id?: string;
          items?: Json;
          merchant_id?: string;
          notes?: string | null;
          status?: string;
          subtotal?: number | null;
          supplier_id?: string;
          supplier_name?: string;
          tax?: number | null;
          total?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_purchase_orders_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_purchase_orders_supplier_id_fkey';
            columns: ['supplier_id'];
            isOneToOne: false;
            referencedRelation: 'ai_suppliers';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_sessions: {
        Row: {
          account_id: string;
          archived_at: string | null;
          id: string;
          last_message_at: string | null;
          merchant_id: string;
          message_count: number | null;
          started_at: string | null;
          status: string | null;
          summary: string | null;
          title: string | null;
          total_tokens: number | null;
        };
        Insert: {
          account_id: string;
          archived_at?: string | null;
          id?: string;
          last_message_at?: string | null;
          merchant_id: string;
          message_count?: number | null;
          started_at?: string | null;
          status?: string | null;
          summary?: string | null;
          title?: string | null;
          total_tokens?: number | null;
        };
        Update: {
          account_id?: string;
          archived_at?: string | null;
          id?: string;
          last_message_at?: string | null;
          merchant_id?: string;
          message_count?: number | null;
          started_at?: string | null;
          status?: string | null;
          summary?: string | null;
          title?: string | null;
          total_tokens?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_sessions_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_social_accounts: {
        Row: {
          access_token: string | null;
          account_id: string | null;
          account_name: string | null;
          created_at: string | null;
          id: string;
          is_active: boolean | null;
          last_sync_at: string | null;
          merchant_id: string;
          platform: string;
          refresh_token: string | null;
          token_expires_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          access_token?: string | null;
          account_id?: string | null;
          account_name?: string | null;
          created_at?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_sync_at?: string | null;
          merchant_id: string;
          platform: string;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          access_token?: string | null;
          account_id?: string | null;
          account_name?: string | null;
          created_at?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_sync_at?: string | null;
          merchant_id?: string;
          platform?: string;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_social_accounts_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_social_posts: {
        Row: {
          best_time_to_post: string | null;
          call_to_action: string | null;
          caption: string;
          comments: number | null;
          content: string;
          created_at: string | null;
          hashtags: string[] | null;
          id: string;
          likes: number | null;
          media_suggestion: string | null;
          media_type: string | null;
          media_urls: string[] | null;
          merchant_id: string;
          platform: string;
          published_at: string | null;
          reach: number | null;
          scheduled_for: string | null;
          shares: number | null;
          status: string | null;
          timezone: string | null;
        };
        Insert: {
          best_time_to_post?: string | null;
          call_to_action?: string | null;
          caption: string;
          comments?: number | null;
          content: string;
          created_at?: string | null;
          hashtags?: string[] | null;
          id?: string;
          likes?: number | null;
          media_suggestion?: string | null;
          media_type?: string | null;
          media_urls?: string[] | null;
          merchant_id: string;
          platform: string;
          published_at?: string | null;
          reach?: number | null;
          scheduled_for?: string | null;
          shares?: number | null;
          status?: string | null;
          timezone?: string | null;
        };
        Update: {
          best_time_to_post?: string | null;
          call_to_action?: string | null;
          caption?: string;
          comments?: number | null;
          content?: string;
          created_at?: string | null;
          hashtags?: string[] | null;
          id?: string;
          likes?: number | null;
          media_suggestion?: string | null;
          media_type?: string | null;
          media_urls?: string[] | null;
          merchant_id?: string;
          platform?: string;
          published_at?: string | null;
          reach?: number | null;
          scheduled_for?: string | null;
          shares?: number | null;
          status?: string | null;
          timezone?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_social_posts_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_stock_alerts: {
        Row: {
          alert_type: string;
          created_at: string | null;
          current_level: number | null;
          id: string;
          item_id: string;
          item_name: string;
          merchant_id: string;
          priority: string;
          resolved_at: string | null;
          suggested_action: string | null;
          threshold: number | null;
        };
        Insert: {
          alert_type: string;
          created_at?: string | null;
          current_level?: number | null;
          id?: string;
          item_id: string;
          item_name: string;
          merchant_id: string;
          priority?: string;
          resolved_at?: string | null;
          suggested_action?: string | null;
          threshold?: number | null;
        };
        Update: {
          alert_type?: string;
          created_at?: string | null;
          current_level?: number | null;
          id?: string;
          item_id?: string;
          item_name?: string;
          merchant_id?: string;
          priority?: string;
          resolved_at?: string | null;
          suggested_action?: string | null;
          threshold?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_stock_alerts_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: false;
            referencedRelation: 'ai_inventory_items';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_stock_alerts_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_stock_movements: {
        Row: {
          adjustment: number;
          created_at: string | null;
          created_by: string | null;
          id: string;
          item_id: string;
          new_stock: number;
          reason: string | null;
        };
        Insert: {
          adjustment: number;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          item_id: string;
          new_stock: number;
          reason?: string | null;
        };
        Update: {
          adjustment?: number;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          item_id?: string;
          new_stock?: number;
          reason?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_stock_movements_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: false;
            referencedRelation: 'ai_inventory_items';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_suggestions: {
        Row: {
          created_at: string | null;
          description: string;
          effort: string | null;
          expected_impact: string | null;
          expires_at: string | null;
          id: string;
          implemented_at: string | null;
          location_id: string | null;
          merchant_id: string;
          priority: number | null;
          reviewed_at: string | null;
          status: string | null;
          title: string;
          type: string;
          user_feedback: string | null;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          effort?: string | null;
          expected_impact?: string | null;
          expires_at?: string | null;
          id?: string;
          implemented_at?: string | null;
          location_id?: string | null;
          merchant_id: string;
          priority?: number | null;
          reviewed_at?: string | null;
          status?: string | null;
          title: string;
          type: string;
          user_feedback?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          effort?: string | null;
          expected_impact?: string | null;
          expires_at?: string | null;
          id?: string;
          implemented_at?: string | null;
          location_id?: string | null;
          merchant_id?: string;
          priority?: number | null;
          reviewed_at?: string | null;
          status?: string | null;
          title?: string;
          type?: string;
          user_feedback?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_suggestions_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_suggestions_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_suppliers: {
        Row: {
          address: string | null;
          categories: string[] | null;
          contact_name: string | null;
          created_at: string | null;
          email: string | null;
          id: string;
          is_active: boolean | null;
          merchant_id: string;
          name: string;
          notes: string | null;
          phone: string | null;
          rating: number | null;
        };
        Insert: {
          address?: string | null;
          categories?: string[] | null;
          contact_name?: string | null;
          created_at?: string | null;
          email?: string | null;
          id?: string;
          is_active?: boolean | null;
          merchant_id: string;
          name: string;
          notes?: string | null;
          phone?: string | null;
          rating?: number | null;
        };
        Update: {
          address?: string | null;
          categories?: string[] | null;
          contact_name?: string | null;
          created_at?: string | null;
          email?: string | null;
          id?: string;
          is_active?: boolean | null;
          merchant_id?: string;
          name?: string;
          notes?: string | null;
          phone?: string | null;
          rating?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_suppliers_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_task_recurrences: {
        Row: {
          created_at: string | null;
          id: string;
          is_active: boolean | null;
          last_generated_at: string | null;
          merchant_id: string;
          next_due_at: string | null;
          template_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_generated_at?: string | null;
          merchant_id: string;
          next_due_at?: string | null;
          template_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_generated_at?: string | null;
          merchant_id?: string;
          next_due_at?: string | null;
          template_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_task_recurrences_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_task_recurrences_template_id_fkey';
            columns: ['template_id'];
            isOneToOne: false;
            referencedRelation: 'ai_task_templates';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_task_templates: {
        Row: {
          category: string;
          checklist: Json | null;
          created_at: string | null;
          default_priority: string | null;
          description: string | null;
          estimated_minutes: number | null;
          id: string;
          is_active: boolean | null;
          is_recurring: boolean | null;
          merchant_id: string | null;
          name: string;
          recurrence_day: number | null;
          recurrence_pattern: string | null;
          updated_at: string | null;
        };
        Insert: {
          category: string;
          checklist?: Json | null;
          created_at?: string | null;
          default_priority?: string | null;
          description?: string | null;
          estimated_minutes?: number | null;
          id?: string;
          is_active?: boolean | null;
          is_recurring?: boolean | null;
          merchant_id?: string | null;
          name: string;
          recurrence_day?: number | null;
          recurrence_pattern?: string | null;
          updated_at?: string | null;
        };
        Update: {
          category?: string;
          checklist?: Json | null;
          created_at?: string | null;
          default_priority?: string | null;
          description?: string | null;
          estimated_minutes?: number | null;
          id?: string;
          is_active?: boolean | null;
          is_recurring?: boolean | null;
          merchant_id?: string | null;
          name?: string;
          recurrence_day?: number | null;
          recurrence_pattern?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_task_templates_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_trigger_budgets: {
        Row: {
          auto_pause_on_budget_exhausted: boolean | null;
          auto_pause_on_redemptions_exhausted: boolean | null;
          budget_type: string;
          cost_per_execution: number | null;
          created_at: string | null;
          end_date: string | null;
          id: string;
          is_active: boolean | null;
          last_notified_at: string | null;
          max_redemptions: number | null;
          merchant_id: string;
          notes: string | null;
          notify_at_budget_percentage: number | null;
          notify_at_redemption_percentage: number | null;
          paused_at: string | null;
          paused_reason: string | null;
          redemptions_used: number | null;
          spent_amount: number | null;
          start_date: string | null;
          total_budget: number | null;
          total_conversions: number | null;
          total_revenue_generated: number | null;
          trigger_id: string;
          updated_at: string | null;
        };
        Insert: {
          auto_pause_on_budget_exhausted?: boolean | null;
          auto_pause_on_redemptions_exhausted?: boolean | null;
          budget_type?: string;
          cost_per_execution?: number | null;
          created_at?: string | null;
          end_date?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_notified_at?: string | null;
          max_redemptions?: number | null;
          merchant_id: string;
          notes?: string | null;
          notify_at_budget_percentage?: number | null;
          notify_at_redemption_percentage?: number | null;
          paused_at?: string | null;
          paused_reason?: string | null;
          redemptions_used?: number | null;
          spent_amount?: number | null;
          start_date?: string | null;
          total_budget?: number | null;
          total_conversions?: number | null;
          total_revenue_generated?: number | null;
          trigger_id: string;
          updated_at?: string | null;
        };
        Update: {
          auto_pause_on_budget_exhausted?: boolean | null;
          auto_pause_on_redemptions_exhausted?: boolean | null;
          budget_type?: string;
          cost_per_execution?: number | null;
          created_at?: string | null;
          end_date?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_notified_at?: string | null;
          max_redemptions?: number | null;
          merchant_id?: string;
          notes?: string | null;
          notify_at_budget_percentage?: number | null;
          notify_at_redemption_percentage?: number | null;
          paused_at?: string | null;
          paused_reason?: string | null;
          redemptions_used?: number | null;
          spent_amount?: number | null;
          start_date?: string | null;
          total_budget?: number | null;
          total_conversions?: number | null;
          total_revenue_generated?: number | null;
          trigger_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_trigger_budgets_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_trigger_budgets_trigger_id_fkey';
            columns: ['trigger_id'];
            isOneToOne: true;
            referencedRelation: 'ai_customer_triggers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_trigger_budgets_trigger_id_fkey';
            columns: ['trigger_id'];
            isOneToOne: true;
            referencedRelation: 'v_trigger_performance';
            referencedColumns: ['trigger_id'];
          },
          {
            foreignKeyName: 'ai_trigger_budgets_trigger_id_fkey';
            columns: ['trigger_id'];
            isOneToOne: true;
            referencedRelation: 'v_trigger_roi_summary';
            referencedColumns: ['trigger_id'];
          },
        ];
      };
      ai_usage_logs: {
        Row: {
          account_id: string | null;
          action_type: string;
          cost_usd: number | null;
          created_at: string | null;
          entity_id: string | null;
          entity_type: string | null;
          error_message: string | null;
          id: string;
          input_tokens: number | null;
          latency_ms: number | null;
          merchant_id: string;
          model: string | null;
          output_tokens: number | null;
          prompt_summary: string | null;
          response_summary: string | null;
          session_id: string | null;
          status: string | null;
          total_tokens: number | null;
        };
        Insert: {
          account_id?: string | null;
          action_type: string;
          cost_usd?: number | null;
          created_at?: string | null;
          entity_id?: string | null;
          entity_type?: string | null;
          error_message?: string | null;
          id?: string;
          input_tokens?: number | null;
          latency_ms?: number | null;
          merchant_id: string;
          model?: string | null;
          output_tokens?: number | null;
          prompt_summary?: string | null;
          response_summary?: string | null;
          session_id?: string | null;
          status?: string | null;
          total_tokens?: number | null;
        };
        Update: {
          account_id?: string | null;
          action_type?: string;
          cost_usd?: number | null;
          created_at?: string | null;
          entity_id?: string | null;
          entity_type?: string | null;
          error_message?: string | null;
          id?: string;
          input_tokens?: number | null;
          latency_ms?: number | null;
          merchant_id?: string;
          model?: string | null;
          output_tokens?: number | null;
          prompt_summary?: string | null;
          response_summary?: string | null;
          session_id?: string | null;
          status?: string | null;
          total_tokens?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_usage_logs_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_usage_logs_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_usage_logs_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_usage_logs_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_usage_logs_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_usage_logs_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_usage_logs_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ai_usage_logs_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_workflow_definitions: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          is_active: boolean | null;
          merchant_id: string;
          name: string;
          steps: Json;
          trigger: string;
          trigger_config: Json | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          merchant_id: string;
          name: string;
          steps?: Json;
          trigger: string;
          trigger_config?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          merchant_id?: string;
          name?: string;
          steps?: Json;
          trigger?: string;
          trigger_config?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_workflow_definitions_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_workflow_executions: {
        Row: {
          completed_at: string | null;
          context: Json | null;
          error: string | null;
          id: string;
          merchant_id: string;
          started_at: string | null;
          status: string;
          steps: Json;
          triggered_by: string;
          workflow_id: string;
        };
        Insert: {
          completed_at?: string | null;
          context?: Json | null;
          error?: string | null;
          id?: string;
          merchant_id: string;
          started_at?: string | null;
          status?: string;
          steps?: Json;
          triggered_by: string;
          workflow_id: string;
        };
        Update: {
          completed_at?: string | null;
          context?: Json | null;
          error?: string | null;
          id?: string;
          merchant_id?: string;
          started_at?: string | null;
          status?: string;
          steps?: Json;
          triggered_by?: string;
          workflow_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_workflow_executions_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_workflow_executions_workflow_id_fkey';
            columns: ['workflow_id'];
            isOneToOne: false;
            referencedRelation: 'ai_workflow_definitions';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_workflow_logs: {
        Row: {
          created_at: string | null;
          data: Json | null;
          execution_id: string;
          id: string;
          level: string;
          message: string;
          step_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          data?: Json | null;
          execution_id: string;
          id?: string;
          level?: string;
          message: string;
          step_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          data?: Json | null;
          execution_id?: string;
          id?: string;
          level?: string;
          message?: string;
          step_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_workflow_logs_execution_id_fkey';
            columns: ['execution_id'];
            isOneToOne: false;
            referencedRelation: 'ai_workflow_executions';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_workflow_schedules: {
        Row: {
          created_at: string | null;
          cron_expression: string;
          id: string;
          is_active: boolean | null;
          last_execution_id: string | null;
          last_run_at: string | null;
          merchant_id: string;
          next_run_at: string | null;
          timezone: string | null;
          workflow_id: string;
        };
        Insert: {
          created_at?: string | null;
          cron_expression: string;
          id?: string;
          is_active?: boolean | null;
          last_execution_id?: string | null;
          last_run_at?: string | null;
          merchant_id: string;
          next_run_at?: string | null;
          timezone?: string | null;
          workflow_id: string;
        };
        Update: {
          created_at?: string | null;
          cron_expression?: string;
          id?: string;
          is_active?: boolean | null;
          last_execution_id?: string | null;
          last_run_at?: string | null;
          merchant_id?: string;
          next_run_at?: string | null;
          timezone?: string | null;
          workflow_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_workflow_schedules_last_execution_id_fkey';
            columns: ['last_execution_id'];
            isOneToOne: false;
            referencedRelation: 'ai_workflow_executions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_workflow_schedules_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_workflow_schedules_workflow_id_fkey';
            columns: ['workflow_id'];
            isOneToOne: true;
            referencedRelation: 'ai_workflow_definitions';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_zone_analysis: {
        Row: {
          address: string | null;
          busy_days: string[] | null;
          city: string | null;
          coordinates: Json | null;
          country: string | null;
          created_at: string | null;
          demographics: Json | null;
          foot_traffic: string | null;
          id: string;
          location_id: string;
          merchant_id: string;
          nearby_pois: string[] | null;
          peak_hours: string[] | null;
          recommendations: string[] | null;
          zone_type: string | null;
        };
        Insert: {
          address?: string | null;
          busy_days?: string[] | null;
          city?: string | null;
          coordinates?: Json | null;
          country?: string | null;
          created_at?: string | null;
          demographics?: Json | null;
          foot_traffic?: string | null;
          id?: string;
          location_id: string;
          merchant_id: string;
          nearby_pois?: string[] | null;
          peak_hours?: string[] | null;
          recommendations?: string[] | null;
          zone_type?: string | null;
        };
        Update: {
          address?: string | null;
          busy_days?: string[] | null;
          city?: string | null;
          coordinates?: Json | null;
          country?: string | null;
          created_at?: string | null;
          demographics?: Json | null;
          foot_traffic?: string | null;
          id?: string;
          location_id?: string;
          merchant_id?: string;
          nearby_pois?: string[] | null;
          peak_hours?: string[] | null;
          recommendations?: string[] | null;
          zone_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_zone_analysis_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: true;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_zone_analysis_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_zone_profiles: {
        Row: {
          address: string | null;
          analysis_confidence: number | null;
          city: string | null;
          competitor_density: string | null;
          coordinates: Json | null;
          country: string | null;
          created_at: string | null;
          data_source: string | null;
          demographics: Json | null;
          estimated_daily_footfall: number | null;
          id: string;
          last_analyzed_at: string | null;
          location_id: string;
          merchant_id: string;
          nearby_competitors_count: number | null;
          pedestrian_flows: Json | null;
          pois: Json | null;
          population_density: string | null;
          recommendations: Json | null;
          recurring_events: Json | null;
          seasonal_patterns: Json | null;
          updated_at: string | null;
          zone_type: string | null;
        };
        Insert: {
          address?: string | null;
          analysis_confidence?: number | null;
          city?: string | null;
          competitor_density?: string | null;
          coordinates?: Json | null;
          country?: string | null;
          created_at?: string | null;
          data_source?: string | null;
          demographics?: Json | null;
          estimated_daily_footfall?: number | null;
          id?: string;
          last_analyzed_at?: string | null;
          location_id: string;
          merchant_id: string;
          nearby_competitors_count?: number | null;
          pedestrian_flows?: Json | null;
          pois?: Json | null;
          population_density?: string | null;
          recommendations?: Json | null;
          recurring_events?: Json | null;
          seasonal_patterns?: Json | null;
          updated_at?: string | null;
          zone_type?: string | null;
        };
        Update: {
          address?: string | null;
          analysis_confidence?: number | null;
          city?: string | null;
          competitor_density?: string | null;
          coordinates?: Json | null;
          country?: string | null;
          created_at?: string | null;
          data_source?: string | null;
          demographics?: Json | null;
          estimated_daily_footfall?: number | null;
          id?: string;
          last_analyzed_at?: string | null;
          location_id?: string;
          merchant_id?: string;
          nearby_competitors_count?: number | null;
          pedestrian_flows?: Json | null;
          pois?: Json | null;
          population_density?: string | null;
          recommendations?: Json | null;
          recurring_events?: Json | null;
          seasonal_patterns?: Json | null;
          updated_at?: string | null;
          zone_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_zone_profiles_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: true;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_zone_profiles_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      analytics_daily_aggregates: {
        Row: {
          country_code: string;
          created_at: string;
          date: string;
          device_type: string;
          event_category: string;
          event_count: number | null;
          event_name: string;
          id: string;
          merchant_id: string;
          platform: string;
          unique_sessions: number | null;
          unique_users: number | null;
          updated_at: string;
        };
        Insert: {
          country_code?: string;
          created_at?: string;
          date: string;
          device_type?: string;
          event_category: string;
          event_count?: number | null;
          event_name: string;
          id?: string;
          merchant_id?: string;
          platform?: string;
          unique_sessions?: number | null;
          unique_users?: number | null;
          updated_at?: string;
        };
        Update: {
          country_code?: string;
          created_at?: string;
          date?: string;
          device_type?: string;
          event_category?: string;
          event_count?: number | null;
          event_name?: string;
          id?: string;
          merchant_id?: string;
          platform?: string;
          unique_sessions?: number | null;
          unique_users?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      analytics_events: {
        Row: {
          account_id: string | null;
          anonymous_id: string | null;
          app_version: string | null;
          browser: string | null;
          browser_version: string | null;
          city: string | null;
          client_timestamp: string | null;
          country_code: string | null;
          created_at: string;
          device_type: string | null;
          event_category: string;
          event_date: string;
          event_name: string;
          id: string;
          merchant_id: string | null;
          organization_id: string | null;
          os: string | null;
          os_version: string | null;
          page_path: string | null;
          page_title: string | null;
          platform: string | null;
          properties: Json | null;
          referrer: string | null;
          region: string | null;
          screen_height: number | null;
          screen_width: number | null;
          session_id: string | null;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_medium: string | null;
          utm_source: string | null;
          utm_term: string | null;
        };
        Insert: {
          account_id?: string | null;
          anonymous_id?: string | null;
          app_version?: string | null;
          browser?: string | null;
          browser_version?: string | null;
          city?: string | null;
          client_timestamp?: string | null;
          country_code?: string | null;
          created_at?: string;
          device_type?: string | null;
          event_category: string;
          event_date?: string;
          event_name: string;
          id?: string;
          merchant_id?: string | null;
          organization_id?: string | null;
          os?: string | null;
          os_version?: string | null;
          page_path?: string | null;
          page_title?: string | null;
          platform?: string | null;
          properties?: Json | null;
          referrer?: string | null;
          region?: string | null;
          screen_height?: number | null;
          screen_width?: number | null;
          session_id?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          utm_term?: string | null;
        };
        Update: {
          account_id?: string | null;
          anonymous_id?: string | null;
          app_version?: string | null;
          browser?: string | null;
          browser_version?: string | null;
          city?: string | null;
          client_timestamp?: string | null;
          country_code?: string | null;
          created_at?: string;
          device_type?: string | null;
          event_category?: string;
          event_date?: string;
          event_name?: string;
          id?: string;
          merchant_id?: string | null;
          organization_id?: string | null;
          os?: string | null;
          os_version?: string | null;
          page_path?: string | null;
          page_title?: string | null;
          platform?: string | null;
          properties?: Json | null;
          referrer?: string | null;
          region?: string | null;
          screen_height?: number | null;
          screen_width?: number | null;
          session_id?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          utm_term?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'analytics_events_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'analytics_events_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'analytics_events_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'analytics_events_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'analytics_events_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'analytics_events_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'analytics_events_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      appetizers: {
        Row: {
          category: Database['public']['Enums']['appetizer_category'];
          created_at: string | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          history: Json | null;
          id: string;
          image_url: string | null;
          is_baked: boolean | null;
          is_fried: boolean | null;
          is_public: boolean;
          is_raw: boolean | null;
          main_ingredients: string[];
          media: Json | null;
          name: Json;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          preparation: Json | null;
          pricing: Json | null;
          related_appetizers: string[] | null;
          sauce_or_dip: string | null;
          serving: Json;
          serving_temp: Database['public']['Enums']['serving_temperature'];
          slug: string;
          spice_level: number | null;
          status: Database['public']['Enums']['appetizer_status'];
          style: Database['public']['Enums']['appetizer_style'];
          tagline: Json | null;
          tags: string[] | null;
          updated_at: string | null;
          variations: Json | null;
        };
        Insert: {
          category: Database['public']['Enums']['appetizer_category'];
          created_at?: string | null;
          description: Json;
          dietary: Json;
          dish_type?: string | null;
          history?: Json | null;
          id: string;
          image_url?: string | null;
          is_baked?: boolean | null;
          is_fried?: boolean | null;
          is_public?: boolean;
          is_raw?: boolean | null;
          main_ingredients: string[];
          media?: Json | null;
          name: Json;
          origin: Json;
          owner_id?: string | null;
          popularity?: number | null;
          preparation?: Json | null;
          pricing?: Json | null;
          related_appetizers?: string[] | null;
          sauce_or_dip?: string | null;
          serving: Json;
          serving_temp: Database['public']['Enums']['serving_temperature'];
          slug: string;
          spice_level?: number | null;
          status?: Database['public']['Enums']['appetizer_status'];
          style: Database['public']['Enums']['appetizer_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
        };
        Update: {
          category?: Database['public']['Enums']['appetizer_category'];
          created_at?: string | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          is_baked?: boolean | null;
          is_fried?: boolean | null;
          is_public?: boolean;
          is_raw?: boolean | null;
          main_ingredients?: string[];
          media?: Json | null;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          preparation?: Json | null;
          pricing?: Json | null;
          related_appetizers?: string[] | null;
          sauce_or_dip?: string | null;
          serving?: Json;
          serving_temp?: Database['public']['Enums']['serving_temperature'];
          slug?: string;
          spice_level?: number | null;
          status?: Database['public']['Enums']['appetizer_status'];
          style?: Database['public']['Enums']['appetizer_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
        };
        Relationships: [];
      };
      argentinian: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      armenian: {
        Row: {
          allergens: string[] | null;
          armenian_name: string | null;
          armenian_script: string | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[] | null;
          is_dairy_free: boolean | null;
          is_festive: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_lenten: boolean | null;
          is_nut_free: boolean | null;
          is_pescatarian: boolean | null;
          is_public: boolean;
          is_street_food: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
          uses_tonir: boolean | null;
        };
        Insert: {
          allergens?: string[] | null;
          armenian_name?: string | null;
          armenian_script?: string | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_festive?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_lenten?: boolean | null;
          is_nut_free?: boolean | null;
          is_pescatarian?: boolean | null;
          is_public?: boolean;
          is_street_food?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
          uses_tonir?: boolean | null;
        };
        Update: {
          allergens?: string[] | null;
          armenian_name?: string | null;
          armenian_script?: string | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_festive?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_lenten?: boolean | null;
          is_nut_free?: boolean | null;
          is_pescatarian?: boolean | null;
          is_public?: boolean;
          is_street_food?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
          uses_tonir?: boolean | null;
        };
        Relationships: [];
      };
      australian: {
        Row: {
          allergens: string[];
          category: string;
          cooking_method: string | null;
          created_at: string;
          description: string | null;
          id: string;
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          popularity: number;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number;
          status: string;
          tags: string[];
          updated_at: string;
        };
        Insert: {
          allergens?: string[];
          category: string;
          cooking_method?: string | null;
          created_at?: string;
          description?: string | null;
          id: string;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          popularity?: number;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number;
          status: string;
          tags?: string[];
          updated_at?: string;
        };
        Update: {
          allergens?: string[];
          category?: string;
          cooking_method?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          popularity?: number;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number;
          status?: string;
          tags?: string[];
          updated_at?: string;
        };
        Relationships: [];
      };
      bakery: {
        Row: {
          allergens: string[] | null;
          base_type: string;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          fiber_g: number | null;
          flavor_profile: string;
          has_filling: boolean | null;
          has_frosting: boolean | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean | null;
          is_freshly_baked: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          origin_country: string | null;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          serving_size_g: number;
          serving_style: string;
          slug: string;
          spice_level: number | null;
          status: string;
          sugar_g: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          base_type: string;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          flavor_profile: string;
          has_filling?: boolean | null;
          has_frosting?: boolean | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean | null;
          is_freshly_baked?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_g?: number;
          serving_style: string;
          slug: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          base_type?: string;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          flavor_profile?: string;
          has_filling?: boolean | null;
          has_frosting?: boolean | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean | null;
          is_freshly_baked?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_g?: number;
          serving_style?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      beers: {
        Row: {
          abv: number;
          abv_max: number | null;
          abv_min: number | null;
          availability: string | null;
          available_formats: string[] | null;
          available_sizes: number[] | null;
          bitterness_level: number | null;
          body: string | null;
          brewery: Json;
          brewery_founded: number | null;
          brewery_type: string | null;
          carbonation: string | null;
          clarity: string | null;
          color: string;
          created_at: string | null;
          description: Json;
          fermentation: string | null;
          fg: number | null;
          first_brewed: string | null;
          flavor_profile: string[] | null;
          history_awards: string[] | null;
          history_named_after: Json | null;
          history_significance: Json | null;
          history_story: Json | null;
          ibu: number | null;
          ibu_max: number | null;
          ibu_min: number | null;
          id: string;
          image_url: string | null;
          ingredients_adjuncts: string[] | null;
          ingredients_hops: string[] | null;
          ingredients_malts: string[] | null;
          ingredients_special: string[] | null;
          ingredients_water: string | null;
          ingredients_yeast: string | null;
          is_gluten_free: boolean | null;
          is_non_alcoholic: boolean | null;
          is_organic: boolean | null;
          is_public: boolean;
          is_trappist: boolean | null;
          is_vegan: boolean | null;
          name: Json;
          occasion_tags: string[] | null;
          og: number | null;
          origin: Json;
          origin_city: string | null;
          origin_country: string;
          origin_country_code: string | null;
          origin_region: string | null;
          owner_id: string | null;
          pairing_avoid: Json | null;
          pairing_cheese: string[] | null;
          pairing_cuisine: string[] | null;
          pairing_food: Json | null;
          pairing_food_categories: string[] | null;
          popularity: number | null;
          price_tier: string | null;
          related_beers: string[] | null;
          season_tags: string[] | null;
          serving_glass: string;
          serving_head_retention: boolean | null;
          serving_ideal_head: string | null;
          serving_pouring_notes: Json | null;
          serving_temp_max: number | null;
          serving_temp_min: number | null;
          serving_temperature: string;
          slug: string;
          source_note: string | null;
          source_url: string | null;
          srm: number | null;
          stable_key: string;
          status: string;
          style: string;
          style_category: string;
          sweetness_level: number | null;
          tagline: Json | null;
          tags: string[] | null;
          taste_aroma: Json | null;
          taste_balance: Json | null;
          taste_description: Json | null;
          taste_finish: Json | null;
          taste_first_impression: Json | null;
          updated_at: string | null;
          version: number | null;
        };
        Insert: {
          abv: number;
          abv_max?: number | null;
          abv_min?: number | null;
          availability?: string | null;
          available_formats?: string[] | null;
          available_sizes?: number[] | null;
          bitterness_level?: number | null;
          body?: string | null;
          brewery: Json;
          brewery_founded?: number | null;
          brewery_type?: string | null;
          carbonation?: string | null;
          clarity?: string | null;
          color: string;
          created_at?: string | null;
          description: Json;
          fermentation?: string | null;
          fg?: number | null;
          first_brewed?: string | null;
          flavor_profile?: string[] | null;
          history_awards?: string[] | null;
          history_named_after?: Json | null;
          history_significance?: Json | null;
          history_story?: Json | null;
          ibu?: number | null;
          ibu_max?: number | null;
          ibu_min?: number | null;
          id?: string;
          image_url?: string | null;
          ingredients_adjuncts?: string[] | null;
          ingredients_hops?: string[] | null;
          ingredients_malts?: string[] | null;
          ingredients_special?: string[] | null;
          ingredients_water?: string | null;
          ingredients_yeast?: string | null;
          is_gluten_free?: boolean | null;
          is_non_alcoholic?: boolean | null;
          is_organic?: boolean | null;
          is_public?: boolean;
          is_trappist?: boolean | null;
          is_vegan?: boolean | null;
          name: Json;
          occasion_tags?: string[] | null;
          og?: number | null;
          origin?: Json;
          origin_city?: string | null;
          origin_country: string;
          origin_country_code?: string | null;
          origin_region?: string | null;
          owner_id?: string | null;
          pairing_avoid?: Json | null;
          pairing_cheese?: string[] | null;
          pairing_cuisine?: string[] | null;
          pairing_food?: Json | null;
          pairing_food_categories?: string[] | null;
          popularity?: number | null;
          price_tier?: string | null;
          related_beers?: string[] | null;
          season_tags?: string[] | null;
          serving_glass: string;
          serving_head_retention?: boolean | null;
          serving_ideal_head?: string | null;
          serving_pouring_notes?: Json | null;
          serving_temp_max?: number | null;
          serving_temp_min?: number | null;
          serving_temperature: string;
          slug: string;
          source_note?: string | null;
          source_url?: string | null;
          srm?: number | null;
          stable_key: string;
          status?: string;
          style: string;
          style_category: string;
          sweetness_level?: number | null;
          tagline?: Json | null;
          tags?: string[] | null;
          taste_aroma?: Json | null;
          taste_balance?: Json | null;
          taste_description?: Json | null;
          taste_finish?: Json | null;
          taste_first_impression?: Json | null;
          updated_at?: string | null;
          version?: number | null;
        };
        Update: {
          abv?: number;
          abv_max?: number | null;
          abv_min?: number | null;
          availability?: string | null;
          available_formats?: string[] | null;
          available_sizes?: number[] | null;
          bitterness_level?: number | null;
          body?: string | null;
          brewery?: Json;
          brewery_founded?: number | null;
          brewery_type?: string | null;
          carbonation?: string | null;
          clarity?: string | null;
          color?: string;
          created_at?: string | null;
          description?: Json;
          fermentation?: string | null;
          fg?: number | null;
          first_brewed?: string | null;
          flavor_profile?: string[] | null;
          history_awards?: string[] | null;
          history_named_after?: Json | null;
          history_significance?: Json | null;
          history_story?: Json | null;
          ibu?: number | null;
          ibu_max?: number | null;
          ibu_min?: number | null;
          id?: string;
          image_url?: string | null;
          ingredients_adjuncts?: string[] | null;
          ingredients_hops?: string[] | null;
          ingredients_malts?: string[] | null;
          ingredients_special?: string[] | null;
          ingredients_water?: string | null;
          ingredients_yeast?: string | null;
          is_gluten_free?: boolean | null;
          is_non_alcoholic?: boolean | null;
          is_organic?: boolean | null;
          is_public?: boolean;
          is_trappist?: boolean | null;
          is_vegan?: boolean | null;
          name?: Json;
          occasion_tags?: string[] | null;
          og?: number | null;
          origin?: Json;
          origin_city?: string | null;
          origin_country?: string;
          origin_country_code?: string | null;
          origin_region?: string | null;
          owner_id?: string | null;
          pairing_avoid?: Json | null;
          pairing_cheese?: string[] | null;
          pairing_cuisine?: string[] | null;
          pairing_food?: Json | null;
          pairing_food_categories?: string[] | null;
          popularity?: number | null;
          price_tier?: string | null;
          related_beers?: string[] | null;
          season_tags?: string[] | null;
          serving_glass?: string;
          serving_head_retention?: boolean | null;
          serving_ideal_head?: string | null;
          serving_pouring_notes?: Json | null;
          serving_temp_max?: number | null;
          serving_temp_min?: number | null;
          serving_temperature?: string;
          slug?: string;
          source_note?: string | null;
          source_url?: string | null;
          srm?: number | null;
          stable_key?: string;
          status?: string;
          style?: string;
          style_category?: string;
          sweetness_level?: number | null;
          tagline?: Json | null;
          tags?: string[] | null;
          taste_aroma?: Json | null;
          taste_balance?: Json | null;
          taste_description?: Json | null;
          taste_finish?: Json | null;
          taste_first_impression?: Json | null;
          updated_at?: string | null;
          version?: number | null;
        };
        Relationships: [];
      };
      belgian: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          intolerances: string[] | null;
          local_name: string | null;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          price_default: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          intolerances?: string[] | null;
          local_name?: string | null;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          intolerances?: string[] | null;
          local_name?: string | null;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      blocked_slots: {
        Row: {
          block_date: string;
          block_type: string | null;
          created_at: string;
          created_by: string | null;
          end_time: string | null;
          id: string;
          location_id: string;
          reason: string;
          section_id: string | null;
          start_time: string | null;
          table_id: string | null;
        };
        Insert: {
          block_date: string;
          block_type?: string | null;
          created_at?: string;
          created_by?: string | null;
          end_time?: string | null;
          id?: string;
          location_id: string;
          reason: string;
          section_id?: string | null;
          start_time?: string | null;
          table_id?: string | null;
        };
        Update: {
          block_date?: string;
          block_type?: string | null;
          created_at?: string;
          created_by?: string | null;
          end_time?: string | null;
          id?: string;
          location_id?: string;
          reason?: string;
          section_id?: string | null;
          start_time?: string | null;
          table_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'blocked_slots_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'blocked_slots_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'blocked_slots_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'blocked_slots_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'blocked_slots_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'blocked_slots_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'blocked_slots_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'blocked_slots_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'blocked_slots_section_id_fkey';
            columns: ['section_id'];
            isOneToOne: false;
            referencedRelation: 'location_sections';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'blocked_slots_table_id_fkey';
            columns: ['table_id'];
            isOneToOne: false;
            referencedRelation: 'location_tables';
            referencedColumns: ['id'];
          },
        ];
      };
      booking_performance_history: {
        Row: {
          avg_group_spend: number | null;
          avg_walkin_spend: number | null;
          created_at: string | null;
          date: string;
          day_of_week: number | null;
          group_covers: number | null;
          group_revenue: number | null;
          id: string;
          is_holiday: boolean | null;
          merchant_id: string;
          occupancy_percent: number | null;
          slot: string;
          special_events: string[] | null;
          total_capacity: number | null;
          total_covers: number | null;
          total_revenue: number | null;
          walkin_covers: number | null;
          walkin_revenue: number | null;
          weather_conditions: string | null;
        };
        Insert: {
          avg_group_spend?: number | null;
          avg_walkin_spend?: number | null;
          created_at?: string | null;
          date: string;
          day_of_week?: number | null;
          group_covers?: number | null;
          group_revenue?: number | null;
          id?: string;
          is_holiday?: boolean | null;
          merchant_id: string;
          occupancy_percent?: number | null;
          slot: string;
          special_events?: string[] | null;
          total_capacity?: number | null;
          total_covers?: number | null;
          total_revenue?: number | null;
          walkin_covers?: number | null;
          walkin_revenue?: number | null;
          weather_conditions?: string | null;
        };
        Update: {
          avg_group_spend?: number | null;
          avg_walkin_spend?: number | null;
          created_at?: string | null;
          date?: string;
          day_of_week?: number | null;
          group_covers?: number | null;
          group_revenue?: number | null;
          id?: string;
          is_holiday?: boolean | null;
          merchant_id?: string;
          occupancy_percent?: number | null;
          slot?: string;
          special_events?: string[] | null;
          total_capacity?: number | null;
          total_covers?: number | null;
          total_revenue?: number | null;
          walkin_covers?: number | null;
          walkin_revenue?: number | null;
          weather_conditions?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'booking_performance_history_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      brands: {
        Row: {
          business_type: string;
          created_at: string;
          custom_domain: string | null;
          default_menu_id: string | null;
          description: string | null;
          domain_verified: boolean | null;
          domain_verified_at: string | null;
          id: string;
          is_active: boolean;
          logo_url: string | null;
          name: string;
          organization_id: string;
          primary_color: string | null;
          secondary_color: string | null;
          slug: string;
          updated_at: string;
        };
        Insert: {
          business_type?: string;
          created_at?: string;
          custom_domain?: string | null;
          default_menu_id?: string | null;
          description?: string | null;
          domain_verified?: boolean | null;
          domain_verified_at?: string | null;
          id?: string;
          is_active?: boolean;
          logo_url?: string | null;
          name: string;
          organization_id: string;
          primary_color?: string | null;
          secondary_color?: string | null;
          slug: string;
          updated_at?: string;
        };
        Update: {
          business_type?: string;
          created_at?: string;
          custom_domain?: string | null;
          default_menu_id?: string | null;
          description?: string | null;
          domain_verified?: boolean | null;
          domain_verified_at?: string | null;
          id?: string;
          is_active?: boolean;
          logo_url?: string | null;
          name?: string;
          organization_id?: string;
          primary_color?: string | null;
          secondary_color?: string | null;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'brands_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      brazilian: {
        Row: {
          allergens: Json | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dish_type: string | null;
          fat_g: number | null;
          id: string;
          image_url: string | null;
          is_comfort_food: boolean | null;
          is_dairy_free: boolean | null;
          is_festive: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_street_food: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          portuguese_name: string | null;
          protein_g: number | null;
          protein_type: string | null;
          region: string | null;
          served_hot: boolean | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: Json | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: Json | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dish_type?: string | null;
          fat_g?: number | null;
          id: string;
          image_url?: string | null;
          is_comfort_food?: boolean | null;
          is_dairy_free?: boolean | null;
          is_festive?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_street_food?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          portuguese_name?: string | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string | null;
          served_hot?: boolean | null;
          slug: string;
          spice_level?: number | null;
          status?: string;
          tags?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: Json | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dish_type?: string | null;
          fat_g?: number | null;
          id?: string;
          image_url?: string | null;
          is_comfort_food?: boolean | null;
          is_dairy_free?: boolean | null;
          is_festive?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_street_food?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          portuguese_name?: string | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string | null;
          served_hot?: boolean | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      breakfast: {
        Row: {
          allergens: Json;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          created_at: string;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          id: string;
          image_url: string | null;
          ingredient_ids: Json;
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_kosher: boolean;
          is_nut_free: boolean;
          is_public: boolean;
          is_sweet: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          meal_time: string;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number;
          prep_time_minutes: number | null;
          protein_g: number | null;
          serving_size_g: number | null;
          slug: string;
          spice_level: number;
          status: string;
          tags: Json;
          updated_at: string;
        };
        Insert: {
          allergens?: Json;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          created_at?: string;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: Json;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_sweet?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          meal_time: string;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number;
          prep_time_minutes?: number | null;
          protein_g?: number | null;
          serving_size_g?: number | null;
          slug: string;
          spice_level?: number;
          status?: string;
          tags?: Json;
          updated_at?: string;
        };
        Update: {
          allergens?: Json;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          created_at?: string;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: Json;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_sweet?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          meal_time?: string;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number;
          prep_time_minutes?: number | null;
          protein_g?: number | null;
          serving_size_g?: number | null;
          slug?: string;
          spice_level?: number;
          status?: string;
          tags?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      british: {
        Row: {
          allergens: Json | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string;
          dietary: Json | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[] | null;
          intolerances: Json | null;
          is_available: boolean | null;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          local_name: string | null;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          prep_time_min: number | null;
          price_default: number | null;
          protein_type: string | null;
          region: string;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: Json | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description: string;
          dietary?: Json | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          intolerances?: Json | null;
          is_available?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          local_name?: string | null;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region: string;
          slug: string;
          spice_level?: number | null;
          status: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: Json | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string;
          dietary?: Json | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          intolerances?: Json | null;
          is_available?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          local_name?: string | null;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      burgers: {
        Row: {
          bun_is_toasted: boolean | null;
          bun_type: Database['public']['Enums']['bun_type'];
          cheeses: string[] | null;
          created_at: string | null;
          customization: Json | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          history: Json | null;
          id: string;
          image_url: string | null;
          is_public: boolean;
          is_spicy: boolean | null;
          media: Json | null;
          name: Json;
          origin: Json;
          owner_id: string | null;
          patty_count: number | null;
          patty_recommended_cook: Database['public']['Enums']['cook_level'] | null;
          patty_type: Database['public']['Enums']['patty_type'];
          patty_weight_g: number | null;
          popularity: number | null;
          pricing: Json | null;
          related_burgers: string[] | null;
          sauces: string[] | null;
          serving: Json;
          slug: string;
          spice_level: number | null;
          status: Database['public']['Enums']['burger_status'];
          style: Database['public']['Enums']['burger_style'];
          tagline: Json | null;
          tags: string[] | null;
          toppings: string[] | null;
          updated_at: string | null;
          variations: Json | null;
        };
        Insert: {
          bun_is_toasted?: boolean | null;
          bun_type?: Database['public']['Enums']['bun_type'];
          cheeses?: string[] | null;
          created_at?: string | null;
          customization?: Json | null;
          description: Json;
          dietary?: Json;
          dish_type?: string | null;
          history?: Json | null;
          id: string;
          image_url?: string | null;
          is_public?: boolean;
          is_spicy?: boolean | null;
          media?: Json | null;
          name: Json;
          origin?: Json;
          owner_id?: string | null;
          patty_count?: number | null;
          patty_recommended_cook?: Database['public']['Enums']['cook_level'] | null;
          patty_type?: Database['public']['Enums']['patty_type'];
          patty_weight_g?: number | null;
          popularity?: number | null;
          pricing?: Json | null;
          related_burgers?: string[] | null;
          sauces?: string[] | null;
          serving?: Json;
          slug: string;
          spice_level?: number | null;
          status?: Database['public']['Enums']['burger_status'];
          style?: Database['public']['Enums']['burger_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          toppings?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
        };
        Update: {
          bun_is_toasted?: boolean | null;
          bun_type?: Database['public']['Enums']['bun_type'];
          cheeses?: string[] | null;
          created_at?: string | null;
          customization?: Json | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          is_public?: boolean;
          is_spicy?: boolean | null;
          media?: Json | null;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          patty_count?: number | null;
          patty_recommended_cook?: Database['public']['Enums']['cook_level'] | null;
          patty_type?: Database['public']['Enums']['patty_type'];
          patty_weight_g?: number | null;
          popularity?: number | null;
          pricing?: Json | null;
          related_burgers?: string[] | null;
          sauces?: string[] | null;
          serving?: Json;
          slug?: string;
          spice_level?: number | null;
          status?: Database['public']['Enums']['burger_status'];
          style?: Database['public']['Enums']['burger_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          toppings?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
        };
        Relationships: [];
      };
      cajun: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          id: string;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          slug: string;
          spice_level?: number | null;
          status: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      caribbean: {
        Row: {
          allergens: string[] | null;
          calories_per_serving: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[] | null;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_spicy: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          local_name: string | null;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          protein_type: string | null;
          serving_size_g: number | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_spicy?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          local_name?: string | null;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_type?: string | null;
          serving_size_g?: number | null;
          slug: string;
          spice_level?: number | null;
          status: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_spicy?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          local_name?: string | null;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_type?: string | null;
          serving_size_g?: number | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      category_modifier_groups: {
        Row: {
          category_id: string;
          created_at: string | null;
          display_order: number | null;
          id: string;
          is_active: boolean;
          merchant_id: string;
          modifier_group_id: string;
        };
        Insert: {
          category_id: string;
          created_at?: string | null;
          display_order?: number | null;
          id?: string;
          is_active?: boolean;
          merchant_id: string;
          modifier_group_id: string;
        };
        Update: {
          category_id?: string;
          created_at?: string | null;
          display_order?: number | null;
          id?: string;
          is_active?: boolean;
          merchant_id?: string;
          modifier_group_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'category_modifier_groups_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'menu_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'category_modifier_groups_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'category_modifier_groups_modifier_group_id_fkey';
            columns: ['modifier_group_id'];
            isOneToOne: false;
            referencedRelation: 'modifier_groups';
            referencedColumns: ['id'];
          },
        ];
      };
      category_translations: {
        Row: {
          category_id: string;
          created_at: string | null;
          description: string | null;
          id: string;
          is_machine_translated: boolean | null;
          language_code: string;
          name: string;
          translated_by: string | null;
          updated_at: string | null;
          verified_at: string | null;
          verified_by: string | null;
        };
        Insert: {
          category_id: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_machine_translated?: boolean | null;
          language_code: string;
          name: string;
          translated_by?: string | null;
          updated_at?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Update: {
          category_id?: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_machine_translated?: boolean | null;
          language_code?: string;
          name?: string;
          translated_by?: string | null;
          updated_at?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'category_translations_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'menu_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'category_translations_language_code_fkey';
            columns: ['language_code'];
            isOneToOne: false;
            referencedRelation: 'languages';
            referencedColumns: ['code'];
          },
        ];
      };
      challenge_attempts: {
        Row: {
          attempt_date: string;
          challenge_id: string;
          completion_time_minutes: number | null;
          created_at: string | null;
          id: string;
          is_current_record: boolean | null;
          merchant_id: string;
          participant_id: string | null;
          participant_name: string;
          photo_url: string | null;
          record_bonus_awarded: boolean | null;
          recorded_by: string | null;
          succeeded: boolean;
          team_members: Json | null;
          video_url: string | null;
        };
        Insert: {
          attempt_date?: string;
          challenge_id: string;
          completion_time_minutes?: number | null;
          created_at?: string | null;
          id?: string;
          is_current_record?: boolean | null;
          merchant_id: string;
          participant_id?: string | null;
          participant_name: string;
          photo_url?: string | null;
          record_bonus_awarded?: boolean | null;
          recorded_by?: string | null;
          succeeded: boolean;
          team_members?: Json | null;
          video_url?: string | null;
        };
        Update: {
          attempt_date?: string;
          challenge_id?: string;
          completion_time_minutes?: number | null;
          created_at?: string | null;
          id?: string;
          is_current_record?: boolean | null;
          merchant_id?: string;
          participant_id?: string | null;
          participant_name?: string;
          photo_url?: string | null;
          record_bonus_awarded?: boolean | null;
          recorded_by?: string | null;
          succeeded?: boolean;
          team_members?: Json | null;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'challenge_attempts_challenge_id_fkey';
            columns: ['challenge_id'];
            isOneToOne: false;
            referencedRelation: 'food_challenges';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'challenge_attempts_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'challenge_attempts_participant_id_fkey';
            columns: ['participant_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'challenge_attempts_participant_id_fkey';
            columns: ['participant_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'challenge_attempts_participant_id_fkey';
            columns: ['participant_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'challenge_attempts_participant_id_fkey';
            columns: ['participant_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'challenge_attempts_participant_id_fkey';
            columns: ['participant_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'challenge_attempts_participant_id_fkey';
            columns: ['participant_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'challenge_attempts_participant_id_fkey';
            columns: ['participant_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'challenge_attempts_recorded_by_fkey';
            columns: ['recorded_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'challenge_attempts_recorded_by_fkey';
            columns: ['recorded_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'challenge_attempts_recorded_by_fkey';
            columns: ['recorded_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'challenge_attempts_recorded_by_fkey';
            columns: ['recorded_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'challenge_attempts_recorded_by_fkey';
            columns: ['recorded_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'challenge_attempts_recorded_by_fkey';
            columns: ['recorded_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'challenge_attempts_recorded_by_fkey';
            columns: ['recorded_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      chilean: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      chinese: {
        Row: {
          allergens: string[];
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          chinese_name: string | null;
          chinese_script: string | null;
          cooking_method: string;
          created_at: string;
          cuisine_style: string;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean;
          is_dim_sum: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_nut_free: boolean;
          is_pescatarian: boolean;
          is_public: boolean;
          is_street_food: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          owner_id: string | null;
          popularity: number;
          protein_g: number | null;
          protein_type: string;
          region: string;
          slug: string;
          spice_level: number;
          status: string;
          tags: string[];
          updated_at: string;
        };
        Insert: {
          allergens?: string[];
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          chinese_name?: string | null;
          chinese_script?: string | null;
          cooking_method: string;
          created_at?: string;
          cuisine_style: string;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_dim_sum?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_nut_free?: boolean;
          is_pescatarian?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          protein_type: string;
          region: string;
          slug: string;
          spice_level?: number;
          status?: string;
          tags?: string[];
          updated_at?: string;
        };
        Update: {
          allergens?: string[];
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          chinese_name?: string | null;
          chinese_script?: string | null;
          cooking_method?: string;
          created_at?: string;
          cuisine_style?: string;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_dim_sum?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_nut_free?: boolean;
          is_pescatarian?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          protein_type?: string;
          region?: string;
          slug?: string;
          spice_level?: number;
          status?: string;
          tags?: string[];
          updated_at?: string;
        };
        Relationships: [];
      };
      cocktails: {
        Row: {
          abv_estimate: number | null;
          base_spirits: string[] | null;
          calories_estimate: number | null;
          computed_allergens: string[] | null;
          computed_diets: string[] | null;
          computed_intolerances: string[] | null;
          computed_spice_level: number | null;
          created_at: string | null;
          description: Json;
          diet_tags: string[] | null;
          difficulty: string | null;
          flavor_profile: string[] | null;
          garnish: Json;
          glass: string;
          history: Json | null;
          iba_category: string | null;
          ice: string;
          id: string;
          image_url: string | null;
          ingredients: Json;
          instructions: Json;
          is_mocktail: boolean | null;
          is_public: boolean;
          is_signature: boolean | null;
          method: string;
          name: Json;
          notes_for_staff: string | null;
          occasion_tags: string[] | null;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          prep_time_seconds: number | null;
          price_tier: string | null;
          recommendations: Json | null;
          season_tags: string[] | null;
          serving_style: string;
          slug: string;
          source_note: string | null;
          source_url: string | null;
          stable_key: string;
          status: string;
          tags: string[] | null;
          taste: Json | null;
          updated_at: string | null;
          variants: string[] | null;
          version: number | null;
        };
        Insert: {
          abv_estimate?: number | null;
          base_spirits?: string[] | null;
          calories_estimate?: number | null;
          computed_allergens?: string[] | null;
          computed_diets?: string[] | null;
          computed_intolerances?: string[] | null;
          computed_spice_level?: number | null;
          created_at?: string | null;
          description: Json;
          diet_tags?: string[] | null;
          difficulty?: string | null;
          flavor_profile?: string[] | null;
          garnish: Json;
          glass: string;
          history?: Json | null;
          iba_category?: string | null;
          ice: string;
          id: string;
          image_url?: string | null;
          ingredients: Json;
          instructions: Json;
          is_mocktail?: boolean | null;
          is_public?: boolean;
          is_signature?: boolean | null;
          method: string;
          name: Json;
          notes_for_staff?: string | null;
          occasion_tags?: string[] | null;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          prep_time_seconds?: number | null;
          price_tier?: string | null;
          recommendations?: Json | null;
          season_tags?: string[] | null;
          serving_style: string;
          slug: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key: string;
          status: string;
          tags?: string[] | null;
          taste?: Json | null;
          updated_at?: string | null;
          variants?: string[] | null;
          version?: number | null;
        };
        Update: {
          abv_estimate?: number | null;
          base_spirits?: string[] | null;
          calories_estimate?: number | null;
          computed_allergens?: string[] | null;
          computed_diets?: string[] | null;
          computed_intolerances?: string[] | null;
          computed_spice_level?: number | null;
          created_at?: string | null;
          description?: Json;
          diet_tags?: string[] | null;
          difficulty?: string | null;
          flavor_profile?: string[] | null;
          garnish?: Json;
          glass?: string;
          history?: Json | null;
          iba_category?: string | null;
          ice?: string;
          id?: string;
          image_url?: string | null;
          ingredients?: Json;
          instructions?: Json;
          is_mocktail?: boolean | null;
          is_public?: boolean;
          is_signature?: boolean | null;
          method?: string;
          name?: Json;
          notes_for_staff?: string | null;
          occasion_tags?: string[] | null;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          prep_time_seconds?: number | null;
          price_tier?: string | null;
          recommendations?: Json | null;
          season_tags?: string[] | null;
          serving_style?: string;
          slug?: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string;
          status?: string;
          tags?: string[] | null;
          taste?: Json | null;
          updated_at?: string | null;
          variants?: string[] | null;
          version?: number | null;
        };
        Relationships: [];
      };
      coffee: {
        Row: {
          allergens: string[] | null;
          available_milks: Database['public']['Enums']['milk_type'][] | null;
          available_syrups: string[] | null;
          caffeine_level: Database['public']['Enums']['caffeine_level'];
          caffeine_mg: number | null;
          calories_per_serving: number | null;
          can_add_espresso_shot: boolean | null;
          can_adjust_sweetness: boolean | null;
          can_make_decaf: boolean | null;
          category: Database['public']['Enums']['coffee_category'];
          chain_style_decoration: string | null;
          created_at: string | null;
          default_milk: Database['public']['Enums']['milk_type'] | null;
          description: string;
          fat_g: number | null;
          glass_type: string | null;
          id: string;
          image_url: string | null;
          ingredient_cost_usd: number | null;
          ingredient_ids: string[] | null;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_public: boolean;
          is_seasonal: boolean | null;
          is_signature: boolean | null;
          is_sugar_free: boolean | null;
          is_vegan: boolean | null;
          main_ingredients: string[];
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          premium_style_decoration: string | null;
          prep_time_seconds: number | null;
          preparation_method: string | null;
          preparation_notes: string | null;
          profit_margin_percent: number | null;
          protein_g: number | null;
          quantity_description: string | null;
          selling_price_usd: number | null;
          skill_level: number | null;
          slug: string;
          style: Database['public']['Enums']['coffee_style'];
          sugar_g: number | null;
          sweetness: Database['public']['Enums']['coffee_sweetness'];
          tags: string[] | null;
          updated_at: string | null;
          volume_ml: number | null;
        };
        Insert: {
          allergens?: string[] | null;
          available_milks?: Database['public']['Enums']['milk_type'][] | null;
          available_syrups?: string[] | null;
          caffeine_level?: Database['public']['Enums']['caffeine_level'];
          caffeine_mg?: number | null;
          calories_per_serving?: number | null;
          can_add_espresso_shot?: boolean | null;
          can_adjust_sweetness?: boolean | null;
          can_make_decaf?: boolean | null;
          category: Database['public']['Enums']['coffee_category'];
          chain_style_decoration?: string | null;
          created_at?: string | null;
          default_milk?: Database['public']['Enums']['milk_type'] | null;
          description: string;
          fat_g?: number | null;
          glass_type?: string | null;
          id: string;
          image_url?: string | null;
          ingredient_cost_usd?: number | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_public?: boolean;
          is_seasonal?: boolean | null;
          is_signature?: boolean | null;
          is_sugar_free?: boolean | null;
          is_vegan?: boolean | null;
          main_ingredients?: string[];
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          premium_style_decoration?: string | null;
          prep_time_seconds?: number | null;
          preparation_method?: string | null;
          preparation_notes?: string | null;
          profit_margin_percent?: number | null;
          protein_g?: number | null;
          quantity_description?: string | null;
          selling_price_usd?: number | null;
          skill_level?: number | null;
          slug: string;
          style: Database['public']['Enums']['coffee_style'];
          sugar_g?: number | null;
          sweetness?: Database['public']['Enums']['coffee_sweetness'];
          tags?: string[] | null;
          updated_at?: string | null;
          volume_ml?: number | null;
        };
        Update: {
          allergens?: string[] | null;
          available_milks?: Database['public']['Enums']['milk_type'][] | null;
          available_syrups?: string[] | null;
          caffeine_level?: Database['public']['Enums']['caffeine_level'];
          caffeine_mg?: number | null;
          calories_per_serving?: number | null;
          can_add_espresso_shot?: boolean | null;
          can_adjust_sweetness?: boolean | null;
          can_make_decaf?: boolean | null;
          category?: Database['public']['Enums']['coffee_category'];
          chain_style_decoration?: string | null;
          created_at?: string | null;
          default_milk?: Database['public']['Enums']['milk_type'] | null;
          description?: string;
          fat_g?: number | null;
          glass_type?: string | null;
          id?: string;
          image_url?: string | null;
          ingredient_cost_usd?: number | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_public?: boolean;
          is_seasonal?: boolean | null;
          is_signature?: boolean | null;
          is_sugar_free?: boolean | null;
          is_vegan?: boolean | null;
          main_ingredients?: string[];
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          premium_style_decoration?: string | null;
          prep_time_seconds?: number | null;
          preparation_method?: string | null;
          preparation_notes?: string | null;
          profit_margin_percent?: number | null;
          protein_g?: number | null;
          quantity_description?: string | null;
          selling_price_usd?: number | null;
          skill_level?: number | null;
          slug?: string;
          style?: Database['public']['Enums']['coffee_style'];
          sugar_g?: number | null;
          sweetness?: Database['public']['Enums']['coffee_sweetness'];
          tags?: string[] | null;
          updated_at?: string | null;
          volume_ml?: number | null;
        };
        Relationships: [];
      };
      colombian: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      convention_redemptions: {
        Row: {
          convention_id: string;
          discount_amount: number | null;
          final_amount: number | null;
          id: string;
          items_summary: string | null;
          merchant_id: string;
          order_id: string | null;
          original_amount: number | null;
          party_size: number | null;
          pos_terminal_id: string | null;
          redeemed_at: string | null;
          verification_code: string | null;
          verification_method: string;
          verified_by_staff: string | null;
          voucher_id: string | null;
        };
        Insert: {
          convention_id: string;
          discount_amount?: number | null;
          final_amount?: number | null;
          id?: string;
          items_summary?: string | null;
          merchant_id: string;
          order_id?: string | null;
          original_amount?: number | null;
          party_size?: number | null;
          pos_terminal_id?: string | null;
          redeemed_at?: string | null;
          verification_code?: string | null;
          verification_method: string;
          verified_by_staff?: string | null;
          voucher_id?: string | null;
        };
        Update: {
          convention_id?: string;
          discount_amount?: number | null;
          final_amount?: number | null;
          id?: string;
          items_summary?: string | null;
          merchant_id?: string;
          order_id?: string | null;
          original_amount?: number | null;
          party_size?: number | null;
          pos_terminal_id?: string | null;
          redeemed_at?: string | null;
          verification_code?: string | null;
          verification_method?: string;
          verified_by_staff?: string | null;
          voucher_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'convention_redemptions_convention_id_fkey';
            columns: ['convention_id'];
            isOneToOne: false;
            referencedRelation: 'partner_conventions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'convention_redemptions_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'convention_redemptions_voucher_id_fkey';
            columns: ['voucher_id'];
            isOneToOne: false;
            referencedRelation: 'convention_vouchers';
            referencedColumns: ['id'];
          },
        ];
      };
      convention_vouchers: {
        Row: {
          badge_number: string | null;
          convention_id: string;
          created_at: string | null;
          created_by: string | null;
          deactivated_at: string | null;
          deactivated_reason: string | null;
          id: string;
          is_active: boolean | null;
          last_used_at: string | null;
          max_uses: number | null;
          merchant_id: string;
          qr_data: string | null;
          short_url: string | null;
          times_used: number | null;
          total_savings: number | null;
          user_email: string | null;
          user_id: string | null;
          user_identifier: string | null;
          user_name: string | null;
          user_phone: string | null;
          valid_from: string | null;
          valid_until: string | null;
          voucher_code: string;
        };
        Insert: {
          badge_number?: string | null;
          convention_id: string;
          created_at?: string | null;
          created_by?: string | null;
          deactivated_at?: string | null;
          deactivated_reason?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_used_at?: string | null;
          max_uses?: number | null;
          merchant_id: string;
          qr_data?: string | null;
          short_url?: string | null;
          times_used?: number | null;
          total_savings?: number | null;
          user_email?: string | null;
          user_id?: string | null;
          user_identifier?: string | null;
          user_name?: string | null;
          user_phone?: string | null;
          valid_from?: string | null;
          valid_until?: string | null;
          voucher_code: string;
        };
        Update: {
          badge_number?: string | null;
          convention_id?: string;
          created_at?: string | null;
          created_by?: string | null;
          deactivated_at?: string | null;
          deactivated_reason?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_used_at?: string | null;
          max_uses?: number | null;
          merchant_id?: string;
          qr_data?: string | null;
          short_url?: string | null;
          times_used?: number | null;
          total_savings?: number | null;
          user_email?: string | null;
          user_id?: string | null;
          user_identifier?: string | null;
          user_name?: string | null;
          user_phone?: string | null;
          valid_from?: string | null;
          valid_until?: string | null;
          voucher_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'convention_vouchers_convention_id_fkey';
            columns: ['convention_id'];
            isOneToOne: false;
            referencedRelation: 'partner_conventions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'convention_vouchers_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'convention_vouchers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'convention_vouchers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'convention_vouchers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'convention_vouchers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'convention_vouchers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'convention_vouchers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'convention_vouchers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      countries: {
        Row: {
          code: string;
          common_languages: string[] | null;
          continent: string | null;
          created_at: string | null;
          currency_code: string;
          currency_name: string;
          currency_symbol: string;
          is_active: boolean;
          is_supported: boolean;
          name_en: string;
          name_native: string | null;
          phone_code: string | null;
          primary_language: string;
          timezone: string | null;
          updated_at: string | null;
        };
        Insert: {
          code: string;
          common_languages?: string[] | null;
          continent?: string | null;
          created_at?: string | null;
          currency_code: string;
          currency_name: string;
          currency_symbol: string;
          is_active?: boolean;
          is_supported?: boolean;
          name_en: string;
          name_native?: string | null;
          phone_code?: string | null;
          primary_language: string;
          timezone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          code?: string;
          common_languages?: string[] | null;
          continent?: string | null;
          created_at?: string | null;
          currency_code?: string;
          currency_name?: string;
          currency_symbol?: string;
          is_active?: boolean;
          is_supported?: boolean;
          name_en?: string;
          name_native?: string | null;
          phone_code?: string | null;
          primary_language?: string;
          timezone?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'countries_primary_language_fkey';
            columns: ['primary_language'];
            isOneToOne: false;
            referencedRelation: 'languages';
            referencedColumns: ['code'];
          },
        ];
      };
      crypto_order_payments: {
        Row: {
          block_explorer_url: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string;
          crypto_amount: number;
          crypto_amount_display: string | null;
          cryptocurrency: string;
          customer_session_id: string | null;
          customer_wallet_address: string | null;
          exchange_rate: number | null;
          exchange_rate_source: string | null;
          exchange_rate_timestamp: string | null;
          expires_at: string;
          fiat_amount: number;
          fiat_currency: string;
          id: string;
          merchant_id: string;
          network: string;
          order_id: string | null;
          staff_notes: string | null;
          status: string;
          submitted_at: string | null;
          tx_hash: string | null;
          updated_at: string;
          wallet_address: string;
        };
        Insert: {
          block_explorer_url?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string;
          crypto_amount: number;
          crypto_amount_display?: string | null;
          cryptocurrency: string;
          customer_session_id?: string | null;
          customer_wallet_address?: string | null;
          exchange_rate?: number | null;
          exchange_rate_source?: string | null;
          exchange_rate_timestamp?: string | null;
          expires_at: string;
          fiat_amount: number;
          fiat_currency?: string;
          id?: string;
          merchant_id: string;
          network: string;
          order_id?: string | null;
          staff_notes?: string | null;
          status?: string;
          submitted_at?: string | null;
          tx_hash?: string | null;
          updated_at?: string;
          wallet_address: string;
        };
        Update: {
          block_explorer_url?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string;
          crypto_amount?: number;
          crypto_amount_display?: string | null;
          cryptocurrency?: string;
          customer_session_id?: string | null;
          customer_wallet_address?: string | null;
          exchange_rate?: number | null;
          exchange_rate_source?: string | null;
          exchange_rate_timestamp?: string | null;
          expires_at?: string;
          fiat_amount?: number;
          fiat_currency?: string;
          id?: string;
          merchant_id?: string;
          network?: string;
          order_id?: string | null;
          staff_notes?: string | null;
          status?: string;
          submitted_at?: string | null;
          tx_hash?: string | null;
          updated_at?: string;
          wallet_address?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'crypto_order_payments_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'crypto_order_payments_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
        ];
      };
      cuban: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          id: string;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      customer_feedback: {
        Row: {
          account_id: string | null;
          app_version: string | null;
          attachments: Json | null;
          category: string;
          created_at: string;
          device_type: string | null;
          id: string;
          is_featured: boolean | null;
          is_public: boolean | null;
          merchant_id: string;
          message: string | null;
          order_id: string | null;
          rating: number | null;
          replied_at: string | null;
          replied_by_account_id: string | null;
          resolved_at: string | null;
          session_id: string | null;
          staff_reply: string | null;
          status: string;
          title: string | null;
          type: string;
          updated_at: string;
        };
        Insert: {
          account_id?: string | null;
          app_version?: string | null;
          attachments?: Json | null;
          category?: string;
          created_at?: string;
          device_type?: string | null;
          id?: string;
          is_featured?: boolean | null;
          is_public?: boolean | null;
          merchant_id: string;
          message?: string | null;
          order_id?: string | null;
          rating?: number | null;
          replied_at?: string | null;
          replied_by_account_id?: string | null;
          resolved_at?: string | null;
          session_id?: string | null;
          staff_reply?: string | null;
          status?: string;
          title?: string | null;
          type: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string | null;
          app_version?: string | null;
          attachments?: Json | null;
          category?: string;
          created_at?: string;
          device_type?: string | null;
          id?: string;
          is_featured?: boolean | null;
          is_public?: boolean | null;
          merchant_id?: string;
          message?: string | null;
          order_id?: string | null;
          rating?: number | null;
          replied_at?: string | null;
          replied_by_account_id?: string | null;
          resolved_at?: string | null;
          session_id?: string | null;
          staff_reply?: string | null;
          status?: string;
          title?: string | null;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'customer_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'customer_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'customer_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'customer_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'customer_feedback_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'customer_feedback_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_feedback_replied_by_account_id_fkey';
            columns: ['replied_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_feedback_replied_by_account_id_fkey';
            columns: ['replied_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_feedback_replied_by_account_id_fkey';
            columns: ['replied_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'customer_feedback_replied_by_account_id_fkey';
            columns: ['replied_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'customer_feedback_replied_by_account_id_fkey';
            columns: ['replied_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'customer_feedback_replied_by_account_id_fkey';
            columns: ['replied_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'customer_feedback_replied_by_account_id_fkey';
            columns: ['replied_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      desserts: {
        Row: {
          category: Database['public']['Enums']['dessert_category'];
          created_at: string | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          history: Json | null;
          id: string;
          image_url: string | null;
          is_chocolate: boolean | null;
          is_creamy: boolean | null;
          is_fruit_based: boolean | null;
          is_public: boolean;
          main_ingredients: string[];
          media: Json | null;
          name: Json;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          preparation: Json | null;
          pricing: Json | null;
          related_desserts: string[] | null;
          serving: Json;
          serving_temp: Database['public']['Enums']['dessert_serving_temp'];
          slug: string;
          status: Database['public']['Enums']['dessert_status'];
          style: Database['public']['Enums']['dessert_style'];
          sweetness_level: number | null;
          tagline: Json | null;
          tags: string[] | null;
          topping: string | null;
          updated_at: string | null;
          variations: Json | null;
        };
        Insert: {
          category: Database['public']['Enums']['dessert_category'];
          created_at?: string | null;
          description: Json;
          dietary: Json;
          dish_type?: string | null;
          history?: Json | null;
          id: string;
          image_url?: string | null;
          is_chocolate?: boolean | null;
          is_creamy?: boolean | null;
          is_fruit_based?: boolean | null;
          is_public?: boolean;
          main_ingredients: string[];
          media?: Json | null;
          name: Json;
          origin: Json;
          owner_id?: string | null;
          popularity?: number | null;
          preparation?: Json | null;
          pricing?: Json | null;
          related_desserts?: string[] | null;
          serving: Json;
          serving_temp: Database['public']['Enums']['dessert_serving_temp'];
          slug: string;
          status?: Database['public']['Enums']['dessert_status'];
          style: Database['public']['Enums']['dessert_style'];
          sweetness_level?: number | null;
          tagline?: Json | null;
          tags?: string[] | null;
          topping?: string | null;
          updated_at?: string | null;
          variations?: Json | null;
        };
        Update: {
          category?: Database['public']['Enums']['dessert_category'];
          created_at?: string | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          is_chocolate?: boolean | null;
          is_creamy?: boolean | null;
          is_fruit_based?: boolean | null;
          is_public?: boolean;
          main_ingredients?: string[];
          media?: Json | null;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          preparation?: Json | null;
          pricing?: Json | null;
          related_desserts?: string[] | null;
          serving?: Json;
          serving_temp?: Database['public']['Enums']['dessert_serving_temp'];
          slug?: string;
          status?: Database['public']['Enums']['dessert_status'];
          style?: Database['public']['Enums']['dessert_style'];
          sweetness_level?: number | null;
          tagline?: Json | null;
          tags?: string[] | null;
          topping?: string | null;
          updated_at?: string | null;
          variations?: Json | null;
        };
        Relationships: [];
      };
      domain_blacklist: {
        Row: {
          created_at: string;
          id: string;
          pattern: string;
          reason: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          pattern: string;
          reason?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          pattern?: string;
          reason?: string | null;
        };
        Relationships: [];
      };
      domain_verifications: {
        Row: {
          created_at: string;
          domain: string;
          entity_id: string;
          entity_type: string;
          failure_reason: string | null;
          id: string;
          last_check_at: string | null;
          ssl_status: string | null;
          status: string;
          updated_at: string;
          vercel_domain_id: string | null;
          vercel_project_id: string | null;
          verification_method: string;
          verification_token: string;
          verified_at: string | null;
        };
        Insert: {
          created_at?: string;
          domain: string;
          entity_id: string;
          entity_type: string;
          failure_reason?: string | null;
          id?: string;
          last_check_at?: string | null;
          ssl_status?: string | null;
          status?: string;
          updated_at?: string;
          vercel_domain_id?: string | null;
          vercel_project_id?: string | null;
          verification_method?: string;
          verification_token?: string;
          verified_at?: string | null;
        };
        Update: {
          created_at?: string;
          domain?: string;
          entity_id?: string;
          entity_type?: string;
          failure_reason?: string | null;
          id?: string;
          last_check_at?: string | null;
          ssl_status?: string | null;
          status?: string;
          updated_at?: string;
          vercel_domain_id?: string | null;
          vercel_project_id?: string | null;
          verification_method?: string;
          verification_token?: string;
          verified_at?: string | null;
        };
        Relationships: [];
      };
      dumplings: {
        Row: {
          availability: Json | null;
          cooking: Json;
          created_at: string | null;
          customization: Json | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          filling: Json | null;
          history: Json | null;
          id: string;
          image_url: string | null;
          is_public: boolean;
          name: Json;
          origin: Json;
          owner_id: string | null;
          pricing: Json | null;
          sauce: Json | null;
          serving: Json;
          slug: string;
          source_note: string | null;
          source_url: string | null;
          stable_key: string | null;
          status: string;
          style: string;
          tagline: Json | null;
          tags: string[] | null;
          updated_at: string | null;
          version: number | null;
          wrapper: Json;
        };
        Insert: {
          availability?: Json | null;
          cooking: Json;
          created_at?: string | null;
          customization?: Json | null;
          description: Json;
          dietary: Json;
          dish_type?: string | null;
          filling?: Json | null;
          history?: Json | null;
          id: string;
          image_url?: string | null;
          is_public?: boolean;
          name: Json;
          origin: Json;
          owner_id?: string | null;
          pricing?: Json | null;
          sauce?: Json | null;
          serving: Json;
          slug: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string | null;
          status?: string;
          style: string;
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          version?: number | null;
          wrapper: Json;
        };
        Update: {
          availability?: Json | null;
          cooking?: Json;
          created_at?: string | null;
          customization?: Json | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          filling?: Json | null;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          is_public?: boolean;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          pricing?: Json | null;
          sauce?: Json | null;
          serving?: Json;
          slug?: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string | null;
          status?: string;
          style?: string;
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          version?: number | null;
          wrapper?: Json;
        };
        Relationships: [];
      };
      dutch: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          intolerances: string[] | null;
          local_name: string | null;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          price_default: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          intolerances?: string[] | null;
          local_name?: string | null;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          intolerances?: string[] | null;
          local_name?: string | null;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      enterprise_leads: {
        Row: {
          assigned_to: string | null;
          company_name: string;
          contact_email: string;
          contact_name: string;
          contact_phone: string | null;
          converted_organization_id: string | null;
          countries: string[] | null;
          created_at: string;
          current_solution: string | null;
          estimated_locations: number | null;
          id: string;
          message: string | null;
          notes: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          assigned_to?: string | null;
          company_name: string;
          contact_email: string;
          contact_name: string;
          contact_phone?: string | null;
          converted_organization_id?: string | null;
          countries?: string[] | null;
          created_at?: string;
          current_solution?: string | null;
          estimated_locations?: number | null;
          id?: string;
          message?: string | null;
          notes?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          assigned_to?: string | null;
          company_name?: string;
          contact_email?: string;
          contact_name?: string;
          contact_phone?: string | null;
          converted_organization_id?: string | null;
          countries?: string[] | null;
          created_at?: string;
          current_solution?: string | null;
          estimated_locations?: number | null;
          id?: string;
          message?: string | null;
          notes?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'enterprise_leads_converted_organization_id_fkey';
            columns: ['converted_organization_id'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      ethiopian: {
        Row: {
          allergens: Json | null;
          category: string;
          created_at: string | null;
          description: string;
          dietary: Json | null;
          dish_type: string | null;
          id: string;
          image_url: string | null;
          intolerances: Json | null;
          is_available: boolean | null;
          is_public: boolean;
          is_traditional: boolean | null;
          name: string;
          origin: Json;
          owner_id: string | null;
          prep_time_min: number | null;
          price_default: number | null;
          slug: string;
          spice_level: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: Json | null;
          category: string;
          created_at?: string | null;
          description: string;
          dietary?: Json | null;
          dish_type?: string | null;
          id: string;
          image_url?: string | null;
          intolerances?: Json | null;
          is_available?: boolean | null;
          is_public?: boolean;
          is_traditional?: boolean | null;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          slug: string;
          spice_level?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: Json | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          dietary?: Json | null;
          dish_type?: string | null;
          id?: string;
          image_url?: string | null;
          intolerances?: Json | null;
          is_available?: boolean | null;
          is_public?: boolean;
          is_traditional?: boolean | null;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          slug?: string;
          spice_level?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      events: {
        Row: {
          affected_areas: string[] | null;
          auto_create_schedule_override: boolean | null;
          color: string | null;
          created_at: string | null;
          created_by: string | null;
          current_attendees: number | null;
          description: string | null;
          end_date: string | null;
          end_time: string;
          entrance_fee: number | null;
          event_category: string;
          event_type: string;
          hours_override: Json | null;
          id: string;
          image_url: string | null;
          is_featured: boolean | null;
          is_public: boolean | null;
          location_id: string;
          loyalty_bonus: Json | null;
          max_capacity: number | null;
          menu_impact: Json | null;
          performer: Json | null;
          promotions: Json | null;
          recurrence: string | null;
          recurrence_days: number[] | null;
          recurrence_end_date: string | null;
          reduced_capacity: number | null;
          requires_reservation: boolean | null;
          schedule_override_id: string | null;
          sports_info: Json | null;
          start_date: string;
          start_time: string;
          status: string | null;
          tags: string[] | null;
          ticket_url: string | null;
          timezone: string | null;
          title: string;
          updated_at: string | null;
          venue_status: string | null;
        };
        Insert: {
          affected_areas?: string[] | null;
          auto_create_schedule_override?: boolean | null;
          color?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          current_attendees?: number | null;
          description?: string | null;
          end_date?: string | null;
          end_time: string;
          entrance_fee?: number | null;
          event_category: string;
          event_type: string;
          hours_override?: Json | null;
          id?: string;
          image_url?: string | null;
          is_featured?: boolean | null;
          is_public?: boolean | null;
          location_id: string;
          loyalty_bonus?: Json | null;
          max_capacity?: number | null;
          menu_impact?: Json | null;
          performer?: Json | null;
          promotions?: Json | null;
          recurrence?: string | null;
          recurrence_days?: number[] | null;
          recurrence_end_date?: string | null;
          reduced_capacity?: number | null;
          requires_reservation?: boolean | null;
          schedule_override_id?: string | null;
          sports_info?: Json | null;
          start_date: string;
          start_time: string;
          status?: string | null;
          tags?: string[] | null;
          ticket_url?: string | null;
          timezone?: string | null;
          title: string;
          updated_at?: string | null;
          venue_status?: string | null;
        };
        Update: {
          affected_areas?: string[] | null;
          auto_create_schedule_override?: boolean | null;
          color?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          current_attendees?: number | null;
          description?: string | null;
          end_date?: string | null;
          end_time?: string;
          entrance_fee?: number | null;
          event_category?: string;
          event_type?: string;
          hours_override?: Json | null;
          id?: string;
          image_url?: string | null;
          is_featured?: boolean | null;
          is_public?: boolean | null;
          location_id?: string;
          loyalty_bonus?: Json | null;
          max_capacity?: number | null;
          menu_impact?: Json | null;
          performer?: Json | null;
          promotions?: Json | null;
          recurrence?: string | null;
          recurrence_days?: number[] | null;
          recurrence_end_date?: string | null;
          reduced_capacity?: number | null;
          requires_reservation?: boolean | null;
          schedule_override_id?: string | null;
          sports_info?: Json | null;
          start_date?: string;
          start_time?: string;
          status?: string | null;
          tags?: string[] | null;
          ticket_url?: string | null;
          timezone?: string | null;
          title?: string;
          updated_at?: string | null;
          venue_status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'events_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'events_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'events_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'events_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'events_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'events_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'events_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'events_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'events_schedule_override_id_fkey';
            columns: ['schedule_override_id'];
            isOneToOne: false;
            referencedRelation: 'schedule_overrides';
            referencedColumns: ['id'];
          },
        ];
      };
      exchange_rates: {
        Row: {
          base_currency: string;
          created_at: string | null;
          currency_count: number | null;
          fetched_at: string;
          id: string;
          rates: Json;
          source: string | null;
          updated_at: string | null;
        };
        Insert: {
          base_currency?: string;
          created_at?: string | null;
          currency_count?: number | null;
          fetched_at?: string;
          id?: string;
          rates?: Json;
          source?: string | null;
          updated_at?: string | null;
        };
        Update: {
          base_currency?: string;
          created_at?: string | null;
          currency_count?: number | null;
          fetched_at?: string;
          id?: string;
          rates?: Json;
          source?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      filipino: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          local_name: string | null;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          local_name?: string | null;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          local_name?: string | null;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      follower_analytics: {
        Row: {
          account_id: string;
          average_order_value: number | null;
          average_rating: number | null;
          created_at: string;
          favorite_categories: string[] | null;
          favorite_products: Json | null;
          first_visit_at: string | null;
          id: string;
          last_feedback_at: string | null;
          last_visit_at: string | null;
          loyalty_points: number | null;
          loyalty_tier: string | null;
          merchant_id: string;
          orders_this_month: number | null;
          rewards_redeemed: number | null;
          spent_this_month: number | null;
          total_feedback_given: number | null;
          total_orders: number | null;
          total_spent: number | null;
          total_visits: number | null;
          updated_at: string;
          visits_last_month: number | null;
          visits_this_month: number | null;
        };
        Insert: {
          account_id: string;
          average_order_value?: number | null;
          average_rating?: number | null;
          created_at?: string;
          favorite_categories?: string[] | null;
          favorite_products?: Json | null;
          first_visit_at?: string | null;
          id?: string;
          last_feedback_at?: string | null;
          last_visit_at?: string | null;
          loyalty_points?: number | null;
          loyalty_tier?: string | null;
          merchant_id: string;
          orders_this_month?: number | null;
          rewards_redeemed?: number | null;
          spent_this_month?: number | null;
          total_feedback_given?: number | null;
          total_orders?: number | null;
          total_spent?: number | null;
          total_visits?: number | null;
          updated_at?: string;
          visits_last_month?: number | null;
          visits_this_month?: number | null;
        };
        Update: {
          account_id?: string;
          average_order_value?: number | null;
          average_rating?: number | null;
          created_at?: string;
          favorite_categories?: string[] | null;
          favorite_products?: Json | null;
          first_visit_at?: string | null;
          id?: string;
          last_feedback_at?: string | null;
          last_visit_at?: string | null;
          loyalty_points?: number | null;
          loyalty_tier?: string | null;
          merchant_id?: string;
          orders_this_month?: number | null;
          rewards_redeemed?: number | null;
          spent_this_month?: number | null;
          total_feedback_given?: number | null;
          total_orders?: number | null;
          total_spent?: number | null;
          total_visits?: number | null;
          updated_at?: string;
          visits_last_month?: number | null;
          visits_this_month?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'follower_analytics_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'follower_analytics_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'follower_analytics_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'follower_analytics_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'follower_analytics_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'follower_analytics_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'follower_analytics_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'follower_analytics_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      food_challenges: {
        Row: {
          available_days: number[] | null;
          available_time_end: string | null;
          available_time_start: string | null;
          created_at: string | null;
          description: string | null;
          difficulty: string | null;
          id: string;
          image_url: string | null;
          is_active: boolean | null;
          is_team_challenge: boolean | null;
          items: Json;
          merchant_id: string;
          name: string;
          price_if_lose: number;
          record_bonus_cash: number | null;
          record_bonus_description: string | null;
          record_bonus_enabled: boolean | null;
          record_bonus_prize: string | null;
          record_date: string | null;
          record_holder_id: string | null;
          record_holder_name: string | null;
          record_time_minutes: number | null;
          requires_booking: boolean | null;
          rules: Json | null;
          team_size: number | null;
          time_limit_minutes: number;
          total_attempts: number | null;
          total_wins: number | null;
          updated_at: string | null;
          win_cash_prize: number | null;
          win_prize_description: string | null;
          win_prize_name: string | null;
          win_reward_type: string;
        };
        Insert: {
          available_days?: number[] | null;
          available_time_end?: string | null;
          available_time_start?: string | null;
          created_at?: string | null;
          description?: string | null;
          difficulty?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean | null;
          is_team_challenge?: boolean | null;
          items?: Json;
          merchant_id: string;
          name: string;
          price_if_lose: number;
          record_bonus_cash?: number | null;
          record_bonus_description?: string | null;
          record_bonus_enabled?: boolean | null;
          record_bonus_prize?: string | null;
          record_date?: string | null;
          record_holder_id?: string | null;
          record_holder_name?: string | null;
          record_time_minutes?: number | null;
          requires_booking?: boolean | null;
          rules?: Json | null;
          team_size?: number | null;
          time_limit_minutes: number;
          total_attempts?: number | null;
          total_wins?: number | null;
          updated_at?: string | null;
          win_cash_prize?: number | null;
          win_prize_description?: string | null;
          win_prize_name?: string | null;
          win_reward_type?: string;
        };
        Update: {
          available_days?: number[] | null;
          available_time_end?: string | null;
          available_time_start?: string | null;
          created_at?: string | null;
          description?: string | null;
          difficulty?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean | null;
          is_team_challenge?: boolean | null;
          items?: Json;
          merchant_id?: string;
          name?: string;
          price_if_lose?: number;
          record_bonus_cash?: number | null;
          record_bonus_description?: string | null;
          record_bonus_enabled?: boolean | null;
          record_bonus_prize?: string | null;
          record_date?: string | null;
          record_holder_id?: string | null;
          record_holder_name?: string | null;
          record_time_minutes?: number | null;
          requires_booking?: boolean | null;
          rules?: Json | null;
          team_size?: number | null;
          time_limit_minutes?: number;
          total_attempts?: number | null;
          total_wins?: number | null;
          updated_at?: string | null;
          win_cash_prize?: number | null;
          win_prize_description?: string | null;
          win_prize_name?: string | null;
          win_reward_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'food_challenges_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'food_challenges_record_holder_id_fkey';
            columns: ['record_holder_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'food_challenges_record_holder_id_fkey';
            columns: ['record_holder_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'food_challenges_record_holder_id_fkey';
            columns: ['record_holder_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'food_challenges_record_holder_id_fkey';
            columns: ['record_holder_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'food_challenges_record_holder_id_fkey';
            columns: ['record_holder_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'food_challenges_record_holder_id_fkey';
            columns: ['record_holder_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'food_challenges_record_holder_id_fkey';
            columns: ['record_holder_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      food_cost_dish_ingredients: {
        Row: {
          cost_in_dish: number | null;
          cost_per_kg: number;
          created_at: string | null;
          dish_id: string;
          id: string;
          ingredient_id: string | null;
          ingredient_name: string;
          quantity_grams: number;
        };
        Insert: {
          cost_in_dish?: number | null;
          cost_per_kg: number;
          created_at?: string | null;
          dish_id: string;
          id?: string;
          ingredient_id?: string | null;
          ingredient_name: string;
          quantity_grams?: number;
        };
        Update: {
          cost_in_dish?: number | null;
          cost_per_kg?: number;
          created_at?: string | null;
          dish_id?: string;
          id?: string;
          ingredient_id?: string | null;
          ingredient_name?: string;
          quantity_grams?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'food_cost_dish_ingredients_dish_id_fkey';
            columns: ['dish_id'];
            isOneToOne: false;
            referencedRelation: 'food_cost_dishes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'food_cost_dish_ingredients_ingredient_id_fkey';
            columns: ['ingredient_id'];
            isOneToOne: false;
            referencedRelation: 'ingredients';
            referencedColumns: ['id'];
          },
        ];
      };
      food_cost_dishes: {
        Row: {
          bcg_class: string | null;
          category: string;
          created_at: string | null;
          currency: string;
          food_cost: number | null;
          food_cost_percent: number | null;
          id: string;
          is_active: boolean | null;
          labor_cost: number | null;
          labor_minutes: number | null;
          location_id: string;
          margin: number | null;
          margin_percent: number | null;
          menu_item_id: string | null;
          monthly_sales: number | null;
          name: string;
          selling_price: number;
          updated_at: string | null;
        };
        Insert: {
          bcg_class?: string | null;
          category?: string;
          created_at?: string | null;
          currency?: string;
          food_cost?: number | null;
          food_cost_percent?: number | null;
          id?: string;
          is_active?: boolean | null;
          labor_cost?: number | null;
          labor_minutes?: number | null;
          location_id: string;
          margin?: number | null;
          margin_percent?: number | null;
          menu_item_id?: string | null;
          monthly_sales?: number | null;
          name: string;
          selling_price: number;
          updated_at?: string | null;
        };
        Update: {
          bcg_class?: string | null;
          category?: string;
          created_at?: string | null;
          currency?: string;
          food_cost?: number | null;
          food_cost_percent?: number | null;
          id?: string;
          is_active?: boolean | null;
          labor_cost?: number | null;
          labor_minutes?: number | null;
          location_id?: string;
          margin?: number | null;
          margin_percent?: number | null;
          menu_item_id?: string | null;
          monthly_sales?: number | null;
          name?: string;
          selling_price?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'food_cost_dishes_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'food_cost_dishes_menu_item_id_fkey';
            columns: ['menu_item_id'];
            isOneToOne: false;
            referencedRelation: 'menu_items';
            referencedColumns: ['id'];
          },
        ];
      };
      french: {
        Row: {
          allergens: Json | null;
          category: string;
          created_at: string | null;
          description: string;
          dietary: Json | null;
          dish_type: string | null;
          id: string;
          image_url: string | null;
          intolerances: Json | null;
          is_available: boolean | null;
          is_public: boolean;
          is_traditional: boolean | null;
          name: string;
          origin: Json;
          owner_id: string | null;
          prep_time_min: number | null;
          price_default: number | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: Json | null;
          category: string;
          created_at?: string | null;
          description: string;
          dietary?: Json | null;
          dish_type?: string | null;
          id: string;
          image_url?: string | null;
          intolerances?: Json | null;
          is_available?: boolean | null;
          is_public?: boolean;
          is_traditional?: boolean | null;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: Json | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          dietary?: Json | null;
          dish_type?: string | null;
          id?: string;
          image_url?: string | null;
          intolerances?: Json | null;
          is_available?: boolean | null;
          is_public?: boolean;
          is_traditional?: boolean | null;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      fried: {
        Row: {
          allergens: Json;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          created_at: string;
          crispy_rating: number | null;
          description: string;
          dipping_sauces: Json | null;
          dish_type: string | null;
          fat_g: number | null;
          frying_method: string;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_kosher: boolean;
          is_nut_free: boolean;
          is_public: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number;
          protein_g: number | null;
          serving_size_g: number | null;
          slug: string;
          spice_level: number;
          status: string;
          tags: Json;
          updated_at: string;
        };
        Insert: {
          allergens?: Json;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          created_at?: string;
          crispy_rating?: number | null;
          description: string;
          dipping_sauces?: Json | null;
          dish_type?: string | null;
          fat_g?: number | null;
          frying_method?: string;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          serving_size_g?: number | null;
          slug: string;
          spice_level?: number;
          status?: string;
          tags?: Json;
          updated_at?: string;
        };
        Update: {
          allergens?: Json;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          created_at?: string;
          crispy_rating?: number | null;
          description?: string;
          dipping_sauces?: Json | null;
          dish_type?: string | null;
          fat_g?: number | null;
          frying_method?: string;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          serving_size_g?: number | null;
          slug?: string;
          spice_level?: number;
          status?: string;
          tags?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      georgian: {
        Row: {
          allergens: string[] | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          georgian_name: string | null;
          georgian_script: string | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[] | null;
          is_dairy_free: boolean | null;
          is_festive: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_nut_free: boolean | null;
          is_pescatarian: boolean | null;
          is_public: boolean;
          is_street_food: boolean | null;
          is_supra_dish: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          protein_type: string | null;
          region: string | null;
          served_cold: boolean | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          georgian_name?: string | null;
          georgian_script?: string | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_festive?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_nut_free?: boolean | null;
          is_pescatarian?: boolean | null;
          is_public?: boolean;
          is_street_food?: boolean | null;
          is_supra_dish?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string | null;
          served_cold?: boolean | null;
          slug: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          georgian_name?: string | null;
          georgian_script?: string | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_festive?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_nut_free?: boolean | null;
          is_pescatarian?: boolean | null;
          is_public?: boolean;
          is_street_food?: boolean | null;
          is_supra_dish?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string | null;
          served_cold?: boolean | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      german: {
        Row: {
          allergens: string[];
          category: string;
          created_at: string;
          description: string;
          dietary: Json;
          german_name: string;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          name: string;
          popularity: number;
          preparation_time_min: number | null;
          price_category: string;
          region: string;
          serving_temp: string;
          slug: string;
          spice_level: number;
          status: string;
          updated_at: string;
        };
        Insert: {
          allergens?: string[];
          category: string;
          created_at?: string;
          description: string;
          dietary?: Json;
          german_name: string;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          name: string;
          popularity?: number;
          preparation_time_min?: number | null;
          price_category?: string;
          region: string;
          serving_temp?: string;
          slug: string;
          spice_level?: number;
          status?: string;
          updated_at?: string;
        };
        Update: {
          allergens?: string[];
          category?: string;
          created_at?: string;
          description?: string;
          dietary?: Json;
          german_name?: string;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          name?: string;
          popularity?: number;
          preparation_time_min?: number | null;
          price_category?: string;
          region?: string;
          serving_temp?: string;
          slug?: string;
          spice_level?: number;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      greek: {
        Row: {
          allergens: string[] | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          greek_name: string;
          greek_script: string | null;
          has_phyllo: boolean;
          id: string;
          image_url: string | null;
          is_dairy_free: boolean;
          is_festive: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_meze: boolean;
          is_nut_free: boolean;
          is_pescatarian: boolean;
          is_public: boolean;
          is_street_food: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          protein_type: string;
          region: string;
          slug: string;
          spice_level: number;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method: string;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          greek_name: string;
          greek_script?: string | null;
          has_phyllo?: boolean;
          id: string;
          image_url?: string | null;
          is_dairy_free?: boolean;
          is_festive?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_meze?: boolean;
          is_nut_free?: boolean;
          is_pescatarian?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type: string;
          region: string;
          slug: string;
          spice_level?: number;
          status: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          greek_name?: string;
          greek_script?: string | null;
          has_phyllo?: boolean;
          id?: string;
          image_url?: string | null;
          is_dairy_free?: boolean;
          is_festive?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_meze?: boolean;
          is_nut_free?: boolean;
          is_pescatarian?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string;
          region?: string;
          slug?: string;
          spice_level?: number;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      group_booking_requests: {
        Row: {
          ai_confidence: number | null;
          ai_expected_value: number | null;
          ai_reasoning: string | null;
          ai_recommendation: string | null;
          counter_date: string | null;
          counter_price_per_person: number | null;
          counter_slot: string | null;
          created_at: string | null;
          decided_at: string | null;
          decided_by: string | null;
          dietary_requirements: string[] | null;
          id: string;
          menu_type: string | null;
          merchant_id: string;
          partner_id: string | null;
          partner_type: string | null;
          party_size: number;
          price_per_person: number | null;
          requested_at: string | null;
          requested_date: string;
          requested_slot: string | null;
          special_requests: string | null;
          status: string | null;
          total_value: number | null;
        };
        Insert: {
          ai_confidence?: number | null;
          ai_expected_value?: number | null;
          ai_reasoning?: string | null;
          ai_recommendation?: string | null;
          counter_date?: string | null;
          counter_price_per_person?: number | null;
          counter_slot?: string | null;
          created_at?: string | null;
          decided_at?: string | null;
          decided_by?: string | null;
          dietary_requirements?: string[] | null;
          id?: string;
          menu_type?: string | null;
          merchant_id: string;
          partner_id?: string | null;
          partner_type?: string | null;
          party_size: number;
          price_per_person?: number | null;
          requested_at?: string | null;
          requested_date: string;
          requested_slot?: string | null;
          special_requests?: string | null;
          status?: string | null;
          total_value?: number | null;
        };
        Update: {
          ai_confidence?: number | null;
          ai_expected_value?: number | null;
          ai_reasoning?: string | null;
          ai_recommendation?: string | null;
          counter_date?: string | null;
          counter_price_per_person?: number | null;
          counter_slot?: string | null;
          created_at?: string | null;
          decided_at?: string | null;
          decided_by?: string | null;
          dietary_requirements?: string[] | null;
          id?: string;
          menu_type?: string | null;
          merchant_id?: string;
          partner_id?: string | null;
          partner_type?: string | null;
          party_size?: number;
          price_per_person?: number | null;
          requested_at?: string | null;
          requested_date?: string;
          requested_slot?: string | null;
          special_requests?: string | null;
          status?: string | null;
          total_value?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'group_booking_requests_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      hawaiian: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          id: string;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      health_profiles: {
        Row: {
          account_id: string;
          allergens: Json;
          completeness_score: number | null;
          created_at: string;
          dietary: Json;
          food_styles: Json;
          id: string;
          intolerances: Json;
          last_updated_at: string | null;
          preferences: Json;
          share_anonymized: boolean | null;
          share_with_merchants: boolean | null;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          allergens?: Json;
          completeness_score?: number | null;
          created_at?: string;
          dietary?: Json;
          food_styles?: Json;
          id?: string;
          intolerances?: Json;
          last_updated_at?: string | null;
          preferences?: Json;
          share_anonymized?: boolean | null;
          share_with_merchants?: boolean | null;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          allergens?: Json;
          completeness_score?: number | null;
          created_at?: string;
          dietary?: Json;
          food_styles?: Json;
          id?: string;
          intolerances?: Json;
          last_updated_at?: string | null;
          preferences?: Json;
          share_anonymized?: boolean | null;
          share_with_merchants?: boolean | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'health_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'health_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'health_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'health_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'health_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'health_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'health_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      holidays: {
        Row: {
          business_notes: string | null;
          city: string | null;
          country_code: string;
          created_at: string;
          date: string;
          id: string;
          impact_level: string;
          is_bank_holiday: boolean;
          is_public_holiday: boolean;
          is_recurring: boolean;
          is_verified: boolean;
          name: string;
          name_en: string | null;
          notes: string | null;
          recurrence_rule: string | null;
          region_code: string | null;
          source: string;
          source_reference: string | null;
          type: string;
          updated_at: string;
          verified_at: string | null;
          verified_by: string | null;
        };
        Insert: {
          business_notes?: string | null;
          city?: string | null;
          country_code: string;
          created_at?: string;
          date: string;
          id?: string;
          impact_level?: string;
          is_bank_holiday?: boolean;
          is_public_holiday?: boolean;
          is_recurring?: boolean;
          is_verified?: boolean;
          name: string;
          name_en?: string | null;
          notes?: string | null;
          recurrence_rule?: string | null;
          region_code?: string | null;
          source?: string;
          source_reference?: string | null;
          type: string;
          updated_at?: string;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Update: {
          business_notes?: string | null;
          city?: string | null;
          country_code?: string;
          created_at?: string;
          date?: string;
          id?: string;
          impact_level?: string;
          is_bank_holiday?: boolean;
          is_public_holiday?: boolean;
          is_recurring?: boolean;
          is_verified?: boolean;
          name?: string;
          name_en?: string | null;
          notes?: string | null;
          recurrence_rule?: string | null;
          region_code?: string | null;
          source?: string;
          source_reference?: string | null;
          type?: string;
          updated_at?: string;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Relationships: [];
      };
      hot_action_requests: {
        Row: {
          acknowledged_at: string | null;
          acknowledged_by: string | null;
          action_type_id: string;
          completed_at: string | null;
          completed_by: string | null;
          created_at: string | null;
          customer_note: string | null;
          device_id: string | null;
          id: string;
          location_id: string;
          response_time_seconds: number | null;
          status: string | null;
          table_number: string | null;
        };
        Insert: {
          acknowledged_at?: string | null;
          acknowledged_by?: string | null;
          action_type_id: string;
          completed_at?: string | null;
          completed_by?: string | null;
          created_at?: string | null;
          customer_note?: string | null;
          device_id?: string | null;
          id?: string;
          location_id: string;
          response_time_seconds?: number | null;
          status?: string | null;
          table_number?: string | null;
        };
        Update: {
          acknowledged_at?: string | null;
          acknowledged_by?: string | null;
          action_type_id?: string;
          completed_at?: string | null;
          completed_by?: string | null;
          created_at?: string | null;
          customer_note?: string | null;
          device_id?: string | null;
          id?: string;
          location_id?: string;
          response_time_seconds?: number | null;
          status?: string | null;
          table_number?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'hot_action_requests_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'hot_action_requests_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'hot_action_requests_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'hot_action_requests_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'hot_action_requests_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'hot_action_requests_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'hot_action_requests_acknowledged_by_fkey';
            columns: ['acknowledged_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'hot_action_requests_action_type_id_fkey';
            columns: ['action_type_id'];
            isOneToOne: false;
            referencedRelation: 'hot_action_types';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'hot_action_requests_completed_by_fkey';
            columns: ['completed_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'hot_action_requests_completed_by_fkey';
            columns: ['completed_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'hot_action_requests_completed_by_fkey';
            columns: ['completed_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'hot_action_requests_completed_by_fkey';
            columns: ['completed_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'hot_action_requests_completed_by_fkey';
            columns: ['completed_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'hot_action_requests_completed_by_fkey';
            columns: ['completed_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'hot_action_requests_completed_by_fkey';
            columns: ['completed_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'hot_action_requests_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      hot_action_types: {
        Row: {
          auto_acknowledge_minutes: number | null;
          code: string;
          color: string | null;
          cooldown_minutes: number | null;
          created_at: string | null;
          description: string | null;
          display_order: number | null;
          icon: string | null;
          id: string;
          is_active: boolean | null;
          location_id: string;
          name: string;
          name_it: string | null;
          notification_priority: string | null;
          notification_sound: string | null;
          requires_note: boolean | null;
          requires_table: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          auto_acknowledge_minutes?: number | null;
          code: string;
          color?: string | null;
          cooldown_minutes?: number | null;
          created_at?: string | null;
          description?: string | null;
          display_order?: number | null;
          icon?: string | null;
          id?: string;
          is_active?: boolean | null;
          location_id: string;
          name: string;
          name_it?: string | null;
          notification_priority?: string | null;
          notification_sound?: string | null;
          requires_note?: boolean | null;
          requires_table?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          auto_acknowledge_minutes?: number | null;
          code?: string;
          color?: string | null;
          cooldown_minutes?: number | null;
          created_at?: string | null;
          description?: string | null;
          display_order?: number | null;
          icon?: string | null;
          id?: string;
          is_active?: boolean | null;
          location_id?: string;
          name?: string;
          name_it?: string | null;
          notification_priority?: string | null;
          notification_sound?: string | null;
          requires_note?: boolean | null;
          requires_table?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'hot_action_types_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      hotbeverages: {
        Row: {
          allergens: string[] | null;
          base_type: string;
          caffeine_mg: number | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          created_at: string | null;
          description: string;
          fat_g: number | null;
          flavor_profile: string;
          has_foam: boolean | null;
          has_whipped_cream: boolean | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_caffeinated: boolean | null;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          optimal_temp_c: number | null;
          origin: Json;
          origin_country: string | null;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          serving_size_ml: number;
          serving_style: string;
          slug: string;
          spice_level: number | null;
          status: string;
          sugar_g: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          base_type: string;
          caffeine_mg?: number | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          created_at?: string | null;
          description: string;
          fat_g?: number | null;
          flavor_profile: string;
          has_foam?: boolean | null;
          has_whipped_cream?: boolean | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_caffeinated?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          optimal_temp_c?: number | null;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_ml?: number;
          serving_style: string;
          slug: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          base_type?: string;
          caffeine_mg?: number | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          fat_g?: number | null;
          flavor_profile?: string;
          has_foam?: boolean | null;
          has_whipped_cream?: boolean | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_caffeinated?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          optimal_temp_c?: number | null;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_ml?: number;
          serving_style?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      icecream: {
        Row: {
          allergens: string[] | null;
          base_type: string;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          flavor_profile: string;
          has_sauce: boolean | null;
          has_topping: boolean | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_artisanal: boolean | null;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          origin_country: string | null;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          serving_size_ml: number;
          serving_style: string;
          slug: string;
          spice_level: number | null;
          status: string;
          sugar_g: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          base_type: string;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          flavor_profile: string;
          has_sauce?: boolean | null;
          has_topping?: boolean | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_artisanal?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_ml?: number;
          serving_style: string;
          slug: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          base_type?: string;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          flavor_profile?: string;
          has_sauce?: boolean | null;
          has_topping?: boolean | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_artisanal?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_ml?: number;
          serving_style?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      improvement_suggestions: {
        Row: {
          account_id: string;
          attachments: string[] | null;
          created_at: string;
          current_value: Json | null;
          description: string;
          duplicate_of: string | null;
          entity_id: string | null;
          entity_name: string | null;
          entity_type: string | null;
          id: string;
          implementation_notes: string | null;
          implemented_at: string | null;
          implemented_by: string | null;
          moderator_notes: string | null;
          points_awarded: number | null;
          priority: string;
          rejection_reason: string | null;
          reviewed_at: string | null;
          reviewed_by: string | null;
          sources: string[] | null;
          status: string;
          suggested_value: Json | null;
          suggestion_type: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          attachments?: string[] | null;
          created_at?: string;
          current_value?: Json | null;
          description: string;
          duplicate_of?: string | null;
          entity_id?: string | null;
          entity_name?: string | null;
          entity_type?: string | null;
          id?: string;
          implementation_notes?: string | null;
          implemented_at?: string | null;
          implemented_by?: string | null;
          moderator_notes?: string | null;
          points_awarded?: number | null;
          priority?: string;
          rejection_reason?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          sources?: string[] | null;
          status?: string;
          suggested_value?: Json | null;
          suggestion_type: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          attachments?: string[] | null;
          created_at?: string;
          current_value?: Json | null;
          description?: string;
          duplicate_of?: string | null;
          entity_id?: string | null;
          entity_name?: string | null;
          entity_type?: string | null;
          id?: string;
          implementation_notes?: string | null;
          implemented_at?: string | null;
          implemented_by?: string | null;
          moderator_notes?: string | null;
          points_awarded?: number | null;
          priority?: string;
          rejection_reason?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          sources?: string[] | null;
          status?: string;
          suggested_value?: Json | null;
          suggestion_type?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'improvement_suggestions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_duplicate_of_fkey';
            columns: ['duplicate_of'];
            isOneToOne: false;
            referencedRelation: 'improvement_suggestions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_duplicate_of_fkey';
            columns: ['duplicate_of'];
            isOneToOne: false;
            referencedRelation: 'v_recent_suggestions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_implemented_by_fkey';
            columns: ['implemented_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_implemented_by_fkey';
            columns: ['implemented_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_implemented_by_fkey';
            columns: ['implemented_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_implemented_by_fkey';
            columns: ['implemented_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_implemented_by_fkey';
            columns: ['implemented_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_implemented_by_fkey';
            columns: ['implemented_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_implemented_by_fkey';
            columns: ['implemented_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_reviewed_by_fkey';
            columns: ['reviewed_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_reviewed_by_fkey';
            columns: ['reviewed_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_reviewed_by_fkey';
            columns: ['reviewed_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_reviewed_by_fkey';
            columns: ['reviewed_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_reviewed_by_fkey';
            columns: ['reviewed_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_reviewed_by_fkey';
            columns: ['reviewed_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'improvement_suggestions_reviewed_by_fkey';
            columns: ['reviewed_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      indian: {
        Row: {
          allergens: Json;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string;
          curry_base: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          hindi_name: string | null;
          id: string;
          image_url: string | null;
          ingredient_ids: Json;
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_kosher: boolean;
          is_nut_free: boolean;
          is_public: boolean;
          is_street_food: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          owner_id: string | null;
          popularity: number;
          protein_g: number | null;
          protein_type: string | null;
          region: string;
          slug: string;
          spice_level: number;
          status: string;
          tags: Json;
          updated_at: string;
        };
        Insert: {
          allergens?: Json;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string;
          curry_base?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          hindi_name?: string | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: Json;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          protein_type?: string | null;
          region: string;
          slug: string;
          spice_level?: number;
          status?: string;
          tags?: Json;
          updated_at?: string;
        };
        Update: {
          allergens?: Json;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string;
          curry_base?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          hindi_name?: string | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: Json;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string;
          slug?: string;
          spice_level?: number;
          status?: string;
          tags?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      indochinese: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      indonesian: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          local_name: string | null;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          local_name?: string | null;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          local_name?: string | null;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      ingredient_contributions: {
        Row: {
          account_id: string;
          ai_confidence_score: number | null;
          category: string | null;
          contributor_locale: string | null;
          created_at: string;
          id: string;
          ingredient_name: string;
          ingredient_name_local: string | null;
          is_new_ingredient: boolean | null;
          merged_at: string | null;
          merged_into_id: string | null;
          photo_extraction_prompt: string | null;
          points_awarded: number | null;
          rejection_reason: string | null;
          reviewed_at: string | null;
          reviewer_account_id: string | null;
          reviewer_notes: string | null;
          source_photos: string[] | null;
          source_type: string | null;
          status: string;
          subcategory: string | null;
          submitted_json: Json;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          ai_confidence_score?: number | null;
          category?: string | null;
          contributor_locale?: string | null;
          created_at?: string;
          id?: string;
          ingredient_name: string;
          ingredient_name_local?: string | null;
          is_new_ingredient?: boolean | null;
          merged_at?: string | null;
          merged_into_id?: string | null;
          photo_extraction_prompt?: string | null;
          points_awarded?: number | null;
          rejection_reason?: string | null;
          reviewed_at?: string | null;
          reviewer_account_id?: string | null;
          reviewer_notes?: string | null;
          source_photos?: string[] | null;
          source_type?: string | null;
          status?: string;
          subcategory?: string | null;
          submitted_json?: Json;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          ai_confidence_score?: number | null;
          category?: string | null;
          contributor_locale?: string | null;
          created_at?: string;
          id?: string;
          ingredient_name?: string;
          ingredient_name_local?: string | null;
          is_new_ingredient?: boolean | null;
          merged_at?: string | null;
          merged_into_id?: string | null;
          photo_extraction_prompt?: string | null;
          points_awarded?: number | null;
          rejection_reason?: string | null;
          reviewed_at?: string | null;
          reviewer_account_id?: string | null;
          reviewer_notes?: string | null;
          source_photos?: string[] | null;
          source_type?: string | null;
          status?: string;
          subcategory?: string | null;
          submitted_json?: Json;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ingredient_contributions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'ingredient_contributions_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      ingredients: {
        Row: {
          allergens: Json | null;
          carbon_footprint_kg: number | null;
          category: Database['public']['Enums']['ingredient_category'];
          common_uses: string[] | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          gtin: string | null;
          gtin_format: string | null;
          id: string;
          image_url: string | null;
          intolerances: Json | null;
          is_common: boolean | null;
          is_organic_available: boolean | null;
          is_premium: boolean | null;
          is_public: boolean;
          is_seasonal: boolean | null;
          name: string;
          nutrition: Json | null;
          origin_country: string | null;
          origin_region: string | null;
          owner_id: string | null;
          pairs_well_with: string[] | null;
          production_method: string | null;
          scoville_max: number | null;
          season_months: number[] | null;
          seasonality: string[] | null;
          shelf_life_days: number | null;
          slug: string;
          spice_level: number | null;
          storage_temp: Database['public']['Enums']['storage_temp'] | null;
          subcategory: string | null;
          sustainability_score: number | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: Json | null;
          carbon_footprint_kg?: number | null;
          category: Database['public']['Enums']['ingredient_category'];
          common_uses?: string[] | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          gtin?: string | null;
          gtin_format?: string | null;
          id: string;
          image_url?: string | null;
          intolerances?: Json | null;
          is_common?: boolean | null;
          is_organic_available?: boolean | null;
          is_premium?: boolean | null;
          is_public?: boolean;
          is_seasonal?: boolean | null;
          name: string;
          nutrition?: Json | null;
          origin_country?: string | null;
          origin_region?: string | null;
          owner_id?: string | null;
          pairs_well_with?: string[] | null;
          production_method?: string | null;
          scoville_max?: number | null;
          season_months?: number[] | null;
          seasonality?: string[] | null;
          shelf_life_days?: number | null;
          slug: string;
          spice_level?: number | null;
          storage_temp?: Database['public']['Enums']['storage_temp'] | null;
          subcategory?: string | null;
          sustainability_score?: number | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: Json | null;
          carbon_footprint_kg?: number | null;
          category?: Database['public']['Enums']['ingredient_category'];
          common_uses?: string[] | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          gtin?: string | null;
          gtin_format?: string | null;
          id?: string;
          image_url?: string | null;
          intolerances?: Json | null;
          is_common?: boolean | null;
          is_organic_available?: boolean | null;
          is_premium?: boolean | null;
          is_public?: boolean;
          is_seasonal?: boolean | null;
          name?: string;
          nutrition?: Json | null;
          origin_country?: string | null;
          origin_region?: string | null;
          owner_id?: string | null;
          pairs_well_with?: string[] | null;
          production_method?: string | null;
          scoville_max?: number | null;
          season_months?: number[] | null;
          seasonality?: string[] | null;
          shelf_life_days?: number | null;
          slug?: string;
          spice_level?: number | null;
          storage_temp?: Database['public']['Enums']['storage_temp'] | null;
          subcategory?: string | null;
          sustainability_score?: number | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      internal_notifications: {
        Row: {
          body: string | null;
          created_at: string | null;
          id: string;
          is_read: boolean | null;
          priority: number | null;
          read_at: string | null;
          read_by: string | null;
          reference_id: string | null;
          reference_type: string | null;
          subject: string;
          type: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string | null;
          id?: string;
          is_read?: boolean | null;
          priority?: number | null;
          read_at?: string | null;
          read_by?: string | null;
          reference_id?: string | null;
          reference_type?: string | null;
          subject: string;
          type: string;
        };
        Update: {
          body?: string | null;
          created_at?: string | null;
          id?: string;
          is_read?: boolean | null;
          priority?: number | null;
          read_at?: string | null;
          read_by?: string | null;
          reference_id?: string | null;
          reference_type?: string | null;
          subject?: string;
          type?: string;
        };
        Relationships: [];
      };
      italian: {
        Row: {
          allergens: Json | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string;
          dietary: Json | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[] | null;
          intolerances: Json | null;
          is_available: boolean | null;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          local_name: string | null;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          prep_time_min: number | null;
          price_default: number | null;
          protein_type: string | null;
          region: string;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: Json | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description: string;
          dietary?: Json | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          intolerances?: Json | null;
          is_available?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          local_name?: string | null;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region: string;
          slug: string;
          spice_level?: number | null;
          status: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: Json | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string;
          dietary?: Json | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          intolerances?: Json | null;
          is_available?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          local_name?: string | null;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      japanese: {
        Row: {
          allergens: string[] | null;
          beer_pairing: string[] | null;
          broth_based: boolean | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          contains_raw_fish: boolean | null;
          cooking_method: string | null;
          created_at: string | null;
          description: string;
          difficulty: string | null;
          dish_type: string | null;
          fat_g: number | null;
          fiber_g: number | null;
          filling_ingredients: string[] | null;
          fun_fact: string | null;
          garnish: string[] | null;
          ginger_included: boolean | null;
          history: string | null;
          id: string;
          image_url: string | null;
          is_comfort_food: boolean | null;
          is_cooked: boolean | null;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_izakaya_style: boolean | null;
          is_nut_free: boolean | null;
          is_pescatarian: boolean | null;
          is_public: boolean;
          is_raw: boolean | null;
          is_street_food: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          japanese_name: string | null;
          japanese_script: string | null;
          main_ingredients: string[] | null;
          name: string;
          nori_position: string | null;
          omega3_mg: number | null;
          origin: string | null;
          owner_id: string | null;
          pieces_per_serving: number | null;
          popularity: number | null;
          protein_g: number | null;
          protein_type: string | null;
          region: string | null;
          roll_style: string | null;
          sake_pairing: string[] | null;
          sauce: string[] | null;
          served_hot: boolean | null;
          slug: string;
          sodium_mg: number | null;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          topping_ingredients: string[] | null;
          updated_at: string | null;
          wasabi_included: boolean | null;
          wine_pairing: string[] | null;
        };
        Insert: {
          allergens?: string[] | null;
          beer_pairing?: string[] | null;
          broth_based?: boolean | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          contains_raw_fish?: boolean | null;
          cooking_method?: string | null;
          created_at?: string | null;
          description: string;
          difficulty?: string | null;
          dish_type?: string | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          filling_ingredients?: string[] | null;
          fun_fact?: string | null;
          garnish?: string[] | null;
          ginger_included?: boolean | null;
          history?: string | null;
          id: string;
          image_url?: string | null;
          is_comfort_food?: boolean | null;
          is_cooked?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_izakaya_style?: boolean | null;
          is_nut_free?: boolean | null;
          is_pescatarian?: boolean | null;
          is_public?: boolean;
          is_raw?: boolean | null;
          is_street_food?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          japanese_name?: string | null;
          japanese_script?: string | null;
          main_ingredients?: string[] | null;
          name: string;
          nori_position?: string | null;
          omega3_mg?: number | null;
          origin?: string | null;
          owner_id?: string | null;
          pieces_per_serving?: number | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string | null;
          roll_style?: string | null;
          sake_pairing?: string[] | null;
          sauce?: string[] | null;
          served_hot?: boolean | null;
          slug: string;
          sodium_mg?: number | null;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          topping_ingredients?: string[] | null;
          updated_at?: string | null;
          wasabi_included?: boolean | null;
          wine_pairing?: string[] | null;
        };
        Update: {
          allergens?: string[] | null;
          beer_pairing?: string[] | null;
          broth_based?: boolean | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          contains_raw_fish?: boolean | null;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string;
          difficulty?: string | null;
          dish_type?: string | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          filling_ingredients?: string[] | null;
          fun_fact?: string | null;
          garnish?: string[] | null;
          ginger_included?: boolean | null;
          history?: string | null;
          id?: string;
          image_url?: string | null;
          is_comfort_food?: boolean | null;
          is_cooked?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_izakaya_style?: boolean | null;
          is_nut_free?: boolean | null;
          is_pescatarian?: boolean | null;
          is_public?: boolean;
          is_raw?: boolean | null;
          is_street_food?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          japanese_name?: string | null;
          japanese_script?: string | null;
          main_ingredients?: string[] | null;
          name?: string;
          nori_position?: string | null;
          omega3_mg?: number | null;
          origin?: string | null;
          owner_id?: string | null;
          pieces_per_serving?: number | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string | null;
          roll_style?: string | null;
          sake_pairing?: string[] | null;
          sauce?: string[] | null;
          served_hot?: boolean | null;
          slug?: string;
          sodium_mg?: number | null;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          topping_ingredients?: string[] | null;
          updated_at?: string | null;
          wasabi_included?: boolean | null;
          wine_pairing?: string[] | null;
        };
        Relationships: [];
      };
      korean: {
        Row: {
          allergens: string[] | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          has_banchan: boolean;
          id: string;
          image_url: string | null;
          is_dairy_free: boolean;
          is_fermented: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_nut_free: boolean;
          is_pescatarian: boolean;
          is_public: boolean;
          is_spicy: boolean;
          is_street_food: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          korean_name: string;
          korean_script: string | null;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          protein_type: string;
          region: string;
          slug: string;
          spice_level: number;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method: string;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          has_banchan?: boolean;
          id: string;
          image_url?: string | null;
          is_dairy_free?: boolean;
          is_fermented?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_nut_free?: boolean;
          is_pescatarian?: boolean;
          is_public?: boolean;
          is_spicy?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          korean_name: string;
          korean_script?: string | null;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type: string;
          region: string;
          slug: string;
          spice_level?: number;
          status: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          has_banchan?: boolean;
          id?: string;
          image_url?: string | null;
          is_dairy_free?: boolean;
          is_fermented?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_nut_free?: boolean;
          is_pescatarian?: boolean;
          is_public?: boolean;
          is_spicy?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          korean_name?: string;
          korean_script?: string | null;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string;
          region?: string;
          slug?: string;
          spice_level?: number;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      koreanmex: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      languages: {
        Row: {
          code: string;
          created_at: string | null;
          direction: string;
          is_active: boolean;
          name_en: string;
          name_native: string;
          updated_at: string | null;
        };
        Insert: {
          code: string;
          created_at?: string | null;
          direction?: string;
          is_active?: boolean;
          name_en: string;
          name_native: string;
          updated_at?: string | null;
        };
        Update: {
          code?: string;
          created_at?: string | null;
          direction?: string;
          is_active?: boolean;
          name_en?: string;
          name_native?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      lebanese: {
        Row: {
          allergens: string[] | null;
          arabic_name: string | null;
          arabic_script: string | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[] | null;
          is_dairy_free: boolean | null;
          is_festive: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_lenten: boolean | null;
          is_mezze: boolean | null;
          is_nut_free: boolean | null;
          is_pescatarian: boolean | null;
          is_public: boolean;
          is_street_food: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          arabic_name?: string | null;
          arabic_script?: string | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_festive?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_lenten?: boolean | null;
          is_mezze?: boolean | null;
          is_nut_free?: boolean | null;
          is_pescatarian?: boolean | null;
          is_public?: boolean;
          is_street_food?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          arabic_name?: string | null;
          arabic_script?: string | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_festive?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_lenten?: boolean | null;
          is_mezze?: boolean | null;
          is_nut_free?: boolean | null;
          is_pescatarian?: boolean | null;
          is_public?: boolean;
          is_street_food?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      location_ingredient_prices: {
        Row: {
          cost_per_kg: number;
          created_at: string | null;
          currency: string;
          id: string;
          ingredient_id: string | null;
          ingredient_name: string;
          last_purchase_date: string | null;
          location_id: string;
          supplier_name: string | null;
          updated_at: string | null;
        };
        Insert: {
          cost_per_kg: number;
          created_at?: string | null;
          currency?: string;
          id?: string;
          ingredient_id?: string | null;
          ingredient_name: string;
          last_purchase_date?: string | null;
          location_id: string;
          supplier_name?: string | null;
          updated_at?: string | null;
        };
        Update: {
          cost_per_kg?: number;
          created_at?: string | null;
          currency?: string;
          id?: string;
          ingredient_id?: string | null;
          ingredient_name?: string;
          last_purchase_date?: string | null;
          location_id?: string;
          supplier_name?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'location_ingredient_prices_ingredient_id_fkey';
            columns: ['ingredient_id'];
            isOneToOne: false;
            referencedRelation: 'ingredients';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'location_ingredient_prices_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      location_sections: {
        Row: {
          amenities: Json | null;
          code: string;
          color_hex: string | null;
          created_at: string;
          default_covers_per_table: number | null;
          description: string | null;
          display_order: number | null;
          floor_plan_config: Json | null;
          id: string;
          is_active: boolean | null;
          is_reservable: boolean | null;
          location_id: string;
          max_capacity: number;
          name: string;
          name_translations: Json | null;
          section_type: string;
          updated_at: string;
          weather_dependent: boolean | null;
        };
        Insert: {
          amenities?: Json | null;
          code: string;
          color_hex?: string | null;
          created_at?: string;
          default_covers_per_table?: number | null;
          description?: string | null;
          display_order?: number | null;
          floor_plan_config?: Json | null;
          id?: string;
          is_active?: boolean | null;
          is_reservable?: boolean | null;
          location_id: string;
          max_capacity?: number;
          name: string;
          name_translations?: Json | null;
          section_type?: string;
          updated_at?: string;
          weather_dependent?: boolean | null;
        };
        Update: {
          amenities?: Json | null;
          code?: string;
          color_hex?: string | null;
          created_at?: string;
          default_covers_per_table?: number | null;
          description?: string | null;
          display_order?: number | null;
          floor_plan_config?: Json | null;
          id?: string;
          is_active?: boolean | null;
          is_reservable?: boolean | null;
          location_id?: string;
          max_capacity?: number;
          name?: string;
          name_translations?: Json | null;
          section_type?: string;
          updated_at?: string;
          weather_dependent?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'location_sections_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      location_tables: {
        Row: {
          combine_with: Json | null;
          created_at: string;
          display_name: string | null;
          features: Json | null;
          floor_plan_config: Json | null;
          id: string;
          is_active: boolean | null;
          is_combinable: boolean | null;
          is_reservable: boolean | null;
          location_id: string;
          max_capacity: number;
          min_capacity: number;
          notes: string | null;
          optimal_capacity: number;
          priority: number | null;
          section_id: string | null;
          table_number: string;
          table_shape: string | null;
          table_size: string | null;
          updated_at: string;
        };
        Insert: {
          combine_with?: Json | null;
          created_at?: string;
          display_name?: string | null;
          features?: Json | null;
          floor_plan_config?: Json | null;
          id?: string;
          is_active?: boolean | null;
          is_combinable?: boolean | null;
          is_reservable?: boolean | null;
          location_id: string;
          max_capacity?: number;
          min_capacity?: number;
          notes?: string | null;
          optimal_capacity?: number;
          priority?: number | null;
          section_id?: string | null;
          table_number: string;
          table_shape?: string | null;
          table_size?: string | null;
          updated_at?: string;
        };
        Update: {
          combine_with?: Json | null;
          created_at?: string;
          display_name?: string | null;
          features?: Json | null;
          floor_plan_config?: Json | null;
          id?: string;
          is_active?: boolean | null;
          is_combinable?: boolean | null;
          is_reservable?: boolean | null;
          location_id?: string;
          max_capacity?: number;
          min_capacity?: number;
          notes?: string | null;
          optimal_capacity?: number;
          priority?: number | null;
          section_id?: string | null;
          table_number?: string;
          table_shape?: string | null;
          table_size?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'location_tables_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'location_tables_section_id_fkey';
            columns: ['section_id'];
            isOneToOne: false;
            referencedRelation: 'location_sections';
            referencedColumns: ['id'];
          },
        ];
      };
      location_team_settings: {
        Row: {
          allow_anonymous_reviews: boolean;
          allow_staff_reviews: boolean;
          break_policy: Json | null;
          created_at: string | null;
          enable_scheduling: boolean;
          enable_weekly_recognition: boolean;
          id: string;
          location_id: string;
          min_review_length: number | null;
          min_staff_for_scheduling: number | null;
          recognition_reward_type: string | null;
          review_requires_order: boolean;
          show_team_on_menu: boolean;
          team_display_style: string;
          tooltip_benefits_shown: boolean;
          updated_at: string | null;
        };
        Insert: {
          allow_anonymous_reviews?: boolean;
          allow_staff_reviews?: boolean;
          break_policy?: Json | null;
          created_at?: string | null;
          enable_scheduling?: boolean;
          enable_weekly_recognition?: boolean;
          id?: string;
          location_id: string;
          min_review_length?: number | null;
          min_staff_for_scheduling?: number | null;
          recognition_reward_type?: string | null;
          review_requires_order?: boolean;
          show_team_on_menu?: boolean;
          team_display_style?: string;
          tooltip_benefits_shown?: boolean;
          updated_at?: string | null;
        };
        Update: {
          allow_anonymous_reviews?: boolean;
          allow_staff_reviews?: boolean;
          break_policy?: Json | null;
          created_at?: string | null;
          enable_scheduling?: boolean;
          enable_weekly_recognition?: boolean;
          id?: string;
          location_id?: string;
          min_review_length?: number | null;
          min_staff_for_scheduling?: number | null;
          recognition_reward_type?: string | null;
          review_requires_order?: boolean;
          show_team_on_menu?: boolean;
          team_display_style?: string;
          tooltip_benefits_shown?: boolean;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'location_team_settings_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: true;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      location_weather_cache: {
        Row: {
          alerts: Json | null;
          api_calls_today: number | null;
          api_provider: string | null;
          business_impact: Json | null;
          created_at: string | null;
          current_conditions: string | null;
          current_conditions_icon: string | null;
          current_feels_like: number | null;
          current_humidity: number | null;
          current_temp: number | null;
          current_updated_at: string | null;
          current_uv_index: number | null;
          current_visibility: number | null;
          current_wind_direction: string | null;
          current_wind_speed: number | null;
          forecast: Json | null;
          forecast_updated_at: string | null;
          hourly_today: Json | null;
          id: string;
          last_api_call_at: string | null;
          latitude: number | null;
          location_id: string;
          longitude: number | null;
          timezone: string | null;
          updated_at: string | null;
        };
        Insert: {
          alerts?: Json | null;
          api_calls_today?: number | null;
          api_provider?: string | null;
          business_impact?: Json | null;
          created_at?: string | null;
          current_conditions?: string | null;
          current_conditions_icon?: string | null;
          current_feels_like?: number | null;
          current_humidity?: number | null;
          current_temp?: number | null;
          current_updated_at?: string | null;
          current_uv_index?: number | null;
          current_visibility?: number | null;
          current_wind_direction?: string | null;
          current_wind_speed?: number | null;
          forecast?: Json | null;
          forecast_updated_at?: string | null;
          hourly_today?: Json | null;
          id?: string;
          last_api_call_at?: string | null;
          latitude?: number | null;
          location_id: string;
          longitude?: number | null;
          timezone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          alerts?: Json | null;
          api_calls_today?: number | null;
          api_provider?: string | null;
          business_impact?: Json | null;
          created_at?: string | null;
          current_conditions?: string | null;
          current_conditions_icon?: string | null;
          current_feels_like?: number | null;
          current_humidity?: number | null;
          current_temp?: number | null;
          current_updated_at?: string | null;
          current_uv_index?: number | null;
          current_visibility?: number | null;
          current_wind_direction?: string | null;
          current_wind_speed?: number | null;
          forecast?: Json | null;
          forecast_updated_at?: string | null;
          hourly_today?: Json | null;
          id?: string;
          last_api_call_at?: string | null;
          latitude?: number | null;
          location_id?: string;
          longitude?: number | null;
          timezone?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'location_weather_cache_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: true;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      locations: {
        Row: {
          address: string | null;
          brand_id: string;
          city: string | null;
          country_code: string;
          created_at: string;
          currency_code: string;
          custom_domain: string | null;
          description: string | null;
          domain_verified: boolean | null;
          domain_verified_at: string | null;
          email: string | null;
          enabled_languages: string[];
          has_ac: boolean | null;
          has_outdoor_seating: boolean | null;
          id: string;
          is_active: boolean;
          latitude: number | null;
          longitude: number | null;
          menu_id: string | null;
          name: string;
          operating_hours: Json | null;
          phone: string | null;
          postal_code: string | null;
          primary_language: string;
          service_style: string | null;
          slug: string;
          timezone: string | null;
          updated_at: string;
          venue_type: string | null;
        };
        Insert: {
          address?: string | null;
          brand_id: string;
          city?: string | null;
          country_code: string;
          created_at?: string;
          currency_code?: string;
          custom_domain?: string | null;
          description?: string | null;
          domain_verified?: boolean | null;
          domain_verified_at?: string | null;
          email?: string | null;
          enabled_languages?: string[];
          has_ac?: boolean | null;
          has_outdoor_seating?: boolean | null;
          id?: string;
          is_active?: boolean;
          latitude?: number | null;
          longitude?: number | null;
          menu_id?: string | null;
          name: string;
          operating_hours?: Json | null;
          phone?: string | null;
          postal_code?: string | null;
          primary_language?: string;
          service_style?: string | null;
          slug: string;
          timezone?: string | null;
          updated_at?: string;
          venue_type?: string | null;
        };
        Update: {
          address?: string | null;
          brand_id?: string;
          city?: string | null;
          country_code?: string;
          created_at?: string;
          currency_code?: string;
          custom_domain?: string | null;
          description?: string | null;
          domain_verified?: boolean | null;
          domain_verified_at?: string | null;
          email?: string | null;
          enabled_languages?: string[];
          has_ac?: boolean | null;
          has_outdoor_seating?: boolean | null;
          id?: string;
          is_active?: boolean;
          latitude?: number | null;
          longitude?: number | null;
          menu_id?: string | null;
          name?: string;
          operating_hours?: Json | null;
          phone?: string | null;
          postal_code?: string | null;
          primary_language?: string;
          service_style?: string | null;
          slug?: string;
          timezone?: string | null;
          updated_at?: string;
          venue_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'locations_brand_id_fkey';
            columns: ['brand_id'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'locations_country_code_fkey';
            columns: ['country_code'];
            isOneToOne: false;
            referencedRelation: 'countries';
            referencedColumns: ['code'];
          },
        ];
      };
      login_streaks: {
        Row: {
          account_id: string;
          current_streak: number;
          last_login_date: string | null;
          longest_streak: number;
          updated_at: string | null;
        };
        Insert: {
          account_id: string;
          current_streak?: number;
          last_login_date?: string | null;
          longest_streak?: number;
          updated_at?: string | null;
        };
        Update: {
          account_id?: string;
          current_streak?: number;
          last_login_date?: string | null;
          longest_streak?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'login_streaks_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'login_streaks_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'login_streaks_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'login_streaks_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'login_streaks_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'login_streaks_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'login_streaks_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      loyalty_config: {
        Row: {
          action_type: string;
          created_at: string | null;
          description: string | null;
          is_active: boolean | null;
          points: number;
          points_type: string;
          updated_at: string | null;
        };
        Insert: {
          action_type: string;
          created_at?: string | null;
          description?: string | null;
          is_active?: boolean | null;
          points: number;
          points_type?: string;
          updated_at?: string | null;
        };
        Update: {
          action_type?: string;
          created_at?: string | null;
          description?: string | null;
          is_active?: boolean | null;
          points?: number;
          points_type?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      loyalty_rewards: {
        Row: {
          available_from: string | null;
          available_until: string | null;
          category: string | null;
          code: string;
          created_at: string;
          created_by: string | null;
          current_redemptions: number;
          description: string | null;
          id: string;
          image_url: string | null;
          is_active: boolean;
          is_featured: boolean;
          max_redemptions_per_user: number | null;
          max_redemptions_total: number | null;
          min_tier: string | null;
          name: string;
          points_required: number;
          reward_type: string;
          reward_value: Json;
          sort_order: number | null;
          target_audience: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          available_from?: string | null;
          available_until?: string | null;
          category?: string | null;
          code: string;
          created_at?: string;
          created_by?: string | null;
          current_redemptions?: number;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          max_redemptions_per_user?: number | null;
          max_redemptions_total?: number | null;
          min_tier?: string | null;
          name: string;
          points_required: number;
          reward_type: string;
          reward_value?: Json;
          sort_order?: number | null;
          target_audience?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          available_from?: string | null;
          available_until?: string | null;
          category?: string | null;
          code?: string;
          created_at?: string;
          created_by?: string | null;
          current_redemptions?: number;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          max_redemptions_per_user?: number | null;
          max_redemptions_total?: number | null;
          min_tier?: string | null;
          name?: string;
          points_required?: number;
          reward_type?: string;
          reward_value?: Json;
          sort_order?: number | null;
          target_audience?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      loyalty_tiers: {
        Row: {
          badge_url: string | null;
          benefits: Json;
          color_hex: string | null;
          created_at: string;
          created_by: string | null;
          display_name: string;
          id: string;
          is_active: boolean;
          points_threshold: number;
          tier_name: string;
          tier_order: number;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          badge_url?: string | null;
          benefits?: Json;
          color_hex?: string | null;
          created_at?: string;
          created_by?: string | null;
          display_name: string;
          id?: string;
          is_active?: boolean;
          points_threshold: number;
          tier_name: string;
          tier_order: number;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          badge_url?: string | null;
          benefits?: Json;
          color_hex?: string | null;
          created_at?: string;
          created_by?: string | null;
          display_name?: string;
          id?: string;
          is_active?: boolean;
          points_threshold?: number;
          tier_name?: string;
          tier_order?: number;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'loyalty_tiers_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_tiers_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      loyalty_transactions: {
        Row: {
          account_id: string;
          balance_after: number;
          created_at: string;
          description: string | null;
          id: string;
          metadata: Json | null;
          points_change: number;
          points_type: string;
          reference_id: string | null;
          reference_type: string | null;
          transaction_type: string;
        };
        Insert: {
          account_id: string;
          balance_after: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          metadata?: Json | null;
          points_change: number;
          points_type: string;
          reference_id?: string | null;
          reference_type?: string | null;
          transaction_type: string;
        };
        Update: {
          account_id?: string;
          balance_after?: number;
          created_at?: string;
          description?: string | null;
          id?: string;
          metadata?: Json | null;
          points_change?: number;
          points_type?: string;
          reference_id?: string | null;
          reference_type?: string | null;
          transaction_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      malaysian: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          local_name: string | null;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          local_name?: string | null;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          local_name?: string | null;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      manager_evaluations: {
        Row: {
          acknowledged_at: string | null;
          areas_to_improve: string[] | null;
          created_at: string | null;
          evaluator_id: string;
          goals_next_period: string[] | null;
          id: string;
          location_id: string;
          manager_notes: string | null;
          overall_rating: number;
          period_end: string;
          period_start: string;
          score_customer_service: number | null;
          score_initiative: number | null;
          score_punctuality: number | null;
          score_skills: number | null;
          score_teamwork: number | null;
          staff_comments: string | null;
          staff_id: string;
          strengths: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          acknowledged_at?: string | null;
          areas_to_improve?: string[] | null;
          created_at?: string | null;
          evaluator_id: string;
          goals_next_period?: string[] | null;
          id?: string;
          location_id: string;
          manager_notes?: string | null;
          overall_rating: number;
          period_end: string;
          period_start: string;
          score_customer_service?: number | null;
          score_initiative?: number | null;
          score_punctuality?: number | null;
          score_skills?: number | null;
          score_teamwork?: number | null;
          staff_comments?: string | null;
          staff_id: string;
          strengths?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          acknowledged_at?: string | null;
          areas_to_improve?: string[] | null;
          created_at?: string | null;
          evaluator_id?: string;
          goals_next_period?: string[] | null;
          id?: string;
          location_id?: string;
          manager_notes?: string | null;
          overall_rating?: number;
          period_end?: string;
          period_start?: string;
          score_customer_service?: number | null;
          score_initiative?: number | null;
          score_punctuality?: number | null;
          score_skills?: number | null;
          score_teamwork?: number | null;
          staff_comments?: string | null;
          staff_id?: string;
          strengths?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'manager_evaluations_evaluator_id_fkey';
            columns: ['evaluator_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'manager_evaluations_evaluator_id_fkey';
            columns: ['evaluator_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'manager_evaluations_evaluator_id_fkey';
            columns: ['evaluator_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'manager_evaluations_evaluator_id_fkey';
            columns: ['evaluator_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'manager_evaluations_evaluator_id_fkey';
            columns: ['evaluator_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'manager_evaluations_evaluator_id_fkey';
            columns: ['evaluator_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'manager_evaluations_evaluator_id_fkey';
            columns: ['evaluator_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'manager_evaluations_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'manager_evaluations_staff_id_fkey';
            columns: ['staff_id'];
            isOneToOne: false;
            referencedRelation: 'staff_profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      menu_categories: {
        Row: {
          available_from: string | null;
          available_until: string | null;
          color: string | null;
          created_at: string | null;
          description_multilang: Json | null;
          display_order: number | null;
          icon: string | null;
          id: string;
          image_url: string | null;
          is_active: boolean | null;
          menu_type: string | null;
          merchant_id: string;
          name_multilang: Json;
          parent_category_id: string | null;
          quick_prompts: Json | null;
          slug: string;
          sort_order: number | null;
          tags: string[] | null;
          temperature: string | null;
          temperature_icon: string | null;
          updated_at: string | null;
          visible_days: number[] | null;
        };
        Insert: {
          available_from?: string | null;
          available_until?: string | null;
          color?: string | null;
          created_at?: string | null;
          description_multilang?: Json | null;
          display_order?: number | null;
          icon?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean | null;
          menu_type?: string | null;
          merchant_id: string;
          name_multilang: Json;
          parent_category_id?: string | null;
          quick_prompts?: Json | null;
          slug: string;
          sort_order?: number | null;
          tags?: string[] | null;
          temperature?: string | null;
          temperature_icon?: string | null;
          updated_at?: string | null;
          visible_days?: number[] | null;
        };
        Update: {
          available_from?: string | null;
          available_until?: string | null;
          color?: string | null;
          created_at?: string | null;
          description_multilang?: Json | null;
          display_order?: number | null;
          icon?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean | null;
          menu_type?: string | null;
          merchant_id?: string;
          name_multilang?: Json;
          parent_category_id?: string | null;
          quick_prompts?: Json | null;
          slug?: string;
          sort_order?: number | null;
          tags?: string[] | null;
          temperature?: string | null;
          temperature_icon?: string | null;
          updated_at?: string | null;
          visible_days?: number[] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_categories_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'menu_categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'menu_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      menu_item_ingredients: {
        Row: {
          created_at: string | null;
          display_order: number | null;
          id: string;
          ingredient_id: string | null;
          is_optional: boolean | null;
          menu_item_id: string;
          quantity_grams: number | null;
        };
        Insert: {
          created_at?: string | null;
          display_order?: number | null;
          id?: string;
          ingredient_id?: string | null;
          is_optional?: boolean | null;
          menu_item_id: string;
          quantity_grams?: number | null;
        };
        Update: {
          created_at?: string | null;
          display_order?: number | null;
          id?: string;
          ingredient_id?: string | null;
          is_optional?: boolean | null;
          menu_item_id?: string;
          quantity_grams?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_item_ingredients_menu_item_id_fkey';
            columns: ['menu_item_id'];
            isOneToOne: false;
            referencedRelation: 'menu_items';
            referencedColumns: ['id'];
          },
        ];
      };
      menu_item_modifier_overrides: {
        Row: {
          created_at: string | null;
          id: string;
          is_available: boolean;
          menu_item_id: string;
          merchant_id: string;
          modifier_id: string;
          price_override: number | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_available?: boolean;
          menu_item_id: string;
          merchant_id: string;
          modifier_id: string;
          price_override?: number | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_available?: boolean;
          menu_item_id?: string;
          merchant_id?: string;
          modifier_id?: string;
          price_override?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_item_modifier_overrides_menu_item_id_fkey';
            columns: ['menu_item_id'];
            isOneToOne: false;
            referencedRelation: 'menu_items';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'menu_item_modifier_overrides_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'menu_item_modifier_overrides_modifier_id_fkey';
            columns: ['modifier_id'];
            isOneToOne: false;
            referencedRelation: 'modifiers';
            referencedColumns: ['id'];
          },
        ];
      };
      menu_item_translations: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          is_machine_translated: boolean | null;
          language_code: string;
          menu_item_id: string;
          name: string;
          translated_by: string | null;
          updated_at: string | null;
          verified_at: string | null;
          verified_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_machine_translated?: boolean | null;
          language_code: string;
          menu_item_id: string;
          name: string;
          translated_by?: string | null;
          updated_at?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_machine_translated?: boolean | null;
          language_code?: string;
          menu_item_id?: string;
          name?: string;
          translated_by?: string | null;
          updated_at?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_item_translations_language_code_fkey';
            columns: ['language_code'];
            isOneToOne: false;
            referencedRelation: 'languages';
            referencedColumns: ['code'];
          },
          {
            foreignKeyName: 'menu_item_translations_menu_item_id_fkey';
            columns: ['menu_item_id'];
            isOneToOne: false;
            referencedRelation: 'menu_items';
            referencedColumns: ['id'];
          },
        ];
      };
      menu_items: {
        Row: {
          allergens: Json | null;
          available_days: number[] | null;
          available_from: string | null;
          available_until: string | null;
          based_on_recipe_id: string | null;
          calories: number | null;
          carbs_g: number | null;
          category_id: string | null;
          compare_at_price: number | null;
          created_at: string | null;
          currency: string | null;
          customizations: Json | null;
          description_multilang: Json | null;
          dietary_flags: Json | null;
          display_order: number | null;
          fat_g: number | null;
          fiber_g: number | null;
          food_cost: number | null;
          food_cost_currency: string | null;
          food_cost_updated_at: string | null;
          gallery_urls: string[] | null;
          id: string;
          image_url: string | null;
          intolerances: Json | null;
          inventory_count: number | null;
          is_active: boolean | null;
          is_available: boolean | null;
          is_featured: boolean | null;
          is_new: boolean | null;
          low_stock_threshold: number | null;
          merchant_id: string;
          name_multilang: Json;
          new_until: string | null;
          nutrition_info: Json | null;
          price: number;
          profit_margin: number | null;
          protein_g: number | null;
          safety_data_source: string | null;
          seo_description: string | null;
          seo_title: string | null;
          short_description_multilang: Json | null;
          slug: string;
          spice_level: number | null;
          tags: string[] | null;
          thumbnail_url: string | null;
          total_orders: number | null;
          track_inventory: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: Json | null;
          available_days?: number[] | null;
          available_from?: string | null;
          available_until?: string | null;
          based_on_recipe_id?: string | null;
          calories?: number | null;
          carbs_g?: number | null;
          category_id?: string | null;
          compare_at_price?: number | null;
          created_at?: string | null;
          currency?: string | null;
          customizations?: Json | null;
          description_multilang?: Json | null;
          dietary_flags?: Json | null;
          display_order?: number | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          food_cost?: number | null;
          food_cost_currency?: string | null;
          food_cost_updated_at?: string | null;
          gallery_urls?: string[] | null;
          id?: string;
          image_url?: string | null;
          intolerances?: Json | null;
          inventory_count?: number | null;
          is_active?: boolean | null;
          is_available?: boolean | null;
          is_featured?: boolean | null;
          is_new?: boolean | null;
          low_stock_threshold?: number | null;
          merchant_id: string;
          name_multilang: Json;
          new_until?: string | null;
          nutrition_info?: Json | null;
          price: number;
          profit_margin?: number | null;
          protein_g?: number | null;
          safety_data_source?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          short_description_multilang?: Json | null;
          slug: string;
          spice_level?: number | null;
          tags?: string[] | null;
          thumbnail_url?: string | null;
          total_orders?: number | null;
          track_inventory?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: Json | null;
          available_days?: number[] | null;
          available_from?: string | null;
          available_until?: string | null;
          based_on_recipe_id?: string | null;
          calories?: number | null;
          carbs_g?: number | null;
          category_id?: string | null;
          compare_at_price?: number | null;
          created_at?: string | null;
          currency?: string | null;
          customizations?: Json | null;
          description_multilang?: Json | null;
          dietary_flags?: Json | null;
          display_order?: number | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          food_cost?: number | null;
          food_cost_currency?: string | null;
          food_cost_updated_at?: string | null;
          gallery_urls?: string[] | null;
          id?: string;
          image_url?: string | null;
          intolerances?: Json | null;
          inventory_count?: number | null;
          is_active?: boolean | null;
          is_available?: boolean | null;
          is_featured?: boolean | null;
          is_new?: boolean | null;
          low_stock_threshold?: number | null;
          merchant_id?: string;
          name_multilang?: Json;
          new_until?: string | null;
          nutrition_info?: Json | null;
          price?: number;
          profit_margin?: number | null;
          protein_g?: number | null;
          safety_data_source?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          short_description_multilang?: Json | null;
          slug?: string;
          spice_level?: number | null;
          tags?: string[] | null;
          thumbnail_url?: string | null;
          total_orders?: number | null;
          track_inventory?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_items_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'menu_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'menu_items_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_accommodation_outreach: {
        Row: {
          accommodation_id: string;
          commission_percent: number | null;
          created_at: string | null;
          discount_percent: number | null;
          first_contact_at: string | null;
          fixed_price_menu: number | null;
          guests_referred: number | null;
          id: string;
          last_contact_at: string | null;
          merchant_id: string;
          notes: string | null;
          partnership_end_date: string | null;
          partnership_start_date: string | null;
          partnership_type: string | null;
          response_at: string | null;
          revenue_generated: number | null;
          status: string | null;
          updated_at: string | null;
        };
        Insert: {
          accommodation_id: string;
          commission_percent?: number | null;
          created_at?: string | null;
          discount_percent?: number | null;
          first_contact_at?: string | null;
          fixed_price_menu?: number | null;
          guests_referred?: number | null;
          id?: string;
          last_contact_at?: string | null;
          merchant_id: string;
          notes?: string | null;
          partnership_end_date?: string | null;
          partnership_start_date?: string | null;
          partnership_type?: string | null;
          response_at?: string | null;
          revenue_generated?: number | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Update: {
          accommodation_id?: string;
          commission_percent?: number | null;
          created_at?: string | null;
          discount_percent?: number | null;
          first_contact_at?: string | null;
          fixed_price_menu?: number | null;
          guests_referred?: number | null;
          id?: string;
          last_contact_at?: string | null;
          merchant_id?: string;
          notes?: string | null;
          partnership_end_date?: string | null;
          partnership_start_date?: string | null;
          partnership_type?: string | null;
          response_at?: string | null;
          revenue_generated?: number | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_accommodation_outreach_accommodation_id_fkey';
            columns: ['accommodation_id'];
            isOneToOne: false;
            referencedRelation: 'accommodation_partners';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_accommodation_outreach_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_custom_holidays: {
        Row: {
          created_at: string;
          date: string;
          id: string;
          impact_level: string;
          is_closed: boolean;
          is_recurring: boolean;
          merchant_id: string;
          name: string;
          notes: string | null;
          special_hours: string | null;
          type: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          date: string;
          id?: string;
          impact_level?: string;
          is_closed?: boolean;
          is_recurring?: boolean;
          merchant_id: string;
          name: string;
          notes?: string | null;
          special_hours?: string | null;
          type?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          id?: string;
          impact_level?: string;
          is_closed?: boolean;
          is_recurring?: boolean;
          merchant_id?: string;
          name?: string;
          notes?: string | null;
          special_hours?: string | null;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_custom_holidays_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_followers: {
        Row: {
          account_id: string;
          archive_reason: string | null;
          archived_at: string | null;
          created_at: string;
          followed_at: string;
          home_city: string | null;
          home_country: string | null;
          id: string;
          is_active: boolean;
          merchant_id: string;
          notification_paused_until: string | null;
          notification_status: string | null;
          post_trip_preference: string | null;
          referral_code: string | null;
          source: string | null;
          trip_end_date: string | null;
          unfollowed_at: string | null;
          updated_at: string;
          visit_count: number | null;
          visitor_type: string | null;
        };
        Insert: {
          account_id: string;
          archive_reason?: string | null;
          archived_at?: string | null;
          created_at?: string;
          followed_at?: string;
          home_city?: string | null;
          home_country?: string | null;
          id?: string;
          is_active?: boolean;
          merchant_id: string;
          notification_paused_until?: string | null;
          notification_status?: string | null;
          post_trip_preference?: string | null;
          referral_code?: string | null;
          source?: string | null;
          trip_end_date?: string | null;
          unfollowed_at?: string | null;
          updated_at?: string;
          visit_count?: number | null;
          visitor_type?: string | null;
        };
        Update: {
          account_id?: string;
          archive_reason?: string | null;
          archived_at?: string | null;
          created_at?: string;
          followed_at?: string;
          home_city?: string | null;
          home_country?: string | null;
          id?: string;
          is_active?: boolean;
          merchant_id?: string;
          notification_paused_until?: string | null;
          notification_status?: string | null;
          post_trip_preference?: string | null;
          referral_code?: string | null;
          source?: string | null;
          trip_end_date?: string | null;
          unfollowed_at?: string | null;
          updated_at?: string;
          visit_count?: number | null;
          visitor_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_followers_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_followers_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_followers_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'merchant_followers_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'merchant_followers_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'merchant_followers_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'merchant_followers_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'merchant_followers_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_holiday_overrides: {
        Row: {
          created_at: string;
          custom_impact_level: string | null;
          custom_notes: string | null;
          expected_revenue_change: number | null;
          expected_traffic_change: number | null;
          holiday_id: string;
          id: string;
          is_closed: boolean | null;
          merchant_id: string;
          special_hours: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          custom_impact_level?: string | null;
          custom_notes?: string | null;
          expected_revenue_change?: number | null;
          expected_traffic_change?: number | null;
          holiday_id: string;
          id?: string;
          is_closed?: boolean | null;
          merchant_id: string;
          special_hours?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          custom_impact_level?: string | null;
          custom_notes?: string | null;
          expected_revenue_change?: number | null;
          expected_traffic_change?: number | null;
          holiday_id?: string;
          id?: string;
          is_closed?: boolean | null;
          merchant_id?: string;
          special_hours?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_holiday_overrides_holiday_id_fkey';
            columns: ['holiday_id'];
            isOneToOne: false;
            referencedRelation: 'holidays';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_holiday_overrides_holiday_id_fkey';
            columns: ['holiday_id'];
            isOneToOne: false;
            referencedRelation: 'upcoming_holidays';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_holiday_overrides_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_office_outreach: {
        Row: {
          ai_reasoning: string | null;
          ai_recommendation: string | null;
          ai_score: number | null;
          contact_method: string | null;
          contact_person: string | null;
          contract_signed_at: string | null;
          created_at: string | null;
          employees_enrolled: number | null;
          first_contact_at: string | null;
          id: string;
          last_contact_at: string | null;
          meeting_date: string | null;
          meeting_notes: string | null;
          merchant_id: string;
          monthly_revenue: number | null;
          monthly_visits: number | null;
          notes: string | null;
          office_id: string;
          proposed_benefit_description: string | null;
          proposed_benefit_type: string | null;
          proposed_benefit_value: number | null;
          status: string;
          updated_at: string | null;
        };
        Insert: {
          ai_reasoning?: string | null;
          ai_recommendation?: string | null;
          ai_score?: number | null;
          contact_method?: string | null;
          contact_person?: string | null;
          contract_signed_at?: string | null;
          created_at?: string | null;
          employees_enrolled?: number | null;
          first_contact_at?: string | null;
          id?: string;
          last_contact_at?: string | null;
          meeting_date?: string | null;
          meeting_notes?: string | null;
          merchant_id: string;
          monthly_revenue?: number | null;
          monthly_visits?: number | null;
          notes?: string | null;
          office_id: string;
          proposed_benefit_description?: string | null;
          proposed_benefit_type?: string | null;
          proposed_benefit_value?: number | null;
          status?: string;
          updated_at?: string | null;
        };
        Update: {
          ai_reasoning?: string | null;
          ai_recommendation?: string | null;
          ai_score?: number | null;
          contact_method?: string | null;
          contact_person?: string | null;
          contract_signed_at?: string | null;
          created_at?: string | null;
          employees_enrolled?: number | null;
          first_contact_at?: string | null;
          id?: string;
          last_contact_at?: string | null;
          meeting_date?: string | null;
          meeting_notes?: string | null;
          merchant_id?: string;
          monthly_revenue?: number | null;
          monthly_visits?: number | null;
          notes?: string | null;
          office_id?: string;
          proposed_benefit_description?: string | null;
          proposed_benefit_type?: string | null;
          proposed_benefit_value?: number | null;
          status?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_office_outreach_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_office_outreach_office_id_fkey';
            columns: ['office_id'];
            isOneToOne: false;
            referencedRelation: 'office_partners';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_onboarding_sessions: {
        Row: {
          account_id: string | null;
          billing_cycle: string | null;
          brand_logo_url: string | null;
          brand_name: string | null;
          business_name: string | null;
          business_type: string | null;
          city: string | null;
          completed_at: string | null;
          country_code: string | null;
          created_at: string;
          created_brand_id: string | null;
          created_location_id: string | null;
          created_organization_id: string | null;
          current_step: number;
          email: string;
          expires_at: string | null;
          first_name: string | null;
          id: string;
          is_completed: boolean;
          last_name: string | null;
          location_address: string | null;
          location_currency: string | null;
          location_languages: string[] | null;
          location_name: string | null;
          phone: string | null;
          primary_color: string | null;
          referral_code_used: string | null;
          selected_plan: string | null;
          session_token: string;
          trial_ends_at: string | null;
          updated_at: string;
          utm_campaign: string | null;
          utm_medium: string | null;
          utm_source: string | null;
        };
        Insert: {
          account_id?: string | null;
          billing_cycle?: string | null;
          brand_logo_url?: string | null;
          brand_name?: string | null;
          business_name?: string | null;
          business_type?: string | null;
          city?: string | null;
          completed_at?: string | null;
          country_code?: string | null;
          created_at?: string;
          created_brand_id?: string | null;
          created_location_id?: string | null;
          created_organization_id?: string | null;
          current_step?: number;
          email: string;
          expires_at?: string | null;
          first_name?: string | null;
          id?: string;
          is_completed?: boolean;
          last_name?: string | null;
          location_address?: string | null;
          location_currency?: string | null;
          location_languages?: string[] | null;
          location_name?: string | null;
          phone?: string | null;
          primary_color?: string | null;
          referral_code_used?: string | null;
          selected_plan?: string | null;
          session_token?: string;
          trial_ends_at?: string | null;
          updated_at?: string;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Update: {
          account_id?: string | null;
          billing_cycle?: string | null;
          brand_logo_url?: string | null;
          brand_name?: string | null;
          business_name?: string | null;
          business_type?: string | null;
          city?: string | null;
          completed_at?: string | null;
          country_code?: string | null;
          created_at?: string;
          created_brand_id?: string | null;
          created_location_id?: string | null;
          created_organization_id?: string | null;
          current_step?: number;
          email?: string;
          expires_at?: string | null;
          first_name?: string | null;
          id?: string;
          is_completed?: boolean;
          last_name?: string | null;
          location_address?: string | null;
          location_currency?: string | null;
          location_languages?: string[] | null;
          location_name?: string | null;
          phone?: string | null;
          primary_color?: string | null;
          referral_code_used?: string | null;
          selected_plan?: string | null;
          session_token?: string;
          trial_ends_at?: string | null;
          updated_at?: string;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_onboarding_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_onboarding_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_onboarding_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'merchant_onboarding_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'merchant_onboarding_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'merchant_onboarding_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'merchant_onboarding_sessions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'merchant_onboarding_sessions_created_brand_id_fkey';
            columns: ['created_brand_id'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_onboarding_sessions_created_location_id_fkey';
            columns: ['created_location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_onboarding_sessions_created_organization_id_fkey';
            columns: ['created_organization_id'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_payment_settings: {
        Row: {
          apple_pay_enabled: boolean | null;
          created_at: string;
          crypto_auto_convert_to_fiat: boolean | null;
          crypto_enabled: boolean | null;
          crypto_gateway_api_key: string | null;
          crypto_gateway_enabled: boolean | null;
          crypto_gateway_provider: string | null;
          crypto_payment_timeout_minutes: number | null;
          crypto_price_buffer_percent: number | null;
          crypto_price_display_unit: string | null;
          crypto_show_prices_in_menu: boolean | null;
          crypto_wallets: Json | null;
          google_pay_enabled: boolean | null;
          id: string;
          merchant_id: string;
          momo_enabled: boolean | null;
          momo_phone: string | null;
          paypal_client_id: string | null;
          paypal_enabled: boolean | null;
          paypal_mode: string | null;
          samsung_pay_enabled: boolean | null;
          stripe_account_id: string | null;
          stripe_enabled: boolean | null;
          stripe_public_key: string | null;
          updated_at: string;
          vietqr_account_name: string | null;
          vietqr_account_number: string | null;
          vietqr_bank_code: string | null;
          vietqr_enabled: boolean | null;
          zalopay_app_id: string | null;
          zalopay_enabled: boolean | null;
        };
        Insert: {
          apple_pay_enabled?: boolean | null;
          created_at?: string;
          crypto_auto_convert_to_fiat?: boolean | null;
          crypto_enabled?: boolean | null;
          crypto_gateway_api_key?: string | null;
          crypto_gateway_enabled?: boolean | null;
          crypto_gateway_provider?: string | null;
          crypto_payment_timeout_minutes?: number | null;
          crypto_price_buffer_percent?: number | null;
          crypto_price_display_unit?: string | null;
          crypto_show_prices_in_menu?: boolean | null;
          crypto_wallets?: Json | null;
          google_pay_enabled?: boolean | null;
          id?: string;
          merchant_id: string;
          momo_enabled?: boolean | null;
          momo_phone?: string | null;
          paypal_client_id?: string | null;
          paypal_enabled?: boolean | null;
          paypal_mode?: string | null;
          samsung_pay_enabled?: boolean | null;
          stripe_account_id?: string | null;
          stripe_enabled?: boolean | null;
          stripe_public_key?: string | null;
          updated_at?: string;
          vietqr_account_name?: string | null;
          vietqr_account_number?: string | null;
          vietqr_bank_code?: string | null;
          vietqr_enabled?: boolean | null;
          zalopay_app_id?: string | null;
          zalopay_enabled?: boolean | null;
        };
        Update: {
          apple_pay_enabled?: boolean | null;
          created_at?: string;
          crypto_auto_convert_to_fiat?: boolean | null;
          crypto_enabled?: boolean | null;
          crypto_gateway_api_key?: string | null;
          crypto_gateway_enabled?: boolean | null;
          crypto_gateway_provider?: string | null;
          crypto_payment_timeout_minutes?: number | null;
          crypto_price_buffer_percent?: number | null;
          crypto_price_display_unit?: string | null;
          crypto_show_prices_in_menu?: boolean | null;
          crypto_wallets?: Json | null;
          google_pay_enabled?: boolean | null;
          id?: string;
          merchant_id?: string;
          momo_enabled?: boolean | null;
          momo_phone?: string | null;
          paypal_client_id?: string | null;
          paypal_enabled?: boolean | null;
          paypal_mode?: string | null;
          samsung_pay_enabled?: boolean | null;
          stripe_account_id?: string | null;
          stripe_enabled?: boolean | null;
          stripe_public_key?: string | null;
          updated_at?: string;
          vietqr_account_name?: string | null;
          vietqr_account_number?: string | null;
          vietqr_bank_code?: string | null;
          vietqr_enabled?: boolean | null;
          zalopay_app_id?: string | null;
          zalopay_enabled?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_payment_settings_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: true;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_social_links: {
        Row: {
          baemin_url: string | null;
          created_at: string | null;
          custom_links: Json | null;
          deliveroo_url: string | null;
          dianping_url: string | null;
          facebook_url: string | null;
          foodpanda_url: string | null;
          gojek_url: string | null;
          google_business_url: string | null;
          grabfood_url: string | null;
          id: string;
          instagram_handle: string | null;
          kakaotalk_channel: string | null;
          line_id: string | null;
          linkedin_url: string | null;
          merchant_id: string;
          shopeefood_url: string | null;
          tiktok_handle: string | null;
          tripadvisor_url: string | null;
          twitter_handle: string | null;
          ubereats_url: string | null;
          updated_at: string | null;
          wechat_id: string | null;
          xiaohongshu_id: string | null;
          yelp_url: string | null;
          youtube_url: string | null;
          zalo_oa_id: string | null;
        };
        Insert: {
          baemin_url?: string | null;
          created_at?: string | null;
          custom_links?: Json | null;
          deliveroo_url?: string | null;
          dianping_url?: string | null;
          facebook_url?: string | null;
          foodpanda_url?: string | null;
          gojek_url?: string | null;
          google_business_url?: string | null;
          grabfood_url?: string | null;
          id?: string;
          instagram_handle?: string | null;
          kakaotalk_channel?: string | null;
          line_id?: string | null;
          linkedin_url?: string | null;
          merchant_id: string;
          shopeefood_url?: string | null;
          tiktok_handle?: string | null;
          tripadvisor_url?: string | null;
          twitter_handle?: string | null;
          ubereats_url?: string | null;
          updated_at?: string | null;
          wechat_id?: string | null;
          xiaohongshu_id?: string | null;
          yelp_url?: string | null;
          youtube_url?: string | null;
          zalo_oa_id?: string | null;
        };
        Update: {
          baemin_url?: string | null;
          created_at?: string | null;
          custom_links?: Json | null;
          deliveroo_url?: string | null;
          dianping_url?: string | null;
          facebook_url?: string | null;
          foodpanda_url?: string | null;
          gojek_url?: string | null;
          google_business_url?: string | null;
          grabfood_url?: string | null;
          id?: string;
          instagram_handle?: string | null;
          kakaotalk_channel?: string | null;
          line_id?: string | null;
          linkedin_url?: string | null;
          merchant_id?: string;
          shopeefood_url?: string | null;
          tiktok_handle?: string | null;
          tripadvisor_url?: string | null;
          twitter_handle?: string | null;
          ubereats_url?: string | null;
          updated_at?: string | null;
          wechat_id?: string | null;
          xiaohongshu_id?: string | null;
          yelp_url?: string | null;
          youtube_url?: string | null;
          zalo_oa_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_social_links_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: true;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_tour_operator_outreach: {
        Row: {
          bookings_generated: number | null;
          created_at: string | null;
          custom_message: string | null;
          first_contact_at: string | null;
          id: string;
          last_contact_at: string | null;
          merchant_id: string;
          operator_id: string;
          outreach_template_used: string | null;
          partnership_terms: Json | null;
          response_at: string | null;
          revenue_generated: number | null;
          status: string | null;
          updated_at: string | null;
        };
        Insert: {
          bookings_generated?: number | null;
          created_at?: string | null;
          custom_message?: string | null;
          first_contact_at?: string | null;
          id?: string;
          last_contact_at?: string | null;
          merchant_id: string;
          operator_id: string;
          outreach_template_used?: string | null;
          partnership_terms?: Json | null;
          response_at?: string | null;
          revenue_generated?: number | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Update: {
          bookings_generated?: number | null;
          created_at?: string | null;
          custom_message?: string | null;
          first_contact_at?: string | null;
          id?: string;
          last_contact_at?: string | null;
          merchant_id?: string;
          operator_id?: string;
          outreach_template_used?: string | null;
          partnership_terms?: Json | null;
          response_at?: string | null;
          revenue_generated?: number | null;
          status?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_tour_operator_outreach_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_tour_operator_outreach_operator_id_fkey';
            columns: ['operator_id'];
            isOneToOne: false;
            referencedRelation: 'tour_operators';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_tourism_products: {
        Row: {
          available_days: number[] | null;
          available_slots: string[] | null;
          created_at: string | null;
          custom_description: string | null;
          custom_duration: number | null;
          custom_includes: string[] | null;
          custom_max_group: number | null;
          custom_min_group: number | null;
          custom_name: string | null;
          custom_price: number | null;
          id: string;
          is_active: boolean | null;
          max_per_day: number | null;
          merchant_id: string;
          template_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          available_days?: number[] | null;
          available_slots?: string[] | null;
          created_at?: string | null;
          custom_description?: string | null;
          custom_duration?: number | null;
          custom_includes?: string[] | null;
          custom_max_group?: number | null;
          custom_min_group?: number | null;
          custom_name?: string | null;
          custom_price?: number | null;
          id?: string;
          is_active?: boolean | null;
          max_per_day?: number | null;
          merchant_id: string;
          template_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          available_days?: number[] | null;
          available_slots?: string[] | null;
          created_at?: string | null;
          custom_description?: string | null;
          custom_duration?: number | null;
          custom_includes?: string[] | null;
          custom_max_group?: number | null;
          custom_min_group?: number | null;
          custom_name?: string | null;
          custom_price?: number | null;
          id?: string;
          is_active?: boolean | null;
          max_per_day?: number | null;
          merchant_id?: string;
          template_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_tourism_products_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'merchant_tourism_products_template_id_fkey';
            columns: ['template_id'];
            isOneToOne: false;
            referencedRelation: 'tourism_product_templates';
            referencedColumns: ['id'];
          },
        ];
      };
      merchant_users: {
        Row: {
          auth_provider: string | null;
          auth_provider_id: string | null;
          avatar_url: string | null;
          created_at: string | null;
          email: string;
          id: string;
          is_active: boolean | null;
          last_login_at: string | null;
          merchant_id: string;
          name: string | null;
          permissions: Json | null;
          phone: string | null;
          role: string | null;
          updated_at: string | null;
        };
        Insert: {
          auth_provider?: string | null;
          auth_provider_id?: string | null;
          avatar_url?: string | null;
          created_at?: string | null;
          email: string;
          id?: string;
          is_active?: boolean | null;
          last_login_at?: string | null;
          merchant_id: string;
          name?: string | null;
          permissions?: Json | null;
          phone?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Update: {
          auth_provider?: string | null;
          auth_provider_id?: string | null;
          avatar_url?: string | null;
          created_at?: string | null;
          email?: string;
          id?: string;
          is_active?: boolean | null;
          last_login_at?: string | null;
          merchant_id?: string;
          name?: string | null;
          permissions?: Json | null;
          phone?: string | null;
          role?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_users_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      merchants: {
        Row: {
          address: string | null;
          city: string | null;
          country: string | null;
          country_code: string | null;
          cover_image_url: string | null;
          created_at: string | null;
          currency: string | null;
          currency_code: string | null;
          currency_symbol: string | null;
          default_language: string | null;
          description: string | null;
          email: string;
          enabled_languages: string[] | null;
          id: string;
          is_active: boolean | null;
          is_verified: boolean | null;
          logo_url: string | null;
          name: string;
          phone: string | null;
          primary_color: string | null;
          primary_language: string | null;
          secondary_color: string | null;
          slug: string;
          supported_languages: string[] | null;
          tier: string | null;
          tier_expires_at: string | null;
          timezone: string | null;
          updated_at: string | null;
          website: string | null;
          wifi_enabled: boolean | null;
          wifi_password: string | null;
          wifi_security: string | null;
          wifi_ssid: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          country?: string | null;
          country_code?: string | null;
          cover_image_url?: string | null;
          created_at?: string | null;
          currency?: string | null;
          currency_code?: string | null;
          currency_symbol?: string | null;
          default_language?: string | null;
          description?: string | null;
          email: string;
          enabled_languages?: string[] | null;
          id?: string;
          is_active?: boolean | null;
          is_verified?: boolean | null;
          logo_url?: string | null;
          name: string;
          phone?: string | null;
          primary_color?: string | null;
          primary_language?: string | null;
          secondary_color?: string | null;
          slug: string;
          supported_languages?: string[] | null;
          tier?: string | null;
          tier_expires_at?: string | null;
          timezone?: string | null;
          updated_at?: string | null;
          website?: string | null;
          wifi_enabled?: boolean | null;
          wifi_password?: string | null;
          wifi_security?: string | null;
          wifi_ssid?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          country?: string | null;
          country_code?: string | null;
          cover_image_url?: string | null;
          created_at?: string | null;
          currency?: string | null;
          currency_code?: string | null;
          currency_symbol?: string | null;
          default_language?: string | null;
          description?: string | null;
          email?: string;
          enabled_languages?: string[] | null;
          id?: string;
          is_active?: boolean | null;
          is_verified?: boolean | null;
          logo_url?: string | null;
          name?: string;
          phone?: string | null;
          primary_color?: string | null;
          primary_language?: string | null;
          secondary_color?: string | null;
          slug?: string;
          supported_languages?: string[] | null;
          tier?: string | null;
          tier_expires_at?: string | null;
          timezone?: string | null;
          updated_at?: string | null;
          website?: string | null;
          wifi_enabled?: boolean | null;
          wifi_password?: string | null;
          wifi_security?: string | null;
          wifi_ssid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'merchants_country_code_fkey';
            columns: ['country_code'];
            isOneToOne: false;
            referencedRelation: 'countries';
            referencedColumns: ['code'];
          },
          {
            foreignKeyName: 'merchants_primary_language_fkey';
            columns: ['primary_language'];
            isOneToOne: false;
            referencedRelation: 'languages';
            referencedColumns: ['code'];
          },
        ];
      };
      mexican: {
        Row: {
          allergens: string[];
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          heat_source: string | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_kosher: boolean;
          is_nut_free: boolean;
          is_public: boolean;
          is_street_food: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          owner_id: string | null;
          popularity: number;
          protein_g: number | null;
          protein_type: string;
          region: string;
          slug: string;
          spanish_name: string | null;
          spice_level: number;
          status: string;
          tags: string[];
          tortilla_type: string;
          updated_at: string;
        };
        Insert: {
          allergens?: string[];
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          heat_source?: string | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          protein_type?: string;
          region?: string;
          slug: string;
          spanish_name?: string | null;
          spice_level?: number;
          status?: string;
          tags?: string[];
          tortilla_type?: string;
          updated_at?: string;
        };
        Update: {
          allergens?: string[];
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          heat_source?: string | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          protein_type?: string;
          region?: string;
          slug?: string;
          spanish_name?: string | null;
          spice_level?: number;
          status?: string;
          tags?: string[];
          tortilla_type?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      milkshakes: {
        Row: {
          allergens: string[] | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          created_at: string | null;
          description: string;
          fat_g: number | null;
          has_toppings: boolean | null;
          has_whipped_cream: boolean | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_thick: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          origin_country: string | null;
          owner_id: string | null;
          popularity: number | null;
          primary_flavor: string;
          protein_g: number | null;
          serving_size_ml: number;
          serving_style: string;
          slug: string;
          spice_level: number | null;
          status: string;
          sugar_g: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          created_at?: string | null;
          description: string;
          fat_g?: number | null;
          has_toppings?: boolean | null;
          has_whipped_cream?: boolean | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_thick?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          primary_flavor: string;
          protein_g?: number | null;
          serving_size_ml?: number;
          serving_style: string;
          slug: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          fat_g?: number | null;
          has_toppings?: boolean | null;
          has_whipped_cream?: boolean | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_thick?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          primary_flavor?: string;
          protein_g?: number | null;
          serving_size_ml?: number;
          serving_style?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      mocktails: {
        Row: {
          allergens: string[] | null;
          base: string;
          calories_per_serving: number | null;
          category: string;
          created_at: string | null;
          description: string | null;
          flavor_profile: string[] | null;
          garnish: string | null;
          glass_type: string;
          id: string;
          image_url: string | null;
          inspired_by: string | null;
          is_carbonated: boolean | null;
          is_dairy_free: boolean | null;
          is_frozen: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kid_friendly: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          origin_country: string | null;
          owner_id: string | null;
          popularity: number | null;
          serving_size_ml: number;
          slug: string;
          spice_level: number | null;
          status: string;
          sugar_g: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          base: string;
          calories_per_serving?: number | null;
          category: string;
          created_at?: string | null;
          description?: string | null;
          flavor_profile?: string[] | null;
          garnish?: string | null;
          glass_type: string;
          id: string;
          image_url?: string | null;
          inspired_by?: string | null;
          is_carbonated?: boolean | null;
          is_dairy_free?: boolean | null;
          is_frozen?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kid_friendly?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          serving_size_ml: number;
          slug: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          base?: string;
          calories_per_serving?: number | null;
          category?: string;
          created_at?: string | null;
          description?: string | null;
          flavor_profile?: string[] | null;
          garnish?: string | null;
          glass_type?: string;
          id?: string;
          image_url?: string | null;
          inspired_by?: string | null;
          is_carbonated?: boolean | null;
          is_dairy_free?: boolean | null;
          is_frozen?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kid_friendly?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          serving_size_ml?: number;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      modifier_groups: {
        Row: {
          created_at: string | null;
          description_multilang: Json | null;
          display_order: number | null;
          icon: string | null;
          id: string;
          is_active: boolean;
          is_required: boolean;
          max_selections: number | null;
          merchant_id: string;
          min_selections: number | null;
          name_multilang: Json;
          selection_type: string;
          slug: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description_multilang?: Json | null;
          display_order?: number | null;
          icon?: string | null;
          id?: string;
          is_active?: boolean;
          is_required?: boolean;
          max_selections?: number | null;
          merchant_id: string;
          min_selections?: number | null;
          name_multilang?: Json;
          selection_type?: string;
          slug: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description_multilang?: Json | null;
          display_order?: number | null;
          icon?: string | null;
          id?: string;
          is_active?: boolean;
          is_required?: boolean;
          max_selections?: number | null;
          merchant_id?: string;
          min_selections?: number | null;
          name_multilang?: Json;
          selection_type?: string;
          slug?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'modifier_groups_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      modifiers: {
        Row: {
          allergens_added: string[] | null;
          calories_adjustment: number | null;
          color: string | null;
          created_at: string | null;
          description_multilang: Json | null;
          display_order: number | null;
          group_id: string;
          icon: string | null;
          id: string;
          is_active: boolean;
          is_available: boolean;
          is_default: boolean;
          merchant_id: string;
          name_multilang: Json;
          price_adjustment: number;
          price_type: string;
          slug: string;
          updated_at: string | null;
        };
        Insert: {
          allergens_added?: string[] | null;
          calories_adjustment?: number | null;
          color?: string | null;
          created_at?: string | null;
          description_multilang?: Json | null;
          display_order?: number | null;
          group_id: string;
          icon?: string | null;
          id?: string;
          is_active?: boolean;
          is_available?: boolean;
          is_default?: boolean;
          merchant_id: string;
          name_multilang?: Json;
          price_adjustment?: number;
          price_type?: string;
          slug: string;
          updated_at?: string | null;
        };
        Update: {
          allergens_added?: string[] | null;
          calories_adjustment?: number | null;
          color?: string | null;
          created_at?: string | null;
          description_multilang?: Json | null;
          display_order?: number | null;
          group_id?: string;
          icon?: string | null;
          id?: string;
          is_active?: boolean;
          is_available?: boolean;
          is_default?: boolean;
          merchant_id?: string;
          name_multilang?: Json;
          price_adjustment?: number;
          price_type?: string;
          slug?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'modifiers_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'modifier_groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'modifiers_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      moroccan: {
        Row: {
          allergens: string[] | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          fiber_g: number | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          origin_region: string | null;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          slug: string;
          sodium_mg: number | null;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          origin_region?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          slug: string;
          sodium_mg?: number | null;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          origin_region?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          slug?: string;
          sodium_mg?: number | null;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      nigerian: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          id: string;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      nikkei: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      notification_channel_preferences: {
        Row: {
          account_id: string;
          created_at: string | null;
          email_enabled: boolean | null;
          id: string;
          line_enabled: boolean | null;
          line_user_id: string | null;
          merchant_id: string | null;
          preferred_locale: string | null;
          push_enabled: boolean | null;
          quiet_hours_end: string | null;
          quiet_hours_start: string | null;
          sms_enabled: boolean | null;
          telegram_chat_id: string | null;
          telegram_enabled: boolean | null;
          updated_at: string | null;
          whatsapp_enabled: boolean | null;
          whatsapp_phone: string | null;
          zalo_enabled: boolean | null;
          zalo_user_id: string | null;
        };
        Insert: {
          account_id: string;
          created_at?: string | null;
          email_enabled?: boolean | null;
          id?: string;
          line_enabled?: boolean | null;
          line_user_id?: string | null;
          merchant_id?: string | null;
          preferred_locale?: string | null;
          push_enabled?: boolean | null;
          quiet_hours_end?: string | null;
          quiet_hours_start?: string | null;
          sms_enabled?: boolean | null;
          telegram_chat_id?: string | null;
          telegram_enabled?: boolean | null;
          updated_at?: string | null;
          whatsapp_enabled?: boolean | null;
          whatsapp_phone?: string | null;
          zalo_enabled?: boolean | null;
          zalo_user_id?: string | null;
        };
        Update: {
          account_id?: string;
          created_at?: string | null;
          email_enabled?: boolean | null;
          id?: string;
          line_enabled?: boolean | null;
          line_user_id?: string | null;
          merchant_id?: string | null;
          preferred_locale?: string | null;
          push_enabled?: boolean | null;
          quiet_hours_end?: string | null;
          quiet_hours_start?: string | null;
          sms_enabled?: boolean | null;
          telegram_chat_id?: string | null;
          telegram_enabled?: boolean | null;
          updated_at?: string | null;
          whatsapp_enabled?: boolean | null;
          whatsapp_phone?: string | null;
          zalo_enabled?: boolean | null;
          zalo_user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'notification_channel_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_channel_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_channel_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_channel_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_channel_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_channel_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_channel_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_channel_preferences_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      notification_log: {
        Row: {
          account_id: string;
          body: string | null;
          category: string;
          created_at: string;
          data: Json | null;
          delivered_at: string | null;
          error_message: string | null;
          id: string;
          notification_type: string;
          read_at: string | null;
          reference_id: string | null;
          reference_type: string | null;
          sent_at: string | null;
          status: string | null;
          title: string;
        };
        Insert: {
          account_id: string;
          body?: string | null;
          category: string;
          created_at?: string;
          data?: Json | null;
          delivered_at?: string | null;
          error_message?: string | null;
          id?: string;
          notification_type: string;
          read_at?: string | null;
          reference_id?: string | null;
          reference_type?: string | null;
          sent_at?: string | null;
          status?: string | null;
          title: string;
        };
        Update: {
          account_id?: string;
          body?: string | null;
          category?: string;
          created_at?: string;
          data?: Json | null;
          delivered_at?: string | null;
          error_message?: string | null;
          id?: string;
          notification_type?: string;
          read_at?: string | null;
          reference_id?: string | null;
          reference_type?: string | null;
          sent_at?: string | null;
          status?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notification_log_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_log_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_log_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_log_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_log_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_log_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_log_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      notification_preferences: {
        Row: {
          account_id: string;
          created_at: string;
          email_contributions: boolean | null;
          email_digest_frequency: string | null;
          email_enabled: boolean | null;
          email_loyalty: boolean | null;
          email_marketing: boolean | null;
          email_orders: boolean | null;
          email_team: boolean | null;
          id: string;
          inapp_all: boolean | null;
          inapp_enabled: boolean | null;
          notification_locale: string | null;
          push_enabled: boolean | null;
          push_loyalty: boolean | null;
          push_orders: boolean | null;
          push_promotions: boolean | null;
          push_reminders: boolean | null;
          quiet_hours_enabled: boolean | null;
          quiet_hours_end: string | null;
          quiet_hours_start: string | null;
          sms_enabled: boolean | null;
          sms_marketing: boolean | null;
          sms_orders: boolean | null;
          timezone: string | null;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          email_contributions?: boolean | null;
          email_digest_frequency?: string | null;
          email_enabled?: boolean | null;
          email_loyalty?: boolean | null;
          email_marketing?: boolean | null;
          email_orders?: boolean | null;
          email_team?: boolean | null;
          id?: string;
          inapp_all?: boolean | null;
          inapp_enabled?: boolean | null;
          notification_locale?: string | null;
          push_enabled?: boolean | null;
          push_loyalty?: boolean | null;
          push_orders?: boolean | null;
          push_promotions?: boolean | null;
          push_reminders?: boolean | null;
          quiet_hours_enabled?: boolean | null;
          quiet_hours_end?: string | null;
          quiet_hours_start?: string | null;
          sms_enabled?: boolean | null;
          sms_marketing?: boolean | null;
          sms_orders?: boolean | null;
          timezone?: string | null;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          email_contributions?: boolean | null;
          email_digest_frequency?: string | null;
          email_enabled?: boolean | null;
          email_loyalty?: boolean | null;
          email_marketing?: boolean | null;
          email_orders?: boolean | null;
          email_team?: boolean | null;
          id?: string;
          inapp_all?: boolean | null;
          inapp_enabled?: boolean | null;
          notification_locale?: string | null;
          push_enabled?: boolean | null;
          push_loyalty?: boolean | null;
          push_orders?: boolean | null;
          push_promotions?: boolean | null;
          push_reminders?: boolean | null;
          quiet_hours_enabled?: boolean | null;
          quiet_hours_end?: string | null;
          quiet_hours_start?: string | null;
          sms_enabled?: boolean | null;
          sms_marketing?: boolean | null;
          sms_orders?: boolean | null;
          timezone?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notification_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_preferences_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: true;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      notification_queue: {
        Row: {
          attempts: number | null;
          completed_at: string | null;
          created_at: string | null;
          id: string;
          locked_at: string | null;
          locked_by: string | null;
          max_attempts: number | null;
          notification_id: string | null;
          priority: number | null;
          process_after: string | null;
          status: string | null;
        };
        Insert: {
          attempts?: number | null;
          completed_at?: string | null;
          created_at?: string | null;
          id?: string;
          locked_at?: string | null;
          locked_by?: string | null;
          max_attempts?: number | null;
          notification_id?: string | null;
          priority?: number | null;
          process_after?: string | null;
          status?: string | null;
        };
        Update: {
          attempts?: number | null;
          completed_at?: string | null;
          created_at?: string | null;
          id?: string;
          locked_at?: string | null;
          locked_by?: string | null;
          max_attempts?: number | null;
          notification_id?: string | null;
          priority?: number | null;
          process_after?: string | null;
          status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'notification_queue_notification_id_fkey';
            columns: ['notification_id'];
            isOneToOne: false;
            referencedRelation: 'reservation_notifications';
            referencedColumns: ['id'];
          },
        ];
      };
      notification_subscriptions: {
        Row: {
          account_id: string | null;
          auth: string | null;
          channel: string;
          created_at: string | null;
          email: string | null;
          endpoint: string | null;
          expires_at: string | null;
          id: string;
          is_active: boolean | null;
          last_used_at: string | null;
          p256dh: string | null;
          phone_number: string | null;
          session_id: string | null;
          updated_at: string | null;
          user_agent: string | null;
        };
        Insert: {
          account_id?: string | null;
          auth?: string | null;
          channel: string;
          created_at?: string | null;
          email?: string | null;
          endpoint?: string | null;
          expires_at?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_used_at?: string | null;
          p256dh?: string | null;
          phone_number?: string | null;
          session_id?: string | null;
          updated_at?: string | null;
          user_agent?: string | null;
        };
        Update: {
          account_id?: string | null;
          auth?: string | null;
          channel?: string;
          created_at?: string | null;
          email?: string | null;
          endpoint?: string | null;
          expires_at?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_used_at?: string | null;
          p256dh?: string | null;
          phone_number?: string | null;
          session_id?: string | null;
          updated_at?: string | null;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'notification_subscriptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_subscriptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_subscriptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_subscriptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_subscriptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_subscriptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'notification_subscriptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      notification_templates: {
        Row: {
          body: string;
          buttons: Json | null;
          channel: string;
          created_at: string | null;
          html_body: string | null;
          id: string;
          is_active: boolean | null;
          locale: string;
          merchant_id: string | null;
          subject: string | null;
          template_code: string;
          title: string | null;
          updated_at: string | null;
          version: number | null;
        };
        Insert: {
          body: string;
          buttons?: Json | null;
          channel: string;
          created_at?: string | null;
          html_body?: string | null;
          id?: string;
          is_active?: boolean | null;
          locale?: string;
          merchant_id?: string | null;
          subject?: string | null;
          template_code: string;
          title?: string | null;
          updated_at?: string | null;
          version?: number | null;
        };
        Update: {
          body?: string;
          buttons?: Json | null;
          channel?: string;
          created_at?: string | null;
          html_body?: string | null;
          id?: string;
          is_active?: boolean | null;
          locale?: string;
          merchant_id?: string | null;
          subject?: string | null;
          template_code?: string;
          title?: string | null;
          updated_at?: string | null;
          version?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'notification_templates_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      office_partners: {
        Row: {
          address: string | null;
          building_name: string | null;
          canteen_quality: string | null;
          city: string;
          company_name: string;
          country_code: string;
          created_at: string | null;
          data_source: string | null;
          distance_to_merchant_m: number | null;
          employee_count: number | null;
          floors_occupied: number | null;
          has_canteen: boolean | null;
          hr_contact_email: string | null;
          hr_contact_name: string | null;
          hr_contact_phone: string | null;
          id: string;
          industry: string | null;
          is_active: boolean | null;
          is_verified: boolean | null;
          latitude: number | null;
          longitude: number | null;
          lunch_break_end: string | null;
          lunch_break_start: string | null;
          notes: string | null;
          office_manager_email: string | null;
          office_manager_name: string | null;
          office_manager_phone: string | null;
          partner_type: string;
          reception_phone: string | null;
          source_id: string | null;
          updated_at: string | null;
          wfh_policy: string | null;
        };
        Insert: {
          address?: string | null;
          building_name?: string | null;
          canteen_quality?: string | null;
          city: string;
          company_name: string;
          country_code?: string;
          created_at?: string | null;
          data_source?: string | null;
          distance_to_merchant_m?: number | null;
          employee_count?: number | null;
          floors_occupied?: number | null;
          has_canteen?: boolean | null;
          hr_contact_email?: string | null;
          hr_contact_name?: string | null;
          hr_contact_phone?: string | null;
          id?: string;
          industry?: string | null;
          is_active?: boolean | null;
          is_verified?: boolean | null;
          latitude?: number | null;
          longitude?: number | null;
          lunch_break_end?: string | null;
          lunch_break_start?: string | null;
          notes?: string | null;
          office_manager_email?: string | null;
          office_manager_name?: string | null;
          office_manager_phone?: string | null;
          partner_type?: string;
          reception_phone?: string | null;
          source_id?: string | null;
          updated_at?: string | null;
          wfh_policy?: string | null;
        };
        Update: {
          address?: string | null;
          building_name?: string | null;
          canteen_quality?: string | null;
          city?: string;
          company_name?: string;
          country_code?: string;
          created_at?: string | null;
          data_source?: string | null;
          distance_to_merchant_m?: number | null;
          employee_count?: number | null;
          floors_occupied?: number | null;
          has_canteen?: boolean | null;
          hr_contact_email?: string | null;
          hr_contact_name?: string | null;
          hr_contact_phone?: string | null;
          id?: string;
          industry?: string | null;
          is_active?: boolean | null;
          is_verified?: boolean | null;
          latitude?: number | null;
          longitude?: number | null;
          lunch_break_end?: string | null;
          lunch_break_start?: string | null;
          notes?: string | null;
          office_manager_email?: string | null;
          office_manager_name?: string | null;
          office_manager_phone?: string | null;
          partner_type?: string;
          reception_phone?: string | null;
          source_id?: string | null;
          updated_at?: string | null;
          wfh_policy?: string | null;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string | null;
          extras: Json | null;
          extras_total: number | null;
          id: string;
          item_image_url: string | null;
          item_name: Json;
          item_slug: string | null;
          item_status: string | null;
          line_total: number;
          menu_item_id: string | null;
          order_id: string;
          quantity: number;
          selected_modifiers: Json | null;
          special_instructions: string | null;
          unit_price: number;
        };
        Insert: {
          created_at?: string | null;
          extras?: Json | null;
          extras_total?: number | null;
          id?: string;
          item_image_url?: string | null;
          item_name?: Json;
          item_slug?: string | null;
          item_status?: string | null;
          line_total: number;
          menu_item_id?: string | null;
          order_id: string;
          quantity?: number;
          selected_modifiers?: Json | null;
          special_instructions?: string | null;
          unit_price: number;
        };
        Update: {
          created_at?: string | null;
          extras?: Json | null;
          extras_total?: number | null;
          id?: string;
          item_image_url?: string | null;
          item_name?: Json;
          item_slug?: string | null;
          item_status?: string | null;
          line_total?: number;
          menu_item_id?: string | null;
          order_id?: string;
          quantity?: number;
          selected_modifiers?: Json | null;
          special_instructions?: string | null;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
        ];
      };
      order_status_history: {
        Row: {
          changed_at: string | null;
          changed_by: string | null;
          changed_by_name: string | null;
          from_status: string | null;
          id: string;
          notes: string | null;
          order_id: string;
          to_status: string;
        };
        Insert: {
          changed_at?: string | null;
          changed_by?: string | null;
          changed_by_name?: string | null;
          from_status?: string | null;
          id?: string;
          notes?: string | null;
          order_id: string;
          to_status: string;
        };
        Update: {
          changed_at?: string | null;
          changed_by?: string | null;
          changed_by_name?: string | null;
          from_status?: string | null;
          id?: string;
          notes?: string | null;
          order_id?: string;
          to_status?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'order_status_history_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
        ];
      };
      orders: {
        Row: {
          cancelled_at: string | null;
          confirmed_at: string | null;
          consumption_type: string | null;
          created_at: string | null;
          currency: string | null;
          customer_email: string | null;
          customer_name: string | null;
          customer_notes: string | null;
          customer_phone: string | null;
          delivered_at: string | null;
          device_fingerprint: string | null;
          discount_amount: number | null;
          id: string;
          kitchen_notes: string | null;
          merchant_id: string | null;
          order_code: string;
          order_number: number;
          payment_method: string | null;
          payment_status: string | null;
          preparing_at: string | null;
          ready_at: string | null;
          service_type: string | null;
          session_id: string | null;
          status: string | null;
          submitted_at: string | null;
          subtotal: number;
          table_number: string | null;
          tax_amount: number | null;
          total: number;
          updated_at: string | null;
        };
        Insert: {
          cancelled_at?: string | null;
          confirmed_at?: string | null;
          consumption_type?: string | null;
          created_at?: string | null;
          currency?: string | null;
          customer_email?: string | null;
          customer_name?: string | null;
          customer_notes?: string | null;
          customer_phone?: string | null;
          delivered_at?: string | null;
          device_fingerprint?: string | null;
          discount_amount?: number | null;
          id?: string;
          kitchen_notes?: string | null;
          merchant_id?: string | null;
          order_code?: string;
          order_number?: number;
          payment_method?: string | null;
          payment_status?: string | null;
          preparing_at?: string | null;
          ready_at?: string | null;
          service_type?: string | null;
          session_id?: string | null;
          status?: string | null;
          submitted_at?: string | null;
          subtotal?: number;
          table_number?: string | null;
          tax_amount?: number | null;
          total?: number;
          updated_at?: string | null;
        };
        Update: {
          cancelled_at?: string | null;
          confirmed_at?: string | null;
          consumption_type?: string | null;
          created_at?: string | null;
          currency?: string | null;
          customer_email?: string | null;
          customer_name?: string | null;
          customer_notes?: string | null;
          customer_phone?: string | null;
          delivered_at?: string | null;
          device_fingerprint?: string | null;
          discount_amount?: number | null;
          id?: string;
          kitchen_notes?: string | null;
          merchant_id?: string | null;
          order_code?: string;
          order_number?: number;
          payment_method?: string | null;
          payment_status?: string | null;
          preparing_at?: string | null;
          ready_at?: string | null;
          service_type?: string | null;
          session_id?: string | null;
          status?: string | null;
          submitted_at?: string | null;
          subtotal?: number;
          table_number?: string | null;
          tax_amount?: number | null;
          total?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      organizations: {
        Row: {
          billing_address: string | null;
          billing_email: string | null;
          created_at: string;
          id: string;
          name: string;
          partner_id: string | null;
          slug: string;
          status: string;
          stripe_customer_id: string | null;
          subscription_plan: string | null;
          subscription_status: string | null;
          tax_id: string | null;
          type: string;
          updated_at: string;
        };
        Insert: {
          billing_address?: string | null;
          billing_email?: string | null;
          created_at?: string;
          id?: string;
          name: string;
          partner_id?: string | null;
          slug: string;
          status?: string;
          stripe_customer_id?: string | null;
          subscription_plan?: string | null;
          subscription_status?: string | null;
          tax_id?: string | null;
          type?: string;
          updated_at?: string;
        };
        Update: {
          billing_address?: string | null;
          billing_email?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          partner_id?: string | null;
          slug?: string;
          status?: string;
          stripe_customer_id?: string | null;
          subscription_plan?: string | null;
          subscription_status?: string | null;
          tax_id?: string | null;
          type?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'organizations_partner_id_fkey';
            columns: ['partner_id'];
            isOneToOne: false;
            referencedRelation: 'partners';
            referencedColumns: ['id'];
          },
        ];
      };
      partner_conventions: {
        Row: {
          avg_order_value: number | null;
          benefit_conditions: string | null;
          benefit_description: string | null;
          benefit_type: string;
          benefit_value: number | null;
          convention_name: string;
          convention_slug: string | null;
          created_at: string | null;
          current_daily_code: string | null;
          current_uses: number | null;
          daily_code_generated_at: string | null;
          daily_code_prefix: string | null;
          free_item_id: string | null;
          id: string;
          is_active: boolean | null;
          max_uses_per_user: number | null;
          max_uses_period: string | null;
          max_uses_total: number | null;
          merchant_id: string;
          min_order_amount: number | null;
          min_party_size: number | null;
          partner_id: string;
          partner_name: string;
          partner_type: string;
          paused_reason: string | null;
          total_redemptions: number | null;
          total_revenue_generated: number | null;
          updated_at: string | null;
          valid_days: number[] | null;
          valid_from: string;
          valid_time_end: string | null;
          valid_time_start: string | null;
          valid_until: string | null;
          verification_method: string;
        };
        Insert: {
          avg_order_value?: number | null;
          benefit_conditions?: string | null;
          benefit_description?: string | null;
          benefit_type: string;
          benefit_value?: number | null;
          convention_name: string;
          convention_slug?: string | null;
          created_at?: string | null;
          current_daily_code?: string | null;
          current_uses?: number | null;
          daily_code_generated_at?: string | null;
          daily_code_prefix?: string | null;
          free_item_id?: string | null;
          id?: string;
          is_active?: boolean | null;
          max_uses_per_user?: number | null;
          max_uses_period?: string | null;
          max_uses_total?: number | null;
          merchant_id: string;
          min_order_amount?: number | null;
          min_party_size?: number | null;
          partner_id: string;
          partner_name: string;
          partner_type: string;
          paused_reason?: string | null;
          total_redemptions?: number | null;
          total_revenue_generated?: number | null;
          updated_at?: string | null;
          valid_days?: number[] | null;
          valid_from?: string;
          valid_time_end?: string | null;
          valid_time_start?: string | null;
          valid_until?: string | null;
          verification_method?: string;
        };
        Update: {
          avg_order_value?: number | null;
          benefit_conditions?: string | null;
          benefit_description?: string | null;
          benefit_type?: string;
          benefit_value?: number | null;
          convention_name?: string;
          convention_slug?: string | null;
          created_at?: string | null;
          current_daily_code?: string | null;
          current_uses?: number | null;
          daily_code_generated_at?: string | null;
          daily_code_prefix?: string | null;
          free_item_id?: string | null;
          id?: string;
          is_active?: boolean | null;
          max_uses_per_user?: number | null;
          max_uses_period?: string | null;
          max_uses_total?: number | null;
          merchant_id?: string;
          min_order_amount?: number | null;
          min_party_size?: number | null;
          partner_id?: string;
          partner_name?: string;
          partner_type?: string;
          paused_reason?: string | null;
          total_redemptions?: number | null;
          total_revenue_generated?: number | null;
          updated_at?: string | null;
          valid_days?: number[] | null;
          valid_from?: string;
          valid_time_end?: string | null;
          valid_time_start?: string | null;
          valid_until?: string | null;
          verification_method?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'partner_conventions_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      partner_feedback: {
        Row: {
          created_at: string | null;
          feedback_type: string;
          id: string;
          merchant_id: string;
          notes: string | null;
          partner_id: string;
          partner_type: string;
        };
        Insert: {
          created_at?: string | null;
          feedback_type: string;
          id?: string;
          merchant_id: string;
          notes?: string | null;
          partner_id: string;
          partner_type: string;
        };
        Update: {
          created_at?: string | null;
          feedback_type?: string;
          id?: string;
          merchant_id?: string;
          notes?: string | null;
          partner_id?: string;
          partner_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'partner_feedback_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      partners: {
        Row: {
          backoffice_domain: string | null;
          billing_address: string | null;
          billing_email: string | null;
          contact_email: string | null;
          contact_name: string | null;
          contact_phone: string | null;
          created_at: string;
          hide_gudbro_branding: boolean | null;
          id: string;
          is_exclusive: boolean;
          logo_url: string | null;
          name: string;
          primary_color: string | null;
          royalty_pct: number;
          slug: string;
          status: string;
          tax_id: string | null;
          territory_codes: string[];
          territory_type: string;
          updated_at: string;
        };
        Insert: {
          backoffice_domain?: string | null;
          billing_address?: string | null;
          billing_email?: string | null;
          contact_email?: string | null;
          contact_name?: string | null;
          contact_phone?: string | null;
          created_at?: string;
          hide_gudbro_branding?: boolean | null;
          id?: string;
          is_exclusive?: boolean;
          logo_url?: string | null;
          name: string;
          primary_color?: string | null;
          royalty_pct?: number;
          slug: string;
          status?: string;
          tax_id?: string | null;
          territory_codes: string[];
          territory_type: string;
          updated_at?: string;
        };
        Update: {
          backoffice_domain?: string | null;
          billing_address?: string | null;
          billing_email?: string | null;
          contact_email?: string | null;
          contact_name?: string | null;
          contact_phone?: string | null;
          created_at?: string;
          hide_gudbro_branding?: boolean | null;
          id?: string;
          is_exclusive?: boolean;
          logo_url?: string | null;
          name?: string;
          primary_color?: string | null;
          royalty_pct?: number;
          slug?: string;
          status?: string;
          tax_id?: string | null;
          territory_codes?: string[];
          territory_type?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      pasta: {
        Row: {
          cooking_method: Database['public']['Enums']['cooking_method'];
          created_at: string | null;
          customization: Json | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          flavor: Json;
          history: Json | null;
          id: string;
          image_url: string | null;
          ingredients: Json;
          is_public: boolean;
          media: Json | null;
          name: Json;
          origin: Json;
          owner_id: string | null;
          pairings: Json | null;
          pasta_dough: Database['public']['Enums']['pasta_dough'];
          pasta_shape: Database['public']['Enums']['pasta_shape'];
          popularity: number | null;
          protein: Json | null;
          recommended_for: string[] | null;
          related_pasta: string[] | null;
          sauce_type: Database['public']['Enums']['sauce_type'];
          serving: Json;
          slug: string;
          source_note: string | null;
          source_url: string | null;
          stable_key: string | null;
          status: Database['public']['Enums']['pasta_status'];
          style: Database['public']['Enums']['pasta_style'];
          tagline: Json | null;
          tags: string[] | null;
          toppings: Json | null;
          updated_at: string | null;
          variations: Json | null;
          version: number | null;
        };
        Insert: {
          cooking_method?: Database['public']['Enums']['cooking_method'];
          created_at?: string | null;
          customization?: Json | null;
          description: Json;
          dietary?: Json;
          dish_type?: string | null;
          flavor?: Json;
          history?: Json | null;
          id: string;
          image_url?: string | null;
          ingredients?: Json;
          is_public?: boolean;
          media?: Json | null;
          name: Json;
          origin?: Json;
          owner_id?: string | null;
          pairings?: Json | null;
          pasta_dough?: Database['public']['Enums']['pasta_dough'];
          pasta_shape?: Database['public']['Enums']['pasta_shape'];
          popularity?: number | null;
          protein?: Json | null;
          recommended_for?: string[] | null;
          related_pasta?: string[] | null;
          sauce_type?: Database['public']['Enums']['sauce_type'];
          serving?: Json;
          slug: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string | null;
          status?: Database['public']['Enums']['pasta_status'];
          style?: Database['public']['Enums']['pasta_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          toppings?: Json | null;
          updated_at?: string | null;
          variations?: Json | null;
          version?: number | null;
        };
        Update: {
          cooking_method?: Database['public']['Enums']['cooking_method'];
          created_at?: string | null;
          customization?: Json | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          flavor?: Json;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          ingredients?: Json;
          is_public?: boolean;
          media?: Json | null;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          pairings?: Json | null;
          pasta_dough?: Database['public']['Enums']['pasta_dough'];
          pasta_shape?: Database['public']['Enums']['pasta_shape'];
          popularity?: number | null;
          protein?: Json | null;
          recommended_for?: string[] | null;
          related_pasta?: string[] | null;
          sauce_type?: Database['public']['Enums']['sauce_type'];
          serving?: Json;
          slug?: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string | null;
          status?: Database['public']['Enums']['pasta_status'];
          style?: Database['public']['Enums']['pasta_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          toppings?: Json | null;
          updated_at?: string | null;
          variations?: Json | null;
          version?: number | null;
        };
        Relationships: [];
      };
      peruvian: {
        Row: {
          allergens: string[] | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          id: string;
          image_url: string | null;
          is_dairy_free: boolean;
          is_festive: boolean;
          is_fusion: boolean;
          is_gluten_free: boolean;
          is_nut_free: boolean;
          is_public: boolean;
          is_street_food: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number;
          protein_g: number | null;
          protein_type: string | null;
          quechua_name: string | null;
          region: string;
          served_cold: boolean;
          slug: string;
          spanish_name: string | null;
          spice_level: number;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id: string;
          image_url?: string | null;
          is_dairy_free?: boolean;
          is_festive?: boolean;
          is_fusion?: boolean;
          is_gluten_free?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          protein_type?: string | null;
          quechua_name?: string | null;
          region: string;
          served_cold?: boolean;
          slug: string;
          spanish_name?: string | null;
          spice_level?: number;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id?: string;
          image_url?: string | null;
          is_dairy_free?: boolean;
          is_festive?: boolean;
          is_fusion?: boolean;
          is_gluten_free?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          protein_type?: string | null;
          quechua_name?: string | null;
          region?: string;
          served_cold?: boolean;
          slug?: string;
          spanish_name?: string | null;
          spice_level?: number;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      piadine: {
        Row: {
          category: string;
          cheeses: string[] | null;
          condiments: string[] | null;
          created_at: string | null;
          customization: Json | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          history: Json | null;
          id: string;
          image_url: string | null;
          is_grilled: boolean | null;
          is_hot: boolean | null;
          is_pressed: boolean | null;
          is_public: boolean;
          is_toasted: boolean | null;
          media: Json | null;
          name: Json;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          pricing: Json | null;
          proteins: string[] | null;
          related_piadine: string[] | null;
          serving: Json;
          slug: string;
          status: Database['public']['Enums']['sandwich_status'];
          tagline: Json | null;
          tags: string[] | null;
          updated_at: string | null;
          variations: Json | null;
          vegetables: string[] | null;
        };
        Insert: {
          category?: string;
          cheeses?: string[] | null;
          condiments?: string[] | null;
          created_at?: string | null;
          customization?: Json | null;
          description: Json;
          dietary?: Json;
          dish_type?: string | null;
          history?: Json | null;
          id: string;
          image_url?: string | null;
          is_grilled?: boolean | null;
          is_hot?: boolean | null;
          is_pressed?: boolean | null;
          is_public?: boolean;
          is_toasted?: boolean | null;
          media?: Json | null;
          name: Json;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          pricing?: Json | null;
          proteins?: string[] | null;
          related_piadine?: string[] | null;
          serving?: Json;
          slug: string;
          status?: Database['public']['Enums']['sandwich_status'];
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
          vegetables?: string[] | null;
        };
        Update: {
          category?: string;
          cheeses?: string[] | null;
          condiments?: string[] | null;
          created_at?: string | null;
          customization?: Json | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          is_grilled?: boolean | null;
          is_hot?: boolean | null;
          is_pressed?: boolean | null;
          is_public?: boolean;
          is_toasted?: boolean | null;
          media?: Json | null;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          pricing?: Json | null;
          proteins?: string[] | null;
          related_piadine?: string[] | null;
          serving?: Json;
          slug?: string;
          status?: Database['public']['Enums']['sandwich_status'];
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
          vegetables?: string[] | null;
        };
        Relationships: [];
      };
      pizzas: {
        Row: {
          additional_cheeses: string[] | null;
          base: string;
          cooking: Json;
          created_at: string | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          dough_type: string;
          flavor: Json;
          history: Json | null;
          id: string;
          image_url: string | null;
          ingredients: Json;
          is_public: boolean;
          media: Json | null;
          name: Json;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          primary_cheese: string;
          recommended_for: string[] | null;
          related_pizzas: string[] | null;
          serving: Json;
          slug: string;
          source_note: string | null;
          source_url: string | null;
          stable_key: string;
          status: string;
          style: string;
          tagline: Json | null;
          tags: string[] | null;
          updated_at: string | null;
          variations: Json | null;
          version: number | null;
        };
        Insert: {
          additional_cheeses?: string[] | null;
          base: string;
          cooking: Json;
          created_at?: string | null;
          description: Json;
          dietary: Json;
          dish_type?: string | null;
          dough_type: string;
          flavor: Json;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          ingredients?: Json;
          is_public?: boolean;
          media?: Json | null;
          name: Json;
          origin: Json;
          owner_id?: string | null;
          popularity?: number | null;
          primary_cheese: string;
          recommended_for?: string[] | null;
          related_pizzas?: string[] | null;
          serving: Json;
          slug: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key: string;
          status: string;
          style: string;
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
          version?: number | null;
        };
        Update: {
          additional_cheeses?: string[] | null;
          base?: string;
          cooking?: Json;
          created_at?: string | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          dough_type?: string;
          flavor?: Json;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          ingredients?: Json;
          is_public?: boolean;
          media?: Json | null;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          primary_cheese?: string;
          recommended_for?: string[] | null;
          related_pizzas?: string[] | null;
          serving?: Json;
          slug?: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string;
          status?: string;
          style?: string;
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
          version?: number | null;
        };
        Relationships: [];
      };
      polish: {
        Row: {
          allergens: string[];
          category: string;
          cooking_method: string | null;
          created_at: string;
          description: string;
          dietary: Json | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          intolerances: string[];
          is_available: boolean | null;
          local_name: string | null;
          name: string;
          origin: Json;
          popularity: number;
          prep_time_min: number | null;
          price_default: number | null;
          protein_type: string | null;
          region: string;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[];
          updated_at: string;
        };
        Insert: {
          allergens?: string[];
          category: string;
          cooking_method?: string | null;
          created_at?: string;
          description: string;
          dietary?: Json | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          intolerances?: string[];
          is_available?: boolean | null;
          local_name?: string | null;
          name: string;
          origin?: Json;
          popularity?: number;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region: string;
          slug: string;
          spice_level?: number | null;
          status: string;
          tags?: string[];
          updated_at?: string;
        };
        Update: {
          allergens?: string[];
          category?: string;
          cooking_method?: string | null;
          created_at?: string;
          description?: string;
          dietary?: Json | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          intolerances?: string[];
          is_available?: boolean | null;
          local_name?: string | null;
          name?: string;
          origin?: Json;
          popularity?: number;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[];
          updated_at?: string;
        };
        Relationships: [];
      };
      portuguese: {
        Row: {
          allergens: string[];
          category: string;
          cooking_method: string | null;
          created_at: string;
          description: string;
          dietary: Json | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          intolerances: string[];
          is_available: boolean | null;
          local_name: string | null;
          name: string;
          origin: Json;
          popularity: number;
          prep_time_min: number | null;
          price_default: number | null;
          protein_type: string | null;
          region: string;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[];
          updated_at: string;
        };
        Insert: {
          allergens?: string[];
          category: string;
          cooking_method?: string | null;
          created_at?: string;
          description: string;
          dietary?: Json | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          intolerances?: string[];
          is_available?: boolean | null;
          local_name?: string | null;
          name: string;
          origin?: Json;
          popularity?: number;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region: string;
          slug: string;
          spice_level?: number | null;
          status: string;
          tags?: string[];
          updated_at?: string;
        };
        Update: {
          allergens?: string[];
          category?: string;
          cooking_method?: string | null;
          created_at?: string;
          description?: string;
          dietary?: Json | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          intolerances?: string[];
          is_available?: boolean | null;
          local_name?: string | null;
          name?: string;
          origin?: Json;
          popularity?: number;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[];
          updated_at?: string;
        };
        Relationships: [];
      };
      product_ingredients: {
        Row: {
          display_name_override: string | null;
          id: number;
          ingredient_id: string;
          is_optional: boolean | null;
          is_signature: boolean | null;
          product_id: string;
          product_type: string;
          quantity_amount: number | null;
          quantity_unit: string | null;
          role: string | null;
          sort_order: number | null;
        };
        Insert: {
          display_name_override?: string | null;
          id?: number;
          ingredient_id: string;
          is_optional?: boolean | null;
          is_signature?: boolean | null;
          product_id: string;
          product_type: string;
          quantity_amount?: number | null;
          quantity_unit?: string | null;
          role?: string | null;
          sort_order?: number | null;
        };
        Update: {
          display_name_override?: string | null;
          id?: number;
          ingredient_id?: string;
          is_optional?: boolean | null;
          is_signature?: boolean | null;
          product_id?: string;
          product_type?: string;
          quantity_amount?: number | null;
          quantity_unit?: string | null;
          role?: string | null;
          sort_order?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'product_ingredients_ingredient_id_fkey';
            columns: ['ingredient_id'];
            isOneToOne: false;
            referencedRelation: 'ingredients';
            referencedColumns: ['id'];
          },
        ];
      };
      product_recipes: {
        Row: {
          created_at: string | null;
          id: string;
          ingredient_id: string;
          menu_item_id: string;
          notes: string | null;
          quantity: number;
          sort_order: number | null;
          unit: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          ingredient_id: string;
          menu_item_id: string;
          notes?: string | null;
          quantity: number;
          sort_order?: number | null;
          unit: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          ingredient_id?: string;
          menu_item_id?: string;
          notes?: string | null;
          quantity?: number;
          sort_order?: number | null;
          unit?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'product_recipes_menu_item_id_fkey';
            columns: ['menu_item_id'];
            isOneToOne: false;
            referencedRelation: 'menu_items';
            referencedColumns: ['id'];
          },
        ];
      };
      product_taxonomy: {
        Row: {
          category: string;
          course_order: number | null;
          created_at: string;
          description_en: string | null;
          display_name_en: string;
          display_name_it: string | null;
          display_name_ja: string | null;
          display_name_ko: string | null;
          display_name_vi: string | null;
          display_order: number | null;
          icon: string | null;
          id: number;
          is_alcoholic: boolean | null;
          is_hot_served: boolean | null;
          menu_type: string;
          product_id: string | null;
          product_type: string;
          requires_cooking: boolean | null;
          service_type: string;
          subcategory: string | null;
          updated_at: string;
        };
        Insert: {
          category: string;
          course_order?: number | null;
          created_at?: string;
          description_en?: string | null;
          display_name_en: string;
          display_name_it?: string | null;
          display_name_ja?: string | null;
          display_name_ko?: string | null;
          display_name_vi?: string | null;
          display_order?: number | null;
          icon?: string | null;
          id?: number;
          is_alcoholic?: boolean | null;
          is_hot_served?: boolean | null;
          menu_type: string;
          product_id?: string | null;
          product_type: string;
          requires_cooking?: boolean | null;
          service_type: string;
          subcategory?: string | null;
          updated_at?: string;
        };
        Update: {
          category?: string;
          course_order?: number | null;
          created_at?: string;
          description_en?: string | null;
          display_name_en?: string;
          display_name_it?: string | null;
          display_name_ja?: string | null;
          display_name_ko?: string | null;
          display_name_vi?: string | null;
          display_order?: number | null;
          icon?: string | null;
          id?: number;
          is_alcoholic?: boolean | null;
          is_hot_served?: boolean | null;
          menu_type?: string;
          product_id?: string | null;
          product_type?: string;
          requires_cooking?: boolean | null;
          service_type?: string;
          subcategory?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      ProductRecipe: {
        Row: {
          createdAt: string | null;
          id: string;
          notes: string | null;
          productId: string;
          recipeId: string;
          updatedAt: string | null;
        };
        Insert: {
          createdAt?: string | null;
          id?: string;
          notes?: string | null;
          productId: string;
          recipeId: string;
          updatedAt?: string | null;
        };
        Update: {
          createdAt?: string | null;
          id?: string;
          notes?: string | null;
          productId?: string;
          recipeId?: string;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ProductRecipe_productId_fkey';
            columns: ['productId'];
            isOneToOne: false;
            referencedRelation: 'menu_items';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ProductRecipe_recipeId_fkey';
            columns: ['recipeId'];
            isOneToOne: false;
            referencedRelation: 'Recipe';
            referencedColumns: ['id'];
          },
        ];
      };
      push_tokens: {
        Row: {
          account_id: string;
          created_at: string;
          device_id: string | null;
          device_name: string | null;
          id: string;
          is_active: boolean | null;
          last_used_at: string | null;
          platform: string;
          token: string;
          updated_at: string;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          device_id?: string | null;
          device_name?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_used_at?: string | null;
          platform: string;
          token: string;
          updated_at?: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          device_id?: string | null;
          device_name?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_used_at?: string | null;
          platform?: string;
          token?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'push_tokens_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'push_tokens_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'push_tokens_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'push_tokens_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'push_tokens_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'push_tokens_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'push_tokens_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      qr_codes: {
        Row: {
          context: string | null;
          created_at: string | null;
          description: string | null;
          design: Json | null;
          destination_url: string | null;
          event_id: string | null;
          expires_at: string | null;
          id: string;
          is_active: boolean | null;
          last_scanned_at: string | null;
          max_scans: number | null;
          merchant_id: string;
          short_code: string | null;
          source: string | null;
          table_number: number | null;
          title: string | null;
          total_scans: number | null;
          type: string;
          updated_at: string | null;
          use_short_url: boolean | null;
          wifi_hidden: boolean | null;
          wifi_password: string | null;
          wifi_security: string | null;
          wifi_ssid: string | null;
        };
        Insert: {
          context?: string | null;
          created_at?: string | null;
          description?: string | null;
          design?: Json | null;
          destination_url?: string | null;
          event_id?: string | null;
          expires_at?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_scanned_at?: string | null;
          max_scans?: number | null;
          merchant_id: string;
          short_code?: string | null;
          source?: string | null;
          table_number?: number | null;
          title?: string | null;
          total_scans?: number | null;
          type?: string;
          updated_at?: string | null;
          use_short_url?: boolean | null;
          wifi_hidden?: boolean | null;
          wifi_password?: string | null;
          wifi_security?: string | null;
          wifi_ssid?: string | null;
        };
        Update: {
          context?: string | null;
          created_at?: string | null;
          description?: string | null;
          design?: Json | null;
          destination_url?: string | null;
          event_id?: string | null;
          expires_at?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_scanned_at?: string | null;
          max_scans?: number | null;
          merchant_id?: string;
          short_code?: string | null;
          source?: string | null;
          table_number?: number | null;
          title?: string | null;
          total_scans?: number | null;
          type?: string;
          updated_at?: string | null;
          use_short_url?: boolean | null;
          wifi_hidden?: boolean | null;
          wifi_password?: string | null;
          wifi_security?: string | null;
          wifi_ssid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'qr_codes_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qr_codes_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      qr_scans: {
        Row: {
          browser: string | null;
          city: string | null;
          country: string | null;
          device_type: string | null;
          id: string;
          ip_address: unknown;
          os: string | null;
          qr_code_id: string;
          referer: string | null;
          scanned_at: string | null;
          user_agent: string | null;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_medium: string | null;
          utm_source: string | null;
          utm_term: string | null;
        };
        Insert: {
          browser?: string | null;
          city?: string | null;
          country?: string | null;
          device_type?: string | null;
          id?: string;
          ip_address?: unknown;
          os?: string | null;
          qr_code_id: string;
          referer?: string | null;
          scanned_at?: string | null;
          user_agent?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          utm_term?: string | null;
        };
        Update: {
          browser?: string | null;
          city?: string | null;
          country?: string | null;
          device_type?: string | null;
          id?: string;
          ip_address?: unknown;
          os?: string | null;
          qr_code_id?: string;
          referer?: string | null;
          scanned_at?: string | null;
          user_agent?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
          utm_term?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'qr_scans_qr_code_id_fkey';
            columns: ['qr_code_id'];
            isOneToOne: false;
            referencedRelation: 'qr_codes';
            referencedColumns: ['id'];
          },
        ];
      };
      Recipe: {
        Row: {
          baristaTips: string | null;
          category: string;
          createdAt: string | null;
          description: string | null;
          difficulty: number | null;
          equipment: string | null;
          id: string;
          ingredients: string | null;
          latteArt: string | null;
          method: string | null;
          name: string;
          nutrition: string | null;
          origin: string | null;
          parameters: string | null;
          ratio: string | null;
          ratioExplanation: string | null;
          servingSize: string | null;
          slug: string;
          subcategory: string | null;
          temperature: string;
          totalTime: number | null;
          updatedAt: string | null;
          variations: string | null;
        };
        Insert: {
          baristaTips?: string | null;
          category: string;
          createdAt?: string | null;
          description?: string | null;
          difficulty?: number | null;
          equipment?: string | null;
          id?: string;
          ingredients?: string | null;
          latteArt?: string | null;
          method?: string | null;
          name: string;
          nutrition?: string | null;
          origin?: string | null;
          parameters?: string | null;
          ratio?: string | null;
          ratioExplanation?: string | null;
          servingSize?: string | null;
          slug: string;
          subcategory?: string | null;
          temperature: string;
          totalTime?: number | null;
          updatedAt?: string | null;
          variations?: string | null;
        };
        Update: {
          baristaTips?: string | null;
          category?: string;
          createdAt?: string | null;
          description?: string | null;
          difficulty?: number | null;
          equipment?: string | null;
          id?: string;
          ingredients?: string | null;
          latteArt?: string | null;
          method?: string | null;
          name?: string;
          nutrition?: string | null;
          origin?: string | null;
          parameters?: string | null;
          ratio?: string | null;
          ratioExplanation?: string | null;
          servingSize?: string | null;
          slug?: string;
          subcategory?: string | null;
          temperature?: string;
          totalTime?: number | null;
          updatedAt?: string | null;
          variations?: string | null;
        };
        Relationships: [];
      };
      referrals: {
        Row: {
          bonus_description: string | null;
          created_at: string;
          expires_at: string | null;
          id: string;
          qualification_criteria: Json | null;
          qualified_at: string | null;
          referral_type: string;
          referred_account_id: string | null;
          referred_email: string | null;
          referred_points_awarded: number | null;
          referrer_account_id: string;
          referrer_points_awarded: number | null;
          status: string;
          target_merchant_id: string | null;
          updated_at: string;
        };
        Insert: {
          bonus_description?: string | null;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          qualification_criteria?: Json | null;
          qualified_at?: string | null;
          referral_type: string;
          referred_account_id?: string | null;
          referred_email?: string | null;
          referred_points_awarded?: number | null;
          referrer_account_id: string;
          referrer_points_awarded?: number | null;
          status?: string;
          target_merchant_id?: string | null;
          updated_at?: string;
        };
        Update: {
          bonus_description?: string | null;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          qualification_criteria?: Json | null;
          qualified_at?: string | null;
          referral_type?: string;
          referred_account_id?: string | null;
          referred_email?: string | null;
          referred_points_awarded?: number | null;
          referrer_account_id?: string;
          referrer_points_awarded?: number | null;
          status?: string;
          target_merchant_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'referrals_referred_account_id_fkey';
            columns: ['referred_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'referrals_referred_account_id_fkey';
            columns: ['referred_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'referrals_referred_account_id_fkey';
            columns: ['referred_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'referrals_referred_account_id_fkey';
            columns: ['referred_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'referrals_referred_account_id_fkey';
            columns: ['referred_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'referrals_referred_account_id_fkey';
            columns: ['referred_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'referrals_referred_account_id_fkey';
            columns: ['referred_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'referrals_referrer_account_id_fkey';
            columns: ['referrer_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'referrals_referrer_account_id_fkey';
            columns: ['referrer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'referrals_referrer_account_id_fkey';
            columns: ['referrer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'referrals_referrer_account_id_fkey';
            columns: ['referrer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'referrals_referrer_account_id_fkey';
            columns: ['referrer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'referrals_referrer_account_id_fkey';
            columns: ['referrer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'referrals_referrer_account_id_fkey';
            columns: ['referrer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      reservation_history: {
        Row: {
          action: string;
          change_source: string | null;
          changed_by: string | null;
          created_at: string;
          id: string;
          new_status: string | null;
          notes: string | null;
          old_status: string | null;
          reservation_id: string;
        };
        Insert: {
          action: string;
          change_source?: string | null;
          changed_by?: string | null;
          created_at?: string;
          id?: string;
          new_status?: string | null;
          notes?: string | null;
          old_status?: string | null;
          reservation_id: string;
        };
        Update: {
          action?: string;
          change_source?: string | null;
          changed_by?: string | null;
          created_at?: string;
          id?: string;
          new_status?: string | null;
          notes?: string | null;
          old_status?: string | null;
          reservation_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reservation_history_changed_by_fkey';
            columns: ['changed_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservation_history_changed_by_fkey';
            columns: ['changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservation_history_changed_by_fkey';
            columns: ['changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservation_history_changed_by_fkey';
            columns: ['changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservation_history_changed_by_fkey';
            columns: ['changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservation_history_changed_by_fkey';
            columns: ['changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservation_history_changed_by_fkey';
            columns: ['changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservation_history_reservation_id_fkey';
            columns: ['reservation_id'];
            isOneToOne: false;
            referencedRelation: 'reservations';
            referencedColumns: ['id'];
          },
        ];
      };
      reservation_notifications: {
        Row: {
          body: string;
          channel: string;
          created_at: string | null;
          delivered_at: string | null;
          error_message: string | null;
          failed_at: string | null;
          id: string;
          max_retries: number | null;
          notification_type: string;
          provider: string | null;
          provider_message_id: string | null;
          provider_response: Json | null;
          queued_at: string | null;
          read_at: string | null;
          recipient: string;
          recipient_name: string | null;
          reservation_id: string;
          retry_count: number | null;
          scheduled_for: string | null;
          sent_at: string | null;
          status: string | null;
          subject: string | null;
        };
        Insert: {
          body: string;
          channel: string;
          created_at?: string | null;
          delivered_at?: string | null;
          error_message?: string | null;
          failed_at?: string | null;
          id?: string;
          max_retries?: number | null;
          notification_type: string;
          provider?: string | null;
          provider_message_id?: string | null;
          provider_response?: Json | null;
          queued_at?: string | null;
          read_at?: string | null;
          recipient: string;
          recipient_name?: string | null;
          reservation_id: string;
          retry_count?: number | null;
          scheduled_for?: string | null;
          sent_at?: string | null;
          status?: string | null;
          subject?: string | null;
        };
        Update: {
          body?: string;
          channel?: string;
          created_at?: string | null;
          delivered_at?: string | null;
          error_message?: string | null;
          failed_at?: string | null;
          id?: string;
          max_retries?: number | null;
          notification_type?: string;
          provider?: string | null;
          provider_message_id?: string | null;
          provider_response?: Json | null;
          queued_at?: string | null;
          read_at?: string | null;
          recipient?: string;
          recipient_name?: string | null;
          reservation_id?: string;
          retry_count?: number | null;
          scheduled_for?: string | null;
          sent_at?: string | null;
          status?: string | null;
          subject?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'reservation_notifications_reservation_id_fkey';
            columns: ['reservation_id'];
            isOneToOne: false;
            referencedRelation: 'reservations';
            referencedColumns: ['id'];
          },
        ];
      };
      reservation_settings: {
        Row: {
          allow_section_preference: boolean | null;
          allow_table_preference: boolean | null;
          auto_confirm_threshold: number | null;
          cancellation_deadline_hours: number;
          created_at: string;
          default_dining_duration: number;
          deposit_amount: number | null;
          deposit_percent: number | null;
          location_id: string;
          max_advance_days: number;
          max_party_size: number | null;
          min_advance_hours: number;
          min_party_size: number | null;
          no_show_penalty_amount: number | null;
          require_deposit: boolean | null;
          require_email: boolean | null;
          require_phone: boolean | null;
          reservation_hours: Json | null;
          send_confirmation: boolean | null;
          send_reminder_hours: number | null;
          slot_duration_minutes: number;
          updated_at: string;
        };
        Insert: {
          allow_section_preference?: boolean | null;
          allow_table_preference?: boolean | null;
          auto_confirm_threshold?: number | null;
          cancellation_deadline_hours?: number;
          created_at?: string;
          default_dining_duration?: number;
          deposit_amount?: number | null;
          deposit_percent?: number | null;
          location_id: string;
          max_advance_days?: number;
          max_party_size?: number | null;
          min_advance_hours?: number;
          min_party_size?: number | null;
          no_show_penalty_amount?: number | null;
          require_deposit?: boolean | null;
          require_email?: boolean | null;
          require_phone?: boolean | null;
          reservation_hours?: Json | null;
          send_confirmation?: boolean | null;
          send_reminder_hours?: number | null;
          slot_duration_minutes?: number;
          updated_at?: string;
        };
        Update: {
          allow_section_preference?: boolean | null;
          allow_table_preference?: boolean | null;
          auto_confirm_threshold?: number | null;
          cancellation_deadline_hours?: number;
          created_at?: string;
          default_dining_duration?: number;
          deposit_amount?: number | null;
          deposit_percent?: number | null;
          location_id?: string;
          max_advance_days?: number;
          max_party_size?: number | null;
          min_advance_hours?: number;
          min_party_size?: number | null;
          no_show_penalty_amount?: number | null;
          require_deposit?: boolean | null;
          require_email?: boolean | null;
          require_phone?: boolean | null;
          reservation_hours?: Json | null;
          send_confirmation?: boolean | null;
          send_reminder_hours?: number | null;
          slot_duration_minutes?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reservation_settings_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: true;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      reservation_table_assignments: {
        Row: {
          assigned_at: string;
          assigned_by: string | null;
          id: string;
          reservation_id: string;
          table_id: string;
        };
        Insert: {
          assigned_at?: string;
          assigned_by?: string | null;
          id?: string;
          reservation_id: string;
          table_id: string;
        };
        Update: {
          assigned_at?: string;
          assigned_by?: string | null;
          id?: string;
          reservation_id?: string;
          table_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reservation_table_assignments_assigned_by_fkey';
            columns: ['assigned_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservation_table_assignments_assigned_by_fkey';
            columns: ['assigned_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservation_table_assignments_assigned_by_fkey';
            columns: ['assigned_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservation_table_assignments_assigned_by_fkey';
            columns: ['assigned_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservation_table_assignments_assigned_by_fkey';
            columns: ['assigned_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservation_table_assignments_assigned_by_fkey';
            columns: ['assigned_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservation_table_assignments_assigned_by_fkey';
            columns: ['assigned_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservation_table_assignments_reservation_id_fkey';
            columns: ['reservation_id'];
            isOneToOne: false;
            referencedRelation: 'reservations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservation_table_assignments_table_id_fkey';
            columns: ['table_id'];
            isOneToOne: false;
            referencedRelation: 'location_tables';
            referencedColumns: ['id'];
          },
        ];
      };
      reservations: {
        Row: {
          account_id: string | null;
          cancellation_reason: string | null;
          cancelled_at: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string;
          deposit_amount: number | null;
          deposit_status: string | null;
          deposit_transaction_id: string | null;
          dietary_requirements: Json | null;
          duration_minutes: number;
          end_time: string | null;
          guest_email: string | null;
          guest_locale: string | null;
          guest_name: string;
          guest_phone: string | null;
          id: string;
          internal_notes: string | null;
          location_id: string;
          notes: string | null;
          occasion: string | null;
          party_size: number;
          reservation_code: string;
          reservation_date: string;
          reservation_time: string;
          seated_at: string | null;
          section_id: string | null;
          source: string;
          special_requests: string | null;
          status: string;
          status_changed_at: string | null;
          status_changed_by: string | null;
          table_ids: Json | null;
          tags: Json | null;
          updated_at: string;
        };
        Insert: {
          account_id?: string | null;
          cancellation_reason?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string;
          deposit_amount?: number | null;
          deposit_status?: string | null;
          deposit_transaction_id?: string | null;
          dietary_requirements?: Json | null;
          duration_minutes?: number;
          end_time?: string | null;
          guest_email?: string | null;
          guest_locale?: string | null;
          guest_name: string;
          guest_phone?: string | null;
          id?: string;
          internal_notes?: string | null;
          location_id: string;
          notes?: string | null;
          occasion?: string | null;
          party_size: number;
          reservation_code: string;
          reservation_date: string;
          reservation_time: string;
          seated_at?: string | null;
          section_id?: string | null;
          source?: string;
          special_requests?: string | null;
          status?: string;
          status_changed_at?: string | null;
          status_changed_by?: string | null;
          table_ids?: Json | null;
          tags?: Json | null;
          updated_at?: string;
        };
        Update: {
          account_id?: string | null;
          cancellation_reason?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string;
          deposit_amount?: number | null;
          deposit_status?: string | null;
          deposit_transaction_id?: string | null;
          dietary_requirements?: Json | null;
          duration_minutes?: number;
          end_time?: string | null;
          guest_email?: string | null;
          guest_locale?: string | null;
          guest_name?: string;
          guest_phone?: string | null;
          id?: string;
          internal_notes?: string | null;
          location_id?: string;
          notes?: string | null;
          occasion?: string | null;
          party_size?: number;
          reservation_code?: string;
          reservation_date?: string;
          reservation_time?: string;
          seated_at?: string | null;
          section_id?: string | null;
          source?: string;
          special_requests?: string | null;
          status?: string;
          status_changed_at?: string | null;
          status_changed_by?: string | null;
          table_ids?: Json | null;
          tags?: Json | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reservations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservations_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservations_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservations_section_id_fkey';
            columns: ['section_id'];
            isOneToOne: false;
            referencedRelation: 'location_sections';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservations_status_changed_by_fkey';
            columns: ['status_changed_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservations_status_changed_by_fkey';
            columns: ['status_changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservations_status_changed_by_fkey';
            columns: ['status_changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservations_status_changed_by_fkey';
            columns: ['status_changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservations_status_changed_by_fkey';
            columns: ['status_changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservations_status_changed_by_fkey';
            columns: ['status_changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reservations_status_changed_by_fkey';
            columns: ['status_changed_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      reward_redemptions: {
        Row: {
          account_id: string;
          admin_notes: string | null;
          created_at: string;
          id: string;
          points_spent: number;
          processed_at: string | null;
          processed_by: string | null;
          redemption_code: string | null;
          reward_id: string;
          reward_snapshot: Json;
          status: string;
          updated_at: string;
          used_at: string | null;
          used_on_order_id: string | null;
          valid_from: string | null;
          valid_until: string | null;
        };
        Insert: {
          account_id: string;
          admin_notes?: string | null;
          created_at?: string;
          id?: string;
          points_spent: number;
          processed_at?: string | null;
          processed_by?: string | null;
          redemption_code?: string | null;
          reward_id: string;
          reward_snapshot: Json;
          status?: string;
          updated_at?: string;
          used_at?: string | null;
          used_on_order_id?: string | null;
          valid_from?: string | null;
          valid_until?: string | null;
        };
        Update: {
          account_id?: string;
          admin_notes?: string | null;
          created_at?: string;
          id?: string;
          points_spent?: number;
          processed_at?: string | null;
          processed_by?: string | null;
          redemption_code?: string | null;
          reward_id?: string;
          reward_snapshot?: Json;
          status?: string;
          updated_at?: string;
          used_at?: string | null;
          used_on_order_id?: string | null;
          valid_from?: string | null;
          valid_until?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'reward_redemptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reward_redemptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reward_redemptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reward_redemptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reward_redemptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reward_redemptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reward_redemptions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reward_redemptions_processed_by_fkey';
            columns: ['processed_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reward_redemptions_processed_by_fkey';
            columns: ['processed_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reward_redemptions_processed_by_fkey';
            columns: ['processed_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reward_redemptions_processed_by_fkey';
            columns: ['processed_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reward_redemptions_processed_by_fkey';
            columns: ['processed_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reward_redemptions_processed_by_fkey';
            columns: ['processed_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reward_redemptions_processed_by_fkey';
            columns: ['processed_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'reward_redemptions_reward_id_fkey';
            columns: ['reward_id'];
            isOneToOne: false;
            referencedRelation: 'loyalty_rewards';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reward_redemptions_reward_id_fkey';
            columns: ['reward_id'];
            isOneToOne: false;
            referencedRelation: 'v_rewards_admin';
            referencedColumns: ['id'];
          },
        ];
      };
      risotti: {
        Row: {
          aromatics: string[] | null;
          availability: Json | null;
          broth: Json | null;
          cooking: Json;
          created_at: string | null;
          customization: Json | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          finishing: Json | null;
          history: Json | null;
          id: string;
          image_url: string | null;
          is_public: boolean;
          main_ingredients: string[] | null;
          name: Json;
          origin: Json;
          owner_id: string | null;
          pricing: Json | null;
          proteins: string[] | null;
          rice_type: Json;
          serving: Json;
          slug: string;
          source_note: string | null;
          source_url: string | null;
          stable_key: string | null;
          status: Database['public']['Enums']['risotto_status'];
          style: Database['public']['Enums']['risotto_style'];
          tagline: Json | null;
          tags: string[] | null;
          updated_at: string | null;
          vegetables: string[] | null;
          version: number | null;
        };
        Insert: {
          aromatics?: string[] | null;
          availability?: Json | null;
          broth?: Json | null;
          cooking: Json;
          created_at?: string | null;
          customization?: Json | null;
          description: Json;
          dietary: Json;
          dish_type?: string | null;
          finishing?: Json | null;
          history?: Json | null;
          id: string;
          image_url?: string | null;
          is_public?: boolean;
          main_ingredients?: string[] | null;
          name: Json;
          origin?: Json;
          owner_id?: string | null;
          pricing?: Json | null;
          proteins?: string[] | null;
          rice_type: Json;
          serving?: Json;
          slug: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string | null;
          status?: Database['public']['Enums']['risotto_status'];
          style: Database['public']['Enums']['risotto_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          vegetables?: string[] | null;
          version?: number | null;
        };
        Update: {
          aromatics?: string[] | null;
          availability?: Json | null;
          broth?: Json | null;
          cooking?: Json;
          created_at?: string | null;
          customization?: Json | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          finishing?: Json | null;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          is_public?: boolean;
          main_ingredients?: string[] | null;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          pricing?: Json | null;
          proteins?: string[] | null;
          rice_type?: Json;
          serving?: Json;
          slug?: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string | null;
          status?: Database['public']['Enums']['risotto_status'];
          style?: Database['public']['Enums']['risotto_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          vegetables?: string[] | null;
          version?: number | null;
        };
        Relationships: [];
      };
      role_templates: {
        Row: {
          description: string | null;
          display_order: number | null;
          id: string;
          name: string;
          permissions: Json;
        };
        Insert: {
          description?: string | null;
          display_order?: number | null;
          id: string;
          name: string;
          permissions: Json;
        };
        Update: {
          description?: string | null;
          display_order?: number | null;
          id?: string;
          name?: string;
          permissions?: Json;
        };
        Relationships: [];
      };
      russian: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          intolerances: string[] | null;
          local_name: string | null;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          price_default: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          intolerances?: string[] | null;
          local_name?: string | null;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          intolerances?: string[] | null;
          local_name?: string | null;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      salads: {
        Row: {
          base: Database['public']['Enums']['salad_base'];
          created_at: string | null;
          customization: Json | null;
          default_dressing: string | null;
          default_protein: string | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          dressing_on_side: boolean | null;
          dressing_options: string[] | null;
          flavor: Json;
          history: Json | null;
          id: string;
          image_url: string | null;
          ingredients: Json;
          is_public: boolean;
          media: Json | null;
          name: Json;
          origin: Json;
          owner_id: string | null;
          pairings: Json | null;
          popularity: number | null;
          protein_options: string[] | null;
          recommended_for: string[] | null;
          related_salads: string[] | null;
          serving: Json;
          slug: string;
          source_note: string | null;
          source_url: string | null;
          stable_key: string;
          status: Database['public']['Enums']['salad_status'];
          style: Database['public']['Enums']['salad_style'];
          tagline: Json | null;
          tags: string[] | null;
          toppings: Json | null;
          updated_at: string | null;
          variations: Json | null;
          version: number | null;
        };
        Insert: {
          base?: Database['public']['Enums']['salad_base'];
          created_at?: string | null;
          customization?: Json | null;
          default_dressing?: string | null;
          default_protein?: string | null;
          description: Json;
          dietary?: Json;
          dish_type?: string | null;
          dressing_on_side?: boolean | null;
          dressing_options?: string[] | null;
          flavor?: Json;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          ingredients?: Json;
          is_public?: boolean;
          media?: Json | null;
          name: Json;
          origin?: Json;
          owner_id?: string | null;
          pairings?: Json | null;
          popularity?: number | null;
          protein_options?: string[] | null;
          recommended_for?: string[] | null;
          related_salads?: string[] | null;
          serving?: Json;
          slug: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key: string;
          status?: Database['public']['Enums']['salad_status'];
          style?: Database['public']['Enums']['salad_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          toppings?: Json | null;
          updated_at?: string | null;
          variations?: Json | null;
          version?: number | null;
        };
        Update: {
          base?: Database['public']['Enums']['salad_base'];
          created_at?: string | null;
          customization?: Json | null;
          default_dressing?: string | null;
          default_protein?: string | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          dressing_on_side?: boolean | null;
          dressing_options?: string[] | null;
          flavor?: Json;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          ingredients?: Json;
          is_public?: boolean;
          media?: Json | null;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          pairings?: Json | null;
          popularity?: number | null;
          protein_options?: string[] | null;
          recommended_for?: string[] | null;
          related_salads?: string[] | null;
          serving?: Json;
          slug?: string;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string;
          status?: Database['public']['Enums']['salad_status'];
          style?: Database['public']['Enums']['salad_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          toppings?: Json | null;
          updated_at?: string | null;
          variations?: Json | null;
          version?: number | null;
        };
        Relationships: [];
      };
      sandwiches: {
        Row: {
          bread_is_grilled: boolean | null;
          bread_is_toasted: boolean | null;
          bread_type: Database['public']['Enums']['bread_type'];
          cheeses: string[] | null;
          condiments: string[] | null;
          created_at: string | null;
          customization: Json | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          history: Json | null;
          id: string;
          image_url: string | null;
          is_hot: boolean | null;
          is_pressed: boolean | null;
          is_public: boolean;
          media: Json | null;
          name: Json;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          pricing: Json | null;
          proteins: string[] | null;
          related_sandwiches: string[] | null;
          serving: Json;
          slug: string;
          status: Database['public']['Enums']['sandwich_status'];
          style: Database['public']['Enums']['sandwich_style'];
          tagline: Json | null;
          tags: string[] | null;
          updated_at: string | null;
          variations: Json | null;
          vegetables: string[] | null;
        };
        Insert: {
          bread_is_grilled?: boolean | null;
          bread_is_toasted?: boolean | null;
          bread_type?: Database['public']['Enums']['bread_type'];
          cheeses?: string[] | null;
          condiments?: string[] | null;
          created_at?: string | null;
          customization?: Json | null;
          description: Json;
          dietary?: Json;
          dish_type?: string | null;
          history?: Json | null;
          id: string;
          image_url?: string | null;
          is_hot?: boolean | null;
          is_pressed?: boolean | null;
          is_public?: boolean;
          media?: Json | null;
          name: Json;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          pricing?: Json | null;
          proteins?: string[] | null;
          related_sandwiches?: string[] | null;
          serving?: Json;
          slug: string;
          status?: Database['public']['Enums']['sandwich_status'];
          style?: Database['public']['Enums']['sandwich_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
          vegetables?: string[] | null;
        };
        Update: {
          bread_is_grilled?: boolean | null;
          bread_is_toasted?: boolean | null;
          bread_type?: Database['public']['Enums']['bread_type'];
          cheeses?: string[] | null;
          condiments?: string[] | null;
          created_at?: string | null;
          customization?: Json | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          is_hot?: boolean | null;
          is_pressed?: boolean | null;
          is_public?: boolean;
          media?: Json | null;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          pricing?: Json | null;
          proteins?: string[] | null;
          related_sandwiches?: string[] | null;
          serving?: Json;
          slug?: string;
          status?: Database['public']['Enums']['sandwich_status'];
          style?: Database['public']['Enums']['sandwich_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
          vegetables?: string[] | null;
        };
        Relationships: [];
      };
      sauces: {
        Row: {
          allergens: string[] | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          heat_level: number;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          origin_country: string | null;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          serving_size_ml: number;
          serving_style: string;
          slug: string;
          sodium_mg: number | null;
          spice_level: number | null;
          status: string;
          sugar_g: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          heat_level?: number;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_ml?: number;
          serving_style: string;
          slug: string;
          sodium_mg?: number | null;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          heat_level?: number;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_ml?: number;
          serving_style?: string;
          slug?: string;
          sodium_mg?: number | null;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      scandinavian: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          country: string;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          intolerances: string[] | null;
          local_name: string | null;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          price_default: number | null;
          protein_type: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          country: string;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          intolerances?: string[] | null;
          local_name?: string | null;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          country?: string;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          intolerances?: string[] | null;
          local_name?: string | null;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      schedule_overrides: {
        Row: {
          created_at: string;
          created_by: string | null;
          date_end: string | null;
          date_start: string;
          description: string | null;
          event_id: string | null;
          hours: Json | null;
          id: string;
          is_closed: boolean | null;
          location_id: string;
          name: string;
          override_type: string;
          priority: number | null;
          recurrence: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          date_end?: string | null;
          date_start: string;
          description?: string | null;
          event_id?: string | null;
          hours?: Json | null;
          id?: string;
          is_closed?: boolean | null;
          location_id: string;
          name: string;
          override_type: string;
          priority?: number | null;
          recurrence?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          date_end?: string | null;
          date_start?: string;
          description?: string | null;
          event_id?: string | null;
          hours?: Json | null;
          id?: string;
          is_closed?: boolean | null;
          location_id?: string;
          name?: string;
          override_type?: string;
          priority?: number | null;
          recurrence?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'schedule_overrides_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      seafood: {
        Row: {
          allergens: string[];
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string;
          created_at: string;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_kosher: boolean;
          is_nut_free: boolean;
          is_public: boolean;
          is_sustainable: boolean | null;
          is_vegan: boolean;
          is_vegetarian: boolean;
          is_wild_caught: boolean | null;
          name: string;
          omega3_mg: number | null;
          origin: Json;
          origin_country: string | null;
          origin_region: string | null;
          owner_id: string | null;
          popularity: number;
          protein_g: number | null;
          recommended_sides: string[];
          seafood_type: string;
          serves: number | null;
          slug: string;
          spice_level: number;
          status: string;
          style: string;
          tags: string[];
          updated_at: string;
          wine_pairing: string[];
        };
        Insert: {
          allergens?: string[];
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method: string;
          created_at?: string;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_sustainable?: boolean | null;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          is_wild_caught?: boolean | null;
          name: string;
          omega3_mg?: number | null;
          origin?: Json;
          origin_country?: string | null;
          origin_region?: string | null;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          recommended_sides?: string[];
          seafood_type: string;
          serves?: number | null;
          slug: string;
          spice_level?: number;
          status?: string;
          style: string;
          tags?: string[];
          updated_at?: string;
          wine_pairing?: string[];
        };
        Update: {
          allergens?: string[];
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string;
          created_at?: string;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_sustainable?: boolean | null;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          is_wild_caught?: boolean | null;
          name?: string;
          omega3_mg?: number | null;
          origin?: Json;
          origin_country?: string | null;
          origin_region?: string | null;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          recommended_sides?: string[];
          seafood_type?: string;
          serves?: number | null;
          slug?: string;
          spice_level?: number;
          status?: string;
          style?: string;
          tags?: string[];
          updated_at?: string;
          wine_pairing?: string[];
        };
        Relationships: [];
      };
      senegalese: {
        Row: {
          allergens: string[];
          category: string;
          cooking_method: string | null;
          created_at: string;
          cuisine: string | null;
          description: string | null;
          dish_type: string | null;
          id: string;
          image_url: string | null;
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_public: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          origin: Json | null;
          owner_id: string | null;
          popularity: number;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number;
          status: string;
          tags: string[];
          updated_at: string;
        };
        Insert: {
          allergens?: string[];
          category: string;
          cooking_method?: string | null;
          created_at?: string;
          cuisine?: string | null;
          description?: string | null;
          dish_type?: string | null;
          id: string;
          image_url?: string | null;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_public?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          origin?: Json | null;
          owner_id?: string | null;
          popularity?: number;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number;
          status: string;
          tags?: string[];
          updated_at?: string;
        };
        Update: {
          allergens?: string[];
          category?: string;
          cooking_method?: string | null;
          created_at?: string;
          cuisine?: string | null;
          description?: string | null;
          dish_type?: string | null;
          id?: string;
          image_url?: string | null;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_public?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          origin?: Json | null;
          owner_id?: string | null;
          popularity?: number;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number;
          status?: string;
          tags?: string[];
          updated_at?: string;
        };
        Relationships: [];
      };
      sides: {
        Row: {
          allergens: string[] | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          fiber_g: number | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          origin_country: string | null;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          serving_size_g: number;
          serving_style: string;
          slug: string;
          sodium_mg: number | null;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_g?: number;
          serving_style: string;
          slug: string;
          sodium_mg?: number | null;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_g?: number;
          serving_style?: string;
          slug?: string;
          sodium_mg?: number | null;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      smoothies: {
        Row: {
          allergens: string[] | null;
          base_type: string;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          created_at: string | null;
          description: string;
          fat_g: number | null;
          fiber_g: number | null;
          flavor_profile: string;
          has_protein_boost: boolean | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_blended: boolean | null;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_meal_replacement: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          origin_country: string | null;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          serving_size_ml: number;
          serving_style: string;
          slug: string;
          spice_level: number | null;
          status: string;
          sugar_g: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          base_type: string;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          created_at?: string | null;
          description: string;
          fat_g?: number | null;
          fiber_g?: number | null;
          flavor_profile: string;
          has_protein_boost?: boolean | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_blended?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_meal_replacement?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_ml?: number;
          serving_style: string;
          slug: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          base_type?: string;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          fat_g?: number | null;
          fiber_g?: number | null;
          flavor_profile?: string;
          has_protein_boost?: boolean | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_blended?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_meal_replacement?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          serving_size_ml?: number;
          serving_style?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      softdrinks: {
        Row: {
          allergens: string[] | null;
          brand: string;
          caffeine_mg: number | null;
          calories_per_serving: number | null;
          category: string;
          created_at: string | null;
          description: string | null;
          id: string;
          image_url: string | null;
          is_carbonated: boolean | null;
          is_dairy_free: boolean | null;
          is_diet: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_sugar_free: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          name: string;
          origin: Json;
          origin_country: string | null;
          owner_id: string | null;
          popularity: number | null;
          serving_size_ml: number;
          serving_style: string;
          slug: string;
          spice_level: number | null;
          status: string;
          sugar_g: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          brand: string;
          caffeine_mg?: number | null;
          calories_per_serving?: number | null;
          category: string;
          created_at?: string | null;
          description?: string | null;
          id: string;
          image_url?: string | null;
          is_carbonated?: boolean | null;
          is_dairy_free?: boolean | null;
          is_diet?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_sugar_free?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          serving_size_ml: number;
          serving_style: string;
          slug: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          brand?: string;
          caffeine_mg?: number | null;
          calories_per_serving?: number | null;
          category?: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          is_carbonated?: boolean | null;
          is_dairy_free?: boolean | null;
          is_diet?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_sugar_free?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          serving_size_ml?: number;
          serving_style?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      soups: {
        Row: {
          aromatics: string[] | null;
          availability: Json | null;
          broth: Json | null;
          cooking: Json;
          created_at: string | null;
          customization: Json | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          garnish: string[] | null;
          history: Json | null;
          id: string;
          image_url: string | null;
          is_public: boolean;
          main_ingredients: string[];
          name: Json;
          origin: Json;
          owner_id: string | null;
          pricing: Json | null;
          proteins: string[] | null;
          serving: Json;
          slug: string;
          soup_type: Json;
          source_note: string | null;
          source_url: string | null;
          stable_key: string | null;
          status: string;
          style: string;
          tagline: Json | null;
          tags: string[] | null;
          updated_at: string | null;
          vegetables: string[] | null;
          version: number | null;
        };
        Insert: {
          aromatics?: string[] | null;
          availability?: Json | null;
          broth?: Json | null;
          cooking: Json;
          created_at?: string | null;
          customization?: Json | null;
          description: Json;
          dietary: Json;
          dish_type?: string | null;
          garnish?: string[] | null;
          history?: Json | null;
          id: string;
          image_url?: string | null;
          is_public?: boolean;
          main_ingredients: string[];
          name: Json;
          origin: Json;
          owner_id?: string | null;
          pricing?: Json | null;
          proteins?: string[] | null;
          serving: Json;
          slug: string;
          soup_type: Json;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string | null;
          status?: string;
          style: string;
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          vegetables?: string[] | null;
          version?: number | null;
        };
        Update: {
          aromatics?: string[] | null;
          availability?: Json | null;
          broth?: Json | null;
          cooking?: Json;
          created_at?: string | null;
          customization?: Json | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          garnish?: string[] | null;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          is_public?: boolean;
          main_ingredients?: string[];
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          pricing?: Json | null;
          proteins?: string[] | null;
          serving?: Json;
          slug?: string;
          soup_type?: Json;
          source_note?: string | null;
          source_url?: string | null;
          stable_key?: string | null;
          status?: string;
          style?: string;
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          vegetables?: string[] | null;
          version?: number | null;
        };
        Relationships: [];
      };
      southafrican: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      spanish: {
        Row: {
          allergens: Json | null;
          category: string;
          created_at: string | null;
          description: string;
          dietary: Json | null;
          dish_type: string | null;
          id: string;
          image_url: string | null;
          intolerances: Json | null;
          is_available: boolean | null;
          is_public: boolean;
          is_traditional: boolean | null;
          name: string;
          origin: Json;
          owner_id: string | null;
          prep_time_min: number | null;
          price_default: number | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: Json | null;
          category: string;
          created_at?: string | null;
          description: string;
          dietary?: Json | null;
          dish_type?: string | null;
          id: string;
          image_url?: string | null;
          intolerances?: Json | null;
          is_available?: boolean | null;
          is_public?: boolean;
          is_traditional?: boolean | null;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: Json | null;
          category?: string;
          created_at?: string | null;
          description?: string;
          dietary?: Json | null;
          dish_type?: string | null;
          id?: string;
          image_url?: string | null;
          intolerances?: Json | null;
          is_available?: boolean | null;
          is_public?: boolean;
          is_traditional?: boolean | null;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          prep_time_min?: number | null;
          price_default?: number | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      spirits: {
        Row: {
          abv: number;
          age_statement: string | null;
          age_years: number | null;
          allergens: string[];
          awards: string[] | null;
          base_ingredient: string;
          brand: string;
          cask_type: string | null;
          category: string;
          cocktail_uses: string[] | null;
          color: string | null;
          country: string;
          created_at: string | null;
          description: string;
          distillery: string | null;
          finish: string | null;
          flavor_profiles: string[];
          food_pairings: string[] | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_gluten_free: boolean;
          is_kosher: boolean;
          is_organic: boolean;
          is_public: boolean;
          is_vegan: boolean;
          name: string;
          nose: string | null;
          optimal_temperature: string | null;
          origin: Json;
          owner_id: string | null;
          palate: string | null;
          popularity: number;
          price_tier: string;
          production_method: string | null;
          region: string;
          serving_suggestions: string[];
          slug: string;
          status: string;
          subcategory: string;
          tags: string[];
          tasting_notes: string | null;
          updated_at: string | null;
          volume_ml: number;
          year_established: number | null;
        };
        Insert: {
          abv: number;
          age_statement?: string | null;
          age_years?: number | null;
          allergens?: string[];
          awards?: string[] | null;
          base_ingredient: string;
          brand: string;
          cask_type?: string | null;
          category: string;
          cocktail_uses?: string[] | null;
          color?: string | null;
          country: string;
          created_at?: string | null;
          description: string;
          distillery?: string | null;
          finish?: string | null;
          flavor_profiles?: string[];
          food_pairings?: string[] | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_gluten_free?: boolean;
          is_kosher?: boolean;
          is_organic?: boolean;
          is_public?: boolean;
          is_vegan?: boolean;
          name: string;
          nose?: string | null;
          optimal_temperature?: string | null;
          origin?: Json;
          owner_id?: string | null;
          palate?: string | null;
          popularity?: number;
          price_tier?: string;
          production_method?: string | null;
          region: string;
          serving_suggestions?: string[];
          slug: string;
          status?: string;
          subcategory: string;
          tags?: string[];
          tasting_notes?: string | null;
          updated_at?: string | null;
          volume_ml?: number;
          year_established?: number | null;
        };
        Update: {
          abv?: number;
          age_statement?: string | null;
          age_years?: number | null;
          allergens?: string[];
          awards?: string[] | null;
          base_ingredient?: string;
          brand?: string;
          cask_type?: string | null;
          category?: string;
          cocktail_uses?: string[] | null;
          color?: string | null;
          country?: string;
          created_at?: string | null;
          description?: string;
          distillery?: string | null;
          finish?: string | null;
          flavor_profiles?: string[];
          food_pairings?: string[] | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_gluten_free?: boolean;
          is_kosher?: boolean;
          is_organic?: boolean;
          is_public?: boolean;
          is_vegan?: boolean;
          name?: string;
          nose?: string | null;
          optimal_temperature?: string | null;
          origin?: Json;
          owner_id?: string | null;
          palate?: string | null;
          popularity?: number;
          price_tier?: string;
          production_method?: string | null;
          region?: string;
          serving_suggestions?: string[];
          slug?: string;
          status?: string;
          subcategory?: string;
          tags?: string[];
          tasting_notes?: string | null;
          updated_at?: string | null;
          volume_ml?: number;
          year_established?: number | null;
        };
        Relationships: [];
      };
      staff_achievements: {
        Row: {
          achievement_type: string;
          awarded_by: string | null;
          awarded_by_ai: boolean;
          created_at: string | null;
          description: string | null;
          id: string;
          is_public: boolean;
          location_id: string;
          metric_value: number | null;
          period_end: string;
          period_start: string;
          reward_claimed: boolean | null;
          reward_claimed_at: string | null;
          reward_type: string | null;
          reward_value: string | null;
          staff_id: string;
          title: string;
        };
        Insert: {
          achievement_type: string;
          awarded_by?: string | null;
          awarded_by_ai?: boolean;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          location_id: string;
          metric_value?: number | null;
          period_end: string;
          period_start: string;
          reward_claimed?: boolean | null;
          reward_claimed_at?: string | null;
          reward_type?: string | null;
          reward_value?: string | null;
          staff_id: string;
          title: string;
        };
        Update: {
          achievement_type?: string;
          awarded_by?: string | null;
          awarded_by_ai?: boolean;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          location_id?: string;
          metric_value?: number | null;
          period_end?: string;
          period_start?: string;
          reward_claimed?: boolean | null;
          reward_claimed_at?: string | null;
          reward_type?: string | null;
          reward_value?: string | null;
          staff_id?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'staff_achievements_awarded_by_fkey';
            columns: ['awarded_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_achievements_awarded_by_fkey';
            columns: ['awarded_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_achievements_awarded_by_fkey';
            columns: ['awarded_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_achievements_awarded_by_fkey';
            columns: ['awarded_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_achievements_awarded_by_fkey';
            columns: ['awarded_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_achievements_awarded_by_fkey';
            columns: ['awarded_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_achievements_awarded_by_fkey';
            columns: ['awarded_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_achievements_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_achievements_staff_id_fkey';
            columns: ['staff_id'];
            isOneToOne: false;
            referencedRelation: 'staff_profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      staff_invitations: {
        Row: {
          accepted_account_id: string | null;
          brand_id: string | null;
          created_at: string;
          decline_reason: string | null;
          email: string;
          email_sent_at: string | null;
          expires_at: string;
          first_name: string | null;
          id: string;
          invite_token: string;
          inviter_account_id: string;
          last_name: string | null;
          location_id: string | null;
          message: string | null;
          organization_id: string;
          permissions: Json;
          reminder_sent_at: string | null;
          responded_at: string | null;
          role_title: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          accepted_account_id?: string | null;
          brand_id?: string | null;
          created_at?: string;
          decline_reason?: string | null;
          email: string;
          email_sent_at?: string | null;
          expires_at?: string;
          first_name?: string | null;
          id?: string;
          invite_token?: string;
          inviter_account_id: string;
          last_name?: string | null;
          location_id?: string | null;
          message?: string | null;
          organization_id: string;
          permissions?: Json;
          reminder_sent_at?: string | null;
          responded_at?: string | null;
          role_title?: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          accepted_account_id?: string | null;
          brand_id?: string | null;
          created_at?: string;
          decline_reason?: string | null;
          email?: string;
          email_sent_at?: string | null;
          expires_at?: string;
          first_name?: string | null;
          id?: string;
          invite_token?: string;
          inviter_account_id?: string;
          last_name?: string | null;
          location_id?: string | null;
          message?: string | null;
          organization_id?: string;
          permissions?: Json;
          reminder_sent_at?: string | null;
          responded_at?: string | null;
          role_title?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'staff_invitations_accepted_account_id_fkey';
            columns: ['accepted_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_invitations_accepted_account_id_fkey';
            columns: ['accepted_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_invitations_accepted_account_id_fkey';
            columns: ['accepted_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_invitations_accepted_account_id_fkey';
            columns: ['accepted_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_invitations_accepted_account_id_fkey';
            columns: ['accepted_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_invitations_accepted_account_id_fkey';
            columns: ['accepted_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_invitations_accepted_account_id_fkey';
            columns: ['accepted_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_invitations_brand_id_fkey';
            columns: ['brand_id'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_invitations_inviter_account_id_fkey';
            columns: ['inviter_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_invitations_inviter_account_id_fkey';
            columns: ['inviter_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_invitations_inviter_account_id_fkey';
            columns: ['inviter_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_invitations_inviter_account_id_fkey';
            columns: ['inviter_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_invitations_inviter_account_id_fkey';
            columns: ['inviter_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_invitations_inviter_account_id_fkey';
            columns: ['inviter_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_invitations_inviter_account_id_fkey';
            columns: ['inviter_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_invitations_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_invitations_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      staff_performance_metrics: {
        Row: {
          ai_improvements: string[] | null;
          ai_strengths: string[] | null;
          ai_summary: string | null;
          average_rating: number | null;
          category_counts: Json | null;
          created_at: string | null;
          id: string;
          location_id: string;
          period_end: string;
          period_start: string;
          period_type: string;
          positive_rate: number | null;
          punctuality_rate: number | null;
          rank_in_location: number | null;
          reviews_count: number;
          shifts_completed: number | null;
          shifts_scheduled: number | null;
          staff_id: string;
          vs_previous_period: number | null;
        };
        Insert: {
          ai_improvements?: string[] | null;
          ai_strengths?: string[] | null;
          ai_summary?: string | null;
          average_rating?: number | null;
          category_counts?: Json | null;
          created_at?: string | null;
          id?: string;
          location_id: string;
          period_end: string;
          period_start: string;
          period_type: string;
          positive_rate?: number | null;
          punctuality_rate?: number | null;
          rank_in_location?: number | null;
          reviews_count?: number;
          shifts_completed?: number | null;
          shifts_scheduled?: number | null;
          staff_id: string;
          vs_previous_period?: number | null;
        };
        Update: {
          ai_improvements?: string[] | null;
          ai_strengths?: string[] | null;
          ai_summary?: string | null;
          average_rating?: number | null;
          category_counts?: Json | null;
          created_at?: string | null;
          id?: string;
          location_id?: string;
          period_end?: string;
          period_start?: string;
          period_type?: string;
          positive_rate?: number | null;
          punctuality_rate?: number | null;
          rank_in_location?: number | null;
          reviews_count?: number;
          shifts_completed?: number | null;
          shifts_scheduled?: number | null;
          staff_id?: string;
          vs_previous_period?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'staff_performance_metrics_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_performance_metrics_staff_id_fkey';
            columns: ['staff_id'];
            isOneToOne: false;
            referencedRelation: 'staff_profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      staff_profiles: {
        Row: {
          account_id: string;
          average_rating: number | null;
          bio: string | null;
          created_at: string | null;
          display_name: string;
          employment_type: string;
          hire_date: string | null;
          id: string;
          is_public: boolean;
          job_title: string;
          languages: string[] | null;
          location_id: string;
          photo_url: string | null;
          positive_review_rate: number | null;
          show_photo: boolean;
          show_specialties: boolean;
          specialties: string[] | null;
          status: string;
          total_reviews: number;
          updated_at: string | null;
        };
        Insert: {
          account_id: string;
          average_rating?: number | null;
          bio?: string | null;
          created_at?: string | null;
          display_name: string;
          employment_type?: string;
          hire_date?: string | null;
          id?: string;
          is_public?: boolean;
          job_title?: string;
          languages?: string[] | null;
          location_id: string;
          photo_url?: string | null;
          positive_review_rate?: number | null;
          show_photo?: boolean;
          show_specialties?: boolean;
          specialties?: string[] | null;
          status?: string;
          total_reviews?: number;
          updated_at?: string | null;
        };
        Update: {
          account_id?: string;
          average_rating?: number | null;
          bio?: string | null;
          created_at?: string | null;
          display_name?: string;
          employment_type?: string;
          hire_date?: string | null;
          id?: string;
          is_public?: boolean;
          job_title?: string;
          languages?: string[] | null;
          location_id?: string;
          photo_url?: string | null;
          positive_review_rate?: number | null;
          show_photo?: boolean;
          show_specialties?: boolean;
          specialties?: string[] | null;
          status?: string;
          total_reviews?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'staff_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_profiles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_profiles_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      staff_reviews: {
        Row: {
          categories: string[] | null;
          comment: string | null;
          created_at: string | null;
          flagged_at: string | null;
          flagged_reason: string | null;
          id: string;
          is_anonymous: boolean;
          is_verified: boolean;
          is_visible: boolean;
          location_id: string;
          order_id: string | null;
          points_awarded: number | null;
          rating: number;
          reviewer_account_id: string | null;
          source: string;
          staff_id: string;
        };
        Insert: {
          categories?: string[] | null;
          comment?: string | null;
          created_at?: string | null;
          flagged_at?: string | null;
          flagged_reason?: string | null;
          id?: string;
          is_anonymous?: boolean;
          is_verified?: boolean;
          is_visible?: boolean;
          location_id: string;
          order_id?: string | null;
          points_awarded?: number | null;
          rating: number;
          reviewer_account_id?: string | null;
          source?: string;
          staff_id: string;
        };
        Update: {
          categories?: string[] | null;
          comment?: string | null;
          created_at?: string | null;
          flagged_at?: string | null;
          flagged_reason?: string | null;
          id?: string;
          is_anonymous?: boolean;
          is_verified?: boolean;
          is_visible?: boolean;
          location_id?: string;
          order_id?: string | null;
          points_awarded?: number | null;
          rating?: number;
          reviewer_account_id?: string | null;
          source?: string;
          staff_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'staff_reviews_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_reviews_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_reviews_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_reviews_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_reviews_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_reviews_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_reviews_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_reviews_reviewer_account_id_fkey';
            columns: ['reviewer_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'staff_reviews_staff_id_fkey';
            columns: ['staff_id'];
            isOneToOne: false;
            referencedRelation: 'staff_profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      steaks: {
        Row: {
          allergens: string[];
          bone_in: boolean;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string;
          cut: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          grade: string | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          internal_temp_c: number | null;
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_kosher: boolean;
          is_nut_free: boolean;
          is_public: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          origin: Json;
          origin_country: string | null;
          origin_region: string | null;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          recommended_doneness: string | null;
          recommended_sides: string[];
          serves: number | null;
          slug: string;
          spice_level: number;
          status: string;
          style: string;
          tags: string[];
          updated_at: string;
          weight_g: number | null;
          wine_pairing: string[];
        };
        Insert: {
          allergens?: string[];
          bone_in?: boolean;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string;
          cut?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          grade?: string | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          internal_temp_c?: number | null;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          origin?: Json;
          origin_country?: string | null;
          origin_region?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          recommended_doneness?: string | null;
          recommended_sides?: string[];
          serves?: number | null;
          slug: string;
          spice_level?: number;
          status?: string;
          style?: string;
          tags?: string[];
          updated_at?: string;
          weight_g?: number | null;
          wine_pairing?: string[];
        };
        Update: {
          allergens?: string[];
          bone_in?: boolean;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string;
          cut?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          grade?: string | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          internal_temp_c?: number | null;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          origin_region?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          recommended_doneness?: string | null;
          recommended_sides?: string[];
          serves?: number | null;
          slug?: string;
          spice_level?: number;
          status?: string;
          style?: string;
          tags?: string[];
          updated_at?: string;
          weight_g?: number | null;
          wine_pairing?: string[];
        };
        Relationships: [];
      };
      subscription_plan_limits: {
        Row: {
          ai_features: boolean | null;
          analytics_retention_days: number | null;
          annual_price_usd: number | null;
          created_at: string | null;
          display_name: string;
          max_brands: number | null;
          max_custom_domains: number | null;
          max_locations: number | null;
          max_team_members: number | null;
          monthly_price_usd: number | null;
          plan: string;
          priority_support: boolean | null;
          white_label_backoffice: boolean | null;
          white_label_menu: boolean | null;
        };
        Insert: {
          ai_features?: boolean | null;
          analytics_retention_days?: number | null;
          annual_price_usd?: number | null;
          created_at?: string | null;
          display_name: string;
          max_brands?: number | null;
          max_custom_domains?: number | null;
          max_locations?: number | null;
          max_team_members?: number | null;
          monthly_price_usd?: number | null;
          plan: string;
          priority_support?: boolean | null;
          white_label_backoffice?: boolean | null;
          white_label_menu?: boolean | null;
        };
        Update: {
          ai_features?: boolean | null;
          analytics_retention_days?: number | null;
          annual_price_usd?: number | null;
          created_at?: string | null;
          display_name?: string;
          max_brands?: number | null;
          max_custom_domains?: number | null;
          max_locations?: number | null;
          max_team_members?: number | null;
          monthly_price_usd?: number | null;
          plan?: string;
          priority_support?: boolean | null;
          white_label_backoffice?: boolean | null;
          white_label_menu?: boolean | null;
        };
        Relationships: [];
      };
      suggestion_comments: {
        Row: {
          account_id: string;
          comment: string;
          created_at: string;
          id: string;
          is_moderator_comment: boolean | null;
          suggestion_id: string;
        };
        Insert: {
          account_id: string;
          comment: string;
          created_at?: string;
          id?: string;
          is_moderator_comment?: boolean | null;
          suggestion_id: string;
        };
        Update: {
          account_id?: string;
          comment?: string;
          created_at?: string;
          id?: string;
          is_moderator_comment?: boolean | null;
          suggestion_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'suggestion_comments_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'suggestion_comments_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'suggestion_comments_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'suggestion_comments_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'suggestion_comments_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'suggestion_comments_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'suggestion_comments_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'suggestion_comments_suggestion_id_fkey';
            columns: ['suggestion_id'];
            isOneToOne: false;
            referencedRelation: 'improvement_suggestions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'suggestion_comments_suggestion_id_fkey';
            columns: ['suggestion_id'];
            isOneToOne: false;
            referencedRelation: 'v_recent_suggestions';
            referencedColumns: ['id'];
          },
        ];
      };
      suggestion_votes: {
        Row: {
          account_id: string;
          created_at: string;
          id: string;
          suggestion_id: string;
          vote_type: string;
        };
        Insert: {
          account_id: string;
          created_at?: string;
          id?: string;
          suggestion_id: string;
          vote_type: string;
        };
        Update: {
          account_id?: string;
          created_at?: string;
          id?: string;
          suggestion_id?: string;
          vote_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'suggestion_votes_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'suggestion_votes_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'suggestion_votes_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'suggestion_votes_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'suggestion_votes_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'suggestion_votes_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'suggestion_votes_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'suggestion_votes_suggestion_id_fkey';
            columns: ['suggestion_id'];
            isOneToOne: false;
            referencedRelation: 'improvement_suggestions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'suggestion_votes_suggestion_id_fkey';
            columns: ['suggestion_id'];
            isOneToOne: false;
            referencedRelation: 'v_recent_suggestions';
            referencedColumns: ['id'];
          },
        ];
      };
      supported_cryptocurrencies: {
        Row: {
          address_example: string | null;
          address_regex: string | null;
          coingecko_id: string | null;
          color: string | null;
          created_at: string;
          decimals: number | null;
          explorer_address_url_template: string | null;
          explorer_name: string;
          explorer_tx_url_template: string;
          icon_url: string | null;
          id: string;
          is_active: boolean | null;
          min_confirmations: number | null;
          name: string;
          network: string;
          sort_order: number | null;
          symbol: string;
        };
        Insert: {
          address_example?: string | null;
          address_regex?: string | null;
          coingecko_id?: string | null;
          color?: string | null;
          created_at?: string;
          decimals?: number | null;
          explorer_address_url_template?: string | null;
          explorer_name: string;
          explorer_tx_url_template: string;
          icon_url?: string | null;
          id?: string;
          is_active?: boolean | null;
          min_confirmations?: number | null;
          name: string;
          network: string;
          sort_order?: number | null;
          symbol: string;
        };
        Update: {
          address_example?: string | null;
          address_regex?: string | null;
          coingecko_id?: string | null;
          color?: string | null;
          created_at?: string;
          decimals?: number | null;
          explorer_address_url_template?: string | null;
          explorer_name?: string;
          explorer_tx_url_template?: string;
          icon_url?: string | null;
          id?: string;
          is_active?: boolean | null;
          min_confirmations?: number | null;
          name?: string;
          network?: string;
          sort_order?: number | null;
          symbol?: string;
        };
        Relationships: [];
      };
      swiss: {
        Row: {
          allergens: string[];
          category: string;
          cooking_method: string | null;
          created_at: string;
          description: string;
          dietary: Json;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          intolerances: string[];
          local_name: string;
          name: string;
          popularity: number;
          prep_time_min: number | null;
          price_default: number | null;
          protein_type: string | null;
          region: string;
          slug: string;
          spice_level: number;
          status: string;
          tags: string[] | null;
          updated_at: string;
        };
        Insert: {
          allergens?: string[];
          category: string;
          cooking_method?: string | null;
          created_at?: string;
          description: string;
          dietary?: Json;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          intolerances?: string[];
          local_name: string;
          name: string;
          popularity?: number;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region: string;
          slug: string;
          spice_level?: number;
          status?: string;
          tags?: string[] | null;
          updated_at?: string;
        };
        Update: {
          allergens?: string[];
          category?: string;
          cooking_method?: string | null;
          created_at?: string;
          description?: string;
          dietary?: Json;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          intolerances?: string[];
          local_name?: string;
          name?: string;
          popularity?: number;
          prep_time_min?: number | null;
          price_default?: number | null;
          protein_type?: string | null;
          region?: string;
          slug?: string;
          spice_level?: number;
          status?: string;
          tags?: string[] | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      tea: {
        Row: {
          allergens: string[] | null;
          available_milks: Database['public']['Enums']['milk_type'][] | null;
          available_syrups: string[] | null;
          available_toppings: Database['public']['Enums']['boba_topping'][] | null;
          bubble_tea_base: Database['public']['Enums']['bubble_tea_base'] | null;
          caffeine_level: Database['public']['Enums']['tea_caffeine_level'];
          caffeine_mg: number | null;
          calories_per_serving: number | null;
          can_adjust_ice: boolean | null;
          can_adjust_sweetness: boolean | null;
          category: Database['public']['Enums']['tea_category'];
          chain_style_decoration: string | null;
          created_at: string | null;
          default_milk: Database['public']['Enums']['milk_type'] | null;
          default_toppings: Database['public']['Enums']['boba_topping'][] | null;
          description: string;
          fat_g: number | null;
          glass_type: string | null;
          id: string;
          image_url: string | null;
          ingredient_cost_usd: number | null;
          ingredient_ids: string[] | null;
          is_caffeine_free: boolean | null;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_public: boolean;
          is_seasonal: boolean | null;
          is_signature: boolean | null;
          is_sugar_free: boolean | null;
          is_vegan: boolean | null;
          main_ingredients: string[];
          name: string;
          origin: Json;
          origin_country: string | null;
          owner_id: string | null;
          popularity: number | null;
          premium_style_decoration: string | null;
          prep_time_seconds: number | null;
          preparation_method: string | null;
          preparation_notes: string | null;
          profit_margin_percent: number | null;
          protein_g: number | null;
          quantity_description: string | null;
          selling_price_usd: number | null;
          skill_level: number | null;
          slug: string;
          steep_time_seconds: number | null;
          style: Database['public']['Enums']['tea_style'];
          sugar_g: number | null;
          sweetness: Database['public']['Enums']['tea_sweetness'];
          tags: string[] | null;
          updated_at: string | null;
          volume_ml: number | null;
          water_temperature_c: number | null;
        };
        Insert: {
          allergens?: string[] | null;
          available_milks?: Database['public']['Enums']['milk_type'][] | null;
          available_syrups?: string[] | null;
          available_toppings?: Database['public']['Enums']['boba_topping'][] | null;
          bubble_tea_base?: Database['public']['Enums']['bubble_tea_base'] | null;
          caffeine_level: Database['public']['Enums']['tea_caffeine_level'];
          caffeine_mg?: number | null;
          calories_per_serving?: number | null;
          can_adjust_ice?: boolean | null;
          can_adjust_sweetness?: boolean | null;
          category: Database['public']['Enums']['tea_category'];
          chain_style_decoration?: string | null;
          created_at?: string | null;
          default_milk?: Database['public']['Enums']['milk_type'] | null;
          default_toppings?: Database['public']['Enums']['boba_topping'][] | null;
          description: string;
          fat_g?: number | null;
          glass_type?: string | null;
          id: string;
          image_url?: string | null;
          ingredient_cost_usd?: number | null;
          ingredient_ids?: string[] | null;
          is_caffeine_free?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_public?: boolean;
          is_seasonal?: boolean | null;
          is_signature?: boolean | null;
          is_sugar_free?: boolean | null;
          is_vegan?: boolean | null;
          main_ingredients?: string[];
          name: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          premium_style_decoration?: string | null;
          prep_time_seconds?: number | null;
          preparation_method?: string | null;
          preparation_notes?: string | null;
          profit_margin_percent?: number | null;
          protein_g?: number | null;
          quantity_description?: string | null;
          selling_price_usd?: number | null;
          skill_level?: number | null;
          slug: string;
          steep_time_seconds?: number | null;
          style: Database['public']['Enums']['tea_style'];
          sugar_g?: number | null;
          sweetness: Database['public']['Enums']['tea_sweetness'];
          tags?: string[] | null;
          updated_at?: string | null;
          volume_ml?: number | null;
          water_temperature_c?: number | null;
        };
        Update: {
          allergens?: string[] | null;
          available_milks?: Database['public']['Enums']['milk_type'][] | null;
          available_syrups?: string[] | null;
          available_toppings?: Database['public']['Enums']['boba_topping'][] | null;
          bubble_tea_base?: Database['public']['Enums']['bubble_tea_base'] | null;
          caffeine_level?: Database['public']['Enums']['tea_caffeine_level'];
          caffeine_mg?: number | null;
          calories_per_serving?: number | null;
          can_adjust_ice?: boolean | null;
          can_adjust_sweetness?: boolean | null;
          category?: Database['public']['Enums']['tea_category'];
          chain_style_decoration?: string | null;
          created_at?: string | null;
          default_milk?: Database['public']['Enums']['milk_type'] | null;
          default_toppings?: Database['public']['Enums']['boba_topping'][] | null;
          description?: string;
          fat_g?: number | null;
          glass_type?: string | null;
          id?: string;
          image_url?: string | null;
          ingredient_cost_usd?: number | null;
          ingredient_ids?: string[] | null;
          is_caffeine_free?: boolean | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_public?: boolean;
          is_seasonal?: boolean | null;
          is_signature?: boolean | null;
          is_sugar_free?: boolean | null;
          is_vegan?: boolean | null;
          main_ingredients?: string[];
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          premium_style_decoration?: string | null;
          prep_time_seconds?: number | null;
          preparation_method?: string | null;
          preparation_notes?: string | null;
          profit_margin_percent?: number | null;
          protein_g?: number | null;
          quantity_description?: string | null;
          selling_price_usd?: number | null;
          skill_level?: number | null;
          slug?: string;
          steep_time_seconds?: number | null;
          style?: Database['public']['Enums']['tea_style'];
          sugar_g?: number | null;
          sweetness?: Database['public']['Enums']['tea_sweetness'];
          tags?: string[] | null;
          updated_at?: string | null;
          volume_ml?: number | null;
          water_temperature_c?: number | null;
        };
        Relationships: [];
      };
      texmex: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      thai: {
        Row: {
          allergens: string[];
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string;
          created_at: string;
          curry_type: string;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          has_coconut_milk: boolean;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_nut_free: boolean;
          is_pescatarian: boolean;
          is_public: boolean;
          is_street_food: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          owner_id: string | null;
          popularity: number;
          protein_g: number | null;
          protein_type: string;
          region: string;
          slug: string;
          spice_level: number;
          status: string;
          tags: string[];
          thai_name: string | null;
          thai_script: string | null;
          updated_at: string;
        };
        Insert: {
          allergens?: string[];
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method: string;
          created_at?: string;
          curry_type?: string;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          has_coconut_milk?: boolean;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_nut_free?: boolean;
          is_pescatarian?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          protein_type: string;
          region: string;
          slug: string;
          spice_level?: number;
          status?: string;
          tags?: string[];
          thai_name?: string | null;
          thai_script?: string | null;
          updated_at?: string;
        };
        Update: {
          allergens?: string[];
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string;
          created_at?: string;
          curry_type?: string;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          has_coconut_milk?: boolean;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_nut_free?: boolean;
          is_pescatarian?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          owner_id?: string | null;
          popularity?: number;
          protein_g?: number | null;
          protein_type?: string;
          region?: string;
          slug?: string;
          spice_level?: number;
          status?: string;
          tags?: string[];
          thai_name?: string | null;
          thai_script?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      tour_operators: {
        Row: {
          booking_method: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          country_code: string;
          created_at: string | null;
          data_source: string | null;
          id: string;
          is_active: boolean | null;
          is_verified: boolean | null;
          meal_budget_max: number | null;
          meal_budget_min: number | null;
          name: string;
          operator_type: string | null;
          pois_visited: string[] | null;
          regions_covered: string[] | null;
          response_rate: number | null;
          typical_group_size_max: number | null;
          typical_group_size_min: number | null;
          updated_at: string | null;
          volume_estimate: string | null;
          website: string | null;
        };
        Insert: {
          booking_method?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          country_code: string;
          created_at?: string | null;
          data_source?: string | null;
          id?: string;
          is_active?: boolean | null;
          is_verified?: boolean | null;
          meal_budget_max?: number | null;
          meal_budget_min?: number | null;
          name: string;
          operator_type?: string | null;
          pois_visited?: string[] | null;
          regions_covered?: string[] | null;
          response_rate?: number | null;
          typical_group_size_max?: number | null;
          typical_group_size_min?: number | null;
          updated_at?: string | null;
          volume_estimate?: string | null;
          website?: string | null;
        };
        Update: {
          booking_method?: string | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          country_code?: string;
          created_at?: string | null;
          data_source?: string | null;
          id?: string;
          is_active?: boolean | null;
          is_verified?: boolean | null;
          meal_budget_max?: number | null;
          meal_budget_min?: number | null;
          name?: string;
          operator_type?: string | null;
          pois_visited?: string[] | null;
          regions_covered?: string[] | null;
          response_rate?: number | null;
          typical_group_size_max?: number | null;
          typical_group_size_min?: number | null;
          updated_at?: string | null;
          volume_estimate?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      tourism_product_templates: {
        Row: {
          created_at: string | null;
          description_template: string | null;
          display_order: number | null;
          duration_minutes: number | null;
          id: string;
          includes: string[] | null;
          is_active: boolean | null;
          max_group_size: number | null;
          min_group_size: number | null;
          product_name: string;
          product_slug: string;
          suggested_price_max: number | null;
          suggested_price_min: number | null;
          target: string | null;
          venue_type: string;
        };
        Insert: {
          created_at?: string | null;
          description_template?: string | null;
          display_order?: number | null;
          duration_minutes?: number | null;
          id?: string;
          includes?: string[] | null;
          is_active?: boolean | null;
          max_group_size?: number | null;
          min_group_size?: number | null;
          product_name: string;
          product_slug: string;
          suggested_price_max?: number | null;
          suggested_price_min?: number | null;
          target?: string | null;
          venue_type: string;
        };
        Update: {
          created_at?: string | null;
          description_template?: string | null;
          display_order?: number | null;
          duration_minutes?: number | null;
          id?: string;
          includes?: string[] | null;
          is_active?: boolean | null;
          max_group_size?: number | null;
          min_group_size?: number | null;
          product_name?: string;
          product_slug?: string;
          suggested_price_max?: number | null;
          suggested_price_min?: number | null;
          target?: string | null;
          venue_type?: string;
        };
        Relationships: [];
      };
      tourist_pois: {
        Row: {
          annual_visitors: number | null;
          city: string;
          country_code: string;
          created_at: string | null;
          id: string;
          latitude: number | null;
          longitude: number | null;
          meal_opportunity: string | null;
          name: string;
          peak_seasons: string[] | null;
          slug: string;
          typical_visit_duration: number | null;
        };
        Insert: {
          annual_visitors?: number | null;
          city: string;
          country_code: string;
          created_at?: string | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          meal_opportunity?: string | null;
          name: string;
          peak_seasons?: string[] | null;
          slug: string;
          typical_visit_duration?: number | null;
        };
        Update: {
          annual_visitors?: number | null;
          city?: string;
          country_code?: string;
          created_at?: string | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          meal_opportunity?: string | null;
          name?: string;
          peak_seasons?: string[] | null;
          slug?: string;
          typical_visit_duration?: number | null;
        };
        Relationships: [];
      };
      translations: {
        Row: {
          created_at: string | null;
          entity_id: string;
          entity_type: string;
          field: string;
          id: number;
          is_verified: boolean | null;
          locale: string;
          translated_by: string | null;
          updated_at: string | null;
          value: string;
          verified_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          entity_id: string;
          entity_type: string;
          field: string;
          id?: number;
          is_verified?: boolean | null;
          locale: string;
          translated_by?: string | null;
          updated_at?: string | null;
          value: string;
          verified_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          entity_id?: string;
          entity_type?: string;
          field?: string;
          id?: number;
          is_verified?: boolean | null;
          locale?: string;
          translated_by?: string | null;
          updated_at?: string | null;
          value?: string;
          verified_by?: string | null;
        };
        Relationships: [];
      };
      turkish: {
        Row: {
          allergens: Json | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string;
          created_at: string | null;
          description: string;
          dish_type: string | null;
          fat_g: number | null;
          id: string;
          image_url: string | null;
          is_breakfast_item: boolean;
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_meze: boolean;
          is_nut_free: boolean;
          is_public: boolean;
          is_street_food: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          protein_type: string;
          region: string;
          served_hot: boolean;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: Json | null;
          turkish_name: string;
          updated_at: string | null;
        };
        Insert: {
          allergens?: Json | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method: string;
          created_at?: string | null;
          description: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id: string;
          image_url?: string | null;
          is_breakfast_item?: boolean;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_meze?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type: string;
          region: string;
          served_hot?: boolean;
          slug: string;
          spice_level?: number | null;
          status: string;
          tags?: Json | null;
          turkish_name: string;
          updated_at?: string | null;
        };
        Update: {
          allergens?: Json | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string;
          created_at?: string | null;
          description?: string;
          dish_type?: string | null;
          fat_g?: number | null;
          id?: string;
          image_url?: string | null;
          is_breakfast_item?: boolean;
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_meze?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_street_food?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string;
          region?: string;
          served_hot?: boolean;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: Json | null;
          turkish_name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      vegetarian: {
        Row: {
          allergens: Json | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          cuisine: string;
          description: string | null;
          dish_type: string | null;
          fat_g: number | null;
          fiber_g: number | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_dairy_free: boolean;
          is_gluten_free: boolean;
          is_halal: boolean;
          is_high_protein: boolean;
          is_kosher: boolean;
          is_nut_free: boolean;
          is_public: boolean;
          is_signature: boolean | null;
          is_soy_free: boolean;
          is_vegan: boolean;
          is_vegetarian: boolean;
          name: string;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          protein_source: string;
          slug: string;
          sort_order: number | null;
          spice_level: number;
          status: string;
          tags: Json | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: Json | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          cuisine: string;
          description?: string | null;
          dish_type?: string | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_high_protein?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_signature?: boolean | null;
          is_soy_free?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name: string;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_source: string;
          slug: string;
          sort_order?: number | null;
          spice_level?: number;
          status?: string;
          tags?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: Json | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          cuisine?: string;
          description?: string | null;
          dish_type?: string | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_dairy_free?: boolean;
          is_gluten_free?: boolean;
          is_halal?: boolean;
          is_high_protein?: boolean;
          is_kosher?: boolean;
          is_nut_free?: boolean;
          is_public?: boolean;
          is_signature?: boolean | null;
          is_soy_free?: boolean;
          is_vegan?: boolean;
          is_vegetarian?: boolean;
          name?: string;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_source?: string;
          slug?: string;
          sort_order?: number | null;
          spice_level?: number;
          status?: string;
          tags?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      venezuelan: {
        Row: {
          allergens: string[] | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          description: string | null;
          dietary: Json | null;
          id: string;
          name: string;
          popularity: number | null;
          prep_time_min: number | null;
          protein_type: string | null;
          region: string | null;
          slug: string;
          spice_level: number | null;
          status: string | null;
          tags: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id: string;
          name: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          description?: string | null;
          dietary?: Json | null;
          id?: string;
          name?: string;
          popularity?: number | null;
          prep_time_min?: number | null;
          protein_type?: string | null;
          region?: string | null;
          slug?: string;
          spice_level?: number | null;
          status?: string | null;
          tags?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      vietnamese: {
        Row: {
          allergens: string[] | null;
          broth_type: string | null;
          calories_per_serving: number | null;
          carbs_g: number | null;
          category: string;
          cooking_method: string | null;
          created_at: string | null;
          cuisine_influences: string[] | null;
          description: string | null;
          dish_type: string | null;
          fat_g: number | null;
          id: string;
          image_url: string | null;
          ingredient_ids: string[] | null;
          is_dairy_free: boolean | null;
          is_fusion: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_nut_free: boolean | null;
          is_pescatarian: boolean | null;
          is_public: boolean;
          is_street_food: boolean | null;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          is_vegetarian_adaptable: boolean | null;
          meal_types: string[] | null;
          name: string;
          origin: Json;
          origin_city: string | null;
          owner_id: string | null;
          popularity: number | null;
          protein_g: number | null;
          protein_type: string | null;
          region: string;
          slug: string;
          spice_level: number | null;
          status: string;
          tags: string[] | null;
          updated_at: string | null;
          vietnamese_name: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          broth_type?: string | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category: string;
          cooking_method?: string | null;
          created_at?: string | null;
          cuisine_influences?: string[] | null;
          description?: string | null;
          dish_type?: string | null;
          fat_g?: number | null;
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_fusion?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_nut_free?: boolean | null;
          is_pescatarian?: boolean | null;
          is_public?: boolean;
          is_street_food?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          is_vegetarian_adaptable?: boolean | null;
          meal_types?: string[] | null;
          name: string;
          origin?: Json;
          origin_city?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region: string;
          slug: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
          vietnamese_name?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          broth_type?: string | null;
          calories_per_serving?: number | null;
          carbs_g?: number | null;
          category?: string;
          cooking_method?: string | null;
          created_at?: string | null;
          cuisine_influences?: string[] | null;
          description?: string | null;
          dish_type?: string | null;
          fat_g?: number | null;
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[] | null;
          is_dairy_free?: boolean | null;
          is_fusion?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_nut_free?: boolean | null;
          is_pescatarian?: boolean | null;
          is_public?: boolean;
          is_street_food?: boolean | null;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          is_vegetarian_adaptable?: boolean | null;
          meal_types?: string[] | null;
          name?: string;
          origin?: Json;
          origin_city?: string | null;
          owner_id?: string | null;
          popularity?: number | null;
          protein_g?: number | null;
          protein_type?: string | null;
          region?: string;
          slug?: string;
          spice_level?: number | null;
          status?: string;
          tags?: string[] | null;
          updated_at?: string | null;
          vietnamese_name?: string | null;
        };
        Relationships: [];
      };
      waters: {
        Row: {
          allergens: string[] | null;
          bicarbonate_mg_l: number | null;
          bottle_types: string[] | null;
          brand: string;
          calcium_mg_l: number | null;
          calories_per_serving: number | null;
          carbonation: string;
          category: string;
          created_at: string | null;
          description: string | null;
          flavor: string | null;
          has_real_fruit: boolean | null;
          id: string;
          image_url: string | null;
          is_dairy_free: boolean | null;
          is_gluten_free: boolean | null;
          is_halal: boolean | null;
          is_kosher: boolean | null;
          is_nut_free: boolean | null;
          is_public: boolean;
          is_vegan: boolean | null;
          is_vegetarian: boolean | null;
          magnesium_mg_l: number | null;
          name: string;
          origin: Json;
          origin_country: string | null;
          origin_region: string | null;
          owner_id: string | null;
          ph_level: number | null;
          popularity: number | null;
          potassium_mg_l: number | null;
          serving_size_ml: number;
          serving_temp_c: number | null;
          silica_mg_l: number | null;
          slug: string;
          sodium_mg_l: number | null;
          source_type: string;
          spice_level: number | null;
          status: string;
          sugar_g: number | null;
          tags: string[] | null;
          tds_mg_l: number | null;
          updated_at: string | null;
        };
        Insert: {
          allergens?: string[] | null;
          bicarbonate_mg_l?: number | null;
          bottle_types?: string[] | null;
          brand: string;
          calcium_mg_l?: number | null;
          calories_per_serving?: number | null;
          carbonation: string;
          category: string;
          created_at?: string | null;
          description?: string | null;
          flavor?: string | null;
          has_real_fruit?: boolean | null;
          id: string;
          image_url?: string | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          magnesium_mg_l?: number | null;
          name: string;
          origin?: Json;
          origin_country?: string | null;
          origin_region?: string | null;
          owner_id?: string | null;
          ph_level?: number | null;
          popularity?: number | null;
          potassium_mg_l?: number | null;
          serving_size_ml: number;
          serving_temp_c?: number | null;
          silica_mg_l?: number | null;
          slug: string;
          sodium_mg_l?: number | null;
          source_type: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          tds_mg_l?: number | null;
          updated_at?: string | null;
        };
        Update: {
          allergens?: string[] | null;
          bicarbonate_mg_l?: number | null;
          bottle_types?: string[] | null;
          brand?: string;
          calcium_mg_l?: number | null;
          calories_per_serving?: number | null;
          carbonation?: string;
          category?: string;
          created_at?: string | null;
          description?: string | null;
          flavor?: string | null;
          has_real_fruit?: boolean | null;
          id?: string;
          image_url?: string | null;
          is_dairy_free?: boolean | null;
          is_gluten_free?: boolean | null;
          is_halal?: boolean | null;
          is_kosher?: boolean | null;
          is_nut_free?: boolean | null;
          is_public?: boolean;
          is_vegan?: boolean | null;
          is_vegetarian?: boolean | null;
          magnesium_mg_l?: number | null;
          name?: string;
          origin?: Json;
          origin_country?: string | null;
          origin_region?: string | null;
          owner_id?: string | null;
          ph_level?: number | null;
          popularity?: number | null;
          potassium_mg_l?: number | null;
          serving_size_ml?: number;
          serving_temp_c?: number | null;
          silica_mg_l?: number | null;
          slug?: string;
          sodium_mg_l?: number | null;
          source_type?: string;
          spice_level?: number | null;
          status?: string;
          sugar_g?: number | null;
          tags?: string[] | null;
          tds_mg_l?: number | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      weather_business_correlations: {
        Row: {
          created_at: string | null;
          delivery_orders: number | null;
          delivery_percentage: number | null;
          dine_in_orders: number | null;
          humidity_avg: number | null;
          id: string;
          location_id: string;
          observation_date: string;
          precipitation_mm: number | null;
          revenue_vs_average: number | null;
          takeaway_orders: number | null;
          temp_avg: number | null;
          temp_max: number | null;
          temp_min: number | null;
          total_orders: number | null;
          total_revenue: number | null;
          weather_conditions: string | null;
        };
        Insert: {
          created_at?: string | null;
          delivery_orders?: number | null;
          delivery_percentage?: number | null;
          dine_in_orders?: number | null;
          humidity_avg?: number | null;
          id?: string;
          location_id: string;
          observation_date: string;
          precipitation_mm?: number | null;
          revenue_vs_average?: number | null;
          takeaway_orders?: number | null;
          temp_avg?: number | null;
          temp_max?: number | null;
          temp_min?: number | null;
          total_orders?: number | null;
          total_revenue?: number | null;
          weather_conditions?: string | null;
        };
        Update: {
          created_at?: string | null;
          delivery_orders?: number | null;
          delivery_percentage?: number | null;
          dine_in_orders?: number | null;
          humidity_avg?: number | null;
          id?: string;
          location_id?: string;
          observation_date?: string;
          precipitation_mm?: number | null;
          revenue_vs_average?: number | null;
          takeaway_orders?: number | null;
          temp_avg?: number | null;
          temp_max?: number | null;
          temp_min?: number | null;
          total_orders?: number | null;
          total_revenue?: number | null;
          weather_conditions?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'weather_business_correlations_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      weather_trigger_executions: {
        Row: {
          action_result: Json | null;
          action_taken: string | null;
          approved_at: string | null;
          approved_by: string | null;
          autonomy_level_at_execution: number | null;
          conversions: number | null;
          executed_at: string | null;
          id: string;
          location_id: string;
          required_approval: boolean | null;
          revenue_attributed: number | null;
          status: string | null;
          trigger_conditions_snapshot: Json | null;
          trigger_id: string;
          triggered_at: string | null;
        };
        Insert: {
          action_result?: Json | null;
          action_taken?: string | null;
          approved_at?: string | null;
          approved_by?: string | null;
          autonomy_level_at_execution?: number | null;
          conversions?: number | null;
          executed_at?: string | null;
          id?: string;
          location_id: string;
          required_approval?: boolean | null;
          revenue_attributed?: number | null;
          status?: string | null;
          trigger_conditions_snapshot?: Json | null;
          trigger_id: string;
          triggered_at?: string | null;
        };
        Update: {
          action_result?: Json | null;
          action_taken?: string | null;
          approved_at?: string | null;
          approved_by?: string | null;
          autonomy_level_at_execution?: number | null;
          conversions?: number | null;
          executed_at?: string | null;
          id?: string;
          location_id?: string;
          required_approval?: boolean | null;
          revenue_attributed?: number | null;
          status?: string | null;
          trigger_conditions_snapshot?: Json | null;
          trigger_id?: string;
          triggered_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'weather_trigger_executions_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'weather_trigger_executions_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'weather_trigger_executions_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'weather_trigger_executions_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'weather_trigger_executions_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'weather_trigger_executions_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'weather_trigger_executions_approved_by_fkey';
            columns: ['approved_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'weather_trigger_executions_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'weather_trigger_executions_trigger_id_fkey';
            columns: ['trigger_id'];
            isOneToOne: false;
            referencedRelation: 'weather_triggers';
            referencedColumns: ['id'];
          },
        ];
      };
      weather_triggers: {
        Row: {
          action_config: Json | null;
          action_type: string;
          conditions: Json;
          cooldown_hours: number | null;
          created_at: string | null;
          description: string | null;
          id: string;
          is_active: boolean | null;
          last_triggered_at: string | null;
          location_id: string;
          max_executions_per_day: number | null;
          min_autonomy_level: number | null;
          name: string;
          times_triggered: number | null;
          updated_at: string | null;
        };
        Insert: {
          action_config?: Json | null;
          action_type: string;
          conditions: Json;
          cooldown_hours?: number | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_triggered_at?: string | null;
          location_id: string;
          max_executions_per_day?: number | null;
          min_autonomy_level?: number | null;
          name: string;
          times_triggered?: number | null;
          updated_at?: string | null;
        };
        Update: {
          action_config?: Json | null;
          action_type?: string;
          conditions?: Json;
          cooldown_hours?: number | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          last_triggered_at?: string | null;
          location_id?: string;
          max_executions_per_day?: number | null;
          min_autonomy_level?: number | null;
          name?: string;
          times_triggered?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'weather_triggers_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
        ];
      };
      wines: {
        Row: {
          abv_max: number;
          abv_min: number;
          acidity: Database['public']['Enums']['acidity_level'];
          aging_months: number | null;
          aging_potential_max_years: number | null;
          aging_potential_min_years: number | null;
          aging_vessel: string | null;
          allergens: string[];
          annual_production_bottles: number | null;
          aroma_profile: string[];
          avoid_with: string[] | null;
          body: Database['public']['Enums']['wine_body'];
          calories_per_glass: number;
          cheese_pairings: string[] | null;
          color: Database['public']['Enums']['wine_color'];
          contains_sulfites: boolean;
          created_at: string | null;
          decanting_minutes: number | null;
          description: string;
          finish: Database['public']['Enums']['finish_length'];
          food_categories: string[];
          glass_type: string;
          grape_varieties: string[];
          id: string;
          image_url: string | null;
          ingredient_ids: string[];
          is_biodynamic: boolean;
          is_blend: boolean;
          is_low_sulfite: boolean;
          is_natural: boolean;
          is_organic: boolean;
          is_public: boolean;
          is_vegan: boolean;
          name: string;
          oak: Database['public']['Enums']['oak_level'] | null;
          origin: Json;
          origin_appellation: string | null;
          origin_classification: string | null;
          origin_country: string;
          origin_country_code: string;
          origin_region: string;
          origin_subregion: string | null;
          owner_id: string | null;
          popularity: number;
          price_tier: Database['public']['Enums']['price_tier'];
          primary_flavors: string[];
          production_method: string | null;
          secondary_flavors: string[] | null;
          serving_temp_max_celsius: number;
          serving_temp_min_celsius: number;
          slug: string;
          specific_dishes: string[] | null;
          status: Database['public']['Enums']['wine_status'];
          style: Database['public']['Enums']['wine_style'];
          sweetness: Database['public']['Enums']['sweetness_level'];
          tags: string[];
          tannins: Database['public']['Enums']['tannin_level'] | null;
          tertiary_flavors: string[] | null;
          updated_at: string | null;
          vintage_type: Database['public']['Enums']['vintage_type'];
        };
        Insert: {
          abv_max: number;
          abv_min: number;
          acidity: Database['public']['Enums']['acidity_level'];
          aging_months?: number | null;
          aging_potential_max_years?: number | null;
          aging_potential_min_years?: number | null;
          aging_vessel?: string | null;
          allergens?: string[];
          annual_production_bottles?: number | null;
          aroma_profile?: string[];
          avoid_with?: string[] | null;
          body: Database['public']['Enums']['wine_body'];
          calories_per_glass?: number;
          cheese_pairings?: string[] | null;
          color: Database['public']['Enums']['wine_color'];
          contains_sulfites?: boolean;
          created_at?: string | null;
          decanting_minutes?: number | null;
          description: string;
          finish?: Database['public']['Enums']['finish_length'];
          food_categories?: string[];
          glass_type: string;
          grape_varieties?: string[];
          id: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_biodynamic?: boolean;
          is_blend?: boolean;
          is_low_sulfite?: boolean;
          is_natural?: boolean;
          is_organic?: boolean;
          is_public?: boolean;
          is_vegan?: boolean;
          name: string;
          oak?: Database['public']['Enums']['oak_level'] | null;
          origin?: Json;
          origin_appellation?: string | null;
          origin_classification?: string | null;
          origin_country: string;
          origin_country_code: string;
          origin_region: string;
          origin_subregion?: string | null;
          owner_id?: string | null;
          popularity?: number;
          price_tier?: Database['public']['Enums']['price_tier'];
          primary_flavors?: string[];
          production_method?: string | null;
          secondary_flavors?: string[] | null;
          serving_temp_max_celsius: number;
          serving_temp_min_celsius: number;
          slug: string;
          specific_dishes?: string[] | null;
          status?: Database['public']['Enums']['wine_status'];
          style: Database['public']['Enums']['wine_style'];
          sweetness: Database['public']['Enums']['sweetness_level'];
          tags?: string[];
          tannins?: Database['public']['Enums']['tannin_level'] | null;
          tertiary_flavors?: string[] | null;
          updated_at?: string | null;
          vintage_type?: Database['public']['Enums']['vintage_type'];
        };
        Update: {
          abv_max?: number;
          abv_min?: number;
          acidity?: Database['public']['Enums']['acidity_level'];
          aging_months?: number | null;
          aging_potential_max_years?: number | null;
          aging_potential_min_years?: number | null;
          aging_vessel?: string | null;
          allergens?: string[];
          annual_production_bottles?: number | null;
          aroma_profile?: string[];
          avoid_with?: string[] | null;
          body?: Database['public']['Enums']['wine_body'];
          calories_per_glass?: number;
          cheese_pairings?: string[] | null;
          color?: Database['public']['Enums']['wine_color'];
          contains_sulfites?: boolean;
          created_at?: string | null;
          decanting_minutes?: number | null;
          description?: string;
          finish?: Database['public']['Enums']['finish_length'];
          food_categories?: string[];
          glass_type?: string;
          grape_varieties?: string[];
          id?: string;
          image_url?: string | null;
          ingredient_ids?: string[];
          is_biodynamic?: boolean;
          is_blend?: boolean;
          is_low_sulfite?: boolean;
          is_natural?: boolean;
          is_organic?: boolean;
          is_public?: boolean;
          is_vegan?: boolean;
          name?: string;
          oak?: Database['public']['Enums']['oak_level'] | null;
          origin?: Json;
          origin_appellation?: string | null;
          origin_classification?: string | null;
          origin_country?: string;
          origin_country_code?: string;
          origin_region?: string;
          origin_subregion?: string | null;
          owner_id?: string | null;
          popularity?: number;
          price_tier?: Database['public']['Enums']['price_tier'];
          primary_flavors?: string[];
          production_method?: string | null;
          secondary_flavors?: string[] | null;
          serving_temp_max_celsius?: number;
          serving_temp_min_celsius?: number;
          slug?: string;
          specific_dishes?: string[] | null;
          status?: Database['public']['Enums']['wine_status'];
          style?: Database['public']['Enums']['wine_style'];
          sweetness?: Database['public']['Enums']['sweetness_level'];
          tags?: string[];
          tannins?: Database['public']['Enums']['tannin_level'] | null;
          tertiary_flavors?: string[] | null;
          updated_at?: string | null;
          vintage_type?: Database['public']['Enums']['vintage_type'];
        };
        Relationships: [];
      };
      wraps: {
        Row: {
          cheeses: string[] | null;
          condiments: string[] | null;
          created_at: string | null;
          customization: Json | null;
          description: Json;
          dietary: Json;
          dish_type: string | null;
          history: Json | null;
          id: string;
          image_url: string | null;
          is_grilled: boolean | null;
          is_hot: boolean | null;
          is_public: boolean;
          is_rolled: boolean | null;
          is_toasted: boolean | null;
          media: Json | null;
          name: Json;
          origin: Json;
          owner_id: string | null;
          popularity: number | null;
          pricing: Json | null;
          proteins: string[] | null;
          related_wraps: string[] | null;
          serving: Json;
          slug: string;
          status: Database['public']['Enums']['sandwich_status'];
          style: Database['public']['Enums']['wrap_style'];
          tagline: Json | null;
          tags: string[] | null;
          updated_at: string | null;
          variations: Json | null;
          vegetables: string[] | null;
          wrap_type: Database['public']['Enums']['wrap_type'];
        };
        Insert: {
          cheeses?: string[] | null;
          condiments?: string[] | null;
          created_at?: string | null;
          customization?: Json | null;
          description: Json;
          dietary?: Json;
          dish_type?: string | null;
          history?: Json | null;
          id: string;
          image_url?: string | null;
          is_grilled?: boolean | null;
          is_hot?: boolean | null;
          is_public?: boolean;
          is_rolled?: boolean | null;
          is_toasted?: boolean | null;
          media?: Json | null;
          name: Json;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          pricing?: Json | null;
          proteins?: string[] | null;
          related_wraps?: string[] | null;
          serving?: Json;
          slug: string;
          status?: Database['public']['Enums']['sandwich_status'];
          style?: Database['public']['Enums']['wrap_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
          vegetables?: string[] | null;
          wrap_type?: Database['public']['Enums']['wrap_type'];
        };
        Update: {
          cheeses?: string[] | null;
          condiments?: string[] | null;
          created_at?: string | null;
          customization?: Json | null;
          description?: Json;
          dietary?: Json;
          dish_type?: string | null;
          history?: Json | null;
          id?: string;
          image_url?: string | null;
          is_grilled?: boolean | null;
          is_hot?: boolean | null;
          is_public?: boolean;
          is_rolled?: boolean | null;
          is_toasted?: boolean | null;
          media?: Json | null;
          name?: Json;
          origin?: Json;
          owner_id?: string | null;
          popularity?: number | null;
          pricing?: Json | null;
          proteins?: string[] | null;
          related_wraps?: string[] | null;
          serving?: Json;
          slug?: string;
          status?: Database['public']['Enums']['sandwich_status'];
          style?: Database['public']['Enums']['wrap_style'];
          tagline?: Json | null;
          tags?: string[] | null;
          updated_at?: string | null;
          variations?: Json | null;
          vegetables?: string[] | null;
          wrap_type?: Database['public']['Enums']['wrap_type'];
        };
        Relationships: [];
      };
    };
    Views: {
      upcoming_holidays: {
        Row: {
          business_notes: string | null;
          city: string | null;
          country_code: string | null;
          created_at: string | null;
          date: string | null;
          days_until: number | null;
          id: string | null;
          impact_level: string | null;
          is_bank_holiday: boolean | null;
          is_public_holiday: boolean | null;
          is_recurring: boolean | null;
          is_verified: boolean | null;
          name: string | null;
          name_en: string | null;
          notes: string | null;
          recurrence_rule: string | null;
          region_code: string | null;
          source: string | null;
          source_reference: string | null;
          type: string | null;
          updated_at: string | null;
          verified_at: string | null;
          verified_by: string | null;
        };
        Insert: {
          business_notes?: string | null;
          city?: string | null;
          country_code?: string | null;
          created_at?: string | null;
          date?: string | null;
          days_until?: never;
          id?: string | null;
          impact_level?: string | null;
          is_bank_holiday?: boolean | null;
          is_public_holiday?: boolean | null;
          is_recurring?: boolean | null;
          is_verified?: boolean | null;
          name?: string | null;
          name_en?: string | null;
          notes?: string | null;
          recurrence_rule?: string | null;
          region_code?: string | null;
          source?: string | null;
          source_reference?: string | null;
          type?: string | null;
          updated_at?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Update: {
          business_notes?: string | null;
          city?: string | null;
          country_code?: string | null;
          created_at?: string | null;
          date?: string | null;
          days_until?: never;
          id?: string | null;
          impact_level?: string | null;
          is_bank_holiday?: boolean | null;
          is_public_holiday?: boolean | null;
          is_recurring?: boolean | null;
          is_verified?: boolean | null;
          name?: string | null;
          name_en?: string | null;
          notes?: string | null;
          recurrence_rule?: string | null;
          region_code?: string | null;
          source?: string | null;
          source_reference?: string | null;
          type?: string | null;
          updated_at?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Relationships: [];
      };
      v_account_with_roles: {
        Row: {
          auth_id: string | null;
          avatar_url: string | null;
          consumer_points: number | null;
          contributor_points: number | null;
          created_at: string | null;
          display_name: string | null;
          email: string | null;
          email_verified: boolean | null;
          first_name: string | null;
          id: string | null;
          is_active: boolean | null;
          is_premium: boolean | null;
          is_verified: boolean | null;
          last_login_at: string | null;
          last_name: string | null;
          locale: string | null;
          loyalty_tier: string | null;
          merchant_points: number | null;
          metadata: Json | null;
          phone: string | null;
          phone_verified: boolean | null;
          premium_expires_at: string | null;
          premium_started_at: string | null;
          premium_type: string | null;
          referral_code: string | null;
          referred_by_account_id: string | null;
          roles: Json | null;
          timezone: string | null;
          total_points: number | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'accounts_referred_by_account_id_fkey';
            columns: ['referred_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      v_contributor_stats: {
        Row: {
          account_id: string | null;
          approved_count: number | null;
          contributor_points: number | null;
          display_name: string | null;
          email: string | null;
          pending_count: number | null;
          rejected_count: number | null;
          total_points_from_contributions: number | null;
          total_submissions: number | null;
        };
        Relationships: [];
      };
      v_customer_intelligence_summary: {
        Row: {
          at_risk: number | null;
          avg_clv: number | null;
          champions: number | null;
          dormant: number | null;
          high_risk_count: number | null;
          lost: number | null;
          loyal: number | null;
          merchant_id: string | null;
          potential: number | null;
          total_clv: number | null;
          total_customers: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_customer_intelligence_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      v_loyalty_summary: {
        Row: {
          account_id: string | null;
          consumer_points: number | null;
          contributor_points: number | null;
          display_name: string | null;
          email: string | null;
          last_transaction_at: string | null;
          loyalty_tier: string | null;
          merchant_points: number | null;
          next_tier: string | null;
          points_to_next_tier: number | null;
          successful_referrals: number | null;
          total_points: number | null;
          total_transactions: number | null;
        };
        Insert: {
          account_id?: string | null;
          consumer_points?: number | null;
          contributor_points?: number | null;
          display_name?: string | null;
          email?: string | null;
          last_transaction_at?: never;
          loyalty_tier?: string | null;
          merchant_points?: number | null;
          next_tier?: never;
          points_to_next_tier?: never;
          successful_referrals?: never;
          total_points?: number | null;
          total_transactions?: never;
        };
        Update: {
          account_id?: string | null;
          consumer_points?: number | null;
          contributor_points?: number | null;
          display_name?: string | null;
          email?: string | null;
          last_transaction_at?: never;
          loyalty_tier?: string | null;
          merchant_points?: number | null;
          next_tier?: never;
          points_to_next_tier?: never;
          successful_referrals?: never;
          total_points?: number | null;
          total_transactions?: never;
        };
        Relationships: [];
      };
      v_onboarding_stats: {
        Row: {
          completions: number | null;
          date: string | null;
          from_campaigns: number | null;
          from_referrals: number | null;
          selected_plan: string | null;
        };
        Relationships: [];
      };
      v_organization_staff: {
        Row: {
          accepted_at: string | null;
          account_id: string | null;
          avatar_url: string | null;
          created_at: string | null;
          display_name: string | null;
          email: string | null;
          first_name: string | null;
          invited_at: string | null;
          invited_by_account_id: string | null;
          inviter_email: string | null;
          inviter_name: string | null;
          is_active: boolean | null;
          last_login_at: string | null;
          last_name: string | null;
          organization_id: string | null;
          permissions: Json | null;
          role_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'account_roles_invited_by_account_id_fkey';
            columns: ['invited_by_account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      v_pending_contributions: {
        Row: {
          ai_confidence_score: number | null;
          category: string | null;
          contributor_email: string | null;
          contributor_locale: string | null;
          contributor_name: string | null;
          contributor_total_points: number | null;
          created_at: string | null;
          id: string | null;
          ingredient_name: string | null;
          ingredient_name_local: string | null;
          source_photos: string[] | null;
          source_type: string | null;
          submitted_json: Json | null;
        };
        Relationships: [];
      };
      v_pending_onboardings: {
        Row: {
          business_name: string | null;
          business_type: string | null;
          country_code: string | null;
          created_at: string | null;
          current_step: number | null;
          email: string | null;
          expires_at: string | null;
          first_name: string | null;
          id: string | null;
          last_name: string | null;
          selected_plan: string | null;
          utm_campaign: string | null;
          utm_source: string | null;
        };
        Insert: {
          business_name?: string | null;
          business_type?: string | null;
          country_code?: string | null;
          created_at?: string | null;
          current_step?: number | null;
          email?: string | null;
          expires_at?: string | null;
          first_name?: string | null;
          id?: string | null;
          last_name?: string | null;
          selected_plan?: string | null;
          utm_campaign?: string | null;
          utm_source?: string | null;
        };
        Update: {
          business_name?: string | null;
          business_type?: string | null;
          country_code?: string | null;
          created_at?: string | null;
          current_step?: number | null;
          email?: string | null;
          expires_at?: string | null;
          first_name?: string | null;
          id?: string | null;
          last_name?: string | null;
          selected_plan?: string | null;
          utm_campaign?: string | null;
          utm_source?: string | null;
        };
        Relationships: [];
      };
      v_pending_staff_invitations: {
        Row: {
          brand_id: string | null;
          created_at: string | null;
          email: string | null;
          expires_at: string | null;
          first_name: string | null;
          id: string | null;
          inviter_email: string | null;
          inviter_name: string | null;
          last_name: string | null;
          location_id: string | null;
          message: string | null;
          organization_id: string | null;
          organization_name: string | null;
          permissions: Json | null;
          role_title: string | null;
          status: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'staff_invitations_brand_id_fkey';
            columns: ['brand_id'];
            isOneToOne: false;
            referencedRelation: 'brands';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_invitations_location_id_fkey';
            columns: ['location_id'];
            isOneToOne: false;
            referencedRelation: 'locations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'staff_invitations_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      v_realtime_analytics: {
        Row: {
          event_category: string | null;
          event_count: number | null;
          event_name: string | null;
          hour: string | null;
          sessions: number | null;
          unique_users: number | null;
        };
        Relationships: [];
      };
      v_recent_loyalty_transactions: {
        Row: {
          account_id: string | null;
          action_description: string | null;
          balance_after: number | null;
          created_at: string | null;
          description: string | null;
          id: string | null;
          points_change: number | null;
          points_type: string | null;
          reference_id: string | null;
          reference_type: string | null;
          transaction_type: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_transactions_account_id_fkey';
            columns: ['account_id'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      v_recent_suggestions: {
        Row: {
          created_at: string | null;
          id: string | null;
          points_awarded: number | null;
          reviewed_at: string | null;
          status: string | null;
          submitted_by: string | null;
          suggestion_type: string | null;
          title: string | null;
        };
        Relationships: [];
      };
      v_referral_leaderboard: {
        Row: {
          account_id: string | null;
          display_name: string | null;
          first_name: string | null;
          referral_code: string | null;
          successful_referrals: number | null;
          total_points_earned: number | null;
        };
        Relationships: [];
      };
      v_referral_stats: {
        Row: {
          account_id: string | null;
          email: string | null;
          pending_referrals: number | null;
          referral_code: string | null;
          successful_referrals: number | null;
          total_points_earned: number | null;
        };
        Relationships: [];
      };
      v_rewards_admin: {
        Row: {
          available_from: string | null;
          available_until: string | null;
          category: string | null;
          code: string | null;
          created_at: string | null;
          created_by: string | null;
          created_by_name: string | null;
          current_redemptions: number | null;
          description: string | null;
          id: string | null;
          image_url: string | null;
          is_active: boolean | null;
          is_featured: boolean | null;
          max_redemptions_per_user: number | null;
          max_redemptions_total: number | null;
          min_tier: string | null;
          name: string | null;
          points_required: number | null;
          reward_type: string | null;
          reward_value: Json | null;
          sort_order: number | null;
          target_audience: string | null;
          total_points_spent: number | null;
          total_redemptions: number | null;
          updated_at: string | null;
          updated_by: string | null;
          used_redemptions: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'accounts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_account_with_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_contributor_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_loyalty_summary';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_leaderboard';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_referral_stats';
            referencedColumns: ['account_id'];
          },
          {
            foreignKeyName: 'loyalty_rewards_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'v_suggestion_leaderboard';
            referencedColumns: ['account_id'];
          },
        ];
      };
      v_scheduled_loyalty_jobs: {
        Row: {
          function_call: string | null;
          job_name: string | null;
          pending_items: number | null;
          suggested_schedule: string | null;
        };
        Relationships: [];
      };
      v_suggestion_leaderboard: {
        Row: {
          acceptance_rate: number | null;
          account_id: string | null;
          avatar_url: string | null;
          display_name: string | null;
          implemented_count: number | null;
          total_points: number | null;
          total_suggestions: number | null;
        };
        Relationships: [];
      };
      v_tier_progression: {
        Row: {
          benefits: Json | null;
          color_hex: string | null;
          display_name: string | null;
          next_tier: string | null;
          next_tier_points: number | null;
          points_between: number | null;
          points_threshold: number | null;
          tier_name: string | null;
          tier_order: number | null;
        };
        Relationships: [];
      };
      v_top_events: {
        Row: {
          event_category: string | null;
          event_name: string | null;
          last_30d: number | null;
          last_7d: number | null;
          today: number | null;
          total_count: number | null;
        };
        Relationships: [];
      };
      v_trigger_performance: {
        Row: {
          action_type: string | null;
          conversion_rate_pct: number | null;
          is_active: boolean | null;
          last_triggered_at: string | null;
          merchant_id: string | null;
          name: string | null;
          total_converted: number | null;
          total_revenue: number | null;
          total_triggered: number | null;
          trigger_id: string | null;
          trigger_type: string | null;
        };
        Insert: {
          action_type?: string | null;
          conversion_rate_pct?: never;
          is_active?: boolean | null;
          last_triggered_at?: string | null;
          merchant_id?: string | null;
          name?: string | null;
          total_converted?: number | null;
          total_revenue?: never;
          total_triggered?: number | null;
          trigger_id?: string | null;
          trigger_type?: string | null;
        };
        Update: {
          action_type?: string | null;
          conversion_rate_pct?: never;
          is_active?: boolean | null;
          last_triggered_at?: string | null;
          merchant_id?: string | null;
          name?: string | null;
          total_converted?: number | null;
          total_revenue?: never;
          total_triggered?: number | null;
          trigger_id?: string | null;
          trigger_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_customer_triggers_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
      v_trigger_roi_summary: {
        Row: {
          action_type: string | null;
          budget_active: boolean | null;
          budget_conversions: number | null;
          budget_remaining: number | null;
          budget_type: string | null;
          conversion_rate_pct: number | null;
          cost_per_conversion: number | null;
          end_date: string | null;
          max_redemptions: number | null;
          merchant_id: string | null;
          name: string | null;
          paused_at: string | null;
          paused_reason: string | null;
          redemptions_used: number | null;
          revenue_per_conversion: number | null;
          roi_ratio: number | null;
          spent_amount: number | null;
          start_date: string | null;
          total_budget: number | null;
          total_converted: number | null;
          total_revenue_generated: number | null;
          total_triggered: number | null;
          trigger_active: boolean | null;
          trigger_id: string | null;
          trigger_type: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_customer_triggers_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      accept_staff_invitation: {
        Args: { p_auth_id?: string; p_invite_token: string };
        Returns: {
          account_id: string;
          error_message: string;
          organization_id: string;
          role_id: string;
          success: boolean;
        }[];
      };
      acknowledge_hot_action: {
        Args: { p_request_id: string; p_staff_id: string };
        Returns: boolean;
      };
      add_merchant_role: {
        Args: {
          p_account_id: string;
          p_merchant_id: string;
          p_permissions?: Json;
        };
        Returns: string;
      };
      admin_create_reward: {
        Args: {
          p_admin_id: string;
          p_available_from?: string;
          p_available_until?: string;
          p_category?: string;
          p_code: string;
          p_description: string;
          p_image_url?: string;
          p_is_featured?: boolean;
          p_max_redemptions_per_user?: number;
          p_max_redemptions_total?: number;
          p_min_tier?: string;
          p_name: string;
          p_points_required: number;
          p_reward_type: string;
          p_reward_value: Json;
          p_target_audience?: string;
        };
        Returns: string;
      };
      admin_deactivate_reward: {
        Args: { p_admin_id: string; p_reward_id: string };
        Returns: boolean;
      };
      admin_update_reward: {
        Args: { p_admin_id: string; p_reward_id: string; p_updates: Json };
        Returns: boolean;
      };
      admin_update_tier: {
        Args: { p_admin_id: string; p_tier_id: string; p_updates: Json };
        Returns: boolean;
      };
      aggregate_daily_analytics: { Args: { p_date?: string }; Returns: number };
      approve_ingredient_contribution: {
        Args: {
          p_contribution_id: string;
          p_is_new?: boolean;
          p_merged_into_id?: string;
          p_notes?: string;
          p_reviewer_account_id: string;
        };
        Returns: number;
      };
      archive_inactive_tourists: { Args: never; Returns: number };
      award_loyalty_points: {
        Args: {
          p_account_id: string;
          p_description?: string;
          p_points: number;
          p_points_type: string;
          p_reference_id?: string;
          p_reference_type?: string;
          p_transaction_type: string;
        };
        Returns: number;
      };
      award_subscription_anniversaries: { Args: never; Returns: number };
      calculate_ai_learning_progress: {
        Args: { p_location_id: string };
        Returns: {
          calculated_autonomy: number;
          competitor_intel: number;
          customer_patterns: number;
          manager_preferences: number;
          menu_knowledge: number;
          overall: number;
          seasonal_trends: number;
          weather_correlations: number;
          zone_analysis: number;
        }[];
      };
      calculate_food_cost: { Args: { p_menu_item_id: string }; Returns: number };
      can_add_custom_domain: {
        Args: { p_organization_id: string };
        Returns: boolean;
      };
      can_ai_act_autonomously: {
        Args: {
          p_action_type: string;
          p_location_id: string;
          p_required_level?: number;
        };
        Returns: {
          can_act: boolean;
          current_level: number;
          reason: string;
          required_level: number;
        }[];
      };
      can_receive_notifications: {
        Args: { p_account_id: string; p_merchant_id: string };
        Returns: boolean;
      };
      can_submit_hot_action: {
        Args: {
          p_action_code: string;
          p_device_id: string;
          p_location_id: string;
          p_table_number: string;
        };
        Returns: boolean;
      };
      check_and_upgrade_tier: {
        Args: { p_account_id: string };
        Returns: string;
      };
      check_loyalty_tier_upgrade: {
        Args: { p_account_id: string };
        Returns: string;
      };
      check_slot_availability: {
        Args: {
          p_date: string;
          p_duration_minutes?: number;
          p_location_id: string;
          p_party_size: number;
          p_time: string;
        };
        Returns: boolean;
      };
      check_trigger_budget: { Args: { p_trigger_id: string }; Returns: boolean };
      check_weather_cache_freshness: {
        Args: {
          p_current_ttl_minutes?: number;
          p_forecast_ttl_minutes?: number;
          p_location_id: string;
        };
        Returns: {
          current_age_minutes: number;
          forecast_age_minutes: number;
          needs_current_refresh: boolean;
          needs_forecast_refresh: boolean;
        }[];
      };
      cleanup_expired_onboarding_sessions: { Args: never; Returns: number };
      cleanup_expired_staff_invitations: { Args: never; Returns: number };
      cleanup_old_ai_data: { Args: never; Returns: undefined };
      cleanup_old_analytics_events: {
        Args: { p_days_to_keep?: number };
        Returns: number;
      };
      complete_hot_action: {
        Args: { p_request_id: string; p_staff_id: string };
        Returns: boolean;
      };
      complete_merchant_onboarding: {
        Args: { p_auth_id?: string; p_session_token: string };
        Returns: {
          account_id: string;
          brand_id: string;
          error_message: string;
          location_id: string;
          organization_id: string;
          success: boolean;
        }[];
      };
      compute_menu_item_safety:
        | { Args: { item_id: string; item_type: string }; Returns: Json }
        | { Args: { p_item_id: string }; Returns: undefined };
      confirm_crypto_payment: {
        Args: { p_payment_id: string; p_staff_notes?: string };
        Returns: boolean;
      };
      convert_currency: {
        Args: {
          p_amount: number;
          p_from_currency: string;
          p_to_currency: string;
        };
        Returns: number;
      };
      convert_to_cost_unit: {
        Args: { from_unit: string; quantity: number; to_unit: string };
        Returns: number;
      };
      create_consumer_account: {
        Args: {
          p_auth_id?: string;
          p_email: string;
          p_first_name?: string;
          p_last_name?: string;
          p_referral_code?: string;
        };
        Returns: string;
      };
      create_crypto_payment_request: {
        Args: {
          p_crypto_amount?: number;
          p_cryptocurrency: string;
          p_exchange_rate?: number;
          p_fiat_amount: number;
          p_fiat_currency?: string;
          p_merchant_id: string;
          p_order_id: string;
          p_timeout_minutes?: number;
        };
        Returns: string;
      };
      create_referral_invite: {
        Args: {
          p_referral_type?: string;
          p_referred_email: string;
          p_referrer_account_id: string;
        };
        Returns: {
          error_message: string;
          referral_code: string;
          referral_id: string;
          success: boolean;
        }[];
      };
      deactivate_push_token: { Args: { p_token: string }; Returns: boolean };
      decline_staff_invitation: {
        Args: { p_invite_token: string; p_reason?: string };
        Returns: boolean;
      };
      detect_gtin_format: { Args: { input_code: string }; Returns: string };
      dismiss_alerts_bulk: {
        Args: { p_category?: string; p_merchant_id: string; p_type?: string };
        Returns: number;
      };
      expire_old_redemptions: { Args: never; Returns: number };
      expire_old_referrals: { Args: never; Returns: number };
      expire_pending_crypto_payments: { Args: never; Returns: number };
      find_partner_for_country: {
        Args: { p_country_code: string };
        Returns: string;
      };
      follow_merchant: {
        Args: { p_merchant_id: string; p_source?: string };
        Returns: boolean;
      };
      generate_order_code_standalone:
        | { Args: never; Returns: string }
        | { Args: { p_order_number: number }; Returns: string };
      generate_order_number_standalone: { Args: never; Returns: string };
      generate_qr_short_code: { Args: { length?: number }; Returns: string };
      generate_voucher_code: { Args: { prefix?: string }; Returns: string };
      generate_weekly_performance_metrics: {
        Args: { p_location_id: string };
        Returns: number;
      };
      get_account_by_auth_id: { Args: { p_auth_id: string }; Returns: string };
      get_ai_usage_stats: {
        Args: {
          p_end_date?: string;
          p_merchant_id: string;
          p_start_date?: string;
        };
        Returns: {
          daily_usage: Json;
          requests_by_type: Json;
          total_cost: number;
          total_requests: number;
          total_tokens: number;
        }[];
      };
      get_alert_counts: {
        Args: { p_merchant_id: string };
        Returns: {
          by_category: Json;
          info: number;
          total: number;
          urgent: number;
          warning: number;
        }[];
      };
      get_autonomy_level_name: { Args: { p_level: number }; Returns: string };
      get_available_rewards: {
        Args: { p_account_id: string; p_category?: string };
        Returns: {
          can_redeem: boolean;
          category: string;
          code: string;
          description: string;
          id: string;
          image_url: string;
          is_featured: boolean;
          max_per_user: number;
          name: string;
          points_required: number;
          reward_type: string;
          reward_value: Json;
          times_redeemed: number;
        }[];
      };
      get_block_explorer_url: {
        Args: { p_cryptocurrency: string; p_tx_hash: string };
        Returns: string;
      };
      get_budget_utilization: { Args: { p_trigger_id: string }; Returns: Json };
      get_challenge_stats: {
        Args: { p_challenge_id: string };
        Returns: {
          has_ever_been_won: boolean;
          record_date: string;
          record_holder_name: string;
          record_time_minutes: number;
          success_rate: number;
          total_attempts: number;
          total_wins: number;
        }[];
      };
      get_challenge_wall_of_fame: {
        Args: { p_challenge_id: string; p_limit?: number };
        Returns: {
          attempt_date: string;
          completion_time_minutes: number;
          is_current_record: boolean;
          participant_name: string;
          photo_url: string;
          rank: number;
          video_url: string;
        }[];
      };
      get_contactable_followers: {
        Args: { p_merchant_id: string; p_visitor_type?: string };
        Returns: {
          account_id: string;
          display_name: string;
          email: string;
          loyalty_points: number;
          visit_count: number;
          visitor_type: string;
        }[];
      };
      get_current_account: {
        Args: never;
        Returns: {
          account_id: string;
          avatar_url: string;
          display_name: string;
          email: string;
          first_name: string;
          is_premium: boolean;
          last_name: string;
          locale: string;
          loyalty_tier: string;
          timezone: string;
          total_points: number;
        }[];
      };
      get_current_roles: {
        Args: never;
        Returns: {
          is_primary: boolean;
          permissions: Json;
          role_id: string;
          role_type: string;
          tenant_id: string;
          tenant_type: string;
        }[];
      };
      get_customers_at_risk: {
        Args: { p_merchant_id: string; p_risk_levels?: string[] };
        Returns: {
          account_email: string;
          account_id: string;
          account_name: string;
          churn_risk_level: string;
          churn_risk_score: number;
          clv_estimated: number;
          days_since_last_visit: number;
          recommended_actions: Json;
          segment: string;
        }[];
      };
      get_daily_metrics: {
        Args: { p_date?: string; p_merchant_id: string };
        Returns: {
          add_to_cart: number;
          item_clicks: number;
          menu_views: number;
          orders_placed: number;
          page_views: number;
          total_sessions: number;
          unique_visitors: number;
        }[];
      };
      get_device_breakdown: {
        Args: { p_days?: number; p_merchant_id?: string };
        Returns: {
          device_type: string;
          event_count: number;
          percentage: number;
        }[];
      };
      get_due_workflows: {
        Args: never;
        Returns: {
          merchant_id: string;
          workflow_id: string;
          workflow_name: string;
        }[];
      };
      get_effective_hours: {
        Args: { p_date?: string; p_location_id: string };
        Returns: Json;
      };
      get_event_counts: {
        Args: {
          p_end_date: string;
          p_event_category?: string;
          p_event_name?: string;
          p_merchant_id?: string;
          p_start_date: string;
        };
        Returns: {
          event_count: number;
          event_date: string;
          event_name: string;
          unique_users: number;
        }[];
      };
      get_events_for_range: {
        Args: {
          p_end_date: string;
          p_location_id: string;
          p_public_only?: boolean;
          p_start_date: string;
          p_status?: string;
        };
        Returns: {
          affected_areas: string[] | null;
          auto_create_schedule_override: boolean | null;
          color: string | null;
          created_at: string | null;
          created_by: string | null;
          current_attendees: number | null;
          description: string | null;
          end_date: string | null;
          end_time: string;
          entrance_fee: number | null;
          event_category: string;
          event_type: string;
          hours_override: Json | null;
          id: string;
          image_url: string | null;
          is_featured: boolean | null;
          is_public: boolean | null;
          location_id: string;
          loyalty_bonus: Json | null;
          max_capacity: number | null;
          menu_impact: Json | null;
          performer: Json | null;
          promotions: Json | null;
          recurrence: string | null;
          recurrence_days: number[] | null;
          recurrence_end_date: string | null;
          reduced_capacity: number | null;
          requires_reservation: boolean | null;
          schedule_override_id: string | null;
          sports_info: Json | null;
          start_date: string;
          start_time: string;
          status: string | null;
          tags: string[] | null;
          ticket_url: string | null;
          timezone: string | null;
          title: string;
          updated_at: string | null;
          venue_status: string | null;
        }[];
        SetofOptions: {
          from: '*';
          to: 'events';
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      get_feedback_stats: {
        Args: never;
        Returns: {
          avg_priority: number;
          in_progress_count: number;
          new_count: number;
          resolved_count: number;
          sentiment_breakdown: Json;
          total_count: number;
        }[];
      };
      get_followed_merchants: {
        Args: never;
        Returns: {
          followed_at: string;
          loyalty_points: number;
          merchant_id: string;
          merchant_logo: string;
          merchant_name: string;
          total_orders: number;
        }[];
      };
      get_follower_stats: {
        Args: { p_merchant_id: string };
        Returns: {
          active_followers: number;
          active_tourists: number;
          archived_tourists: number;
          avg_tourist_visits: number;
          paused_tourists: number;
          residents: number;
          returning_tourists: number;
          total_followers: number;
        }[];
      };
      get_hot_action_stats: {
        Args: {
          p_end_date?: string;
          p_location_id: string;
          p_start_date?: string;
        };
        Returns: {
          action_code: string;
          action_name: string;
          avg_response_seconds: number;
          cancelled_count: number;
          completed_count: number;
          total_requests: number;
        }[];
      };
      get_hot_actions_for_location: {
        Args: { p_location_id: string };
        Returns: {
          code: string;
          color: string;
          cooldown_minutes: number;
          description: string;
          icon: string;
          id: string;
          name: string;
          name_it: string;
          requires_note: boolean;
          requires_table: boolean;
        }[];
      };
      get_inapp_notifications: {
        Args: { p_account_id: string; p_limit?: number; p_offset?: number };
        Returns: {
          body: string;
          category: string;
          created_at: string;
          data: Json;
          is_read: boolean;
          notification_id: string;
          title: string;
        }[];
      };
      get_location_total_capacity: {
        Args: { p_location_id: string };
        Returns: number;
      };
      get_loyalty_points: {
        Args: { p_action_type: string };
        Returns: {
          points: number;
          points_type: string;
        }[];
      };
      get_merchant_crypto_wallets: {
        Args: { p_merchant_id: string };
        Returns: Json;
      };
      get_merchant_knowledge_context: {
        Args: {
          p_document_types?: string[];
          p_limit?: number;
          p_merchant_id: string;
        };
        Returns: {
          content: string;
          document_type: string;
          id: string;
          importance: string;
          last_referenced_at: string;
          title: string;
        }[];
      };
      get_merchant_locale: {
        Args: { p_merchant_id: string };
        Returns: {
          country_code: string;
          country_name: string;
          currency_code: string;
          currency_symbol: string;
          enabled_languages: string[];
          merchant_id: string;
          merchant_name: string;
          primary_language: string;
          primary_language_name: string;
          timezone: string;
        }[];
      };
      get_merchant_qr_source_performance: {
        Args: { p_merchant_id: string };
        Returns: {
          avg_scans_per_qr: number;
          qr_count: number;
          source: string;
          total_scans: number;
        }[];
      };
      get_my_redemptions: {
        Args: { p_account_id: string; p_status?: string };
        Returns: {
          created_at: string;
          id: string;
          points_spent: number;
          redemption_code: string;
          reward_code: string;
          reward_name: string;
          reward_type: string;
          status: string;
          used_at: string;
          valid_until: string;
        }[];
      };
      get_my_referrals: {
        Args: { p_account_id: string; p_limit?: number; p_offset?: number };
        Returns: {
          created_at: string;
          points_awarded: number;
          referral_id: string;
          referral_type: string;
          referred_email: string;
          referred_name: string;
          signed_up_at: string;
          status: string;
        }[];
      };
      get_my_suggestions: {
        Args: {
          p_account_id: string;
          p_limit?: number;
          p_offset?: number;
          p_status?: string;
        };
        Returns: {
          comments_count: number;
          created_at: string;
          description: string;
          downvotes: number;
          entity_name: string;
          entity_type: string;
          id: string;
          points_awarded: number;
          priority: string;
          reviewed_at: string;
          status: string;
          suggestion_type: string;
          title: string;
          upvotes: number;
        }[];
      };
      get_notification_preferences: {
        Args: { p_account_id: string };
        Returns: {
          email_contributions: boolean;
          email_digest_frequency: string;
          email_enabled: boolean;
          email_loyalty: boolean;
          email_marketing: boolean;
          email_orders: boolean;
          email_team: boolean;
          inapp_enabled: boolean;
          notification_locale: string;
          push_enabled: boolean;
          push_loyalty: boolean;
          push_orders: boolean;
          push_promotions: boolean;
          push_reminders: boolean;
          quiet_hours_enabled: boolean;
          quiet_hours_end: string;
          quiet_hours_start: string;
          timezone: string;
        }[];
      };
      get_notification_template: {
        Args: {
          p_channel: string;
          p_locale: string;
          p_merchant_id: string;
          p_template_code: string;
        };
        Returns: {
          body: string;
          buttons: Json | null;
          channel: string;
          created_at: string | null;
          html_body: string | null;
          id: string;
          is_active: boolean | null;
          locale: string;
          merchant_id: string | null;
          subject: string | null;
          template_code: string;
          title: string | null;
          updated_at: string | null;
          version: number | null;
        };
        SetofOptions: {
          from: '*';
          to: 'notification_templates';
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      get_onboarding_session: {
        Args: { p_session_token: string };
        Returns: {
          billing_cycle: string;
          brand_logo_url: string;
          brand_name: string;
          business_name: string;
          business_type: string;
          city: string;
          country_code: string;
          current_step: number;
          email: string;
          expires_at: string;
          first_name: string;
          id: string;
          is_completed: boolean;
          last_name: string;
          location_address: string;
          location_currency: string;
          location_languages: string[];
          location_name: string;
          phone: string;
          primary_color: string;
          selected_plan: string;
        }[];
      };
      get_or_create_ai_preferences: {
        Args: { p_merchant_id: string };
        Returns: {
          alert_on_negative_feedback: boolean | null;
          alert_threshold_rating: number | null;
          alert_types: string[] | null;
          briefing_time: string | null;
          briefing_timezone: string | null;
          can_create_events: boolean | null;
          can_modify_menu: boolean | null;
          can_read_analytics: boolean | null;
          can_read_events: boolean | null;
          can_read_feedback: boolean | null;
          can_read_menu: boolean | null;
          can_read_orders: boolean | null;
          can_respond_reviews: boolean | null;
          can_send_notifications: boolean | null;
          communication_style: string | null;
          created_at: string | null;
          daily_briefing_enabled: boolean | null;
          email_notifications: boolean | null;
          include_last_n_days_data: number | null;
          limit_reset_at: string | null;
          max_context_items: number | null;
          merchant_id: string;
          monthly_request_limit: number | null;
          monthly_requests_used: number | null;
          preferred_language: string | null;
          push_notifications: boolean | null;
          suggest_events: boolean | null;
          suggest_menu_updates: boolean | null;
          suggestion_frequency: string | null;
          updated_at: string | null;
        };
        SetofOptions: {
          from: '*';
          to: 'ai_merchant_preferences';
          isOneToOne: true;
          isSetofReturn: false;
        };
      };
      get_pending_hot_actions: {
        Args: { p_limit?: number; p_location_id: string };
        Returns: {
          acknowledged_at: string;
          acknowledged_by_name: string;
          action_code: string;
          action_color: string;
          action_icon: string;
          action_name: string;
          created_at: string;
          customer_note: string;
          priority: string;
          request_id: string;
          seconds_waiting: number;
          status: string;
          table_number: string;
        }[];
      };
      get_pending_suggestions: {
        Args: {
          p_limit?: number;
          p_offset?: number;
          p_priority?: string;
          p_suggestion_type?: string;
        };
        Returns: {
          account_id: string;
          account_name: string;
          created_at: string;
          current_value: Json;
          description: string;
          downvotes: number;
          entity_id: string;
          entity_name: string;
          entity_type: string;
          id: string;
          priority: string;
          sources: string[];
          status: string;
          suggested_value: Json;
          suggestion_type: string;
          title: string;
          upvotes: number;
        }[];
      };
      get_popular_pages: {
        Args: { p_days?: number; p_limit?: number; p_merchant_id?: string };
        Returns: {
          page_path: string;
          unique_visitors: number;
          view_count: number;
        }[];
      };
      get_push_tokens: {
        Args: { p_account_id: string };
        Returns: {
          device_name: string;
          last_used_at: string;
          platform: string;
          token: string;
          token_id: string;
        }[];
      };
      get_qr_analytics: {
        Args: { p_qr_code_id: string };
        Returns: {
          desktop_scans: number;
          mobile_scans: number;
          scans_this_month: number;
          scans_this_week: number;
          scans_today: number;
          tablet_scans: number;
          total_scans: number;
          unique_ips: number;
        }[];
      };
      get_referral_stats: {
        Args: { p_account_id: string };
        Returns: {
          pending_referrals: number;
          referral_code: string;
          successful_referrals: number;
          total_points_earned: number;
          total_referrals: number;
        }[];
      };
      get_reservation_stats: {
        Args: { p_date?: string; p_location_id: string };
        Returns: {
          cancelled_count: number;
          completed_count: number;
          confirmed_count: number;
          no_show_count: number;
          pending_count: number;
          seated_count: number;
          total_covers: number;
          total_reservations: number;
        }[];
      };
      get_reservations_for_date: {
        Args: { p_date: string; p_location_id: string };
        Returns: {
          end_time: string;
          guest_name: string;
          id: string;
          party_size: number;
          reservation_code: string;
          reservation_time: string;
          section_id: string;
          section_name: string;
          status: string;
          table_ids: Json;
        }[];
      };
      get_suggestion_stats: {
        Args: { p_account_id?: string };
        Returns: {
          approved: number;
          implemented: number;
          pending: number;
          rejected: number;
          total_points_earned: number;
          total_suggestions: number;
          under_review: number;
        }[];
      };
      get_tables_for_party_size: {
        Args: {
          p_location_id: string;
          p_party_size: number;
          p_section_id?: string;
        };
        Returns: {
          display_name: string;
          max_capacity: number;
          min_capacity: number;
          priority: number;
          section_id: string;
          section_name: string;
          table_id: string;
          table_number: string;
        }[];
      };
      get_tier_for_points: {
        Args: { p_points: number };
        Returns: {
          benefits: Json;
          color_hex: string;
          display_name: string;
          next_tier_name: string;
          next_tier_points: number;
          points_to_next: number;
          tier_name: string;
          tier_order: number;
        }[];
      };
      get_todays_events: {
        Args: { p_location_id: string };
        Returns: {
          affected_areas: string[] | null;
          auto_create_schedule_override: boolean | null;
          color: string | null;
          created_at: string | null;
          created_by: string | null;
          current_attendees: number | null;
          description: string | null;
          end_date: string | null;
          end_time: string;
          entrance_fee: number | null;
          event_category: string;
          event_type: string;
          hours_override: Json | null;
          id: string;
          image_url: string | null;
          is_featured: boolean | null;
          is_public: boolean | null;
          location_id: string;
          loyalty_bonus: Json | null;
          max_capacity: number | null;
          menu_impact: Json | null;
          performer: Json | null;
          promotions: Json | null;
          recurrence: string | null;
          recurrence_days: number[] | null;
          recurrence_end_date: string | null;
          reduced_capacity: number | null;
          requires_reservation: boolean | null;
          schedule_override_id: string | null;
          sports_info: Json | null;
          start_date: string;
          start_time: string;
          status: string | null;
          tags: string[] | null;
          ticket_url: string | null;
          timezone: string | null;
          title: string;
          updated_at: string | null;
          venue_status: string | null;
        }[];
        SetofOptions: {
          from: '*';
          to: 'events';
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      get_top_items: {
        Args: {
          p_days?: number;
          p_event_type?: string;
          p_limit?: number;
          p_merchant_id: string;
        };
        Returns: {
          event_count: number;
          item_id: string;
          item_name: string;
        }[];
      };
      get_top_performers: {
        Args: {
          p_limit?: number;
          p_location_id: string;
          p_period_type?: string;
        };
        Returns: {
          average_rating: number;
          display_name: string;
          job_title: string;
          photo_url: string;
          rank_in_location: number;
          reviews_count: number;
          staff_id: string;
          top_categories: string[];
        }[];
      };
      get_tourist_origins: {
        Args: { p_merchant_id: string };
        Returns: {
          avg_visits: number;
          home_country: string;
          tourist_count: number;
        }[];
      };
      get_unified_profile: {
        Args: { p_account_id: string };
        Returns: {
          account_created_at: string;
          account_id: string;
          auth_id: string;
          avatar_url: string;
          display_name: string;
          email: string;
          first_name: string;
          is_admin: boolean;
          is_consumer: boolean;
          is_contributor: boolean;
          is_merchant: boolean;
          last_login_at: string;
          last_name: string;
          locale: string;
          loyalty_tier: string;
          phone: string;
          tenants: Json;
          timezone: string;
          total_points: number;
        }[];
      };
      get_unread_notifications_count: {
        Args: { p_account_id: string };
        Returns: number;
      };
      get_upcoming_events: {
        Args: { p_limit?: number; p_location_id: string };
        Returns: {
          affected_areas: string[] | null;
          auto_create_schedule_override: boolean | null;
          color: string | null;
          created_at: string | null;
          created_by: string | null;
          current_attendees: number | null;
          description: string | null;
          end_date: string | null;
          end_time: string;
          entrance_fee: number | null;
          event_category: string;
          event_type: string;
          hours_override: Json | null;
          id: string;
          image_url: string | null;
          is_featured: boolean | null;
          is_public: boolean | null;
          location_id: string;
          loyalty_bonus: Json | null;
          max_capacity: number | null;
          menu_impact: Json | null;
          performer: Json | null;
          promotions: Json | null;
          recurrence: string | null;
          recurrence_days: number[] | null;
          recurrence_end_date: string | null;
          reduced_capacity: number | null;
          requires_reservation: boolean | null;
          schedule_override_id: string | null;
          sports_info: Json | null;
          start_date: string;
          start_time: string;
          status: string | null;
          tags: string[] | null;
          ticket_url: string | null;
          timezone: string | null;
          title: string;
          updated_at: string | null;
          venue_status: string | null;
        }[];
        SetofOptions: {
          from: '*';
          to: 'events';
          isOneToOne: false;
          isSetofReturn: true;
        };
      };
      get_user_activity: {
        Args: { p_account_id: string; p_days?: number };
        Returns: {
          event_count: number;
          event_date: string;
          page_views: number;
          sessions: number;
        }[];
      };
      get_user_roles: {
        Args: { p_account_id: string };
        Returns: {
          created_at: string;
          is_active: boolean;
          is_primary: boolean;
          permissions: Json;
          role_id: string;
          role_type: string;
          tenant_id: string;
          tenant_type: string;
        }[];
      };
      get_utm_performance: {
        Args: { p_days?: number; p_merchant_id?: string };
        Returns: {
          event_count: number;
          unique_users: number;
          utm_campaign: string;
          utm_medium: string;
          utm_source: string;
        }[];
      };
      get_weather_emoji: { Args: { p_conditions: string }; Returns: string };
      handle_tourist_return: {
        Args: { p_merchant_id: string; p_new_trip_end_date: string };
        Returns: Json;
      };
      has_permission: {
        Args: { p_permission: string; p_tenant_id?: string };
        Returns: boolean;
      };
      invite_staff_member: {
        Args: {
          p_brand_id?: string;
          p_email: string;
          p_first_name?: string;
          p_inviter_account_id: string;
          p_last_name?: string;
          p_location_id?: string;
          p_message?: string;
          p_organization_id: string;
          p_permissions?: Json;
          p_role_title?: string;
        };
        Returns: {
          error_message: string;
          invitation_id: string;
          invite_token: string;
          success: boolean;
        }[];
      };
      is_customer_trigger_eligible: {
        Args: { p_account_id: string; p_trigger_id: string };
        Returns: boolean;
      };
      is_domain_blacklisted: { Args: { p_domain: string }; Returns: boolean };
      is_following_merchant: {
        Args: { p_merchant_id: string };
        Returns: boolean;
      };
      is_location_open: {
        Args: { p_check_time?: string; p_location_id: string };
        Returns: Json;
      };
      is_merchant_admin: {
        Args: { p_auth_id: string; p_merchant_id: string };
        Returns: boolean;
      };
      log_ai_usage: {
        Args: {
          p_account_id: string;
          p_action_type: string;
          p_entity_id?: string;
          p_entity_type?: string;
          p_error_message?: string;
          p_input_tokens?: number;
          p_latency_ms?: number;
          p_merchant_id: string;
          p_model?: string;
          p_output_tokens?: number;
          p_prompt_summary?: string;
          p_response_summary?: string;
          p_session_id?: string;
          p_status?: string;
        };
        Returns: string;
      };
      log_notification: {
        Args: {
          p_account_id: string;
          p_body?: string;
          p_category: string;
          p_data?: Json;
          p_notification_type: string;
          p_reference_id?: string;
          p_reference_type?: string;
          p_title: string;
        };
        Returns: string;
      };
      loyalty_bug_report: {
        Args: { p_account_id: string; p_report_id: string };
        Returns: number;
      };
      loyalty_checkin: {
        Args: { p_account_id: string; p_merchant_id: string };
        Returns: number;
      };
      loyalty_ingredient_contributed: {
        Args: { p_account_id: string; p_ingredient_id: string };
        Returns: number;
      };
      loyalty_order_completed: {
        Args: {
          p_account_id: string;
          p_merchant_id?: string;
          p_order_id: string;
          p_order_total: number;
        };
        Returns: number;
      };
      loyalty_profile_complete: {
        Args: { p_account_id: string };
        Returns: number;
      };
      loyalty_referral_signup: {
        Args: {
          p_referral_type?: string;
          p_referred_account_id: string;
          p_referrer_account_id: string;
        };
        Returns: number;
      };
      loyalty_review_submitted: {
        Args: { p_account_id: string; p_order_id?: string; p_review_id: string };
        Returns: number;
      };
      loyalty_social_share: {
        Args: {
          p_account_id: string;
          p_platform?: string;
          p_product_id: string;
        };
        Returns: number;
      };
      mark_contribution_duplicate: {
        Args: {
          p_contribution_id: string;
          p_existing_ingredient_id: string;
          p_notes?: string;
          p_reviewer_account_id: string;
        };
        Returns: undefined;
      };
      mark_knowledge_referenced: {
        Args: { p_knowledge_id: string };
        Returns: undefined;
      };
      mark_notification_read: { Args: { p_log_id: string }; Returns: undefined };
      mark_notification_sent: { Args: { p_log_id: string }; Returns: undefined };
      mark_overdue_tasks: { Args: never; Returns: number };
      normalize_gtin: { Args: { input_code: string }; Returns: string };
      pause_ended_trips: { Args: never; Returns: number };
      process_referral_signup: {
        Args: { p_new_account_id: string; p_referral_code: string };
        Returns: {
          error_message: string;
          referred_points: number;
          referrer_id: string;
          referrer_points: number;
          success: boolean;
        }[];
      };
      record_daily_login: { Args: { p_account_id: string }; Returns: number };
      record_login: { Args: { p_account_id: string }; Returns: undefined };
      record_trigger_budget_revenue: {
        Args: { p_revenue: number; p_trigger_id: string };
        Returns: undefined;
      };
      record_trigger_budget_spend: {
        Args: { p_execution_cost?: number; p_trigger_id: string };
        Returns: Json;
      };
      record_user_login: { Args: never; Returns: undefined };
      redeem_reward: {
        Args: { p_account_id: string; p_reward_id: string };
        Returns: string;
      };
      register_push_token: {
        Args: {
          p_account_id: string;
          p_device_id?: string;
          p_device_name?: string;
          p_platform: string;
          p_token: string;
        };
        Returns: string;
      };
      reject_ingredient_contribution: {
        Args: {
          p_contribution_id: string;
          p_notes?: string;
          p_reason: string;
          p_reviewer_account_id: string;
        };
        Returns: undefined;
      };
      remove_staff_member: {
        Args: { p_remover_account_id: string; p_role_id: string };
        Returns: boolean;
      };
      reset_monthly_ai_usage: { Args: never; Returns: undefined };
      resolve_custom_domain: {
        Args: { p_domain: string };
        Returns: {
          brand_id: string;
          entity_id: string;
          entity_type: string;
          location_id: string;
          organization_id: string;
          partner_id: string;
        }[];
      };
      revoke_staff_invitation: {
        Args: { p_invitation_id: string; p_revoker_account_id: string };
        Returns: boolean;
      };
      seed_default_hot_actions: {
        Args: { p_location_id: string };
        Returns: undefined;
      };
      set_primary_role: {
        Args: { p_account_id: string; p_role_id: string };
        Returns: boolean;
      };
      set_visitor_type: {
        Args: {
          p_home_city?: string;
          p_home_country?: string;
          p_merchant_id: string;
          p_post_trip_preference?: string;
          p_trip_end_date?: string;
          p_visitor_type: string;
        };
        Returns: boolean;
      };
      should_send_notification: {
        Args: {
          p_account_id: string;
          p_category: string;
          p_notification_type: string;
        };
        Returns: boolean;
      };
      start_merchant_onboarding: {
        Args: {
          p_email: string;
          p_first_name?: string;
          p_last_name?: string;
          p_referral_code?: string;
          p_utm_campaign?: string;
          p_utm_medium?: string;
          p_utm_source?: string;
        };
        Returns: {
          account_id: string;
          is_existing_account: boolean;
          session_id: string;
          session_token: string;
        }[];
      };
      submit_crypto_payment: {
        Args: {
          p_customer_wallet?: string;
          p_payment_id: string;
          p_tx_hash?: string;
        };
        Returns: boolean;
      };
      submit_hot_action: {
        Args: {
          p_action_code: string;
          p_device_id?: string;
          p_location_id: string;
          p_note?: string;
          p_table_number?: string;
        };
        Returns: string;
      };
      submit_ingredient_contribution: {
        Args: {
          p_account_id: string;
          p_category?: string;
          p_ingredient_name: string;
          p_locale?: string;
          p_source_photos?: string[];
          p_source_type?: string;
          p_submitted_json: Json;
        };
        Returns: string;
      };
      submit_suggestion: {
        Args: {
          p_account_id: string;
          p_current_value?: Json;
          p_description: string;
          p_entity_id?: string;
          p_entity_name?: string;
          p_entity_type?: string;
          p_sources?: string[];
          p_suggested_value?: Json;
          p_suggestion_type: string;
          p_title: string;
        };
        Returns: string;
      };
      sync_customer_intelligence_from_analytics: {
        Args: { p_merchant_id: string };
        Returns: number;
      };
      track_event: {
        Args: {
          p_account_id?: string;
          p_anonymous_id?: string;
          p_client_timestamp?: string;
          p_device_type?: string;
          p_event_category: string;
          p_event_name: string;
          p_merchant_id?: string;
          p_page_path?: string;
          p_platform?: string;
          p_properties?: Json;
          p_session_id?: string;
          p_utm_campaign?: string;
          p_utm_medium?: string;
          p_utm_source?: string;
        };
        Returns: string;
      };
      track_page_view: {
        Args: {
          p_account_id?: string;
          p_merchant_id?: string;
          p_page_path: string;
          p_page_title?: string;
          p_referrer?: string;
          p_session_id?: string;
        };
        Returns: string;
      };
      unfollow_merchant: { Args: { p_merchant_id: string }; Returns: boolean };
      update_menu_item_food_cost: {
        Args: { p_menu_item_id: string };
        Returns: undefined;
      };
      update_notification_preferences: {
        Args: { p_account_id: string; p_preferences: Json };
        Returns: boolean;
      };
      update_onboarding_step: {
        Args: { p_data: Json; p_session_token: string; p_step: number };
        Returns: boolean;
      };
      update_profile: {
        Args: {
          p_account_id: string;
          p_avatar_url?: string;
          p_display_name?: string;
          p_first_name?: string;
          p_last_name?: string;
          p_locale?: string;
          p_phone?: string;
          p_timezone?: string;
        };
        Returns: boolean;
      };
      update_role_permissions: {
        Args: { p_permissions: Json; p_role_id: string };
        Returns: boolean;
      };
      update_staff_permissions: {
        Args: {
          p_new_permissions: Json;
          p_new_title?: string;
          p_role_id: string;
          p_updater_account_id: string;
        };
        Returns: boolean;
      };
      update_suggestion_status: {
        Args: {
          p_duplicate_of?: string;
          p_moderator_id: string;
          p_new_status: string;
          p_notes?: string;
          p_points_to_award?: number;
          p_rejection_reason?: string;
          p_suggestion_id: string;
        };
        Returns: boolean;
      };
      use_redemption: {
        Args: { p_order_id?: string; p_redemption_id: string };
        Returns: boolean;
      };
      validate_referral_code: {
        Args: { p_code: string };
        Returns: {
          error_message: string;
          is_valid: boolean;
          referrer_id: string;
          referrer_name: string;
        }[];
      };
      validate_voucher: {
        Args: { p_merchant_id: string; p_voucher_code: string };
        Returns: {
          benefit_type: string;
          benefit_value: number;
          convention_id: string;
          error_message: string;
          is_valid: boolean;
          partner_name: string;
          voucher_id: string;
        }[];
      };
      vote_on_suggestion: {
        Args: {
          p_account_id: string;
          p_suggestion_id: string;
          p_vote_type: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      acidity_level: 'low' | 'medium_low' | 'medium' | 'medium_high' | 'high';
      appetizer_category:
        | 'bruschetta'
        | 'crostini'
        | 'fritti'
        | 'carpaccio'
        | 'tartare'
        | 'affettati'
        | 'formaggi'
        | 'verdure'
        | 'mare'
        | 'tapas'
        | 'mezze'
        | 'dips'
        | 'skewers'
        | 'rolls'
        | 'bites'
        | 'other';
      appetizer_status: 'classic' | 'traditional' | 'modern' | 'signature' | 'seasonal' | 'active';
      appetizer_style:
        | 'italian'
        | 'spanish'
        | 'greek'
        | 'middle_eastern'
        | 'asian'
        | 'french'
        | 'american'
        | 'mexican'
        | 'international'
        | 'fusion';
      boba_topping:
        | 'tapioca_pearls'
        | 'brown_sugar_pearls'
        | 'popping_boba'
        | 'coconut_jelly'
        | 'aloe_vera'
        | 'grass_jelly'
        | 'pudding'
        | 'red_bean'
        | 'cheese_foam'
        | 'taro_balls'
        | 'none';
      bread_type:
        | 'ciabatta'
        | 'focaccia'
        | 'focaccia_thin'
        | 'baguette'
        | 'piadina'
        | 'white_bread_crustless'
        | 'rosetta'
        | 'semelle'
        | 'tuscan_bread'
        | 'pain_de_mie'
        | 'white_toast'
        | 'rye_bread'
        | 'hoagie_roll'
        | 'french_bread'
        | 'cuban_bread'
        | 'vietnamese_baguette'
        | 'pita'
        | 'flour_tortilla'
        | 'whole_wheat_tortilla'
        | 'large_flour_tortilla'
        | 'rice_paper'
        | 'lavash'
        | 'birote'
        | 'brioche'
        | 'sourdough'
        | 'multigrain'
        | 'other';
      bubble_tea_base: 'black_tea' | 'green_tea' | 'oolong' | 'none';
      bun_type:
        | 'brioche'
        | 'sesame'
        | 'potato'
        | 'pretzel'
        | 'ciabatta'
        | 'english_muffin'
        | 'lettuce_wrap'
        | 'gluten_free'
        | 'sourdough'
        | 'kaiser'
        | 'onion_roll'
        | 'whole_wheat'
        | 'other';
      burger_status: 'classic' | 'traditional' | 'modern' | 'signature' | 'seasonal' | 'active';
      burger_style:
        | 'american_classic'
        | 'american_regional'
        | 'gourmet'
        | 'international'
        | 'plant_based'
        | 'chicken'
        | 'fish'
        | 'signature';
      caffeine_level: 'decaf' | 'low' | 'medium' | 'high' | 'very_high';
      coffee_category:
        | 'espresso_based'
        | 'coffee_mix'
        | 'cold_brew'
        | 'filter_coffee'
        | 'specialty';
      coffee_style: 'hot' | 'iced' | 'blended' | 'layered';
      coffee_sweetness: 'unsweetened' | 'lightly_sweet' | 'medium' | 'sweet' | 'very_sweet';
      cook_level: 'rare' | 'medium_rare' | 'medium' | 'medium_well' | 'well_done';
      cooking_method: 'boiled' | 'baked' | 'stir_fried' | 'soup' | 'cold' | 'fresh_raw';
      dessert_category:
        | 'cake'
        | 'pie'
        | 'tart'
        | 'pastry'
        | 'cookie'
        | 'gelato'
        | 'sorbet'
        | 'mousse'
        | 'pudding'
        | 'custard'
        | 'chocolate'
        | 'fruit'
        | 'frozen'
        | 'fried'
        | 'crepe'
        | 'other';
      dessert_serving_temp: 'hot' | 'warm' | 'room_temp' | 'cold' | 'frozen';
      dessert_status: 'classic' | 'traditional' | 'modern' | 'signature' | 'seasonal' | 'active';
      dessert_style:
        | 'italian'
        | 'french'
        | 'american'
        | 'asian'
        | 'middle_eastern'
        | 'spanish'
        | 'german'
        | 'british'
        | 'international'
        | 'fusion';
      finish_length: 'short' | 'medium' | 'long' | 'very_long';
      ingredient_category:
        | 'spirits'
        | 'liqueurs'
        | 'wines'
        | 'beers'
        | 'mixers'
        | 'juices'
        | 'dairy'
        | 'eggs'
        | 'vegetables'
        | 'fruits'
        | 'herbs'
        | 'spices'
        | 'grains'
        | 'pasta'
        | 'rice'
        | 'bread'
        | 'proteins'
        | 'seafood'
        | 'cheese'
        | 'oils'
        | 'vinegars'
        | 'sauces'
        | 'condiments'
        | 'sweeteners'
        | 'nuts'
        | 'seeds'
        | 'legumes'
        | 'garnishes'
        | 'bitters'
        | 'syrups'
        | 'other'
        | 'coffee'
        | 'tea'
        | 'dairy_alternatives'
        | 'boba'
        | 'powders'
        | 'supplements'
        | 'chocolate'
        | 'baked_goods'
        | 'beverages'
        | 'basics'
        | 'seasonings'
        | 'fats'
        | 'red_meat'
        | 'poultry'
        | 'game'
        | 'offal'
        | 'cured_meats'
        | 'sausages';
      japanese_category:
        | 'nigiri'
        | 'sashimi'
        | 'maki'
        | 'uramaki'
        | 'temaki'
        | 'gunkan'
        | 'chirashi'
        | 'donburi'
        | 'specialty_roll'
        | 'inari'
        | 'oshizushi'
        | 'temari';
      japanese_origin:
        | 'traditional_edo'
        | 'traditional_osaka'
        | 'traditional_kyoto'
        | 'traditional_other'
        | 'american_fusion'
        | 'modern_japanese'
        | 'international';
      japanese_preparation:
        | 'raw'
        | 'seared'
        | 'cured'
        | 'marinated'
        | 'grilled'
        | 'tempura'
        | 'torched'
        | 'smoked'
        | 'pressed'
        | 'cooked'
        | 'pickled';
      japanese_protein:
        | 'maguro_akami'
        | 'maguro_chutoro'
        | 'maguro_otoro'
        | 'kuromaguro'
        | 'bincho'
        | 'sake'
        | 'sake_belly'
        | 'hamachi'
        | 'buri'
        | 'kanpachi'
        | 'tai'
        | 'hirame'
        | 'suzuki'
        | 'madai'
        | 'saba'
        | 'aji'
        | 'iwashi'
        | 'katsuo'
        | 'unagi'
        | 'anago'
        | 'ebi'
        | 'amaebi'
        | 'kurumaebi'
        | 'hotate'
        | 'akagai'
        | 'torigai'
        | 'mirugai'
        | 'hokkigai'
        | 'hamaguri'
        | 'ika'
        | 'tako'
        | 'ikura'
        | 'tobiko'
        | 'masago'
        | 'uni'
        | 'kazunoko'
        | 'kani'
        | 'taraba'
        | 'tamago'
        | 'tofu'
        | 'vegetable'
        | 'mixed'
        | 'none';
      japanese_status: 'classic' | 'popular' | 'premium' | 'omakase' | 'signature' | 'seasonal';
      milk_type: 'whole' | 'skim' | 'oat' | 'almond' | 'soy' | 'coconut' | 'none';
      oak_level: 'none' | 'light' | 'medium' | 'heavy';
      pasta_dough:
        | 'semolina'
        | 'egg'
        | 'whole_wheat'
        | 'spinach'
        | 'beetroot'
        | 'squid_ink'
        | 'gluten_free'
        | 'legume'
        | 'rice'
        | 'wheat'
        | 'buckwheat'
        | 'sweet_potato'
        | 'other';
      pasta_shape:
        | 'spaghetti'
        | 'spaghettini'
        | 'linguine'
        | 'fettuccine'
        | 'tagliatelle'
        | 'pappardelle'
        | 'bucatini'
        | 'capellini'
        | 'vermicelli'
        | 'bigoli'
        | 'penne'
        | 'rigatoni'
        | 'fusilli'
        | 'farfalle'
        | 'orecchiette'
        | 'conchiglie'
        | 'cavatappi'
        | 'paccheri'
        | 'mezze_maniche'
        | 'trofie'
        | 'strozzapreti'
        | 'calamarata'
        | 'ravioli'
        | 'tortellini'
        | 'tortelloni'
        | 'agnolotti'
        | 'cappelletti'
        | 'mezzelune'
        | 'culurgiones'
        | 'lasagne'
        | 'cannelloni'
        | 'manicotti'
        | 'ramen'
        | 'udon'
        | 'soba'
        | 'rice_noodles'
        | 'glass_noodles'
        | 'egg_noodles'
        | 'lo_mein'
        | 'rice_vermicelli'
        | 'pho_noodles'
        | 'pad_thai_noodles'
        | 'japchae_noodles'
        | 'gnocchetti'
        | 'malloreddus'
        | 'other';
      pasta_status:
        | 'classic'
        | 'traditional'
        | 'modern'
        | 'signature'
        | 'seasonal'
        | 'trending'
        | 'active';
      pasta_style:
        | 'italian_classic'
        | 'italian_regional'
        | 'italian_fresh'
        | 'italian_filled'
        | 'italian_baked'
        | 'asian_chinese'
        | 'asian_japanese'
        | 'asian_korean'
        | 'asian_vietnamese'
        | 'asian_thai'
        | 'asian_other'
        | 'fusion'
        | 'signature';
      patty_type:
        | 'beef'
        | 'wagyu'
        | 'angus'
        | 'blend'
        | 'chicken'
        | 'turkey'
        | 'lamb'
        | 'pork'
        | 'fish'
        | 'shrimp'
        | 'plant_based'
        | 'black_bean'
        | 'portobello'
        | 'other';
      price_tier: 'budget' | 'value' | 'mid' | 'premium' | 'luxury';
      rice_cooking_method:
        | 'risotto'
        | 'pilaf'
        | 'paella'
        | 'biryani'
        | 'fried'
        | 'steamed'
        | 'baked'
        | 'congee'
        | 'pressure_cooked';
      rice_type:
        | 'arborio'
        | 'carnaroli'
        | 'vialone_nano'
        | 'bomba'
        | 'calasparra'
        | 'basmati'
        | 'jasmine'
        | 'long_grain'
        | 'short_grain'
        | 'sticky'
        | 'brown'
        | 'wild'
        | 'black'
        | 'red'
        | 'other';
      risotto_status:
        | 'active'
        | 'classic'
        | 'traditional'
        | 'modern'
        | 'signature'
        | 'seasonal'
        | 'inactive';
      risotto_style:
        | 'italian_classic'
        | 'italian_regional'
        | 'spanish_paella'
        | 'indian_biryani'
        | 'asian_fried'
        | 'asian_other'
        | 'middle_eastern'
        | 'latin_american'
        | 'fusion'
        | 'signature';
      roll_style:
        | 'hosomaki'
        | 'chumaki'
        | 'futomaki'
        | 'uramaki'
        | 'temaki'
        | 'gunkan'
        | 'not_applicable';
      salad_base:
        | 'romaine'
        | 'mixed_greens'
        | 'iceberg'
        | 'arugula'
        | 'spinach'
        | 'kale'
        | 'cabbage'
        | 'lettuce_butter'
        | 'radicchio'
        | 'endive'
        | 'watercress'
        | 'grain'
        | 'rice'
        | 'noodle'
        | 'bread'
        | 'no_base';
      salad_status: 'classic' | 'traditional' | 'modern' | 'signature' | 'seasonal' | 'trending';
      salad_style:
        | 'classic'
        | 'italian'
        | 'mediterranean'
        | 'asian'
        | 'bowl'
        | 'poke'
        | 'protein'
        | 'superfood'
        | 'seasonal'
        | 'signature';
      salad_temperature: 'cold' | 'warm' | 'room_temp' | 'mixed';
      sandwich_status: 'classic' | 'traditional' | 'modern' | 'signature' | 'seasonal' | 'active';
      sandwich_style:
        | 'italian'
        | 'french'
        | 'american'
        | 'cuban'
        | 'vietnamese'
        | 'middle_eastern'
        | 'mexican'
        | 'mexican_american'
        | 'greek'
        | 'turkish'
        | 'healthy'
        | 'signature';
      sauce_type:
        | 'tomato'
        | 'cream'
        | 'oil_based'
        | 'butter'
        | 'pesto'
        | 'meat'
        | 'seafood'
        | 'cheese'
        | 'broth'
        | 'stir_fry'
        | 'curry'
        | 'spicy'
        | 'vegetable'
        | 'none';
      serving_temperature: 'hot' | 'warm' | 'room_temp' | 'cold' | 'frozen';
      storage_temp: 'frozen' | 'refrigerated' | 'cool' | 'room_temp' | 'warm';
      sweetness_level: 'bone_dry' | 'dry' | 'off_dry' | 'medium_sweet' | 'sweet' | 'very_sweet';
      tannin_level: 'none' | 'low' | 'medium' | 'high' | 'very_high' | 'medium_high';
      tea_caffeine_level: 'none' | 'very_low' | 'low' | 'medium' | 'high';
      tea_category:
        | 'black_tea'
        | 'green_tea'
        | 'oolong_tea'
        | 'white_tea'
        | 'pu_erh'
        | 'matcha'
        | 'bubble_tea'
        | 'chai'
        | 'herbal_infusion'
        | 'fruit_tea'
        | 'specialty';
      tea_style: 'hot' | 'iced' | 'blended' | 'layered';
      tea_sweetness: 'unsweetened' | 'lightly_sweet' | 'medium' | 'sweet' | 'very_sweet';
      vintage_type: 'vintage' | 'non_vintage' | 'multi_vintage';
      wine_body: 'light' | 'medium_light' | 'medium' | 'medium_full' | 'full';
      wine_color: 'red' | 'white' | 'rosé' | 'orange' | 'sparkling' | 'dessert' | 'fortified';
      wine_status:
        | 'classic'
        | 'premium'
        | 'reserve'
        | 'grand_cru'
        | 'everyday'
        | 'organic'
        | 'natural';
      wine_style:
        | 'dry'
        | 'off_dry'
        | 'semi_sweet'
        | 'sweet'
        | 'sparkling_brut'
        | 'sparkling_extra_brut'
        | 'sparkling_sec'
        | 'fortified_dry'
        | 'fortified_sweet';
      wrap_style:
        | 'american'
        | 'mexican'
        | 'vietnamese'
        | 'turkish'
        | 'middle_eastern'
        | 'asian'
        | 'mediterranean'
        | 'healthy'
        | 'breakfast';
      wrap_type:
        | 'flour_tortilla'
        | 'whole_wheat_tortilla'
        | 'spinach_tortilla'
        | 'tomato_tortilla'
        | 'large_flour_tortilla'
        | 'rice_paper'
        | 'lavash'
        | 'flatbread'
        | 'lettuce'
        | 'nori'
        | 'collard_green'
        | 'other';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      acidity_level: ['low', 'medium_low', 'medium', 'medium_high', 'high'],
      appetizer_category: [
        'bruschetta',
        'crostini',
        'fritti',
        'carpaccio',
        'tartare',
        'affettati',
        'formaggi',
        'verdure',
        'mare',
        'tapas',
        'mezze',
        'dips',
        'skewers',
        'rolls',
        'bites',
        'other',
      ],
      appetizer_status: ['classic', 'traditional', 'modern', 'signature', 'seasonal', 'active'],
      appetizer_style: [
        'italian',
        'spanish',
        'greek',
        'middle_eastern',
        'asian',
        'french',
        'american',
        'mexican',
        'international',
        'fusion',
      ],
      boba_topping: [
        'tapioca_pearls',
        'brown_sugar_pearls',
        'popping_boba',
        'coconut_jelly',
        'aloe_vera',
        'grass_jelly',
        'pudding',
        'red_bean',
        'cheese_foam',
        'taro_balls',
        'none',
      ],
      bread_type: [
        'ciabatta',
        'focaccia',
        'focaccia_thin',
        'baguette',
        'piadina',
        'white_bread_crustless',
        'rosetta',
        'semelle',
        'tuscan_bread',
        'pain_de_mie',
        'white_toast',
        'rye_bread',
        'hoagie_roll',
        'french_bread',
        'cuban_bread',
        'vietnamese_baguette',
        'pita',
        'flour_tortilla',
        'whole_wheat_tortilla',
        'large_flour_tortilla',
        'rice_paper',
        'lavash',
        'birote',
        'brioche',
        'sourdough',
        'multigrain',
        'other',
      ],
      bubble_tea_base: ['black_tea', 'green_tea', 'oolong', 'none'],
      bun_type: [
        'brioche',
        'sesame',
        'potato',
        'pretzel',
        'ciabatta',
        'english_muffin',
        'lettuce_wrap',
        'gluten_free',
        'sourdough',
        'kaiser',
        'onion_roll',
        'whole_wheat',
        'other',
      ],
      burger_status: ['classic', 'traditional', 'modern', 'signature', 'seasonal', 'active'],
      burger_style: [
        'american_classic',
        'american_regional',
        'gourmet',
        'international',
        'plant_based',
        'chicken',
        'fish',
        'signature',
      ],
      caffeine_level: ['decaf', 'low', 'medium', 'high', 'very_high'],
      coffee_category: ['espresso_based', 'coffee_mix', 'cold_brew', 'filter_coffee', 'specialty'],
      coffee_style: ['hot', 'iced', 'blended', 'layered'],
      coffee_sweetness: ['unsweetened', 'lightly_sweet', 'medium', 'sweet', 'very_sweet'],
      cook_level: ['rare', 'medium_rare', 'medium', 'medium_well', 'well_done'],
      cooking_method: ['boiled', 'baked', 'stir_fried', 'soup', 'cold', 'fresh_raw'],
      dessert_category: [
        'cake',
        'pie',
        'tart',
        'pastry',
        'cookie',
        'gelato',
        'sorbet',
        'mousse',
        'pudding',
        'custard',
        'chocolate',
        'fruit',
        'frozen',
        'fried',
        'crepe',
        'other',
      ],
      dessert_serving_temp: ['hot', 'warm', 'room_temp', 'cold', 'frozen'],
      dessert_status: ['classic', 'traditional', 'modern', 'signature', 'seasonal', 'active'],
      dessert_style: [
        'italian',
        'french',
        'american',
        'asian',
        'middle_eastern',
        'spanish',
        'german',
        'british',
        'international',
        'fusion',
      ],
      finish_length: ['short', 'medium', 'long', 'very_long'],
      ingredient_category: [
        'spirits',
        'liqueurs',
        'wines',
        'beers',
        'mixers',
        'juices',
        'dairy',
        'eggs',
        'vegetables',
        'fruits',
        'herbs',
        'spices',
        'grains',
        'pasta',
        'rice',
        'bread',
        'proteins',
        'seafood',
        'cheese',
        'oils',
        'vinegars',
        'sauces',
        'condiments',
        'sweeteners',
        'nuts',
        'seeds',
        'legumes',
        'garnishes',
        'bitters',
        'syrups',
        'other',
        'coffee',
        'tea',
        'dairy_alternatives',
        'boba',
        'powders',
        'supplements',
        'chocolate',
        'baked_goods',
        'beverages',
        'basics',
        'seasonings',
        'fats',
        'red_meat',
        'poultry',
        'game',
        'offal',
        'cured_meats',
        'sausages',
      ],
      japanese_category: [
        'nigiri',
        'sashimi',
        'maki',
        'uramaki',
        'temaki',
        'gunkan',
        'chirashi',
        'donburi',
        'specialty_roll',
        'inari',
        'oshizushi',
        'temari',
      ],
      japanese_origin: [
        'traditional_edo',
        'traditional_osaka',
        'traditional_kyoto',
        'traditional_other',
        'american_fusion',
        'modern_japanese',
        'international',
      ],
      japanese_preparation: [
        'raw',
        'seared',
        'cured',
        'marinated',
        'grilled',
        'tempura',
        'torched',
        'smoked',
        'pressed',
        'cooked',
        'pickled',
      ],
      japanese_protein: [
        'maguro_akami',
        'maguro_chutoro',
        'maguro_otoro',
        'kuromaguro',
        'bincho',
        'sake',
        'sake_belly',
        'hamachi',
        'buri',
        'kanpachi',
        'tai',
        'hirame',
        'suzuki',
        'madai',
        'saba',
        'aji',
        'iwashi',
        'katsuo',
        'unagi',
        'anago',
        'ebi',
        'amaebi',
        'kurumaebi',
        'hotate',
        'akagai',
        'torigai',
        'mirugai',
        'hokkigai',
        'hamaguri',
        'ika',
        'tako',
        'ikura',
        'tobiko',
        'masago',
        'uni',
        'kazunoko',
        'kani',
        'taraba',
        'tamago',
        'tofu',
        'vegetable',
        'mixed',
        'none',
      ],
      japanese_status: ['classic', 'popular', 'premium', 'omakase', 'signature', 'seasonal'],
      milk_type: ['whole', 'skim', 'oat', 'almond', 'soy', 'coconut', 'none'],
      oak_level: ['none', 'light', 'medium', 'heavy'],
      pasta_dough: [
        'semolina',
        'egg',
        'whole_wheat',
        'spinach',
        'beetroot',
        'squid_ink',
        'gluten_free',
        'legume',
        'rice',
        'wheat',
        'buckwheat',
        'sweet_potato',
        'other',
      ],
      pasta_shape: [
        'spaghetti',
        'spaghettini',
        'linguine',
        'fettuccine',
        'tagliatelle',
        'pappardelle',
        'bucatini',
        'capellini',
        'vermicelli',
        'bigoli',
        'penne',
        'rigatoni',
        'fusilli',
        'farfalle',
        'orecchiette',
        'conchiglie',
        'cavatappi',
        'paccheri',
        'mezze_maniche',
        'trofie',
        'strozzapreti',
        'calamarata',
        'ravioli',
        'tortellini',
        'tortelloni',
        'agnolotti',
        'cappelletti',
        'mezzelune',
        'culurgiones',
        'lasagne',
        'cannelloni',
        'manicotti',
        'ramen',
        'udon',
        'soba',
        'rice_noodles',
        'glass_noodles',
        'egg_noodles',
        'lo_mein',
        'rice_vermicelli',
        'pho_noodles',
        'pad_thai_noodles',
        'japchae_noodles',
        'gnocchetti',
        'malloreddus',
        'other',
      ],
      pasta_status: [
        'classic',
        'traditional',
        'modern',
        'signature',
        'seasonal',
        'trending',
        'active',
      ],
      pasta_style: [
        'italian_classic',
        'italian_regional',
        'italian_fresh',
        'italian_filled',
        'italian_baked',
        'asian_chinese',
        'asian_japanese',
        'asian_korean',
        'asian_vietnamese',
        'asian_thai',
        'asian_other',
        'fusion',
        'signature',
      ],
      patty_type: [
        'beef',
        'wagyu',
        'angus',
        'blend',
        'chicken',
        'turkey',
        'lamb',
        'pork',
        'fish',
        'shrimp',
        'plant_based',
        'black_bean',
        'portobello',
        'other',
      ],
      price_tier: ['budget', 'value', 'mid', 'premium', 'luxury'],
      rice_cooking_method: [
        'risotto',
        'pilaf',
        'paella',
        'biryani',
        'fried',
        'steamed',
        'baked',
        'congee',
        'pressure_cooked',
      ],
      rice_type: [
        'arborio',
        'carnaroli',
        'vialone_nano',
        'bomba',
        'calasparra',
        'basmati',
        'jasmine',
        'long_grain',
        'short_grain',
        'sticky',
        'brown',
        'wild',
        'black',
        'red',
        'other',
      ],
      risotto_status: [
        'active',
        'classic',
        'traditional',
        'modern',
        'signature',
        'seasonal',
        'inactive',
      ],
      risotto_style: [
        'italian_classic',
        'italian_regional',
        'spanish_paella',
        'indian_biryani',
        'asian_fried',
        'asian_other',
        'middle_eastern',
        'latin_american',
        'fusion',
        'signature',
      ],
      roll_style: [
        'hosomaki',
        'chumaki',
        'futomaki',
        'uramaki',
        'temaki',
        'gunkan',
        'not_applicable',
      ],
      salad_base: [
        'romaine',
        'mixed_greens',
        'iceberg',
        'arugula',
        'spinach',
        'kale',
        'cabbage',
        'lettuce_butter',
        'radicchio',
        'endive',
        'watercress',
        'grain',
        'rice',
        'noodle',
        'bread',
        'no_base',
      ],
      salad_status: ['classic', 'traditional', 'modern', 'signature', 'seasonal', 'trending'],
      salad_style: [
        'classic',
        'italian',
        'mediterranean',
        'asian',
        'bowl',
        'poke',
        'protein',
        'superfood',
        'seasonal',
        'signature',
      ],
      salad_temperature: ['cold', 'warm', 'room_temp', 'mixed'],
      sandwich_status: ['classic', 'traditional', 'modern', 'signature', 'seasonal', 'active'],
      sandwich_style: [
        'italian',
        'french',
        'american',
        'cuban',
        'vietnamese',
        'middle_eastern',
        'mexican',
        'mexican_american',
        'greek',
        'turkish',
        'healthy',
        'signature',
      ],
      sauce_type: [
        'tomato',
        'cream',
        'oil_based',
        'butter',
        'pesto',
        'meat',
        'seafood',
        'cheese',
        'broth',
        'stir_fry',
        'curry',
        'spicy',
        'vegetable',
        'none',
      ],
      serving_temperature: ['hot', 'warm', 'room_temp', 'cold', 'frozen'],
      storage_temp: ['frozen', 'refrigerated', 'cool', 'room_temp', 'warm'],
      sweetness_level: ['bone_dry', 'dry', 'off_dry', 'medium_sweet', 'sweet', 'very_sweet'],
      tannin_level: ['none', 'low', 'medium', 'high', 'very_high', 'medium_high'],
      tea_caffeine_level: ['none', 'very_low', 'low', 'medium', 'high'],
      tea_category: [
        'black_tea',
        'green_tea',
        'oolong_tea',
        'white_tea',
        'pu_erh',
        'matcha',
        'bubble_tea',
        'chai',
        'herbal_infusion',
        'fruit_tea',
        'specialty',
      ],
      tea_style: ['hot', 'iced', 'blended', 'layered'],
      tea_sweetness: ['unsweetened', 'lightly_sweet', 'medium', 'sweet', 'very_sweet'],
      vintage_type: ['vintage', 'non_vintage', 'multi_vintage'],
      wine_body: ['light', 'medium_light', 'medium', 'medium_full', 'full'],
      wine_color: ['red', 'white', 'rosé', 'orange', 'sparkling', 'dessert', 'fortified'],
      wine_status: ['classic', 'premium', 'reserve', 'grand_cru', 'everyday', 'organic', 'natural'],
      wine_style: [
        'dry',
        'off_dry',
        'semi_sweet',
        'sweet',
        'sparkling_brut',
        'sparkling_extra_brut',
        'sparkling_sec',
        'fortified_dry',
        'fortified_sweet',
      ],
      wrap_style: [
        'american',
        'mexican',
        'vietnamese',
        'turkish',
        'middle_eastern',
        'asian',
        'mediterranean',
        'healthy',
        'breakfast',
      ],
      wrap_type: [
        'flour_tortilla',
        'whole_wheat_tortilla',
        'spinach_tortilla',
        'tomato_tortilla',
        'large_flour_tortilla',
        'rice_paper',
        'lavash',
        'flatbread',
        'lettuce',
        'nori',
        'collard_green',
        'other',
      ],
    },
  },
} as const;
