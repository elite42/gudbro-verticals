/**
 * GUDBRO Wines Database - Type Definitions
 *
 * Sistema 5 Dimensioni v3.0 integrated
 * Architecture: English only in DB, translations separate
 */

export type WineColor = 'red' | 'white' | 'rosé' | 'orange' | 'sparkling' | 'dessert' | 'fortified';

export type WineStyle =
  | 'dry'
  | 'off_dry'
  | 'semi_sweet'
  | 'sweet'
  | 'sparkling_brut'
  | 'sparkling_extra_brut'
  | 'sparkling_sec'
  | 'fortified_dry'
  | 'fortified_sweet';

export type WineBody = 'light' | 'medium_light' | 'medium' | 'medium_full' | 'full';

export type WineStatus = 'classic' | 'premium' | 'reserve' | 'grand_cru' | 'everyday' | 'organic' | 'natural';

export type GrapeVariety = string; // e.g., 'cabernet_sauvignon', 'chardonnay'

export interface WineOrigin {
  country: string;
  country_code: string;
  region: string;
  subregion?: string;
  appellation?: string; // DOC, DOCG, AOC, etc.
  classification?: string; // Grand Cru, Premier Cru, etc.
}

export interface WineCharacteristics {
  abv_min: number;
  abv_max: number;
  acidity: 'low' | 'medium_low' | 'medium' | 'medium_high' | 'high';
  tannins?: 'none' | 'low' | 'medium' | 'high' | 'very_high'; // For reds
  sweetness: 'bone_dry' | 'dry' | 'off_dry' | 'medium_sweet' | 'sweet' | 'very_sweet';
  body: WineBody;
  oak?: 'none' | 'light' | 'medium' | 'heavy';
}

export interface WineTaste {
  primary_flavors: string[]; // e.g., ['cherry', 'plum', 'blackberry']
  secondary_flavors?: string[]; // e.g., ['vanilla', 'oak', 'smoke']
  tertiary_flavors?: string[]; // e.g., ['leather', 'tobacco', 'earth']
  aroma_profile: string[]; // e.g., ['fruity', 'floral', 'spicy']
  finish: 'short' | 'medium' | 'long' | 'very_long';
}

export interface WineServing {
  temperature_celsius: { min: number; max: number };
  glass_type: string; // e.g., 'bordeaux', 'burgundy', 'flute'
  decanting_minutes?: number;
  aging_potential_years?: { min: number; max: number };
}

export interface WinePairing {
  food_categories: string[];
  specific_dishes: string[];
  cheese_pairings: string[];
  avoid_with?: string[];
}

export interface WineDietary {
  is_vegan: boolean;
  is_organic: boolean;
  is_biodynamic: boolean;
  is_natural: boolean;
  is_low_sulfite: boolean;
  contains_sulfites: boolean; // Almost all wines do
  allergens: string[]; // Usually ['sulfites']
  calories_per_glass: number; // ~150ml
}

export interface Wine {
  id: string;
  slug: string;
  name: string; // English only
  description: string; // English only

  // Classification
  color: WineColor;
  style: WineStyle;
  status: WineStatus;
  grape_varieties: GrapeVariety[]; // Can be single or blend
  is_blend: boolean;
  vintage_type: 'vintage' | 'non_vintage' | 'multi_vintage';

  // Origin
  origin: WineOrigin;

  // Characteristics
  characteristics: WineCharacteristics;
  taste: WineTaste;

  // Serving
  serving: WineServing;
  pairing: WinePairing;

  // Dietary & Safety (Sistema 5 Dimensioni)
  dietary: WineDietary;

  // Ingredients (references to master table)
  ingredient_ids: string[]; // e.g., ['ING_GRAPE_CABERNET_SAUVIGNON', 'ING_GRAPE_MERLOT']

  // Metadata
  tags: string[];
  popularity: number; // 0-100
  price_tier: 'budget' | 'value' | 'mid' | 'premium' | 'luxury';

  // Production info
  production?: {
    method?: string;
    aging_vessel?: string; // 'stainless_steel', 'oak_barrel', 'concrete'
    aging_months?: number;
    annual_production_bottles?: number;
  };
}
