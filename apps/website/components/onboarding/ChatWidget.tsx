'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  sessionToken: string;
  email: string;
  firstName?: string;
  onComplete?: () => void;
  className?: string;
}

export function ChatWidget({
  sessionToken,
  email,
  firstName,
  onComplete,
  className = '',
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize with greeting
  useEffect(() => {
    const initChat = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/ai/onboarding-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionToken,
            action: 'start',
            email,
            firstName,
          }),
        });

        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setMessages(data.conversationHistory || []);
          setCompletionPercentage(data.completionPercentage || 0);
        }
      } catch {
        setError('Failed to initialize chat');
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    };

    initChat();
  }, [sessionToken, email, firstName]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    // Add user message immediately
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/onboarding-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken,
          message: userMessage,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        // Remove user message on error
        setMessages(messages);
      } else {
        setMessages(data.conversationHistory || newMessages);
        setCompletionPercentage(data.completionPercentage || 0);
        setIsComplete(data.isComplete || false);

        if (data.isComplete && onComplete) {
          // Delay to let user see completion message
          setTimeout(onComplete, 2000);
        }
      }
    } catch {
      setError('Failed to send message');
      setMessages(messages);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`flex h-full flex-col ${className}`}>
      {/* Progress indicator */}
      <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Setup Progress</span>
          <span className="font-medium text-gray-900 dark:text-white">{completionPercentage}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-gray-100 px-4 py-2 dark:bg-gray-800">
              <div className="flex items-center gap-1">
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Completion message */}
        {isComplete && (
          <div className="flex justify-center">
            <div className="rounded-lg bg-green-100 px-4 py-2 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
              Setup complete! Redirecting to dashboard...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <div className="mx-4 mb-2 rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isComplete ? 'Setup complete!' : 'Type your message...'}
            disabled={isLoading || isComplete}
            className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading || isComplete}
            className="rounded-full bg-gray-900 p-2 text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
