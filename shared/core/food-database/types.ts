/**
 * GUDBRO Food Database Types
 *
 * Centralized ingredient and recipe database for all GUDBRO merchants.
 * Provides smart menu building, dietary filters, and nutritional data.
 *
 * SISTEMA 51 FILTRI v2.0:
 * - 30 Allergens (EU 14 + Korea 7 + Japan 7 + GUDBRO 2)
 * - 10 Intolerances
 * - 11 Diets
 * - 5 Spice Levels
 *
 * This system provides:
 * - Multi-nation compliance (EU, USA, Korea, Japan, etc.)
 * - Auto-computation of allergens/intolerances from ingredients
 * - Safety-critical data for life-threatening allergies
 */

import type { MultiLangText } from '../translation-engine/types';

// ============================================================================
// SISTEMA 51 FILTRI - ALLERGENS (30 Total)
// ============================================================================

/**
 * EU 14 Mandatory Allergens
 * Based on EU Regulation 1169/2011
 */
export type AllergenEU =
  | 'gluten'           // Cereali contenenti glutine
  | 'crustaceans'      // Crostacei
  | 'eggs'             // Uova
  | 'fish'             // Pesce
  | 'peanuts'          // Arachidi
  | 'soybeans'         // Soia
  | 'milk'             // Latte (includes dairy)
  | 'tree_nuts'        // Frutta a guscio (noci, mandorle, nocciole, etc.)
  | 'celery'           // Sedano
  | 'mustard'          // Senape
  | 'sesame'           // Semi di sesamo
  | 'sulphites'        // Anidride solforosa e solfiti >10mg/kg
  | 'lupin'            // Lupini
  | 'molluscs';        // Molluschi

/**
 * Korea +7 Additional Allergens
 * Korean Food Sanitation Act
 */
export type AllergenKorea =
  | 'pork'             // 돼지고기 (Maiale)
  | 'peach'            // 복숭아 (Pesca)
  | 'tomato'           // 토마토 (Pomodoro)
  | 'beef'             // 쇠고기 (Manzo)
  | 'chicken'          // 닭고기 (Pollo)
  | 'squid'            // 오징어 (Calamari)
  | 'pine_nuts';       // 잣 (Pinoli)

/**
 * Japan +7 Additional Allergens
 * Japanese Food Labeling Standards
 */
export type AllergenJapan =
  | 'kiwi'             // キウイ
  | 'banana'           // バナナ
  | 'mango'            // マンゴー
  | 'apple'            // りんご
  | 'orange'           // オレンジ
  | 'matsutake'        // まつたけ (Fungo matsutake)
  | 'yam';             // やまいも (Igname)

/**
 * GUDBRO +2 Custom Allergens
 * Asia-Pacific Focus - Common sensitivities
 */
export type AllergenGUDBRO =
  | 'coriander'        // Coriandolo (gene OR6A2 - 14% popolazione lo percepisce come sapone)
  | 'chili_pepper';    // Peperoncino (capsaicina - sensibilità comune)

/**
 * All 30 Allergens Combined
 * ⚠️ CRITICAL: These can cause life-threatening anaphylaxis
 */
export type Allergen = AllergenEU | AllergenKorea | AllergenJapan | AllergenGUDBRO;

/**
 * Allergen flags interface for ingredients
 */
export interface AllergenFlags {
  // EU 14 Mandatory
  gluten?: boolean;
  crustaceans?: boolean;
  eggs?: boolean;
  fish?: boolean;
  peanuts?: boolean;
  soybeans?: boolean;
  milk?: boolean;
  tree_nuts?: boolean;
  celery?: boolean;
  mustard?: boolean;
  sesame?: boolean;
  sulphites?: boolean;
  lupin?: boolean;
  molluscs?: boolean;

  // Korea +7
  pork?: boolean;
  peach?: boolean;
  tomato?: boolean;
  beef?: boolean;
  chicken?: boolean;
  squid?: boolean;
  pine_nuts?: boolean;

  // Japan +7
  kiwi?: boolean;
  banana?: boolean;
  mango?: boolean;
  apple?: boolean;
  orange?: boolean;
  matsutake?: boolean;
  yam?: boolean;

