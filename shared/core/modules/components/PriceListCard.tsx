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

// Simple currency formatter
function formatPrice(amount: number, currency: string): string {
  const formatters: Record<string, (n: number) => string> = {
    VND: (n) => `${n.toLocaleString('vi-VN')}₫`,
    USD: (n) => `$${n.toFixed(2)}`,
    EUR: (n) => `€${n.toFixed(2)}`,
    GBP: (n) => `£${n.toFixed(2)}`,
    KRW: (n) => `₩${n.toLocaleString('ko-KR')}`,
    JPY: (n) => `¥${n.toLocaleString('ja-JP')}`,
    THB: (n) => `฿${n.toFixed(0)}`,
  };

  return formatters[currency]?.(amount) || `${currency} ${amount}`;
}

function PriceItemRow({ item, language, currency }: PriceItemRowProps) {
  const name = getLocalizedText(item.name, language);
  const description = item.description ? getLocalizedText(item.description, language) : null;
  const unit = item.unit ? getLocalizedText(item.unit, language) : null;

  return (
    <div className={`flex items-start justify-between py-3 ${!item.available ? 'opacity-50' : ''}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{name}</span>
          {item.tags?.includes('popular') && (
            <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">Popular</span>
          )}
          {item.tags?.includes('new') && (
            <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded">New</span>
          )}
          {!item.available && (
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">Unavailable</span>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{description}</p>
        )}
      </div>
      <div className="text-right ml-4 flex-shrink-0">
        <span className="font-semibold text-gray-900">
          {formatPrice(item.price, currency)}
        </span>
        {unit && (
          <span className="text-xs text-gray-500 block">{unit}</span>
        )}
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Category Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {category.icon && (
            <span className="text-2xl">{category.icon}</span>
          )}
          <span className="font-semibold text-gray-900">{name}</span>
          <span className="text-sm text-gray-400">({category.items.length})</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Items */}
      {isOpen && (
        <div className="px-4 pb-2 divide-y divide-gray-100">
          {category.items.map((item) => (
            <PriceItemRow
              key={item.id}
              item={item}
              language={language}
              currency={currency}
            />
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
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      )}

      {/* Search & Currency */}
      <div className="flex gap-3 mb-4">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search..."
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

        {/* Currency Selector */}
        {config.showCurrencyConverter && config.supportedCurrencies.length > 1 && (
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="text-center py-8 text-gray-500">
          {searchQuery ? 'No items found' : 'No items available'}
        </div>
      )}
    </div>
  );
}

export default PriceListCard;
