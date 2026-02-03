'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { InfoTooltip } from '@/components/ui/info-tooltip';

import type {
  Promotion,
  PromotionStatus,
  PromotionFormData,
  QRPlacement,
} from './components/types';
import { PromotionFormModal } from './components/PromotionFormModal';
import { PlacementsModal } from './components/PlacementsModal';
import { PromotionStatsBar } from './components/PromotionStatsBar';
import { HowItWorks } from './components/HowItWorks';
import { PromotionFilters } from './components/PromotionFilters';
import { PromotionList } from './components/PromotionList';

// Mock data
const mockPromotions: Promotion[] = [
  {
    id: '1',
    name: 'promo-gennaio-2025',
    title: 'Sconto 20% sul primo ordine',
    description: 'Scansiona il QR esterno e ottieni il 20% di sconto!',
    type: 'discount_percent',
    status: 'active',
    reward: { discountPercent: 20 },
    triggerAction: 'signup',
    externalQR: {
      enabled: true,
      placements: [
        {
          id: 'p1',
          type: 'offline',
          name: 'Volantini Centro Storico',
          address: 'Via Roma, Milano',
          cost: 150,
          costPeriod: 'monthly',
          scans: 342,
          uniqueScans: 298,
          conversions: 45,
          isActive: true,
        },
        {
          id: 'p2',
          type: 'offline',
          name: 'Partner - Edicola Centrale',
          address: 'Piazza Duomo 5',
          cost: 50,
          costPeriod: 'monthly',
          scans: 128,
          uniqueScans: 112,
          conversions: 18,
          isActive: true,
        },
        {
          id: 'p3',
          type: 'online',
          name: 'Instagram Bio',
          platform: 'instagram',
          cost: 0,
          scans: 567,
          uniqueScans: 445,
          conversions: 67,
          isActive: true,
        },
      ],
    },
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    stats: {
      totalViews: 1037,
      totalRedemptions: 130,
      conversionRate: 12.5,
    },
    createdAt: '2024-12-28',
  },
  {
    id: '2',
    name: 'gratta-vinci-febbraio',
    title: 'Gratta e Vinci Digitale',
    description: 'Scansiona e scopri cosa hai vinto!',
    type: 'scratch_card',
    status: 'draft',
    reward: { discountPercent: 10, freeItemName: 'Caffè' },
    triggerAction: 'social_share',
    externalQR: {
      enabled: true,
      placements: [],
    },
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    stats: {
      totalViews: 0,
      totalRedemptions: 0,
      conversionRate: 0,
    },
    createdAt: '2024-12-30',
  },
  {
    id: '3',
    name: 'happy-hour-promo',
    title: 'Happy Hour: Spritz a 5€',
    description: "Solo durante l'happy hour, spritz a prezzo speciale",
    type: 'discount_fixed',
    status: 'active',
    reward: { discountFixed: 3 },
    triggerAction: 'none',
    externalQR: {
      enabled: false,
      placements: [],
    },
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    stats: {
      totalViews: 0,
      totalRedemptions: 89,
      conversionRate: 0,
    },
    createdAt: '2024-12-20',
  },
];

export default function PromotionsPage() {
  const t = useTranslations('promotions');
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [filter, setFilter] = useState<'all' | PromotionStatus>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [showPlacementsModal, setShowPlacementsModal] = useState<Promotion | null>(null);

  const filteredPromotions =
    filter === 'all' ? promotions : promotions.filter((p) => p.status === filter);

  // Calculate totals
  const totals = {
    active: promotions.filter((p) => p.status === 'active').length,
    totalViews: promotions.reduce((sum, p) => sum + p.stats.totalViews, 0),
    totalRedemptions: promotions.reduce((sum, p) => sum + p.stats.totalRedemptions, 0),
    totalPlacements: promotions.reduce((sum, p) => sum + p.externalQR.placements.length, 0),
    totalCost: promotions.reduce(
      (sum, p) => sum + p.externalQR.placements.reduce((s, pl) => s + (pl.cost || 0), 0),
      0
    ),
  };

  const avgConversion =
    totals.totalViews > 0 ? ((totals.totalRedemptions / totals.totalViews) * 100).toFixed(1) : '0';

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleActivate = (id: string) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'active' as PromotionStatus } : p))
    );
  };

  const handlePause = (id: string) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'paused' as PromotionStatus } : p))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm(t('actions.confirmDelete'))) {
      setPromotions((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Calculate ROI for a placement - returns string for consistent type
  const calculateROI = (placement: QRPlacement, avgOrderValue: number = 25): string => {
    if (!placement.cost || placement.cost === 0) return '\u221E';
    const estimatedRevenue = placement.conversions * avgOrderValue;
    const monthlyCost =
      placement.costPeriod === 'monthly'
        ? placement.cost
        : placement.costPeriod === 'weekly'
          ? placement.cost * 4
          : placement.costPeriod === 'daily'
            ? placement.cost * 30
            : placement.cost;
    return (((estimatedRevenue - monthlyCost) / monthlyCost) * 100).toFixed(0);
  };

  const handleCreatePromotion = (promoData: PromotionFormData) => {
    const newPromo: Promotion = {
      id: String(Date.now()),
      name: promoData.title.toLowerCase().replace(/\s+/g, '-'),
      ...promoData,
      externalQR: {
        enabled: promoData.externalQREnabled,
        placements: [],
      },
      stats: {
        totalViews: 0,
        totalRedemptions: 0,
        conversionRate: 0,
      },
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPromotions((prev) => [newPromo, ...prev]);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="pages.promotions" kbPageId="promotions" />
          </div>
          <p className="mt-1 text-sm text-gray-500">{t('description')}</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('newPromotion')}
        </button>
      </div>

      {/* Stats */}
      <PromotionStatsBar totals={totals} avgConversion={avgConversion} t={t} />

      {/* How it works */}
      <HowItWorks t={t} />

      {/* Filters */}
      <PromotionFilters filter={filter} onFilterChange={setFilter} t={t} />

      {/* Promotions List */}
      <PromotionList
        promotions={filteredPromotions}
        onActivate={handleActivate}
        onPause={handlePause}
        onDelete={handleDelete}
        onEdit={setSelectedPromotion}
        onManagePlacements={setShowPlacementsModal}
        onCreateNew={() => setShowCreateModal(true)}
        formatDate={formatDate}
        calculateROI={calculateROI}
        t={t}
      />

      {/* Create Modal */}
      {showCreateModal && (
        <PromotionFormModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreatePromotion}
        />
      )}

      {/* Placements Modal */}
      {showPlacementsModal && (
        <PlacementsModal
          promotion={showPlacementsModal}
          onClose={() => setShowPlacementsModal(null)}
        />
      )}
    </div>
  );
}
