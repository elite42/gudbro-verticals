'use client';

import Link from 'next/link';
import { wellnessConfig } from '../config/wellness.config';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description?: string;
    image: string;
    category: string;
    duration?: number;
    pricing?: {
      [key: string]: {
        base: number;
        currency?: string;
      };
    };
  };
  variant?: 'horizontal' | 'vertical';
  showBookButton?: boolean;
}

export function ServiceCard({
  service,
  variant = 'horizontal',
  showBookButton = true
}: ServiceCardProps) {
  const { contact } = wellnessConfig;

  // Get first price from pricing object
  const getPrice = () => {
    if (!service.pricing || Object.keys(service.pricing).length === 0) {
      return null;
    }
    return Object.values(service.pricing)[0]?.base;
  };

  const price = getPrice();

  // Booking link for Zalo
  const bookingLink = `https://zalo.me/${contact?.zaloId}?text=${encodeURIComponent(
    `Vorrei prenotare: ${service.name} (${service.duration} min)`
  )}`;

  if (variant === 'vertical') {
    // Vertical card for grid layouts
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-pink-600 uppercase">
              {service.category}
            </span>
            {service.duration && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                ⏱️ {service.duration} min
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
            {service.name}
          </h3>

          {service.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {service.description}
            </p>
          )}

          {price && (
            <div className="mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Da:</span>
                <span className="text-xl font-bold text-pink-600">
                  {price.toLocaleString()} VND
                </span>
              </div>
            </div>
          )}

          {showBookButton && (
            <Link
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              💬 Prenota
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Horizontal card for scroll lists (default)
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg overflow-hidden snap-start hover:shadow-2xl transition-all">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-pink-600 uppercase">
            {service.category}
          </span>
          {service.duration && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              ⏱️ {service.duration} min
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
          {service.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {service.description || 'Trattamento professionale per il tuo benessere'}
        </p>

        {price && (
          <div className="mb-4 pb-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Da:</span>
              <span className="text-xl font-bold text-pink-600">
                {price.toLocaleString()} VND
              </span>
            </div>
          </div>
        )}

        {showBookButton && (
          <Link
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            💬 Prenota
          </Link>
        )}
      </div>
    </div>
  );
}
