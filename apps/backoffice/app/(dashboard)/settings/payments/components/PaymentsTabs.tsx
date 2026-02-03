import { CreditCard, Wallet } from '@phosphor-icons/react';
import { Percent } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import type { ActiveTab } from './types';

interface PaymentsTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  enabledFiatCount: number;
  enabledCryptoCount: number;
}

export function PaymentsTabs({
  activeTab,
  onTabChange,
  enabledFiatCount,
  enabledCryptoCount,
}: PaymentsTabsProps) {
  const t = useTranslations('paymentsPage');

  return (
    <div className="flex w-fit gap-2 rounded-lg bg-gray-100 p-1">
      <button
        onClick={() => onTabChange('fiat')}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'fiat'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <CreditCard className="h-4 w-4" />
        {t('tabs.fiat')} ({enabledFiatCount})
      </button>
      <button
        onClick={() => onTabChange('crypto')}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'crypto'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Wallet className="h-4 w-4" />
        {t('tabs.crypto')} ({enabledCryptoCount})
      </button>
      <button
        onClick={() => onTabChange('taxTips')}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          activeTab === 'taxTips'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Percent className="h-4 w-4" weight="duotone" />
        {t('tabs.taxTips')}
      </button>
    </div>
  );
}
