/**
 * Supabase Database Types
 *
 * IMPORTANT: This file should be auto-generated using:
 * npx supabase gen types typescript --project-id vnaonebbuezrzvjekqxs --schema public > supabase.ts
 *
 * First, login with: npx supabase login
 *
 * For now, we define the core table types manually.
 * These should be replaced with auto-generated types.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ============================================================================
// Database Schema Types
// ============================================================================

export interface Database {
  public: {
    Tables: {
      // Core Account System
      accounts: {
        Row: {
          id: string;
          auth_id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          role: 'consumer' | 'merchant' | 'admin';
          status: 'active' | 'suspended' | 'deleted';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['accounts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['accounts']['Insert']>;
      };

      // Points Economy
      account_points: {
        Row: {
          account_id: string;
          available_points: number;
          pending_points: number;
          lifetime_points: number;
          tier: 'bronze' | 'silver' | 'gold' | 'platinum';
          tier_updated_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['account_points']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['account_points']['Insert']>;
      };

      points_transactions: {
        Row: {
          id: string;
          account_id: string;
          amount: number;
          transaction_type: 'earn' | 'redeem' | 'expire' | 'bonus' | 'transfer';
          source: string;
          source_id: string | null;
          description: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['points_transactions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['points_transactions']['Insert']>;
      };

      // Badges
      badges: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon_url: string | null;
          category: string;
          rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
          points_value: number;
          requirement_type: string;
          requirement_value: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['badges']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['badges']['Insert']>;
      };

      account_badges: {
        Row: {
          id: string;
          account_id: string;
          badge_id: string;
          earned_at: string;
          seen_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['account_badges']['Row'], 'id' | 'earned_at'>;
        Update: Partial<Database['public']['Tables']['account_badges']['Insert']>;
      };

      // Subscriptions
      subscriptions: {
        Row: {
          id: string;
          account_id: string;
          plan_id: string;
          status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'paused';
          stripe_subscription_id: string | null;
          current_period_start: string;
          current_period_end: string;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>;
      };

      subscription_plans: {
        Row: {
          id: string;
          name: string;
          display_name: string;
          description: string | null;
          plan_type: 'consumer' | 'merchant';
          price_monthly: number;
          price_yearly: number;
          currency: string;
          features: Json;
          limits: Json;
          stripe_price_id_monthly: string | null;
          stripe_price_id_yearly: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['subscription_plans']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['subscription_plans']['Insert']>;
      };

      // Notifications
      notifications: {
        Row: {
          id: string;
          account_id: string;
          type: string;
          title: string;
          body: string;
          data: Json | null;
          read_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };

      // Ingredients
      ingredients: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: string;
          description: string | null;
          nutrition: Json | null;
          allergens: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['ingredients']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['ingredients']['Insert']>;
      };

      // Products
      product_taxonomy: {
        Row: {
          id: string;
          product_type: string;
          display_name_en: string;
          display_name_it: string | null;
          menu_type: string;
          service_type: string;
          category: string;
          display_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['product_taxonomy']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['product_taxonomy']['Insert']>;
      };

      product_ingredients: {
        Row: {
          id: string;
          product_type: string;
          product_id: string;
          ingredient_id: string;
          role: 'main' | 'secondary' | 'seasoning' | 'garnish';
          quantity_amount: number | null;
          quantity_unit: string | null;
          is_optional: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['product_ingredients']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['product_ingredients']['Insert']>;
      };

      // Recipes
      recipes: {
        Row: {
          id: string;
          recipe_name: string;
          recipe_slug: string;
          description: string | null;
          cover_image_url: string | null;
          prep_time_min: number;
          cook_time_min: number;
          total_time_min: number;
          difficulty: number;
          servings: number;
          cuisine_tags: string[];
          diet_tags: string[];
          average_rating: number | null;
          rating_count: number;
          view_count: number;
          is_published: boolean;
          is_premium: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['recipes']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['recipes']['Insert']>;
      };

      saved_recipes: {
        Row: {
          id: string;
          account_id: string;
          recipe_id: string;
          collection_name: string;
          notes: string | null;
          cooked_count: number;
          last_cooked_at: string | null;
          saved_at: string;
        };
        Insert: Omit<Database['public']['Tables']['saved_recipes']['Row'], 'id' | 'saved_at'>;
        Update: Partial<Database['public']['Tables']['saved_recipes']['Insert']>;
      };

      // Reservations
      reservations: {
        Row: {
          id: string;
          account_id: string;
          merchant_id: string;
          confirmation_code: string;
          reservation_date: string;
          reservation_time: string;
          party_size: number;
          status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'canceled' | 'no_show';
          guest_name: string;
          guest_phone: string | null;
          guest_email: string | null;
          special_requests: string | null;
          canceled_at: string | null;
          canceled_by: string | null;
          cancellation_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reservations']['Row'], 'id' | 'confirmation_code' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['reservations']['Insert']>;
      };

      // Merchants
      merchants: {
        Row: {
          id: string;
          business_name: string;
          slug: string;
          logo_url: string | null;
          description: string | null;
          address: string | null;
          city: string | null;
          country: string | null;
          phone: string | null;
          email: string | null;
          website: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['merchants']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['merchants']['Insert']>;
      };

      // Social Share
      social_shares: {
        Row: {
          id: string;
          account_id: string;
          content_type: string;
          content_id: string;
          platform: string;
          share_url: string | null;
          click_count: number;
          conversion_count: number;
          points_awarded: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['social_shares']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['social_shares']['Insert']>;
      };
    };

    Views: {
      [_ in never]: never;
    };

    Functions: {
      award_points: {
        Args: {
          p_account_id: string;
          p_amount: number;
          p_source: string;
          p_source_id?: string;
          p_description?: string;
        };
        Returns: boolean;
      };
      redeem_points: {
        Args: {
          p_account_id: string;
          p_amount: number;
          p_source: string;
          p_description?: string;
        };
        Returns: boolean;
      };
      check_and_award_badges: {
        Args: {
          p_account_id: string;
        };
        Returns: string[];
      };
      has_premium_subscription: {
        Args: {
          p_account_id: string;
        };
        Returns: boolean;
      };
      has_feature_access: {
        Args: {
          p_account_id: string;
          p_feature: string;
        };
        Returns: boolean;
      };
    };

    Enums: {
      account_role: 'consumer' | 'merchant' | 'admin';
      account_status: 'active' | 'suspended' | 'deleted';
      points_tier: 'bronze' | 'silver' | 'gold' | 'platinum';
      subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'paused';
      reservation_status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'canceled' | 'no_show';
      badge_rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
      ingredient_role: 'main' | 'secondary' | 'seasoning' | 'garnish';
    };
  };
}

// ============================================================================
// Helper Types
// ============================================================================

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Convenience aliases
export type Account = Tables<'accounts'>;
export type AccountPoints = Tables<'account_points'>;
export type PointsTransaction = Tables<'points_transactions'>;
export type Badge = Tables<'badges'>;
export type AccountBadge = Tables<'account_badges'>;
export type Subscription = Tables<'subscriptions'>;
export type SubscriptionPlan = Tables<'subscription_plans'>;
export type Notification = Tables<'notifications'>;
export type Ingredient = Tables<'ingredients'>;
export type ProductTaxonomy = Tables<'product_taxonomy'>;
export type ProductIngredient = Tables<'product_ingredients'>;
export type Recipe = Tables<'recipes'>;
export type SavedRecipe = Tables<'saved_recipes'>;
export type Reservation = Tables<'reservations'>;
export type Merchant = Tables<'merchants'>;
export type SocialShare = Tables<'social_shares'>;
