'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { DateRange } from 'react-day-picker';
import { fetchAvailability } from '@/lib/property-api';
import { submitBooking } from '@/lib/booking-api';
import { calculatePriceBreakdown } from '@/lib/price-utils';
import type {
  PropertyRoom,
  BookedRange,
  PriceBreakdown,
  BookingResponse,
  AccomPaymentMethod,
} from '@/types/property';

interface UseBookingFormProps {
  propertySlug: string;
  rooms: PropertyRoom[];
  bookingMode: 'instant' | 'inquiry' | 'disabled';
  cleaningFee: number;
  weeklyDiscountPercent: number;
  monthlyDiscountPercent: number;
  minNights: number;
  acceptedPaymentMethods: string[];
  depositPercent: number;
}

interface UseBookingFormReturn {
  // Room selection
  selectedRoom: PropertyRoom | null;
  selectRoom: (roomId: string) => void;

  // Date selection
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  bookedRanges: BookedRange[];
  isLoadingAvailability: boolean;

  // Price
  priceBreakdown: PriceBreakdown | null;

  // Form fields
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
  specialRequests: string;
  setSpecialRequests: (v: string) => void;

  // Payment method
  selectedPaymentMethod: AccomPaymentMethod | null;
  setSelectedPaymentMethod: (m: AccomPaymentMethod) => void;

  // Submission
  isSubmitting: boolean;
  submitError: string | null;
  bookingResult: BookingResponse | null;
  handleSubmit: () => Promise<void>;

  // Validation
  isFormValid: boolean;
}

const ERROR_MESSAGES: Record<string, string> = {
  dates_unavailable: 'These dates are no longer available. Please select different dates.',
  room_unavailable: 'This room is no longer available.',
  min_nights_not_met: 'Your stay does not meet the minimum nights requirement.',
  max_nights_exceeded: 'Your stay exceeds the maximum allowed nights.',
  max_guests_exceeded: 'Guest count exceeds room capacity.',
  validation_error: 'Please check your booking details and try again.',
  property_not_found: 'This property is no longer available.',
  property_disabled: 'This property is not accepting bookings.',
  payment_method_not_accepted: 'This payment method is not accepted by this property.',
  network_error: 'Network error. Please check your connection and try again.',
  internal_error: 'Something went wrong. Please try again.',
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function useBookingForm({
  propertySlug,
  rooms,
  bookingMode,
  cleaningFee,
  weeklyDiscountPercent,
  monthlyDiscountPercent,
  minNights,
  acceptedPaymentMethods,
  depositPercent,
}: UseBookingFormProps): UseBookingFormReturn {
  // Room selection -- auto-select if single room
  const [selectedRoom, setSelectedRoom] = useState<PropertyRoom | null>(
    rooms.length === 1 ? rooms[0] : null
  );

  // Availability
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

  // Date selection
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  // Payment method -- auto-select if only one accepted
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<AccomPaymentMethod | null>(
    acceptedPaymentMethods.length === 1 ? (acceptedPaymentMethods[0] as AccomPaymentMethod) : null
  );

  // Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);

  // Select room handler
  const selectRoom = useCallback(
    (roomId: string) => {
      const room = rooms.find((r) => r.id === roomId);
      if (room) {
        setSelectedRoom(room);
        // Reset dates when room changes (availability differs per room)
        setDateRange(undefined);
      }
    },
    [rooms]
  );

  // Fetch availability when selectedRoom changes
  useEffect(() => {
    if (!selectedRoom) {
      setBookedRanges([]);
      return;
    }

    let cancelled = false;
    setIsLoadingAvailability(true);

    fetchAvailability(propertySlug, selectedRoom.id).then((result) => {
      if (cancelled) return;
      setBookedRanges(result?.bookedRanges || []);
      setIsLoadingAvailability(false);
    });

    return () => {
      cancelled = true;
    };
  }, [propertySlug, selectedRoom]);

  // Calculate price breakdown when dates change
  const priceBreakdown = useMemo(() => {
    if (!selectedRoom || !dateRange?.from || !dateRange?.to) return null;

    return calculatePriceBreakdown(
      selectedRoom.base_price_per_night,
      dateRange.from,
      dateRange.to,
      cleaningFee,
      weeklyDiscountPercent,
      monthlyDiscountPercent,
      selectedRoom.currency
    );
  }, [selectedRoom, dateRange, cleaningFee, weeklyDiscountPercent, monthlyDiscountPercent]);

  // Form validation
  const isFormValid = useMemo(() => {
    if (!selectedRoom) return false;
    if (!dateRange?.from || !dateRange?.to) return false;
    if (!firstName.trim()) return false;
    if (!lastName.trim()) return false;
    if (!email.trim() || !isValidEmail(email)) return false;
    if (!phone || phone.length < 7) return false;
    if (guestCount < 1 || guestCount > selectedRoom.capacity) return false;
    if (bookingMode === 'disabled') return false;
    // Require payment method if property has accepted methods configured
    if (acceptedPaymentMethods.length > 0 && !selectedPaymentMethod) return false;
    return true;
  }, [
    selectedRoom,
    dateRange,
    firstName,
    lastName,
    email,
    phone,
    guestCount,
    bookingMode,
    acceptedPaymentMethods,
    selectedPaymentMethod,
  ]);

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (!isFormValid || !selectedRoom || !dateRange?.from || !dateRange?.to) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    const { data, error } = await submitBooking({
      propertySlug,
      roomId: selectedRoom.id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone,
      guestCount,
      checkIn: formatDate(dateRange.from),
      checkOut: formatDate(dateRange.to),
      specialRequests: specialRequests.trim() || undefined,
      paymentMethod: selectedPaymentMethod || undefined,
    });

    if (error) {
      setIsSubmitting(false);
      setSubmitError(ERROR_MESSAGES[error] || ERROR_MESSAGES.internal_error);
      return;
    }

    if (data) {
      // Store JWT token for booking tracking
      try {
        localStorage.setItem('gudbro_booking_token', data.token);
      } catch {
        // localStorage may be unavailable in private browsing
      }

      // Handle card payment: redirect to Stripe Checkout
      if (data.paymentMethod === 'card') {
        if (data.stripeCheckoutUrl) {
          // Stripe session URL returned directly from booking API
          window.location.href = data.stripeCheckoutUrl;
          return; // Keep isSubmitting true during redirect
        }
        // Fallback: create checkout session via separate endpoint
        try {
          const checkoutRes = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId: data.bookingCode }),
          });
          const checkoutData = await checkoutRes.json();
          if (checkoutData.data?.url) {
            window.location.href = checkoutData.data.url;
            return; // Keep isSubmitting true during redirect
          }
        } catch {
          // If checkout creation fails, still show confirmation
        }
      }

      setIsSubmitting(false);
      setBookingResult(data);
    } else {
      setIsSubmitting(false);
    }
  }, [
    isFormValid,
    selectedRoom,
    dateRange,
    propertySlug,
    firstName,
    lastName,
    email,
    phone,
    guestCount,
    specialRequests,
    selectedPaymentMethod,
  ]);

  return {
    selectedRoom,
    selectRoom,
    dateRange,
    setDateRange,
    bookedRanges,
    isLoadingAvailability,
    priceBreakdown,
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
    specialRequests,
    setSpecialRequests,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    isSubmitting,
    submitError,
    bookingResult,
    handleSubmit,
    isFormValid,
  };
}
