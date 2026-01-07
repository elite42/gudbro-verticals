import { NextRequest, NextResponse } from 'next/server';
import { translateBatch, saveTranslations, SUPPORTED_LOCALES, TranslationItem } from '@/lib/ai';

export const dynamic = 'force-dynamic';

/**
 * POST /api/translations/single - Translate a single text on-demand
 *
 * Use cases:
 * - When merchant adds a new custom ingredient
 * - When merchant creates a custom menu item
 * - Real-time translation in the UI
 *
 * Request body:
 * {
 *   text: string,           // Text to translate
 *   targetLocales: string[] // e.g., ["it", "vi", "ko"]
 *   entityType?: string     // e.g., "ingredient", "product"
 *   entityId?: string       // e.g., "ING_CUSTOM_123"
 *   field?: string          // e.g., "name", "description"
 *   save?: boolean          // Save to database?
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLocales, entityType, entityId, field, save, context } = body;

    // Validate required fields
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'text is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!targetLocales || !Array.isArray(targetLocales) || targetLocales.length === 0) {
      return NextResponse.json(
        { error: 'targetLocales is required and must be a non-empty array' },
        { status: 400 }
      );
    }

    // Validate locales
    const invalidLocales = targetLocales.filter((l: string) => !SUPPORTED_LOCALES[l]);
    if (invalidLocales.length > 0) {
      return NextResponse.json(
        {
          error: `Invalid locales: ${invalidLocales.join(', ')}`,
          supportedLocales: Object.keys(SUPPORTED_LOCALES),
        },
        { status: 400 }
      );
    }

    // Build translation item
    const item: TranslationItem = {
      entityType: entityType || 'custom',
      entityId: entityId || `single_${Date.now()}`,
      field: field || 'name',
      sourceText: text.trim(),
      sourceLocale: 'en',
    };

    // Translate
    const result = await translateBatch({
      items: [item],
      targetLocales,
      context: context || 'Single item translation for restaurant/food context',
    });

    // Transform to simple key-value format
    const translationsMap: Record<string, string> = {};
    for (const t of result.translations) {
      translationsMap[t.locale] = t.value;
    }

    // Save to database if requested
    let dbResult = null;
    if (save && entityId) {
      dbResult = await saveTranslations(result.translations, {
        overwrite: true,
        translatedBy: 'openai-gpt4o-mini',
      });
    }

    return NextResponse.json({
      success: result.success,
      source: text,
      translations: translationsMap,
      stats: {
        localesRequested: targetLocales.length,
        localesTranslated: Object.keys(translationsMap).length,
        estimatedCost: result.stats.estimatedCost,
        durationMs: result.stats.durationMs,
      },
      saved: dbResult ? dbResult.saved > 0 : false,
      errors: result.errors,
    });
  } catch (error) {
    console.error('Single translation error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('OPENAI_API_KEY')) {
      return NextResponse.json({ error: 'OpenAI API not configured' }, { status: 503 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/translations/single - Quick translation without saving
 *
 * Query params:
 * - text: string to translate
 * - locales: comma-separated locale codes (e.g., "it,es,fr")
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    const localesParam = searchParams.get('locales');

    if (!text) {
      return NextResponse.json({ error: 'text query param is required' }, { status: 400 });
    }

    if (!localesParam) {
      return NextResponse.json(
        { error: 'locales query param is required (comma-separated)' },
        { status: 400 }
      );
    }

    const targetLocales = localesParam.split(',').map((l) => l.trim());

    // Validate locales
    const invalidLocales = targetLocales.filter((l) => !SUPPORTED_LOCALES[l]);
    if (invalidLocales.length > 0) {
      return NextResponse.json(
        {
          error: `Invalid locales: ${invalidLocales.join(', ')}`,
          supportedLocales: Object.keys(SUPPORTED_LOCALES),
        },
        { status: 400 }
      );
    }

    // Build translation item
    const item: TranslationItem = {
      entityType: 'quick',
      entityId: `quick_${Date.now()}`,
      field: 'text',
      sourceText: text.trim(),
      sourceLocale: 'en',
    };

    // Translate
    const result = await translateBatch({
      items: [item],
      targetLocales,
    });

    // Transform to simple key-value format
    const translationsMap: Record<string, string> = {};
    for (const t of result.translations) {
      translationsMap[t.locale] = t.value;
    }

    return NextResponse.json({
      success: result.success,
      source: text,
      translations: translationsMap,
      cost: `$${result.stats.estimatedCost.toFixed(6)}`,
    });
  } catch (error) {
    console.error('Quick translation error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
