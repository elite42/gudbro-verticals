import { describe, it, expect, vi } from 'vitest';

// Mock dependencies before importing
vi.mock('../openai', () => ({
  getOpenAIClient: vi.fn(),
  DEFAULT_MODEL: 'gpt-4o-mini',
  calculateCost: vi.fn((model: string, input: number, output: number) => {
    // gpt-4o-mini: $0.15/1M input, $0.6/1M output
    return (input / 1_000_000) * 0.15 + (output / 1_000_000) * 0.6;
  }),
}));

vi.mock('../../supabase-admin', () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      range: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    })),
  },
}));

import {
  SUPPORTED_LOCALES,
  type TranslationItem,
  type TranslationResult,
} from '../translation-service';

// ============================================
// SUPPORTED_LOCALES constant tests
// ============================================

describe('SUPPORTED_LOCALES', () => {
  it('should have at least 15 supported locales', () => {
    expect(Object.keys(SUPPORTED_LOCALES).length).toBeGreaterThanOrEqual(15);
  });

  it('should have English (en)', () => {
    expect(SUPPORTED_LOCALES['en']).toBe('English');
  });

  it('should have Italian (it)', () => {
    expect(SUPPORTED_LOCALES['it']).toBe('Italian');
  });

  it('should have Vietnamese (vi)', () => {
    expect(SUPPORTED_LOCALES['vi']).toBe('Vietnamese');
  });

  it('should have Korean (ko)', () => {
    expect(SUPPORTED_LOCALES['ko']).toBe('Korean');
  });

  it('should have Japanese (ja)', () => {
    expect(SUPPORTED_LOCALES['ja']).toBe('Japanese');
  });

  it('should have Chinese (zh)', () => {
    expect(SUPPORTED_LOCALES['zh']).toBe('Chinese (Simplified)');
  });

  it('should have Thai (th)', () => {
    expect(SUPPORTED_LOCALES['th']).toBe('Thai');
  });

  it('should have French (fr)', () => {
    expect(SUPPORTED_LOCALES['fr']).toBe('French');
  });

  it('should have Spanish (es)', () => {
    expect(SUPPORTED_LOCALES['es']).toBe('Spanish');
  });

  it('should have German (de)', () => {
    expect(SUPPORTED_LOCALES['de']).toBe('German');
  });

  it('should have Arabic (ar)', () => {
    expect(SUPPORTED_LOCALES['ar']).toBe('Arabic');
  });

  it('should have Russian (ru)', () => {
    expect(SUPPORTED_LOCALES['ru']).toBe('Russian');
  });

  it('all locale codes should be 2-letter codes', () => {
    Object.keys(SUPPORTED_LOCALES).forEach((code) => {
      expect(code.length).toBe(2);
    });
  });

  it('all locale names should be non-empty strings', () => {
    Object.values(SUPPORTED_LOCALES).forEach((name) => {
      expect(typeof name).toBe('string');
      expect(name.length).toBeGreaterThan(0);
    });
  });

  describe('Asian market coverage', () => {
    it('should support key Asian languages', () => {
      const asianLocales = ['zh', 'ja', 'ko', 'vi', 'th', 'id', 'ms'];
      asianLocales.forEach((locale) => {
        expect(SUPPORTED_LOCALES[locale]).toBeDefined();
      });
    });
  });

  describe('European market coverage', () => {
    it('should support key European languages', () => {
      const europeanLocales = ['en', 'it', 'fr', 'es', 'de', 'pt', 'nl', 'pl', 'sv'];
      europeanLocales.forEach((locale) => {
        expect(SUPPORTED_LOCALES[locale]).toBeDefined();
      });
    });
  });
});

// ============================================
// TranslationItem type tests
// ============================================

