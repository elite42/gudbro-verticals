'use client';

/**
 * Login Page for Waiter PWA
 *
 * Features:
 * - Email/password login
 * - Dev mode account selection
 * - Mobile-friendly layout
 */

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth, DEV_ACCOUNTS } from '@/components/providers/AuthProvider';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  Tray,
  EnvelopeSimple,
  Lock,
  Eye,
  EyeSlash,
  CircleNotch,
  UserCircle,
  Warning
} from '@phosphor-icons/react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const { devLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDevModeEnabled = process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_ENABLE_DEV_AUTH === 'true';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Autenticazione non configurata');
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      router.push(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante il login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevLogin = (accountId: string) => {
    const account = DEV_ACCOUNTS.find(a => a.id === accountId);
    if (account) {
      devLogin(account);
      router.push(redirectTo);
    }
  };

  return (
    <>
      {/* Error message */}
      {error && (
        <div className="w-full max-w-sm mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
          <Warning size={20} weight="bold" className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Login form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-theme-text-secondary">
            Email
          </label>
          <div className="relative">
            <EnvelopeSimple
              size={20}
              weight="bold"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-tertiary"
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@ristorante.com"
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-theme-bg-secondary border border-theme-border-medium text-theme-text-primary placeholder:text-theme-text-tertiary focus:border-theme-brand-primary focus:ring-2 focus:ring-theme-brand-secondary transition-colors"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-theme-text-secondary">
            Password
          </label>
          <div className="relative">
            <Lock
              size={20}
              weight="bold"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-tertiary"
            />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-theme-bg-secondary border border-theme-border-medium text-theme-text-primary placeholder:text-theme-text-tertiary focus:border-theme-brand-primary focus:ring-2 focus:ring-theme-brand-secondary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-text-tertiary hover:text-theme-text-secondary transition-colors"
              aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
            >
              {showPassword ? <EyeSlash size={20} weight="bold" /> : <Eye size={20} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || !isSupabaseConfigured}
          className="btn-primary w-full btn-lg"
        >
          {isLoading ? (
            <>
              <CircleNotch size={20} weight="bold" className="animate-spin" />
              Accesso in corso...
            </>
          ) : (
            'Accedi'
          )}
        </button>

        {!isSupabaseConfigured && (
          <p className="text-center text-sm text-theme-text-tertiary">
            Autenticazione non configurata
          </p>
        )}
      </form>

      {/* Dev mode accounts */}
      {isDevModeEnabled && (
        <div className="w-full max-w-sm mt-8 pt-8 border-t border-theme-border-light">
          <p className="text-center text-sm font-medium text-amber-600 dark:text-amber-400 mb-4">
            Account di sviluppo
          </p>
          <div className="space-y-2">
            {DEV_ACCOUNTS.map((account) => (
              <button
                key={account.id}
                onClick={() => handleDevLogin(account.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-theme-bg-secondary border border-theme-border-light hover:border-theme-border-medium transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-theme-brand-secondary flex items-center justify-center">
                  <UserCircle size={24} weight="duotone" className="text-theme-brand-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-theme-text-primary">{account.name}</p>
                  <p className="text-sm text-theme-text-secondary capitalize">{account.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function LoginFormFallback() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="h-[72px] bg-theme-bg-secondary rounded-xl animate-pulse" />
      <div className="h-[72px] bg-theme-bg-secondary rounded-xl animate-pulse" />
      <div className="h-[56px] bg-theme-brand-secondary rounded-xl animate-pulse" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-theme-bg-primary">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-theme-brand-primary rounded-2xl flex items-center justify-center">
            <Tray size={40} weight="duotone" className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-theme-text-primary">GudBro Waiter</h1>
          <p className="text-theme-text-secondary mt-1">Accedi per iniziare il turno</p>
        </div>

        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-theme-text-tertiary">
          GudBro Waiter v1.0.0
        </p>
      </div>
    </div>
  );
}
