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
 * Dev access PIN
 * Simple protection during development phase.
 * Will be replaced with proper auth before production.
 */
export const DEV_ACCESS_PIN = '260775';

/**
 * Check if dev mode is enabled
 *
 * During development phase, dev mode is always available.
 * A simple PIN is required to access dev accounts.
 *
 * Control via env var:
 * - NEXT_PUBLIC_ENABLE_DEV_AUTH=true  → Enable dev mode (even in production)
 * - NEXT_PUBLIC_ENABLE_DEV_AUTH=false → Disable dev mode
 * - Not set → Enable in development, disable in production
 */
export function isDevModeEnabled(): boolean {
  // Explicit enable via env var (for testing on staging/production)
  if (process.env.NEXT_PUBLIC_ENABLE_DEV_AUTH === 'true') {
    return true;
  }

  // Explicit disable via env var
  if (process.env.NEXT_PUBLIC_ENABLE_DEV_AUTH === 'false') {
    return false;
  }

  // Default: disable in production, enable in development
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  return true;
}

/**
 * Validate dev access PIN
 */
export function validateDevPin(pin: string): boolean {
  return pin === DEV_ACCESS_PIN;
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
  return DEV_ACCOUNTS.find((a) => a.id === accountId);
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
