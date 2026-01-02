// Nigerian Cuisine Types
// GUDBRO Database Standards v1.7

export interface NigerianDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: NigerianCategory;
  status: NigerianStatus;
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

export type NigerianCategory =
  | 'soup'            // Zuppe tradizionali (Egusi, Ogbono, etc.)
  | 'swallow'         // Fufu, Eba, Amala, Pounded Yam
  | 'rice'            // Jollof, Fried Rice, Ofada
  | 'street_food'     // Suya, Akara, Puff Puff
  | 'stew'            // Stufati
  | 'snack'           // Snack
  | 'appetizer'       // Antipasti
  | 'main'            // Piatti principali
  | 'side'            // Contorni
  | 'dessert'         // Dolci
  | 'beverage';       // Bevande

export type NigerianStatus = 'iconic' | 'classic' | 'traditional' | 'regional';
