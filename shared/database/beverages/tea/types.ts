/**
 * GUDBRO Tea & Infusions Database Types
 *
 * Categories:
 * - True Teas (from Camellia sinensis): black, green, oolong, white, pu-erh
 * - Matcha (Japanese powdered green tea)
 * - Bubble Tea / Boba (Taiwanese milk tea with toppings)
 * - Chai (Spiced tea, Indian origin)
 * - Herbal Infusions / Tisanes (caffeine-free)
 * - Specialty Tea Drinks (coffee shop style)
 *
 * Architecture: English only in DB, translations separate
 */

// Tea categories
export type TeaCategory =
  | 'black_tea'        // English Breakfast, Earl Grey, Assam, Ceylon
  | 'green_tea'        // Sencha, Dragonwell, Gunpowder
  | 'oolong_tea'       // Tieguanyin, Dong Ding, Wuyi
  | 'white_tea'        // Silver Needle, White Peony
  | 'pu_erh'           // Aged Chinese tea
  | 'matcha'           // Japanese powdered green tea
  | 'bubble_tea'       // Boba, milk tea with toppings
  | 'chai'             // Spiced tea (masala chai)
  | 'herbal_infusion'  // Caffeine-free tisanes
  | 'fruit_tea'        // Fruit-based teas
  | 'specialty';       // Coffee shop specialty drinks

// Serving style
export type TeaStyle = 'hot' | 'iced' | 'blended' | 'layered';

// Caffeine level
export type CaffeineLevel = 'none' | 'very_low' | 'low' | 'medium' | 'high';

// Sweetness level
export type Sweetness = 'unsweetened' | 'lightly_sweet' | 'medium' | 'sweet' | 'very_sweet';

// Base tea type for bubble tea
export type BubbleTeaBase = 'black_tea' | 'green_tea' | 'oolong' | 'none';

// Milk types
export type MilkType = 'whole' | 'skim' | 'oat' | 'almond' | 'soy' | 'coconut' | 'none';

// Bubble tea toppings
export type BobaToppings =
  | 'tapioca_pearls'      // Classic black boba
  | 'brown_sugar_pearls'  // Caramelized boba
  | 'popping_boba'        // Juice-filled spheres
  | 'coconut_jelly'       // Coconut cubes
  | 'aloe_vera'           // Aloe cubes
  | 'grass_jelly'         // Herbal jelly
  | 'pudding'             // Egg pudding
  | 'red_bean'            // Sweet azuki beans
  | 'cheese_foam'         // Salted cream cheese topping
  | 'taro_balls'          // Taro mochi balls
  | 'none';

// Main Tea type
export interface Tea {
  id: string;
  slug: string;
  name: string;
  description: string;

  // Classification
  category: TeaCategory;
  style: TeaStyle;
  caffeine_level: CaffeineLevel;
  sweetness: Sweetness;

  // Ingredients
  main_ingredients: string[];
  quantity_description: string;
  ingredient_ids: string[];

  // Bubble tea specific (optional)
  bubble_tea_base?: BubbleTeaBase;
  default_toppings?: BobaToppings[];

  // Serving
  serving: {
    glass_type: string;
    volume_ml: number;
    chain_style_decoration: string;
    premium_style_decoration: string;
  };

  // Preparation
  preparation: {
    method: string;
    prep_time_seconds: number;
    skill_level: 1 | 2 | 3;
    steep_time_seconds?: number;
    water_temperature_c?: number;
    notes?: string;
  };

  // Cost
  cost: {
    ingredient_cost_usd: number;
    selling_price_usd: number;
    profit_margin_percent: number;
  };

  // Nutrition
  nutrition: {
    calories_per_serving: number;
    caffeine_mg: number | null;
    sugar_g: number | null;
    protein_g: number | null;
    fat_g: number | null;
  };

  // Dietary
  dietary: {
    is_vegan: boolean;
    is_dairy_free: boolean;
    is_gluten_free: boolean;
    is_sugar_free: boolean;
    is_caffeine_free: boolean;
    default_milk: MilkType;
    allergens: string[];
  };

  // Customization
  customization: {
    available_milks: MilkType[];
    available_syrups: string[];
    available_toppings?: BobaToppings[];
    can_adjust_sweetness: boolean;
    can_adjust_ice: boolean;
  };

  // Metadata
  tags: string[];
  origin_country?: string;
  popularity: number;
  is_seasonal: boolean;
  is_signature: boolean;
}

// Stats type
export interface TeaStats {
  total: number;
  by_category: Record<TeaCategory, number>;
  by_style: Record<TeaStyle, number>;
  by_caffeine: Record<CaffeineLevel, number>;
}
