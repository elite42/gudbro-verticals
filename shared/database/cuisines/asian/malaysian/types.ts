/**
 * Malaysian Cuisine Database Types
 * GUDBRO Database Standards v1.7
 *
 * Categories: rice, noodles, satay, curry, soup, fried, bread, desserts, seafood
 * Regions: nationwide, penang, kuala_lumpur, sarawak, kelantan, malacca, sabah
 */

export interface MalaysianDish {
  // Primary key
  id: string;

  // Basic info
  slug: string;
  name: string;
  local_name?: string;
  description: string;

  // Classification
  category: 'rice' | 'noodles' | 'satay' | 'curry' | 'soup' | 'fried' | 'bread' | 'desserts' | 'seafood';
  region?: 'nationwide' | 'penang' | 'kuala_lumpur' | 'sarawak' | 'kelantan' | 'malacca' | 'sabah';
  status: 'iconic' | 'classic' | 'traditional' | 'regional' | 'modern';

  // Cooking details
  protein_type?: string;
  cooking_method?: string;
  prep_time_min?: number;
  spice_level: number; // 0-5

  // Dietary information
  dietary: {
    is_vegan: boolean;
    is_vegetarian: boolean;
    is_gluten_free: boolean;
    is_dairy_free: boolean;
    is_nut_free: boolean;
    is_halal: boolean;
    is_kosher: boolean;
  };

  // Arrays
  allergens: string[];
  tags: string[];

  // Ingredients
  ingredient_ids: string[];

  // Metrics
  popularity: number; // 0-100
}

// Helper type for category
export type MalaysianCategory = MalaysianDish['category'];

// Helper type for region
export type MalaysianRegion = NonNullable<MalaysianDish['region']>;
