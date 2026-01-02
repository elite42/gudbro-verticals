// ============================================
// MEXICAN Types - GUDBRO Database Standards v1.1
// ============================================

/**
 * Mexican dish categories
 * Based on traditional Mexican cuisine structure
 */
export type MexicanCategory =
  | 'tacos'           // Tacos - all varieties
  | 'burritos'        // Burritos and wraps
  | 'enchiladas'      // Enchiladas and similar
  | 'antojitos'       // Street food: quesadillas, tostadas, sopes, gorditas, flautas
  | 'main_dishes'     // Moles, chiles rellenos, carnitas, etc.
  | 'sides_salsas';   // Guacamole, rice, beans, salsas

/**
 * Standard status values (DATABASE-STANDARDS v1.1)
 */
export type MexicanStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal'
  | 'premium'
  | 'traditional';

/**
 * Mexican regional styles
 */
export type MexicanRegion =
  | 'northern'        // Sonora, Chihuahua - beef, flour tortillas
  | 'central'         // Mexico City, Puebla - moles, antojitos
  | 'yucatan'         // Yucatan Peninsula - Mayan influence
  | 'oaxaca'          // Oaxacan specialties - 7 moles
  | 'coastal'         // Veracruz, Sinaloa - seafood
  | 'western'         // Jalisco, Michoacán - birria, carnitas
  | 'tex_mex'         // Tex-Mex fusion
  | 'international';  // International adaptations

/**
 * Protein types commonly used in Mexican cuisine
 */
export type MexicanProtein =
  | 'beef'            // Carne asada, barbacoa
  | 'pork'            // Carnitas, al pastor, cochinita pibil
  | 'chicken'         // Pollo
  | 'fish'            // Pescado
  | 'shrimp'          // Camarones
  | 'chorizo'         // Mexican sausage
  | 'goat'            // Cabrito, birria
  | 'cheese'          // Queso
  | 'beans'           // Frijoles
  | 'vegetarian'      // Vegetales
  | 'mixed';          // Multiple proteins

/**
 * Tortilla types
 */
export type TortillaType =
  | 'corn'
  | 'flour'
  | 'none';

/**
 * Mexican dish interface
 * Follows DATABASE-STANDARDS v1.1
 */
export interface MexicanItem {
  // IDENTIFICATION
  id: string;                     // MEX_{NAME} format
  slug: string;                   // lowercase-hyphens

  // INFO BASE (English only - translations in separate table)
  name: string;                   // English, Title Case
  description: string;            // English description
  spanish_name?: string;          // Original Spanish name

  // CLASSIFICATION
  category: MexicanCategory;
  status: MexicanStatus;

  // MEXICAN-SPECIFIC
  region: MexicanRegion;
  protein_type: MexicanProtein;
  tortilla_type: TortillaType;
  is_street_food: boolean;        // Antojito/street food style

  // COOKING
  cooking_method?: string;        // grilled, braised, fried, etc.
  heat_source?: string;           // comal, grill, oven, etc.

  // INGREDIENTS
  ingredient_ids: string[];       // ING_* references

  // SISTEMA 5 DIMENSIONI - ALLERGENS
  allergens: string[];

  // SISTEMA 5 DIMENSIONI - DIETARY FLAGS
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;
  is_kosher: boolean;

  // SISTEMA 5 DIMENSIONI - NUTRITION
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;

  // SISTEMA 5 DIMENSIONI - SPICE (0-5)
  spice_level: number;

  // METADATA
  tags: string[];
  popularity: number;             // 0-100

  // TIMESTAMPS (auto-managed)
  created_at?: string;
  updated_at?: string;
}
