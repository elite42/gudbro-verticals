'use client';

import { useState } from 'react';
import { Copy, Check, Info, ArrowSquareOut } from '@phosphor-icons/react';
import { formatPrice } from '@/lib/price-utils';

/**
 * Crypto currency metadata -- inlined to avoid cross-package import issues.
 * Mirrors CRYPTO_CURRENCIES from @shared/payment/types.ts
 */
const CRYPTO_CURRENCIES = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', color: 'bg-orange-500' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', color: 'bg-indigo-500' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', color: 'bg-green-500' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', color: 'bg-blue-500' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', color: 'bg-purple-500' },
  { id: 'ton', name: 'Toncoin', symbol: 'TON', color: 'bg-sky-500' },
  { id: 'bnb', name: 'BNB', symbol: 'BNB', color: 'bg-yellow-500' },
] as const;

/** Generate deep-link URI for each supported crypto */
function getDeepLink(cryptoId: string, address: string, bookingCode: string): string | null {
  switch (cryptoId) {
    case 'btc':
      return `bitcoin:${address}?label=Booking+${bookingCode}`;
    case 'eth':
    case 'usdc':
    case 'usdt':
      return `ethereum:${address}`;
    case 'sol':
      return `solana:${address}`;
    case 'ton':
      return `ton://transfer/${address}`;
    case 'bnb':
      return `bnb:${address}`;
    default:
      return null;
  }
}

function truncateAddress(address: string): string {
  if (address.length <= 16) return address;
  return `${address.slice(0, 8)}...${address.slice(-6)}`;
}

interface CryptoPaymentOptionsProps {
  wallets: Record<string, string>;
  amount: number;
  currency: string;
  bookingCode: string;
}

export default function CryptoPaymentOptions({
  wallets,
  amount,
  currency,
  bookingCode,
}: CryptoPaymentOptionsProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyAddress = async (address: string, key: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  // Only show wallets the owner has configured, matched against known currencies
  const configuredWallets = CRYPTO_CURRENCIES.filter((c) => wallets[c.id]);

  if (configuredWallets.length === 0) return null;

  return (
    <div className="border-border bg-background mx-auto max-w-sm rounded-xl border p-4">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-foreground text-sm font-semibold">Pay with Crypto</h3>
        <span className="text-foreground-muted text-xs">
          {formatPrice(amount, currency)} equivalent
        </span>
      </div>
      <p className="text-foreground-muted mb-3 text-xs">
        Send the equivalent amount in your preferred cryptocurrency.
      </p>

      <div className="space-y-2">
        {configuredWallets.map((crypto) => {
          const address = wallets[crypto.id];
          const deepLink = getDeepLink(crypto.id, address, bookingCode);

          return (
            <div
              key={crypto.id}
              className="border-border flex items-center gap-3 rounded-lg border p-3"
            >
              {/* Crypto icon circle */}
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${crypto.color} text-xs font-bold text-white`}
              >
                {crypto.symbol.slice(0, 3)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-foreground text-xs font-medium">{crypto.name}</p>
                <p className="text-foreground-muted truncate font-mono text-xs">
                  {truncateAddress(address)}
                </p>
              </div>

              {/* Copy button */}
              <button
                onClick={() => copyAddress(address, crypto.id)}
                className="text-foreground-muted hover:text-primary rounded p-1 transition-colors"
                aria-label={`Copy ${crypto.name} address`}
              >
                {copiedKey === crypto.id ? (
                  <Check size={16} weight="bold" className="text-success" />
                ) : (
                  <Copy size={16} />
                )}
              </button>

              {/* Deep-link button */}
              {deepLink && (
                <a
                  href={deepLink}
                  className="text-foreground-muted hover:text-primary rounded p-1 transition-colors"
                  aria-label={`Open ${crypto.name} wallet`}
                >
                  <ArrowSquareOut size={16} />
                </a>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-700">
        <Info size={14} weight="fill" className="mt-0.5 flex-shrink-0" />
        <span>Your booking is confirmed once the host verifies the payment</span>
      </div>
    </div>
  );
}
