/**
 * German Cuisine Database Types
 *
 * Categories based on German culinary traditions:
 * - sausages: Bratwurst, Weisswurst, Currywurst, etc.
 * - mains: Schnitzel, Sauerbraten, Schweinshaxe, etc.
 * - sides: Spätzle, Kartoffelpuffer, Sauerkraut, etc.
 * - soups: Kartoffelsuppe, Erbsensuppe, etc.
 * - baked: Brezel, Brötchen, etc.
 * - desserts: Schwarzwälder Kirschtorte, Apfelstrudel, etc.
 */

export type GermanCategory =
  | 'sausages'    // Würste - German sausages
  | 'mains'       // Hauptgerichte - Main dishes
  | 'sides'       // Beilagen - Side dishes
  | 'soups'       // Suppen - Soups
  | 'baked'       // Backwaren - Baked goods
  | 'desserts';   // Nachspeisen - Desserts

export type GermanRegion =
  | 'bavaria'       // Bayern
  | 'swabia'        // Schwaben
  | 'rhineland'     // Rheinland
  | 'berlin'        // Berlin
  | 'saxony'        // Sachsen
  | 'thuringia'     // Thüringen
  | 'franconia'     // Franken
  | 'nationwide';   // Nationwide/All regions

export type GermanStatus = 'active' | 'classic' | 'regional' | 'seasonal';

export interface GermanItem {
  id: string;                     // GER_{NAME}
  slug: string;                   // lowercase-hyphens
  name: string;                   // English name
  german_name: string;            // Original German name
  description: string;            // English description
  category: GermanCategory;
  region: GermanRegion;
  status: GermanStatus;

  // Ingredients
  ingredient_ids: string[];       // ING_* references

  // Dietary & Allergens (Sistema 5 Dimensioni)
  allergens: string[];
  dietary: {
    is_vegetarian: boolean;
    is_vegan: boolean;
    is_gluten_free: boolean;
    is_dairy_free: boolean;
    is_halal: boolean;
    is_kosher: boolean;
  };

  // Characteristics
  spice_level: 0 | 1 | 2 | 3 | 4 | 5;
  serving_temp: 'hot' | 'warm' | 'cold' | 'room_temp';
  preparation_time_min: number;

  // Popularity & Pricing
  popularity: number;             // 0-100
  price_category: 'budget' | 'moderate' | 'premium';

  // Metadata
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}
