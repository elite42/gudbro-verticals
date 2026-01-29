'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ─── FAQ Data ─── */
const faqs = [
  {
    q: 'How do I book a workshop?',
    a: "Simply browse our workshops, choose your preferred date and time, then book instantly via WhatsApp or Zalo. You'll receive confirmation within minutes.",
  },
  {
    q: 'Can I cancel my booking?',
    a: 'Yes! We offer free cancellation up to 24 hours before your scheduled workshop. Just message us on WhatsApp or Zalo.',
  },
  {
    q: 'What languages are available?',
    a: 'Our platform supports English, Vietnamese, Korean, and Chinese. Many workshop operators speak multiple languages or provide translators.',
  },
  {
    q: 'Is it safe for solo travelers?',
    a: 'Absolutely. All operators on our platform are verified and reviewed. Many solo travelers join group workshops and make new friends along the way.',
  },
  {
    q: 'What if I have dietary restrictions?',
    a: 'Our cooking classes accommodate all dietary needs including vegetarian, vegan, gluten-free, and halal. Just let us know when booking.',
  },
  {
    q: 'Do I need any prior skills?',
    a: 'Not at all! Most workshops are beginner-friendly and designed for first-timers. Our artisans are patient teachers who love sharing their craft.',
  },
];

/* ─── Mission Cards ─── */
const missionCards = [
  {
    icon: '\u{1F3EE}',
    title: 'Preserve Culture',
    desc: 'Create sustainable income streams for traditional craftspeople, ensuring ancient arts thrive for future generations.',
  },
  {
    icon: '\u{1F91D}',
    title: 'Empower Artisans',
    desc: 'Lowest commission in the industry \u2014 operators keep 85\u201390% of every booking. Their craft, their earnings.',
  },
  {
    icon: '\u{1F30F}',
    title: 'Connect Worlds',
    desc: 'Break language barriers between international tourists and local artisans through technology and human connection.',
  },
];

/* ─── How It Works Steps ─── */
const steps = [
  {
    num: '01',
    title: 'Browse Workshops',
    desc: 'Explore dozens of workshops in your language \u2014 cooking, pottery, silk weaving, lantern making, and more.',
  },
  {
    num: '02',
    title: 'Choose Your Experience',
    desc: 'Pick the workshop, date, and group size that fits your schedule.',
  },
  {
    num: '03',
    title: 'Book Instantly',
    desc: 'Confirm your spot in seconds via WhatsApp or Zalo. No apps to download, no accounts to create.',
  },
  {
    num: '04',
    title: 'Create Something Amazing',
    desc: 'Show up, learn from a master artisan, and take home a one-of-a-kind creation.',
  },
];

/* ─── Stats ─── */
const stats = [
  { value: '50+', label: 'Workshops' },
  { value: '30+', label: 'Operators' },
  { value: '4.9', label: 'Avg. Rating' },
  { value: '1,000+', label: 'Experiences Created' },
];

