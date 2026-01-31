'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { DateRange } from 'react-day-picker';
import { fetchAvailability } from '@/lib/property-api';
import { submitBooking } from '@/lib/booking-api';
import { calculatePriceBreakdown } from '@/lib/price-utils';
import type { PropertyRoom, BookedRange, PriceBreakdown, BookingResponse } from '@/types/property';

interface UseBookingFormProps {
  propertySlug: string;
  rooms: PropertyRoom[];
  bookingMode: 'instant' | 'inquiry' | 'disabled';
  cleaningFee: number;
  weeklyDiscountPercent: number;
  monthlyDiscountPercent: number;
  minNights: number;
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
    return true;
  }, [selectedRoom, dateRange, firstName, lastName, email, phone, guestCount, bookingMode]);

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
    });

    setIsSubmitting(false);

    if (error) {
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
      setBookingResult(data);
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
    isSubmitting,
    submitError,
    bookingResult,
    handleSubmit,
    isFormValid,
  };
}
