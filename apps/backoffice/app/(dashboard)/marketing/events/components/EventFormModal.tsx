'use client';

import { useState } from 'react';
import {
  Event,
  EventType,
  EventStatus,
  VenueStatus,
  PromoMechanic,
  EventPromotion,
  EventCreateInput,
  getEventCategory,
  getDefaultEvent,
  EVENT_TYPE_CONFIG,
  VENUE_STATUS_CONFIG,
} from '@/lib/events-service';
import { PROMO_MECHANIC_CONFIG, SPORT_CONFIG, EVENT_CATEGORIES } from './types';
import type { SportType } from './types';

interface EventFormModalProps {
  event: Event | null;
  locationId: string;
  onClose: () => void;
  onSave: (data: EventCreateInput) => Promise<void>;
}

type FormStep = 'basics' | 'venue' | 'promos' | 'extras';

function EventFormModal({ event, locationId, onClose, onSave }: EventFormModalProps) {
  const [step, setStep] = useState<FormStep>('basics');
  const [saving, setSaving] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    event?.event_type ? EVENT_TYPE_CONFIG[event.event_type].category : null
  );

  const [formData, setFormData] = useState({
    // Basics
    title: event?.title || '',
    description: event?.description || '',
    eventType: event?.event_type || ('live_music' as EventType),
    status: event?.status || ('draft' as EventStatus),
    startDate: event?.start_date || new Date().toISOString().split('T')[0],
    endDate: event?.end_date || '',
    startTime: event?.start_time || '20:00',
    endTime: event?.end_time || '23:00',
    // Venue
    venueStatus: event?.venue_status || ('open' as VenueStatus),
    affectedAreas: event?.affected_areas?.join(', ') || '',
    maxCapacity: event?.max_capacity || undefined,
    requiresReservation: event?.requires_reservation || false,
    entranceFee: event?.entrance_fee || undefined,
    // Promotions
    promoEnabled: (event?.promotions?.length ?? 0) > 0,
    promoMechanic: event?.promotions?.[0]?.mechanic || ('percent_off' as PromoMechanic),
    promoValue: event?.promotions?.[0]?.value || 20,
    promoSecondaryValue: event?.promotions?.[0]?.secondaryValue || 1,
    promoName: event?.promotions?.[0]?.name || '',
    promoBadge: event?.promotions?.[0]?.badge || '',
    promoApplicableTo: event?.promotions?.[0]?.applicableTo || ('all' as const),
    // Extras - Loyalty
    loyaltyEnabled: event?.loyalty_bonus?.enabled || false,
    pointsMultiplier: event?.loyalty_bonus?.pointsMultiplier || 2,
    bonusPoints: event?.loyalty_bonus?.bonusPoints || 0,
    // Extras - Performer
    performerName: event?.performer?.name || '',
    performerGenre: event?.performer?.genre || '',
    // Extras - Sports
    sportsEnabled: !!event?.sports_info,
    sport: event?.sports_info?.sport || ('football' as SportType),
    homeTeam: event?.sports_info?.homeTeam || '',
    awayTeam: event?.sports_info?.awayTeam || '',
    competition: event?.sports_info?.competition || '',
    // Featured
    isFeatured: event?.is_featured || false,
    isPublic: event?.is_public ?? true,
  });

  const steps: { id: FormStep; label: string; icon: string }[] = [
    { id: 'basics', label: 'Info Base', icon: '📝' },
    { id: 'venue', label: 'Locale', icon: '🏠' },
    { id: 'promos', label: 'Promozioni', icon: '🏷️' },
    { id: 'extras', label: 'Extra', icon: '✨' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const promotions: EventPromotion[] = formData.promoEnabled
        ? [
            {
              id: crypto.randomUUID(),
              name: formData.promoName || `${PROMO_MECHANIC_CONFIG[formData.promoMechanic].label}`,
              mechanic: formData.promoMechanic,
              value: PROMO_MECHANIC_CONFIG[formData.promoMechanic].requiresValue
                ? formData.promoValue
                : undefined,
              secondaryValue: PROMO_MECHANIC_CONFIG[formData.promoMechanic].requiresSecondaryValue
                ? formData.promoSecondaryValue
                : undefined,
              applicableTo: formData.promoApplicableTo,
              badge: formData.promoBadge || PROMO_MECHANIC_CONFIG[formData.promoMechanic].example,
            },
          ]
        : [];

      const eventData: EventCreateInput = {
        ...getDefaultEvent(locationId),
        location_id: locationId,
        title: formData.title,
        description: formData.description || null,
        event_type: formData.eventType,
        event_category: getEventCategory(formData.eventType),
        status: formData.status,
        start_date: formData.startDate,
        end_date: formData.endDate || null,
        start_time: formData.startTime,
        end_time: formData.endTime,
        venue_status: formData.venueStatus,
        affected_areas: formData.affectedAreas
          ? formData.affectedAreas.split(',').map((s) => s.trim())
          : null,
        max_capacity: formData.maxCapacity || null,
        requires_reservation: formData.requiresReservation,
        entrance_fee: formData.entranceFee || null,
        promotions: promotions,
        loyalty_bonus: formData.loyaltyEnabled
          ? {
              enabled: true,
              pointsMultiplier: formData.pointsMultiplier,
              bonusPoints: formData.bonusPoints,
            }
          : { enabled: false },
        performer: formData.performerName
          ? {
              name: formData.performerName,
              genre: formData.performerGenre || undefined,
            }
          : null,
        sports_info: formData.sportsEnabled
          ? {
              sport: formData.sport,
              homeTeam: formData.homeTeam || undefined,
              awayTeam: formData.awayTeam || undefined,
              competition: formData.competition || undefined,
            }
          : null,
        is_featured: formData.isFeatured,
        is_public: formData.isPublic,
      };

      await onSave(eventData);
    } finally {
      setSaving(false);
    }
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
      <div className="m-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {event ? 'Modifica Evento' : 'Nuovo Evento'}
              </h2>
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

            {/* Step indicator */}
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(s.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
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
          <div className="space-y-6 p-6">
            {/* Step 1: Basics */}
            {step === 'basics' && (
              <>
                {/* Category selector */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Categoria</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(null)}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        selectedCategory === null
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Tutte
                    </button>
                    {EVENT_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-gray-900 text-white'
                            : `${cat.color} hover:opacity-80`
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Event Type Grid */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tipo Evento
                  </label>
                  <div className="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                    {filteredEventTypes.map(([type, config]) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, eventType: type as EventType })}
                        className={`rounded-lg border-2 p-3 text-left transition-colors ${
                          formData.eventType === type
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{config.icon}</span>
                          <span className="text-sm font-medium text-gray-800">
                            {config.labelIt}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{config.descriptionIt}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="grid gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Titolo *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      placeholder="Es: Jazz Night con Marco Rossi"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Descrizione
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                      placeholder="Descrivi l'evento..."
                    />
                  </div>
                </div>

                {/* Date & Time */}
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Data Fine
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Ora Inizio *
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Ora Fine</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Visibility options */}
                <div className="flex gap-6">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                      className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Visibile al pubblico</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="h-4 w-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm font-medium text-gray-700">In evidenza</span>
                  </label>
                </div>
              </>
            )}

            {/* Step 2: Venue */}
            {step === 'venue' && (
              <>
                {/* Venue Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Stato del Locale durante l&apos;evento
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {Object.entries(VENUE_STATUS_CONFIG).map(([status, config]) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, venueStatus: status as VenueStatus })
                        }
                        className={`flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-colors ${
                          formData.venueStatus === status
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl">{config.icon}</span>
                        <span className={`font-medium ${config.color}`}>{config.labelIt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Affected Areas (for partial status) */}
                {formData.venueStatus === 'partial' && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Aree interessate (separate da virgola)
                    </label>
                    <input
                      type="text"
                      value={formData.affectedAreas}
                      onChange={(e) => setFormData({ ...formData, affectedAreas: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                      placeholder="Es: Sala 1, Terrazza"
                    />
                  </div>
                )}

                {/* Capacity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Capienza Max
                    </label>
                    <input
                      type="number"
                      value={formData.maxCapacity || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxCapacity: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                      placeholder="Es: 50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Prezzo ingresso (€)
                    </label>
                    <input
                      type="number"
                      value={formData.entranceFee || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          entranceFee: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                      placeholder="0 = gratuito"
                    />
                  </div>
                </div>

                {/* Reservation */}
                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.requiresReservation}
                      onChange={(e) =>
                        setFormData({ ...formData, requiresReservation: e.target.checked })
                      }
                      className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Richiede prenotazione</span>
                  </label>
                </div>
              </>
            )}

            {/* Step 3: Promotions */}
            {step === 'promos' && (
              <>
                {/* Enable Promo */}
                <div className="rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Promozione Evento</h4>
                      <p className="text-sm text-gray-600">
                        Attiva sconti o offerte durante l&apos;evento
                      </p>
                    </div>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.promoEnabled}
                        onChange={(e) =>
                          setFormData({ ...formData, promoEnabled: e.target.checked })
                        }
                        className="h-5 w-5 rounded text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Attiva</span>
                    </label>
                  </div>

                  {formData.promoEnabled && (
                    <div className="space-y-4">
                      {/* Promo Mechanic */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Tipo di Promozione
                        </label>
                        <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-4">
                          {Object.entries(PROMO_MECHANIC_CONFIG)
                            .filter(([key]) => key !== 'none')
                            .map(([mechanic, config]) => (
                              <button
                                key={mechanic}
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    promoMechanic: mechanic as PromoMechanic,
                                  })
                                }
                                className={`rounded-lg border-2 p-2 text-center transition-colors ${
                                  formData.promoMechanic === mechanic
                                    ? 'border-orange-500 bg-orange-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                              >
                                <span className="block text-lg">{config.icon}</span>
                                <span className="line-clamp-1 text-xs text-gray-600">
                                  {config.label}
                                </span>
                                <span className="text-xs text-gray-400">{config.example}</span>
                              </button>
                            ))}
                        </div>
                      </div>

                      {/* Value inputs based on mechanic */}
                      {PROMO_MECHANIC_CONFIG[formData.promoMechanic].requiresValue && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              {PROMO_MECHANIC_CONFIG[formData.promoMechanic].valueLabel}
                            </label>
                            <input
                              type="number"
                              value={formData.promoValue}
                              onChange={(e) =>
                                setFormData({ ...formData, promoValue: Number(e.target.value) })
                              }
                              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-500"
                            />
                          </div>
                          {PROMO_MECHANIC_CONFIG[formData.promoMechanic].requiresSecondaryValue && (
                            <div>
                              <label className="mb-1 block text-sm font-medium text-gray-700">
                                {PROMO_MECHANIC_CONFIG[formData.promoMechanic].secondaryValueLabel}
                              </label>
                              <input
                                type="number"
                                value={formData.promoSecondaryValue}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    promoSecondaryValue: Number(e.target.value),
                                  })
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-500"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Promo applies to */}
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Applica a
                        </label>
                        <div className="flex gap-2">
                          {[
                            { id: 'all', label: 'Tutto il menu' },
                            { id: 'categories', label: 'Categorie' },
                            { id: 'products', label: 'Prodotti' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  promoApplicableTo: opt.id as typeof formData.promoApplicableTo,
                                })
                              }
                              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
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
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Badge (es: &quot;-20%&quot;, &quot;2x1&quot;, &quot;GRATIS&quot;)
                        </label>
                        <input
                          type="text"
                          value={formData.promoBadge}
                          onChange={(e) => setFormData({ ...formData, promoBadge: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-500"
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
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <h4 className="mb-4 font-bold text-gray-900">Informazioni Partita</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Sport
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(SPORT_CONFIG).map(([sport, config]) => (
                            <button
                              key={sport}
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  sportsEnabled: true,
                                  sport: sport as SportType,
                                })
                              }
                              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                                formData.sport === sport
                                  ? 'bg-emerald-600 text-white'
                                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
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
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Squadra Casa
                          </label>
                          <input
                            type="text"
                            value={formData.homeTeam}
                            onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                            placeholder="Es: Juventus"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Squadra Ospite
                          </label>
                          <input
                            type="text"
                            value={formData.awayTeam}
                            onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                            placeholder="Es: Inter"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Competizione
                        </label>
                        <input
                          type="text"
                          value={formData.competition}
                          onChange={(e) =>
                            setFormData({ ...formData, competition: e.target.value })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                          placeholder="Es: Serie A, Champions League"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Performer */}
                <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                  <h4 className="mb-3 font-bold text-gray-900">Performer / Artista (opzionale)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
                      <input
                        type="text"
                        value={formData.performerName}
                        onChange={(e) =>
                          setFormData({ ...formData, performerName: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                        placeholder="Es: DJ Marco"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Genere</label>
                      <input
                        type="text"
                        value={formData.performerGenre}
                        onChange={(e) =>
                          setFormData({ ...formData, performerGenre: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                        placeholder="Es: House / Deep House"
                      />
                    </div>
                  </div>
                </div>

                {/* Loyalty Bonus */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Bonus Fedeltà</h4>
                      <p className="text-sm text-gray-600">Punti extra per chi partecipa</p>
                    </div>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.loyaltyEnabled}
                        onChange={(e) =>
                          setFormData({ ...formData, loyaltyEnabled: e.target.checked })
                        }
                        className="h-5 w-5 rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Attiva</span>
                    </label>
                  </div>
                  {formData.loyaltyEnabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Moltiplicatore punti
                        </label>
                        <select
                          value={formData.pointsMultiplier}
                          onChange={(e) =>
                            setFormData({ ...formData, pointsMultiplier: Number(e.target.value) })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500"
                        >
                          <option value={1}>1x (normale)</option>
                          <option value={2}>2x</option>
                          <option value={3}>3x</option>
                          <option value={5}>5x</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Punti bonus
                        </label>
                        <input
                          type="number"
                          value={formData.bonusPoints}
                          onChange={(e) =>
                            setFormData({ ...formData, bonusPoints: Number(e.target.value) })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500"
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
          <div className="flex items-center justify-between border-t border-gray-200 p-6">
            <div>
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Indietro
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Annulla
              </button>
              {currentStepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
                >
                  Avanti
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {saving ? 'Salvataggio...' : event ? 'Salva Modifiche' : 'Crea Evento'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export { EventFormModal };
