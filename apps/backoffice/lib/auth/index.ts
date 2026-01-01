/**
 * Authentication Module
 *
 * This module provides role-based access control (RBAC) for the GudBro backoffice.
 *
 * ## Architecture
 *
 * - `types.ts` - Type definitions for users, roles, and permissions
 * - `permissions.ts` - Role-permission mappings and hierarchy
 * - `dev-accounts.ts` - Development mode test accounts (dev only)
 * - `AuthContext.tsx` - React context provider for auth state
 *
 * ## Usage
 *
 * ```tsx
 * import { useAuth } from '@/lib/auth';
 *
 * function MyComponent() {
 *   const { user, hasPermission, isAtLeastRole } = useAuth();
 *
 *   if (!hasPermission('content:write')) {
 *     return <AccessDenied />;
 *   }
 *
 *   return <Editor />;
 * }
 * ```
 *
 * ## Role Hierarchy
 *
 * 1. `staff` - Read-only access to content and orders
 * 2. `manager` - Can manage content and orders
 * 3. `business_owner` - Full access to their organization
 * 4. `gudbro_owner` - Platform administration access
 *
 * @module lib/auth
 */

// Types
export type { UserRole, Permission, AuthUser, AuthContextType } from './types';

// Permissions
export { ROLE_PERMISSIONS, ROLE_HIERARCHY, getPermissionsForRole, isRoleAtLeast } from './permissions';

// Dev accounts (only use in development)
export {
  DEV_ACCOUNTS,
  DEV_ACCESS_PIN,
  isDevModeEnabled,
  validateDevPin,
  getDevAccountById,
  DEV_SESSION_CONFIG
} from './dev-accounts';

// Context - re-export from contexts folder
export { AuthProvider, useAuth } from '../contexts/AuthContext';
