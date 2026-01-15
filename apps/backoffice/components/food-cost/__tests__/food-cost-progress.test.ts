/**
 * Food Cost Progress Tests
 *
 * Tests for progress calculation, feature unlocking, and motivational messaging
 * logic used in the FoodCostProgress component.
 */

import { describe, it, expect } from 'vitest';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface FoodCostStats {
  totalDishes: number;
  dishesWithCosts: number;
  totalIngredients: number;
  ingredientsWithPrices: number;
  avgFoodCostPercent: number | null;
  lastUpdated: Date | null;
}

interface UnlockableFeature {
  id: string;
  name: string;
  description: string;
  requiredProgress: number;
  unlocked: boolean;
  color: string;
}

interface MotivationalMessage {
  title: string;
  message: string;
}

// ============================================================================
// PROGRESS CALCULATION FUNCTIONS
// ============================================================================

/**
 * Calculate dish progress percentage
 */
function calculateDishProgress(stats: FoodCostStats): number {
  if (stats.totalDishes === 0) return 0;
  return Math.round((stats.dishesWithCosts / stats.totalDishes) * 100);
}

/**
 * Calculate ingredient progress percentage
 */
function calculateIngredientProgress(stats: FoodCostStats): number {
  if (stats.totalIngredients === 0) return 0;
  return Math.round((stats.ingredientsWithPrices / stats.totalIngredients) * 100);
}

/**
 * Calculate overall progress (average of dish and ingredient progress)
 */
function calculateOverallProgress(stats: FoodCostStats): number {
  const dishProgress = calculateDishProgress(stats);
  const ingredientProgress = calculateIngredientProgress(stats);
  return Math.round((dishProgress + ingredientProgress) / 2);
}

// ============================================================================
// FEATURE UNLOCKING FUNCTIONS
// ============================================================================

/**
 * Feature unlock thresholds
 */
const FEATURE_THRESHOLDS = {
  'margin-analysis': 20,
  'menu-engineering': 50,
  'ai-suggestions': 75,
  'variance-alerts': 90,
} as const;

/**
 * Check if feature is unlocked based on progress
 */
function isFeatureUnlocked(featureId: keyof typeof FEATURE_THRESHOLDS, progress: number): boolean {
  return progress >= FEATURE_THRESHOLDS[featureId];
}

/**
 * Get all features with unlock status
 */
function getFeatures(overallProgress: number): UnlockableFeature[] {
  return [
    {
      id: 'margin-analysis',
      name: 'Analisi Margini',
      description: 'Scopri quali piatti ti fanno guadagnare di più',
      requiredProgress: 20,
      unlocked: overallProgress >= 20,
      color: 'emerald',
    },
    {
      id: 'menu-engineering',
      name: 'Menu Engineering',
      description: 'Classifica BCG: Stars, Puzzles, Plowhorses, Dogs',
      requiredProgress: 50,
      unlocked: overallProgress >= 50,
      color: 'purple',
    },
    {
      id: 'ai-suggestions',
      name: 'Suggerimenti AI',
      description: "L'AI ti dice come ottimizzare i margini",
      requiredProgress: 75,
      unlocked: overallProgress >= 75,
      color: 'blue',
    },
    {
      id: 'variance-alerts',
      name: 'Alert Varianza',
      description: 'Notifiche quando i costi deviano dal teorico',
      requiredProgress: 90,
      unlocked: overallProgress >= 90,
      color: 'amber',
    },
  ];
}

/**
 * Get the next feature to unlock
 */
function getNextFeature(features: UnlockableFeature[]): UnlockableFeature | undefined {
  return features.find((f) => !f.unlocked);
}

/**
 * Calculate progress towards next feature
 */
function calculateProgressToNextFeature(
  overallProgress: number,
  nextFeature: UnlockableFeature | undefined
): number {
  if (!nextFeature) return 100;
  return Math.round((overallProgress / nextFeature.requiredProgress) * 100);
}

/**
 * Count unlocked features
 */
function countUnlockedFeatures(features: UnlockableFeature[]): number {
  return features.filter((f) => f.unlocked).length;
}

// ============================================================================
// MOTIVATIONAL MESSAGE FUNCTIONS
// ============================================================================

