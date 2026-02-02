'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  CaretDown,
  CaretUp,
  Car,
  CurrencyDollar,
  ForkKnife,
  Storefront,
  Buildings,
  Binoculars,
  ShieldWarning,
  ShieldCheck,
} from '@phosphor-icons/react';
import { getConciergeData, type SafetyCategory } from '@/lib/concierge-data';

interface ConciergeSafetyProps {
  country: string;
  city?: string;
  onBack: () => void;
}

const CATEGORY_ICONS: Record<string, typeof Car> = {
  transport: Car,
  money: CurrencyDollar,
  food: ForkKnife,
  street: Storefront,
  hotels: Buildings,
  tours: Binoculars,
  digital: ShieldWarning,
};

const CATEGORY_COLORS: Record<string, { icon: string; bg: string; badge: string }> = {
  transport: { icon: '#DC2626', bg: 'bg-red-50', badge: 'bg-red-100 text-red-700' },
  money: { icon: '#D97706', bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700' },
  food: { icon: '#059669', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700' },
  street: { icon: '#7C3AED', bg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-700' },
  hotels: { icon: '#2563EB', bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700' },
  tours: { icon: '#0891B2', bg: 'bg-cyan-50', badge: 'bg-cyan-100 text-cyan-700' },
  digital: { icon: '#BE185D', bg: 'bg-pink-50', badge: 'bg-pink-100 text-pink-700' },
};

export default function ConciergeSafety({ country, city, onBack }: ConciergeSafetyProps) {
  const data = getConciergeData(country);
  const categories = data?.safety ?? [];

  // Per-category expand state (multiple can be open)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggleCategory(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

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
          <h2 className="text-base font-semibold text-[#2D2016]">Safety Tips</h2>
          {city && <p className="text-xs text-[#8B7355]">{city}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Disclaimer */}
        {data?.disclaimer && (
          <div className="mb-4 flex gap-2 rounded-xl bg-emerald-50 px-4 py-3">
            <ShieldCheck size={18} weight="duotone" className="mt-0.5 shrink-0 text-emerald-600" />
            <p className="text-xs leading-relaxed text-emerald-800">{data.disclaimer}</p>
          </div>
        )}

        {/* Category accordions */}
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <CategoryAccordion
              key={cat.id}
              category={cat}
              isExpanded={!!expanded[cat.id]}
              onToggle={() => toggleCategory(cat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Category accordion card
// ---------------------------------------------------------------------------

function CategoryAccordion({
  category,
  isExpanded,
  onToggle,
}: {
  category: SafetyCategory;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = CATEGORY_ICONS[category.id] ?? ShieldWarning;
  const colors = CATEGORY_COLORS[category.id] ?? {
    icon: '#6B7280',
    bg: 'bg-gray-50',
    badge: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="rounded-2xl border border-[#E8E2D9] bg-white shadow-sm">
      {/* Accordion header */}
      <button onClick={onToggle} className="flex w-full items-center gap-3 px-4 py-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colors.bg}`}
        >
          <Icon size={20} weight="duotone" style={{ color: colors.icon }} />
        </div>
        <div className="flex-1 text-left">
          <span className="text-sm font-semibold text-[#2D2016]">{category.label}</span>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${colors.badge}`}>
          {category.tips.length}
        </span>
        {isExpanded ? (
          <CaretUp size={16} weight="bold" className="text-[#8B7355]" />
        ) : (
          <CaretDown size={16} weight="bold" className="text-[#8B7355]" />
        )}
      </button>

      {/* Expanded tips */}
      {isExpanded && (
        <div className="border-t border-[#E8E2D9] px-4 py-3">
          <div className="flex flex-col gap-4">
            {category.tips.map((tip) => (
              <div key={tip.id}>
                <p className="text-sm font-semibold text-[#2D2016]">{tip.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#8B7355]">{tip.description}</p>

                {tip.howToProtect.length > 0 && (
                  <div className="mt-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                      How to protect yourself
                    </p>
                    <ul className="mt-1 space-y-1">
                      {tip.howToProtect.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-[#2D2016]">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tip.where && (
                  <p className="mt-1.5 text-[11px] italic text-[#8B7355]">Where: {tip.where}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
