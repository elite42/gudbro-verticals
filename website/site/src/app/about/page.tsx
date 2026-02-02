import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Heart,
  Target,
  Lightbulb,
  Users,
  Globe,
  Handshake,
} from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'About GUDBRO - Our Story & Mission',
  description: 'We\'re building the digital infrastructure for Southeast Asian small businesses. Learn about our mission, values, and the team behind GUDBRO.',
};

const values = [
  {
    title: 'Zero Commission',
    description: 'We believe small businesses shouldn\'t pay 15-25% for the privilege of being found online. Our flat-fee model keeps your money where it belongs—with you.',
    icon: Heart,
  },
  {
    title: 'Local First',
    description: 'Big platforms optimize for tourists. We optimize for the local business owner. Your success is our success.',
    icon: Target,
  },
  {
    title: 'Simple by Design',
    description: 'Technology should empower, not overwhelm. If your grandmother can\'t use it, we redesign it.',
    icon: Lightbulb,
  },
  {
    title: 'Community Over Competition',
    description: 'Through our Partnership Network, we turn competitors into collaborators. Rising tides lift all boats.',
    icon: Users,
  },
];

const timeline = [
  {
    year: '2023',
    title: 'The Problem',
    description: 'Founders noticed small businesses in Vietnam struggling with paper menus, language barriers, and losing customers to commission-heavy platforms.',
  },
  {
    year: '2024 Q1',
    title: 'GUDBRO Coffeeshop',
    description: 'Launched our first vertical: digital menus for cafes and restaurants with 50+ language auto-translation.',
  },
  {
    year: '2024 Q3',
    title: 'Partnership Network',
    description: 'Introduced cross-merchant referrals, turning the platform into an ecosystem where businesses help each other grow.',
  },
  {
    year: '2025',
    title: 'Multi-Vertical Expansion',
    description: 'Expanding to Tours, Stays, Wellness, and Rentals. Building the complete infrastructure for Southeast Asian hospitality.',
  },
];

const stats = [
  { value: '4,653+', label: 'Products Listed' },
  { value: '50+', label: 'Languages Supported' },
  { value: '100+', label: 'Businesses' },
  { value: '3', label: 'Countries' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--neutral-50)] to-white pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--neutral-900)] sm:text-5xl">
              Empowering Small Businesses in Southeast Asia
            </h1>
            <p className="mt-6 text-xl text-[var(--neutral-600)]">
              We&apos;re building the digital infrastructure that small hospitality and tourism
              businesses deserve—without the commission that platforms like Booking.com take.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[var(--primary)] p-8 shadow-xl">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full bg-[var(--primary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--primary)]">
                Our Mission
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
                Level the Playing Field
              </h2>
              <p className="mt-4 text-lg text-[var(--neutral-600)]">
                Big chains have apps, websites, and marketing budgets. Street food vendors have
                a cardboard sign. We&apos;re changing that.
              </p>
              <p className="mt-4 text-lg text-[var(--neutral-600)]">
                Our mission is to give every small business in Southeast Asia the digital tools
                they need to compete—without taking a cut of their hard-earned revenue.
              </p>
              <p className="mt-4 text-lg text-[var(--neutral-600)]">
                Because that motorbike tour guide in Da Nang has just as much right to a
                professional digital presence as a multinational hotel chain.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[var(--neutral-50)] p-6">
                <Globe size={32} className="text-[var(--primary)]" weight="duotone" />
                <p className="mt-4 font-semibold text-[var(--neutral-900)]">Global Reach</p>
                <p className="mt-2 text-sm text-[var(--neutral-600)]">
                  50+ languages so tourists can understand your business
                </p>
              </div>
              <div className="rounded-xl bg-[var(--neutral-50)] p-6">
                <Handshake size={32} className="text-[var(--secondary)]" weight="duotone" />
                <p className="mt-4 font-semibold text-[var(--neutral-900)]">Local Network</p>
                <p className="mt-2 text-sm text-[var(--neutral-600)]">
                  Partner businesses help each other grow
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-[var(--neutral-50)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
              What We Believe
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl bg-white p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                  <value.icon size={24} className="text-[var(--primary)]" weight="duotone" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[var(--neutral-900)]">
                  {value.title}
                </h3>
                <p className="mt-2 text-[var(--neutral-600)]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
              Our Journey
            </h2>
          </div>

          <div className="mt-12">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-[var(--neutral-200)] md:left-1/2 md:-translate-x-1/2" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex items-start gap-8 ${
                      index % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 h-4 w-4 -translate-x-1/2 rounded-full bg-[var(--primary)] md:left-1/2" />

                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <span className="text-sm font-semibold text-[var(--primary)]">{item.year}</span>
                      <h3 className="mt-1 text-lg font-semibold text-[var(--neutral-900)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--neutral-600)]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Made in Vietnam */}
      <section className="section bg-[var(--neutral-900)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-6xl">🇻🇳</span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Made with ❤️ in Vietnam
            </h2>
            <p className="mt-4 text-lg text-[var(--neutral-300)]">
              We&apos;re based in Vietnam, building for Southeast Asia. We understand the local
              market because we live here. We face the same challenges our customers face.
            </p>
            <p className="mt-4 text-lg text-[var(--neutral-300)]">
              That street food vendor struggling to explain his menu? We&apos;ve been that confused
              tourist. That guesthouse owner losing money to OTA fees? We&apos;ve seen the impact firsthand.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--primary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join the Movement
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Be part of the digital transformation of Southeast Asian small businesses.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="btn btn-lg bg-white text-[var(--primary)] hover:bg-[var(--neutral-100)]"
              >
                Start Free Today
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="btn btn-lg border-2 border-white text-white hover:bg-white/10"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
