'use client';

import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlass, X, Check, Translate } from '@phosphor-icons/react';
import { Language } from '@/lib/supabase';

interface LanguageMultiSelectProps {
  value: string[];
  onChange: (languageCodes: string[]) => void;
  primaryLanguage?: string;
  maxSelections?: number;
  placeholder?: string;
  disabled?: boolean;
}

export function LanguageMultiSelect({
  value = [],
  onChange,
  primaryLanguage,
  maxSelections = 10,
  placeholder = 'Select languages...',
  disabled = false,
}: LanguageMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch languages
  const fetchLanguages = useCallback(async (searchTerm?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);

      const res = await fetch(`/api/languages?${params.toString()}`);
      const data = await res.json();
      setLanguages(data.languages || []);
    } catch (error) {
      console.error('Failed to fetch languages:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        fetchLanguages(search);
      } else {
        fetchLanguages();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchLanguages]);

  const toggleLanguage = (code: string) => {
    if (value.includes(code)) {
      // Don't allow removing primary language
      if (code === primaryLanguage) return;
      onChange(value.filter((v) => v !== code));
    } else {
      if (value.length >= maxSelections) return;
      onChange([...value, code]);
    }
  };

  const removeLanguage = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (code === primaryLanguage) return;
    onChange(value.filter((v) => v !== code));
  };

  const selectedLanguages = languages.filter((l) => value.includes(l.code));
  const availableLanguages = languages.filter((l) => !value.includes(l.code));

  // Separate RTL and LTR
  const rtlLanguages = availableLanguages.filter((l) => l.direction === 'rtl');
  const ltrLanguages = availableLanguages.filter((l) => l.direction === 'ltr');

  return (
    <div className="relative">
      {/* Trigger / Selected Tags */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex min-h-[42px] flex-wrap gap-1 rounded-md border bg-white p-2 ${disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer hover:border-gray-400'} ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'} `}
      >
        {selectedLanguages.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Translate className="h-4 w-4" />
            <span>{placeholder}</span>
          </div>
        ) : (
          selectedLanguages.map((lang) => (
            <span
              key={lang.code}
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm ${
                lang.code === primaryLanguage
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700'
              } `}
            >
              {lang.direction === 'rtl' && <span className="text-xs">RTL</span>}
              {lang.name_en}
              <span className="text-xs text-gray-400">({lang.code})</span>
              {lang.code === primaryLanguage ? (
                <span className="text-xs text-blue-600">Primary</span>
              ) : (
                <button
                  onClick={(e) => removeLanguage(lang.code, e)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-80 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          {/* Search */}
          <div className="border-b p-2">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search languages..."
                className="w-full rounded-md border py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {value.length} / {maxSelections} selected
            </div>
          </div>

          {/* List */}
          <div className="max-h-56 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : (
              <>
                {/* RTL Languages Section */}
                {rtlLanguages.length > 0 && (
                  <>
                    <div className="sticky top-0 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                      RTL Languages ({rtlLanguages.length})
                    </div>
                    {rtlLanguages.map((lang) => (
                      <LanguageOption
                        key={lang.code}
                        language={lang}
                        isSelected={value.includes(lang.code)}
                        isPrimary={lang.code === primaryLanguage}
                        disabled={value.length >= maxSelections && !value.includes(lang.code)}
                        onClick={() => toggleLanguage(lang.code)}
                      />
                    ))}
                  </>
                )}

                {/* LTR Languages Section */}
                <div className="sticky top-0 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500">
                  Languages ({ltrLanguages.length})
                </div>
                {ltrLanguages.map((lang) => (
                  <LanguageOption
                    key={lang.code}
                    language={lang}
                    isSelected={value.includes(lang.code)}
                    isPrimary={lang.code === primaryLanguage}
                    disabled={value.length >= maxSelections && !value.includes(lang.code)}
                    onClick={() => toggleLanguage(lang.code)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LanguageOption({
  language,
  isSelected,
  isPrimary,
  disabled,
  onClick,
}: {
  language: Language;
  isSelected: boolean;
  isPrimary: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isPrimary}
      className={`flex w-full items-center gap-2 px-3 py-2 text-left ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${isPrimary ? 'cursor-not-allowed' : ''} `}
    >
      <div
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'} `}
      >
        {isSelected && <Check className="h-3 w-3 text-white" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate">{language.name_en}</span>
          <span className="text-sm text-gray-400">{language.name_native}</span>
          {language.direction === 'rtl' && (
            <span className="rounded bg-orange-100 px-1 py-0.5 text-xs text-orange-700">RTL</span>
          )}
        </div>
        <div className="text-xs text-gray-400">{language.code}</div>
      </div>
      {isPrimary && <span className="text-xs text-blue-600">Primary</span>}
    </button>
  );
}
