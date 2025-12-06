'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CountrySelector, LanguageMultiSelect } from '@/components/locale';
import { Country, BusinessType } from '@/lib/supabase';

type AccountType = 'standard' | 'enterprise';

interface OnboardingData {
  // Account type
  accountType: AccountType | null;

  // Organization
  organizationName: string;
  countryCode: string;
  countryName: string;

  // Brand
  businessType: BusinessType | null;
  brandName: string;
  brandDescription: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;

  // Location
  locationName: string;
  address: string;
  city: string;
  postalCode: string;
  currencyCode: string;
  currencySymbol: string;
  primaryLanguage: string;
  enabledLanguages: string[];
  timezone: string;
  phone: string;
  email: string;
}

const accountTypes = [
  {
    id: 'standard' as AccountType,
    icon: '🏪',
    title: 'Standard',
    description: 'Perfect for single or multi-location businesses. Start free, upgrade anytime.',
    features: ['Free tier available', 'Up to 10 locations', 'Self-service setup'],
  },
  {
    id: 'enterprise' as AccountType,
    icon: '🏢',
    title: 'Enterprise',
    description: 'For large chains operating across multiple countries. Contact our sales team.',
    features: ['Unlimited locations', 'Multi-country operations', 'Dedicated support'],
  },
];

const businessTypes = [
  {
    id: 'fnb' as BusinessType,
    icon: '🍽️',
    title: 'Restaurant / Cafe',
    description: 'Digital menu, ordering, and customer engagement',
  },
  {
    id: 'hotel' as BusinessType,
    icon: '🏨',
    title: 'Hotel',
    description: 'Room info, services, minibar, and local tips',
  },
  {
    id: 'rental' as BusinessType,
    icon: '🏠',
    title: 'Rental Property',
    description: 'Property info, check-in, house rules, and recommendations',
  },
  {
    id: 'wellness' as BusinessType,
    icon: '💆',
    title: 'Wellness / Spa',
    description: 'Services, booking, and treatment information',
  },
  {
    id: 'other' as BusinessType,
    icon: '🏢',
    title: 'Other',
    description: 'Custom setup for your business',
  },
];

