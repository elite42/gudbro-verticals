// Russian Cuisine Types
// GUDBRO Database Standards v1.7

export type RussianCategory =
  | 'soups'        // Supy (Borscht, Shchi, Solyanka)
  | 'dumplings'    // Pelmeni, Vareniki
  | 'mains'        // Main courses
  | 'zakuski'      // Appetizers/starters
  | 'pies'         // Pirogi, Pirozhki, Kulyebyaka
  | 'porridge'     // Kasha
  | 'pancakes'     // Blini, Oladyi
  | 'salads'       // Salaty (Olivier, Vinegret)
  | 'desserts';    // Deserty

export type RussianRegion =
  | 'nationwide'        // Pan-Russian
  | 'moscow'            // Moscow region
  | 'saint_petersburg'  // St. Petersburg
  | 'siberia'           // Siberian
  | 'ural'              // Ural Mountains
  | 'volga'             // Volga region
  | 'caucasus'          // North Caucasus
  | 'far_east';         // Russian Far East

export type RussianStatus = 'classic' | 'traditional' | 'popular' | 'regional';

export interface RussianDish {
  id: string;
  slug: string;
  name: string;
  local_name: string;
  description: string;
  category: RussianCategory;
  region: RussianRegion;
  status: RussianStatus;
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
