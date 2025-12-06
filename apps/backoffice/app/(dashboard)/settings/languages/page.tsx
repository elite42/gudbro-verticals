'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Language {
  code: string;
  name: string;
  native_name: string;
  direction: 'ltr' | 'rtl';
}

interface MerchantLanguageSettings {
  primary_language: string;
  enabled_languages: string[];
}

// Flag mapping for common languages
const FLAG_MAP: Record<string, string> = {
  en: '🇬🇧', vi: '🇻🇳', it: '🇮🇹', ko: '🇰🇷', ja: '🇯🇵',
  zh: '🇨🇳', fr: '🇫🇷', de: '🇩🇪', es: '🇪🇸', pt: '🇵🇹',
  ru: '🇷🇺', ar: '🇸🇦', he: '🇮🇱', th: '🇹🇭', fa: '🇮🇷',
  nl: '🇳🇱', pl: '🇵🇱', tr: '🇹🇷', hi: '🇮🇳', id: '🇮🇩',
  ms: '🇲🇾', tl: '🇵🇭', sv: '🇸🇪', da: '🇩🇰', no: '🇳🇴',
  fi: '🇫🇮', cs: '🇨🇿', el: '🇬🇷', hu: '🇭🇺', ro: '🇷🇴',
  uk: '🇺🇦', bg: '🇧🇬', sk: '🇸🇰', hr: '🇭🇷', sl: '🇸🇮',
};

// Default merchant ID (for demo - will be dynamic in multi-tenant setup)
const DEFAULT_MERCHANT_ID = '770e8400-e29b-41d4-a716-446655440001';

