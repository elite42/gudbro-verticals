'use client';

/**
 * Crypto Payment Component
 *
 * Handles cryptocurrency payment with QR code generation.
 */

import { useState } from 'react';
import { CurrencyBtc, QrCode, CheckCircle, Spinner, Copy, Check } from '@phosphor-icons/react';

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

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
          <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
            {/* Placeholder QR - in production use actual QR library */}
            <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
              <QrCode size={120} weight="duotone" className="text-gray-800" />
            </div>
          </div>
          <p className="mt-4 text-sm text-theme-text-secondary">
            Mostra questo QR al cliente
          </p>
        </div>

        {/* Payment details */}
        <div className="p-4 bg-theme-bg-secondary rounded-2xl space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-theme-text-secondary">Importo</span>
            <span className="font-bold text-theme-text-primary">{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-theme-text-secondary">Chain</span>
            <span className="font-medium text-theme-text-primary">{selectedChainInfo?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-theme-text-secondary">Token</span>
            <span className="font-medium text-theme-text-primary">
              {selectedToken === 'native' ? selectedChainInfo?.symbol : selectedToken.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Wallet address */}
        <button
          onClick={handleCopyAddress}
          className="w-full p-3 bg-theme-bg-secondary rounded-xl flex items-center justify-between"
        >
          <span className="text-sm font-mono text-theme-text-secondary">
            0x1234...5678
          </span>
          {copied ? (
            <Check size={20} weight="bold" className="text-green-500" />
          ) : (
            <Copy size={20} weight="bold" className="text-theme-text-tertiary" />
          )}
        </button>

        {/* Status */}
        {isWaiting ? (
          <div className="text-center py-4">
            <Spinner size={32} weight="bold" className="animate-spin text-theme-brand-primary mx-auto mb-2" />
            <p className="text-theme-text-secondary">In attesa del pagamento...</p>
            {/* Dev button to simulate payment */}
            <button
              onClick={handleSimulatePayment}
              className="mt-4 text-xs text-theme-text-tertiary underline"
            >
              (Dev: Simula pagamento ricevuto)
            </button>
          </div>
        ) : (
          <button
            onClick={handleConfirmPayment}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg bg-green-500 text-white"
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
      <div className="text-center py-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
        <CurrencyBtc size={40} weight="duotone" className="mx-auto text-orange-600 dark:text-orange-400 mb-2" />
        <p className="text-sm text-orange-700 dark:text-orange-300">Totale</p>
        <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">
          {formatCurrency(total)}
        </p>
      </div>

      {/* Chain selection */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-theme-text-secondary">
          Seleziona blockchain
        </p>
        <div className="grid grid-cols-2 gap-2">
          {availableChains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => {
                setSelectedChain(chain.id);
                setSelectedToken('native');
              }}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedChain === chain.id
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-theme-border-light hover:border-theme-border-medium'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-8 h-8 rounded-lg ${chain.color} flex items-center justify-center text-white font-bold`}>
                  {chain.icon}
                </span>
                <div className="text-left">
                  <p className="font-semibold text-sm text-theme-text-primary">{chain.name}</p>
                  <p className="text-xs text-theme-text-tertiary">{chain.symbol}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Token selection */}
      {selectedChain && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-theme-text-secondary">
            Seleziona token
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedToken('native')}
              className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                selectedToken === 'native'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-theme-border-light'
              }`}
            >
              <span className="font-semibold text-sm">{selectedChainInfo?.symbol}</span>
            </button>
            {stablecoins
              .filter((s) => s.chains.includes(selectedChain))
              .map((stable) => (
                <button
                  key={stable.id}
                  onClick={() => setSelectedToken(stable.id as 'usdc' | 'usdt')}
                  className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                    selectedToken === stable.id
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-theme-border-light'
                  }`}
                >
                  <span className="font-semibold text-sm">{stable.name}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Generate QR button */}
      <button
        onClick={handleGenerateQR}
        disabled={!selectedChain || isGenerating}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
