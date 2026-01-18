/**
 * Audit Log Service
 *
 * Records security-relevant actions for compliance and monitoring.
 * All sensitive operations should be logged through this service.
 *
 * Usage:
 * ```ts
 * import { auditLog, AuditAction } from '@/lib/audit/audit-service';
 *
 * // In an API route or server action:
 * await auditLog.record({
 *   action: 'menu.item_update',
 *   userId: user.id,
 *   userEmail: user.email,
 *   resourceType: 'menu_item',
 *   resourceId: itemId,
 *   changes: { price: { old: 10, new: 15 } },
 *   merchantId: merchantId,
 *   request: req, // Optional: extracts IP and user agent
 * });
 * ```
 */

import { createClient } from '@/lib/supabase-server';
import { logger } from '@/lib/observability/logger';

/**
 * Valid audit actions
 */
export type AuditAction =
  // Authentication
  | 'auth.login'
  | 'auth.logout'
  | 'auth.login_failed'
  | 'auth.password_change'
  // Menu management
  | 'menu.item_create'
  | 'menu.item_update'
  | 'menu.item_delete'
  | 'menu.category_create'
  | 'menu.category_update'
  | 'menu.category_delete'
  // Order management
  | 'order.status_change'
  | 'order.cancel'
  | 'order.refund'
  // Settings
  | 'settings.update'
  | 'settings.payment_update'
  | 'settings.hours_update'
  // Team management
  | 'team.member_invite'
  | 'team.member_remove'
  | 'team.role_change'
  // QR codes
  | 'qr.create'
  | 'qr.update'
  | 'qr.delete'
  // AI actions
  | 'ai.suggestion_accept'
  | 'ai.suggestion_reject'
  | 'ai.task_delegate'
  // System
  | 'system.export_data'
  | 'system.bulk_update'
  | 'system.config_change';

/**
 * Audit log entry parameters
 */
