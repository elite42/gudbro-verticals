'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react';
import { SpinnerGap } from '@phosphor-icons/react';
import OnboardingWizard from '@/components/accommodations/OnboardingWizard';

const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';
const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_API_KEY}`,
  };
}

export default function OnboardingPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!PROPERTY_ID) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/api/accommodations/property?propertyId=${PROPERTY_ID}`, {
          headers: authHeaders(),
        });
        const data = await res.json();

        if (data.property) {
          // If onboarding already completed, redirect to dashboard
          if (data.property.onboarding_progress?.completed_at) {
            router.push('/accommodations');
            return;
          }
          setProperty(data.property);
        }
      } catch (err) {
        console.error('Error loading property:', err);
        setError('Failed to load property data');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  if (!PROPERTY_ID) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-900">Property Setup</h1>
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="font-medium text-amber-800">No property configured</p>
          <p className="mt-1 text-sm text-amber-600">
            Set the{' '}
            <code className="rounded bg-amber-100 px-1 py-0.5">NEXT_PUBLIC_ACCOM_PROPERTY_ID</code>{' '}
            environment variable to get started.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <SpinnerGap className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => router.push('/accommodations')}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Property Setup</h1>
            <p className="text-sm text-gray-500">
              Complete these steps to get your property ready for guests
            </p>
          </div>
        </div>
      </div>

      {property && (
        <OnboardingWizard
          propertyId={PROPERTY_ID}
          property={property}
          onComplete={() => {
            router.push('/accommodations');
          }}
        />
      )}
    </div>
  );
}