export default function LanguageSettingsPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [settings, setSettings] = useState<MerchantLanguageSettings>({
    primary_language: 'en',
    enabled_languages: ['en'],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      // Fetch all languages
      const { data: langData } = await supabase
        .from('languages')
        .select('code, name, native_name, direction')
        .order('name');

      // Fetch merchant settings
      const { data: merchantData } = await supabase
        .from('merchants')
        .select('primary_language, enabled_languages')
        .eq('id', DEFAULT_MERCHANT_ID)
        .single();

      if (langData) {
        setLanguages(langData);
      }

      if (merchantData) {
        setSettings({
          primary_language: merchantData.primary_language || 'en',
          enabled_languages: merchantData.enabled_languages || ['en'],
        });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }

  // Toggle language enabled
  const toggleLanguage = (code: string) => {
    setSettings((prev) => {
      const isEnabled = prev.enabled_languages.includes(code);

      // Can't disable primary language
      if (isEnabled && code === prev.primary_language) {
        return prev;
      }

      const newEnabled = isEnabled
        ? prev.enabled_languages.filter((c) => c !== code)
        : [...prev.enabled_languages, code];

      return {
        ...prev,
        enabled_languages: newEnabled,
      };
    });
    setSaved(false);
  };

  // Set primary language
  const setPrimaryLanguage = (code: string) => {
    setSettings((prev) => {
      // Ensure it's enabled
      const newEnabled = prev.enabled_languages.includes(code)
        ? prev.enabled_languages
        : [...prev.enabled_languages, code];

      return {
        primary_language: code,
        enabled_languages: newEnabled,
      };
    });
    setSaved(false);
  };

  // Save settings
  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('merchants')
        .update({
          primary_language: settings.primary_language,
          enabled_languages: settings.enabled_languages,
        })
        .eq('id', DEFAULT_MERCHANT_ID);

      if (error) {
        console.error('Error saving:', error);
        alert('Failed to save settings');
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error('Error saving:', err);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  // Filter languages
  const filteredLanguages = languages.filter((lang) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      lang.name.toLowerCase().includes(query) ||
      lang.native_name.toLowerCase().includes(query) ||
      lang.code.toLowerCase().includes(query)
    );
  });

  // Separate enabled and available languages
  const enabledLanguages = filteredLanguages.filter((lang) =>
    settings.enabled_languages.includes(lang.code)
  );
  const availableLanguages = filteredLanguages.filter(
    (lang) => !settings.enabled_languages.includes(lang.code)
  );

  const getFlag = (code: string) => FLAG_MAP[code] || '🏳️';

  // Stats
  const stats = {
    total: languages.length,
    enabled: settings.enabled_languages.length,
    rtl: settings.enabled_languages.filter((code) => {
      const lang = languages.find((l) => l.code === code);
      return lang?.direction === 'rtl';
    }).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading language settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/settings" className="hover:text-blue-600">Settings</Link>
            <span>/</span>
            <span className="text-gray-900">Languages</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Language Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage which languages are available in your digital menu
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || saved}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            saved
              ? 'bg-green-600 text-white'
              : saving
                ? 'bg-blue-400 text-white cursor-wait'
                : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Languages</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-600">Enabled</p>
          <p className="text-2xl font-bold text-green-700">{stats.enabled}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-600">RTL Languages</p>
          <p className="text-2xl font-bold text-purple-700">{stats.rtl}</p>
        </div>
      </div>

      {/* Primary Language */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Primary Language</h3>
        <p className="text-sm text-gray-500">
          Used for backoffice, receipts, and as the default customer language
        </p>

        <div className="mt-4">
          <select
            value={settings.primary_language}
            onChange={(e) => setPrimaryLanguage(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {enabledLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {getFlag(lang.code)} {lang.name} ({lang.native_name})
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Note: Primary language must be enabled
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search languages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Enabled Languages */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Enabled Languages</h3>
            <p className="text-sm text-gray-500">
              Languages available in the customer-facing menu
            </p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            {enabledLanguages.length} active
          </span>
        </div>

        <div className="space-y-2">
          {enabledLanguages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No enabled languages match your search
            </p>
          ) : (
            enabledLanguages.map((lang) => (
              <div
                key={lang.code}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  lang.code === settings.primary_language
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{getFlag(lang.code)}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{lang.name}</p>
                      {lang.direction === 'rtl' && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                          RTL
                        </span>
                      )}
                      {lang.code === settings.primary_language && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {lang.native_name} ({lang.code})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleLanguage(lang.code)}
                  disabled={lang.code === settings.primary_language}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    lang.code === settings.primary_language
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {lang.code === settings.primary_language ? 'Required' : 'Disable'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Available Languages */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Available Languages</h3>
            <p className="text-sm text-gray-500">
              Click to enable a language for your menu
            </p>
          </div>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {availableLanguages.length} available
          </span>
        </div>

        {availableLanguages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {searchQuery
              ? 'No available languages match your search'
              : 'All languages are enabled!'}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableLanguages.slice(0, 20).map((lang) => (
              <button
                key={lang.code}
                onClick={() => toggleLanguage(lang.code)}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                <span className="text-xl">{getFlag(lang.code)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 truncate">{lang.name}</p>
                    {lang.direction === 'rtl' && (
                      <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs shrink-0">
                        RTL
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{lang.native_name}</p>
                </div>
                <span className="text-green-600 shrink-0">+ Add</span>
              </button>
            ))}
          </div>
        )}

        {availableLanguages.length > 20 && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Showing 20 of {availableLanguages.length} languages. Use search to find more.
          </p>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
        <h3 className="font-medium text-blue-900">Tips</h3>
        <ul className="mt-2 text-sm text-blue-800 space-y-1">
          <li>Enable languages based on your customer demographics</li>
          <li>RTL languages (Arabic, Hebrew) require translations that flow right-to-left</li>
          <li>Primary language is always enabled and cannot be disabled</li>
          <li>After enabling a language, add translations in the <Link href="/translations" className="underline hover:text-blue-600">Translations</Link> page</li>
        </ul>
      </div>

      {/* Bottom Save Button */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <Link
          href="/settings"
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Settings
        </Link>
        <button
          onClick={handleSave}
          disabled={saving || saved}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
            saved
              ? 'bg-green-600 text-white'
              : saving
                ? 'bg-blue-400 text-white cursor-wait'
                : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
