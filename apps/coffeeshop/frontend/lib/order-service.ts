/**
 * Order Service
 *
 * Handles order submission to Supabase backend.
 * Falls back to localStorage if Supabase is not configured.
 *
 * Features:
 * - Automatic retry on network failures (3 attempts)
 * - Structured error types for UI handling
 * - Graceful degradation to localStorage
 * - User-friendly error messages (multilang)
 */

import { supabase, isSupabaseConfigured, getSessionId, getDeviceFingerprint } from './supabase';
import { CartItem } from './cart-store';
import { orderHistoryStore, Order as HistoryOrder } from './order-history-store';

// Default merchant ID for demo - in production, this comes from QR code or URL
// Using the default UUID from the schema: 00000000-0000-0000-0000-000000000001
const DEFAULT_MERCHANT_ID =
  process.env.NEXT_PUBLIC_MERCHANT_ID || '00000000-0000-0000-0000-000000000001';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Error types for structured error handling
export type OrderErrorCode =
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'VALIDATION_ERROR'
  | 'TIMEOUT_ERROR'
  | 'UNKNOWN_ERROR';

export interface OrderError {
  code: OrderErrorCode;
  message: string;
  userMessage: {
    en: string;
    vi: string;
    it: string;
  };
  retryable: boolean;
  originalError?: unknown;
}

// User-friendly error messages
const ERROR_MESSAGES: Record<OrderErrorCode, { en: string; vi: string; it: string }> = {
  NETWORK_ERROR: {
    en: 'Unable to connect. Please check your internet connection and try again.',
    vi: 'Không thể kết nối. Vui lòng kiểm tra kết nối internet và thử lại.',
    it: 'Impossibile connettersi. Controlla la connessione internet e riprova.',
  },
  SERVER_ERROR: {
    en: 'Server error. Your order was saved locally and will sync when the connection is restored.',
    vi: 'Lỗi máy chủ. Đơn hàng đã được lưu cục bộ và sẽ đồng bộ khi kết nối được khôi phục.',
    it: 'Errore del server. Il tuo ordine è stato salvato localmente e verrà sincronizzato quando la connessione sarà ripristinata.',
  },
  VALIDATION_ERROR: {
    en: 'Invalid order data. Please review your cart and try again.',
    vi: 'Dữ liệu đơn hàng không hợp lệ. Vui lòng xem lại giỏ hàng và thử lại.',
    it: 'Dati ordine non validi. Rivedi il carrello e riprova.',
  },
  TIMEOUT_ERROR: {
    en: 'Request timed out. Please try again.',
    vi: 'Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.',
    it: 'Richiesta scaduta. Riprova.',
  },
  UNKNOWN_ERROR: {
    en: 'Something went wrong. Please try again or contact support.',
    vi: 'Đã có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ hỗ trợ.',
    it: "Si è verificato un errore. Riprova o contatta l'assistenza.",
  },
};

function createOrderError(
  code: OrderErrorCode,
  message: string,
  originalError?: unknown
): OrderError {
  return {
    code,
    message,
    userMessage: ERROR_MESSAGES[code],
    retryable: code === 'NETWORK_ERROR' || code === 'TIMEOUT_ERROR',
    originalError,
  };
}

// Sleep helper for retry delays
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'delivered'
  | 'cancelled';

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
  savedLocally?: boolean; // True if order was saved to localStorage (fallback)
}

export type SubmitOrderResult =
  | { success: true; order: SubmittedOrder }
  | { success: false; error: OrderError; fallbackOrder?: SubmittedOrder };

/**
 * Submit order to backend (Supabase) or localStorage fallback
 * Returns a result object with success status and either order or error
 */
export async function submitOrder(orderData: SubmitOrderData): Promise<SubmitOrderResult> {
  // Validate order data first
  if (!orderData.items || orderData.items.length === 0) {
    return {
      success: false,
      error: createOrderError('VALIDATION_ERROR', 'Order must have at least one item'),
    };
  }

  if (orderData.total <= 0) {
    return {
      success: false,
      error: createOrderError('VALIDATION_ERROR', 'Order total must be greater than zero'),
    };
  }

  // If Supabase is configured, submit to backend with retry logic
  if (isSupabaseConfigured && supabase) {
    return submitToSupabaseWithRetry(orderData);
  }

  // Fallback to localStorage
  try {
    const order = await submitToLocalStorage(orderData);
    return { success: true, order };
  } catch (err) {
    return {
      success: false,
      error: createOrderError('UNKNOWN_ERROR', 'Failed to save order locally', err),
    };
  }
}

/**
 * Submit to Supabase with retry logic
 */
