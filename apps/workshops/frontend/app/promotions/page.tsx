'use client';

import { useState } from 'react';
import Link from 'next/link';

/* =============================================================================
   HELPERS
   ============================================================================= */

import { formatPrice as _fp } from '@gudbro/utils';
function formatPrice(amount: number): string {
  return _fp(amount, 'VND');
}

/* =============================================================================
   MOCK DATA
   ============================================================================= */

const FEATURED_DEAL = {
  id: 'early-bird',
  title: 'Early Bird Special',
  description:
    'Book any workshop before 10am and get 15% off the regular price. Start your morning with creativity!',
  discount: '15% OFF',
  expiry: 'Valid until March 2026',
  cta: 'Browse Workshops',
  href: '/search',
};

const COMBO_PACKAGES = [
  {
    id: 'hoi-an-artisan',
    name: 'Hoi An Artisan Day',
    workshops: ['Lantern Making', 'Pottery', 'Cooking Class'],
    originalPrice: 1000000,
    packagePrice: 850000,
    savings: 150000,
    icon: '\uD83C\uDFEE',
    duration: 'Full Day (8h)',
    badge: 'Most Popular',
  },
  {
    id: 'cultural-immersion',
    name: 'Cultural Immersion',
    workshops: ['Food Tour', 'Coffee Workshop', 'Ao Dai Experience'],
    originalPrice: 1600000,
    packagePrice: 1400000,
    savings: 200000,
    icon: '\uD83C\uDF3F',
    duration: '2 Days',
    badge: 'Best Value',
  },
  {
    id: 'family-fun',
    name: 'Family Fun Pack',
    workshops: ['2 Adults + 2 Kids Lantern Making'],
    originalPrice: 1000000,
    packagePrice: 800000,
    savings: 200000,
    icon: '\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66',
    duration: '3 Hours',
    badge: 'Family',
  },
];

const WEEKLY_DEALS = [
  {
    id: 'monday',
    day: 'Monday',
    title: 'Pottery Day',
    description: '20% off all pottery classes',
    originalPrice: 300000,
    dealPrice: 240000,
    icon: '\uD83C\uDFFA',
    color: 'var(--terracotta)',
  },
  {
    id: 'wednesday',
    day: 'Wednesday',
    title: 'Coffee & Pastry',
    description: 'Free pastry upgrade with coffee class',
    originalPrice: null,
    dealPrice: null,
    icon: '\u2615',
    color: 'var(--amber-dark)',
    freebie: 'Free pastry included',
  },
  {
    id: 'friday',
    day: 'Friday',
    title: 'Art Workshop Special',
    description: 'Art class + all materials included',
    originalPrice: 500000,
    dealPrice: 400000,
    icon: '\uD83C\uDFA8',
    color: 'var(--sage)',
  },
  {
    id: 'weekend',
    day: 'Sat & Sun',
    title: 'Cooking + Market Tour',
    description: 'Cooking class with bonus market tour',
    originalPrice: null,
    dealPrice: null,
    icon: '\uD83E\uDD62',
    color: 'var(--terracotta-dark)',
    freebie: 'Bonus market tour',
  },
];

const GUEST_PERKS = [
  { icon: '\uD83C\uDF9F\uFE0F', text: '10% off any workshop' },
  { icon: '\uD83D\uDE90', text: 'Free pickup from hotel' },
  { icon: '\u2B50', text: 'Priority booking' },
];

/* =============================================================================
   COMPONENT
   ============================================================================= */

