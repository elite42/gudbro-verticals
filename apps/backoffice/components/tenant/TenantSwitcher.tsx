'use client';

import { useState, useRef, useEffect } from 'react';
import { useTenant } from '@/lib/contexts/TenantContext';

export function TenantSwitcher() {
  const {
    organization,
    brand,
    location,
    organizations,
    brands,
    locations,
    isLoading,
    setOrganization,
    setBrand,
    setLocation,
  } = useTenant();

  const [isOpen, setIsOpen] = useState(false);
  const [activeLevel, setActiveLevel] = useState<'organization' | 'brand' | 'location'>('location');
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg animate-pulse">
        <div className="h-4 w-24 bg-gray-300 rounded" />
        <div className="h-4 w-4 bg-gray-300 rounded" />
      </div>
    );
  }

  // No organizations yet
  if (organizations.length === 0) {
    return (
      <a
        href="/onboarding"
        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg border border-blue-200"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create Organization
      </a>
    );
  }

  const displayName = location?.name || brand?.name || organization?.name || 'Select...';
  const displayType = location ? 'Location' : brand ? 'Brand' : organization ? 'Organization' : '';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors min-w-[200px]"
      >
        <div className="flex-1 text-left">
          <p className="font-medium text-gray-900 truncate">{displayName}</p>
          <p className="text-xs text-gray-500">{displayType}</p>
        </div>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
          {/* Level tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveLevel('organization')}
              className={`flex-1 px-4 py-2 text-xs font-medium transition-colors ${
                activeLevel === 'organization'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Organization
            </button>
            <button
              onClick={() => setActiveLevel('brand')}
              disabled={!organization}
              className={`flex-1 px-4 py-2 text-xs font-medium transition-colors ${
                activeLevel === 'brand'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              Brand
            </button>
            <button
              onClick={() => setActiveLevel('location')}
              disabled={!brand}
              className={`flex-1 px-4 py-2 text-xs font-medium transition-colors ${
                activeLevel === 'location'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              Location
            </button>
          </div>

          {/* List */}
          <div className="max-h-64 overflow-y-auto">
            {activeLevel === 'organization' && (
              <div className="p-2">
                {organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => {
                      setOrganization(org);
                      setActiveLevel('brand');
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      organization?.id === org.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-medium">
                      {org.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{org.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{org.type} - {org.subscription_plan || 'Free'}</p>
                    </div>
                    {organization?.id === org.id && (
                      <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}

            {activeLevel === 'brand' && (
              <div className="p-2">
                {brands.length === 0 ? (
                  <div className="px-3 py-6 text-center text-gray-500">
                    <p className="text-sm">No brands yet</p>
                    <a href="/settings/brands/new" className="text-blue-600 text-sm hover:underline">
                      Create first brand
                    </a>
                  </div>
                ) : (
                  brands.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setBrand(b);
                        setActiveLevel('location');
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        brand?.id === b.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-sm font-medium"
                        style={{ backgroundColor: b.primary_color || '#6B7280' }}
                      >
                        {b.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{b.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{b.business_type}</p>
                      </div>
                      {brand?.id === b.id && (
                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))
                )}
              </div>
            )}

            {activeLevel === 'location' && (
              <div className="p-2">
                {locations.length === 0 ? (
                  <div className="px-3 py-6 text-center text-gray-500">
                    <p className="text-sm">No locations yet</p>
                    <a href="/settings/locations/new" className="text-blue-600 text-sm hover:underline">
                      Add first location
                    </a>
                  </div>
                ) : (
                  locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setLocation(loc);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        location?.id === loc.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center text-lg">
                        📍
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{loc.name}</p>
                        <p className="text-xs text-gray-500">{loc.city || loc.country_code}</p>
                      </div>
                      {location?.id === loc.id && (
                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Footer with quick actions */}
          <div className="border-t border-gray-200 p-2">
            <a
              href="/settings/organization"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Manage organization
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
