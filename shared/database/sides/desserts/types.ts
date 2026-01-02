/**
 * GUDBRO Desserts Database - Type Definitions
 *
 * Sistema 5 Dimensioni v3.0 integrated
 */

export type DessertStyle =
  | 'italian'
  | 'french'
  | 'american'
  | 'asian'
  | 'middle_eastern'
  | 'spanish'
  | 'german'
  | 'british'
  | 'international'
  | 'fusion';

export type DessertStatus =
  | 'classic'
  | 'traditional'
  | 'modern'
  | 'signature'
  | 'seasonal'
  | 'active';

export type DessertCategory =
  | 'cake'
  | 'pie'
  | 'tart'
  | 'pastry'
  | 'cookie'
  | 'gelato'
  | 'sorbet'
  | 'mousse'
  | 'pudding'
  | 'custard'
  | 'chocolate'
  | 'fruit'
  | 'frozen'
  | 'fried'
  | 'crepe'
  | 'other';

export type ServingTemperature =
  | 'hot'
  | 'warm'
  | 'room_temp'
  | 'cold'
  | 'frozen';

export interface MultiLangText {
  en: string;
  it: string;
  vi: string;
}

export interface Origin {
  country: string;
  country_code: string;
  region?: string;
  city?: string;
}

export interface Serving {
  portion_size: 'small' | 'medium' | 'large' | 'sharing';
  pieces_per_serving?: number;
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
  sugar_g?: number;
}

export interface Dessert {
  id: string;
  slug: string;
  name: MultiLangText;
  description: MultiLangText;
  tagline?: MultiLangText;
  style: DessertStyle;
  status: DessertStatus;
  category: DessertCategory;
  serving_temp: ServingTemperature;
  ingredient_ids: string[]  // References to ingredients table;
  topping?: string;
  is_chocolate: boolean;
  is_fruit_based: boolean;
  is_creamy: boolean;
  sweetness_level: number; // 1-5
  origin: Origin;
  history?: {
    story?: MultiLangText;
    year_created?: number;
    creator?: string;
  };
  serving: Serving;
  dietary: Dietary;
  preparation?: {
    prep_time_min?: number;
    cook_time_min?: number;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  variations?: Array<{
    name: string;
    description: MultiLangText;
    changes: string[];
  }>;
  tags: string[];
  popularity: number;
  related_desserts?: string[];
  media?: {
    thumbnail?: string;
    gallery?: string[];
  };
  pricing?: {
    cost_level: 'low' | 'medium' | 'high' | 'premium';
    suggested_price_usd?: number;
  };
}
