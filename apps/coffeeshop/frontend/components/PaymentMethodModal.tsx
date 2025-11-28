'use client';

import React, { useState, useEffect } from 'react';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string | React.ReactNode;
  description?: string;
}

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (method: string) => void;
}

export function PaymentMethodModal({
  isOpen,
  onClose,
  onConfirm
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('cash');

  // Payment methods configuration
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cash',
      name: 'Contanti',
      icon: '💵',
      description: 'Paga in contanti al tavolo'
    },
    {
      id: 'card-table',
      name: 'Carta al Tavolo',
      icon: '💳',
      description: 'Staff porterà il POS al tavolo'
    },
    {
      id: 'card-counter',
      name: 'Carta alla Cassa',
      icon: '🏪',
      description: 'Paga alla cassa con carta'
    },
    {
      id: 'mobile-pay',
      name: 'Mobile Payment',
      icon: '📱',
      description: 'Apple Pay, Google Pay, Samsung Pay'
    },
    {
      id: 'bank-transfer',
      name: 'Bonifico Bancario',
      icon: '🏦',
      description: 'Trasferimento bancario istantaneo'
    },
    {
      id: 'digital-wallet',
      name: 'Portafoglio Digitale',
      icon: '💰',
      description: 'PayPal, Satispay, etc.'
    }
  ];

  const swipe = useSwipeToDismiss({ isOpen, onClose });

  const handleConfirm = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    onConfirm(selectedMethod);
    onClose();

    // Show success message
    alert(`✅ Richiesta di pagamento inviata!\n\nMetodo: ${method?.name}\n\nLo staff arriverà a breve.`);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[80]"
        style={swipe.getBackdropStyle()}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[90] bg-theme-bg-elevated rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden select-none"
        style={swipe.getModalStyle()}
        onTouchStart={swipe.handleTouchStart}
        onTouchMove={swipe.handleTouchMove}
        onTouchEnd={swipe.handleTouchEnd}
        onMouseDown={swipe.handleMouseDown}
        onMouseMove={swipe.handleMouseMove}
        onMouseUp={swipe.handleMouseUp}
        onMouseLeave={swipe.handleMouseLeave}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-theme-bg-tertiary rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pt-2 pb-4 border-b border-theme-bg-tertiary">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-theme-text-primary">Richiedi Conto</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Chiudi"
            >
              <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          <p className="text-sm text-theme-text-secondary mt-1">Seleziona il metodo di pagamento</p>
        </div>

        {/* Payment Methods List */}
        <div className="overflow-y-auto max-h-[calc(85vh-180px)] px-6 py-4">
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                variant={selectedMethod === method.id ? "selected" : "interactive"}
                padding="md"
                onClick={() => setSelectedMethod(method.id)}
                className="w-full flex items-center gap-4"
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  selectedMethod === method.id ? 'bg-blue-100' : 'bg-theme-bg-secondary'
                }`}>
                  {typeof method.icon === 'string' ? method.icon : method.icon}
                </div>

                {/* Text */}
                <div className="flex-1 text-left">
                  <div className="font-semibold text-theme-text-primary">{method.name}</div>
                  {method.description && (
                    <div className="text-xs text-theme-text-secondary mt-0.5">{method.description}</div>
                  )}
                </div>

                {/* Radio Button */}
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-theme-bg-tertiary'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer - Confirm Button */}
        <div className="sticky bottom-0 bg-theme-bg-elevated border-t border-theme-bg-tertiary p-6">
          <Button
            onClick={handleConfirm}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Invia Richiesta
          </Button>
        </div>
      </div>

    </>
  );
}