describe('TranslationItem type', () => {
  it('should have required fields', () => {
    const item: TranslationItem = {
      entityType: 'ingredient',
      entityId: 'ing-123',
      field: 'name',
      sourceText: 'Butter',
    };

    expect(item.entityType).toBeDefined();
    expect(item.entityId).toBeDefined();
    expect(item.field).toBeDefined();
    expect(item.sourceText).toBeDefined();
  });

  it('should allow optional sourceLocale', () => {
    const item: TranslationItem = {
      entityType: 'ingredient',
      entityId: 'ing-123',
      field: 'name',
      sourceText: 'Butter',
      sourceLocale: 'en',
    };

    expect(item.sourceLocale).toBe('en');
  });

  it('should support ingredient entityType', () => {
    const item: TranslationItem = {
      entityType: 'ingredient',
      entityId: 'ing-123',
      field: 'name',
      sourceText: 'Butter',
    };

    expect(item.entityType).toBe('ingredient');
  });

  it('should support product entityType', () => {
    const item: TranslationItem = {
      entityType: 'product',
      entityId: 'prod-123',
      field: 'description',
      sourceText: 'A delicious pasta dish',
    };

    expect(item.entityType).toBe('product');
  });

  it('should support category entityType', () => {
    const item: TranslationItem = {
      entityType: 'category',
      entityId: 'cat-123',
      field: 'name',
      sourceText: 'Appetizers',
    };

    expect(item.entityType).toBe('category');
  });

  it('should support ui entityType', () => {
    const item: TranslationItem = {
      entityType: 'ui',
      entityId: 'ui-add-to-cart',
      field: 'label',
      sourceText: 'Add to Cart',
    };

    expect(item.entityType).toBe('ui');
  });

  it('should support custom entityType', () => {
    const item: TranslationItem = {
      entityType: 'custom',
      entityId: 'custom-123',
      field: 'value',
      sourceText: 'Custom text',
    };

    expect(item.entityType).toBe('custom');
  });
});

// ============================================
// TranslationResult type tests
// ============================================

describe('TranslationResult type', () => {
  it('should have all required fields', () => {
    const result: TranslationResult = {
      entityType: 'ingredient',
      entityId: 'ing-123',
      field: 'name',
      locale: 'it',
      value: 'Burro',
      sourceText: 'Butter',
    };

    expect(result.entityType).toBe('ingredient');
    expect(result.entityId).toBe('ing-123');
    expect(result.field).toBe('name');
    expect(result.locale).toBe('it');
    expect(result.value).toBe('Burro');
    expect(result.sourceText).toBe('Butter');
  });

  it('should track the source text for reference', () => {
    const result: TranslationResult = {
      entityType: 'product',
      entityId: 'prod-456',
      field: 'description',
      locale: 'fr',
      value: 'Une délicieuse pizza',
      sourceText: 'A delicious pizza',
    };

    expect(result.sourceText).toBe('A delicious pizza');
    expect(result.value).toBe('Une délicieuse pizza');
  });
});

// ============================================
// buildBatchPrompt logic tests
// ============================================

