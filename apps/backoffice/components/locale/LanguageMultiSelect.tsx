'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X, Check, Languages } from 'lucide-react';
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
  disabled = false
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
      onChange(value.filter(v => v !== code));
    } else {
      if (value.length >= maxSelections) return;
      onChange([...value, code]);
    }
  };

  const removeLanguage = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (code === primaryLanguage) return;
    onChange(value.filter(v => v !== code));
  };

  const selectedLanguages = languages.filter(l => value.includes(l.code));
  const availableLanguages = languages.filter(l => !value.includes(l.code));

  // Separate RTL and LTR
  const rtlLanguages = availableLanguages.filter(l => l.direction === 'rtl');
  const ltrLanguages = availableLanguages.filter(l => l.direction === 'ltr');

  return (
    <div className="relative">
      {/* Trigger / Selected Tags */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          min-h-[42px] flex flex-wrap gap-1 p-2 border rounded-md bg-white
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400 cursor-pointer'}
          ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}
        `}
      >
        {selectedLanguages.length === 0 ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Languages className="w-4 h-4" />
            <span>{placeholder}</span>
          </div>
        ) : (
          selectedLanguages.map(lang => (
            <span
              key={lang.code}
              className={`
                inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-sm
                ${lang.code === primaryLanguage
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700'
                }
              `}
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
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search languages..."
                className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {value.length} / {maxSelections} selected
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto max-h-56">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : (
              <>
                {/* RTL Languages Section */}
                {rtlLanguages.length > 0 && (
                  <>
                    <div className="px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-50 sticky top-0">
                      RTL Languages ({rtlLanguages.length})
                    </div>
                    {rtlLanguages.map(lang => (
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
                <div className="px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0">
                  Languages ({ltrLanguages.length})
                </div>
                {ltrLanguages.map(lang => (
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
  onClick
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
      className={`
        w-full flex items-center gap-2 px-3 py-2 text-left
        ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isPrimary ? 'cursor-not-allowed' : ''}
      `}
    >
      <div className={`
        w-5 h-5 rounded border flex items-center justify-center flex-shrink-0
        ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}
      `}>
        {isSelected && <Check className="w-3 h-3 text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate">{language.name_en}</span>
          <span className="text-gray-400 text-sm">{language.name_native}</span>
          {language.direction === 'rtl' && (
            <span className="px-1 py-0.5 text-xs bg-orange-100 text-orange-700 rounded">RTL</span>
          )}
        </div>
        <div className="text-xs text-gray-400">
          {language.code}
        </div>
      </div>
      {isPrimary && (
        <span className="text-xs text-blue-600">Primary</span>
      )}
    </button>
  );
}
