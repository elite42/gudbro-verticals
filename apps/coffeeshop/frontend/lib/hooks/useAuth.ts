/**
 * useAuth Hook
 *
 * Hook per gestire lo stato di autenticazione nell'app.
 * Si integra con auth-service e user-profile-store.
 */

import { useState, useEffect, useCallback } from 'react';
import type { AuthUser } from '@/lib/auth-service';

interface UseAuthResult {
  /** Current authenticated user */
  user: AuthUser | null;

  /** Whether auth state is loading */
  isLoading: boolean;

  /** Whether user is authenticated */
  isAuthenticated: boolean;

  /** Sign out the current user */
  signOut: () => Promise<void>;

  /** Refresh auth state */
  refresh: () => Promise<void>;
}

/**
 * Hook to manage authentication state
 *
 * @example
 * ```tsx
 * function AccountPage() {
 *   const { user, isAuthenticated, signOut } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return <LoginPrompt />;
 *   }
 *
 *   return <Profile user={user} onLogout={signOut} />;
 * }
 * ```
 */
export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial auth state
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initAuth = async () => {
      try {
        const { getCurrentUser, onAuthStateChange } = await import('@/lib/auth-service');

        // Get current user
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // Subscribe to auth changes
        unsubscribe = onAuthStateChange((authUser) => {
          setUser(authUser);
        });
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      const { signOut } = await import('@/lib/auth-service');
      await signOut();
      setUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const { getCurrentUser } = await import('@/lib/auth-service');
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error('Refresh auth error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signOut: handleSignOut,
    refresh,
  };
}

export default useAuth;
