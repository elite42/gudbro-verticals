/**
 * Audit Logs API
 *
 * GET /api/audit-logs - Get audit logs for the current merchant
 */

import { createClient } from '@/lib/supabase-server';
import { getSession } from '@/lib/supabase-server';
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
  AuthorizationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

export const GET = withErrorHandling(
  async (request: Request) => {
    const session = await getSession();

    if (!session?.user) {
      throw new AuthenticationError();
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const action = searchParams.get('action');

    const supabase = createClient();

    // Get user's merchant
    const { data: merchantUser } = await supabase
      .from('merchant_users')
      .select('merchant_id, role')
      .eq('user_id', session.user.id)
      .single();

    // Only allow owners/admins to view audit logs
    if (!merchantUser || !['owner', 'admin'].includes(merchantUser.role)) {
      throw new AuthorizationError('Only owners and admins can view audit logs');
    }

    // Fetch audit logs
    let query = supabase
      .from('audit_logs')
      .select('*', { count: 'exact' })
      .eq('merchant_id', merchantUser.merchant_id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (action) {
      query = query.eq('action', action);
    }

    const { data: logs, error, count } = await query;

    if (error) {
      throw new DatabaseError('Failed to fetch audit logs', { cause: error });
    }

    return successResponse({
      logs: logs || [],
      total: count || 0,
      limit,
      offset,
    });
  },
  { context: 'audit-logs', logger: backofficeLogger }
);
