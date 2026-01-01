'use client';

import { useState } from 'react';

// Import types from shared (in production)
// These match the types in apps/coffeeshop/frontend/types/event.ts

type EventType =
  // Entertainment
  | 'live_music' | 'dj_set' | 'karaoke' | 'trivia_night' | 'game_night' | 'comedy_night' | 'open_mic' | 'theme_night'
  // Food & Beverage
  | 'tasting' | 'pairing' | 'chefs_table' | 'cooking_class' | 'menu_launch' | 'food_tour'
  // Time-based Promos
  | 'happy_hour' | 'brunch' | 'lunch_special' | 'late_night'
  // Sports
  | 'sports_viewing'
  // Community & Business
  | 'networking' | 'charity' | 'book_club' | 'wine_club' | 'singles_night'
  // Private & Corporate
  | 'private_party' | 'corporate' | 'birthday' | 'anniversary'
  // Special Occasions
  | 'holiday' | 'special_menu' | 'closure' | 'other';

type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

type VenueStatus = 'open' | 'partial' | 'reservation_only' | 'members_only' | 'closed';

type PromoMechanic =
  | 'percent_off' | 'fixed_discount' | 'fixed_price' | 'bogo' | 'bogoho' | 'buy_x_get_y'
  | 'bundle' | 'free_item' | 'bottomless' | 'points_multiplier' | 'points_bonus'
  | 'free_upgrade' | 'kids_free' | 'group_discount' | 'early_bird' | 'last_minute' | 'none';

type SportType = 'football' | 'basketball' | 'tennis' | 'f1' | 'motogp' | 'boxing' | 'ufc' | 'rugby' | 'other';

interface EventPromotion {
  id: string;
  name: string;
  description?: string;
  mechanic: PromoMechanic;
  value?: number;
  secondaryValue?: number;
  applicableTo: 'all' | 'categories' | 'products' | 'tags';
  categoryIds?: string[];
  productIds?: string[];
  productTags?: string[];
  badge?: string;
  badgeColor?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  status: EventStatus;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location?: string;
  maxCapacity?: number;
  currentAttendees: number;
  requiresReservation: boolean;
  entranceFee?: number;
  image?: string;
  // Venue impact
  venueStatus: VenueStatus;
  affectedAreas?: string[];
  // Promotions
  promotions?: EventPromotion[];
  // Loyalty
  loyaltyBonus?: {
    enabled: boolean;
    pointsMultiplier?: number;
    bonusPoints?: number;
  };
  // Performer
  performer?: {
    name: string;
    genre?: string;
  };
  // Sports
  sportsInfo?: {
    sport: SportType;
    homeTeam?: string;
    awayTeam?: string;
    competition?: string;
  };
  createdAt: string;
}

