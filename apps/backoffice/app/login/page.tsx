'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import {
  DEV_ACCOUNTS,
  isDevModeEnabled,
  validateDevPin,
  DEV_SESSION_CONFIG,
  type AuthUser,
} from '@/lib/auth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [message, setMessage] = useState<string | null>(null);
  const [showDevAccounts, setShowDevAccounts] = useState(false);
  const [devPin, setDevPin] = useState('');
  const [devPinVerified, setDevPinVerified] = useState(false);
  const [devPinError, setDevPinError] = useState(false);

  const supabase = createClient();

  // Check if dev mode is available
  const devModeAvailable = isDevModeEnabled();

  // Handle PIN verification
  const handlePinSubmit = () => {
    if (validateDevPin(devPin)) {
      setDevPinVerified(true);
      setDevPinError(false);
    } else {
      setDevPinError(true);
      setDevPin('');
    }
  };

  /**
   * Dev login bypass - sets both localStorage and cookie for middleware
   * @security Only available when NODE_ENV === 'development'
   */
  const handleDevLogin = (account: AuthUser) => {
    if (!devModeAvailable) {
      console.warn('Dev login not available in production');
      return;
    }

    const sessionData = JSON.stringify(account);
    localStorage.setItem(DEV_SESSION_CONFIG.name, sessionData);

    // Set cookie for middleware to read
    document.cookie = `${DEV_SESSION_CONFIG.name}=${encodeURIComponent(sessionData)}; path=${DEV_SESSION_CONFIG.path}; max-age=${DEV_SESSION_CONFIG.maxAge}; SameSite=${DEV_SESSION_CONFIG.sameSite}`;

    router.push(redirectTo);
    router.refresh();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Check your email for the confirmation link!');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Check your email for the password reset link!');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-orange-500">
            <span className="text-3xl font-bold text-white">G</span>
          </div>
          <h1 className="text-2xl font-bold text-white">GUDBRO Dashboard</h1>
          <p className="mt-1 text-slate-400">Manage your digital hospitality</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {/* Title */}
          <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
            {mode === 'login' && 'Welcome back'}
            {mode === 'signup' && 'Create account'}
            {mode === 'forgot' && 'Reset password'}
          </h2>

          {/* Success Message */}
          {message && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={
              mode === 'login'
                ? handleLogin
                : mode === 'signup'
                  ? handleSignUp
                  : handleForgotPassword
            }
          >
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-red-500"
                  placeholder="you@company.com"
                />
              </div>

              {/* Password (not for forgot mode) */}
              {mode !== 'forgot' && (
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your password"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-4 py-3 font-medium text-white transition-all hover:from-red-600 hover:to-orange-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    {mode === 'login' && 'Sign in'}
                    {mode === 'signup' && 'Create account'}
                    {mode === 'forgot' && 'Send reset link'}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider (only for login/signup) */}
          {mode !== 'forgot' && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
            </>
          )}

          {/* Mode Switcher */}
          <div className="mt-6 text-center text-sm">
            {mode === 'login' && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot');
                    setError(null);
                    setMessage(null);
                  }}
                  className="font-medium text-red-600 hover:text-red-700"
                >
                  Forgot password?
                </button>
                <span className="mx-2 text-gray-400">|</span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                    setMessage(null);
                  }}
                  className="font-medium text-red-600 hover:text-red-700"
                >
                  Create account
                </button>
              </>
            )}
            {mode === 'signup' && (
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                  setMessage(null);
                }}
                className="font-medium text-red-600 hover:text-red-700"
              >
                Already have an account? Sign in
              </button>
            )}
            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                  setMessage(null);
                }}
                className="font-medium text-red-600 hover:text-red-700"
              >
                Back to sign in
              </button>
            )}
          </div>
        </div>

        {/* Dev Mode Toggle - Only visible in development */}
        {devModeAvailable && (
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowDevAccounts(!showDevAccounts)}
              className="w-full text-center text-sm text-slate-500 transition-colors hover:text-slate-300"
            >
              {showDevAccounts ? 'Hide' : 'Show'} Dev Accounts
            </button>

            {showDevAccounts && (
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                <div className="mb-3 flex items-center justify-center gap-2">
                  <span className="rounded bg-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-400">
                    DEV
                  </span>
                </div>

                {/* PIN Gate */}
                {!devPinVerified ? (
                  <div className="space-y-3">
                    <p className="text-center text-xs text-slate-400">
                      Enter PIN to access dev accounts
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={devPin}
                        onChange={(e) => setDevPin(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                        placeholder="Enter PIN"
                        className={`flex-1 rounded-lg border bg-slate-700 px-3 py-2 text-sm text-white ${
                          devPinError ? 'border-red-500' : 'border-slate-600'
                        } focus:outline-none focus:ring-1 focus:ring-red-500`}
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        onClick={handlePinSubmit}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
                      >
                        Go
                      </button>
                    </div>
                    {devPinError && <p className="text-center text-xs text-red-400">Invalid PIN</p>}
                  </div>
                ) : (
                  /* Account List - Only shown after PIN verified */
                  <>
                    <p className="mb-3 text-center text-xs text-slate-400">
                      Quick access for development & testing
                    </p>
                    <div className="space-y-2">
                      {DEV_ACCOUNTS.map((account) => (
                        <button
                          key={account.id}
                          onClick={() => handleDevLogin(account)}
                          className="flex w-full items-center gap-3 rounded-lg bg-slate-700/50 p-3 text-left transition-colors hover:bg-slate-700"
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                              account.role === 'gudbro_owner'
                                ? 'bg-gradient-to-r from-red-500 to-orange-500'
                                : account.role === 'business_owner'
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                                  : account.role === 'manager'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                    : 'bg-gradient-to-r from-green-500 to-emerald-500'
                            }`}
                          >
                            {account.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{account.name}</p>
                            <p className="text-xs text-slate-400">{account.email}</p>
                          </div>
                          <span
                            className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${
                              account.role === 'gudbro_owner'
                                ? 'bg-red-500/20 text-red-400'
                                : account.role === 'business_owner'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : account.role === 'manager'
                                    ? 'bg-purple-500/20 text-purple-400'
                                    : 'bg-green-500/20 text-green-400'
                            }`}
                          >
                            {account.role.replace('_', ' ')}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function LoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-red-500"></div>
    </div>
  );
}

// Main export with Suspense boundary
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}
