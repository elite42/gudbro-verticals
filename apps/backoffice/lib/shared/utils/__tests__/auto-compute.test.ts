import { describe, it, expect } from 'vitest';
import {
  computeAllergens,
  computeAllergensByCountry,
  computeIntolerances,
  computeDietaryCompatibility,
  computeSpiceLevel,
  computeCompliance,
  autoComputeProduct,
  computeNutrition,
  computeCalories,
  computeNutritionRating,
  computeHealthLabels,
  formatNutritionLabel,
  type NutritionPerServing,
  type IngredientWithQuantity,
} from '../auto-compute';
import type { IngredientMaster, SpiceLevel } from '../../types';

// ============================================
// Test Fixtures
// ============================================

const createMockIngredient = (overrides: Partial<IngredientMaster> = {}): IngredientMaster => ({
  id: 'test-ingredient',
  slug: 'test-ingredient',
  name: { en: 'Test Ingredient', it: 'Ingrediente Test', vi: 'Nguyên liệu Test' },
  category: { main: 'test' },
  allergens: {},
  intolerances: {},
  dietary_restrictions: {
    vegetarian: true,
    vegan: true,
    gluten_free: true,
    dairy_free: true,
    nut_free: true,
  },
  spice: { level: 0 as SpiceLevel },
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
  version: 1,
  ...overrides,
});

const createEggIngredient = (): IngredientMaster =>
  createMockIngredient({
    id: 'eggs',
    slug: 'eggs',
    name: { en: 'Eggs', it: 'Uova', vi: 'Trứng' },
    allergens: { eggs: true },
    dietary_restrictions: { vegetarian: true, vegan: false, dairy_free: true },
  });

const createMilkIngredient = (): IngredientMaster =>
  createMockIngredient({
    id: 'milk',
    slug: 'milk',
    name: { en: 'Milk', it: 'Latte', vi: 'Sữa' },
    allergens: { milk: true },
    intolerances: { lactose: true },
    dietary_restrictions: { vegetarian: true, vegan: false, dairy_free: false },
  });

const createPorkIngredient = (): IngredientMaster =>
  createMockIngredient({
    id: 'pork',
    slug: 'pork',
    name: { en: 'Pork', it: 'Maiale', vi: 'Thịt heo' },
    allergens: { pork: true },
    dietary_restrictions: {
      vegetarian: false,
      vegan: false,
      non_halal: true,
      non_kosher: true,
    },
  });

const createChiliIngredient = (): IngredientMaster =>
  createMockIngredient({
    id: 'chili',
    slug: 'chili',
    name: { en: 'Chili Pepper', it: 'Peperoncino', vi: 'Ớt' },
    allergens: { chili_pepper: true },
    spice: { level: 4 as SpiceLevel, scoville: 30000 },
  });

const createGarlicIngredient = (): IngredientMaster =>
  createMockIngredient({
    id: 'garlic',
    slug: 'garlic',
    name: { en: 'Garlic', it: 'Aglio', vi: 'Tỏi' },
    allergens: { garlic: true },
    dietary_restrictions: { buddhist_restricted: true },
  });

const createWheatIngredient = (): IngredientMaster =>
  createMockIngredient({
    id: 'wheat',
    slug: 'wheat-flour',
    name: { en: 'Wheat Flour', it: 'Farina di Grano', vi: 'Bột mì' },
    allergens: { gluten: true },
    intolerances: { gluten_celiac: true },
    dietary_restrictions: { gluten_free: false },
  });

const createPeanutIngredient = (): IngredientMaster =>
  createMockIngredient({
    id: 'peanuts',
    slug: 'peanuts',
    name: { en: 'Peanuts', it: 'Arachidi', vi: 'Đậu phộng' },
    allergens: { peanuts: true },
    dietary_restrictions: { nut_free: false },
  });

// ============================================
// computeAllergens
// ============================================

