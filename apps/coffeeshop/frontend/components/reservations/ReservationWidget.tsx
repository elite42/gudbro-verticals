'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../../lib/use-translation';
import {
  ChevronLeft,
  Users,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Check,
  X,
  MapPin,
  Sparkles,
} from 'lucide-react';

// Types
interface ReservationSettings {
  minAdvanceHours: number;
  maxAdvanceDays: number;
  slotDuration: number;
  defaultDuration: number;
  minPartySize: number;
  maxPartySize: number;
  requireDeposit: boolean;
  depositAmount?: number;
  requirePhone: boolean;
  requireEmail?: boolean;
  allowSectionPreference: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Section {
  id: string;
  name: string;
  nameTranslations?: Record<string, string>;
  type: string;
  amenities?: string[];
  weatherDependent?: boolean;
}

interface ReservationResult {
  code: string;
  guestName: string;
  partySize: number;
  date: string;
  time: string;
  status: string;
  requiresDeposit?: boolean;
  depositAmount?: number;
}

interface ReservationWidgetProps {
  locationId: string;
  onClose?: () => void;
  onSuccess?: (reservation: ReservationResult) => void;
  isOpen?: boolean;
}

type Step = 'partySize' | 'dateTime' | 'details' | 'confirm' | 'success';

// Party size quick select options
const PARTY_SIZE_PRESETS = [1, 2, 4, 6, 8];

export function ReservationWidget({
  locationId,
  onClose,
  onSuccess,
  isOpen = true,
}: ReservationWidgetProps) {
  const { t, language } = useTranslation();

  // Step state
  const [currentStep, setCurrentStep] = useState<Step>('partySize');

  // Form state
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [occasion, setOccasion] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Data state
  const [settings, setSettings] = useState<ReservationSettings | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [reservation, setReservation] = useState<ReservationResult | null>(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch settings on mount
  useEffect(() => {
    if (locationId) {
      fetchSettings();
      fetchSections();
    }
  }, [locationId]);

  // Generate available dates (today + maxAdvanceDays)
  const getAvailableDates = useCallback(() => {
    const dates: string[] = [];
    const maxDays = settings?.maxAdvanceDays || 30;
    const minHours = settings?.minAdvanceHours || 2;

    const now = new Date();
    const startDate = new Date(now.getTime() + minHours * 60 * 60 * 1000);

    for (let i = 0; i < maxDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates;
  }, [settings]);

  // Fetch settings
  const fetchSettings = async () => {
    try {
      const res = await fetch(`/api/reserve?type=settings&locationId=${locationId}`);
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  // Fetch sections
  const fetchSections = async () => {
    try {
      const res = await fetch(`/api/reserve?type=sections&locationId=${locationId}`);
      const data = await res.json();
      if (data.success) {
        setSections(data.sections);
      }
    } catch (err) {
      console.error('Failed to fetch sections:', err);
    }
  };

  // Fetch availability for selected date
  const fetchAvailability = async (date: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/reserve?type=availability&locationId=${locationId}&date=${date}&partySize=${partySize}`
      );
      const data = await res.json();
      if (data.success) {
        setAvailableSlots(data.slots);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch availability');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    fetchAvailability(date);
  };

  // Submit reservation
  const submitReservation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId,
          guestName,
          guestEmail: guestEmail || undefined,
          guestPhone: guestPhone || undefined,
          guestLocale: language,
          partySize,
          reservationDate: selectedDate,
          reservationTime: selectedTime,
          sectionId: selectedSection || undefined,
          occasion: occasion || undefined,
          specialRequests: specialRequests || undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setReservation(data.reservation);
        setCurrentStep('success');
        onSuccess?.(data.reservation);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to create reservation');
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation
  const goBack = () => {
    const steps: Step[] = ['partySize', 'dateTime', 'details', 'confirm'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      onClose?.();
    }
  };

  const goNext = () => {
    const steps: Step[] = ['partySize', 'dateTime', 'details', 'confirm'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  // Validation
  const canProceed = () => {
    switch (currentStep) {
      case 'partySize':
        return (
          partySize >= (settings?.minPartySize || 1) && partySize <= (settings?.maxPartySize || 20)
        );
      case 'dateTime':
        return selectedDate && selectedTime;
      case 'details':
        const hasName = guestName.trim().length > 0;
        const hasPhone = !settings?.requirePhone || guestPhone.trim().length > 0;
        const hasEmail = !settings?.requireEmail || guestEmail.trim().length > 0;
        return hasName && hasPhone && hasEmail;
      case 'confirm':
        return true;
      default:
        return false;
    }
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(
      language === 'vi' ? 'vi-VN' : language === 'it' ? 'it-IT' : 'en-US',
      {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }
    );
  };

  // Get section name in current language
  const getSectionName = (section: Section) => {
    if (section.nameTranslations && section.nameTranslations[language]) {
      return section.nameTranslations[language];
    }
    return section.name;
  };

  if (!isOpen) return null;

  // Get translations with fallback
  const tr = (t as unknown as Record<string, unknown>).reservation as
    | Record<string, unknown>
    | undefined;
  const tCommon = (t as unknown as Record<string, unknown>).common as Record<string, string>;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="animate-slide-up flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <button
            onClick={goBack}
            className="-ml-2 rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-semibold">
            {currentStep === 'success'
              ? (tr?.successTitle as string) || 'Reservation Confirmed!'
              : (tr?.title as string) || 'Make a Reservation'}
          </h2>
          <button
            onClick={onClose}
            className="-mr-2 rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress indicator */}
        {currentStep !== 'success' && (
          <div className="flex gap-1 px-4 py-2">
            {['partySize', 'dateTime', 'details', 'confirm'].map((step, index) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  ['partySize', 'dateTime', 'details', 'confirm'].indexOf(currentStep) >= index
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          {/* Step 1: Party Size */}
          {currentStep === 'partySize' && (
            <div className="space-y-6">
              <div className="text-center">
                <Users className="mx-auto mb-3 h-12 w-12 text-blue-500" />
                <h3 className="mb-1 text-xl font-semibold">
                  {(tr?.partySizeTitle as string) || 'How many guests?'}
                </h3>
                <p className="text-sm text-gray-500">
                  {(tr?.partySizeSubtitle as string) || 'Select the number of people'}
                </p>
              </div>

              {/* Counter */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setPartySize(Math.max(settings?.minPartySize || 1, partySize - 1))}
                  disabled={partySize <= (settings?.minPartySize || 1)}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 text-2xl font-medium transition-colors hover:border-blue-500 disabled:opacity-30"
                >
                  −
                </button>
                <span className="w-20 text-center text-5xl font-bold text-blue-600">
                  {partySize}
                </span>
                <button
                  onClick={() =>
                    setPartySize(Math.min(settings?.maxPartySize || 20, partySize + 1))
                  }
                  disabled={partySize >= (settings?.maxPartySize || 20)}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 text-2xl font-medium transition-colors hover:border-blue-500 disabled:opacity-30"
                >
                  +
                </button>
              </div>

              {/* Quick select */}
              <div className="flex flex-wrap justify-center gap-2">
                {PARTY_SIZE_PRESETS.filter(
                  (size) =>
                    size >= (settings?.minPartySize || 1) && size <= (settings?.maxPartySize || 20)
                ).map((size) => (
                  <button
                    key={size}
                    onClick={() => setPartySize(size)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      partySize === size
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {size}{' '}
                    {size === 1
                      ? (tr?.guest as string) || 'guest'
                      : (tr?.guests as string) || 'guests'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 'dateTime' && (
            <div className="space-y-6">
              {/* Date selection */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">{(tr?.selectDate as string) || 'Select Date'}</h3>
                </div>
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
                  {getAvailableDates()
                    .slice(0, 14)
                    .map((date) => {
                      const d = new Date(date);
                      const isToday = date === new Date().toISOString().split('T')[0];
                      return (
                        <button
                          key={date}
                          onClick={() => handleDateSelect(date)}
                          className={`w-16 flex-shrink-0 rounded-xl py-3 text-center transition-colors ${
                            selectedDate === date
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          <div className="text-xs opacity-70">
                            {isToday
                              ? (tr?.today as string) || 'Today'
                              : d.toLocaleDateString(language, { weekday: 'short' })}
                          </div>
                          <div className="text-lg font-semibold">{d.getDate()}</div>
                          <div className="text-xs opacity-70">
                            {d.toLocaleDateString(language, { month: 'short' })}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">{(tr?.selectTime as string) || 'Select Time'}</h3>
                  </div>
                  {isLoading ? (
                    <div className="py-8 text-center text-gray-500">
                      {(tr?.loading as string) || 'Loading...'}
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                      {(tr?.noSlots as string) || 'No available times for this date'}
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTime(slot.time)}
                          disabled={!slot.available}
                          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            selectedTime === slot.time
                              ? 'bg-blue-500 text-white'
                              : slot.available
                                ? 'bg-gray-100 hover:bg-gray-200'
                                : 'cursor-not-allowed bg-gray-50 text-gray-300'
                          }`}
                        >
                          {slot.time.slice(0, 5)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Section preference */}
              {settings?.allowSectionPreference && sections.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">
                      {(tr?.sectionPreference as string) || 'Seating Preference'}
                      <span className="ml-1 text-sm font-normal text-gray-500">
                        ({(tr?.optional as string) || 'optional'})
                      </span>
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSection('')}
                      className={`rounded-full px-4 py-2 text-sm transition-colors ${
                        !selectedSection
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {(tr?.noPreference as string) || 'No preference'}
                    </button>
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`rounded-full px-4 py-2 text-sm transition-colors ${
                          selectedSection === section.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {getSectionName(section)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 'details' && (
            <div className="space-y-4">
              <div className="mb-6 text-center">
                <User className="mx-auto mb-3 h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-semibold">
                  {(tr?.yourDetails as string) || 'Your Details'}
                </h3>
              </div>

              {/* Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {(tr?.name as string) || 'Name'} *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={(tr?.namePlaceholder as string) || 'Enter your name'}
                    className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {(tr?.phone as string) || 'Phone'} {settings?.requirePhone ? '*' : ''}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder={(tr?.phonePlaceholder as string) || 'Enter your phone number'}
                    className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {(tr?.email as string) || 'Email'} {settings?.requireEmail ? '*' : ''}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder={(tr?.emailPlaceholder as string) || 'Enter your email'}
                    className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {(tr?.occasion as string) || 'Occasion'}
                  <span className="ml-1 font-normal text-gray-500">
                    ({(tr?.optional as string) || 'optional'})
                  </span>
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{(tr?.selectOccasion as string) || 'Select occasion...'}</option>
                  <option value="birthday">
                    {(tr?.occasions as Record<string, string>)?.birthday || 'Birthday'}
                  </option>
                  <option value="anniversary">
                    {(tr?.occasions as Record<string, string>)?.anniversary || 'Anniversary'}
                  </option>
                  <option value="business">
                    {(tr?.occasions as Record<string, string>)?.business || 'Business Meal'}
                  </option>
                  <option value="date">
                    {(tr?.occasions as Record<string, string>)?.date || 'Date Night'}
                  </option>
                  <option value="celebration">
                    {(tr?.occasions as Record<string, string>)?.celebration || 'Celebration'}
                  </option>
                </select>
              </div>

              {/* Special Requests */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {(tr?.specialRequests as string) || 'Special Requests'}
                  <span className="ml-1 font-normal text-gray-500">
                    ({(tr?.optional as string) || 'optional'})
                  </span>
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder={
                    (tr?.specialRequestsPlaceholder as string) ||
                    'Allergies, accessibility needs, etc.'
                  }
                  rows={3}
                  className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {currentStep === 'confirm' && (
            <div className="space-y-6">
              <div className="mb-6 text-center">
                <Check className="mx-auto mb-3 h-12 w-12 text-green-500" />
                <h3 className="text-xl font-semibold">
                  {(tr?.confirmTitle as string) || 'Confirm Your Reservation'}
                </h3>
              </div>

              {/* Summary card */}
              <div className="space-y-3 rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">
                      {(tr?.guests as string) || 'Guests'}
                    </div>
                    <div className="font-semibold">
                      {partySize}{' '}
                      {partySize === 1
                        ? (tr?.person as string) || 'person'
                        : (tr?.people as string) || 'people'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{(tr?.date as string) || 'Date'}</div>
                    <div className="font-semibold">{formatDate(selectedDate)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{(tr?.time as string) || 'Time'}</div>
                    <div className="font-semibold">{selectedTime.slice(0, 5)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{(tr?.name as string) || 'Name'}</div>
                    <div className="font-semibold">{guestName}</div>
                  </div>
                </div>

                {selectedSection && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        {(tr?.section as string) || 'Section'}
                      </div>
                      <div className="font-semibold">
                        {sections.find((s) => s.id === selectedSection)?.name || selectedSection}
                      </div>
                    </div>
                  </div>
                )}

                {occasion && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        {(tr?.occasion as string) || 'Occasion'}
                      </div>
                      <div className="font-semibold capitalize">{occasion}</div>
                    </div>
                  </div>
                )}
              </div>

              {specialRequests && (
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-3">
                  <div className="mb-1 text-sm font-medium text-yellow-800">
                    {(tr?.specialRequests as string) || 'Special Requests'}
                  </div>
                  <div className="text-sm text-yellow-700">{specialRequests}</div>
                </div>
              )}

              <p className="text-center text-sm text-gray-500">
                {(tr?.confirmNote as string) ||
                  'By confirming, you agree to our reservation policy.'}
              </p>
            </div>
          )}

          {/* Step 5: Success */}
          {currentStep === 'success' && reservation && (
            <div className="space-y-6 py-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>

              <div>
                <h3 className="mb-2 text-2xl font-bold text-green-600">
                  {(tr?.successTitle as string) || 'Reservation Confirmed!'}
                </h3>
                <p className="text-gray-600">
                  {(tr?.successMessage as string) || 'We look forward to seeing you!'}
                </p>
              </div>

              {/* Confirmation code */}
              <div className="rounded-2xl bg-gray-100 p-6">
                <div className="mb-1 text-sm text-gray-500">
                  {(tr?.confirmationCode as string) || 'Confirmation Code'}
                </div>
                <div className="font-mono text-3xl font-bold tracking-wider">
                  {reservation.code}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2 rounded-xl bg-gray-50 p-4 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-500">{(tr?.date as string) || 'Date'}</span>
                  <span className="font-medium">{formatDate(reservation.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{(tr?.time as string) || 'Time'}</span>
                  <span className="font-medium">{reservation.time.slice(0, 5)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{(tr?.guests as string) || 'Guests'}</span>
                  <span className="font-medium">{reservation.partySize}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                {(tr?.successNote as string) || 'A confirmation has been sent to your phone/email.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {currentStep !== 'success' && (
          <div className="border-t bg-white p-4">
            <button
              onClick={currentStep === 'confirm' ? submitReservation : goNext}
              disabled={!canProceed() || isLoading}
              className="w-full rounded-xl bg-blue-500 py-4 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isLoading
                ? (tr?.processing as string) || 'Processing...'
                : currentStep === 'confirm'
                  ? (tr?.confirmReservation as string) || 'Confirm Reservation'
                  : tCommon?.continue || 'Continue'}
            </button>
          </div>
        )}

        {/* Success footer */}
        {currentStep === 'success' && (
          <div className="border-t bg-white p-4">
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-blue-500 py-4 font-semibold text-white transition-colors hover:bg-blue-600"
            >
              {tCommon?.done || 'Done'}
            </button>
          </div>
        )}
      </div>

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
