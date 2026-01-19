'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TwoFactorVerify from '@/components/auth/TwoFactorVerify';
import { createBrowserClient } from '@supabase/ssr';

export default function Verify2FAPage() {
  const router = useRouter();

  const handleVerified = useCallback(() => {
    // Redirect to dashboard after successful 2FA verification
    router.push('/');
  }, [router]);

  const handleCancel = useCallback(async () => {
    // Sign out and redirect to login
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push('/login');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">GUDBRO</h1>
          <p className="mt-2 text-gray-500">Backoffice</p>
        </div>

        {/* 2FA Verification Component */}
        <TwoFactorVerify onVerified={handleVerified} onCancel={handleCancel} />

        {/* Help text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Lost access to your authenticator?{' '}
            <a href="mailto:support@gudbro.com" className="text-blue-600 hover:text-blue-700">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
