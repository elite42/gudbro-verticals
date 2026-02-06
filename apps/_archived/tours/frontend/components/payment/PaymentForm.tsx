'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { PaymentMethod } from '@/lib/types';
import {
  formatCardNumber as formatCard,
  formatExpiry as formatExp,
  formatPrice,
  CRYPTO_CURRENCIES,
} from '@shared/payment';

/* ═══════════════════════════════════════════════════════════════════════════
   PAYMENT FORM COMPONENT

   Dynamic form that renders the appropriate payment UI based on selected method.
   Handles VNPay, MoMo, Cards (Stripe), and Crypto payments.
   ═══════════════════════════════════════════════════════════════════════════ */

interface PaymentFormProps {
  method: PaymentMethod;
  amount: number;
  currency: string;
  onSubmit: (paymentData: PaymentData) => Promise<void>;
  onCancel: () => void;
}

export interface PaymentData {
  method: PaymentMethod;
  transactionId?: string;
  cardLast4?: string;
  cryptoTxHash?: string;
  walletAddress?: string;
}

export function PaymentForm({ method, amount, currency, onSubmit, onCancel }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: Partial<PaymentData>) => {
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ method, ...data } as PaymentData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Amount display */}
      <div className="bg-primary/5 rounded-xl p-4 text-center">
        <p className="text-foreground-muted text-sm">Amount to pay</p>
        <p className="font-display text-primary text-3xl font-bold">
          {formatPrice(amount, currency)}
        </p>
      </div>

      {/* Method-specific form */}
      {method === 'cash' && <CashPaymentInfo amount={amount} onConfirm={() => handleSubmit({})} />}

      {method === 'vnpay' && (
        <VNPayForm amount={amount} onSubmit={handleSubmit} loading={loading} />
      )}

      {method === 'momo' && <MoMoForm amount={amount} onSubmit={handleSubmit} loading={loading} />}

      {method === 'card' && <CardForm amount={amount} onSubmit={handleSubmit} loading={loading} />}

      {method === 'crypto' && (
        <CryptoForm amount={amount} onSubmit={handleSubmit} loading={loading} />
      )}

      {/* Error display */}
      {error && (
        <div className="bg-error/10 border-error/30 text-error rounded-xl border p-3 text-sm">
          {error}
        </div>
      )}

      {/* Cancel button */}
      <Button variant="ghost" fullWidth onClick={onCancel} disabled={loading}>
        ← Change payment method
      </Button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CASH PAYMENT INFO
   ───────────────────────────────────────────────────────────────────── */

