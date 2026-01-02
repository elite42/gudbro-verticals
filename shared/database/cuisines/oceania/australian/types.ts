// Australian Cuisine Types
// GUDBRO Database Standards v1.7

export interface AustralianDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: AustralianCategory;
  status: AustralianStatus;
  region?: string;
  protein_type?: string;
  cooking_method?: string;
  prep_time_min?: number;
  spice_level: number; // 0-5
  dietary: {
    is_vegetarian?: boolean;
    is_vegan?: boolean;
    is_gluten_free?: boolean;
    is_dairy_free?: boolean;
  };
  allergens: string[];
  tags: string[];
  popularity: number; // 0-100
  ingredients: IngredientRef[];
}

export interface IngredientRef {
  id: string;
  role: 'main' | 'secondary' | 'seasoning' | 'garnish';
  quantity_amount?: number;
  quantity_unit?: 'g' | 'ml' | 'unit';
  is_optional: boolean;
}

export type AustralianCategory =
  | 'pie'             // Meat pies, sausage rolls
  | 'bbq'             // Grilled meats, lamb, steaks
  | 'seafood'         // Barramundi, prawns, oysters
  | 'pub'             // Chicken parm, steaks, pub meals
  | 'bush_tucker'     // Indigenous foods, kangaroo, emu
  | 'snack'           // Vegemite toast, chiko roll
  | 'dessert'         // Lamingtons, pavlova, Tim Tams
  | 'bread'           // Damper, fairy bread
  | 'beverage';       // Flat white, iced coffee

export type AustralianStatus = 'iconic' | 'classic' | 'traditional' | 'regional';
