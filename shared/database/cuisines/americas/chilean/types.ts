// Chilean Cuisine Types
// GUDBRO Database Standards v1.7

export type ChileanCategory =
  | 'empanada'       // Empanadas de pino, queso, mariscos
  | 'main'           // Pastel de choclo, cazuela, curanto
  | 'soup'           // Caldillo, cazuela as soup
  | 'seafood'        // Ceviche, machas, locos
  | 'street_food'    // Completo, sopaipillas, anticuchos
  | 'appetizer'      // Pebre, choritos, machas
  | 'dessert'        // Mote con huesillo, alfajor, leche asada
  | 'beverage';      // Pisco sour, mote, cola de mono

export type ChileanStatus = 'iconic' | 'classic' | 'traditional' | 'regional';

export type ChileanRegion =
  | 'Santiago'       // Central, capital
  | 'Valparaíso'     // Coastal, port city
  | 'Chiloé'         // Island, curanto, milcao
  | 'Norte'          // Atacama, Pisco region
  | 'Sur'            // Patagonia, lamb, salmon
  | 'Centro'         // Wine country, Valle Central
  | 'Nacional';      // Found throughout

export interface ChileanDish {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ChileanCategory;
  status: ChileanStatus;
  region: ChileanRegion;
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
