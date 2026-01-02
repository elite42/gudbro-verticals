// ============================================
// ETHIOPIAN CUISINE - Type Definitions
// GUDBRO Database Standards v1.3
// ============================================

/**
 * Ethiopian cuisine categories:
 * - stew: Wat/Wot dishes (Doro Wat, Siga Wat, Misir Wat)
 * - raw: Raw meat dishes (Kitfo, Gored Gored)
 * - tibs: Sautéed/fried meat dishes (Derek Tibs, Awaze Tibs)
 * - vegetarian: Fasting/vegan dishes (Shiro, Gomen, Atkilt)
 * - bread: Injera and other breads
 * - salad: Fresh salads and condiments
 * - beverage: Traditional drinks (Tej, Tella, Coffee)
 */
export type EthiopianCategory =
  | 'stew'
  | 'raw'
  | 'tibs'
  | 'vegetarian'
  | 'bread'
  | 'salad'
  | 'beverage';

export interface EthiopianDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: EthiopianCategory;
  price_default: number;
  is_available: boolean;
  prep_time_min: number;
  spice_level: number;
  is_traditional: boolean;
  allergens: { type: string }[];
  intolerances: { type: string }[];
  dietary: {
    is_vegan: boolean;
    is_vegetarian: boolean;
  };
  tags: string[];
  image_url: string | null;
}

// Key Ethiopian ingredients reference
export const ETHIOPIAN_KEY_INGREDIENTS = {
  spices: ['ING_BERBERE', 'ING_MITMITA', 'ING_KORERIMA', 'ING_NITER_KIBBEH'],
  proteins: ['ING_BEEF', 'ING_LAMB', 'ING_CHICKEN', 'ING_GOAT'],
  legumes: ['ING_RED_LENTILS', 'ING_CHICKPEAS', 'ING_SPLIT_PEAS'],
  vegetables: ['ING_COLLARD_GREENS', 'ING_CABBAGE', 'ING_CARROT', 'ING_POTATO'],
  breads: ['ING_INJERA', 'ING_TEFF_FLOUR'],
  dairy: ['ING_AYIB', 'ING_NITER_KIBBEH']
} as const;
