'use client';

import Link from 'next/link';
import {
  equipment,
  facilities,
  requiredDocuments,
  insuranceOptions,
  gymRules,
} from '@/config/gym.config';
import { formatVNDPrice } from '@/lib/currency';

export default function InfoPage() {
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
            Gym Information
          </h1>
        </div>
      </div>

      <div className="mt-4 space-y-6 px-4">
        {/* Equipment Inventory */}
        <section className="animate-fade-in-up">
          <h2 className="font-display mb-3 text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Equipment
          </h2>
          <div className="space-y-3">
            {equipment.map((cat, i) => (
              <div
                key={cat.name}
                className="shadow-soft animate-fade-in-up rounded-2xl bg-white p-4"
                style={{ animationDelay: `${(i + 1) * 75}ms` }}
              >
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className="text-sm font-semibold">{cat.name}</h3>
                </div>
                <div className="space-y-1.5">
                  {cat.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs">
                      <svg
                        width="12"
                        height="12"
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
            ))}
          </div>
        </section>

        {/* Facilities */}
        <section className="animate-fade-in-up delay-200">
          <h2 className="font-display mb-3 text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Facilities
          </h2>
          <div className="shadow-soft rounded-2xl bg-white p-4">
            <div className="grid grid-cols-2 gap-2.5">
              {facilities.map((f) => (
                <div key={f.name} className="flex items-center gap-2">
                  <span className="text-base">{f.icon}</span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: f.available ? 'var(--charcoal)' : 'var(--charcoal-muted)' }}
                  >
                    {f.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Required Documents */}
        <section className="animate-fade-in-up delay-250">
          <h2 className="font-display mb-3 text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Registration Documents
          </h2>
          <div className="shadow-soft space-y-2.5 rounded-2xl bg-white p-4">
            {requiredDocuments.map((doc) => (
              <div key={doc.name} className="flex items-start gap-2">
                <div className="mt-0.5">
                  {doc.required ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--orange)"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--charcoal-muted)"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                </div>
                <span className="text-sm" style={{ color: 'var(--charcoal-light)' }}>
                  {doc.name}
                  {!doc.required && (
                    <span className="ml-1 text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                      (recommended)
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Insurance Options */}
        <section className="animate-fade-in-up delay-300">
          <h2 className="font-display mb-3 text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Insurance Options
          </h2>
          <div className="space-y-3">
            {insuranceOptions.map((opt) => (
              <div key={opt.name} className="shadow-soft rounded-2xl bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{opt.name}</h3>
                  <span className="font-display font-bold" style={{ color: 'var(--orange)' }}>
                    {formatVNDPrice(opt.price)}
                    <span
                      className="text-xs font-normal"
                      style={{ color: 'var(--charcoal-muted)' }}
                    >
                      /{opt.period}
                    </span>
                  </span>
                </div>
                <div className="space-y-1">
                  {opt.covers.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs">
                      <svg
                        width="12"
                        height="12"
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
            ))}
          </div>
        </section>

        {/* Gym Rules */}
        <section className="animate-fade-in-up delay-400 pb-4">
          <h2 className="font-display mb-3 text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Gym Rules
          </h2>
          <div className="shadow-soft rounded-2xl bg-white p-4">
            <ol className="space-y-2">
              {gymRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span
                    className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: 'var(--navy)' }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--charcoal-light)' }}>{rule}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
