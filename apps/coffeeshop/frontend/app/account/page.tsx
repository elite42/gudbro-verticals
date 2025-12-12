'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AccountHeader } from '../../components/AccountHeader';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { coffeeshopConfig } from '../../config/coffeeshop.config';
import { useTranslation } from '@/lib/use-translation';
import { userProfileStore, UserProfile } from '@/lib/user-profile-store';
import { preferencesStore, UserPreferences } from '@/lib/user-preferences';
import { safetyFilters, getAllergens, getIntolerances, getDiets, SafetyFilter } from '@/lib/safety/safety-filters';
import { favoritesStore } from '@/lib/favorites-store';
import { orderHistoryStore } from '@/lib/order-history-store';
import { languagePreferencesStore } from '@/lib/language-preferences';
import { currencyPreferencesStore } from '@/lib/currency-preferences';
import { useTheme } from '@/lib/theme/theme-context';

export default function AccountPage() {
  const router = useRouter();
  const { t, language, setLanguage } = useTranslation();
  const { themeMode, toggleTheme } = useTheme();
  const { i18n } = coffeeshopConfig;

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
    }
  }, []);

  // Handle name save
  const handleSaveName = () => {
    if (editName.trim()) {
      userProfileStore.setName(editName.trim());
      setProfile(prev => prev ? { ...prev, name: editName.trim() } : null);
    }
    setIsEditingName(false);
  };

  // Handle currency change
  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    currencyPreferencesStore.set({
      selectedCurrency: currency,
      enabled: currency !== i18n.baseCurrency
    });
  };

  // Format date
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(language === 'it' ? 'it-IT' : language === 'vi' ? 'vi-VN' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!profile || !preferences) {
    return (
      <div className="min-h-screen bg-theme-bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg-secondary pb-28">
      {/* Header */}
      <AccountHeader />

      {/* Account Content */}
      <div className="container mx-auto px-4 pt-6 space-y-4">

        {/* Profile Card */}
        <div className="bg-theme-bg-elevated rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
            </div>

            <div className="flex-1">
              {isEditingName ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-theme-bg-secondary border border-theme-border-light text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Il tuo nome"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
                  >
                    Salva
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-theme-text-primary">
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
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-theme-text-primary text-sm">Crea un account</h3>
                  <p className="text-xs text-theme-text-secondary mt-0.5">
                    Salva i tuoi preferiti, sincronizza le preferenze e ottieni offerte esclusive.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full mt-3 py-2.5 px-4 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-xl transition-colors text-sm"
              >
                Accedi o Registrati
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-theme-border-light">
            <div className="text-center">
              <div className="text-2xl font-bold text-theme-text-primary">{profile.visitCount}</div>
              <div className="text-xs text-theme-text-secondary">Visite</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-theme-text-primary">{favoritesCount}</div>
              <div className="text-xs text-theme-text-secondary">Preferiti</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-theme-text-primary">{ordersCount}</div>
              <div className="text-xs text-theme-text-secondary">Ordini</div>
            </div>
          </div>

          <div className="text-xs text-theme-text-tertiary mt-3 text-center">
            Prima visita: {formatDate(profile.firstVisit)}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push('/orders')}
            className="bg-theme-bg-elevated rounded-xl p-4 shadow-lg flex items-center gap-3 hover:bg-theme-bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xl">
              📦
            </div>
            <div className="text-left">
              <div className="font-semibold text-theme-text-primary">I miei ordini</div>
              <div className="text-xs text-theme-text-secondary">{ordersCount} ordini</div>
            </div>
          </button>

          <button
            onClick={() => router.push('/menu?filter=favorites')}
            className="bg-theme-bg-elevated rounded-xl p-4 shadow-lg flex items-center gap-3 hover:bg-theme-bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-xl">
              ❤️
            </div>
            <div className="text-left">
              <div className="font-semibold text-theme-text-primary">Preferiti</div>
              <div className="text-xs text-theme-text-secondary">{favoritesCount} piatti</div>
            </div>
          </button>
        </div>

        {/* Dietary Preferences */}
        <div className="bg-theme-bg-elevated rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-theme-text-primary">Preferenze Alimentari</h3>
            <button
              onClick={() => setShowPreferencesModal(true)}
              className="text-sm text-pink-500 hover:text-pink-600 font-medium"
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
                  <div className="text-xs font-medium text-theme-text-secondary mb-2">Allergeni da evitare:</div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.allergens_to_avoid.map(allergenId => {
                      const filter = safetyFilters.find(f => f.id === allergenId);
                      const label = filter?.label[language as 'en' | 'it' | 'vi'] || filter?.label.en || allergenId;
                      return (
                        <span
                          key={allergenId}
                          className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm flex items-center gap-1"
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
                  <div className="text-xs font-medium text-theme-text-secondary mb-2">Intolleranze:</div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.intolerances.map(intoleranceId => {
                      const filter = safetyFilters.find(f => f.id === intoleranceId);
                      const label = filter?.label[language as 'en' | 'it' | 'vi'] || filter?.label.en || intoleranceId;
                      return (
                        <span
                          key={intoleranceId}
                          className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm flex items-center gap-1"
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
                  <div className="text-xs font-medium text-theme-text-secondary mb-2">Dieta:</div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.dietary_preferences.map(dietId => {
                      const filter = safetyFilters.find(f => f.id === dietId);
                      const label = filter?.label[language as 'en' | 'it' | 'vi'] || filter?.label.en || dietId;
                      return (
                        <span
                          key={dietId}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm flex items-center gap-1"
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
          <h3 className="text-lg font-bold text-theme-text-primary mb-4">Impostazioni</h3>

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
                className="px-3 py-2 rounded-lg bg-theme-bg-secondary border border-theme-border-light text-theme-text-primary"
              >
                {i18n.supportedLanguages.map(lang => (
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
                className="px-3 py-2 rounded-lg bg-theme-bg-secondary border border-theme-border-light text-theme-text-primary"
              >
                {i18n.supportedCurrencies.map(currency => (
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
                className="px-4 py-2 rounded-lg bg-theme-bg-secondary border border-theme-border-light text-theme-text-primary hover:bg-theme-bg-tertiary transition-colors"
              >
                {themeMode === 'light' ? 'Scuro' : 'Chiaro'}
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-theme-bg-elevated rounded-2xl p-5 shadow-lg">
          <h3 className="text-lg font-bold text-theme-text-primary mb-2">{coffeeshopConfig.business.name}</h3>
          <p className="text-sm text-theme-text-secondary mb-3">
            {coffeeshopConfig.business.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-theme-text-secondary">
            <span>📍</span>
            <span>{coffeeshopConfig.location.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-theme-text-secondary mt-1">
            <span>📞</span>
            <a href={`tel:${coffeeshopConfig.contact.phone}`} className="text-pink-500">
              {coffeeshopConfig.contact.phone}
            </a>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center text-xs text-theme-text-tertiary py-4">
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
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={(user) => {
            // Update profile with logged-in user data
            if (user.email) {
              setProfile(prev => prev ? { ...prev, email: user.email, name: user.name || prev.name } : null);
            }
            setShowAuthModal(false);
          }}
        />
      )}

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
  currentLanguage
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
    setLocalPrefs(prev => ({
      ...prev,
      allergens_to_avoid: prev.allergens_to_avoid.includes(allergenId)
        ? prev.allergens_to_avoid.filter(a => a !== allergenId)
        : [...prev.allergens_to_avoid, allergenId]
    }));
  };

  const toggleIntolerance = (intoleranceId: string) => {
    setLocalPrefs(prev => ({
      ...prev,
      intolerances: prev.intolerances.includes(intoleranceId)
        ? prev.intolerances.filter(i => i !== intoleranceId)
        : [...prev.intolerances, intoleranceId]
    }));
  };

  // Diet mutual exclusivity groups
  // Only one diet per group can be selected at a time
  const DIET_EXCLUSIVITY_GROUPS: Record<string, string[]> = {
    // Main dietary pattern - mutually exclusive
    'main': ['vegan', 'vegetarian', 'pescatarian', 'raw'],
    // Religious diets - can overlap with some restrictions
    'religious': ['halal', 'kosher', 'buddhist'],
    // Carb-related - mutually exclusive
    'carb': ['low-carb', 'keto', 'paleo'],
  };

  // Check if selecting a diet would conflict with existing selections
  const getDietConflicts = (dietId: string): string[] => {
    const conflicts: string[] = [];
    for (const [groupName, groupDiets] of Object.entries(DIET_EXCLUSIVITY_GROUPS)) {
      if (groupDiets.includes(dietId)) {
        // Find other selected diets in the same group
        const selectedInGroup = localPrefs.dietary_preferences.filter(
          d => groupDiets.includes(d) && d !== dietId
        );
        conflicts.push(...selectedInGroup);
      }
    }
    return conflicts;
  };

  const toggleDiet = (dietId: string) => {
    setLocalPrefs(prev => {
      const isCurrentlySelected = prev.dietary_preferences.includes(dietId);

      if (isCurrentlySelected) {
        // Deselecting - just remove it
        return {
          ...prev,
          dietary_preferences: prev.dietary_preferences.filter(d => d !== dietId)
        };
      } else {
        // Selecting - remove conflicting diets first
        const conflicts = getDietConflicts(dietId);
        const filteredDiets = prev.dietary_preferences.filter(d => !conflicts.includes(d));
        return {
          ...prev,
          dietary_preferences: [...filteredDiets, dietId]
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
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-theme-bg-elevated rounded-2xl shadow-2xl z-[10001] max-w-md mx-auto max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-theme-border-light">
          <h2 className="text-xl font-bold text-theme-text-primary">Preferenze Alimentari</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-theme-bg-tertiary flex items-center justify-center hover:bg-theme-bg-secondary transition-colors"
          >
            <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-theme-border-light">
          <button
            onClick={() => setActiveTab('allergens')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'allergens'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-theme-text-secondary'
            }`}
          >
            Allergeni ({localPrefs.allergens_to_avoid.length})
          </button>
          <button
            onClick={() => setActiveTab('intolerances')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'intolerances'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-theme-text-secondary'
            }`}
          >
            Intolleranze ({localPrefs.intolerances.length})
          </button>
          <button
            onClick={() => setActiveTab('diets')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'diets'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-theme-text-secondary'
            }`}
          >
            Diete ({localPrefs.dietary_preferences.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {activeTab === 'allergens' && (
            <div className="grid grid-cols-2 gap-2">
              {allergensList.map(allergen => (
                <button
                  key={allergen.id}
                  onClick={() => toggleAllergen(allergen.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl transition-colors ${
                    localPrefs.allergens_to_avoid.includes(allergen.id)
                      ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                      : 'bg-theme-bg-secondary border-2 border-transparent'
                  }`}
                >
                  <span className="text-xl">{allergen.icon}</span>
                  <span className="text-sm font-medium text-theme-text-primary truncate">{getLabel(allergen)}</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'intolerances' && (
            <div className="grid grid-cols-2 gap-2">
              {intolerancesList.map(intolerance => (
                <button
                  key={intolerance.id}
                  onClick={() => toggleIntolerance(intolerance.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl transition-colors ${
                    localPrefs.intolerances.includes(intolerance.id)
                      ? 'bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-500'
                      : 'bg-theme-bg-secondary border-2 border-transparent'
                  }`}
                >
                  <span className="text-xl">{intolerance.icon}</span>
                  <span className="text-sm font-medium text-theme-text-primary truncate">{getLabel(intolerance)}</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'diets' && (
            <>
              <p className="text-xs text-theme-text-secondary mb-3">
                Alcune diete sono incompatibili tra loro e verranno deselezionate automaticamente.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {dietsList.map(diet => {
                  const isSelected = localPrefs.dietary_preferences.includes(diet.id);
                  const hasConflict = isDietInConflict(diet.id);

                  return (
                    <button
                      key={diet.id}
                      onClick={() => toggleDiet(diet.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                          : hasConflict
                            ? 'bg-theme-bg-secondary border-2 border-transparent opacity-50'
                            : 'bg-theme-bg-secondary border-2 border-transparent'
                      }`}
                    >
                      <span className="text-xl">{diet.icon}</span>
                      <span className="text-sm font-medium text-theme-text-primary truncate">{getLabel(diet)}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-theme-border-light flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-theme-bg-tertiary text-theme-text-primary font-medium hover:bg-theme-bg-secondary transition-colors"
          >
            Annulla
          </button>
          <button
            onClick={() => onSave(localPrefs)}
            className="flex-1 py-3 px-4 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
          >
            Salva
          </button>
        </div>
      </div>
    </>
  );
}

// Auth Modal Component
function AuthModal({
  onClose,
  onSuccess
}: {
  onClose: () => void;
  onSuccess: (user: { email?: string; name?: string }) => void;
}) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Integrate with Supabase Auth
      // For now, simulate a successful login/register
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated success
      onSuccess({ email, name: mode === 'register' ? name : undefined });
    } catch (err) {
      setError('Si è verificato un errore. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    setIsLoading(true);
    setError('');

    try {
      // TODO: Integrate with Supabase OAuth
      // For now, simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));

      onSuccess({ email: `user@${provider}.com`, name: 'Social User' });
    } catch (err) {
      setError(`Errore con ${provider}. Riprova.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-theme-bg-elevated rounded-2xl shadow-2xl z-[10001] max-w-md mx-auto max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-theme-border-light">
          <h2 className="text-xl font-bold text-theme-text-primary">
            {mode === 'login' ? 'Accedi' : 'Registrati'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-theme-bg-tertiary flex items-center justify-center hover:bg-theme-bg-secondary transition-colors"
          >
            <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium text-theme-text-primary">Continua con Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="font-medium">Continua con Apple</span>
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white rounded-xl hover:bg-[#166FE5] transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-medium">Continua con Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-theme-border-light" />
            <span className="text-sm text-theme-text-secondary">oppure</span>
            <div className="flex-1 h-px bg-theme-border-light" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-theme-text-secondary mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-theme-bg-secondary border border-theme-border-light text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Il tuo nome"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-theme-text-secondary mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-theme-bg-secondary border border-theme-border-light text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="email@esempio.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-theme-text-secondary mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-theme-bg-secondary border border-theme-border-light text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="La tua password"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Caricamento...
                </span>
              ) : (
                mode === 'login' ? 'Accedi' : 'Registrati'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-theme-text-secondary">
              {mode === 'login' ? 'Non hai un account?' : 'Hai già un account?'}
              <button
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="ml-1 text-pink-500 hover:text-pink-600 font-medium"
              >
                {mode === 'login' ? 'Registrati' : 'Accedi'}
              </button>
            </p>
          </div>

          {/* Privacy Note */}
          <p className="mt-4 text-xs text-theme-text-tertiary text-center">
            Continuando accetti i nostri{' '}
            <a href="#" className="text-pink-500">Termini di Servizio</a>{' '}
            e la{' '}
            <a href="#" className="text-pink-500">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </>
  );
}
