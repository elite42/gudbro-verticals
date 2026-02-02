'use client';

import { useEffect, useState } from 'react';
import { Storefront } from '@phosphor-icons/react';
import { fetchConventions } from '@/lib/stay-api';
import type { ConventionPartner } from '@/types/stay';

interface ConventionPartnerCardsProps {
  bookingCode: string;
  token: string;
}

/**
 * Format the benefit badge label based on benefit type and value.
 */
function getBenefitLabel(convention: ConventionPartner): string {
  const scopeSuffix = convention.benefitScope === 'per_night' ? ' /night' : '';

  switch (convention.benefitType) {
    case 'percentage_discount':
      return `-${convention.benefitValue}%${scopeSuffix}`;
    case 'fixed_discount':
      return `-$${convention.benefitValue}${scopeSuffix}`;
    case 'free_item':
      return `Free Item${scopeSuffix}`;
    case 'special_price':
      return `$${convention.benefitValue}${scopeSuffix}`;
    case 'points_multiplier':
      return `${convention.benefitValue}x Points`;
    default:
      return 'Discount';
  }
}

export default function ConventionPartnerCards({
  bookingCode,
  token,
}: ConventionPartnerCardsProps) {
  const [conventions, setConventions] = useState<ConventionPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchConventions(bookingCode, token).then(({ data, error: err }) => {
      if (cancelled) return;
      if (err || !data) {
        setError(true);
      } else {
        setConventions(data);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [bookingCode, token]);

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="mb-3 h-5 w-36 animate-pulse rounded bg-gray-200" />
        {[1, 2].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (error || conventions.length === 0) return null;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Storefront size={20} weight="duotone" className="text-[#E07A5F]" />
        <h3 className="font-semibold text-[#2D2016]">Partner Deals</h3>
      </div>

      <div className="space-y-3">
        {conventions.map((convention) => (
          <div
            key={convention.id}
            className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#2D2016]">{convention.partnerName}</p>
                <p className="mt-0.5 text-sm text-[#8B7355]">{convention.conventionName}</p>
              </div>
              <span className="flex-shrink-0 rounded-full bg-[#E07A5F]/10 px-3 py-1 text-sm font-semibold text-[#E07A5F]">
                {getBenefitLabel(convention)}
              </span>
            </div>

            {convention.benefitDescription && (
              <p className="mt-2 text-sm text-[#8B7355]">{convention.benefitDescription}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
