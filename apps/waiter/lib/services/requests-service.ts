/**
 * Requests Service
 *
 * API calls for managing customer requests.
 * Calls backoffice API endpoints.
 */

import { getBackofficeApiUrl } from '@/lib/supabase';
import type { CustomerRequest, RequestStatus } from '@/lib/stores/requests-store';

const API_URL = getBackofficeApiUrl();

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Fetch requests for the current staff member
 */
export async function fetchRequests(locationId: string): Promise<ApiResponse<CustomerRequest[]>> {
  try {
    const response = await fetch(`${API_URL}/api/staff/self-assign`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.requests) {
      return {
        success: true,
        data: data.requests.map(mapApiRequestToRequest),
      };
    }

    return { success: true, data: [] };
  } catch (error) {
    console.error('Error fetching requests:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch requests',
    };
  }
}

/**
 * Acknowledge a request (mark as being handled)
 */
export async function acknowledgeRequest(requestId: string): Promise<ApiResponse<CustomerRequest>> {
  try {
    const response = await fetch(`${API_URL}/api/requests/action`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId,
        action: 'acknowledge',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        data: data.request ? mapApiRequestToRequest(data.request) : undefined,
      };
    }

    return { success: false, error: data.error || 'Failed to acknowledge request' };
  } catch (error) {
    console.error('Error acknowledging request:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to acknowledge request',
    };
  }
}

/**
 * Complete a request (mark as done)
 */
export async function completeRequest(requestId: string): Promise<ApiResponse<CustomerRequest>> {
  try {
    const response = await fetch(`${API_URL}/api/requests/action`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId,
        action: 'complete',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        data: data.request ? mapApiRequestToRequest(data.request) : undefined,
      };
    }

    return { success: false, error: data.error || 'Failed to complete request' };
  } catch (error) {
    console.error('Error completing request:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to complete request',
    };
  }
}

/**
 * Self-assign to a table via QR code
 */
export async function selfAssignToTable(tableId: string): Promise<ApiResponse<{ tableNumber: string }>> {
  try {
    const response = await fetch(`${API_URL}/api/staff/self-assign`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tableId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        data: { tableNumber: data.tableNumber || data.table?.number || 'Unknown' },
      };
    }

    return { success: false, error: data.error || 'Failed to assign to table' };
  } catch (error) {
    console.error('Error assigning to table:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to assign to table',
    };
  }
}

// Map API response to our CustomerRequest type
function mapApiRequestToRequest(apiRequest: Record<string, unknown>): CustomerRequest {
  return {
    id: String(apiRequest.id || ''),
    locationId: String(apiRequest.location_id || apiRequest.locationId || ''),
    tableId: String(apiRequest.table_id || apiRequest.tableId || ''),
    tableNumber: String(apiRequest.table_number || apiRequest.tableNumber || (apiRequest.table as Record<string, unknown>)?.number || ''),
    type: mapRequestType(apiRequest.action_type || apiRequest.type),
    status: mapRequestStatus(apiRequest.status),
    priority: mapRequestPriority(apiRequest.priority),
    message: apiRequest.message as string | undefined,
    createdAt: String(apiRequest.created_at || apiRequest.createdAt || new Date().toISOString()),
    acknowledgedAt: apiRequest.acknowledged_at as string | undefined,
    acknowledgedBy: apiRequest.acknowledged_by as string | undefined,
    completedAt: apiRequest.completed_at as string | undefined,
    completedBy: apiRequest.completed_by as string | undefined,
  };
}

function mapRequestType(type: unknown): CustomerRequest['type'] {
  const typeMap: Record<string, CustomerRequest['type']> = {
    call_waiter: 'call_waiter',
    request_bill: 'request_bill',
    need_help: 'need_help',
    order_ready: 'order_ready',
  };
  return typeMap[String(type)] || 'custom';
}

function mapRequestStatus(status: unknown): RequestStatus {
  const statusMap: Record<string, RequestStatus> = {
    pending: 'pending',
    acknowledged: 'acknowledged',
    in_progress: 'in_progress',
    completed: 'completed',
    cancelled: 'cancelled',
  };
  return statusMap[String(status)] || 'pending';
}

function mapRequestPriority(priority: unknown): CustomerRequest['priority'] {
  const priorityMap: Record<string, CustomerRequest['priority']> = {
    low: 'low',
    normal: 'normal',
    high: 'high',
    urgent: 'urgent',
  };
  return priorityMap[String(priority)] || 'normal';
}
