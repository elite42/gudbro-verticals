'use client';

import { useState, useRef, useEffect } from 'react';
import {
  PaperPlaneTilt,
  Robot,
  User,
  SpinnerGap,
  X,
  ArrowsInSimple,
  Sparkle,
} from '@phosphor-icons/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatPanelProps {
  merchantId: string;
  accountId: string;
  merchantName?: string;
  isOpen: boolean;
  onClose: () => void;
  position?: 'sidebar' | 'floating';
}

export function AIChatPanel({
  merchantId,
  accountId,
  merchantName = 'Your Business',
  isOpen,
  onClose,
  position = 'floating',
}: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [_error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Add welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `Ciao! Sono il tuo AI Co-Manager per ${merchantName}. Come posso aiutarti oggi?\n\nPosso:\n- Tradurre contenuti in altre lingue\n- Generare descrizioni per il menu\n- Rispondere a domande sul tuo locale\n- E molto altro!`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, merchantName, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          accountId,
          sessionId,
          message: userMessage.content,
          newSession: !sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Save session ID for continuity
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `Mi dispiace, si è verificato un errore: ${errorMessage}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setSessionId(null);
    setError(null);
  };

  // Sidebar mode - slide in from right (no backdrop, content resizes)
  if (position === 'sidebar') {
    return (
      <>
        {/* Sidebar Panel - fixed position, main content resizes to accommodate */}
        <div
          className={`fixed right-0 top-0 z-40 h-full w-full transform transition-transform duration-300 ease-out sm:w-[420px] ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col bg-white shadow-2xl dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Sparkle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Co-Manager</h3>
                  <p className="text-xs text-white/70">{merchantName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 transition-colors hover:bg-white/10"
                title="Chiudi"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Robot className="h-4 w-4 text-blue-600" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-blue-600 text-white'
                        : 'rounded-bl-md bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.role === 'user' ? 'text-white/60' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <Robot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <SpinnerGap className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Sto pensando...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {[
                    'Traduci il menu in inglese',
                    'Genera descrizione per un piatto',
                    'Come sono andati gli ordini?',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="rounded-xl bg-blue-600 p-2.5 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300"
                >
                  {isLoading ? (
                    <SpinnerGap className="h-5 w-5 animate-spin" />
                  ) : (
                    <PaperPlaneTilt className="h-5 w-5" />
                  )}
                </button>
              </div>

              {messages.length > 3 && (
                <button
                  onClick={startNewConversation}
                  className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700"
                >
                  Nuova conversazione
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Floating mode (legacy)
  if (!isOpen) return null;

  // Minimized state (only for floating)
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700"
        >
          <Sparkle className="h-5 w-5" />
          <span className="font-medium">AI Co-Manager</span>
          {messages.length > 1 && (
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-sm">
              {messages.length - 1}
            </span>
          )}
        </button>
      </div>
    );
  }

  // Full floating panel
  return (
    <div className="fixed bottom-4 right-4 z-50 flex h-[600px] max-h-[80vh] w-96 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Sparkle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Co-Manager</h3>
            <p className="text-xs text-white/70">{merchantName}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="rounded-lg p-2 transition-colors hover:bg-white/10"
            title="Minimizza"
          >
            <ArrowsInSimple className="h-4 w-4 text-white" />
          </button>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-white/10"
            title="Chiudi"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
          >
            {message.role === 'assistant' && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Robot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                message.role === 'user'
                  ? 'rounded-br-md bg-blue-600 text-white'
                  : 'rounded-bl-md bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              <p
                className={`mt-1 text-xs ${
                  message.role === 'user' ? 'text-white/60' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Robot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
              <div className="flex items-center gap-2 text-gray-500">
                <SpinnerGap className="h-4 w-4 animate-spin" />
                <span className="text-sm">Sto pensando...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {[
              'Traduci il menu in inglese',
              'Genera descrizione per un nuovo piatto',
              'Come sono andati gli ordini questa settimana?',
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
            className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="rounded-xl bg-blue-600 p-2.5 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700"
          >
            {isLoading ? (
              <SpinnerGap className="h-5 w-5 animate-spin" />
            ) : (
              <PaperPlaneTilt className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* New conversation button */}
        {messages.length > 3 && (
          <button
            onClick={startNewConversation}
            className="mt-2 w-full text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Nuova conversazione
          </button>
        )}
      </div>
    </div>
  );
}