describe('computeAllergens', () => {
  it('should return empty array for empty ingredients', () => {
    const result = computeAllergens([]);
    expect(result).toEqual([]);
  });

  it('should return empty array for ingredients without allergens', () => {
    const result = computeAllergens([createMockIngredient()]);
    expect(result).toEqual([]);
  });

  it('should extract single allergen', () => {
    const result = computeAllergens([createEggIngredient()]);
    expect(result).toContain('eggs');
    expect(result.length).toBe(1);
  });

  it('should extract multiple allergens from single ingredient', () => {
    const multiAllergen = createMockIngredient({
      allergens: { gluten: true, eggs: true, milk: true },
    });
    const result = computeAllergens([multiAllergen]);
    expect(result).toContain('gluten');
    expect(result).toContain('eggs');
    expect(result).toContain('milk');
    expect(result.length).toBe(3);
  });

  it('should combine allergens from multiple ingredients', () => {
    const result = computeAllergens([createEggIngredient(), createMilkIngredient()]);
    expect(result).toContain('eggs');
    expect(result).toContain('milk');
  });

  it('should not duplicate allergens', () => {
    const egg1 = createEggIngredient();
    const egg2 = createEggIngredient();
    const result = computeAllergens([egg1, egg2]);
    expect(result.filter((a) => a === 'eggs').length).toBe(1);
  });

  it('should sort allergens alphabetically', () => {
    const multiAllergen = createMockIngredient({
      allergens: { milk: true, eggs: true, gluten: true },
    });
    const result = computeAllergens([multiAllergen]);
    expect(result).toEqual(['eggs', 'gluten', 'milk']);
  });
});

// ============================================
// computeAllergensByCountry
// ============================================

describe('computeAllergensByCountry', () => {
  it('should return empty arrays for empty allergen list', () => {
    const result = computeAllergensByCountry([]);
    expect(result.EU).toEqual([]);
    expect(result.USA).toEqual([]);
    expect(result.Korea).toEqual([]);
    expect(result.Japan).toEqual([]);
  });

  it('should filter EU allergens correctly', () => {
    const allergens = ['gluten', 'eggs', 'milk', 'pork'];
    const result = computeAllergensByCountry(allergens);
    expect(result.EU).toContain('gluten');
    expect(result.EU).toContain('eggs');
    expect(result.EU).toContain('milk');
    expect(result.EU).not.toContain('pork'); // Pork is not EU14
  });

  it('should filter USA Big 9 allergens correctly', () => {
    const allergens = ['milk', 'eggs', 'wheat', 'sesame', 'gluten'];
    const result = computeAllergensByCountry(allergens);
    expect(result.USA).toContain('milk');
    expect(result.USA).toContain('eggs');
    expect(result.USA).toContain('wheat');
    expect(result.USA).toContain('sesame');
    expect(result.USA).not.toContain('gluten'); // USA uses wheat, not gluten
  });

  it('should filter Korea allergens (includes pork)', () => {
    const allergens = ['pork', 'eggs', 'peach'];
    const result = computeAllergensByCountry(allergens);
    expect(result.Korea).toContain('pork');
    expect(result.Korea).toContain('eggs');
    expect(result.Korea).toContain('peach');
  });

  it('should filter Japan allergens (includes kiwi, banana)', () => {
    const allergens = ['kiwi', 'banana', 'eggs'];
    const result = computeAllergensByCountry(allergens);
    expect(result.Japan).toContain('kiwi');
    expect(result.Japan).toContain('banana');
    expect(result.Japan).toContain('eggs');
  });
});

// ============================================
// computeIntolerances
// ============================================

