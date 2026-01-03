/**
 * GudBro Authentication Service - Website
 *
 * Handles user authentication and account creation:
 * - Supabase Auth for authentication
 * - Creates records in our unified `accounts` table
 * - Supports both Personal (consumer) and Business (merchant) accounts
 */

import { supabase, isSupabaseConfigured } from './supabase';
import type { User, AuthError } from '@supabase/supabase-js';

// Types
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
  accountId?: string;
  error?: string;
  needsEmailVerification?: boolean;
}

export interface PersonalSignUpData {
  email: string;
  password: string;
  name: string;
  referralCode?: string;
}

export interface BusinessSignUpData {
  email: string;
  password: string;
  name: string;
  businessName: string;
  businessType: string;
  currency: string;
  languages: string[];
}

export interface HealthProfileData {
  allergens?: Record<string, boolean>;
  intolerances?: Record<string, boolean>;
  dietary?: Record<string, boolean>;
  foodStyles?: Record<string, unknown>;
  preferences?: Record<string, unknown>;
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
 * Sign up as Personal (Consumer) account
 * 1. Creates Supabase Auth user
 * 2. Creates record in accounts table
 * 3. Creates consumer role in account_roles
 * 4. Creates empty health_profile
 */
export async function signUpPersonal(data: PersonalSignUpData): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    // Step 1: Create Supabase Auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          full_name: data.name,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      return { success: false, error: getErrorMessage(authError) };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to create user' };
    }

    // Check if email confirmation is required
    const needsEmailVerification = !authData.user.email_confirmed_at && authData.session === null;

    // Step 2: Create account in our accounts table using the helper function
    const { data: accountId, error: accountError } = await supabase.rpc('create_consumer_account', {
      p_email: data.email,
      p_first_name: data.name.split(' ')[0] || data.name,
      p_last_name: data.name.split(' ').slice(1).join(' ') || null,
      p_auth_id: authData.user.id,
      p_referral_code: data.referralCode || null,
    });

    if (accountError) {
      console.error('Account creation error:', accountError);
      // Auth user was created but account failed - log but don't fail
      // The account can be created later via trigger or manual process
    }

    return {
      success: true,
      user: toAuthUser(authData.user),
      accountId: accountId || undefined,
      needsEmailVerification,
    };
  } catch (err) {
    console.error('SignUp error:', err);
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

/**
 * Sign up as Business (Merchant) account
 * 1. Creates Supabase Auth user
 * 2. Creates record in accounts table
 * 3. Creates merchant in merchants table
 * 4. Adds merchant role to account_roles
 */
export async function signUpBusiness(data: BusinessSignUpData): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    // Step 1: Create Supabase Auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          full_name: data.name,
          business_name: data.businessName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback?type=business`,
      },
    });

    if (authError) {
      return { success: false, error: getErrorMessage(authError) };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to create user' };
    }

    const needsEmailVerification = !authData.user.email_confirmed_at && authData.session === null;

    // Step 2: Create consumer account first (base account)
    const { data: accountId, error: accountError } = await supabase.rpc('create_consumer_account', {
      p_email: data.email,
      p_first_name: data.name.split(' ')[0] || data.name,
      p_last_name: data.name.split(' ').slice(1).join(' ') || null,
      p_auth_id: authData.user.id,
      p_referral_code: null,
    });

    if (accountError) {
      console.error('Account creation error:', accountError);
    }

    // Step 3: Create merchant record
    if (accountId) {
      const { data: merchantData, error: merchantError } = await supabase
        .from('merchants')
        .insert({
          name: data.businessName,
          slug: data.businessName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          type: data.businessType,
          currency: data.currency,
          supported_languages: data.languages,
          owner_account_id: accountId,
          status: 'pending', // Requires approval or setup completion
        })
        .select('id')
        .single();

      if (merchantError) {
        console.error('Merchant creation error:', merchantError);
      } else if (merchantData) {
        // Step 4: Add merchant role to account
        const { error: roleError } = await supabase.rpc('add_merchant_role', {
          p_account_id: accountId,
          p_merchant_id: merchantData.id,
          p_permissions: {
            menu_edit: true,
            orders_view: true,
            orders_manage: true,
            analytics_view: true,
            staff_manage: true,
            billing_manage: true,
          },
        });

        if (roleError) {
          console.error('Role creation error:', roleError);
        }
      }
    }

    return {
      success: true,
      user: toAuthUser(authData.user),
      accountId: accountId || undefined,
      needsEmailVerification,
    };
  } catch (err) {
    console.error('Business SignUp error:', err);
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

/**
 * Update health profile for an account
 */
export async function updateHealthProfile(
  accountId: string,
  profile: HealthProfileData
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabase
      .from('health_profiles')
      .update({
        allergens: profile.allergens || {},
        intolerances: profile.intolerances || {},
        dietary: profile.dietary || {},
        food_styles: profile.foodStyles || {},
        preferences: profile.preferences || {},
      })
      .eq('account_id', accountId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Health profile update error:', err);
    return { success: false, error: 'Failed to update health profile' };
  }
}

/**
 * Sign in with OAuth provider
 */
export async function signInWithOAuth(
  provider: 'google' | 'apple' | 'facebook'
): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabase.auth.signInWithOAuth({
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

    // OAuth redirects, callback will handle session
    return { success: true };
  } catch (err) {
    console.error('OAuth error:', err);
    return { success: false, error: `Error with ${provider}. Please try again.` };
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
    return { success: false, error: 'Supabase not configured' };
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
      // Record login in P5 accounts system
      try {
        await supabase.rpc('record_user_login');
      } catch {
        // Ignore errors
      }
      return { success: true, user: toAuthUser(data.user) };
    }

    return { success: false, error: 'Invalid credentials' };
  } catch (err) {
    console.error('SignIn error:', err);
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<AuthResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }
    return { success: true };
  } catch (err) {
    console.error('SignOut error:', err);
    return { success: false, error: 'Error during logout' };
  }
}

/**
 * Get current session
 */
export async function getCurrentSession() {
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
 * Convert Supabase error to user-friendly message
 */
function getErrorMessage(error: AuthError): string {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Invalid email or password';
    case 'Email not confirmed':
      return 'Please verify your email before signing in';
    case 'User already registered':
      return 'An account with this email already exists';
    case 'Password should be at least 6 characters':
      return 'Password must be at least 6 characters';
    case 'Unable to validate email address: invalid format':
      return 'Invalid email format';
    case 'Email rate limit exceeded':
      return 'Too many attempts. Please try again later';
    default:
      return error.message || 'An error occurred';
  }
}

// ============================================================================
// P5 UNIFIED ACCOUNT INTEGRATION
// ============================================================================

export interface CurrentAccount {
  accountId: string;
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  totalPoints: number;
  loyaltyTier: string;
  isPremium: boolean;
  locale: string;
  timezone: string;
}

export interface CurrentRole {
  roleId: string;
  roleType: 'consumer' | 'merchant' | 'admin' | 'contributor';
  tenantId?: string;
  tenantType?: string;
  permissions: Record<string, boolean>;
  isPrimary: boolean;
}

/**
 * Get the current authenticated account from P5 system
 */
export async function getCurrentAccount(): Promise<CurrentAccount | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase.rpc('get_current_account');

  if (error) {
    console.error('[AuthService] Get current account error:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const row = data[0];
  return {
    accountId: row.account_id,
    email: row.email,
    displayName: row.display_name,
    firstName: row.first_name,
    lastName: row.last_name,
    avatarUrl: row.avatar_url,
    totalPoints: row.total_points || 0,
    loyaltyTier: row.loyalty_tier || 'bronze',
    isPremium: row.is_premium || false,
    locale: row.locale || 'it',
    timezone: row.timezone || 'Europe/Rome',
  };
}

/**
 * Get all roles for the current authenticated user
 */
export async function getCurrentRoles(): Promise<CurrentRole[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_current_roles');

  if (error) {
    console.error('[AuthService] Get current roles error:', error);
    return [];
  }

  return (data || []).map((r: any) => ({
    roleId: r.role_id,
    roleType: r.role_type,
    tenantId: r.tenant_id,
    tenantType: r.tenant_type,
    permissions: r.permissions || {},
    isPrimary: r.is_primary,
  }));
}

/**
 * Check if current user has a specific permission
 */
export async function hasPermission(
  permission: string,
  tenantId?: string
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const { data, error } = await supabase.rpc('has_permission', {
    p_permission: permission,
    p_tenant_id: tenantId || null,
  });

  if (error) {
    console.error('[AuthService] Check permission error:', error);
    return false;
  }

  return data === true;
}

/**
 * Record user login (call after successful auth)
 */
export async function recordUserLogin(): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  await supabase.rpc('record_user_login');
}
