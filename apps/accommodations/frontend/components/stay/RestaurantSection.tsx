'use client';

import { useEffect, useState } from 'react';
import { ForkKnife, CaretRight } from '@phosphor-icons/react';
import { fetchServices } from '@/lib/stay-api';
import type { ServiceCategoryWithItems } from '@/types/stay';

/** Currencies with 0 decimal places (minor unit = major unit). */
const ZERO_DECIMAL_CURRENCIES = new Set(['VND', 'JPY', 'KRW', 'CLP', 'ISK', 'UGX', 'RWF']);

function formatPrice(minorUnits: number, currency: string): string {
  const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase());
  const amount = isZeroDecimal ? minorUnits : minorUnits / 100;

  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: isZeroDecimal ? 0 : 2,
    maximumFractionDigits: isZeroDecimal ? 0 : 2,
  }).format(amount);
}

/** F&B category slugs used to filter service categories for the static menu. */
const FNB_SLUGS = ['breakfast', 'restaurant', 'minibar', 'bar', 'cafe'];

interface RestaurantSectionProps {
  hasLinkedFnb: boolean;
  linkedFnbSlug: string | null;
  bookingCode: string;
  token: string;
}

export default function RestaurantSection({
  hasLinkedFnb,
  linkedFnbSlug,
  bookingCode,
  token,
}: RestaurantSectionProps) {
  // ---- Branch A: Deep-link to coffeeshop PWA ----
  if (hasLinkedFnb && linkedFnbSlug) {
    const baseUrl = process.env.NEXT_PUBLIC_COFFEESHOP_BASE_URL || '';
    const href = `${baseUrl}/${linkedFnbSlug}`;

    return (
      <section className="mb-5 px-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E07A5F]/10">
            <ForkKnife size={24} weight="duotone" color="#E07A5F" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-[#2D2016]">Restaurant</p>
            <p className="text-sm text-[#8B7355]">View our menu</p>
          </div>
          <CaretRight size={20} weight="bold" className="flex-shrink-0 text-[#8B7355]" />
        </a>
      </section>
    );
  }

  // ---- Branch B / C: Static menu or hidden ----
  return <StaticMenuBranch bookingCode={bookingCode} token={token} />;
}

// ---- Internal component for the static menu (needs hooks) ----

function StaticMenuBranch({ bookingCode, token }: { bookingCode: string; token: string }) {
  const [fnbCategories, setFnbCategories] = useState<ServiceCategoryWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchServices(bookingCode, token).then(({ data, error: err }) => {
      if (cancelled) return;
      if (err || !data) {
        setError(true);
      } else {
        // Filter to F&B categories only
        const filtered = (data.categories || []).filter((cat) =>
          FNB_SLUGS.some((slug) => cat.name.toLowerCase().includes(slug))
        );
        setFnbCategories(filtered);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [bookingCode, token]);

  // Loading skeleton
  if (loading) {
    return (
      <section className="mb-5 px-4">
        <div className="mb-3 h-5 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-28 animate-pulse rounded-2xl bg-gray-100" />
      </section>
    );
  }

  // Error or no F&B items: hide silently (Branch C)
  if (error || fnbCategories.length === 0) return null;

  return (
    <section className="mb-5 px-4">
      <div className="mb-3 flex items-center gap-2">
        <ForkKnife size={24} weight="duotone" color="#E07A5F" />
        <h3 className="font-semibold text-[#2D2016]">Restaurant</h3>
      </div>

      <div className="space-y-4">
        {fnbCategories.map((cat) => (
          <div key={cat.id} className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[#8B7355]">
              {cat.name}
            </p>

            <div className="space-y-3">
              {cat.items.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  {item.image && (
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#FAF8F5]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#2D2016]">{item.name}</p>
                    {item.description && (
                      <p className="mt-0.5 line-clamp-2 text-[11px] text-[#8B7355]">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="flex-shrink-0 text-sm font-semibold text-[#3D8B87]">
                    {formatPrice(item.price, item.currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