// Event type configuration with categories
const EVENT_TYPE_CONFIG: Record<EventType, {
  label: string;
  labelIt: string;
  icon: string;
  color: string;
  category: 'entertainment' | 'food' | 'promo' | 'sports' | 'community' | 'private' | 'special';
}> = {
  // Entertainment
  live_music: { label: 'Live Music', labelIt: 'Musica Live', icon: '🎵', color: 'bg-purple-100 text-purple-700', category: 'entertainment' },
  dj_set: { label: 'DJ Set', labelIt: 'DJ Set', icon: '🎧', color: 'bg-blue-100 text-blue-700', category: 'entertainment' },
  karaoke: { label: 'Karaoke', labelIt: 'Karaoke', icon: '🎤', color: 'bg-pink-100 text-pink-700', category: 'entertainment' },
  trivia_night: { label: 'Trivia Night', labelIt: 'Quiz Night', icon: '🧠', color: 'bg-indigo-100 text-indigo-700', category: 'entertainment' },
  game_night: { label: 'Game Night', labelIt: 'Serata Giochi', icon: '🎲', color: 'bg-green-100 text-green-700', category: 'entertainment' },
  comedy_night: { label: 'Comedy Night', labelIt: 'Stand-up Comedy', icon: '😂', color: 'bg-yellow-100 text-yellow-700', category: 'entertainment' },
  open_mic: { label: 'Open Mic', labelIt: 'Open Mic', icon: '🎙️', color: 'bg-gray-100 text-gray-700', category: 'entertainment' },
  theme_night: { label: 'Theme Night', labelIt: 'Serata a Tema', icon: '🎭', color: 'bg-indigo-100 text-indigo-700', category: 'entertainment' },
  // Food & Beverage
  tasting: { label: 'Tasting', labelIt: 'Degustazione', icon: '🍷', color: 'bg-red-100 text-red-700', category: 'food' },
  pairing: { label: 'Pairing Event', labelIt: 'Abbinamento', icon: '🧀', color: 'bg-amber-100 text-amber-700', category: 'food' },
  chefs_table: { label: "Chef's Table", labelIt: 'Tavola dello Chef', icon: '👨‍🍳', color: 'bg-gray-700 text-white', category: 'food' },
  cooking_class: { label: 'Cooking Class', labelIt: 'Corso di Cucina', icon: '📚', color: 'bg-green-100 text-green-700', category: 'food' },
  menu_launch: { label: 'Menu Launch', labelIt: 'Lancio Menu', icon: '✨', color: 'bg-yellow-100 text-yellow-700', category: 'food' },
  food_tour: { label: 'Food Tour', labelIt: 'Tour Gastronomico', icon: '🗺️', color: 'bg-teal-100 text-teal-700', category: 'food' },
  // Time-based Promos
  happy_hour: { label: 'Happy Hour', labelIt: 'Happy Hour', icon: '🍹', color: 'bg-orange-100 text-orange-700', category: 'promo' },
  brunch: { label: 'Brunch', labelIt: 'Brunch', icon: '🥐', color: 'bg-pink-100 text-pink-700', category: 'promo' },
  lunch_special: { label: 'Lunch Special', labelIt: 'Menu Pranzo', icon: '🍽️', color: 'bg-blue-100 text-blue-700', category: 'promo' },
  late_night: { label: 'Late Night', labelIt: 'After Hours', icon: '🌙', color: 'bg-indigo-200 text-indigo-800', category: 'promo' },
  // Sports
  sports_viewing: { label: 'Sports Event', labelIt: 'Evento Sportivo', icon: '⚽', color: 'bg-emerald-100 text-emerald-700', category: 'sports' },
  // Community
  networking: { label: 'Networking', labelIt: 'Networking', icon: '🤝', color: 'bg-blue-100 text-blue-700', category: 'community' },
  charity: { label: 'Charity Event', labelIt: 'Evento Benefico', icon: '💝', color: 'bg-pink-100 text-pink-700', category: 'community' },
  book_club: { label: 'Book Club', labelIt: 'Club del Libro', icon: '📖', color: 'bg-amber-100 text-amber-700', category: 'community' },
  wine_club: { label: 'Wine Club', labelIt: 'Club del Vino', icon: '🍇', color: 'bg-purple-100 text-purple-700', category: 'community' },
  singles_night: { label: 'Singles Night', labelIt: 'Serata Single', icon: '💕', color: 'bg-red-100 text-red-700', category: 'community' },
  // Private & Corporate
  private_party: { label: 'Private Party', labelIt: 'Festa Privata', icon: '🎉', color: 'bg-pink-100 text-pink-700', category: 'private' },
  corporate: { label: 'Corporate Event', labelIt: 'Evento Aziendale', icon: '💼', color: 'bg-gray-100 text-gray-700', category: 'private' },
  birthday: { label: 'Birthday', labelIt: 'Compleanno', icon: '🎂', color: 'bg-pink-100 text-pink-700', category: 'private' },
  anniversary: { label: 'Anniversary', labelIt: 'Anniversario', icon: '💍', color: 'bg-amber-100 text-amber-700', category: 'private' },
  // Special
  holiday: { label: 'Holiday', labelIt: 'Festività', icon: '🎄', color: 'bg-red-100 text-red-700', category: 'special' },
  special_menu: { label: 'Special Menu', labelIt: 'Menu Speciale', icon: '⭐', color: 'bg-amber-100 text-amber-700', category: 'special' },
  closure: { label: 'Closure', labelIt: 'Chiusura', icon: '🔒', color: 'bg-gray-200 text-gray-700', category: 'special' },
  other: { label: 'Other', labelIt: 'Altro', icon: '📅', color: 'bg-gray-100 text-gray-700', category: 'special' },
};

