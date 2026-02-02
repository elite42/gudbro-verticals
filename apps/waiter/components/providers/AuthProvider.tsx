'use client';

/**
 * Authentication Provider for Waiter PWA
 *
 * Provides staff authentication state and methods.
 * Supports Supabase auth and dev mode bypass.
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

// Dev session cookie name (matches middleware)
const DEV_SESSION_COOKIE = 'gudbro_dev_session';

export type UserRole = 'gudbro_owner' | 'business_owner' | 'manager' | 'staff';

export interface StaffUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  locationId?: string;
}

interface AuthContextType {
  user: StaffUser | null;
  isLoading: boolean;
  isDevMode: boolean;
  signOut: () => Promise<void>;
  devLogin: (user: StaffUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dev accounts for testing
export const DEV_ACCOUNTS: StaffUser[] = [
  {
    id: 'dev-staff-1',
    email: 'waiter@gudbro.dev',
    name: 'Mario Rossi',
    role: 'staff',
    locationId: 'loc-1',
  },
  {
    id: 'dev-manager-1',
    email: 'manager@gudbro.dev',
    name: 'Luigi Verdi',
    role: 'manager',
    locationId: 'loc-1',
  },
];

function isDevModeEnabled(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENABLE_DEV_AUTH === 'true';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StaffUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);

  const fetchUserRole = useCallback(async (supabaseUser: User): Promise<StaffUser> => {
    // TODO: Fetch actual role from database via API
    // For now, return basic mapping
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'Staff',
      avatarUrl: supabaseUser.user_metadata?.avatar_url,
      role: 'staff',
    };
  }, []);

  const checkSupabaseSession = useCallback(async () => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const staffUser = await fetchUserRole(session.user);
        setUser(staffUser);
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserRole]);

  useEffect(() => {
    // Check dev session first
    if (isDevModeEnabled()) {
      const devSession = localStorage.getItem(DEV_SESSION_COOKIE);
      if (devSession) {
        try {
          const parsed = JSON.parse(devSession) as StaffUser;
          if (parsed.id && parsed.email && parsed.role) {
            setUser(parsed);
            setIsDevMode(true);
            setIsLoading(false);
            return;
          }
        } catch {
          localStorage.removeItem(DEV_SESSION_COOKIE);
          document.cookie = `${DEV_SESSION_COOKIE}=; path=/; max-age=0`;
        }
      }
    }

    // Check Supabase session
    if (isSupabaseConfigured) {
      checkSupabaseSession();

      const { data: { subscription } } = supabase!.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const staffUser = await fetchUserRole(session.user);
          setUser(staffUser);
        } else if (!isDevMode) {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, [checkSupabaseSession, fetchUserRole, isDevMode]);

  const signOut = async () => {
    if (isDevMode) {
      localStorage.removeItem(DEV_SESSION_COOKIE);
      document.cookie = `${DEV_SESSION_COOKIE}=; path=/; max-age=0`;
      setUser(null);
      setIsDevMode(false);
      return;
    }

    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const devLogin = (account: StaffUser) => {
    if (!isDevModeEnabled()) {
      console.warn('Dev login attempted in production mode');
      return;
    }

    const sessionData = JSON.stringify(account);
    localStorage.setItem(DEV_SESSION_COOKIE, sessionData);
    document.cookie = `${DEV_SESSION_COOKIE}=${encodeURIComponent(sessionData)}; path=/; max-age=86400; SameSite=Lax`;

    setUser(account);
    setIsDevMode(true);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isDevMode, signOut, devLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
