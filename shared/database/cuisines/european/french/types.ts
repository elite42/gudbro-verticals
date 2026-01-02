// ============================================
// FRENCH CUISINE - Type Definitions
// GUDBRO Database Standards v1.3
// ============================================

/**
 * French cuisine categories:
 * - appetizer: Starters and hors d'oeuvres (Soupe à l'Oignon, Pâté, Terrine)
 * - main: Plats principaux (Coq au Vin, Boeuf Bourguignon, Duck Confit)
 * - seafood: Fish and shellfish (Moules Marinières, Sole Meunière)
 * - bistro: Classic bistro fare (Steak Frites, Croque Monsieur)
 * - regional: Regional specialties (Cassoulet, Choucroute, Bouillabaisse)
 * - sauce: Classic French sauces (not in existing sauces table)
 * - cheese: Cheese courses and preparations
 * - pastry: Viennoiseries and baked goods (not in bakery)
 */
export type FrenchCategory =
  | 'appetizer'
  | 'main'
  | 'seafood'
  | 'bistro'
  | 'regional'
  | 'sauce'
  | 'cheese'
  | 'pastry';

export interface FrenchDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: FrenchCategory;
  region: string | null; // Provence, Burgundy, Alsace, Brittany, etc.
  price_default: number;
  is_available: boolean;
  prep_time_min: number;
  spice_level: number;
  is_traditional: boolean;
  allergens: { type: string }[];
  intolerances: { type: string }[];
  dietary: {
    is_vegan: boolean;
    is_vegetarian: boolean;
  };
  tags: string[];
  image_url: string | null;
}

// French regions for origin tracking
export const FRENCH_REGIONS = [
  'Provence',
  'Burgundy',
  'Alsace',
  'Brittany',
  'Normandy',
  'Loire Valley',
  'Lyon',
  'Paris',
  'Bordeaux',
  'Languedoc',
  'Basque Country',
  'Périgord'
] as const;
