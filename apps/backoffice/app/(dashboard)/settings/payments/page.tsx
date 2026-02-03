'use client';

import { useState, useEffect } from 'react';
import { SpinnerGap, WarningCircle } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';

import type { PaymentSettings, SupportedCrypto, CryptoWallet, ActiveTab } from './components/types';
import { PaymentsTabs } from './components/PaymentsTabs';
import { FiatTab } from './components/FiatTab';
import { CryptoTab } from './components/CryptoTab';
import { TaxTipsTab } from './components/TaxTipsTab';
import { SaveButton } from './components/SaveButton';

// ============================================================================
// Component
// ============================================================================

export default function PaymentsSettingsPage() {
  const t = useTranslations('paymentsPage');
  const { brand, location } = useTenant();
  const merchantId = location?.id || brand?.id;

  const [activeTab, setActiveTab] = useState<ActiveTab>('crypto');
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
    // Tax
    taxEnabled: false,
    taxPercentage: 0,
    taxDisplayMode: 'inclusive',
    taxLabel: 'VAT',
    // Tips
    tipsEnabled: false,
    tipPresets: [10, 15, 20],
    tipAllowCustom: true,
    tipCalculationBase: 'pre_tax',
    // Service Charge
    serviceChargeEnabled: false,
    serviceChargePercentage: 0,
    serviceChargeLabel: 'Service Charge',
    serviceChargeCalculationBase: 'pre_tax',
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
        <SpinnerGap className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <InfoTooltip contentKey="pages.payments" kbPageId="settings-payments" />
        </div>
        <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
      </div>

      {/* Tabs */}
      <PaymentsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        enabledFiatCount={enabledFiatCount}
        enabledCryptoCount={enabledCryptoCount}
      />

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <WarningCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'fiat' && <FiatTab settings={settings} setSettings={setSettings} />}

      {activeTab === 'crypto' && (
        <CryptoTab
          settings={settings}
          setSettings={setSettings}
          supportedCryptos={supportedCryptos}
          updateCryptoWallet={updateCryptoWallet}
        />
      )}

      {activeTab === 'taxTips' && <TaxTipsTab settings={settings} setSettings={setSettings} />}

      {/* Save Button */}
      <SaveButton isSaving={isSaving} saveSuccess={saveSuccess} onSave={handleSave} />
    </div>
  );
}
