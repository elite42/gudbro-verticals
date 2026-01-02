// South African Cuisine Types
// GUDBRO Database Standards v1.7

export interface SouthAfricanDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: SouthAfricanCategory;
  status: SouthAfricanStatus;
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

export type SouthAfricanCategory =
  | 'braai'          // BBQ/Grilled meats
  | 'stew'           // Potjiekos and stews
  | 'curry'          // Cape Malay curries, bunny chow
  | 'side'           // Pap, chakalaka, samp
  | 'snack'          // Biltong, droewors, vetkoek
  | 'dessert'        // Malva pudding, koeksister, melktert
  | 'bread'          // Breads and baked goods
  | 'beverage';      // Rooibos, Amarula

export type SouthAfricanStatus = 'iconic' | 'classic' | 'traditional' | 'regional';
