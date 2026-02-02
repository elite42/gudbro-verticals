'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Phone,
  FirstAid,
  Taxi,
  Hospital,
  Buildings,
  MapPin,
  Siren,
  Ambulance,
  FireExtinguisher,
  ShieldCheckered,
  Info,
  type Icon,
} from '@phosphor-icons/react';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { coffeeshopConfig } from '../../config/coffeeshop.config';
import { translations, type Language } from '../../lib/translations';
import { languagePreferencesStore } from '../../lib/language-preferences';

// ============================================================================
// Types
// ============================================================================

interface EmergencyNumber {
  id: string;
  country_code: string;
  service_type: 'general' | 'police' | 'ambulance' | 'fire';
  phone_number: string;
}

interface CityNumber {
  id: string;
  country_code: string;
  city_name: string;
  label: string;
  phone_number: string;
  category: string;
  sort_order: number;
}

interface MerchantNumber {
  id: string;
  merchant_id: string;
  label: string;
  phone_number: string;
  category: string;
  sort_order: number;
}

// ============================================================================
// Config
// ============================================================================

const EMERGENCY_CONFIG = {
  general: { icon: Siren, color: 'bg-red-500', label: 'emergency' },
  police: { icon: ShieldCheckered, color: 'bg-blue-600', label: 'police' },
  ambulance: { icon: Ambulance, color: 'bg-green-600', label: 'ambulance' },
  fire: { icon: FireExtinguisher, color: 'bg-orange-500', label: 'fire' },
};

const CATEGORY_CONFIG: Record<string, { icon: Icon; color: string }> = {
  taxi: { icon: Taxi, color: 'bg-yellow-500' },
  pharmacy: { icon: FirstAid, color: 'bg-green-500' },
  hospital: { icon: Hospital, color: 'bg-red-500' },
  medical_guard: { icon: FirstAid, color: 'bg-blue-500' },
  police_local: { icon: Buildings, color: 'bg-blue-600' },
  tourist_info: { icon: Info, color: 'bg-purple-500' },
  embassy: { icon: Buildings, color: 'bg-gray-600' },
  other: { icon: Phone, color: 'bg-gray-500' },
};

// ============================================================================
// Component
// ============================================================================

