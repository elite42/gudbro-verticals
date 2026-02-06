'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  service: {
    id: string;
    slug: string;
    name: string;
    description?: string;
    image: string;
    category: string;
    price: number;
    unit: string;
    turnaround: string;
  };
  variant?: 'horizontal' | 'vertical';
  currency?: string;
}

import { formatPriceCompact } from '@gudbro/utils';

function formatPrice(price: number, currency: string = 'VND'): string {
  return formatPriceCompact(price, currency);
}

const categoryStyles: Record<string, { bg: string; text: string }> = {
  'Wash & Fold': { bg: 'var(--blue-light)', text: 'var(--blue-dark)' },
  'Wash & Iron': { bg: 'var(--teal-light)', text: 'var(--teal-dark)' },
  'Dry Clean': { bg: '#F3E8FF', text: '#7C3AED' },
  'Iron Only': { bg: '#FFF7ED', text: '#C2410C' },
  Shoes: { bg: '#FEE2E2', text: '#DC2626' },
  Express: { bg: 'var(--gold-light)', text: 'var(--gold)' },
};

export default function ServiceCard({
  service,
  variant = 'vertical',
  currency = 'VND',
}: ServiceCardProps) {
  const catStyle = categoryStyles[service.category] || {
    bg: 'var(--blue-light)',
    text: 'var(--blue-dark)',
  };

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/services/${service.slug}`}
        className="shadow-soft hover-lift flex overflow-hidden rounded-xl bg-white transition-all"
      >
        {/* Image */}
        <div className="relative h-32 w-28 flex-shrink-0">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
            sizes="112px"
          />
          <span
            className="absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
            style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
          >
            {service.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
          <div>
            <h3
              className="font-display truncate text-sm font-bold"
              style={{ color: 'var(--charcoal)' }}
            >
              {service.name}
            </h3>
            {service.description && (
              <p
                className="mt-1 line-clamp-2 text-xs leading-relaxed"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                {service.description}
              </p>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-bold" style={{ color: 'var(--blue-hex)' }}>
              {formatPrice(service.price, currency)}
              <span
                className="ml-0.5 text-xs font-normal"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                /{service.unit}
              </span>
            </span>
            <span
              className="flex items-center gap-1 text-[10px] font-medium"
              style={{ color: 'var(--charcoal-muted)' }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {service.turnaround}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Vertical variant
  return (
    <Link
      href={`/services/${service.slug}`}
      className="shadow-soft hover-lift block overflow-hidden rounded-xl bg-white transition-all"
    >
      {/* Image */}
      <div className="relative h-48">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 300px"
        />
        <span
          className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
          style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
        >
          {service.category}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">
        <h3 className="font-display text-sm font-bold" style={{ color: 'var(--charcoal)' }}>
          {service.name}
        </h3>
        {service.description && (
          <p
            className="line-clamp-2 text-xs leading-relaxed"
            style={{ color: 'var(--charcoal-muted)' }}
          >
            {service.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-bold" style={{ color: 'var(--blue-hex)' }}>
            {formatPrice(service.price, currency)}
            <span className="ml-0.5 text-xs font-normal" style={{ color: 'var(--charcoal-muted)' }}>
              /{service.unit}
            </span>
          </span>
          <span
            className="flex items-center gap-1 text-[10px] font-medium"
            style={{ color: 'var(--charcoal-muted)' }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {service.turnaround}
          </span>
        </div>
      </div>
    </Link>
  );
}
