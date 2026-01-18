'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, ChevronDown, Wifi } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface Message {
  id: string;
  role: 'customer' | 'assistant';
  content: string;
  timestamp: Date;
}

// Create Supabase client for realtime (customer-facing)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

interface ChatWidgetProps {
  locationId: string;
  language?: string;
  primaryColor?: string;
  position?: 'bottom-right' | 'bottom-left';
}

export function ChatWidget({
  locationId,
  language = 'en',
  primaryColor = '#1f2937',
  position = 'bottom-right',
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const realtimeChannelRef = useRef<RealtimeChannel | null>(null);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

  // Check scroll position
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
  };

  // Subscribe to realtime updates for incoming messages
  useEffect(() => {
    if (!conversationId || !supabase) return;

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
        (payload) => {
          const newMsg = payload.new as {
            id: string;
            role: string;
            content: string;
            created_at: string;
          };

          // Only add non-customer messages (AI/agent responses)
          // Customer messages are already added optimistically
          if (newMsg.role !== 'customer') {
            setMessages((prev) => {
              // Avoid duplicates
              if (prev.some((m) => m.id === newMsg.id)) return prev;
              return [
                ...prev,
                {
                  id: newMsg.id,
                  role: newMsg.role as 'assistant',
                  content: newMsg.content,
                  timestamp: new Date(newMsg.created_at),
                },
              ];
            });
            setIsLoading(false);
            scrollToBottom();
          }
        }
      )
      .subscribe((status) => {
        setIsRealtimeConnected(status === 'SUBSCRIBED');
      });

    realtimeChannelRef.current = channel;

    return () => {
      if (realtimeChannelRef.current && supabase) {
        supabase.removeChannel(realtimeChannelRef.current);
        realtimeChannelRef.current = null;
      }
      setIsRealtimeConnected(false);
    };
  }, [conversationId, scrollToBottom]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessages: Record<string, string> = {
        en: 'Hello! How can I help you today? I can assist with reservations, menu information, or answer any questions.',
        vi: 'Xin chao! Toi co the giup gi cho ban? Toi co the ho tro dat ban, thong tin thuc don, hoac tra loi cau hoi.',
        it: 'Ciao! Come posso aiutarti oggi? Posso assisterti con prenotazioni, menu, o rispondere alle tue domande.',
      };

      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: welcomeMessages[language] || welcomeMessages.en,
          timestamp: new Date(),
        },
      ]);

      // Set initial suggested replies
      const initialReplies: Record<string, string[]> = {
        en: ['View menu', 'Make reservation', 'Opening hours', 'Location'],
        vi: ['Xem menu', 'Dat ban', 'Gio mo cua', 'Dia chi'],
        it: ['Vedi menu', 'Prenota', 'Orari', 'Posizione'],
      };
      setSuggestedReplies(initialReplies[language] || initialReplies.en);
    }
  }, [isOpen, messages.length, language]);

  // Send message
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'customer',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setSuggestedReplies([]);
    setIsLoading(true);

    try {
      // Get API base URL - in production this would be the backoffice URL
      const apiUrl = process.env.NEXT_PUBLIC_BACKOFFICE_URL || '';

      const res = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId,
          conversationId,
          message: text,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Update conversation ID
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: Date.now().toString() + '-assistant',
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Update suggested replies
      if (data.suggestedReplies) {
        setSuggestedReplies(data.suggestedReplies);
      }
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessages: Record<string, string> = {
        en: 'Sorry, I encountered an error. Please try again.',
        vi: 'Xin loi, toi gap loi. Vui long thu lai.',
        it: 'Scusa, ho riscontrato un errore. Riprova.',
      };

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-error',
          role: 'assistant',
          content: errorMessages[language] || errorMessages.en,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestedReply = (reply: string) => {
    sendMessage(reply);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const positionClasses = position === 'bottom-right' ? 'right-4' : 'left-4';

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-4 ${positionClasses} z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110`}
          style={{ backgroundColor: primaryColor }}
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-4 ${positionClasses} z-50 flex h-[500px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl`}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Chat Support</h3>
                <p className="flex items-center gap-1 text-xs text-white/80">
                  {isLoading ? (
                    'Typing...'
                  ) : (
                    <>
                      {isRealtimeConnected && <Wifi className="h-3 w-3" />}
                      {isRealtimeConnected ? 'Live' : 'Online'}
                    </>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4"
          >
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'customer'
                        ? 'rounded-br-md bg-gray-900 text-white'
                        : 'rounded-bl-md bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                    <p
                      className={`mt-1 text-right text-xs ${
                        msg.role === 'customer' ? 'text-white/60' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.1s]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full bg-white p-2 shadow-lg"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Suggested Replies */}
          {suggestedReplies.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-gray-100 px-4 py-2">
              {suggestedReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSuggestedReply(reply)}
                  disabled={isLoading}
                  className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  language === 'vi'
                    ? 'Nhap tin nhan...'
                    : language === 'it'
                      ? 'Scrivi un messaggio...'
                      : 'Type a message...'
                }
                disabled={isLoading}
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none disabled:bg-gray-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white disabled:opacity-50"
                style={{ backgroundColor: primaryColor }}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
