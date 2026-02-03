import type { Dispatch, SetStateAction } from 'react';
import { Receipt } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import type { PaymentSettings } from './types';
import { TaxSection } from './TaxSection';
import { TipsSection } from './TipsSection';
import { ServiceChargeSection } from './ServiceChargeSection';
import { ReceiptPreview } from './ReceiptPreview';

interface TaxTipsTabProps {
  settings: PaymentSettings;
  setSettings: Dispatch<SetStateAction<PaymentSettings>>;
}

export function TaxTipsTab({ settings, setSettings }: TaxTipsTabProps) {
  const t = useTranslations('paymentsPage');

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex gap-3">
          <Receipt className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" weight="duotone" />
          <p className="text-sm text-emerald-800">{t('taxTips.infoBanner')}</p>
        </div>
      </div>

      <TaxSection settings={settings} setSettings={setSettings} />
      <TipsSection settings={settings} setSettings={setSettings} />
      <ServiceChargeSection settings={settings} setSettings={setSettings} />
      <ReceiptPreview settings={settings} />
    </div>
  );
}
