'use client';

/**
 * Payment Sheet Component
 *
 * Bottom sheet for selecting payment method and processing payment.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice as _fp } from '@gudbro/utils';
import {
  X,
  Money,
  CreditCard,
  CurrencyBtc,
  Divide,
  QrCode,
  ArrowLeft,
} from '@phosphor-icons/react';
import { CashPayment } from './CashPayment';
import { CardPayment } from './CardPayment';
import { CryptoPayment } from './CryptoPayment';
import { SplitPayment } from './SplitPayment';
import { QRPayment } from './QRPayment';

export type PaymentMethod = 'cash' | 'card' | 'crypto' | 'split' | 'qr';

interface PaymentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string;
  total: number;
  orderId?: string;
  onPaymentComplete: (method: PaymentMethod, details?: Record<string, unknown>) => void;
}

const paymentMethods = [
  { id: 'cash' as const, icon: Money, label: 'Cash', color: 'bg-green-500' },
  { id: 'card' as const, icon: CreditCard, label: 'Carta', color: 'bg-purple-500' },
  { id: 'crypto' as const, icon: CurrencyBtc, label: 'Crypto', color: 'bg-orange-500' },
  { id: 'split' as const, icon: Divide, label: 'Dividi', color: 'bg-blue-500' },
  { id: 'qr' as const, icon: QrCode, label: 'QR Pay', color: 'bg-indigo-500' },
];

export function PaymentSheet({
  isOpen,
  onClose,
  tableNumber,
  total,
  orderId,
  onPaymentComplete,
}: PaymentSheetProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const handleClose = () => {
    setSelectedMethod(null);
    onClose();
  };

  const handleBack = () => {
    setSelectedMethod(null);
  };

  const handlePaymentSuccess = (details?: Record<string, unknown>) => {
    if (selectedMethod) {
      onPaymentComplete(selectedMethod, details);
    }
    handleClose();
  };

  const formatCurrency = (amount: number) => _fp(amount, 'EUR');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="bg-theme-bg-primary fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-hidden rounded-t-3xl shadow-2xl"
          >
            {/* Drag handle */}
            <div className="flex justify-center py-3">
              <div className="bg-theme-bg-tertiary h-1.5 w-12 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-4">
              <div className="flex items-center gap-3">
                {selectedMethod && (
                  <button
                    onClick={handleBack}
                    className="hover:bg-theme-bg-secondary -ml-2 rounded-full p-2 transition-colors"
                  >
                    <ArrowLeft size={20} weight="bold" className="text-theme-text-secondary" />
                  </button>
                )}
                <div>
                  <h2 className="text-theme-text-primary text-xl font-bold">
                    {selectedMethod
                      ? paymentMethods.find((m) => m.id === selectedMethod)?.label
                      : 'Conto'}
                  </h2>
                  <p className="text-theme-text-secondary text-sm">
                    Tavolo {tableNumber} • {formatCurrency(total)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="hover:bg-theme-bg-secondary rounded-full p-2 transition-colors"
              >
                <X size={24} weight="bold" className="text-theme-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto px-4 pb-8">
              <AnimatePresence mode="wait">
                {!selectedMethod ? (
                  <motion.div
                    key="methods"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Total display */}
                    <div className="py-6 text-center">
                      <p className="text-theme-text-secondary mb-1 text-sm">Totale da pagare</p>
                      <p className="text-theme-text-primary text-4xl font-bold">
                        {formatCurrency(total)}
                      </p>
                    </div>

                    {/* Payment method grid */}
                    <div className="space-y-3">
                      <p className="text-theme-text-secondary text-sm font-medium">
                        Come vuole pagare?
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {paymentMethods.slice(0, 3).map((method) => {
                          const Icon = method.icon;
                          return (
                            <button
                              key={method.id}
                              onClick={() => setSelectedMethod(method.id)}
                              className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex flex-col items-center gap-2 rounded-2xl p-4 transition-colors"
                            >
                              <div
                                className={`h-12 w-12 rounded-xl ${method.color} flex items-center justify-center`}
                              >
                                <Icon size={24} weight="fill" className="text-white" />
                              </div>
                              <span className="text-theme-text-primary text-sm font-medium">
                                {method.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.slice(3).map((method) => {
                          const Icon = method.icon;
                          return (
                            <button
                              key={method.id}
                              onClick={() => setSelectedMethod(method.id)}
                              className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex flex-col items-center gap-2 rounded-2xl p-4 transition-colors"
                            >
                              <div
                                className={`h-12 w-12 rounded-xl ${method.color} flex items-center justify-center`}
                              >
                                <Icon size={24} weight="fill" className="text-white" />
                              </div>
                              <span className="text-theme-text-primary text-sm font-medium">
                                {method.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selectedMethod}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {selectedMethod === 'cash' && (
                      <CashPayment total={total} onConfirm={handlePaymentSuccess} />
                    )}
                    {selectedMethod === 'card' && (
                      <CardPayment total={total} onConfirm={handlePaymentSuccess} />
                    )}
                    {selectedMethod === 'crypto' && (
                      <CryptoPayment
                        total={total}
                        tableNumber={tableNumber}
                        onConfirm={handlePaymentSuccess}
                      />
                    )}
                    {selectedMethod === 'split' && (
                      <SplitPayment total={total} onConfirm={handlePaymentSuccess} />
                    )}
                    {selectedMethod === 'qr' && (
                      <QRPayment
                        total={total}
                        tableNumber={tableNumber}
                        orderId={orderId}
                        onConfirm={handlePaymentSuccess}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
