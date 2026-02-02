'use client';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { SpinnerGap, WarningCircle } from '@phosphor-icons/react';
import PaymentMethodSelector from './PaymentMethodSelector';
import { VoucherInput } from './VoucherInput';
import type { AccomPaymentMethod, ValidatedVoucher } from '@/types/property';

interface BookingFormProps {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  guestCountry: string;
  setGuestCountry: (v: string) => void;
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
  // Voucher props
  propertyId: string;
  numNights: number;
  subtotal: number;
  voucherDetails: ValidatedVoucher | null;
  onVoucherApplied: (voucher: ValidatedVoucher | null) => void;
  formatPrice: (amount: number) => string;
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
  guestCountry,
  setGuestCountry,
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
  propertyId,
  numNights,
  subtotal,
  voucherDetails,
  onVoucherApplied,
  formatPrice,
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

        {/* Country / Nationality (optional) */}
        <div>
          <label htmlFor="guestCountry" className="text-foreground-muted mb-1 block text-sm">
            Nationality (optional)
          </label>
          <select
            id="guestCountry"
            value={guestCountry}
            onChange={(e) => setGuestCountry(e.target.value)}
            className="border-border bg-background text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1"
          >
            <option value="">Select country</option>
            <option value="VN">Vietnam</option>
            <option value="TH">Thailand</option>
            <option value="KH">Cambodia</option>
            <option value="LA">Laos</option>
            <option value="MM">Myanmar</option>
            <option value="ID">Indonesia</option>
            <option value="MY">Malaysia</option>
            <option value="PH">Philippines</option>
            <option value="SG">Singapore</option>
            <option value="KR">South Korea</option>
            <option value="JP">Japan</option>
            <option value="CN">China</option>
            <option value="TW">Taiwan</option>
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="NZ">New Zealand</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="IT">Italy</option>
            <option value="ES">Spain</option>
            <option value="NL">Netherlands</option>
            <option value="SE">Sweden</option>
            <option value="RU">Russia</option>
            <option value="OTHER">Other</option>
          </select>
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

        {/* Voucher code */}
        <VoucherInput
          propertyId={propertyId}
          numNights={numNights}
          subtotal={subtotal}
          onVoucherApplied={onVoucherApplied}
          appliedVoucher={voucherDetails}
          formatPrice={formatPrice}
          disabled={isSubmitting}
        />

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
