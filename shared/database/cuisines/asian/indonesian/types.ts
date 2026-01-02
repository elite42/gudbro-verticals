// Indonesian Cuisine - Type Definitions
// GUDBRO Database Standards v1.7

export type IndonesianCategory =
  | 'rice'          // Nasi dishes
  | 'noodles'       // Mie dishes
  | 'satay'         // Grilled skewers
  | 'soup'          // Soto, bakso, etc.
  | 'curry'         // Rendang, gulai, etc.
  | 'fried'         // Goreng dishes
  | 'salad'         // Gado-gado, urap, etc.
  | 'snacks'        // Gorengan, kerupuk, etc.
  | 'desserts';     // Sweets and drinks

export type IndonesianRegion =
  | 'nationwide'
  | 'java'          // Central & East Java
  | 'jakarta'       // Betawi cuisine
  | 'sumatra'       // Padang, Medan
  | 'bali'          // Balinese cuisine
  | 'sulawesi'      // Makassar, Manado
  | 'kalimantan';   // Borneo

export type IndonesianStatus = 'iconic' | 'classic' | 'traditional' | 'regional';

export interface IndonesianDish {
  id: string;
  slug: string;
  name: string;
  local_name?: string;
  description: string;
  category: IndonesianCategory;
  region: IndonesianRegion;
  status: IndonesianStatus;
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