  // GUDBRO +2
  coriander?: boolean;
  chili_pepper?: boolean;
}

// ============================================================================
// SISTEMA 51 FILTRI - INTOLERANCES (10 Total)
// ============================================================================

/**
 * Food Intolerances
 * ℹ️ Different from allergies - digestive/metabolic reactions, not immune
 * Severity depends on quantity consumed
 */
export type Intolerance =
  | 'lactose'                  // Intolleranza al lattosio (87.8% Asia, 65% mondo)
  | 'gluten_sensitivity'       // Sensibilità al glutine non celiaca (diverso da celiachia)
  | 'fructose'                 // Intolleranza al fruttosio / malassorbimento
  | 'fodmap'                   // FODMAP (IBS - fermentabili oligo-di-mono-saccaridi e polioli)
  | 'msg'                      // Glutammato monosodico (E621) - "Chinese Restaurant Syndrome"
  | 'histamine'                // Istamina (alimenti fermentati, stagionati, vino rosso)
  | 'salicylates'              // Salicilati (spezie, frutta, aspirina naturale)
  | 'sulphites_intolerance'    // Solfiti sensibilità (diverso dall'allergia ai solfiti)
  | 'caffeine'                 // Sensibilità alla caffeina
  | 'alcohol';                 // Intolleranza all'alcol (deficit ALDH2)

/**
 * Intolerance flags interface
 */
export interface IntoleranceFlags {
  lactose?: boolean;
  gluten_sensitivity?: boolean;
  fructose?: boolean;
  fodmap?: boolean;
  msg?: boolean;
  histamine?: boolean;
  salicylates?: boolean;
  sulphites_intolerance?: boolean;
  caffeine?: boolean;
  alcohol?: boolean;
}

// ============================================================================
// SISTEMA 51 FILTRI - DIETARY RESTRICTIONS (11 Total)
// ============================================================================

/**
 * Dietary Restrictions
 * Includes religious, cultural, and lifestyle diets
 */
export type DietaryRestriction =
  // Religious/Cultural
  | 'buddhist'         // Buddhista - No 5 radici pungenti (aglio, cipolla, erba cipollina, porro, scalogno)
  | 'halal'            // Halal - Permesso secondo Islam
  | 'kosher'           // Kosher - Permesso secondo Ebraismo

  // Lifestyle
  | 'vegan'            // Vegano - No prodotti animali
  | 'vegetarian'       // Vegetariano - No carne, no pesce
  | 'pescatarian'      // Pescetariano - No carne, sì pesce

  // Health-based
  | 'gluten_free'      // Senza glutine (celiachia o sensibilità)
  | 'dairy_free'       // Senza latticini
  | 'nut_free'         // Senza frutta a guscio
  | 'low_carb'         // Basso contenuto carboidrati / Keto
  | 'low_fodmap';      // Dieta low-FODMAP per IBS

/**
 * Dietary restriction flags interface
 */
export interface DietaryFlags {
  // Religious/Cultural
  buddhist?: boolean;          // True = contains 5 pungent roots (NOT suitable)
  halal?: boolean;             // True = Halal compliant
  kosher?: boolean;            // True = Kosher compliant

  // Lifestyle
  vegan?: boolean;             // True = suitable for vegans
  vegetarian?: boolean;        // True = suitable for vegetarians
  pescatarian?: boolean;       // True = suitable for pescatarians

  // Health-based
  gluten_free?: boolean;       // True = gluten-free
  dairy_free?: boolean;        // True = dairy-free
  nut_free?: boolean;          // True = nut-free
  low_carb?: boolean;          // True = low-carb/keto friendly
  low_fodmap?: boolean;        // True = low-FODMAP friendly
}

/**
 * Extended dietary tags for recipe filtering
 */
export type DietaryTag =
  | DietaryRestriction
  | 'egg_free'
  | 'soy_free'
  | 'high_protein'
  | 'low_fat'
  | 'low_sodium'
  | 'sugar_free'
  | 'raw'
  | 'organic'
  | 'whole30'
  | 'paleo';

