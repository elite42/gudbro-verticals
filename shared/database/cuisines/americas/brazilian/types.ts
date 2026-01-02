// ============================================
// Brazilian Cuisine Types - GUDBRO Database Standards v1.2
// ============================================

export type BrazilianCategory =
  | 'churrasco'        // Grilled meats (Picanha, Fraldinha, etc.)
  | 'feijoada'         // Bean stews and feijoada variations
  | 'street_food'      // Coxinha, Pastel, Acarajé, etc.
  | 'seafood'          // Moqueca, Vatapá, Bobó de Camarão
  | 'rice_beans'       // Arroz e Feijão, Baião de Dois
  | 'soups_stews'      // Caldo Verde, Canja, Mocotó
  | 'northeastern'     // Bahian and Northeastern specialties
  | 'desserts'         // Brigadeiro, Pudim, Açaí
  | 'snacks'           // Pão de Queijo, Tapioca, Empada
  | 'drinks';          // Caipirinha, Guaraná, Açaí na tigela

export type BrazilianStatus =
  | 'active'
  | 'signature'
  | 'popular'
  | 'classic'
  | 'traditional'
  | 'regional'
  | 'street_food';

export type BrazilianRegion =
  | 'national'         // Popular across Brazil
  | 'bahia'            // Bahian/Northeastern (Moqueca, Acarajé)
  | 'minas_gerais'     // Mineiro cuisine (Pão de Queijo, Tutu)
  | 'rio_grande_sul'   // Gaúcho (Churrasco, Chimarrão)
  | 'sao_paulo'        // Paulista (Pizza, Pastel)
  | 'rio_de_janeiro'   // Carioca (Feijoada, Biscoito Globo)
  | 'para'             // Amazonian (Tacacá, Pato no Tucupi)
  | 'pernambuco'       // Pernambucan (Bolo de Rolo, Cartola)
  | 'goias'            // Goiano (Empadão, Pequi dishes)
  | 'amazon';          // Amazonian cuisine

export type BrazilianProteinType =
  | 'beef'
  | 'pork'
  | 'chicken'
  | 'fish'
  | 'seafood'
  | 'mixed_meat'
  | 'vegetarian'
  | 'vegan'
  | 'none';

export type BrazilianCookingMethod =
  | 'grilled'
  | 'roasted'
  | 'fried'
  | 'stewed'
  | 'baked'
  | 'steamed'
  | 'raw'
  | 'braised'
  | 'smoked';

export interface BrazilianItem {
  // Identification
  id: string;                     // BRZ_{NAME}
  slug: string;                   // lowercase-hyphens

  // Info (English only)
  name: string;
  description: string;

  // Portuguese naming
  portuguese_name: string;

  // Classification
  category: BrazilianCategory;
  status: BrazilianStatus;
  region: BrazilianRegion;
  protein_type: BrazilianProteinType;
  cooking_method: BrazilianCookingMethod;

  // Brazilian-specific flags
  is_street_food: boolean;
  is_festive: boolean;           // Festa Junina, Carnival, etc.
  is_comfort_food: boolean;
  served_hot: boolean;

  // Sistema 5 Dimensioni - Allergens
  allergens: string[];

  // Sistema 5 Dimensioni - Dietary
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;

  // Sistema 5 Dimensioni - Nutrition
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;

  // Sistema 5 Dimensioni - Spice
  spice_level: number;            // 0-5

  // Metadata
  tags: string[];
  popularity: number;             // 0-100
}
