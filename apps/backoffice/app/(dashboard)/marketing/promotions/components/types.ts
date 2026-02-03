// Types
export type PromotionType =
  | 'discount_percent'
  | 'discount_fixed'
  | 'free_item'
  | 'buy_x_get_y'
  | 'bundle'
  | 'loyalty_bonus'
  | 'scratch_card'
  | 'spin_wheel'
  | 'first_visit';

export type PromotionStatus = 'draft' | 'active' | 'paused' | 'expired' | 'completed';
export type PlacementType = 'offline' | 'online';
export type TriggerAction =
  | 'signup'
  | 'social_share'
  | 'follow'
  | 'review'
  | 'checkin'
  | 'minimum_purchase'
  | 'none';

export interface QRPlacement {
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

export interface Promotion {
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

export interface PromotionFormData {
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

// Config constants
export const PROMOTION_TYPE_CONFIG: Record<
  PromotionType,
  { label: string; icon: string; color: string; description: string }
> = {
  discount_percent: {
    label: 'Sconto %',
    icon: '\uD83C\uDFF7\uFE0F',
    color: 'bg-green-100 text-green-700',
    description: 'Sconto percentuale sul totale ordine',
  },
  discount_fixed: {
    label: 'Sconto Fisso',
    icon: '\uD83D\uDCB5',
    color: 'bg-emerald-100 text-emerald-700',
    description: 'Sconto in euro fisso (es. -5\u20AC)',
  },
  free_item: {
    label: 'Omaggio',
    icon: '\uD83C\uDF81',
    color: 'bg-pink-100 text-pink-700',
    description: 'Prodotto gratis con acquisto',
  },
  buy_x_get_y: {
    label: 'Prendi X Paghi Y',
    icon: '\uD83D\uDED2',
    color: 'bg-blue-100 text-blue-700',
    description: 'Es: Prendi 3 paghi 2',
  },
  bundle: {
    label: 'Bundle',
    icon: '\uD83D\uDCE6',
    color: 'bg-purple-100 text-purple-700',
    description: 'Combo di prodotti a prezzo speciale',
  },
  loyalty_bonus: {
    label: 'Bonus Punti',
    icon: '\u2B50',
    color: 'bg-amber-100 text-amber-700',
    description: 'Punti fedelt\u00E0 extra su acquisto',
  },
  scratch_card: {
    label: 'Gratta e Vinci',
    icon: '\uD83C\uDFB0',
    color: 'bg-red-100 text-red-700',
    description: 'Cliente scopre premio nascosto',
  },
  spin_wheel: {
    label: 'Ruota Fortuna',
    icon: '\uD83C\uDFA1',
    color: 'bg-indigo-100 text-indigo-700',
    description: 'Gira la ruota e vinci premi',
  },
  first_visit: {
    label: 'Prima Visita',
    icon: '\uD83D\uDC4B',
    color: 'bg-teal-100 text-teal-700',
    description: 'Sconto esclusivo nuovi clienti',
  },
};

export const STATUS_CONFIG: Record<PromotionStatus, { label: string; color: string }> = {
  draft: { label: 'Bozza', color: 'bg-gray-100 text-gray-700' },
  active: { label: 'Attiva', color: 'bg-green-100 text-green-700' },
  paused: { label: 'In Pausa', color: 'bg-yellow-100 text-yellow-700' },
  expired: { label: 'Scaduta', color: 'bg-red-100 text-red-700' },
  completed: { label: 'Completata', color: 'bg-blue-100 text-blue-700' },
};

export const TRIGGER_CONFIG: Record<TriggerAction, { label: string; icon: string }> = {
  signup: { label: 'Registrazione', icon: '\uD83D\uDCDD' },
  social_share: { label: 'Condivisione', icon: '\uD83D\uDCF1' },
  follow: { label: 'Follow', icon: '\u2764\uFE0F' },
  review: { label: 'Recensione', icon: '\u2B50' },
  checkin: { label: 'Check-in', icon: '\uD83D\uDCCD' },
  minimum_purchase: { label: 'Acquisto Min.', icon: '\uD83D\uDCB3' },
  none: { label: 'Automatica', icon: '\u2705' },
};
