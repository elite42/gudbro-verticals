import { PromoMechanic, CATEGORY_CONFIG } from '@/lib/events-service';

export type SportType =
  | 'football'
  | 'basketball'
  | 'tennis'
  | 'f1'
  | 'motogp'
  | 'boxing'
  | 'ufc'
  | 'rugby'
  | 'other';

export const PROMO_MECHANIC_CONFIG: Record<
  PromoMechanic,
  {
    label: string;
    icon: string;
    example: string;
    requiresValue: boolean;
    valueLabel?: string;
    requiresSecondaryValue?: boolean;
    secondaryValueLabel?: string;
  }
> = {
  percent_off: {
    label: 'Sconto %',
    icon: '🏷️',
    example: '-20%',
    requiresValue: true,
    valueLabel: 'Percentuale',
  },
  fixed_discount: {
    label: 'Sconto Fisso',
    icon: '💵',
    example: '-€5',
    requiresValue: true,
    valueLabel: 'Importo (€)',
  },
  fixed_price: {
    label: 'Prezzo Fisso',
    icon: '🎯',
    example: '€10',
    requiresValue: true,
    valueLabel: 'Prezzo (€)',
  },
  bogo: { label: '2x1', icon: '🎁', example: 'Buy One Get One', requiresValue: false },
  bogoho: {
    label: 'Compra 1 il 2° -50%',
    icon: '🎊',
    example: 'BOGO Half Off',
    requiresValue: false,
  },
  buy_x_get_y: {
    label: 'Prendi X Paghi Y',
    icon: '🛒',
    example: '3x2',
    requiresValue: true,
    valueLabel: 'Prendi',
    requiresSecondaryValue: true,
    secondaryValueLabel: 'Paghi',
  },
  bundle: {
    label: 'Combo',
    icon: '📦',
    example: 'Combo €15',
    requiresValue: true,
    valueLabel: 'Prezzo Bundle (€)',
  },
  free_item: { label: 'Omaggio', icon: '🎁', example: 'Caffè gratis', requiresValue: false },
  bottomless: {
    label: 'Illimitato',
    icon: '♾️',
    example: 'Prosecco illimitato',
    requiresValue: true,
    valueLabel: 'Prezzo (€)',
  },
  points_multiplier: {
    label: 'Punti x2',
    icon: '⭐',
    example: 'Double points',
    requiresValue: true,
    valueLabel: 'Moltiplicatore',
  },
  points_bonus: {
    label: 'Punti Bonus',
    icon: '🌟',
    example: '+50 punti',
    requiresValue: true,
    valueLabel: 'Punti',
  },
  free_upgrade: {
    label: 'Upgrade Gratis',
    icon: '⬆️',
    example: 'Size L gratis',
    requiresValue: false,
  },
  kids_free: {
    label: 'Bambini Gratis',
    icon: '👶',
    example: 'Under 12 free',
    requiresValue: false,
  },
  group_discount: {
    label: 'Sconto Gruppo',
    icon: '👥',
    example: '-10% 4+ persone',
    requiresValue: true,
    valueLabel: 'Sconto %',
  },
  early_bird: {
    label: 'Early Bird',
    icon: '🐦',
    example: '-15% primi 20',
    requiresValue: true,
    valueLabel: 'Sconto %',
  },
  last_minute: {
    label: 'Last Minute',
    icon: '⏰',
    example: '-20% ultima ora',
    requiresValue: true,
    valueLabel: 'Sconto %',
  },
  none: { label: 'Nessuna', icon: '➖', example: '-', requiresValue: false },
};

export const SPORT_CONFIG: Record<SportType, { label: string; icon: string }> = {
  football: { label: 'Calcio', icon: '⚽' },
  basketball: { label: 'Basket', icon: '🏀' },
  tennis: { label: 'Tennis', icon: '🎾' },
  f1: { label: 'Formula 1', icon: '🏎️' },
  motogp: { label: 'MotoGP', icon: '🏍️' },
  boxing: { label: 'Boxe', icon: '🥊' },
  ufc: { label: 'UFC', icon: '🥋' },
  rugby: { label: 'Rugby', icon: '🏉' },
  other: { label: 'Altro', icon: '🏆' },
};

export const EVENT_CATEGORIES = Object.entries(CATEGORY_CONFIG).map(([id, config]) => ({
  id,
  label: config.labelIt,
  color: config.color,
}));
