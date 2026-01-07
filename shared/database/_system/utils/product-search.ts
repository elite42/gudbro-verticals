/**
 * GUDBRO Product Search API
 *
 * Comprehensive search and filter utilities for the centralized product database.
 * Supports filtering by category, cuisine, dietary restrictions (5 dimensioni),
 * price range, and full-text search.
 *
 * @version 1.0.0
 * @lastUpdated 2025-12-13
 */

import type { Product, SpiceLevel } from '../types';
import { rootsProducts } from '../products/roots-products';
import { foodProducts } from '../products/food-products';
import { foodCategories, beverageCategories, cuisineOrigins } from '../taxonomy/category-taxonomy';

// ============================================================================
// COMBINED PRODUCT DATABASE
// ============================================================================

/**
 * All products from the centralized database
 */
export const allProducts: Product[] = [...rootsProducts, ...foodProducts];

// ============================================================================
// SEARCH FILTERS INTERFACE
// ============================================================================

/**
 * Search filters for product queries
 *
 * Supports all 5 dimensions:
 * - Allergens (30)
 * - Intolerances (10)
 * - Diets (11)
 * - Nutrition (9 params)
 * - Spice Level (0-5)
 *
 * @see docs/SISTEMA-FILTRI.md for complete documentation
 */
export interface ProductSearchFilters {
  // Text search
  query?: string; // Full-text search in name/description

  // Category filters
  category?: string; // Main category (antipasti, primi, bevande, etc.)
  subcategory?: string; // Subcategory (burger, kebab, pizza, etc.)
  type?: string; // Type (smash-burger, doner-kebab, etc.)

  // Cuisine/Origin filters
  cuisine?: string; // Cuisine origin (italian, vietnamese, etc.)
  origin?: string; // Geographic origin for beverages

  // =========================================================================
  // 5 DIMENSIONI FILTERS
  // =========================================================================

  // Dimensione 1: Allergeni (30 totali)
  allergenFree?: string[]; // Must NOT contain these allergens

  // Dimensione 2: Intolleranze (10 totali)
  intoleranceFree?: string[]; // Must NOT trigger these intolerances

  // Dimensione 3: Diete (11 totali)
  suitableForDiets?: string[]; // Must be compatible with ALL these diets

  // Dimensione 4: Fattori Nutrizionali (9 parametri)
  maxCalories?: number; // Maximum calories per serving (kcal)
  minProtein?: number; // Minimum protein (g)
  maxCarbs?: number; // Maximum carbohydrates (g)
  maxSugar?: number; // Maximum sugar (g)
  maxFat?: number; // Maximum fat (g)
  minFiber?: number; // Minimum fiber (g)
  maxSalt?: number; // Maximum salt (g)
  maxSodium?: number; // Maximum sodium (mg)

  // Dimensione 5: Piccantezza (6 livelli: 0-5)
  maxSpiceLevel?: SpiceLevel; // Maximum spice level (0=None, 5=Extreme)

  // =========================================================================
  // OTHER FILTERS
  // =========================================================================

  // Price filters
  minPrice?: number; // Minimum price (local currency)
  maxPrice?: number; // Maximum price (local currency)
  currency?: string; // Currency code (VND, EUR, USD)

  // Availability filters
  timeSlot?: 'breakfast' | 'lunch' | 'dinner' | 'aperitivo' | 'late-night' | 'all-day';

  // Sorting
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'spice-level' | 'calories' | 'protein' | 'newest';

  // Pagination
  limit?: number;
  offset?: number;
}

/**
 * Search result with metadata
 */
export interface ProductSearchResult {
  products: Product[];
  total: number;
  filters: ProductSearchFilters;
  facets: {
    categories: { id: string; count: number }[];
    cuisines: { id: string; count: number }[];
    diets: { id: string; count: number }[];
    priceRange: { min: number; max: number };
  };
}

// ============================================================================
// MAIN SEARCH FUNCTION
// ============================================================================

