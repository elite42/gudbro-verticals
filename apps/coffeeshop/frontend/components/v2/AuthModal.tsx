'use client';

/**
 * AuthModal v2
 *
 * Modal di autenticazione con design system v2.
 * Supporta: Passkey, Social OAuth, Email/Password
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Fingerprint,
  Envelope,
  Lock,
  User,
  GoogleLogo,
  AppleLogo,
  FacebookLogo,
  SpinnerGap,
  CheckCircle,
  WarningCircle,
  ArrowRight,
} from '@phosphor-icons/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { email?: string; name?: string }) => void;
  defaultMode?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, onSuccess, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPasskeyOption, setShowPasskeyOption] = useState(false);

  // Check passkey support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@/lib/passkey-service')
        .then(({ isPasskeySupported, isPasskeyEnabled }) => {
          setShowPasskeyOption(isPasskeySupported() && isPasskeyEnabled());
        })
        .catch(() => setShowPasskeyOption(false));
    }
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleModeChange = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setError('');
    setSuccessMessage('');
  };

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
    } catch (err) {
      setError(`Errore con ${provider}. Riprova.`);
      setIsLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { authenticateWithPasskey } = await import('@/lib/passkey-service');
      const result = await authenticateWithPasskey();

      if (result.success && result.user) {
        onSuccess({ email: result.user.email });
      } else {
        setError(result.error || "Errore durante l'autenticazione con passkey");
      }
    } catch (err) {
      setError("Errore durante l'autenticazione con passkey");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100]"
            style={{ background: 'var(--surface-overlay)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 z-[101] mx-auto max-h-[90vh] max-w-md -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl"
            style={{ background: 'var(--surface-card)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4"
              style={{ borderBottom: '1px solid var(--border-light)' }}
            >
              <h2
                className="font-display text-xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {mode === 'login' ? 'Accedi' : 'Registrati'}
              </h2>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto p-4">
              {/* Passkey Login */}
              {mode === 'login' && showPasskeyOption && (
                <div className="mb-4">
                  <motion.button
                    onClick={handlePasskeyLogin}
                    disabled={isLoading}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-3 rounded-xl p-4 font-medium transition-colors disabled:opacity-50"
                    style={{
                      background: 'var(--interactive-primary)',
                      color: 'white',
                    }}
                  >
                    <Fingerprint size={24} weight="bold" />
                    <span>Accedi con Face ID / Passkey</span>
                  </motion.button>

                  <div className="my-4 flex items-center gap-4">
                    <div className="h-px flex-1" style={{ background: 'var(--border-light)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      oppure
                    </span>
                    <div className="h-px flex-1" style={{ background: 'var(--border-light)' }} />
                  </div>
                </div>
              )}

              {/* Social Login */}
              <div className="mb-6 space-y-3">
                <motion.button
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-3 rounded-xl border p-3 transition-colors disabled:opacity-50"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border-medium)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <GoogleLogo size={20} weight="bold" />
                  <span className="font-medium">Continua con Google</span>
                </motion.button>

                <motion.button
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-3 rounded-xl p-3 font-medium transition-colors disabled:opacity-50"
                  style={{
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  <AppleLogo size={20} weight="fill" />
                  <span>Continua con Apple</span>
                </motion.button>

                <motion.button
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-3 rounded-xl p-3 font-medium text-white transition-colors disabled:opacity-50"
                  style={{ background: '#1877F2' }}
                >
                  <FacebookLogo size={20} weight="fill" />
                  <span>Continua con Facebook</span>
                </motion.button>
              </div>

              {/* Divider */}
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1" style={{ background: 'var(--border-light)' }} />
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  oppure con email
                </span>
                <div className="h-px flex-1" style={{ background: 'var(--border-light)' }} />
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label
                      className="mb-1 flex items-center gap-2 text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <User size={16} />
                      Nome
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl p-3 text-base"
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-medium)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="Il tuo nome"
                      required
                    />
                  </div>
                )}

                <div>
                  <label
                    className="mb-1 flex items-center gap-2 text-sm font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Envelope size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl p-3 text-base"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder="email@esempio.com"
                    required
                  />
                </div>

                <div>
                  <label
                    className="mb-1 flex items-center gap-2 text-sm font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Lock size={16} />
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl p-3 text-base"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder="La tua password"
                    required
                    minLength={6}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl p-3"
                    style={{
                      background: 'var(--status-error-bg)',
                      color: 'var(--status-error)',
                    }}
                  >
                    <WarningCircle size={20} weight="fill" />
                    <p className="text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl p-3"
                    style={{
                      background: 'var(--status-success-bg)',
                      color: 'var(--status-success)',
                    }}
                  >
                    <CheckCircle size={20} weight="fill" />
                    <p className="text-sm">{successMessage}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl p-4 font-semibold text-white transition-colors disabled:opacity-50"
                  style={{ background: 'var(--brand-warm)' }}
                >
                  {isLoading ? (
                    <>
                      <SpinnerGap size={20} className="animate-spin" />
                      <span>Caricamento...</span>
                    </>
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Accedi' : 'Registrati'}</span>
                      <ArrowRight size={18} weight="bold" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {mode === 'login' ? 'Non hai un account?' : 'Hai già un account?'}
                  <button
                    onClick={() => handleModeChange(mode === 'login' ? 'register' : 'login')}
                    className="ml-1 font-medium"
                    style={{ color: 'var(--brand-warm)' }}
                  >
                    {mode === 'login' ? 'Registrati' : 'Accedi'}
                  </button>
                </p>
              </div>

              {/* Continue as Guest */}
              <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                <button
                  onClick={onClose}
                  className="w-full py-3 font-medium transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Continua come ospite →
                </button>
              </div>

              {/* Privacy Note */}
              <p className="mt-4 text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
                Continuando accetti i nostri{' '}
                <a href="#" style={{ color: 'var(--brand-warm)' }}>
                  Termini di Servizio
                </a>{' '}
                e la{' '}
                <a href="#" style={{ color: 'var(--brand-warm)' }}>
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;
