'use client';

import { TrendUp, TrendDown, Minus } from '@phosphor-icons/react';

interface KPICardProps {
  title: string;
  value: number;
  previousValue: number;
  trend: 'up' | 'down' | 'flat';
  format: 'percent' | 'currency' | 'number';
  currencyCode?: string;
}

function formatValue(value: number, format: string, currencyCode?: string): string {
  switch (format) {
    case 'percent':
      return `${value}%`;
    case 'currency': {
      // Values are in minor units (cents), convert to major
      const major = value / 100;
      const code = currencyCode || 'USD';
      // Use compact notation for large numbers
      if (major >= 1000000) {
        return `${(major / 1000000).toFixed(1)}M ${code}`;
      }
      if (major >= 1000) {
        return `${(major / 1000).toFixed(1)}K ${code}`;
      }
      return `${major.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${code}`;
    }
    default:
      return value.toLocaleString();
  }
}

function computeChangePercent(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export function KPICard({
  title,
  value,
  previousValue,
  trend,
  format,
  currencyCode,
}: KPICardProps) {
  const changePercent = computeChangePercent(value, previousValue);

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    flat: 'text-gray-500',
  };

  const TrendIcon = trend === 'up' ? TrendUp : trend === 'down' ? TrendDown : Minus;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <p className="mb-1 text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{formatValue(value, format, currencyCode)}</p>
      <div className={`mt-2 flex items-center gap-1 text-sm ${trendColors[trend]}`}>
        <TrendIcon size={16} weight="bold" />
        <span>
          {changePercent > 0 ? '+' : ''}
          {changePercent}% vs prev. period
        </span>
      </div>
    </div>
  );
}