describe('computeIntolerances', () => {
  it('should return empty for no intolerances', () => {
    const result = computeIntolerances([createMockIngredient()]);
    expect(result.present).toEqual([]);
    expect(Object.keys(result.severity)).toHaveLength(0);
  });

  it('should extract lactose intolerance with high severity', () => {
    const result = computeIntolerances([createMilkIngredient()]);
    expect(result.present).toContain('lactose');
    expect(result.severity.lactose).toBe('high');
  });

  it('should extract gluten celiac with severe severity', () => {
    const result = computeIntolerances([createWheatIngredient()]);
    expect(result.present).toContain('gluten_celiac');
    expect(result.severity.gluten_celiac).toBe('severe');
  });

  it('should combine intolerances from multiple ingredients', () => {
    const result = computeIntolerances([createMilkIngredient(), createWheatIngredient()]);
    expect(result.present).toContain('lactose');
    expect(result.present).toContain('gluten_celiac');
  });

  it('should sort intolerances alphabetically', () => {
    const histamineIngredient = createMockIngredient({
      intolerances: { histamine: true },
    });
    const result = computeIntolerances([createMilkIngredient(), histamineIngredient]);
    expect(result.present[0]).toBe('histamine');
    expect(result.present[1]).toBe('lactose');
  });
});

// ============================================
// computeDietaryCompatibility
// ============================================

describe('computeDietaryCompatibility', () => {
  it('should mark all diets compatible for neutral ingredient', () => {
    const neutralIngredient = createMockIngredient();
    const result = computeDietaryCompatibility([neutralIngredient]);
    expect(result.compatible).toContain('vegan');
    expect(result.compatible).toContain('vegetarian');
    expect(result.compatible).toContain('halal');
    expect(result.compatible).toContain('kosher');
  });

  it('should mark vegan incompatible for eggs', () => {
    const result = computeDietaryCompatibility([createEggIngredient()]);
    expect(result.incompatible).toContain('vegan');
    expect(result.compatible).not.toContain('vegan');
    expect(result.reasons?.vegan).toBeDefined();
  });

  it('should mark vegetarian incompatible for pork', () => {
    const result = computeDietaryCompatibility([createPorkIngredient()]);
    expect(result.incompatible).toContain('vegetarian');
    expect(result.incompatible).toContain('vegan');
  });

  it('should mark halal incompatible for pork', () => {
    const result = computeDietaryCompatibility([createPorkIngredient()]);
    expect(result.incompatible).toContain('halal');
    expect(result.reasons?.halal).toBeDefined();
  });

  it('should mark kosher incompatible for pork', () => {
    const result = computeDietaryCompatibility([createPorkIngredient()]);
    expect(result.incompatible).toContain('kosher');
    expect(result.reasons?.kosher).toBeDefined();
  });

  it('should mark buddhist incompatible for garlic', () => {
    const result = computeDietaryCompatibility([createGarlicIngredient()]);
    expect(result.incompatible).toContain('buddhist');
    expect(result.reasons?.buddhist).toBeDefined();
    expect(result.reasons?.buddhist[0]).toContain('5 pungent roots');
  });

  it('should mark gluten-free incompatible for wheat', () => {
    const result = computeDietaryCompatibility([createWheatIngredient()]);
    expect(result.incompatible).toContain('gluten-free');
  });

  it('should mark dairy-free incompatible for milk', () => {
    const result = computeDietaryCompatibility([createMilkIngredient()]);
    expect(result.incompatible).toContain('dairy-free');
  });

  it('should mark nut-free incompatible for peanuts', () => {
    const result = computeDietaryCompatibility([createPeanutIngredient()]);
    expect(result.incompatible).toContain('nut-free');
  });

  it('should accumulate incompatibilities from multiple ingredients', () => {
    const result = computeDietaryCompatibility([
      createEggIngredient(),
      createPorkIngredient(),
      createWheatIngredient(),
    ]);
    expect(result.incompatible).toContain('vegan');
    expect(result.incompatible).toContain('vegetarian');
    expect(result.incompatible).toContain('halal');
    expect(result.incompatible).toContain('gluten-free');
  });
});

// ============================================
// computeSpiceLevel
// ============================================

