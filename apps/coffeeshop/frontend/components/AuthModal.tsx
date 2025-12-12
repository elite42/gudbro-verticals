'use client';

import { useState } from 'react';

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
 * - Social login (Google, Apple, Facebook)
 * - Email/password authentication
 * - Login and registration modes
 * - Error handling and loading states
 */
export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  defaultMode = 'login'
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

      const result = mode === 'register'
        ? await signUpWithEmail(email, password, name)
        : await signInWithEmail(email, password);

      if (!result.success) {
        setError(result.error || 'Errore durante l\'autenticazione');
        return;
      }

      if (result.needsEmailVerification) {
        setSuccessMessage('Ti abbiamo inviato un\'email di conferma. Controlla la tua casella di posta.');
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
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-theme-bg-elevated rounded-2xl shadow-2xl z-[10001] max-w-md mx-auto max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-theme-border-light">
          <h2 className="text-xl font-bold text-theme-text-primary">
            {mode === 'login' ? 'Accedi' : 'Registrati'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-theme-bg-tertiary flex items-center justify-center hover:bg-theme-bg-secondary transition-colors"
          >
            <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium text-theme-text-primary">Continua con Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="font-medium">Continua con Apple</span>
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#1877F2] text-white rounded-xl hover:bg-[#166FE5] transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-medium">Continua con Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-theme-border-light" />
            <span className="text-sm text-theme-text-secondary">oppure</span>
            <div className="flex-1 h-px bg-theme-border-light" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-theme-text-secondary mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-theme-bg-secondary border border-theme-border-light text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Il tuo nome"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-theme-text-secondary mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-theme-bg-secondary border border-theme-border-light text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="email@esempio.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-theme-text-secondary mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-theme-bg-secondary border border-theme-border-light text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="La tua password"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800 rounded-xl">
                <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Caricamento...
                </span>
              ) : (
                mode === 'login' ? 'Accedi' : 'Registrati'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-theme-text-secondary">
              {mode === 'login' ? 'Non hai un account?' : 'Hai già un account?'}
              <button
                onClick={() => handleModeChange(mode === 'login' ? 'register' : 'login')}
                className="ml-1 text-pink-500 hover:text-pink-600 font-medium"
              >
                {mode === 'login' ? 'Registrati' : 'Accedi'}
              </button>
            </p>
          </div>

          {/* Continue as Guest */}
          <div className="mt-6 pt-4 border-t border-theme-border-light">
            <button
              onClick={onClose}
              className="w-full py-3 text-theme-text-secondary hover:text-theme-text-primary font-medium transition-colors"
            >
              Continua come ospite →
            </button>
          </div>

          {/* Privacy Note */}
          <p className="mt-4 text-xs text-theme-text-tertiary text-center">
            Continuando accetti i nostri{' '}
            <a href="#" className="text-pink-500">Termini di Servizio</a>{' '}
            e la{' '}
            <a href="#" className="text-pink-500">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </>
  );
}
