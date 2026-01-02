/**
 * Tex-Mex Cuisine Types
 * GUDBRO Database Standards v1.7
 */

export interface TexMexDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: 'tacos' | 'burritos' | 'enchiladas' | 'nachos' | 'fajitas' | 'quesadillas' | 'sides' | 'dips' | 'mains';
  status?: 'iconic' | 'classic' | 'traditional' | 'modern';
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
