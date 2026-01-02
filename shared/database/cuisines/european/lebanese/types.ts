// ============================================
// LEBANESE Database Types - GUDBRO Database Standards v1.1
// ============================================
// TEXT + CHECK constraints (no ENUM)
// ============================================

export type LebaneseCategory =
  | 'mezze_dips'          // Hummus, Baba Ganoush, Labneh, Mutabal
  | 'salads'              // Tabbouleh, Fattoush, Salata Baladi
  | 'kibbeh'              // All kibbeh variations
  | 'grilled_meats'       // Shawarma, Shish Tawook, Kafta, Kebabs
  | 'stews_mains'         // Yakhneh, Molokhia, Fasolia
  | 'rice_grains'         // Mujadara, Riz bi Sha'rieh, Freekeh
  | 'stuffed_dishes'      // Warak Enab, Kousa Mahshi, Batinjane Mahshi
  | 'breads_pastries'     // Manakish, Fatayer, Sambousek, Sfiha
  | 'seafood'             // Sayadieh, Samke Harra, Grilled Fish
  | 'desserts';           // Knafeh, Baklava, Maamoul, Namoura

export type LebaneseStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'traditional'
  | 'premium'
  | 'street_food'
  | 'festive';

export type LebaneseRegion =
  | 'beirut'              // Capital, modern fusion
  | 'tripoli'             // Sweet capital, pastries
  | 'sidon'               // Coastal, seafood
  | 'zahle'               // Bekaa Valley, wine & mezze
  | 'byblos'              // Ancient coastal city
  | 'mount_lebanon'       // Mountain cuisine
  | 'bekaa_valley'        // Agricultural heartland
  | 'south_lebanon'       // Southern traditions
  | 'north_lebanon'       // Northern specialties
  | 'national';           // Pan-Lebanese

export type LebaneseProteinType =
  | 'lamb'
  | 'beef'
  | 'chicken'
  | 'fish'
  | 'seafood'
  | 'mixed'
  | 'vegetarian'
  | 'vegan'
  | 'none';

export type LebaneseCookingMethod =
  | 'grilled'
  | 'baked'
  | 'fried'
  | 'raw'
  | 'stewed'
  | 'stuffed'
  | 'roasted'
  | 'steamed';

export interface LebaneseItem {
  // IDENTIFICATION
  id: string;                     // LEBANESE_{NAME}
  slug: string;                   // lowercase-hyphens
  name: string;                   // English name
  description: string;            // English description
  arabic_name: string;            // Arabic name (romanized)
  arabic_script?: string;         // Arabic script (العربية)

  // CLASSIFICATION
  category: LebaneseCategory;
  status: LebaneseStatus;
  region: LebaneseRegion;

  // LEBANESE-SPECIFIC
  protein_type: LebaneseProteinType;
  cooking_method: LebaneseCookingMethod;
  is_mezze: boolean;              // Traditional appetizer/shared dish
  is_festive: boolean;            // Holiday/celebration dish
  is_street_food: boolean;        // Street food item
  is_lenten: boolean;             // Suitable for Lent (Christian fasting)

  // INGREDIENTS
  ingredient_ids: string[];

  // SISTEMA 5 DIMENSIONI - ALLERGENS & DIETARY
  allergens: string[];
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

// Stats helper
export interface LebaneseStats {
  total: number;
  byCategory: Record<LebaneseCategory, number>;
  byRegion: Record<LebaneseRegion, number>;
}
