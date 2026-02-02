import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { publicApiLimiter, withRateLimit } from '@/lib/rate-limiter';

export const dynamic = 'force-dynamic';

// Merchant ID for ROOTS My Khe - in production this would come from config/auth
const MERCHANT_ID = '00000000-0000-0000-0000-000000000001';

interface OrderItem {
  dish: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
  extras: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  specialInstructions?: string;
}

interface OrderData {
  items: OrderItem[];
  tableNumber?: string;
  seatNumber?: string;
  customerName?: string;
  customerNotes?: string;
  total: number;
  currency?: string;
  sessionId?: string;
}

// Generate order code (e.g., "A1B2C3")
function generateOrderCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// POST /api/orders - Submit a new order
export async function POST(request: NextRequest) {
  // Rate limit: 30 requests per minute per IP
  const rateLimitResult = await withRateLimit(request, publicApiLimiter);
  if (rateLimitResult) return rateLimitResult;

  const supabase = getSupabaseAdmin();

  try {
    const body: OrderData = await request.json();
    const {
      items,
      tableNumber,
      seatNumber,
      customerName,
      customerNotes,
      total,
      currency,
      sessionId,
    } = body;

    // Validation
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in order' }, { status: 400 });
    }

    // Get next order number for this merchant
    const { data: lastOrder } = await supabase
      .from('orders')
      .select('order_number')
      .eq('merchant_id', MERCHANT_ID)
      .order('order_number', { ascending: false })
      .limit(1)
      .single();

    const orderNumber = (lastOrder?.order_number || 0) + 1;
    const orderCode = generateOrderCode();

    // Calculate subtotal from items
    const subtotal = items.reduce((sum, item) => {
      const itemPrice = item.dish.price;
      const extrasPrice = item.extras.reduce((s, e) => s + e.price, 0);
      return sum + (itemPrice + extrasPrice) * item.quantity;
    }, 0);

    // Create order
    const orderData = {
      merchant_id: MERCHANT_ID,
      order_number: orderNumber,
      order_code: orderCode,
      customer_name: customerName || null,
      table_number: tableNumber || null,
      consumption_type: tableNumber ? 'dine_in' : 'takeaway',
      service_type: 'counter',
      status: 'pending',
      submitted_at: new Date().toISOString(),
      subtotal: subtotal,
      tax_amount: 0,
      discount_amount: 0,
      total: total || subtotal,
      currency: currency || 'VND',
      payment_status: 'pending',
      customer_notes: customerNotes || null,
      session_id: sessionId || null,
    };

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select('id, order_code, order_number')
      .single();

    if (orderError) {
      console.error('Order insert error:', orderError);
      throw orderError;
    }

    // Insert order items
    const orderItems = items.map((item) => {
      const extrasTotal = item.extras.reduce((s, e) => s + e.price, 0);
      const lineTotal = (item.dish.price + extrasTotal) * item.quantity;

      return {
        order_id: order.id,
        menu_item_id: item.dish.id && item.dish.id.match(/^[0-9a-f-]{36}$/) ? item.dish.id : null,
        item_name: { en: item.dish.name }, // JSONB multilang
        item_slug: item.dish.slug || null,
        item_image_url: item.dish.image || null,
        unit_price: item.dish.price,
        quantity: item.quantity,
        extras: item.extras.length > 0 ? item.extras : null,
        extras_total: extrasTotal,
        special_instructions: item.specialInstructions || null,
        line_total: lineTotal,
        item_status: 'pending',
      };
    });

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

    if (itemsError) {
      console.error('Order items insert error:', itemsError);
      // Don't throw - order was created, items failed
      // In production, this should be a transaction
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderCode: order.order_code,
      orderNumber: order.order_number,
      message: `Ordine #${order.order_number} ricevuto!`,
    });
  } catch (error) {
    console.error('Orders POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/orders - Get orders for a session
export async function GET(request: NextRequest) {
  // Rate limit: 30 requests per minute per IP
  const rateLimitResult = await withRateLimit(request, publicApiLimiter);
  if (rateLimitResult) return rateLimitResult;

  const supabase = getSupabaseAdmin();

  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const orderCode = searchParams.get('orderCode');

    if (!sessionId && !orderCode) {
      return NextResponse.json({ error: 'sessionId or orderCode required' }, { status: 400 });
    }

    let query = supabase
      .from('orders')
      .select(
        `
        id,
        order_number,
        order_code,
        status,
        total,
        currency,
        submitted_at,
        table_number,
        order_items (
          id,
          item_name,
          quantity,
          unit_price,
          extras,
          line_total,
          item_status
        )
      `
      )
      .eq('merchant_id', MERCHANT_ID)
      .order('submitted_at', { ascending: false });

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }
    if (orderCode) {
      query = query.eq('order_code', orderCode);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Orders GET error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      orders: orders || [],
      count: orders?.length || 0,
    });
  } catch (error) {
    console.error('Orders GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
