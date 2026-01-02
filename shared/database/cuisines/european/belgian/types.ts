// Belgian Cuisine Types
// GUDBRO Database Standards v1.7

export type BelgianCategory =
  | 'mains'       // Main courses (Carbonnade, Waterzooi, Vol-au-Vent)
  | 'seafood'     // Moules-Frites, Crevettes
  | 'frites'      // Frites and fritkot snacks
  | 'waffles'     // Liège, Brussels waffles
  | 'desserts'    // Speculoos, Dame Blanche, Pralines
  | 'appetizers'; // Filet Américain, Croquettes

export type BelgianRegion =
  | 'nationwide'    // Pan-Belgian
  | 'flanders'      // Flemish region
  | 'wallonia'      // Walloon region
  | 'brussels'      // Brussels Capital
  | 'liege'         // Liège area
  | 'ghent'         // Ghent area
  | 'antwerp'       // Antwerp area
  | 'coast';        // Belgian coast

export type BelgianStatus = 'iconic' | 'classic' | 'traditional' | 'regional';

export interface BelgianDish {
  id: string;
  slug: string;
  name: string;
  local_name: string;
  description: string;
  category: BelgianCategory;
  region: BelgianRegion;
  status: BelgianStatus;
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
