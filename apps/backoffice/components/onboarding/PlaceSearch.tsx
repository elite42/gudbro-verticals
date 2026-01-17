'use client';

/**
 * PlaceSearch Component
 *
 * Google Places autocomplete for searching hotels (lodging) or addresses.
 * Used in customer onboarding to capture tourist accommodation.
 *
 * Usage:
 * - type="lodging" → Hotels, hostels, resorts only
 * - type="address" → Any address/place
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Building2, Loader2, X } from 'lucide-react';

export interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  types?: string[];
}

interface PlaceSuggestion {
  placeId: string;
  name: string;
  address: string;
  types: string[];
}

interface PlaceSearchProps {
  /** Search type: 'lodging' for hotels/hostels, 'address' for any address */
  type: 'lodging' | 'address';
  /** Callback when user selects a place */
  onSelect: (place: PlaceResult) => void;
  /** Optional: Bias results toward this location */
  locationBias?: { lat: number; lng: number };
  /** Placeholder text */
  placeholder?: string;
  /** Initial value (for edit mode) */
  defaultValue?: string;
  /** Language for results */
  language?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function PlaceSearch({
  type,
  onSelect,
  locationBias,
  placeholder,
  defaultValue = '',
  language = 'en',
  disabled = false,
  error,
}: PlaceSearchProps) {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  // Default placeholders
  const defaultPlaceholder =
    type === 'lodging' ? 'Search hotel or hostel name...' : 'Search address...';

  // Fetch suggestions when query changes
  useEffect(() => {
    if (debouncedQuery.length < 2 || selectedPlace) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        const response = await fetch('/api/places/autocomplete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: debouncedQuery,
            type,
            locationBias,
            language,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();
        setSuggestions(data.suggestions || []);
        setIsOpen(true);
      } catch (err) {
        console.error('[PlaceSearch] Error:', err);
        setFetchError('Unable to search. Please try again.');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, type, locationBias, language, selectedPlace]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle selection
  const handleSelect = useCallback(
    async (suggestion: PlaceSuggestion) => {
      setIsLoading(true);
      setIsOpen(false);

      try {
        // Fetch full details
        const response = await fetch(
          `/api/places/details?placeId=${encodeURIComponent(suggestion.placeId)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch place details');
        }

        const data = await response.json();
        const place = data.place;

        const result: PlaceResult = {
          placeId: place.placeId,
          name: place.name,
          address: place.formattedAddress,
          latitude: place.latitude,
          longitude: place.longitude,
          types: place.types,
        };

        setSelectedPlace(result);
        setQuery(place.name);
        onSelect(result);
      } catch (err) {
        console.error('[PlaceSearch] Error fetching details:', err);
        setFetchError('Unable to get place details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [onSelect]
  );

  // Clear selection
  const handleClear = () => {
    setQuery('');
    setSelectedPlace(null);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedPlace(null); // Clear selection when typing
  };

  const Icon = type === 'lodging' ? Building2 : MapPin;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder || defaultPlaceholder}
          disabled={disabled}
          className={`block w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm transition-colors ${
            error
              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
              : selectedPlace
                ? 'border-green-300 bg-green-50 focus:border-green-500 focus:ring-green-500'
                : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500'
          } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        />

        {/* Right side: loading or clear button */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          ) : query && !disabled ? (
            <button type="button" onClick={handleClear} className="rounded p-0.5 hover:bg-gray-100">
              <X className="h-4 w-4 text-gray-400" />
            </button>
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Error message */}
      {(error || fetchError) && <p className="mt-1 text-xs text-red-600">{error || fetchError}</p>}

      {/* Selected place info */}
      {selectedPlace && (
        <p className="mt-1 text-xs text-green-600">
          <MapPin className="mr-1 inline h-3 w-3" />
          {selectedPlace.address}
        </p>
      )}

      {/* Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {suggestions.map((suggestion) => (
            <li key={suggestion.placeId}>
              <button
                type="button"
                onClick={() => handleSelect(suggestion)}
                className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900">{suggestion.name}</p>
                  <p className="truncate text-xs text-gray-500">{suggestion.address}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {isOpen &&
        !isLoading &&
        debouncedQuery.length >= 2 &&
        suggestions.length === 0 &&
        !fetchError && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm text-gray-500 shadow-lg">
            No {type === 'lodging' ? 'hotels' : 'places'} found for "{debouncedQuery}"
          </div>
        )}
    </div>
  );
}

// Convenience wrappers
export function HotelSearch(props: Omit<PlaceSearchProps, 'type'>) {
  return <PlaceSearch {...props} type="lodging" />;
}

export function AddressSearch(props: Omit<PlaceSearchProps, 'type'>) {
  return <PlaceSearch {...props} type="address" />;
}