describe('computeSpiceLevel', () => {
  it('should return 0 for non-spicy ingredients', () => {
    const result = computeSpiceLevel([createMockIngredient()]);
    expect(result.max_level).toBe(0);
    expect(result.max_scoville).toBeUndefined();
    expect(result.ingredients_with_spice).toHaveLength(0);
  });

  it('should extract spice level from chili', () => {
    const result = computeSpiceLevel([createChiliIngredient()]);
    expect(result.max_level).toBe(4);
    expect(result.max_scoville).toBe(30000);
    expect(result.ingredients_with_spice).toContain('Chili Pepper');
  });

  it('should return maximum spice level from multiple ingredients', () => {
    const mildChili = createMockIngredient({
      name: { en: 'Mild Pepper', it: 'Peperone', vi: 'Ớt nhẹ' },
      spice: { level: 2 as SpiceLevel, scoville: 5000 },
    });
    const result = computeSpiceLevel([mildChili, createChiliIngredient()]);
    expect(result.max_level).toBe(4);
    expect(result.max_scoville).toBe(30000);
  });

  it('should list all spicy ingredients', () => {
    const mildChili = createMockIngredient({
      name: { en: 'Mild Pepper', it: 'Peperone', vi: 'Ớt nhẹ' },
      spice: { level: 2 as SpiceLevel },
    });
    const result = computeSpiceLevel([mildChili, createChiliIngredient()]);
    expect(result.ingredients_with_spice).toContain('Mild Pepper');
    expect(result.ingredients_with_spice).toContain('Chili Pepper');
  });
});

// ============================================
// computeCompliance
// ============================================

describe('computeCompliance', () => {
  it('should be compliant when all allergens declared', () => {
    const allergensByCountry = {
      EU: ['eggs', 'milk'],
      USA: ['eggs', 'milk'],
      Korea: ['eggs', 'milk'],
      Japan: ['eggs', 'milk'],
    };
    const result = computeCompliance(allergensByCountry);
    expect(result.EU).toBe(true);
    expect(result.USA).toBe(true);
    expect(result.Korea).toBe(true);
    expect(result.Japan).toBe(true);
  });

  it('should warn for peanuts (HIGH RISK)', () => {
    const allergensByCountry = {
      EU: ['peanuts'],
      USA: ['peanuts'],
      Korea: ['peanuts'],
      Japan: ['peanuts'],
    };
    const result = computeCompliance(allergensByCountry);
    expect(result.warnings).toContain('Contains tree nuts/peanuts - HIGH RISK allergen');
  });

  it('should warn for tree nuts (HIGH RISK)', () => {
    const allergensByCountry = {
      EU: ['nuts'],
      USA: ['nuts'],
      Korea: ['nuts'],
      Japan: ['nuts'],
    };
    const result = computeCompliance(allergensByCountry);
    expect(result.warnings).toContain('Contains tree nuts/peanuts - HIGH RISK allergen');
  });

  it('should warn for shellfish (HIGH RISK)', () => {
    const allergensByCountry = {
      EU: ['crustaceans'],
      USA: ['crustaceans'],
      Korea: ['crustaceans'],
      Japan: ['crustaceans'],
    };
    const result = computeCompliance(allergensByCountry);
    expect(result.warnings).toContain('Contains shellfish - HIGH RISK allergen');
  });

  it('should warn for sesame (USA Big 9 2021)', () => {
    const allergensByCountry = {
      EU: ['sesame'],
      USA: ['sesame'],
      Korea: ['sesame'],
      Japan: ['sesame'],
    };
    const result = computeCompliance(allergensByCountry);
    expect(result.warnings).toContain('Contains sesame - Newly added to USA Big 9 (2021)');
  });
});

// ============================================
// autoComputeProduct (Integration)
// ============================================

describe('autoComputeProduct', () => {
  it('should return complete result for empty ingredients', () => {
    const result = autoComputeProduct([]);
    expect(result.allergens.present).toEqual([]);
    expect(result.intolerances.present).toEqual([]);
    expect(result.diets.compatible.length).toBeGreaterThan(0);
    expect(result.spice.max_level).toBe(0);
    expect(result.compliance.EU).toBe(true);
  });

  it('should compute all fields for complex dish', () => {
    const ingredients = [
      createEggIngredient(),
      createMilkIngredient(),
      createWheatIngredient(),
      createChiliIngredient(),
    ];
    const result = autoComputeProduct(ingredients);

    // Check allergens
    expect(result.allergens.present).toContain('eggs');
    expect(result.allergens.present).toContain('milk');
    expect(result.allergens.present).toContain('gluten');

    // Check intolerances
    expect(result.intolerances.present).toContain('lactose');
    expect(result.intolerances.present).toContain('gluten_celiac');

    // Check diets
    expect(result.diets.incompatible).toContain('vegan');
    expect(result.diets.incompatible).toContain('gluten-free');
    expect(result.diets.incompatible).toContain('dairy-free');

    // Check spice
    expect(result.spice.max_level).toBe(4);
  });
});

