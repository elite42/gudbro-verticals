'use client';

/**
 * Authentication Context Provider
 *
 * Provides authentication state and methods throughout the application.
 * Supports both Supabase authentication and development mode test accounts.
 *
 * @module lib/contexts/AuthContext
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { createClient } from '@/lib/supabase-browser';
import type { User } from '@supabase/supabase-js';
import type { AuthUser, Permission, UserRole, AuthContextType } from '../auth/types';
import { ROLE_PERMISSIONS, ROLE_HIERARCHY } from '../auth/permissions';
import { DEV_ACCOUNTS, isDevModeEnabled, DEV_SESSION_CONFIG } from '../auth/dev-accounts';

// Re-export for convenience
export { DEV_ACCOUNTS } from '../auth/dev-accounts';
export type { AuthUser, Permission, UserRole } from '../auth/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Component
 *
 * Wraps the application to provide authentication state and methods.
 * Handles both Supabase auth and development mode bypass.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);

  const supabase = createClient();

  /**
   * Check Supabase session and map to AuthUser
   */
  const checkSupabaseSession = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSupabaseUser(session.user);
        // Map Supabase user to AuthUser
        // TODO: In production, fetch role from user_metadata or database
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          avatarUrl: session.user.user_metadata?.avatar_url,
          role: 'business_owner', // Default role - should come from DB
          permissions: ROLE_PERMISSIONS.business_owner,
        });
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase.auth]);

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    // Only check dev session if dev mode is enabled
    if (isDevModeEnabled()) {
      const devSession = localStorage.getItem(DEV_SESSION_CONFIG.name);
      if (devSession) {
        try {
          const parsed = JSON.parse(devSession) as AuthUser;
          // Validate parsed data has required fields
          if (parsed.id && parsed.email && parsed.role && parsed.permissions) {
            setUser(parsed);
            setIsDevMode(true);
            setIsLoading(false);
            return;
          }
        } catch {
          localStorage.removeItem(DEV_SESSION_CONFIG.name);
          // Clear invalid cookie
          document.cookie = `${DEV_SESSION_CONFIG.name}=; path=/; max-age=0`;
        }
      }
    }

    // Check Supabase session
    checkSupabaseSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          avatarUrl: session.user.user_metadata?.avatar_url,
          role: 'business_owner',
          permissions: ROLE_PERMISSIONS.business_owner,
        });
      } else {
        setSupabaseUser(null);
        if (!isDevMode) {
          setUser(null);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkSupabaseSession, supabase.auth, isDevMode]);

  /**
   * Sign out current user
   */
  const signOut = async () => {
    if (isDevMode) {
      devLogout();
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setSupabaseUser(null);
  };

  /**
   * Login with a dev test account
   * @security Only available when isDevModeEnabled() returns true
   */
  const devLogin = (account: AuthUser) => {
    if (!isDevModeEnabled()) {
      console.warn('Dev login attempted in production mode - ignoring');
      return;
    }

    const sessionData = JSON.stringify(account);
    localStorage.setItem(DEV_SESSION_CONFIG.name, sessionData);

    // Set cookie for middleware (with security flags)
    const cookieValue = encodeURIComponent(sessionData);
    document.cookie = `${DEV_SESSION_CONFIG.name}=${cookieValue}; path=${DEV_SESSION_CONFIG.path}; max-age=${DEV_SESSION_CONFIG.maxAge}; SameSite=${DEV_SESSION_CONFIG.sameSite}`;

    setUser(account);
    setIsDevMode(true);
  };

  /**
   * Logout from dev mode
   */
  const devLogout = () => {
    localStorage.removeItem(DEV_SESSION_CONFIG.name);
    // Clear cookie
    document.cookie = `${DEV_SESSION_CONFIG.name}=; path=${DEV_SESSION_CONFIG.path}; max-age=0`;
    setUser(null);
    setIsDevMode(false);
  };

  /**
   * Switch to a different dev account
   */
  const switchDevAccount = (accountId: string) => {
    if (!isDevModeEnabled()) {
      return;
    }

    const account = DEV_ACCOUNTS.find(a => a.id === accountId);
    if (account) {
      devLogin(account);
      // Force page reload to update middleware context
      window.location.reload();
    }
  };

  // Permission check helpers
  const hasPermission = (permission: Permission): boolean => {
    return user?.permissions.includes(permission) ?? false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(p => hasPermission(p));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(p => hasPermission(p));
  };

  const isRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const isAtLeastRole = (role: UserRole): boolean => {
    if (!user) return false;
    const userRoleIndex = ROLE_HIERARCHY.indexOf(user.role);
    const requiredRoleIndex = ROLE_HIERARCHY.indexOf(role);
    return userRoleIndex >= requiredRoleIndex;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        isLoading,
        isDevMode,
        signOut,
        devLogin,
        devLogout,
        switchDevAccount,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        isRole,
        isAtLeastRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication context
 *
 * @throws Error if used outside of AuthProvider
 *
 * @example
 * ```tsx
 * const { user, hasPermission } = useAuth();
 *
 * if (!hasPermission('content:write')) {
 *   return <AccessDenied />;
 * }
 * ```
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