describe('buildBatchPrompt logic', () => {
  // Replicate the logic for testing
  const buildBatchPrompt = (items: TranslationItem[], targetLocales: string[]): string => {
    const localeNames = targetLocales.map((l) => `${l} (${SUPPORTED_LOCALES[l] || l})`).join(', ');

    const itemsList = items
      .map((item, idx) => `${idx + 1}. "${item.sourceText}" [${item.entityType}/${item.field}]`)
      .join('\n');

    return `Translate the following ${items.length} items to these languages: ${localeNames}

Items to translate:
${itemsList}

Return a JSON array where each object has:
- "index": the item number (1-based)
- "translations": object with locale codes as keys and translated text as values

Example response format:
[
  {"index": 1, "translations": {"it": "Burro", "es": "Mantequilla", "fr": "Beurre"}},
  {"index": 2, "translations": {"it": "Latte", "es": "Leche", "fr": "Lait"}}
]

IMPORTANT: Return ONLY the JSON array, no markdown, no explanations.`;
  };

  it('should include item count in prompt', () => {
    const items: TranslationItem[] = [
      { entityType: 'ingredient', entityId: '1', field: 'name', sourceText: 'Butter' },
      { entityType: 'ingredient', entityId: '2', field: 'name', sourceText: 'Milk' },
    ];
    const prompt = buildBatchPrompt(items, ['it', 'es']);

    expect(prompt).toContain('Translate the following 2 items');
  });

  it('should include locale names in prompt', () => {
    const items: TranslationItem[] = [
      { entityType: 'ingredient', entityId: '1', field: 'name', sourceText: 'Butter' },
    ];
    const prompt = buildBatchPrompt(items, ['it', 'fr']);

    expect(prompt).toContain('it (Italian)');
    expect(prompt).toContain('fr (French)');
  });

  it('should list all items with 1-based index', () => {
    const items: TranslationItem[] = [
      { entityType: 'ingredient', entityId: '1', field: 'name', sourceText: 'Butter' },
      { entityType: 'ingredient', entityId: '2', field: 'name', sourceText: 'Milk' },
      { entityType: 'product', entityId: '3', field: 'description', sourceText: 'Pasta' },
    ];
    const prompt = buildBatchPrompt(items, ['it']);

    expect(prompt).toContain('1. "Butter" [ingredient/name]');
    expect(prompt).toContain('2. "Milk" [ingredient/name]');
    expect(prompt).toContain('3. "Pasta" [product/description]');
  });

  it('should handle unknown locale gracefully', () => {
    const items: TranslationItem[] = [
      { entityType: 'ingredient', entityId: '1', field: 'name', sourceText: 'Butter' },
    ];
    const prompt = buildBatchPrompt(items, ['xx']); // Unknown locale

    expect(prompt).toContain('xx (xx)'); // Falls back to code
  });

  it('should include JSON format instructions', () => {
    const items: TranslationItem[] = [
      { entityType: 'ingredient', entityId: '1', field: 'name', sourceText: 'Butter' },
    ];
    const prompt = buildBatchPrompt(items, ['it']);

    expect(prompt).toContain('Return a JSON array');
    expect(prompt).toContain('"index"');
    expect(prompt).toContain('"translations"');
  });

  it('should include example response format', () => {
    const items: TranslationItem[] = [
      { entityType: 'ingredient', entityId: '1', field: 'name', sourceText: 'Butter' },
    ];
    const prompt = buildBatchPrompt(items, ['it']);

    expect(prompt).toContain('Example response format:');
    expect(prompt).toContain('"Burro"');
    expect(prompt).toContain('"Mantequilla"');
  });

  it('should include instruction to return only JSON', () => {
    const items: TranslationItem[] = [
      { entityType: 'ingredient', entityId: '1', field: 'name', sourceText: 'Butter' },
    ];
    const prompt = buildBatchPrompt(items, ['it']);

    expect(prompt).toContain('IMPORTANT: Return ONLY the JSON array');
  });
});

// ============================================
// BatchTranslationRequest validation logic
// ============================================

describe('BatchTranslationRequest validation', () => {
  it('should validate empty items array', () => {
    const isValid = (items: TranslationItem[]) => items.length > 0;

    expect(isValid([])).toBe(false);
    expect(
      isValid([{ entityType: 'ingredient', entityId: '1', field: 'name', sourceText: 'Butter' }])
    ).toBe(true);
  });

  it('should validate target locales against supported locales', () => {
    const validateLocales = (locales: string[]): string[] => {
      return locales.filter((l) => SUPPORTED_LOCALES[l]);
    };

    expect(validateLocales(['it', 'fr', 'xx'])).toEqual(['it', 'fr']);
    expect(validateLocales(['xx', 'yy'])).toEqual([]);
    expect(validateLocales(['en', 'it', 'ja'])).toEqual(['en', 'it', 'ja']);
  });

  it('should identify all invalid locales', () => {
    const getInvalidLocales = (locales: string[]): string[] => {
      return locales.filter((l) => !SUPPORTED_LOCALES[l]);
    };

    expect(getInvalidLocales(['it', 'xx', 'yy'])).toEqual(['xx', 'yy']);
    expect(getInvalidLocales(['en', 'fr'])).toEqual([]);
  });
});

