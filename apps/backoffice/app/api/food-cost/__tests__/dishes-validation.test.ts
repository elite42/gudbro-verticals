import { describe, it, expect } from 'vitest';

// ============================================
// Dishes API Validation Logic Tests
// ============================================

// Validation functions replicated from route handlers for testing
const validateLocationId = (locationId: string | null): { valid: boolean; error?: string } => {
  if (!locationId) {
    return { valid: false, error: 'locationId is required' };
  }
  return { valid: true };
};

const validateDishName = (name: string | undefined | null): { valid: boolean; error?: string } => {
  if (!name?.trim()) {
    return { valid: false, error: 'name is required' };
  }
  return { valid: true };
};

const validateSellingPrice = (
  price: number | undefined | null
): { valid: boolean; error?: string } => {
  if (!price || price <= 0) {
    return { valid: false, error: 'sellingPrice must be positive' };
  }
  return { valid: true };
};

const validateCostPerKg = (cost: number | undefined | null): { valid: boolean; error?: string } => {
  if (!cost || cost <= 0) {
    return { valid: false, error: 'costPerKg must be positive' };
  }
  return { valid: true };
};

const validateQuantityGrams = (
  quantity: number | undefined | null
): { valid: boolean; error?: string } => {
  if (!quantity || quantity <= 0) {
    return { valid: false, error: 'quantityGrams must be positive' };
  }
  return { valid: true };
};

const validateIngredientName = (
  name: string | undefined | null
): { valid: boolean; error?: string } => {
  if (!name?.trim()) {
    return { valid: false, error: 'ingredientName is required' };
  }
  return { valid: true };
};

// ============================================
// GET /api/food-cost/dishes validation tests
// ============================================