export default function PromotionsPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleCopyLink = () => {
    const referralLink = 'https://workshops.gudbro.com/ref/ABC123';
    navigator.clipboard?.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)' }}>
      {/* ── Header ── */}
      <header className="animate-fade-in-up" style={{ padding: '24px 20px 8px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--charcoal)',
            lineHeight: 1.2,
          }}
        >
          Deals & Packages
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--charcoal-muted)',
            marginTop: '6px',
          }}
        >
          Special offers for your creative journey
        </p>
      </header>

      {/* ── Featured Deal (Hero) ── */}
      <section className="animate-fade-in-up delay-1" style={{ padding: '16px 20px' }}>
        <div
          style={{
            background:
              'linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-dark) 100%)',
            borderRadius: '20px',
            padding: '28px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative circle */}
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: '30%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
            }}
          />

          <span
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '12px',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '100px',
              letterSpacing: '0.04em',
              marginBottom: '12px',
            }}
          >
            {FEATURED_DEAL.discount}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '8px',
            }}
          >
            {FEATURED_DEAL.title}
          </h2>

          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.5,
              marginBottom: '16px',
              maxWidth: '280px',
            }}
          >
            {FEATURED_DEAL.description}
          </p>

          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '16px',
            }}
          >
            {FEATURED_DEAL.expiry}
          </p>

          <Link
            href={FEATURED_DEAL.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'white',
              color: 'var(--terracotta)',
              fontWeight: 600,
              fontSize: '14px',
              padding: '10px 20px',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'transform 0.2s',
            }}
          >
            {FEATURED_DEAL.cta}
            <span style={{ fontSize: '16px' }}>{'\u2192'}</span>
          </Link>
        </div>
      </section>

      {/* ── Combo Packages ── */}
      <section style={{ padding: '24px 20px 8px' }}>
        <h2
          className="animate-fade-in-up delay-2"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            color: 'var(--charcoal)',
            marginBottom: '14px',
          }}
        >
          Combo Packages
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {COMBO_PACKAGES.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`card card-hover animate-fade-in-up delay-${i + 3}`}
              style={{ padding: '20px' }}
            >
              {/* Top row: icon + badge */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                }}
              >
                <span style={{ fontSize: '32px' }}>{pkg.icon}</span>
                <span
                  className={pkg.badge === 'Best Value' ? 'badge-amber' : 'badge-terracotta'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    background:
                      pkg.badge === 'Best Value'
                        ? 'var(--amber-light)'
                        : pkg.badge === 'Family'
                          ? 'var(--sage-light)'
                          : 'var(--terracotta)',
                    color:
                      pkg.badge === 'Best Value'
                        ? 'var(--amber-dark)'
                        : pkg.badge === 'Family'
                          ? 'var(--sage-dark)'
                          : 'white',
                  }}
                >
                  {pkg.badge}
                </span>
              </div>

              {/* Name + duration */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  color: 'var(--charcoal)',
                  marginBottom: '4px',
                }}
              >
                {pkg.name}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--charcoal-muted)',
                  marginBottom: '10px',
                }}
              >
                {pkg.duration}
              </p>

              {/* Included workshops */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '14px',
                }}
              >
                {pkg.workshops.map((w) => (
                  <span
                    key={w}
                    style={{
                      background: 'var(--cream)',
                      color: 'var(--charcoal-light)',
                      fontSize: '12px',
                      fontWeight: 500,
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    {w}
                  </span>
                ))}
              </div>

              {/* Pricing row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    color: 'var(--terracotta)',
                  }}
                >
                  {formatPrice(pkg.packagePrice)}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--charcoal-muted)',
                    textDecoration: 'line-through',
                  }}
                >
                  {formatPrice(pkg.originalPrice)}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--sage-dark)',
                    background: 'var(--sage-light)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  Save {formatPrice(pkg.savings)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Weekly Deals ── */}
      <section style={{ padding: '24px 20px 8px' }}>
        <h2
          className="animate-fade-in-up delay-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            color: 'var(--charcoal)',
            marginBottom: '14px',
          }}
        >
          Weekly Deals
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {WEEKLY_DEALS.map((deal, i) => (
            <div
              key={deal.id}
              className={`card card-hover animate-fade-in-up delay-${Math.min(i + 7, 10)}`}
              style={{
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              {/* Day badge */}
              <div
                style={{
                  minWidth: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: deal.color,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1px',
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: 1 }}>{deal.icon}</span>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: 'white',
                    letterSpacing: '0.02em',
                  }}
                >
                  {deal.day.slice(0, 3).toUpperCase()}
                </span>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--charcoal)',
                    marginBottom: '2px',
                  }}
                >
                  {deal.title}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--charcoal-muted)',
                    lineHeight: 1.3,
                  }}
                >
                  {deal.description}
                </p>
              </div>

              {/* Price or freebie */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                {deal.dealPrice ? (
                  <>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        color: 'var(--charcoal-muted)',
                        textDecoration: 'line-through',
                      }}
                    >
                      {formatPrice(deal.originalPrice!)}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--terracotta)',
                      }}
                    >
                      {formatPrice(deal.dealPrice)}
                    </span>
                  </>
                ) : (
                  <span
                    className="badge-sage"
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: 'var(--sage-light)',
                      color: 'var(--sage-dark)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {deal.freebie}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GUDBRO Hotel Guest Perks ── */}
      <section
        className="animate-fade-in-up delay-8"
        style={{
          margin: '24px 20px',
          background: 'var(--sand)',
          borderRadius: '20px',
          padding: '24px 22px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle texture */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-10px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(194,112,62,0.06)',
          }}
        />

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            color: 'var(--charcoal)',
            marginBottom: '4px',
          }}
        >
          GUDBRO Hotel Guest Perks
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--charcoal-light)',
            marginBottom: '18px',
          }}
        >
          Staying at a GUDBRO partner property?
        </p>

        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}
        >
          {GUEST_PERKS.map((perk) => (
            <div
              key={perk.text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  boxShadow: '0 1px 4px rgba(45,42,38,0.06)',
                }}
              >
                {perk.icon}
              </div>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--charcoal)',
                }}
              >
                {perk.text}
              </span>
            </div>
          ))}
        </div>

        <button
          style={{
            width: '100%',
            background: 'var(--terracotta)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
        >
          Ask Your Hotel Concierge
        </button>
      </section>

      {/* ── Referral Program ── */}
      <section style={{ padding: '0 20px 16px' }}>
        <div
          className="card animate-fade-in-up delay-9"
          style={{
            padding: '22px',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>
            {'\uD83E\uDD1D'}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              color: 'var(--charcoal)',
              marginBottom: '6px',
            }}
          >
            Bring a Friend
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--charcoal-light)',
              marginBottom: '16px',
              lineHeight: 1.5,
            }}
          >
            Refer a friend and you both get{' '}
            <strong style={{ color: 'var(--terracotta)' }}>{formatPrice(50000)} off</strong> your
            next workshop.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--cream)',
              borderRadius: '12px',
              padding: '10px 14px',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: '13px',
                color: 'var(--charcoal-muted)',
                textAlign: 'left',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              workshops.gudbro.com/ref/ABC123
            </span>
            <button
              onClick={handleCopyLink}
              style={{
                background: copied ? 'var(--sage)' : 'var(--terracotta)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </section>

      {/* ── Newsletter Signup ── */}
      <section style={{ padding: '0 20px 24px' }}>
        <div
          className="card animate-fade-in-up delay-10"
          style={{
            padding: '22px',
            background: 'linear-gradient(135deg, var(--amber-light) 0%, var(--cream) 100%)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              color: 'var(--charcoal)',
              marginBottom: '4px',
            }}
          >
            Get Weekly Deals
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--charcoal-light)',
              marginBottom: '14px',
            }}
          >
            New offers, seasonal workshops & exclusive discounts.
          </p>

          {subscribed ? (
            <div
              style={{
                background: 'var(--sage-light)',
                color: 'var(--sage-dark)',
                borderRadius: '12px',
                padding: '14px 16px',
                fontSize: '14px',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {'\u2713'} You&apos;re subscribed! Watch your inbox.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1,
                  background: 'white',
                  border: '1.5px solid var(--sand)',
                  borderRadius: '12px',
                  padding: '11px 14px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--charcoal)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  minWidth: 0,
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--terracotta)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '11px 18px',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'opacity 0.2s',
                }}
              >
                Subscribe
              </button>
            </form>
          )}

          <p
            style={{
              fontSize: '12px',
              color: 'var(--charcoal-muted)',
              marginTop: '10px',
              textAlign: 'center',
            }}
          >
            Join 2,000+ workshop lovers
          </p>
        </div>
      </section>

      {/* Bottom padding for nav */}
      <div style={{ paddingBottom: '96px' }} />
    </div>
  );
}
