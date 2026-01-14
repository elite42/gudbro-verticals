import { describe, it, expect } from 'vitest';
import {
  safetyFilters,
  getFilterById,
  getFiltersByType,
  getAllergens,
  getIntolerances,
  getDiets,
  FILTER_COUNTS,
  type SafetyFilter,
  type FilterType,
} from '../safety-filters';

// ============================================
// safetyFilters data validation
// ============================================

describe('safetyFilters', () => {
  it('should have correct total count (50 filters)', () => {
    expect(safetyFilters.length).toBe(50);
  });

  it('should have 26 allergens', () => {
    const allergens = safetyFilters.filter((f) => f.type === 'allergen');
    expect(allergens.length).toBe(26);
  });

  it('should have 10 intolerances', () => {
    const intolerances = safetyFilters.filter((f) => f.type === 'intolerance');
    expect(intolerances.length).toBe(10);
  });

  it('should have 14 diets', () => {
    const diets = safetyFilters.filter((f) => f.type === 'diet');
    expect(diets.length).toBe(14);
  });

  it('every filter should have required fields', () => {
    safetyFilters.forEach((filter) => {
      expect(filter.id).toBeDefined();
      expect(filter.label).toBeDefined();
      expect(filter.label.en).toBeDefined();
      expect(filter.label.it).toBeDefined();
      expect(filter.label.vi).toBeDefined();
      expect(filter.type).toBeDefined();
    });
  });

  it('every filter should have an icon', () => {
    safetyFilters.forEach((filter) => {
      expect(filter.icon).toBeDefined();
      expect(filter.icon).not.toBe('');
    });
  });

  it('every filter ID should be unique', () => {
    const ids = safetyFilters.map((f) => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  describe('EU 14 mandatory allergens', () => {
    const eu14 = [
      'gluten',
      'crustaceans',
      'eggs',
      'fish',
      'peanuts',
      'soy',
      'milk',
      'nuts',
      'celery',
      'mustard',
      'sesame',
      'sulphites',
      'lupin',
      'molluscs',
    ];

    eu14.forEach((allergenId) => {
      it(`should include EU allergen: ${allergenId}`, () => {
        const filter = safetyFilters.find((f) => f.id === allergenId);
        expect(filter).toBeDefined();
        expect(filter?.type).toBe('allergen');
      });
    });
  });

  describe('Asia-specific allergens', () => {
    const asiaAllergens = ['shellfish', 'squid', 'shrimp', 'shrimp-paste', 'buckwheat'];

    asiaAllergens.forEach((allergenId) => {
      it(`should include Asia allergen: ${allergenId}`, () => {
        const filter = safetyFilters.find((f) => f.id === allergenId);
        expect(filter).toBeDefined();
        expect(filter?.type).toBe('allergen');
      });
    });
  });

  describe('common diets', () => {
    const commonDiets = ['vegan', 'vegetarian', 'halal', 'kosher', 'gluten-free'];

    commonDiets.forEach((dietId) => {
      it(`should include diet: ${dietId}`, () => {
        const filter = safetyFilters.find((f) => f.id === dietId);
        expect(filter).toBeDefined();
        expect(filter?.type).toBe('diet');
      });
    });
  });
});

// ============================================
// getFilterById
// ============================================

describe('getFilterById', () => {
  it('should return filter for valid ID', () => {
    const filter = getFilterById('gluten');
    expect(filter).toBeDefined();
    expect(filter?.id).toBe('gluten');
    expect(filter?.type).toBe('allergen');
  });

  it('should return undefined for invalid ID', () => {
    const filter = getFilterById('nonexistent');
    expect(filter).toBeUndefined();
  });

  it('should return undefined for empty ID', () => {
    const filter = getFilterById('');
    expect(filter).toBeUndefined();
  });

  it('should return correct filter data for vegan', () => {
    const filter = getFilterById('vegan');
    expect(filter?.id).toBe('vegan');
    expect(filter?.label.en).toBe('Vegan');
    expect(filter?.label.it).toBe('Vegano');
    expect(filter?.label.vi).toBe('Thuần chay');
    expect(filter?.type).toBe('diet');
    expect(filter?.icon).toBe('🌱');
  });

  it('should return correct filter data for lactose', () => {
    const filter = getFilterById('lactose');
    expect(filter?.id).toBe('lactose');
    expect(filter?.type).toBe('intolerance');
    expect(filter?.icon).toBe('🥛');
  });
});

// ============================================
// getFiltersByType
// ============================================

describe('getFiltersByType', () => {
  it('should return all allergens', () => {
    const allergens = getFiltersByType('allergen');
    expect(allergens.length).toBe(26);
    allergens.forEach((filter) => {
      expect(filter.type).toBe('allergen');
    });
  });

  it('should return all intolerances', () => {
    const intolerances = getFiltersByType('intolerance');
    expect(intolerances.length).toBe(10);
    intolerances.forEach((filter) => {
      expect(filter.type).toBe('intolerance');
    });
  });

  it('should return all diets', () => {
    const diets = getFiltersByType('diet');
    expect(diets.length).toBe(14);
    diets.forEach((filter) => {
      expect(filter.type).toBe('diet');
    });
  });

  it('should return empty array for invalid type', () => {
    const filters = getFiltersByType('invalid' as FilterType);
    expect(filters).toEqual([]);
  });
});

// ============================================
// Helper functions (getAllergens, getIntolerances, getDiets)
// ============================================

describe('getAllergens', () => {
  it('should return 26 allergens', () => {
    const allergens = getAllergens();
    expect(allergens.length).toBe(26);
  });

  it('should only return allergen type', () => {
    const allergens = getAllergens();
    allergens.forEach((filter) => {
      expect(filter.type).toBe('allergen');
    });
  });

  it('should include gluten allergen', () => {
    const allergens = getAllergens();
    const gluten = allergens.find((a) => a.id === 'gluten');
    expect(gluten).toBeDefined();
  });
});

describe('getIntolerances', () => {
  it('should return 10 intolerances', () => {
    const intolerances = getIntolerances();
    expect(intolerances.length).toBe(10);
  });

  it('should only return intolerance type', () => {
    const intolerances = getIntolerances();
    intolerances.forEach((filter) => {
      expect(filter.type).toBe('intolerance');
    });
  });

  it('should include lactose intolerance', () => {
    const intolerances = getIntolerances();
    const lactose = intolerances.find((i) => i.id === 'lactose');
    expect(lactose).toBeDefined();
  });

  it('should include FODMAP intolerance', () => {
    const intolerances = getIntolerances();
    const fodmap = intolerances.find((i) => i.id === 'fodmap');
    expect(fodmap).toBeDefined();
  });
});

describe('getDiets', () => {
  it('should return 14 diets', () => {
    const diets = getDiets();
    expect(diets.length).toBe(14);
  });

  it('should only return diet type', () => {
    const diets = getDiets();
    diets.forEach((filter) => {
      expect(filter.type).toBe('diet');
    });
  });

  it('should include vegan diet', () => {
    const diets = getDiets();
    const vegan = diets.find((d) => d.id === 'vegan');
    expect(vegan).toBeDefined();
  });

  it('should include halal diet', () => {
    const diets = getDiets();
    const halal = diets.find((d) => d.id === 'halal');
    expect(halal).toBeDefined();
  });

  it('should include keto diet', () => {
    const diets = getDiets();
    const keto = diets.find((d) => d.id === 'keto');
    expect(keto).toBeDefined();
  });
});

// ============================================
// FILTER_COUNTS
// ============================================

describe('FILTER_COUNTS', () => {
  it('should have correct allergen count', () => {
    expect(FILTER_COUNTS.allergens).toBe(26);
  });

  it('should have correct intolerance count', () => {
    expect(FILTER_COUNTS.intolerances).toBe(10);
  });

  it('should have correct diet count', () => {
    expect(FILTER_COUNTS.diets).toBe(14);
  });

  it('should have correct total count', () => {
    expect(FILTER_COUNTS.total).toBe(50);
  });

  it('total should equal sum of categories', () => {
    expect(FILTER_COUNTS.total).toBe(
      FILTER_COUNTS.allergens + FILTER_COUNTS.intolerances + FILTER_COUNTS.diets
    );
  });
});

// ============================================
// Multi-language support
// ============================================

describe('Multi-language support', () => {
  it('all filters should have English labels', () => {
    safetyFilters.forEach((filter) => {
      expect(filter.label.en).toBeDefined();
      expect(filter.label.en.length).toBeGreaterThan(0);
    });
  });

  it('all filters should have Italian labels', () => {
    safetyFilters.forEach((filter) => {
      expect(filter.label.it).toBeDefined();
      expect(filter.label.it.length).toBeGreaterThan(0);
    });
  });

  it('all filters should have Vietnamese labels', () => {
    safetyFilters.forEach((filter) => {
      expect(filter.label.vi).toBeDefined();
      expect(filter.label.vi.length).toBeGreaterThan(0);
    });
  });

  it('Vietnamese labels for allergens should be correct', () => {
    const eggs = getFilterById('eggs');
    expect(eggs?.label.vi).toBe('Trứng');

    const shrimp = getFilterById('shrimp');
    expect(shrimp?.label.vi).toBe('Tôm');

    const peanuts = getFilterById('peanuts');
    expect(peanuts?.label.vi).toBe('Đậu phộng');
  });
});
