/**
 * GUDBRO Food Database
 *
 * Centralized ingredient and recipe database for all GUDBRO merchants.
 * Provides smart menu building, dietary filters, and nutritional data.
 *
 * Usage:
 *
 * ```typescript
 * import {
 *   // Types
 *   type MasterIngredient,
 *   type MasterRecipe,
 *   type RecipeIngredient,
 *   type MerchantMenuItem,
 *   type MenuSuggestionRequest,
 *
 *   // Seed Data
 *   allIngredients,
 *   allRecipes,
 *   coffeeRecipes,
 *   teaRecipes,
 *
 *   // Utilities
 *   calculateNutrition,
 *   filterByDietary,
 *   suggestSubstitutes,
 * } from '@gudbro/core/food-database';
 * ```
 */

// ============================================================================
// TYPES
// ============================================================================

export type {
  // Enums
  Allergen,
  DietaryTag,
  IngredientCategory,
  RecipeCategory,
  MeasurementUnit,
  Season,
  Region,

  // Ingredient Types
  NutritionalInfo,
  SeasonalAvailability,
  MasterIngredient,

  // Recipe Types
  RecipeIngredient,
  RecipeStep,
  RecipeVariation,
  PairingSuggestion,
  MasterRecipe,

  // Merchant Types
  MerchantMenuItem,
  MerchantIngredient,
  MenuSection,

  // Smart Menu Types
  MenuSuggestionRequest,
  MenuSuggestion,
  SubstitutionSuggestion,

  // Analytics Types
  FoodInsights,
} from './types';

// ============================================================================
// SEED DATA
// ============================================================================

export {
  // All ingredients
  allIngredients,
  coffeeTeaIngredients,
  dairyIngredients,
  fruitIngredients,
  sweetenerIngredients,
  toppingIngredients,
  proteinIngredients,
  vegetableIngredients,
} from './seed-data/ingredients';

export {
  // All recipes
  allRecipes,
  coffeeRecipes,
  teaRecipes,
  smoothieRecipes,
  foodRecipes,
  dessertRecipes,
} from './seed-data/recipes';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

import type {
  MasterIngredient,
  MasterRecipe,
  RecipeIngredient,
  NutritionalInfo,
  DietaryTag,
  Allergen,
} from './types';

/**
 * Calculate total nutrition for a recipe based on its ingredients
 */
export function calculateRecipeNutrition(
  ingredients: RecipeIngredient[],
  servings: number = 1
): NutritionalInfo {
  const totals: NutritionalInfo = {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    sugar: 0,
    fiber: 0,
    fat: 0,
    saturatedFat: 0,
    sodium: 0,
  };

  for (const ri of ingredients) {
    if (!ri.ingredient?.nutritionPer100g) continue;

    // Convert quantity to grams (simplified)
    let grams = ri.quantity;
    switch (ri.unit) {
      case 'kg':
        grams = ri.quantity * 1000;
        break;
      case 'ml':
      case 'g':
        grams = ri.quantity;
        break;
      case 'l':
        grams = ri.quantity * 1000;
        break;
      case 'tsp':
        grams = ri.quantity * 5;
        break;
      case 'tbsp':
        grams = ri.quantity * 15;
        break;
      case 'cup':
        grams = ri.quantity * 240;
        break;
      default:
        grams = ri.quantity * 30; // rough estimate for pieces
    }

    const multiplier = grams / 100;
    const nutrition = ri.ingredient.nutritionPer100g;

    totals.calories += nutrition.calories * multiplier;
    totals.protein += nutrition.protein * multiplier;
    totals.carbohydrates += nutrition.carbohydrates * multiplier;
    totals.sugar += nutrition.sugar * multiplier;
    totals.fiber += nutrition.fiber * multiplier;
    totals.fat += nutrition.fat * multiplier;
    totals.saturatedFat += nutrition.saturatedFat * multiplier;
    totals.sodium += nutrition.sodium * multiplier;
  }

  // Divide by servings and round
  return {
    calories: Math.round(totals.calories / servings),
    protein: Math.round(totals.protein / servings * 10) / 10,
    carbohydrates: Math.round(totals.carbohydrates / servings * 10) / 10,
    sugar: Math.round(totals.sugar / servings * 10) / 10,
    fiber: Math.round(totals.fiber / servings * 10) / 10,
    fat: Math.round(totals.fat / servings * 10) / 10,
    saturatedFat: Math.round(totals.saturatedFat / servings * 10) / 10,
    sodium: Math.round(totals.sodium / servings),
  };
}

/**
 * Aggregate all allergens from recipe ingredients
 */
export function aggregateAllergens(ingredients: RecipeIngredient[]): Allergen[] {
  const allergenSet = new Set<Allergen>();

  for (const ri of ingredients) {
    if (ri.ingredient?.allergens) {
      for (const allergen of ri.ingredient.allergens) {
        allergenSet.add(allergen);
      }
    }
  }

  return Array.from(allergenSet);
}

/**
 * Calculate dietary tags based on ingredients
 */
