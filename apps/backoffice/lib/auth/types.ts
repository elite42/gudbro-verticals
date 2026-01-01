/**
 * Authentication Types
 *
 * Centralized type definitions for the role-based access control (RBAC) system.
 * This file contains all types related to users, roles, and permissions.
 *
 * @module lib/auth/types
 */

/**
 * User roles in hierarchical order (lowest to highest privilege)
 *
 * Role Hierarchy:
 * - staff: Basic access, read-only for most features
 * - manager: Can manage content and orders, limited team visibility
 * - business_owner: Full access to their organization
 * - gudbro_owner: Platform admin with cross-organization access
 */
export type UserRole = 'gudbro_owner' | 'business_owner' | 'manager' | 'staff';

/**
 * Permission types following resource:action pattern
 *
 * Convention: {resource}:{action}
 * - read: View access
 * - write: Create/update access
 * - delete: Delete access
 * - manage: Full CRUD + special actions
 * - export: Export data
 * - invite: Send invitations
 */
export type Permission =
  // Content management
  | 'content:read'
  | 'content:write'
  | 'content:delete'
  // Order management
  | 'orders:read'
  | 'orders:manage'
  // Analytics
  | 'analytics:read'
  | 'analytics:export'
  // Team management
  | 'team:read'
  | 'team:manage'
  | 'team:invite'
  // Billing
  | 'billing:read'
  | 'billing:manage'
  // Settings
  | 'settings:read'
  | 'settings:manage'
  // Platform administration (GudBro Owner only)
  | 'platform:read'
  | 'platform:manage'
  | 'platform:merchants'
  | 'platform:revenue'
  | 'platform:support';

/**
 * Authenticated user data structure
 */
export interface AuthUser {
  /** Unique user identifier */
  id: string;
  /** User email address */
  email: string;
  /** Display name */
  name: string;
  /** Profile picture URL */
  avatarUrl?: string;
  /** User's role in the system */
  role: UserRole;
  /** Organization ID for business users */
  organizationId?: string;
  /** Whether user is a GudBro platform administrator */
  isGudBroAdmin?: boolean;
  /** List of granted permissions */
  permissions: Permission[];
}

/**
 * Auth context state and methods
 */
export interface AuthContextType {
  /** Current authenticated user (null if not authenticated) */
  user: AuthUser | null;
  /** Raw Supabase user object */
  supabaseUser: import('@supabase/supabase-js').User | null;
  /** Whether auth state is being loaded */
  isLoading: boolean;
  /** Whether running in development mode with test accounts */
  isDevMode: boolean;

  // Auth methods
  /** Sign out current user */
  signOut: () => Promise<void>;

  // Dev mode methods (only available in development)
  /** Login with a dev test account */
  devLogin: (account: AuthUser) => void;
  /** Logout from dev mode */
  devLogout: () => void;
  /** Switch between dev accounts */
  switchDevAccount: (accountId: string) => void;

  // Permission checks
  /** Check if user has a specific permission */
  hasPermission: (permission: Permission) => boolean;
  /** Check if user has any of the specified permissions */
  hasAnyPermission: (permissions: Permission[]) => boolean;
  /** Check if user has all specified permissions */
  hasAllPermissions: (permissions: Permission[]) => boolean;
  /** Check if user has exact role */
  isRole: (role: UserRole) => boolean;
  /** Check if user has role at or above specified level */
  isAtLeastRole: (role: UserRole) => boolean;
}
