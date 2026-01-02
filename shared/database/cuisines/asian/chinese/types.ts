// Chinese Database Types
// DATABASE-STANDARDS v1.1 compliant

export interface ChineseItem {
  // IDENTIFICATION
  id: string;
  slug: string;

  // INFO BASE (English only)
  name: string;
  description: string;
  chinese_name?: string;      // Pinyin romanization
  chinese_script?: string;    // Chinese characters (汉字)

  // CLASSIFICATION
  category: ChineseCategory;
  status: ChineseStatus;

  // CHINESE-SPECIFIC
  region: ChineseRegion;
  cuisine_style: ChineseCuisineStyle;
  protein_type: ChineseProteinType;
  cooking_method: ChineseCookingMethod;
  is_street_food: boolean;
  is_dim_sum: boolean;

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
  popularity: number;
}

export type ChineseCategory =
  | 'stir_fries'
  | 'noodles'
  | 'rice_dishes'
  | 'soups'
  | 'dim_sum'
  | 'roasted'
  | 'steamed'
  | 'braised'
  | 'appetizers'
  | 'desserts';

export type ChineseStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal'
  | 'premium'
  | 'street_food';

export type ChineseRegion =
  | 'cantonese'      // Guangdong - dim sum, roasted meats
  | 'sichuan'        // Spicy, numbing (mala)
  | 'hunan'          // Spicy, sour
  | 'shandong'       // Northern, seafood
  | 'jiangsu'        // Shanghai, sweet
  | 'fujian'         // Coastal, soups
  | 'anhui'          // Wild herbs, braising
  | 'zhejiang'       // Hangzhou, fresh
  | 'beijing'        // Imperial, roast duck
  | 'northeastern'   // Hearty, preserved
  | 'xinjiang'       // Muslim Chinese
  | 'hakka'          // Client people cuisine
  | 'taiwanese'      // Island fusion
  | 'hong_kong'      // Cantonese fusion
  | 'international'; // Westernized Chinese

export type ChineseCuisineStyle =
  | 'cantonese'
  | 'sichuan'
  | 'hunan'
  | 'shanghai'
  | 'beijing'
  | 'hakka'
  | 'chaozhou'
  | 'dim_sum'
  | 'american_chinese'
  | 'fusion';

export type ChineseProteinType =
  | 'chicken'
  | 'pork'
  | 'beef'
  | 'duck'
  | 'lamb'
  | 'shrimp'
  | 'fish'
  | 'squid'
  | 'crab'
  | 'lobster'
  | 'mixed_seafood'
  | 'tofu'
  | 'vegetables'
  | 'egg'
  | 'mixed';

export type ChineseCookingMethod =
  | 'stir_fried'
  | 'deep_fried'
  | 'steamed'
  | 'braised'
  | 'roasted'
  | 'boiled'
  | 'smoked'
  | 'clay_pot'
  | 'hot_pot'
  | 'raw';
