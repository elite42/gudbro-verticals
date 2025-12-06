'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Organization, Brand, Location } from '@/lib/supabase';

interface TenantState {
  // Current selections
  organization: Organization | null;
  brand: Brand | null;
  location: Location | null;

  // Lists
  organizations: Organization[];
  brands: Brand[];
  locations: Location[];

  // Loading states
  isLoading: boolean;

  // Actions
  setOrganization: (org: Organization | null) => void;
  setBrand: (brand: Brand | null) => void;
  setLocation: (location: Location | null) => void;
  refreshOrganizations: () => Promise<void>;
  refreshBrands: () => Promise<void>;
  refreshLocations: () => Promise<void>;
}

const TenantContext = createContext<TenantState | undefined>(undefined);

const STORAGE_KEY = 'gudbro_tenant_context';

interface StoredContext {
  organizationId?: string;
  brandId?: string;
  locationId?: string;
}

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [organization, setOrganizationState] = useState<Organization | null>(null);
  const [brand, setBrandState] = useState<Brand | null>(null);
  const [location, setLocationState] = useState<Location | null>(null);

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch organizations
  const refreshOrganizations = useCallback(async () => {
    try {
      const res = await fetch('/api/organizations?status=active');
      const data = await res.json();
      if (data.organizations) {
        setOrganizations(data.organizations);
      }
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    }
  }, []);

  // Fetch brands for current organization
  const refreshBrands = useCallback(async () => {
    if (!organization) {
      setBrands([]);
      return;
    }

    try {
      const res = await fetch(`/api/brands?organization_id=${organization.id}&is_active=true`);
      const data = await res.json();
      if (data.brands) {
        setBrands(data.brands);
      }
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    }
  }, [organization]);

  // Fetch locations for current brand
  const refreshLocations = useCallback(async () => {
    if (!brand) {
      setLocations([]);
      return;
    }

    try {
      const res = await fetch(`/api/locations?brand_id=${brand.id}&is_active=true`);
      const data = await res.json();
      if (data.locations) {
        setLocations(data.locations);
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  }, [brand]);

  // Set organization and persist
  const setOrganization = useCallback((org: Organization | null) => {
    setOrganizationState(org);
    setBrandState(null);
    setLocationState(null);
    setBrands([]);
    setLocations([]);

    // Persist to localStorage
    if (org) {
      const stored: StoredContext = { organizationId: org.id };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Set brand and persist
  const setBrand = useCallback((b: Brand | null) => {
    setBrandState(b);
    setLocationState(null);
    setLocations([]);

    // Update localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && b) {
      const parsed: StoredContext = JSON.parse(stored);
      parsed.brandId = b.id;
      delete parsed.locationId;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
  }, []);

  // Set location and persist
  const setLocation = useCallback((loc: Location | null) => {
    setLocationState(loc);

    // Update localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && loc) {
      const parsed: StoredContext = JSON.parse(stored);
      parsed.locationId = loc.id;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
  }, []);

  // Initial load - fetch organizations and restore from localStorage
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);

      try {
        // Fetch all organizations
        const res = await fetch('/api/organizations?status=active');
        const data = await res.json();

        if (data.organizations && data.organizations.length > 0) {
          setOrganizations(data.organizations);

          // Try to restore from localStorage
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed: StoredContext = JSON.parse(stored);

            // Find and set organization
            const savedOrg = data.organizations.find((o: Organization) => o.id === parsed.organizationId);
            if (savedOrg) {
              setOrganizationState(savedOrg);

              // Fetch brands for this organization
              const brandsRes = await fetch(`/api/brands?organization_id=${savedOrg.id}&is_active=true`);
              const brandsData = await brandsRes.json();

              if (brandsData.brands && brandsData.brands.length > 0) {
                setBrands(brandsData.brands);

                // Find and set brand
                const savedBrand = brandsData.brands.find((b: Brand) => b.id === parsed.brandId);
                if (savedBrand) {
                  setBrandState(savedBrand);

                  // Fetch locations for this brand
                  const locsRes = await fetch(`/api/locations?brand_id=${savedBrand.id}&is_active=true`);
                  const locsData = await locsRes.json();

                  if (locsData.locations && locsData.locations.length > 0) {
                    setLocations(locsData.locations);

                    // Find and set location
                    const savedLoc = locsData.locations.find((l: Location) => l.id === parsed.locationId);
                    if (savedLoc) {
                      setLocationState(savedLoc);
                    } else {
                      // Auto-select first location
                      setLocationState(locsData.locations[0]);
                    }
                  }
                } else {
                  // Auto-select first brand
                  setBrandState(brandsData.brands[0]);
                }
              }
            } else {
              // Auto-select first organization
              setOrganizationState(data.organizations[0]);
            }
          } else {
            // No stored context, auto-select first organization
            setOrganizationState(data.organizations[0]);
          }
        }
      } catch (error) {
        console.error('Failed to initialize tenant context:', error);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  // When organization changes, fetch its brands
  useEffect(() => {
    if (organization) {
      refreshBrands();
    }
  }, [organization, refreshBrands]);

  // When brand changes, fetch its locations
  useEffect(() => {
    if (brand) {
      refreshLocations();
    }
  }, [brand, refreshLocations]);

  // Auto-select first brand when brands load
  useEffect(() => {
    if (brands.length > 0 && !brand) {
      setBrandState(brands[0]);
    }
  }, [brands, brand]);

  // Auto-select first location when locations load
  useEffect(() => {
    if (locations.length > 0 && !location) {
      setLocationState(locations[0]);
    }
  }, [locations, location]);

  return (
    <TenantContext.Provider
      value={{
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
        refreshOrganizations,
        refreshBrands,
        refreshLocations,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
