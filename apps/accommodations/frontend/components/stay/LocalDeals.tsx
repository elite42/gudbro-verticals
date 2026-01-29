'use client';

import { useEffect, useState } from 'react';
import { fetchDeals } from '@/lib/stay-api';
import type { DealResponse } from '@/types/stay';

interface LocalDealsProps {
  bookingCode: string;
  token: string;
}

export default function LocalDeals({ bookingCode, token }: LocalDealsProps) {
  const [deals, setDeals] = useState<DealResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchDeals(bookingCode, token).then(({ data, error: err }) => {
      if (cancelled) return;
      if (err || !data) {
        setError(true);
      } else {
        setDeals(data);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [bookingCode, token]);

  if (loading) {
    return (
      <section className="mb-5 px-4">
        <div className="mb-3 h-5 w-32 animate-pulse rounded bg-gray-200" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-5 px-4">
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 text-center shadow-sm">
          <p className="text-sm text-[#8B7355]">Couldn&apos;t load deals</p>
        </div>
      </section>
    );
  }

  if (deals.length === 0) return null;

  return (
    <section className="mb-5 px-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">🏷️</span>
        <h3 className="font-semibold text-[#2D2016]">Local Deals</h3>
      </div>

      <div className="space-y-3">
        {deals.map((deal) => (
          <div key={deal.id} className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#2D2016]">{deal.merchantName}</p>
                {deal.description && (
                  <p className="mt-1 text-sm text-[#8B7355]">{deal.description}</p>
                )}
              </div>
              <span className="flex-shrink-0 rounded-full bg-[#E07A5F]/10 px-3 py-1 text-sm font-semibold text-[#E07A5F]">
                {deal.discountLabel}
              </span>
            </div>

            <div className="flex items-center justify-between">
              {deal.validUntil && (
                <p className="text-[11px] text-[#8B7355]">
                  Valid until{' '}
                  {new Date(deal.validUntil).toLocaleDateString('en', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              )}

              {deal.bookingAction && (
                <a
                  href={deal.bookingAction}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#3D8B87] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#2D7A76]"
                >
                  Book
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
