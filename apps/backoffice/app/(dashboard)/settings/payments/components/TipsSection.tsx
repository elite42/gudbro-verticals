import type { Dispatch, SetStateAction } from 'react';
import { HandCoins } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import type { PaymentSettings } from './types';

interface TipsSectionProps {
  settings: PaymentSettings;
  setSettings: Dispatch<SetStateAction<PaymentSettings>>;
}

export function TipsSection({ settings, setSettings }: TipsSectionProps) {
  const t = useTranslations('paymentsPage');

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
            <HandCoins className="h-5 w-5 text-amber-600" weight="duotone" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{t('taxTips.tips.title')}</h3>
            <p className="text-sm text-gray-500">{t('taxTips.tips.description')}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-5">
        {/* Enable Tips */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-gray-900">{t('taxTips.tips.enable')}</span>
            <p className="text-sm text-gray-500">{t('taxTips.tips.enableDesc')}</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={settings.tipsEnabled}
              onChange={(e) => setSettings((prev) => ({ ...prev, tipsEnabled: e.target.checked }))}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300"></div>
          </label>
        </div>

        {settings.tipsEnabled && (
          <>
            {/* Tip Presets */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('taxTips.tips.presets')}
              </label>
              <p className="mb-2 text-xs text-gray-500">{t('taxTips.tips.presetsDesc')}</p>
              <div className="flex flex-wrap gap-2">
                {settings.tipPresets.map((preset, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2"
                  >
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={preset}
                      onChange={(e) => {
                        const newPresets = [...settings.tipPresets];
                        newPresets[idx] = parseInt(e.target.value) || 0;
                        setSettings((prev) => ({ ...prev, tipPresets: newPresets }));
                      }}
                      className="w-12 border-none bg-transparent text-center font-semibold text-amber-700 focus:outline-none"
                    />
                    <span className="text-amber-600">%</span>
                    <button
                      onClick={() => {
                        const newPresets = settings.tipPresets.filter((_, i) => i !== idx);
                        setSettings((prev) => ({ ...prev, tipPresets: newPresets }));
                      }}
                      className="ml-1 text-amber-400 hover:text-amber-600"
                    >
                      {'\u00D7'}
                    </button>
                  </div>
                ))}
                {settings.tipPresets.length < 4 && (
                  <button
                    onClick={() => {
                      setSettings((prev) => ({
                        ...prev,
                        tipPresets: [...prev.tipPresets, 25],
                      }));
                    }}
                    className="flex items-center gap-1 rounded-lg border-2 border-dashed border-gray-300 px-3 py-2 text-sm text-gray-500 hover:border-amber-400 hover:text-amber-600"
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>

            {/* Allow Custom */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900">{t('taxTips.tips.allowCustom')}</span>
                <p className="text-sm text-gray-500">{t('taxTips.tips.allowCustomDesc')}</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.tipAllowCustom}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, tipAllowCustom: e.target.checked }))
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            {/* Calculation Base */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('taxTips.tips.calculationBase')}
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, tipCalculationBase: 'pre_tax' }))
                  }
                  className={`flex-1 rounded-lg border-2 px-4 py-2 text-center transition-colors ${
                    settings.tipCalculationBase === 'pre_tax'
                      ? 'border-amber-500 bg-amber-50 font-medium text-amber-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {t('taxTips.tips.preTax')}
                </button>
                <button
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, tipCalculationBase: 'post_tax' }))
                  }
                  className={`flex-1 rounded-lg border-2 px-4 py-2 text-center transition-colors ${
                    settings.tipCalculationBase === 'post_tax'
                      ? 'border-amber-500 bg-amber-50 font-medium text-amber-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {t('taxTips.tips.postTax')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
