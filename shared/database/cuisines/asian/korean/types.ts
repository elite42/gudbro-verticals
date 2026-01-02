// ============================================
// KOREAN Database Types - GUDBRO Database Standards v1.1
// ============================================

export type KoreanCategory =
  | 'rice_dishes'      // Bibimbap, Bokkeumbap
  | 'bbq'              // Korean BBQ (Samgyeopsal, Bulgogi, Galbi)
  | 'stews_soups'      // Jjigae, Guk, Tang
  | 'noodles'          // Japchae, Naengmyeon, Kalguksu
  | 'pancakes'         // Jeon, Pajeon, Bindaetteok
  | 'fried_chicken'    // Chikin variations
  | 'street_food'      // Tteokbokki, Hotteok, Odeng
  | 'side_dishes'      // Banchan
  | 'fermented'        // Kimchi varieties
  | 'desserts';        // Bingsu, Tteok

export type KoreanStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'street_food'
  | 'traditional'
  | 'premium'
  | 'fusion';

export type KoreanRegion =
  | 'seoul'
  | 'busan'
  | 'jeju'
  | 'jeonju'
  | 'gyeongsang'
  | 'jeolla'
  | 'gangwon'
  | 'national'
  | 'royal_cuisine';

export type KoreanProteinType =
  | 'beef'
  | 'pork'
  | 'chicken'
  | 'seafood'
  | 'tofu'
  | 'mixed'
  | 'none';

export type KoreanCookingMethod =
  | 'grilled'
  | 'braised'
  | 'stir_fried'
  | 'deep_fried'
  | 'steamed'
  | 'boiled'
  | 'raw'
  | 'fermented'
  | 'pan_fried';

export interface KoreanItem {
  // IDENTIFICATION
  id: string;                     // KOREAN_{NAME}
  slug: string;                   // lowercase-hyphens
  name: string;                   // English name
  description: string;            // English description
  korean_name: string;            // Romanized (Bibimbap)
  korean_script?: string;         // Hangul (비빔밥)

  // CLASSIFICATION
  category: KoreanCategory;
  status: KoreanStatus;
  region: KoreanRegion;

  // KOREAN-SPECIFIC
  protein_type: KoreanProteinType;
  cooking_method: KoreanCookingMethod;
  is_street_food: boolean;
  is_fermented: boolean;          // Contains fermented ingredients
  is_spicy: boolean;              // Gochugaru/Gochujang based
  has_banchan: boolean;           // Served with side dishes

  // INGREDIENTS
  ingredient_ids: string[];

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
}
