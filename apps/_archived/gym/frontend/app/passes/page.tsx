'use client';

import Link from 'next/link';
import { useState } from 'react';
import { passes } from '@/config/gym.config';
import { formatVNDPrice } from '@/lib/currency';

const faqs = [
  {
    q: 'How does the 10-Entry Pack work?',
    a: 'You purchase 10 entries upfront. Each time you visit and check in, one entry is deducted. Entries never expire, so you can use them at your own pace. Perfect for irregular schedules.',
  },
  {
    q: "What's included with a Day Pass?",
    a: 'Full gym access, locker, towel, hot/cold showers, WiFi, and one group class if scheduled that day. Pool access requires a weekly pass or above.',
  },
  {
    q: 'What is convention pricing?',
    a: 'Partners, hotels, and corporate clients get 20% off standard rates. Ask at reception or show your partner code/room key for the discounted rate.',
  },
  {
    q: 'Can I upgrade my pass?',
    a: "Yes. If you want to upgrade mid-pass, we'll credit the remaining value toward the new pass. Contact reception for details.",
  },
  {
    q: 'Are group classes included?',
    a: 'All group classes (Boxing, Yoga, CrossFit, HIIT, Pilates) are included with any pass. Swimming coaching is included with weekly pass and above.',
  },
];

export default function PassesPage() {
  const [showConvention, setShowConvention] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            Passes & Pricing
          </h1>
        </div>
      </div>

      {/* Convention Toggle */}
      <div className="animate-fade-in-up mt-4 px-4">
        <button
          onClick={() => setShowConvention(!showConvention)}
          className="flex w-full items-center justify-between rounded-2xl border-2 p-3.5 transition-all"
          style={{
            borderColor: showConvention ? 'var(--orange)' : 'var(--cloud-dark)',
            background: showConvention ? 'var(--orange-light)' : 'white',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🏨</span>
            <div className="text-left">
              <span className="block text-sm font-semibold">Convention / Partner Rate</span>
              <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                Hotel guests, corporate partners
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-bold text-green-700">
              -20%
            </span>
            <div
              className="relative h-6 w-10 rounded-full transition-colors"
              style={{ background: showConvention ? 'var(--orange)' : '#D1D5DB' }}
            >
              <div
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all"
                style={{ left: showConvention ? '18px' : '2px' }}
              />
            </div>
          </div>
        </button>
      </div>

      {/* Passes Grid */}
      <div className="mt-5 space-y-3 px-4">
        {passes.map((pass, i) => {
          const price = showConvention ? pass.conventionPrice : pass.price;
          return (
            <div
              key={pass.id}
              className={`shadow-soft animate-fade-in-up rounded-2xl bg-white p-4 ${pass.popular ? 'ring-2' : ''}`}
              style={{
                animationDelay: `${(i + 1) * 75}ms`,
                ...(pass.popular
                  ? ({ '--tw-ring-color': 'var(--orange)' } as React.CSSProperties)
                  : {}),
              }}
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-bold">{pass.name}</h3>
                    {pass.popular && (
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
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
                  <div
                    className="font-display text-xl font-bold"
                    style={{ color: 'var(--orange)' }}
                  >
                    {formatVNDPrice(price)}
                  </div>
                  {showConvention && (
                    <div
                      className="text-xs line-through"
                      style={{ color: 'var(--charcoal-muted)' }}
                    >
                      {formatVNDPrice(pass.price)}
                    </div>
                  )}
                </div>
              </div>
              <p className="mb-3 text-sm" style={{ color: 'var(--charcoal-light)' }}>
                {pass.description}
              </p>
              {pass.note && (
                <div
                  className="mb-3 rounded-xl p-2.5 text-xs"
                  style={{ background: 'var(--yellow-light)', color: 'var(--gold)' }}
                >
                  💡 {pass.note}
                </div>
              )}
              <div className="space-y-1">
                {pass.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--success)"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ color: 'var(--charcoal-light)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <section className="mb-4 mt-8 px-4">
        <h2 className="font-display mb-3 text-lg font-bold" style={{ color: 'var(--navy)' }}>
          FAQ
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="shadow-soft overflow-hidden rounded-2xl bg-white">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <span className="pr-4 text-sm font-semibold">{faq.q}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 transition-transform"
                  style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openFaq === i && (
                <div
                  className="animate-fade-in-up px-4 pb-4 text-sm"
                  style={{ color: 'var(--charcoal-light)' }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
