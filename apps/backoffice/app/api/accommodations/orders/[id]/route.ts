import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  validateAdminApiKey,
  isValidOrderTransition,
  ORDER_ACTION_TO_STATUS,
} from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/orders/[id]
 *
 * Returns full order detail with items, guest info, and room info.
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { data, error } = await supabaseAdmin
    .from('accom_service_orders')
    .select(
      `id, status, subtotal, total, currency, delivery_notes, requested_time,
       created_at, updated_at, property_id,
       booking:accom_bookings(
         id, guest_name, guest_last_name, guest_email, guest_phone,
         room:accom_rooms(id, room_number, room_type)
       ),
       items:accom_service_order_items(
         id, service_item_id, item_name, quantity, unit_price, total_price, notes
       )`
    )
    .eq('id', params.id)
    .single();

  if (error) {
    console.error('[accommodations/orders/[id]] GET error:', error);
    const status = error.code === 'PGRST116' ? 404 : 500;
    return NextResponse.json(
      { error: status === 404 ? 'Order not found' : 'Failed to fetch order' },
      { status }
    );
  }

  // Map to camelCase response
  // Supabase returns joins as arrays; pick first element for singular relations
  const bookingRaw = data.booking as unknown;
  const booking = (Array.isArray(bookingRaw) ? bookingRaw[0] : bookingRaw) as
    | Record<string, unknown>
    | null
    | undefined;
  const roomRaw = booking?.room as unknown;
  const room = (Array.isArray(roomRaw) ? roomRaw[0] : roomRaw) as
    | Record<string, unknown>
    | null
    | undefined;

  const order = {
    id: data.id,
    status: data.status,
    subtotal: data.subtotal,
    total: data.total,
    currency: data.currency,
    deliveryNotes: data.delivery_notes,
    requestedTime: data.requested_time,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    propertyId: data.property_id,
    guest: booking
      ? {
          name: `${booking.guest_name || ''} ${booking.guest_last_name || ''}`.trim(),
          firstName: booking.guest_name,
          lastName: booking.guest_last_name,
          email: booking.guest_email,
          phone: booking.guest_phone,
        }
      : null,
    room: room
      ? {
          id: room.id,
          number: room.room_number,
          type: room.room_type,
        }
      : null,
    items: ((data.items as unknown[]) || []).map((item: unknown) => {
      const i = item as Record<string, unknown>;
      return {
        id: i.id,
        serviceItemId: i.service_item_id,
        name: i.item_name,
        quantity: i.quantity,
        unitPrice: i.unit_price,
        totalPrice: i.total_price,
        notes: i.notes,
      };
    }),
  };

  return NextResponse.json({ order });
}

/**
 * PATCH /api/accommodations/orders/[id]
 *
 * Performs a status action on an order. Validates the transition against
 * the ORDER_VALID_TRANSITIONS state machine before applying.
 *
 * Body: { action: string, reason?: string }
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  let body: { action: string; reason?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { action, reason } = body;

  // Validate action
  const newStatus = ORDER_ACTION_TO_STATUS[action];
  if (!newStatus) {
    return NextResponse.json(
      { error: 'Invalid action', validActions: Object.keys(ORDER_ACTION_TO_STATUS) },
      { status: 400 }
    );
  }

  // Fetch current status
  const { data: current, error: fetchError } = await supabaseAdmin
    .from('accom_service_orders')
    .select('status')
    .eq('id', params.id)
    .single();

  if (fetchError || !current) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const currentStatus = current.status as string;

  // Validate transition using state machine
  if (!isValidOrderTransition(currentStatus, newStatus)) {
    return NextResponse.json(
      {
        error: 'invalid_transition',
        currentStatus,
        requestedAction: action,
        requestedStatus: newStatus,
      },
      { status: 400 }
    );
  }

  // Build update payload
  const update: Record<string, unknown> = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };

  // Store rejection reason in delivery_notes
  if (action === 'reject' && reason) {
    update.delivery_notes = reason;
  }

  const { data, error: updateError } = await supabaseAdmin
    .from('accom_service_orders')
    .update(update)
    .eq('id', params.id)
    .select()
    .single();

  if (updateError) {
    console.error('[accommodations/orders/[id]] PATCH error:', updateError);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }

  return NextResponse.json({ order: data });
}
