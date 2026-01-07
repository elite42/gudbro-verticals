// Translation Service
// Uses OpenAI GPT-4o-mini for cost-effective, high-quality translations
// Optimized for batch processing of food/restaurant terminology

import { getOpenAIClient, DEFAULT_MODEL, calculateCost } from './openai';
import { supabaseAdmin } from '../supabase-admin';

// =============================================================================
// TYPES
// =============================================================================

export type EntityType = 'ingredient' | 'product' | 'category' | 'ui' | 'custom' | 'quick' | string;

export interface TranslationItem {
  entityType: EntityType;
  entityId: string;
  field: string;
  sourceText: string;
  sourceLocale?: string;
}

export interface TranslationResult {
  entityType: string;
  entityId: string;
  field: string;
  locale: string;
  value: string;
  sourceText: string;
}

export interface BatchTranslationRequest {
  items: TranslationItem[];
  targetLocales: string[];
  context?: string; // Additional context for better translations
}

export interface BatchTranslationResponse {
  success: boolean;
  translations: TranslationResult[];
  stats: {
    totalItems: number;
    totalLocales: number;
    totalTranslations: number;
    inputTokens: number;
    outputTokens: number;
    estimatedCost: number;
    durationMs: number;
  };
  errors?: string[];
}

// =============================================================================
// SUPPORTED LANGUAGES
// =============================================================================

export const SUPPORTED_LOCALES: Record<string, string> = {
  en: 'English',
  it: 'Italian',
  vi: 'Vietnamese',
  ko: 'Korean',
  ja: 'Japanese',
  ru: 'Russian',
  zh: 'Chinese (Simplified)',
  th: 'Thai',
  fr: 'French',
  es: 'Spanish',
  pt: 'Portuguese',
  de: 'German',
  tr: 'Turkish',
  ar: 'Arabic',
  hi: 'Hindi',
  id: 'Indonesian',
  ms: 'Malay',
  nl: 'Dutch',
  pl: 'Polish',
  sv: 'Swedish',
};

// =============================================================================
// TRANSLATION PROMPTS
// =============================================================================

const SYSTEM_PROMPT = `You are a professional food and restaurant terminology translator.

RULES:
1. Translate ONLY the text provided, nothing else
2. Keep proper nouns (brand names, dish names that shouldn't be translated) as-is
3. Use culinary terminology appropriate to each locale
4. For ingredients: use the most common local name (e.g., "coriander" vs "cilantro" depending on region)
5. Maintain any special characters or formatting from the source
6. Return ONLY the JSON array, no explanations

CONTEXT: Food & Beverage industry - ingredients, dishes, menu items, restaurant terminology.`;

function buildBatchPrompt(items: TranslationItem[], targetLocales: string[]): string {
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
}

// =============================================================================
// CORE TRANSLATION FUNCTIONS
// =============================================================================

/**
 * Translate a batch of items to multiple locales using OpenAI
 * Optimized for cost: batches items together to minimize API calls
 */