/**
 * Search products with comprehensive filters
 *
 * @example
 * // Find all vegan kebabs
 * searchProducts({ subcategory: 'kebab', suitableForDiets: ['vegan'] })
 *
 * @example
 * // Find gluten-free Italian dishes under 100,000 VND
 * searchProducts({ cuisine: 'italian', allergenFree: ['gluten'], maxPrice: 100000 })
 *
 * @example
 * // Full-text search for "cappuccino"
 * searchProducts({ query: 'cappuccino' })
 */
export function searchProducts(filters: ProductSearchFilters = {}): ProductSearchResult {
  let results = [...allProducts];

  // -------------------------------------------------------------------------
  // TEXT SEARCH
  // -------------------------------------------------------------------------
  if (filters.query) {
    const query = filters.query.toLowerCase().trim();
    results = results.filter((product) => {
      const nameMatch = Object.values(product.name).some((name) =>
        name.toLowerCase().includes(query)
      );
      const descMatch =
        product.description &&
        Object.values(product.description).some((desc) => desc.toLowerCase().includes(query));
      const slugMatch = product.slug.toLowerCase().includes(query);
      return nameMatch || descMatch || slugMatch;
    });
  }

  // -------------------------------------------------------------------------
  // CATEGORY FILTERS
  // -------------------------------------------------------------------------
  if (filters.category) {
    results = results.filter((p) => p.category.main === filters.category);
  }

  if (filters.subcategory) {
    results = results.filter((p) => p.category.sub === filters.subcategory);
  }

  if (filters.type) {
    results = results.filter((p) => p.category.tertiary === filters.type);
  }

  // -------------------------------------------------------------------------
  // CUISINE/ORIGIN FILTERS
  // -------------------------------------------------------------------------
  if (filters.cuisine) {
    results = results.filter(
      (p) => p.category.sub === filters.cuisine || p.category.origin === filters.cuisine
    );
  }

  if (filters.origin) {
    results = results.filter((p) => p.category.origin === filters.origin);
  }

  // -------------------------------------------------------------------------
  // 5 DIMENSIONI FILTERS
  // -------------------------------------------------------------------------

  // Allergen-free filter
  if (filters.allergenFree && filters.allergenFree.length > 0) {
    results = results.filter((product) => {
      const productAllergens = product.computed.allergens || [];
      return !filters.allergenFree!.some((allergen) => productAllergens.includes(allergen));
    });
  }

  // Intolerance-free filter
  if (filters.intoleranceFree && filters.intoleranceFree.length > 0) {
    results = results.filter((product) => {
      const productIntolerances = product.computed.intolerances || [];
      return !filters.intoleranceFree!.some((intolerance) =>
        productIntolerances.includes(intolerance)
      );
    });
  }

  // Diet-compatible filter (must match ALL specified diets)
  if (filters.suitableForDiets && filters.suitableForDiets.length > 0) {
    results = results.filter((product) => {
      const compatibleDiets = product.computed.suitable_for_diets || [];
      return filters.suitableForDiets!.every((diet) => compatibleDiets.includes(diet));
    });
  }

  // Max spice level filter
  if (filters.maxSpiceLevel !== undefined) {
    results = results.filter(
      (product) => (product.computed.spice_level || 0) <= filters.maxSpiceLevel!
    );
  }

  // -------------------------------------------------------------------------
  // NUTRITIONAL FILTERS (Dimensione 4)
  // -------------------------------------------------------------------------
  if (filters.maxCalories !== undefined) {
    results = results.filter((product) => {
      const calories = product.nutrition_per_serving?.calories_kcal;
      return calories === undefined || calories <= filters.maxCalories!;
    });
  }

  if (filters.minProtein !== undefined) {
    results = results.filter((product) => {
      const protein = product.nutrition_per_serving?.protein_g;
      return protein !== undefined && protein >= filters.minProtein!;
    });
  }

  if (filters.maxCarbs !== undefined) {
    results = results.filter((product) => {
      const carbs = product.nutrition_per_serving?.carbs_g;
      return carbs === undefined || carbs <= filters.maxCarbs!;
    });
  }

  if (filters.maxSugar !== undefined) {
    results = results.filter((product) => {
      const sugar = product.nutrition_per_serving?.sugar_g;
      return sugar === undefined || sugar <= filters.maxSugar!;
    });
  }

  if (filters.maxFat !== undefined) {
    results = results.filter((product) => {
      const fat = product.nutrition_per_serving?.fat_g;
      return fat === undefined || fat <= filters.maxFat!;
    });
  }

  if (filters.minFiber !== undefined) {
    results = results.filter((product) => {
      const fiber = product.nutrition_per_serving?.fiber_g;
      return fiber !== undefined && fiber >= filters.minFiber!;
    });
  }

  if (filters.maxSalt !== undefined) {
    results = results.filter((product) => {
      const salt = product.nutrition_per_serving?.salt_g;
      return salt === undefined || salt <= filters.maxSalt!;
    });
  }

  if (filters.maxSodium !== undefined) {
    results = results.filter((product) => {
      const sodium = product.nutrition_per_serving?.sodium_mg;
      return sodium === undefined || sodium <= filters.maxSodium!;
    });
  }

  // -------------------------------------------------------------------------
  // PRICE FILTERS
  // -------------------------------------------------------------------------
  if (filters.minPrice !== undefined) {
    results = results.filter((product) => {
      const price = product.pricing?.selling_price_local?.amount || 0;
      return price >= filters.minPrice!;
    });
  }

  if (filters.maxPrice !== undefined) {
    results = results.filter((product) => {
      const price = product.pricing?.selling_price_local?.amount || 0;
      return price <= filters.maxPrice!;
    });
  }

  // -------------------------------------------------------------------------
  // TIME SLOT FILTER
  // -------------------------------------------------------------------------
  if (filters.timeSlot) {
    results = results.filter((product) => {
      const slots = product.availability?.time_slots || ['all-day'];
      return slots.includes('all-day') || slots.includes(filters.timeSlot!);
    });
  }

  // -------------------------------------------------------------------------
  // CALCULATE FACETS (before pagination)
  // -------------------------------------------------------------------------
  const facets = calculateFacets(results);
  const total = results.length;

  // -------------------------------------------------------------------------
  // SORTING
  // -------------------------------------------------------------------------
  if (filters.sortBy) {
    results = sortProducts(results, filters.sortBy);
  }

  // -------------------------------------------------------------------------
  // PAGINATION
  // -------------------------------------------------------------------------
  if (filters.offset) {
    results = results.slice(filters.offset);
  }

  if (filters.limit) {
    results = results.slice(0, filters.limit);
  }

  return {
    products: results,
    total,
    filters,
    facets,
  };
}

