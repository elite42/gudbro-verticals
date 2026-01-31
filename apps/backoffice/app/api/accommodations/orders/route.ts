import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/orders?propertyId=X&status=Y&search=Z&page=1&limit=20
 *
 * Returns paginated service orders for a property with item count and guest/room info.
 * Supports comma-separated status filter (e.g. "pending,confirmed").
 */
export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));

  if (!propertyId) {
    return NextResponse.json({ error: 'Missing required parameter: propertyId' }, { status: 400 });
  }

  const offset = (page - 1) * limit;

  try {
    // Build query for orders with booking/room join
    let query = supabaseAdmin
      .from('accom_service_orders')
      .select(
        `id, status, subtotal, total, currency, delivery_notes, requested_time,
         created_at, updated_at,
         booking:accom_bookings!inner(
           id, guest_name, guest_last_name, guest_phone, guest_email,
           room:accom_rooms(room_number, room_type)
         ),
         items:accom_service_order_items(id)`,
        { count: 'exact' }
      )
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Status filter (supports comma-separated)
    if (status && status !== 'all') {
      const statuses = status
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (statuses.length === 1) {
        query = query.eq('status', statuses[0]);
      } else if (statuses.length > 1) {
        query = query.in('status', statuses);
      }
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('[accommodations/orders] GET error:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    // If search is provided, filter in-memory by guest name or order id
    let orders = (data || []).map((order: Record<string, unknown>) => {
      const booking = order.booking as Record<string, unknown> | null;
      const room = booking?.room as Record<string, unknown> | null;
      const items = order.items as unknown[];

      return {
        id: order.id,
        status: order.status,
        guestName: booking
          ? `${booking.guest_name || ''} ${booking.guest_last_name || ''}`.trim()
          : 'Unknown',
        guestPhone: booking?.guest_phone || null,
        guestEmail: booking?.guest_email || null,
        roomNumber: room?.room_number || null,
        roomType: room?.room_type || null,
        itemCount: items?.length || 0,
        subtotal: order.subtotal,
        total: order.total,
        currency: order.currency,
        deliveryNotes: order.delivery_notes,
        requestedTime: order.requested_time,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
      };
    });

    // Client-side search filter (guest name or order id)
    let total = count || 0;
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      orders = orders.filter(
        (o) => o.guestName.toLowerCase().includes(q) || (o.id as string).toLowerCase().includes(q)
      );
      total = orders.length;
    }

    return NextResponse.json({ orders, total, page, limit });
  } catch (err) {
    console.error('[accommodations/orders] GET unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
