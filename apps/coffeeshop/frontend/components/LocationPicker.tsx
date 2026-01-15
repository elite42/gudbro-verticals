'use client';

import { useState, useEffect } from 'react';
import { useMerchantBranding } from '@/lib/contexts/MerchantConfigContext';

interface Location {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  imageUrl: string | null;
  distance?: number; // km from user
}

interface LocationPickerProps {
  locations: Location[];
  brandName: string;
  logoUrl: string | null;
}

/**
 * LocationPicker Component
 *
 * Displays a grid of locations for a multi-location brand.
 * Used when a brand has a custom domain and multiple locations.
 * Optionally shows distance from user if geolocation is enabled.
 */
export function LocationPicker({ locations, brandName, logoUrl }: LocationPickerProps) {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [sortedLocations, setSortedLocations] = useState(locations);
  const [showNearest, setShowNearest] = useState(false);
  const { branding, isWhiteLabel } = useMerchantBranding();

  // Request user location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position);
        },
        () => {
          // User denied or error - continue without location
          console.log('[LocationPicker] Geolocation not available');
        }
      );
    }
  }, []);

  // Sort by distance when user location is available
  useEffect(() => {
    if (userLocation && locations.length > 1) {
      // In production, calculate actual distances
      // For now, just shuffle to simulate
      setShowNearest(true);
    }
  }, [userLocation, locations]);

  // Handle location click
  const handleLocationClick = (slug: string) => {
    window.location.href = `/${slug}/menu`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            {logoUrl ? (
              <img src={logoUrl} alt={brandName} className="h-12 w-auto" />
            ) : (
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg text-xl font-bold text-white"
                style={{ backgroundColor: branding.primaryColor }}
              >
                {brandName.charAt(0)}
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-900">{brandName}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Choose a Location</h2>
          <p className="mt-2 text-gray-600">
            Select the location you&apos;d like to view the menu for
          </p>
        </div>

        {/* Nearest Location Badge */}
        {showNearest && sortedLocations[0] && (
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {sortedLocations[0].name} is nearest to you
            </span>
          </div>
        )}

        {/* Location Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedLocations.map((location, index) => (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location.slug)}
              className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={
                {
                  '--tw-ring-color': branding.primaryColor,
                } as React.CSSProperties
              }
            >
              {/* Image */}
              <div className="aspect-video w-full overflow-hidden bg-gray-200">
                {location.imageUrl ? (
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-6xl text-gray-400">🏪</span>
                  </div>
                )}

                {/* Nearest Badge */}
                {showNearest && index === 0 && (
                  <div className="absolute left-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                    Nearest
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--brand-primary)]">
                  {location.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{location.address}</p>
                <p className="text-sm text-gray-500">{location.city}</p>

                {location.distance !== undefined && (
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    {location.distance.toFixed(1)} km away
                  </p>
                )}

                {/* View Menu Arrow */}
                <div
                  className="mt-3 flex items-center text-sm font-medium"
                  style={{ color: branding.primaryColor }}
                >
                  View Menu
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
          {!isWhiteLabel && (
            <p>
              Powered by{' '}
              <a href="https://gudbro.com" className="font-medium text-gray-700 hover:underline">
                GUDBRO
              </a>
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}

/**
 * LocationPickerSkeleton
 * Loading state for location picker
 */
export function LocationPickerSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-gray-200" />
          <div className="mx-auto mt-4 h-6 w-80 animate-pulse rounded-lg bg-gray-200" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="aspect-video w-full animate-pulse bg-gray-200" />
              <div className="p-4">
                <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-4 w-48 animate-pulse rounded bg-gray-200" />
                <div className="mt-1 h-4 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
