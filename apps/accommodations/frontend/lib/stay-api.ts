import type {
  ServiceCategoryResponseWithTimezone,
  DealResponse,
  PropertyInfo,
  WifiInfo,
  UsefulNumbersResponse,
  OrdersResponse,
  ServiceOrder,
  CreateOrderRequest,
  DocumentUploadRequest,
  DocumentUploadResponse,
  DocumentListResponse,
  DocumentUrlResponse,
} from '@/types/stay';

/**
 * Generic result type for all stay API calls.
 */
interface FetchResult<T> {
  data: T | null;
  error: string | null;
}

/**
 * Generic fetch wrapper for authenticated stay API routes.
 *
 * Sends GET request with Bearer token in Authorization header.
 * Returns { data, error } shape for consistent error handling.
 */
async function fetchStayAPI<T>(path: string, token: string): Promise<FetchResult<T>> {
  try {
    const res = await fetch(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return {
        data: null,
        error: json.error || `Request failed (${res.status})`,
      };
    }

    const json = await res.json();

    if (json.error) {
      return { data: null, error: json.error };
    }

    return { data: json.data as T, error: null };
  } catch {
    return { data: null, error: 'Network error. Please check your connection.' };
  }
}

/**
 * Generic POST wrapper for authenticated stay API routes.
 *
 * Sends POST request with Bearer token and JSON body.
 * Returns { data, error } shape for consistent error handling.
 */
async function postStayAPI<T>(path: string, token: string, body: unknown): Promise<FetchResult<T>> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return {
        data: null,
        error: json.error || `Request failed (${res.status})`,
      };
    }

    const json = await res.json();

    if (json.error) {
      return { data: null, error: json.error };
    }

    return { data: json.data as T, error: null };
  } catch {
    return { data: null, error: 'Network error. Please check your connection.' };
  }
}

/**
 * Fetch service categories with items for a stay.
 * GET /api/stay/[code]/services
 */
export function fetchServices(
  code: string,
  token: string
): Promise<FetchResult<ServiceCategoryResponseWithTimezone>> {
  return fetchStayAPI<ServiceCategoryResponseWithTimezone>(`/api/stay/${code}/services`, token);
}

/**
 * Fetch local deals for a stay.
 * GET /api/stay/[code]/deals
 */
export function fetchDeals(code: string, token: string): Promise<FetchResult<DealResponse[]>> {
  return fetchStayAPI<DealResponse[]>(`/api/stay/${code}/deals`, token);
}

/**
 * Fetch property info and WiFi credentials for a stay.
 * GET /api/stay/[code]/property
 */
export function fetchProperty(
  code: string,
  token: string
): Promise<FetchResult<{ property: PropertyInfo; wifi: WifiInfo }>> {
  return fetchStayAPI<{ property: PropertyInfo; wifi: WifiInfo }>(
    `/api/stay/${code}/property`,
    token
  );
}

/**
 * Fetch useful numbers (emergency, city, property contact) for a stay.
 * GET /api/stay/[code]/useful-numbers
 */
export function fetchUsefulNumbers(
  code: string,
  token: string
): Promise<FetchResult<UsefulNumbersResponse>> {
  return fetchStayAPI<UsefulNumbersResponse>(`/api/stay/${code}/useful-numbers`, token);
}

/**
 * Fetch all orders for a booking.
 * GET /api/stay/[code]/orders
 */
export function fetchOrdersAPI(
  bookingCode: string,
  token: string
): Promise<FetchResult<OrdersResponse>> {
  return fetchStayAPI<OrdersResponse>(`/api/stay/${bookingCode}/orders`, token);
}

/**
 * Create a new service order.
 * POST /api/stay/[code]/orders
 */
export function createOrderAPI(
  bookingCode: string,
  token: string,
  order: CreateOrderRequest
): Promise<FetchResult<{ order: ServiceOrder }>> {
  return postStayAPI<{ order: ServiceOrder }>(`/api/stay/${bookingCode}/orders`, token, order);
}

/**
 * Create a minibar consumption order (self-service honor system).
 * POST /api/stay/[code]/orders
 *
 * Convenience wrapper that sends minibar items as a standard order.
 * The API auto-detects self_service category and sets minibar flags.
 */
export function createMinibarOrder(
  bookingCode: string,
  token: string,
  items: { serviceItemId: string; quantity: number }[]
): Promise<FetchResult<{ order: ServiceOrder }>> {
  return postStayAPI<{ order: ServiceOrder }>(`/api/stay/${bookingCode}/orders`, token, { items });
}

/**
 * Fetch a single order by ID.
 * GET /api/stay/[code]/orders/[orderId]
 */
export function fetchOrderStatusAPI(
  bookingCode: string,
  token: string,
  orderId: string
): Promise<FetchResult<{ order: ServiceOrder }>> {
  return fetchStayAPI<{ order: ServiceOrder }>(`/api/stay/${bookingCode}/orders/${orderId}`, token);
}

/**
 * Generic DELETE wrapper for authenticated stay API routes.
 */
async function deleteStayAPI<T>(path: string, token: string): Promise<FetchResult<T>> {
  try {
    const res = await fetch(path, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return {
        data: null,
        error: json.error || `Request failed (${res.status})`,
      };
    }

    const json = await res.json();

    if (json.error) {
      return { data: null, error: json.error };
    }

    return { data: json.data as T, error: null };
  } catch {
    return { data: null, error: 'Network error. Please check your connection.' };
  }
}

// --- Document API functions (Phase 28) ---

/**
 * Request a signed upload URL for a guest document.
 * POST /api/stay/[code]/documents/upload-url
 */
export function requestDocumentUploadUrl(
  code: string,
  token: string,
  body: DocumentUploadRequest
): Promise<FetchResult<DocumentUploadResponse>> {
  return postStayAPI<DocumentUploadResponse>(`/api/stay/${code}/documents/upload-url`, token, body);
}

/**
 * Confirm a document upload (update file size).
 * POST /api/stay/[code]/documents
 */
export function confirmDocumentUpload(
  code: string,
  token: string,
  body: { docId: string; fileSizeBytes: number }
): Promise<FetchResult<{ success: boolean }>> {
  return postStayAPI<{ success: boolean }>(`/api/stay/${code}/documents`, token, body);
}

/**
 * Fetch all documents for a booking.
 * GET /api/stay/[code]/documents
 */
export function fetchDocuments(
  code: string,
  token: string
): Promise<FetchResult<DocumentListResponse>> {
  return fetchStayAPI<DocumentListResponse>(`/api/stay/${code}/documents`, token);
}

/**
 * Fetch a signed download URL for a specific document.
 * GET /api/stay/[code]/documents/[docId]
 */
export function fetchDocumentUrl(
  code: string,
  token: string,
  docId: string
): Promise<FetchResult<DocumentUrlResponse>> {
  return fetchStayAPI<DocumentUrlResponse>(`/api/stay/${code}/documents/${docId}`, token);
}

/**
 * Delete a guest document.
 * DELETE /api/stay/[code]/documents/[docId]
 */
export function deleteDocument(
  code: string,
  token: string,
  docId: string
): Promise<FetchResult<{ success: boolean }>> {
  return deleteStayAPI<{ success: boolean }>(`/api/stay/${code}/documents/${docId}`, token);
}
