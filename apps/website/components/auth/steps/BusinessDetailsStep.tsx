'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BusinessDetails } from '../SignUpWizard';

interface BusinessDetailsStepProps {
  data: BusinessDetails;
  onUpdate: (data: Partial<BusinessDetails>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  plan: string;
}

const businessTypes = [
  { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { id: 'cafe', label: 'Cafe / Coffee Shop', icon: '☕' },
  { id: 'hotel', label: 'Hotel', icon: '🏨' },
  { id: 'bar', label: 'Bar / Pub', icon: '🍺' },
  { id: 'food_truck', label: 'Food Truck', icon: '🚚' },
  { id: 'airbnb', label: 'Airbnb / Rental', icon: '🏠' },
  { id: 'bakery', label: 'Bakery', icon: '🥐' },
  { id: 'catering', label: 'Catering', icon: '🍱' },
];

const currencies = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'KRW', symbol: '₩', name: 'Korean Won' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
];

type BusinessSection = 'credentials' | 'business' | 'settings';

export function BusinessDetailsStep({
  data,
  onUpdate,
  onBack,
  onSubmit,
  isLoading,
  plan,
}: BusinessDetailsStepProps) {
  const [activeSection, setActiveSection] = useState<BusinessSection>('credentials');

  const handleLanguageToggle = (langCode: string) => {
    const current = data.languages;
    if (langCode === 'en' && current.includes('en') && current.length === 1) {
      // English must always be selected
      return;
    }
    const updated = current.includes(langCode)
      ? current.filter((l) => l !== langCode)
      : [...current, langCode];
    onUpdate({ languages: updated });
  };

  const sections: { id: BusinessSection; label: string; icon: string }[] = [
    { id: 'credentials', label: 'Account', icon: '👤' },
    { id: 'business', label: 'Business', icon: '🏪' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const isLastSection = currentIndex === sections.length - 1;
  const isFirstSection = currentIndex === 0;

  const handleNext = () => {
    if (isLastSection) {
      onSubmit();
    } else {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (isFirstSection) {
      onBack();
    } else {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const isCredentialsValid = data.name && data.email && data.password && data.password.length >= 8;
  const isBusinessValid = data.businessName && data.businessType;

  const planLabels: Record<string, string> = {
    free: 'Free Plan',
    starter: 'Starter Plan',
    pro: 'Pro Plan',
    enterprise: 'Enterprise Plan',
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
      {/* Plan badge */}
      {plan !== 'free' && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 text-sm font-medium">
          {planLabels[plan] || plan} - 14-day free trial
        </div>
      )}

      {/* Section tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex-1 px-4 py-3 text-center text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span className="block text-lg mb-0.5">{section.icon}</span>
            <span className="hidden sm:block">{section.label}</span>
            <span className="sm:hidden">{index + 1}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Credentials Section */}
        {activeSection === 'credentials' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your name
              </label>
              <input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business email
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="you@business.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => onUpdate({ password: e.target.value })}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Min. 8 characters"
              />
            </div>

            {/* Social login */}
            <div className="relative pt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>
        )}

        {/* Business Section */}
        {activeSection === 'business' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business name
              </label>
              <input
                id="businessName"
                type="text"
                value={data.businessName}
                onChange={(e) => onUpdate({ businessName: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Your Restaurant Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {businessTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => onUpdate({ businessType: type.id })}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${
                      data.businessType === type.id
                        ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-xl">{type.icon}</span>
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="space-y-6">
            {/* Currency */}
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary currency
              </label>
              <select
                id="currency"
                value={data.currency}
                onChange={(e) => onUpdate({ currency: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Menu languages
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Select all languages you want your menu available in
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageToggle(lang.code)}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-all text-left ${
                      data.languages.includes(lang.code)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                    {lang.code === 'en' && (
                      <span className="ml-auto text-xs text-gray-400">(required)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Account Summary</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p><span className="font-medium">Business:</span> {data.businessName || 'Not set'}</p>
                <p><span className="font-medium">Type:</span> {businessTypes.find(t => t.id === data.businessType)?.label}</p>
                <p><span className="font-medium">Currency:</span> {data.currency}</p>
                <p><span className="font-medium">Languages:</span> {data.languages.length} selected</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handlePrev}
            className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={
              (activeSection === 'credentials' && !isCredentialsValid) ||
              (activeSection === 'business' && !isBusinessValid) ||
              isLoading
            }
            className="flex-1 py-3 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating...
              </span>
            ) : isLastSection ? (
              'Create Business Account'
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>

      {/* Sign In Link */}
      <div className="p-6 pt-0 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-medium text-gray-900 dark:text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