describe('GET /api/food-cost/dishes validation', () => {
  describe('locationId validation', () => {
    it('should fail when locationId is null', () => {
      const result = validateLocationId(null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('locationId is required');
    });

    it('should fail when locationId is empty string', () => {
      const result = validateLocationId('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('locationId is required');
    });

    it('should pass when locationId is provided', () => {
      const result = validateLocationId('loc-123');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should pass with UUID format locationId', () => {
      const result = validateLocationId('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
      expect(result.valid).toBe(true);
    });
  });
});

// ============================================
// POST /api/food-cost/dishes validation tests
// ============================================

describe('POST /api/food-cost/dishes validation', () => {
  describe('name validation', () => {
    it('should fail when name is undefined', () => {
      const result = validateDishName(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('name is required');
    });

    it('should fail when name is null', () => {
      const result = validateDishName(null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('name is required');
    });

    it('should fail when name is empty string', () => {
      const result = validateDishName('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('name is required');
    });

    it('should fail when name is whitespace only', () => {
      const result = validateDishName('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('name is required');
    });

    it('should pass when name is valid', () => {
      const result = validateDishName('Pizza Margherita');
      expect(result.valid).toBe(true);
    });

    it('should pass when name has leading/trailing whitespace (will be trimmed)', () => {
      const result = validateDishName('  Pasta Carbonara  ');
      expect(result.valid).toBe(true);
    });
  });

  describe('sellingPrice validation', () => {
    it('should fail when sellingPrice is undefined', () => {
      const result = validateSellingPrice(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('sellingPrice must be positive');
    });

    it('should fail when sellingPrice is null', () => {
      const result = validateSellingPrice(null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('sellingPrice must be positive');
    });

    it('should fail when sellingPrice is 0', () => {
      const result = validateSellingPrice(0);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('sellingPrice must be positive');
    });

    it('should fail when sellingPrice is negative', () => {
      const result = validateSellingPrice(-10);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('sellingPrice must be positive');
    });

    it('should pass when sellingPrice is positive integer', () => {
      const result = validateSellingPrice(15);
      expect(result.valid).toBe(true);
    });

    it('should pass when sellingPrice is positive decimal', () => {
      const result = validateSellingPrice(12.5);
      expect(result.valid).toBe(true);
    });

    it('should pass when sellingPrice is very small positive number', () => {
      const result = validateSellingPrice(0.01);
      expect(result.valid).toBe(true);
    });

    it('should pass when sellingPrice is large number', () => {
      const result = validateSellingPrice(1000);
      expect(result.valid).toBe(true);
    });
  });
});

// ============================================
// PATCH /api/food-cost/dishes/[id] validation tests
// ============================================

describe('PATCH /api/food-cost/dishes/[id] validation', () => {
  describe('update object building', () => {
    const buildUpdateObject = (body: {
      name?: string;
      category?: string;
      sellingPrice?: number;
      monthlySales?: number;
      isActive?: boolean;
    }): Record<string, unknown> => {
      const updates: Record<string, unknown> = {};
      if (body.name !== undefined) updates.name = body.name.trim();
      if (body.category !== undefined) updates.category = body.category;
      if (body.sellingPrice !== undefined) updates.selling_price = body.sellingPrice;
      if (body.monthlySales !== undefined) updates.monthly_sales = body.monthlySales;
      if (body.isActive !== undefined) updates.is_active = body.isActive;
      return updates;
    };

    it('should return empty object when no fields provided', () => {
      const updates = buildUpdateObject({});
      expect(Object.keys(updates).length).toBe(0);
    });

    it('should include name when provided', () => {
      const updates = buildUpdateObject({ name: 'New Name' });
      expect(updates.name).toBe('New Name');
    });

    it('should trim name whitespace', () => {
      const updates = buildUpdateObject({ name: '  Trimmed Name  ' });
      expect(updates.name).toBe('Trimmed Name');
    });

    it('should include category when provided', () => {
      const updates = buildUpdateObject({ category: 'antipasti' });
      expect(updates.category).toBe('antipasti');
    });

    it('should map sellingPrice to selling_price', () => {
      const updates = buildUpdateObject({ sellingPrice: 25.5 });
      expect(updates.selling_price).toBe(25.5);
    });

    it('should map monthlySales to monthly_sales', () => {
      const updates = buildUpdateObject({ monthlySales: 100 });
      expect(updates.monthly_sales).toBe(100);
    });

    it('should map isActive to is_active', () => {
      const updates = buildUpdateObject({ isActive: false });
      expect(updates.is_active).toBe(false);
    });

    it('should include multiple fields when all provided', () => {
      const updates = buildUpdateObject({
        name: 'Updated Dish',
        category: 'primi',
        sellingPrice: 18.0,
        monthlySales: 50,
        isActive: true,
      });
      expect(updates.name).toBe('Updated Dish');
      expect(updates.category).toBe('primi');
      expect(updates.selling_price).toBe(18.0);
      expect(updates.monthly_sales).toBe(50);
      expect(updates.is_active).toBe(true);
    });

    it('should handle boolean false for isActive', () => {
      const updates = buildUpdateObject({ isActive: false });
      expect(updates.is_active).toBe(false);
    });

    it('should handle zero for monthlySales', () => {
      const updates = buildUpdateObject({ monthlySales: 0 });
      expect(updates.monthly_sales).toBe(0);
    });
  });
});

// ============================================
// POST /api/food-cost/dishes/[id]/ingredients validation tests
// ============================================

describe('POST /api/food-cost/dishes/[id]/ingredients validation', () => {
  describe('ingredientName validation', () => {
    it('should fail when ingredientName is undefined', () => {
      const result = validateIngredientName(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('ingredientName is required');
    });

    it('should fail when ingredientName is null', () => {
      const result = validateIngredientName(null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('ingredientName is required');
    });

    it('should fail when ingredientName is empty', () => {
      const result = validateIngredientName('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('ingredientName is required');
    });

    it('should fail when ingredientName is whitespace only', () => {
      const result = validateIngredientName('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('ingredientName is required');
    });

    it('should pass when ingredientName is valid', () => {
      const result = validateIngredientName('Mozzarella');
      expect(result.valid).toBe(true);
    });
  });

  describe('costPerKg validation', () => {
    it('should fail when costPerKg is undefined', () => {
      const result = validateCostPerKg(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('costPerKg must be positive');
    });

    it('should fail when costPerKg is null', () => {
      const result = validateCostPerKg(null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('costPerKg must be positive');
    });

    it('should fail when costPerKg is 0', () => {
      const result = validateCostPerKg(0);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('costPerKg must be positive');
    });

    it('should fail when costPerKg is negative', () => {
      const result = validateCostPerKg(-5);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('costPerKg must be positive');
    });

    it('should pass when costPerKg is positive', () => {
      const result = validateCostPerKg(15.5);
      expect(result.valid).toBe(true);
    });

    it('should pass when costPerKg is small positive', () => {
      const result = validateCostPerKg(0.5);
      expect(result.valid).toBe(true);
    });

    it('should pass when costPerKg is large', () => {
      const result = validateCostPerKg(500);
      expect(result.valid).toBe(true);
    });
  });

  describe('quantityGrams validation', () => {
    it('should fail when quantityGrams is undefined', () => {
      const result = validateQuantityGrams(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('quantityGrams must be positive');
    });

    it('should fail when quantityGrams is null', () => {
      const result = validateQuantityGrams(null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('quantityGrams must be positive');
    });

    it('should fail when quantityGrams is 0', () => {
      const result = validateQuantityGrams(0);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('quantityGrams must be positive');
    });

    it('should fail when quantityGrams is negative', () => {
      const result = validateQuantityGrams(-100);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('quantityGrams must be positive');
    });

    it('should pass when quantityGrams is positive integer', () => {
      const result = validateQuantityGrams(150);
      expect(result.valid).toBe(true);
    });

    it('should pass when quantityGrams is positive decimal', () => {
      const result = validateQuantityGrams(75.5);
      expect(result.valid).toBe(true);
    });

    it('should pass when quantityGrams is small', () => {
      const result = validateQuantityGrams(1);
      expect(result.valid).toBe(true);
    });

    it('should pass when quantityGrams is large', () => {
      const result = validateQuantityGrams(5000);
      expect(result.valid).toBe(true);
    });
  });
});

// ============================================
// Food Cost Calculation Logic Tests
// ============================================

describe('Food Cost Calculation Logic', () => {
  // Calculate cost for a single ingredient
  const calculateIngredientCost = (costPerKg: number, quantityGrams: number): number => {
    return (costPerKg * quantityGrams) / 1000;
  };

  // Calculate total cost for a dish
  const calculateDishCost = (
    ingredients: Array<{ costPerKg: number; quantityGrams: number }>
  ): number => {
    return ingredients.reduce(
      (total, ing) => total + calculateIngredientCost(ing.costPerKg, ing.quantityGrams),
      0
    );
  };

  // Calculate food cost percentage
  const calculateFoodCostPercentage = (cost: number, sellingPrice: number): number => {
    if (sellingPrice <= 0) return 0;
    return Math.round((cost / sellingPrice) * 100 * 100) / 100; // Round to 2 decimals
  };

  // Calculate gross margin
  const calculateGrossMargin = (sellingPrice: number, cost: number): number => {
    return sellingPrice - cost;
  };

  describe('calculateIngredientCost', () => {
    it('should calculate cost correctly for 100g at €10/kg', () => {
      const cost = calculateIngredientCost(10, 100);
      expect(cost).toBe(1);
    });

    it('should calculate cost correctly for 500g at €20/kg', () => {
      const cost = calculateIngredientCost(20, 500);
      expect(cost).toBe(10);
    });

    it('should calculate cost correctly for 250g at €8/kg', () => {
      const cost = calculateIngredientCost(8, 250);
      expect(cost).toBe(2);
    });

    it('should handle small quantities', () => {
      const cost = calculateIngredientCost(50, 5);
      expect(cost).toBe(0.25);
    });

    it('should handle expensive ingredients', () => {
      const cost = calculateIngredientCost(100, 50); // Truffle at €100/kg, 50g
      expect(cost).toBe(5);
    });

    it('should return 0 for 0 quantity', () => {
      const cost = calculateIngredientCost(10, 0);
      expect(cost).toBe(0);
    });
  });

  describe('calculateDishCost', () => {
    it('should sum all ingredient costs', () => {
      const ingredients = [
        { costPerKg: 10, quantityGrams: 200 }, // €2
        { costPerKg: 5, quantityGrams: 100 }, // €0.50
        { costPerKg: 20, quantityGrams: 50 }, // €1
      ];
      const cost = calculateDishCost(ingredients);
      expect(cost).toBe(3.5);
    });

    it('should return 0 for empty ingredients', () => {
      const cost = calculateDishCost([]);
      expect(cost).toBe(0);
    });

    it('should handle single ingredient', () => {
      const cost = calculateDishCost([{ costPerKg: 15, quantityGrams: 300 }]);
      expect(cost).toBe(4.5);
    });

    it('should handle many ingredients', () => {
      const ingredients = [
        { costPerKg: 10, quantityGrams: 100 }, // €1
        { costPerKg: 8, quantityGrams: 200 }, // €1.60
        { costPerKg: 12, quantityGrams: 150 }, // €1.80
        { costPerKg: 25, quantityGrams: 80 }, // €2
        { costPerKg: 6, quantityGrams: 50 }, // €0.30
      ];
      const cost = calculateDishCost(ingredients);
      expect(cost).toBe(6.7);
    });
  });

  describe('calculateFoodCostPercentage', () => {
    it('should calculate 30% food cost correctly', () => {
      const percentage = calculateFoodCostPercentage(3, 10);
      expect(percentage).toBe(30);
    });

    it('should calculate 25% food cost correctly', () => {
      const percentage = calculateFoodCostPercentage(2.5, 10);
      expect(percentage).toBe(25);
    });

    it('should handle decimal percentages', () => {
      const percentage = calculateFoodCostPercentage(3.33, 10);
      expect(percentage).toBe(33.3);
    });

    it('should return 0 for 0 selling price', () => {
      const percentage = calculateFoodCostPercentage(5, 0);
      expect(percentage).toBe(0);
    });

    it('should return 0 for negative selling price', () => {
      const percentage = calculateFoodCostPercentage(5, -10);
      expect(percentage).toBe(0);
    });

    it('should handle 100% food cost', () => {
      const percentage = calculateFoodCostPercentage(10, 10);
      expect(percentage).toBe(100);
    });

    it('should handle cost exceeding price (>100%)', () => {
      const percentage = calculateFoodCostPercentage(15, 10);
      expect(percentage).toBe(150);
    });
  });

  describe('calculateGrossMargin', () => {
    it('should calculate margin correctly', () => {
      const margin = calculateGrossMargin(15, 4.5);
      expect(margin).toBe(10.5);
    });

    it('should handle exact values', () => {
      const margin = calculateGrossMargin(10, 3);
      expect(margin).toBe(7);
    });

    it('should handle zero cost', () => {
      const margin = calculateGrossMargin(10, 0);
      expect(margin).toBe(10);
    });

    it('should handle negative margin (cost > price)', () => {
      const margin = calculateGrossMargin(10, 12);
      expect(margin).toBe(-2);
    });
  });
});

// ============================================
// Category Validation Tests
// ============================================

describe('Dish Category Validation', () => {
  const VALID_CATEGORIES = [
    'antipasti',
    'primi',
    'secondi',
    'contorni',
    'dolci',
    'bevande',
    'pizza',
    'altri',
  ];

  const validateCategory = (category: string): boolean => {
    return VALID_CATEGORIES.includes(category);
  };

  it('should validate antipasti category', () => {
    expect(validateCategory('antipasti')).toBe(true);
  });

  it('should validate primi category', () => {
    expect(validateCategory('primi')).toBe(true);
  });

  it('should validate secondi category', () => {
    expect(validateCategory('secondi')).toBe(true);
  });

  it('should validate contorni category', () => {
    expect(validateCategory('contorni')).toBe(true);
  });

  it('should validate dolci category', () => {
    expect(validateCategory('dolci')).toBe(true);
  });

  it('should validate bevande category', () => {
    expect(validateCategory('bevande')).toBe(true);
  });

  it('should validate pizza category', () => {
    expect(validateCategory('pizza')).toBe(true);
  });

  it('should validate altri category', () => {
    expect(validateCategory('altri')).toBe(true);
  });

  it('should reject invalid category', () => {
    expect(validateCategory('invalid')).toBe(false);
  });

  it('should reject empty category', () => {
    expect(validateCategory('')).toBe(false);
  });

  it('should reject uppercase category', () => {
    expect(validateCategory('PRIMI')).toBe(false);
  });
});

// ============================================
// Currency Validation Tests
// ============================================

describe('Currency Validation', () => {
  const VALID_CURRENCIES = ['EUR', 'USD', 'GBP', 'VND', 'THB', 'JPY', 'CNY', 'KRW'];

  const validateCurrency = (currency: string): boolean => {
    return VALID_CURRENCIES.includes(currency);
  };

  const getDefaultCurrency = (): string => 'EUR';

  it('should validate EUR currency', () => {
    expect(validateCurrency('EUR')).toBe(true);
  });

  it('should validate USD currency', () => {
    expect(validateCurrency('USD')).toBe(true);
  });

  it('should validate Asian currencies', () => {
    expect(validateCurrency('VND')).toBe(true);
    expect(validateCurrency('THB')).toBe(true);
    expect(validateCurrency('JPY')).toBe(true);
    expect(validateCurrency('CNY')).toBe(true);
    expect(validateCurrency('KRW')).toBe(true);
  });

  it('should reject invalid currency', () => {
    expect(validateCurrency('XYZ')).toBe(false);
  });

  it('should reject lowercase currency', () => {
    expect(validateCurrency('eur')).toBe(false);
  });

  it('should default to EUR', () => {
    expect(getDefaultCurrency()).toBe('EUR');
  });
});

// ============================================
// Response Structure Tests
// ============================================

describe('API Response Structures', () => {
  describe('GET /api/food-cost/dishes response', () => {
    const createDishesResponse = (dishes: unknown[]) => ({
      dishes: dishes,
      total: dishes.length,
    });

    it('should have dishes array', () => {
      const response = createDishesResponse([]);
      expect(response.dishes).toEqual([]);
    });

    it('should have total count', () => {
      const response = createDishesResponse([{ id: '1' }, { id: '2' }]);
      expect(response.total).toBe(2);
    });

    it('should match dishes length with total', () => {
      const dishes = [{ id: '1' }, { id: '2' }, { id: '3' }];
      const response = createDishesResponse(dishes);
      expect(response.dishes.length).toBe(response.total);
    });
  });

  describe('POST /api/food-cost/dishes response', () => {
    const createDishResponse = (dish: unknown) => ({
      dish: dish,
    });

    it('should wrap dish in response object', () => {
      const dish = { id: '1', name: 'Test Dish' };
      const response = createDishResponse(dish);
      expect(response.dish).toEqual(dish);
    });
  });

  describe('Error response structure', () => {
    const createErrorResponse = (message: string) => ({
      error: message,
    });

    it('should have error message', () => {
      const response = createErrorResponse('Something went wrong');
      expect(response.error).toBe('Something went wrong');
    });

    it('should handle validation errors', () => {
      const response = createErrorResponse('locationId is required');
      expect(response.error).toBe('locationId is required');
    });
  });
});

// ============================================
// Dish Entity Tests
// ============================================

describe('Dish Entity Structure', () => {
  interface Dish {
    id: string;
    location_id: string;
    name: string;
    category: string;
    selling_price: number;
    currency: string;
    monthly_sales?: number;
    is_active: boolean;
    created_at: string;
    updated_at?: string;
    ingredients?: Ingredient[];
  }

  interface Ingredient {
    id: string;
    dish_id: string;
    ingredient_id?: string;
    ingredient_name: string;
    cost_per_kg: number;
    quantity_grams: number;
  }

  const createValidDish = (): Dish => ({
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    location_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    name: 'Pizza Margherita',
    category: 'pizza',
    selling_price: 12.0,
    currency: 'EUR',
    is_active: true,
    created_at: '2026-01-14T10:00:00Z',
  });

  it('should have required fields', () => {
    const dish = createValidDish();
    expect(dish.id).toBeDefined();
    expect(dish.location_id).toBeDefined();
    expect(dish.name).toBeDefined();
    expect(dish.category).toBeDefined();
    expect(dish.selling_price).toBeDefined();
    expect(dish.currency).toBeDefined();
    expect(dish.is_active).toBeDefined();
    expect(dish.created_at).toBeDefined();
  });

  it('should have valid UUID for id', () => {
    const dish = createValidDish();
    expect(dish.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it('should have valid UUID for location_id', () => {
    const dish = createValidDish();
    expect(dish.location_id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should allow optional monthly_sales', () => {
    const dish: Dish = {
      ...createValidDish(),
      monthly_sales: 100,
    };
    expect(dish.monthly_sales).toBe(100);
  });

  it('should allow optional ingredients array', () => {
    const ingredient: Ingredient = {
      id: 'c3d4e5f6-a7b8-9012-cdef-234567890123',
      dish_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      ingredient_name: 'Mozzarella',
      cost_per_kg: 12,
      quantity_grams: 150,
    };
    const dish: Dish = {
      ...createValidDish(),
      ingredients: [ingredient],
    };
    expect(dish.ingredients).toHaveLength(1);
    expect(dish.ingredients![0].ingredient_name).toBe('Mozzarella');
  });
});

// ============================================
// Soft Delete Logic Tests
// ============================================

describe('Soft Delete Logic', () => {
  const softDelete = (isActive: boolean): { is_active: boolean } => ({
    is_active: false,
  });

  const isDeleted = (dish: { is_active: boolean }): boolean => {
    return !dish.is_active;
  };

  it('should set is_active to false', () => {
    const result = softDelete(true);
    expect(result.is_active).toBe(false);
  });

  it('should identify deleted dishes', () => {
    expect(isDeleted({ is_active: false })).toBe(true);
    expect(isDeleted({ is_active: true })).toBe(false);
  });

  it('should filter out inactive dishes', () => {
    const dishes = [
      { id: '1', is_active: true },
      { id: '2', is_active: false },
      { id: '3', is_active: true },
    ];
    const activeDishes = dishes.filter((d) => d.is_active);
    expect(activeDishes).toHaveLength(2);
    expect(activeDishes.map((d) => d.id)).toEqual(['1', '3']);
  });
});
