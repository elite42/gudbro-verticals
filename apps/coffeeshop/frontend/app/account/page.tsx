'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AccountHeader } from '../../components/AccountHeader';
import { FollowMerchantButton } from '../../components/FollowMerchantButton';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { AuthModal } from '../../components/AuthModal';
import { coffeeshopConfig } from '../../config/coffeeshop.config';
import { useTranslation } from '@/lib/use-translation';
import { userProfileStore, UserProfile } from '@/lib/user-profile-store';
import { preferencesStore, UserPreferences } from '@/lib/user-preferences';
import {
  safetyFilters,
  getAllergens,
  getIntolerances,
  getDiets,
  SafetyFilter,
} from '@/lib/safety/safety-filters';
import { favoritesStore } from '@/lib/favorites-store';
import { orderHistoryStore } from '@/lib/order-history-store';
import { languagePreferencesStore } from '@/lib/language-preferences';
import { currencyPreferencesStore } from '@/lib/currency';
import { useTheme } from '@/lib/theme/theme-context';
import { LoyaltyCard, EarnPointsModal } from '@/components/loyalty';
import { UserLoyaltyState } from '@/types/loyalty';
import { PasskeyRegister, PasskeyList } from '@/components/passkey';

// Wrapper component to handle Suspense for useSearchParams
export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-theme-bg-secondary flex min-h-screen items-center justify-center">
          <div className="border-theme-text-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
        </div>
      }
    >
      <AccountPageContent />
    </Suspense>
  );
}

function AccountPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language, setLanguage } = useTranslation();
  const { themeMode, toggleTheme } = useTheme();
  const { i18n, merchant } = coffeeshopConfig;

  // State
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState('');
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(i18n.baseCurrency);
  const [showEarnPointsModal, setShowEarnPointsModal] = useState(false);

  // Mock loyalty state - in production this would come from API/store
  const [loyaltyState] = useState<UserLoyaltyState>({
    pointsTotal: 1250,
    pointsAvailable: 850,
    pointsSpent: 400,
    tierId: 'silver',
    tierProgress: 62,
    pointsToNextTier: 750,
    currentStreak: 3,
    longestStreak: 5,
    lastVisitDate: new Date().toISOString(),
    totalPurchases: 28,
    totalSpent: 485,
    favoriteItems: [],
    rewardsRedeemed: 2,
    referralCode: 'MARIO2024',
    referralsCount: 2,
    referralPointsEarned: 400,
    socialSharesCount: 5,
    socialPointsEarned: 125,
    connectedSocials: ['instagram'],
    joinedAt: '2024-06-15T10:00:00Z',
    lastActivityAt: new Date().toISOString(),
    birthdayMonth: 3,
  });

  // Check if user is a guest (not logged in with Supabase)
  const isGuest = !profile?.email;

  // Load data on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userProfile = userProfileStore.getRaw();
      setProfile(userProfile);
      setEditName(userProfile.name || '');

      const userPrefs = preferencesStore.get();
      setPreferences(userPrefs);

      setFavoritesCount(favoritesStore.count());
      setOrdersCount(orderHistoryStore.get().orders.length);

      const currencyPrefs = currencyPreferencesStore.get();
      setSelectedCurrency(currencyPrefs.selectedCurrency);

      // Check for auth query param to auto-open auth modal
      const authParam = searchParams.get('auth');
      if (authParam === 'login' || authParam === 'register') {
        setShowAuthModal(true);
      }
    }
  }, [searchParams]);

  // Handle name save
  const handleSaveName = () => {
    if (editName.trim()) {
      userProfileStore.setName(editName.trim());
      setProfile((prev) => (prev ? { ...prev, name: editName.trim() } : null));
    }
    setIsEditingName(false);
  };

  // Handle currency change
  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    currencyPreferencesStore.set({
      selectedCurrency: currency,
      enabled: currency !== i18n.baseCurrency,
    });
  };

  // Format date
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(
      language === 'it' ? 'it-IT' : language === 'vi' ? 'vi-VN' : 'en-US',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    );
  };

  if (!profile || !preferences) {
    return (
      <div className="bg-theme-bg-secondary flex min-h-screen items-center justify-center">
        <div className="border-theme-text-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="bg-theme-bg-secondary min-h-screen pb-28">
      {/* Header */}
      <AccountHeader />

      {/* Account Content */}
      <div className="container mx-auto space-y-4 px-4 pt-6">
        {/* Profile Card */}
        <div className="bg-theme-bg-elevated rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-2xl font-bold text-white">
              {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
            </div>

            <div className="flex-1">
              {isEditingName ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-theme-bg-secondary border-theme-border-light text-theme-text-primary flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Il tuo nome"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="rounded-lg bg-pink-500 px-4 py-2 font-medium text-white transition-colors hover:bg-pink-600"
                  >
                    Salva
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-theme-text-primary text-xl font-bold">
                    {profile.name || 'Ospite'}
                  </h2>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-sm text-pink-500 hover:text-pink-600"
                  >
                    {profile.name ? 'Modifica nome' : 'Aggiungi nome'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Guest CTA - Sign up/Login */}
          {isGuest && (
            <div className="mt-4 rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 p-4 dark:border-pink-800 dark:from-pink-900/20 dark:to-purple-900/20">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
                  <svg
                    className="h-5 w-5 text-pink-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-theme-text-primary text-sm font-semibold">Crea un account</h3>
                  <p className="text-theme-text-secondary mt-0.5 text-xs">
                    Salva i tuoi preferiti, sincronizza le preferenze e ottieni offerte esclusive.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAuthModal(true)}
                className="mt-3 w-full rounded-xl bg-pink-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pink-600"
              >
                Accedi o Registrati
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="border-theme-border-light mt-4 grid grid-cols-3 gap-3 border-t pt-4">
            <div className="text-center">
              <div className="text-theme-text-primary text-2xl font-bold">{profile.visitCount}</div>
              <div className="text-theme-text-secondary text-xs">Visite</div>
            </div>
            <div className="text-center">
              <div className="text-theme-text-primary text-2xl font-bold">{favoritesCount}</div>
              <div className="text-theme-text-secondary text-xs">Preferiti</div>
            </div>
            <div className="text-center">
              <div className="text-theme-text-primary text-2xl font-bold">{ordersCount}</div>
              <div className="text-theme-text-secondary text-xs">Ordini</div>
            </div>
          </div>

          <div className="text-theme-text-tertiary mt-3 text-center text-xs">
            Prima visita: {formatDate(profile.firstVisit)}
          </div>
        </div>

        {/* Loyalty Card */}
        <LoyaltyCard
          loyalty={loyaltyState}
          language={language as 'en' | 'it'}
          onViewRewards={() => router.push('/rewards')}
          onEarnPoints={() => setShowEarnPointsModal(true)}
          onViewHistory={() => router.push('/points-history')}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push('/orders')}
            className="bg-theme-bg-elevated hover:bg-theme-bg-secondary flex items-center gap-3 rounded-xl p-4 shadow-lg transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-xl dark:bg-purple-900/30">
              📦
            </div>
            <div className="text-left">
              <div className="text-theme-text-primary font-semibold">I miei ordini</div>
              <div className="text-theme-text-secondary text-xs">{ordersCount} ordini</div>
            </div>
          </button>

          <button
            onClick={() => router.push('/menu?filter=favorites')}
            className="bg-theme-bg-elevated hover:bg-theme-bg-secondary flex items-center gap-3 rounded-xl p-4 shadow-lg transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-xl dark:bg-red-900/30">
              ❤️
            </div>
            <div className="text-left">
              <div className="text-theme-text-primary font-semibold">Preferiti</div>
              <div className="text-theme-text-secondary text-xs">{favoritesCount} piatti</div>
            </div>
          </button>
        </div>

        {/* Dietary Preferences */}
        <div className="bg-theme-bg-elevated rounded-2xl p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-theme-text-primary text-lg font-bold">Preferenze Alimentari</h3>
            <button
              onClick={() => setShowPreferencesModal(true)}
              className="text-sm font-medium text-pink-500 hover:text-pink-600"
            >
              Modifica
            </button>
          </div>

          {preferences.allergens_to_avoid.length === 0 &&
          preferences.intolerances.length === 0 &&
          preferences.dietary_preferences.length === 0 ? (
            <p className="text-theme-text-secondary text-sm">
              Nessuna preferenza impostata. Tocca "Modifica" per personalizzare la tua esperienza.
            </p>
          ) : (
            <div className="space-y-3">
              {preferences.allergens_to_avoid.length > 0 && (
                <div>
                  <div className="text-theme-text-secondary mb-2 text-xs font-medium">
                    Allergeni da evitare:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.allergens_to_avoid.map((allergenId) => {
                      const filter = safetyFilters.find((f) => f.id === allergenId);
                      const label =
                        filter?.label[language as 'en' | 'it' | 'vi'] ||
                        filter?.label.en ||
                        allergenId;
                      return (
                        <span
                          key={allergenId}
                          className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        >
                          {filter?.icon && <span>{filter.icon}</span>}
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {preferences.intolerances.length > 0 && (
                <div>
                  <div className="text-theme-text-secondary mb-2 text-xs font-medium">
                    Intolleranze:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.intolerances.map((intoleranceId) => {
                      const filter = safetyFilters.find((f) => f.id === intoleranceId);
                      const label =
                        filter?.label[language as 'en' | 'it' | 'vi'] ||
                        filter?.label.en ||
                        intoleranceId;
                      return (
                        <span
                          key={intoleranceId}
                          className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                        >
                          {filter?.icon && <span>{filter.icon}</span>}
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {preferences.dietary_preferences.length > 0 && (
                <div>
                  <div className="text-theme-text-secondary mb-2 text-xs font-medium">Dieta:</div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.dietary_preferences.map((dietId) => {
                      const filter = safetyFilters.find((f) => f.id === dietId);
                      const label =
                        filter?.label[language as 'en' | 'it' | 'vi'] || filter?.label.en || dietId;
                      return (
                        <span
                          key={dietId}
                          className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        >
                          {filter?.icon && <span>{filter.icon}</span>}
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-theme-bg-elevated rounded-2xl p-5 shadow-lg">
          <h3 className="text-theme-text-primary mb-4 text-lg font-bold">Impostazioni</h3>

          <div className="space-y-4">
            {/* Language */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">🌐</span>
                <span className="text-theme-text-primary">Lingua</span>
              </div>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value as 'en' | 'it' | 'vi');
                  languagePreferencesStore.set({ selectedLanguage: e.target.value });
                }}
                className="bg-theme-bg-secondary border-theme-border-light text-theme-text-primary rounded-lg border px-3 py-2"
              >
                {i18n.supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Currency */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">💱</span>
                <span className="text-theme-text-primary">Valuta</span>
              </div>
              <select
                value={selectedCurrency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="bg-theme-bg-secondary border-theme-border-light text-theme-text-primary rounded-lg border px-3 py-2"
              >
                {i18n.supportedCurrencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{themeMode === 'light' ? '☀️' : '🌙'}</span>
                <span className="text-theme-text-primary">Tema</span>
              </div>
              <button
                onClick={toggleTheme}
                className="bg-theme-bg-secondary border-theme-border-light text-theme-text-primary hover:bg-theme-bg-tertiary rounded-lg border px-4 py-2 transition-colors"
              >
                {themeMode === 'light' ? 'Scuro' : 'Chiaro'}
              </button>
            </div>
          </div>
        </div>

        {/* Security / Passkeys - Only for logged in users */}
        {!isGuest && (
          <div className="bg-theme-bg-elevated rounded-2xl p-5 shadow-lg">
            <h3 className="text-theme-text-primary mb-4 text-lg font-bold">Sicurezza</h3>

            <div className="space-y-4">
              {/* Add Passkey */}
              <PasskeyRegister
                onSuccess={() => {
                  // Force refresh of passkey list
                }}
                onError={(error) => {
                  console.error('Passkey registration error:', error);
                }}
              />

              {/* Passkey List */}
              <PasskeyList
                onError={(error) => {
                  console.error('Passkey error:', error);
                }}
              />
            </div>
          </div>
        )}

        {/* About & Follow Locale */}
        <div className="bg-theme-bg-elevated rounded-2xl p-5 shadow-lg">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-theme-text-primary text-lg font-bold">
                {coffeeshopConfig.business.name}
              </h3>
              <p className="text-theme-text-secondary mt-1 text-sm">
                {coffeeshopConfig.business.description}
              </p>
            </div>
            {merchant?.id && (
              <FollowMerchantButton
                merchantId={merchant.id}
                merchantName={coffeeshopConfig.business.name}
                variant="compact"
              />
            )}
          </div>
          <div className="text-theme-text-secondary flex items-center gap-2 text-sm">
            <span>📍</span>
            <span>{coffeeshopConfig.location.address}</span>
          </div>
          <div className="text-theme-text-secondary mt-1 flex items-center gap-2 text-sm">
            <span>📞</span>
            <a href={`tel:${coffeeshopConfig.contact.phone}`} className="text-pink-500">
              {coffeeshopConfig.contact.phone}
            </a>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-theme-text-tertiary py-4 text-center text-xs">
          Powered by GudBro • v1.0.0
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <PreferencesModal
          preferences={preferences}
          currentLanguage={language}
          onSave={(newPrefs) => {
            preferencesStore.set(newPrefs);
            setPreferences(newPrefs);
            setShowPreferencesModal(false);
          }}
          onClose={() => setShowPreferencesModal(false)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={(user) => {
          // Update profile with logged-in user data
          if (user.email) {
            setProfile((prev) =>
              prev ? { ...prev, email: user.email, name: user.name || prev.name } : null
            );
          }
          setShowAuthModal(false);
        }}
      />

      {/* Earn Points Modal */}
      <EarnPointsModal
        isOpen={showEarnPointsModal}
        onClose={() => setShowEarnPointsModal(false)}
        merchantName={coffeeshopConfig.business.name}
        merchantHashtags={['CaffeRossi', 'GudBro']}
        merchantMentions={{
          instagram: 'cafferossi',
          facebook: 'cafferossi',
        }}
        language={language as 'en' | 'it'}
        onActionComplete={async (actionType, points) => {
          try {
            const response = await fetch('/api/loyalty/points', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                accountId: profile?.isRegistered ? profile.id : null,
                sessionId: profile?.id || null, // Use id as session identifier
                actionType,
                metadata: { source: 'earn_points_modal' },
              }),
            });

            const result = await response.json();
            if (result.success) {
              // Silently ignore
            }
          } catch (error) {
            console.error('Failed to record points:', error);
          }
        }}
      />

      {/* Bottom Navigation */}
      <BottomNavLocal />
    </div>
  );
}

// Preferences Modal Component
function PreferencesModal({
  preferences,
  onSave,
  onClose,
  currentLanguage,
}: {
  preferences: UserPreferences;
  onSave: (prefs: UserPreferences) => void;
  onClose: () => void;
  currentLanguage: string;
}) {
  const [localPrefs, setLocalPrefs] = useState(preferences);
  const [activeTab, setActiveTab] = useState<'allergens' | 'intolerances' | 'diets'>('allergens');

  // Get filters from centralized safety-filters.ts
  const allergensList = getAllergens();
  const intolerancesList = getIntolerances();
  const dietsList = getDiets();

  // Get label based on current language
  const getLabel = (filter: SafetyFilter): string => {
    const lang = currentLanguage as 'en' | 'it' | 'vi';
    return filter.label[lang] || filter.label.en;
  };

  const toggleAllergen = (allergenId: string) => {
    setLocalPrefs((prev) => ({
      ...prev,
      allergens_to_avoid: prev.allergens_to_avoid.includes(allergenId)
        ? prev.allergens_to_avoid.filter((a) => a !== allergenId)
        : [...prev.allergens_to_avoid, allergenId],
    }));
  };

  const toggleIntolerance = (intoleranceId: string) => {
    setLocalPrefs((prev) => ({
      ...prev,
      intolerances: prev.intolerances.includes(intoleranceId)
        ? prev.intolerances.filter((i) => i !== intoleranceId)
        : [...prev.intolerances, intoleranceId],
    }));
  };

  // Diet mutual exclusivity groups
  // Only one diet per group can be selected at a time
  const DIET_EXCLUSIVITY_GROUPS: Record<string, string[]> = {
    // Main dietary pattern - mutually exclusive
    main: ['vegan', 'vegetarian', 'pescatarian', 'raw'],
    // Religious diets - can overlap with some restrictions
    religious: ['halal', 'kosher', 'buddhist'],
    // Carb-related - mutually exclusive
    carb: ['low-carb', 'keto', 'paleo'],
  };

  // Check if selecting a diet would conflict with existing selections
  const getDietConflicts = (dietId: string): string[] => {
    const conflicts: string[] = [];
    for (const [groupName, groupDiets] of Object.entries(DIET_EXCLUSIVITY_GROUPS)) {
      if (groupDiets.includes(dietId)) {
        // Find other selected diets in the same group
        const selectedInGroup = localPrefs.dietary_preferences.filter(
          (d) => groupDiets.includes(d) && d !== dietId
        );
        conflicts.push(...selectedInGroup);
      }
    }
    return conflicts;
  };

  const toggleDiet = (dietId: string) => {
    setLocalPrefs((prev) => {
      const isCurrentlySelected = prev.dietary_preferences.includes(dietId);

      if (isCurrentlySelected) {
        // Deselecting - just remove it
        return {
          ...prev,
          dietary_preferences: prev.dietary_preferences.filter((d) => d !== dietId),
        };
      } else {
        // Selecting - remove conflicting diets first
        const conflicts = getDietConflicts(dietId);
        const filteredDiets = prev.dietary_preferences.filter((d) => !conflicts.includes(d));
        return {
          ...prev,
          dietary_preferences: [...filteredDiets, dietId],
        };
      }
    });
  };

  // Check if a diet is in conflict with current selection (for visual feedback)
  const isDietInConflict = (dietId: string): boolean => {
    if (localPrefs.dietary_preferences.includes(dietId)) return false;
    return getDietConflicts(dietId).length > 0;
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="bg-theme-bg-elevated fixed inset-x-4 top-1/2 z-[10001] mx-auto max-h-[80vh] max-w-md -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="border-theme-border-light flex items-center justify-between border-b p-4">
          <h2 className="text-theme-text-primary text-xl font-bold">Preferenze Alimentari</h2>
          <button
            onClick={onClose}
            className="bg-theme-bg-tertiary hover:bg-theme-bg-secondary flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          >
            <svg
              className="text-theme-text-secondary h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-theme-border-light flex border-b">
          <button
            onClick={() => setActiveTab('allergens')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'allergens'
                ? 'border-b-2 border-pink-500 text-pink-500'
                : 'text-theme-text-secondary'
            }`}
          >
            Allergeni ({localPrefs.allergens_to_avoid.length})
          </button>
          <button
            onClick={() => setActiveTab('intolerances')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'intolerances'
                ? 'border-b-2 border-pink-500 text-pink-500'
                : 'text-theme-text-secondary'
            }`}
          >
            Intolleranze ({localPrefs.intolerances.length})
          </button>
          <button
            onClick={() => setActiveTab('diets')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'diets'
                ? 'border-b-2 border-pink-500 text-pink-500'
                : 'text-theme-text-secondary'
            }`}
          >
            Diete ({localPrefs.dietary_preferences.length})
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[50vh] overflow-y-auto p-4">
          {activeTab === 'allergens' && (
            <div className="grid grid-cols-2 gap-2">
              {allergensList.map((allergen) => (
                <button
                  key={allergen.id}
                  onClick={() => toggleAllergen(allergen.id)}
                  className={`flex items-center gap-2 rounded-xl p-3 transition-colors ${
                    localPrefs.allergens_to_avoid.includes(allergen.id)
                      ? 'border-2 border-red-500 bg-red-100 dark:bg-red-900/30'
                      : 'bg-theme-bg-secondary border-2 border-transparent'
                  }`}
                >
                  <span className="text-xl">{allergen.icon}</span>
                  <span className="text-theme-text-primary truncate text-sm font-medium">
                    {getLabel(allergen)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'intolerances' && (
            <div className="grid grid-cols-2 gap-2">
              {intolerancesList.map((intolerance) => (
                <button
                  key={intolerance.id}
                  onClick={() => toggleIntolerance(intolerance.id)}
                  className={`flex items-center gap-2 rounded-xl p-3 transition-colors ${
                    localPrefs.intolerances.includes(intolerance.id)
                      ? 'border-2 border-orange-500 bg-orange-100 dark:bg-orange-900/30'
                      : 'bg-theme-bg-secondary border-2 border-transparent'
                  }`}
                >
                  <span className="text-xl">{intolerance.icon}</span>
                  <span className="text-theme-text-primary truncate text-sm font-medium">
                    {getLabel(intolerance)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'diets' && (
            <>
              <p className="text-theme-text-secondary mb-3 text-xs">
                Alcune diete sono incompatibili tra loro e verranno deselezionate automaticamente.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {dietsList.map((diet) => {
                  const isSelected = localPrefs.dietary_preferences.includes(diet.id);
                  const hasConflict = isDietInConflict(diet.id);

                  return (
                    <button
                      key={diet.id}
                      onClick={() => toggleDiet(diet.id)}
                      className={`flex items-center gap-2 rounded-xl p-3 transition-colors ${
                        isSelected
                          ? 'border-2 border-green-500 bg-green-100 dark:bg-green-900/30'
                          : hasConflict
                            ? 'bg-theme-bg-secondary border-2 border-transparent opacity-50'
                            : 'bg-theme-bg-secondary border-2 border-transparent'
                      }`}
                    >
                      <span className="text-xl">{diet.icon}</span>
                      <span className="text-theme-text-primary truncate text-sm font-medium">
                        {getLabel(diet)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-theme-border-light flex gap-3 border-t p-4">
          <button
            onClick={onClose}
            className="bg-theme-bg-tertiary text-theme-text-primary hover:bg-theme-bg-secondary flex-1 rounded-xl px-4 py-3 font-medium transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={() => onSave(localPrefs)}
            className="flex-1 rounded-xl bg-pink-500 px-4 py-3 font-medium text-white transition-colors hover:bg-pink-600"
          >
            Salva
          </button>
        </div>
      </div>
    </>
  );
}
