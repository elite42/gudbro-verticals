import { useTranslations } from 'next-intl';
import type { PaymentSettings } from './types';

interface ReceiptPreviewProps {
  settings: PaymentSettings;
}

export function ReceiptPreview({ settings }: ReceiptPreviewProps) {
  const t = useTranslations('paymentsPage');

  if (!settings.taxEnabled && !settings.tipsEnabled && !settings.serviceChargeEnabled) {
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="mb-4 font-semibold text-gray-900">{t('taxTips.preview.title')}</h3>
      <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm">
        <div className="flex justify-between py-1">
          <span className="text-gray-600">{t('taxTips.preview.subtotal')}</span>
          <span className="text-gray-900">{'\u20AC'}25.00</span>
        </div>
        {settings.taxEnabled && settings.taxDisplayMode === 'exclusive' && (
          <div className="flex justify-between py-1">
            <span className="text-gray-600">
              {settings.taxLabel} ({settings.taxPercentage}%)
            </span>
            <span className="text-gray-900">
              {'\u20AC'}
              {((25 * settings.taxPercentage) / 100).toFixed(2)}
            </span>
          </div>
        )}
        {settings.taxEnabled && settings.taxDisplayMode === 'inclusive' && (
          <div className="flex justify-between py-1 text-xs text-gray-400">
            <span>
              {settings.taxLabel} {t('taxTips.preview.taxIncluded')}
            </span>
            <span>
              {'\u20AC'}
              {(25 - 25 / (1 + settings.taxPercentage / 100)).toFixed(2)}
            </span>
          </div>
        )}
        {settings.serviceChargeEnabled && (
          <div className="flex justify-between py-1">
            <span className="text-gray-600">
              {settings.serviceChargeLabel} ({settings.serviceChargePercentage}%)
            </span>
            <span className="text-gray-900">
              {'\u20AC'}
              {(
                ((settings.serviceChargeCalculationBase === 'post_tax' &&
                settings.taxDisplayMode === 'exclusive'
                  ? 25 * (1 + settings.taxPercentage / 100)
                  : 25) *
                  settings.serviceChargePercentage) /
                100
              ).toFixed(2)}
            </span>
          </div>
        )}
        {settings.tipsEnabled && (
          <div className="flex justify-between py-1">
            <span className="text-gray-600">{t('taxTips.preview.tip')} (15%)</span>
            <span className="text-gray-900">
              {'\u20AC'}
              {(
                (settings.tipCalculationBase === 'post_tax' &&
                settings.taxDisplayMode === 'exclusive'
                  ? 25 * (1 + settings.taxPercentage / 100)
                  : 25) * 0.15
              ).toFixed(2)}
            </span>
          </div>
        )}
        <div className="mt-2 border-t border-gray-300 pt-2">
          <div className="flex justify-between font-bold">
            <span className="text-gray-900">{t('taxTips.preview.total')}</span>
            <span className="text-green-700">
              {'\u20AC'}
              {(() => {
                let total = 25;
                const taxAmount =
                  settings.taxEnabled && settings.taxDisplayMode === 'exclusive'
                    ? (25 * settings.taxPercentage) / 100
                    : 0;
                total += taxAmount;

                const serviceChargeBase =
                  settings.serviceChargeCalculationBase === 'post_tax' &&
                  settings.taxDisplayMode === 'exclusive'
                    ? 25 + taxAmount
                    : 25;
                const serviceChargeAmount = settings.serviceChargeEnabled
                  ? (serviceChargeBase * settings.serviceChargePercentage) / 100
                  : 0;
                total += serviceChargeAmount;

                const tipBase =
                  settings.tipCalculationBase === 'post_tax' &&
                  settings.taxDisplayMode === 'exclusive'
                    ? 25 + taxAmount
                    : 25;
                const tipAmount = settings.tipsEnabled ? tipBase * 0.15 : 0;
                total += tipAmount;

                return total.toFixed(2);
              })()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
