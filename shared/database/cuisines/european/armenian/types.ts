// ============================================
// ARMENIAN DATABASE - TypeScript Types
// ============================================
// GUDBRO Database Standards v1.1
// TEXT + CHECK constraints (no ENUM)
// ============================================

export type ArmenianCategory =
  | 'grilled_meats'      // Khorovats (BBQ), kebabs
  | 'dolma_sarma'        // Stuffed grape/cabbage leaves
  | 'soups'              // Khash, spas, bozbash
  | 'dumplings'          // Manti, khinkali
  | 'stews_mains'        // Harissa, ghapama, khashlama
  | 'appetizers_mezze'   // Basturma, lahmajun, cheese
  | 'salads_sides'       // Fresh salads, pickles
  | 'breads'             // Lavash, matnakash, zhingyalov hats
  | 'rice_grains'        // Pilaf, bulgur dishes
  | 'desserts';          // Gata, nazook, pakhlava, sujukh

export type ArmenianStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'traditional'
  | 'premium'
  | 'festive'
  | 'street_food';

export type ArmenianRegion =
  | 'yerevan'            // Capital city
  | 'ararat'             // Ararat Valley
  | 'shirak'             // Gyumri area
  | 'gegharkunik'        // Lake Sevan
  | 'syunik'             // Southern Armenia (Goris)
  | 'tavush'             // Northeastern
  | 'lori'               // Northern
  | 'vayots_dzor'        // Wine region
  | 'kotayk'             // Central
  | 'armavir'            // Western
  | 'western_armenian'   // Diaspora (Turkey, Lebanon)
  | 'national';          // Pan-Armenian

export type ArmenianProteinType =
  | 'lamb'
  | 'beef'
  | 'pork'
  | 'chicken'
  | 'fish'
  | 'trout'              // Lake Sevan specialty
  | 'mixed'
  | 'vegetarian'
  | 'vegan'
  | 'none';

export type ArmenianCookingMethod =
  | 'grilled'            // Khorovats style
  | 'baked'              // Tonir oven
  | 'fried'
  | 'boiled'
  | 'stewed'
  | 'stuffed'
  | 'raw'
  | 'fermented'
  | 'cured';             // Basturma, sujukh

export interface ArmenianItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  armenian_name: string;        // Romanized Armenian
  armenian_script?: string;     // Armenian script (optional)

  // Classification
  category: ArmenianCategory;
  status: ArmenianStatus;
  region?: ArmenianRegion;

  // Armenian-specific
  protein_type?: ArmenianProteinType;
  cooking_method?: ArmenianCookingMethod;
  is_festive: boolean;          // Holiday/celebration dish
  is_lenten: boolean;           // Suitable for Armenian Apostolic fasting
  is_street_food: boolean;
  uses_tonir: boolean;          // Cooked in traditional tonir oven

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
  popularity: number;           // 0-100
}

// ============================================
// Category counts target: ~70-75 dishes
// - Grilled Meats: 10 (khorovats variations)
// - Dolma/Sarma: 8 (stuffed dishes)
// - Soups: 8 (khash, spas, bozbash)
// - Dumplings: 6 (manti, khinkali)
// - Stews/Mains: 10 (harissa, ghapama)
// - Appetizers: 8 (basturma, lahmajun)
// - Salads/Sides: 6
// - Breads: 6 (lavash, matnakash)
// - Rice/Grains: 6
// - Desserts: 10 (gata, nazook, pakhlava)
// ============================================
