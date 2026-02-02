'use client';

/**
 * V2 Reset Password Client Component
 *
 * Form per reimpostare la password usando Supabase Auth.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Lock,
  Eye,
  EyeSlash,
  Check,
  Warning,
  ArrowLeft,
} from '@phosphor-icons/react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { coffeeshopConfig } from '@/config/coffeeshop.config';

export default function V2ResetPasswordClient() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  // Password validation
  const isLongEnough = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const isValid = isLongEnough && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLongEnough) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setError('Authentication not configured');
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
          router.push('/v2/account');
        }, 2500);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div
      data-theme={isDark ? 'dark' : 'light'}
      className="min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-4 py-4"
        style={{
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1
            className="font-display text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Reset Password
          </h1>
        </div>
      </header>

      <main className="container-app px-4 py-8">
        <div className="mx-auto max-w-sm">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-12 text-center"
            >
              <motion.div
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background: 'var(--status-success)', color: 'white' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                <Check size={40} weight="bold" />
              </motion.div>

              <h2
                className="font-display text-xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Password Updated!
              </h2>
              <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
                Redirecting to your account...
              </p>

              <motion.div
                className="mt-4 h-1 w-32 overflow-hidden rounded-full"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <motion.div
                  className="h-full"
                  style={{ background: 'var(--interactive-primary)' }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5 }}
                />
              </motion.div>
            </motion.div>
          ) : (
            <>
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <Lock size={32} weight="fill" style={{ color: 'var(--interactive-primary)' }} />
                </div>
              </div>

              {/* Title */}
              <div className="mb-8 text-center">
                <h2
                  className="font-display text-xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Create New Password
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Choose a strong password with at least 6 characters
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Warning size={18} />
                    <p className="text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 pr-12"
                      style={{
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-medium)',
                      }}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1"
                  >
                    <PasswordRequirement met={isLongEnough} text="At least 6 characters" />
                    <PasswordRequirement met={hasUppercase} text="Contains uppercase letter" optional />
                    <PasswordRequirement met={hasNumber} text="Contains a number" optional />
                  </motion.div>
                )}

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1 block text-sm font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 pr-12"
                      style={{
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: `1px solid ${
                          confirmPassword.length > 0
                            ? passwordsMatch
                              ? 'var(--status-success)'
                              : 'var(--status-error)'
                            : 'var(--border-medium)'
                        }`,
                      }}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading || !isValid}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-medium"
                  style={{
                    background: isValid
                      ? 'var(--interactive-primary)'
                      : 'var(--bg-tertiary)',
                    color: isValid ? 'white' : 'var(--text-tertiary)',
                    opacity: loading ? 0.7 : 1,
                  }}
                  whileHover={isValid ? { scale: 1.01 } : {}}
                  whileTap={isValid ? { scale: 0.99 } : {}}
                >
                  {loading ? (
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    'Update Password'
                  )}
                </motion.button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function PasswordRequirement({
  met,
  text,
  optional,
}: {
  met: boolean;
  text: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex h-4 w-4 items-center justify-center rounded-full"
        style={{
          background: met ? 'var(--status-success)' : 'var(--bg-tertiary)',
        }}
      >
        {met && <Check size={10} weight="bold" style={{ color: 'white' }} />}
      </div>
      <span
        className="text-sm"
        style={{
          color: met ? 'var(--text-primary)' : 'var(--text-tertiary)',
        }}
      >
        {text}
        {optional && (
          <span style={{ color: 'var(--text-muted)' }}> (optional)</span>
        )}
      </span>
    </div>
  );
}
