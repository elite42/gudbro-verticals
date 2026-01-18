'use client';

import { useState, useEffect } from 'react';
import { PasskeyButton } from './passkey';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { email?: string; name?: string }) => void;
  defaultMode?: 'login' | 'register';
}

/**
 * AuthModal - Reusable authentication modal
 *
 * Features:
 * - Passkey login (Face ID, Touch ID, Windows Hello)
 * - Social login (Google, Apple, Facebook)
 * - Email/password authentication
 * - Login and registration modes
 * - Error handling and loading states
 */
export function AuthModal({ isOpen, onClose, onSuccess, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPasskeyOption, setShowPasskeyOption] = useState(false);

  // Check passkey support on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@/lib/passkey-service').then(({ isPasskeySupported, isPasskeyEnabled }) => {
        setShowPasskeyOption(isPasskeySupported() && isPasskeyEnabled());
      });
    }
  }, []);

  // Reset state when mode changes
  const handleModeChange = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setError('');
    setSuccessMessage('');
  };

  // Import auth functions dynamically to avoid SSR issues
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const { signUpWithEmail, signInWithEmail } = await import('@/lib/auth-service');

      const result =
        mode === 'register'
          ? await signUpWithEmail(email, password, name)
          : await signInWithEmail(email, password);

      if (!result.success) {
        setError(result.error || "Errore durante l'autenticazione");
        return;
      }

      if (result.needsEmailVerification) {
        setSuccessMessage(
          "Ti abbiamo inviato un'email di conferma. Controlla la tua casella di posta."
        );
        return;
      }

      if (result.user) {
        onSuccess({ email: result.user.email, name: result.user.name });
      }
    } catch (err) {
      setError('Si è verificato un errore. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    setIsLoading(true);
    setError('');

    try {
      const { signInWithOAuth } = await import('@/lib/auth-service');
      const result = await signInWithOAuth(provider);

      if (!result.success) {
        setError(result.error || `Errore con ${provider}`);
        setIsLoading(false);
      }
      // OAuth redirects, so loading stays true until redirect
    } catch (err) {
      setError(`Errore con ${provider}. Riprova.`);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="bg-theme-bg-elevated fixed inset-x-4 top-1/2 z-[10001] mx-auto max-h-[90vh] max-w-md -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="border-theme-border-light flex items-center justify-between border-b p-4">
          <h2 className="text-theme-text-primary text-xl font-bold">
            {mode === 'login' ? 'Accedi' : 'Registrati'}
          </h2>
          <button
            onClick={onClose}
            className="bg-theme-bg-tertiary hover:bg-theme-bg-secondary flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          >
            <svg
              className="text-theme-text-secondary h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {/* Passkey Login (only show on login mode when supported) */}
          {mode === 'login' && showPasskeyOption && (
            <div className="mb-4">
              <PasskeyButton
                onSuccess={(user) => {
                  onSuccess({ email: user.email });
                }}
                onError={(err) => setError(err)}
                className="w-full"
                variant="primary"
              />
              <div className="my-4 flex items-center gap-4">
                <div className="bg-theme-border-light h-px flex-1" />
                <span className="text-theme-text-secondary text-sm">oppure</span>
                <div className="bg-theme-border-light h-px flex-1" />
              </div>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="mb-6 space-y-3">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
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
              <span className="text-theme-text-primary font-medium">Continua con Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-black px-4 py-3 text-white transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="font-medium">Continua con Apple</span>
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#1877F2] px-4 py-3 text-white transition-colors hover:bg-[#166FE5] disabled:opacity-50"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="font-medium">Continua con Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-4">
            <div className="bg-theme-border-light h-px flex-1" />
            <span className="text-theme-text-secondary text-sm">oppure</span>
            <div className="bg-theme-border-light h-px flex-1" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-theme-text-secondary mb-1 block text-sm font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-theme-bg-secondary border-theme-border-light text-theme-text-primary w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Il tuo nome"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-theme-text-secondary mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-theme-bg-secondary border-theme-border-light text-theme-text-primary w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="email@esempio.com"
                required
              />
            </div>

            <div>
              <label className="text-theme-text-secondary mb-1 block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-theme-bg-secondary border-theme-border-light text-theme-text-primary w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="La tua password"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-300 bg-red-100 p-3 dark:border-red-800 dark:bg-red-900/30">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl border border-green-300 bg-green-100 p-3 dark:border-green-800 dark:bg-green-900/30">
                <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-pink-500 px-4 py-3 font-medium text-white transition-colors hover:bg-pink-600 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Caricamento...
                </span>
              ) : mode === 'login' ? (
                'Accedi'
              ) : (
                'Registrati'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-theme-text-secondary text-sm">
              {mode === 'login' ? 'Non hai un account?' : 'Hai già un account?'}
              <button
                onClick={() => handleModeChange(mode === 'login' ? 'register' : 'login')}
                className="ml-1 font-medium text-pink-500 hover:text-pink-600"
              >
                {mode === 'login' ? 'Registrati' : 'Accedi'}
              </button>
            </p>
          </div>

          {/* Continue as Guest */}
          <div className="border-theme-border-light mt-6 border-t pt-4">
            <button
              onClick={onClose}
              className="text-theme-text-secondary hover:text-theme-text-primary w-full py-3 font-medium transition-colors"
            >
              Continua come ospite →
            </button>
          </div>

          {/* Privacy Note */}
          <p className="text-theme-text-tertiary mt-4 text-center text-xs">
            Continuando accetti i nostri{' '}
            <a href="#" className="text-pink-500">
              Termini di Servizio
            </a>{' '}
            e la{' '}
            <a href="#" className="text-pink-500">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