const steps = [
  { id: 1, name: 'Account Type' },
  { id: 2, name: 'Organization' },
  { id: 3, name: 'Brand' },
  { id: 4, name: 'Location' },
  { id: 5, name: 'Review' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    accountType: null,
    organizationName: '',
    countryCode: '',
    countryName: '',
    businessType: null,
    brandName: '',
    brandDescription: '',
    logoUrl: null,
    primaryColor: '#000000',
    secondaryColor: '',
    locationName: '',
    address: '',
    city: '',
    postalCode: '',
    currencyCode: '',
    currencySymbol: '',
    primaryLanguage: '',
    enabledLanguages: [],
    timezone: '',
    phone: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCountryChange = (country: Country | null) => {
    if (country) {
      setData(prev => ({
        ...prev,
        countryCode: country.code,
        countryName: country.name_en,
        currencyCode: country.currency_code,
        currencySymbol: country.currency_symbol,
        primaryLanguage: country.primary_language,
        timezone: country.timezone || '',
        enabledLanguages: prev.enabledLanguages.length === 0
          ? [country.primary_language]
          : prev.enabledLanguages.includes(country.primary_language)
            ? prev.enabledLanguages
            : [country.primary_language, ...prev.enabledLanguages],
      }));
    } else {
      setData(prev => ({
        ...prev,
        countryCode: '',
        countryName: '',
        currencyCode: '',
        currencySymbol: '',
        primaryLanguage: '',
        timezone: '',
        enabledLanguages: [],
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Create Organization
      const orgRes = await fetch('/api/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.organizationName,
          type: data.accountType,
          subscriptionPlan: 'free',
        }),
      });

      const orgResult = await orgRes.json();
      if (!orgRes.ok) {
        throw new Error(orgResult.error || 'Failed to create organization');
      }

      const organizationId = orgResult.organization.id;

      // 2. Create Brand
      const brandRes = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId,
          name: data.brandName,
          description: data.brandDescription,
          businessType: data.businessType,
          logoUrl: data.logoUrl,
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor || null,
        }),
      });

      const brandResult = await brandRes.json();
      if (!brandRes.ok) {
        throw new Error(brandResult.error || 'Failed to create brand');
      }

      const brandId = brandResult.brand.id;

      // 3. Create Location
      const locationRes = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandId,
          name: data.locationName || data.brandName,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          countryCode: data.countryCode,
          currencyCode: data.currencyCode,
          primaryLanguage: data.primaryLanguage,
          enabledLanguages: data.enabledLanguages,
          timezone: data.timezone,
          phone: data.phone,
          email: data.email,
        }),
      });

      const locationResult = await locationRes.json();
      if (!locationRes.ok) {
        throw new Error(locationResult.error || 'Failed to create location');
      }

      // Success - redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // For enterprise, redirect to contact form
  if (data.accountType === 'enterprise' && currentStep === 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              <span className="text-xl font-bold text-gray-900">GUDBRO</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-lg text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <span className="text-4xl">🏢</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Enterprise Inquiry</h1>
            <p className="mt-4 text-gray-600">
              For enterprise clients with multi-country operations, our team will work with you
              to create a custom solution that fits your needs.
            </p>

            <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Contact our sales team:</h3>
              <div className="space-y-3 text-gray-600">
                <p>📧 enterprise@gudbro.com</p>
                <p>📞 +1 (555) 123-4567</p>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Or fill out the form below and we'll contact you within 24 hours.
              </p>
            </div>

            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={() => {
                  setData(prev => ({ ...prev, accountType: null }));
                  setCurrentStep(1);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Go Back
              </button>
              <button
                onClick={() => router.push('/enterprise-contact')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.accountType !== null;
      case 2:
        return data.organizationName.trim() !== '' && data.countryCode !== '';
      case 3:
        return data.businessType !== null && data.brandName.trim() !== '';
      case 4:
        return data.primaryLanguage !== '';
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📱</span>
            <span className="text-xl font-bold text-gray-900">GUDBRO</span>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Skip for now
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : step.id === currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id < currentStep ? '✓' : step.id}
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:block ${
                    step.id === currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-12 h-0.5 mx-2 sm:mx-4 ${
                      step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Account Type */}
          {currentStep === 1 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Choose your account type</h1>
              <p className="mt-2 text-gray-600">
                Select the option that best fits your business needs.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {accountTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setData({ ...data, accountType: type.id })}
                    className={`p-6 text-left rounded-xl border-2 transition-all ${
                      data.accountType === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-4xl">{type.icon}</span>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{type.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                    <ul className="mt-4 space-y-1">
                      {type.features.map((feature, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Organization Info */}
          {currentStep === 2 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create your organization</h1>
              <p className="mt-2 text-gray-600">
                An organization groups all your brands and locations together.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organization Name *</label>
                  <input
                    type="text"
                    value={data.organizationName}
                    onChange={(e) => setData({ ...data, organizationName: e.target.value })}
                    placeholder="e.g., ROOTS Hospitality Group"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This is your company or holding name. Customers won't see this.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Primary Country *</label>
                  <div className="mt-1">
                    <CountrySelector
                      value={data.countryCode}
                      onChange={handleCountryChange}
                      placeholder="Select your country..."
                    />
                  </div>
                  {data.countryCode && (
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span>Currency: <strong>{data.currencySymbol} {data.currencyCode}</strong></span>
                      <span>Language: <strong>{data.primaryLanguage.toUpperCase()}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Brand Info */}
          {currentStep === 3 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create your first brand</h1>
              <p className="mt-2 text-gray-600">
                A brand is the customer-facing identity. You can add more brands later.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Business Type *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {businessTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setData({ ...data, businessType: type.id })}
                        className={`p-4 text-left rounded-lg border transition-all ${
                          data.businessType === type.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <p className="mt-2 text-sm font-medium text-gray-900">{type.title}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand Name *</label>
                  <input
                    type="text"
                    value={data.brandName}
                    onChange={(e) => setData({ ...data, brandName: e.target.value })}
                    placeholder="e.g., ROOTS Cafe"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This is what customers will see.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={data.brandDescription}
                    onChange={(e) => setData({ ...data, brandDescription: e.target.value })}
                    placeholder="A short description of your brand..."
                    rows={3}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                    <div className="mt-2 flex items-center gap-4">
                      <input
                        type="color"
                        value={data.primaryColor}
                        onChange={(e) => setData({ ...data, primaryColor: e.target.value })}
                        className="h-10 w-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={data.primaryColor}
                        onChange={(e) => setData({ ...data, primaryColor: e.target.value })}
                        className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
                    <div className="mt-2 flex items-center gap-4">
                      <input
                        type="color"
                        value={data.secondaryColor || '#ffffff'}
                        onChange={(e) => setData({ ...data, secondaryColor: e.target.value })}
                        className="h-10 w-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={data.secondaryColor}
                        onChange={(e) => setData({ ...data, secondaryColor: e.target.value })}
                        placeholder="Optional"
                        className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Location Info */}
          {currentStep === 4 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Set up your first location</h1>
              <p className="mt-2 text-gray-600">
                Add the details for your first physical location.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location Name</label>
                  <input
                    type="text"
                    value={data.locationName}
                    onChange={(e) => setData({ ...data, locationName: e.target.value })}
                    placeholder={data.brandName || 'e.g., Downtown Branch'}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Leave empty to use your brand name.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={data.city}
                      onChange={(e) => setData({ ...data, city: e.target.value })}
                      placeholder="e.g., Da Nang"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      value={data.postalCode}
                      onChange={(e) => setData({ ...data, postalCode: e.target.value })}
                      placeholder="e.g., 550000"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    placeholder="Street address"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      placeholder="+84..."
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="contact@yourbusiness.com"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Languages</label>
                  <p className="text-sm text-gray-500 mb-2">
                    Languages your customers speak. Primary language ({data.primaryLanguage.toUpperCase() || 'not set'}) cannot be removed.
                  </p>
                  <LanguageMultiSelect
                    value={data.enabledLanguages}
                    onChange={(languages) => setData({ ...data, enabledLanguages: languages })}
                    primaryLanguage={data.primaryLanguage}
                    maxSelections={10}
                    placeholder="Add customer languages..."
                    disabled={!data.primaryLanguage}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Review your setup</h1>
                <p className="mt-2 text-gray-600">
                  Make sure everything looks correct before we create your account.
                </p>
              </div>

              <div className="space-y-6">
                {/* Organization */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Organization</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{data.organizationName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium text-gray-900">{data.countryName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Account Type</p>
                      <p className="font-medium text-gray-900 capitalize">{data.accountType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Plan</p>
                      <p className="font-medium text-gray-900">Free</p>
                    </div>
                  </div>
                </div>

                {/* Brand */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Brand</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Brand Name</p>
                      <p className="font-medium text-gray-900">{data.brandName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Business Type</p>
                      <p className="font-medium text-gray-900 capitalize">{data.businessType}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Colors</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-6 h-6 rounded border border-gray-300"
                          style={{ backgroundColor: data.primaryColor }}
                        />
                        <span className="text-sm text-gray-600">{data.primaryColor}</span>
                        {data.secondaryColor && (
                          <>
                            <div
                              className="w-6 h-6 rounded border border-gray-300 ml-2"
                              style={{ backgroundColor: data.secondaryColor }}
                            />
                            <span className="text-sm text-gray-600">{data.secondaryColor}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Location</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Location Name</p>
                      <p className="font-medium text-gray-900">{data.locationName || data.brandName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      <p className="font-medium text-gray-900">{data.city || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Currency</p>
                      <p className="font-medium text-gray-900">{data.currencySymbol} {data.currencyCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Languages</p>
                      <p className="font-medium text-gray-900">
                        {data.enabledLanguages.map(l => l.toUpperCase()).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {currentStep === 5 ? (isSubmitting ? 'Creating...' : 'Create Account') : 'Continue'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
