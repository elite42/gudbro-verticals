'use client';

import { useState, useCallback } from 'react';
import {
  Buildings,
  Camera,
  Bed,
  WifiHigh,
  Tray,
  Phone,
  Check,
  ArrowRight,
  ArrowLeft,
  SkipForward,
} from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

interface OnboardingProgress {
  completed_steps: string[];
  current_step: string | null;
  started_at: string | null;
  completed_at: string | null;
}

interface OnboardingProperty {
  id: string;
  name: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  property_type: string | null;
  contact_phone: string | null;
  contact_whatsapp: string | null;
  contact_email: string | null;
  onboarding_progress: OnboardingProgress | null;
}

interface OnboardingWizardProps {
  propertyId: string;
  property: OnboardingProperty;
  onComplete: () => void;
}

// ============================================================================
// Constants
// ============================================================================

const WIZARD_STEPS = [
  { id: 'basic_info', label: 'Basic Info', Icon: Buildings, required: true },
  { id: 'photos', label: 'Photos', Icon: Camera, required: false },
  { id: 'rooms', label: 'Rooms', Icon: Bed, required: true },
  { id: 'wifi', label: 'WiFi', Icon: WifiHigh, required: false },
  { id: 'services', label: 'Services', Icon: Tray, required: false },
  { id: 'contact', label: 'Contact', Icon: Phone, required: true },
] as const;

