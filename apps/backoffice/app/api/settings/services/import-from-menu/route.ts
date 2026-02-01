import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ImportItem {
  productId: string;
  categoryId: string;
  price?: number;
  name?: string;
}

// ---------------------------------------------------------------------------
// GET /api/settings/services/import-from-menu?merchantId=X
//
// Fetches F&B products from the coffeeshop vertical (products table)
// for a given merchant, so the owner can import them as accommodation
// service items (minibar, breakfast, etc.).
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const merchantId = searchParams.get('merchantId');

  if (!merchantId) {
    return NextResponse.json({ error: 'Missing required parameter: merchantId' }, { status: 400 });
  }

  try {
    // Fetch active F&B products for this merchant
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('id, name, description, price, currency, image_url, category')
      .eq('merchant_id', merchantId)
      .eq('is_active', true)
      .order('category')
      .order('name');

    if (error) {
      console.error('[import-from-menu] GET error:', error);
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

    return NextResponse.json({ products: products || [] });
  } catch (err) {
    console.error('[import-from-menu] GET unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// POST /api/settings/services/import-from-menu
//
// Imports selected F&B products as accommodation service items.
// Body: { merchantId, items: [{ productId, categoryId, price?, name? }] }
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  try {
    const body = await request.json();
    const { merchantId, items } = body as { merchantId: string; items: ImportItem[] };

    if (!merchantId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: merchantId, items[]' },
        { status: 400 }
      );
    }

    // Fetch source products for validation and data
    const productIds = items.map((i) => i.productId);
    const { data: sourceProducts, error: fetchError } = await supabaseAdmin
      .from('products')
      .select('id, name, description, price, currency, image_url')
      .in('id', productIds);

    if (fetchError) {
      console.error('[import-from-menu] POST fetch error:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch source products' }, { status: 500 });
    }

    const productMap = new Map(
      (sourceProducts || []).map((p: Record<string, unknown>) => [p.id as string, p])
    );

    // Get current max sort_order per target category
    const categoryIds = [...new Set(items.map((i) => i.categoryId))];
    const { data: existingItems } = await supabaseAdmin
      .from('accom_service_items')
      .select('category_id, sort_order')
      .in('category_id', categoryIds)
      .order('sort_order', { ascending: false });

    const maxSortOrder = new Map<string, number>();
    for (const item of existingItems || []) {
      const catId = (item as Record<string, unknown>).category_id as string;
      const order = (item as Record<string, unknown>).sort_order as number;
      if (!maxSortOrder.has(catId)) {
        maxSortOrder.set(catId, order);
      }
    }

    // Build insert rows
    const insertRows = items.map((item) => {
      const source = productMap.get(item.productId) as Record<string, unknown> | undefined;
      const nextSort = (maxSortOrder.get(item.categoryId) || 0) + 1;
      maxSortOrder.set(item.categoryId, nextSort);

      return {
        name: item.name || (source?.name as string) || 'Imported item',
        description: (source?.description as string) || null,
        price: item.price ?? (source?.price as number) ?? 0,
        currency: (source?.currency as string) || 'EUR',
        image: (source?.image_url as string) || null,
        category_id: item.categoryId,
        is_available: true,
        in_stock: true,
        sort_order: nextSort,
      };
    });

    const { data: created, error: insertError } = await supabaseAdmin
      .from('accom_service_items')
      .insert(insertRows)
      .select('id, name, price, currency, category_id');

    if (insertError) {
      console.error('[import-from-menu] POST insert error:', insertError);
      return NextResponse.json({ error: 'Failed to import items' }, { status: 500 });
    }

    return NextResponse.json({
      imported: created || [],
      count: (created || []).length,
    });
  } catch (err) {
    console.error('[import-from-menu] POST unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
