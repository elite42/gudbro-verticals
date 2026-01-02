// Argentinian Cuisine Database Types
// GUDBRO Database Standards v1.7

export type ArgentinianCategory =
  | 'asado'       // Grilled meats, BBQ
  | 'empanada'    // Stuffed pastries
  | 'main'        // Main dishes
  | 'pasta'       // Italian-Argentine pasta
  | 'soup'        // Soups and stews
  | 'appetizer'   // Starters
  | 'dessert'     // Sweets
  | 'beverage';   // Drinks

export type ArgentinianRegion =
  | 'Buenos Aires'
  | 'Patagonia'
  | 'Mendoza'
  | 'Córdoba'
  | 'Salta'
  | 'Tucumán';

export type ArgentinianStatus = 'iconic' | 'classic' | 'traditional' | 'regional';

export interface ArgentinianDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ArgentinianCategory;
  status: ArgentinianStatus;
  region?: ArgentinianRegion;
  protein_type?: string;
  cooking_method?: string;
  prep_time_min?: number;
  spice_level?: number;
  dietary?: {
    vegetarian?: boolean;
    vegan?: boolean;
    gluten_free?: boolean;
  };
  allergens?: string[];
  tags?: string[];
  popularity?: number;
  ingredients: string[];
}