// ============================================================================
// SPECIALIZED SEARCH FUNCTIONS
// ============================================================================

/**
 * Get all products in a specific subcategory
 *
 * @example
 * getProductsBySubcategory('burger') // All burger products
 * getProductsBySubcategory('kebab', 'doner-kebab') // Only döner kebabs
 */
export function getProductsBySubcategory(subcategory: string, type?: string): Product[] {
  return searchProducts({ subcategory, type }).products;
}

/**
 * Get all products for a specific cuisine
 *
 * @example
 * getProductsByCuisine('vietnamese') // All Vietnamese dishes
 * getProductsByCuisine('italian') // All Italian dishes
 */
export function getProductsByCuisine(cuisine: string): Product[] {
  return searchProducts({ cuisine }).products;
}

/**
 * Filter products by dietary restrictions (5 dimensioni)
 *
 * Supports all 5 dimensions:
 * - Allergens (30)
 * - Intolerances (10)
 * - Diets (11)
 * - Nutrition (9 params)
 * - Spice Level (0-5)
 *
 * @example
 * // Vegan products without gluten
 * filterByDiet({ suitableForDiets: ['vegan'], allergenFree: ['gluten'] })
 *
 * @example
 * // Halal products without lactose, max 500 calories
 * filterByDiet({ suitableForDiets: ['halal'], intoleranceFree: ['lactose'], maxCalories: 500 })
 *
 * @example
 * // Low-carb high-protein, not spicy
 * filterByDiet({ maxCarbs: 20, minProtein: 30, maxSpiceLevel: 1 })
 */
