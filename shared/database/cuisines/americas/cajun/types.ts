// Cajun/Creole Cuisine Types
// Louisiana regional cuisine - both rural Cajun and urban Creole traditions

export type CajunCategory =
  | 'cajun'           // Rural Acadian tradition - rustic, no tomato
  | 'creole'          // Urban New Orleans - refined, with tomato
  | 'seafood'         // Crawfish, shrimp, oysters, crab
  | 'rice'            // Jambalaya, dirty rice, red beans
  | 'soup_stew'       // Gumbo, bisque, étouffée
  | 'meat'            // Boudin, tasso, smoked meats
  | 'fried'           // Fried catfish, beignets
  | 'bread'           // French bread, cornbread
  | 'dessert'         // Beignets, pralines, king cake
  | 'beverage';       // Chicory coffee, hurricanes

export type CajunStatus =
  | 'iconic'          // Gumbo, Jambalaya, Beignets
  | 'classic'         // Étouffée, Po'boy, Red Beans
  | 'traditional'     // Boudin, Tasso, Crawfish Boil
  | 'regional';       // Local specialties

export type CajunProtein =
  | 'crawfish'        // Mudbugs - Louisiana staple
  | 'shrimp'          // Gulf shrimp
  | 'crab'            // Blue crab
  | 'oyster'          // Gulf oysters
  | 'catfish'         // Mississippi catfish
  | 'alligator'       // Swamp specialty
  | 'chicken'         // Chicken gumbo, etc
  | 'pork'            // Boudin, tasso, andouille
  | 'beef'            // Grillades, debris
  | 'sausage'         // Andouille
  | 'mixed'           // Combo proteins
  | null;             // Vegetarian

export interface DietaryInfo {
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
}

export interface Ingredient {
  id: string;
  role: 'main' | 'secondary' | 'seasoning' | 'garnish';
  quantity_amount: number;
  quantity_unit: string;
  is_optional: boolean;
}

export interface CajunDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CajunCategory;
  status: CajunStatus;
  origin: 'cajun' | 'creole' | 'both';  // Distinguish tradition
  protein_type: CajunProtein;
  cooking_method: string;
  prep_time_min: number;
  spice_level: number;  // 0-3, Louisiana loves heat
  dietary: DietaryInfo;
  allergens: string[];
  tags: string[];
  popularity: number;
  ingredients: Ingredient[];
}
