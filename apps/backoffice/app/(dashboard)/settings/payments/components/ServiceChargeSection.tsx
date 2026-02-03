import type { Dispatch, SetStateAction } from 'react';
import { Receipt } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import type { PaymentSettings } from './types';

interface ServiceChargeSectionProps {
  settings: PaymentSettings;
  setSettings: Dispatch<SetStateAction<PaymentSettings>>;
}

export function ServiceChargeSection({ settings, setSettings }: ServiceChargeSectionProps) {
  const t = useTranslations('paymentsPage');

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
            <Receipt className="h-5 w-5 text-purple-600" weight="duotone" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{t('taxTips.serviceCharge.title')}</h3>
            <p className="text-sm text-gray-500">{t('taxTips.serviceCharge.description')}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-5">
        {/* Enable Service Charge */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-gray-900">{t('taxTips.serviceCharge.enable')}</span>
            <p className="text-sm text-gray-500">{t('taxTips.serviceCharge.enableDesc')}</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={settings.serviceChargeEnabled}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, serviceChargeEnabled: e.target.checked }))
              }
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300"></div>
          </label>
        </div>

        {settings.serviceChargeEnabled && (
          <>
            {/* Service Charge Percentage and Label */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('taxTips.serviceCharge.percentage')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.01}
                    value={settings.serviceChargePercentage}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        serviceChargePercentage: parseFloat(e.target.value) || 0,
                      }))
                    }
                    placeholder={t('taxTips.serviceCharge.percentagePlaceholder')}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-8 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t('taxTips.serviceCharge.label')}
                </label>
                <input
                  type="text"
                  value={settings.serviceChargeLabel}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, serviceChargeLabel: e.target.value }))
                  }
                  placeholder={t('taxTips.serviceCharge.labelPlaceholder')}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
                <p className="mt-1 text-xs text-gray-500">{t('taxTips.serviceCharge.labelHint')}</p>
              </div>
            </div>

            {/* Calculation Base */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('taxTips.serviceCharge.calculationBase')}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      serviceChargeCalculationBase: 'pre_tax',
                    }))
                  }
                  className={`flex-1 rounded-lg border-2 px-4 py-2 text-center transition-colors ${
                    settings.serviceChargeCalculationBase === 'pre_tax'
                      ? 'border-purple-500 bg-purple-50 font-medium text-purple-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {t('taxTips.serviceCharge.preTax')}
                </button>
                <button
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      serviceChargeCalculationBase: 'post_tax',
                    }))
                  }
                  className={`flex-1 rounded-lg border-2 px-4 py-2 text-center transition-colors ${
                    settings.serviceChargeCalculationBase === 'post_tax'
                      ? 'border-purple-500 bg-purple-50 font-medium text-purple-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {t('taxTips.serviceCharge.postTax')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