export function calculateDietaryTags(ingredients: RecipeIngredient[]): DietaryTag[] {
  if (ingredients.length === 0) return [];

  // Start with all possible tags
  const possibleTags = new Set<DietaryTag>([
    'vegan',
    'vegetarian',
    'gluten_free',
    'dairy_free',
    'nut_free',
    'egg_free',
    'soy_free',
    'keto',
    'low_carb',
  ]);

  // Remove tags based on ingredients
  for (const ri of ingredients) {
    const allergens = ri.ingredient?.allergens || [];
    const tags = ri.ingredient?.dietaryTags || [];

    // If ingredient is not vegan, recipe is not vegan
    if (!tags.includes('vegan')) {
      possibleTags.delete('vegan');
    }

    // If ingredient is not vegetarian, recipe is not vegetarian
    if (!tags.includes('vegetarian') && !tags.includes('vegan')) {
      possibleTags.delete('vegetarian');
    }

    // Check allergens
    if (allergens.includes('gluten')) possibleTags.delete('gluten_free');
    if (allergens.includes('dairy')) possibleTags.delete('dairy_free');
    if (allergens.includes('tree_nuts') || allergens.includes('peanuts')) {
      possibleTags.delete('nut_free');
    }
    if (allergens.includes('eggs')) possibleTags.delete('egg_free');
    if (allergens.includes('soybeans')) possibleTags.delete('soy_free');
  }

  return Array.from(possibleTags);
}

/**
 * Filter recipes by dietary requirements
 */
export function filterRecipesByDietary(
  recipes: MasterRecipe[],
  requirements: DietaryTag[],
  excludeAllergens: Allergen[] = []
): MasterRecipe[] {
  return recipes.filter((recipe) => {
    // Check dietary requirements
    for (const req of requirements) {
      if (!recipe.dietaryTags?.includes(req)) {
        return false;
      }
    }

    // Check allergens
    for (const allergen of excludeAllergens) {
      if (recipe.allergens?.includes(allergen)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Filter ingredients by dietary requirements
 */
export function filterIngredientsByDietary(
  ingredients: MasterIngredient[],
  requirements: DietaryTag[],
  excludeAllergens: Allergen[] = []
): MasterIngredient[] {
  return ingredients.filter((ingredient) => {
    // Check dietary requirements
    for (const req of requirements) {
      if (!ingredient.dietaryTags?.includes(req)) {
        return false;
      }
    }

    // Check allergens
    for (const allergen of excludeAllergens) {
      if (ingredient.allergens?.includes(allergen)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Search ingredients by name (multi-language)
 */
export function searchIngredients(
  ingredients: MasterIngredient[],
  query: string,
  language: string = 'en'
): MasterIngredient[] {
  const lowerQuery = query.toLowerCase();

  return ingredients.filter((ingredient) => {
    // Search in primary name
    const name = ingredient.name[language] || ingredient.name.en || '';
    if (name.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in all language names
    for (const langName of Object.values(ingredient.name)) {
      if (langName && langName.toLowerCase().includes(lowerQuery)) {
        return true;
      }
    }

    // Search in aliases
    if (ingredient.aliases) {
      for (const alias of ingredient.aliases) {
        for (const aliasName of Object.values(alias)) {
          if (aliasName && aliasName.toLowerCase().includes(lowerQuery)) {
            return true;
          }
        }
      }
    }

    return false;
  });
}

/**
 * Search recipes by name (multi-language)
 */
export function searchRecipes(
  recipes: MasterRecipe[],
  query: string,
  language: string = 'en'
): MasterRecipe[] {
  const lowerQuery = query.toLowerCase();

  return recipes.filter((recipe) => {
    // Search in name
    const name = recipe.name[language] || recipe.name.en || '';
    if (name.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in description
    const desc = recipe.description[language] || recipe.description.en || '';
    if (desc.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in tags
    if (recipe.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))) {
      return true;
    }

    return false;
  });
}

/**
 * Get recipes by category
 */
export function getRecipesByCategory(
  recipes: MasterRecipe[],
  category: string
): MasterRecipe[] {
  return recipes.filter((recipe) => recipe.category === category);
}

/**
 * Suggest substitute ingredients
 */
export function suggestSubstitutes(
  ingredient: MasterIngredient,
  allIngredients: MasterIngredient[],
  forDietaryTag?: DietaryTag
): MasterIngredient[] {
  // Filter by same category
  let substitutes = allIngredients.filter(
    (i) => i.category === ingredient.category && i.slug !== ingredient.slug
  );

  // If looking for a specific dietary requirement, filter further
  if (forDietaryTag) {
    substitutes = substitutes.filter((i) =>
      i.dietaryTags?.includes(forDietaryTag)
    );
  }

  return substitutes;
}

/**
 * Calculate estimated food cost for a recipe
 */
export function calculateFoodCost(
  ingredients: RecipeIngredient[],
  region: string = 'vietnam'
): { cost: number; currency: string } {
  let totalCost = 0;
  const currency = region === 'vietnam' ? 'VND' : 'USD';

  for (const ri of ingredients) {
    const priceInfo = ri.ingredient?.averagePricePerKg?.find(
      (p) => p.region === region
    );
    if (priceInfo) {
      // Convert to cost per gram then multiply by quantity
      let grams = ri.quantity;
      if (ri.unit === 'kg') grams *= 1000;
      if (ri.unit === 'g') grams = ri.quantity;

      const costPerGram = priceInfo.amount / 1000;
      totalCost += costPerGram * grams;
    }
  }

  return { cost: Math.round(totalCost), currency };
}
