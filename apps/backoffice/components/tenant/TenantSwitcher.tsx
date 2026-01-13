'use client';

import { useState, useRef, useEffect } from 'react';
import { useTenant } from '@/lib/contexts/TenantContext';
import { MapPin, Building2, ChevronDown } from 'lucide-react';

interface LocationWithContext {
  id: string;
  name: string;
  slug: string;
  city: string | null;
  brand_name: string;
  brand_id: string;
  org_name: string;
  org_id: string;
}

export function TenantSwitcher() {
  const { organization, brand, location, setOrganization, setBrand, setLocation } = useTenant();

  const [isOpen, setIsOpen] = useState(false);
  const [allLocations, setAllLocations] = useState<LocationWithContext[]>([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch all locations directly
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('/api/locations/all');
        const data = await res.json();
        if (data.locations) {
          setAllLocations(data.locations);

          // Auto-select first location if none selected
          if (!location && data.locations.length > 0) {
            handleSelectLocation(data.locations[0]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch locations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = async (loc: LocationWithContext) => {
    // Fetch full organization data
    const orgRes = await fetch(`/api/organizations?id=${loc.org_id}`);
    const orgData = await orgRes.json();
    if (orgData.organization) {
      setOrganization(orgData.organization);
    }

    // Fetch full brand data
    const brandRes = await fetch(`/api/brands?id=${loc.brand_id}`);
    const brandData = await brandRes.json();
    if (brandData.brand) {
      setBrand(brandData.brand);
    }

    // Fetch full location data
    const locRes = await fetch(`/api/locations?id=${loc.id}`);
    const locData = await locRes.json();
    if (locData.location) {
      setLocation(locData.location);
    }

    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex animate-pulse items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
        <div className="h-4 w-24 rounded bg-gray-300" />
        <div className="h-4 w-4 rounded bg-gray-300" />
      </div>
    );
  }

  // No locations yet
  if (allLocations.length === 0) {
    return (
      <a
        href="/onboarding"
        className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Setup First Location
      </a>
    );
  }

  const displayName = location?.name || 'Select Location';
  const displaySubtext = location
    ? `${brand?.name || ''} · ${location.city || ''}`
    : 'Choose a location';

  // Group locations by organization
  const groupedLocations = allLocations.reduce(
    (acc, loc) => {
      if (!acc[loc.org_name]) {
        acc[loc.org_name] = [];
      }
      acc[loc.org_name].push(loc);
      return acc;
    },
    {} as Record<string, LocationWithContext[]>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-w-[200px] items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm transition-colors hover:bg-gray-200"
      >
        <MapPin className="h-4 w-4 text-gray-500" />
        <div className="flex-1 text-left">
          <p className="truncate font-medium text-gray-900">{displayName}</p>
          <p className="truncate text-xs text-gray-500">{displaySubtext}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-100 bg-gray-50 px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Select Location
            </p>
          </div>

          {/* Locations grouped by org */}
          <div className="max-h-80 overflow-y-auto">
            {Object.entries(groupedLocations).map(([orgName, locs]) => (
              <div key={orgName}>
                {/* Org header */}
                <div className="border-b border-gray-100 bg-gray-50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3 w-3 text-gray-400" />
                    <span className="text-xs font-medium text-gray-600">{orgName}</span>
                  </div>
                </div>
                {/* Locations */}
                <div className="p-1">
                  {locs.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                        location?.id === loc.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-medium text-white">
                        {loc.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{loc.name}</p>
                        <p className="text-xs text-gray-500">
                          {loc.brand_name} · {loc.city || loc.slug}
                        </p>
                      </div>
                      {location?.id === loc.id && (
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-2">
            <a
              href="/onboarding"
              className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-600 transition-colors hover:bg-blue-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Location
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