/* ─── Ecosystem ─── */
const ecosystem = [
  { name: 'Coffeeshop', icon: '\u2615' },
  { name: 'Accommodations', icon: '\u{1F3E8}' },
  { name: 'Tours', icon: '\u{1F9ED}' },
  { name: 'Wellness', icon: '\u{1F9D6}' },
  { name: 'Laundry', icon: '\u{1F455}' },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="page-content" style={{ background: 'var(--ivory)' }}>
      {/* ─── Hero Section ─── */}
      <section
        className="animate-fade-in-up"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '48px 20px 40px',
          background: 'linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-dark) 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -20,
            left: -30,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 480, margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              lineHeight: 1.2,
              marginBottom: 12,
              fontWeight: 400,
            }}
          >
            About GUDBRO Workshops
          </h1>
          <p style={{ fontSize: 15, opacity: 0.9, lineHeight: 1.6 }}>
            Connecting travelers with Vietnam&apos;s artisan heritage in Da Nang &amp; Hoi An
          </p>

          {/* Photo placeholder */}
          <div
            style={{
              marginTop: 24,
              borderRadius: 16,
              height: 180,
              background: 'rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed rgba(255,255,255,0.25)',
            }}
          >
            <span style={{ fontSize: 40 }}>{'\u{1F3FA}'}</span>
          </div>
        </div>
      </section>

      {/* ─── Our Story ─── */}
      <section
        className="animate-fade-in-up delay-2"
        style={{ padding: '32px 20px', maxWidth: 480, margin: '0 auto' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            color: 'var(--charcoal)',
            marginBottom: 16,
          }}
        >
          Our Story
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--charcoal-light)' }}>
            Vietnam&apos;s Da Nang &amp; Hoi An corridor is home to hundreds of artisan workshops
            &mdash; pottery studios, silk weavers, lantern makers, cooking masters, bamboo
            craftspeople, and more. These traditions stretch back centuries, passed down through
            generations of skilled hands.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--charcoal-light)' }}>
            Yet{' '}
            <strong style={{ color: 'var(--terracotta)' }}>
              80% of these talented craftspeople have zero digital presence
            </strong>
            . No website, no booking system, no way for international visitors to discover them.
            Their incredible skills remain hidden behind language barriers and narrow alleyways.
          </p>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--charcoal)',
              fontWeight: 600,
              paddingLeft: 16,
              borderLeft: '3px solid var(--terracotta)',
            }}
          >
            We built GUDBRO Workshops to change that.
          </p>
        </div>
      </section>

      {/* ─── Our Mission ─── */}
      <section
        className="animate-fade-in-up delay-3"
        style={{ padding: '8px 20px 32px', maxWidth: 480, margin: '0 auto' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            color: 'var(--charcoal)',
            marginBottom: 16,
          }}
        >
          Our Mission
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {missionCards.map((card, i) => (
            <div
              key={card.title}
              className={`card animate-fade-in-up delay-${i + 4}`}
              style={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span
                  style={{
                    fontSize: 28,
                    lineHeight: 1,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {card.icon}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: 'var(--charcoal)',
                      marginBottom: 4,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--charcoal-light)' }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section
        style={{
          padding: '32px 20px',
          background: 'var(--cream)',
        }}
      >
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <h2
            className="animate-fade-in-up delay-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              color: 'var(--charcoal)',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            How It Works
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`animate-fade-in-up delay-${i + 6}`}
                style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'var(--terracotta)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 14,
                    flexShrink: 0,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {step.num}
                </div>
                <div style={{ paddingTop: 2 }}>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: 'var(--charcoal)',
                      marginBottom: 2,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--charcoal-light)' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── For Operators ─── */}
      <section
        className="animate-fade-in-up delay-4"
        style={{ padding: '32px 20px', maxWidth: 480, margin: '0 auto' }}
      >
        <div
          className="card"
          style={{
            padding: '24px 20px',
            background: 'linear-gradient(135deg, var(--sand) 0%, var(--cream) 100%)',
            border: '1px solid var(--sand)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              color: 'var(--charcoal)',
              marginBottom: 6,
            }}
          >
            Are you a workshop operator?
          </h2>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--charcoal-light)',
              marginBottom: 16,
            }}
          >
            Join our growing network and reach thousands of international visitors.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              'Free digital storefront \u2014 no setup costs',
              'Lowest commission: only 10\u201315%',
              'Bookings via WhatsApp & Zalo \u2014 tools you already use',
              'Multi-language listing included',
            ].map((benefit) => (
              <div key={benefit} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span
                  style={{ color: 'var(--sage)', fontSize: 16, lineHeight: 1.3, flexShrink: 0 }}
                >
                  {'\u2713'}
                </span>
                <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--charcoal-light)' }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="#"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '14px 24px',
              borderRadius: 12,
              background: 'var(--terracotta)',
              color: 'white',
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Join Our Network
          </Link>
        </div>
      </section>

      {/* ─── For Hotels & Accommodations ─── */}
      <section
        className="animate-fade-in-up delay-5"
        style={{ padding: '0 20px 32px', maxWidth: 480, margin: '0 auto' }}
      >
        <div
          className="card"
          style={{
            padding: '24px 20px',
            borderLeft: '4px solid var(--amber)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              color: 'var(--charcoal)',
              marginBottom: 6,
            }}
          >
            Partner With Us
          </h2>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--charcoal-light)',
              marginBottom: 14,
            }}
          >
            Hotels, hostels, and homestays &mdash; offer unique cultural experiences to your guests.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              'Earn 10% referral commission on every booking',
              "Offer unique guest experiences they can't find elsewhere",
              'Dedicated partner dashboard and support',
            ].map((benefit) => (
              <div key={benefit} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span
                  style={{ color: 'var(--amber)', fontSize: 16, lineHeight: 1.3, flexShrink: 0 }}
                >
                  {'\u2605'}
                </span>
                <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--charcoal-light)' }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="#"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '14px 24px',
              borderRadius: 12,
              background: 'var(--amber)',
              color: 'white',
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Become a Partner
          </Link>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section
        style={{
          padding: '32px 20px',
          background: 'linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-dark) 100%)',
        }}
      >
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`animate-fade-in-up delay-${i + 2}`}
                style={{
                  textAlign: 'center',
                  padding: '20px 12px',
                  borderRadius: 16,
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 28,
                    color: 'white',
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.8)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section
        className="animate-fade-in-up delay-3"
        style={{ padding: '32px 20px', maxWidth: 480, margin: '0 auto' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            color: 'var(--charcoal)',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card"
              style={{
                overflow: 'hidden',
                borderRadius: 12,
              }}
            >
              <button
                onClick={() => toggleFaq(i)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--charcoal)',
                    lineHeight: 1.4,
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    color: 'var(--terracotta)',
                    flexShrink: 0,
                    transition: 'transform 0.25s ease',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: openFaq === i ? 200 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}
              >
                <p
                  style={{
                    padding: '0 20px 16px',
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: 'var(--charcoal-light)',
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section
        className="animate-fade-in-up delay-4"
        style={{
          padding: '32px 20px',
          background: 'var(--cream)',
        }}
      >
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              color: 'var(--charcoal)',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Get in Touch
          </h2>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  label: 'WhatsApp',
                  value: '+84 905 456 789',
                  href: 'https://wa.me/84905456789',
                  icon: '\u{1F4F1}',
                },
                {
                  label: 'Zalo',
                  value: '+84 905 456 789',
                  href: 'https://zalo.me/84905456789',
                  icon: '\u{1F4AC}',
                },
                {
                  label: 'Email',
                  value: 'workshops@gudbro.com',
                  href: 'mailto:workshops@gudbro.com',
                  icon: '\u2709\uFE0F',
                },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: 'var(--ivory)',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{contact.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--charcoal-muted)',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {contact.label}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--terracotta)', fontWeight: 600 }}>
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social placeholders */}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--sand)' }}>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--charcoal-muted)',
                  marginBottom: 10,
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                Follow us
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                {['Instagram', 'Facebook', 'TikTok', 'YouTube'].map((social) => (
                  <div
                    key={social}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'var(--ivory)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      color: 'var(--charcoal-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {social.slice(0, 2)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GUDBRO Ecosystem ─── */}
      <section
        className="animate-fade-in-up delay-5"
        style={{ padding: '32px 20px', maxWidth: 480, margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <p
            style={{
              fontSize: 11,
              color: 'var(--terracotta)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 6,
            }}
          >
            Part of the GUDBRO family
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              color: 'var(--charcoal)',
              marginBottom: 8,
            }}
          >
            One Platform for Your Entire Vietnam Trip
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--charcoal-light)' }}>
            From your morning coffee to evening workshops &mdash; GUDBRO has you covered.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
          }}
        >
          {ecosystem.map((item) => (
            <div
              key={item.name}
              className="card"
              style={{
                padding: '16px 8px',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: 24, display: 'block', marginBottom: 6 }}>{item.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-light)' }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom spacer for nav */}
      <div style={{ height: 24 }} />
    </div>
  );
}
