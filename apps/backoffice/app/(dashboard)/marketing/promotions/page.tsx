'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { InfoTooltip } from '@/components/ui/info-tooltip';

// Types
type PromotionType =
  | 'discount_percent'
  | 'discount_fixed'
  | 'free_item'
  | 'buy_x_get_y'
  | 'bundle'
  | 'loyalty_bonus'
  | 'scratch_card'
  | 'spin_wheel'
  | 'first_visit';

type PromotionStatus = 'draft' | 'active' | 'paused' | 'expired' | 'completed';
type PlacementType = 'offline' | 'online';
type TriggerAction =
  | 'signup'
  | 'social_share'
  | 'follow'
  | 'review'
  | 'checkin'
  | 'minimum_purchase'
  | 'none';

interface QRPlacement {
  id: string;
  type: PlacementType;
  name: string;
  description?: string;
  address?: string;
  platform?: string;
  cost?: number;
  costPeriod?: 'once' | 'daily' | 'weekly' | 'monthly';
  scans: number;
  uniqueScans: number;
  conversions: number;
  isActive: boolean;
}

interface Promotion {
  id: string;
  name: string;
  title: string;
  description: string;
  type: PromotionType;
  status: PromotionStatus;
  reward: {
    discountPercent?: number;
    discountFixed?: number;
    freeItemName?: string;
    bonusPoints?: number;
  };
  triggerAction: TriggerAction;
  externalQR: {
    enabled: boolean;
    placements: QRPlacement[];
  };
  startDate: string;
  endDate: string;
  stats: {
    totalViews: number;
    totalRedemptions: number;
    conversionRate: number;
  };
  createdAt: string;
}

const PROMOTION_TYPE_CONFIG: Record<
  PromotionType,
  { label: string; icon: string; color: string; description: string }
> = {
  discount_percent: {
    label: 'Sconto %',
    icon: '🏷️',
    color: 'bg-green-100 text-green-700',
    description: 'Sconto percentuale sul totale ordine',
  },
  discount_fixed: {
    label: 'Sconto Fisso',
    icon: '💵',
    color: 'bg-emerald-100 text-emerald-700',
    description: 'Sconto in euro fisso (es. -5€)',
  },
  free_item: {
    label: 'Omaggio',
    icon: '🎁',
    color: 'bg-pink-100 text-pink-700',
    description: 'Prodotto gratis con acquisto',
  },
  buy_x_get_y: {
    label: 'Prendi X Paghi Y',
    icon: '🛒',
    color: 'bg-blue-100 text-blue-700',
    description: 'Es: Prendi 3 paghi 2',
  },
  bundle: {
    label: 'Bundle',
    icon: '📦',
    color: 'bg-purple-100 text-purple-700',
    description: 'Combo di prodotti a prezzo speciale',
  },
  loyalty_bonus: {
    label: 'Bonus Punti',
    icon: '⭐',
    color: 'bg-amber-100 text-amber-700',
    description: 'Punti fedeltà extra su acquisto',
  },
  scratch_card: {
    label: 'Gratta e Vinci',
    icon: '🎰',
    color: 'bg-red-100 text-red-700',
    description: 'Cliente scopre premio nascosto',
  },
  spin_wheel: {
    label: 'Ruota Fortuna',
    icon: '🎡',
    color: 'bg-indigo-100 text-indigo-700',
    description: 'Gira la ruota e vinci premi',
  },
  first_visit: {
    label: 'Prima Visita',
    icon: '👋',
    color: 'bg-teal-100 text-teal-700',
    description: 'Sconto esclusivo nuovi clienti',
  },
};

const STATUS_CONFIG: Record<PromotionStatus, { label: string; color: string }> = {
  draft: { label: 'Bozza', color: 'bg-gray-100 text-gray-700' },
  active: { label: 'Attiva', color: 'bg-green-100 text-green-700' },
  paused: { label: 'In Pausa', color: 'bg-yellow-100 text-yellow-700' },
  expired: { label: 'Scaduta', color: 'bg-red-100 text-red-700' },
  completed: { label: 'Completata', color: 'bg-blue-100 text-blue-700' },
};

const TRIGGER_CONFIG: Record<TriggerAction, { label: string; icon: string }> = {
  signup: { label: 'Registrazione', icon: '📝' },
  social_share: { label: 'Condivisione', icon: '📱' },
  follow: { label: 'Follow', icon: '❤️' },
  review: { label: 'Recensione', icon: '⭐' },
  checkin: { label: 'Check-in', icon: '📍' },
  minimum_purchase: { label: 'Acquisto Min.', icon: '💳' },
  none: { label: 'Automatica', icon: '✅' },
};

