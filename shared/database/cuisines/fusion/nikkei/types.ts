// Nikkei (Japanese-Peruvian Fusion) Database Types
// GUDBRO Database Standards v1.7

export type NikkeiCategory =
  | 'tiradito'      // Raw fish, thin slices
  | 'ceviche'       // Citrus-marinated seafood
  | 'maki'          // Fusion sushi rolls
  | 'main'          // Main courses
  | 'anticucho'     // Grilled skewers
  | 'side';         // Sides and accompaniments

export type NikkeiStatus = 'iconic' | 'classic' | 'traditional' | 'modern' | 'regional';

export interface NikkeiDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: NikkeiCategory;
  status: NikkeiStatus;
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
