/**
 * Role-Based Permission Configuration
 *
 * Defines which permissions are granted to each role.
 * Permissions follow the principle of least privilege.
 *
 * @module lib/auth/permissions
 */

import type { UserRole, Permission } from './types';

/**
 * Permission sets by role
 *
 * Each role has a specific set of permissions. Higher roles
 * include all permissions of lower roles plus additional ones.
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  /**
   * Staff role - Basic read access
   * Intended for: waiters, cashiers, kitchen staff
   */
  staff: [
    'content:read',
    'orders:read',
  ],

  /**
   * Manager role - Content and order management
   * Intended for: shift managers, floor managers
   */
  manager: [
    'content:read',
    'content:write',
    'orders:read',
    'orders:manage',
    'analytics:read',
    'team:read',
    'settings:read',
  ],

  /**
   * Business Owner role - Full organization access
   * Intended for: restaurant owners, franchise operators
   */
  business_owner: [
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
  ],

  /**
   * GudBro Owner role - Platform administration
   * Intended for: GudBro platform administrators
   */
  gudbro_owner: [
    // All business_owner permissions
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
    // Platform-specific permissions
    'platform:read',
    'platform:manage',
    'platform:merchants',
    'platform:revenue',
    'platform:support',
  ],
};

/**
 * Role hierarchy from lowest to highest privilege
 * Used for "at least role" checks
 */
export const ROLE_HIERARCHY: UserRole[] = [
  'staff',
  'manager',
  'business_owner',
  'gudbro_owner',
];

/**
 * Get permissions for a specific role
 */
export function getPermissionsForRole(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Check if a role is at least as privileged as another
 */
export function isRoleAtLeast(userRole: UserRole, requiredRole: UserRole): boolean {
  const userRoleIndex = ROLE_HIERARCHY.indexOf(userRole);
  const requiredRoleIndex = ROLE_HIERARCHY.indexOf(requiredRole);
  return userRoleIndex >= requiredRoleIndex;
}
