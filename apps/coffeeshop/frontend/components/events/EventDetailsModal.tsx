'use client';

import { Event, EVENT_TYPE_CONFIG } from '@/types/event';

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onReserve?: (event: Event) => void;
  onShare?: (event: Event) => void;
}

export function EventDetailsModal({
  event,
  isOpen,
  onClose,
  onReserve,
  onShare,
}: EventDetailsModalProps) {
  if (!isOpen || !event) return null;

  const typeConfig = EVENT_TYPE_CONFIG[event.eventType];

  // Format full date
  const formatFullDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Check if multi-day event
  const isMultiDay = event.startDate !== event.endDate;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="absolute inset-x-0 bottom-0 max-h-[90vh] bg-white dark:bg-gray-900 rounded-t-3xl overflow-hidden animate-slide-up">
        {/* Header Image */}
        <div className="relative h-56">
          {event.image ? (
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${typeConfig.color} flex items-center justify-center`}>
              <span className="text-8xl">{typeConfig.icon}</span>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Share button */}
          <button
            onClick={() => onShare?.(event)}
            className="absolute top-4 left-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          {/* Type badge */}
          <div className="absolute bottom-4 left-4">
            <span className={`px-4 py-2 bg-gradient-to-r ${typeConfig.color} text-white font-medium rounded-full shadow-lg`}>
              {typeConfig.icon} {typeConfig.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-14rem)]">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{event.title}</h2>

          {/* Date & Time */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {formatFullDate(event.startDate)}
              </p>
              {isMultiDay && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  fino a {formatFullDate(event.endDate)}
                </p>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {event.startTime} - {event.endTime}
              </p>
              {event.recurrence !== 'none' && (
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                  {event.recurrence === 'weekly' && 'Ogni settimana'}
                  {event.recurrence === 'daily' && 'Ogni giorno'}
                  {event.recurrence === 'monthly' && 'Ogni mese'}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{event.location}</p>
                {event.maxCapacity && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Capacità: {event.maxCapacity} persone
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Performer */}
          {event.performer && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
              {event.performer.image ? (
                <img
                  src={event.performer.image}
                  alt={event.performer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎤</span>
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{event.performer.name}</p>
                {event.performer.genre && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.performer.genre}</p>
                )}
                {event.performer.socialLinks && (
                  <div className="flex gap-2 mt-2">
                    {event.performer.socialLinks.instagram && (
                      <a
                        href={`https://instagram.com/${event.performer.socialLinks.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-600"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {event.performer.socialLinks.spotify && (
                      <a
                        href={event.performer.socialLinks.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-600"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Descrizione</h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{event.description}</p>
            </div>
          )}

          {/* Loyalty Bonus */}
          {event.loyaltyBonus?.enabled && (
            <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⭐</span>
                <div>
                  <p className="font-bold">Bonus Fedeltà</p>
                  <p className="text-sm text-purple-100">
                    {event.loyaltyBonus.pointsMultiplier && `${event.loyaltyBonus.pointsMultiplier}x punti su tutti gli acquisti`}
                    {event.loyaltyBonus.bonusPoints && ` • +${event.loyaltyBonus.bonusPoints} punti bonus partecipazione`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Promotions */}
          {event.promotions && event.promotions.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Promozioni Speciali</h3>
              <div className="space-y-2">
                {event.promotions.map((promo, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl"
                  >
                    <span className="text-xl">
                      {promo.type === 'discount' && '💰'}
                      {promo.type === 'freebie' && '🎁'}
                      {promo.type === 'bundle' && '📦'}
                    </span>
                    <div>
                      <p className="font-medium text-green-700 dark:text-green-300">
                        {promo.type === 'discount' && promo.discountPercent && `-${promo.discountPercent}%`}
                        {promo.type === 'freebie' && 'Omaggio'}
                        {promo.type === 'bundle' && 'Bundle Speciale'}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">{promo.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="flex flex-wrap gap-3 mb-6">
            {event.entranceFee !== undefined && event.entranceFee > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <span>🎟️</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Ingresso: {event.entranceFee}{event.entranceFeeCurrency || '€'}
                </span>
              </div>
            )}
            {event.entranceFee === 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <span>✨</span>
                <span className="text-sm text-green-700 dark:text-green-300">Ingresso Gratuito</span>
              </div>
            )}
            {event.ageRestriction && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <span>🔞</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">+{event.ageRestriction} anni</span>
              </div>
            )}
            {event.dressCode && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <span>👔</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{event.dressCode}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex gap-3">
            {event.requiresReservation ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Chiudi
                </button>
                <button
                  onClick={() => onReserve?.(event)}
                  className={`flex-1 py-3 px-4 bg-gradient-to-r ${typeConfig.color} text-white font-medium rounded-xl hover:opacity-90 transition-opacity`}
                >
                  Prenota Ora
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className={`w-full py-3 px-4 bg-gradient-to-r ${typeConfig.color} text-white font-medium rounded-xl hover:opacity-90 transition-opacity`}
              >
                Ho capito, ci sarò!
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
