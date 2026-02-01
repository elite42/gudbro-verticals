'use client';

import { useEffect, useState } from 'react';
import { Plus, ArrowRight } from '@phosphor-icons/react';
import { fetchServices } from '@/lib/stay-api';
import type { ServiceCategoryWithItems, ServiceCategoryResponseWithTimezone } from '@/types/stay';
import type { ServiceCartReturn } from '@/hooks/useServiceCart';

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

interface ServicesCarouselProps {
  bookingCode: string;
  token: string;
  cart?: ServiceCartReturn;
  onViewAll?: () => void;
  onCategoriesLoaded?: (categories: ServiceCategoryWithItems[], timezone: string) => void;
}

export default function ServicesCarousel({
  bookingCode,
  token,
  cart,
  onViewAll,
  onCategoriesLoaded,
}: ServicesCarouselProps) {
  const [categories, setCategories] = useState<ServiceCategoryWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchServices(bookingCode, token).then(({ data, error: err }) => {
      if (cancelled) return;
      if (err || !data) {
        setError(true);
      } else {
        setCategories(data.categories || []);
        // Notify parent of loaded categories + timezone for catalog use
        if (onCategoriesLoaded) {
          onCategoriesLoaded(
            data.categories || [],
            (data as ServiceCategoryResponseWithTimezone).timezone || 'UTC'
          );
        }
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [bookingCode, token, onCategoriesLoaded]);

  if (loading) {
    return (
      <section className="mb-5 px-4">
        <div className="mb-3 h-5 w-32 animate-pulse rounded bg-gray-200" />
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 w-36 flex-shrink-0 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-5 px-4">
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 text-center shadow-sm">
          <p className="text-sm text-[#8B7355]">Couldn&apos;t load services</p>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="mb-5">
      <div className="mb-3 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛎️</span>
          <h3 className="font-semibold text-[#2D2016]">Services</h3>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-sm font-medium text-[#3D8B87] transition-colors hover:text-[#2D6B68]"
          >
            View All
            <ArrowRight size={14} weight="bold" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id}>
            <p className="mb-2 px-4 text-xs font-medium uppercase tracking-wide text-[#8B7355]">
              {cat.name}
            </p>

            <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-2">
              {cat.items.map((item) => {
                const cartItem = cart?.getCartItem(item.id);
                const inCart = (cartItem?.quantity ?? 0) > 0;

                return (
                  <div
                    key={item.id}
                    className="relative flex w-44 flex-shrink-0 flex-col rounded-2xl border border-[#E8E2D9] bg-white p-3 shadow-sm"
                  >
                    {item.image && (
                      <div className="mb-2 h-28 w-full overflow-hidden rounded-xl bg-[#FAF8F5]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <p className="mb-1 text-sm font-medium text-[#2D2016]">{item.name}</p>
                    {item.description && (
                      <p className="mb-2 line-clamp-2 text-[11px] text-[#8B7355]">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        {item.includedInRate ? (
                          <span className="text-xs font-semibold text-emerald-600">Included</span>
                        ) : (
                          <>
                            <span className="text-sm font-semibold text-[#3D8B87]">
                              {formatPrice(item.price, item.currency)}
                            </span>
                            {item.priceType !== 'fixed' && (
                              <span className="ml-1 text-[10px] text-[#8B7355]">
                                /{item.priceType}
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Quick-add button */}
                      {cart && item.inStock && (
                        <button
                          onClick={() => cart.addItem(item)}
                          className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 ${
                            inCart ? 'bg-[#3D8B87]/10 text-[#3D8B87]' : 'bg-[#3D8B87] text-white'
                          }`}
                          aria-label={`Add ${item.name} to cart`}
                        >
                          {inCart ? (
                            <span className="text-[11px] font-bold">{cartItem!.quantity}</span>
                          ) : (
                            <Plus size={14} weight="bold" />
                          )}
                        </button>
                      )}
                    </div>
                    {!item.inStock && (
                      <p className="mt-1 text-[10px] font-medium text-[#E07A5F]">Unavailable</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
