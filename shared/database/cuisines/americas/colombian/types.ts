// Colombian Cuisine Types
// GUDBRO Database Standards v1.7

export type ColombianCategory =
  | 'soup'           // Sancocho, Ajiaco, Mondongo
  | 'main'           // Bandeja Paisa, Lechona, Sudados
  | 'breakfast'      // Calentado, Huevos Pericos, Changua
  | 'street_food'    // Arepas, Empanadas, Patacones
  | 'seafood'        // Coastal dishes
  | 'dessert'        // Arequipe, Obleas, Natilla
  | 'beverage';      // Aguapanela, Jugos, Chicha

export type ColombianStatus = 'iconic' | 'classic' | 'traditional' | 'regional';

export type ColombianRegion =
  | 'Bogotá'         // Capital, Andean cuisine
  | 'Antioquia'      // Medellín, Bandeja Paisa
  | 'Valle del Cauca' // Cali, Chontaduro
  | 'Costa Caribe'   // Cartagena, Barranquilla
  | 'Santander'      // Hormigas culonas, Mute
  | 'Tolima'         // Lechona, Tamales
  | 'Boyacá'         // Cuchuco, Mazamorra
  | 'Nacional';      // Found throughout

export interface ColombianDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ColombianCategory;
  status: ColombianStatus;
  region: ColombianRegion;
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
