'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HomeHeader } from '../../components/HomeHeader';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { coffeeshopConfig } from '../../config/coffeeshop.config';
import { useTranslation } from '@/lib/use-translation';
import { userProfileStore, UserProfile } from '@/lib/user-profile-store';
import { preferencesStore, UserPreferences, AVAILABLE_ALLERGENS, AVAILABLE_DIETS } from '@/lib/user-preferences';
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
  const [selectedCurrency, setSelectedCurrency] = useState(i18n.baseCurrency);

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
      <HomeHeader />

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
                    {preferences.allergens_to_avoid.map(allergen => (
                      <span
                        key={allergen}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {preferences.dietary_preferences.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-theme-text-secondary mb-2">Dieta:</div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.dietary_preferences.map(diet => (
                      <span
                        key={diet}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                      >
                        {diet}
                      </span>
                    ))}
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
                  setLanguage(e.target.value);
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
          onSave={(newPrefs) => {
            preferencesStore.set(newPrefs);
            setPreferences(newPrefs);
            setShowPreferencesModal(false);
          }}
          onClose={() => setShowPreferencesModal(false)}
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
  onClose
}: {
  preferences: UserPreferences;
  onSave: (prefs: UserPreferences) => void;
  onClose: () => void;
}) {
  const [localPrefs, setLocalPrefs] = useState(preferences);
  const [activeTab, setActiveTab] = useState<'allergens' | 'diets'>('allergens');

  const toggleAllergen = (allergen: string) => {
    setLocalPrefs(prev => ({
      ...prev,
      allergens_to_avoid: prev.allergens_to_avoid.includes(allergen)
        ? prev.allergens_to_avoid.filter(a => a !== allergen)
        : [...prev.allergens_to_avoid, allergen]
    }));
  };

  const toggleDiet = (diet: string) => {
    setLocalPrefs(prev => ({
      ...prev,
      dietary_preferences: prev.dietary_preferences.includes(diet)
        ? prev.dietary_preferences.filter(d => d !== diet)
        : [...prev.dietary_preferences, diet]
    }));
  };

  // Common allergens with icons
  const allergensList = [
    { id: 'gluten', name: 'Glutine', icon: '🌾' },
    { id: 'milk', name: 'Latte', icon: '🥛' },
    { id: 'eggs', name: 'Uova', icon: '🥚' },
    { id: 'nuts', name: 'Frutta a guscio', icon: '🥜' },
    { id: 'peanuts', name: 'Arachidi', icon: '🥜' },
    { id: 'soya', name: 'Soia', icon: '🫘' },
    { id: 'fish', name: 'Pesce', icon: '🐟' },
    { id: 'crustaceans', name: 'Crostacei', icon: '🦐' },
    { id: 'molluscs', name: 'Molluschi', icon: '🦪' },
    { id: 'sesame', name: 'Sesamo', icon: '🌰' },
    { id: 'celery', name: 'Sedano', icon: '🥬' },
    { id: 'mustard', name: 'Senape', icon: '🟡' },
  ];

  const dietsList = [
    { id: 'vegan', name: 'Vegano', icon: '🌱' },
    { id: 'vegetarian', name: 'Vegetariano', icon: '🥗' },
    { id: 'gluten_free', name: 'Senza Glutine', icon: '🚫🌾' },
    { id: 'dairy_free', name: 'Senza Latticini', icon: '🚫🥛' },
    { id: 'halal', name: 'Halal', icon: '☪️' },
    { id: 'kosher', name: 'Kosher', icon: '✡️' },
    { id: 'low_carb', name: 'Low Carb', icon: '📉' },
    { id: 'keto', name: 'Keto', icon: '🥓' },
  ];

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
          {activeTab === 'allergens' ? (
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
                  <span className="text-sm font-medium text-theme-text-primary">{allergen.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {dietsList.map(diet => (
                <button
                  key={diet.id}
                  onClick={() => toggleDiet(diet.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl transition-colors ${
                    localPrefs.dietary_preferences.includes(diet.id)
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                      : 'bg-theme-bg-secondary border-2 border-transparent'
                  }`}
                >
                  <span className="text-xl">{diet.icon}</span>
                  <span className="text-sm font-medium text-theme-text-primary">{diet.name}</span>
                </button>
              ))}
            </div>
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
