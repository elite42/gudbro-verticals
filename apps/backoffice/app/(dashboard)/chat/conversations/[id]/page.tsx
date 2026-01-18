'use client';

import { useState, useEffect, useRef, use, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Send,
  Phone,
  Mail,
  Calendar,
  Users,
  Clock,
  MessageSquare,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useChatRealtime } from '@/lib/realtime/chat-channel';

interface Message {
  id: string;
  role: 'customer' | 'assistant' | 'system' | 'agent';
  content: string;
  created_at: string;
  agent_id: string | null;
  function_name: string | null;
}

interface Conversation {
  id: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  channel: string;
  status: string;
  topic: string | null;
  language: string;
  total_messages: number;
  created_at: string;
  last_message_at: string;
  location: { id: string; name: string };
  reservation: {
    id: string;
    reservation_date: string;
    reservation_time: string;
    party_size: number;
  } | null;
}

const ROLE_STYLES = {
  customer: 'bg-gray-100 text-gray-900',
  assistant: 'bg-blue-100 text-blue-900',
  agent: 'bg-green-100 text-green-900',
  system: 'bg-yellow-50 text-yellow-800 text-xs italic',
};

const CHANNEL_LABELS: Record<string, string> = {
  widget: 'Chat Widget',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram',
  line: 'LINE',
  zalo: 'Zalo',
  web: 'Web',
};

export default function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use Realtime for live message updates
  const { messages, isConnected, addOptimisticMessage } = useChatRealtime(id, initialMessages, {
    onNewMessage: useCallback(() => {
      // Scroll to bottom on new message
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []),
    onConversationUpdate: useCallback((update: { status: string; total_messages: number }) => {
      // Update conversation status if it changes
      setConversation((prev) =>
        prev ? { ...prev, status: update.status, total_messages: update.total_messages } : prev
      );
    }, []),
  });

  const fetchConversation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/chat/conversations/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch conversation');
      }

      setConversation(data.conversation);
      setInitialMessages(data.messages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial data once (no polling - Realtime handles updates)
  useEffect(() => {
    fetchConversation();
  }, [id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    const messageText = newMessage.trim();
    setNewMessage('');
    setIsSending(true);

    // Add optimistic message for instant feedback
    addOptimisticMessage({
      role: 'agent',
      content: messageText,
      agent_id: null,
      function_name: null,
    });

    try {
      const res = await fetch(`/api/chat/conversations/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }
      // Message will be added via Realtime subscription
    } catch (err) {
      console.error('Failed to send:', err);
      // Could show error toast here
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading && !conversation) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
          <Link href="/chat/escalations" className="mt-2 inline-block text-sm underline">
            Back to Escalations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/chat/escalations" className="rounded-lg p-2 hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {conversation?.customer_name || 'Customer Chat'}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="rounded-full bg-gray-100 px-2 py-0.5">
                  {CHANNEL_LABELS[conversation?.channel || ''] || conversation?.channel}
                </span>
                {conversation?.topic && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
                    {conversation.topic}
                  </span>
                )}
                <span
                  className={`rounded-full px-2 py-0.5 ${
                    conversation?.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {conversation?.status}
                </span>
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                    isConnected ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                  title={isConnected ? 'Real-time connected' : 'Connecting...'}
                >
                  {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                  {isConnected ? 'Live' : 'Connecting'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Messages */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mx-auto max-w-2xl space-y-4">
              {messages.map((msg, idx) => {
                const showDate =
                  idx === 0 ||
                  formatDate(messages[idx - 1].created_at) !== formatDate(msg.created_at);

                return (
                  <div key={msg.id}>
                    {showDate && (
                      <div className="my-4 text-center text-xs text-gray-500">
                        {formatDate(msg.created_at)}
                      </div>
                    )}
                    <div
                      className={`flex ${
                        msg.role === 'customer' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${ROLE_STYLES[msg.role]}`}>
                        {msg.role === 'system' && msg.function_name && (
                          <span className="font-medium">[{msg.function_name}] </span>
                        )}
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        <p className="mt-1 text-right text-xs opacity-60">
                          {formatTime(msg.created_at)}
                          {msg.role === 'agent' && ' (You)'}
                          {msg.role === 'assistant' && ' (AI)'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          {conversation?.status === 'active' || conversation?.status === 'escalated' ? (
            <form onSubmit={handleSend} className="border-t border-gray-200 bg-white p-4">
              <div className="mx-auto flex max-w-2xl gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your response..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSending}
                  className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  Send
                </button>
              </div>
            </form>
          ) : (
            <div className="border-t border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-500">
              This conversation is closed
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden w-80 border-l border-gray-200 bg-gray-50 p-4 lg:block">
          <h3 className="mb-4 font-medium text-gray-900">Customer Details</h3>

          <div className="space-y-3">
            {conversation?.customer_phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{conversation.customer_phone}</span>
              </div>
            )}
            {conversation?.customer_email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{conversation.customer_email}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>Started {formatDate(conversation?.created_at || '')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <span>{conversation?.total_messages} messages</span>
            </div>
          </div>

          {conversation?.reservation && (
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-medium text-gray-700">Linked Reservation</h4>
              <div className="rounded-lg bg-white p-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>
                    {conversation.reservation.reservation_date} at{' '}
                    {conversation.reservation.reservation_time}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{conversation.reservation.party_size} guests</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
