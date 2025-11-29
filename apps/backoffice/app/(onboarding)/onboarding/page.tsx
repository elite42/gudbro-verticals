'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type BusinessType = 'fnb' | 'hotel' | 'airbnb' | 'other';

interface OnboardingData {
  businessType: BusinessType | null;
  businessName: string;
  businessDescription: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  logo: string | null;
  primaryColor: string;
  languages: string[];
}

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
    id: 'airbnb' as BusinessType,
    icon: '🏠',
    title: 'Airbnb / Rental',
    description: 'Property info, check-in, house rules, and recommendations',
  },
  {
    id: 'other' as BusinessType,
    icon: '🏢',
    title: 'Other',
    description: 'Custom setup for your business',
  },
];

const steps = [
  { id: 1, name: 'Business Type' },
  { id: 2, name: 'Business Info' },
  { id: 3, name: 'Branding' },
  { id: 4, name: 'First QR' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    businessType: null,
    businessName: '',
    businessDescription: '',
    address: '',
    city: '',
    country: 'Vietnam',
    phone: '',
    email: '',
    logo: null,
    primaryColor: '#000000',
    languages: ['en', 'vi'],
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
                  className={`ml-2 text-sm font-medium ${
                    step.id === currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
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
          {/* Step 1: Business Type */}
          {currentStep === 1 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">What type of business do you have?</h1>
              <p className="mt-2 text-gray-600">
                This helps us customize your experience and suggest the right features.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {businessTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setData({ ...data, businessType: type.id })}
                    className={`p-6 text-left rounded-xl border-2 transition-all ${
                      data.businessType === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-4xl">{type.icon}</span>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{type.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Business Info */}
          {currentStep === 2 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tell us about your business</h1>
              <p className="mt-2 text-gray-600">
                This information will be shown to your customers.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name *</label>
                  <input
                    type="text"
                    value={data.businessName}
                    onChange={(e) => setData({ ...data, businessName: e.target.value })}
                    placeholder="e.g., ROOTS Plant-Based Cafe"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={data.businessDescription}
                    onChange={(e) => setData({ ...data, businessDescription: e.target.value })}
                    placeholder="A short description of your business..."
                    rows={3}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              </div>
            </div>
          )}

          {/* Step 3: Branding */}
          {currentStep === 3 && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customize your branding</h1>
              <p className="mt-2 text-gray-600">
                Make your QR experience look like your brand.
              </p>

              <div className="mt-8 space-y-8">
                {/* Logo upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Logo</label>
                  <div className="mt-2 flex items-center gap-6">
                    <div className="h-24 w-24 bg-gray-100 rounded-xl flex items-center justify-center text-4xl">
                      {data.logo ? (
                        <img src={data.logo} alt="Logo" className="h-full w-full object-cover rounded-xl" />
                      ) : (
                        '📱'
                      )}
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Upload Logo
                    </button>
                  </div>
                </div>

                {/* Primary color */}
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
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Supported Languages</label>
                  <p className="text-sm text-gray-500">Select languages your customers speak.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { code: 'en', flag: '🇬🇧', name: 'English' },
                      { code: 'vi', flag: '🇻🇳', name: 'Vietnamese' },
                      { code: 'ko', flag: '🇰🇷', name: 'Korean' },
                      { code: 'zh', flag: '🇨🇳', name: 'Chinese' },
                      { code: 'ja', flag: '🇯🇵', name: 'Japanese' },
                      { code: 'th', flag: '🇹🇭', name: 'Thai' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          const languages = data.languages.includes(lang.code)
                            ? data.languages.filter((l) => l !== lang.code)
                            : [...data.languages, lang.code];
                          setData({ ...data, languages });
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                          data.languages.includes(lang.code)
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: First QR */}
          {currentStep === 4 && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">You're all set!</h1>
              <p className="mt-2 text-gray-600 max-w-md mx-auto">
                Your GUDBRO account is ready. Let's create your first QR code and start welcoming guests.
              </p>

              <div className="mt-8 bg-white rounded-xl border border-gray-200 p-8 max-w-sm mx-auto">
                <div className="bg-gray-100 rounded-lg p-4 inline-block">
                  <div className="w-32 h-32 bg-white rounded flex items-center justify-center text-4xl">
                    📱
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">Your first QR code</p>
                <p className="font-mono text-sm text-gray-700 mt-1">go.gudbro.com/{data.businessName.toLowerCase().replace(/\s+/g, '-') || 'your-business'}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleNext}
            disabled={currentStep === 1 && !data.businessType}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === 4 ? 'Go to Dashboard' : 'Continue'}
          </button>
        </div>
      </footer>
    </div>
  );
}
