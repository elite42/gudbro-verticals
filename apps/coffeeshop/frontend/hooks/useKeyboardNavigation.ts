'use client';

import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onEscape?: () => void;
  onEnter?: () => void;
}

/**
 * Hook to handle keyboard navigation for dropdowns and modals
 * Supports: Escape to close, Enter to confirm, Arrow keys for navigation
 */
export function useKeyboardNavigation({
  isOpen,
  onClose,
  onEscape,
  onEnter
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          if (onEscape) {
            onEscape();
          } else {
            onClose();
          }
          break;

        case 'Enter':
          if (onEnter && (e.target as HTMLElement).tagName !== 'BUTTON') {
            e.preventDefault();
            onEnter();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onEscape, onEnter]);
}
