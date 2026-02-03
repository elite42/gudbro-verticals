'use client';

/**
 * Card Payment Component
 *
 * Handles card payment (POS at table or cashier).
 */

import { useState } from 'react';
import { CreditCard, DeviceMobile, Storefront, CheckCircle, Spinner } from '@phosphor-icons/react';
import { formatPrice as _fp } from '@gudbro/utils';

interface CardPaymentProps {
  total: number;
  onConfirm: (details?: Record<string, unknown>) => void;
}

type CardMethod = 'pos_table' | 'pos_cashier';

export function CardPayment({ total, onConfirm }: CardPaymentProps) {
  const [method, setMethod] = useState<CardMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (amount: number) => _fp(amount, 'EUR');

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
      <div className="rounded-2xl bg-purple-50 py-4 text-center dark:bg-purple-900/20">
        <CreditCard
          size={40}
          weight="duotone"
          className="mx-auto mb-2 text-purple-600 dark:text-purple-400"
        />
        <p className="text-sm text-purple-700 dark:text-purple-300">Totale</p>
        <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">
          {formatCurrency(total)}
        </p>
      </div>

      {/* Method selection */}
      <div className="space-y-3">
        <p className="text-theme-text-secondary text-sm font-medium">Dove avviene il pagamento?</p>

        <button
          onClick={() => setMethod('pos_table')}
          className={`w-full rounded-2xl border-2 p-4 transition-all ${
            method === 'pos_table'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
              : 'border-theme-border-light hover:border-theme-border-medium'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                method === 'pos_table' ? 'bg-purple-500' : 'bg-theme-bg-secondary'
              }`}
            >
              <DeviceMobile
                size={24}
                weight="duotone"
                className={method === 'pos_table' ? 'text-white' : 'text-theme-text-secondary'}
              />
            </div>
            <div className="text-left">
              <p
                className={`font-semibold ${method === 'pos_table' ? 'text-purple-700 dark:text-purple-300' : 'text-theme-text-primary'}`}
              >
                POS al tavolo
              </p>
              <p className="text-theme-text-secondary text-sm">Porta il POS al cliente</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setMethod('pos_cashier')}
          className={`w-full rounded-2xl border-2 p-4 transition-all ${
            method === 'pos_cashier'
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
              : 'border-theme-border-light hover:border-theme-border-medium'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                method === 'pos_cashier' ? 'bg-purple-500' : 'bg-theme-bg-secondary'
              }`}
            >
              <Storefront
                size={24}
                weight="duotone"
                className={method === 'pos_cashier' ? 'text-white' : 'text-theme-text-secondary'}
              />
            </div>
            <div className="text-left">
              <p
                className={`font-semibold ${method === 'pos_cashier' ? 'text-purple-700 dark:text-purple-300' : 'text-theme-text-primary'}`}
              >
                Alla cassa
              </p>
              <p className="text-theme-text-secondary text-sm">Il cliente va in cassa a pagare</p>
            </div>
          </div>
        </button>
      </div>

      {/* Confirm button */}
      <button
        onClick={handleConfirm}
        disabled={!method || isProcessing}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500 py-4 text-lg font-bold text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
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