// ============================================================================
// SISTEMA 51 FILTRI - SPICE LEVELS (5 Levels)
// ============================================================================

/**
 * Spice Level (0-5)
 * 0 = None
 * 1 = Mild (lieve)
 * 2 = Medium (media)
 * 3 = Hot (forte)
 * 4 = Very Hot (molto forte)
 * 5 = Extreme (estremo)
 */
export type SpiceLevel = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Spice information with Scoville scale
 */
export interface SpiceInfo {
  level: SpiceLevel;
  scoville?: number;           // Scoville Heat Units (SHU)
  description?: MultiLangText; // Custom description
  source_ingredients?: string[]; // Which ingredients contribute spiciness
}

// ============================================================================
// COMPLIANCE - Multi-Nation Allergen Compliance
// ============================================================================

/**
 * Countries with specific allergen labeling requirements
 */
export type ComplianceCountry =
  | 'EU'           // European Union (14 allergens)
  | 'USA'          // United States (Big 9)
  | 'Korea'        // South Korea (21 allergens)
  | 'Japan'        // Japan (28 allergens)
  | 'Canada'       // Canada (Priority allergens)
  | 'Australia'    // Australia/NZ (FSANZ)
  | 'China'        // China (GB standards)
  | 'Singapore'    // Singapore (SFA)
  | 'Vietnam';     // Vietnam (local standards)

/**
 * Compliance status per country
 */
export interface ComplianceStatus {
  country: ComplianceCountry;
  compliant: boolean;
  allergens_declared: Allergen[];
  warnings?: string[];
}

// ============================================================================
// INGREDIENT CATEGORIES
// ============================================================================

/**
 * Ingredient categories
 */
export type IngredientCategory =
  | 'proteins'
  | 'dairy'
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'legumes'
  | 'nuts_seeds'
  | 'herbs_spices'
  | 'oils_fats'
  | 'sweeteners'
  | 'beverages'
  | 'coffee_tea'
  | 'alcohol'
  | 'condiments'
  | 'sauces'
  | 'baking'
  | 'frozen'
  | 'canned'
  | 'superfoods'
  | 'alliums'        // Garlic, onion, etc. (Buddhist restricted)
  | 'other';

// ============================================================================
// RECIPE CATEGORIES
// ============================================================================

/**
 * Recipe/Menu item categories
 */
export type RecipeCategory =
  // Beverages - Hot
  | 'hot_coffee'
  | 'espresso_based'
  | 'hot_tea'
  | 'hot_chocolate'

  // Beverages - Cold
  | 'iced_coffee'
  | 'iced_tea'
  | 'smoothies'
  | 'juices'
  | 'milkshakes'
  | 'boba_tea'

  // Beverages - Alcohol
  | 'cocktails'
  | 'mocktails'
  | 'wine'
  | 'beer'
  | 'spirits'
  | 'soft_drinks'

  // Food - Meals
  | 'breakfast'
  | 'brunch'
  | 'lunch'
  | 'dinner'
  | 'appetizers'
  | 'salads'
  | 'soups'
  | 'sandwiches'
  | 'burgers'
  | 'pasta'
  | 'rice_dishes'
  | 'noodles'
  | 'pizza'
  | 'main_courses'
  | 'sides'

  // Food - Sweets
  | 'desserts'
  | 'pastries'
  | 'cakes'
  | 'ice_cream'
  | 'snacks'

  // Food - Bowls & Healthy
  | 'poke_bowls'
  | 'acai_bowls'
  | 'grain_bowls'
  | 'wellness'

  // Special
  | 'kids_menu'
  | 'combo_meals'
  | 'specials'
  | 'seasonal';

// ============================================================================
// MEASUREMENT & REGIONS
// ============================================================================

/**
 * Measurement units
 */
export type MeasurementUnit =
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'tsp'
  | 'tbsp'
  | 'cup'
  | 'oz'
  | 'lb'
  | 'piece'
  | 'slice'
  | 'pinch'
  | 'dash'
  | 'shot'
  | 'to_taste';

/**
 * Seasons for ingredient availability
 */
export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'all_year';

/**
 * Regions for local ingredient sourcing
 */
