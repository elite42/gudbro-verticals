'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/lib/supabase-browser';
import type { User } from '@supabase/supabase-js';

// Role hierarchy: gudbro_owner > business_owner > manager > staff
export type UserRole = 'gudbro_owner' | 'business_owner' | 'manager' | 'staff';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  // Business owner specific
  organizationId?: string;
  // GudBro owner specific
  isGudBroAdmin?: boolean;
  permissions: Permission[];
}

export type Permission =
  // Content
  | 'content:read'
  | 'content:write'
  | 'content:delete'
  // Orders
  | 'orders:read'
  | 'orders:manage'
  // Analytics
  | 'analytics:read'
  | 'analytics:export'
  // Team
  | 'team:read'
  | 'team:manage'
  | 'team:invite'
  // Billing
  | 'billing:read'
  | 'billing:manage'
  // Settings
  | 'settings:read'
  | 'settings:manage'
  // Platform (GudBro Owner only)
  | 'platform:read'
  | 'platform:manage'
  | 'platform:merchants'
  | 'platform:revenue'
  | 'platform:support';

// Permission sets by role
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  staff: [
    'content:read',
    'orders:read',
  ],
  manager: [
    'content:read',
    'content:write',
    'orders:read',
    'orders:manage',
    'analytics:read',
    'team:read',
    'settings:read',
  ],
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
  gudbro_owner: [
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
    'platform:support',
  ],
};

// Dev test accounts for easy switching
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

interface AuthContextType {
  user: AuthUser | null;
  supabaseUser: User | null;
  isLoading: boolean;
  isDevMode: boolean;
  // Auth methods
  signOut: () => Promise<void>;
  // Dev mode methods
  devLogin: (account: AuthUser) => void;
  devLogout: () => void;
  switchDevAccount: (accountId: string) => void;
  // Permission checks
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  isRole: (role: UserRole) => boolean;
  isAtLeastRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROLE_HIERARCHY: UserRole[] = ['staff', 'manager', 'business_owner', 'gudbro_owner'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);

  const supabase = createClient();

  // Check for dev session on mount
  useEffect(() => {
    const devSession = localStorage.getItem('gudbro_dev_session');
    if (devSession) {
      try {
        const parsed = JSON.parse(devSession);
        setUser(parsed);
        setIsDevMode(true);
        setIsLoading(false);
        return;
      } catch {
        localStorage.removeItem('gudbro_dev_session');
      }
    }

    // Check Supabase session
    checkSupabaseSession();
  }, []);

  const checkSupabaseSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSupabaseUser(session.user);
        // Map Supabase user to AuthUser
        // In production, fetch role from user_metadata or database
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          avatarUrl: session.user.user_metadata?.avatar_url,
          role: 'business_owner', // Default role, should come from DB
          permissions: ROLE_PERMISSIONS.business_owner,
        });
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    if (isDevMode) {
      devLogout();
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
    setSupabaseUser(null);
  };

  const devLogin = (account: AuthUser) => {
    const sessionData = JSON.stringify(account);
    localStorage.setItem('gudbro_dev_session', sessionData);
    // Set cookie for middleware
    document.cookie = `gudbro_dev_session=${encodeURIComponent(sessionData)}; path=/; max-age=86400`;
    setUser(account);
    setIsDevMode(true);
  };

  const devLogout = () => {
    localStorage.removeItem('gudbro_dev_session');
    // Clear cookie
    document.cookie = 'gudbro_dev_session=; path=/; max-age=0';
    setUser(null);
    setIsDevMode(false);
  };

  const switchDevAccount = (accountId: string) => {
    const account = DEV_ACCOUNTS.find(a => a.id === accountId);
    if (account) {
      devLogin(account);
      // Force page reload to update middleware context
      window.location.reload();
    }
  };

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
