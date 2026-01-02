// ============================================
// BRITISH CUISINE - Type Definitions
// GUDBRO Database Standards v1.7
// ============================================

/**
 * British cuisine categories:
 * - breakfast: Full English, Kedgeree, Kippers
 * - main: Roast dinners, pies, stews
 * - pub: Classic pub fare (Fish & Chips, Scotch Egg)
 * - seafood: Fish Pie, Cullen Skink
 * - regional: Scottish, Welsh, regional specialties
 * - dessert: Puddings and sweets
 */
export type BritishCategory =
  | 'breakfast'
  | 'main'
  | 'pub'
  | 'seafood'
  | 'regional'
  | 'dessert';

export type BritishRegion =
  | 'england'
  | 'scotland'
  | 'wales'
  | 'northern_ireland'
  | 'cornwall'
  | 'yorkshire'
  | 'lancashire'
  | 'london'
  | 'pan_british';

export interface BritishDish {
  id: string;
  slug: string;
  name: string;
  local_name: string | null;
  description: string;
  category: BritishCategory;
  region: BritishRegion;
  status: 'classic' | 'traditional' | 'modern' | 'pub_favorite' | 'regional';
  protein_type: string | null;
  cooking_method: string | null;
  prep_time_min: number;
  spice_level: number;
  price_default: number;
  is_available: boolean;
  dietary: {
    is_vegan: boolean;
    is_vegetarian: boolean;
    is_gluten_free: boolean;
    is_dairy_free: boolean;
    is_nut_free: boolean;
    is_halal: boolean;
    is_kosher: boolean;
  };
  allergens: string[];
  intolerances: string[];
  ingredient_ids: string[];
  tags: string[];
  popularity: number;
  image_url: string | null;
}

// British regions for origin tracking
export const BRITISH_REGIONS = [
  'England',
  'Scotland',
  'Wales',
  'Northern Ireland',
  'Cornwall',
  'Yorkshire',
  'Lancashire',
  'London',
  'Lake District',
  'Devon'
] as const;
