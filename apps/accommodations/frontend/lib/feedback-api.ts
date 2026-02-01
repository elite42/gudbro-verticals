import type {
  GuestFeedback,
  FeedbackSubmitRequest,
  FeedbackUploadUrlResponse,
  FeedbackListResponse,
} from '@/types/stay';

/**
 * Generic result type for feedback API calls.
 */
interface FetchResult<T> {
  data: T | null;
  error: string | null;
}

/**
 * Submit in-stay feedback.
 * POST /api/stay/[code]/feedback
 */
export async function submitFeedback(
  code: string,
  token: string,
  data: FeedbackSubmitRequest
): Promise<FetchResult<GuestFeedback>> {
  try {
    const res = await fetch(`/api/stay/${code}/feedback`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      return { data: null, error: json.error || `Request failed (${res.status})` };
    }

    return { data: json.data as GuestFeedback, error: null };
  } catch {
    return { data: null, error: 'Network error. Please check your connection.' };
  }
}

/**
 * Get all feedback for the current booking.
 * GET /api/stay/[code]/feedback
 */
export async function getFeedback(
  code: string,
  token: string
): Promise<FetchResult<FeedbackListResponse>> {
  try {
    const res = await fetch(`/api/stay/${code}/feedback`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      return { data: null, error: json.error || `Request failed (${res.status})` };
    }

    return { data: json.data as FeedbackListResponse, error: null };
  } catch {
    return { data: null, error: 'Network error. Please check your connection.' };
  }
}

/**
 * Get a signed upload URL for a feedback photo.
 * POST /api/stay/[code]/feedback/upload-url
 */
export async function getFeedbackUploadUrl(
  code: string,
  token: string
): Promise<FetchResult<FeedbackUploadUrlResponse>> {
  try {
    const res = await fetch(`/api/stay/${code}/feedback/upload-url`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      return { data: null, error: json.error || `Request failed (${res.status})` };
    }

    return { data: json.data as FeedbackUploadUrlResponse, error: null };
  } catch {
    return { data: null, error: 'Network error. Please check your connection.' };
  }
}
