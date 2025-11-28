'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { safetyFilters } from '@/../../shared/database/safety-filters';

export default function SafetySystemPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'allergen' | 'diet'>('all');

  // Group filters by type
  const allergenFilters = safetyFilters.filter(f => f.type === 'allergen');
  const dietFilters = safetyFilters.filter(f => f.type === 'diet');

  // Filter based on search and type selection
  const filteredFilters = safetyFilters.filter(filter => {
    const matchesSearch =
      filter.label.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      filter.label.it.toLowerCase().includes(searchQuery.toLowerCase()) ||
      filter.label.vi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      filter.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || filter.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety System</h1>
        <p className="text-gray-600">
          Complete allergen and dietary filter library with SVG icons for menu safety
        </p>
      </div>

      {/* Stats - GUDBRO Brand Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card padding="md" className="text-center bg-gradient-to-br from-[#cd0931] to-[#a00727]">
          <div className="text-2xl font-bold text-white">{safetyFilters.length}</div>
          <div className="text-sm text-white/90">Total Icons</div>
        </Card>
        <Card padding="md" className="text-center bg-gradient-to-br from-[#f8ad16] to-[#f88d16]">
          <div className="text-2xl font-bold text-black">{allergenFilters.length}</div>
          <div className="text-sm text-black/90">Allergen Filters</div>
        </Card>
        <Card padding="md" className="text-center bg-gradient-to-br from-[#0931cd] to-[#072399]">
          <div className="text-2xl font-bold text-white">{dietFilters.length}</div>
          <div className="text-sm text-white/90">Dietary Filters</div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search filters by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputSize="md"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', name: 'All', count: safetyFilters.length },
            { id: 'allergen', name: 'Allergens', count: allergenFilters.length },
            { id: 'diet', name: 'Dietary', count: dietFilters.length },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === type.id
                  ? 'bg-gradient-to-r from-[#cd0931] to-[#a00727] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {type.name}
              <span className="ml-2 text-xs opacity-75">({type.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFilters.map((filter) => (
          <Card
            key={filter.id}
            padding="md"
            className="hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              {/* Icon */}
              <div className="text-5xl mb-3">{filter.icon}</div>

              {/* Type Badge */}
              <Badge
                variant={filter.type === 'allergen' ? 'danger' : 'success'}
                className="mb-2 text-xs"
              >
                {filter.type === 'allergen' ? 'Allergen' : 'Dietary'}
              </Badge>

              {/* Name */}
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                {filter.label.en}
              </h3>

              {/* Translations */}
              <div className="text-xs text-gray-500 space-y-0.5">
                <div>🇮🇹 {filter.label.it}</div>
                <div>🇻🇳 {filter.label.vi}</div>
              </div>

              {/* ID */}
              <div className="mt-2 pt-2 border-t border-gray-100">
                <code className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                  {filter.id}
                </code>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredFilters.length === 0 && (
        <Card padding="xl" className="text-center">
          <div className="py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No filters found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#cd0931] to-[#a00727] text-white rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              Clear Filters
            </button>
          </div>
        </Card>
      )}

      {/* Info Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Card padding="lg" className="bg-gradient-to-r from-[#f2f2f2] to-white">
          <h3 className="text-lg font-bold text-gray-900 mb-2">About Safety System</h3>
          <p className="text-gray-700 mb-4">
            This icon library provides visual indicators for allergens and dietary restrictions in menu items.
            All icons are SVG-based and support multiple languages (English, Italian, Vietnamese).
          </p>
          <div className="flex gap-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900">Usage:</strong> Import from <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">@/../../shared/database/safety-filters</code>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
