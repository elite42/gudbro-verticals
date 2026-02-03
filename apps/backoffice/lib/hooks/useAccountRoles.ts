/**
 * Hook to fetch and manage account roles from the unified account system
 *
 * Fetches roles from account_roles table and allows switching between them.
 *
 * @module lib/hooks/useAccountRoles
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useAuth } from '@/lib/contexts/AuthContext';

export interface AccountRole {
  id: string;
  role_type: 'consumer' | 'merchant' | 'admin' | 'contributor';
  tenant_id: string | null;
  tenant_type: 'merchant' | 'organization' | 'brand' | null;
  tenant_name?: string;
  is_primary: boolean;
  is_active: boolean;
  permissions: Record<string, boolean>;
}

export interface AccountWithRoles {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  total_points: number;
  loyalty_tier: string;
  roles: AccountRole[];
}

interface UseAccountRolesResult {
  account: AccountWithRoles | null;
  currentRole: AccountRole | null;
  roles: AccountRole[];
  isLoading: boolean;
  error: string | null;
  switchRole: (roleId: string) => void;
  refreshRoles: () => Promise<void>;
}

const CURRENT_ROLE_KEY = 'gudbro_current_role';

export function useAccountRoles(): UseAccountRolesResult {
  const { supabaseUser } = useAuth();
  const [account, setAccount] = useState<AccountWithRoles | null>(null);
  const [currentRole, setCurrentRole] = useState<AccountRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const fetchAccountRoles = useCallback(async () => {
    if (!supabaseUser?.id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch account by auth_id
      const { data: accountData, error: accountError } = await supabase
        .from('accounts')
        .select(
          `
          id,
          email,
          first_name,
          last_name,
          display_name,
          avatar_url,
          total_points,
          loyalty_tier
        `
        )
        .eq('auth_id', supabaseUser.id)
        .single();

      if (accountError) {
        // Account might not exist yet in the new system
        console.warn('[AccountRoles] Account not found:', accountError.message);
        setIsLoading(false);
        return;
      }

      // Fetch roles for this account
      const { data: rolesData, error: rolesError } = await supabase
        .from('account_roles')
        .select(
          `
          id,
          role_type,
          tenant_id,
          tenant_type,
          is_primary,
          is_active,
          permissions
        `
        )
        .eq('account_id', accountData.id)
        .eq('is_active', true);

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        setError('Failed to load roles');
        setIsLoading(false);
        return;
      }

      // Fetch tenant names for merchant roles
      const rolesWithTenantNames: AccountRole[] = await Promise.all(
        (rolesData || []).map(async (role) => {
          let tenantName: string | undefined;

          if (role.tenant_id && role.role_type === 'merchant') {
            const { data: merchantData } = await supabase
              .from('merchants')
              .select('name')
              .eq('id', role.tenant_id)
              .single();

            tenantName = merchantData?.name;
          }

          return {
            ...role,
            tenant_name: tenantName,
          };
        })
      );

      const accountWithRoles: AccountWithRoles = {
        ...accountData,
        roles: rolesWithTenantNames,
      };

      setAccount(accountWithRoles);

      // Restore current role from localStorage or use primary
      const savedRoleId = localStorage.getItem(CURRENT_ROLE_KEY);
      const savedRole = rolesWithTenantNames.find((r) => r.id === savedRoleId);
      const primaryRole = rolesWithTenantNames.find((r) => r.is_primary);
      const defaultRole = savedRole || primaryRole || rolesWithTenantNames[0] || null;

      setCurrentRole(defaultRole);
    } catch (err) {
      console.error('Error in useAccountRoles:', err);
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [supabaseUser?.id, supabase]);

  useEffect(() => {
    fetchAccountRoles();
  }, [fetchAccountRoles]);

  const switchRole = useCallback(
    (roleId: string) => {
      if (!account) return;

      const role = account.roles.find((r) => r.id === roleId);
      if (role) {
        setCurrentRole(role);
        localStorage.setItem(CURRENT_ROLE_KEY, roleId);

        // Update primary role in database
        supabase
          .from('account_roles')
          .update({ is_primary: true })
          .eq('id', roleId)
          .then(() => {
            // Reset other roles' is_primary
            account.roles
              .filter((r) => r.id !== roleId)
              .forEach((r) => {
                supabase.from('account_roles').update({ is_primary: false }).eq('id', r.id);
              });
          });
      }
    },
    [account, supabase]
  );

  const refreshRoles = useCallback(async () => {
    await fetchAccountRoles();
  }, [fetchAccountRoles]);

  return {
    account,
    currentRole,
    roles: account?.roles || [],
    isLoading,
    error,
    switchRole,
    refreshRoles,
  };
}
