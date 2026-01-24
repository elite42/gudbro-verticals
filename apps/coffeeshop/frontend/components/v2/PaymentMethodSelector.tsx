'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Money, CheckCircle, Plus, CaretRight } from '@phosphor-icons/react';
import { TokenBTC, TokenETH, TokenUSDC, TokenUSDT } from '@web3icons/react';

type PaymentType = 'apple_pay' | 'google_pay' | 'card' | 'crypto' | 'cash' | 'saved_card';

interface PaymentMethod {
  id: string;
  type: PaymentType;
  label: string;
  sublabel?: string;
  lastFour?: string;
  brand?: string; // visa, mastercard, amex
  isDefault?: boolean;
}

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethodId: string | null;
  onSelect: (methodId: string) => void;
  onAddCard?: () => void;
  onCryptoSelect?: () => void;
  showCrypto?: boolean;
  showCash?: boolean;
}

// Payment method icons
function PaymentIcon({
  type,
  brand,
  size = 24,
}: {
  type: PaymentType;
  brand?: string;
  size?: number;
}) {
  switch (type) {
    case 'apple_pay':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.08-.46-2.07-.48-3.2 0-1.42.62-2.17.44-3.03-.35C2.8 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      );
    case 'google_pay':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
          />
        </svg>
      );
    case 'crypto':
      return (
        <div className="flex -space-x-1">
          <TokenBTC variant="branded" size={size - 4} />
          <TokenETH variant="branded" size={size - 4} />
        </div>
      );
    case 'cash':
      return <Money size={size} weight="duotone" />;
    case 'card':
    case 'saved_card':
      if (brand === 'visa') {
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <rect fill="#1A1F71" width="24" height="24" rx="4" />
            <path
              fill="#FFFFFF"
              d="M9.5 15.5l1.1-6h1.4l-1.1 6H9.5zm5.8-5.9c-.3-.1-.7-.2-1.2-.2-.9 0-1.5.4-1.5 1 0 .4.4.7 1 .9.4.2.5.3.5.5 0 .3-.3.4-.6.4-.4 0-.8-.1-1.2-.3l-.2-.1-.1.8c.3.1.9.3 1.5.3 1 0 1.6-.4 1.6-1 0-.4-.3-.6-.9-.9-.4-.2-.6-.3-.6-.5 0-.2.2-.4.6-.4.3 0 .6 0 .9.1l.1.1.1-.7zm2.5-.1h-.7c-.2 0-.4.1-.5.3l-1.4 3.2h1s.2-.4.2-.6h1.2c0 .1.1.6.1.6h.9l-.8-3.5zm-1.1 2.3c.1-.2.4-1 .4-1l.1.3.2 .7h-.7zm-8.4-2.3l-.9 4.1-.1-.5c-.2-.6-.7-1.2-1.4-1.6l.8 3h1l1.5-5h-1v-.1l.1.1z"
            />
          </svg>
        );
      }
      if (brand === 'mastercard') {
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <rect fill="#000" width="24" height="24" rx="4" />
            <circle fill="#EB001B" cx="9" cy="12" r="5" />
            <circle fill="#F79E1B" cx="15" cy="12" r="5" />
            <path fill="#FF5F00" d="M12 8.5a5 5 0 0 0 0 7 5 5 0 0 0 0-7z" />
          </svg>
        );
      }
      return <CreditCard size={size} weight="duotone" />;
    default:
      return <Wallet size={size} weight="duotone" />;
  }
}

