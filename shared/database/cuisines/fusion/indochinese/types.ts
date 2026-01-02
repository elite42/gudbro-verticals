// Indo-Chinese (Hakka-Indian Fusion) Database Types
// GUDBRO Database Standards v1.7

export type IndoChineseCategory =
  | 'manchurian'    // Manchurian-style dishes
  | 'chilli'        // Chilli-based dishes
  | 'noodles'       // Hakka noodles
  | 'rice'          // Fried rice dishes
  | 'soup'          // Indo-Chinese soups
  | 'starter';      // Appetizers and starters

export type IndoChineseStatus = 'iconic' | 'classic' | 'traditional' | 'modern' | 'regional';

export interface IndoChineseDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: IndoChineseCategory;
  status: IndoChineseStatus;
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
