import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken } from '@/lib/auth';
import type { ApiResponse, ServiceOrder, ServiceOrderItem } from '@/types/stay';

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
 * GET /api/stay/[code]/orders/[orderId]
 *
 * Fetch a single order by ID for the authenticated guest.
 * Security: guest can only read their own orders (verified via booking_id from JWT).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string; orderId: string } }
) {
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
        id, status, requested_time, delivery_notes, subtotal, tax, total, currency, created_at, updated_at,
        accom_service_order_items(
          id, name, quantity, unit_price, total, notes
        )
      `
      )
      .eq('id', params.orderId)
      .eq('booking_id', guest.bookingId)
      .single();

    if (error) {
      // PGRST116 = no rows found
      if (error.code === 'PGRST116') {
        return NextResponse.json<ApiResponse<null>>({ error: 'order_not_found' }, { status: 404 });
      }
      console.error('GET /api/stay/[code]/orders/[orderId] query error:', error);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const rawItems =
      (data.accom_service_order_items as unknown as Array<Record<string, unknown>>) || [];

    const items: ServiceOrderItem[] = rawItems.map((item) => ({
      id: item.id as string,
      name: item.name as string,
      quantity: item.quantity as number,
      unitPrice: item.unit_price as number,
      total: item.total as number,
      notes: (item.notes as string) || null,
    }));

    const order: ServiceOrder = {
      id: data.id,
      status: data.status,
      requestedTime: data.requested_time || null,
      deliveryNotes: data.delivery_notes || null,
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.total,
      currency: data.currency,
      items,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return NextResponse.json<ApiResponse<{ order: ServiceOrder }>>({
      data: { order },
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/orders/[orderId] error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