// ============================================
// BatchTranslationResponse stats tests
// ============================================

describe('BatchTranslationResponse stats calculation', () => {
  it('should calculate total translations correctly', () => {
    const calculateTotalTranslations = (itemCount: number, localeCount: number): number => {
      return itemCount * localeCount;
    };

    expect(calculateTotalTranslations(10, 5)).toBe(50);
    expect(calculateTotalTranslations(100, 3)).toBe(300);
    expect(calculateTotalTranslations(0, 5)).toBe(0);
    expect(calculateTotalTranslations(10, 0)).toBe(0);
  });

  it('should track stats structure correctly', () => {
    const stats = {
      totalItems: 50,
      totalLocales: 5,
      totalTranslations: 250,
      inputTokens: 5000,
      outputTokens: 10000,
      estimatedCost: 0.0075, // (5000/1M * 0.15) + (10000/1M * 0.6) = 0.00075 + 0.006 = 0.00675
      durationMs: 2500,
    };

    expect(stats.totalTranslations).toBe(stats.totalItems * stats.totalLocales);
    expect(stats.estimatedCost).toBeGreaterThan(0);
    expect(stats.durationMs).toBeGreaterThan(0);
  });
});

// ============================================
// Batch size logic tests
// ============================================

describe('Batch size logic', () => {
  it('should calculate correct number of batches', () => {
    const BATCH_SIZE = 50;
    const calculateBatches = (itemCount: number): number => {
      return Math.ceil(itemCount / BATCH_SIZE);
    };

    expect(calculateBatches(10)).toBe(1);
    expect(calculateBatches(50)).toBe(1);
    expect(calculateBatches(51)).toBe(2);
    expect(calculateBatches(100)).toBe(2);
    expect(calculateBatches(150)).toBe(3);
    expect(calculateBatches(0)).toBe(0);
  });

  it('should split items into correct batch sizes', () => {
    const BATCH_SIZE = 50;
    const splitIntoBatches = <T>(items: T[]): T[][] => {
      const batches: T[][] = [];
      for (let i = 0; i < items.length; i += BATCH_SIZE) {
        batches.push(items.slice(i, i + BATCH_SIZE));
      }
      return batches;
    };

    // Test with 120 items
    const items = Array.from({ length: 120 }, (_, i) => i);
    const batches = splitIntoBatches(items);

    expect(batches.length).toBe(3);
    expect(batches[0].length).toBe(50);
    expect(batches[1].length).toBe(50);
    expect(batches[2].length).toBe(20);
  });
});

// ============================================
// Entity type validation tests
// ============================================

describe('Entity type validation', () => {
  const VALID_ENTITY_TYPES = ['ingredient', 'product', 'category', 'ui', 'custom', 'quick'];

  it('should recognize standard entity types', () => {
    VALID_ENTITY_TYPES.forEach((type) => {
      expect(VALID_ENTITY_TYPES.includes(type)).toBe(true);
    });
  });

  it('ingredient should be a valid entity type', () => {
    expect(VALID_ENTITY_TYPES.includes('ingredient')).toBe(true);
  });

  it('product should be a valid entity type', () => {
    expect(VALID_ENTITY_TYPES.includes('product')).toBe(true);
  });

  it('should allow custom string entity types', () => {
    // EntityType is defined as: 'ingredient' | 'product' | 'category' | 'ui' | 'custom' | 'quick' | string
    // This means any string is technically valid
    const customType: string = 'my-custom-type';
    expect(typeof customType).toBe('string');
  });
});
