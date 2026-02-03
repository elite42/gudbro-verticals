'use client';

import type { Promotion, QRPlacement } from './types';
import { PromotionCard } from './PromotionCard';

interface PromotionListProps {
  promotions: Promotion[];
  onActivate: (id: string) => void;
  onPause: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (promo: Promotion) => void;
  onManagePlacements: (promo: Promotion) => void;
  onCreateNew: () => void;
  formatDate: (dateStr: string) => string;
  calculateROI: (placement: QRPlacement, avgOrderValue?: number) => string;
  t: (key: string) => string;
}

export function PromotionList({
  promotions,
  onActivate,
  onPause,
  onDelete,
  onEdit,
  onManagePlacements,
  onCreateNew,
  formatDate,
  calculateROI,
  t,
}: PromotionListProps) {
  if (promotions.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
        <span className="mb-4 block text-5xl">🎯</span>
        <h3 className="mb-2 text-lg font-medium text-gray-900">{t('empty.title')}</h3>
        <p className="mb-4 text-gray-500">{t('empty.description')}</p>
        <button
          onClick={onCreateNew}
          className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
        >
          {t('empty.action')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {promotions.map((promo) => (
        <PromotionCard
          key={promo.id}
          promo={promo}
          onActivate={onActivate}
          onPause={onPause}
          onDelete={onDelete}
          onEdit={onEdit}
          onManagePlacements={onManagePlacements}
          formatDate={formatDate}
          calculateROI={calculateROI}
        />
      ))}
    </div>
  );
}
