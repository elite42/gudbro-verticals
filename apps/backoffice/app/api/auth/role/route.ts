/**
 * API Route: Get User Role
 *
 * Fetches the user's role and permissions from the database.
 * Maps database permissions to backoffice UserRole.
 *
 * @route GET /api/auth/role
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

// Map database permissions to backoffice UserRole
type BackofficeRole = 'staff' | 'manager' | 'business_owner' | 'gudbro_owner';

interface RoleResponse {
  success: boolean;
  role: BackofficeRole;
  permissions: string[];
  accountId?: string;
  tenantId?: string;
  roleTitle?: string;
  error?: string;
}

export async function GET(): Promise<NextResponse<RoleResponse>> {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          role: 'staff',
          permissions: [],
          error: 'Not authenticated',
        },
        { status: 401 }
      );
    }

    // Get account by auth_id
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (accountError || !account) {
      // User has Supabase auth but no account yet - treat as new user
      return NextResponse.json({
        success: true,
        role: 'staff',
        permissions: ['content:read', 'orders:read'],
        error: 'No account found - please complete onboarding',
      });
    }

    // Get user's merchant role (prioritize merchant role for backoffice)
    const { data: roles, error: rolesError } = await supabase
      .from('account_roles')
      .select('*')
      .eq('account_id', account.id)
      .eq('is_active', true)
      .order('is_primary', { ascending: false });

    if (rolesError) {
      console.error('Error fetching roles:', rolesError);
      return NextResponse.json(
        {
          success: false,
          role: 'staff',
          permissions: [],
          error: 'Failed to fetch roles',
        },
        { status: 500 }
      );
    }

    // Find the most relevant role for backoffice
    // Priority: admin > merchant (with is_owner) > merchant (with staff_manage) > merchant > consumer
    let selectedRole = null;
    let backofficeRole: BackofficeRole = 'staff';
    const permissionsList: string[] = [];

    // Check for admin role first (gudbro_owner)
    const adminRole = roles?.find((r) => r.role_type === 'admin');
    if (adminRole) {
      selectedRole = adminRole;
      backofficeRole = 'gudbro_owner';
      // Admin gets all permissions
      permissionsList.push(
        'content:read',
        'content:write',
        'content:delete',
        'orders:read',
        'orders:manage',
        'analytics:read',
        'analytics:export',
        'team:read',
        'team:manage',
        'team:invite',
        'billing:read',
        'billing:manage',
        'settings:read',
        'settings:manage',
        'platform:read',
        'platform:manage',
        'platform:merchants',
        'platform:revenue',
        'platform:support'
      );
    } else {
      // Check merchant roles
      const merchantRoles = roles?.filter((r) => r.role_type === 'merchant') || [];

      if (merchantRoles.length > 0) {
        // Find the highest permission role
        const ownerRole = merchantRoles.find((r) => r.permissions?.is_owner === true);
        const managerRole = merchantRoles.find((r) => r.permissions?.staff_manage === true);

        if (ownerRole) {
          selectedRole = ownerRole;
          backofficeRole = 'business_owner';
          permissionsList.push(
            'content:read',
            'content:write',
            'content:delete',
            'orders:read',
            'orders:manage',
            'analytics:read',
            'analytics:export',
            'team:read',
            'team:manage',
            'team:invite',
            'billing:read',
            'billing:manage',
            'settings:read',
            'settings:manage'
          );
        } else if (managerRole) {
          selectedRole = managerRole;
          backofficeRole = 'manager';
          permissionsList.push(
            'content:read',
            'content:write',
            'orders:read',
            'orders:manage',
            'analytics:read',
            'team:read',
            'settings:read'
          );
        } else {
          // Regular staff
          selectedRole = merchantRoles[0];
          backofficeRole = 'staff';

          // Map individual permissions from database
          const perms = selectedRole.permissions || {};
          if (perms.menu_view) permissionsList.push('content:read');
          if (perms.menu_edit) permissionsList.push('content:write');
          if (perms.orders_view) permissionsList.push('orders:read');
          if (perms.orders_manage) permissionsList.push('orders:manage');
          if (perms.analytics_view) permissionsList.push('analytics:read');
        }
      }
    }

    // If no merchant or admin role, user might just be a consumer
    if (!selectedRole) {
      return NextResponse.json({
        success: true,
        role: 'staff',
        permissions: ['content:read', 'orders:read'],
        error: 'No merchant access - contact your manager for an invitation',
      });
    }

    return NextResponse.json({
      success: true,
      role: backofficeRole,
      permissions: permissionsList,
      accountId: account.id,
      tenantId: selectedRole.tenant_id,
    });
  } catch (error) {
    console.error('Error in role API:', error);
    return NextResponse.json(
      {
        success: false,
        role: 'staff',
        permissions: [],
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
