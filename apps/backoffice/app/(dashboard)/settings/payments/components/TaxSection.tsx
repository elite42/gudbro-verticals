import type { Dispatch, SetStateAction } from 'react';
import { Percent } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import type { PaymentSettings } from './types';

interface TaxSectionProps {
  settings: PaymentSettings;
  setSettings: Dispatch<SetStateAction<PaymentSettings>>;
}

export function TaxSection({ settings, setSettings }: TaxSectionProps) {
  const t = useTranslations('paymentsPage');

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <Percent className="h-5 w-5 text-blue-600" weight="duotone" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{t('taxTips.tax.title')}</h3>
            <p className="text-sm text-gray-500">{t('taxTips.tax.description')}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-5">
        {/* Enable Tax */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-gray-900">{t('taxTips.tax.enable')}</span>
            <p className="text-sm text-gray-500">{t('taxTips.tax.enableDesc')}</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={settings.taxEnabled}
              onChange={(e) => setSettings((prev) => ({ ...prev, taxEnabled: e.target.checked }))}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
          </label>
        </div>

        {settings.taxEnabled && (
          <>
            {/* Tax Percentage */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('taxTips.tax.percentage')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.01}
                    value={settings.taxPercentage}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        taxPercentage: parseFloat(e.target.value) || 0,
                      }))
                    }
                    placeholder={t('taxTips.tax.percentagePlaceholder')}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-8 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('taxTips.tax.label')}
                </label>
                <input
                  type="text"
                  value={settings.taxLabel}
                  onChange={(e) => setSettings((prev) => ({ ...prev, taxLabel: e.target.value }))}
                  placeholder={t('taxTips.tax.labelPlaceholder')}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">{t('taxTips.tax.labelHint')}</p>
              </div>
            </div>

            {/* Display Mode */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('taxTips.tax.displayMode')}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSettings((prev) => ({ ...prev, taxDisplayMode: 'inclusive' }))}
                  className={`flex-1 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
                    settings.taxDisplayMode === 'inclusive'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{t('taxTips.tax.inclusive')}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {'\u20AC'}10.00 = {'\u20AC'}10.00
                  </div>
                </button>
                <button
                  onClick={() => setSettings((prev) => ({ ...prev, taxDisplayMode: 'exclusive' }))}
                  className={`flex-1 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
                    settings.taxDisplayMode === 'exclusive'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{t('taxTips.tax.exclusive')}</div>
                  <div className="mt-1 text-xs text-gray-500">
                    {'\u20AC'}10.00 + {settings.taxPercentage}% = {'\u20AC'}
                    {(10 * (1 + settings.taxPercentage / 100)).toFixed(2)}
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
