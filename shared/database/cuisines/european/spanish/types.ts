// ============================================
// SPANISH CUISINE - Type Definitions
// GUDBRO Database Standards v1.3
// ============================================

/**
 * Spanish cuisine categories:
 * - tapas: Small plates and appetizers (Patatas Bravas, Gambas al Ajillo)
 * - rice: Paella and rice dishes (Paella Valenciana, Arroz Negro)
 * - seafood: Fish and shellfish dishes (Pulpo a la Gallega, Bacalao)
 * - meat: Meat dishes (Cochinillo, Chuletón)
 * - soup: Soups and stews (Gazpacho, Cocido Madrileño)
 * - egg: Egg dishes (Tortilla Española, Huevos Rotos)
 * - cured: Cured meats and cheese (Jamón Ibérico, Manchego)
 * - dessert: Desserts (Churros, Crema Catalana, Turrón)
 * - sandwich: Bocadillos and montaditos
 */
export type SpanishCategory =
  | 'tapas'
  | 'rice'
  | 'seafood'
  | 'meat'
  | 'soup'
  | 'egg'
  | 'cured'
  | 'dessert'
  | 'sandwich';

export interface SpanishDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: SpanishCategory;
  region: string | null; // Catalonia, Valencia, Basque Country, Andalusia, etc.
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

// Spanish regions for origin tracking
export const SPANISH_REGIONS = [
  'Valencia',
  'Catalonia',
  'Basque Country',
  'Andalusia',
  'Galicia',
  'Castile',
  'Madrid',
  'Asturias',
  'Aragon',
  'Balearic Islands'
] as const;