export function PaymentMethodSelector({
  methods,
  selectedMethodId,
  onSelect,
  onAddCard,
  onCryptoSelect,
  showCrypto = true,
  showCash = false,
}: PaymentMethodSelectorProps) {
  // Group methods by type
  const digitalWallets = methods.filter((m) => ['apple_pay', 'google_pay'].includes(m.type));
  const savedCards = methods.filter((m) => m.type === 'saved_card');
  const otherMethods = methods.filter((m) => ['cash'].includes(m.type));

  return (
    <div className="space-y-4">
      {/* Digital Wallets */}
      {digitalWallets.length > 0 && (
        <div>
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Express Checkout
          </p>
          <div className="space-y-2">
            {digitalWallets.map((method) => (
              <PaymentMethodButton
                key={method.id}
                method={method}
                isSelected={selectedMethodId === method.id}
                onSelect={() => onSelect(method.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Saved Cards */}
      {savedCards.length > 0 && (
        <div>
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Saved Cards
          </p>
          <div className="space-y-2">
            {savedCards.map((method) => (
              <PaymentMethodButton
                key={method.id}
                method={method}
                isSelected={selectedMethodId === method.id}
                onSelect={() => onSelect(method.id)}
              />
            ))}

            {/* Add new card */}
            {onAddCard && (
              <button
                onClick={onAddCard}
                className="flex w-full items-center gap-3 rounded-xl p-4 transition-colors"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px dashed var(--border-medium)',
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <Plus size={20} style={{ color: 'var(--text-tertiary)' }} />
                </div>
                <span
                  className="flex-1 text-left text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Add new card
                </span>
                <CaretRight size={16} style={{ color: 'var(--text-tertiary)' }} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Crypto - GUDBRO Differentiator */}
      {showCrypto && (
        <div>
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Crypto Payment
          </p>
          <button
            onClick={onCryptoSelect}
            className="flex w-full items-center gap-3 rounded-xl p-4 transition-colors"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-medium)',
            }}
          >
            <div className="flex items-center gap-1">
              <TokenBTC variant="branded" size={28} />
              <TokenETH variant="branded" size={28} />
              <TokenUSDC variant="branded" size={28} />
              <TokenUSDT variant="branded" size={28} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Pay with Crypto
              </p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                BTC, ETH, USDC, USDT
              </p>
            </div>
            <CaretRight size={16} style={{ color: 'var(--text-tertiary)' }} />
          </button>
        </div>
      )}

      {/* Cash */}
      {showCash && otherMethods.length === 0 && (
        <div>
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Pay at Counter
          </p>
          <PaymentMethodButton
            method={{
              id: 'cash',
              type: 'cash',
              label: 'Cash',
              sublabel: 'Pay when you pick up',
            }}
            isSelected={selectedMethodId === 'cash'}
            onSelect={() => onSelect('cash')}
          />
        </div>
      )}
    </div>
  );
}

// Individual payment method button
function PaymentMethodButton({
  method,
  isSelected,
  onSelect,
}: {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      className="flex w-full items-center gap-3 rounded-xl p-4 transition-all"
      style={{
        background: isSelected ? 'var(--interactive-primary)' : 'var(--bg-secondary)',
        border: isSelected
          ? '2px solid var(--interactive-primary)'
          : '1px solid var(--border-medium)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{
          background: isSelected ? 'rgba(255,255,255,0.2)' : 'var(--bg-tertiary)',
          color: isSelected ? 'var(--text-inverse)' : 'var(--text-primary)',
        }}
      >
        <PaymentIcon type={method.type} brand={method.brand} size={24} />
      </div>

      {/* Label */}
      <div className="flex-1 text-left">
        <p
          className="text-sm font-medium"
          style={{
            color: isSelected ? 'var(--text-inverse)' : 'var(--text-primary)',
          }}
        >
          {method.label}
          {method.lastFour && ` •••• ${method.lastFour}`}
        </p>
        {method.sublabel && (
          <p
            className="text-xs"
            style={{
              color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-tertiary)',
            }}
          >
            {method.sublabel}
          </p>
        )}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <CheckCircle size={24} weight="fill" style={{ color: 'var(--text-inverse)' }} />
      )}

      {/* Default badge */}
      {method.isDefault && !isSelected && (
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{
            background: 'var(--bg-tertiary)',
            color: 'var(--text-tertiary)',
          }}
        >
          DEFAULT
        </span>
      )}
    </motion.button>
  );
}
