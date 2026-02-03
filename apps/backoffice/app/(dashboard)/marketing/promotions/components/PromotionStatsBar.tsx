'use client';

interface PromotionStatsBarProps {
  totals: {
    active: number;
    totalViews: number;
    totalRedemptions: number;
    totalPlacements: number;
  };
  avgConversion: string;
  t: (key: string) => string;
}

export function PromotionStatsBar({ totals, avgConversion, t }: PromotionStatsBarProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">{t('stats.active')}</p>
        <p className="text-2xl font-bold text-green-600">{totals.active}</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">{t('stats.scanned')}</p>
        <p className="text-2xl font-bold text-gray-900">{totals.totalViews.toLocaleString()}</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">{t('stats.conversions')}</p>
        <p className="text-2xl font-bold text-purple-600">{totals.totalRedemptions}</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">{t('stats.conversionRate')}</p>
        <p className="text-2xl font-bold text-blue-600">{avgConversion}%</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">{t('stats.placements')}</p>
        <p className="text-2xl font-bold text-gray-900">{totals.totalPlacements}</p>
      </div>
    </div>
  );
}
