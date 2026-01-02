// Cuban Cuisine Types
// GUDBRO Database Standards v1.7

export interface CubanDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CubanCategory;
  status: CubanStatus;
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

export type CubanCategory =
  | 'main'           // Piatti principali
  | 'rice_beans'     // Riso e fagioli
  | 'sandwich'       // Panini
  | 'appetizer'      // Antipasti
  | 'side'           // Contorni
  | 'soup'           // Zuppe
  | 'dessert'        // Dolci
  | 'beverage';      // Bevande

export type CubanStatus = 'iconic' | 'classic' | 'traditional' | 'regional';
