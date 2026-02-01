import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken, requireFullAccess } from '@/lib/auth';
import type { ApiResponse, ServiceOrder, ServiceOrderItem, CreateOrderRequest } from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * Extract and verify guest JWT from Authorization header
 */
async function authenticateGuest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);
  if (!token) return null;

  try {
    return await verifyGuestToken(token);
  } catch {
    return null;
  }
}

/**
 * Compute the primary category tag for an order based on item majority.
 * Returns the most frequent categoryTag among items, defaulting to 'general'.
 */
function primaryCategoryTag(items: ServiceOrderItem[]): string {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const tag = item.categoryTag || 'general';
    counts[tag] = (counts[tag] || 0) + 1;
  }
  let maxTag = 'general';
  let maxCount = 0;
  for (const [tag, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxTag = tag;
      maxCount = count;
    }
  }
  return maxTag;
}

/**
 * Map a raw DB order row + items to a ServiceOrder response object
 */
function mapOrder(
  row: Record<string, unknown>,
  rawItems: Array<Record<string, unknown>>
): ServiceOrder {
  const items: ServiceOrderItem[] = rawItems.map((item) => ({
    id: item.id as string,
    name: item.name as string,
    quantity: item.quantity as number,
    unitPrice: item.unit_price as number,
    total: item.total as number,
    notes: (item.notes as string) || null,
    categoryTag: (item.category_tag as string) || 'general',
  }));

  return {
    id: row.id as string,
    status: row.status as string,
    requestedTime: (row.requested_time as string) || null,
    deliveryNotes: (row.delivery_notes as string) || null,
    subtotal: row.subtotal as number,
    tax: row.tax as number,
    total: row.total as number,
    currency: row.currency as string,
    categoryTag: primaryCategoryTag(items),
    isMinibarConsumption: (row.is_minibar_consumption as boolean) || false,
    ownerConfirmed: (row.owner_confirmed as boolean | null) ?? null,
    items,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

/**
 * GET /api/stay/[code]/orders
 *
 * List all orders for the authenticated guest's booking.
 * Orders are returned in reverse chronological order.
 */
export async function GET(request: NextRequest) {
  try {
    const guest = await authenticateGuest(request);
    if (!guest) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('accom_service_orders')
      .select(
        `
        id, status, requested_time, delivery_notes, subtotal, tax, total, currency, is_minibar_consumption, owner_confirmed, created_at, updated_at,
        accom_service_order_items(
          id, name, quantity, unit_price, total, notes, category_tag
        )
      `
      )
      .eq('booking_id', guest.bookingId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('GET /api/stay/[code]/orders query error:', error);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const orders: ServiceOrder[] = (data || []).map((row) => {
      const rawItems =
        (row.accom_service_order_items as unknown as Array<Record<string, unknown>>) || [];
      return mapOrder(row as unknown as Record<string, unknown>, rawItems);
    });

    return NextResponse.json<ApiResponse<{ orders: ServiceOrder[] }>>({
      data: { orders },
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/orders error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}

/**
 * GET the current local time in a given timezone as HH:MM format
 */
function getCurrentTimeInTimezone(timezone: string): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return formatter.format(now);
}

/**
 * Check if the current time (in property timezone) is within the available hours.
 * Returns true if available, false if outside hours.
 */
function isWithinAvailableHours(
  availableFrom: string,
  availableUntil: string,
  timezone: string
): boolean {
  const currentTime = getCurrentTimeInTimezone(timezone);
  // Simple string comparison works for HH:MM format
  return currentTime >= availableFrom && currentTime <= availableUntil;
}

/**
 * POST /api/stay/[code]/orders
 *
 * Create a new service order for the authenticated guest's booking.
 *
 * Security:
 * - Prices are snapshotted from the DB (NOT from request body)
 * - Items are verified to belong to the guest's property
 * - Availability hours are checked against property timezone
 * - Auto-confirm logic based on category automation_level
 */
export async function POST(request: NextRequest) {
  try {
    const guest = await authenticateGuest(request);
    if (!guest) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    // Require full-tier access for ordering (browse-tier gets 403)
    if (!requireFullAccess(guest)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_required' },
        { status: 403 }
      );
    }

    const body = (await request.json()) as CreateOrderRequest;

    // Validate request
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    for (const item of body.items) {
      if (!item.serviceItemId || !item.quantity || item.quantity < 1 || item.quantity > 10) {
        return NextResponse.json<ApiResponse<null>>(
          { error: 'Each item must have a valid serviceItemId and quantity (1-10)' },
          { status: 400 }
        );
      }
    }

    const supabase = getSupabaseAdmin();

    // Fetch property timezone and currency
    const { data: property, error: propError } = await supabase
      .from('accom_properties')
      .select('timezone, currency')
      .eq('id', guest.propertyId)
      .single();

    if (propError || !property) {
      console.error('POST /api/stay/[code]/orders property query error:', propError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const timezone = property.timezone || 'UTC';
    const propertyCurrency = property.currency || 'VND';

    // Fetch and validate each item from DB
    const itemIds = body.items.map((i) => i.serviceItemId);
    const { data: dbItems, error: itemsError } = await supabase
      .from('accom_service_items')
      .select(
        `
        id, name, price, currency, in_stock, is_always_available, available_from, available_until,
        category_id,
        accom_service_categories!inner(automation_level, category_tag)
      `
      )
      .in('id', itemIds)
      .eq('property_id', guest.propertyId);

    if (itemsError) {
      console.error('POST /api/stay/[code]/orders items query error:', itemsError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    if (!dbItems || dbItems.length !== itemIds.length) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'One or more items not found or do not belong to this property' },
        { status: 400 }
      );
    }

    // Build a lookup map from DB items
    const dbItemMap = new Map(dbItems.map((item) => [item.id, item]));

    // Validate stock and availability, build order items
    let subtotal = 0;
    let allAutoConfirm = true;
    let isMinibarOrder = false;

    const orderItems: Array<{
      service_item_id: string;
      name: string;
      quantity: number;
      unit_price: number;
      total: number;
      notes: string | null;
      category_tag: string;
    }> = [];

    for (const reqItem of body.items) {
      const dbItem = dbItemMap.get(reqItem.serviceItemId);
      if (!dbItem) {
        return NextResponse.json<ApiResponse<null>>(
          { error: `Item ${reqItem.serviceItemId} not found` },
          { status: 400 }
        );
      }

      // Check stock
      if (!dbItem.in_stock) {
        return NextResponse.json<ApiResponse<null>>(
          { error: `"${dbItem.name}" is currently out of stock` },
          { status: 400 }
        );
      }

      // Check availability hours
      if (!dbItem.is_always_available && dbItem.available_from && dbItem.available_until) {
        if (!isWithinAvailableHours(dbItem.available_from, dbItem.available_until, timezone)) {
          return NextResponse.json<ApiResponse<null>>(
            {
              error: `"${dbItem.name}" is only available from ${dbItem.available_from} to ${dbItem.available_until}`,
            },
            { status: 400 }
          );
        }
      }

      // Check automation level
      const category = dbItem.accom_service_categories as unknown as Record<string, unknown>;
      const automationLevel = category?.automation_level as string;
      if (
        automationLevel !== 'auto_confirm' &&
        automationLevel !== 'whatsapp_notify' &&
        automationLevel !== 'self_service'
      ) {
        allAutoConfirm = false;
      }

      // Track if any item is from a self_service category
      if (automationLevel === 'self_service') {
        isMinibarOrder = true;
      }

      const itemTotal = dbItem.price * reqItem.quantity;
      subtotal += itemTotal;

      const categoryData = dbItem.accom_service_categories as unknown as Record<string, unknown>;
      const itemCategoryTag = (categoryData?.category_tag as string) || 'general';

      orderItems.push({
        service_item_id: dbItem.id,
        name: dbItem.name,
        quantity: reqItem.quantity,
        unit_price: dbItem.price,
        total: itemTotal,
        notes: reqItem.notes || null,
        category_tag: itemCategoryTag,
      });
    }

    const tax = 0;
    const total = subtotal + tax;
    const initialStatus = allAutoConfirm ? 'confirmed' : 'pending';

    // Insert order header
    const { data: order, error: orderError } = await supabase
      .from('accom_service_orders')
      .insert({
        booking_id: guest.bookingId,
        property_id: guest.propertyId,
        status: initialStatus,
        requested_time: body.requestedTime || null,
        delivery_notes: body.deliveryNotes || null,
        payment_method: 'room_charge',
        subtotal,
        tax,
        total,
        currency: propertyCurrency,
        is_minibar_consumption: isMinibarOrder,
        owner_confirmed: isMinibarOrder ? null : undefined,
      })
      .select(
        'id, status, requested_time, delivery_notes, subtotal, tax, total, currency, is_minibar_consumption, owner_confirmed, created_at, updated_at'
      )
      .single();

    if (orderError || !order) {
      console.error('POST /api/stay/[code]/orders insert error:', orderError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Insert order items
    const itemsToInsert = orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    const { data: insertedItems, error: itemsInsertError } = await supabase
      .from('accom_service_order_items')
      .insert(itemsToInsert)
      .select('id, name, quantity, unit_price, total, notes, category_tag');

    if (itemsInsertError) {
      console.error('POST /api/stay/[code]/orders items insert error:', itemsInsertError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const responseOrder = mapOrder(
      order as unknown as Record<string, unknown>,
      (insertedItems || []) as unknown as Array<Record<string, unknown>>
    );

    return NextResponse.json<ApiResponse<{ order: ServiceOrder }>>(
      { data: { order: responseOrder } },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/stay/[code]/orders error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