export async function translateBatch(
  request: BatchTranslationRequest
): Promise<BatchTranslationResponse> {
  const startTime = Date.now();
  const { items, targetLocales, context } = request;

  // Validate inputs
  if (!items.length) {
    return {
      success: false,
      translations: [],
      stats: {
        totalItems: 0,
        totalLocales: 0,
        totalTranslations: 0,
        inputTokens: 0,
        outputTokens: 0,
        estimatedCost: 0,
        durationMs: 0,
      },
      errors: ['No items to translate'],
    };
  }

  const validLocales = targetLocales.filter((l) => SUPPORTED_LOCALES[l]);
  if (!validLocales.length) {
    return {
      success: false,
      translations: [],
      stats: {
        totalItems: items.length,
        totalLocales: 0,
        totalTranslations: 0,
        inputTokens: 0,
        outputTokens: 0,
        estimatedCost: 0,
        durationMs: 0,
      },
      errors: [
        `No valid locales provided. Supported: ${Object.keys(SUPPORTED_LOCALES).join(', ')}`,
      ],
    };
  }

  const translations: TranslationResult[] = [];
  const errors: string[] = [];
  let totalInputTokens = 0;
  let totalOutputTokens = 0;

  // Process in batches of 50 items to stay within token limits
  const BATCH_SIZE = 50;
  const batches = [];
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    batches.push(items.slice(i, i + BATCH_SIZE));
  }

  const openai = getOpenAIClient();
  const model = 'gpt-4o-mini'; // Most cost-effective for translations

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    const prompt = buildBatchPrompt(batch, validLocales);

    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: context ? `${SYSTEM_PROMPT}\n\nAdditional context: ${context}` : SYSTEM_PROMPT,
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3, // Lower temperature for more consistent translations
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      });

      // Track token usage
      if (response.usage) {
        totalInputTokens += response.usage.prompt_tokens;
        totalOutputTokens += response.usage.completion_tokens;
      }

      // Parse response
      const content = response.choices[0]?.message?.content || '[]';
      let parsed: Array<{ index: number; translations: Record<string, string> }>;

      try {
        // Handle both array and object with array property
        const jsonContent = JSON.parse(content);
        parsed = Array.isArray(jsonContent) ? jsonContent : jsonContent.translations || [];
      } catch {
        errors.push(`Batch ${batchIndex + 1}: Failed to parse response JSON`);
        continue;
      }

      // Map translations back to items
      for (const result of parsed) {
        const itemIndex = result.index - 1;
        const item = batch[itemIndex];
        if (!item) continue;

        for (const [locale, value] of Object.entries(result.translations)) {
          if (value && validLocales.includes(locale)) {
            translations.push({
              entityType: item.entityType,
              entityId: item.entityId,
              field: item.field,
              locale,
              value: value.trim(),
              sourceText: item.sourceText,
            });
          }
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Batch ${batchIndex + 1}: ${message}`);
    }
  }

  const durationMs = Date.now() - startTime;
  const estimatedCost = calculateCost(model, totalInputTokens, totalOutputTokens);

  return {
    success: errors.length === 0,
    translations,
    stats: {
      totalItems: items.length,
      totalLocales: validLocales.length,
      totalTranslations: translations.length,
      inputTokens: totalInputTokens,
      outputTokens: totalOutputTokens,
      estimatedCost,
      durationMs,
    },
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Save translations to database
 */
export async function saveTranslations(
  translations: TranslationResult[],
  options: { overwrite?: boolean; translatedBy?: string } = {}
): Promise<{ saved: number; skipped: number; errors: string[] }> {
  const { overwrite = false, translatedBy = 'openai' } = options;

  let saved = 0;
  let skipped = 0;
  const errors: string[] = [];

  // Batch insert for efficiency
  const batchSize = 100;
  for (let i = 0; i < translations.length; i += batchSize) {
    const batch = translations.slice(i, i + batchSize);

    const rows = batch.map((t) => ({
      entity_type: t.entityType,
      entity_id: t.entityId,
      field: t.field,
      locale: t.locale,
      value: t.value,
      is_verified: false,
      translated_by: translatedBy,
    }));

    if (overwrite) {
      // Upsert: update existing or insert new
      const { error } = await supabaseAdmin.from('translations').upsert(rows, {
        onConflict: 'entity_type,entity_id,field,locale',
        ignoreDuplicates: false,
      });

      if (error) {
        errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
      } else {
        saved += batch.length;
      }
    } else {
      // Insert only, skip duplicates
      const { error, count } = await supabaseAdmin.from('translations').insert(rows).select();

      if (error) {
        if (error.code === '23505') {
          // Unique violation - some already exist
          skipped += batch.length;
        } else {
          errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
        }
      } else {
        saved += count || batch.length;
      }
    }
  }

  return { saved, skipped, errors };
}

// =============================================================================
// HIGH-LEVEL FUNCTIONS
// =============================================================================

/**
 * Translate all ingredients to specified locales
 */
export async function translateIngredients(
  targetLocales: string[],
  options: { limit?: number; offset?: number; overwrite?: boolean } = {}
): Promise<
  BatchTranslationResponse & { dbResult: { saved: number; skipped: number; errors: string[] } }
> {
  const { limit = 100, offset = 0, overwrite = false } = options;

  // Fetch ingredients from database
  const { data: ingredients, error } = await supabaseAdmin
    .from('ingredients')
    .select('id, name')
    .range(offset, offset + limit - 1)
    .order('id');

  if (error) {
    return {
      success: false,
      translations: [],
      stats: {
        totalItems: 0,
        totalLocales: targetLocales.length,
        totalTranslations: 0,
        inputTokens: 0,
        outputTokens: 0,
        estimatedCost: 0,
        durationMs: 0,
      },
      errors: [`Failed to fetch ingredients: ${error.message}`],
      dbResult: { saved: 0, skipped: 0, errors: [] },
    };
  }

  const items: TranslationItem[] = (ingredients || []).map((ing) => ({
    entityType: 'ingredient' as const,
    entityId: ing.id,
    field: 'name',
    sourceText: ing.name,
    sourceLocale: 'en',
  }));

  // Translate
  const result = await translateBatch({
    items,
    targetLocales,
    context: 'Food ingredients used in restaurant menus',
  });

  // Save to database
  const dbResult = await saveTranslations(result.translations, {
    overwrite,
    translatedBy: 'openai-gpt4o-mini',
  });

  return { ...result, dbResult };
}

/**
 * Translate products (dishes, beverages) to specified locales
 */
export async function translateProducts(
  productType: string,
  targetLocales: string[],
  options: { limit?: number; offset?: number; overwrite?: boolean } = {}
): Promise<
  BatchTranslationResponse & { dbResult: { saved: number; skipped: number; errors: string[] } }
> {
  const { limit = 100, offset = 0, overwrite = false } = options;

  // Fetch products from database
  const { data: products, error } = await supabaseAdmin
    .from('product_taxonomy')
    .select('id, name, description')
    .eq('product_type', productType)
    .range(offset, offset + limit - 1)
    .order('id');

  if (error) {
    return {
      success: false,
      translations: [],
      stats: {
        totalItems: 0,
        totalLocales: targetLocales.length,
        totalTranslations: 0,
        inputTokens: 0,
        outputTokens: 0,
        estimatedCost: 0,
        durationMs: 0,
      },
      errors: [`Failed to fetch products: ${error.message}`],
      dbResult: { saved: 0, skipped: 0, errors: [] },
    };
  }

  // Create items for both name and description
  const items: TranslationItem[] = [];
  for (const product of products || []) {
    items.push({
      entityType: 'product',
      entityId: product.id,
      field: 'name',
      sourceText: product.name,
      sourceLocale: 'en',
    });
    if (product.description) {
      items.push({
        entityType: 'product',
        entityId: product.id,
        field: 'description',
        sourceText: product.description,
        sourceLocale: 'en',
      });
    }
  }

  // Translate
  const result = await translateBatch({
    items,
    targetLocales,
    context: `${productType} items from restaurant menus`,
  });

  // Save to database
  const dbResult = await saveTranslations(result.translations, {
    overwrite,
    translatedBy: 'openai-gpt4o-mini',
  });

  return { ...result, dbResult };
}

/**
 * Get translation statistics
 */
export async function getTranslationStats(): Promise<{
  byLocale: Record<string, number>;
  byEntityType: Record<string, number>;
  total: number;
  verified: number;
}> {
  // Count by locale
  const { data: byLocaleData } = await supabaseAdmin
    .from('translations')
    .select('locale')
    .then(({ data }) => {
      const counts: Record<string, number> = {};
      data?.forEach((row) => {
        counts[row.locale] = (counts[row.locale] || 0) + 1;
      });
      return { data: counts };
    });

  // Count by entity type
  const { data: byTypeData } = await supabaseAdmin
    .from('translations')
    .select('entity_type')
    .then(({ data }) => {
      const counts: Record<string, number> = {};
      data?.forEach((row) => {
        counts[row.entity_type] = (counts[row.entity_type] || 0) + 1;
      });
      return { data: counts };
    });

  // Total count
  const { count: total } = await supabaseAdmin
    .from('translations')
    .select('*', { count: 'exact', head: true });

  // Verified count
  const { count: verified } = await supabaseAdmin
    .from('translations')
    .select('*', { count: 'exact', head: true })
    .eq('is_verified', true);

  return {
    byLocale: byLocaleData || {},
    byEntityType: byTypeData || {},
    total: total || 0,
    verified: verified || 0,
  };
}
