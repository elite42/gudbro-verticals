// ============================================
// CARIBBEAN Database Types
// GUDBRO Database Standards v1.3
// ============================================

export type CaribbeanCategory =
  | 'main_dishes'      // Piatti principali (jerk chicken, ropa vieja, etc.)
  | 'rice_beans'       // Riso e legumi (rice and peas, moros y cristianos)
  | 'seafood'          // Frutti di mare (ackee saltfish, conch, flying fish)
  | 'street_food'      // Street food (doubles, patties, arepas)
  | 'soups_stews'      // Zuppe e stufati (sancocho, pepperpot, callaloo)
  | 'sides'            // Contorni (plantains, bammy, festival)
  | 'breakfast'        // Colazione (mangu, ackee, saltfish)
  | 'desserts'         // Dolci (rum cake, coconut drops, flan)
  | 'beverages';       // Bevande (sorrel, mauby, sea moss)

export type CaribbeanOrigin =
  | 'jamaica'
  | 'cuba'
  | 'puerto_rico'
  | 'dominican_republic'
  | 'haiti'
  | 'trinidad_tobago'
  | 'barbados'
  | 'bahamas'
  | 'martinique'
  | 'guadeloupe'
  | 'curacao'
  | 'aruba'
  | 'us_virgin_islands'
  | 'cayman_islands'
  | 'grenada'
  | 'st_lucia'
  | 'antigua_barbuda'
  | 'pan_caribbean';   // Piatti comuni a più isole

export type CaribbeanStatus = 'active' | 'popular' | 'signature' | 'traditional' | 'street';

export type ProteinType =
  | 'chicken'
  | 'pork'
  | 'beef'
  | 'goat'
  | 'fish'
  | 'seafood'
  | 'vegetarian'
  | 'vegan';

export type CookingMethod =
  | 'jerk'           // Affumicato con spezie jerk
  | 'stewed'         // Stufato
  | 'fried'          // Fritto
  | 'grilled'        // Grigliato
  | 'roasted'        // Arrosto
  | 'braised'        // Brasato
  | 'steamed'        // Al vapore
  | 'curried'        // Al curry
  | 'escovitch'      // Marinato in aceto e spezie
  | 'pickled';       // Sottaceto

export interface CaribbeanItem {
  id: string;                           // CAR_{ORIGIN}_{NAME}
  slug: string;
  name: string;
  local_name?: string;                  // Nome locale (es. "Griot", "Mofongo")
  description: string;
  category: CaribbeanCategory;
  origin: CaribbeanOrigin;
  status: CaribbeanStatus;

  // Cooking
  protein_type?: ProteinType;
  cooking_method?: CookingMethod;
  is_spicy: boolean;
  spice_level: number;                  // 0-5

  // Serving
  serving_size_g?: number;
  calories_per_serving?: number;

  // Dietary
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_halal: boolean;
  is_kosher: boolean;
  allergens: string[];

  // Ingredients
  ingredient_ids: string[];

  // Metadata
  tags: string[];
  popularity: number;                   // 0-100

  // Timestamps (handled by DB)
  created_at?: string;
  updated_at?: string;
}

// Helper per generare ID
export const generateCaribbeanId = (origin: CaribbeanOrigin, name: string): string => {
  const originPrefix: Record<CaribbeanOrigin, string> = {
    jamaica: 'JAM',
    cuba: 'CUB',
    puerto_rico: 'PRI',
    dominican_republic: 'DOM',
    haiti: 'HTI',
    trinidad_tobago: 'TRI',
    barbados: 'BAR',
    bahamas: 'BAH',
    martinique: 'MAR',
    guadeloupe: 'GUA',
    curacao: 'CUR',
    aruba: 'ARU',
    us_virgin_islands: 'USV',
    cayman_islands: 'CAY',
    grenada: 'GRE',
    st_lucia: 'STL',
    antigua_barbuda: 'ANT',
    pan_caribbean: 'PAN'
  };

  const cleanName = name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  return `CAR_${originPrefix[origin]}_${cleanName}`;
};
