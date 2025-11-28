/**
 * Language Preferences Store
 * Manages user language preferences for UI display
 */

export interface LanguagePreferences {
  selectedLanguage: string; // ISO 639-1 code (it, en, vi)
}

export const AVAILABLE_LANGUAGES = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
] as const;

const STORAGE_KEY = 'roots-language-preferences';

const DEFAULT_PREFERENCES: LanguagePreferences = {
  selectedLanguage: 'en', // Default to English for international audience
};

/**
 * Language Preferences Store
 */
export const languagePreferencesStore = {
  get(): LanguagePreferences {
    if (typeof window === 'undefined') return DEFAULT_PREFERENCES;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_PREFERENCES;

      const parsed = JSON.parse(stored);
      return { ...DEFAULT_PREFERENCES, ...parsed };
    } catch (error) {
      console.error('Failed to load language preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  },

  set(preferences: Partial<LanguagePreferences>): void {
    if (typeof window === 'undefined') return;

    try {
      const current = this.get();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Dispatch event for reactive updates
      window.dispatchEvent(new Event('language-preferences-updated'));
    } catch (error) {
      console.error('Failed to save language preferences:', error);
    }
  },

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('language-preferences-updated'));
    } catch (error) {
      console.error('Failed to clear language preferences:', error);
    }
  },

  getLanguageInfo(code: string) {
    return AVAILABLE_LANGUAGES.find(l => l.code === code);
  },
};
