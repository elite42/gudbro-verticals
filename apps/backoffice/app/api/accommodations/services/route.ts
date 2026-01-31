import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

// ============================================================================
// Helper: generate slug from name
// ============================================================================

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// ============================================================================
// GET - Fetch service categories with nested items
// ============================================================================

export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');

  if (!propertyId) {
    return NextResponse.json({ error: 'Missing required parameter: propertyId' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('accom_service_categories')
    .select(
      `id, property_id, name, slug, icon, display_order, is_active, automation_level,
       items:accom_service_items(
         id, category_id, property_id, name, description, price, currency,
         is_always_available, available_from, available_until, in_stock,
         sort_order, image_url
       )`
    )
    .eq('property_id', propertyId)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[accommodations/services] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch service categories' }, { status: 500 });
  }

  // Map to camelCase response
  const categories = (data || []).map((cat) => ({
    id: cat.id,
    propertyId: cat.property_id,
    name: cat.name,
    slug: cat.slug,
    icon: cat.icon,
    displayOrder: cat.display_order,
    isActive: cat.is_active,
    automationLevel: cat.automation_level,
    items: (((cat as Record<string, unknown>).items as Array<Record<string, unknown>>) || []).map(
      (item) => ({
        id: item.id,
        categoryId: item.category_id,
        propertyId: item.property_id,
        name: item.name,
        description: item.description,
        price: item.price,
        currency: item.currency,
        isAlwaysAvailable: item.is_always_available,
        availableFrom: item.available_from,
        availableUntil: item.available_until,
        inStock: item.in_stock,
        sortOrder: item.sort_order,
        imageUrl: item.image_url,
      })
    ),
  }));

  return NextResponse.json({ categories });
}

// ============================================================================
// POST - Create category or item
// ============================================================================

export async function POST(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  try {
    const body = await request.json();
    const { type, propertyId, ...fields } = body;

    if (!type || !propertyId) {
      return NextResponse.json(
        { error: 'Missing required fields: type, propertyId' },
        { status: 400 }
      );
    }

    if (type === 'category') {
      const { name, icon, automationLevel, isActive } = fields;

      if (!name) {
        return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
      }

      // Compute next display_order
      const { data: maxRow } = await supabaseAdmin
        .from('accom_service_categories')
        .select('display_order')
        .eq('property_id', propertyId)
        .order('display_order', { ascending: false })
        .limit(1)
        .single();

      const nextOrder = (maxRow?.display_order ?? 0) + 1;

      const { data, error } = await supabaseAdmin
        .from('accom_service_categories')
        .insert({
          property_id: propertyId,
          name,
          slug: slugify(name),
          icon: icon || null,
          display_order: nextOrder,
          is_active: isActive !== undefined ? isActive : true,
          automation_level: automationLevel || 'manual',
        })
        .select()
        .single();

      if (error) {
        console.error('[accommodations/services] POST category error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ category: data }, { status: 201 });
    }

    if (type === 'item') {
      const {
        categoryId,
        name,
        description,
        price,
        currency,
        isAlwaysAvailable,
        availableFrom,
        availableUntil,
        inStock,
        imageUrl,
      } = fields;

      if (!categoryId || !name) {
        return NextResponse.json(
          { error: 'categoryId and name are required for items' },
          { status: 400 }
        );
      }

      // Verify category belongs to property
      const { data: cat, error: catErr } = await supabaseAdmin
        .from('accom_service_categories')
        .select('id, property_id')
        .eq('id', categoryId)
        .single();

      if (catErr || !cat || cat.property_id !== propertyId) {
        return NextResponse.json({ error: 'Category not found or unauthorized' }, { status: 404 });
      }

      // Compute next sort_order
      const { data: maxRow } = await supabaseAdmin
        .from('accom_service_items')
        .select('sort_order')
        .eq('category_id', categoryId)
        .order('sort_order', { ascending: false })
        .limit(1)
        .single();

      const nextSort = (maxRow?.sort_order ?? 0) + 1;

      const { data, error } = await supabaseAdmin
        .from('accom_service_items')
        .insert({
          category_id: categoryId,
          property_id: propertyId,
          name,
          description: description || null,
          price: price ?? 0,
          currency: currency || 'EUR',
          is_always_available: isAlwaysAvailable !== undefined ? isAlwaysAvailable : true,
          available_from: availableFrom || null,
          available_until: availableUntil || null,
          in_stock: inStock !== undefined ? inStock : true,
          sort_order: nextSort,
          image_url: imageUrl || null,
        })
        .select()
        .single();

      if (error) {
        console.error('[accommodations/services] POST item error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ item: data }, { status: 201 });
    }

    return NextResponse.json(
      { error: 'Invalid type. Must be "category" or "item"' },
      { status: 400 }
    );
  } catch (err) {
    console.error('[accommodations/services] POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// PUT - Update category or item (allowlisted fields)
// ============================================================================

export async function PUT(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  try {
    const body = await request.json();
    const { type, id, propertyId, ...fields } = body;

    if (!type || !id || !propertyId) {
      return NextResponse.json(
        { error: 'Missing required fields: type, id, propertyId' },
        { status: 400 }
      );
    }

    if (type === 'category') {
      // Verify ownership
      const { data: existing, error: fetchErr } = await supabaseAdmin
        .from('accom_service_categories')
        .select('id, property_id')
        .eq('id', id)
        .single();

      if (fetchErr || !existing || existing.property_id !== propertyId) {
        return NextResponse.json({ error: 'Category not found or unauthorized' }, { status: 404 });
      }

      // Allowlisted fields
      const allowedFields: Record<string, string> = {
        name: 'name',
        icon: 'icon',
        displayOrder: 'display_order',
        isActive: 'is_active',
        automationLevel: 'automation_level',
      };

      const updateData: Record<string, unknown> = {};
      for (const [camelKey, snakeKey] of Object.entries(allowedFields)) {
        if (fields[camelKey] !== undefined) {
          updateData[snakeKey] = fields[camelKey];
        }
      }

      // Update slug if name changed
      if (updateData.name) {
        updateData.slug = slugify(updateData.name as string);
      }

      if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
      }

      const { data, error } = await supabaseAdmin
        .from('accom_service_categories')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('[accommodations/services] PUT category error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ category: data });
    }

    if (type === 'item') {
      // Verify ownership via property_id on the item
      const { data: existing, error: fetchErr } = await supabaseAdmin
        .from('accom_service_items')
        .select('id, property_id')
        .eq('id', id)
        .single();

      if (fetchErr || !existing || existing.property_id !== propertyId) {
        return NextResponse.json({ error: 'Item not found or unauthorized' }, { status: 404 });
      }

      // Allowlisted fields
      const allowedFields: Record<string, string> = {
        name: 'name',
        description: 'description',
        price: 'price',
        isAlwaysAvailable: 'is_always_available',
        availableFrom: 'available_from',
        availableUntil: 'available_until',
        inStock: 'in_stock',
        sortOrder: 'sort_order',
        imageUrl: 'image_url',
      };

      const updateData: Record<string, unknown> = {};
      for (const [camelKey, snakeKey] of Object.entries(allowedFields)) {
        if (fields[camelKey] !== undefined) {
          updateData[snakeKey] = fields[camelKey];
        }
      }

      if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
      }

      const { data, error } = await supabaseAdmin
        .from('accom_service_items')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('[accommodations/services] PUT item error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ item: data });
    }

    return NextResponse.json(
      { error: 'Invalid type. Must be "category" or "item"' },
      { status: 400 }
    );
  } catch (err) {
    console.error('[accommodations/services] PUT error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// DELETE - Delete category or item
// ============================================================================

export async function DELETE(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  try {
    const body = await request.json();
    const { type, id, propertyId } = body;

    if (!type || !id || !propertyId) {
      return NextResponse.json(
        { error: 'Missing required fields: type, id, propertyId' },
        { status: 400 }
      );
    }

    if (type === 'category') {
      // Verify ownership
      const { data: existing, error: fetchErr } = await supabaseAdmin
        .from('accom_service_categories')
        .select('id, property_id')
        .eq('id', id)
        .single();

      if (fetchErr || !existing || existing.property_id !== propertyId) {
        return NextResponse.json({ error: 'Category not found or unauthorized' }, { status: 404 });
      }

      // Delete items first (in case FK CASCADE is not configured)
      await supabaseAdmin.from('accom_service_items').delete().eq('category_id', id);

      // Delete category
      const { error } = await supabaseAdmin.from('accom_service_categories').delete().eq('id', id);

      if (error) {
        console.error('[accommodations/services] DELETE category error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    if (type === 'item') {
      // Verify ownership
      const { data: existing, error: fetchErr } = await supabaseAdmin
        .from('accom_service_items')
        .select('id, property_id')
        .eq('id', id)
        .single();

      if (fetchErr || !existing || existing.property_id !== propertyId) {
        return NextResponse.json({ error: 'Item not found or unauthorized' }, { status: 404 });
      }

      const { error } = await supabaseAdmin.from('accom_service_items').delete().eq('id', id);

      if (error) {
        console.error('[accommodations/services] DELETE item error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid type. Must be "category" or "item"' },
      { status: 400 }
    );
  } catch (err) {
    console.error('[accommodations/services] DELETE error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
