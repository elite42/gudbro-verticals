'use client';

import { useState } from 'react';
import { Event, EVENT_TYPE_CONFIG } from '@/types/event';

interface EventCardProps {
  event: Event;
  variant?: 'full' | 'compact' | 'mini';
  onDetailsClick?: (event: Event) => void;
  onReserveClick?: (event: Event) => void;
}

export function EventCard({ event, variant = 'full', onDetailsClick, onReserveClick }: EventCardProps) {
  const [imageError, setImageError] = useState(false);
  const typeConfig = EVENT_TYPE_CONFIG[event.eventType];

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Oggi';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Domani';
    } else {
      return date.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' });
    }
  };

  // Check if event is happening now
  const isHappeningNow = () => {
    const now = new Date();
    const start = new Date(`${event.startDate}T${event.startTime}`);
    const end = new Date(`${event.endDate}T${event.endTime}`);
    return now >= start && now <= end;
  };

  // Check if event is today
  const isToday = () => {
    const today = new Date().toDateString();
    const eventDate = new Date(event.startDate).toDateString();
    return today === eventDate;
  };

  const happeningNow = isHappeningNow();
  const today = isToday();

  if (variant === 'mini') {
    return (
      <button
        onClick={() => onDetailsClick?.(event)}
        className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full text-left"
      >
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${typeConfig.color} flex items-center justify-center text-lg`}>
          {typeConfig.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{event.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(event.startDate)} · {event.startTime}
          </p>
        </div>
        {happeningNow && (
          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full animate-pulse">
            LIVE
          </span>
        )}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={() => onDetailsClick?.(event)}
        className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl hover:shadow-md transition-all w-full text-left"
      >
        {/* Image or Icon */}
        <div className="flex-shrink-0">
          {event.image && !imageError ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-20 h-20 rounded-xl object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${typeConfig.color} flex items-center justify-center text-3xl`}>
              {typeConfig.icon}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 bg-gradient-to-r ${typeConfig.color} text-white text-xs font-medium rounded-full`}>
              {typeConfig.label}
            </span>
            {happeningNow && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full animate-pulse">
                LIVE
              </span>
            )}
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white truncate">{event.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(event.startDate)} · {event.startTime} - {event.endTime}
          </p>
          {event.loyaltyBonus?.enabled && (
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              {event.loyaltyBonus.pointsMultiplier}x punti durante l'evento
            </p>
          )}
        </div>

        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  // Full variant
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
      {/* Image Header */}
      <div className="relative">
        {event.image && !imageError ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-48 bg-gradient-to-br ${typeConfig.color} flex items-center justify-center`}>
            <span className="text-6xl">{typeConfig.icon}</span>
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className={`px-3 py-1 bg-gradient-to-r ${typeConfig.color} text-white text-sm font-medium rounded-full shadow-lg`}>
            {typeConfig.icon} {typeConfig.label}
          </span>
          {happeningNow && (
            <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full shadow-lg animate-pulse">
              IN CORSO
            </span>
          )}
          {today && !happeningNow && (
            <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full shadow-lg">
              OGGI
            </span>
          )}
        </div>

        {/* Date badge */}
        <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-center shadow-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
            {new Date(event.startDate).toLocaleDateString('it-IT', { weekday: 'short' })}
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {new Date(event.startDate).getDate()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
            {new Date(event.startDate).toLocaleDateString('it-IT', { month: 'short' })}
          </p>
        </div>

        {/* Performer badge (if any) */}
        {event.performer && (
          <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
            {event.performer.image && (
              <img src={event.performer.image} alt={event.performer.name} className="w-10 h-10 rounded-full object-cover" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{event.performer.name}</p>
              {event.performer.genre && (
                <p className="text-gray-300 text-sm">{event.performer.genre}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>

        {/* Time & Location */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
          )}
          {event.entranceFee !== undefined && event.entranceFee > 0 && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <span>{event.entranceFee}{event.entranceFeeCurrency || '€'}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {event.shortDescription && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {event.shortDescription}
          </p>
        )}

        {/* Loyalty bonus */}
        {event.loyaltyBonus?.enabled && (
          <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl mb-4">
            <span className="text-xl">⭐</span>
            <div>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {event.loyaltyBonus.pointsMultiplier && `${event.loyaltyBonus.pointsMultiplier}x punti`}
                {event.loyaltyBonus.bonusPoints && ` +${event.loyaltyBonus.bonusPoints} bonus`}
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400">Durante questo evento</p>
            </div>
          </div>
        )}

        {/* Promotions */}
        {event.promotions && event.promotions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.promotions.map((promo, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-lg"
              >
                {promo.type === 'discount' && promo.discountPercent && `-${promo.discountPercent}%`}
                {promo.type === 'freebie' && '🎁 Omaggio'}
                {promo.type === 'bundle' && '📦 Bundle'} {promo.description}
              </span>
            ))}
          </div>
        )}

        {/* Capacity indicator */}
        {event.maxCapacity && event.currentAttendees !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Posti disponibili</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {event.maxCapacity - event.currentAttendees} / {event.maxCapacity}
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
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
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onDetailsClick?.(event)}
            className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Dettagli
          </button>
          {event.requiresReservation && (
            <button
              onClick={() => onReserveClick?.(event)}
              className={`flex-1 py-3 px-4 bg-gradient-to-r ${typeConfig.color} text-white font-medium rounded-xl hover:opacity-90 transition-opacity`}
            >
              Prenota
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
