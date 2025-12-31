'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SignUpWizard } from '@/components/auth';

function SignUpContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'free';

  return <SignUpWizard initialPlan={plan} />;
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="animate-spin h-8 w-8 border-4 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full" />
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