export interface AuditLogParams {
  action: AuditAction;
  userId?: string;
  userEmail?: string;
  userRole?: string;
  resourceType?: string;
  resourceId?: string;
  changes?: Record<string, { old?: unknown; new?: unknown }>;
  metadata?: Record<string, unknown>;
  merchantId?: string;
  /** Pass the request to auto-extract IP and user agent */
  request?: Request;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Extract client IP from request headers
 */
function extractIpAddress(request?: Request): string | null {
  if (!request) return null;

  // Vercel/Cloudflare headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return null;
}

/**
 * Extract user agent from request
 */
function extractUserAgent(request?: Request): string | null {
  if (!request) return null;
  return request.headers.get('user-agent');
}

/**
 * Audit log service
 */
export const auditLog = {
  /**
   * Record an audit log entry
   */
  async record(params: AuditLogParams): Promise<string | null> {
    try {
      const supabase = createClient();

      const ipAddress = params.ipAddress || extractIpAddress(params.request);
      const userAgent = params.userAgent || extractUserAgent(params.request);

      const { data, error } = await supabase.rpc('record_audit_log', {
        p_action: params.action,
        p_user_id: params.userId || null,
        p_user_email: params.userEmail || null,
        p_user_role: params.userRole || null,
        p_resource_type: params.resourceType || null,
        p_resource_id: params.resourceId || null,
        p_changes: params.changes || null,
        p_metadata: params.metadata || {},
        p_ip_address: ipAddress,
        p_user_agent: userAgent,
        p_request_id: crypto.randomUUID(),
        p_merchant_id: params.merchantId || null,
      });

      if (error) {
        logger.error(
          {
            action: params.action,
            error: error.message,
          },
          'Failed to record audit log'
        );
        return null;
      }

      logger.info(
        {
          action: params.action,
          userId: params.userId,
          resourceType: params.resourceType,
          resourceId: params.resourceId,
        },
        'Audit log recorded'
      );

      return data as string;
    } catch (error) {
      logger.error(
        {
          action: params.action,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        'Audit log error'
      );
      return null;
    }
  },

  /**
   * Record authentication event
   */
  async auth(
    action: 'auth.login' | 'auth.logout' | 'auth.login_failed' | 'auth.password_change',
    params: {
      userId?: string;
      userEmail?: string;
      request?: Request;
      metadata?: Record<string, unknown>;
    }
  ): Promise<string | null> {
    return this.record({
      action,
      userId: params.userId,
      userEmail: params.userEmail,
      request: params.request,
      metadata: params.metadata,
    });
  },

  /**
   * Record menu change
   */
  async menu(
    action:
      | 'menu.item_create'
      | 'menu.item_update'
      | 'menu.item_delete'
      | 'menu.category_create'
      | 'menu.category_update'
      | 'menu.category_delete',
    params: {
      userId: string;
      userEmail?: string;
      resourceId: string;
      merchantId: string;
      changes?: Record<string, { old?: unknown; new?: unknown }>;
      request?: Request;
    }
  ): Promise<string | null> {
    return this.record({
      action,
      userId: params.userId,
      userEmail: params.userEmail,
      resourceType: action.includes('item') ? 'menu_item' : 'menu_category',
      resourceId: params.resourceId,
      merchantId: params.merchantId,
      changes: params.changes,
      request: params.request,
    });
  },

  /**
   * Record order change
   */
  async order(
    action: 'order.status_change' | 'order.cancel' | 'order.refund',
    params: {
      userId: string;
      userEmail?: string;
      orderId: string;
      merchantId: string;
      changes?: Record<string, { old?: unknown; new?: unknown }>;
      request?: Request;
    }
  ): Promise<string | null> {
    return this.record({
      action,
      userId: params.userId,
      userEmail: params.userEmail,
      resourceType: 'order',
      resourceId: params.orderId,
      merchantId: params.merchantId,
      changes: params.changes,
      request: params.request,
    });
  },

  /**
   * Record team change
   */
  async team(
    action: 'team.member_invite' | 'team.member_remove' | 'team.role_change',
    params: {
      userId: string;
      userEmail?: string;
      targetUserId: string;
      merchantId: string;
      changes?: Record<string, { old?: unknown; new?: unknown }>;
      request?: Request;
    }
  ): Promise<string | null> {
    return this.record({
      action,
      userId: params.userId,
      userEmail: params.userEmail,
      resourceType: 'user',
      resourceId: params.targetUserId,
      merchantId: params.merchantId,
      changes: params.changes,
      request: params.request,
    });
  },

  /**
   * Record settings change
   */
  async settings(
    action: 'settings.update' | 'settings.payment_update' | 'settings.hours_update',
    params: {
      userId: string;
      userEmail?: string;
      merchantId: string;
      changes?: Record<string, { old?: unknown; new?: unknown }>;
      request?: Request;
    }
  ): Promise<string | null> {
    return this.record({
      action,
      userId: params.userId,
      userEmail: params.userEmail,
      resourceType: 'merchant',
      resourceId: params.merchantId,
      merchantId: params.merchantId,
      changes: params.changes,
      request: params.request,
    });
  },
};

/**
 * Get recent audit logs for a merchant
 */
export async function getAuditLogs(
  merchantId: string,
  options: {
    limit?: number;
    offset?: number;
    action?: AuditAction;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
  } = {}
): Promise<{
  logs: AuditLogEntry[];
  total: number;
}> {
  const supabase = createClient();
  const { limit = 50, offset = 0, action, userId, startDate, endDate } = options;

  let query = supabase
    .from('audit_logs')
    .select('*', { count: 'exact' })
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (action) {
    query = query.eq('action', action);
  }

  if (userId) {
    query = query.eq('user_id', userId);
  }

  if (startDate) {
    query = query.gte('created_at', startDate.toISOString());
  }

  if (endDate) {
    query = query.lte('created_at', endDate.toISOString());
  }

  const { data, error, count } = await query;

  if (error) {
    logger.error({ error: error.message }, 'Failed to fetch audit logs');
    return { logs: [], total: 0 };
  }

  return {
    logs: (data || []) as AuditLogEntry[],
    total: count || 0,
  };
}

/**
 * Audit log entry from database
 */
export interface AuditLogEntry {
  id: string;
  user_id: string | null;
  user_email: string | null;
  user_role: string | null;
  action: AuditAction;
  resource_type: string | null;
  resource_id: string | null;
  changes: Record<string, { old?: unknown; new?: unknown }> | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
  request_id: string | null;
  merchant_id: string | null;
  created_at: string;
}