export type Region =
  | 'vietnam'
  | 'thailand'
  | 'indonesia'
  | 'malaysia'
  | 'singapore'
  | 'philippines'
  | 'southeast_asia'
  | 'korea'
  | 'japan'
  | 'china'
  | 'east_asia'
  | 'india'
  | 'south_asia'
  | 'middle_east'
  | 'europe'
  | 'mediterranean'
  | 'americas'
  | 'australia'
  | 'global';

// ============================================================================
// NUTRITIONAL INFORMATION
// ============================================================================

/**
 * Nutritional information per 100g
 */
export interface NutritionalInfo {
  calories: number;
  protein: number;           // grams
  carbohydrates: number;     // grams
  sugar: number;             // grams
  fiber: number;             // grams
  fat: number;               // grams
  saturatedFat: number;      // grams
  sodium: number;            // mg
  cholesterol?: number;      // mg
  potassium?: number;        // mg

  // Micronutrients (optional, % daily value)
  vitaminA?: number;
  vitaminC?: number;
  vitaminD?: number;
  vitaminE?: number;
  vitaminK?: number;
  calcium?: number;
  iron?: number;
  magnesium?: number;
  zinc?: number;
}

/**
 * Seasonal availability for an ingredient
 */
export interface SeasonalAvailability {
  season: Season;
  regions: Region[];
  peakMonths?: number[];       // 1-12
  priceMultiplier?: number;    // 1.0 = normal, 1.5 = 50% more expensive
}

// ============================================================================
// MASTER INGREDIENT
// ============================================================================

/**
 * Master Ingredient - managed by GUDBRO
 * Contains all Sistema 51 Filtri data
 */
export interface MasterIngredient {
  id: string;
  slug: string;

  // Names (multi-language)
  name: MultiLangText;
  aliases?: MultiLangText[];   // Alternative names (e.g., "coriander" vs "cilantro")
  description?: MultiLangText;

  // Classification
  category: IngredientCategory;
  subcategory?: string;

  // ========== SISTEMA 51 FILTRI ==========

  // Allergens (30 types)
  allergens: AllergenFlags;

  // Intolerances (10 types)
  intolerances: IntoleranceFlags;

  // Dietary Restrictions (11 types)
  dietaryFlags: DietaryFlags;

  // Spice Level
  spice: SpiceInfo;

  // ========================================

  // Nutrition
  nutritionPer100g: NutritionalInfo;

  // Availability
  seasonalAvailability?: SeasonalAvailability[];
  shelfLife?: {
    refrigerated?: number;     // days
    frozen?: number;           // days
    room?: number;             // days
  };

  // Origin
  origin?: {
    countries: string[];       // ISO 3166-1 alpha-2
    regions?: Region[];
  };

  // Visual
  imageUrl?: string;
  iconEmoji?: string;
  color?: string;              // Hex color for UI

  // Sourcing
  commonBrands?: string[];
  averagePricePerKg?: {
    currency: string;
    amount: number;
    region: Region;
  }[];

  // Metadata
  isActive: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// RECIPE TYPES
// ============================================================================

/**
 * Ingredient used in a recipe with quantity
 */
export interface RecipeIngredient {
  ingredientId: string;
  ingredient?: MasterIngredient;   // Populated when fetched

  quantity: number;
  unit: MeasurementUnit;

  isOptional?: boolean;
  preparationNote?: MultiLangText; // e.g., "finely chopped", "room temperature"
  substitutes?: string[];          // Alternative ingredient IDs
}

/**
 * Recipe step with instructions
 */
export interface RecipeStep {
  stepNumber: number;
  instruction: MultiLangText;
  duration?: number;               // minutes
  imageUrl?: string;
  videoUrl?: string;
  tips?: MultiLangText;
}

/**
 * Size/portion variation
 */
export interface RecipeVariation {
  id: string;
  name: MultiLangText;             // e.g., "Small", "Medium", "Large"
  multiplier: number;              // 0.5 for half, 1.5 for large
  priceAdjustment?: number;        // percentage or fixed amount
}

/**
 * Pairing suggestion
 */
export interface PairingSuggestion {
  recipeId: string;
  recipe?: MasterRecipe;           // Populated when fetched
  pairingType: 'goes_well_with' | 'drink_pairing' | 'side_dish' | 'dessert_after' | 'appetizer_before';
  note?: MultiLangText;
}

/**
 * Auto-computed data from ingredients
 */
export interface ComputedRecipeData {
  // Aggregated from all ingredients
  allergens: Allergen[];
  intolerances: Intolerance[];

