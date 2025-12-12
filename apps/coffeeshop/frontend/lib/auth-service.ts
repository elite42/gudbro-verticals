/**
 * GudBro Authentication Service
 *
 * Handles user authentication via Supabase:
 * - Email/Password signup & login
 * - Social OAuth (Google, Apple, Facebook)
 * - Session management
 * - Profile sync
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { userProfileStore } from './user-profile-store';
import { preferencesStore } from './user-preferences';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
  needsEmailVerification?: boolean;
}

/**
 * Convert Supabase User to AuthUser
 */
function toAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.name || user.user_metadata?.full_name,
    avatarUrl: user.user_metadata?.avatar_url,
    isEmailVerified: !!user.email_confirmed_at,
  };
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  name?: string
): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase non configurato' };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          full_name: name,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    if (data.user) {
      // Check if email confirmation is required
      if (!data.user.email_confirmed_at && data.session === null) {
        return {
          success: true,
          user: toAuthUser(data.user),
          needsEmailVerification: true,
        };
      }

      // Sync local profile
      syncLocalProfile(data.user);

      return { success: true, user: toAuthUser(data.user) };
    }

    return { success: false, error: 'Errore durante la registrazione' };
  } catch (err) {
    console.error('SignUp error:', err);
    return { success: false, error: 'Si è verificato un errore. Riprova.' };
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase non configurato' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    if (data.user) {
      // Sync local profile
      syncLocalProfile(data.user);

      return { success: true, user: toAuthUser(data.user) };
    }

    return { success: false, error: 'Credenziali non valide' };
  } catch (err) {
    console.error('SignIn error:', err);
    return { success: false, error: 'Si è verificato un errore. Riprova.' };
  }
}

/**
 * Sign in with OAuth provider
 */
export async function signInWithOAuth(
  provider: 'google' | 'apple' | 'facebook'
): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase non configurato' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: provider === 'google' ? {
          access_type: 'offline',
          prompt: 'consent',
        } : undefined,
      },
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    // OAuth redirects, so we don't get immediate result
    // The callback page will handle the session
    return { success: true };
  } catch (err) {
    console.error('OAuth error:', err);
    return { success: false, error: `Errore con ${provider}. Riprova.` };
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    // Clear local data even without Supabase
    userProfileStore.set({ email: undefined, isRegistered: false });
    return { success: true };
  }

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    // Clear local profile data
    userProfileStore.set({ email: undefined, isRegistered: false });

    return { success: true };
  } catch (err) {
    console.error('SignOut error:', err);
    return { success: false, error: 'Errore durante il logout' };
  }
}

/**
 * Get current session
 */
export async function getCurrentSession(): Promise<Session | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (err) {
    console.error('GetSession error:', err);
    return null;
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user ? toAuthUser(user) : null;
  } catch (err) {
    console.error('GetUser error:', err);
    return null;
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase non configurato' };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    return { success: true };
  } catch (err) {
    console.error('Password reset error:', err);
    return { success: false, error: 'Errore durante l\'invio. Riprova.' };
  }
}

/**
 * Sync Supabase user to local profile store
 */
function syncLocalProfile(user: User) {
  userProfileStore.set({
    email: user.email,
    name: user.user_metadata?.name || user.user_metadata?.full_name,
    isRegistered: true,
  });

  // Sync preferences to Supabase profile (future)
  // This will be handled by the gudbro_user_profiles table trigger
}

/**
 * Sync local preferences to Supabase profile
 */
export async function syncPreferencesToCloud(): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    const session = await getCurrentSession();
    if (!session?.user) return;

    const preferences = preferencesStore.get();

    await supabase.from('gudbro_user_profiles').update({
      allergens_to_avoid: preferences.allergens_to_avoid,
      intolerances: preferences.intolerances,
      dietary_preferences: preferences.dietary_preferences,
      updated_at: new Date().toISOString(),
    }).eq('id', session.user.id);
  } catch (err) {
    console.error('Sync preferences error:', err);
  }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChange(
  callback: (user: AuthUser | null) => void
): () => void {
  if (!isSupabaseConfigured || !supabase) {
    return () => {};
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (session?.user) {
        syncLocalProfile(session.user);
        callback(toAuthUser(session.user));
      } else {
        callback(null);
      }
    }
  );

  return () => subscription.unsubscribe();
}

/**
 * Convert Supabase error to user-friendly message
 */
function getErrorMessage(error: AuthError): string {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Email o password non corretti';
    case 'Email not confirmed':
      return 'Conferma la tua email prima di accedere';
    case 'User already registered':
      return 'Esiste già un account con questa email';
    case 'Password should be at least 6 characters':
      return 'La password deve avere almeno 6 caratteri';
    case 'Unable to validate email address: invalid format':
      return 'Formato email non valido';
    case 'Email rate limit exceeded':
      return 'Troppi tentativi. Riprova tra qualche minuto';
    default:
      return error.message || 'Si è verificato un errore';
  }
}
