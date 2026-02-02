'use client';

/**
 * Cash Payment Component
 *
 * Handles cash payment with change calculation.
 */

import { useState } from 'react';
import { Money, Calculator, CheckCircle } from '@phosphor-icons/react';

interface CashPaymentProps {
  total: number;
  onConfirm: (details?: Record<string, unknown>) => void;
}

const quickAmounts = [5, 10, 20, 50, 100];

export function CashPayment({ total, onConfirm }: CashPaymentProps) {
  const [receivedAmount, setReceivedAmount] = useState<number | ''>('');
  const [isConfirming, setIsConfirming] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const change = typeof receivedAmount === 'number' ? receivedAmount - total : 0;
  const isValidAmount = typeof receivedAmount === 'number' && receivedAmount >= total;

  const handleQuickAmount = (amount: number) => {
    setReceivedAmount(amount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setReceivedAmount('');
    } else {
      const num = parseFloat(value);
      if (!isNaN(num) && num >= 0) {
        setReceivedAmount(num);
      }
    }
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 500));
    onConfirm({
      method: 'cash',
      receivedAmount: receivedAmount || total,
      change: change > 0 ? change : 0,
    });
  };

  return (
    <div className="space-y-6">
      {/* Total */}
      <div className="text-center py-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
        <Money size={40} weight="duotone" className="mx-auto text-green-600 dark:text-green-400 mb-2" />
        <p className="text-sm text-green-700 dark:text-green-300">Totale</p>
        <p className="text-3xl font-bold text-green-800 dark:text-green-200">
          {formatCurrency(total)}
        </p>
      </div>

      {/* Received amount input */}
      <div>
        <label className="block text-sm font-medium text-theme-text-secondary mb-2">
          Importo ricevuto (opzionale)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-tertiary text-xl">
            €
          </span>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={receivedAmount}
            onChange={handleInputChange}
            placeholder={total.toFixed(2)}
            className="w-full pl-10 pr-4 py-4 text-2xl font-bold text-center rounded-xl bg-theme-bg-secondary border-2 border-theme-border-medium focus:border-theme-brand-primary focus:ring-2 focus:ring-theme-brand-secondary transition-colors"
          />
        </div>
      </div>

      {/* Quick amounts */}
      <div>
        <p className="text-sm text-theme-text-tertiary mb-2">Importi rapidi</p>
        <div className="flex flex-wrap gap-2">
          {quickAmounts
            .filter((amount) => amount >= total)
            .map((amount) => (
              <button
                key={amount}
                onClick={() => handleQuickAmount(amount)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  receivedAmount === amount
                    ? 'bg-theme-brand-primary text-white'
                    : 'bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary'
                }`}
              >
                €{amount}
              </button>
            ))}
        </div>
      </div>

      {/* Change calculation */}
      {isValidAmount && change > 0 && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator size={20} weight="bold" className="text-yellow-600 dark:text-yellow-400" />
              <span className="font-medium text-yellow-700 dark:text-yellow-300">Resto da dare</span>
            </div>
            <span className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
              {formatCurrency(change)}
            </span>
          </div>
        </div>
      )}

      {/* Confirm button */}
      <button
        onClick={handleConfirm}
        disabled={isConfirming}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 transition-colors"
      >
        {isConfirming ? (
          <span>Elaborazione...</span>
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
