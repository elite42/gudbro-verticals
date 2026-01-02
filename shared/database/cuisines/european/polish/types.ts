// Polish Cuisine Types
// GUDBRO Database Standards v1.7

export type PolishCategory =
  | 'dumplings'    // Pierogi & uszka
  | 'soups'        // Zupy
  | 'mains'        // Main courses
  | 'sides'        // Side dishes
  | 'street_food'  // Street food
  | 'desserts';    // Desery

export type PolishRegion =
  | 'nationwide'        // Pan-Polish
  | 'silesia'           // Slask
  | 'malopolska'        // Lesser Poland (Krakow)
  | 'mazovia'           // Mazowsze (Warsaw)
  | 'podhale'           // Tatra Mountains
  | 'wielkopolska'      // Greater Poland (Poznan)
  | 'kashubia'          // Kaszuby (Gdansk area)
  | 'podlasie';         // Eastern Poland

export type PolishStatus = 'classic' | 'traditional' | 'popular' | 'regional';

export interface PolishDish {
  id: string;
  slug: string;
  name: string;
  local_name: string;
  description: string;
  category: PolishCategory;
  region: PolishRegion;
  status: PolishStatus;
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
