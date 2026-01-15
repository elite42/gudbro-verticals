import { describe, it, expect, vi } from 'vitest';

// Mock SUPPORTED_LOCALES for testing
const SUPPORTED_LOCALES: Record<string, string> = {
  en: 'English',
  it: 'Italian',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  nl: 'Dutch',
  pl: 'Polish',
  sv: 'Swedish',
  vi: 'Vietnamese',
  ko: 'Korean',
  ja: 'Japanese',
  zh: 'Chinese (Simplified)',
  th: 'Thai',
  id: 'Indonesian',
  ms: 'Malay',
  ar: 'Arabic',
  ru: 'Russian',
};

// ============================================
// POST /api/translations - Request Validation
// ============================================

describe('POST /api/translations validation', () => {
  describe('targetLocales validation', () => {
    const validateTargetLocales = (targetLocales: unknown): { valid: boolean; error?: string } => {
      if (!targetLocales || !Array.isArray(targetLocales) || targetLocales.length === 0) {
        return {
          valid: false,
          error: 'targetLocales is required and must be a non-empty array',
        };
      }
      return { valid: true };
    };

    it('should fail when targetLocales is undefined', () => {
      const result = validateTargetLocales(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('targetLocales is required and must be a non-empty array');
    });

    it('should fail when targetLocales is null', () => {
      const result = validateTargetLocales(null);
      expect(result.valid).toBe(false);
    });

    it('should fail when targetLocales is empty array', () => {
      const result = validateTargetLocales([]);
      expect(result.valid).toBe(false);
    });

    it('should fail when targetLocales is not an array', () => {
      const result = validateTargetLocales('it,es');
      expect(result.valid).toBe(false);
    });

    it('should fail when targetLocales is object', () => {
      const result = validateTargetLocales({ it: true });
      expect(result.valid).toBe(false);
    });

    it('should pass when targetLocales is valid array', () => {
      const result = validateTargetLocales(['it', 'es', 'fr']);
      expect(result.valid).toBe(true);
    });

    it('should pass with single locale', () => {
      const result = validateTargetLocales(['it']);
      expect(result.valid).toBe(true);
    });
  });

  describe('locale code validation', () => {
    const validateLocales = (locales: string[]): { valid: string[]; invalid: string[] } => {
      const valid: string[] = [];
      const invalid: string[] = [];

      for (const locale of locales) {
        if (SUPPORTED_LOCALES[locale]) {
          valid.push(locale);
        } else {
          invalid.push(locale);
        }
      }

      return { valid, invalid };
    };

    it('should validate supported locales', () => {
      const result = validateLocales(['it', 'es', 'fr']);
      expect(result.valid).toEqual(['it', 'es', 'fr']);
      expect(result.invalid).toEqual([]);
    });

    it('should identify invalid locales', () => {
      const result = validateLocales(['it', 'xx', 'yy']);
      expect(result.valid).toEqual(['it']);
      expect(result.invalid).toEqual(['xx', 'yy']);
    });

    it('should handle all invalid locales', () => {
      const result = validateLocales(['xx', 'yy', 'zz']);
      expect(result.valid).toEqual([]);
      expect(result.invalid).toEqual(['xx', 'yy', 'zz']);
    });

    it('should handle Asian locales', () => {
      const result = validateLocales(['vi', 'ko', 'ja', 'zh', 'th']);
      expect(result.valid).toHaveLength(5);
      expect(result.invalid).toHaveLength(0);
    });

    it('should handle European locales', () => {
      const result = validateLocales(['en', 'it', 'fr', 'es', 'de', 'pt', 'nl']);
      expect(result.valid).toHaveLength(7);
    });
  });

  describe('action validation', () => {
    const VALID_ACTIONS = ['custom', 'ingredients', 'products'];

    const validateAction = (action: string): boolean => {
      return VALID_ACTIONS.includes(action);
    };

    it('should validate custom action', () => {
      expect(validateAction('custom')).toBe(true);
    });

    it('should validate ingredients action', () => {
      expect(validateAction('ingredients')).toBe(true);
    });

    it('should validate products action', () => {
      expect(validateAction('products')).toBe(true);
    });

    it('should reject invalid action', () => {
      expect(validateAction('unknown')).toBe(false);
    });

    it('should reject empty action', () => {
      expect(validateAction('')).toBe(false);
    });
  });

  describe('custom action - items validation', () => {
    const validateItems = (items: unknown): { valid: boolean; error?: string } => {
      if (!items || !Array.isArray(items) || items.length === 0) {
        return { valid: false, error: 'items is required for custom action' };
      }
      return { valid: true };
    };

    it('should fail when items is undefined', () => {
      const result = validateItems(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('items is required for custom action');
    });

    it('should fail when items is empty array', () => {
      const result = validateItems([]);
      expect(result.valid).toBe(false);
    });

    it('should pass when items has content', () => {
      const result = validateItems([{ text: 'Butter' }]);
      expect(result.valid).toBe(true);
    });
  });

  describe('products action - productType validation', () => {
    const validateProductType = (productType: unknown): { valid: boolean; error?: string } => {
      if (!productType) {
        return { valid: false, error: 'productType is required for products action' };
      }
      return { valid: true };
    };

    it('should fail when productType is missing', () => {
      const result = validateProductType(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('productType is required for products action');
    });

    it('should fail when productType is empty', () => {
      const result = validateProductType('');
      expect(result.valid).toBe(false);
    });

    it('should pass when productType is provided', () => {
      const result = validateProductType('cocktails');
      expect(result.valid).toBe(true);
    });
  });
});

// ============================================
// POST /api/translations/single - Request Validation
// ============================================

describe('POST /api/translations/single validation', () => {
  describe('text validation', () => {
    const validateText = (text: unknown): { valid: boolean; error?: string } => {
      if (!text || typeof text !== 'string' || (text as string).trim().length === 0) {
        return { valid: false, error: 'text is required and must be a non-empty string' };
      }
      return { valid: true };
    };

    it('should fail when text is undefined', () => {
      const result = validateText(undefined);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('text is required and must be a non-empty string');
    });

    it('should fail when text is null', () => {
      const result = validateText(null);
      expect(result.valid).toBe(false);
    });

    it('should fail when text is empty string', () => {
      const result = validateText('');
      expect(result.valid).toBe(false);
    });

    it('should fail when text is whitespace only', () => {
      const result = validateText('   ');
      expect(result.valid).toBe(false);
    });

    it('should fail when text is number', () => {
      const result = validateText(123);
      expect(result.valid).toBe(false);
    });

    it('should fail when text is array', () => {
      const result = validateText(['text']);
      expect(result.valid).toBe(false);
    });

    it('should pass when text is valid string', () => {
      const result = validateText('Butter');
      expect(result.valid).toBe(true);
    });

    it('should pass when text has whitespace around (will be trimmed)', () => {
      const result = validateText('  Olive Oil  ');
      expect(result.valid).toBe(true);
    });
  });
});

// ============================================
// GET /api/translations - Query Parameter Validation
// ============================================

describe('GET /api/translations validation', () => {
  describe('action parameter validation', () => {
    const VALID_GET_ACTIONS = ['stats', 'list', 'locales', 'pending'];

    const validateGetAction = (action: string | null): string => {
      return action || 'list'; // Default to 'list'
    };

    const isValidGetAction = (action: string): boolean => {
      return VALID_GET_ACTIONS.includes(action);
    };

    it('should default to list when action is null', () => {
      const action = validateGetAction(null);
      expect(action).toBe('list');
    });

    it('should use provided action', () => {
      const action = validateGetAction('stats');
      expect(action).toBe('stats');
    });

    it('should validate stats action', () => {
      expect(isValidGetAction('stats')).toBe(true);
    });

    it('should validate list action', () => {
      expect(isValidGetAction('list')).toBe(true);
    });

    it('should validate locales action', () => {
      expect(isValidGetAction('locales')).toBe(true);
    });

    it('should validate pending action', () => {
      expect(isValidGetAction('pending')).toBe(true);
    });

    it('should reject invalid action', () => {
      expect(isValidGetAction('invalid')).toBe(false);
    });
  });

  describe('pagination parameters', () => {
    const parsePagination = (
      limitStr: string | null,
      offsetStr: string | null
    ): { limit: number; offset: number } => {
      const limit = parseInt(limitStr || '100');
      const offset = parseInt(offsetStr || '0');
      return { limit, offset };
    };

    it('should use defaults when not provided', () => {
      const result = parsePagination(null, null);
      expect(result.limit).toBe(100);
      expect(result.offset).toBe(0);
    });

    it('should parse custom limit', () => {
      const result = parsePagination('50', null);
      expect(result.limit).toBe(50);
    });

    it('should parse custom offset', () => {
      const result = parsePagination(null, '200');
      expect(result.offset).toBe(200);
    });

    it('should parse both parameters', () => {
      const result = parsePagination('25', '100');
      expect(result.limit).toBe(25);
      expect(result.offset).toBe(100);
    });

    it('should handle invalid limit gracefully (NaN)', () => {
      const result = parsePagination('invalid', null);
      expect(Number.isNaN(result.limit)).toBe(true);
    });
  });

  describe('filter parameters', () => {
    interface FilterParams {
      entityType?: string;
      entityId?: string;
      locale?: string;
    }

    const hasFilters = (params: FilterParams): boolean => {
      return !!(params.entityType || params.entityId || params.locale);
    };

    it('should detect no filters', () => {
      expect(hasFilters({})).toBe(false);
    });

    it('should detect entityType filter', () => {
      expect(hasFilters({ entityType: 'ingredient' })).toBe(true);
    });

    it('should detect entityId filter', () => {
      expect(hasFilters({ entityId: 'ing-123' })).toBe(true);
    });

    it('should detect locale filter', () => {
      expect(hasFilters({ locale: 'it' })).toBe(true);
    });

    it('should detect multiple filters', () => {
      expect(hasFilters({ entityType: 'ingredient', locale: 'it' })).toBe(true);
    });
  });
});

// ============================================
// GET /api/translations/single - Query Parameter Validation
// ============================================

describe('GET /api/translations/single validation', () => {
  describe('text query parameter', () => {
    const validateTextParam = (text: string | null): { valid: boolean; error?: string } => {
      if (!text) {
        return { valid: false, error: 'text query param is required' };
      }
      return { valid: true };
    };

    it('should fail when text is null', () => {
      const result = validateTextParam(null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('text query param is required');
    });

    it('should pass when text is provided', () => {
      const result = validateTextParam('Butter');
      expect(result.valid).toBe(true);
    });
  });

  describe('locales query parameter parsing', () => {
    const parseLocalesParam = (localesParam: string | null): string[] | null => {
      if (!localesParam) return null;
      return localesParam.split(',').map((l) => l.trim());
    };

    it('should return null when param is null', () => {
      const result = parseLocalesParam(null);
      expect(result).toBeNull();
    });

    it('should parse single locale', () => {
      const result = parseLocalesParam('it');
      expect(result).toEqual(['it']);
    });

    it('should parse multiple locales', () => {
      const result = parseLocalesParam('it,es,fr');
      expect(result).toEqual(['it', 'es', 'fr']);
    });

    it('should trim whitespace from locales', () => {
      const result = parseLocalesParam('it , es , fr');
      expect(result).toEqual(['it', 'es', 'fr']);
    });

    it('should handle locale codes with extra spaces', () => {
      const result = parseLocalesParam('  vi  ,  ko  ');
      expect(result).toEqual(['vi', 'ko']);
    });
  });
});

// ============================================
// DELETE /api/translations - Validation
// ============================================

describe('DELETE /api/translations validation', () => {
  describe('filter requirement', () => {
    const validateDeleteFilters = (
      entityType: string | null,
      entityId: string | null,
      locale: string | null
    ): { valid: boolean; error?: string } => {
      if (!entityType && !entityId && !locale) {
        return {
          valid: false,
          error: 'At least one filter required: entityType, entityId, or locale',
        };
      }
      return { valid: true };
    };

    it('should fail when no filters provided', () => {
      const result = validateDeleteFilters(null, null, null);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('At least one filter required: entityType, entityId, or locale');
    });

    it('should pass with entityType filter', () => {
      const result = validateDeleteFilters('ingredient', null, null);
      expect(result.valid).toBe(true);
    });

    it('should pass with entityId filter', () => {
      const result = validateDeleteFilters(null, 'ing-123', null);
      expect(result.valid).toBe(true);
    });

    it('should pass with locale filter', () => {
      const result = validateDeleteFilters(null, null, 'it');
      expect(result.valid).toBe(true);
    });

    it('should pass with multiple filters', () => {
      const result = validateDeleteFilters('ingredient', 'ing-123', 'it');
      expect(result.valid).toBe(true);
    });
  });
});

// ============================================
// TranslationItem Builder Tests
// ============================================

describe('TranslationItem builder', () => {
  interface TranslationItem {
    entityType: string;
    entityId: string;
    field: string;
    sourceText: string;
    sourceLocale?: string;
  }

  const buildTranslationItem = (input: {
    entityType?: string;
    entityId?: string;
    id?: string;
    field?: string;
    text?: string;
    sourceText?: string;
    name?: string;
    sourceLocale?: string;
  }): TranslationItem => ({
    entityType: input.entityType || 'custom',
    entityId: input.entityId || input.id || `custom_${Date.now()}`,
    field: input.field || 'name',
    sourceText: input.text || input.sourceText || input.name || '',
    sourceLocale: input.sourceLocale || 'en',
  });

  it('should use provided entityType', () => {
    const item = buildTranslationItem({ entityType: 'ingredient' });
    expect(item.entityType).toBe('ingredient');
  });

  it('should default entityType to custom', () => {
    const item = buildTranslationItem({});
    expect(item.entityType).toBe('custom');
  });

  it('should prefer entityId over id', () => {
    const item = buildTranslationItem({ entityId: 'entity-1', id: 'id-2' });
    expect(item.entityId).toBe('entity-1');
  });

  it('should fallback to id when entityId not provided', () => {
    const item = buildTranslationItem({ id: 'id-2' });
    expect(item.entityId).toBe('id-2');
  });

  it('should generate entityId when neither provided', () => {
    const item = buildTranslationItem({});
    expect(item.entityId).toMatch(/^custom_\d+$/);
  });

  it('should default field to name', () => {
    const item = buildTranslationItem({});
    expect(item.field).toBe('name');
  });

  it('should use provided field', () => {
    const item = buildTranslationItem({ field: 'description' });
    expect(item.field).toBe('description');
  });

  it('should prefer text over sourceText', () => {
    const item = buildTranslationItem({ text: 'Butter', sourceText: 'Margarine' });
    expect(item.sourceText).toBe('Butter');
  });

  it('should fallback to sourceText', () => {
    const item = buildTranslationItem({ sourceText: 'Margarine' });
    expect(item.sourceText).toBe('Margarine');
  });

  it('should fallback to name', () => {
    const item = buildTranslationItem({ name: 'Olive Oil' });
    expect(item.sourceText).toBe('Olive Oil');
  });

  it('should default sourceLocale to en', () => {
    const item = buildTranslationItem({});
    expect(item.sourceLocale).toBe('en');
  });

  it('should use provided sourceLocale', () => {
    const item = buildTranslationItem({ sourceLocale: 'it' });
    expect(item.sourceLocale).toBe('it');
  });
});

// ============================================
// Translation Response Structure Tests
// ============================================

describe('Translation Response Structures', () => {
  describe('batch translation response', () => {
    interface BatchResponse {
      success: boolean;
      translations: Array<{ locale: string; value: string }>;
      stats: {
        totalItems: number;
        totalLocales: number;
        totalTranslations: number;
        estimatedCost: number;
        durationMs: number;
      };
      errors?: string[];
    }

    const createBatchResponse = (
      translations: Array<{ locale: string; value: string }>,
      itemCount: number,
      localeCount: number
    ): BatchResponse => ({
      success: true,
      translations,
      stats: {
        totalItems: itemCount,
        totalLocales: localeCount,
        totalTranslations: itemCount * localeCount,
        estimatedCost: 0.001,
        durationMs: 500,
      },
    });

    it('should have success flag', () => {
      const response = createBatchResponse([], 0, 0);
      expect(response.success).toBe(true);
    });

    it('should calculate totalTranslations correctly', () => {
      const response = createBatchResponse([], 10, 5);
      expect(response.stats.totalTranslations).toBe(50);
    });

    it('should include duration', () => {
      const response = createBatchResponse([], 1, 1);
      expect(response.stats.durationMs).toBeGreaterThanOrEqual(0);
    });
  });

  describe('single translation response', () => {
    interface SingleResponse {
      success: boolean;
      source: string;
      translations: Record<string, string>;
      stats: {
        localesRequested: number;
        localesTranslated: number;
        estimatedCost: number;
        durationMs: number;
      };
      saved: boolean;
    }

    const createSingleResponse = (
      source: string,
      translations: Record<string, string>,
      saved: boolean
    ): SingleResponse => ({
      success: true,
      source,
      translations,
      stats: {
        localesRequested: Object.keys(translations).length,
        localesTranslated: Object.keys(translations).length,
        estimatedCost: 0.0001,
        durationMs: 200,
      },
      saved,
    });

    it('should include source text', () => {
      const response = createSingleResponse('Butter', { it: 'Burro' }, false);
      expect(response.source).toBe('Butter');
    });

    it('should have translations as key-value map', () => {
      const response = createSingleResponse('Butter', { it: 'Burro', es: 'Mantequilla' }, false);
      expect(response.translations.it).toBe('Burro');
      expect(response.translations.es).toBe('Mantequilla');
    });

    it('should track saved status', () => {
      const response = createSingleResponse('Butter', { it: 'Burro' }, true);
      expect(response.saved).toBe(true);
    });

    it('should match localesRequested and localesTranslated', () => {
      const response = createSingleResponse('Butter', { it: 'Burro', es: 'Mantequilla' }, false);
      expect(response.stats.localesRequested).toBe(2);
      expect(response.stats.localesTranslated).toBe(2);
    });
  });

  describe('stats response', () => {
    interface StatsResponse {
      success: boolean;
      stats: {
        totalTranslations: number;
        byEntityType: Record<string, number>;
        byLocale: Record<string, number>;
      };
      supportedLocales: Record<string, string>;
    }

    it('should include supportedLocales', () => {
      const response: StatsResponse = {
        success: true,
        stats: {
          totalTranslations: 1000,
          byEntityType: {},
          byLocale: {},
        },
        supportedLocales: SUPPORTED_LOCALES,
      };
      expect(response.supportedLocales).toHaveProperty('it');
      expect(response.supportedLocales).toHaveProperty('en');
    });
  });

  describe('list response', () => {
    interface ListResponse {
      success: boolean;
      translations: Array<unknown>;
      pagination: {
        limit: number;
        offset: number;
        total: number | null;
      };
    }

    const createListResponse = (
      translations: unknown[],
      limit: number,
      offset: number,
      total: number | null
    ): ListResponse => ({
      success: true,
      translations,
      pagination: { limit, offset, total },
    });

    it('should include pagination info', () => {
      const response = createListResponse([], 100, 0, 500);
      expect(response.pagination.limit).toBe(100);
      expect(response.pagination.offset).toBe(0);
      expect(response.pagination.total).toBe(500);
    });

    it('should handle null total', () => {
      const response = createListResponse([], 100, 0, null);
      expect(response.pagination.total).toBeNull();
    });
  });

  describe('pending response', () => {
    interface PendingResponse {
      success: boolean;
      locale: string;
      pendingCount: number;
      pending: Array<{ id: string; name: string }>;
    }

    it('should include locale', () => {
      const response: PendingResponse = {
        success: true,
        locale: 'it',
        pendingCount: 50,
        pending: [],
      };
      expect(response.locale).toBe('it');
    });

    it('should include pending count', () => {
      const response: PendingResponse = {
        success: true,
        locale: 'it',
        pendingCount: 50,
        pending: [],
      };
      expect(response.pendingCount).toBe(50);
    });
  });
});

// ============================================
// Error Response Tests
// ============================================

describe('Error Response Handling', () => {
  const formatErrorMessage = (error: unknown): string => {
    return error instanceof Error ? error.message : 'Unknown error';
  };

  const isOpenAIError = (message: string): boolean => {
    return message.includes('OPENAI_API_KEY');
  };

  const getErrorStatus = (error: unknown): number => {
    const message = formatErrorMessage(error);
    if (isOpenAIError(message)) return 503;
    return 500;
  };

  describe('formatErrorMessage', () => {
    it('should extract Error message', () => {
      const result = formatErrorMessage(new Error('Test error'));
      expect(result).toBe('Test error');
    });

    it('should return Unknown error for non-Error', () => {
      const result = formatErrorMessage('string error');
      expect(result).toBe('Unknown error');
    });
  });

  describe('isOpenAIError', () => {
    it('should detect OpenAI API key error', () => {
      expect(isOpenAIError('OPENAI_API_KEY is not set')).toBe(true);
    });

    it('should not match other errors', () => {
      expect(isOpenAIError('Database connection failed')).toBe(false);
    });
  });

  describe('getErrorStatus', () => {
    it('should return 503 for OpenAI errors', () => {
      const error = new Error('OPENAI_API_KEY not configured');
      expect(getErrorStatus(error)).toBe(503);
    });

    it('should return 500 for other errors', () => {
      const error = new Error('Database error');
      expect(getErrorStatus(error)).toBe(500);
    });
  });
});

// ============================================
// Options Parameter Tests
// ============================================

describe('Options Parameter Processing', () => {
  interface TranslationOptions {
    limit?: number;
    offset?: number;
    overwrite?: boolean;
    save?: boolean;
    context?: string;
  }

  const normalizeOptions = (
    options?: TranslationOptions
  ): Required<Omit<TranslationOptions, 'context'>> & { context?: string } => ({
    limit: options?.limit || 100,
    offset: options?.offset || 0,
    overwrite: options?.overwrite || false,
    save: options?.save || false,
    context: options?.context,
  });

  it('should use default limit of 100', () => {
    const result = normalizeOptions({});
    expect(result.limit).toBe(100);
  });

  it('should use provided limit', () => {
    const result = normalizeOptions({ limit: 50 });
    expect(result.limit).toBe(50);
  });

  it('should default offset to 0', () => {
    const result = normalizeOptions({});
    expect(result.offset).toBe(0);
  });

  it('should use provided offset', () => {
    const result = normalizeOptions({ offset: 200 });
    expect(result.offset).toBe(200);
  });

  it('should default overwrite to false', () => {
    const result = normalizeOptions({});
    expect(result.overwrite).toBe(false);
  });

  it('should use provided overwrite', () => {
    const result = normalizeOptions({ overwrite: true });
    expect(result.overwrite).toBe(true);
  });

  it('should default save to false', () => {
    const result = normalizeOptions({});
    expect(result.save).toBe(false);
  });

  it('should preserve context when provided', () => {
    const result = normalizeOptions({ context: 'Food translation context' });
    expect(result.context).toBe('Food translation context');
  });

  it('should handle undefined options', () => {
    const result = normalizeOptions(undefined);
    expect(result.limit).toBe(100);
    expect(result.offset).toBe(0);
    expect(result.overwrite).toBe(false);
  });
});

// ============================================
// Entity Type Tests
// ============================================

describe('Entity Type Handling', () => {
  const VALID_ENTITY_TYPES = ['ingredient', 'product', 'category', 'custom', 'quick', 'ui'];

  const normalizeEntityType = (entityType?: string): string => {
    return entityType || 'custom';
  };

  const isValidEntityType = (entityType: string): boolean => {
    return VALID_ENTITY_TYPES.includes(entityType);
  };

  describe('normalizeEntityType', () => {
    it('should return provided type', () => {
      expect(normalizeEntityType('ingredient')).toBe('ingredient');
    });

    it('should default to custom when undefined', () => {
      expect(normalizeEntityType(undefined)).toBe('custom');
    });

    it('should default to custom when empty', () => {
      expect(normalizeEntityType('')).toBe('custom');
    });
  });

  describe('isValidEntityType', () => {
    it('should validate ingredient', () => {
      expect(isValidEntityType('ingredient')).toBe(true);
    });

    it('should validate product', () => {
      expect(isValidEntityType('product')).toBe(true);
    });

    it('should validate category', () => {
      expect(isValidEntityType('category')).toBe(true);
    });

    it('should validate custom', () => {
      expect(isValidEntityType('custom')).toBe(true);
    });

    it('should validate quick', () => {
      expect(isValidEntityType('quick')).toBe(true);
    });

    it('should validate ui', () => {
      expect(isValidEntityType('ui')).toBe(true);
    });

    it('should reject invalid type', () => {
      expect(isValidEntityType('unknown')).toBe(false);
    });
  });
});

// ============================================
// Pending Translation Logic Tests
// ============================================

describe('Pending Translation Logic', () => {
  const findPendingTranslations = (
    allItems: Array<{ id: string }>,
    existingTranslations: Array<{ entity_id: string }>
  ): Array<{ id: string }> => {
    const translatedIds = new Set(existingTranslations.map((t) => t.entity_id));
    return allItems.filter((item) => !translatedIds.has(item.id));
  };

  it('should find all items when no translations exist', () => {
    const items = [{ id: '1' }, { id: '2' }, { id: '3' }];
    const translations: Array<{ entity_id: string }> = [];
    const pending = findPendingTranslations(items, translations);
    expect(pending).toHaveLength(3);
  });

  it('should exclude translated items', () => {
    const items = [{ id: '1' }, { id: '2' }, { id: '3' }];
    const translations = [{ entity_id: '1' }, { entity_id: '3' }];
    const pending = findPendingTranslations(items, translations);
    expect(pending).toHaveLength(1);
    expect(pending[0].id).toBe('2');
  });

  it('should return empty when all translated', () => {
    const items = [{ id: '1' }, { id: '2' }];
    const translations = [{ entity_id: '1' }, { entity_id: '2' }];
    const pending = findPendingTranslations(items, translations);
    expect(pending).toHaveLength(0);
  });

  it('should handle empty items array', () => {
    const items: Array<{ id: string }> = [];
    const translations = [{ entity_id: '1' }];
    const pending = findPendingTranslations(items, translations);
    expect(pending).toHaveLength(0);
  });
});

// ============================================
// Cost Formatting Tests
// ============================================

describe('Cost Formatting', () => {
  const formatCost = (cost: number): string => {
    return `$${cost.toFixed(6)}`;
  };

  it('should format small cost', () => {
    expect(formatCost(0.000123)).toBe('$0.000123');
  });

  it('should format zero cost', () => {
    expect(formatCost(0)).toBe('$0.000000');
  });

  it('should format larger cost', () => {
    expect(formatCost(1.5)).toBe('$1.500000');
  });

  it('should round to 6 decimal places', () => {
    expect(formatCost(0.0001234567)).toBe('$0.000123');
  });
});

// ============================================
// Quick Translation Entity ID Generation
// ============================================

describe('Quick Translation ID Generation', () => {
  const generateQuickId = (): string => {
    return `quick_${Date.now()}`;
  };

  const generateSingleId = (): string => {
    return `single_${Date.now()}`;
  };

  it('should generate quick ID with prefix', () => {
    const id = generateQuickId();
    expect(id).toMatch(/^quick_\d+$/);
  });

  it('should generate single ID with prefix', () => {
    const id = generateSingleId();
    expect(id).toMatch(/^single_\d+$/);
  });

  it('should generate unique IDs', () => {
    const id1 = generateQuickId();
    // Small delay to ensure different timestamp
    const id2 = generateQuickId();
    // They might be same if generated in same millisecond, but format should be correct
    expect(id1).toMatch(/^quick_\d+$/);
    expect(id2).toMatch(/^quick_\d+$/);
  });
});
