'use client';

import Link from 'next/link';
import { formatDate } from '@gudbro/utils';
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

export function OfferCard({ offer, variant = 'grid', showBookButton = true }: OfferCardProps) {
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

  if (variant === 'list') {
    // List variant for horizontal scroll
    return (
      <div className="w-80 flex-shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl">
        {offer.popular && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-center text-sm font-bold text-white">
            ⭐ PIÙ POPOLARE ⭐
          </div>
        )}

        {offer.type === 'promotion' && !active && (
          <div className="bg-gray-500 py-2 text-center text-sm font-bold text-white">
            ⏰ OFFERTA SCADUTA
          </div>
        )}

        {offer.type === 'promotion' && active && (
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 py-2 text-center text-sm font-bold text-white">
            🎁 OFFERTA SPECIALE
          </div>
        )}

        <div className="p-6">
          {offer.icon && <div className="mb-4 text-center text-6xl">{offer.icon}</div>}

          <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">{offer.name}</h2>

          <p className="mb-4 line-clamp-2 text-center text-sm text-gray-600">{offer.description}</p>

          {offer.duration && (
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="text-sm text-gray-500">⏱️ {offer.duration}</span>
            </div>
          )}

          {/* Promotion validity */}
          {offer.type === 'promotion' && offer.validFrom && offer.validTo && (
            <div className="mb-4 rounded-lg bg-pink-50 p-3">
              <p className="text-center text-xs text-pink-700">
                Valida dal {formatDate(offer.validFrom, { locale: 'it-IT' })} al{' '}
                {formatDate(offer.validTo, { locale: 'it-IT' })}
              </p>
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            <div className="text-center">
              {hasDiscount && (
                <div className="mb-1 text-sm text-gray-400 line-through">
                  {offer.price.toLocaleString()} VND
                </div>
              )}
              <div className="text-3xl font-bold text-pink-600">
                {displayPrice.toLocaleString()} VND
              </div>
              {hasDiscount && offer.discount && (
                <div className="mt-2 inline-block rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  -{offer.discount.value}
                  {offer.discount.type === 'percentage' ? '%' : ' VND'}
                </div>
              )}
            </div>
          </div>

          {/* Services included */}
          {offer.services && offer.services.length > 0 && (
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <p className="mb-2 text-xs font-semibold uppercase text-gray-700">Include:</p>
              <ul className="space-y-1">
                {offer.services.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="flex-shrink-0 text-pink-500">✓</span>
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
              className="block transform rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 text-center font-semibold text-white transition-all hover:scale-105 hover:from-pink-600 hover:to-purple-600"
            >
              💬 Prenota Ora
            </Link>
          )}

          {!active && (
            <div className="py-3 text-center text-gray-400">Offerta non più disponibile</div>
          )}
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div
      className={`transform overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl ${
        offer.popular ? 'ring-4 ring-purple-500' : ''
      }`}
    >
      {offer.popular && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-center font-bold text-white">
          ⭐ PIÙ POPOLARE ⭐
        </div>
      )}

      {offer.type === 'promotion' && !active && (
        <div className="bg-gray-500 py-2 text-center font-bold text-white">⏰ OFFERTA SCADUTA</div>
      )}

      {offer.type === 'promotion' && active && (
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 py-2 text-center font-bold text-white">
          🎁 OFFERTA SPECIALE
        </div>
      )}

      <div className="p-6">
        {offer.icon && <div className="mb-4 text-center text-6xl">{offer.icon}</div>}

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">{offer.name}</h2>

        <p className="mb-4 text-center text-gray-600">{offer.description}</p>

        {offer.duration && (
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="text-sm text-gray-500">⏱️ {offer.duration}</span>
          </div>
        )}

        {/* Promotion validity */}
        {offer.type === 'promotion' && offer.validFrom && offer.validTo && (
          <div className="mb-4 rounded-lg bg-pink-50 p-3">
            <p className="text-center text-xs text-pink-700">
              Valida dal {formatDate(offer.validFrom, { locale: 'it-IT' })} al{' '}
              {formatDate(offer.validTo, { locale: 'it-IT' })}
            </p>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="text-center">
            {hasDiscount && (
              <div className="mb-1 text-sm text-gray-400 line-through">
                {offer.price.toLocaleString()} VND
              </div>
            )}
            <div className="text-3xl font-bold text-pink-600">
              {displayPrice.toLocaleString()} VND
            </div>
            {hasDiscount && offer.discount && (
              <div className="mt-2 inline-block rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                -{offer.discount.value}
                {offer.discount.type === 'percentage' ? '%' : ' VND'}
              </div>
            )}
          </div>
        </div>

        {/* Services included */}
        {offer.services && offer.services.length > 0 && (
          <div className="mb-4 rounded-lg bg-gray-50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase text-gray-700">Include:</p>
            <ul className="space-y-1">
              {offer.services.map((service, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="flex-shrink-0 text-pink-500">✓</span>
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
            className="block transform rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 text-center font-semibold text-white transition-all hover:scale-105 hover:from-pink-600 hover:to-purple-600"
          >
            💬 Prenota Ora
          </Link>
        )}

        {!active && (
          <div className="py-3 text-center text-gray-400">Offerta non più disponibile</div>
        )}
      </div>
    </div>
  );
}
