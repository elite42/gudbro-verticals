// ============================================
// GEORGIAN DATABASE - TypeScript Types
// ============================================
// GUDBRO Database Standards v1.1
// TEXT + CHECK constraints (no ENUM)
// ============================================

export type GeorgianCategory =
  | 'khachapuri'        // Cheese breads (various regional styles)
  | 'khinkali'          // Dumplings
  | 'grilled_meats'     // Mtsvadi, shashlik
  | 'stews_mains'       // Chakhokhbili, chakapuli, etc.
  | 'soups'             // Kharcho, chikhirtma
  | 'appetizers'        // Pkhali, badrijani, etc.
  | 'breads_pastries'   // Mchadi, lobiani, shotis puri
  | 'sauces'            // Tkemali, satsivi, adjika
  | 'salads_sides'      // Vegetable dishes
  | 'desserts';         // Churchkhela, pelamushi, etc.

export type GeorgianRegion =
  | 'kakheti'           // Wine region, Eastern Georgia
  | 'imereti'           // Central-Western Georgia
  | 'adjara'            // Coastal region, Turkish influences
  | 'samegrelo'         // Mingrelia, known for spicy food
  | 'svaneti'           // Mountain region
  | 'racha'             // Known for lobiani
  | 'guria'             // Western coastal
  | 'kartli'            // Central, includes Tbilisi area
  | 'meskheti'          // Southern mountains
  | 'tusheti'           // Remote mountain region
  | 'pshavi_khevsureti' // Mountain regions
  | 'national';         // Found throughout Georgia

export type GeorgianProteinType =
  | 'beef'
  | 'pork'
  | 'lamb'
  | 'chicken'
  | 'turkey'
  | 'fish'
  | 'mixed'
  | 'vegetarian'
  | 'vegan'
  | 'none';

export type GeorgianCookingMethod =
  | 'grilled'           // Mtsvadi style
  | 'baked'             // Tone oven
  | 'boiled'            // Khinkali
  | 'stewed'            // Chakhokhbili
  | 'fried'             // Ojakhuri
  | 'stuffed'           // Badrijani
  | 'raw'               // Pkhali base
  | 'fermented'         // Pickles
  | 'cold';             // Satsivi

export interface GeorgianItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  georgian_name?: string;      // Romanized Georgian name
  georgian_script?: string;    // Georgian script (ქართული)

  // Classification
  category: GeorgianCategory;
  status: 'active' | 'classic' | 'popular' | 'signature' | 'traditional' | 'premium' | 'festive' | 'street_food';
  region?: GeorgianRegion;

  // Georgian-specific
  protein_type?: GeorgianProteinType;
  cooking_method?: GeorgianCookingMethod;
  is_supra_dish: boolean;      // Traditional feast dish
  is_festive: boolean;         // Holiday/celebration dish
  is_street_food: boolean;
  served_cold: boolean;        // Like satsivi

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

// ============================================
// Categories breakdown:
// - khachapuri: ~8 regional varieties
// - khinkali: ~6 varieties
// - grilled_meats: ~8 dishes
// - stews_mains: ~10 dishes
// - soups: ~6 dishes
// - appetizers: ~10 dishes
// - breads_pastries: ~6 dishes
// - sauces: ~6 sauces
// - salads_sides: ~6 dishes
// - desserts: ~8 dishes
// Total: ~74 dishes
// ============================================
