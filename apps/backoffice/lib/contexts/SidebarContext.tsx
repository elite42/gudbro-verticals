'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface SidebarContextType {
  // Pinned = always open, Unpinned = collapsed with hover expand
  isPinned: boolean;
  // Current visual state (expanded or collapsed)
  isExpanded: boolean;
  // Actions
  togglePin: () => void;
  expand: () => void;
  collapse: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SIDEBAR_PIN_KEY = 'gudbro-sidebar-pinned';

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Check localStorage for saved preference (default to pinned/open)
  const [isPinned, setIsPinned] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SIDEBAR_PIN_KEY);
      return saved !== 'false'; // Default to true (pinned)
    }
    return true;
  });

  // Expanded state - true when pinned OR when hovering
  const [isHovering, setIsHovering] = useState(false);

  // Sidebar is expanded if pinned OR hovering
  const isExpanded = isPinned || isHovering;

  const togglePin = useCallback(() => {
    setIsPinned((prev) => {
      const newValue = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem(SIDEBAR_PIN_KEY, String(newValue));
      }
      return newValue;
    });
  }, []);

  const expand = useCallback(() => {
    if (!isPinned) {
      setIsHovering(true);
    }
  }, [isPinned]);

  const collapse = useCallback(() => {
    if (!isPinned) {
      setIsHovering(false);
    }
  }, [isPinned]);

  return (
    <SidebarContext.Provider
      value={{
        isPinned,
        isExpanded,
        togglePin,
        expand,
        collapse,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
