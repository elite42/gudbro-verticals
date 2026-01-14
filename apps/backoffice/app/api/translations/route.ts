import { NextRequest, NextResponse } from 'next/server';
import {
  translateBatch,
  translateIngredients,
  translateProducts,
  saveTranslations,
  getTranslationStats,
  SUPPORTED_LOCALES,
  TranslationItem,
} from '@/lib/ai';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getSession } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes for batch operations

// =============================================================================
// POST /api/translations - Translate items
// =============================================================================
export async function POST(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, items, targetLocales, entityType, productType, options } = body;

    // Validate target locales
    if (!targetLocales || !Array.isArray(targetLocales) || targetLocales.length === 0) {
      return NextResponse.json(
        { error: 'targetLocales is required and must be a non-empty array' },
        { status: 400 }
      );
    }

    const invalidLocales = targetLocales.filter((l: string) => !SUPPORTED_LOCALES[l]);
    if (invalidLocales.length > 0) {
      return NextResponse.json(
        {
          error: `Invalid locales: ${invalidLocales.join(', ')}. Supported: ${Object.keys(SUPPORTED_LOCALES).join(', ')}`,
        },
        { status: 400 }
      );
    }

    switch (action) {
      // -------------------------------------------------------------------------
      // Translate custom items (most flexible)
      // -------------------------------------------------------------------------
      case 'custom': {
        if (!items || !Array.isArray(items) || items.length === 0) {
          return NextResponse.json(
            { error: 'items is required for custom action' },
            { status: 400 }
          );
        }

        const translationItems: TranslationItem[] = items.map((item: any) => ({
          entityType: item.entityType || 'custom',
          entityId: item.entityId || item.id || `custom_${Date.now()}`,
          field: item.field || 'name',
          sourceText: item.text || item.sourceText || item.name,
          sourceLocale: item.sourceLocale || 'en',
        }));

        const result = await translateBatch({
          items: translationItems,
          targetLocales,
          context: options?.context,
        });

        // Optionally save to database
        let dbResult = null;
        if (options?.save) {
          dbResult = await saveTranslations(result.translations, {
            overwrite: options?.overwrite,
            translatedBy: 'openai-gpt4o-mini',
          });
        }

        return NextResponse.json({
          success: result.success,
          translations: result.translations,
          stats: result.stats,
          dbResult,
          errors: result.errors,
        });
      }

      // -------------------------------------------------------------------------
      // Translate ingredients from database
      // -------------------------------------------------------------------------
      case 'ingredients': {
        const result = await translateIngredients(targetLocales, {
          limit: options?.limit || 100,
          offset: options?.offset || 0,
          overwrite: options?.overwrite || false,
        });

        return NextResponse.json({
          success: result.success,
          stats: result.stats,
          dbResult: result.dbResult,
          errors: result.errors,
          // Don't return all translations to reduce response size
          translationCount: result.translations.length,
        });
      }

      // -------------------------------------------------------------------------
      // Translate products from database
      // -------------------------------------------------------------------------
      case 'products': {
        if (!productType) {
          return NextResponse.json(
            { error: 'productType is required for products action' },
            { status: 400 }
          );
        }

        const result = await translateProducts(productType, targetLocales, {
          limit: options?.limit || 100,
          offset: options?.offset || 0,
          overwrite: options?.overwrite || false,
        });

        return NextResponse.json({
          success: result.success,
          stats: result.stats,
          dbResult: result.dbResult,
          errors: result.errors,
          translationCount: result.translations.length,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}. Valid actions: custom, ingredients, products` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Translation API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('OPENAI_API_KEY')) {
      return NextResponse.json(
        { error: 'OpenAI API not configured. Please add OPENAI_API_KEY to environment.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// =============================================================================
// GET /api/translations - Get translations or stats
// =============================================================================
export async function GET(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'list';
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');
    const locale = searchParams.get('locale');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    switch (action) {
      // -------------------------------------------------------------------------
      // Get translation statistics
      // -------------------------------------------------------------------------
      case 'stats': {
        const stats = await getTranslationStats();
        return NextResponse.json({
          success: true,
          stats,
          supportedLocales: SUPPORTED_LOCALES,
        });
      }

      // -------------------------------------------------------------------------
      // List translations with filters
      // -------------------------------------------------------------------------
      case 'list': {
        let query = supabaseAdmin
          .from('translations')
          .select('*')
          .range(offset, offset + limit - 1)
          .order('created_at', { ascending: false });

        if (entityType) query = query.eq('entity_type', entityType);
        if (entityId) query = query.eq('entity_id', entityId);
        if (locale) query = query.eq('locale', locale);

        const { data, error, count } = await query;

        if (error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          translations: data,
          pagination: { limit, offset, total: count },
        });
      }

      // -------------------------------------------------------------------------
      // Get supported locales
      // -------------------------------------------------------------------------
      case 'locales': {
        return NextResponse.json({
          success: true,
          locales: SUPPORTED_LOCALES,
        });
      }

      // -------------------------------------------------------------------------
      // Check what needs translation
      // -------------------------------------------------------------------------
      case 'pending': {
        // Get ingredients without translations for a specific locale
        const targetLocale = locale || 'it';

        const { data: ingredients } = await supabaseAdmin
          .from('ingredients')
          .select('id, name')
          .limit(1000);

        const { data: existingTranslations } = await supabaseAdmin
          .from('translations')
          .select('entity_id')
          .eq('entity_type', 'ingredient')
          .eq('locale', targetLocale)
          .eq('field', 'name');

        const translatedIds = new Set(existingTranslations?.map((t) => t.entity_id) || []);
        const pending = ingredients?.filter((ing) => !translatedIds.has(ing.id)) || [];

        return NextResponse.json({
          success: true,
          locale: targetLocale,
          pendingCount: pending.length,
          pending: pending.slice(0, limit),
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}. Valid actions: stats, list, locales, pending` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Translation GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// =============================================================================
// DELETE /api/translations - Delete translations
// =============================================================================
export async function DELETE(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');
    const locale = searchParams.get('locale');

    if (!entityType && !entityId && !locale) {
      return NextResponse.json(
        { error: 'At least one filter required: entityType, entityId, or locale' },
        { status: 400 }
      );
    }

    let query = supabaseAdmin.from('translations').delete();

    if (entityType) query = query.eq('entity_type', entityType);
    if (entityId) query = query.eq('entity_id', entityId);
    if (locale) query = query.eq('locale', locale);

    const { error, count } = await query.select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      deleted: count,
    });
  } catch (error) {
    console.error('Translation DELETE error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