export function UsefulNumbersClient() {
  const router = useRouter();
  const [emergencyNumbers, setEmergencyNumbers] = useState<EmergencyNumber[]>([]);
  const [cityNumbers, setCityNumbers] = useState<CityNumber[]>([]);
  const [merchantNumbers, setMerchantNumbers] = useState<MerchantNumber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<string>('en');

  // Get language from store (client-side only)
  useEffect(() => {
    const storedLang = languagePreferencesStore.get().selectedLanguage;
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const t = translations[lang as Language]?.usefulNumbers || translations.en.usefulNumbers;

  // Merchant config - in production this comes from context
  const merchantId = '10000000-0000-0000-0000-000000000001';
  const countryCode = 'IT';
  const cityName = 'Roma';

  useEffect(() => {
    fetchNumbers();
  }, []);

  async function fetchNumbers() {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        merchantId,
        countryCode,
        cityName,
      });

      const response = await fetch(`/api/useful-numbers?${params}`);
      const data = await response.json();

      if (data.emergency) setEmergencyNumbers(data.emergency);
      if (data.city) setCityNumbers(data.city);
      if (data.merchant) setMerchantNumbers(data.merchant);
    } catch (err) {
      console.error('Error fetching useful numbers:', err);
      setError('Failed to load numbers');
    } finally {
      setIsLoading(false);
    }
  }

  // Handle tap to call
  function handleCall(phoneNumber: string) {
    window.location.href = `tel:${phoneNumber}`;
  }

  return (
    <div className="bg-theme-bg-secondary min-h-screen pb-28">
      {/* Header */}
      <header className="bg-theme-bg-elevated sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex h-10 w-10 items-center justify-center rounded-full transition-colors"
            >
              <svg
                className="text-theme-text-primary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-theme-text-primary text-xl font-bold">
                {t?.title || 'Useful Numbers'}
              </h1>
              <p className="text-theme-text-secondary text-sm">{coffeeshopConfig.business.name}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Hero Card */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-5 text-white">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
              <Phone className="h-6 w-6" weight="duotone" />
            </div>
            <div>
              <h2 className="mb-1 text-lg font-bold">{t?.heroTitle || 'Emergency & Useful Numbers'}</h2>
              <p className="text-sm text-white/90">
                {t?.heroSubtitle || 'Tap any number to call directly'}
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
            <p className="text-theme-text-secondary">{t?.loading || 'Loading...'}</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="rounded-2xl bg-red-50 p-6 text-center dark:bg-red-900/20">
            <p className="mb-3 font-medium text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={fetchNumbers}
              className="rounded-full bg-red-500 px-6 py-2 text-sm font-medium text-white"
            >
              {t?.retry || 'Retry'}
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="space-y-6">
            {/* Emergency Numbers Section */}
            {emergencyNumbers.length > 0 && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <Siren className="h-5 w-5 text-red-500" weight="duotone" />
                  <h3 className="text-theme-text-primary font-bold">
                    {t?.emergency || 'Emergency'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {emergencyNumbers.map((num) => {
                    const config = EMERGENCY_CONFIG[num.service_type];
                    const Icon = config?.icon || Phone;
                    const categories = t?.categories as Record<string, string> | undefined;
                    const label = categories?.[config?.label] || num.service_type;

                    return (
                      <button
                        key={num.id}
                        onClick={() => handleCall(num.phone_number)}
                        className="bg-theme-bg-elevated flex items-center gap-3 rounded-xl p-4 text-left shadow-sm transition-all active:scale-95"
                      >
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${config?.color || 'bg-red-500'}`}
                        >
                          <Icon className="h-6 w-6 text-white" weight="duotone" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-theme-text-secondary text-xs font-medium uppercase tracking-wide">
                            {label}
                          </p>
                          <p className="text-theme-text-primary text-2xl font-bold">
                            {num.phone_number}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* City Numbers Section */}
            {cityNumbers.length > 0 && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <Buildings className="h-5 w-5 text-purple-500" weight="duotone" />
                  <h3 className="text-theme-text-primary font-bold">
                    {t?.cityServices || 'City Services'} - {cityName}
                  </h3>
                </div>
                <div className="space-y-3">
                  {cityNumbers.map((num) => {
                    const config = CATEGORY_CONFIG[num.category] || CATEGORY_CONFIG.other;
                    const Icon = config.icon;
                    const cityCats = t?.categories as Record<string, string> | undefined;
                    const categoryLabel = cityCats?.[num.category] || num.category;

                    return (
                      <button
                        key={num.id}
                        onClick={() => handleCall(num.phone_number)}
                        className="bg-theme-bg-elevated flex w-full items-center gap-4 rounded-xl p-4 text-left shadow-sm transition-all active:scale-[0.98]"
                      >
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${config.color}`}
                        >
                          <Icon className="h-6 w-6 text-white" weight="duotone" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-theme-text-primary font-semibold">{num.label}</p>
                          <p className="text-theme-text-tertiary text-xs">{categoryLabel}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-theme-brand-primary font-mono font-bold">
                            {num.phone_number}
                          </span>
                          <Phone className="text-theme-text-tertiary h-5 w-5" weight="duotone" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Merchant Numbers Section */}
            {merchantNumbers.length > 0 && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-500" weight="duotone" />
                  <h3 className="text-theme-text-primary font-bold">
                    {t?.localServices || 'Local Services'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {merchantNumbers.map((num) => {
                    const config = CATEGORY_CONFIG[num.category] || CATEGORY_CONFIG.other;
                    const Icon = config.icon;

                    return (
                      <button
                        key={num.id}
                        onClick={() => handleCall(num.phone_number)}
                        className="bg-theme-bg-elevated flex w-full items-center gap-4 rounded-xl p-4 text-left shadow-sm transition-all active:scale-[0.98]"
                      >
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${config.color}`}
                        >
                          <Icon className="h-6 w-6 text-white" weight="duotone" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-theme-text-primary font-semibold">{num.label}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-theme-brand-primary font-mono font-bold">
                            {num.phone_number}
                          </span>
                          <Phone className="text-theme-text-tertiary h-5 w-5" weight="duotone" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Empty State */}
            {emergencyNumbers.length === 0 &&
              cityNumbers.length === 0 &&
              merchantNumbers.length === 0 && (
                <div className="bg-theme-bg-elevated rounded-2xl p-8 text-center">
                  <div className="bg-theme-bg-secondary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Phone className="text-theme-text-tertiary h-8 w-8" weight="duotone" />
                  </div>
                  <h3 className="text-theme-text-primary mb-2 text-lg font-bold">
                    {t?.noNumbers || 'No numbers available'}
                  </h3>
                  <p className="text-theme-text-secondary text-sm">
                    {t?.noNumbersDesc || 'Useful numbers will appear here when configured.'}
                  </p>
                </div>
              )}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavLocal />
    </div>
  );
}
