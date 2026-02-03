'use client';

import { useState, useEffect, useCallback } from 'react';
import { Copy, Check, ArrowSquareOut, WarningCircle } from '@phosphor-icons/react';
import QRCode from 'qrcode';

// ============================================================================
// Types
// ============================================================================

interface CryptoInfo {
  symbol: string;
  name: string;
  network: string;
  color: string;
  addressRegex: string;
  addressExample: string;
  explorerName: string;
  explorerAddressUrl: string;
}

interface CryptoWalletInputProps {
  crypto: CryptoInfo;
  address: string;
  enabled: boolean;
  network?: string;
  onAddressChange: (address: string) => void;
  onEnabledChange: (enabled: boolean) => void;
  onNetworkChange?: (network: string) => void;
  availableNetworks?: string[];
}

// ============================================================================
// Crypto Icons
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

export function CryptoWalletInput({
  crypto,
  address,
  enabled,
  network,
  onAddressChange,
  onEnabledChange,
  onNetworkChange,
  availableNetworks,
}: CryptoWalletInputProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  // Validate address format
  const validateAddress = useCallback(
    (addr: string) => {
      if (!addr) {
        setIsValid(null);
        return;
      }
      try {
        const regex = new RegExp(crypto.addressRegex);
        setIsValid(regex.test(addr));
      } catch {
        setIsValid(null);
      }
    },
    [crypto.addressRegex]
  );

  useEffect(() => {
    validateAddress(address);
  }, [address, validateAddress]);

  // Generate QR code
  useEffect(() => {
    if (address && isValid) {
      QRCode.toDataURL(address, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
        .then(setQrDataUrl)
        .catch(() => setQrDataUrl(null));
    } else {
      setQrDataUrl(null);
    }
  }, [address, isValid]);

  // Copy to clipboard
  const handleCopy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Open in block explorer
  const openExplorer = () => {
    if (!address || !crypto.explorerAddressUrl) return;
    const url = crypto.explorerAddressUrl.replace('{address}', address);
    window.open(url, '_blank');
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gray-50 p-4">
        <div className="flex items-center gap-3">
          <CryptoIcon symbol={crypto.symbol} color={crypto.color} />
          <div>
            <h3 className="font-medium text-gray-900">{crypto.name}</h3>
            <p className="text-sm text-gray-500">
              {crypto.symbol} - {crypto.network}
            </p>
          </div>
        </div>

        {/* Enable Toggle */}
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onEnabledChange(e.target.checked)}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
        </label>
      </div>

      {/* Body - Only show when enabled */}
      {enabled && (
        <div className="space-y-4 p-4">
          {/* Network Selector (for multi-network tokens like USDC) */}
          {availableNetworks && availableNetworks.length > 1 && onNetworkChange && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Network</label>
              <select
                value={network || crypto.network}
                onChange={(e) => onNetworkChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                {availableNetworks.map((net) => (
                  <option key={net} value={net}>
                    {net.charAt(0).toUpperCase() + net.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Wallet Address Input */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Wallet Address</label>
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => onAddressChange(e.target.value)}
                placeholder={crypto.addressExample}
                className={`w-full rounded-lg border px-3 py-2 pr-24 font-mono text-sm focus:outline-none focus:ring-2 ${
                  isValid === null
                    ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    : isValid
                      ? 'border-green-500 bg-green-50 focus:ring-green-500'
                      : 'border-red-500 bg-red-50 focus:ring-red-500'
                }`}
              />

              {/* Action Buttons */}
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                {address && (
                  <>
                    <button
                      onClick={handleCopy}
                      className="rounded p-1.5 text-gray-400 hover:text-gray-600"
                      title="Copy address"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    {crypto.explorerAddressUrl && (
                      <button
                        onClick={openExplorer}
                        className="rounded p-1.5 text-gray-400 hover:text-gray-600"
                        title={`View on ${crypto.explorerName}`}
                      >
                        <ArrowSquareOut className="h-4 w-4" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Validation Message */}
            {isValid === false && (
              <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                <WarningCircle className="h-4 w-4" />
                <span>Invalid {crypto.symbol} address format</span>
              </div>
            )}

            {/* Example */}
            <p className="mt-1 text-xs text-gray-400">
              Example: {crypto.addressExample.slice(0, 20)}...
            </p>
          </div>

          {/* QR Code Preview */}
          {qrDataUrl && (
            <div>
              <button
                onClick={() => setShowQR(!showQR)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {showQR ? 'Hide' : 'Show'} QR Code
              </button>

              {showQR && (
                <div className="mt-2 inline-block rounded-lg border bg-white p-4">
                  <img src={qrDataUrl} alt={`${crypto.symbol} wallet QR`} className="h-32 w-32" />
                  <p className="mt-2 text-center text-xs text-gray-500">Scan to get address</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CryptoWalletInput;
