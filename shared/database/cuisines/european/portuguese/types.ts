// ============================================
// PORTUGUESE CUISINE - Type Definitions
// GUDBRO Database Standards v1.7
// ============================================

/**
 * Portuguese cuisine categories:
 * - bacalhau: Salt cod dishes (national obsession, 365+ recipes)
 * - seafood: Octopus, sardines, clams, seafood rice
 * - meat: Leitão, Cozido, Carne de Porco à Alentejana
 * - soup: Caldo Verde, Açorda, Sopa de Pedra
 * - sandwich: Bifana, Francesinha, Prego
 * - dessert: Pastéis de Nata, Pão de Ló, conventual sweets
 */
export type PortugueseCategory =
  | 'bacalhau'
  | 'seafood'
  | 'meat'
  | 'soup'
  | 'sandwich'
  | 'dessert';

export type PortugueseRegion =
  | 'lisbon'
  | 'porto'
  | 'alentejo'
  | 'algarve'
  | 'minho'
  | 'beira'
  | 'bairrada'
  | 'azores'
  | 'madeira'
  | 'pan_portuguese';

export interface PortugueseDish {
  id: string;
  slug: string;
  name: string;
  local_name: string | null;
  description: string;
  category: PortugueseCategory;
  region: PortugueseRegion;
  status: 'classic' | 'traditional' | 'popular' | 'signature';
  protein_type: string | null;
  cooking_method: string | null;
  prep_time_min: number;
  spice_level: number;
  price_default: number;
  is_available: boolean;
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
  image_url: string | null;
}

// Portuguese regions for origin tracking
export const PORTUGUESE_REGIONS = [
  'Lisbon',
  'Porto',
  'Alentejo',
  'Algarve',
  'Minho',
  'Beira',
  'Bairrada',
  'Azores',
  'Madeira',
  'Trás-os-Montes'
] as const;
