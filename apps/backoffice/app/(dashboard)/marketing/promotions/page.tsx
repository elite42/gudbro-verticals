'use client';

import { useState } from 'react';

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
type TriggerAction = 'signup' | 'social_share' | 'follow' | 'review' | 'checkin' | 'minimum_purchase' | 'none';

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

const PROMOTION_TYPE_CONFIG: Record<PromotionType, { label: string; icon: string; color: string }> = {
  discount_percent: { label: 'Sconto %', icon: '🏷️', color: 'bg-green-100 text-green-700' },
  discount_fixed: { label: 'Sconto Fisso', icon: '💵', color: 'bg-emerald-100 text-emerald-700' },
  free_item: { label: 'Omaggio', icon: '🎁', color: 'bg-pink-100 text-pink-700' },
  buy_x_get_y: { label: 'Prendi X Paghi Y', icon: '🛒', color: 'bg-blue-100 text-blue-700' },
  bundle: { label: 'Bundle', icon: '📦', color: 'bg-purple-100 text-purple-700' },
  loyalty_bonus: { label: 'Bonus Punti', icon: '⭐', color: 'bg-amber-100 text-amber-700' },
  scratch_card: { label: 'Gratta e Vinci', icon: '🎰', color: 'bg-red-100 text-red-700' },
  spin_wheel: { label: 'Ruota Fortuna', icon: '🎡', color: 'bg-indigo-100 text-indigo-700' },
  first_visit: { label: 'Prima Visita', icon: '👋', color: 'bg-teal-100 text-teal-700' },
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
    description: 'Solo durante l\'happy hour, spritz a prezzo speciale',
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
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [filter, setFilter] = useState<'all' | PromotionStatus>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [showPlacementsModal, setShowPlacementsModal] = useState<Promotion | null>(null);

  const filteredPromotions = filter === 'all'
    ? promotions
    : promotions.filter(p => p.status === filter);

  // Calculate totals
  const totals = {
    active: promotions.filter(p => p.status === 'active').length,
    totalViews: promotions.reduce((sum, p) => sum + p.stats.totalViews, 0),
    totalRedemptions: promotions.reduce((sum, p) => sum + p.stats.totalRedemptions, 0),
    totalPlacements: promotions.reduce((sum, p) => sum + p.externalQR.placements.length, 0),
    totalCost: promotions.reduce((sum, p) =>
      sum + p.externalQR.placements.reduce((s, pl) => s + (pl.cost || 0), 0), 0
    ),
  };

  const avgConversion = totals.totalViews > 0
    ? ((totals.totalRedemptions / totals.totalViews) * 100).toFixed(1)
    : '0';

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleActivate = (id: string) => {
    setPromotions(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'active' as PromotionStatus } : p
    ));
  };

  const handlePause = (id: string) => {
    setPromotions(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'paused' as PromotionStatus } : p
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questa promozione?')) {
      setPromotions(prev => prev.filter(p => p.id !== id));
    }
  };

  // Calculate ROI for a placement
  const calculateROI = (placement: QRPlacement, avgOrderValue: number = 25) => {
    if (!placement.cost || placement.cost === 0) return Infinity;
    const estimatedRevenue = placement.conversions * avgOrderValue;
    const monthlyCost = placement.costPeriod === 'monthly' ? placement.cost :
                        placement.costPeriod === 'weekly' ? placement.cost * 4 :
                        placement.costPeriod === 'daily' ? placement.cost * 30 :
                        placement.cost;
    return ((estimatedRevenue - monthlyCost) / monthlyCost * 100).toFixed(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promozioni</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sistema QR Marketing a 2 step: esterno (awareness) + interno (conversion)
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuova Promozione
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Promozioni Attive</p>
          <p className="text-2xl font-bold text-green-600">{totals.active}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">QR Scansionati</p>
          <p className="text-2xl font-bold text-gray-900">{totals.totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Conversioni</p>
          <p className="text-2xl font-bold text-purple-600">{totals.totalRedemptions}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Tasso Conversione</p>
          <p className="text-2xl font-bold text-blue-600">{avgConversion}%</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">QR Posizionati</p>
          <p className="text-2xl font-bold text-gray-900">{totals.totalPlacements}</p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-bold text-gray-900 mb-4">Come funziona il QR Marketing a 2 Step</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900">QR Esterno</p>
              <p className="text-sm text-gray-600">Piazza QR in strada, online o da partner. L'utente scansiona e vede info locale + promo.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900">Visita al Locale</p>
              <p className="text-sm text-gray-600">L'utente arriva al locale guidato da Google Maps e info promozione.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900">QR Interno</p>
              <p className="text-sm text-gray-600">Scansiona QR tavolo per attivare promo. Trigger: registrazione, social share, etc.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Tutte' },
          { id: 'active', label: 'Attive' },
          { id: 'draft', label: 'Bozze' },
          { id: 'paused', label: 'In Pausa' },
          { id: 'expired', label: 'Scadute' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
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
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <span className="text-5xl mb-4 block">🎯</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna promozione trovata</h3>
            <p className="text-gray-500 mb-4">Crea la tua prima promozione con QR esterno</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Crea Promozione
            </button>
          </div>
        ) : (
          filteredPromotions.map((promo) => {
            const typeConfig = PROMOTION_TYPE_CONFIG[promo.type];
            const statusConfig = STATUS_CONFIG[promo.status];
            const triggerConfig = TRIGGER_CONFIG[promo.triggerAction];

            return (
              <div key={promo.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl ${typeConfig.color} flex items-center justify-center text-2xl`}>
                        {typeConfig.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900">{promo.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{promo.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>{formatDate(promo.startDate)} - {formatDate(promo.endDate)}</span>
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
                          className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200"
                        >
                          Attiva
                        </button>
                      )}
                      {promo.status === 'active' && (
                        <button
                          onClick={() => handlePause(promo.id)}
                          className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg hover:bg-yellow-200"
                        >
                          Pausa
                        </button>
                      )}
                      {promo.status === 'paused' && (
                        <button
                          onClick={() => handleActivate(promo.id)}
                          className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200"
                        >
                          Riattiva
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedPromotion(promo)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats & Placements */}
                {promo.externalQR.enabled && (
                  <div className="p-4 bg-gray-50">
                    {/* Stats row */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Scansioni QR</p>
                        <p className="text-lg font-bold text-gray-900">{promo.stats.totalViews.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Conversioni</p>
                        <p className="text-lg font-bold text-purple-600">{promo.stats.totalRedemptions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tasso Conv.</p>
                        <p className="text-lg font-bold text-blue-600">{promo.stats.conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Posizionamenti</p>
                        <p className="text-lg font-bold text-gray-900">{promo.externalQR.placements.length}</p>
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
                        <div className="grid md:grid-cols-3 gap-2">
                          {promo.externalQR.placements.slice(0, 3).map((placement) => {
                            const roi = calculateROI(placement);
                            return (
                              <div
                                key={placement.id}
                                className="bg-white rounded-lg p-3 border border-gray-200"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-lg">{placement.type === 'offline' ? '📍' : '🌐'}</span>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 text-sm truncate">{placement.name}</p>
                                    <p className="text-xs text-gray-500 truncate">
                                      {placement.address || placement.platform || '-'}
                                    </p>
                                  </div>
                                  <span className={`w-2 h-2 rounded-full ${placement.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div>
                                    <p className="text-gray-500">Scan</p>
                                    <p className="font-medium">{placement.scans}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Conv.</p>
                                    <p className="font-medium text-purple-600">{placement.conversions}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">ROI</p>
                                    <p className={`font-medium ${Number(roi) > 0 ? 'text-green-600' : Number(roi) < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                      {roi === 'Infinity' ? '∞' : `${roi}%`}
                                    </p>
                                  </div>
                                </div>
                                {placement.cost && placement.cost > 0 && (
                                  <p className="text-xs text-gray-400 mt-2">
                                    €{placement.cost}/{placement.costPeriod === 'monthly' ? 'mese' : placement.costPeriod === 'weekly' ? 'sett' : placement.costPeriod === 'daily' ? 'giorno' : 'una tantum'}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {promo.externalQR.placements.length > 3 && (
                          <p className="text-xs text-gray-500 text-center">
                            + {promo.externalQR.placements.length - 3} altri posizionamenti
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-500 mb-2">Nessun QR esterno posizionato</p>
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
                  <div className="p-4 bg-gray-50">
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

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Nuova Promozione</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Promo Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Tipo di Promozione</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(PROMOTION_TYPE_CONFIG).map(([type, config]) => (
                      <button
                        key={type}
                        className={`p-3 rounded-lg border-2 border-gray-200 hover:border-purple-400 text-left transition-colors`}
                      >
                        <span className="text-2xl block mb-1">{config.icon}</span>
                        <span className="text-sm font-medium text-gray-900">{config.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-gray-500 text-center py-4 border-t border-gray-100">
                  Form completo in sviluppo...
                  <br />
                  <span className="text-sm">Includerà: dettagli reward, condizioni, trigger action, date, QR esterno.</span>
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Annulla
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                Crea Promozione
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Placements Modal */}
      {showPlacementsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Gestione QR Posizionamenti</h2>
                  <p className="text-sm text-gray-500">{showPlacementsModal.title}</p>
                </div>
                <button onClick={() => setShowPlacementsModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Add new placement */}
              <div className="mb-6">
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-colors">
                  <span className="text-2xl block mb-1">+</span>
                  <span className="text-sm font-medium">Aggiungi nuovo posizionamento QR</span>
                </button>
              </div>

              {/* Placement types */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-medium text-blue-900 flex items-center gap-2">
                    <span>📍</span> Offline
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">Volantini, manifesti, partner, biglietti</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-medium text-purple-900 flex items-center gap-2">
                    <span>🌐</span> Online
                  </h4>
                  <p className="text-sm text-purple-700 mt-1">Social media, siti partner, ads, email</p>
                </div>
              </div>

              {/* Existing placements */}
              <h4 className="font-medium text-gray-900 mb-3">Posizionamenti Attivi ({showPlacementsModal.externalQR.placements.length})</h4>
              <div className="space-y-3">
                {showPlacementsModal.externalQR.placements.map((placement) => (
                  <div key={placement.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                      <span className="text-3xl">{placement.type === 'offline' ? '📍' : '🌐'}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{placement.name}</p>
                      <p className="text-sm text-gray-500">{placement.address || placement.platform}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span>{placement.scans} scan</span>
                        <span>{placement.conversions} conv.</span>
                        {placement.cost && <span>€{placement.cost}/{placement.costPeriod?.slice(0, 3)}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                        QR Code
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowPlacementsModal(null)}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
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
