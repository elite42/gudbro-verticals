'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { AccountHeader } from '@/components/AccountHeader';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('La password deve avere almeno 6 caratteri');
      return;
    }

    if (password !== confirmPassword) {
      setError('Le password non corrispondono');
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase non configurato');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/account');
        }, 2000);
      }
    } catch (err) {
      setError('Si è verificato un errore. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg-primary">
      <AccountHeader title="Nuova Password" />

      <div className="p-4 max-w-md mx-auto">
        {success ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-theme-text-primary mb-2">
              Password aggiornata!
            </h2>
            <p className="text-theme-text-secondary">
              Reindirizzamento al tuo account...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-theme-text-primary mb-2">
                Imposta la tua nuova password
              </h2>
              <p className="text-theme-text-secondary text-sm">
                Scegli una password sicura di almeno 6 caratteri
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-xl">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-theme-text-primary mb-1.5">
                  Nuova Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-bg-secondary border border-theme-border-medium rounded-xl text-theme-text-primary focus:outline-none focus:border-theme-brand-primary"
                  placeholder="Almeno 6 caratteri"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-text-primary mb-1.5">
                  Conferma Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-theme-bg-secondary border border-theme-border-medium rounded-xl text-theme-text-primary focus:outline-none focus:border-theme-brand-primary"
                  placeholder="Ripeti la password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-theme-brand-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Aggiornamento...' : 'Aggiorna Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
