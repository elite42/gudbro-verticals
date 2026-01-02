/**
 * GUDBRO Coffee Database - Type Definitions
 *
 * Sistema 5 Dimensioni v3.0 integrated
 * Architecture: English only in DB, translations separate
 */

export type CoffeeCategory =
  | 'espresso_based'
  | 'coffee_mix'
  | 'cold_brew'
  | 'filter_coffee'
  | 'specialty';

export type CoffeeStyle =
  | 'hot'
  | 'iced'
  | 'blended'
  | 'layered';

export type CoffeeSize = 'small' | 'medium' | 'large';

export type CaffeineLevel = 'decaf' | 'low' | 'medium' | 'high' | 'very_high';

export type SkillLevel = 1 | 2 | 3; // 1=easy, 2=medium, 3=expert

export type MilkType =
  | 'whole'
  | 'skim'
  | 'oat'
  | 'almond'
  | 'soy'
  | 'coconut'
  | 'none';

export type SweetnessLevel = 'unsweetened' | 'lightly_sweet' | 'medium' | 'sweet' | 'very_sweet';

export interface CoffeeServing {
  glass_type: string;
  volume_ml: number;
  chain_style_decoration: string;
  premium_style_decoration: string;
}

export interface CoffeePreparation {
  method: string;
  prep_time_seconds: number;
  skill_level: SkillLevel;
  notes?: string;
}

export interface CoffeeCost {
  ingredient_cost_usd: number;
  selling_price_usd: number;
  profit_margin_percent: number;
}

export interface CoffeeNutrition {
  calories_per_serving: number;
  caffeine_mg?: number;
  sugar_g?: number;
  protein_g?: number;
  fat_g?: number;
}

export interface CoffeeDietary {
  is_vegan: boolean;
  is_dairy_free: boolean;
  is_gluten_free: boolean;
  is_sugar_free: boolean;
  default_milk: MilkType;
  allergens: string[];
}

export interface CoffeeCustomization {
  available_milks: MilkType[];
  available_syrups: string[];
  can_add_espresso_shot: boolean;
  can_adjust_sweetness: boolean;
  can_make_decaf: boolean;
}

export interface Coffee {
  id: string;
  slug: string;
  name: string; // English only
  description: string; // English only

  // Classification
  category: CoffeeCategory;
  style: CoffeeStyle;
  caffeine_level: CaffeineLevel;
  sweetness: SweetnessLevel;

  // Ingredients
  main_ingredients: string[];
  quantity_description: string; // e.g., "60ml espresso, 180ml milk"
  ingredient_ids: string[]; // Links to master ingredients

  // Serving
  serving: CoffeeServing;

  // Preparation
  preparation: CoffeePreparation;

  // Cost & Pricing (reference values)
  cost: CoffeeCost;

  // Nutrition
  nutrition: CoffeeNutrition;

  // Dietary
  dietary: CoffeeDietary;

  // Customization options
  customization: CoffeeCustomization;

  // Metadata
  tags: string[];
  popularity: number; // 0-100
  is_seasonal: boolean;
  is_signature: boolean;
}

// Stats interface for UI
export interface CoffeeStats {
  total: number;
  by_category: Record<CoffeeCategory, number>;
  by_style: Record<CoffeeStyle, number>;
}
