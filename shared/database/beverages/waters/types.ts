// ============================================
// WATERS Types - GUDBRO Database Standards v1.3
// ============================================

export type WaterCategory =
  | 'still_natural'      // Natural still mineral waters
  | 'sparkling_natural'  // Naturally carbonated
  | 'sparkling_added'    // Carbonation added
  | 'mineral_rich'       // High TDS (>500mg/L)
  | 'low_mineral'        // Low TDS (<100mg/L)
  | 'alkaline'           // pH > 8.0
  | 'flavored';          // Zero-calorie flavored waters

export type WaterStatus =
  | 'active'
  | 'premium'
  | 'luxury'
  | 'classic'
  | 'popular';

export type CarbonationType =
  | 'none'
  | 'natural'
  | 'added';

export type SourceType =
  | 'spring'
  | 'artesian'
  | 'glacier'
  | 'volcanic'
  | 'mineral'
  | 'iceberg'
  | 'well';

export type BottleType =
  | 'glass'
  | 'pet'
  | 'can'
  | 'aluminum';

export interface WaterItem {
  // IDENTIFICATION
  id: string;                     // WTR_{NAME}
  slug: string;                   // lowercase-hyphens
  name: string;                   // English, Title Case
  description: string;            // English

  // CLASSIFICATION
  category: WaterCategory;
  status: WaterStatus;
  brand: string;

  // WATER PROPERTIES
  carbonation: CarbonationType;
  source_type: SourceType;
  tds_mg_l: number | null;        // Total Dissolved Solids (residuo fisso)
  ph_level: number | null;        // pH (6.0-9.5)

  // SERVING
  serving_size_ml: number;
  bottle_types: BottleType[];
  serving_temp_c?: number;        // Recommended serving temperature

  // MINERALS (mg/L)
  calcium_mg_l?: number;
  magnesium_mg_l?: number;
  sodium_mg_l?: number;
  potassium_mg_l?: number;
  bicarbonate_mg_l?: number;
  silica_mg_l?: number;

  // FLAVOR (for flavored waters)
  flavor?: string;
  has_real_fruit?: boolean;

  // NUTRITIONAL
  calories_per_serving: number;   // Usually 0, except some flavored
  sugar_g: number;                // Usually 0

  // DIETARY FLAGS (all waters are naturally compliant)
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;
  is_kosher: boolean;

  // METADATA
  tags: string[];
  popularity: number;             // 0-100
  origin_country: string;
  origin_region?: string;
}
