'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Phone, SpinnerGap } from '@phosphor-icons/react';
import { fetchUsefulNumbers } from '@/lib/stay-api';
import type { UsefulNumbersResponse } from '@/types/stay';

interface UsefulNumbersPageProps {
  bookingCode: string;
  token: string;
  onBack: () => void;
}

export default function UsefulNumbersPage({ bookingCode, token, onBack }: UsefulNumbersPageProps) {
  const [data, setData] = useState<UsefulNumbersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchUsefulNumbers(bookingCode, token).then(({ data: result }) => {
      if (cancelled) return;
      if (result) setData(result);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [bookingCode, token]);

  const hasEmergency = (data?.emergency.length ?? 0) > 0;
  const hasCity = (data?.city.length ?? 0) > 0;
  const hasProperty = !!data?.property?.phone;

  // Group city numbers by category
  const cityByCategory =
    data?.city.reduce<Record<string, typeof data.city>>((acc, num) => {
      const cat = num.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(num);
      return acc;
    }, {}) ?? {};

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#FAF8F5]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#E8E2D9] bg-white px-4 py-3">
        <button
          onClick={onBack}
          className="rounded-full p-1.5 transition-colors hover:bg-[#F5F0EB]"
        >
          <ArrowLeft size={20} weight="bold" className="text-[#2D2016]" />
        </button>
        <div>
          <h2 className="text-base font-semibold text-[#2D2016]">Useful Numbers</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <SpinnerGap size={28} className="animate-spin text-[#8B7355]" />
          </div>
        ) : !data || (!hasEmergency && !hasCity && !hasProperty) ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-[#8B7355]">No useful numbers available.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Emergency */}
            {hasEmergency && (
              <section>
                <div className="mb-2 flex items-center gap-2">
                  <Phone size={16} weight="bold" className="text-red-600" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-red-600">
                    Emergency
                  </h3>
                </div>
                <div className="rounded-2xl border border-red-100 bg-white shadow-sm">
                  {data.emergency.map((num, i) => (
                    <div
                      key={num.serviceType}
                      className={`flex items-center justify-between px-4 py-3 ${i < data.emergency.length - 1 ? 'border-b border-[#E8E2D9]' : ''}`}
                    >
                      <span className="text-sm font-medium text-[#2D2016]">{num.serviceType}</span>
                      <a
                        href={`tel:${num.phoneNumber}`}
                        className="flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                      >
                        <Phone size={14} weight="bold" />
                        {num.phoneNumber}
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* City Services */}
            {hasCity && (
              <section>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8B7355]">
                  City Services
                </h3>
                <div className="rounded-2xl border border-[#E8E2D9] bg-white shadow-sm">
                  {Object.entries(cityByCategory).map(([category, numbers], catIdx) => (
                    <div
                      key={category}
                      className={
                        catIdx < Object.keys(cityByCategory).length - 1
                          ? 'border-b border-[#E8E2D9]'
                          : ''
                      }
                    >
                      {Object.keys(cityByCategory).length > 1 && (
                        <p className="px-4 pt-3 text-[11px] font-medium text-[#3D8B87]">
                          {category}
                        </p>
                      )}
                      <div className="px-4 py-2">
                        {numbers.map((num, i) => (
                          <div
                            key={num.label}
                            className={`flex items-center justify-between py-2 ${i < numbers.length - 1 ? 'border-b border-[#F5F0EB]' : ''}`}
                          >
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
              </section>
            )}

            {/* Property Contacts */}
            {hasProperty && (
              <section>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8B7355]">
                  Property Contacts
                </h3>
                <div className="rounded-2xl border border-[#E8E2D9] bg-white shadow-sm">
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm font-medium text-[#2D2016]">{data.property.name}</span>
                    <a
                      href={`tel:${data.property.phone}`}
                      className="flex items-center gap-1.5 rounded-xl bg-[#3D8B87] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#2D7A76]"
                    >
                      <Phone size={14} weight="bold" />
                      Call
                    </a>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
