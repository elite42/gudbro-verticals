/**
 * GUDBRO Sandwiches Database - Type Definitions
 *
 * Sistema 5 Dimensioni v3.0 integrated
 */

export type SandwichStyle =
  | 'italian'
  | 'french'
  | 'american'
  | 'cuban'
  | 'vietnamese'
  | 'middle_eastern'
  | 'mexican'
  | 'mexican_american'
  | 'greek'
  | 'turkish'
  | 'healthy'
  | 'signature';

export type SandwichStatus =
  | 'classic'
  | 'traditional'
  | 'modern'
  | 'signature'
  | 'seasonal'
  | 'active';

export type BreadType =
  | 'ciabatta'
  | 'focaccia'
  | 'focaccia_thin'
  | 'baguette'
  | 'piadina'
  | 'white_bread_crustless'
  | 'rosetta'
  | 'semelle'
  | 'tuscan_bread'
  | 'pain_de_mie'
  | 'white_toast'
  | 'rye_bread'
  | 'hoagie_roll'
  | 'french_bread'
  | 'cuban_bread'
  | 'vietnamese_baguette'
  | 'pita'
  | 'flour_tortilla'
  | 'whole_wheat_tortilla'
  | 'large_flour_tortilla'
  | 'rice_paper'
  | 'lavash'
  | 'birote'
  | 'brioche'
  | 'sourdough'
  | 'multigrain'
  | 'other';

export interface MultiLangText {
  en: string;
  it: string;
  vi: string;
}

export interface BreadInfo {
  type: BreadType;
  is_toasted: boolean;
  is_grilled: boolean;
}

export interface Origin {
  country: string;
  country_code: string;
  region?: string;
  city?: string;
}

export interface Serving {
  portion_size: 'small' | 'regular' | 'large';
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

export interface Sandwich {
  id: string;
  slug: string;
  name: MultiLangText;
  description: MultiLangText;
  tagline?: MultiLangText;
  style: SandwichStyle;
  status: SandwichStatus;
  bread: BreadInfo;
  proteins: string[];
  cheeses: string[];
  vegetables: string[];
  condiments: string[];
  is_hot: boolean;
  is_pressed: boolean;
  origin: Origin;
  history?: {
    story?: MultiLangText;
    year_created?: number;
    creator?: string;
  };
  serving: Serving;
  dietary: Dietary;
  customization?: {
    bread_options?: string[];
    add_protein?: string[];
    add_cheese?: string[];
    sauce_options?: string[];
    make_vegetarian?: boolean;
    make_vegan?: boolean;
    make_gluten_free?: boolean;
  };
  variations?: Array<{
    name: string;
    description: MultiLangText;
    changes: string[];
  }>;
  tags: string[];
  popularity: number;
  related_sandwiches?: string[];
  media?: {
    thumbnail?: string;
    gallery?: string[];
  };
  pricing?: {
    cost_level: 'low' | 'medium' | 'high' | 'premium';
    suggested_price_usd?: number;
  };
}