function CashPaymentInfo({ amount, onConfirm }: { amount: number; onConfirm: () => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-success/10 border-success/30 rounded-xl border p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💵</span>
          <div>
            <h4 className="text-foreground font-semibold">Pay on Pickup</h4>
            <p className="text-foreground-muted mt-1 text-sm">
              Pay your guide when they pick you up. Cash (VND or USD) and cards are usually
              accepted.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="text-foreground-muted flex items-center gap-2">
          <svg className="text-success h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span>No advance payment required</span>
        </div>
        <div className="text-foreground-muted flex items-center gap-2">
          <svg className="text-success h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span>Free cancellation up to 24h before</span>
        </div>
        <div className="text-foreground-muted flex items-center gap-2">
          <svg className="text-success h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          <span>Bring exact amount if possible</span>
        </div>
      </div>

      <Button fullWidth size="lg" onClick={onConfirm}>
        Confirm Booking
      </Button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   VNPAY FORM
   ───────────────────────────────────────────────────────────────────── */

function VNPayForm({
  amount,
  onSubmit,
  loading,
}: {
  amount: number;
  onSubmit: (data: Partial<PaymentData>) => void;
  loading: boolean;
}) {
  const banks = [
    { code: 'VCB', name: 'Vietcombank', logo: '🏦' },
    { code: 'TCB', name: 'Techcombank', logo: '🏦' },
    { code: 'MB', name: 'MB Bank', logo: '🏦' },
    { code: 'VPB', name: 'VPBank', logo: '🏦' },
    { code: 'ACB', name: 'ACB', logo: '🏦' },
    { code: 'BIDV', name: 'BIDV', logo: '🏦' },
  ];

  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
          <span className="text-sm font-bold text-white">VN</span>
        </div>
        <div>
          <p className="text-foreground font-semibold">VNPay</p>
          <p className="text-foreground-muted text-xs">Vietnamese banks & cards</p>
        </div>
      </div>

      <div>
        <p className="text-foreground-muted mb-2 text-sm font-medium">Select your bank</p>
        <div className="grid grid-cols-3 gap-2">
          {banks.map((bank) => (
            <button
              key={bank.code}
              type="button"
              onClick={() => setSelectedBank(bank.code)}
              className={cn(
                'rounded-xl border-2 p-3 text-center transition-all',
                selectedBank === bank.code
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-border hover:border-blue-300'
              )}
            >
              <span className="text-xl">{bank.logo}</span>
              <p className="mt-1 text-xs font-medium">{bank.code}</p>
            </button>
          ))}
        </div>
      </div>

      <Button
        fullWidth
        size="lg"
        loading={loading}
        disabled={!selectedBank}
        onClick={() => onSubmit({ transactionId: `VNP-${Date.now()}` })}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Pay with VNPay
      </Button>

      <p className="text-foreground-muted text-center text-xs">
        You'll be redirected to VNPay to complete payment
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MOMO FORM
   ───────────────────────────────────────────────────────────────────── */

function MoMoForm({
  amount,
  onSubmit,
  loading,
}: {
  amount: number;
  onSubmit: (data: Partial<PaymentData>) => void;
  loading: boolean;
}) {
  const [phone, setPhone] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl bg-pink-50 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#A50064]">
          <span className="font-bold text-white">M</span>
        </div>
        <div>
          <p className="text-foreground font-semibold">MoMo</p>
          <p className="text-foreground-muted text-xs">Vietnam's #1 e-wallet</p>
        </div>
      </div>

      <Input
        label="MoMo Phone Number"
        placeholder="0901234567"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        icon={<span>📱</span>}
      />

      <Button
        fullWidth
        size="lg"
        loading={loading}
        disabled={phone.length < 10}
        onClick={() => onSubmit({ transactionId: `MOMO-${Date.now()}` })}
        className="bg-[#A50064] hover:bg-[#8a0054]"
      >
        Pay with MoMo
      </Button>

      <p className="text-foreground-muted text-center text-xs">Confirm payment in your MoMo app</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CARD FORM (STRIPE)
   ───────────────────────────────────────────────────────────────────── */

function CardForm({
  amount,
  onSubmit,
  loading,
}: {
  amount: number;
  onSubmit: (data: Partial<PaymentData>) => void;
  loading: boolean;
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl bg-indigo-50 p-3">
        <div className="flex gap-1">
          <div className="flex h-5 w-8 items-center justify-center rounded bg-blue-700 text-xs font-bold text-white">
            VISA
          </div>
          <div className="flex h-5 w-8 items-center justify-center rounded-full bg-red-500">
            <div className="h-3 w-3 rounded-full bg-yellow-400 opacity-80" />
          </div>
        </div>
        <div>
          <p className="text-foreground font-semibold">Credit/Debit Card</p>
          <p className="text-foreground-muted text-xs">Powered by Stripe</p>
        </div>
      </div>

      <Input
        label="Card Number"
        placeholder="4242 4242 4242 4242"
        value={cardNumber}
        onChange={(e) => setCardNumber(formatCard(e.target.value))}
        maxLength={19}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Expiry"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(formatExp(e.target.value))}
          maxLength={5}
        />
        <Input
          label="CVC"
          placeholder="123"
          type="password"
          value={cvc}
          onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
          maxLength={4}
        />
      </div>

      <Button
        fullWidth
        size="lg"
        loading={loading}
        disabled={cardNumber.length < 19 || expiry.length < 5 || cvc.length < 3}
        onClick={() => onSubmit({ cardLast4: cardNumber.slice(-4) })}
      >
        Pay Now
      </Button>

      <div className="text-foreground-muted flex items-center justify-center gap-2 text-xs">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
        <span>Secured by Stripe</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CRYPTO FORM
   ───────────────────────────────────────────────────────────────────── */

function CryptoForm({
  amount,
  onSubmit,
  loading,
}: {
  amount: number;
  onSubmit: (data: Partial<PaymentData>) => void;
  loading: boolean;
}) {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [txHash, setTxHash] = useState('');

  // Use first 4 from shared config
  const cryptos = CRYPTO_CURRENCIES.slice(0, 4);

  // Mock conversion (in production, use real API)
  const getConversion = (crypto: string) => {
    const rates: Record<string, number> = {
      btc: 1000000000, // ~$40k
      eth: 65000000, // ~$2600
      usdt: 25000, // 1:1 USD
      usdc: 25000, // 1:1 USD
    };
    return (amount / (rates[crypto] || 25000)).toFixed(6);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 font-bold text-white">
          ₿
        </div>
        <div>
          <p className="text-foreground font-semibold">Cryptocurrency</p>
          <p className="text-foreground-muted text-xs">Fast & borderless</p>
        </div>
      </div>

      {/* Crypto selection */}
      <div>
        <p className="text-foreground-muted mb-2 text-sm font-medium">Select cryptocurrency</p>
        <div className="grid grid-cols-2 gap-2">
          {cryptos.map((crypto) => (
            <button
              key={crypto.id}
              type="button"
              onClick={() => setSelectedCrypto(crypto.id)}
              className={cn(
                'rounded-xl border-2 p-3 transition-all',
                selectedCrypto === crypto.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full font-bold text-white',
                    crypto.color
                  )}
                >
                  {crypto.icon}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{crypto.symbol}</p>
                  <p className="text-foreground-muted text-xs">{crypto.name}</p>
                </div>
              </div>
              {selectedCrypto === crypto.id && (
                <p className="text-primary mt-2 font-mono text-xs">
                  ≈ {getConversion(crypto.id)} {crypto.symbol}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Wallet address (mock) */}
      {selectedCrypto && (
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="mb-2 text-sm font-medium">Send to this address:</p>
          <div className="flex items-center gap-2">
            <code className="border-border flex-1 break-all rounded border bg-white p-2 font-mono text-xs">
              {selectedCrypto === 'btc' && 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'}
              {selectedCrypto === 'eth' && '0x742d35Cc6634C0532925a3b844Bc9e7595f3c2C3'}
              {selectedCrypto === 'usdt' && 'TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9'}
              {selectedCrypto === 'usdc' && '0x742d35Cc6634C0532925a3b844Bc9e7595f3c2C3'}
            </code>
            <button
              type="button"
              className="rounded-lg p-2 transition-colors hover:bg-gray-200"
              onClick={() => navigator.clipboard.writeText('...')}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>

          <Input
            label="Transaction Hash (after sending)"
            placeholder="0x..."
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            className="mt-4"
          />
        </div>
      )}

      <Button
        fullWidth
        size="lg"
        loading={loading}
        disabled={!selectedCrypto || txHash.length < 10}
        onClick={() => onSubmit({ cryptoTxHash: txHash })}
      >
        I've Sent Payment
      </Button>

      <p className="text-foreground-muted text-center text-xs">
        Payment will be verified within 10-30 minutes
      </p>
    </div>
  );
}
