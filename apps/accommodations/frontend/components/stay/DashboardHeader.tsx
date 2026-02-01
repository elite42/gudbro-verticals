'use client';

import { useState, useEffect, useCallback } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { SUPPORTED_CURRENCIES } from '@shared/payment';
import type { CurrencyConfig } from '@shared/payment';
import type { PropertyInfo } from '@/types/stay';

/** Read preferred currency from localStorage, falling back to property default. */
function useCurrencyPreference(fallbackCurrency: string) {
  const [currency, setCurrencyState] = useState<string>(fallbackCurrency);

  useEffect(() => {
    const stored = localStorage.getItem('preferred-currency');
    if (stored && SUPPORTED_CURRENCIES.some((c: CurrencyConfig) => c.code === stored)) {
      setCurrencyState(stored);
    }
  }, []);

  const setCurrency = useCallback((code: string) => {
    setCurrencyState(code);
    localStorage.setItem('preferred-currency', code);
  }, []);

  return { currency, setCurrency };
}

interface DashboardHeaderProps {
  property: PropertyInfo;
  defaultCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
}

export default function DashboardHeader({
  property,
  defaultCurrency = 'USD',
  onCurrencyChange,
}: DashboardHeaderProps) {
  const headerImage = property.images?.[0];
  const { currency, setCurrency } = useCurrencyPreference(defaultCurrency);

  // Notify parent when currency changes
  useEffect(() => {
    onCurrencyChange?.(currency);
  }, [currency, onCurrencyChange]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-11 w-11 overflow-hidden rounded-2xl shadow-lg shadow-[#E07A5F]/20">
                {headerImage ? (
                  <img
                    src={headerImage}
                    alt={property.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#E07A5F]/10 text-lg">
                    {property.type === 'hotel' ? '🏨' : '🏠'}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-gray-900">
                {property.name}
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-xs font-medium capitalize text-gray-500">
                  {property.type}
                </span>
              </div>
            </div>
          </div>

          {/* Currency selector */}
          <div className="relative flex items-center">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-2.5 pr-7 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:border-[#3D8B87] focus:outline-none focus:ring-1 focus:ring-[#3D8B87]"
              aria-label="Select currency"
            >
              {SUPPORTED_CURRENCIES.map((c: CurrencyConfig) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>
            <CaretDown
              size={12}
              weight="bold"
              className="pointer-events-none absolute right-2 text-gray-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
