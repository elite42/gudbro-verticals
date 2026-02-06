'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* =============================================================================
   DATA
   ============================================================================= */

const OTC_ITEMS = [
  'Paracetamol / Ibuprofen (pain, fever)',
  'Loperamide (diarrhea)',
  'ORS Electrolytes (dehydration)',
  'Antihistamines (allergy)',
  'Cough & cold medicines',
  'Vitamins & supplements',
  'Sunscreen & skincare',
  'First aid supplies',
  'Insect repellent',
];

const PRESCRIPTION_ITEMS = [
  'Antibiotics (Amoxicillin, Azithromycin)',
  'Strong pain medication',
  'Sleep aids',
  'Hormonal medications',
];

const CONTROLLED_ITEMS = [
  'Codeine (found in some cough syrups abroad)',
  'Diazepam (Valium)',
  'Zolpidem (Ambien)',
  'Tramadol',
  'Pseudoephedrine (high doses)',
];

const PRICE_DATA = [
  { medicine: 'Paracetamol 500mg', vnd: '15,000 – 30,000', usd: '$0.60 – $1.20' },
  { medicine: 'Ibuprofen 400mg', vnd: '25,000 – 45,000', usd: '$1.00 – $1.80' },
  { medicine: 'Loperamide 2mg', vnd: '20,000 – 40,000', usd: '$0.80 – $1.60' },
  { medicine: 'ORS Packet', vnd: '5,000 – 10,000', usd: '$0.20 – $0.40' },
  { medicine: 'Antihistamine', vnd: '15,000 – 30,000', usd: '$0.60 – $1.20' },
  { medicine: 'Sunscreen SPF50', vnd: '80,000 – 200,000', usd: '$3.20 – $8.00' },
  { medicine: 'Insect Repellent', vnd: '25,000 – 50,000', usd: '$1.00 – $2.00' },
];

const PHRASES = [
  { english: 'I need medicine', vietnamese: 'Tôi cần thuốc', pronunciation: 'Toy can took' },
  { english: 'How much?', vietnamese: 'Bao nhiêu?', pronunciation: 'Bow nyew' },
  { english: 'Headache', vietnamese: 'Đau đầu', pronunciation: 'Dow dow' },
  { english: 'Stomach ache', vietnamese: 'Đau bụng', pronunciation: 'Dow boong' },
  { english: 'Allergy', vietnamese: 'Dị ứng', pronunciation: 'Zee uhng' },
  { english: 'Fever', vietnamese: 'Sốt', pronunciation: 'Soht' },
  { english: 'Diarrhea', vietnamese: 'Tiêu chảy', pronunciation: 'Tyew chai' },
  {
    english: "I'm allergic to...",
    vietnamese: 'Tôi bị dị ứng với...',
    pronunciation: 'Toy bee zee uhng voy',
  },
];

const EMERGENCY_NUMBERS = [
  { icon: '🏥', label: 'Emergency', number: '115', href: 'tel:115' },
  { icon: '🚔', label: 'Police', number: '113', href: 'tel:113' },
  {
    icon: '🏥',
    label: 'Da Nang General Hospital',
    number: '+84 236 3822 344',
    href: 'tel:+842363822344',
  },
  {
    icon: '🏥',
    label: 'Family Medical Practice (English)',
    number: '+84 28 3822 7848',
    href: 'tel:+842838227848',
  },
];

/* =============================================================================
   MAIN COMPONENT
   ============================================================================= */

