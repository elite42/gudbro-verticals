/**
 * Chat Realtime Channel Hook
 *
 * Provides real-time updates for chat conversations using Supabase Realtime.
 * Replaces polling-based updates with instant message delivery.
 */

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase-browser';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

interface Message {
  id: string;
  role: 'customer' | 'assistant' | 'system' | 'agent';
  content: string;
  created_at: string;
  agent_id: string | null;
  function_name: string | null;
}

interface ConversationUpdate {
  id: string;
  status: string;
  total_messages: number;
  last_message_at: string;
}

interface UseChatRealtimeOptions {
  onNewMessage?: (message: Message) => void;
  onConversationUpdate?: (update: ConversationUpdate) => void;
  onError?: (error: Error) => void;
}

interface UseChatRealtimeReturn {
  messages: Message[];
  isConnected: boolean;
  connectionError: Error | null;
  addOptimisticMessage: (message: Omit<Message, 'id' | 'created_at'>) => void;
}

/**
 * Hook for subscribing to real-time chat updates
 *
 * @param conversationId - The conversation ID to subscribe to
 * @param initialMessages - Initial messages to populate the state
 * @param options - Callback options
 */
export function useChatRealtime(
  conversationId: string,
  initialMessages: Message[] = [],
  options: UseChatRealtimeOptions = {}
): UseChatRealtimeReturn {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<Error | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const { onNewMessage, onConversationUpdate, onError } = options;

  // Update messages when initialMessages changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (!conversationId) return;

    const supabase = createClient();

    // Create channel for this conversation
    const channel = supabase
      .channel(`chat:${conversationId}`)
      // Listen for new messages
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'customer_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: RealtimePostgresChangesPayload<Message>) => {
          const newMessage = payload.new as Message;

          // Avoid duplicates
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMessage.id)) {
              return prev;
            }
            return [...prev, newMessage];
          });

          onNewMessage?.(newMessage);
        }
      )
      // Listen for conversation updates (status changes, etc.)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'customer_conversations',
          filter: `id=eq.${conversationId}`,
        },
        (payload: RealtimePostgresChangesPayload<ConversationUpdate>) => {
          const update = payload.new as ConversationUpdate;
          onConversationUpdate?.(update);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          setConnectionError(null);
        } else if (status === 'CHANNEL_ERROR') {
          const error = new Error('Failed to connect to chat channel');
          setConnectionError(error);
          setIsConnected(false);
          onError?.(error);
        } else if (status === 'TIMED_OUT') {
          const error = new Error('Chat channel connection timed out');
          setConnectionError(error);
          setIsConnected(false);
          onError?.(error);
        }
      });

    channelRef.current = channel;

    // Cleanup on unmount
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      setIsConnected(false);
    };
  }, [conversationId, onNewMessage, onConversationUpdate, onError]);

  // Add optimistic message (for instant UI feedback before server confirms)
  const addOptimisticMessage = useCallback((message: Omit<Message, 'id' | 'created_at'>) => {
    const optimisticMessage: Message = {
      ...message,
      id: `optimistic-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMessage]);
  }, []);

  return {
    messages,
    isConnected,
    connectionError,
    addOptimisticMessage,
  };
}

/**
 * Hook for subscribing to conversation list updates
 * Useful for the escalations/conversations list page
 */
export function useConversationsRealtime(
  locationId: string,
  options: {
    onNewConversation?: (conversation: ConversationUpdate) => void;
    onConversationUpdate?: (conversation: ConversationUpdate) => void;
  } = {}
) {
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const { onNewConversation, onConversationUpdate } = options;

  useEffect(() => {
    if (!locationId) return;

    const supabase = createClient();

    const channel = supabase
      .channel(`conversations:${locationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'customer_conversations',
          filter: `location_id=eq.${locationId}`,
        },
        (payload: RealtimePostgresChangesPayload<ConversationUpdate>) => {
          onNewConversation?.(payload.new as ConversationUpdate);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'customer_conversations',
          filter: `location_id=eq.${locationId}`,
        },
        (payload: RealtimePostgresChangesPayload<ConversationUpdate>) => {
          onConversationUpdate?.(payload.new as ConversationUpdate);
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [locationId, onNewConversation, onConversationUpdate]);

  return { isConnected };
}

/**
 * Hook for customer-side chat widget
 * Subscribes to incoming agent/AI messages
 */
export function useChatWidgetRealtime(
  conversationId: string | null,
  options: {
    onNewMessage?: (message: Message) => void;
  } = {}
) {
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!conversationId) return;

    const supabase = createClient();

    const channel = supabase
      .channel(`widget:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'customer_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: RealtimePostgresChangesPayload<Message>) => {
          const message = payload.new as Message;
          // Only notify for non-customer messages (agent/AI responses)
          if (message.role !== 'customer') {
            options.onNewMessage?.(message);
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [conversationId, options]);

  return { isConnected };
}
