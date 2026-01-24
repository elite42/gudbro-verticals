'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Globe, MagnifyingGlass } from '@phosphor-icons/react';

// 15+ languages supported by GUDBRO
const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
];

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
  variant?: 'button' | 'inline' | 'modal';
  isOpen?: boolean;
  onClose?: () => void;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  variant = 'button',
  isOpen: externalIsOpen,
  onClose: externalOnClose,
}: LanguageSelectorProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isOpen = externalIsOpen ?? internalIsOpen;
  const onClose = externalOnClose ?? (() => setInternalIsOpen(false));

  const currentLang = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  // Filter languages based on search
  const filteredLanguages = searchQuery.trim()
    ? LANGUAGES.filter(
        (l) =>
          l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : LANGUAGES;

  // Auto-detect browser language on first load
  useEffect(() => {
    if (typeof window !== 'undefined' && !currentLanguage) {
      const browserLang = navigator.language.split('-')[0];
      const matchedLang = LANGUAGES.find((l) => l.code === browserLang);
      if (matchedLang) {
        onLanguageChange(matchedLang.code);
      }
    }
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = (code: string) => {
    onLanguageChange(code);
    onClose();
    setSearchQuery('');
  };

  // Inline variant - compact flag grid
  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.slice(0, 8).map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-all"
            style={{
              background:
                lang.code === currentLanguage
                  ? 'var(--interactive-primary)'
                  : 'var(--bg-secondary)',
              border:
                lang.code === currentLanguage
                  ? '2px solid var(--interactive-primary)'
                  : '1px solid var(--border-light)',
            }}
            title={lang.name}
          >
            {lang.flag}
          </button>
        ))}
        {LANGUAGES.length > 8 && (
          <button
            onClick={() => setInternalIsOpen(true)}
            className="flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-medium"
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-light)',
            }}
          >
            +{LANGUAGES.length - 8}
          </button>
        )}
      </div>
    );
  }

  // Button variant - shows current language, opens modal on click
  return (
    <>
      {variant === 'button' && (
        <button
          onClick={() => setInternalIsOpen(true)}
          className="flex items-center gap-2 rounded-full px-3 py-2 transition-colors"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
          }}
        >
          <span className="text-lg">{currentLang.flag}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {currentLang.code.toUpperCase()}
          </span>
          <Globe size={16} style={{ color: 'var(--text-tertiary)' }} />
        </button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-50"
              style={{ background: 'var(--surface-overlay)' }}
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-1/2 z-50 max-h-[80vh] -translate-y-1/2 overflow-hidden rounded-2xl md:inset-x-auto md:left-1/2 md:w-[400px] md:-translate-x-1/2"
              style={{ background: 'var(--surface-card)' }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between border-b p-4"
                style={{ borderColor: 'var(--border-light)' }}
              >
                <div className="flex items-center gap-2">
                  <Globe size={24} style={{ color: 'var(--interactive-primary)' }} />
                  <h2
                    className="font-display text-xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Select Language
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search */}
              <div className="px-4 py-3">
                <div
                  className="flex items-center gap-2 rounded-xl px-4 py-3"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-medium)',
                  }}
                >
                  <MagnifyingGlass size={18} style={{ color: 'var(--text-tertiary)' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search languages..."
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    style={{ color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              {/* Language grid */}
              <div className="scrollbar-styled max-h-[50vh] overflow-y-auto px-4 pb-4">
                {filteredLanguages.length === 0 ? (
                  <p className="py-8 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    No languages found
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {filteredLanguages.map((lang) => {
                      const isSelected = lang.code === currentLanguage;

                      return (
                        <motion.button
                          key={lang.code}
                          onClick={() => handleSelect(lang.code)}
                          className="flex items-center gap-3 rounded-xl p-3 text-left transition-all"
                          style={{
                            background: isSelected
                              ? 'var(--interactive-primary)'
                              : 'var(--bg-secondary)',
                            border: isSelected
                              ? '2px solid var(--interactive-primary)'
                              : '1px solid var(--border-light)',
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-2xl">{lang.flag}</span>
                          <div className="min-w-0 flex-1">
                            <p
                              className="truncate text-sm font-medium"
                              style={{
                                color: isSelected ? 'var(--text-inverse)' : 'var(--text-primary)',
                              }}
                            >
                              {lang.nativeName}
                            </p>
                            <p
                              className="truncate text-xs"
                              style={{
                                color: isSelected
                                  ? 'rgba(255,255,255,0.7)'
                                  : 'var(--text-tertiary)',
                              }}
                            >
                              {lang.name}
                            </p>
                          </div>
                          {isSelected && (
                            <Check
                              size={18}
                              weight="bold"
                              style={{ color: 'var(--text-inverse)' }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t p-4" style={{ borderColor: 'var(--border-light)' }}>
                <p className="text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  GUDBRO supports {LANGUAGES.length}+ languages
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
