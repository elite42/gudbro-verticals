'use client';

import React, { useId } from 'react';
import { Extra } from '@/types/dish';
import { DishPreference, formatExtrasDescription } from '@/lib/dish-preferences';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

interface ConflictModalProps {
  isOpen: boolean;
  dishName: string;
  existingPreference: DishPreference;
  newExtras: Extra[];
  onReplace: () => void;
  onKeepExisting: () => void;
  onClose: () => void;
}

/**
 * Modal shown when user tries to save a preference that already exists
 *
 * Accessibility features:
 * - Focus trap keeps keyboard users within modal
 * - Escape key closes modal
 * - Proper ARIA attributes for screen readers
 * - Descriptive labels for all interactive elements
 */
export function ConflictModal({
  isOpen,
  dishName,
  existingPreference,
  newExtras,
  onReplace,
  onKeepExisting,
  onClose
}: ConflictModalProps) {
  const modalRef = useFocusTrap(isOpen);
  const titleId = useId();
  const descId = useId();

  // Handle Escape key to close modal
  useKeyboardNavigation({
    isOpen,
    onClose,
    onEscape: onClose
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in"
      >
        <div className="text-center">
          {/* Warning Icon */}
          <div className="mx-auto w-16 h-16 bg-theme-brand-secondary rounded-full flex items-center justify-center mb-4" aria-hidden="true">
            <svg className="w-8 h-8 text-theme-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Title */}
          <h3 id={titleId} className="text-2xl font-bold text-gray-900 mb-2">
            Preferenza Esistente
          </h3>

          {/* Message */}
          <p id={descId} className="text-gray-600 mb-4">
            Hai già salvato una preferenza per <span className="font-bold">{dishName}</span>
          </p>

          {/* Existing Preference Box */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🌟</span>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Preferenza salvata</div>
                <div className="font-semibold text-gray-900 text-sm">
                  {formatExtrasDescription(existingPreference.extras)}
                </div>
              </div>
            </div>
          </div>

          {/* New Preference Box */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">✨</span>
              </div>
              <div className="flex-1">
                <div className="text-xs text-blue-600 mb-1">Nuova preferenza</div>
                <div className="font-semibold text-gray-900 text-sm">
                  {formatExtrasDescription(newExtras)}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <p className="text-gray-600 mb-6 text-sm">
            Vuoi sostituire la preferenza esistente con questa nuova?
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={onReplace}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all transform active:scale-95"
              aria-label={`Sostituisci preferenza esistente con nuova per ${dishName}`}
            >
              Sostituisci con Nuova
            </button>
            <button
              onClick={onKeepExisting}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
              aria-label={`Mantieni preferenza esistente per ${dishName}`}
            >
              Mantieni Preferenza Esistente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