/**
 * Get motivational message based on progress
 */
function getMotivationalMessage(overallProgress: number): MotivationalMessage {
  if (overallProgress === 0) {
    return {
      title: 'Inizia a tracciare i tuoi costi!',
      message: 'Investire 2 ore con il tuo chef può farti scoprire €500/mese di margine nascosto.',
    };
  }
  if (overallProgress < 20) {
    return {
      title: 'Ottimo inizio!',
      message: `Ancora ${20 - overallProgress}% per sbloccare l'Analisi Margini.`,
    };
  }
  if (overallProgress < 50) {
    return {
      title: 'Stai andando alla grande!',
      message: `${50 - overallProgress}% per sbloccare il Menu Engineering BCG.`,
    };
  }
  if (overallProgress < 75) {
    return {
      title: 'Quasi a metà strada!',
      message: `${75 - overallProgress}% per sbloccare i Suggerimenti AI.`,
    };
  }
  if (overallProgress < 90) {
    return {
      title: 'Sei un professionista!',
      message: `Solo ${90 - overallProgress}% per sbloccare gli Alert Varianza.`,
    };
  }
  return {
    title: 'Complimenti! Tutto sbloccato!',
    message: 'Hai accesso completo a tutte le funzionalità di food costing.',
  };
}

// ============================================================================
// CTA LABEL FUNCTIONS
// ============================================================================

/**
 * Get CTA button label based on progress
 */
function getCtaLabel(overallProgress: number): string {
  if (overallProgress === 0) {
    return 'Inizia il Setup Food Cost';
  }
  if (overallProgress < 100) {
    return `Continua il Setup (${overallProgress}%)`;
  }
  return "Vai all'Analisi Margini";
}

// ============================================================================
// FOOD COST BENCHMARKS
// ============================================================================

const FOOD_COST_BENCHMARKS = {
  casual_dining: { min: 25, max: 35 },
  fine_dining: { min: 28, max: 38 },
  fast_food: { min: 20, max: 30 },
  pizza: { min: 20, max: 28 },
  coffee_shop: { min: 15, max: 25 },
} as const;

/**
 * Check if food cost is within benchmark
 */
function isWithinBenchmark(
  foodCostPercent: number,
  type: keyof typeof FOOD_COST_BENCHMARKS
): boolean {
  const benchmark = FOOD_COST_BENCHMARKS[type];
  return foodCostPercent >= benchmark.min && foodCostPercent <= benchmark.max;
}

/**
 * Get food cost status
 */
function getFoodCostStatus(foodCostPercent: number): 'excellent' | 'good' | 'warning' | 'critical' {
  if (foodCostPercent < 25) return 'excellent';
  if (foodCostPercent < 35) return 'good';
  if (foodCostPercent < 45) return 'warning';
  return 'critical';
}

// ============================================================================
// TESTS
// ============================================================================

