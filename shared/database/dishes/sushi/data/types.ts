// =====================================================
// GUDBRO Japanese Cuisine Database Types
// Created: 2025-12-17
// Architecture: English only, translations separate
// =====================================================

export type JapaneseCategory =
  | 'nigiri'           // Hand-pressed sushi with fish on rice
  | 'sashimi'          // Raw sliced fish without rice
  | 'maki'             // Rolled sushi (hosomaki, futomaki)
  | 'uramaki'          // Inside-out rolls
  | 'temaki'           // Hand rolls (cone-shaped)
  | 'gunkan'           // Battleship sushi
  | 'chirashi'         // Scattered sushi bowl
  | 'donburi'          // Rice bowl dishes
  | 'specialty_roll'   // American-style specialty rolls
  | 'inari'            // Tofu pocket sushi
  | 'oshizushi'        // Pressed sushi
  | 'temari';          // Ball-shaped sushi

export type JapaneseProtein =
  // Tuna varieties
  | 'maguro_akami'     // Lean tuna
  | 'maguro_chutoro'   // Medium fatty tuna
  | 'maguro_otoro'     // Fatty tuna belly
  | 'kuromaguro'       // Bluefin tuna
  | 'bincho'           // Albacore tuna
  // Salmon
  | 'sake'             // Salmon
  | 'sake_belly'       // Salmon belly
  // Yellowtail
  | 'hamachi'          // Farmed yellowtail
  | 'buri'             // Wild yellowtail
  | 'kanpachi'         // Amberjack
  // White fish
  | 'tai'              // Sea bream
  | 'hirame'           // Flounder
  | 'suzuki'           // Sea bass
  | 'madai'            // Red snapper
  // Other fish
  | 'saba'             // Mackerel
  | 'aji'              // Horse mackerel
  | 'iwashi'           // Sardine
  | 'katsuo'           // Bonito
  | 'unagi'            // Freshwater eel
  | 'anago'            // Sea eel
  // Shellfish
  | 'ebi'              // Shrimp
  | 'amaebi'           // Sweet shrimp
  | 'kurumaebi'        // Tiger prawn
  | 'hotate'           // Scallop
  | 'akagai'           // Ark shell
  | 'torigai'          // Cockle
  | 'mirugai'          // Geoduck
  | 'hokkigai'         // Surf clam
  | 'hamaguri'         // Clam
  // Cephalopods
  | 'ika'              // Squid
  | 'tako'             // Octopus
  // Roe
  | 'ikura'            // Salmon roe
  | 'tobiko'           // Flying fish roe
  | 'masago'           // Capelin roe
  | 'uni'              // Sea urchin
  | 'kazunoko'         // Herring roe
  // Crab
  | 'kani'             // Crab
  | 'taraba'           // King crab
  // Other
  | 'tamago'           // Egg omelette
  | 'tofu'             // Tofu
  | 'vegetable'        // Vegetable
  | 'mixed'            // Multiple proteins
  | 'none';            // No protein (vegetarian)

export type JapanesePreparation =
  | 'raw'              // Completely raw
  | 'seared'           // Tataki style - seared outside
  | 'cured'            // Vinegar cured (shime)
  | 'marinated'        // Zuke - soy marinated
  | 'grilled'          // Yaki - grilled
  | 'tempura'          // Battered and fried
  | 'torched'          // Aburi - flame torched
  | 'smoked'           // Kunsei
  | 'pressed'          // Oshi - pressed
  | 'cooked'           // Fully cooked
  | 'pickled';         // Tsukemono style

export type RollStyle =
  | 'hosomaki'         // Thin roll, 1 ingredient
  | 'chumaki'          // Medium roll
  | 'futomaki'         // Thick roll, multiple ingredients
  | 'uramaki'          // Inside-out roll
  | 'temaki'           // Hand roll cone
  | 'gunkan'           // Battleship style
  | 'not_applicable';  // For non-rolls

