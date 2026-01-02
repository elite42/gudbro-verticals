/**
 * GUDBRO Burgers Database - Type Definitions
 *
 * Sistema 5 Dimensioni v3.0 integrated
 */

export type BurgerStyle =
  | 'american_classic'
  | 'american_regional'
  | 'gourmet'
  | 'international'
  | 'plant_based'
  | 'chicken'
  | 'fish'
  | 'signature';

export type BurgerStatus =
  | 'classic'
  | 'traditional'
  | 'modern'
  | 'signature'
  | 'seasonal'
  | 'active';

export type BunType =
  | 'brioche'
  | 'sesame'
  | 'potato'
  | 'pretzel'
  | 'ciabatta'
  | 'english_muffin'
  | 'lettuce_wrap'
  | 'gluten_free'
  | 'sourdough'
  | 'kaiser'
  | 'onion_roll'
  | 'whole_wheat'
  | 'other';

export type PattyType =
  | 'beef'
  | 'wagyu'
  | 'angus'
  | 'blend'
  | 'chicken'
  | 'turkey'
  | 'lamb'
  | 'pork'
  | 'fish'
  | 'shrimp'
  | 'plant_based'
  | 'black_bean'
  | 'portobello'
  | 'other';

export type CookLevel =
  | 'rare'
  | 'medium_rare'
  | 'medium'
  | 'medium_well'
  | 'well_done';

export interface MultiLangText {
  en: string;
  it: string;
  vi: string;
}

export interface BunInfo {
  type: BunType;
  is_toasted: boolean;
}

export interface PattyInfo {
  type: PattyType;
  weight_g: number;
  count: number;
  recommended_cook: CookLevel;
}

export interface Origin {
  country: string;
  country_code: string;
  region?: string;
  city?: string;
}

export interface Serving {
  portion_size: 'small' | 'regular' | 'large' | 'double';
  is_shareable: boolean;
  recommended_pairing: string[];
}

export interface Dietary {
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_halal: boolean;
  is_kosher: boolean;
  is_low_carb: boolean;
  is_keto_friendly: boolean;
  is_high_protein: boolean;
  allergens: string[];
  calories_estimate: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
}

export interface Burger {
  id: string;
  slug: string;
  name: MultiLangText;
  description: MultiLangText;
  tagline?: MultiLangText;
  style: BurgerStyle;
  status: BurgerStatus;
  bun: BunInfo;
  patty: PattyInfo;
  cheeses: string[];
  toppings: string[];
  sauces: string[];
  is_spicy: boolean;
  spice_level: number; // 0-5
  origin: Origin;
  history?: {
    story?: MultiLangText;
    year_created?: number;
    creator?: string;
  };
  serving: Serving;
  dietary: Dietary;
  customization?: {
    bun_options?: string[];
    patty_options?: string[];
    add_cheese?: string[];
    add_toppings?: string[];
    sauce_options?: string[];
    make_vegetarian?: boolean;
    make_gluten_free?: boolean;
  };
  variations?: Array<{
    name: string;
    description: MultiLangText;
    changes: string[];
  }>;
  tags: string[];
  popularity: number;
  related_burgers?: string[];
  media?: {
    thumbnail?: string;
    gallery?: string[];
  };
  pricing?: {
    cost_level: 'low' | 'medium' | 'high' | 'premium';
    suggested_price_usd?: number;
  };
}