const STATUS_CONFIG: Record<EventStatus, { label: string; color: string }> = {
  draft: { label: 'Bozza', color: 'bg-gray-100 text-gray-700' },
  published: { label: 'Pubblicato', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Annullato', color: 'bg-red-100 text-red-700' },
  completed: { label: 'Completato', color: 'bg-blue-100 text-blue-700' },
};

const VENUE_STATUS_CONFIG: Record<VenueStatus, { label: string; icon: string; color: string }> = {
  open: { label: 'Aperto normalmente', icon: '✅', color: 'text-green-600' },
  partial: { label: 'Parzialmente disponibile', icon: '⚠️', color: 'text-yellow-600' },
  reservation_only: { label: 'Solo prenotazione', icon: '📋', color: 'text-blue-600' },
  members_only: { label: 'Solo membri', icon: '🔐', color: 'text-purple-600' },
  closed: { label: 'Chiuso al pubblico', icon: '🔒', color: 'text-red-600' },
};

const PROMO_MECHANIC_CONFIG: Record<PromoMechanic, {
  label: string;
  icon: string;
  example: string;
  requiresValue: boolean;
  valueLabel?: string;
  requiresSecondaryValue?: boolean;
  secondaryValueLabel?: string;
}> = {
  percent_off: { label: 'Sconto %', icon: '🏷️', example: '-20%', requiresValue: true, valueLabel: 'Percentuale' },
  fixed_discount: { label: 'Sconto Fisso', icon: '💵', example: '-€5', requiresValue: true, valueLabel: 'Importo (€)' },
  fixed_price: { label: 'Prezzo Fisso', icon: '🎯', example: '€10', requiresValue: true, valueLabel: 'Prezzo (€)' },
  bogo: { label: '2x1', icon: '🎁', example: 'Buy One Get One', requiresValue: false },
  bogoho: { label: 'Compra 1 il 2° -50%', icon: '🎊', example: 'BOGO Half Off', requiresValue: false },
  buy_x_get_y: { label: 'Prendi X Paghi Y', icon: '🛒', example: '3x2', requiresValue: true, valueLabel: 'Prendi', requiresSecondaryValue: true, secondaryValueLabel: 'Paghi' },
  bundle: { label: 'Combo', icon: '📦', example: 'Combo €15', requiresValue: true, valueLabel: 'Prezzo Bundle (€)' },
  free_item: { label: 'Omaggio', icon: '🎁', example: 'Caffè gratis', requiresValue: false },
  bottomless: { label: 'Illimitato', icon: '♾️', example: 'Prosecco illimitato', requiresValue: true, valueLabel: 'Prezzo (€)' },
  points_multiplier: { label: 'Punti x2', icon: '⭐', example: 'Double points', requiresValue: true, valueLabel: 'Moltiplicatore' },
  points_bonus: { label: 'Punti Bonus', icon: '🌟', example: '+50 punti', requiresValue: true, valueLabel: 'Punti' },
  free_upgrade: { label: 'Upgrade Gratis', icon: '⬆️', example: 'Size L gratis', requiresValue: false },
  kids_free: { label: 'Bambini Gratis', icon: '👶', example: 'Under 12 free', requiresValue: false },
  group_discount: { label: 'Sconto Gruppo', icon: '👥', example: '-10% 4+ persone', requiresValue: true, valueLabel: 'Sconto %' },
  early_bird: { label: 'Early Bird', icon: '🐦', example: '-15% primi 20', requiresValue: true, valueLabel: 'Sconto %' },
  last_minute: { label: 'Last Minute', icon: '⏰', example: '-20% ultima ora', requiresValue: true, valueLabel: 'Sconto %' },
  none: { label: 'Nessuna', icon: '➖', example: '-', requiresValue: false },
};

const SPORT_CONFIG: Record<SportType, { label: string; icon: string }> = {
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

const EVENT_CATEGORIES = [
  { id: 'entertainment', label: 'Intrattenimento', color: 'bg-purple-100 text-purple-700' },
  { id: 'food', label: 'Food & Beverage', color: 'bg-orange-100 text-orange-700' },
  { id: 'promo', label: 'Promozioni', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'sports', label: 'Sport', color: 'bg-green-100 text-green-700' },
  { id: 'community', label: 'Community', color: 'bg-blue-100 text-blue-700' },
  { id: 'private', label: 'Privato', color: 'bg-gray-100 text-gray-700' },
  { id: 'special', label: 'Speciale', color: 'bg-amber-100 text-amber-700' },
];

// Event Form Modal Component - Multi-step wizard
interface EventFormModalProps {
  event: Event | null;
  onClose: () => void;
  onSave: (data: Omit<Event, 'id' | 'currentAttendees' | 'createdAt'>) => void;
}

type FormStep = 'basics' | 'venue' | 'promos' | 'extras';

function EventFormModal({ event, onClose, onSave }: EventFormModalProps) {
  const [step, setStep] = useState<FormStep>('basics');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    event?.eventType ? EVENT_TYPE_CONFIG[event.eventType].category : null
  );

  const [formData, setFormData] = useState({
    // Basics
    title: event?.title || '',
    description: event?.description || '',
    eventType: event?.eventType || 'live_music' as EventType,
    status: event?.status || 'draft' as EventStatus,
    startDate: event?.startDate || new Date().toISOString().split('T')[0],
    endDate: event?.endDate || new Date().toISOString().split('T')[0],
    startTime: event?.startTime || '20:00',
    endTime: event?.endTime || '23:00',
    // Venue
    venueStatus: event?.venueStatus || 'open' as VenueStatus,
    affectedAreas: event?.affectedAreas?.join(', ') || '',
    location: event?.location || '',
    maxCapacity: event?.maxCapacity || undefined,
    requiresReservation: event?.requiresReservation || false,
    entranceFee: event?.entranceFee || undefined,
    // Promotions
    promoEnabled: (event?.promotions?.length ?? 0) > 0,
    promoMechanic: event?.promotions?.[0]?.mechanic || 'percent_off' as PromoMechanic,
    promoValue: event?.promotions?.[0]?.value || 20,
    promoSecondaryValue: event?.promotions?.[0]?.secondaryValue || 1,
    promoName: event?.promotions?.[0]?.name || '',
    promoBadge: event?.promotions?.[0]?.badge || '',
    promoApplicableTo: event?.promotions?.[0]?.applicableTo || 'all' as const,
    // Extras - Loyalty
    loyaltyEnabled: event?.loyaltyBonus?.enabled || false,
    pointsMultiplier: event?.loyaltyBonus?.pointsMultiplier || 2,
    bonusPoints: event?.loyaltyBonus?.bonusPoints || 0,
    // Extras - Performer
    performerName: event?.performer?.name || '',
    performerGenre: event?.performer?.genre || '',
    // Extras - Sports
    sportsEnabled: !!event?.sportsInfo,
    sport: event?.sportsInfo?.sport || 'football' as SportType,
    homeTeam: event?.sportsInfo?.homeTeam || '',
    awayTeam: event?.sportsInfo?.awayTeam || '',
    competition: event?.sportsInfo?.competition || '',
  });

  const steps: { id: FormStep; label: string; icon: string }[] = [
    { id: 'basics', label: 'Info Base', icon: '📝' },
    { id: 'venue', label: 'Locale', icon: '🏠' },
    { id: 'promos', label: 'Promozioni', icon: '🏷️' },
    { id: 'extras', label: 'Extra', icon: '✨' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const promotions: EventPromotion[] = formData.promoEnabled ? [{
      id: '1',
      name: formData.promoName || `${PROMO_MECHANIC_CONFIG[formData.promoMechanic].label}`,
      mechanic: formData.promoMechanic,
      value: PROMO_MECHANIC_CONFIG[formData.promoMechanic].requiresValue ? formData.promoValue : undefined,
      secondaryValue: PROMO_MECHANIC_CONFIG[formData.promoMechanic].requiresSecondaryValue ? formData.promoSecondaryValue : undefined,
      applicableTo: formData.promoApplicableTo,
      badge: formData.promoBadge || PROMO_MECHANIC_CONFIG[formData.promoMechanic].example,
    }] : [];

    onSave({
      title: formData.title,
      description: formData.description,
      eventType: formData.eventType,
      status: formData.status,
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      venueStatus: formData.venueStatus,
      affectedAreas: formData.affectedAreas ? formData.affectedAreas.split(',').map(s => s.trim()) : undefined,
      location: formData.location || undefined,
      maxCapacity: formData.maxCapacity,
      requiresReservation: formData.requiresReservation,
      entranceFee: formData.entranceFee,
      promotions: promotions.length > 0 ? promotions : undefined,
      loyaltyBonus: formData.loyaltyEnabled ? {
        enabled: true,
        pointsMultiplier: formData.pointsMultiplier,
        bonusPoints: formData.bonusPoints,
      } : undefined,
      performer: formData.performerName ? {
        name: formData.performerName,
        genre: formData.performerGenre || undefined,
      } : undefined,
      sportsInfo: formData.sportsEnabled ? {
        sport: formData.sport,
        homeTeam: formData.homeTeam || undefined,
        awayTeam: formData.awayTeam || undefined,
        competition: formData.competition || undefined,
      } : undefined,
    });
  };

  const goNext = () => {
    const idx = currentStepIndex;
    if (idx < steps.length - 1) setStep(steps[idx + 1].id);
  };

  const goPrev = () => {
    const idx = currentStepIndex;
    if (idx > 0) setStep(steps[idx - 1].id);
  };

  // Filter event types by selected category
  const filteredEventTypes = selectedCategory
    ? Object.entries(EVENT_TYPE_CONFIG).filter(([, config]) => config.category === selectedCategory)
    : Object.entries(EVENT_TYPE_CONFIG);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {event ? 'Modifica Evento' : 'Nuovo Evento'}
              </h2>
              <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    step === s.id
                      ? 'bg-gray-900 text-white'
                      : idx < currentStepIndex
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Step 1: Basics */}
            {step === 'basics' && (
              <>
                {/* Category selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(null)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === null ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Tutte
                    </button>
                    {EVENT_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === cat.id ? 'bg-gray-900 text-white' : `${cat.color} hover:opacity-80`
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Event Type Grid */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo Evento</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto">
                    {filteredEventTypes.map(([type, config]) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, eventType: type as EventType })}
                        className={`p-2 rounded-lg border-2 text-center transition-colors ${
                          formData.eventType === type
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-lg block">{config.icon}</span>
                        <span className="text-xs text-gray-600 line-clamp-1">{config.labelIt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titolo *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Es: Jazz Night con Marco Rossi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Descrivi l'evento..."
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Inizio *</label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Fine</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ora Inizio *</label>
                    <input
                      type="time"
                      required
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ora Fine</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Venue */}
            {step === 'venue' && (
              <>
                {/* Venue Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stato del Locale durante l&apos;evento</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(VENUE_STATUS_CONFIG).map(([status, config]) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData({ ...formData, venueStatus: status as VenueStatus })}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-colors ${
                          formData.venueStatus === status
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl">{config.icon}</span>
                        <span className={`font-medium ${config.color}`}>{config.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Affected Areas (for partial status) */}
                {formData.venueStatus === 'partial' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aree interessate (separate da virgola)
                    </label>
                    <input
                      type="text"
                      value={formData.affectedAreas}
                      onChange={(e) => setFormData({ ...formData, affectedAreas: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Es: Sala 1, Terrazza"
                    />
                  </div>
                )}

                {/* Location & Capacity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Es: Sala Principale"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capienza Max</label>
                    <input
                      type="number"
                      value={formData.maxCapacity || ''}
                      onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Es: 50"
                    />
                  </div>
                </div>

                {/* Reservation & Fee */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.requiresReservation}
                        onChange={(e) => setFormData({ ...formData, requiresReservation: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Richiede prenotazione</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prezzo ingresso (€)</label>
                    <input
                      type="number"
                      value={formData.entranceFee || ''}
                      onChange={(e) => setFormData({ ...formData, entranceFee: e.target.value ? Number(e.target.value) : undefined })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="0 = gratuito"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Promotions */}
            {step === 'promos' && (
              <>
                {/* Enable Promo */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900">Promozione Evento</h4>
                      <p className="text-sm text-gray-600">Attiva sconti o offerte durante l&apos;evento</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.promoEnabled}
                        onChange={(e) => setFormData({ ...formData, promoEnabled: e.target.checked })}
                        className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Attiva</span>
                    </label>
                  </div>

                  {formData.promoEnabled && (
                    <div className="space-y-4">
                      {/* Promo Mechanic */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo di Promozione</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                          {Object.entries(PROMO_MECHANIC_CONFIG).filter(([key]) => key !== 'none').map(([mechanic, config]) => (
                            <button
                              key={mechanic}
                              type="button"
                              onClick={() => setFormData({ ...formData, promoMechanic: mechanic as PromoMechanic })}
                              className={`p-2 rounded-lg border-2 text-center transition-colors ${
                                formData.promoMechanic === mechanic
                                  ? 'border-orange-500 bg-orange-50'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <span className="text-lg block">{config.icon}</span>
                              <span className="text-xs text-gray-600 line-clamp-1">{config.label}</span>
                              <span className="text-xs text-gray-400">{config.example}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Value inputs based on mechanic */}
                      {PROMO_MECHANIC_CONFIG[formData.promoMechanic].requiresValue && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {PROMO_MECHANIC_CONFIG[formData.promoMechanic].valueLabel}
                            </label>
                            <input
                              type="number"
                              value={formData.promoValue}
                              onChange={(e) => setFormData({ ...formData, promoValue: Number(e.target.value) })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                          {PROMO_MECHANIC_CONFIG[formData.promoMechanic].requiresSecondaryValue && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                {PROMO_MECHANIC_CONFIG[formData.promoMechanic].secondaryValueLabel}
                              </label>
                              <input
                                type="number"
                                value={formData.promoSecondaryValue}
                                onChange={(e) => setFormData({ ...formData, promoSecondaryValue: Number(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Promo applies to */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Applica a</label>
                        <div className="flex gap-2">
                          {[
                            { id: 'all', label: 'Tutto il menu' },
                            { id: 'categories', label: 'Categorie' },
                            { id: 'products', label: 'Prodotti' },
                          ].map(opt => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, promoApplicableTo: opt.id as typeof formData.promoApplicableTo })}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                formData.promoApplicableTo === opt.id
                                  ? 'bg-orange-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Badge */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Badge (es: &quot;-20%&quot;, &quot;2x1&quot;, &quot;GRATIS&quot;)
                        </label>
                        <input
                          type="text"
                          value={formData.promoBadge}
                          onChange={(e) => setFormData({ ...formData, promoBadge: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                          placeholder={PROMO_MECHANIC_CONFIG[formData.promoMechanic].example}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Step 4: Extras */}
            {step === 'extras' && (
              <>
                {/* Sports Info (only for sports events) */}
                {formData.eventType === 'sports_viewing' && (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                    <h4 className="font-bold text-gray-900 mb-4">Informazioni Partita</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(SPORT_CONFIG).map(([sport, config]) => (
                            <button
                              key={sport}
                              type="button"
                              onClick={() => setFormData({ ...formData, sportsEnabled: true, sport: sport as SportType })}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                formData.sport === sport
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <span>{config.icon}</span>
                              <span>{config.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Squadra Casa</label>
                          <input
                            type="text"
                            value={formData.homeTeam}
                            onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            placeholder="Es: Juventus"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Squadra Ospite</label>
                          <input
                            type="text"
                            value={formData.awayTeam}
                            onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            placeholder="Es: Inter"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Competizione</label>
                        <input
                          type="text"
                          value={formData.competition}
                          onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          placeholder="Es: Serie A, Champions League"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Performer */}
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-3">Performer / Artista (opzionale)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                      <input
                        type="text"
                        value={formData.performerName}
                        onChange={(e) => setFormData({ ...formData, performerName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Es: DJ Marco"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Genere</label>
                      <input
                        type="text"
                        value={formData.performerGenre}
                        onChange={(e) => setFormData({ ...formData, performerGenre: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Es: House / Deep House"
                      />
                    </div>
                  </div>
                </div>

                {/* Loyalty Bonus */}
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">Bonus Fedeltà</h4>
                      <p className="text-sm text-gray-600">Punti extra per chi partecipa</p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.loyaltyEnabled}
                        onChange={(e) => setFormData({ ...formData, loyaltyEnabled: e.target.checked })}
                        className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Attiva</span>
                    </label>
                  </div>
                  {formData.loyaltyEnabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Moltiplicatore punti</label>
                        <select
                          value={formData.pointsMultiplier}
                          onChange={(e) => setFormData({ ...formData, pointsMultiplier: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                        >
                          <option value={1}>1x (normale)</option>
                          <option value={2}>2x</option>
                          <option value={3}>3x</option>
                          <option value={5}>5x</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Punti bonus</label>
                        <input
                          type="number"
                          value={formData.bonusPoints}
                          onChange={(e) => setFormData({ ...formData, bonusPoints: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                          placeholder="Es: 50"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer with navigation */}
          <div className="p-6 border-t border-gray-200 flex items-center justify-between">
            <div>
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Indietro
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annulla
              </button>
              {currentStepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  Avanti
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {event ? 'Salva Modifiche' : 'Crea Evento'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Jazz Night con Marco Rossi Quartet',
    description: 'Una serata di jazz dal vivo con il famoso quartetto di Marco Rossi',
    eventType: 'live_music',
    status: 'published',
    startDate: '2025-01-03',
    endDate: '2025-01-03',
    startTime: '21:00',
    endTime: '00:00',
    location: 'Sala Principale',
    maxCapacity: 80,
    currentAttendees: 45,
    requiresReservation: true,
    entranceFee: 15,
    venueStatus: 'open',
    loyaltyBonus: { enabled: true, pointsMultiplier: 2 },
    performer: { name: 'Marco Rossi Quartet', genre: 'Jazz' },
    createdAt: '2024-12-20',
  },
  {
    id: '2',
    title: 'Happy Hour Esteso',
    description: 'Aperitivo prolungato con sconti su cocktail e stuzzichini',
    eventType: 'happy_hour',
    status: 'published',
    startDate: '2025-01-02',
    endDate: '2025-01-02',
    startTime: '17:00',
    endTime: '21:00',
    location: 'Bar',
    requiresReservation: false,
    currentAttendees: 0,
    venueStatus: 'open',
    promotions: [{
      id: '1',
      name: 'Cocktail 2x1',
      mechanic: 'bogo',
      applicableTo: 'categories',
      badge: '2x1',
    }],
    loyaltyBonus: { enabled: true, bonusPoints: 50 },
    createdAt: '2024-12-28',
  },
  {
    id: '3',
    title: 'Degustazione Vini Toscani',
    description: 'Percorso di degustazione con 6 vini selezionati dalla Toscana',
    eventType: 'tasting',
    status: 'draft',
    startDate: '2025-01-10',
    endDate: '2025-01-10',
    startTime: '19:00',
    endTime: '22:00',
    location: 'Cantina',
    maxCapacity: 20,
    currentAttendees: 8,
    requiresReservation: true,
    entranceFee: 35,
    venueStatus: 'reservation_only',
    createdAt: '2024-12-30',
  },
  {
    id: '4',
    title: 'Capodanno 2024 - Tema Anni 80',
    description: 'Festeggia il nuovo anno con musica e atmosfera anni 80!',
    eventType: 'theme_night',
    status: 'completed',
    startDate: '2024-12-31',
    endDate: '2025-01-01',
    startTime: '21:00',
    endTime: '04:00',
    maxCapacity: 150,
    currentAttendees: 142,
    requiresReservation: true,
    entranceFee: 80,
    venueStatus: 'partial',
    affectedAreas: ['Terrazza'],
    loyaltyBonus: { enabled: true, pointsMultiplier: 3, bonusPoints: 100 },
    createdAt: '2024-12-01',
  },
  {
    id: '5',
    title: 'Juventus vs Inter - Serie A',
    description: 'Grande schermo, birra speciale e atmosfera da stadio!',
    eventType: 'sports_viewing',
    status: 'published',
    startDate: '2025-01-05',
    endDate: '2025-01-05',
    startTime: '20:45',
    endTime: '23:00',
    location: 'Sala TV',
    maxCapacity: 60,
    currentAttendees: 38,
    requiresReservation: true,
    venueStatus: 'open',
    promotions: [{
      id: '2',
      name: 'Birra Speciale',
      mechanic: 'fixed_price',
      value: 5,
      applicableTo: 'products',
      badge: '€5',
    }],
    sportsInfo: {
      sport: 'football',
      homeTeam: 'Juventus',
      awayTeam: 'Inter',
      competition: 'Serie A',
    },
    createdAt: '2025-01-02',
  },
  {
    id: '6',
    title: 'Festa Privata - Compleanno Maria',
    description: 'Locale riservato per festa privata',
    eventType: 'birthday',
    status: 'published',
    startDate: '2025-01-08',
    endDate: '2025-01-08',
    startTime: '19:00',
    endTime: '02:00',
    maxCapacity: 40,
    currentAttendees: 35,
    requiresReservation: true,
    venueStatus: 'closed',
    createdAt: '2025-01-01',
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filter, setFilter] = useState<'all' | EventStatus>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Filter events
  const filteredEvents = filter === 'all'
    ? events
    : events.filter(e => e.status === filter);

  // Sort by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(`${a.startDate}T${a.startTime}`);
    const dateB = new Date(`${b.startDate}T${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Stats
  const stats = {
    total: events.length,
    published: events.filter(e => e.status === 'published').length,
    draft: events.filter(e => e.status === 'draft').length,
    upcoming: events.filter(e => {
      const eventDate = new Date(`${e.startDate}T${e.startTime}`);
      return eventDate > new Date() && e.status === 'published';
    }).length,
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const handlePublish = (eventId: string) => {
    setEvents(prev => prev.map(e =>
      e.id === eventId ? { ...e, status: 'published' as EventStatus } : e
    ));
  };

  const handleUnpublish = (eventId: string) => {
    setEvents(prev => prev.map(e =>
      e.id === eventId ? { ...e, status: 'draft' as EventStatus } : e
    ));
  };

  const handleDelete = (eventId: string) => {
    if (confirm('Sei sicuro di voler eliminare questo evento?')) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Eventi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Crea e gestisci eventi per il tuo locale
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuovo Evento
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Totale Eventi</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Pubblicati</p>
          <p className="text-2xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">In Bozza</p>
          <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Prossimi</p>
          <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Tutti' },
          { id: 'published', label: 'Pubblicati' },
          { id: 'draft', label: 'Bozze' },
          { id: 'completed', label: 'Completati' },
          { id: 'cancelled', label: 'Annullati' },
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

      {/* Events List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {sortedEvents.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-5xl mb-4 block">📅</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun evento trovato</h3>
            <p className="text-gray-500 mb-4">Crea il tuo primo evento per iniziare</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Crea Evento
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Evento</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stato</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prenotazioni</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedEvents.map((event) => {
                const typeConfig = EVENT_TYPE_CONFIG[event.eventType];
                const statusConfig = STATUS_CONFIG[event.status];
                const isPast = new Date(`${event.endDate}T${event.endTime}`) < new Date();

                return (
                  <tr key={event.id} className={`hover:bg-gray-50 ${isPast ? 'opacity-60' : ''}`}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${typeConfig.color} flex items-center justify-center text-lg`}>
                          {typeConfig.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          {event.performer && (
                            <p className="text-sm text-gray-500">{event.performer.name}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                        {typeConfig.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-900">{formatDate(event.startDate)}</p>
                      <p className="text-xs text-gray-500">{event.startTime} - {event.endTime}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                        {event.venueStatus !== 'open' && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${VENUE_STATUS_CONFIG[event.venueStatus].color} bg-gray-100`}>
                            {VENUE_STATUS_CONFIG[event.venueStatus].icon}
                          </span>
                        )}
                        {event.promotions && event.promotions.length > 0 && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                            {event.promotions[0].badge || PROMO_MECHANIC_CONFIG[event.promotions[0].mechanic].icon}
                          </span>
                        )}
                        {event.loyaltyBonus?.enabled && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            {event.loyaltyBonus.pointsMultiplier ? `${event.loyaltyBonus.pointsMultiplier}x` : `+${event.loyaltyBonus.bonusPoints}`}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {event.maxCapacity ? (
                        <div>
                          <p className="text-sm text-gray-900">
                            {event.currentAttendees} / {event.maxCapacity}
                          </p>
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                            <div
                              className={`h-full rounded-full ${
                                event.currentAttendees / event.maxCapacity > 0.8
                                  ? 'bg-red-500'
                                  : event.currentAttendees / event.maxCapacity > 0.5
                                  ? 'bg-amber-500'
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${(event.currentAttendees / event.maxCapacity) * 100}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                          title="Modifica"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        {event.status === 'draft' ? (
                          <button
                            onClick={() => handlePublish(event.id)}
                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg"
                            title="Pubblica"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        ) : event.status === 'published' ? (
                          <button
                            onClick={() => handleUnpublish(event.id)}
                            className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg"
                            title="Rimuovi pubblicazione"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </button>
                        ) : null}
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          title="Elimina"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
        <h3 className="font-bold text-gray-900 mb-3">Suggerimenti per eventi di successo</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📸</span>
            <div>
              <p className="font-medium text-gray-900">Aggiungi immagini</p>
              <p className="text-sm text-gray-600">Gli eventi con foto ricevono 3x più interesse</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-medium text-gray-900">Attiva bonus fedeltà</p>
              <p className="text-sm text-gray-600">I punti extra aumentano la partecipazione del 40%</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔔</span>
            <div>
              <p className="font-medium text-gray-900">Invia notifiche</p>
              <p className="text-sm text-gray-600">Ricorda l'evento ai tuoi follower 24h prima</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || selectedEvent) && (
        <EventFormModal
          event={selectedEvent}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedEvent(null);
          }}
          onSave={(eventData) => {
            if (selectedEvent) {
              // Update existing
              setEvents(prev => prev.map(e =>
                e.id === selectedEvent.id ? { ...e, ...eventData } : e
              ));
            } else {
              // Create new
              const newEvent: Event = {
                id: String(Date.now()),
                ...eventData,
                currentAttendees: 0,
                createdAt: new Date().toISOString(),
              };
              setEvents(prev => [newEvent, ...prev]);
            }
            setShowCreateModal(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}
