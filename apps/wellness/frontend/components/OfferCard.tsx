'use client';

import Link from 'next/link';
import { wellnessConfig } from '../config/wellness.config';

interface Offer {
  id: string | number;
  name: string;
  description: string;
  price: number;
  duration?: string;
  services?: string[];
  icon?: string;
  popular?: boolean;
  type?: 'package' | 'promotion';

  // Promotion-specific fields
  validFrom?: string;
  validTo?: string;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  conditions?: string;
}

interface OfferCardProps {
  offer: Offer;
  variant?: 'grid' | 'list';
  showBookButton?: boolean;
}

export function OfferCard({
  offer,
  variant = 'grid',
  showBookButton = true
}: OfferCardProps) {
  const { contact } = wellnessConfig;

  // Check if promotion is active
  const isPromotionActive = () => {
    if (offer.type !== 'promotion') return true;
    if (!offer.validFrom || !offer.validTo) return true;

    const now = new Date();
    const from = new Date(offer.validFrom);
    const to = new Date(offer.validTo);

    return now >= from && now <= to;
  };

  const active = isPromotionActive();

  // Booking link
  const bookingLink = `https://zalo.me/${contact?.zaloId}?text=${encodeURIComponent(
    `Vorrei prenotare: ${offer.name}`
  )}`;

  // Calculate discounted price if promotion
  const getDisplayPrice = () => {
    if (offer.type === 'promotion' && offer.discount) {
      if (offer.discount.type === 'percentage') {
        return offer.price * (1 - offer.discount.value / 100);
      } else {
        return offer.price - offer.discount.value;
      }
    }
    return offer.price;
  };

  const displayPrice = getDisplayPrice();
  const hasDiscount = offer.type === 'promotion' && displayPrice !== offer.price;

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (variant === 'list') {
    // List variant for horizontal scroll
    return (
      <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden snap-start hover:shadow-2xl transition-all">
        {offer.popular && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 font-bold text-sm">
            ⭐ PIÙ POPOLARE ⭐
          </div>
        )}

        {offer.type === 'promotion' && !active && (
          <div className="bg-gray-500 text-white text-center py-2 font-bold text-sm">
            ⏰ OFFERTA SCADUTA
          </div>
        )}

        {offer.type === 'promotion' && active && (
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-center py-2 font-bold text-sm">
            🎁 OFFERTA SPECIALE
          </div>
        )}

        <div className="p-6">
          {offer.icon && (
            <div className="text-6xl text-center mb-4">{offer.icon}</div>
          )}

          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            {offer.name}
          </h2>

          <p className="text-center text-gray-600 mb-4 text-sm line-clamp-2">
            {offer.description}
          </p>

          {offer.duration && (
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-sm text-gray-500">
                ⏱️ {offer.duration}
              </span>
            </div>
          )}

          {/* Promotion validity */}
          {offer.type === 'promotion' && offer.validFrom && offer.validTo && (
            <div className="bg-pink-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-pink-700 text-center">
                Valida dal {formatDate(offer.validFrom)} al {formatDate(offer.validTo)}
              </p>
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            <div className="text-center">
              {hasDiscount && (
                <div className="text-sm text-gray-400 line-through mb-1">
                  {offer.price.toLocaleString()} VND
                </div>
              )}
              <div className="text-3xl font-bold text-pink-600">
                {displayPrice.toLocaleString()} VND
              </div>
              {hasDiscount && offer.discount && (
                <div className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mt-2">
                  -{offer.discount.value}{offer.discount.type === 'percentage' ? '%' : ' VND'}
                </div>
              )}
            </div>
          </div>

          {/* Services included */}
          {offer.services && offer.services.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2 uppercase">
                Include:
              </p>
              <ul className="space-y-1">
                {offer.services.map((service, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-pink-500 flex-shrink-0">✓</span>
                    <span className="line-clamp-1">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showBookButton && active && (
            <Link
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              💬 Prenota Ora
            </Link>
          )}

          {!active && (
            <div className="text-center text-gray-400 py-3">
              Offerta non più disponibile
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 ${
        offer.popular ? 'ring-4 ring-purple-500' : ''
      }`}
    >
      {offer.popular && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 font-bold">
          ⭐ PIÙ POPOLARE ⭐
        </div>
      )}

      {offer.type === 'promotion' && !active && (
        <div className="bg-gray-500 text-white text-center py-2 font-bold">
          ⏰ OFFERTA SCADUTA
        </div>
      )}

      {offer.type === 'promotion' && active && (
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-center py-2 font-bold">
          🎁 OFFERTA SPECIALE
        </div>
      )}

      <div className="p-6">
        {offer.icon && (
          <div className="text-6xl text-center mb-4">{offer.icon}</div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          {offer.name}
        </h2>

        <p className="text-center text-gray-600 mb-4">
          {offer.description}
        </p>

        {offer.duration && (
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-sm text-gray-500">
              ⏱️ {offer.duration}
            </span>
          </div>
        )}

        {/* Promotion validity */}
        {offer.type === 'promotion' && offer.validFrom && offer.validTo && (
          <div className="bg-pink-50 rounded-lg p-3 mb-4">
            <p className="text-xs text-pink-700 text-center">
              Valida dal {formatDate(offer.validFrom)} al {formatDate(offer.validTo)}
            </p>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="text-center">
            {hasDiscount && (
              <div className="text-sm text-gray-400 line-through mb-1">
                {offer.price.toLocaleString()} VND
              </div>
            )}
            <div className="text-3xl font-bold text-pink-600">
              {displayPrice.toLocaleString()} VND
            </div>
            {hasDiscount && offer.discount && (
              <div className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mt-2">
                -{offer.discount.value}{offer.discount.type === 'percentage' ? '%' : ' VND'}
              </div>
            )}
          </div>
        </div>

        {/* Services included */}
        {offer.services && offer.services.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2 uppercase">
              Include:
            </p>
            <ul className="space-y-1">
              {offer.services.map((service, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-pink-500 flex-shrink-0">✓</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showBookButton && active && (
          <Link
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            💬 Prenota Ora
          </Link>
        )}

        {!active && (
          <div className="text-center text-gray-400 py-3">
            Offerta non più disponibile
          </div>
        )}
      </div>
    </div>
  );
}
