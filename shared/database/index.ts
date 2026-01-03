/**
 * GUDBRO Centralized Database
 *
 * Main entry point for the ingredient and product database system.
 * This system automatically computes allergens, intolerances, and dietary
 * compatibility from ingredient lists - reducing human error on potentially
 * life-threatening allergies.
 *
 * @packageDocumentation
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
export * from './_system/types';

// ============================================================================
// INGREDIENT DATABASE
// ============================================================================
export { commonIngredients, INGREDIENT_COUNT } from './ingredients/common-ingredients';
export {
  beveragesSuperfoods,
  BEVERAGES_SUPERFOODS_COUNT,
} from './ingredients/beverages-superfoods';
export {
  citrusHerbsVegetables,
  CITRUS_HERBS_VEGETABLES_COUNT,
} from './ingredients/citrus-herbs-vegetables';
export {
  saucesOilsSweeteners,
  SAUCES_OILS_SWEETENERS_COUNT,
} from './ingredients/sauces-oils-sweeteners';
export { saladIngredients, SALAD_INGREDIENTS_COUNT } from './ingredients/salad-ingredients';

// Cocktail ingredients (214 ingredients for 222 cocktails)
export {
  allCocktailIngredients,
  COCKTAIL_INGREDIENTS_TOTAL,
  COCKTAIL_INGREDIENT_COUNTS,
  spiritsIngredients,
  liqueursIngredients,
  amariVermouthIngredients,
  bittersIngredients,
  mixersIngredients,
  garnishIngredients,
  winesFortifiedIngredients,
  SPIRITS_COUNT,
  LIQUEURS_COUNT,
  AMARI_VERMOUTH_COUNT,
  BITTERS_COUNT,
  MIXERS_COUNT,
  GARNISH_COUNT,
  WINES_FORTIFIED_COUNT,
} from './ingredients/cocktail-ingredients';

// Combined ingredient database
import { commonIngredients } from './ingredients/common-ingredients';
import { beveragesSuperfoods } from './ingredients/beverages-superfoods';
import { citrusHerbsVegetables } from './ingredients/citrus-herbs-vegetables';
import { saucesOilsSweeteners } from './ingredients/sauces-oils-sweeteners';
import { saladIngredients } from './ingredients/salad-ingredients';
import { allCocktailIngredients } from './ingredients/cocktail-ingredients';

export const allIngredients = [
  ...commonIngredients,
  ...beveragesSuperfoods,
  ...citrusHerbsVegetables,
  ...saucesOilsSweeteners,
  ...saladIngredients,
  ...allCocktailIngredients,
];

export const TOTAL_INGREDIENT_COUNT = allIngredients.length;

// ============================================================================
// PRODUCT DATABASE
// ============================================================================
export {
  exampleProducts,
  PRODUCT_COUNT,
  oatsCappuccino,
  tropicalPitayaBowl,
  greenPowerSmoothie,
  buddhaBowl,
  demonstrateAutoComputation,
} from './_system/products/example-products';

export {
  rootsProducts,
  ROOTS_PRODUCT_COUNT,
  limeJuice,
  immunityBoosterShot,
  celeryJuice,
  peanutButterToast,
  matchaOatsLatte,
  turmericGoldenLatte,
  cacaoLatte,
  beetHummusToast,
  cacaoDreamBowl,
  espresso,
  americano as americanoCoffee,
  cashewCappuccino,
  greenPeaceBowl,
} from './_system/products/roots-products';

export {
  foodProducts,
  FOOD_PRODUCT_COUNT,
  banhMiThitNuong,
  banhMiDacBiet,
  banhMiGa,
  banhMiTom,
  banhMiThitHeo,
  basqueCheesecake,
  redVelvetCake,
  passionFruitCheesecake,
  chocolateMousse,
  flanCaramel,
  matchaCheesecake,
  matchaLatte,
  strawberrySmoothie,
  affogato,
  eggCoffee,
  lemonIcedTea,
  caramelFrappuccino,
  orangeCoffee,
} from './_system/products/food-products';

// ============================================================================
// AUTO-COMPUTATION UTILITIES
// ============================================================================
export {
  autoComputeProduct,
  computeAllergens,
  computeAllergensByCountry,
  computeIntolerances,
  computeDietaryCompatibility,
  computeSpiceLevel,
  computeCompliance,
  getIngredientMasters,
} from './_system/utils/auto-compute';

// ============================================================================
// PRODUCT SEARCH API
// ============================================================================
export {
  // Main search function
  searchProducts,
  // Specialized search functions
  getProductsBySubcategory,
  getProductsByCuisine,
  getProductsByCategory,
  getProductsByPriceRange,
  filterByDiet,
  getFeaturedProducts,
  // Taxonomy helpers
  getAvailableCategories,
  getSubcategoriesFor,
  getAvailableCuisines,
  // Statistics
  getDatabaseStats,
  // Combined database
  allProducts,
} from './_system/utils/product-search';

export type { ProductSearchFilters, ProductSearchResult } from './_system/utils/product-search';

// ============================================================================
// CATEGORY TAXONOMY
// ============================================================================
export {
  domains,
  foodCategories,
  beverageCategories,
  cuisineOrigins,
  TAXONOMY_VERSION,
  TOTAL_FOOD_CATEGORIES,
  TOTAL_BEVERAGE_CATEGORIES,
  TOTAL_CUISINE_ORIGINS,
} from './_system/taxonomy/category-taxonomy';

export type {
  Domain,
  DomainInfo,
  FoodCategory,
  FoodSubcategory,
  FoodType,
  BeverageCategory,
  BeverageSubcategory,
  BeverageType,
  BeverageRegion,
  CuisineOrigin,
} from './_system/taxonomy/category-taxonomy';

// ============================================================================
// COCKTAIL DATABASE
// ============================================================================
export {
  // IBA Official
  ibaUnforgettables,
  IBA_UNFORGETTABLES_COUNT,
  alexander,
  americano,
  // Combined exports
  allIBACocktails,
  allFamousCocktails,
  allCocktails,
  COCKTAIL_COUNTS,
  TOTAL_COCKTAILS,
} from './beverages/cocktails';

// ============================================================================
// VERSION
// ============================================================================
export const DATABASE_VERSION = '1.0.0';
export const SISTEMA_FILTRI_VERSION = '3.0'; // GUDBRO Sistema 5 Dimensioni v3.0
