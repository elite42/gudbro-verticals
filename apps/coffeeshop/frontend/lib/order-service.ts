/**
 * Order Service
 *
 * Handles order submission to Supabase backend.
 * Falls back to localStorage if Supabase is not configured.
 */

import { supabase, isSupabaseConfigured, getSessionId, getDeviceFingerprint } from './supabase';
import { CartItem } from './cart-store';
import { orderHistoryStore, Order } from './order-history-store';

// Default merchant ID for demo - in production, this comes from QR code or URL
// Using the default UUID from the schema: 00000000-0000-0000-0000-000000000001
const DEFAULT_MERCHANT_ID = process.env.NEXT_PUBLIC_MERCHANT_ID || '00000000-0000-0000-0000-000000000001';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

// Extended Order type for UI display (combines Supabase and localStorage formats)
export interface Order {
  id: string;
  order_code: string;
  status: OrderStatus;
  total: number;
  submitted_at: number; // timestamp in milliseconds
  table_number: string | null;
  customer_name: string | null;
  consumption_type: 'dine-in' | 'takeaway';
  service_type: 'table-service' | 'counter-pickup' | 'takeaway';
  items: {
    name: string;
    quantity: number;
    subtotal: number;
    image?: string;
    extras?: { name: string; price: number }[];
  }[];
}

export interface SubmitOrderData {
  items: CartItem[];
  total: number;
  table_context: {
    table_number: string | null;
    customer_name: string | null;
    consumption_type: 'dine-in' | 'takeaway';
    service_type: 'table-service' | 'counter-pickup' | 'takeaway';
  };
  customer_notes?: string;
}

export interface SubmittedOrder {
  id: string;
  order_code: string;
  status: OrderStatus;
  total: number;
  submitted_at: string;
}

/**
 * Submit order to backend (Supabase) or localStorage fallback
 */
export async function submitOrder(orderData: SubmitOrderData): Promise<SubmittedOrder> {
  // If Supabase is configured, submit to backend
  if (isSupabaseConfigured && supabase) {
    return submitToSupabase(orderData);
  }

  // Fallback to localStorage
  return submitToLocalStorage(orderData);
}

/**
 * Submit order to Supabase
 */
async function submitToSupabase(orderData: SubmitOrderData): Promise<SubmittedOrder> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const sessionId = getSessionId();
  const deviceFingerprint = getDeviceFingerprint();

  // Calculate subtotal
  const subtotal = orderData.items.reduce((sum, item) => {
    const itemPrice = item.dish.price * item.quantity;
    const extrasPrice = item.extras.reduce((s, e) => s + e.price, 0) * item.quantity;
    return sum + itemPrice + extrasPrice;
  }, 0);

  // 1. Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      merchant_id: DEFAULT_MERCHANT_ID,
      customer_name: orderData.table_context.customer_name,
      table_number: orderData.table_context.table_number,
      consumption_type: orderData.table_context.consumption_type,
      service_type: orderData.table_context.service_type,
      status: 'pending',
      subtotal: subtotal,
      total: orderData.total,
      currency: 'VND',
      payment_status: 'unpaid',
      customer_notes: orderData.customer_notes || null,
      session_id: sessionId,
      device_fingerprint: deviceFingerprint,
    })
    .select('id, order_code, status, total, submitted_at')
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    throw new Error(`Failed to create order: ${orderError.message}`);
  }

  // 2. Create order items
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    menu_item_id: null, // We don't have menu_item_id from frontend yet
    item_name: { en: item.dish.name },
    item_slug: item.dish.id,
    item_image_url: item.dish.image,
    unit_price: item.dish.price,
    quantity: item.quantity,
    extras: item.extras.map(e => ({ id: e.id, name: e.name, price: e.price })),
    extras_total: item.extras.reduce((sum, e) => sum + e.price, 0) * item.quantity,
    line_total: (item.dish.price + item.extras.reduce((sum, e) => sum + e.price, 0)) * item.quantity,
    item_status: 'pending' as const,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    // Order was created, but items failed - still return the order
  }

  // Also save to localStorage for offline access
  orderHistoryStore.addOrder({
    items: orderData.items,
    total: orderData.total,
    table_context: orderData.table_context,
  });

  return {
    id: order.id,
    order_code: order.order_code,
    status: order.status as OrderStatus,
    total: order.total,
    submitted_at: order.submitted_at,
  };
}

/**
 * Fallback: Submit order to localStorage only
 */