  // Dietary compatibility
  suitableForDiets: DietaryRestriction[];
  notSuitableForDiets: DietaryRestriction[];
  dietaryWarnings?: { diet: DietaryRestriction; reason: string }[];

  // Spice
  spiceLevel: SpiceLevel;
  maxScoville?: number;

  // Multi-nation compliance
  compliance: {
    [key in ComplianceCountry]?: boolean;
  };
  complianceWarnings?: string[];

  // Nutrition (per serving)
  nutritionPerServing: NutritionalInfo;
}

/**
 * Master Recipe - managed by GUDBRO
 */
export interface MasterRecipe {
  id: string;
  slug: string;

  // Names
  name: MultiLangText;
  description: MultiLangText;
  shortDescription?: MultiLangText;

  // Classification
  category: RecipeCategory;
  subcategory?: string;
  tags: string[];
  cuisineType?: string[];          // e.g., ["vietnamese", "fusion"]

  // Ingredients & Steps
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];

  // ========== AUTO-COMPUTED from ingredients ==========
  computed: ComputedRecipeData;
  // ====================================================

  // Serving Info
  servings: number;
  servingSize?: string;            // e.g., "1 cup", "250ml"
  variations?: RecipeVariation[];

  // Time & Difficulty
  prepTime: number;                // minutes
  cookTime: number;                // minutes
  totalTime: number;               // minutes
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';

  // Business
  suggestedPrice?: {
    currency: string;
    amount: number;
    region: Region;
  }[];
  foodCostPercentage?: number;     // Target food cost %
  profitMargin?: number;           // Expected margin %

  // Visual
  images: {
    primary: string;
    gallery?: string[];
    thumbnail?: string;
  };
  presentationStyle?: 'rustic' | 'modern' | 'minimal' | 'traditional';

  // Pairings
  pairings?: PairingSuggestion[];

  // Metadata
  source?: string;
  author?: string;
  isActive: boolean;
  isFeatured?: boolean;
  popularity?: number;
  rating?: number;
  version: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// MERCHANT TYPES
// ============================================================================

/**
 * Merchant's custom menu item based on a master recipe
 */
export interface MerchantMenuItem {
  id: string;
  merchantId: string;

  // Can be based on master recipe or fully custom
  basedOnRecipeId?: string;
  basedOnRecipe?: MasterRecipe;

  // Custom overrides
  customName?: MultiLangText;
  customDescription?: MultiLangText;
  customImage?: string;

  // Customizations
  ingredientOverrides?: {
    ingredientId: string;
    action: 'remove' | 'substitute' | 'adjust_quantity';
    substituteId?: string;
    newQuantity?: number;
    newUnit?: MeasurementUnit;
  }[];

  // Re-computed after customizations
  computedOverrides?: Partial<ComputedRecipeData>;

  // Pricing
  price: number;
  currency: string;
  variations?: {
    variationId: string;
    price: number;
  }[];

  // Availability
  isAvailable: boolean;
  availableFrom?: string;
  availableTo?: string;
  availableDays?: number[];
  isSeasonalItem?: boolean;
  seasonStart?: string;
  seasonEnd?: string;

  // Display
  displayOrder: number;
  menuSectionId?: string;
  isFeatured?: boolean;
  isNewItem?: boolean;

  // Stats
  totalOrders?: number;
  lastOrderedAt?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Merchant's ingredient inventory
 */
export interface MerchantIngredient {
  id: string;
  merchantId: string;
  ingredientId: string;
  ingredient?: MasterIngredient;

  // Stock
  currentStock: number;
  unit: MeasurementUnit;
  minStock?: number;
  maxStock?: number;

  // Sourcing
  supplier?: string;
  costPerUnit: number;
  currency: string;
  lastRestocked?: string;

