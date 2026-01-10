'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import {
  getCryptoPrices,
  convertFiatToCrypto,
  formatCryptoAmount,
  getExplorerTxUrl,
  getExplorerAddressUrl,
  getExplorerName,
  SUPPORTED_CRYPTOS,
  type CryptoPrices,
  type PriceDisplayUnit,
} from '@/lib/crypto-price-service';
import QRCode from 'qrcode';

// ============================================================================
// Types
// ============================================================================

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

interface CryptoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSubmitted: (data: CryptoPaymentData) => void;
  amount: number;
  currency: string;
  merchantSettings: MerchantCryptoSettings;
  orderId?: string;
}

interface CryptoPaymentData {
  cryptocurrency: string;
  walletAddress: string;
  cryptoAmount: number;
  fiatAmount: number;
  txHash?: string;
  network: string;
}

// ============================================================================
// Icons
// ============================================================================

const CryptoIcon = ({ symbol, color }: { symbol: string; color: string }) => {
  const icons: Record<string, JSX.Element> = {
    BTC: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill={color}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H11.1v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.25c.1 1.7 1.36 2.66 2.86 2.97V19h2.12v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.65-3.42z" />
      </svg>
    ),
    ETH: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill={color}>
        <path d="M12 1.75l-6.25 10.5L12 16l6.25-3.75L12 1.75zM5.75 13.5L12 22.25l6.25-8.75L12 17.25 5.75 13.5z" />
      </svg>
    ),
    SOL: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill={color}>
        <path
          d="M4 8h12l4 4-4 4H4l4-4-4-4zm0 8h12l4-4M4 4h12l4 4"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  };

  return (
    icons[symbol] || (
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {symbol.slice(0, 2)}
      </div>
    )
  );
};

// ============================================================================
// Component
// ============================================================================

