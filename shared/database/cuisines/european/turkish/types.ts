// Turkish Cuisine Database Types
// Standard v1.1 compliant

export type TurkishCategory =
  | 'kebabs'           // Kebab varieties (doner, shish, adana, iskender)
  | 'pide_lahmacun'    // Turkish flatbreads and pizzas
  | 'mezes'            // Cold and hot appetizers
  | 'soups'            // Corbalar (lentil, yogurt, tripe)
  | 'rice_pilav'       // Pilav and rice dishes
  | 'borek'            // Filled pastries
  | 'dolma_sarma'      // Stuffed vegetables and grape leaves
  | 'seafood'          // Fish and seafood dishes
  | 'stews'            // Güveç and slow-cooked dishes
  | 'desserts';        // Baklava, lokum, künefe, etc.

export type TurkishRegion =
  | 'istanbul'         // Istanbul specialties
  | 'southeastern'     // Gaziantep, Urfa, Adana - kebab heartland
  | 'aegean'           // Izmir, olive oil dishes
  | 'black_sea'        // Trabzon, corn and fish
  | 'central_anatolia' // Ankara, Konya - classic dishes
  | 'mediterranean'    // Antalya, Mersin
  | 'marmara'          // Bursa - Iskender kebab
  | 'eastern'          // Van, Erzurum
  | 'national';        // Found throughout Turkey

export type TurkishStatus =
  | 'active'
  | 'signature'        // Iconic Turkish dishes
  | 'popular'
  | 'classic'
  | 'traditional'
  | 'regional'
  | 'street_food';

export type TurkishProtein =
  | 'lamb'
  | 'beef'
  | 'chicken'
  | 'mixed_meat'       // Lamb + beef
  | 'fish'
  | 'seafood'
  | 'vegetarian'
  | 'vegan'
  | 'none';

export type TurkishCookingMethod =
  | 'grilled'          // Izgara
  | 'roasted'          // Firinda
  | 'fried'            // Kizartma
  | 'stewed'           // Yahni, güveç
  | 'baked'            // Borek, pide
  | 'steamed'
  | 'raw'
  | 'braised'
  | 'spit_roasted';    // Döner, çevirme

export interface TurkishItem {
  id: string;
  slug: string;
  name: string;
  description: string;

  // Turkish naming
  turkish_name: string;          // Native Turkish name

  // Classification
  category: TurkishCategory;
  status: TurkishStatus;
  region: TurkishRegion;
  protein_type: TurkishProtein;
  cooking_method: TurkishCookingMethod;

  // Turkish-specific flags
  is_street_food: boolean;
  is_meze: boolean;              // Served as appetizer/sharing plate
  is_breakfast_item: boolean;    // Kahvalti item
  served_hot: boolean;

  // Sistema 5 Dimensioni
  allergens: string[];
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;             // Most Turkish food is halal

  // Nutrition
  calories_per_serving: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  spice_level: number;           // 0-5

  // Metadata
  tags: string[];
  popularity: number;            // 0-100
}