// ============================================
// Nutrition Computation
// ============================================

describe('computeNutrition', () => {
  const createIngredientWithNutrition = (
    name: string,
    nutrition: Partial<IngredientMaster['nutrition']>
  ): IngredientMaster =>
    createMockIngredient({
      name: { en: name, it: name, vi: name },
      nutrition: {
        protein_g: 0,
        carbs_g: 0,
        fat_g: 0,
        fiber_g: 0,
        calories_kcal: 0,
        ...nutrition,
      },
    });

  it('should return zeros for empty ingredients', () => {
    const result = computeNutrition([]);
    expect(result.calories).toBe(0);
    expect(result.protein).toBe(0);
    expect(result.carbs).toBe(0);
    expect(result.fat).toBe(0);
  });

  it('should compute nutrition from single ingredient', () => {
    const ingredient = createIngredientWithNutrition('Test', {
      calories_kcal: 100,
      protein_g: 10,
      carbs_g: 20,
      fat_g: 5,
      fiber_g: 2,
    });
    const result = computeNutrition([{ ingredient, quantityG: 100 }]);
    expect(result.calories).toBe(100);
    expect(result.protein).toBe(10);
    expect(result.carbs).toBe(20);
    expect(result.fat).toBe(5);
    expect(result.fiber).toBe(2);
  });

  it('should scale nutrition by quantity', () => {
    const ingredient = createIngredientWithNutrition('Test', {
      calories_kcal: 100,
      protein_g: 10,
    });
    const result = computeNutrition([{ ingredient, quantityG: 50 }]);
    expect(result.calories).toBe(50);
    expect(result.protein).toBe(5);
  });

  it('should sum nutrition from multiple ingredients', () => {
    const ingredient1 = createIngredientWithNutrition('A', { calories_kcal: 100 });
    const ingredient2 = createIngredientWithNutrition('B', { calories_kcal: 150 });
    const result = computeNutrition([
      { ingredient: ingredient1, quantityG: 100 },
      { ingredient: ingredient2, quantityG: 100 },
    ]);
    expect(result.calories).toBe(250);
  });

  it('should compute serving size correctly', () => {
    const ingredient = createIngredientWithNutrition('Test', {});
    const result = computeNutrition([
      { ingredient, quantityG: 100 },
      { ingredient, quantityG: 50 },
    ]);
    expect(result.servingSizeG).toBe(150);
  });
});

describe('computeCalories', () => {
  it('should compute total calories quickly', () => {
    const ingredient = createMockIngredient({
      nutrition: {
        calories_kcal: 200,
        protein_g: 0,
        carbs_g: 0,
        fat_g: 0,
        fiber_g: 0,
      },
    });
    const result = computeCalories([{ ingredient, quantityG: 50 }]);
    expect(result).toBe(100);
  });

  it('should return 0 for ingredients without nutrition', () => {
    const ingredient = createMockIngredient({ nutrition: undefined });
    const result = computeCalories([{ ingredient, quantityG: 100 }]);
    expect(result).toBe(0);
  });
});

