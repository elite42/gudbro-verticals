'use client';

/**
 * Crypto Payment Component
 *
 * Handles cryptocurrency payment with QR code generation.
 */

import { useState } from 'react';
import { CurrencyBtc, QrCode, CheckCircle, Spinner, Copy, Check } from '@phosphor-icons/react';
import { formatPrice as _fp } from '@gudbro/utils';

interface CryptoPaymentProps {
  total: number;
  tableNumber: string;
  onConfirm: (details?: Record<string, unknown>) => void;
}

// Available chains (would come from location settings in production)
const availableChains = [
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: '◊', color: 'bg-blue-500' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', icon: '◎', color: 'bg-purple-500' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: 'bg-orange-500' },
  { id: 'ton', name: 'TON', symbol: 'TON', icon: '💎', color: 'bg-sky-500' },
];

const stablecoins = [
  { id: 'usdc', name: 'USDC', chains: ['eth', 'sol'] },
  { id: 'usdt', name: 'USDT', chains: ['eth', 'ton'] },
];

export function CryptoPayment({ total, tableNumber, onConfirm }: CryptoPaymentProps) {
  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<'native' | 'usdc' | 'usdt'>('native');
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatCurrency = (amount: number) => _fp(amount, 'EUR');

  const selectedChainInfo = availableChains.find((c) => c.id === selectedChain);

  const handleGenerateQR = async () => {
    setIsGenerating(true);
    // Simulate QR generation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsGenerating(false);
    setQrGenerated(true);
    setIsWaiting(true);
  };

  const handleCopyAddress = () => {
    // In production, copy actual wallet address
    navigator.clipboard.writeText('0x1234...5678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    onConfirm({
      method: 'crypto',
      chain: selectedChain,
      token: selectedToken,
    });
  };

  // Simulate payment detection (in production, use websocket/polling)
  const handleSimulatePayment = () => {
    setIsWaiting(false);
    handleConfirmPayment();
  };

  if (qrGenerated) {
    return (
      <div className="space-y-6">
        {/* QR Code display */}
        <div className="text-center">
          <div className="inline-block rounded-2xl bg-white p-4 shadow-lg">
            {/* Placeholder QR - in production use actual QR library */}
            <div className="flex h-48 w-48 items-center justify-center rounded-xl bg-gray-100">
              <QrCode size={120} weight="duotone" className="text-gray-800" />
            </div>
          </div>
          <p className="text-theme-text-secondary mt-4 text-sm">Mostra questo QR al cliente</p>
        </div>

        {/* Payment details */}
        <div className="bg-theme-bg-secondary space-y-2 rounded-2xl p-4">
          <div className="flex justify-between text-sm">
            <span className="text-theme-text-secondary">Importo</span>
            <span className="text-theme-text-primary font-bold">{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-theme-text-secondary">Chain</span>
            <span className="text-theme-text-primary font-medium">{selectedChainInfo?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-theme-text-secondary">Token</span>
            <span className="text-theme-text-primary font-medium">
              {selectedToken === 'native' ? selectedChainInfo?.symbol : selectedToken.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Wallet address */}
        <button
          onClick={handleCopyAddress}
          className="bg-theme-bg-secondary flex w-full items-center justify-between rounded-xl p-3"
        >
          <span className="text-theme-text-secondary font-mono text-sm">0x1234...5678</span>
          {copied ? (
            <Check size={20} weight="bold" className="text-green-500" />
          ) : (
            <Copy size={20} weight="bold" className="text-theme-text-tertiary" />
          )}
        </button>

        {/* Status */}
        {isWaiting ? (
          <div className="py-4 text-center">
            <Spinner
              size={32}
              weight="bold"
              className="text-theme-brand-primary mx-auto mb-2 animate-spin"
            />
            <p className="text-theme-text-secondary">In attesa del pagamento...</p>
            {/* Dev button to simulate payment */}
            <button
              onClick={handleSimulatePayment}
              className="text-theme-text-tertiary mt-4 text-xs underline"
            >
              (Dev: Simula pagamento ricevuto)
            </button>
          </div>
        ) : (
          <button
            onClick={handleConfirmPayment}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-4 text-lg font-bold text-white"
          >
            <CheckCircle size={24} weight="bold" />
            Pagamento confermato
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Total */}
      <div className="rounded-2xl bg-orange-50 py-4 text-center dark:bg-orange-900/20">
        <CurrencyBtc
          size={40}
          weight="duotone"
          className="mx-auto mb-2 text-orange-600 dark:text-orange-400"
        />
        <p className="text-sm text-orange-700 dark:text-orange-300">Totale</p>
        <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">
          {formatCurrency(total)}
        </p>
      </div>

      {/* Chain selection */}
      <div className="space-y-3">
        <p className="text-theme-text-secondary text-sm font-medium">Seleziona blockchain</p>
        <div className="grid grid-cols-2 gap-2">
          {availableChains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => {
                setSelectedChain(chain.id);
                setSelectedToken('native');
              }}
              className={`rounded-xl border-2 p-3 transition-all ${
                selectedChain === chain.id
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-theme-border-light hover:border-theme-border-medium'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-8 w-8 rounded-lg ${chain.color} flex items-center justify-center font-bold text-white`}
                >
                  {chain.icon}
                </span>
                <div className="text-left">
                  <p className="text-theme-text-primary text-sm font-semibold">{chain.name}</p>
                  <p className="text-theme-text-tertiary text-xs">{chain.symbol}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Token selection */}
      {selectedChain && (
        <div className="space-y-3">
          <p className="text-theme-text-secondary text-sm font-medium">Seleziona token</p>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedToken('native')}
              className={`flex-1 rounded-xl border-2 p-3 transition-all ${
                selectedToken === 'native'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-theme-border-light'
              }`}
            >
              <span className="text-sm font-semibold">{selectedChainInfo?.symbol}</span>
            </button>
            {stablecoins
              .filter((s) => s.chains.includes(selectedChain))
              .map((stable) => (
                <button
                  key={stable.id}
                  onClick={() => setSelectedToken(stable.id as 'usdc' | 'usdt')}
                  className={`flex-1 rounded-xl border-2 p-3 transition-all ${
                    selectedToken === stable.id
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-theme-border-light'
                  }`}
                >
                  <span className="text-sm font-semibold">{stable.name}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Generate QR button */}
      <button
        onClick={handleGenerateQR}
        disabled={!selectedChain || isGenerating}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 text-lg font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <Spinner size={24} weight="bold" className="animate-spin" />
            Generazione QR...
          </>
        ) : (
          <>
            <QrCode size={24} weight="bold" />
            Genera QR Code
          </>
        )}
      </button>
    </div>
  );
}