export type JapaneseOrigin =
  | 'traditional_edo'       // Traditional Tokyo style
  | 'traditional_osaka'     // Osaka style
  | 'traditional_kyoto'     // Kyoto style
  | 'traditional_other'     // Other traditional Japanese
  | 'american_fusion'       // American-Japanese fusion
  | 'modern_japanese'       // Modern Japanese innovation
  | 'international';        // International adaptation

export type JapaneseStatus =
  | 'classic'          // Classic/traditional
  | 'popular'          // Popular staple
  | 'premium'          // Premium/high-end
  | 'omakase'          // Chef's choice quality
  | 'signature'        // Signature creation
  | 'seasonal';        // Seasonal special

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type ServingTemp = 'cold' | 'room_temp' | 'warm';

// =====================================================
// MAIN INTERFACE
// =====================================================
export interface JapaneseDish {
  // Primary identification
  id: string;
  slug: string;
  name: string;                          // English name
  name_japanese?: string;                // Japanese name in romaji
  name_kanji?: string;                   // Japanese name in kanji/hiragana
  description: string;

  // Classification
  category: JapaneseCategory;
  protein_type: JapaneseProtein;
  preparation: JapanesePreparation;
  roll_style: RollStyle;
  origin: JapaneseOrigin;
  status: JapaneseStatus;

  // For sashimi/nigiri - cut details
  cut_style?: string;
  pieces_per_serving: number;

  // For rolls - components
  nori_position?: 'outside' | 'inside' | 'none';
  rice_type?: 'sushi_rice' | 'brown_rice' | 'none';

  // Ingredients
  main_ingredients: string[];
  filling_ingredients?: string[];
  topping_ingredients?: string[];
  sauce?: string[];
  garnish?: string[];
  ingredient_ids: string[];

  // Serving details
  serving_style: 'plate' | 'geta' | 'boat' | 'bowl';
  serving_temp: ServingTemp;
  wasabi_included: boolean;
  ginger_included: boolean;
  soy_sauce_type?: 'regular' | 'low_sodium' | 'tamari' | 'ponzu';

  // Dietary & Safety
  is_raw: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_cooked: boolean;
  contains_raw_fish: boolean;
  allergens: string[];

  // Nutrition
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  omega3_mg?: number;

  // Spice level
  spice_level: number;

  // Metadata
  tags: string[];
  popularity: number;
  difficulty?: Difficulty;

  // Pairing
  sake_pairing?: string[];
  beer_pairing?: string[];
  wine_pairing?: string[];

  // History
  history?: string;
  fun_fact?: string;
}

// =====================================================
// HELPER CONSTANTS
// =====================================================

// Common allergens in Japanese cuisine
export const JAPANESE_ALLERGENS = {
  FISH: 'fish',
  CRUSTACEANS: 'crustaceans',
  MOLLUSKS: 'mollusks',
  SOY: 'soy',
  SESAME: 'sesame',
  GLUTEN: 'gluten',
  EGGS: 'eggs',
  WHEAT: 'wheat',
} as const;

// Protein to allergen mapping
export const PROTEIN_ALLERGENS: Record<JapaneseProtein, string[]> = {
  // Fish
  maguro_akami: ['fish'],
  maguro_chutoro: ['fish'],
  maguro_otoro: ['fish'],
  kuromaguro: ['fish'],
  bincho: ['fish'],
  sake: ['fish'],
  sake_belly: ['fish'],
  hamachi: ['fish'],
  buri: ['fish'],
  kanpachi: ['fish'],
  tai: ['fish'],
  hirame: ['fish'],
  suzuki: ['fish'],
  madai: ['fish'],
  saba: ['fish'],
  aji: ['fish'],
  iwashi: ['fish'],
  katsuo: ['fish'],
  unagi: ['fish'],
  anago: ['fish'],
  // Shellfish
  ebi: ['crustaceans'],
  amaebi: ['crustaceans'],
  kurumaebi: ['crustaceans'],
  hotate: ['mollusks'],
  akagai: ['mollusks'],
  torigai: ['mollusks'],
  mirugai: ['mollusks'],
  hokkigai: ['mollusks'],
  hamaguri: ['mollusks'],
  // Cephalopods
  ika: ['mollusks'],
  tako: ['mollusks'],
  // Roe
  ikura: ['fish'],
  tobiko: ['fish'],
  masago: ['fish'],
  uni: ['fish'],
  kazunoko: ['fish'],
  // Crab
  kani: ['crustaceans'],
  taraba: ['crustaceans'],
  // Other
  tamago: ['eggs'],
  tofu: ['soy'],
  vegetable: [],
  mixed: ['fish'],
  none: [],
};

