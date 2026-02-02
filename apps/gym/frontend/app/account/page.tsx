'use client';

import Link from 'next/link';
import { mockCustomer } from '@/config/gym.config';

function QRCodePlaceholder({ data }: { data: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-44 h-44 bg-white border-2 rounded-2xl flex items-center justify-center p-3" style={{ borderColor: 'var(--cloud-dark)' }}>
        {/* Stylized QR placeholder */}
        <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-0.5">
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
      <p className="text-[10px] mt-2 font-mono" style={{ color: 'var(--charcoal-muted)' }}>{data}</p>
    </div>
  );
}

export default function AccountPage() {
  const customer = mockCustomer;
  const pass = customer.currentPass;
  const entriesUsed = pass.totalEntries - pass.remainingEntries;
  const progressPercent = (entriesUsed / pass.totalEntries) * 100;

  return (
    <main className="pb-24 max-w-lg mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 glass border-b px-4 py-3 animate-slide-down" style={{ borderColor: 'var(--cloud-dark)' }}>
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1.5 rounded-full hover:bg-gray-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </Link>
          <h1 className="font-display text-lg font-bold" style={{ color: 'var(--navy)' }}>My Account</h1>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-5">
        {/* Profile Card */}
        <section className="animate-fade-in-up">
          <div className="bg-gradient-to-br from-[var(--navy)] to-[#2a3f6e] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-display font-bold text-lg">{customer.name}</h2>
                <div className="flex items-center gap-1.5 text-xs opacity-80">
                  <span>{customer.flag}</span>
                  <span>Member since {new Date(customer.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Pass */}
        <section className="animate-fade-in-up delay-100">
          <h2 className="font-display text-base font-bold mb-2" style={{ color: 'var(--navy)' }}>Active Pass</h2>
          <div className="bg-white rounded-2xl p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-bold">{pass.type}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold" style={{ background: 'var(--success-light)', color: '#16A34A' }}>
                    {pass.status.toUpperCase()}
                  </span>
                  {!pass.expiresAt && (
                    <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>No expiry</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="font-display text-3xl font-extrabold" style={{ color: 'var(--orange)' }}>{pass.remainingEntries}</span>
                <span className="text-sm" style={{ color: 'var(--charcoal-muted)' }}>/{pass.totalEntries}</span>
                <div className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>entries left</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'var(--cloud-dark)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${100 - progressPercent}%`,
                  background: pass.remainingEntries <= 2 ? 'var(--error)' : 'var(--orange)',
                }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>{entriesUsed} used</span>
              <span className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>{pass.remainingEntries} remaining</span>
            </div>
          </div>
        </section>

        {/* Visit History */}
        <section className="animate-fade-in-up delay-150">
          <h2 className="font-display text-base font-bold mb-2" style={{ color: 'var(--navy)' }}>Recent Visits</h2>
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            {customer.visitHistory.map((visit, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 border-b last:border-b-0"
                style={{ borderColor: 'var(--cloud-dark)' }}
              >
                <div>
                  <div className="text-sm font-medium">
                    {new Date(visit.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--charcoal-muted)' }}>
                    {visit.checkInTime} – {visit.checkOutTime}
                  </div>
                </div>
                <div className="text-right">
                  {visit.class ? (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--orange-light)', color: 'var(--orange-dark)' }}>
                      {visit.class}
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>Open gym</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documents Status */}
        <section className="animate-fade-in-up delay-200">
          <h2 className="font-display text-base font-bold mb-2" style={{ color: 'var(--navy)' }}>Documents</h2>
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            {customer.documents.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between p-3.5 border-b last:border-b-0"
                style={{ borderColor: 'var(--cloud-dark)' }}
              >
                <span className="text-sm">{doc.name}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: doc.status === 'verified' ? 'var(--success-light)' : 'var(--yellow-light)',
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
          <h2 className="font-display text-base font-bold mb-2" style={{ color: 'var(--navy)' }}>Check-in QR Code</h2>
          <div className="bg-white rounded-2xl p-5 shadow-soft flex flex-col items-center">
            <QRCodePlaceholder data={`gym.gudbro.com/qr?gym=iron-paradise-danang&customer=${customer.id}`} />
            <p className="text-xs mt-3 text-center" style={{ color: 'var(--charcoal-muted)' }}>
              Show this QR code at reception for quick check-in
            </p>
          </div>
        </section>

        {/* Promotions */}
        <section className="animate-fade-in-up delay-300 pb-4">
          <Link
            href="/promotions"
            className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-soft hover-lift"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎁</span>
              <div>
                <span className="text-sm font-semibold">Available Promotions</span>
                <p className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>Check current offers and discounts</p>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal-muted)" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </section>
      </div>
    </main>
  );
}
