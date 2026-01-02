// Korean-Mexican Fusion Database Types
// GUDBRO Database Standards v1.7

export type KoreanMexCategory =
  | 'taco'        // Korean-style tacos
  | 'burrito'     // Fusion burritos
  | 'bowl'        // Korean-Mex rice bowls
  | 'quesadilla'  // Fusion quesadillas
  | 'appetizer'   // Fusion starters
  | 'side';       // Fusion sides

export type KoreanMexStatus = 'iconic' | 'classic' | 'modern';

export interface KoreanMexDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: KoreanMexCategory;
  status: KoreanMexStatus;
  protein_type: string;
  cooking_method: string;
  prep_time_min: number;
  spice_level: number;
  dietary: {
    vegetarian?: boolean;
    vegan?: boolean;
    gluten_free?: boolean;
  };
  allergens: string[];
  tags: string[];
  popularity: number;
  ingredients: string[];
}
