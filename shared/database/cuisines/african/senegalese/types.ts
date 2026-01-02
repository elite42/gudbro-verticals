// Senegalese Cuisine Types
// GUDBRO Database Standards v1.7

export interface SenegaleseDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: SenegaleseCategory;
  status: SenegaleseStatus;
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

export type SenegaleseCategory =
  | 'rice'           // Rice dishes (thieboudienne, etc.)
  | 'stew'           // Stews (mafe, etc.)
  | 'grilled'        // Grilled meats (dibi)
  | 'soup'           // Soups (suppu kandia, caldou)
  | 'street_food'    // Street food (pastels, fataya, accara)
  | 'dessert'        // Desserts (thiakry, sombi)
  | 'beverage';      // Beverages (bissap, bouye)

export type SenegaleseStatus = 'iconic' | 'classic' | 'traditional' | 'regional';