async function submitToLocalStorage(orderData: SubmitOrderData): Promise<SubmittedOrder> {
  const localOrder = orderHistoryStore.addOrder({
    items: orderData.items,
    total: orderData.total,
    table_context: orderData.table_context,
  });

  // Generate a mock order code
  const orderNumber = orderHistoryStore.count();
  const letter = String.fromCharCode(65 + Math.floor((orderNumber - 1) / 100) % 6);
  const num = ((orderNumber - 1) % 100) + 1;
  const orderCode = `${letter}-${num.toString().padStart(3, '0')}`;

  return {
    id: localOrder.id,
    order_code: orderCode,
    status: 'pending',
    total: orderData.total,
    submitted_at: new Date().toISOString(),
  };
}

/**
 * Get order status from Supabase
 */
export async function getOrderStatus(orderId: string): Promise<OrderStatus | null> {
  if (!isSupabaseConfigured || !supabase) {
    // Check localStorage
    const localOrder = orderHistoryStore.getById(orderId);
    return localOrder?.status || null;
  }

  const { data, error } = await supabase
    .from('orders')
    .select('status')
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('Error fetching order status:', error);
    return null;
  }

  return data?.status as OrderStatus;
}

/**
 * Subscribe to order status updates (realtime)
 */
export function subscribeToOrderStatus(
  orderId: string,
  onStatusChange: (status: OrderStatus) => void
): () => void {
  if (!isSupabaseConfigured || !supabase) {
    // No realtime for localStorage - return no-op cleanup
    return () => {};
  }

  const channel = supabase
    .channel(`order-${orderId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`,
      },
      (payload) => {
        if (payload.new && typeof payload.new === 'object' && 'status' in payload.new) {
          onStatusChange(payload.new.status as OrderStatus);
        }
      }
    )
    .subscribe();

  // Return cleanup function
  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Get all orders for current session
 */
export async function getSessionOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured || !supabase) {
    // Convert localStorage orders to new Order format
    const localOrders = orderHistoryStore.getSessionOrders();
    return localOrders.map((o, idx) => ({
      id: o.id,
      order_code: `L-${String(idx + 1).padStart(3, '0')}`,
      status: o.status as OrderStatus,
      total: o.total,
      submitted_at: o.submittedAt,
      table_number: o.table_context.table_number,
      customer_name: o.table_context.customer_name,
      consumption_type: o.table_context.consumption_type,
      service_type: o.table_context.service_type,
      items: o.items.map(item => ({
        name: item.dish.name,
        quantity: item.quantity,
        subtotal: (item.dish.price + item.extras.reduce((sum, e) => sum + e.price, 0)) * item.quantity,
        image: item.dish.image,
        extras: item.extras.map(e => ({ name: e.name, price: e.price })),
      })),
    }));
  }

  const sessionId = getSessionId();

  // Fetch orders with items
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      order_code,
      status,
      total,
      currency,
      submitted_at,
      table_number,
      customer_name,
      consumption_type,
      service_type,
      order_items (
        item_name,
        quantity,
        line_total,
        item_image_url,
        extras
      )
    `)
    .eq('session_id', sessionId)
    .order('submitted_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching session orders:', error);
    // Fallback to localStorage
    const localOrders = orderHistoryStore.getSessionOrders();
    return localOrders.map((o, idx) => ({
      id: o.id,
      order_code: `L-${String(idx + 1).padStart(3, '0')}`,
      status: o.status as OrderStatus,
      total: o.total,
      submitted_at: o.submittedAt,
      table_number: o.table_context.table_number,
      customer_name: o.table_context.customer_name,
      consumption_type: o.table_context.consumption_type,
      service_type: o.table_context.service_type,
      items: o.items.map(item => ({
        name: item.dish.name,
        quantity: item.quantity,
        subtotal: (item.dish.price + item.extras.reduce((sum, e) => sum + e.price, 0)) * item.quantity,
        image: item.dish.image,
        extras: item.extras.map(e => ({ name: e.name, price: e.price })),
      })),
    }));
  }

  // Convert Supabase data to Order format
  return (data || []).map(o => ({
    id: o.id,
    order_code: o.order_code,
    status: o.status as OrderStatus,
    total: parseFloat(o.total),
    submitted_at: new Date(o.submitted_at).getTime(),
    table_number: o.table_number,
    customer_name: o.customer_name,
    consumption_type: o.consumption_type as 'dine-in' | 'takeaway',
    service_type: o.service_type as 'table-service' | 'counter-pickup' | 'takeaway',
    items: (o.order_items || []).map((item: { item_name: { en?: string }; quantity: number; line_total: string | number; item_image_url?: string; extras?: { name: string; price: number }[] }) => ({
      name: item.item_name?.en || 'Item',
      quantity: item.quantity,
      subtotal: parseFloat(String(item.line_total)),
      image: item.item_image_url,
      extras: item.extras || [],
    })),
  }));
}