// Promotion Form Modal Component
interface PromotionFormData {
  title: string;
  description: string;
  type: PromotionType;
  status: PromotionStatus;
  reward: Promotion['reward'];
  triggerAction: TriggerAction;
  startDate: string;
  endDate: string;
  externalQREnabled: boolean;
}

interface PromotionFormModalProps {
  onClose: () => void;
  onSave: (data: PromotionFormData) => void;
}

function PromotionFormModal({ onClose, onSave }: PromotionFormModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PromotionFormData>({
    title: '',
    description: '',
    type: 'discount_percent',
    status: 'draft',
    reward: {},
    triggerAction: 'none',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    externalQREnabled: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateReward = (key: string, value: number | string | undefined) => {
    setFormData({
      ...formData,
      reward: { ...formData.reward, [key]: value },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Nuova Promozione</h2>
                <p className="text-sm text-gray-500">Step {step} di 3</p>
              </div>
              <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Progress bar */}
            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-purple-600' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6 p-6">
            {step === 1 && (
              <>
                {/* Promo Type Selection */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Tipo di Promozione
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(PROMOTION_TYPE_CONFIG).map(([type, config]) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: type as PromotionType })}
                        className={`group rounded-lg border-2 p-3 text-left transition-colors ${
                          formData.type === type
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <span className="mb-1 block text-2xl">{config.icon}</span>
                        <span className="text-sm font-medium text-gray-900">{config.label}</span>
                        <span className="mt-1 block text-[11px] leading-tight text-gray-500 group-hover:text-gray-600">
                          {config.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Titolo *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    placeholder="Es: Sconto 20% sul primo ordine"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Descrizione
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    placeholder="Descrivi la promozione..."
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Reward Details based on type */}
                <div className="rounded-xl bg-purple-50 p-4">
                  <h4 className="mb-4 font-medium text-gray-900">Dettagli Premio</h4>

                  {formData.type === 'discount_percent' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Sconto %
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={formData.reward.discountPercent || ''}
                        onChange={(e) => updateReward('discountPercent', Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Es: 20"
                      />
                    </div>
                  )}

                  {formData.type === 'discount_fixed' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Sconto Fisso (€)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.reward.discountFixed || ''}
                        onChange={(e) => updateReward('discountFixed', Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Es: 5"
                      />
                    </div>
                  )}

                  {formData.type === 'free_item' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Prodotto Omaggio
                      </label>
                      <input
                        type="text"
                        value={formData.reward.freeItemName || ''}
                        onChange={(e) => updateReward('freeItemName', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Es: Caffè, Dessert"
                      />
                    </div>
                  )}

                  {formData.type === 'loyalty_bonus' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Punti Bonus
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.reward.bonusPoints || ''}
                        onChange={(e) => updateReward('bonusPoints', Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Es: 100"
                      />
                    </div>
                  )}

                  {(formData.type === 'scratch_card' || formData.type === 'spin_wheel') && (
                    <p className="text-sm text-gray-600">
                      I premi della{' '}
                      {formData.type === 'scratch_card' ? 'carta gratta e vinci' : 'ruota'} verranno
                      configurati dopo la creazione.
                    </p>
                  )}

                  {formData.type === 'first_visit' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Sconto Prima Visita %
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={formData.reward.discountPercent || ''}
                        onChange={(e) => updateReward('discountPercent', Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Es: 15"
                      />
                    </div>
                  )}
                </div>

                {/* Trigger Action */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Azione Richiesta per Attivare
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(TRIGGER_CONFIG).map(([action, config]) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, triggerAction: action as TriggerAction })
                        }
                        className={`rounded-lg border-2 p-3 text-left transition-colors ${
                          formData.triggerAction === action
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="mr-2 text-lg">{config.icon}</span>
                        <span className="text-sm font-medium text-gray-900">{config.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Data Inizio *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Data Fine *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    />
                  </div>
                </div>

                {/* External QR */}
                <div className="rounded-xl bg-blue-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">QR Marketing Esterno</h4>
                      <p className="text-sm text-gray-600">
                        Abilita il sistema a 2 step con QR piazzati fuori dal locale
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={formData.externalQREnabled}
                        onChange={(e) =>
                          setFormData({ ...formData, externalQREnabled: e.target.checked })
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300"></div>
                    </label>
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-xl bg-gray-50 p-4">
                  <h4 className="mb-3 font-medium text-gray-900">Riepilogo</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="font-medium">
                        {PROMOTION_TYPE_CONFIG[formData.type].label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Titolo:</span>
                      <span className="font-medium">{formData.title || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trigger:</span>
                      <span className="font-medium">
                        {TRIGGER_CONFIG[formData.triggerAction].label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Periodo:</span>
                      <span className="font-medium">
                        {formData.startDate} → {formData.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between border-t border-gray-200 p-6">
            <button
              type="button"
              onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              {step > 1 ? 'Indietro' : 'Annulla'}
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !formData.title}
                className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
              >
                Avanti
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                Crea Promozione
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

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
    if (!placement.cost || placement.cost === 0) return '∞';
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

      {/* How it works */}
      <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <h3 className="mb-4 font-bold text-gray-900">{t('howItWorks.title')}</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900">{t('howItWorks.step1Title')}</p>
              <p className="text-sm text-gray-600">{t('howItWorks.step1Desc')}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900">{t('howItWorks.step2Title')}</p>
              <p className="text-sm text-gray-600">{t('howItWorks.step2Desc')}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 font-bold text-white">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900">{t('howItWorks.step3Title')}</p>
              <p className="text-sm text-gray-600">{t('howItWorks.step3Desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: t('filters.all') },
          { id: 'active', label: t('filters.active') },
          { id: 'draft', label: t('filters.draft') },
          { id: 'paused', label: t('filters.paused') },
          { id: 'expired', label: t('filters.expired') },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Promotions List */}
      <div className="space-y-4">
        {filteredPromotions.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <span className="mb-4 block text-5xl">🎯</span>
            <h3 className="mb-2 text-lg font-medium text-gray-900">{t('empty.title')}</h3>
            <p className="mb-4 text-gray-500">{t('empty.description')}</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
            >
              {t('empty.action')}
            </button>
          </div>
        ) : (
          filteredPromotions.map((promo) => {
            const typeConfig = PROMOTION_TYPE_CONFIG[promo.type];
            const statusConfig = STATUS_CONFIG[promo.status];
            const triggerConfig = TRIGGER_CONFIG[promo.triggerAction];

            return (
              <div
                key={promo.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                {/* Header */}
                <div className="border-b border-gray-100 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-12 w-12 rounded-xl ${typeConfig.color} flex items-center justify-center text-2xl`}
                      >
                        {typeConfig.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900">{promo.title}</h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig.color}`}
                          >
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{promo.description}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                          <span>
                            {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            {triggerConfig.icon} {triggerConfig.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {promo.status === 'draft' && (
                        <button
                          onClick={() => handleActivate(promo.id)}
                          className="rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200"
                        >
                          Attiva
                        </button>
                      )}
                      {promo.status === 'active' && (
                        <button
                          onClick={() => handlePause(promo.id)}
                          className="rounded-lg bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700 hover:bg-yellow-200"
                        >
                          Pausa
                        </button>
                      )}
                      {promo.status === 'paused' && (
                        <button
                          onClick={() => handleActivate(promo.id)}
                          className="rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200"
                        >
                          Riattiva
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedPromotion(promo)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats & Placements */}
                {promo.externalQR.enabled && (
                  <div className="bg-gray-50 p-4">
                    {/* Stats row */}
                    <div className="mb-4 grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Scansioni QR</p>
                        <p className="text-lg font-bold text-gray-900">
                          {promo.stats.totalViews.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Conversioni</p>
                        <p className="text-lg font-bold text-purple-600">
                          {promo.stats.totalRedemptions}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tasso Conv.</p>
                        <p className="text-lg font-bold text-blue-600">
                          {promo.stats.conversionRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Posizionamenti</p>
                        <p className="text-lg font-bold text-gray-900">
                          {promo.externalQR.placements.length}
                        </p>
                      </div>
                    </div>

                    {/* Placements */}
                    {promo.externalQR.placements.length > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-700">QR Posizionati</h4>
                          <button
                            onClick={() => setShowPlacementsModal(promo)}
                            className="text-xs text-purple-600 hover:underline"
                          >
                            Gestisci tutti
                          </button>
                        </div>
                        <div className="grid gap-2 md:grid-cols-3">
                          {promo.externalQR.placements.slice(0, 3).map((placement) => {
                            const roi = calculateROI(placement);
                            return (
                              <div
                                key={placement.id}
                                className="rounded-lg border border-gray-200 bg-white p-3"
                              >
                                <div className="mb-2 flex items-center gap-2">
                                  <span className="text-lg">
                                    {placement.type === 'offline' ? '📍' : '🌐'}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900">
                                      {placement.name}
                                    </p>
                                    <p className="truncate text-xs text-gray-500">
                                      {placement.address || placement.platform || '-'}
                                    </p>
                                  </div>
                                  <span
                                    className={`h-2 w-2 rounded-full ${placement.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                                  />
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div>
                                    <p className="text-gray-500">Scan</p>
                                    <p className="font-medium">{placement.scans}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Conv.</p>
                                    <p className="font-medium text-purple-600">
                                      {placement.conversions}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">ROI</p>
                                    <p
                                      className={`font-medium ${roi === '∞' ? 'text-blue-600' : Number(roi) > 0 ? 'text-green-600' : Number(roi) < 0 ? 'text-red-600' : 'text-gray-600'}`}
                                    >
                                      {roi === '∞' ? '∞' : `${roi}%`}
                                    </p>
                                  </div>
                                </div>
                                {placement.cost && placement.cost > 0 && (
                                  <p className="mt-2 text-xs text-gray-400">
                                    €{placement.cost}/
                                    {placement.costPeriod === 'monthly'
                                      ? 'mese'
                                      : placement.costPeriod === 'weekly'
                                        ? 'sett'
                                        : placement.costPeriod === 'daily'
                                          ? 'giorno'
                                          : 'una tantum'}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {promo.externalQR.placements.length > 3 && (
                          <p className="text-center text-xs text-gray-500">
                            + {promo.externalQR.placements.length - 3} altri posizionamenti
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="py-4 text-center">
                        <p className="mb-2 text-sm text-gray-500">Nessun QR esterno posizionato</p>
                        <button
                          onClick={() => setShowPlacementsModal(promo)}
                          className="text-sm text-purple-600 hover:underline"
                        >
                          + Aggiungi posizionamento
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Internal only promo */}
                {!promo.externalQR.enabled && (
                  <div className="bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>📍</span>
                      <span>Promozione solo interna (no QR esterno)</span>
                      <span className="ml-auto font-medium text-gray-900">
                        {promo.stats.totalRedemptions} utilizzi
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <PromotionFormModal
          onClose={() => setShowCreateModal(false)}
          onSave={(promoData) => {
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
          }}
        />
      )}

      {/* Placements Modal */}
      {showPlacementsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="m-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Gestione QR Posizionamenti</h2>
                  <p className="text-sm text-gray-500">{showPlacementsModal.title}</p>
                </div>
                <button
                  onClick={() => setShowPlacementsModal(null)}
                  className="rounded-lg p-2 hover:bg-gray-100"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Add new placement */}
              <div className="mb-6">
                <button className="w-full rounded-xl border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-purple-400 hover:text-purple-600">
                  <span className="mb-1 block text-2xl">+</span>
                  <span className="text-sm font-medium">Aggiungi nuovo posizionamento QR</span>
                </button>
              </div>

              {/* Placement types */}
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-blue-50 p-4">
                  <h4 className="flex items-center gap-2 font-medium text-blue-900">
                    <span>📍</span> Offline
                  </h4>
                  <p className="mt-1 text-sm text-blue-700">
                    Volantini, manifesti, partner, biglietti
                  </p>
                </div>
                <div className="rounded-xl bg-purple-50 p-4">
                  <h4 className="flex items-center gap-2 font-medium text-purple-900">
                    <span>🌐</span> Online
                  </h4>
                  <p className="mt-1 text-sm text-purple-700">
                    Social media, siti partner, ads, email
                  </p>
                </div>
              </div>

              {/* Existing placements */}
              <h4 className="mb-3 font-medium text-gray-900">
                Posizionamenti Attivi ({showPlacementsModal.externalQR.placements.length})
              </h4>
              <div className="space-y-3">
                {showPlacementsModal.externalQR.placements.map((placement) => (
                  <div
                    key={placement.id}
                    className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200 bg-white">
                      <span className="text-3xl">{placement.type === 'offline' ? '📍' : '🌐'}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{placement.name}</p>
                      <p className="text-sm text-gray-500">
                        {placement.address || placement.platform}
                      </p>
                      <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                        <span>{placement.scans} scan</span>
                        <span>{placement.conversions} conv.</span>
                        {placement.cost && (
                          <span>
                            €{placement.cost}/{placement.costPeriod?.slice(0, 3)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                        QR Code
                      </button>
                      <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-200">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end border-t border-gray-200 p-6">
              <button
                onClick={() => setShowPlacementsModal(null)}
                className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
