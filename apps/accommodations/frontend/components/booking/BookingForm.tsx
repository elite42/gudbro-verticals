'use client';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { SpinnerGap, WarningCircle } from '@phosphor-icons/react';
import PaymentMethodSelector from './PaymentMethodSelector';
import type { AccomPaymentMethod } from '@/types/property';

interface BookingFormProps {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  guestCount: number;
  setGuestCount: (v: number) => void;
  maxGuests: number;
  specialRequests: string;
  setSpecialRequests: (v: string) => void;
  bookingMode: 'instant' | 'inquiry';
  isSubmitting: boolean;
  submitError: string | null;
  isFormValid: boolean;
  onSubmit: () => void;
  // Payment method props
  acceptedPaymentMethods: string[];
  selectedPaymentMethod: AccomPaymentMethod | null;
  onSelectPaymentMethod: (m: AccomPaymentMethod) => void;
  depositPercent: number;
  totalPrice: number;
  currency: string;
}

export default function BookingForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  guestCount,
  setGuestCount,
  maxGuests,
  specialRequests,
  setSpecialRequests,
  bookingMode,
  isSubmitting,
  submitError,
  isFormValid,
  onSubmit,
  acceptedPaymentMethods,
  selectedPaymentMethod,
  onSelectPaymentMethod,
  depositPercent,
  totalPrice,
  currency,
}: BookingFormProps) {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div>
      <h2 className="font-display text-foreground mb-3 text-lg font-semibold">Guest Details</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Name fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="text-foreground-muted mb-1 block text-sm">
              First name *
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border-border bg-background text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-foreground-muted mb-1 block text-sm">
              Last name *
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="border-border bg-background text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="text-foreground-muted mb-1 block text-sm">
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-border bg-background text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="text-foreground-muted mb-1 block text-sm">
            Phone *
          </label>
          <PhoneInput
            defaultCountry="vn"
            value={phone}
            onChange={setPhone}
            inputClassName="!w-full !rounded-lg !border-border !bg-background !px-3 !py-2.5 !text-sm !text-foreground !outline-none focus:!border-primary focus:!ring-1 focus:!ring-primary"
            countrySelectorStyleProps={{
              buttonClassName: '!rounded-l-lg !border-border !bg-background !px-2 !py-2.5',
            }}
          />
        </div>

        {/* Guest count */}
        <div>
          <label htmlFor="guestCount" className="text-foreground-muted mb-1 block text-sm">
            Number of guests
          </label>
          <select
            id="guestCount"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="border-border bg-background text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1"
          >
            {Array.from({ length: maxGuests }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} guest{i > 0 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Special requests */}
        <div>
          <label htmlFor="specialRequests" className="text-foreground-muted mb-1 block text-sm">
            Special requests (optional)
          </label>
          <textarea
            id="specialRequests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={3}
            className="border-border bg-background text-foreground focus:border-primary focus:ring-primary w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1"
            placeholder="Early check-in, extra pillows, etc."
          />
        </div>

        {/* Payment method selector */}
        {acceptedPaymentMethods.length > 0 && (
          <PaymentMethodSelector
            acceptedMethods={acceptedPaymentMethods}
            selectedMethod={selectedPaymentMethod}
            onSelect={onSelectPaymentMethod}
            depositPercent={depositPercent}
            totalPrice={totalPrice}
            currency={currency}
          />
        )}

        {/* Error message */}
        {submitError && (
          <div className="bg-error-light text-error flex items-start gap-2 rounded-lg p-3 text-sm">
            <WarningCircle size={18} weight="fill" className="mt-0.5 flex-shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="bg-primary hover:bg-primary-hover w-full rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <SpinnerGap size={18} className="animate-spin" />
              Processing...
            </span>
          ) : selectedPaymentMethod === 'card' ? (
            'Pay Deposit via Card'
          ) : selectedPaymentMethod === 'cash' ? (
            'Book Now'
          ) : selectedPaymentMethod === 'bank_transfer' || selectedPaymentMethod === 'crypto' ? (
            'Request Booking'
          ) : bookingMode === 'instant' ? (
            'Book Now'
          ) : (
            'Request to Book'
          )}
        </button>
      </form>
    </div>
  );
}
