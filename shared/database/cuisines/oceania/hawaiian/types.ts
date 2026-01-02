// Hawaiian Cuisine Types

export type HawaiianCategory =
  | 'poke'           // Raw fish dishes (poke bowls)
  | 'plate_lunch'    // Traditional plate lunches
  | 'luau'           // Traditional luau dishes
  | 'noodles'        // Saimin, noodle dishes
  | 'snack'          // Spam musubi, manapua
  | 'grill'          // Grilled meats, teriyaki
  | 'dessert'        // Haupia, shave ice
  | 'beverage';      // Tropical drinks

export type HawaiianStatus =
  | 'iconic'         // Poke, Spam Musubi, Loco Moco
  | 'classic'        // Plate lunch staples
  | 'traditional'    // Luau and old Hawaiian
  | 'local';         // Local fusion favorites

export type HawaiianProtein =
  | 'ahi'            // Ahi tuna
  | 'salmon'         // Salmon (poke)
  | 'pork'           // Kalua pig, laulau
  | 'beef'           // Loco moco, teriyaki
  | 'chicken'        // Chicken long rice, huli huli
  | 'spam'           // Spam musubi
  | 'fish'           // Various fish
  | 'shellfish'      // Shrimp, etc
  | null;            // Vegetarian

export interface DietaryInfo {
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
}

export interface Ingredient {
  id: string;
  role: 'main' | 'secondary' | 'seasoning' | 'garnish';
  quantity_amount: number;
  quantity_unit: string;
  is_optional: boolean;
}

export interface HawaiianDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: HawaiianCategory;
  status: HawaiianStatus;
  region: string;
  protein_type: HawaiianProtein;
  cooking_method: string;
  prep_time_min: number;
  spice_level: number;
  dietary: DietaryInfo;
  allergens: string[];
  tags: string[];
  popularity: number;
  ingredients: Ingredient[];
}
