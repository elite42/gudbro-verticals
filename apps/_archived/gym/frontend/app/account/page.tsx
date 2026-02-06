'use client';

import Link from 'next/link';
import { mockCustomer } from '@/config/gym.config';

function QRCodePlaceholder({ data }: { data: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex h-44 w-44 items-center justify-center rounded-2xl border-2 bg-white p-3"
        style={{ borderColor: 'var(--cloud-dark)' }}
      >
        {/* Stylized QR placeholder */}
        <div className="grid-rows-7 grid h-full w-full grid-cols-7 gap-0.5">
          {Array.from({ length: 49 }).map((_, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const isCorner = (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3);
            const isFilled = isCorner || Math.random() > 0.4;
            return (
              <div
                key={i}
                className="rounded-sm"
                style={{ background: isFilled ? 'var(--navy)' : 'transparent' }}
              />
            );
          })}
        </div>
      </div>
      <p className="mt-2 font-mono text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
        {data}
      </p>
    </div>
  );
}

export default function AccountPage() {
  const customer = mockCustomer;
  const pass = customer.currentPass;
  const entriesUsed = pass.totalEntries - pass.remainingEntries;
  const progressPercent = (entriesUsed / pass.totalEntries) * 100;

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
            My Account
          </h1>
        </div>
      </div>

      <div className="mt-4 space-y-5 px-4">
        {/* Profile Card */}
        <section className="animate-fade-in-up">
          <div className="rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[#2a3f6e] p-5 text-white">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-display text-lg font-bold">{customer.name}</h2>
                <div className="flex items-center gap-1.5 text-xs opacity-80">
                  <span>{customer.flag}</span>
                  <span>
                    Member since{' '}
                    {new Date(customer.memberSince).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Pass */}
        <section className="animate-fade-in-up delay-100">
          <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
            Active Pass
          </h2>
          <div className="shadow-soft rounded-2xl bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold">{pass.type}</span>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className="rounded-full px-1.5 py-0.5 text-xs font-semibold"
                    style={{ background: 'var(--success-light)', color: '#16A34A' }}
                  >
                    {pass.status.toUpperCase()}
                  </span>
                  {!pass.expiresAt && (
                    <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                      No expiry
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span
                  className="font-display text-3xl font-extrabold"
                  style={{ color: 'var(--orange)' }}
                >
                  {pass.remainingEntries}
                </span>
                <span className="text-sm" style={{ color: 'var(--charcoal-muted)' }}>
                  /{pass.totalEntries}
                </span>
                <div className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                  entries left
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div
              className="h-3 w-full overflow-hidden rounded-full"
              style={{ background: 'var(--cloud-dark)' }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${100 - progressPercent}%`,
                  background: pass.remainingEntries <= 2 ? 'var(--error)' : 'var(--orange)',
                }}
              />
            </div>
            <div className="mt-1.5 flex justify-between">
              <span className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                {entriesUsed} used
              </span>
              <span className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                {pass.remainingEntries} remaining
              </span>
            </div>
          </div>
        </section>

        {/* Visit History */}
        <section className="animate-fade-in-up delay-150">
          <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
            Recent Visits
          </h2>
          <div className="shadow-soft overflow-hidden rounded-2xl bg-white">
            {customer.visitHistory.map((visit, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b p-3.5 last:border-b-0"
                style={{ borderColor: 'var(--cloud-dark)' }}
              >
                <div>
                  <div className="text-sm font-medium">
                    {new Date(visit.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="mt-0.5 text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                    {visit.checkInTime} – {visit.checkOutTime}
                  </div>
                </div>
                <div className="text-right">
                  {visit.class ? (
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{ background: 'var(--orange-light)', color: 'var(--orange-dark)' }}
                    >
                      {visit.class}
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                      Open gym
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documents Status */}
        <section className="animate-fade-in-up delay-200">
          <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
            Documents
          </h2>
          <div className="shadow-soft overflow-hidden rounded-2xl bg-white">
            {customer.documents.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between border-b p-3.5 last:border-b-0"
                style={{ borderColor: 'var(--cloud-dark)' }}
              >
                <span className="text-sm">{doc.name}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-semibold"
                  style={{
                    background:
                      doc.status === 'verified' ? 'var(--success-light)' : 'var(--yellow-light)',
                    color: doc.status === 'verified' ? '#16A34A' : 'var(--gold)',
                  }}
                >
                  {doc.status === 'verified' ? '✓ Verified' : '⏳ Pending'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* QR Code */}
        <section className="animate-fade-in-up delay-250">
          <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
            Check-in QR Code
          </h2>
          <div className="shadow-soft flex flex-col items-center rounded-2xl bg-white p-5">
            <QRCodePlaceholder
              data={`gym.gudbro.com/qr?gym=iron-paradise-danang&customer=${customer.id}`}
            />
            <p className="mt-3 text-center text-xs" style={{ color: 'var(--charcoal-muted)' }}>
              Show this QR code at reception for quick check-in
            </p>
          </div>
        </section>

        {/* Promotions */}
        <section className="animate-fade-in-up pb-4 delay-300">
          <Link
            href="/promotions"
            className="shadow-soft hover-lift flex items-center justify-between rounded-2xl bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎁</span>
              <div>
                <span className="text-sm font-semibold">Available Promotions</span>
                <p className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                  Check current offers and discounts
                </p>
              </div>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--charcoal-muted)"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </section>
      </div>
    </main>
  );
}
