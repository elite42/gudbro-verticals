'use client';

/**
 * Realtime Provider
 *
 * Provides real-time updates for requests and orders via Supabase channels.
 * Automatically reconnects on connection loss.
 */

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useRequestsStore, type CustomerRequest } from '@/lib/stores/requests-store';
import { useOrdersStore, type Order } from '@/lib/stores/orders-store';
import { useAuth } from './AuthProvider';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface RealtimeContextValue {
  isConnected: boolean;
  lastUpdate: Date | null;
  reconnect: () => void;
}

const RealtimeContext = createContext<RealtimeContextValue | undefined>(undefined);

interface RealtimeProviderProps {
  children: ReactNode;
  locationId?: string;
}

export function RealtimeProvider({ children, locationId }: RealtimeProviderProps) {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const { addRequest, updateRequest, removeRequest } = useRequestsStore();
  const { addOrder, updateOrder, removeOrder } = useOrdersStore();

  const setupChannel = useCallback(() => {
    if (!isSupabaseConfigured || !supabase || !locationId) {
      return null;
    }

    // Create channel for this location
    const newChannel = supabase
      .channel(`waiter-${locationId}`)
      .on('presence', { event: 'sync' }, () => {
        setIsConnected(true);
      })
      .on('presence', { event: 'join' }, () => {
        setIsConnected(true);
      })
      .on('presence', { event: 'leave' }, () => {
        // Check if we're still connected
      })
      // Listen for request changes
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'hot_action_requests',
          filter: `location_id=eq.${locationId}`,
        },
        (payload) => {
          setLastUpdate(new Date());

          if (payload.eventType === 'INSERT') {
            const request = mapPayloadToRequest(payload.new);
            addRequest(request);
          } else if (payload.eventType === 'UPDATE') {
            const request = mapPayloadToRequest(payload.new);
            updateRequest(request.id, request);
          } else if (payload.eventType === 'DELETE') {
            if (payload.old?.id) {
              removeRequest(String(payload.old.id));
            }
          }
        }
      )
      // Listen for order changes
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `location_id=eq.${locationId}`,
        },
        (payload) => {
          setLastUpdate(new Date());

          if (payload.eventType === 'INSERT') {
            const order = mapPayloadToOrder(payload.new);
            addOrder(order);
          } else if (payload.eventType === 'UPDATE') {
            const order = mapPayloadToOrder(payload.new);
            updateOrder(order.id, order);
          } else if (payload.eventType === 'DELETE') {
            if (payload.old?.id) {
              removeOrder(String(payload.old.id));
            }
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    return newChannel;
  }, [locationId, addRequest, updateRequest, removeRequest, addOrder, updateOrder, removeOrder]);

  const reconnect = useCallback(() => {
    if (channel) {
      supabase?.removeChannel(channel);
    }
    const newChannel = setupChannel();
    if (newChannel) {
      setChannel(newChannel);
    }
  }, [channel, setupChannel]);

  useEffect(() => {
    if (!user || !locationId) return;

    const newChannel = setupChannel();
    if (newChannel) {
      setChannel(newChannel);
    }

    return () => {
      if (newChannel) {
        supabase?.removeChannel(newChannel);
      }
    };
  }, [user, locationId, setupChannel]);

  return (
    <RealtimeContext.Provider value={{ isConnected, lastUpdate, reconnect }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime(): RealtimeContextValue {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}

// Map database payload to CustomerRequest
function mapPayloadToRequest(data: Record<string, unknown>): CustomerRequest {
  return {
    id: String(data.id || ''),
    locationId: String(data.location_id || ''),
    tableId: String(data.table_id || ''),
    tableNumber: String(data.table_number || ''),
    type: (data.action_type as CustomerRequest['type']) || 'custom',
    status: (data.status as CustomerRequest['status']) || 'pending',
    priority: (data.priority as CustomerRequest['priority']) || 'normal',
    message: data.message as string | undefined,
    createdAt: String(data.created_at || new Date().toISOString()),
    acknowledgedAt: data.acknowledged_at as string | undefined,
    acknowledgedBy: data.acknowledged_by as string | undefined,
    completedAt: data.completed_at as string | undefined,
    completedBy: data.completed_by as string | undefined,
  };
}

// Map database payload to Order
function mapPayloadToOrder(data: Record<string, unknown>): Order {
  return {
    id: String(data.id || ''),
    orderNumber: String(data.order_number || data.id || ''),
    locationId: String(data.location_id || ''),
    tableId: String(data.table_id || ''),
    tableNumber: String(data.table_number || ''),
    status: (data.status as Order['status']) || 'pending',
    items: (data.items as Order['items']) || [],
    subtotal: Number(data.subtotal || 0),
    tax: Number(data.tax || 0),
    total: Number(data.total || 0),
    createdAt: String(data.created_at || new Date().toISOString()),
    updatedAt: String(data.updated_at || new Date().toISOString()),
    notes: data.notes as string | undefined,
    customerName: data.customer_name as string | undefined,
  };
}
