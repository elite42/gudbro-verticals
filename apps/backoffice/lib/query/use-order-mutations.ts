'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  status: OrderStatus;
  order_code: string;
  [key: string]: unknown;
}

interface UpdateOrderStatusParams {
  orderId: string;
  newStatus: OrderStatus;
  sendPushNotification?: boolean;
  orderCode?: string;
  sessionId?: string;
}

/**
 * Hook for optimistic order status updates
 *
 * Updates the UI immediately while the server request is in flight.
 * Automatically rolls back on error.
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      newStatus,
      sendPushNotification,
      orderCode,
      sessionId,
    }: UpdateOrderStatusParams) => {
      // Update order status
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Send push notification if needed
      if (sendPushNotification && newStatus === 'ready' && sessionId && orderCode) {
        try {
          await fetch('/api/send-push', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId,
              sessionId,
              orderCode,
            }),
          });
        } catch (pushErr) {
          // Don't fail the mutation if push fails
          console.warn('[Push] Notification error (non-blocking):', pushErr);
        }
      }

      return { orderId, newStatus };
    },

    // Optimistically update before server responds
    onMutate: async ({ orderId, newStatus }) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['orders'] });
      await queryClient.cancelQueries({ queryKey: ['kitchen-orders'] });

      // Snapshot the previous value
      const previousOrders = queryClient.getQueryData<Order[]>(['orders']);
      const previousKitchenOrders = queryClient.getQueryData<Order[]>(['kitchen-orders']);

      // Optimistically update
      if (previousOrders) {
        queryClient.setQueryData<Order[]>(['orders'], (old) =>
          newStatus === 'delivered'
            ? (old || []).filter((o) => o.id !== orderId)
            : (old || []).map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }

      if (previousKitchenOrders) {
        queryClient.setQueryData<Order[]>(['kitchen-orders'], (old) =>
          newStatus === 'delivered'
            ? (old || []).filter((o) => o.id !== orderId)
            : (old || []).map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }

      // Return context for rollback
      return { previousOrders, previousKitchenOrders };
    },

    // On error, roll back to previous value
    onError: (err, variables, context) => {
      console.error('[Order Update] Error:', err);

      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders);
      }
      if (context?.previousKitchenOrders) {
        queryClient.setQueryData(['kitchen-orders'], context.previousKitchenOrders);
      }
    },

    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['kitchen-orders'] });
    },
  });
}

/**
 * Hook for batch order status updates (e.g., marking multiple orders as delivered)
 */
export function useBatchUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: UpdateOrderStatusParams[]) => {
      const results = await Promise.all(
        updates.map(async ({ orderId, newStatus }) => {
          const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);
          if (error) throw error;
          return { orderId, newStatus };
        })
      );
      return results;
    },

    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] });

      const previousOrders = queryClient.getQueryData<Order[]>(['orders']);

      queryClient.setQueryData<Order[]>(['orders'], (old) => {
        if (!old) return old;
        return old
          .map((order) => {
            const update = updates.find((u) => u.orderId === order.id);
            if (update) {
              return { ...order, status: update.newStatus };
            }
            return order;
          })
          .filter(
            (order) => !updates.some((u) => u.orderId === order.id && u.newStatus === 'delivered')
          );
      });

      return { previousOrders };
    },

    onError: (err, variables, context) => {
      console.error('[Batch Order Update] Error:', err);
      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
