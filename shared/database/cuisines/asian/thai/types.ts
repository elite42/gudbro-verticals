// ============================================
// THAI Types - GUDBRO Database Standards v1.1
// ============================================

/**
 * Thai dish categories
 * Based on traditional Thai cuisine structure
 */
export type ThaiCategory =
  | 'curries'          // Kaeng - Thai curries (green, red, massaman, etc.)
  | 'stir_fries'       // Pad - Stir-fried dishes
  | 'soups'            // Tom - Soups and broths
  | 'salads'           // Yam - Thai salads (spicy, sour)
  | 'noodles'          // Guay Teow - Noodle dishes
  | 'rice_dishes'      // Khao - Rice-based dishes
  | 'appetizers'       // Starters and small plates
  | 'grilled'          // Yang - Grilled dishes
  | 'seafood'          // Talay - Seafood specialties
  | 'desserts';        // Khanom - Thai sweets

/**
 * Standard status values (DATABASE-STANDARDS v1.1)
 */
export type ThaiStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal'
  | 'premium'
  | 'street_food';

/**
 * Thai regional styles
 */
export type ThaiRegion =
  | 'central'          // Bangkok - balanced, aromatic
  | 'northern'         // Chiang Mai - milder, burmese influence
  | 'northeastern'     // Isan - spicy, sour, fermented
  | 'southern'         // Phuket - spicy, indian/malay influence
  | 'royal'            // Royal Thai cuisine
  | 'street'           // Street food style
  | 'international';   // Thai-fusion, international adaptations

/**
 * Protein types commonly used in Thai cuisine
 */
export type ThaiProtein =
  | 'chicken'          // Gai
  | 'pork'             // Moo
  | 'beef'             // Neua
  | 'duck'             // Ped
  | 'shrimp'           // Goong
  | 'fish'             // Pla
  | 'squid'            // Pla Meuk
  | 'crab'             // Poo
  | 'mixed_seafood'    // Talay
  | 'tofu'             // Tao Hu
  | 'vegetables'       // Pak
  | 'egg'              // Kai
  | 'mixed';           // Multiple proteins

/**
 * Cooking methods in Thai cuisine
 */
export type ThaiCookingMethod =
  | 'stir_fried'       // Pad - quick high heat
  | 'boiled'           // Tom - soups
  | 'grilled'          // Yang - charcoal grilled
  | 'deep_fried'       // Tod - fried
  | 'steamed'          // Neung
  | 'raw'              // Yam - salads
  | 'simmered'         // Curry style
  | 'roasted';         // Ob

/**
 * Thai curry types
 */
export type ThaiCurryType =
  | 'green'            // Kaeng Khiao Wan - spiciest
  | 'red'              // Kaeng Phet
  | 'yellow'           // Kaeng Kari - mildest
  | 'massaman'         // Kaeng Massaman - indian influence
  | 'panang'           // Kaeng Panang - thick, rich
  | 'jungle'           // Kaeng Pa - no coconut
  | 'none';            // Not a curry dish

/**
 * Thai dish interface
 * Follows DATABASE-STANDARDS v1.1
 */
export interface ThaiItem {
  // IDENTIFICATION
  id: string;                     // THAI_{NAME} format
  slug: string;                   // lowercase-hyphens

  // INFO BASE (English only - translations in separate table)
  name: string;                   // English, Title Case
  description: string;            // English description
  thai_name?: string;             // Original Thai name (romanized)
  thai_script?: string;           // Thai script

  // CLASSIFICATION
  category: ThaiCategory;
  status: ThaiStatus;

  // THAI-SPECIFIC
  region: ThaiRegion;
  protein_type: ThaiProtein;
  cooking_method: ThaiCookingMethod;
  curry_type: ThaiCurryType;
  is_street_food: boolean;
  has_coconut_milk: boolean;      // Important for allergies

  // INGREDIENTS
  ingredient_ids: string[];       // ING_* references

  // SISTEMA 5 DIMENSIONI - ALLERGENS
  allergens: string[];

  // SISTEMA 5 DIMENSIONI - DIETARY FLAGS
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;
  is_pescatarian: boolean;

  // SISTEMA 5 DIMENSIONI - NUTRITION
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;

  // SISTEMA 5 DIMENSIONI - SPICE (0-5)
  spice_level: number;

  // METADATA
  tags: string[];
  popularity: number;             // 0-100

  // TIMESTAMPS (auto-managed)
  created_at?: string;
  updated_at?: string;
}
