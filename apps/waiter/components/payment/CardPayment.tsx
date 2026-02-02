'use client';

/**
 * Card Payment Component
 *
 * Handles card payment (POS at table or cashier).
 */

import { useState } from 'react';
import { CreditCard, DeviceMobile, Storefront, CheckCircle, Spinner } from '@phosphor-icons/react';

interface CardPaymentProps {
  total: number;
  onConfirm: (details?: Record<string, unknown>) => void;
}

type CardMethod = 'pos_table' | 'pos_cashier';

export function CardPayment({ total, onConfirm }: CardPaymentProps) {
  const [method, setMethod] = useState<CardMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onConfirm({
      method: 'card',
      cardMethod: method,
    });
  };

  return (
    <div className="space-y-6">
      {/* Total */}
      <div className="text-center py-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
        <CreditCard size={40} weight="duotone" className="mx-auto text-purple-600 dark:text-purple-400 mb-2" />
        <p className="text-sm text-purple-700 dark:text-purple-300">Totale</p>
        <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">
          {formatCurrency(total)}
        </p>
      </div>

      {/* Method selection */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-theme-text-secondary">
          Dove avviene il pagamento?
        </p>

        <button
          onClick={() => setMethod('pos_table')}
          className={`w-full p-4 rounded-2xl border-2 transition-all ${
            method === 'pos_table'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
              : 'border-theme-border-light hover:border-theme-border-medium'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              method === 'pos_table' ? 'bg-purple-500' : 'bg-theme-bg-secondary'
            }`}>
              <DeviceMobile size={24} weight="duotone" className={method === 'pos_table' ? 'text-white' : 'text-theme-text-secondary'} />
            </div>
            <div className="text-left">
              <p className={`font-semibold ${method === 'pos_table' ? 'text-purple-700 dark:text-purple-300' : 'text-theme-text-primary'}`}>
                POS al tavolo
              </p>
              <p className="text-sm text-theme-text-secondary">
                Porta il POS al cliente
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setMethod('pos_cashier')}
          className={`w-full p-4 rounded-2xl border-2 transition-all ${
            method === 'pos_cashier'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
              : 'border-theme-border-light hover:border-theme-border-medium'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              method === 'pos_cashier' ? 'bg-purple-500' : 'bg-theme-bg-secondary'
            }`}>
              <Storefront size={24} weight="duotone" className={method === 'pos_cashier' ? 'text-white' : 'text-theme-text-secondary'} />
            </div>
            <div className="text-left">
              <p className={`font-semibold ${method === 'pos_cashier' ? 'text-purple-700 dark:text-purple-300' : 'text-theme-text-primary'}`}>
                Alla cassa
              </p>
              <p className="text-sm text-theme-text-secondary">
                Il cliente va in cassa a pagare
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Confirm button */}
      <button
        onClick={handleConfirm}
        disabled={!method || isProcessing}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? (
          <>
            <Spinner size={24} weight="bold" className="animate-spin" />
            Elaborazione...
          </>
        ) : (
          <>
            <CheckCircle size={24} weight="bold" />
            Conferma pagamento
          </>
        )}
      </button>
    </div>
  );
}
