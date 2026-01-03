'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  startOnboarding,
  getOnboardingSession,
  updateOnboardingStep,
  completeOnboarding,
  SUBSCRIPTION_PLANS,
  BUSINESS_TYPES,
  COUNTRIES,
} from '@/lib/onboarding-service';

type Step = 1 | 2 | 3 | 4 | 5;

export default function GetStartedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('fnb');
  const [countryCode, setCountryCode] = useState('IT');
  const [city, setCity] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [brandName, setBrandName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');

  // Check for existing session on mount
  useEffect(() => {
    async function checkSession() {
      const existingSession = await getOnboardingSession();
      if (existingSession && !existingSession.isCompleted) {
        setCurrentStep(existingSession.currentStep as Step);
        // Restore form data
        setEmail(existingSession.email || '');
        setFirstName(existingSession.firstName || '');
        setLastName(existingSession.lastName || '');
        setPhone(existingSession.phone || '');
        setBusinessName(existingSession.businessName || '');
        setBusinessType(existingSession.businessType || 'fnb');
        setCountryCode(existingSession.countryCode || 'IT');
        setCity(existingSession.city || '');
        setSelectedPlan(existingSession.selectedPlan || 'starter');
        setBillingCycle(existingSession.billingCycle || 'monthly');
        setBrandName(existingSession.brandName || '');
        setPrimaryColor(existingSession.primaryColor || '#000000');
        setLocationName(existingSession.locationName || '');
        setLocationAddress(existingSession.locationAddress || '');
      }
      setIsLoading(false);
    }
    checkSession();
  }, []);

  // Get UTM params
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  const utmCampaign = searchParams.get('utm_campaign');
  const referralCode = searchParams.get('ref');

  const handleStartOnboarding = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await startOnboarding(email, {
      firstName,
      lastName,
      referralCode: referralCode || undefined,
      utmSource: utmSource || undefined,
      utmMedium: utmMedium || undefined,
      utmCampaign: utmCampaign || undefined,
    });

    if (result) {
      // Update step 1 data
      await updateOnboardingStep(1, { first_name: firstName, last_name: lastName, phone });
      setCurrentStep(2);
    } else {
      setError('Failed to start onboarding. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleNextStep = async () => {
    setIsSubmitting(true);
    setError(null);

    let success = false;

    switch (currentStep) {
      case 2:
        success = await updateOnboardingStep(2, {
          business_name: businessName,
          business_type: businessType,
          country_code: countryCode,
          city,
        });
        break;
      case 3:
        success = await updateOnboardingStep(3, {
          selected_plan: selectedPlan,
          billing_cycle: billingCycle,
        });
        break;
      case 4:
        success = await updateOnboardingStep(4, {
          brand_name: brandName || businessName,
          primary_color: primaryColor,
        });
        break;
      case 5:
        success = await updateOnboardingStep(5, {
          location_name: locationName || businessName,
          location_address: locationAddress,
          location_currency: COUNTRIES.find((c) => c.code === countryCode)?.currency || 'EUR',
        });
        break;
    }

    if (success) {
      if (currentStep < 5) {
        setCurrentStep((currentStep + 1) as Step);
      }
    } else {
      setError('Failed to save. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    setError(null);

    // First save step 5 data
    await updateOnboardingStep(5, {
      location_name: locationName || businessName,
      location_address: locationAddress,
      location_currency: COUNTRIES.find((c) => c.code === countryCode)?.currency || 'EUR',
    });

    const result = await completeOnboarding();

    if (result.success) {
      // Redirect to backoffice
      router.push('/welcome?onboarding=complete');
    } else {
      setError(result.errorMessage || 'Failed to complete setup.');
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📱</span>
            <span className="text-xl font-bold text-gray-900">GUDBRO</span>
          </div>
          <div className="text-sm text-gray-500">Step {currentStep} of 5</div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex-1 py-3">
                <div
                  className={`mx-1 h-1 rounded-full transition-colors ${
                    step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-2xl px-4 py-12">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Step 1: Account Info */}
        {currentStep === 1 && (
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Let's get started</h1>
            <p className="mb-8 text-gray-600">Create your GUDBRO account in minutes</p>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@restaurant.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleStartOnboarding}
                disabled={isSubmitting || !email}
                className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Starting...' : 'Continue'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Business Info */}
        {currentStep === 2 && (
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Tell us about your business</h1>
            <p className="mb-8 text-gray-600">We'll customize your experience</p>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="My Restaurant"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Business Type *
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {BUSINESS_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setBusinessType(type.id)}
                      className={`rounded-xl border-2 p-4 text-left transition-all ${
                        businessType === type.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{type.icon}</span>
                      <p className="mt-1 text-sm font-medium text-gray-900">{type.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Country *</label>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Milan"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 rounded-xl bg-gray-100 py-4 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={isSubmitting || !businessName}
                  className="flex-1 rounded-xl bg-blue-600 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Plan Selection */}
        {currentStep === 3 && (
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Choose your plan</h1>
            <p className="mb-8 text-gray-600">All plans include a 14-day free trial</p>

            {/* Billing Toggle */}
            <div className="mb-8 flex items-center justify-center gap-4">
              <span className={billingCycle === 'monthly' ? 'font-semibold' : 'text-gray-500'}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative h-7 w-14 rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={billingCycle === 'yearly' ? 'font-semibold' : 'text-gray-500'}>
                Yearly <span className="text-sm text-green-600">(Save 20%)</span>
              </span>
            </div>

            <div className="space-y-4">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full rounded-xl border-2 p-6 text-left transition-all ${
                    selectedPlan === plan.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                        {plan.popular && (
                          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                            Popular
                          </span>
                        )}
                      </div>
                      <ul className="mt-3 space-y-1">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <svg
                              className="h-4 w-4 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900">
                        €
                        {billingCycle === 'yearly' ? Math.round(plan.priceYearly / 12) : plan.price}
                      </p>
                      <p className="text-sm text-gray-500">/month</p>
                      {billingCycle === 'yearly' && plan.price > 0 && (
                        <p className="mt-1 text-xs text-green-600">€{plan.priceYearly}/year</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex-1 rounded-xl bg-gray-100 py-4 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-blue-600 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Continue'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Brand Setup */}
        {currentStep === 4 && (
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Customize your brand</h1>
            <p className="mb-8 text-gray-600">Make it yours</p>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder={businessName || 'My Brand'}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">Leave empty to use your business name</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Brand Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-16 w-16 cursor-pointer rounded-xl border-2 border-gray-200"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 uppercase focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="mt-8 rounded-xl border border-gray-200 p-6">
                <p className="mb-4 text-sm text-gray-500">Preview</p>
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {(brandName || businessName || 'B').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {brandName || businessName || 'Your Brand'}
                    </p>
                    <p className="text-sm text-gray-500">Digital Menu by GUDBRO</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 rounded-xl bg-gray-100 py-4 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-blue-600 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: First Location */}
        {currentStep === 5 && (
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Add your first location</h1>
            <p className="mb-8 text-gray-600">You can add more locations later</p>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location Name
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder={businessName || 'Main Location'}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={locationAddress}
                  onChange={(e) => setLocationAddress(e.target.value)}
                  placeholder="123 Restaurant Street, Milan"
                  rows={2}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Summary */}
              <div className="mt-8 rounded-xl bg-gray-50 p-6">
                <p className="mb-4 text-sm font-medium text-gray-700">Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium text-gray-900">
                      {SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business</span>
                    <span className="font-medium text-gray-900">{businessName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900">
                      {city}, {COUNTRIES.find((c) => c.code === countryCode)?.name}
                    </span>
                  </div>
                  <div className="mt-2 border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trial ends</span>
                      <span className="font-medium text-green-600">14 days from now</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="flex-1 rounded-xl bg-gray-100 py-4 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating your account...' : 'Complete Setup'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-gray-500">Trusted by 1,000+ restaurants worldwide</p>
          <div className="flex items-center justify-center gap-6 text-gray-400">
            <span className="text-2xl">🔒</span>
            <span className="text-sm">SSL Secured</span>
            <span className="text-2xl">💳</span>
            <span className="text-sm">No credit card required</span>
          </div>
        </div>
      </main>
    </div>
  );
}