export default function PharmacyInfoPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--cloud)' }}>
      {/* ================================================================
          HEADER
          ================================================================ */}
      <header
        className="glass sticky top-0 z-40 border-b"
        style={{ borderColor: 'rgba(45, 159, 131, 0.12)' }}
      >
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
              style={{ background: 'var(--green-light)' }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--green)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1
                className="font-display text-[15px] font-bold leading-tight"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
              >
                Pharmacy Guide for Tourists
              </h1>
              <p
                className="text-[10px] font-medium uppercase tracking-wide"
                style={{ color: 'var(--green)' }}
              >
                Da Nang, Vietnam
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4">
        {/* ================================================================
            OTC MEDICINES
            ================================================================ */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div
            className="shadow-soft rounded-2xl bg-white p-5"
            style={{ borderLeft: '4px solid var(--green)' }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">✅</span>
              <h2
                className="font-display text-[15px] font-bold"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
              >
                What You CAN Buy Without Prescription
              </h2>
            </div>

            <ul className="space-y-2">
              {OTC_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg
                    className="mt-0.5 flex-shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--green)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span
                    className="text-[13px] leading-snug"
                    style={{ color: 'var(--charcoal-light)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================================================================
            PRESCRIPTION MEDICINES
            ================================================================ */}
        <section className={`mt-4 ${mounted ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <div
            className="shadow-soft rounded-2xl bg-white p-5"
            style={{ borderLeft: '4px solid var(--amber)' }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <h2
                className="font-display text-[15px] font-bold"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
              >
                Requires Prescription
              </h2>
            </div>

            <p
              className="mb-3 text-[11px] italic leading-relaxed"
              style={{ color: 'var(--charcoal-muted)' }}
            >
              (but often sold OTC in practice)
            </p>

            {/* Warning callout */}
            <div className="mb-4 rounded-xl p-3" style={{ background: 'var(--amber-light)' }}>
              <p
                className="text-[12px] font-medium leading-relaxed"
                style={{ color: 'var(--charcoal-light)' }}
              >
                <span className="font-bold" style={{ color: 'var(--amber)' }}>
                  86.8%
                </span>{' '}
                of Vietnamese pharmacies sell antibiotics without prescription, but this is{' '}
                <span className="font-bold">technically illegal</span>.
              </p>
            </div>

            <ul className="mb-4 space-y-2">
              {PRESCRIPTION_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg
                    className="mt-0.5 flex-shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--amber)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span
                    className="text-[13px] leading-snug"
                    style={{ color: 'var(--charcoal-light)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--charcoal-muted)' }}>
              Pharmacists may sell these without asking for a prescription, but you should{' '}
              <span className="font-semibold" style={{ color: 'var(--charcoal-light)' }}>
                always consult a doctor
              </span>
              .
            </p>
          </div>
        </section>

        {/* ================================================================
            CONTROLLED SUBSTANCES
            ================================================================ */}
        <section className={`mt-4 ${mounted ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <div
            className="shadow-soft rounded-2xl p-5"
            style={{
              borderLeft: '4px solid var(--red)',
              background: 'var(--red-light)',
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">🚫</span>
              <h2
                className="font-display text-[15px] font-bold"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
              >
                CONTROLLED in Vietnam
              </h2>
            </div>

            {/* Bold warning banner */}
            <div
              className="mb-4 rounded-xl p-3 text-center"
              style={{
                background: 'var(--red)',
              }}
            >
              <p className="text-[12px] font-bold uppercase tracking-wide text-white">
                DO NOT Attempt to Buy
              </p>
            </div>

            <ul className="mb-4 space-y-2">
              {CONTROLLED_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg
                    className="mt-0.5 flex-shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--red)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span
                    className="text-[13px] leading-snug"
                    style={{ color: 'var(--charcoal-light)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p
              className="text-[12px] font-medium leading-relaxed"
              style={{ color: 'var(--charcoal-light)' }}
            >
              Possessing these without a Vietnamese prescription can lead to{' '}
              <span className="font-bold" style={{ color: 'var(--red)' }}>
                legal issues
              </span>
              .
            </p>
          </div>
        </section>

        {/* ================================================================
            PRICE GUIDE
            ================================================================ */}
        <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <h2
            className="font-display mb-3 text-[15px] font-bold"
            style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
          >
            💰 Price Guide
          </h2>

          <div className="shadow-soft overflow-hidden rounded-2xl bg-white">
            {/* Table Header */}
            <div
              className="grid grid-cols-[1fr_auto_auto] gap-2 px-4 py-3"
              style={{ background: 'var(--green-light)' }}
            >
              <p
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--green-dark)' }}
              >
                Medicine
              </p>
              <p
                className="min-w-[90px] text-right text-[11px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--green-dark)' }}
              >
                VND
              </p>
              <p
                className="min-w-[80px] text-right text-[11px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--green-dark)' }}
              >
                USD
              </p>
            </div>

            {/* Table Rows */}
            {PRICE_DATA.map((row, i) => (
              <div
                key={row.medicine}
                className="grid grid-cols-[1fr_auto_auto] gap-2 border-t px-4 py-3"
                style={{
                  borderColor: 'var(--cloud-dark)',
                  background: i % 2 === 1 ? 'var(--cloud)' : 'white',
                }}
              >
                <p className="text-[12px] font-medium" style={{ color: 'var(--charcoal)' }}>
                  {row.medicine}
                </p>
                <p
                  className="min-w-[90px] text-right text-[12px]"
                  style={{ color: 'var(--charcoal-light)' }}
                >
                  {row.vnd}
                </p>
                <p
                  className="min-w-[80px] text-right text-[12px] font-medium"
                  style={{ color: 'var(--green-dark)' }}
                >
                  {row.usd}
                </p>
              </div>
            ))}

            {/* Price Note */}
            <div
              className="border-t px-4 py-3"
              style={{ borderColor: 'var(--cloud-dark)', background: 'var(--cloud)' }}
            >
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--charcoal-muted)' }}>
                <span className="font-semibold" style={{ color: 'var(--amber)' }}>
                  Note:
                </span>{' '}
                Prices in tourist areas may be 20–50% higher. Ask for price before buying.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            USEFUL VIETNAMESE PHRASES
            ================================================================ */}
        <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <h2
            className="font-display mb-3 text-[15px] font-bold"
            style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
          >
            🗣️ Useful Vietnamese Phrases
          </h2>

          <div className="shadow-soft overflow-hidden rounded-2xl bg-white">
            {/* Table Header */}
            <div
              className="grid grid-cols-3 gap-2 px-4 py-3"
              style={{ background: 'var(--green-light)' }}
            >
              <p
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--green-dark)' }}
              >
                English
              </p>
              <p
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--green-dark)' }}
              >
                Vietnamese
              </p>
              <p
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--green-dark)' }}
              >
                Say it like...
              </p>
            </div>

            {/* Table Rows */}
            {PHRASES.map((phrase, i) => (
              <div
                key={phrase.english}
                className="grid grid-cols-3 gap-2 border-t px-4 py-3"
                style={{
                  borderColor: 'var(--cloud-dark)',
                  background: i % 2 === 1 ? 'var(--cloud)' : 'white',
                }}
              >
                <p className="text-[12px] font-medium" style={{ color: 'var(--charcoal)' }}>
                  {phrase.english}
                </p>
                <p className="text-[12px] font-semibold" style={{ color: 'var(--green-dark)' }}>
                  {phrase.vietnamese}
                </p>
                <p className="text-[12px] italic" style={{ color: 'var(--charcoal-muted)' }}>
                  {phrase.pronunciation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            EMERGENCY NUMBERS
            ================================================================ */}
        <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <h2
            className="font-display mb-3 text-[15px] font-bold"
            style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
          >
            🆘 Emergency Numbers
          </h2>

          <div className="space-y-2.5">
            {EMERGENCY_NUMBERS.map((entry) => (
              <a
                key={entry.label}
                href={entry.href}
                className="shadow-soft flex items-center gap-3 rounded-xl bg-white p-4 transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'var(--red-light)' }}
                >
                  <span className="text-lg">{entry.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold" style={{ color: 'var(--charcoal)' }}>
                    {entry.label}
                  </p>
                  <p className="text-[12px] font-medium" style={{ color: 'var(--green-dark)' }}>
                    {entry.number}
                  </p>
                </div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--green)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            ))}
          </div>
        </section>

        {/* ================================================================
            DISCLAIMER FOOTER
            ================================================================ */}
        <section className={`mb-4 mt-6 ${mounted ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <div
            className="rounded-2xl p-4"
            style={{
              background: 'var(--amber-light)',
              border: '1px solid rgba(232, 168, 56, 0.2)',
            }}
          >
            <div className="flex items-start gap-2.5">
              <svg
                className="mt-0.5 flex-shrink-0"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--amber)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
                This guide is for <span className="font-semibold">informational purposes only</span>{' '}
                and does not constitute medical advice. Always consult a qualified healthcare
                professional before taking any medication. Drug regulations may change — verify
                current rules with local authorities.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
