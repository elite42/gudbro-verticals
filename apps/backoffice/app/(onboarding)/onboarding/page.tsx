'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CountrySelector, LanguageMultiSelect } from '@/components/locale';
import { Country, BusinessType } from '@/lib/supabase';

type AccountType = 'standard' | 'enterprise';
type ServiceStyle = 'dine_in' | 'counter' | 'delivery_only' | 'takeaway' | 'mixed' | 'qr_ordering';

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

  // Service Model
  serviceStyle: ServiceStyle;

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

const serviceStyles = [
  {
    id: 'dine_in' as ServiceStyle,
    icon: '🍽️',
    title: 'Table Service',
    description: 'Waiter takes orders, payment at end',
    qrUse: 'Menu consultation',
  },
  {
    id: 'counter' as ServiceStyle,
    icon: '🔔',
    title: 'Counter + Delivery',
    description: 'Order at counter, delivered to table',
    qrUse: 'Pre-decision, faster ordering',
  },
  {
    id: 'takeaway' as ServiceStyle,
    icon: '📦',
    title: 'Counter + Pickup',
    description: 'Order at counter, pickup when ready',
    qrUse: 'Pre-decision, faster ordering',
  },
  {
    id: 'qr_ordering' as ServiceStyle,
    icon: '📱',
    title: 'QR Ordering',
    description: 'Full ordering flow from phone',
    qrUse: 'Complete order & payment',
  },
  {
    id: 'delivery_only' as ServiceStyle,
    icon: '🚗',
    title: 'Delivery Only',
    description: 'Online orders, home delivery',
    qrUse: 'Discovery & ordering',
  },
  {
    id: 'mixed' as ServiceStyle,
    icon: '⚙️',
    title: 'Mixed',
    description: 'Multiple service types',
    qrUse: 'Flexible usage',
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
    serviceStyle: 'dine_in',
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
      setData((prev) => ({
        ...prev,
        countryCode: country.code,
        countryName: country.name_en,
        currencyCode: country.currency_code,
        currencySymbol: country.currency_symbol,
        primaryLanguage: country.primary_language,
        timezone: country.timezone || '',
        enabledLanguages:
          prev.enabledLanguages.length === 0
            ? [country.primary_language]
            : prev.enabledLanguages.includes(country.primary_language)
              ? prev.enabledLanguages
              : [country.primary_language, ...prev.enabledLanguages],
      }));
    } else {
      setData((prev) => ({
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
          serviceStyle: data.serviceStyle,
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
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              <span className="text-xl font-bold text-gray-900">GUDBRO</span>
            </div>
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="max-w-lg text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <span className="text-4xl">🏢</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Enterprise Inquiry</h1>
            <p className="mt-4 text-gray-600">
              For enterprise clients with multi-country operations, our team will work with you to
              create a custom solution that fits your needs.
            </p>

            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 text-left">
              <h3 className="mb-4 font-semibold text-gray-900">Contact our sales team:</h3>
              <div className="space-y-3 text-gray-600">
                <p>📧 enterprise@gudbro.com</p>
                <p>📞 +1 (555) 123-4567</p>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Or fill out the form below and we'll contact you within 24 hours.
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => {
                  setData((prev) => ({ ...prev, accountType: null }));
                  setCurrentStep(1);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Go Back
              </button>
              <button
                onClick={() => router.push('/enterprise-contact')}
                className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
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
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
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
                  className={`ml-2 hidden text-sm font-medium sm:block ${
                    step.id === currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 w-8 sm:mx-4 sm:w-12 ${
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
        <div className="mx-auto max-w-3xl">
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
                    className={`rounded-xl border-2 p-6 text-left transition-all ${
                      data.accountType === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="text-4xl">{type.icon}</span>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{type.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                    <ul className="mt-4 space-y-1">
                      {type.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
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
                  <label className="block text-sm font-medium text-gray-700">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    value={data.organizationName}
                    onChange={(e) => setData({ ...data, organizationName: e.target.value })}
                    placeholder="e.g., ROOTS Hospitality Group"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This is your company or holding name. Customers won't see this.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Country *
                  </label>
                  <div className="mt-1">
                    <CountrySelector
                      value={data.countryCode}
                      onChange={handleCountryChange}
                      placeholder="Select your country..."
                    />
                  </div>
                  {data.countryCode && (
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        Currency:{' '}
                        <strong>
                          {data.currencySymbol} {data.currencyCode}
                        </strong>
                      </span>
                      <span>
                        Language: <strong>{data.primaryLanguage.toUpperCase()}</strong>
                      </span>
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
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Business Type *
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {businessTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setData({ ...data, businessType: type.id })}
                        className={`rounded-lg border p-4 text-left transition-all ${
                          data.businessType === type.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <p className="mt-2 text-sm font-medium text-gray-900">{type.title}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Style - Only show for F&B businesses */}
                {data.businessType === 'fnb' && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      How does service work in your venue? *
                    </label>
                    <p className="mb-3 text-sm text-gray-500">
                      This helps us configure the right features for your business.
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {serviceStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setData({ ...data, serviceStyle: style.id })}
                          className={`rounded-lg border p-4 text-left transition-all ${
                            data.serviceStyle === style.id
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <span className="text-2xl">{style.icon}</span>
                          <p className="mt-2 text-sm font-medium text-gray-900">{style.title}</p>
                          <p className="text-xs text-gray-500">{style.description}</p>
                        </button>
                      ))}
                    </div>
                    {data.serviceStyle && (
                      <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
                        <p className="text-sm text-blue-800">
                          <strong>QR Code will be used for:</strong>{' '}
                          {serviceStyles.find((s) => s.id === data.serviceStyle)?.qrUse}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand Name *</label>
                  <input
                    type="text"
                    value={data.brandName}
                    onChange={(e) => setData({ ...data, brandName: e.target.value })}
                    placeholder="e.g., ROOTS Cafe"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">This is what customers will see.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={data.brandDescription}
                    onChange={(e) => setData({ ...data, brandDescription: e.target.value })}
                    placeholder="A short description of your brand..."
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="h-10 w-10 cursor-pointer rounded"
                      />
                      <input
                        type="text"
                        value={data.primaryColor}
                        onChange={(e) => setData({ ...data, primaryColor: e.target.value })}
                        className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Secondary Color
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      <input
                        type="color"
                        value={data.secondaryColor || '#ffffff'}
                        onChange={(e) => setData({ ...data, secondaryColor: e.target.value })}
                        className="h-10 w-10 cursor-pointer rounded"
                      />
                      <input
                        type="text"
                        value={data.secondaryColor}
                        onChange={(e) => setData({ ...data, secondaryColor: e.target.value })}
                        placeholder="Optional"
                        className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm"
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
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">Leave empty to use your brand name.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={data.city}
                      onChange={(e) => setData({ ...data, city: e.target.value })}
                      placeholder="e.g., Da Nang"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      value={data.postalCode}
                      onChange={(e) => setData({ ...data, postalCode: e.target.value })}
                      placeholder="e.g., 550000"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="contact@yourbusiness.com"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer Languages
                  </label>
                  <p className="mb-2 text-sm text-gray-500">
                    Languages your customers speak. Primary language (
                    {data.primaryLanguage.toUpperCase() || 'not set'}) cannot be removed.
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
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <span className="text-3xl">✓</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Review your setup</h1>
                <p className="mt-2 text-gray-600">
                  Make sure everything looks correct before we create your account.
                </p>
              </div>

              <div className="space-y-6">
                {/* Organization */}
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
                    Organization
                  </h3>
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
                      <p className="font-medium capitalize text-gray-900">{data.accountType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Plan</p>
                      <p className="font-medium text-gray-900">Free</p>
                    </div>
                  </div>
                </div>

                {/* Brand */}
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
                    Brand
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Brand Name</p>
                      <p className="font-medium text-gray-900">{data.brandName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Business Type</p>
                      <p className="font-medium capitalize text-gray-900">{data.businessType}</p>
                    </div>
                    {data.businessType === 'fnb' && (
                      <div>
                        <p className="text-sm text-gray-500">Service Model</p>
                        <p className="font-medium text-gray-900">
                          {serviceStyles.find((s) => s.id === data.serviceStyle)?.title ||
                            data.serviceStyle}
                        </p>
                      </div>
                    )}
                    <div className={data.businessType === 'fnb' ? '' : 'col-span-2'}>
                      <p className="text-sm text-gray-500">Colors</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div
                          className="h-6 w-6 rounded border border-gray-300"
                          style={{ backgroundColor: data.primaryColor }}
                        />
                        <span className="text-sm text-gray-600">{data.primaryColor}</span>
                        {data.secondaryColor && (
                          <>
                            <div
                              className="ml-2 h-6 w-6 rounded border border-gray-300"
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
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
                    Location
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Location Name</p>
                      <p className="font-medium text-gray-900">
                        {data.locationName || data.brandName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      <p className="font-medium text-gray-900">{data.city || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Currency</p>
                      <p className="font-medium text-gray-900">
                        {data.currencySymbol} {data.currencyCode}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Languages</p>
                      <p className="font-medium text-gray-900">
                        {data.enabledLanguages.map((l) => l.toUpperCase()).join(', ')}
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
      <footer className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-3xl">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
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
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
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
