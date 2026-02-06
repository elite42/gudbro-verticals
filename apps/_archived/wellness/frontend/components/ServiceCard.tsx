'use client';

import Image from 'next/image';
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
  showBookButton = true,
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
      <div className="transform overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
        <Image
          src={service.image}
          alt={service.name}
          width={400}
          height={192}
          className="h-48 w-full object-cover"
          unoptimized
        />
        <div className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-pink-600">
              {service.category}
            </span>
            {service.duration && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                ⏱️ {service.duration} min
              </span>
            )}
          </div>

          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800">{service.name}</h3>

          {service.description && (
            <p className="mb-4 line-clamp-2 text-sm text-gray-600">{service.description}</p>
          )}

          {price && (
            <div className="mb-4 border-b border-gray-200 pb-3">
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
              className="block rounded-lg bg-pink-500 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-pink-600"
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
    <div className="w-72 flex-shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl">
      <Image
        src={service.image}
        alt={service.name}
        width={400}
        height={192}
        className="h-48 w-full object-cover"
        unoptimized
      />
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase text-pink-600">{service.category}</span>
          {service.duration && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
              ⏱️ {service.duration} min
            </span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800">{service.name}</h3>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {service.description || 'Trattamento professionale per il tuo benessere'}
        </p>

        {price && (
          <div className="mb-4 border-b border-gray-200 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Da:</span>
              <span className="text-xl font-bold text-pink-600">{price.toLocaleString()} VND</span>
            </div>
          </div>
        )}

        {showBookButton && (
          <Link
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg bg-pink-500 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-pink-600"
          >
            💬 Prenota
          </Link>
        )}
      </div>
    </div>
  );
}
