/**
 * Supabase Database Types
 *
 * Auto-generated types for Supabase database schema.
 * Matches the SQL schema in shared/database/schema/001-menu-management.sql
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      merchants: {
        Row: {
          id: string;
          slug: string;
          name: string;
          logo_url: string | null;
          primary_color: string;
          secondary_color: string;
          currency: string;
          default_language: string;
          supported_languages: string[];
          timezone: string;
          country_code: string;
          wifi_enabled: boolean;
          wifi_ssid: string | null;
          wifi_password: string | null;
          tier: 'free' | 'starter' | 'professional' | 'enterprise';
          features: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          logo_url?: string | null;
          primary_color?: string;
          secondary_color?: string;
          currency?: string;
          default_language?: string;
          supported_languages?: string[];
          timezone?: string;
          country_code?: string;
          wifi_enabled?: boolean;
          wifi_ssid?: string | null;
          wifi_password?: string | null;
          tier?: 'free' | 'starter' | 'professional' | 'enterprise';
          features?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          logo_url?: string | null;
          primary_color?: string;
          secondary_color?: string;
          currency?: string;
          default_language?: string;
          supported_languages?: string[];
          timezone?: string;
          country_code?: string;
          wifi_enabled?: boolean;
          wifi_ssid?: string | null;
          wifi_password?: string | null;
          tier?: 'free' | 'starter' | 'professional' | 'enterprise';
          features?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      merchant_users: {
        Row: {
          id: string;
          merchant_id: string;
          user_id: string;
          role: 'owner' | 'admin' | 'editor' | 'viewer';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          merchant_id: string;
          user_id: string;
          role?: 'owner' | 'admin' | 'editor' | 'viewer';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          merchant_id?: string;
          user_id?: string;
          role?: 'owner' | 'admin' | 'editor' | 'viewer';
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'merchant_users_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          }
        ];
      };
      menu_categories: {
        Row: {
          id: string;
          merchant_id: string;
          slug: string;
          name_multilang: Json;
          description_multilang: Json | null;
          icon: string | null;
          image_url: string | null;
          display_order: number;
          is_active: boolean;
          available_from: string | null;
          available_until: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          merchant_id: string;
          slug: string;
          name_multilang: Json;
          description_multilang?: Json | null;
          icon?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          available_from?: string | null;
          available_until?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          merchant_id?: string;
          slug?: string;
          name_multilang?: Json;
          description_multilang?: Json | null;
          icon?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          available_from?: string | null;
          available_until?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_categories_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          }
        ];
      };
      menu_items: {
        Row: {
          id: string;
          merchant_id: string;
          category_id: string;
          slug: string;
          name_multilang: Json;
          description_multilang: Json | null;
          price: number;
          compare_at_price: number | null;
          image_url: string | null;
          gallery_urls: string[];
          allergens: Json;
          intolerances: Json;
          dietary_flags: Json;
          spice_level: number;
          calories: number | null;
          protein_g: number | null;
          carbs_g: number | null;
          fat_g: number | null;
          fiber_g: number | null;
          customizations: Json;
          is_featured: boolean;
          is_new: boolean;
          is_active: boolean;
          display_order: number;
          available_from: string | null;
          available_until: string | null;
          tags: string[];
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          merchant_id: string;
          category_id: string;
          slug: string;
          name_multilang: Json;
          description_multilang?: Json | null;
          price: number;
          compare_at_price?: number | null;
          image_url?: string | null;
          gallery_urls?: string[];
          allergens?: Json;
          intolerances?: Json;
          dietary_flags?: Json;
          spice_level?: number;
          calories?: number | null;
          protein_g?: number | null;
          carbs_g?: number | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          customizations?: Json;
          is_featured?: boolean;
          is_new?: boolean;
          is_active?: boolean;
          display_order?: number;
          available_from?: string | null;
          available_until?: string | null;
          tags?: string[];
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          merchant_id?: string;
          category_id?: string;
          slug?: string;
          name_multilang?: Json;
          description_multilang?: Json | null;
          price?: number;
          compare_at_price?: number | null;
          image_url?: string | null;
          gallery_urls?: string[];
          allergens?: Json;
          intolerances?: Json;
          dietary_flags?: Json;
          spice_level?: number;
          calories?: number | null;
          protein_g?: number | null;
          carbs_g?: number | null;
          fat_g?: number | null;
          fiber_g?: number | null;
          customizations?: Json;
          is_featured?: boolean;
          is_new?: boolean;
          is_active?: boolean;
          display_order?: number;
          available_from?: string | null;
          available_until?: string | null;
          tags?: string[];
          seo_title?: string | null;
          seo_description?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_items_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'menu_items_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'menu_categories';
            referencedColumns: ['id'];
          }
        ];
      };
      menu_item_ingredients: {
        Row: {
          id: string;
          menu_item_id: string;
          ingredient_id: string;
          quantity_grams: number;
          is_optional: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          menu_item_id: string;
          ingredient_id: string;
          quantity_grams?: number;
          is_optional?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          menu_item_id?: string;
          ingredient_id?: string;
          quantity_grams?: number;
          is_optional?: boolean;
          display_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_item_ingredients_menu_item_id_fkey';
            columns: ['menu_item_id'];
            isOneToOne: false;
            referencedRelation: 'menu_items';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'menu_item_ingredients_ingredient_id_fkey';
            columns: ['ingredient_id'];
            isOneToOne: false;
            referencedRelation: 'ingredients';
            referencedColumns: ['id'];
          }
        ];
      };
      ingredients: {
        Row: {
          id: string;
          merchant_id: string | null;
          slug: string;
          name_multilang: Json;
          allergens: Json;
          intolerances: Json;
          dietary_flags: Json;
          calories_per_100g: number | null;
          protein_per_100g: number | null;
          carbs_per_100g: number | null;
          fat_per_100g: number | null;
          fiber_per_100g: number | null;
          is_global: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          merchant_id?: string | null;
          slug: string;
          name_multilang: Json;
          allergens?: Json;
          intolerances?: Json;
          dietary_flags?: Json;
          calories_per_100g?: number | null;
          protein_per_100g?: number | null;
          carbs_per_100g?: number | null;
          fat_per_100g?: number | null;
          fiber_per_100g?: number | null;
          is_global?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          merchant_id?: string | null;
          slug?: string;
          name_multilang?: Json;
          allergens?: Json;
          intolerances?: Json;
          dietary_flags?: Json;
          calories_per_100g?: number | null;
          protein_per_100g?: number | null;
          carbs_per_100g?: number | null;
          fat_per_100g?: number | null;
          fiber_per_100g?: number | null;
          is_global?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ingredients_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          }
        ];
      };
      orders: {
        Row: {
          id: string;
          merchant_id: string;
          order_number: number;
          order_code: string;
          customer_name: string | null;
          customer_phone: string | null;
          customer_email: string | null;
          table_number: string | null;
          consumption_type: 'dine-in' | 'takeaway';
          service_type: 'table-service' | 'counter-pickup' | 'takeaway';
          status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
          submitted_at: string;
          confirmed_at: string | null;
          preparing_at: string | null;
          ready_at: string | null;
          delivered_at: string | null;
          cancelled_at: string | null;
          estimated_prep_time: number | null;
          subtotal: number;
          tax_amount: number;
          discount_amount: number;
          total: number;
          currency: string;
          payment_status: 'unpaid' | 'paid' | 'refunded';
          payment_method: string | null;
          payment_reference: string | null;
          customer_notes: string | null;
          kitchen_notes: string | null;
          cancellation_reason: string | null;
          session_id: string | null;
          device_fingerprint: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          merchant_id: string;
          order_number?: number;
          order_code?: string;
          customer_name?: string | null;
          customer_phone?: string | null;
          customer_email?: string | null;
          table_number?: string | null;
          consumption_type?: 'dine-in' | 'takeaway';
          service_type?: 'table-service' | 'counter-pickup' | 'takeaway';
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
          submitted_at?: string;
          confirmed_at?: string | null;
          preparing_at?: string | null;
          ready_at?: string | null;
          delivered_at?: string | null;
          cancelled_at?: string | null;
          estimated_prep_time?: number | null;
          subtotal?: number;
          tax_amount?: number;
          discount_amount?: number;
          total?: number;
          currency?: string;
          payment_status?: 'unpaid' | 'paid' | 'refunded';
          payment_method?: string | null;
          payment_reference?: string | null;
          customer_notes?: string | null;
          kitchen_notes?: string | null;
          cancellation_reason?: string | null;
          session_id?: string | null;
          device_fingerprint?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          merchant_id?: string;
          order_number?: number;
          order_code?: string;
          customer_name?: string | null;
          customer_phone?: string | null;
          customer_email?: string | null;
          table_number?: string | null;
          consumption_type?: 'dine-in' | 'takeaway';
          service_type?: 'table-service' | 'counter-pickup' | 'takeaway';
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
          confirmed_at?: string | null;
          preparing_at?: string | null;
          ready_at?: string | null;
          delivered_at?: string | null;
          cancelled_at?: string | null;
          estimated_prep_time?: number | null;
          subtotal?: number;
          tax_amount?: number;
          discount_amount?: number;
          total?: number;
          currency?: string;
          payment_status?: 'unpaid' | 'paid' | 'refunded';
          payment_method?: string | null;
          payment_reference?: string | null;
          customer_notes?: string | null;
          kitchen_notes?: string | null;
          cancellation_reason?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_merchant_id_fkey';
            columns: ['merchant_id'];
            isOneToOne: false;
            referencedRelation: 'merchants';
            referencedColumns: ['id'];
          }
        ];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          menu_item_id: string | null;
          item_name: Json;
          item_slug: string | null;
          item_image_url: string | null;
          unit_price: number;
          quantity: number;
          extras: Json;
          extras_total: number;
          special_instructions: string | null;
          line_total: number;
          item_status: 'pending' | 'preparing' | 'ready' | 'served';
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          menu_item_id?: string | null;
          item_name: Json;
          item_slug?: string | null;
          item_image_url?: string | null;
          unit_price: number;
          quantity?: number;
          extras?: Json;
          extras_total?: number;
          special_instructions?: string | null;
          line_total: number;
          item_status?: 'pending' | 'preparing' | 'ready' | 'served';
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          menu_item_id?: string | null;
          item_name?: Json;
          item_slug?: string | null;
          item_image_url?: string | null;
          unit_price?: number;
          quantity?: number;
          extras?: Json;
          extras_total?: number;
          special_instructions?: string | null;
          line_total?: number;
          item_status?: 'pending' | 'preparing' | 'ready' | 'served';
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_menu_item_id_fkey';
            columns: ['menu_item_id'];
            isOneToOne: false;
            referencedRelation: 'menu_items';
            referencedColumns: ['id'];
          }
        ];
      };
      order_status_history: {
        Row: {
          id: string;
          order_id: string;
          from_status: string | null;
          to_status: string;
          changed_by: string | null;
          changed_by_name: string | null;
          notes: string | null;
          changed_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          from_status?: string | null;
          to_status: string;
          changed_by?: string | null;
          changed_by_name?: string | null;
          notes?: string | null;
          changed_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          from_status?: string | null;
          to_status?: string;
          changed_by?: string | null;
          changed_by_name?: string | null;
          notes?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'order_status_history_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_status_history_changed_by_fkey';
            columns: ['changed_by'];
            isOneToOne: false;
            referencedRelation: 'merchant_users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      menu_items_full_view: {
        Row: {
          id: string;
          merchant_id: string;
          merchant_slug: string;
          category_id: string;
          category_slug: string;
          category_name: Json;
          slug: string;
          name_multilang: Json;
          description_multilang: Json | null;
          price: number;
          compare_at_price: number | null;
          image_url: string | null;
          gallery_urls: string[];
          allergens: Json;
          intolerances: Json;
          dietary_flags: Json;
          spice_level: number;
          calories: number | null;
          protein_g: number | null;
          carbs_g: number | null;
          fat_g: number | null;
          fiber_g: number | null;
          customizations: Json;
          is_featured: boolean;
          is_new: boolean;
          is_active: boolean;
          display_order: number;
          tags: string[];
        };
      };
    };
    Functions: {
      compute_menu_item_safety: {
        Args: {
          p_item_id: string;
        };
        Returns: void;
      };
    };
    Enums: {
      merchant_tier: 'free' | 'starter' | 'professional' | 'enterprise';
      user_role: 'owner' | 'admin' | 'editor' | 'viewer';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