// Japanese names for proteins
export const PROTEIN_JAPANESE_NAMES: Record<JapaneseProtein, { romaji: string; kanji: string }> = {
  maguro_akami: { romaji: 'Maguro Akami', kanji: '鮪赤身' },
  maguro_chutoro: { romaji: 'Chutoro', kanji: '中とろ' },
  maguro_otoro: { romaji: 'Otoro', kanji: '大とろ' },
  kuromaguro: { romaji: 'Kuromaguro', kanji: '黒鮪' },
  bincho: { romaji: 'Bincho', kanji: 'びんちょう' },
  sake: { romaji: 'Sake', kanji: '鮭' },
  sake_belly: { romaji: 'Sake Harasu', kanji: '鮭ハラス' },
  hamachi: { romaji: 'Hamachi', kanji: 'はまち' },
  buri: { romaji: 'Buri', kanji: '鰤' },
  kanpachi: { romaji: 'Kanpachi', kanji: '間八' },
  tai: { romaji: 'Tai', kanji: '鯛' },
  hirame: { romaji: 'Hirame', kanji: '平目' },
  suzuki: { romaji: 'Suzuki', kanji: '鱸' },
  madai: { romaji: 'Madai', kanji: '真鯛' },
  saba: { romaji: 'Saba', kanji: '鯖' },
  aji: { romaji: 'Aji', kanji: '鰺' },
  iwashi: { romaji: 'Iwashi', kanji: '鰯' },
  katsuo: { romaji: 'Katsuo', kanji: '鰹' },
  unagi: { romaji: 'Unagi', kanji: '鰻' },
  anago: { romaji: 'Anago', kanji: '穴子' },
  ebi: { romaji: 'Ebi', kanji: '海老' },
  amaebi: { romaji: 'Amaebi', kanji: '甘海老' },
  kurumaebi: { romaji: 'Kurumaebi', kanji: '車海老' },
  hotate: { romaji: 'Hotate', kanji: '帆立' },
  akagai: { romaji: 'Akagai', kanji: '赤貝' },
  torigai: { romaji: 'Torigai', kanji: '鳥貝' },
  mirugai: { romaji: 'Mirugai', kanji: '海松貝' },
  hokkigai: { romaji: 'Hokkigai', kanji: '北寄貝' },
  hamaguri: { romaji: 'Hamaguri', kanji: '蛤' },
  ika: { romaji: 'Ika', kanji: '烏賊' },
  tako: { romaji: 'Tako', kanji: '蛸' },
  ikura: { romaji: 'Ikura', kanji: 'いくら' },
  tobiko: { romaji: 'Tobiko', kanji: 'とびこ' },
  masago: { romaji: 'Masago', kanji: 'まさご' },
  uni: { romaji: 'Uni', kanji: '雲丹' },
  kazunoko: { romaji: 'Kazunoko', kanji: '数の子' },
  kani: { romaji: 'Kani', kanji: '蟹' },
  taraba: { romaji: 'Taraba', kanji: 'タラバ' },
  tamago: { romaji: 'Tamago', kanji: '玉子' },
  tofu: { romaji: 'Tofu', kanji: '豆腐' },
  vegetable: { romaji: 'Yasai', kanji: '野菜' },
  mixed: { romaji: 'Mix', kanji: 'ミックス' },
  none: { romaji: '', kanji: '' },
};
