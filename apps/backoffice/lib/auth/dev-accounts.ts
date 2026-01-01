/**
 * Development Test Accounts
 *
 * These accounts are ONLY available in development mode.
 * They provide quick access to test different user roles without real authentication.
 *
 * SECURITY: This file should only be used when NODE_ENV === 'development'
 *
 * @module lib/auth/dev-accounts
 */

import type { AuthUser } from './types';
import { ROLE_PERMISSIONS } from './permissions';

/**
 * Check if dev mode is enabled
 *
 * Dev mode is only available when:
 * 1. NODE_ENV is 'development'
 * 2. NEXT_PUBLIC_ENABLE_DEV_AUTH is 'true' (optional, defaults to true in dev)
 */
export function isDevModeEnabled(): boolean {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return false;
  }

  // Allow explicit disable via env var
  if (process.env.NEXT_PUBLIC_ENABLE_DEV_AUTH === 'false') {
    return false;
  }

  return true;
}

/**
 * Development test accounts for quick role switching
 *
 * These accounts simulate different user roles for testing purposes.
 * Each account has pre-configured permissions matching their role.
 */
export const DEV_ACCOUNTS: AuthUser[] = [
  {
    id: 'dev-gudbro-owner',
    email: 'admin@gudbro.com',
    name: 'GudBro Admin',
    role: 'gudbro_owner',
    isGudBroAdmin: true,
    permissions: ROLE_PERMISSIONS.gudbro_owner,
  },
  {
    id: 'dev-business-owner',
    email: 'mario@cafferossi.it',
    name: 'Mario Rossi',
    role: 'business_owner',
    organizationId: 'org-caffe-rossi',
    permissions: ROLE_PERMISSIONS.business_owner,
  },
  {
    id: 'dev-manager',
    email: 'luigi@cafferossi.it',
    name: 'Luigi Bianchi',
    role: 'manager',
    organizationId: 'org-caffe-rossi',
    permissions: ROLE_PERMISSIONS.manager,
  },
  {
    id: 'dev-staff',
    email: 'anna@cafferossi.it',
    name: 'Anna Verdi',
    role: 'staff',
    organizationId: 'org-caffe-rossi',
    permissions: ROLE_PERMISSIONS.staff,
  },
];

/**
 * Get a dev account by ID
 */
export function getDevAccountById(accountId: string): AuthUser | undefined {
  if (!isDevModeEnabled()) {
    return undefined;
  }
  return DEV_ACCOUNTS.find(a => a.id === accountId);
}

/**
 * Dev session cookie configuration
 */
export const DEV_SESSION_CONFIG = {
  name: 'gudbro_dev_session',
  maxAge: 86400, // 24 hours
  path: '/',
  // Note: In production, these would be more restrictive
  // For dev mode, we keep them relaxed for easier testing
  sameSite: 'lax' as const,
} as const;