export function CryptoPaymentModal({
  isOpen,
  onClose,
  onPaymentSubmitted,
  amount,
  currency,
  merchantSettings,
  orderId,
}: CryptoPaymentModalProps) {
  const [step, setStep] = useState<'select' | 'pay' | 'confirm'>('select');
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [prices, setPrices] = useState<CryptoPrices | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [txHash, setTxHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [priceAge, setPriceAge] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const swipe = useSwipeToDismiss({ isOpen, onClose });

  // Get enabled wallets from merchant settings
  const enabledWallets = Object.entries(merchantSettings.cryptoWallets)
    .filter(([_, wallet]) => wallet.enabled && wallet.address)
    .map(([sym, wallet]) => {
      const cryptoInfo = SUPPORTED_CRYPTOS[sym];
      return {
        ...wallet,
        ...cryptoInfo,
        symbol: sym, // Ensure symbol is set correctly
      };
    });

  // Load crypto prices
  useEffect(() => {
    if (!isOpen) return;

    const loadPrices = async () => {
      setIsLoading(true);
      const cryptoPrices = await getCryptoPrices();
      setPrices(cryptoPrices);
      setIsLoading(false);
    };

    loadPrices();

    // Refresh prices every 30 seconds
    const interval = setInterval(loadPrices, 30000);

    // Update price age every second
    const ageInterval = setInterval(() => {
      setPriceAge((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(ageInterval);
    };
  }, [isOpen]);

  // Generate QR code when crypto is selected
  useEffect(() => {
    if (!selectedCrypto || step !== 'pay') return;

    const wallet = merchantSettings.cryptoWallets[selectedCrypto];
    if (!wallet?.address) return;

    QRCode.toDataURL(wallet.address, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [selectedCrypto, step, merchantSettings.cryptoWallets]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('select');
      setSelectedCrypto(null);
      setTxHash('');
      setCopied(false);
      setPriceAge(0);
    }
  }, [isOpen]);

  const handleCryptoSelect = (symbol: string) => {
    setSelectedCrypto(symbol);
    setStep('pay');
  };

  const handleCopy = useCallback(async () => {
    if (!selectedCrypto) return;
    const wallet = merchantSettings.cryptoWallets[selectedCrypto];
    if (!wallet?.address) return;

    try {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [selectedCrypto, merchantSettings.cryptoWallets]);

  const handleSubmitPayment = () => {
    if (!selectedCrypto || !prices) return;

    const wallet = merchantSettings.cryptoWallets[selectedCrypto];
    const cryptoAmount = convertFiatToCrypto(
      amount,
      selectedCrypto,
      prices,
      merchantSettings.cryptoPriceBufferPercent
    );

    const paymentData: CryptoPaymentData = {
      cryptocurrency: selectedCrypto,
      walletAddress: wallet.address,
      cryptoAmount,
      fiatAmount: amount,
      txHash: txHash || undefined,
      network: wallet.network || SUPPORTED_CRYPTOS[selectedCrypto]?.network || 'unknown',
    };

    onPaymentSubmitted(paymentData);
    setStep('confirm');
  };

  const getCryptoAmount = (symbol: string): number => {
    if (!prices) return 0;
    return convertFiatToCrypto(amount, symbol, prices, merchantSettings.cryptoPriceBufferPercent);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[80]" style={swipe.getBackdropStyle()} onClick={onClose} />

      {/* Bottom Sheet */}
      <div
        className="bg-theme-bg-elevated fixed bottom-0 left-0 right-0 z-[90] max-h-[90vh] select-none overflow-hidden rounded-t-3xl shadow-2xl"
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
            <div className="flex items-center gap-3">
              {step !== 'select' && (
                <button
                  onClick={() => setStep(step === 'confirm' ? 'pay' : 'select')}
                  className="hover:bg-theme-bg-secondary -ml-2 rounded-full p-2"
                >
                  <svg
                    className="text-theme-text-secondary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
              <h2 className="text-theme-text-primary text-xl font-bold">
                {step === 'select' && 'Paga in Crypto'}
                {step === 'pay' && `Paga con ${selectedCrypto}`}
                {step === 'confirm' && 'Pagamento Inviato'}
              </h2>
            </div>
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

          {/* Amount Display */}
          <div className="bg-theme-bg-secondary mt-3 rounded-xl p-3">
            <div className="text-theme-text-secondary text-sm">Totale da pagare</div>
            <div className="text-theme-text-primary text-2xl font-bold">
              {new Intl.NumberFormat('it-IT', {
                style: 'currency',
                currency: currency,
              }).format(amount)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-200px)] overflow-y-auto px-6 py-4">
          {/* Step 1: Select Cryptocurrency */}
          {step === 'select' && (
            <div className="space-y-3">
              {isLoading ? (
                <div className="py-8 text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  <p className="text-theme-text-secondary mt-2 text-sm">Caricamento prezzi...</p>
                </div>
              ) : enabledWallets.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-theme-text-secondary">Nessuna criptovaluta configurata</p>
                </div>
              ) : (
                enabledWallets.map((wallet) => {
                  const cryptoAmount = getCryptoAmount(wallet.symbol);
                  return (
                    <Card
                      key={wallet.symbol}
                      variant="interactive"
                      padding="md"
                      onClick={() => handleCryptoSelect(wallet.symbol)}
                      className="w-full"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${wallet.color}20` }}
                        >
                          <CryptoIcon symbol={wallet.symbol} color={wallet.color} />
                        </div>
                        <div className="flex-1">
                          <div className="text-theme-text-primary font-semibold">{wallet.name}</div>
                          <div className="text-theme-text-secondary text-sm">{wallet.symbol}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-theme-text-primary font-mono font-semibold">
                            {formatCryptoAmount(
                              cryptoAmount,
                              wallet.symbol,
                              merchantSettings.cryptoPriceDisplayUnit
                            )}
                          </div>
                          <div className="text-theme-text-tertiary text-xs">{wallet.network}</div>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}

              {/* Price freshness indicator */}
              {prices && (
                <div className="text-theme-text-tertiary mt-4 text-center text-xs">
                  Prezzi aggiornati{' '}
                  {priceAge < 60 ? `${priceAge}s fa` : `${Math.floor(priceAge / 60)}m fa`}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Show QR Code and Payment Details */}
          {step === 'pay' && selectedCrypto && (
            <div className="space-y-4">
              {/* QR Code */}
              <div className="flex flex-col items-center">
                {qrDataUrl ? (
                  <div className="rounded-xl bg-white p-4">
                    <img src={qrDataUrl} alt="Wallet QR Code" className="h-48 w-48" />
                  </div>
                ) : (
                  <div className="flex h-48 w-48 items-center justify-center rounded-xl bg-gray-100">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  </div>
                )}
                <p className="text-theme-text-secondary mt-2 text-sm">
                  Scansiona con il tuo wallet
                </p>
              </div>

              {/* Amount to Send */}
              <div className="bg-theme-bg-secondary rounded-xl p-4">
                <div className="text-theme-text-secondary mb-1 text-sm">
                  Importo esatto da inviare
                </div>
                <div className="text-theme-text-primary font-mono text-2xl font-bold">
                  {formatCryptoAmount(getCryptoAmount(selectedCrypto), selectedCrypto, 'standard')}
                </div>
                <div className="mt-1 text-xs text-orange-600">
                  Incluso buffer {merchantSettings.cryptoPriceBufferPercent}% per volatilita
                </div>
              </div>

              {/* Wallet Address */}
              <div className="bg-theme-bg-secondary rounded-xl p-4">
                <div className="text-theme-text-secondary mb-1 text-sm">Indirizzo wallet</div>
                <div className="flex items-center gap-2">
                  <code className="text-theme-text-primary flex-1 break-all font-mono text-xs">
                    {merchantSettings.cryptoWallets[selectedCrypto]?.address}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="bg-theme-bg-tertiary hover:bg-theme-bg-elevated rounded-lg p-2"
                  >
                    {copied ? (
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="text-theme-text-secondary h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Transaction Hash Input (Optional) */}
              <div className="bg-theme-bg-secondary rounded-xl p-4">
                <div className="text-theme-text-secondary mb-2 text-sm">
                  Transaction Hash <span className="text-theme-text-tertiary">(opzionale)</span>
                </div>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="0x... o txid"
                  className="bg-theme-bg-elevated border-theme-bg-tertiary text-theme-text-primary placeholder-theme-text-tertiary w-full rounded-lg border px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-theme-text-tertiary mt-1 text-xs">
                  Inserisci il tx hash per velocizzare la verifica
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 'confirm' && selectedCrypto && (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-theme-text-primary text-lg font-semibold">
                  Richiesta Inviata!
                </h3>
                <p className="text-theme-text-secondary mt-1 text-sm">
                  Lo staff verifichera il pagamento sulla blockchain
                </p>
              </div>

              {txHash && (
                <div className="bg-theme-bg-secondary rounded-xl p-4">
                  <div className="text-theme-text-secondary mb-1 text-sm">Transaction Hash</div>
                  <code className="text-theme-text-primary break-all font-mono text-xs">
                    {txHash}
                  </code>
                  {(() => {
                    const wallet = merchantSettings.cryptoWallets[selectedCrypto];
                    const network = wallet?.network || SUPPORTED_CRYPTOS[selectedCrypto]?.network;
                    const explorerUrl = network ? getExplorerTxUrl(network, txHash) : null;
                    const explorerName = network ? getExplorerName(network) : null;

                    if (explorerUrl) {
                      return (
                        <a
                          href={explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Verifica su {explorerName}
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}

              <p className="text-theme-text-tertiary text-xs">
                Tempo stimato per conferma: 1-10 minuti
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-theme-bg-elevated border-theme-bg-tertiary sticky bottom-0 border-t p-6">
          {step === 'pay' && (
            <Button onClick={handleSubmitPayment} variant="primary" size="lg" className="w-full">
              Ho Pagato
            </Button>
          )}
          {step === 'confirm' && (
            <Button onClick={onClose} variant="primary" size="lg" className="w-full">
              Chiudi
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default CryptoPaymentModal;
