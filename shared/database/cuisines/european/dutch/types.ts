// Dutch Cuisine - Type Definitions
// GUDBRO Database Standards v1.7

export type DutchCategory =
  | 'stamppot'      // Mashed potato dishes
  | 'snacks'        // Fried snacks (bitterballen, kroket)
  | 'mains'         // Main dishes
  | 'soups'         // Soups (erwtensoep, etc.)
  | 'seafood'       // Herring, fish dishes
  | 'pancakes'      // Pannenkoeken, poffertjes
  | 'desserts';     // Sweets and pastries

export type DutchRegion =
  | 'nationwide'
  | 'holland'       // North/South Holland
  | 'friesland'     // Frisian specialties
  | 'limburg'       // Southern influence
  | 'zeeland'       // Coastal/seafood
  | 'amsterdam';    // Capital city

export type DutchStatus = 'iconic' | 'classic' | 'traditional' | 'regional';

export interface DutchDish {
  id: string;
  slug: string;
  name: string;
  local_name?: string;
  description: string;
  category: DutchCategory;
  region: DutchRegion;
  status: DutchStatus;
  protein_type?: string;
  cooking_method?: string;
  prep_time_min?: number;
  spice_level: number;
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
  tags: string[];
  popularity: number;
  ingredients: string[];
}
