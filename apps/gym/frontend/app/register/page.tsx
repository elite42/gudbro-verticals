'use client';

import Link from 'next/link';
import { useState } from 'react';
import { passes, requiredDocuments, gymConfig } from '@/config/gym.config';
import { formatVNDPrice } from '@/lib/currency';

export default function RegisterPage() {
  const [isConvention, setIsConvention] = useState(false);
  const [conventionCode, setConventionCode] = useState('');
  const [selectedPass, setSelectedPass] = useState('monthly');
  const [agreedTerms, setAgreedTerms] = useState(false);

  const currentPass = passes.find((p) => p.id === selectedPass)!;
  const price = isConvention ? currentPass.conventionPrice : currentPass.price;

  return (
    <main className="mx-auto max-w-lg pb-24">
      {/* Header */}
      <div
        className="glass animate-slide-down sticky top-0 z-40 border-b px-4 py-3"
        style={{ borderColor: 'var(--cloud-dark)' }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="rounded-full p-1.5 hover:bg-gray-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <h1 className="font-display text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Register
          </h1>
        </div>
      </div>

      <div className="mt-4 space-y-5 px-4">
        {/* Convention Toggle */}
        <section className="animate-fade-in-up">
          <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
            Registration Type
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsConvention(false)}
              className="flex-1 rounded-2xl border-2 p-3.5 text-center transition-all"
              style={{
                borderColor: !isConvention ? 'var(--orange)' : 'var(--cloud-dark)',
                background: !isConvention ? 'var(--orange-light)' : 'white',
              }}
            >
              <span className="mb-1 block text-2xl">🏋️</span>
              <span className="block text-sm font-semibold">Direct</span>
              <span className="mt-0.5 block text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                Standard pricing
              </span>
            </button>
            <button
              onClick={() => setIsConvention(true)}
              className="flex-1 rounded-2xl border-2 p-3.5 text-center transition-all"
              style={{
                borderColor: isConvention ? 'var(--orange)' : 'var(--cloud-dark)',
                background: isConvention ? 'var(--orange-light)' : 'white',
              }}
            >
              <span className="mb-1 block text-2xl">🏨</span>
              <span className="block text-sm font-semibold">Convention</span>
              <span className="mt-0.5 block text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                Partner -20%
              </span>
            </button>
          </div>

          {isConvention && (
            <div className="animate-fade-in-up mt-3">
              <label
                className="mb-1 block text-xs font-medium"
                style={{ color: 'var(--charcoal-light)' }}
              >
                Partner Code
              </label>
              <input
                type="text"
                placeholder="Enter your hotel/partner code"
                value={conventionCode}
                onChange={(e) => setConventionCode(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-sm"
                style={{ borderColor: 'var(--cloud-dark)' }}
              />
            </div>
          )}
        </section>

        {/* Pass Selection */}
        <section className="animate-fade-in-up delay-100">
          <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
            Choose Your Pass
          </h2>
          <div className="space-y-2">
            {passes.map((pass) => (
              <button
                key={pass.id}
                onClick={() => setSelectedPass(pass.id)}
                className="flex w-full items-center justify-between rounded-2xl border-2 p-3.5 text-left transition-all"
                style={{
                  borderColor: selectedPass === pass.id ? 'var(--orange)' : 'var(--cloud-dark)',
                  background: selectedPass === pass.id ? 'var(--orange-light)' : 'white',
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{pass.name}</span>
                    {pass.popular && (
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                        style={{ background: 'var(--yellow-light)', color: 'var(--gold)' }}
                      >
                        POPULAR
                      </span>
                    )}
                  </div>
                  <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                    {pass.duration}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold" style={{ color: 'var(--orange)' }}>
                    {formatVNDPrice(isConvention ? pass.conventionPrice : pass.price)}
                  </div>
                  {isConvention && (
                    <div
                      className="text-[10px] line-through"
                      style={{ color: 'var(--charcoal-muted)' }}
                    >
                      {formatVNDPrice(pass.price)}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Required Documents */}
        <section className="animate-fade-in-up delay-150">
          <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
            Required Documents
          </h2>
          <div className="shadow-soft space-y-2.5 rounded-2xl bg-white p-4">
            {requiredDocuments.map((doc) => (
              <div key={doc.name} className="flex items-center gap-2">
                <div
                  className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded"
                  style={{ background: doc.required ? 'var(--orange-light)' : 'var(--cloud-dark)' }}
                >
                  {doc.required ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--orange)"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                      ○
                    </span>
                  )}
                </div>
                <span className="text-sm" style={{ color: 'var(--charcoal-light)' }}>
                  {doc.name}
                  {!doc.required && (
                    <span className="ml-1 text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                      (optional)
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Personal Info Form */}
        <section className="animate-fade-in-up delay-200">
          <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
            Personal Information
          </h2>
          <div className="space-y-3">
            <div>
              <label
                className="mb-1 block text-xs font-medium"
                style={{ color: 'var(--charcoal-light)' }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="As on passport/ID"
                className="w-full rounded-xl border px-4 py-3 text-sm"
                style={{ borderColor: 'var(--cloud-dark)' }}
              />
            </div>
            <div>
              <label
                className="mb-1 block text-xs font-medium"
                style={{ color: 'var(--charcoal-light)' }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-xl border px-4 py-3 text-sm"
                style={{ borderColor: 'var(--cloud-dark)' }}
              />
            </div>
            <div>
              <label
                className="mb-1 block text-xs font-medium"
                style={{ color: 'var(--charcoal-light)' }}
              >
                Phone (WhatsApp)
              </label>
              <input
                type="tel"
                placeholder="+84 xxx xxx xxx"
                className="w-full rounded-xl border px-4 py-3 text-sm"
                style={{ borderColor: 'var(--cloud-dark)' }}
              />
            </div>
            <div>
              <label
                className="mb-1 block text-xs font-medium"
                style={{ color: 'var(--charcoal-light)' }}
              >
                Nationality
              </label>
              <input
                type="text"
                placeholder="e.g., Australian"
                className="w-full rounded-xl border px-4 py-3 text-sm"
                style={{ borderColor: 'var(--cloud-dark)' }}
              />
            </div>
            <div>
              <label
                className="mb-1 block text-xs font-medium"
                style={{ color: 'var(--charcoal-light)' }}
              >
                Emergency Contact
              </label>
              <input
                type="text"
                placeholder="Name & phone number"
                className="w-full rounded-xl border px-4 py-3 text-sm"
                style={{ borderColor: 'var(--cloud-dark)' }}
              />
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="animate-fade-in-up delay-250">
          <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
            Payment Methods
          </h2>
          <div className="flex flex-wrap gap-2">
            {gymConfig.paymentMethods.map((method) => (
              <span
                key={method}
                className="shadow-soft rounded-full bg-white px-3 py-1.5 text-xs font-medium"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs" style={{ color: 'var(--charcoal-muted)' }}>
            Payment is collected at the gym reception.
          </p>
        </section>

        {/* Terms */}
        <section className="animate-fade-in-up delay-300">
          <button
            onClick={() => setAgreedTerms(!agreedTerms)}
            className="flex items-start gap-3 text-left"
          >
            <div
              className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all"
              style={{
                borderColor: agreedTerms ? 'var(--orange)' : 'var(--cloud-dark)',
                background: agreedTerms ? 'var(--orange)' : 'white',
              }}
            >
              {agreedTerms && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-xs leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
              I agree to the gym rules, waiver of liability, and terms of service. I confirm that I
              am in good health and exercise at my own risk.
            </span>
          </button>
        </section>

        {/* Summary & CTA */}
        <section className="animate-fade-in-up delay-400 pb-4">
          <div className="shadow-soft mb-4 rounded-2xl bg-white p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">Selected Pass</span>
              <span className="text-sm font-bold">{currentPass.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="font-display text-xl font-bold" style={{ color: 'var(--orange)' }}>
                {formatVNDPrice(price)}
              </span>
            </div>
            {isConvention && (
              <div className="text-right text-xs" style={{ color: 'var(--success)' }}>
                Convention discount applied (-20%)
              </div>
            )}
          </div>

          <a
            href={`https://wa.me/84935456789?text=${encodeURIComponent(`Hi! I'd like to register for the ${currentPass.name}${isConvention ? ' (convention rate)' : ''}. My name is ___`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold text-white transition-all ${!agreedTerms ? 'pointer-events-none opacity-50' : ''}`}
            style={{ background: 'var(--orange)' }}
          >
            Complete Registration via WhatsApp →
          </a>
          <p className="mt-2 text-center text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
            You&apos;ll complete payment and document verification at the gym.
          </p>
        </section>
      </div>
    </main>
  );
}
