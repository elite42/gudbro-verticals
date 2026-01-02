// ============================================
// JAPANESE DATABASE - Types (Non-Sushi)
// ============================================
// GUDBRO Database Standards v1.1
// Covers: ramen, udon, soba, donburi, tempura,
// yakitori, izakaya, hot pots, street food
// ============================================

export type JapaneseCategory =
  | 'ramen'           // Ramen varieties
  | 'udon_soba'       // Udon and soba noodles
  | 'donburi'         // Rice bowl dishes
  | 'tempura'         // Deep-fried dishes
  | 'yakitori'        // Grilled skewers
  | 'tonkatsu'        // Breaded cutlets
  | 'izakaya'         // Pub food / small plates
  | 'nabemono'        // Hot pot dishes
  | 'yoshoku'         // Western-influenced Japanese
  | 'comfort_food';   // Home-style dishes

export type JapaneseRegion =
  | 'tokyo'
  | 'osaka'
  | 'kyoto'
  | 'hokkaido'
  | 'kyushu'
  | 'hiroshima'
  | 'nagoya'
  | 'okinawa'
  | 'sendai'
  | 'national';

export type JapaneseProteinType =
  | 'pork'
  | 'chicken'
  | 'beef'
  | 'seafood'
  | 'tofu'
  | 'egg'
  | 'mixed'
  | 'vegetarian'
  | 'vegan'
  | 'none';

export type JapaneseCookingMethod =
  | 'boiled'
  | 'grilled'
  | 'deep_fried'
  | 'pan_fried'
  | 'simmered'
  | 'steamed'
  | 'raw'
  | 'hot_pot';

export type JapaneseStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'traditional'
  | 'premium'
  | 'seasonal'
  | 'regional';

export interface JapaneseItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  japanese_name?: string;      // Romanized Japanese
  japanese_script?: string;    // Kanji/Hiragana/Katakana

  // Classification
  category: JapaneseCategory;
  status: JapaneseStatus;
  region?: JapaneseRegion;

  // Japanese-specific
  protein_type?: JapaneseProteinType;
  cooking_method?: JapaneseCookingMethod;
  is_izakaya_style?: boolean;   // Common in izakaya
  is_street_food?: boolean;     // Yatai/festival food
  is_comfort_food?: boolean;    // Home-style
  served_hot?: boolean;
  broth_based?: boolean;        // For noodle soups

  // Ingredients
  ingredient_ids: string[];

  // Sistema 5 Dimensioni - Allergens & Dietary
  allergens: string[];
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;
  is_pescatarian: boolean;

  // Sistema 5 Dimensioni - Nutrition
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;

  // Sistema 5 Dimensioni - Spice (0-5)
  spice_level: number;

  // Metadata
  tags: string[];
  popularity: number;
}
