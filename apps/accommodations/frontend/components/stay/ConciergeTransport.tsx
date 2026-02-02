'use client';

import { ArrowLeft, Car, Taxi, Bicycle, Bus, Motorcycle, Star } from '@phosphor-icons/react';
import { getConciergeData, type TransportTip } from '@/lib/concierge-data';

interface ConciergeTransportProps {
  country: string;
  city?: string;
  onBack: () => void;
}

const TYPE_ICONS: Record<string, typeof Car> = {
  'ride-hailing': Car,
  taxi: Taxi,
  motorbike: Motorcycle,
  bus: Bus,
  cyclo: Bicycle,
  rental: Motorcycle,
};

const TYPE_COLORS: Record<string, { icon: string; bg: string }> = {
  'ride-hailing': { icon: '#059669', bg: 'bg-emerald-50' },
  taxi: { icon: '#D97706', bg: 'bg-amber-50' },
  motorbike: { icon: '#7C3AED', bg: 'bg-purple-50' },
  bus: { icon: '#2563EB', bg: 'bg-blue-50' },
  cyclo: { icon: '#0891B2', bg: 'bg-cyan-50' },
  rental: { icon: '#DC2626', bg: 'bg-red-50' },
};

// Transport IDs that are recommended (safe, transparent pricing)
const RECOMMENDED_IDS = new Set(['tr-grab', 'tr-be', 'tr-xanhsm', 'tr-metered']);

export default function ConciergeTransport({ country, city, onBack }: ConciergeTransportProps) {
  const data = getConciergeData(country);
  const options = data?.transport ?? [];

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
          <h2 className="text-base font-semibold text-[#2D2016]">Getting Around</h2>
          {city && <p className="text-xs text-[#8B7355]">{city}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <TransportCard
              key={option.id}
              option={option}
              recommended={RECOMMENDED_IDS.has(option.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Transport option card
// ---------------------------------------------------------------------------

function TransportCard({ option, recommended }: { option: TransportTip; recommended: boolean }) {
  const Icon = TYPE_ICONS[option.type] ?? Car;
  const colors = TYPE_COLORS[option.type] ?? { icon: '#6B7280', bg: 'bg-gray-50' };

  return (
    <div className="rounded-2xl border border-[#E8E2D9] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors.bg}`}
        >
          <Icon size={22} weight="duotone" style={{ color: colors.icon }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-[#2D2016]">{option.title}</p>
            {recommended && (
              <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                <Star size={10} weight="fill" />
                Recommended
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs leading-relaxed text-[#8B7355]">{option.description}</p>
          {option.priceRange && (
            <p className="mt-1.5 rounded-lg bg-[#FAF8F5] px-2 py-1 text-[11px] font-medium text-[#2D2016]">
              {option.priceRange}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