  // Status
  isAvailable: boolean;
  expiryDate?: string;
}

/**
 * Menu section for organizing items
 */
export interface MenuSection {
  id: string;
  merchantId: string;

  name: MultiLangText;
  description?: MultiLangText;

  displayOrder: number;
  isActive: boolean;

  // Time-based visibility
  visibleFrom?: string;
  visibleTo?: string;
  visibleDays?: number[];

  icon?: string;
  color?: string;
}

// ============================================================================
// SMART MENU BUILDER TYPES
// ============================================================================

/**
 * Menu suggestion request
 */
export interface MenuSuggestionRequest {
  // What do you have?
  availableIngredients?: string[];

  // What do you want?
  category?: RecipeCategory;
  dietaryRequirements?: DietaryRestriction[];
  excludeAllergens?: Allergen[];
  excludeIntolerances?: Intolerance[];
  maxSpiceLevel?: SpiceLevel;

  // Constraints
  maxPrepTime?: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'expert';
  targetFoodCost?: number;

  // Preferences
  cuisineTypes?: string[];
  preferSeasonal?: boolean;
  region?: Region;

  // Limits
  limit?: number;
}

/**
 * Menu suggestion response
 */
export interface MenuSuggestion {
  recipe: MasterRecipe;

  // Match quality
  matchScore: number;
  matchReasons: string[];

  // Feasibility
  ingredientsAvailable: number;
  ingredientsMissing: RecipeIngredient[];
  estimatedFoodCost: number;

  // Recommendations
  suggestedPrice: number;
  pairingSuggestions: MasterRecipe[];
}

/**
 * Ingredient substitution suggestion
 */
export interface SubstitutionSuggestion {
  originalIngredient: MasterIngredient;
  substitute: MasterIngredient;

  matchScore: number;
  flavorImpact: 'minimal' | 'noticeable' | 'significant';
  textureImpact: 'minimal' | 'noticeable' | 'significant';

  // Impact on Sistema 51 Filtri
  allergensAdded?: Allergen[];
  allergensRemoved?: Allergen[];
  intolerancesAdded?: Intolerance[];
  intolerancesRemoved?: Intolerance[];
  dietaryImpact?: { diet: DietaryRestriction; change: 'now_suitable' | 'no_longer_suitable' }[];

  notes: MultiLangText;
  adjustments?: {
    quantityMultiplier?: number;
    preparationChange?: MultiLangText;
  };
}

// ============================================================================
// AUTO-COMPUTATION RESULT
// ============================================================================

/**
 * Result of auto-computing safety data from ingredients
 */
export interface AutoComputationResult {
  allergens: {
    present: Allergen[];
    byRegulation: {
      EU: Allergen[];
      USA: Allergen[];
      Korea: Allergen[];
      Japan: Allergen[];
    };
  };
  intolerances: {
    present: Intolerance[];
    severity: {
      [key in Intolerance]?: 'low' | 'medium' | 'high' | 'severe';
    };
  };
  diets: {
    compatible: DietaryRestriction[];
    incompatible: DietaryRestriction[];
    reasons: {
      [diet in DietaryRestriction]?: string[];
    };
  };
  spice: {
    maxLevel: SpiceLevel;
    maxScoville?: number;
    ingredientsWithSpice: string[];
  };
  compliance: {
    [key in ComplianceCountry]: boolean;
  };
  warnings: string[];
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

/**
 * Cross-business insights
 */
export interface FoodInsights {
  // Trending
  trendingRecipes: {
    recipe: MasterRecipe;
    usageCount: number;
    growthPercentage: number;
  }[];

  // Seasonal
  seasonalRecommendations: {
    recipe: MasterRecipe;
    reason: string;
    peakMonth: number;
  }[];

  // Cost optimization
  highMarginItems: {
    recipe: MasterRecipe;
    averageMargin: number;
  }[];

  // Popular combinations
  popularPairings: {
    items: MasterRecipe[];
    frequency: number;
  }[];

  // Safety insights
  allergenDistribution: {
    allergen: Allergen;
    productCount: number;
    percentage: number;
  }[];
}
