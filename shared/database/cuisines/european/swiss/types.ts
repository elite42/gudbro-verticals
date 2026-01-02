// Swiss Cuisine Types
// GUDBRO Database Standards v1.7

export interface SwissDish {
  id: string;
  slug: string;
  name: string;
  local_name: string | null;
  description: string;
  category: 'cheese_dishes' | 'mains' | 'soups' | 'sides' | 'sausages' | 'desserts' | 'pastries' | 'breakfast';
  region: 'nationwide' | 'zurich' | 'bern' | 'valais' | 'graubunden' | 'vaud' | 'ticino' | 'basel' | 'central' | 'geneva';
  status: 'classic' | 'traditional' | 'popular' | 'regional';
  protein_type: string | null;
  cooking_method: string | null;
  prep_time_min: number;
  spice_level: number;
  price_default: number;
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
}

export const SWISS_CATEGORIES = [
  'cheese_dishes',  // Fondue, Raclette
  'mains',          // Geschnetzeltes, Cordon Bleu
  'soups',          // Bündner Gerstensuppe
  'sides',          // Rösti, Spätzle
  'sausages',       // Cervelat, Bratwurst
  'desserts',       // Cakes, tarts
  'pastries',       // Leckerli, cookies
  'breakfast'       // Birchermüesli
] as const;

export const SWISS_REGIONS = [
  'nationwide',
  'zurich',
  'bern',
  'valais',
  'graubunden',
  'vaud',
  'ticino',
  'basel',
  'central',
  'geneva'
] as const;
