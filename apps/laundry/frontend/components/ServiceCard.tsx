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

function formatPrice(price: number, currency: string = 'VND'): string {
  if (currency === 'VND') {
    const inThousands = Math.round(price / 1000);
    return `${inThousands}k`;
  }

  const rates: Record<string, { rate: number; symbol: string }> = {
    USD: { rate: 0.00004, symbol: '$' },
    EUR: { rate: 0.000037, symbol: '\u20AC' },
  };

  const info = rates[currency];
  if (!info) {
    const inThousands = Math.round(price / 1000);
    return `${inThousands}k`;
  }

  const converted = (price * info.rate).toFixed(2);
  return `${info.symbol}${converted}`;
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
        className="flex bg-white rounded-xl overflow-hidden shadow-soft hover-lift transition-all"
      >
        {/* Image */}
        <div className="relative w-28 h-32 flex-shrink-0">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
            sizes="112px"
          />
          <span
            className="absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
          >
            {service.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          <div>
            <h3
              className="font-bold font-display text-sm truncate"
              style={{ color: 'var(--charcoal)' }}
            >
              {service.name}
            </h3>
            {service.description && (
              <p
                className="text-xs mt-1 line-clamp-2 leading-relaxed"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                {service.description}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span
              className="text-sm font-bold"
              style={{ color: 'var(--blue-hex)' }}
            >
              {formatPrice(service.price, currency)}
              <span
                className="text-xs font-normal ml-0.5"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                /{service.unit}
              </span>
            </span>
            <span
              className="text-[10px] font-medium flex items-center gap-1"
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
      className="block bg-white rounded-xl overflow-hidden shadow-soft hover-lift transition-all"
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
          className="absolute top-2.5 left-2.5 text-xs font-semibold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
        >
          {service.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3
          className="font-bold font-display text-sm"
          style={{ color: 'var(--charcoal)' }}
        >
          {service.name}
        </h3>
        {service.description && (
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: 'var(--charcoal-muted)' }}
          >
            {service.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-1">
          <span
            className="text-sm font-bold"
            style={{ color: 'var(--blue-hex)' }}
          >
            {formatPrice(service.price, currency)}
            <span
              className="text-xs font-normal ml-0.5"
              style={{ color: 'var(--charcoal-muted)' }}
            >
              /{service.unit}
            </span>
          </span>
          <span
            className="text-[10px] font-medium flex items-center gap-1"
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
