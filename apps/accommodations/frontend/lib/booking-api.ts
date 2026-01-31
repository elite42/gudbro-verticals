/**
 * Client-side API helper for booking submission.
 * Used by BookingForm component.
 */
import type { ApiResponse, BookingResponse, BookingSubmission } from '@/types/property';

export async function submitBooking(
  booking: BookingSubmission
): Promise<{ data?: BookingResponse; error?: string }> {
  try {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });

    const json: ApiResponse<BookingResponse> = await res.json();

    if (!res.ok) {
      return { error: json.error || 'booking_failed' };
    }

    return { data: json.data };
  } catch {
    return { error: 'network_error' };
  }
}
