'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/use-translation';
import { coffeeshopConfig } from '@/config/coffeeshop.config';

/**
 * WelcomeModal - Clean implementation from scratch
 *
 * Design principles:
 * - Parent controls ALL state (isOpen, auth state)
 * - This component is purely presentational
 * - No complex event handling or swipe gestures
 * - Clear separation of concerns
 */

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  venueName?: string;
  tableNumber?: string;
}

export function WelcomeModal({
  isOpen,
  onClose,
  onLoginClick,
  onSignupClick,
  venueName = coffeeshopConfig.name,
  tableNumber,
}: WelcomeModalProps) {
  const { t, language, setLanguage } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const languages = coffeeshopConfig.i18n.supportedLanguages;
  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="px-6 pb-8 pt-2 overflow-y-auto max-h-[calc(90vh-60px)]">
          {/* Welcome Header */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">☕</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {t.welcome?.title || `Welcome to ${venueName}`}
            </h1>
            {tableNumber && (
              <p className="text-gray-500 dark:text-gray-400">
                Table {tableNumber}
              </p>
            )}
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{currentLang?.flag}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{currentLang?.name}</span>
                </span>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLangMenu && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg z-10 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'en' | 'vi' | 'it');
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        language === lang.code ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{lang.name}</span>
                      {language === lang.code && (
                        <svg className="w-5 h-5 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Auth Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="text-2xl">✨</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t.auth?.joinTitle || 'Join for rewards'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.auth?.benefitsSubtitle || 'Earn points, get exclusive offers'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onLoginClick}
                className="flex-1 py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t.auth?.login || 'Login'}
              </button>
              <button
                onClick={onSignupClick}
                className="flex-1 py-2.5 px-4 bg-blue-600 rounded-xl font-medium text-white hover:bg-blue-700 transition-colors"
              >
                {t.auth?.signup || 'Sign Up'}
              </button>
            </div>
          </div>

          {/* Primary CTA */}
          <Link
            href="/menu"
            onClick={onClose}
            className="block w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            {t.auth?.goToMenu || 'View Menu'} →
          </Link>

          {/* Skip Link */}
          <button
            onClick={onClose}
            className="w-full mt-4 py-2 text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {t.welcome?.skip || 'Skip for now'}
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
