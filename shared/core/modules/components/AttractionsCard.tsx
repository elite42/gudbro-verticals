/**
 * Attractions Card Component
 * Displays nearby attractions, restaurants, and points of interest
 *
 * Features:
 * - Category filtering
 * - Distance indicators
 * - Partner discounts highlight
 * - External links (Google Maps, TripAdvisor)
 */

'use client';

import React, { useState, useMemo } from 'react';
import { AttractionsConfig, Attraction } from '../types';
import { LanguageCode, getLocalizedText } from '../../translation-engine/types';

interface AttractionsCardProps {
  config: AttractionsConfig;
  language: LanguageCode;
  className?: string;
  title?: string;
}

// Category icons and colors
const CATEGORY_INFO: Record<Attraction['category'], { icon: string; color: string; label: string }> = {
  restaurant: { icon: '🍽️', color: 'bg-orange-100', label: 'Restaurant' },
  cafe: { icon: '☕', color: 'bg-amber-100', label: 'Cafe' },
  bar: { icon: '🍸', color: 'bg-purple-100', label: 'Bar' },
  museum: { icon: '🏛️', color: 'bg-blue-100', label: 'Museum' },
  beach: { icon: '🏖️', color: 'bg-cyan-100', label: 'Beach' },
  temple: { icon: '🛕', color: 'bg-yellow-100', label: 'Temple' },
  market: { icon: '🛒', color: 'bg-green-100', label: 'Market' },
  park: { icon: '🌳', color: 'bg-emerald-100', label: 'Park' },
  shopping: { icon: '🛍️', color: 'bg-pink-100', label: 'Shopping' },
  entertainment: { icon: '🎭', color: 'bg-indigo-100', label: 'Entertainment' },
  nature: { icon: '🏞️', color: 'bg-teal-100', label: 'Nature' },
  other: { icon: '📍', color: 'bg-gray-100', label: 'Other' },
};

function AttractionCard({
  attraction,
  language,
  showDistance,
}: {
  attraction: Attraction;
  language: LanguageCode;
  showDistance: boolean;
}) {
  const name = getLocalizedText(attraction.name, language);
  const description = getLocalizedText(attraction.description, language);
  const address = getLocalizedText(attraction.address, language);
  const categoryInfo = CATEGORY_INFO[attraction.category];

  const hasDiscount = attraction.partnerDiscount;
  const discountDesc = hasDiscount
    ? getLocalizedText(attraction.partnerDiscount!.description, language)
    : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Image or Category Icon */}
      <div className="relative">
        {attraction.image ? (
          <div className="h-32 bg-gray-100">
            <img
              src={attraction.image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className={`h-24 ${categoryInfo.color} flex items-center justify-center text-4xl`}>
            {categoryInfo.icon}
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
            {attraction.partnerDiscount!.discountType === 'percentage'
              ? `-${attraction.partnerDiscount!.discountValue}%`
              : 'DEAL'}
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full flex items-center gap-1">
          <span>{categoryInfo.icon}</span>
          <span>{categoryInfo.label}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          {attraction.rating && (
            <div className="flex items-center gap-1 text-sm">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-700">{attraction.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          {showDistance && attraction.distance && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {attraction.distance}
            </span>
          )}
          {attraction.walkingTime && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {attraction.walkingTime}
            </span>
          )}
          {attraction.priceRange && (
            <span className="text-green-600 font-medium">{attraction.priceRange}</span>
          )}
        </div>

        {/* Partner Discount */}
        {hasDiscount && (
          <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
              <span>🎁</span>
              <span>{discountDesc}</span>
            </div>
            {attraction.partnerDiscount!.code && (
              <div className="mt-2 flex items-center gap-2">
                <code className="px-2 py-1 bg-white border border-green-200 rounded text-sm font-mono">
                  {attraction.partnerDiscount!.code}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(attraction.partnerDiscount!.code!)}
                  className="text-xs text-green-600 hover:text-green-700"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        )}

        {/* External Links */}
        {attraction.externalLinks && (
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            {attraction.externalLinks.googleMaps && (
              <a
                href={attraction.externalLinks.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
              >
                <span>🗺️</span>
                <span>Maps</span>
              </a>
            )}
            {attraction.externalLinks.tripAdvisor && (
              <a
                href={attraction.externalLinks.tripAdvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
              >
                <span>🦉</span>
                <span>Reviews</span>
              </a>
            )}
            {attraction.externalLinks.website && (
              <a
                href={attraction.externalLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
              >
                <span>🌐</span>
                <span>Website</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function AttractionsCard({ config, language, className = '', title }: AttractionsCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<Attraction['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(config.attractions.map((a) => a.category));
    return Array.from(cats);
  }, [config.attractions]);

  // Filter attractions
  const filteredAttractions = useMemo(() => {
    return config.attractions.filter((attraction) => {
      const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        getLocalizedText(attraction.name, language).toLowerCase().includes(searchQuery.toLowerCase()) ||
        getLocalizedText(attraction.description, language).toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [config.attractions, selectedCategory, searchQuery, language]);

  // Group by category if enabled
  const groupedAttractions = useMemo(() => {
    if (!config.groupByCategory || selectedCategory !== 'all') {
      return { all: filteredAttractions };
    }

    return filteredAttractions.reduce((groups, attraction) => {
      const cat = attraction.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(attraction);
      return groups;
    }, {} as Record<string, Attraction[]>);
  }, [filteredAttractions, config.groupByCategory, selectedCategory]);

  return (
    <div className={className}>
      {/* Header */}
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search places..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((cat) => {
          const info = CATEGORY_INFO[cat];
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{info.icon}</span>
              <span>{info.label}</span>
            </button>
          );
        })}
      </div>

      {/* Attractions Grid */}
      {filteredAttractions.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedAttractions).map(([category, attractions]) => (
            <div key={category}>
              {config.groupByCategory && selectedCategory === 'all' && category !== 'all' && (
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <span>{CATEGORY_INFO[category as Attraction['category']]?.icon}</span>
                  <span>{CATEGORY_INFO[category as Attraction['category']]?.label}</span>
                </h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attractions.map((attraction) => (
                  <AttractionCard
                    key={attraction.id}
                    attraction={attraction}
                    language={language}
                    showDistance={config.showDistances}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No places found
        </div>
      )}
    </div>
  );
}

export default AttractionsCard;
