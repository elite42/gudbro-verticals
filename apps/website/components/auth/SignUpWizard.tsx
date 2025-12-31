'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AccountTypeStep } from './steps/AccountTypeStep';
import { PersonalProfileStep } from './steps/PersonalProfileStep';
import { BusinessDetailsStep } from './steps/BusinessDetailsStep';

export type AccountType = 'personal' | 'business' | null;

export interface PersonalProfile {
  name: string;
  email: string;
  password: string;
  // 5 Dimensions - Health Profile
  allergens: string[];
  dietaryPreferences: string[];
  intolerances: string[];
  healthConditions: string[];
  tastePreferences: string[];
}

export interface BusinessDetails {
  name: string;
  email: string;
  password: string;
  businessName: string;
  businessType: string;
  currency: string;
  languages: string[];
}

export type WizardData = {
  accountType: AccountType;
  personal: PersonalProfile;
  business: BusinessDetails;
};

const initialPersonalProfile: PersonalProfile = {
  name: '',
  email: '',
  password: '',
  allergens: [],
  dietaryPreferences: [],
  intolerances: [],
  healthConditions: [],
  tastePreferences: [],
};

const initialBusinessDetails: BusinessDetails = {
  name: '',
  email: '',
  password: '',
  businessName: '',
  businessType: 'restaurant',
  currency: 'EUR',
  languages: ['en'],
};

interface SignUpWizardProps {
  initialPlan?: string;
}

export function SignUpWizard({ initialPlan = 'free' }: SignUpWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<WizardData>({
    accountType: null,
    personal: initialPersonalProfile,
    business: initialBusinessDetails,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAccountTypeSelect = (type: AccountType) => {
    setData({ ...data, accountType: type });
    setCurrentStep(1);
  };

  const handlePersonalProfileUpdate = (profile: Partial<PersonalProfile>) => {
    setData({
      ...data,
      personal: { ...data.personal, ...profile },
    });
  };

  const handleBusinessDetailsUpdate = (details: Partial<BusinessDetails>) => {
    setData({
      ...data,
      business: { ...data.business, ...details },
    });
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      // TODO: Integrate with Supabase Auth
      // For now, redirect based on account type
      setTimeout(() => {
        if (data.accountType === 'business') {
          window.location.href = 'https://gudbro-backoffice.vercel.app/login';
        } else {
          // Personal accounts go to PWA or confirmation page
          window.location.href = '/welcome';
        }
      }, 500);
    } catch {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Determine steps based on account type
  const getStepIndicator = () => {
    if (data.accountType === null) {
      return { current: 1, total: 3, label: 'Account Type' };
    }
    if (data.accountType === 'personal') {
      return { current: currentStep + 1, total: 2, label: currentStep === 0 ? 'Account Type' : 'Your Profile' };
    }
    return { current: currentStep + 1, total: 2, label: currentStep === 0 ? 'Account Type' : 'Business Details' };
  };

  const stepInfo = getStepIndicator();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to home</span>
        </Link>

        {/* Step indicator */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Step {stepInfo.current} of {stepInfo.total}
        </div>
      </header>

      {/* Progress bar */}
      <div className="px-4 pb-4">
        <div className="max-w-md mx-auto">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 dark:bg-white transition-all duration-300"
              style={{ width: `${(stepInfo.current / stepInfo.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-4xl">📱</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">GUDBRO</span>
            </Link>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{stepInfo.label}</p>
            {initialPlan !== 'free' && currentStep === 0 && (
              <span className="inline-block mt-2 px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-full">
                {initialPlan.charAt(0).toUpperCase() + initialPlan.slice(1)} Plan
              </span>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Steps */}
          {currentStep === 0 && (
            <AccountTypeStep
              selectedType={data.accountType}
              onSelect={handleAccountTypeSelect}
            />
          )}

          {currentStep === 1 && data.accountType === 'personal' && (
            <PersonalProfileStep
              data={data.personal}
              onUpdate={handlePersonalProfileUpdate}
              onBack={handleBack}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}

          {currentStep === 1 && data.accountType === 'business' && (
            <BusinessDetailsStep
              data={data.business}
              onUpdate={handleBusinessDetailsUpdate}
              onBack={handleBack}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              plan={initialPlan}
            />
          )}

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">Privacy Policy</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
