/**
 * GUDBRO Centralized Database - Type Definitions
 */

// Multi-language support
export interface MultiLangText {
  en: string;
  it: string;
  vi: string;
  ko?: string;
  ja?: string;
  zh?: string;
  th?: string;
  es?: string;
  fr?: string;
}

// Allergens (30 types)
export interface AllergenFlags {
  gluten?: boolean;
  crustaceans?: boolean;
  eggs?: boolean;
  fish?: boolean;
  peanuts?: boolean;
  soybeans?: boolean;
  milk?: boolean;
  nuts?: boolean;
  celery?: boolean;
  mustard?: boolean;
  sesame?: boolean;
  sulphites?: boolean;
  lupin?: boolean;
  molluscs?: boolean;
  pork?: boolean;
  peach?: boolean;
  tomato?: boolean;
  beef?: boolean;
  chicken?: boolean;
  squid?: boolean;
  pine_nuts?: boolean;
  kiwi?: boolean;
  banana?: boolean;
  mango?: boolean;
  apple?: boolean;
  orange?: boolean;
  matsutake?: boolean;
  yam?: boolean;
  coriander?: boolean;
  chili_pepper?: boolean;
}

// Intolerances (10 types)
export interface IntoleranceFlags {
  lactose?: boolean;
  gluten_celiac?: boolean;
  fructose?: boolean;
  fodmap?: boolean;
  msg?: boolean;
  histamine?: boolean;
  salicylates?: boolean;
  sulphites_intolerance?: boolean;
  caffeine?: boolean;
  alcohol?: boolean;
}

// Dietary restrictions
export interface DietaryFlags {
  buddhist_restricted?: boolean;
  halal?: boolean;
  non_halal?: boolean;
  kosher?: boolean;
  non_kosher?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
  pescatarian?: boolean;
  gluten_free?: boolean;
  dairy_free?: boolean;
  nut_free?: boolean;
  low_carb?: boolean;
}

// Spice levels
export type SpiceLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface SpiceInfo {
  level: SpiceLevel;
  scoville?: number;
  description?: MultiLangText;
}

// Nutrition per 100g
export interface NutritionPer100g {
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g?: number;
  salt_g?: number;
  calories_kcal: number;
}

// Ingredient Master
export interface IngredientMaster {
  id: string;
  slug: string;
  name: MultiLangText;
  description?: MultiLangText;
  category: {
    main: string;
    sub?: string;
  };
  allergens: AllergenFlags;
  intolerances: IntoleranceFlags;
  dietary_restrictions: DietaryFlags;
  spice: SpiceInfo;
  nutrition?: NutritionPer100g;
  image?: string;
  created_at: string;
  updated_at: string;
  version: number;
}

// Product Ingredient
export interface ProductIngredient {
  ingredient_id: string;
  quantity?: {
    amount: number;
    unit: 'g' | 'ml' | 'oz' | 'cups' | 'tbsp' | 'tsp' | 'pieces';
  };
  optional?: boolean;
  notes?: MultiLangText;
}

// Auto-computation result
export interface AutoComputationResult {
  allergens: {
    present: string[];
    by_country: {
      EU: string[];
      USA: string[];
      Korea: string[];
      Japan: string[];
    };
  };
  intolerances: {
    present: string[];
    severity: {
      [key: string]: 'low' | 'medium' | 'high' | 'severe';
    };
  };
  diets: {
    compatible: string[];
    incompatible: string[];
    reasons?: {
      [diet: string]: string[];
    };
  };
  spice: {
    max_level: SpiceLevel;
    max_scoville?: number;
    ingredients_with_spice: string[];
  };
  compliance: {
    EU: boolean;
    USA: boolean;
    Korea: boolean;
    Japan: boolean;
    warnings: string[];
  };
  nutrition?: {
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}
