// ============================================
// Peruvian Database Types
// GUDBRO Database Standards v1.2
// ============================================

export interface PeruvianItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  spanish_name?: string;
  quechua_name?: string;

  // Classification
  category: PeruvianCategory;
  status: PeruvianStatus;
  region: PeruvianRegion;

  // Cooking details
  protein_type?: PeruvianProteinType;
  cooking_method?: PeruvianCookingMethod;

  // Peruvian-specific flags
  is_street_food: boolean;
  is_festive: boolean;
  is_fusion: boolean;
  served_cold: boolean;

  // Ingredients
  ingredient_ids: string[];

  // Dietary & Allergens
  allergens: string[];
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;

  // Nutrition
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;

  // Spice & Popularity
  spice_level: number; // 0-5
  popularity: number; // 0-100

  // Tags
  tags: string[];
}

export type PeruvianCategory =
  | 'ceviches'           // Raw fish dishes - Peru's national dish
  | 'tiraditos'          // Sashimi-style raw fish
  | 'causas'             // Potato-based cold dishes
  | 'anticuchos'         // Grilled skewers
  | 'main_dishes'        // Lomo saltado, Aji de gallina, etc.
  | 'rice_dishes'        // Arroz con pollo, Arroz chaufa
  | 'soups'              // Caldo de gallina, Parihuela
  | 'seafood'            // Hot seafood dishes
  | 'criollo'            // Creole dishes
  | 'andean'             // Highland dishes
  | 'amazonian'          // Jungle cuisine
  | 'nikkei'             // Japanese-Peruvian fusion
  | 'chifa'              // Chinese-Peruvian fusion
  | 'street_food'        // Anticuchos, Papa rellena, etc.
  | 'desserts'           // Picarones, Suspiro limeño
  | 'drinks';            // Pisco sour, Chicha morada

export type PeruvianStatus =
  | 'active'
  | 'signature'
  | 'popular'
  | 'traditional'
  | 'regional'
  | 'fusion';

export type PeruvianRegion =
  | 'lima'               // Capital - Criollo cuisine
  | 'costa'              // Coastal - Seafood
  | 'sierra'             // Highlands - Andean
  | 'selva'              // Amazon jungle
  | 'arequipa'           // Southern highlands
  | 'cusco'              // Inca heartland
  | 'piura'              // Northern coast
  | 'lambayeque'         // Northern coast
  | 'national';          // Found throughout Peru

export type PeruvianProteinType =
  | 'fish'
  | 'seafood_mixed'
  | 'shrimp'
  | 'octopus'
  | 'beef'
  | 'chicken'
  | 'pork'
  | 'guinea_pig'         // Cuy - traditional Andean
  | 'alpaca'
  | 'duck'
  | 'lamb'
  | 'vegetarian'
  | 'vegan';

export type PeruvianCookingMethod =
  | 'raw'                // Ceviche style
  | 'grilled'
  | 'stir_fried'
  | 'braised'
  | 'fried'
  | 'steamed'
  | 'baked'
  | 'roasted';

// Peruvian ingredient IDs
export const PERUVIAN_INGREDIENTS = {
  // Chiles & Peppers
  AJI_AMARILLO: 'ING_AJI_AMARILLO',
  AJI_PANCA: 'ING_AJI_PANCA',
  AJI_LIMO: 'ING_AJI_LIMO',
  AJI_ROCOTO: 'ING_AJI_ROCOTO',
  AJI_MIRASOL: 'ING_AJI_MIRASOL',
  AJI_CHARAPITA: 'ING_AJI_CHARAPITA',

  // Key Peruvian Ingredients
  LECHE_TIGRE: 'ING_LECHE_TIGRE',
  HUACATAY: 'ING_HUACATAY',
  CULANTRO: 'ING_CULANTRO',
  CHICHA_JORA: 'ING_CHICHA_JORA',
  CHICHA_MORADA: 'ING_CHICHA_MORADA',
  PISCO: 'ING_PISCO',

  // Potatoes
  PAPA_AMARILLA: 'ING_PAPA_AMARILLA',
  PAPA_HUAYRO: 'ING_PAPA_HUAYRO',
  PAPA_NEGRA: 'ING_PAPA_NEGRA',
  PAPA_HUAMANTANGA: 'ING_PAPA_HUAMANTANGA',

  // Corn varieties
  CHOCLO: 'ING_CHOCLO',
  CANCHA: 'ING_CANCHA',
  MOTE: 'ING_MOTE',
  MAIZ_MORADO: 'ING_MAIZ_MORADO',

  // Other Peruvian items
  CAMOTE: 'ING_CAMOTE',
  YUCA: 'ING_YUCA',
  LUCUMA: 'ING_LUCUMA',
  CHIRIMOYA: 'ING_CHIRIMOYA',
  MARACUYA: 'ING_MARACUYA',
  CAMU_CAMU: 'ING_CAMU_CAMU',
  AGUAYMANTO: 'ING_AGUAYMANTO',
  QUINOA: 'ING_QUINOA',
  KIWICHA: 'ING_KIWICHA',
  TARWI: 'ING_TARWI',

  // Seafood
  CORVINA: 'ING_CORVINA',
  LENGUADO: 'ING_LENGUADO',
  CONCHAS_NEGRAS: 'ING_CONCHAS_NEGRAS',
  PULPO: 'ING_PULPO',
  CALAMARES: 'ING_CALAMARES',
  CAMARONES: 'ING_CAMARONES',
  CHOROS: 'ING_CHOROS',

  // Proteins
  CUY: 'ING_CUY',
  ALPACA: 'ING_ALPACA',
  CHARQUI: 'ING_CHARQUI',
} as const;
