'use client';

import React, { useState, useEffect } from 'react';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { CryptoPaymentModal } from './CryptoPaymentModal';
import type { PriceDisplayUnit } from '@/lib/crypto-price-service';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string | React.ReactNode;
  description?: string;
}

interface CryptoWallet {
  address: string;
  enabled: boolean;
  network?: string;
}

interface MerchantCryptoSettings {
  cryptoEnabled: boolean;
  cryptoWallets: Record<string, CryptoWallet>;
  cryptoPriceDisplayUnit: PriceDisplayUnit;
  cryptoPaymentTimeoutMinutes: number;
  cryptoPriceBufferPercent: number;
}

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (method: string, cryptoData?: CryptoPaymentData) => void;
  amount?: number;
  currency?: string;
  cryptoSettings?: MerchantCryptoSettings;
}

interface CryptoPaymentData {
  cryptocurrency: string;
  walletAddress: string;
  cryptoAmount: number;
  fiatAmount: number;
  txHash?: string;
  network: string;
}

export function PaymentMethodModal({
  isOpen,
  onClose,
  onConfirm,
  amount = 0,
  currency = 'EUR',
  cryptoSettings,
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('cash');
  const [showCryptoModal, setShowCryptoModal] = useState(false);

  // Check if crypto is enabled
  const isCryptoEnabled =
    cryptoSettings?.cryptoEnabled &&
    cryptoSettings.cryptoWallets &&
    Object.values(cryptoSettings.cryptoWallets).some((w) => w.enabled && w.address);

  // Payment methods configuration
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cash',
      name: 'Contanti',
      icon: '💵',
      description: 'Paga in contanti al tavolo',
    },
    {
      id: 'card-table',
      name: 'Carta al Tavolo',
      icon: '💳',
      description: 'Staff porterà il POS al tavolo',
    },
    {
      id: 'card-counter',
      name: 'Carta alla Cassa',
      icon: '🏪',
      description: 'Paga alla cassa con carta',
    },
    {
      id: 'mobile-pay',
      name: 'Mobile Payment',
      icon: '📱',
      description: 'Apple Pay, Google Pay, Samsung Pay',
    },
    {
      id: 'bank-transfer',
      name: 'Bonifico Bancario',
      icon: '🏦',
      description: 'Trasferimento bancario istantaneo',
    },
    {
      id: 'digital-wallet',
      name: 'Portafoglio Digitale',
      icon: '💰',
      description: 'PayPal, Satispay, etc.',
    },
    // Add crypto option if enabled
    ...(isCryptoEnabled
      ? [
          {
            id: 'crypto',
            name: 'Cryptocurrency',
            icon: (
              <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H11.1v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.25c.1 1.7 1.36 2.66 2.86 2.97V19h2.12v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.65-3.42z" />
              </svg>
            ),
            description: 'Bitcoin, Ethereum, USDC, Solana',
          },
        ]
      : []),
  ];

  const swipe = useSwipeToDismiss({ isOpen, onClose });

  const handleConfirm = () => {
    // If crypto is selected, open crypto modal instead
    if (selectedMethod === 'crypto') {
      setShowCryptoModal(true);
      return;
    }

    const method = paymentMethods.find((m) => m.id === selectedMethod);
    onConfirm(selectedMethod);
    onClose();

    // Show success message
    alert(
      `Richiesta di pagamento inviata!\n\nMetodo: ${method?.name}\n\nLo staff arrivera a breve.`
    );
  };

  const handleCryptoPayment = (cryptoData: CryptoPaymentData) => {
    onConfirm('crypto', cryptoData);
    setShowCryptoModal(false);
    onClose();
  };

  if (!isOpen && !showCryptoModal) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[80]" style={swipe.getBackdropStyle()} onClick={onClose} />

      {/* Bottom Sheet */}
      <div
        className="bg-theme-bg-elevated fixed bottom-0 left-0 right-0 z-[90] max-h-[85vh] select-none overflow-hidden rounded-t-3xl shadow-2xl"
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
        <div className="flex justify-center pb-2 pt-3">
          <div className="bg-theme-bg-tertiary h-1.5 w-12 rounded-full" />
        </div>

        {/* Header */}
        <div className="border-theme-bg-tertiary border-b px-6 pb-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-theme-text-primary text-2xl font-bold">Richiedi Conto</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Chiudi"
            >
              <svg
                className="text-theme-text-secondary h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <p className="text-theme-text-secondary mt-1 text-sm">Seleziona il metodo di pagamento</p>
        </div>

        {/* Payment Methods List */}
        <div className="max-h-[calc(85vh-180px)] overflow-y-auto px-6 py-4">
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                variant={selectedMethod === method.id ? 'selected' : 'interactive'}
                padding="md"
                onClick={() => setSelectedMethod(method.id)}
                className="flex w-full items-center gap-4"
              >
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl ${
                    selectedMethod === method.id ? 'bg-blue-100' : 'bg-theme-bg-secondary'
                  }`}
                >
                  {typeof method.icon === 'string' ? method.icon : method.icon}
                </div>

                {/* Text */}
                <div className="flex-1 text-left">
                  <div className="text-theme-text-primary font-semibold">{method.name}</div>
                  {method.description && (
                    <div className="text-theme-text-secondary mt-0.5 text-xs">
                      {method.description}
                    </div>
                  )}
                </div>

                {/* Radio Button */}
                <div
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-theme-bg-tertiary'
                  }`}
                >
                  {selectedMethod === method.id && (
                    <div className="h-3 w-3 rounded-full bg-white" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer - Confirm Button */}
        <div className="bg-theme-bg-elevated border-theme-bg-tertiary sticky bottom-0 border-t p-6">
          <Button onClick={handleConfirm} variant="primary" size="lg" className="w-full">
            {selectedMethod === 'crypto' ? 'Paga con Crypto' : 'Invia Richiesta'}
          </Button>
        </div>
      </div>

      {/* Crypto Payment Modal */}
      {cryptoSettings && (
        <CryptoPaymentModal
          isOpen={showCryptoModal}
          onClose={() => setShowCryptoModal(false)}
          onPaymentSubmitted={handleCryptoPayment}
          amount={amount}
          currency={currency}
          merchantSettings={cryptoSettings}
        />
      )}
    </>
  );
}
