'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, Check, Globe } from 'lucide-react';
import { Country } from '@/lib/supabase';

interface CountrySelectorProps {
  value?: string;
  onChange: (country: Country | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function CountrySelector({
  value,
  onChange,
  placeholder = 'Select a country...',
  disabled = false
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Fetch countries
  const fetchCountries = useCallback(async (searchTerm?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);

      const res = await fetch(`/api/countries?${params.toString()}`);
      const data = await res.json();
      setCountries(data.countries || []);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  // Find selected country when value changes
  useEffect(() => {
    if (value && countries.length > 0) {
      const found = countries.find(c => c.code === value);
      if (found) setSelectedCountry(found);
    }
  }, [value, countries]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        fetchCountries(search);
      } else {
        fetchCountries();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchCountries]);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    onChange(country);
    setIsOpen(false);
    setSearch('');
  };

  // Group by continent
  const groupedCountries = countries.reduce((acc, country) => {
    const continent = country.continent || 'Other';
    if (!acc[continent]) acc[continent] = [];
    acc[continent].push(country);
    return acc;
  }, {} as Record<string, Country[]>);

  const continentOrder = ['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania', 'Other'];

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-3 py-2
          border rounded-md bg-white text-left
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400 cursor-pointer'}
          ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}
        `}
      >
        <div className="flex items-center gap-2">
          {selectedCountry ? (
            <>
              <span className="text-lg">{getCountryFlag(selectedCountry.code)}</span>
              <span>{selectedCountry.name_en}</span>
              <span className="text-gray-400 text-sm">({selectedCountry.code})</span>
            </>
          ) : (
            <>
              <Globe className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">{placeholder}</span>
            </>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries..."
                className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto max-h-72">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : countries.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No countries found</div>
            ) : (
              continentOrder.map(continent => {
                const continentCountries = groupedCountries[continent];
                if (!continentCountries?.length) return null;

                return (
                  <div key={continent}>
                    <div className="px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">
                      {continent} ({continentCountries.length})
                    </div>
                    {continentCountries.map(country => (
                      <button
                        key={country.code}
                        onClick={() => handleSelect(country)}
                        className={`
                          w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-blue-50
                          ${selectedCountry?.code === country.code ? 'bg-blue-50' : ''}
                        `}
                      >
                        <span className="text-lg">{getCountryFlag(country.code)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate">{country.name_en}</span>
                            {country.name_native && country.name_native !== country.name_en && (
                              <span className="text-gray-400 text-sm truncate">
                                {country.name_native}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            {country.currency_symbol} {country.currency_code} • {country.primary_language.toUpperCase()}
                          </div>
                        </div>
                        {selectedCountry?.code === country.code && (
                          <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Convert country code to flag emoji
function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
