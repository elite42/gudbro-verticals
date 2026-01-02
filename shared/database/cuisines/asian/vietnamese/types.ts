/**
 * GUDBRO Vietnamese Database - Type Definitions
 *
 * DATABASE-STANDARDS v1.1 compliant
 * Sistema 5 Dimensioni integrated
 *
 * Special features:
 * - vietnamese_name: Vietnamese with diacritics (Phở Bò)
 * - cuisine_influences: Track cross-cultural connections
 * - origin_countries: For dishes with multiple origins
 */

// =============================================================================
// ENUMS AS CONST (for TypeScript, will be TEXT+CHECK in SQL)
// =============================================================================

export const VIETNAMESE_CATEGORIES = [
  'pho',              // Phở varieties
  'bun',              // Rice vermicelli dishes (Bún)
  'com',              // Rice dishes (Cơm)
  'mi',               // Wheat/egg noodles (Mì)
  'banh',             // Cakes, bread, pastries (Bánh)
  'goi_cuon',         // Fresh rolls and wraps
  'chao',             // Congee/porridge (Cháo)
  'lau',              // Hot pot (Lẩu)
  'nuong',            // Grilled dishes (Nướng)
  'xao',              // Stir-fried dishes (Xào)
  'kho',              // Braised/caramelized dishes (Kho)
  'hap',              // Steamed dishes (Hấp)
  'chien',            // Fried dishes (Chiên)
  'goi',              // Salads (Gỏi)
  'che',              // Sweet desserts (Chè)
  'do_uong',          // Beverages (Đồ uống)
] as const;

export const VIETNAMESE_REGIONS = [
  'northern',         // Miền Bắc - Hanoi style
  'central',          // Miền Trung - Hue, Da Nang
  'southern',         // Miền Nam - Saigon style
  'mekong_delta',     // Đồng bằng sông Cửu Long
  'highlands',        // Tây Nguyên - Central Highlands
  'coastal',          // Ven biển - Coastal regions
  'national',         // Toàn quốc - Found everywhere
  'international',    // Việt kiều - Overseas Vietnamese
] as const;

export const VIETNAMESE_MEAL_TYPES = [
  'breakfast',        // Điểm tâm
  'lunch',            // Bữa trưa
  'dinner',           // Bữa tối
  'snack',            // Ăn vặt
  'street_food',      // Ăn đường phố
  'banquet',          // Tiệc
  'any_time',         // Bất cứ lúc nào
] as const;

export const CUISINE_INFLUENCES = [
  'chinese',          // Ảnh hưởng Trung Hoa
  'french_colonial',  // Ảnh hưởng Pháp thuộc địa
  'khmer',            // Ảnh hưởng Khmer/Cambodia
  'cham',             // Ảnh hưởng Chăm
  'thai',             // Ảnh hưởng Thái Lan
  'indian',           // Ảnh hưởng Ấn Độ
  'japanese',         // Ảnh hưởng Nhật Bản
  'american',         // Ảnh hưởng Mỹ (Việt kiều)
  'fusion',           // Fusion hiện đại
  'indigenous',       // Bản địa thuần túy
] as const;

export const PROTEIN_TYPES = [
  'beef',             // Bò
  'pork',             // Heo
  'chicken',          // Gà
  'duck',             // Vịt
  'shrimp',           // Tôm
  'fish',             // Cá
  'squid',            // Mực
  'crab',             // Cua
  'mixed_seafood',    // Hải sản tổng hợp
  'tofu',             // Đậu phụ
  'vegetables',       // Rau củ
  'egg',              // Trứng
  'mixed',            // Tổng hợp
  'none',             // Không có
] as const;

export const COOKING_METHODS = [
  'boiled',           // Luộc
  'simmered',         // Ninh/Hầm
  'grilled',          // Nướng
  'stir_fried',       // Xào
  'deep_fried',       // Chiên
  'steamed',          // Hấp
  'braised',          // Kho
  'raw',              // Sống/Gỏi
  'wrapped',          // Cuốn
  'hot_pot',          // Lẩu
  'baked',            // Nướng lò
] as const;

export const BROTH_TYPES = [
  'beef_bone',        // Xương bò
  'pork_bone',        // Xương heo
  'chicken',          // Gà
  'seafood',          // Hải sản
  'vegetable',        // Rau củ
  'mixed',            // Tổng hợp
  'none',             // Không có nước dùng
] as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type VietnameseCategory = typeof VIETNAMESE_CATEGORIES[number];
export type VietnameseRegion = typeof VIETNAMESE_REGIONS[number];
export type VietnameseMealType = typeof VIETNAMESE_MEAL_TYPES[number];
export type CuisineInfluence = typeof CUISINE_INFLUENCES[number];
export type ProteinType = typeof PROTEIN_TYPES[number];
export type CookingMethod = typeof COOKING_METHODS[number];
export type BrothType = typeof BROTH_TYPES[number];

// =============================================================================
// MAIN INTERFACE
// =============================================================================

export interface VietnameseItem {
  // IDENTIFICATION
  id: string;                           // VIETNAMESE_PHO_BO
  slug: string;                         // pho-bo

  // INFO BASE (English)
  name: string;                         // Beef Pho
  description: string;                  // Vietnam's iconic beef noodle soup...
  vietnamese_name: string;              // Phở Bò (with diacritics)

  // CLASSIFICATION
  category: VietnameseCategory;
  status: 'active' | 'classic' | 'popular' | 'signature' | 'street_food' | 'regional' | 'premium';

  // ORIGIN & INFLUENCES (NEW!)
  region: VietnameseRegion;
  origin_city?: string;                 // Hanoi, Hue, Saigon, etc.
  cuisine_influences: CuisineInfluence[]; // ['chinese', 'french_colonial']
  is_fusion: boolean;                   // true for modern fusion dishes

  // VIETNAMESE-SPECIFIC
  protein_type: ProteinType;
  cooking_method: CookingMethod;
  broth_type: BrothType;
  meal_types: VietnameseMealType[];
  is_street_food: boolean;
  is_vegetarian_adaptable: boolean;     // Can be made vegetarian

  // INGREDIENTS
  ingredient_ids: string[];

  // SISTEMA 5 DIMENSIONI - ALLERGENS
  allergens: string[];

  // SISTEMA 5 DIMENSIONI - DIETARY FLAGS
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;
  is_pescatarian: boolean;

  // SISTEMA 5 DIMENSIONI - NUTRITION
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;

  // SISTEMA 5 DIMENSIONI - SPICE (0-5)
  spice_level: number;

  // METADATA
  tags: string[];
  popularity: number;                   // 0-100
}

// =============================================================================
// EXPORTS
// =============================================================================

export default VietnameseItem;