async function submitToSupabaseWithRetry(orderData: SubmitOrderData): Promise<SubmitOrderResult> {
  let lastError: OrderError | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const order = await submitToSupabase(orderData);
      return { success: true, order };
    } catch (err) {
      // Classify the error
      const errorMessage = err instanceof Error ? err.message : String(err);

      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        lastError = createOrderError('NETWORK_ERROR', errorMessage, err);
      } else if (errorMessage.includes('timeout')) {
        lastError = createOrderError('TIMEOUT_ERROR', errorMessage, err);
      } else if (errorMessage.includes('validation') || errorMessage.includes('invalid')) {
        // Validation errors are not retryable
        return {
          success: false,
          error: createOrderError('VALIDATION_ERROR', errorMessage, err),
        };
      } else {
        lastError = createOrderError('SERVER_ERROR', errorMessage, err);
      }

      // Only retry for network/timeout errors
      if (!lastError.retryable || attempt === MAX_RETRIES) {
        break;
      }

      // Wait before retrying (exponential backoff)
      await sleep(RETRY_DELAY_MS * attempt);
      console.warn(`[OrderService] Retry attempt ${attempt + 1}/${MAX_RETRIES}...`);
    }
  }

  // All retries failed - fallback to localStorage
  console.warn('[OrderService] All retries failed, falling back to localStorage');
  try {
    const fallbackOrder = await submitToLocalStorage(orderData);
    return {
      success: false,
      error: lastError || createOrderError('UNKNOWN_ERROR', 'Unknown error occurred'),
      fallbackOrder: { ...fallbackOrder, savedLocally: true },
    };
  } catch (fallbackErr) {
    return {
      success: false,
      error: lastError || createOrderError('UNKNOWN_ERROR', 'Failed to save order', fallbackErr),
    };
  }
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
  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    menu_item_id: null, // We don't have menu_item_id from frontend yet
    item_name: { en: item.dish.name },
    item_slug: item.dish.id,
    item_image_url: item.dish.image,
    unit_price: item.dish.price,
    quantity: item.quantity,
    extras: item.extras.map((e) => ({ id: e.id, name: e.name, price: e.price })),
    extras_total: item.extras.reduce((sum, e) => sum + e.price, 0) * item.quantity,
    line_total:
      (item.dish.price + item.extras.reduce((sum, e) => sum + e.price, 0)) * item.quantity,
    item_status: 'pending' as const,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

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
  const letter = String.fromCharCode(65 + (Math.floor((orderNumber - 1) / 100) % 6));
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

  const { data, error } = await supabase.from('orders').select('status').eq('id', orderId).single();

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
    supabase?.removeChannel(channel);
  };
}

/**
 * Get all orders for current session
 */
// ETA types
export interface OrderETA {
  orderId: string;
  etaMinutes: number;
  etaRange: { min: number; max: number };
  confidence: 'high' | 'medium' | 'low';
  itemsRemaining: number;
  etaReadyAt: string;
  message: string;
}

/**
 * Get estimated time to completion for an order
 */
export async function getOrderETA(orderId: string): Promise<OrderETA | null> {
  try {
    const response = await fetch(`/api/orders/${orderId}/eta`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching order ETA:', error);
    return null;
  }
}

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
      items: o.items.map((item) => ({
        name: item.dish.name,
        quantity: item.quantity,
        subtotal:
          (item.dish.price + item.extras.reduce((sum, e) => sum + e.price, 0)) * item.quantity,
        image: item.dish.image,
        extras: item.extras.map((e) => ({ name: e.name, price: e.price })),
      })),
    }));
  }

  const sessionId = getSessionId();

  // Fetch orders with items
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
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
    `
    )
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
      items: o.items.map((item) => ({
        name: item.dish.name,
        quantity: item.quantity,
        subtotal:
          (item.dish.price + item.extras.reduce((sum, e) => sum + e.price, 0)) * item.quantity,
        image: item.dish.image,
        extras: item.extras.map((e) => ({ name: e.name, price: e.price })),
      })),
    }));
  }

  // Convert Supabase data to Order format
  return (data || []).map((o) => ({
    id: o.id,
    order_code: o.order_code,
    status: o.status as OrderStatus,
    total: parseFloat(o.total),
    submitted_at: new Date(o.submitted_at).getTime(),
    table_number: o.table_number,
    customer_name: o.customer_name,
    consumption_type: o.consumption_type as 'dine-in' | 'takeaway',
    service_type: o.service_type as 'table-service' | 'counter-pickup' | 'takeaway',
    items: (o.order_items || []).map(
      (item: {
        item_name: { en?: string };
        quantity: number;
        line_total: string | number;
        item_image_url?: string;
        extras?: { name: string; price: number }[];
      }) => ({
        name: item.item_name?.en || 'Item',
        quantity: item.quantity,
        subtotal: parseFloat(String(item.line_total)),
        image: item.item_image_url,
        extras: item.extras || [],
      })
    ),
  }));
}
