/**
 * Filipino Cuisine Types
 * GUDBRO Database Standards v1.7
 */

export interface FilipinoDish {
  id: string;
  slug: string;
  name: string;
  local_name?: string;
  description: string;
  category: 'rice' | 'noodles' | 'meat' | 'seafood' | 'soup' | 'vegetables' | 'snacks' | 'desserts' | 'breakfast';
  region?: 'nationwide' | 'manila' | 'visayas' | 'mindanao' | 'ilocos' | 'bicol' | 'pampanga' | 'cebu';
  status?: 'iconic' | 'classic' | 'traditional' | 'regional' | 'modern';
  protein_type?: string;
  cooking_method?: string;
  prep_time_min?: number;
  spice_level?: number; // 0-5
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
  popularity: number; // 0-100
  ingredient_ids: string[];
}