const PROPERTY_TYPE_OPTIONS = [
  'hotel',
  'hostel',
  'apartment',
  'villa',
  'guesthouse',
  'homestay',
  'resort',
] as const;

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_API_KEY}`,
  };
}

// ============================================================================
// Component
// ============================================================================

export default function OnboardingWizard({
  propertyId,
  property,
  onComplete,
}: OnboardingWizardProps) {
  const existingProgress = property.onboarding_progress;

  const [currentStepId, setCurrentStepId] = useState(
    existingProgress?.current_step || WIZARD_STEPS[0].id
  );
  const [completedSteps, setCompletedSteps] = useState<string[]>(
    existingProgress?.completed_steps || []
  );
  const [saving, setSaving] = useState(false);

  // Form state for basic_info step
  const [name, setName] = useState(property.name || '');
  const [description, setDescription] = useState(property.description || '');
  const [address, setAddress] = useState(property.address || '');
  const [city, setCity] = useState(property.city || '');
  const [propertyType, setPropertyType] = useState(property.property_type || 'hotel');

  // Form state for contact step
  const [contactPhone, setContactPhone] = useState(property.contact_phone || '');
  const [contactWhatsapp, setContactWhatsapp] = useState(property.contact_whatsapp || '');
  const [contactEmail, setContactEmail] = useState(property.contact_email || '');

  const currentStepIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStepId);
  const isLastStep = currentStepIndex === WIZARD_STEPS.length - 1;
  const currentStepDef = WIZARD_STEPS[currentStepIndex];

  const saveProgress = useCallback(
    async (
      newCompletedSteps: string[],
      nextStep: string | null,
      extraFields?: Record<string, unknown>
    ) => {
      setSaving(true);
      try {
        const now = new Date().toISOString();
        const isComplete = nextStep === null;

        const body: Record<string, unknown> = {
          id: propertyId,
          onboarding_progress: {
            completed_steps: newCompletedSteps,
            current_step: nextStep,
            started_at: existingProgress?.started_at || now,
            completed_at: isComplete ? now : null,
          },
          ...extraFields,
        };

        const res = await fetch('/api/accommodations/property', {
          method: 'PUT',
          headers: authHeaders(),
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to save');
        }

        return true;
      } catch (err) {
        console.error('Error saving onboarding progress:', err);
        return false;
      } finally {
        setSaving(false);
      }
    },
    [propertyId, existingProgress]
  );

  const handleNext = async () => {
    // Collect step-specific data to save
    let extraFields: Record<string, unknown> = {};

    if (currentStepId === 'basic_info') {
      extraFields = {
        name: name.trim() || null,
        description: description.trim() || null,
        address: address.trim() || null,
        city: city.trim() || null,
      };
    } else if (currentStepId === 'contact') {
      extraFields = {
        contact_phone: contactPhone.trim() || null,
        contact_whatsapp: contactWhatsapp.trim() || null,
        contact_email: contactEmail.trim() || null,
      };
    }

    const newCompleted = completedSteps.includes(currentStepId)
      ? completedSteps
      : [...completedSteps, currentStepId];

    if (isLastStep) {
      // Final step - mark as complete
      const ok = await saveProgress(newCompleted, null, extraFields);
      if (ok) {
        setCompletedSteps(newCompleted);
        onComplete();
      }
    } else {
      const nextStepId = WIZARD_STEPS[currentStepIndex + 1].id;
      const ok = await saveProgress(newCompleted, nextStepId, extraFields);
      if (ok) {
        setCompletedSteps(newCompleted);
        setCurrentStepId(nextStepId);
      }
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepId(WIZARD_STEPS[currentStepIndex - 1].id);
    }
  };

  const handleSkip = async () => {
    if (isLastStep) return;
    const nextStepId = WIZARD_STEPS[currentStepIndex + 1].id;
    const ok = await saveProgress(completedSteps, nextStepId);
    if (ok) {
      setCurrentStepId(nextStepId);
    }
  };

  // ============================================================================
  // Step renderers
  // ============================================================================

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Property Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Sunny Beach Hostel"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your property to guests..."
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Beach Road"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Da Nang"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Property Type</label>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          {PROPERTY_TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <Camera className="mx-auto h-12 w-12 text-gray-300" weight="duotone" />
      <h3 className="mt-3 text-base font-medium text-gray-700">Upload Property Photos</h3>
      <p className="mt-1 text-sm text-gray-500">
        You can upload and manage photos in Property Settings after setup.
      </p>
      <a
        href="/accommodations/settings"
        className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Go to Property Settings
      </a>
    </div>
  );

  const renderRooms = () => (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <Bed className="mx-auto h-12 w-12 text-gray-300" weight="duotone" />
      <h3 className="mt-3 text-base font-medium text-gray-700">Set Up Your Rooms</h3>
      <p className="mt-1 text-sm text-gray-500">
        Add rooms with pricing, capacity, and photos in the Rooms section.
      </p>
      <a
        href="/accommodations/rooms"
        className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Go to Room Manager
      </a>
    </div>
  );

  const renderWifi = () => (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <WifiHigh className="mx-auto h-12 w-12 text-gray-300" weight="duotone" />
      <h3 className="mt-3 text-base font-medium text-gray-700">Configure WiFi Zones</h3>
      <p className="mt-1 text-sm text-gray-500">
        Set up WiFi network names and passwords for different areas of your property.
      </p>
      <a
        href="/accommodations/settings"
        className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Go to Property Settings
      </a>
    </div>
  );

  const renderServices = () => (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <Tray className="mx-auto h-12 w-12 text-gray-300" weight="duotone" />
      <h3 className="mt-3 text-base font-medium text-gray-700">Add Services</h3>
      <p className="mt-1 text-sm text-gray-500">
        Offer services like airport transfer, laundry, tours, and more to your guests.
      </p>
      <a
        href="/accommodations/services"
        className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Go to Services
      </a>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        How can guests reach you? Provide at least one contact method.
      </p>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          placeholder="+84 912345678"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">WhatsApp</label>
        <input
          type="tel"
          value={contactWhatsapp}
          onChange={(e) => setContactWhatsapp(e.target.value)}
          placeholder="+84 912345678"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="host@property.com"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const stepRenderers: Record<string, () => React.JSX.Element> = {
    basic_info: renderBasicInfo,
    photos: renderPhotos,
    rooms: renderRooms,
    wifi: renderWifi,
    services: renderServices,
    contact: renderContact,
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {WIZARD_STEPS.map((step, idx) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = step.id === currentStepId;
            const StepIcon = step.Icon;

            return (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                      isCompleted
                        ? 'border-green-500 bg-green-500 text-white'
                        : isCurrent
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" weight="bold" />
                    ) : (
                      <StepIcon className="h-5 w-5" weight={isCurrent ? 'duotone' : 'regular'} />
                    )}
                  </div>
                  <span
                    className={`mt-1.5 text-xs font-medium ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < WIZARD_STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      completedSteps.includes(step.id) ? 'bg-green-300' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{currentStepDef?.label}</h2>
          {!currentStepDef?.required && <span className="text-xs text-gray-400">Optional</span>}
        </div>

        {stepRenderers[currentStepId]?.()}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStepIndex === 0 || saving}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-center gap-3">
          {!currentStepDef?.required && !isLastStep && (
            <button
              type="button"
              onClick={handleSkip}
              disabled={saving}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-40"
            >
              <SkipForward className="h-4 w-4" />
              Skip
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isLastStep ? (
              <Check className="h-4 w-4" weight="bold" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
            {isLastStep ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