describe('Food Cost Progress', () => {
  // ==========================================================================
  // calculateDishProgress Tests
  // ==========================================================================

  describe('calculateDishProgress', () => {
    it('should return 0 when no dishes', () => {
      const stats: FoodCostStats = {
        totalDishes: 0,
        dishesWithCosts: 0,
        totalIngredients: 0,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      expect(calculateDishProgress(stats)).toBe(0);
    });

    it('should calculate correct percentage', () => {
      const stats: FoodCostStats = {
        totalDishes: 100,
        dishesWithCosts: 50,
        totalIngredients: 0,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      expect(calculateDishProgress(stats)).toBe(50);
    });

    it('should return 100 when all dishes have costs', () => {
      const stats: FoodCostStats = {
        totalDishes: 50,
        dishesWithCosts: 50,
        totalIngredients: 0,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      expect(calculateDishProgress(stats)).toBe(100);
    });

    it('should round to nearest integer', () => {
      const stats: FoodCostStats = {
        totalDishes: 3,
        dishesWithCosts: 1,
        totalIngredients: 0,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      expect(calculateDishProgress(stats)).toBe(33);
    });
  });

  // ==========================================================================
  // calculateIngredientProgress Tests
  // ==========================================================================

  describe('calculateIngredientProgress', () => {
    it('should return 0 when no ingredients', () => {
      const stats: FoodCostStats = {
        totalDishes: 0,
        dishesWithCosts: 0,
        totalIngredients: 0,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      expect(calculateIngredientProgress(stats)).toBe(0);
    });

    it('should calculate correct percentage', () => {
      const stats: FoodCostStats = {
        totalDishes: 0,
        dishesWithCosts: 0,
        totalIngredients: 200,
        ingredientsWithPrices: 100,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      expect(calculateIngredientProgress(stats)).toBe(50);
    });

    it('should return 100 when all ingredients have prices', () => {
      const stats: FoodCostStats = {
        totalDishes: 0,
        dishesWithCosts: 0,
        totalIngredients: 150,
        ingredientsWithPrices: 150,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      expect(calculateIngredientProgress(stats)).toBe(100);
    });
  });

  // ==========================================================================
  // calculateOverallProgress Tests
  // ==========================================================================

  describe('calculateOverallProgress', () => {
    it('should return 0 when no data', () => {
      const stats: FoodCostStats = {
        totalDishes: 0,
        dishesWithCosts: 0,
        totalIngredients: 0,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      expect(calculateOverallProgress(stats)).toBe(0);
    });

    it('should average dish and ingredient progress', () => {
      const stats: FoodCostStats = {
        totalDishes: 100,
        dishesWithCosts: 80,
        totalIngredients: 100,
        ingredientsWithPrices: 60,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      // Dish: 80%, Ingredient: 60%, Average: 70%
      expect(calculateOverallProgress(stats)).toBe(70);
    });

    it('should return 100 when fully complete', () => {
      const stats: FoodCostStats = {
        totalDishes: 50,
        dishesWithCosts: 50,
        totalIngredients: 100,
        ingredientsWithPrices: 100,
        avgFoodCostPercent: 30,
        lastUpdated: new Date(),
      };

      expect(calculateOverallProgress(stats)).toBe(100);
    });

    it('should handle uneven progress', () => {
      const stats: FoodCostStats = {
        totalDishes: 10,
        dishesWithCosts: 10, // 100%
        totalIngredients: 100,
        ingredientsWithPrices: 0, // 0%
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      // Average of 100% and 0% = 50%
      expect(calculateOverallProgress(stats)).toBe(50);
    });
  });

  // ==========================================================================
  // Feature Unlock Tests
  // ==========================================================================

  describe('Feature Unlocking', () => {
    describe('isFeatureUnlocked', () => {
      it('should unlock margin-analysis at 20%', () => {
        expect(isFeatureUnlocked('margin-analysis', 19)).toBe(false);
        expect(isFeatureUnlocked('margin-analysis', 20)).toBe(true);
        expect(isFeatureUnlocked('margin-analysis', 21)).toBe(true);
      });

      it('should unlock menu-engineering at 50%', () => {
        expect(isFeatureUnlocked('menu-engineering', 49)).toBe(false);
        expect(isFeatureUnlocked('menu-engineering', 50)).toBe(true);
        expect(isFeatureUnlocked('menu-engineering', 51)).toBe(true);
      });

      it('should unlock ai-suggestions at 75%', () => {
        expect(isFeatureUnlocked('ai-suggestions', 74)).toBe(false);
        expect(isFeatureUnlocked('ai-suggestions', 75)).toBe(true);
        expect(isFeatureUnlocked('ai-suggestions', 76)).toBe(true);
      });

      it('should unlock variance-alerts at 90%', () => {
        expect(isFeatureUnlocked('variance-alerts', 89)).toBe(false);
        expect(isFeatureUnlocked('variance-alerts', 90)).toBe(true);
        expect(isFeatureUnlocked('variance-alerts', 91)).toBe(true);
      });
    });

    describe('getFeatures', () => {
      it('should return 4 features', () => {
        const features = getFeatures(0);
        expect(features).toHaveLength(4);
      });

      it('should unlock no features at 0%', () => {
        const features = getFeatures(0);
        expect(features.filter((f) => f.unlocked)).toHaveLength(0);
      });

      it('should unlock 1 feature at 20%', () => {
        const features = getFeatures(20);
        expect(countUnlockedFeatures(features)).toBe(1);
      });

      it('should unlock 2 features at 50%', () => {
        const features = getFeatures(50);
        expect(countUnlockedFeatures(features)).toBe(2);
      });

      it('should unlock 3 features at 75%', () => {
        const features = getFeatures(75);
        expect(countUnlockedFeatures(features)).toBe(3);
      });

      it('should unlock all features at 90%', () => {
        const features = getFeatures(90);
        expect(countUnlockedFeatures(features)).toBe(4);
      });

      it('should have correct feature order', () => {
        const features = getFeatures(0);
        expect(features[0].id).toBe('margin-analysis');
        expect(features[1].id).toBe('menu-engineering');
        expect(features[2].id).toBe('ai-suggestions');
        expect(features[3].id).toBe('variance-alerts');
      });

      it('should have increasing thresholds', () => {
        const features = getFeatures(0);
        for (let i = 1; i < features.length; i++) {
          expect(features[i].requiredProgress).toBeGreaterThan(features[i - 1].requiredProgress);
        }
      });
    });

    describe('getNextFeature', () => {
      it('should return margin-analysis at 0%', () => {
        const features = getFeatures(0);
        const next = getNextFeature(features);
        expect(next?.id).toBe('margin-analysis');
      });

      it('should return menu-engineering at 20%', () => {
        const features = getFeatures(20);
        const next = getNextFeature(features);
        expect(next?.id).toBe('menu-engineering');
      });

      it('should return ai-suggestions at 50%', () => {
        const features = getFeatures(50);
        const next = getNextFeature(features);
        expect(next?.id).toBe('ai-suggestions');
      });

      it('should return variance-alerts at 75%', () => {
        const features = getFeatures(75);
        const next = getNextFeature(features);
        expect(next?.id).toBe('variance-alerts');
      });

      it('should return undefined at 90%+', () => {
        const features = getFeatures(90);
        const next = getNextFeature(features);
        expect(next).toBeUndefined();
      });
    });

    describe('calculateProgressToNextFeature', () => {
      it('should calculate progress towards first feature', () => {
        const features = getFeatures(10);
        const next = getNextFeature(features);
        expect(calculateProgressToNextFeature(10, next)).toBe(50); // 10/20 = 50%
      });

      it('should return 100 when no next feature', () => {
        expect(calculateProgressToNextFeature(100, undefined)).toBe(100);
      });

      it('should handle edge at threshold', () => {
        const features = getFeatures(19);
        const next = getNextFeature(features);
        expect(calculateProgressToNextFeature(19, next)).toBe(95); // 19/20 = 95%
      });
    });
  });

  // ==========================================================================
  // Motivational Message Tests
  // ==========================================================================

  describe('getMotivationalMessage', () => {
    it('should show start message at 0%', () => {
      const msg = getMotivationalMessage(0);
      expect(msg.title).toBe('Inizia a tracciare i tuoi costi!');
      expect(msg.message).toContain('€500/mese');
    });

    it('should show progress message at 10%', () => {
      const msg = getMotivationalMessage(10);
      expect(msg.title).toBe('Ottimo inizio!');
      expect(msg.message).toContain('10%');
      expect(msg.message).toContain('Analisi Margini');
    });

    it('should show progress message at 30%', () => {
      const msg = getMotivationalMessage(30);
      expect(msg.title).toBe('Stai andando alla grande!');
      expect(msg.message).toContain('20%');
      expect(msg.message).toContain('Menu Engineering');
    });

    it('should show progress message at 60%', () => {
      const msg = getMotivationalMessage(60);
      expect(msg.title).toBe('Quasi a metà strada!');
      expect(msg.message).toContain('15%');
      expect(msg.message).toContain('Suggerimenti AI');
    });

    it('should show progress message at 80%', () => {
      const msg = getMotivationalMessage(80);
      expect(msg.title).toBe('Sei un professionista!');
      expect(msg.message).toContain('10%');
      expect(msg.message).toContain('Alert Varianza');
    });

    it('should show completion message at 90%+', () => {
      const msg = getMotivationalMessage(90);
      expect(msg.title).toBe('Complimenti! Tutto sbloccato!');
      expect(msg.message).toContain('accesso completo');
    });

    it('should show completion message at 100%', () => {
      const msg = getMotivationalMessage(100);
      expect(msg.title).toBe('Complimenti! Tutto sbloccato!');
    });

    describe('message boundaries', () => {
      it('should transition at 1%', () => {
        const msg = getMotivationalMessage(1);
        expect(msg.title).toBe('Ottimo inizio!');
      });

      it('should transition at 19%', () => {
        const msg = getMotivationalMessage(19);
        expect(msg.title).toBe('Ottimo inizio!');
      });

      it('should transition at 20%', () => {
        const msg = getMotivationalMessage(20);
        expect(msg.title).toBe('Stai andando alla grande!');
      });

      it('should transition at 49%', () => {
        const msg = getMotivationalMessage(49);
        expect(msg.title).toBe('Stai andando alla grande!');
      });

      it('should transition at 50%', () => {
        const msg = getMotivationalMessage(50);
        expect(msg.title).toBe('Quasi a metà strada!');
      });

      it('should transition at 74%', () => {
        const msg = getMotivationalMessage(74);
        expect(msg.title).toBe('Quasi a metà strada!');
      });

      it('should transition at 75%', () => {
        const msg = getMotivationalMessage(75);
        expect(msg.title).toBe('Sei un professionista!');
      });

      it('should transition at 89%', () => {
        const msg = getMotivationalMessage(89);
        expect(msg.title).toBe('Sei un professionista!');
      });
    });
  });

  // ==========================================================================
  // CTA Label Tests
  // ==========================================================================

  describe('getCtaLabel', () => {
    it('should show start label at 0%', () => {
      expect(getCtaLabel(0)).toBe('Inizia il Setup Food Cost');
    });

    it('should show continue label with percentage', () => {
      expect(getCtaLabel(50)).toBe('Continua il Setup (50%)');
      expect(getCtaLabel(75)).toBe('Continua il Setup (75%)');
      expect(getCtaLabel(99)).toBe('Continua il Setup (99%)');
    });

    it('should show analysis label at 100%', () => {
      expect(getCtaLabel(100)).toBe("Vai all'Analisi Margini");
    });
  });

  // ==========================================================================
  // Food Cost Benchmark Tests
  // ==========================================================================

  describe('Food Cost Benchmarks', () => {
    describe('FOOD_COST_BENCHMARKS', () => {
      it('should have casual dining benchmark', () => {
        expect(FOOD_COST_BENCHMARKS.casual_dining).toEqual({ min: 25, max: 35 });
      });

      it('should have fine dining benchmark', () => {
        expect(FOOD_COST_BENCHMARKS.fine_dining).toEqual({ min: 28, max: 38 });
      });

      it('should have fast food benchmark', () => {
        expect(FOOD_COST_BENCHMARKS.fast_food).toEqual({ min: 20, max: 30 });
      });

      it('should have pizza benchmark', () => {
        expect(FOOD_COST_BENCHMARKS.pizza).toEqual({ min: 20, max: 28 });
      });

      it('should have coffee shop benchmark', () => {
        expect(FOOD_COST_BENCHMARKS.coffee_shop).toEqual({ min: 15, max: 25 });
      });
    });

    describe('isWithinBenchmark', () => {
      it('should return true when within range', () => {
        expect(isWithinBenchmark(30, 'casual_dining')).toBe(true);
        expect(isWithinBenchmark(25, 'casual_dining')).toBe(true);
        expect(isWithinBenchmark(35, 'casual_dining')).toBe(true);
      });

      it('should return false when below range', () => {
        expect(isWithinBenchmark(24, 'casual_dining')).toBe(false);
      });

      it('should return false when above range', () => {
        expect(isWithinBenchmark(36, 'casual_dining')).toBe(false);
      });

      it('should work for different restaurant types', () => {
        expect(isWithinBenchmark(20, 'coffee_shop')).toBe(true);
        expect(isWithinBenchmark(20, 'fine_dining')).toBe(false);
      });
    });

    describe('getFoodCostStatus', () => {
      it('should return excellent for low food cost', () => {
        expect(getFoodCostStatus(20)).toBe('excellent');
        expect(getFoodCostStatus(24)).toBe('excellent');
      });

      it('should return good for normal food cost', () => {
        expect(getFoodCostStatus(25)).toBe('good');
        expect(getFoodCostStatus(30)).toBe('good');
        expect(getFoodCostStatus(34)).toBe('good');
      });

      it('should return warning for high food cost', () => {
        expect(getFoodCostStatus(35)).toBe('warning');
        expect(getFoodCostStatus(40)).toBe('warning');
        expect(getFoodCostStatus(44)).toBe('warning');
      });

      it('should return critical for very high food cost', () => {
        expect(getFoodCostStatus(45)).toBe('critical');
        expect(getFoodCostStatus(50)).toBe('critical');
        expect(getFoodCostStatus(60)).toBe('critical');
      });
    });
  });

  // ==========================================================================
  // FoodCostStats Interface Tests
  // ==========================================================================

  describe('FoodCostStats Interface', () => {
    it('should handle complete stats', () => {
      const stats: FoodCostStats = {
        totalDishes: 50,
        dishesWithCosts: 40,
        totalIngredients: 200,
        ingredientsWithPrices: 180,
        avgFoodCostPercent: 28.5,
        lastUpdated: new Date('2026-01-14'),
      };

      expect(stats.totalDishes).toBe(50);
      expect(stats.dishesWithCosts).toBe(40);
      expect(stats.totalIngredients).toBe(200);
      expect(stats.ingredientsWithPrices).toBe(180);
      expect(stats.avgFoodCostPercent).toBe(28.5);
      expect(stats.lastUpdated).toBeInstanceOf(Date);
    });

    it('should handle null avgFoodCostPercent', () => {
      const stats: FoodCostStats = {
        totalDishes: 10,
        dishesWithCosts: 0,
        totalIngredients: 50,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      expect(stats.avgFoodCostPercent).toBeNull();
      expect(stats.lastUpdated).toBeNull();
    });

    it('should handle edge case with 0 totals', () => {
      const stats: FoodCostStats = {
        totalDishes: 0,
        dishesWithCosts: 0,
        totalIngredients: 0,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      expect(calculateOverallProgress(stats)).toBe(0);
    });
  });

  // ==========================================================================
  // Integration Tests
  // ==========================================================================

  describe('Integration', () => {
    it('should correctly calculate progress and unlock features for new restaurant', () => {
      const stats: FoodCostStats = {
        totalDishes: 30,
        dishesWithCosts: 0,
        totalIngredients: 100,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      };

      const progress = calculateOverallProgress(stats);
      const features = getFeatures(progress);
      const message = getMotivationalMessage(progress);
      const cta = getCtaLabel(progress);

      expect(progress).toBe(0);
      expect(countUnlockedFeatures(features)).toBe(0);
      expect(message.title).toBe('Inizia a tracciare i tuoi costi!');
      expect(cta).toBe('Inizia il Setup Food Cost');
    });

    it('should correctly calculate progress and unlock features for restaurant at 50%', () => {
      const stats: FoodCostStats = {
        totalDishes: 30,
        dishesWithCosts: 15,
        totalIngredients: 100,
        ingredientsWithPrices: 50,
        avgFoodCostPercent: 32,
        lastUpdated: new Date(),
      };

      const progress = calculateOverallProgress(stats);
      const features = getFeatures(progress);
      const message = getMotivationalMessage(progress);
      const cta = getCtaLabel(progress);

      expect(progress).toBe(50);
      expect(countUnlockedFeatures(features)).toBe(2);
      expect(message.title).toBe('Quasi a metà strada!');
      expect(cta).toBe('Continua il Setup (50%)');
    });

    it('should correctly calculate progress and unlock features for complete restaurant', () => {
      const stats: FoodCostStats = {
        totalDishes: 30,
        dishesWithCosts: 30,
        totalIngredients: 100,
        ingredientsWithPrices: 100,
        avgFoodCostPercent: 28,
        lastUpdated: new Date(),
      };

      const progress = calculateOverallProgress(stats);
      const features = getFeatures(progress);
      const message = getMotivationalMessage(progress);
      const cta = getCtaLabel(progress);

      expect(progress).toBe(100);
      expect(countUnlockedFeatures(features)).toBe(4);
      expect(message.title).toBe('Complimenti! Tutto sbloccato!');
      expect(cta).toBe("Vai all'Analisi Margini");
    });
  });
});
