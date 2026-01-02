// Scandinavian Cuisine Types
// GUDBRO Database Standards v1.7

export type ScandinavianCategory =
  | 'mains'        // Main courses (meatballs, stews, roasts)
  | 'fish'         // Fish dishes (gravlax, pickled herring)
  | 'open_sandwich'// Smørrebrød and open sandwiches
  | 'soups'        // Soups and porridges
  | 'sides'        // Side dishes
  | 'pastries'     // Baked goods (kanelbullar, karjalanpiirakka)
  | 'desserts';    // Desserts

export type ScandinavianCountry =
  | 'sweden'       // SE
  | 'norway'       // NO
  | 'denmark'      // DK
  | 'finland'      // FI
  | 'regional';    // Pan-Scandinavian

export type ScandinavianStatus = 'classic' | 'traditional' | 'popular' | 'regional';

export interface ScandinavianDish {
  id: string;
  slug: string;
  name: string;
  local_name: string;
  description: string;
  category: ScandinavianCategory;
  country: ScandinavianCountry;
  status: ScandinavianStatus;
  protein_type: string | null;
  cooking_method: string | null;
  prep_time_min: number;
  spice_level: number;
  price_default: number;
  dietary: {
    is_vegan: boolean;
    is_vegetarian: boolean;
    is_gluten_free: boolean;
    is_dairy_free: boolean;
    is_nut_free: boolean;
    is_halal: boolean;
    is_kosher: boolean;
  };
  allergens: string[];
  intolerances: string[];
  ingredient_ids: string[];
  tags: string[];
  popularity: number;
}
