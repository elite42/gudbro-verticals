// ============================================
// GREEK Database Types - GUDBRO Database Standards v1.1
// ============================================
// TEXT + CHECK constraints (no ENUM)
// ============================================

export type GreekCategory =
  | 'grilled_meats'      // Souvlaki, Gyros, Kebabs
  | 'baked_casseroles'   // Moussaka, Pastitsio, Giouvetsi
  | 'stews_braises'      // Stifado, Kleftiko, Kokkinisto
  | 'seafood'            // Grilled octopus, Calamari, Shrimp Saganaki
  | 'meze_appetizers'    // Tzatziki, Dolmades, Saganaki
  | 'pies_pastries'      // Spanakopita, Tiropita, Bougatsa
  | 'salads'             // Horiatiki, Dakos
  | 'soups'              // Avgolemono, Fasolada, Psarosoupa
  | 'desserts';          // Baklava, Galaktoboureko, Loukoumades

export type GreekStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'traditional'
  | 'premium'
  | 'street_food'
  | 'festive';

export type GreekRegion =
  | 'athens'
  | 'thessaloniki'
  | 'crete'
  | 'peloponnese'
  | 'cyclades'
  | 'ionian_islands'
  | 'dodecanese'
  | 'macedonia'
  | 'epirus'
  | 'aegean_islands'
  | 'national';

export type GreekProteinType =
  | 'lamb'
  | 'pork'
  | 'beef'
  | 'chicken'
  | 'seafood'
  | 'mixed'
  | 'vegetarian'
  | 'none';

export type GreekCookingMethod =
  | 'grilled'
  | 'baked'
  | 'fried'
  | 'braised'
  | 'stewed'
  | 'raw'
  | 'roasted'
  | 'steamed';

export interface GreekItem {
  // IDENTIFICATION
  id: string;                     // GREEK_{NAME}
  slug: string;                   // lowercase-hyphens
  name: string;                   // English name
  description: string;            // English description
  greek_name: string;             // Greek name (romanized)
  greek_script?: string;          // Greek script (Ελληνικά)

  // CLASSIFICATION
  category: GreekCategory;
  status: GreekStatus;
  region: GreekRegion;

  // GREEK-SPECIFIC
  protein_type: GreekProteinType;
  cooking_method: GreekCookingMethod;
  is_meze: boolean;               // Traditional appetizer/shared dish
  is_festive: boolean;            // Holiday/celebration dish
  is_street_food: boolean;        // Street food item
  has_phyllo: boolean;            // Contains phyllo pastry

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
export interface GreekStats {
  total: number;
  byCategory: Record<GreekCategory, number>;
  byRegion: Record<GreekRegion, number>;
}
