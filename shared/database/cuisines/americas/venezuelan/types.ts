// Venezuelan Cuisine Types
// GUDBRO Database Standards v1.7

export type VenezuelanCategory =
  | 'arepa'          // Arepas and variations
  | 'main'           // Pabellón, Asado Negro
  | 'soup'           // Hervido, Mondongo
  | 'street_food'    // Cachapas, Tequeños, Empanadas
  | 'seafood'        // Coastal dishes
  | 'dessert'        // Quesillo, Bienmesabe
  | 'beverage';      // Chicha, Papelón con Limón

export type VenezuelanStatus = 'iconic' | 'classic' | 'traditional' | 'regional';

export type VenezuelanRegion =
  | 'Caracas'        // Capital
  | 'Zulia'          // Maracaibo, patacones
  | 'Andes'          // Mérida, Táchira
  | 'Llanos'         // Plains, llanera cuisine
  | 'Costa'          // Coastal regions
  | 'Oriente'        // Eastern Venezuela
  | 'Nacional';      // Found throughout

export interface VenezuelanDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: VenezuelanCategory;
  status: VenezuelanStatus;
  region: VenezuelanRegion;
  protein_type?: string;
  cooking_method?: string;
  prep_time_min?: number;
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
