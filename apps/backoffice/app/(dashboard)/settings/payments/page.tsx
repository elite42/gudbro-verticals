'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Wallet, Loader2, Check, AlertCircle } from 'lucide-react';
import { useTenant } from '@/lib/contexts/TenantContext';
import { CryptoWalletInput } from '@/components/settings/CryptoWalletInput';

// ============================================================================
// Types
// ============================================================================

interface CryptoWallet {
  address: string;
  enabled: boolean;
  network?: string;
}

interface CryptoWallets {
  [symbol: string]: CryptoWallet;
}

interface PaymentSettings {
  merchantId: string;
  // Fiat
  stripeEnabled: boolean;
  stripeAccountId: string;
  paypalEnabled: boolean;
  paypalClientId: string;
  applePayEnabled: boolean;
  googlePayEnabled: boolean;
  samsungPayEnabled: boolean;
  // Crypto
  cryptoEnabled: boolean;
  cryptoWallets: CryptoWallets;
  cryptoShowPricesInMenu: boolean;
  cryptoPriceDisplayUnit: 'standard' | 'milli' | 'micro';
  cryptoPaymentTimeoutMinutes: number;
}

interface SupportedCrypto {
  symbol: string;
  name: string;
  network: string;
  color: string;
  address_regex: string;
  address_example: string;
  explorer_name: string;
  explorer_address_url_template: string;
}

// ============================================================================
// Component
// ============================================================================

export default function PaymentsSettingsPage() {
  const { brand, location } = useTenant();
  const merchantId = location?.id || brand?.id;

  const [activeTab, setActiveTab] = useState<'fiat' | 'crypto'>('crypto');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [supportedCryptos, setSupportedCryptos] = useState<SupportedCrypto[]>([]);
  const [settings, setSettings] = useState<PaymentSettings>({
    merchantId: '',
    stripeEnabled: false,
    stripeAccountId: '',
    paypalEnabled: false,
    paypalClientId: '',
    applePayEnabled: false,
    googlePayEnabled: false,
    samsungPayEnabled: false,
    cryptoEnabled: false,
    cryptoWallets: {},
    cryptoShowPricesInMenu: false,
    cryptoPriceDisplayUnit: 'milli',
    cryptoPaymentTimeoutMinutes: 30,
  });

  // Load settings on mount
  useEffect(() => {
    if (!merchantId) return;

    const loadSettings = async () => {
      try {
        const response = await fetch(`/api/settings/payments?merchantId=${merchantId}`);
        const data = await response.json();

        if (data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
        if (data.supportedCryptos) {
          setSupportedCryptos(data.supportedCryptos);
        }
      } catch (err) {
        console.error('Error loading payment settings:', err);
        setError('Failed to load payment settings');
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [merchantId]);

  // Save settings
  const handleSave = async () => {
    if (!merchantId) {
      setError('No merchant selected');
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);

    try {
      const response = await fetch('/api/settings/payments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, merchantId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save settings');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Update crypto wallet
  const updateCryptoWallet = (symbol: string, updates: Partial<CryptoWallet>) => {
    setSettings((prev) => ({
      ...prev,
      cryptoWallets: {
        ...prev.cryptoWallets,
        [symbol]: {
          ...prev.cryptoWallets[symbol],
          ...updates,
        },
      },
    }));
  };

  // Count enabled
  const enabledFiatCount = [
    settings.stripeEnabled,
    settings.paypalEnabled,
    settings.applePayEnabled,
    settings.googlePayEnabled,
    settings.samsungPayEnabled,
  ].filter(Boolean).length;

  const enabledCryptoCount = Object.values(settings.cryptoWallets).filter((w) => w?.enabled).length;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Configure how customers can pay at your venue.</p>
      </div>

      {/* Tabs */}
      <div className="flex w-fit gap-2 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab('fiat')}
          className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'fiat'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <CreditCard className="h-4 w-4" />
          Fiat ({enabledFiatCount})
        </button>
        <button
          onClick={() => setActiveTab('crypto')}
          className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'crypto'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Wallet className="h-4 w-4" />
          Crypto ({enabledCryptoCount})
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* ================================================================ */}
      {/* FIAT TAB */}
      {/* ================================================================ */}
      {activeTab === 'fiat' && (
        <div className="space-y-4">
          {/* Info Banner */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              Configure traditional payment methods. Some methods require additional setup in their
              respective dashboards.
            </p>
          </div>

          {/* Stripe */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#635BFF">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Stripe</h3>
                  <p className="text-sm text-gray-500">
                    Accept cards, Apple Pay, Google Pay via Stripe
                  </p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.stripeEnabled}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, stripeEnabled: e.target.checked }))
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
              </label>
            </div>
            {settings.stripeEnabled && (
              <div className="border-t border-gray-100 px-5 pb-5 pt-3">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Stripe Account ID
                </label>
                <input
                  type="text"
                  value={settings.stripeAccountId}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, stripeAccountId: e.target.value }))
                  }
                  placeholder="acct_..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>

          {/* PayPal */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#003087">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">PayPal</h3>
                  <p className="text-sm text-gray-500">Accept PayPal payments</p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.paypalEnabled}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, paypalEnabled: e.target.checked }))
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
              </label>
            </div>
            {settings.paypalEnabled && (
              <div className="border-t border-gray-100 px-5 pb-5 pt-3">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  PayPal Client ID
                </label>
                <input
                  type="text"
                  value={settings.paypalClientId}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, paypalClientId: e.target.value }))
                  }
                  placeholder="Your PayPal Client ID"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Mobile Pay */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 font-semibold text-gray-900">Mobile Payments</h3>
            <div className="space-y-4">
              {/* Apple Pay */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Apple Pay</span>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={settings.applePayEnabled}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, applePayEnabled: e.target.checked }))
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-black peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>

              {/* Google Pay */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Google Pay</span>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={settings.googlePayEnabled}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, googlePayEnabled: e.target.checked }))
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>

              {/* Samsung Pay */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900">
                    <span className="text-xs font-bold text-white">S</span>
                  </div>
                  <span className="font-medium text-gray-900">Samsung Pay</span>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={settings.samsungPayEnabled}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, samsungPayEnabled: e.target.checked }))
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-900 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* CRYPTO TAB */}
      {/* ================================================================ */}
      {activeTab === 'crypto' && (
        <div className="space-y-4">
          {/* Master Toggle */}
          <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                  <span className="text-2xl">₿</span>
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
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
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
                          { value: 'micro', label: 'μBTC', example: '450 μBTC' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() =>
                              setSettings((prev) => ({
                                ...prev,
                                cryptoPriceDisplayUnit: option.value as
                                  | 'standard'
                                  | 'milli'
                                  | 'micro',
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
                    <span className="text-lg">💡</span>
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
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
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
      )}

      {/* ================================================================ */}
      {/* SAVE BUTTON */}
      {/* ================================================================ */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <div>
          {saveSuccess && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <Check className="h-4 w-4" />
              Settings saved successfully!
            </span>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>
    </div>
  );
}
