'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            *
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Check your email
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We sent a verification link to{' '}
            <span className="font-medium text-gray-900 dark:text-white">{email}</span>
          </p>

          {/* Instructions */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Click the link in the email to verify your account. The link will expire in 24 hours.
            </p>
            <ul className="text-sm text-gray-500 dark:text-gray-500 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-gray-400">1.</span>
                <span>Check your inbox (and spam folder)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">2.</span>
                <span>Click the verification link</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">3.</span>
                <span>You&apos;ll be redirected to complete setup</span>
              </li>
            </ul>
          </div>

          {/* Resend link */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Didn&apos;t receive the email?{' '}
            <button className="text-gray-900 dark:text-white font-medium hover:underline">
              Resend verification email
            </button>
          </p>

          {/* Back to sign in */}
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-gray-900 rounded-full"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
