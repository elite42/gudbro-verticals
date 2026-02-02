'use client';

/**
 * Payment Sheet Component
 *
 * Bottom sheet for selecting payment method and processing payment.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

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
            className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-hidden rounded-t-3xl bg-theme-bg-primary shadow-2xl"
          >
            {/* Drag handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1.5 rounded-full bg-theme-bg-tertiary" />
            </div>

            {/* Header */}
            <div className="px-4 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedMethod && (
                  <button
                    onClick={handleBack}
                    className="p-2 -ml-2 rounded-full hover:bg-theme-bg-secondary transition-colors"
                  >
                    <ArrowLeft size={20} weight="bold" className="text-theme-text-secondary" />
                  </button>
                )}
                <div>
                  <h2 className="text-xl font-bold text-theme-text-primary">
                    {selectedMethod
                      ? paymentMethods.find((m) => m.id === selectedMethod)?.label
                      : 'Conto'}
                  </h2>
                  <p className="text-sm text-theme-text-secondary">
                    Tavolo {tableNumber} • {formatCurrency(total)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-theme-bg-secondary transition-colors"
              >
                <X size={24} weight="bold" className="text-theme-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-8 overflow-y-auto max-h-[70vh]">
              <AnimatePresence mode="wait">
                {!selectedMethod ? (
                  <motion.div
                    key="methods"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Total display */}
                    <div className="text-center py-6">
                      <p className="text-sm text-theme-text-secondary mb-1">Totale da pagare</p>
                      <p className="text-4xl font-bold text-theme-text-primary">
                        {formatCurrency(total)}
                      </p>
                    </div>

                    {/* Payment method grid */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-theme-text-secondary">
                        Come vuole pagare?
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {paymentMethods.slice(0, 3).map((method) => {
                          const Icon = method.icon;
                          return (
                            <button
                              key={method.id}
                              onClick={() => setSelectedMethod(method.id)}
                              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors"
                            >
                              <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center`}>
                                <Icon size={24} weight="fill" className="text-white" />
                              </div>
                              <span className="text-sm font-medium text-theme-text-primary">
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
                              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors"
                            >
                              <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center`}>
                                <Icon size={24} weight="fill" className="text-white" />
                              </div>
                              <span className="text-sm font-medium text-theme-text-primary">
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
                      <CashPayment
                        total={total}
                        onConfirm={handlePaymentSuccess}
                      />
                    )}
                    {selectedMethod === 'card' && (
                      <CardPayment
                        total={total}
                        onConfirm={handlePaymentSuccess}
                      />
                    )}
                    {selectedMethod === 'crypto' && (
                      <CryptoPayment
                        total={total}
                        tableNumber={tableNumber}
                        onConfirm={handlePaymentSuccess}
                      />
                    )}
                    {selectedMethod === 'split' && (
                      <SplitPayment
                        total={total}
                        onConfirm={handlePaymentSuccess}
                      />
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
