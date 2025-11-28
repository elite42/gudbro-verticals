'use client';

import React, { useState, useEffect } from 'react';

interface CustomerNameModalProps {
  isOpen: boolean;
  tableNumber: string;
  onConfirm: (name: string) => void;
  onSkip?: () => void;
}

/**
 * Customer Name Modal
 *
 * Asks for customer name when:
 * - Customer scanned QR code (at table)
 * - Ordering for dine-in service
 * - Multiple people may be at same table
 *
 * Use cases:
 * 1. Table service: "Marco, il tuo Espresso è pronto!"
 * 2. Counter pickup (Starbucks style): "Ordine per Marco!"
 */
export function CustomerNameModal({
  isOpen,
  tableNumber,
  onConfirm,
  onSkip
}: CustomerNameModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setError('');
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Inserisci il tuo nome');
      return;
    }

    if (trimmedName.length < 2) {
      setError('Il nome deve avere almeno 2 caratteri');
      return;
    }

    if (trimmedName.length > 50) {
      setError('Il nome è troppo lungo');
      return;
    }

    onConfirm(trimmedName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[80] transition-opacity" />

      {/* Modal */}
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <div className="bg-theme-bg-elevated rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-theme-brand-secondary rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-theme-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-theme-text-primary text-center mb-2">
            Come ti chiami?
          </h2>

          {/* Subtitle */}
          <p className="text-theme-text-secondary text-center mb-6">
            <span className="font-semibold text-theme-brand-primary">Tavolo {tableNumber}</span>
            <br />
            Il tuo nome ci aiuta a servirti meglio
          </p>

          {/* Input */}
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Es: Marco, Sarah, John..."
              autoFocus
              className={`
                w-full px-4 py-3 text-lg border-2 rounded-xl
                focus:outline-none focus:ring-2 transition-all
                ${error
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-theme-bg-tertiary focus:border-theme-brand-primary focus:ring-theme-brand-secondary'
                }
              `}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          {/* Info Box */}
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Perché chiediamo il nome?</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• Chiamarti quando l'ordine è pronto</li>
                  <li>• Distinguere ordini allo stesso tavolo</li>
                  <li>• Offrirti un servizio personalizzato</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {onSkip && (
              <button
                onClick={onSkip}
                className="flex-1 px-6 py-3 border-2 border-theme-bg-tertiary text-theme-text-primary font-semibold rounded-xl hover:bg-theme-bg-tertiary transition-colors"
              >
                Salta
              </button>
            )}
            <button
              onClick={handleConfirm}
              disabled={!name.trim()}
              className={`
                flex-1 px-6 py-3 font-semibold rounded-xl transition-all
                ${name.trim()
                  ? 'bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover shadow-lg'
                  : 'bg-theme-bg-tertiary text-theme-text-tertiary cursor-not-allowed'
                }
              `}
            >
              Conferma
            </button>
          </div>

          {/* Privacy Note */}
          <p className="mt-4 text-xs text-theme-text-tertiary text-center">
            Il tuo nome sarà utilizzato solo per questo ordine
          </p>
        </div>
      </div>
    </>
  );
}