export function filterByDiet(options: {
  // Dimensione 1: Allergeni
  allergenFree?: string[];
  // Dimensione 2: Intolleranze
  intoleranceFree?: string[];
  // Dimensione 3: Diete
  suitableForDiets?: string[];
  // Dimensione 4: Nutrizione
  maxCalories?: number;
  minProtein?: number;
  maxCarbs?: number;
  maxSugar?: number;
  maxFat?: number;
  minFiber?: number;
  maxSalt?: number;
  maxSodium?: number;
  // Dimensione 5: Piccantezza
  maxSpiceLevel?: SpiceLevel;
}): Product[] {
  return searchProducts(options).products;
}

/**
 * Get products by main category with optional filters
 *
 * @example
 * getProductsByCategory('piatti-unici') // All one-dish meals
 * getProductsByCategory('dessert', { maxSpiceLevel: 0 }) // Non-spicy desserts
 */
export function getProductsByCategory(
  category: string,
  additionalFilters?: Omit<ProductSearchFilters, 'category'>
): Product[] {
  return searchProducts({ category, ...additionalFilters }).products;
}

/**
 * Search products by price range
 *
 * @example
 * getProductsByPriceRange(30000, 80000, 'VND') // Products between 30k-80k VND
 */
export function getProductsByPriceRange(
  minPrice: number,
  maxPrice: number,
  currency: string = 'VND'
): Product[] {
  return searchProducts({ minPrice, maxPrice, currency }).products;
}

/**
 * Get featured/popular products (by category)
 */
export function getFeaturedProducts(limit: number = 10): Product[] {
  // For now, return a mix of products from different categories
  const categories = ['coffee', 'piatti-unici', 'dessert', 'bevande'];
  const featured: Product[] = [];

  for (const category of categories) {
    const products = getProductsByCategory(category, {
      limit: Math.ceil(limit / categories.length),
    });
    featured.push(...products);
  }

  return featured.slice(0, limit);
}

// ============================================================================
// TAXONOMY HELPERS
// ============================================================================

/**
 * Get all available categories from taxonomy
 */
export function getAvailableCategories(): {
  id: string;
  name: { en: string; it?: string; vi?: string };
}[] {
  return [
    ...foodCategories.map((c) => ({ id: c.id, name: c.name })),
    ...beverageCategories.map((c) => ({ id: c.id, name: c.name })),
  ];
}

/**
 * Get subcategories for a specific main category
 */
export function getSubcategoriesFor(
  categoryId: string
): { id: string; name: { en: string; it?: string; vi?: string } }[] {
  const foodCat = foodCategories.find((c) => c.id === categoryId);
  if (foodCat) {
    return foodCat.subcategories.map((s) => ({ id: s.id, name: s.name }));
  }

  const bevCat = beverageCategories.find((c) => c.id === categoryId);
  if (bevCat) {
    return bevCat.subcategories.map((s) => ({ id: s.id, name: s.name }));
  }

  return [];
}

/**
 * Get all available cuisines
 */
export function getAvailableCuisines(): {
  id: string;
  name: { en: string; it?: string; vi?: string };
  region: string;
}[] {
  return cuisineOrigins.map((c) => ({
    id: c.id,
    name: c.name,
    region: c.region,
  }));
}

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Get database statistics
 */
