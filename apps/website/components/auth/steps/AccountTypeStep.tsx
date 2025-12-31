'use client';

import Link from 'next/link';
import type { AccountType } from '../SignUpWizard';

interface AccountTypeStepProps {
  selectedType: AccountType;
  onSelect: (type: AccountType) => void;
}

const accountTypes = [
  {
    id: 'personal' as const,
    icon: '👤',
    title: 'Personal Account',
    description: 'For food lovers who want to save preferences and discover new places',
    features: [
      'Save your dietary preferences',
      'Sync allergens across restaurants',
      'Build your food wishlist',
      'Earn loyalty points',
    ],
    badge: 'Free Forever',
    badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  },
  {
    id: 'business' as const,
    icon: '🏪',
    title: 'Business Account',
    description: 'For restaurants, hotels, and hospitality businesses',
    features: [
      'Digital menus with QR codes',
      'Multi-language support',
      'Allergen compliance',
      'Analytics dashboard',
    ],
    badge: 'Free Trial',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  },
];

export function AccountTypeStep({ selectedType, onSelect }: AccountTypeStepProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          How will you use GUDBRO?
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Choose your account type to get started
        </p>
      </div>

      <div className="space-y-4">
        {accountTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
              selectedType === type.id
                ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                {type.icon}
              </div>

              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {type.title}
                  </h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${type.badgeColor}`}>
                    {type.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {type.description}
                </p>

                {/* Features */}
                <ul className="mt-3 space-y-1">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow indicator */}
              <div className="flex-shrink-0 self-center">
                <svg
                  className={`w-5 h-5 transition-transform ${
                    selectedType === type.id ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Sign In Link */}
      <div className="pt-4 text-center">
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
