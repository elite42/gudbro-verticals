'use client';

import { useEffect, useState } from 'react';
import { fetchUsefulNumbers } from '@/lib/stay-api';
import type { UsefulNumbersResponse } from '@/types/stay';

interface UsefulNumbersProps {
  bookingCode: string;
  token: string;
}

export default function UsefulNumbers({ bookingCode, token }: UsefulNumbersProps) {
  const [data, setData] = useState<UsefulNumbersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchUsefulNumbers(bookingCode, token).then(({ data: result }) => {
      if (cancelled) return;
      if (result) {
        setData(result);
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
        <div className="mb-3 h-5 w-36 animate-pulse rounded bg-gray-200" />
        <div className="h-32 animate-pulse rounded-2xl bg-gray-100" />
      </section>
    );
  }

  // Error or empty: hide section silently (don't alarm guests)
  if (!data) return null;

  const hasEmergency = data.emergency.length > 0;
  const hasCity = data.city.length > 0;
  const hasProperty = !!data.property?.phone;

  if (!hasEmergency && !hasCity && !hasProperty) return null;

  // Group city numbers by category
  const cityByCategory = data.city.reduce<Record<string, typeof data.city>>((acc, num) => {
    const cat = num.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(num);
    return acc;
  }, {});

  return (
    <section className="mb-5 px-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">📞</span>
        <h3 className="font-semibold text-[#2D2016]">Useful Numbers</h3>
      </div>

      <div className="rounded-2xl border border-[#E8E2D9] bg-white shadow-sm">
        {/* Emergency numbers */}
        {hasEmergency && (
          <div className="border-b border-[#E8E2D9] p-4">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-[#E07A5F]">
              Emergency
            </p>
            <div className="space-y-2">
              {data.emergency.map((num) => (
                <div key={num.serviceType} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#2D2016]">{num.serviceType}</span>
                  <a
                    href={`tel:${num.phoneNumber}`}
                    className="flex items-center gap-1.5 rounded-lg bg-[#E07A5F]/10 px-3 py-1.5 text-sm font-semibold text-[#E07A5F] transition-colors hover:bg-[#E07A5F]/20"
                  >
                    <span>📱</span>
                    {num.phoneNumber}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* City numbers by category */}
        {hasCity && (
          <div className={`p-4 ${hasProperty ? 'border-b border-[#E8E2D9]' : ''}`}>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-[#8B7355]">
              City Services
            </p>
            <div className="space-y-3">
              {Object.entries(cityByCategory).map(([category, numbers]) => (
                <div key={category}>
                  {Object.keys(cityByCategory).length > 1 && (
                    <p className="mb-1.5 text-[11px] font-medium text-[#3D8B87]">{category}</p>
                  )}
                  <div className="space-y-2">
                    {numbers.map((num) => (
                      <div key={num.label} className="flex items-center justify-between">
                        <span className="text-sm text-[#2D2016]">{num.label}</span>
                        <a
                          href={`tel:${num.phoneNumber}`}
                          className="rounded-lg bg-[#FAF8F5] px-3 py-1.5 text-sm font-medium text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/10"
                        >
                          {num.phoneNumber}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Property contact */}
        {hasProperty && (
          <div className="p-4">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-[#8B7355]">
              Your Host
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#2D2016]">{data.property.name}</span>
              <a
                href={`tel:${data.property.phone}`}
                className="flex items-center gap-1.5 rounded-lg bg-[#3D8B87] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#2D7A76]"
              >
                <span>📱</span>
                Call
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
