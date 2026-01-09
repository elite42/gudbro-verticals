'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AIContextType {
  isOpen: boolean;
  openAI: () => void;
  closeAI: () => void;
  toggleAI: () => void;
  // For proactive notifications from AI
  hasNotification: boolean;
  setNotification: (has: boolean) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);

  const openAI = useCallback(() => {
    setIsOpen(true);
    setHasNotification(false); // Clear notification when opened
  }, []);

  const closeAI = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleAI = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setHasNotification(false);
      return !prev;
    });
  }, []);

  const setNotification = useCallback((has: boolean) => {
    setHasNotification(has);
  }, []);

  return (
    <AIContext.Provider
      value={{
        isOpen,
        openAI,
        closeAI,
        toggleAI,
        hasNotification,
        setNotification,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}
