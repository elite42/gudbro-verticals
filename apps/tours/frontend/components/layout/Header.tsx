'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/* ═══════════════════════════════════════════════════════════════════════════
   HEADER COMPONENT

   Sticky navigation with language/currency selectors.
   Mobile-optimized with compact design for QR-scanned visitors.
   ═══════════════════════════════════════════════════════════════════════════ */

interface HeaderProps {
  operatorName?: string
  operatorVerified?: boolean
  language: string
  currency: string
  onLanguageChange: (lang: string) => void
  onCurrencyChange: (curr: string) => void
  showBack?: boolean
  onBack?: () => void
}

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
]

const CURRENCIES = [
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'KRW', symbol: '₩', name: 'Korean Won' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
]

export function Header({
  operatorName,
  operatorVerified,
  language,
  currency,
  onLanguageChange,
  onCurrencyChange,
  showBack,
  onBack,
}: HeaderProps) {
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showCurrMenu, setShowCurrMenu] = useState(false)

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0]
  const currentCurr = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Back or Logo */}
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
              aria-label="Go back"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              {/* GUDBRO Tours Logo */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                GT
              </div>
              {operatorName && (
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-semibold text-foreground truncate max-w-[120px]">
                    {operatorName}
                  </span>
                  {operatorVerified && (
                    <svg
                      className="w-4 h-4 text-success flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </div>
              )}
            </Link>
          )}
        </div>

        {/* Right side - Language & Currency (compact pills) */}
        <div className="flex items-center gap-1">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu)
                setShowCurrMenu(false)
              }}
              className={cn(
                'flex items-center gap-1 px-2 py-1.5 rounded-full',
                'text-xs font-medium transition-all',
                showLangMenu
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-foreground'
              )}
              aria-expanded={showLangMenu}
              aria-haspopup="listbox"
            >
              <span className="text-sm">{currentLang.flag}</span>
            </button>

            {/* Dropdown */}
            {showLangMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowLangMenu(false)}
                />
                <div
                  className="absolute right-0 top-full mt-1 w-48 py-1 bg-white rounded-xl shadow-lg border border-border z-20 animate-scale-in origin-top-right"
                  role="listbox"
                >
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code)
                        setShowLangMenu(false)
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                        language === lang.code
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-gray-50'
                      )}
                      role="option"
                      aria-selected={language === lang.code}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                      {language === lang.code && (
                        <svg
                          className="w-4 h-4 ml-auto"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowCurrMenu(!showCurrMenu)
                setShowLangMenu(false)
              }}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1.5 rounded-full',
                'text-xs font-semibold transition-all',
                showCurrMenu
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-foreground'
              )}
              aria-expanded={showCurrMenu}
              aria-haspopup="listbox"
            >
              <span>{currentCurr.code}</span>
            </button>

            {/* Dropdown */}
            {showCurrMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowCurrMenu(false)}
                />
                <div
                  className="absolute right-0 top-full mt-1 w-56 py-1 bg-white rounded-xl shadow-lg border border-border z-20 animate-scale-in origin-top-right"
                  role="listbox"
                >
                  {CURRENCIES.map(curr => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        onCurrencyChange(curr.code)
                        setShowCurrMenu(false)
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                        currency === curr.code
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-gray-50'
                      )}
                      role="option"
                      aria-selected={currency === curr.code}
                    >
                      <span className="w-8 font-bold">{curr.symbol}</span>
                      <div>
                        <div className="font-medium">{curr.code}</div>
                        <div className="text-xs text-foreground-muted">{curr.name}</div>
                      </div>
                      {currency === curr.code && (
                        <svg
                          className="w-4 h-4 ml-auto"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
