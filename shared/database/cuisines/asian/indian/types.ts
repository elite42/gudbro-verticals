// ============================================
// INDIAN Types - GUDBRO Database Standards v1.1
// ============================================

/**
 * Indian dish categories
 * Based on traditional Indian cuisine structure
 */
export type IndianCategory =
  | 'curries'          // Main curry dishes (chicken, lamb, vegetable)
  | 'biryani_rice'     // Biryani and rice dishes
  | 'tandoori'         // Tandoor oven dishes
  | 'breads'           // Naan, roti, paratha, etc.
  | 'appetizers'       // Samosa, pakora, chaat
  | 'dals'             // Lentil dishes
  | 'vegetarian'       // Paneer dishes, vegetable mains
  | 'street_food';     // Chaat, pav bhaji, vada pav

/**
 * Standard status values (DATABASE-STANDARDS v1.1)
 */
export type IndianStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal'
  | 'premium'
  | 'traditional';

/**
 * Indian regional styles
 */
export type IndianRegion =
  | 'north'            // Punjab, Delhi - rich, creamy curries, tandoori
  | 'south'            // Tamil Nadu, Kerala - rice-based, coconut, spicy
  | 'east'             // Bengal, Odisha - fish, sweets, mustard oil
  | 'west'             // Gujarat, Maharashtra - vegetarian, coastal
  | 'central'          // Madhya Pradesh - wheat-based
  | 'mughlai'          // Mughal-influenced - biryanis, kebabs
  | 'coastal'          // Goa, Kerala - seafood, coconut
  | 'punjabi'          // Punjab - butter chicken, dal makhani
  | 'hyderabadi'       // Hyderabad - biryanis
  | 'kashmiri'         // Kashmir - wazwan, rogan josh
  | 'indo_chinese'     // Indian-Chinese fusion
  | 'international';   // International adaptations

/**
 * Protein types commonly used in Indian cuisine
 */
export type IndianProtein =
  | 'chicken'          // Murgh
  | 'lamb'             // Gosht (often goat)
  | 'goat'             // Bakra
  | 'fish'             // Machli
  | 'shrimp'           // Jhinga
  | 'paneer'           // Indian cottage cheese
  | 'lentils'          // Dal
  | 'chickpeas'        // Chana
  | 'vegetables'       // Sabzi
  | 'egg'              // Anda
  | 'mixed';           // Multiple proteins

/**
 * Cooking methods in Indian cuisine
 */
export type IndianCookingMethod =
  | 'tandoor'          // Clay oven
  | 'dum'              // Slow-cooked sealed pot
  | 'bhuna'            // Stir-fried
  | 'tawa'             // Flat griddle
  | 'kadhai'           // Wok-style
  | 'deep_fried'       // Pakora, samosa
  | 'steamed'          // Idli, dhokla
  | 'simmered'         // Curry style
  | 'grilled';         // Modern adaptation

/**
 * Indian dish interface
 * Follows DATABASE-STANDARDS v1.1
 */
export interface IndianItem {
  // IDENTIFICATION
  id: string;                     // IND_{NAME} format
  slug: string;                   // lowercase-hyphens

  // INFO BASE (English only - translations in separate table)
  name: string;                   // English, Title Case
  description: string;            // English description
  hindi_name?: string;            // Original Hindi/regional name

  // CLASSIFICATION
  category: IndianCategory;
  status: IndianStatus;

  // INDIAN-SPECIFIC
  region: IndianRegion;
  protein_type: IndianProtein;
  cooking_method: IndianCookingMethod;
  is_street_food: boolean;        // Chaat, pav bhaji style
  curry_base?: string;            // tomato, cream, yogurt, coconut

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
  is_kosher: boolean;

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
