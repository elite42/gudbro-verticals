'use client';

import Link from 'next/link';
import { promotions, gymConfig } from '@/config/gym.config';

export default function PromotionsPage() {
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
            Promotions
          </h1>
          <span
            className="rounded-full px-2 py-0.5 text-xs font-bold"
            style={{ background: 'var(--orange)', color: 'white' }}
          >
            {promotions.length} active
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-4 px-4">
        {promotions.map((promo, i) => (
          <div
            key={promo.id}
            className="shadow-soft animate-fade-in-up overflow-hidden rounded-2xl bg-white"
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          >
            {/* Image */}
            <div
              className="relative h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${promo.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span
                className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white"
                style={{ background: 'var(--orange)' }}
              >
                {promo.badge}
              </span>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h2 className="font-display text-lg font-bold">{promo.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
                {promo.description}
              </p>
              <p className="mt-2 text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                {promo.details}
              </p>

              {/* Conditions */}
              <div className="mt-3 space-y-1">
                {promo.conditions.map((cond) => (
                  <div key={cond} className="flex items-center gap-2 text-xs">
                    <span style={{ color: 'var(--charcoal-muted)' }}>•</span>
                    <span style={{ color: 'var(--charcoal-muted)' }}>{cond}</span>
                  </div>
                ))}
              </div>

              {/* Valid Until */}
              <div
                className="mt-3 flex items-center justify-between border-t pt-3"
                style={{ borderColor: 'var(--cloud-dark)' }}
              >
                <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                  Valid until{' '}
                  {new Date(promo.validUntil).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <a
                  href={`https://wa.me/${gymConfig.contact.whatsappNumber.replace(/\s/g, '')}?text=${encodeURIComponent(`Hi! I'd like to use the "${promo.title}" promotion.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-3 py-1.5 text-xs font-bold text-white"
                  style={{ background: 'var(--orange)' }}
                >
                  Claim Offer
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="animate-fade-in-up delay-400 mb-4 mt-6 px-4">
        <div className="rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[#2a3f6e] p-5 text-center text-white">
          <h3 className="font-display font-bold">Questions about promotions?</h3>
          <p className="mt-1 text-sm opacity-80">Contact us anytime</p>
          <div className="mt-3 flex justify-center gap-3">
            <a
              href={`https://wa.me/${gymConfig.contact.whatsappNumber.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-4 py-2 text-sm font-semibold"
              style={{ background: '#25D366' }}
            >
              WhatsApp
            </a>
            <a
              href={`https://zalo.me/${gymConfig.contact.zaloId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-4 py-2 text-sm font-semibold"
              style={{ background: '#0068FF' }}
            >
              Zalo
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
