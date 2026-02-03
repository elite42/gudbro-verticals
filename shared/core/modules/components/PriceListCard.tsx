/**
 * Price List Card Component
 * Displays categorized price lists (minibar, laundry, services, etc.)
 *
 * Features:
 * - Category grouping with icons
 * - Multi-currency display
 * - Availability indicators
 * - Search/filter
 */

'use client';

import React, { useState, useMemo } from 'react';
import { PriceListConfig, PriceCategory, PriceItem } from '../types';
import { LanguageCode, getLocalizedText } from '../../translation-engine/types';

interface PriceListCardProps {
  config: PriceListConfig;
  language: LanguageCode;
  className?: string;
  title?: string;
}

interface PriceItemRowProps {
  item: PriceItem;
  language: LanguageCode;
  currency: string;
}

import { formatPrice } from '@gudbro/utils';

function PriceItemRow({ item, language, currency }: PriceItemRowProps) {
  const name = getLocalizedText(item.name, language);
  const description = item.description ? getLocalizedText(item.description, language) : null;
  const unit = item.unit ? getLocalizedText(item.unit, language) : null;

  return (
    <div className={`flex items-start justify-between py-3 ${!item.available ? 'opacity-50' : ''}`}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{name}</span>
          {item.tags?.includes('popular') && (
            <span className="rounded bg-orange-100 px-1.5 py-0.5 text-xs text-orange-700">
              Popular
            </span>
          )}
          {item.tags?.includes('new') && (
            <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700">New</span>
          )}
          {!item.available && (
            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
              Unavailable
            </span>
          )}
        </div>
        {description && <p className="mt-0.5 line-clamp-1 text-sm text-gray-500">{description}</p>}
      </div>
      <div className="ml-4 flex-shrink-0 text-right">
        <span className="font-semibold text-gray-900">{formatPrice(item.price, currency)}</span>
        {unit && <span className="block text-xs text-gray-500">{unit}</span>}
      </div>
    </div>
  );
}

function CategorySection({
  category,
  language,
  currency,
}: {
  category: PriceCategory;
  language: LanguageCode;
  currency: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const name = getLocalizedText(category.name, language);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      {/* Category Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          {category.icon && <span className="text-2xl">{category.icon}</span>}
          <span className="font-semibold text-gray-900">{name}</span>
          <span className="text-sm text-gray-400">({category.items.length})</span>
        </div>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Items */}
      {isOpen && (
        <div className="divide-y divide-gray-100 px-4 pb-2">
          {category.items.map((item) => (
            <PriceItemRow key={item.id} item={item} language={language} currency={currency} />
          ))}
        </div>
      )}
    </div>
  );
}

export function PriceListCard({ config, language, className = '', title }: PriceListCardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(config.defaultCurrency);

  // Filter categories/items based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return config.categories;

    const query = searchQuery.toLowerCase();
    return config.categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const name = getLocalizedText(item.name, language).toLowerCase();
          const desc = item.description
            ? getLocalizedText(item.description, language).toLowerCase()
            : '';
          return name.includes(query) || desc.includes(query);
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [config.categories, searchQuery, language]);

  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className={className}>
      {/* Header */}
      {title && <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>}

      {/* Search & Currency */}
      <div className="mb-4 flex gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Currency Selector */}
        {config.showCurrencyConverter && config.supportedCurrencies.length > 1 && (
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {config.supportedCurrencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Categories */}
      {sortedCategories.length > 0 ? (
        <div className="space-y-4">
          {sortedCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              language={language}
              currency={selectedCurrency}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          {searchQuery ? 'No items found' : 'No items available'}
        </div>
      )}
    </div>
  );
}

export default PriceListCard;
