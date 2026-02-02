'use client';

import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  MapPin,
  Buildings,
  Church,
  CookingPot,
  Moon,
  Tree,
  ShoppingBag,
  Binoculars,
  Clock,
  ArrowSquareOut,
  FunnelSimple,
} from '@phosphor-icons/react';
import {
  getLocalAttractions,
  getTourExperiences,
  type LocalAttraction,
} from '@/lib/concierge-data';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ConciergeDiscoverProps {
  country: string;
  onBack?: () => void;
}

type AttractionCategory = LocalAttraction['category'] | 'all';

interface CategoryPill {
  id: AttractionCategory;
  label: string;
  Icon: typeof MapPin;
}

// ---------------------------------------------------------------------------
// Category config
// ---------------------------------------------------------------------------

const CATEGORIES: CategoryPill[] = [
  { id: 'all', label: 'All', Icon: FunnelSimple },
  { id: 'landmark', label: 'Landmarks', Icon: Buildings },
  { id: 'market', label: 'Markets', Icon: ShoppingBag },
  { id: 'temple', label: 'Temples', Icon: Church },
  { id: 'museum', label: 'Museums', Icon: Binoculars },
  { id: 'nature', label: 'Nature', Icon: Tree },
  { id: 'food', label: 'Food', Icon: CookingPot },
  { id: 'nightlife', label: 'Nightlife', Icon: Moon },
];

const CATEGORY_COLORS: Record<string, { text: string; bg: string }> = {
  landmark: { text: '#2563EB', bg: 'bg-blue-50' },
  market: { text: '#D97706', bg: 'bg-amber-50' },
  temple: { text: '#7C3AED', bg: 'bg-purple-50' },
  museum: { text: '#059669', bg: 'bg-emerald-50' },
  beach: { text: '#0891B2', bg: 'bg-cyan-50' },
  nature: { text: '#16A34A', bg: 'bg-green-50' },
  nightlife: { text: '#DB2777', bg: 'bg-pink-50' },
  food: { text: '#EA580C', bg: 'bg-orange-50' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConciergeDiscover({ country, onBack }: ConciergeDiscoverProps) {
  const [activeCategory, setActiveCategory] = useState<AttractionCategory>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const attractions = useMemo(() => getLocalAttractions(country), [country]);
  const tours = useMemo(() => getTourExperiences(country), [country]);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return attractions;
    return attractions.filter((a) => a.category === activeCategory);
  }, [attractions, activeCategory]);

  // Empty state
  if (attractions.length === 0 && tours.length === 0) {
    return (
      <div className="px-4 py-6">
        {onBack && (
          <div className="mb-4 flex items-center gap-3">
            <button
              onClick={onBack}
              className="rounded-full p-1.5 transition-colors hover:bg-[#F5F0EB]"
            >
              <ArrowLeft size={20} weight="bold" className="text-[#2D2016]" />
            </button>
            <h2 className="text-base font-semibold text-[#2D2016]">Discover</h2>
          </div>
        )}
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-8 text-center shadow-sm">
          <MapPin size={48} weight="duotone" className="mx-auto mb-3 text-[#8B7355]" />
          <h3 className="mb-1 text-base font-semibold text-[#2D2016]">Coming Soon</h3>
          <p className="text-sm text-[#8B7355]">Attraction info coming soon for this location.</p>
        </div>
      </div>
    );
  }

  const handleCardTap = (attraction: LocalAttraction) => {
    if (attraction.deepLink) {
      window.open(attraction.deepLink, '_blank', 'noopener');
      return;
    }
    setExpandedCard(expandedCard === attraction.id ? null : attraction.id);
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {/* Header */}
      {onBack ? (
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="rounded-full p-1.5 transition-colors hover:bg-[#F5F0EB]"
          >
            <ArrowLeft size={20} weight="bold" className="text-[#2D2016]" />
          </button>
          <h2 className="text-base font-semibold text-[#2D2016]">Discover</h2>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-[#2D2016]">Explore Ho Chi Minh City</h2>
          <p className="mt-0.5 text-xs text-[#8B7355]">
            Popular places, activities, and experiences nearby
          </p>
        </div>
      )}

      {/* Category filter pills */}
      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex gap-2 pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#2D2016] text-white'
                    : 'border border-[#E8E2D9] bg-white text-[#8B7355]'
                }`}
              >
                <cat.Icon size={14} weight={isActive ? 'fill' : 'regular'} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Attractions grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((attraction) => {
          const colors = CATEGORY_COLORS[attraction.category] ?? {
            text: '#8B7355',
            bg: 'bg-stone-50',
          };
          const isExpanded = expandedCard === attraction.id;

          return (
            <button
              key={attraction.id}
              onClick={() => handleCardTap(attraction)}
              className={`flex flex-col items-start rounded-2xl border border-[#E8E2D9] bg-white p-3 text-left shadow-sm transition-all active:scale-[0.98] ${
                isExpanded ? 'col-span-2' : ''
              }`}
            >
              {/* Emoji + category badge row */}
              <div className="mb-1.5 flex w-full items-start justify-between">
                <span className="text-2xl">{attraction.imageEmoji || '\u{1F4CD}'}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${colors.bg}`}
                  style={{ color: colors.text }}
                >
                  {attraction.category}
                </span>
              </div>

              {/* Name */}
              <span className="text-sm font-semibold text-[#2D2016]">{attraction.name}</span>

              {/* Distance */}
              {attraction.distance && (
                <span className="mt-0.5 flex items-center gap-1 text-[11px] text-[#8B7355]">
                  <MapPin size={10} weight="fill" />
                  {attraction.distance}
                </span>
              )}

              {/* Description */}
              <p
                className={`mt-1 text-[11px] leading-relaxed text-[#8B7355] ${
                  isExpanded ? '' : 'line-clamp-2'
                }`}
              >
                {attraction.description}
              </p>

              {/* Deep link indicator */}
              {attraction.deepLink && (
                <span className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-[#3D8B87]">
                  View on Tours <ArrowSquareOut size={10} weight="bold" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl bg-[#F5F0EB] px-4 py-6 text-center">
          <p className="text-sm text-[#8B7355]">No attractions in this category yet.</p>
        </div>
      )}

      {/* Tours section */}
      {tours.length > 0 && (
        <div className="mt-2">
          <h3 className="mb-3 text-sm font-semibold text-[#2D2016]">Experiences & Tours</h3>
          <div className="-mx-4 overflow-x-auto px-4">
            <div className="flex gap-3 pb-2">
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  className="flex w-64 shrink-0 flex-col rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm"
                >
                  <h4 className="text-sm font-semibold text-[#2D2016]">{tour.name}</h4>

                  {/* Duration + price badges */}
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-[#F5F0EB] px-2 py-0.5 text-[10px] font-medium text-[#8B7355]">
                      <Clock size={10} weight="fill" />
                      {tour.duration}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      {tour.priceRange}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-2 flex-1 text-[11px] leading-relaxed text-[#8B7355]">
                    {tour.description}
                  </p>

                  {/* Book button */}
                  {tour.deepLink && (
                    <a
                      href={tour.deepLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#3D8B87] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#346F6C]"
                    >
                      Book on Tours
                      <ArrowSquareOut size={12} weight="bold" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