describe('computeNutritionRating', () => {
  it('should return 3 for zero calorie nutrition', () => {
    const nutrition: NutritionPerServing = {
      servingSizeG: 100,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
    };
    expect(computeNutritionRating(nutrition)).toBe(3);
  });

  it('should rate high protein positively', () => {
    const highProtein: NutritionPerServing = {
      servingSizeG: 100,
      calories: 100,
      protein: 20, // 20% calories from protein = high
      carbs: 10,
      fat: 2,
      fiber: 0,
    };
    expect(computeNutritionRating(highProtein)).toBeGreaterThanOrEqual(4);
  });

  it('should rate high sugar negatively', () => {
    const highSugar: NutritionPerServing = {
      servingSizeG: 100,
      calories: 100,
      protein: 2,
      carbs: 25,
      fat: 0,
      fiber: 0,
      sugar: 20,
    };
    expect(computeNutritionRating(highSugar)).toBeLessThanOrEqual(3);
  });

  it('should clamp between 1 and 5', () => {
    const terrible: NutritionPerServing = {
      servingSizeG: 100,
      calories: 100,
      protein: 0,
      carbs: 25,
      fat: 5,
      fiber: 0,
      sugar: 25,
    };
    const rating = computeNutritionRating(terrible);
    expect(rating).toBeGreaterThanOrEqual(1);
    expect(rating).toBeLessThanOrEqual(5);
  });
});

describe('computeHealthLabels', () => {
  it('should add low-calorie label for <= 100 kcal', () => {
    const nutrition: NutritionPerServing = {
      servingSizeG: 100,
      calories: 80,
      protein: 5,
      carbs: 10,
      fat: 2,
      fiber: 2,
    };
    expect(computeHealthLabels(nutrition)).toContain('low-calorie');
  });

  it('should add high-protein label when > 20% calories from protein', () => {
    const nutrition: NutritionPerServing = {
      servingSizeG: 100,
      calories: 100,
      protein: 10, // 40 kcal = 40% from protein
      carbs: 10,
      fat: 2,
      fiber: 0,
    };
    expect(computeHealthLabels(nutrition)).toContain('high-protein');
  });

  it('should add high-fiber label for >= 5g fiber', () => {
    const nutrition: NutritionPerServing = {
      servingSizeG: 100,
      calories: 100,
      protein: 5,
      carbs: 15,
      fat: 2,
      fiber: 6,
    };
    expect(computeHealthLabels(nutrition)).toContain('high-fiber');
  });

  it('should add low-sugar label for <= 5g sugar', () => {
    const nutrition: NutritionPerServing = {
      servingSizeG: 100,
      calories: 100,
      protein: 5,
      carbs: 15,
      fat: 2,
      fiber: 2,
      sugar: 3,
    };
    expect(computeHealthLabels(nutrition)).toContain('low-sugar');
  });

  it('should add sugar-free label for < 0.5g sugar', () => {
    const nutrition: NutritionPerServing = {
      servingSizeG: 100,
      calories: 100,
      protein: 5,
      carbs: 10,
      fat: 2,
      fiber: 2,
      sugar: 0.2,
    };
    expect(computeHealthLabels(nutrition)).toContain('sugar-free');
  });
});

describe('formatNutritionLabel', () => {
  it('should format basic nutrition', () => {
    const nutrition: NutritionPerServing = {
      servingSizeG: 100,
      calories: 150,
      protein: 8,
      carbs: 20,
      fat: 5,
      fiber: 3,
    };
    const label = formatNutritionLabel(nutrition);
    expect(label).toContain('Calories: 150 kcal');
    expect(label).toContain('Protein: 8g');
    expect(label).toContain('Carbohydrates: 20g');
    expect(label).toContain('Fat: 5g');
    expect(label).toContain('Fiber: 3g');
  });

  it('should include sugar when present', () => {
    const nutrition: NutritionPerServing = {
      servingSizeG: 100,
      calories: 100,
      protein: 5,
      carbs: 15,
      fat: 2,
      fiber: 1,
      sugar: 8,
    };
    const label = formatNutritionLabel(nutrition);
    expect(label).toContain('Sugar: 8g');
  });

  it('should include sodium when present', () => {
    const nutrition: NutritionPerServing = {
      servingSizeG: 100,
      calories: 100,
      protein: 5,
      carbs: 15,
      fat: 2,
      fiber: 1,
      sodium: 500,
    };
    const label = formatNutritionLabel(nutrition);
    expect(label).toContain('Sodium: 500mg');
  });
});