export function getDatabaseStats(): {
  totalProducts: number;
  byCategory: Record<string, number>;
  byCuisine: Record<string, number>;
  priceRange: { min: number; max: number; avg: number };
  dietaryCoverage: Record<string, number>;
} {
  const byCategory: Record<string, number> = {};
  const byCuisine: Record<string, number> = {};
  const dietaryCoverage: Record<string, number> = {};
  let minPrice = Infinity;
  let maxPrice = 0;
  let totalPrice = 0;
  let priceCount = 0;

  for (const product of allProducts) {
    // Category count
    byCategory[product.category.main] = (byCategory[product.category.main] || 0) + 1;

    // Cuisine count
    if (product.category.sub) {
      byCuisine[product.category.sub] = (byCuisine[product.category.sub] || 0) + 1;
    }

    // Price stats
    const price = product.pricing?.selling_price_local?.amount;
    if (price) {
      minPrice = Math.min(minPrice, price);
      maxPrice = Math.max(maxPrice, price);
      totalPrice += price;
      priceCount++;
    }

    // Dietary coverage
    for (const diet of product.computed.suitable_for_diets || []) {
      dietaryCoverage[diet] = (dietaryCoverage[diet] || 0) + 1;
    }
  }

  return {
    totalProducts: allProducts.length,
    byCategory,
    byCuisine,
    priceRange: {
      min: minPrice === Infinity ? 0 : minPrice,
      max: maxPrice,
      avg: priceCount > 0 ? Math.round(totalPrice / priceCount) : 0,
    },
    dietaryCoverage,
  };
}

// ============================================================================
// INTERNAL HELPERS
// ============================================================================

/**
 * Calculate facets for search results
 */
function calculateFacets(products: Product[]): ProductSearchResult['facets'] {
  const categoryCount: Record<string, number> = {};
  const cuisineCount: Record<string, number> = {};
  const dietCount: Record<string, number> = {};
  let minPrice = Infinity;
  let maxPrice = 0;

  for (const product of products) {
    // Categories
    categoryCount[product.category.main] = (categoryCount[product.category.main] || 0) + 1;

    // Cuisines
    if (product.category.sub) {
      cuisineCount[product.category.sub] = (cuisineCount[product.category.sub] || 0) + 1;
    }

    // Diets
    for (const diet of product.computed.suitable_for_diets || []) {
      dietCount[diet] = (dietCount[diet] || 0) + 1;
    }

    // Price range
    const price = product.pricing?.selling_price_local?.amount || 0;
    if (price > 0) {
      minPrice = Math.min(minPrice, price);
      maxPrice = Math.max(maxPrice, price);
    }
  }

  return {
    categories: Object.entries(categoryCount)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count),
    cuisines: Object.entries(cuisineCount)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count),
    diets: Object.entries(dietCount)
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count),
    priceRange: {
      min: minPrice === Infinity ? 0 : minPrice,
      max: maxPrice,
    },
  };
}

/**
 * Sort products by specified criteria
 */
function sortProducts(products: Product[], sortBy: ProductSearchFilters['sortBy']): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.en.localeCompare(b.name.en));

    case 'price-asc':
      return sorted.sort(
        (a, b) =>
          (a.pricing?.selling_price_local?.amount || 0) -
          (b.pricing?.selling_price_local?.amount || 0)
      );

    case 'price-desc':
      return sorted.sort(
        (a, b) =>
          (b.pricing?.selling_price_local?.amount || 0) -
          (a.pricing?.selling_price_local?.amount || 0)
      );

    case 'spice-level':
      return sorted.sort((a, b) => (a.computed.spice_level || 0) - (b.computed.spice_level || 0));

    case 'calories':
      return sorted.sort(
        (a, b) =>
          (a.nutrition_per_serving?.calories_kcal || 0) -
          (b.nutrition_per_serving?.calories_kcal || 0)
      );

    case 'protein':
      return sorted.sort(
        (a, b) =>
          (b.nutrition_per_serving?.protein_g || 0) - (a.nutrition_per_serving?.protein_g || 0)
      );

    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    default:
      return sorted;
  }
}
