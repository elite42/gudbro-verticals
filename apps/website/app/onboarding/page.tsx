'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChatWidget } from '@/components/onboarding';
import { startOnboarding, getOnboardingSession } from '@/lib/onboarding-service';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const existingSession = await getOnboardingSession();
      if (existingSession && !existingSession.isCompleted) {
        // Resume existing session
        const token = localStorage.getItem('gudbro_onboarding_token');
        if (token) {
          setSessionToken(token);
          setEmail(existingSession.email);
          setFirstName(existingSession.firstName || '');
        }
      } else {
        // Check for email in URL params
        const emailParam = searchParams.get('email');
        const nameParam = searchParams.get('name');
        if (emailParam) {
          setEmail(emailParam);
          if (nameParam) setFirstName(nameParam);
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, [searchParams]);

  const handleStartOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await startOnboarding(email, { firstName: firstName || undefined });
      if (result) {
        setSessionToken(result.sessionToken);
      } else {
        setError('Failed to start onboarding. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    // Redirect to sign-up to create account with pre-filled data
    router.push('/sign-up?from=onboarding');
  };

  // Loading state
  if (isLoading && !sessionToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-900 border-t-transparent dark:border-white" />
      </div>
    );
  }

  // Email input form
  if (!sessionToken) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="flex items-center justify-between p-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to home</span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8 text-center">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="text-4xl font-bold">GUDBRO</span>
              </Link>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                Let&apos;s set up your business
              </p>
              <p className="mt-2 text-gray-500 dark:text-gray-500">
                Our AI assistant will help you get started in minutes
              </p>
            </div>

            {/* Email form */}
            <form onSubmit={handleStartOnboarding} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
                />
              </div>

              <div>
                <label htmlFor="firstName" className="sr-only">
                  First name (optional)
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name (optional)"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full rounded-lg bg-gray-900 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900"
              >
                {isLoading ? 'Starting...' : 'Start Setup'}
              </button>
            </form>

            {/* Alternative */}
            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Prefer the traditional form?{' '}
              <Link
                href="/sign-up"
                className="underline hover:text-gray-700 dark:hover:text-gray-300"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Chat interface
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-bold">
            GUDBRO
          </Link>
          <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            AI Setup
          </span>
        </div>

        <Link
          href="/sign-up"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          Skip to form
        </Link>
      </header>

      {/* Chat Widget */}
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
        <ChatWidget
          sessionToken={sessionToken}
          email={email}
          firstName={firstName}
          onComplete={handleComplete}
          className="flex-1"
        />
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-900 border-t-transparent dark:border-white" />
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OnboardingContent />
    </Suspense>
  );
}
