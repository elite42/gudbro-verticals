/**
 * Auth Service Tests
 *
 * Tests for authentication business logic:
 * - User type conversion
 * - Error message mapping
 * - Session validation
 * - Auth state management
 * - Email/password validation patterns
 */

import { describe, it, expect } from 'vitest';
import type { AuthUser, AuthResult } from '../auth-service';

// =====================================================
// EXTRACTED FUNCTIONS FOR TESTING
// (These mirror the internal functions from auth-service.ts)
// =====================================================

interface SupabaseUser {
  id: string;
  email?: string;
  email_confirmed_at?: string | null;
  user_metadata?: {
    name?: string;
    full_name?: string;
    avatar_url?: string;
  };
}

interface AuthError {
  message: string;
}

/**
 * Convert Supabase User to AuthUser (mirrors internal function)
 */
function toAuthUser(user: SupabaseUser): AuthUser {
  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.name || user.user_metadata?.full_name,
    avatarUrl: user.user_metadata?.avatar_url,
    isEmailVerified: !!user.email_confirmed_at,
  };
}

/**
 * Convert Supabase error to user-friendly message (mirrors internal function)
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

// =====================================================
// toAuthUser TESTS
// =====================================================

describe('toAuthUser', () => {
  describe('basic user conversion', () => {
    it('should convert user with all fields', () => {
      const supabaseUser: SupabaseUser = {
        id: 'user-123',
        email: 'test@example.com',
        email_confirmed_at: '2024-01-01T00:00:00Z',
        user_metadata: {
          name: 'Test User',
          full_name: 'Test Full Name',
          avatar_url: 'https://example.com/avatar.jpg',
        },
      };

      const authUser = toAuthUser(supabaseUser);

      expect(authUser.id).toBe('user-123');
      expect(authUser.email).toBe('test@example.com');
      expect(authUser.name).toBe('Test User'); // name takes precedence
      expect(authUser.avatarUrl).toBe('https://example.com/avatar.jpg');
      expect(authUser.isEmailVerified).toBe(true);
    });

    it('should handle user with minimal fields', () => {
      const supabaseUser: SupabaseUser = {
        id: 'user-456',
      };

      const authUser = toAuthUser(supabaseUser);

      expect(authUser.id).toBe('user-456');
      expect(authUser.email).toBe('');
      expect(authUser.name).toBeUndefined();
      expect(authUser.avatarUrl).toBeUndefined();
      expect(authUser.isEmailVerified).toBe(false);
    });
  });

  describe('email verification', () => {
    it('should mark as verified when email_confirmed_at is set', () => {
      const user: SupabaseUser = {
        id: '1',
        email_confirmed_at: '2024-01-01T00:00:00Z',
      };

      expect(toAuthUser(user).isEmailVerified).toBe(true);
    });

    it('should mark as unverified when email_confirmed_at is null', () => {
      const user: SupabaseUser = {
        id: '1',
        email_confirmed_at: null,
      };

      expect(toAuthUser(user).isEmailVerified).toBe(false);
    });

    it('should mark as unverified when email_confirmed_at is undefined', () => {
      const user: SupabaseUser = {
        id: '1',
      };

      expect(toAuthUser(user).isEmailVerified).toBe(false);
    });
  });

  describe('name extraction', () => {
    it('should prefer name over full_name', () => {
      const user: SupabaseUser = {
        id: '1',
        user_metadata: {
          name: 'Short Name',
          full_name: 'Full Long Name',
        },
      };

      expect(toAuthUser(user).name).toBe('Short Name');
    });

    it('should fallback to full_name when name is not set', () => {
      const user: SupabaseUser = {
        id: '1',
        user_metadata: {
          full_name: 'Full Long Name',
        },
      };

      expect(toAuthUser(user).name).toBe('Full Long Name');
    });

    it('should handle empty user_metadata', () => {
      const user: SupabaseUser = {
        id: '1',
        user_metadata: {},
      };

      expect(toAuthUser(user).name).toBeUndefined();
    });

    it('should handle undefined user_metadata', () => {
      const user: SupabaseUser = {
        id: '1',
      };

      expect(toAuthUser(user).name).toBeUndefined();
    });
  });

  describe('email handling', () => {
    it('should use email when provided', () => {
      const user: SupabaseUser = {
        id: '1',
        email: 'user@example.com',
      };

      expect(toAuthUser(user).email).toBe('user@example.com');
    });

    it('should use empty string when email is undefined', () => {
      const user: SupabaseUser = {
        id: '1',
        email: undefined,
      };

      expect(toAuthUser(user).email).toBe('');
    });
  });
});

// =====================================================
// getErrorMessage TESTS
// =====================================================

describe('getErrorMessage', () => {
  describe('known error messages', () => {
    it('should translate "Invalid login credentials"', () => {
      const error: AuthError = { message: 'Invalid login credentials' };
      expect(getErrorMessage(error)).toBe('Email o password non corretti');
    });

    it('should translate "Email not confirmed"', () => {
      const error: AuthError = { message: 'Email not confirmed' };
      expect(getErrorMessage(error)).toBe('Conferma la tua email prima di accedere');
    });

    it('should translate "User already registered"', () => {
      const error: AuthError = { message: 'User already registered' };
      expect(getErrorMessage(error)).toBe('Esiste già un account con questa email');
    });

    it('should translate "Password should be at least 6 characters"', () => {
      const error: AuthError = { message: 'Password should be at least 6 characters' };
      expect(getErrorMessage(error)).toBe('La password deve avere almeno 6 caratteri');
    });

    it('should translate "Unable to validate email address: invalid format"', () => {
      const error: AuthError = { message: 'Unable to validate email address: invalid format' };
      expect(getErrorMessage(error)).toBe('Formato email non valido');
    });

    it('should translate "Email rate limit exceeded"', () => {
      const error: AuthError = { message: 'Email rate limit exceeded' };
      expect(getErrorMessage(error)).toBe('Troppi tentativi. Riprova tra qualche minuto');
    });
  });

  describe('unknown error messages', () => {
    it('should return original message for unknown errors', () => {
      const error: AuthError = { message: 'Some unknown error' };
      expect(getErrorMessage(error)).toBe('Some unknown error');
    });

    it('should return default message for empty error', () => {
      const error: AuthError = { message: '' };
      expect(getErrorMessage(error)).toBe('Si è verificato un errore');
    });
  });
});

// =====================================================
// EMAIL VALIDATION PATTERNS
// =====================================================

describe('Email Validation Patterns', () => {
  // Common email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  describe('valid email formats', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.com',
      'user+tag@example.com',
      'test@subdomain.domain.com',
      'a@b.co',
      'test123@example.org',
      'TEST@EXAMPLE.COM',
      'user@example.co.uk',
    ];

    validEmails.forEach((email) => {
      it(`should accept "${email}"`, () => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });
  });

  describe('invalid email formats', () => {
    const invalidEmails = [
      '',
      'notanemail',
      '@example.com',
      'user@',
      'user@.com',
      'user@example',
      'user @example.com',
      'user@ example.com',
      'user@example .com',
    ];

    invalidEmails.forEach((email) => {
      it(`should reject "${email}"`, () => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });
});

// =====================================================
// PASSWORD STRENGTH VALIDATION
// =====================================================

describe('Password Validation', () => {
  // Supabase requires minimum 6 characters
  const MIN_PASSWORD_LENGTH = 6;

  function isPasswordValid(password: string): boolean {
    return password.length >= MIN_PASSWORD_LENGTH;
  }

  describe('minimum length', () => {
    it('should accept password with exactly 6 characters', () => {
      expect(isPasswordValid('123456')).toBe(true);
    });

    it('should accept password with more than 6 characters', () => {
      expect(isPasswordValid('password123')).toBe(true);
      expect(isPasswordValid('a'.repeat(100))).toBe(true);
    });

    it('should reject password with less than 6 characters', () => {
      expect(isPasswordValid('')).toBe(false);
      expect(isPasswordValid('12345')).toBe(false);
      expect(isPasswordValid('a')).toBe(false);
    });
  });

  describe('password strength scoring (optional enhancement)', () => {
    function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
      if (password.length < 6) return 'weak';

      let score = 0;

      // Length
      if (password.length >= 8) score++;
      if (password.length >= 12) score++;

      // Character variety
      if (/[a-z]/.test(password)) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^a-zA-Z0-9]/.test(password)) score++;

      if (score <= 2) return 'weak';
      if (score <= 4) return 'medium';
      return 'strong';
    }

    it('should rate short passwords as weak', () => {
      expect(getPasswordStrength('abc')).toBe('weak');
      expect(getPasswordStrength('123456')).toBe('weak');
    });

    it('should rate medium complexity passwords as medium', () => {
      expect(getPasswordStrength('Password1')).toBe('medium');
      expect(getPasswordStrength('MyPassword')).toBe('medium'); // Has lowercase + uppercase + length >= 8
    });

    it('should rate strong passwords as strong', () => {
      expect(getPasswordStrength('P@ssw0rd123!')).toBe('strong');
      expect(getPasswordStrength('MyStr0ng!Pass#2024')).toBe('strong');
    });
  });
});

// =====================================================
// AUTH RESULT VALIDATION
// =====================================================

describe('AuthResult Structure', () => {
  describe('success scenarios', () => {
    it('should have correct structure for successful login', () => {
      const result: AuthResult = {
        success: true,
        user: {
          id: 'user-1',
          email: 'test@example.com',
          isEmailVerified: true,
        },
      };

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should have correct structure for signup requiring verification', () => {
      const result: AuthResult = {
        success: true,
        user: {
          id: 'user-1',
          email: 'test@example.com',
          isEmailVerified: false,
        },
        needsEmailVerification: true,
      };

      expect(result.success).toBe(true);
      expect(result.needsEmailVerification).toBe(true);
      expect(result.user?.isEmailVerified).toBe(false);
    });
  });

  describe('error scenarios', () => {
    it('should have correct structure for login failure', () => {
      const result: AuthResult = {
        success: false,
        error: 'Invalid credentials',
      };

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
      expect(result.user).toBeUndefined();
    });

    it('should have correct structure for configuration error', () => {
      const result: AuthResult = {
        success: false,
        error: 'Supabase non configurato',
      };

      expect(result.success).toBe(false);
      expect(result.error).toContain('configurato');
    });
  });
});

// =====================================================
// SESSION STATE MANAGEMENT
// =====================================================

describe('Session State Management', () => {
  interface SessionState {
    isAuthenticated: boolean;
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
  }

  function createInitialState(): SessionState {
    return {
      isAuthenticated: false,
      user: null,
      isLoading: true,
      error: null,
    };
  }

  function handleAuthSuccess(state: SessionState, user: AuthUser): SessionState {
    return {
      ...state,
      isAuthenticated: true,
      user,
      isLoading: false,
      error: null,
    };
  }

  function handleAuthError(state: SessionState, error: string): SessionState {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error,
    };
  }

  function handleSignOut(state: SessionState): SessionState {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    };
  }

  describe('initial state', () => {
    it('should start in loading state', () => {
      const state = createInitialState();
      expect(state.isLoading).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe('authentication success', () => {
    it('should update state correctly on login', () => {
      const initial = createInitialState();
      const user: AuthUser = {
        id: 'user-1',
        email: 'test@example.com',
        isEmailVerified: true,
      };

      const newState = handleAuthSuccess(initial, user);

      expect(newState.isAuthenticated).toBe(true);
      expect(newState.user).toEqual(user);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBeNull();
    });
  });

  describe('authentication error', () => {
    it('should update state correctly on error', () => {
      const initial = createInitialState();

      const newState = handleAuthError(initial, 'Invalid credentials');

      expect(newState.isAuthenticated).toBe(false);
      expect(newState.user).toBeNull();
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('Invalid credentials');
    });
  });

  describe('sign out', () => {
    it('should clear user state on sign out', () => {
      const authenticatedState: SessionState = {
        isAuthenticated: true,
        user: { id: 'user-1', email: 'test@example.com', isEmailVerified: true },
        isLoading: false,
        error: null,
      };

      const newState = handleSignOut(authenticatedState);

      expect(newState.isAuthenticated).toBe(false);
      expect(newState.user).toBeNull();
      expect(newState.error).toBeNull();
    });
  });
});

// =====================================================
// OAUTH PROVIDER CONFIGURATION
// =====================================================

describe('OAuth Provider Configuration', () => {
  type OAuthProvider = 'google' | 'apple' | 'facebook';

  interface OAuthConfig {
    provider: OAuthProvider;
    scopes: string[];
    additionalParams?: Record<string, string>;
  }

  const OAUTH_CONFIGS: Record<OAuthProvider, OAuthConfig> = {
    google: {
      provider: 'google',
      scopes: ['email', 'profile'],
      additionalParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
    apple: {
      provider: 'apple',
      scopes: ['email', 'name'],
    },
    facebook: {
      provider: 'facebook',
      scopes: ['email', 'public_profile'],
    },
  };

  describe('provider configurations', () => {
    it('should have Google configuration with additional params', () => {
      const config = OAUTH_CONFIGS.google;
      expect(config.provider).toBe('google');
      expect(config.additionalParams?.access_type).toBe('offline');
      expect(config.additionalParams?.prompt).toBe('consent');
    });

    it('should have Apple configuration', () => {
      const config = OAUTH_CONFIGS.apple;
      expect(config.provider).toBe('apple');
      expect(config.scopes).toContain('email');
      expect(config.scopes).toContain('name');
    });

    it('should have Facebook configuration', () => {
      const config = OAUTH_CONFIGS.facebook;
      expect(config.provider).toBe('facebook');
      expect(config.scopes).toContain('email');
    });
  });

  describe('redirect URL construction', () => {
    function buildRedirectUrl(baseUrl: string, path: string): string {
      return `${baseUrl}${path}`;
    }

    it('should construct callback URL correctly', () => {
      const baseUrl = 'https://example.com';
      const callbackPath = '/auth/callback';

      expect(buildRedirectUrl(baseUrl, callbackPath)).toBe('https://example.com/auth/callback');
    });

    it('should construct reset password URL correctly', () => {
      const baseUrl = 'https://example.com';
      const resetPath = '/auth/reset-password';

      expect(buildRedirectUrl(baseUrl, resetPath)).toBe('https://example.com/auth/reset-password');
    });
  });
});

// =====================================================
// TOKEN VALIDATION
// =====================================================

describe('Token Validation', () => {
  interface TokenPayload {
    exp: number;
    iat: number;
    sub: string;
  }

  function isTokenExpired(exp: number): boolean {
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  }

  function getTokenRemainingTime(exp: number): number {
    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, exp - now);
  }

  function shouldRefreshToken(exp: number, refreshThresholdSeconds: number = 300): boolean {
    return getTokenRemainingTime(exp) < refreshThresholdSeconds;
  }

  describe('token expiration', () => {
    it('should detect expired token', () => {
      const expiredExp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      expect(isTokenExpired(expiredExp)).toBe(true);
    });

    it('should detect valid token', () => {
      const validExp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      expect(isTokenExpired(validExp)).toBe(false);
    });

    it('should detect token expiring exactly now as still valid', () => {
      // Token with exp === now is still valid for that instant
      const nowExp = Math.floor(Date.now() / 1000);
      expect(isTokenExpired(nowExp)).toBe(false);
    });

    it('should detect token expired 1 second ago', () => {
      const expiredExp = Math.floor(Date.now() / 1000) - 1;
      expect(isTokenExpired(expiredExp)).toBe(true);
    });
  });

  describe('remaining time calculation', () => {
    it('should calculate remaining time for valid token', () => {
      const exp = Math.floor(Date.now() / 1000) + 3600;
      const remaining = getTokenRemainingTime(exp);
      expect(remaining).toBeGreaterThan(3590); // Account for test execution time
      expect(remaining).toBeLessThanOrEqual(3600);
    });

    it('should return 0 for expired token', () => {
      const exp = Math.floor(Date.now() / 1000) - 100;
      expect(getTokenRemainingTime(exp)).toBe(0);
    });
  });

  describe('refresh threshold', () => {
    it('should suggest refresh when token is about to expire', () => {
      const exp = Math.floor(Date.now() / 1000) + 60; // 1 minute remaining
      expect(shouldRefreshToken(exp, 300)).toBe(true); // 5 min threshold
    });

    it('should not suggest refresh when token has plenty of time', () => {
      const exp = Math.floor(Date.now() / 1000) + 3600; // 1 hour remaining
      expect(shouldRefreshToken(exp, 300)).toBe(false);
    });

    it('should always suggest refresh for expired token', () => {
      const exp = Math.floor(Date.now() / 1000) - 100;
      expect(shouldRefreshToken(exp, 300)).toBe(true);
    });
  });
});

// =====================================================
// USER PROFILE SYNC LOGIC
// =====================================================

describe('User Profile Sync Logic', () => {
  interface LocalProfile {
    email?: string;
    name?: string;
    isRegistered: boolean;
  }

  function createLocalProfile(user: AuthUser): LocalProfile {
    return {
      email: user.email,
      name: user.name,
      isRegistered: true,
    };
  }

  function shouldSyncProfile(local: LocalProfile | null, remote: AuthUser | null): boolean {
    if (!remote) return false;
    if (!local) return true;
    if (local.email !== remote.email) return true;
    if (local.name !== remote.name) return true;
    return false;
  }

  describe('profile creation', () => {
    it('should create local profile from auth user', () => {
      const authUser: AuthUser = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        isEmailVerified: true,
      };

      const profile = createLocalProfile(authUser);

      expect(profile.email).toBe('test@example.com');
      expect(profile.name).toBe('Test User');
      expect(profile.isRegistered).toBe(true);
    });

    it('should handle auth user without name', () => {
      const authUser: AuthUser = {
        id: 'user-1',
        email: 'test@example.com',
        isEmailVerified: true,
      };

      const profile = createLocalProfile(authUser);

      expect(profile.name).toBeUndefined();
    });
  });

  describe('sync detection', () => {
    it('should sync when no local profile exists', () => {
      const remote: AuthUser = {
        id: 'user-1',
        email: 'test@example.com',
        isEmailVerified: true,
      };

      expect(shouldSyncProfile(null, remote)).toBe(true);
    });

    it('should sync when email differs', () => {
      const local: LocalProfile = { email: 'old@example.com', isRegistered: true };
      const remote: AuthUser = {
        id: 'user-1',
        email: 'new@example.com',
        isEmailVerified: true,
      };

      expect(shouldSyncProfile(local, remote)).toBe(true);
    });

    it('should sync when name differs', () => {
      const local: LocalProfile = {
        email: 'test@example.com',
        name: 'Old Name',
        isRegistered: true,
      };
      const remote: AuthUser = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'New Name',
        isEmailVerified: true,
      };

      expect(shouldSyncProfile(local, remote)).toBe(true);
    });

    it('should not sync when profiles match', () => {
      const local: LocalProfile = {
        email: 'test@example.com',
        name: 'Test User',
        isRegistered: true,
      };
      const remote: AuthUser = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        isEmailVerified: true,
      };

      expect(shouldSyncProfile(local, remote)).toBe(false);
    });

    it('should not sync when no remote user', () => {
      const local: LocalProfile = { email: 'test@example.com', isRegistered: true };

      expect(shouldSyncProfile(local, null)).toBe(false);
    });
  });
});

// =====================================================
// AUTH CALLBACK HANDLING
// =====================================================

describe('Auth Callback Handling', () => {
  type AuthEvent =
    | 'SIGNED_IN'
    | 'SIGNED_OUT'
    | 'TOKEN_REFRESHED'
    | 'USER_UPDATED'
    | 'PASSWORD_RECOVERY';

  interface AuthStateChange {
    event: AuthEvent;
    hasSession: boolean;
  }

  function handleAuthEvent(change: AuthStateChange): {
    action: 'login' | 'logout' | 'refresh' | 'update' | 'none';
    shouldSyncProfile: boolean;
  } {
    switch (change.event) {
      case 'SIGNED_IN':
        return { action: 'login', shouldSyncProfile: true };
      case 'SIGNED_OUT':
        return { action: 'logout', shouldSyncProfile: false };
      case 'TOKEN_REFRESHED':
        return { action: 'refresh', shouldSyncProfile: false };
      case 'USER_UPDATED':
        return { action: 'update', shouldSyncProfile: true };
      case 'PASSWORD_RECOVERY':
        return { action: 'none', shouldSyncProfile: false };
      default:
        return { action: 'none', shouldSyncProfile: false };
    }
  }

  describe('event handling', () => {
    it('should handle SIGNED_IN event', () => {
      const result = handleAuthEvent({ event: 'SIGNED_IN', hasSession: true });
      expect(result.action).toBe('login');
      expect(result.shouldSyncProfile).toBe(true);
    });

    it('should handle SIGNED_OUT event', () => {
      const result = handleAuthEvent({ event: 'SIGNED_OUT', hasSession: false });
      expect(result.action).toBe('logout');
      expect(result.shouldSyncProfile).toBe(false);
    });

    it('should handle TOKEN_REFRESHED event', () => {
      const result = handleAuthEvent({ event: 'TOKEN_REFRESHED', hasSession: true });
      expect(result.action).toBe('refresh');
      expect(result.shouldSyncProfile).toBe(false);
    });

    it('should handle USER_UPDATED event', () => {
      const result = handleAuthEvent({ event: 'USER_UPDATED', hasSession: true });
      expect(result.action).toBe('update');
      expect(result.shouldSyncProfile).toBe(true);
    });

    it('should handle PASSWORD_RECOVERY event', () => {
      const result = handleAuthEvent({ event: 'PASSWORD_RECOVERY', hasSession: false });
      expect(result.action).toBe('none');
      expect(result.shouldSyncProfile).toBe(false);
    });
  });
});
