import type { Dispatch, SetStateAction } from 'react';
import { WarningCircle } from '@phosphor-icons/react';
import { CryptoWalletInput } from '@/components/settings/CryptoWalletInput';
import type { PaymentSettings, SupportedCrypto, CryptoWallet } from './types';

interface CryptoTabProps {
  settings: PaymentSettings;
  setSettings: Dispatch<SetStateAction<PaymentSettings>>;
  supportedCryptos: SupportedCrypto[];
  updateCryptoWallet: (symbol: string, updates: Partial<CryptoWallet>) => void;
}

export function CryptoTab({
  settings,
  setSettings,
  supportedCryptos,
  updateCryptoWallet,
}: CryptoTabProps) {
  return (
    <div className="space-y-4">
      {/* Master Toggle */}
      <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <span className="text-2xl">{'\u20BF'}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Enable Cryptocurrency Payments</h3>
              <p className="text-sm text-gray-600">
                Accept BTC, ETH, USDC, and other cryptocurrencies
              </p>
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={settings.cryptoEnabled}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, cryptoEnabled: e.target.checked }))
              }
              className="peer sr-only"
            />
            <div className="peer h-7 w-14 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300"></div>
          </label>
        </div>
      </div>

      {settings.cryptoEnabled && (
        <>
          {/* Info Banner */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex gap-3">
              <WarningCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-900">How Crypto Payments Work</h4>
                <p className="mt-1 text-sm text-blue-700">
                  1. Enter your wallet address for each cryptocurrency you want to accept
                  <br />
                  2. When a customer pays, they&apos;ll see a QR code with your wallet address
                  <br />
                  3. After sending, they mark the order as paid
                  <br />
                  4. You verify the payment on the blockchain explorer
                </p>
              </div>
            </div>
          </div>

          {/* Display Options */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 font-semibold text-gray-900">Display Options</h3>
            <div className="space-y-4">
              {/* Show prices in menu */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">Show crypto prices in menu</span>
                  <p className="text-sm text-gray-500">
                    Display crypto equivalent next to fiat prices
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={settings.cryptoShowPricesInMenu}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        cryptoShowPricesInMenu: e.target.checked,
                      }))
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>

              {/* Price display unit */}
              {settings.cryptoShowPricesInMenu && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Bitcoin display format
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: 'standard', label: 'BTC', example: '0.00045 BTC' },
                      { value: 'milli', label: 'mBTC', example: '0.45 mBTC' },
                      { value: 'micro', label: '\u03BCBTC', example: '450 \u03BCBTC' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          setSettings((prev) => ({
                            ...prev,
                            cryptoPriceDisplayUnit: option.value as 'standard' | 'milli' | 'micro',
                          }))
                        }
                        className={`flex-1 rounded-lg border-2 px-4 py-3 transition-colors ${
                          settings.cryptoPriceDisplayUnit === option.value
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <div className="mt-1 text-xs text-gray-500">{option.example}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment timeout */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Payment timeout (minutes)
                </label>
                <input
                  type="number"
                  min={5}
                  max={120}
                  value={settings.cryptoPaymentTimeoutMinutes}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      cryptoPaymentTimeoutMinutes: parseInt(e.target.value) || 30,
                    }))
                  }
                  className="w-32 rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Time limit for customer to complete payment
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Addresses */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Wallet Addresses</h3>
            {supportedCryptos.map((crypto) => (
              <CryptoWalletInput
                key={crypto.symbol}
                crypto={{
                  symbol: crypto.symbol,
                  name: crypto.name,
                  network: crypto.network,
                  color: crypto.color,
                  addressRegex: crypto.address_regex,
                  addressExample: crypto.address_example,
                  explorerName: crypto.explorer_name,
                  explorerAddressUrl: crypto.explorer_address_url_template,
                }}
                address={settings.cryptoWallets[crypto.symbol]?.address || ''}
                enabled={settings.cryptoWallets[crypto.symbol]?.enabled || false}
                network={settings.cryptoWallets[crypto.symbol]?.network}
                onAddressChange={(address) => updateCryptoWallet(crypto.symbol, { address })}
                onEnabledChange={(enabled) => updateCryptoWallet(crypto.symbol, { enabled })}
                onNetworkChange={(network) => updateCryptoWallet(crypto.symbol, { network })}
                availableNetworks={
                  ['USDC', 'USDT'].includes(crypto.symbol)
                    ? ['ethereum', 'polygon', 'arbitrum']
                    : undefined
                }
              />
            ))}

            {supportedCryptos.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                <p>No supported cryptocurrencies found.</p>
                <p className="text-sm">Make sure the database migration was applied.</p>
              </div>
            )}
          </div>

          {/* Request New Crypto */}
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                <span className="text-lg">{'\uD83D\uDCA1'}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Missing a cryptocurrency?</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Don&apos;t see the crypto you want to accept? Let us know and we&apos;ll add
                  support for it!
                </p>
                <a
                  href="mailto:support@gudbro.com?subject=Cryptocurrency Request&body=Hi GUDBRO team,%0A%0AI would like to request support for the following cryptocurrency:%0A%0ACryptocurrency name: %0ASymbol: %0ANetwork/Chain: %0A%0AThank you!"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-200"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Request a Crypto
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
