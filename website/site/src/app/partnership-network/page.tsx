import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Handshake,
  Tag,
  ArrowsLeftRight,
  Coffee,
  MapTrifold,
  Bed,
  QrCode,
  Users,
  TrendUp,
} from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Partnership Network - Cross-Merchant Ecosystem | GUDBRO',
  description: 'Turn your customers into your neighbors\' customers. The GUDBRO Partnership Network creates win-win scenarios across businesses.',
};

const howItWorks = [
  {
    step: '01',
    title: 'Customer Gets GUDBRO Pass',
    description: 'When a customer uses any GUDBRO merchant, they automatically get a GUDBRO Pass—a digital loyalty card.',
  },
  {
    step: '02',
    title: 'Partner Businesses Offer Discounts',
    description: 'GUDBRO merchants can offer exclusive discounts to Pass holders. "10% off for GUDBRO customers".',
  },
  {
    step: '03',
    title: 'Referrals Get Tracked',
    description: 'When a Pass holder visits a partner, we track the referral. The original merchant can earn commission.',
  },
  {
    step: '04',
    title: 'Everyone Wins',
    description: 'Customers save money, merchants get qualified leads, and the ecosystem grows stronger.',
  },
];

const benefits = [
  {
    title: 'For Customers',
    icon: Tag,
    items: [
      'Exclusive discounts at partner businesses',
      'Single digital pass for all GUDBRO merchants',
      'Discover local hidden gems',
      'No apps to download',
    ],
  },
  {
    title: 'For Referrers',
    icon: ArrowsLeftRight,
    items: [
      'Earn commission on referred sales',
      'Turn happy customers into revenue',
      'Strengthen local business ties',
      'Subscription pays for itself',
    ],
  },
  {
    title: 'For Partners',
    icon: Handshake,
    items: [
      'Qualified leads from trusted sources',
      'Lower customer acquisition cost',
      'Access to tourist traffic',
      'Build local reputation',
    ],
  },
];

const examples = [
  {
    scenario: 'Cafe → Tour',
    from: { name: 'Sunrise Cafe', icon: Coffee },
    to: { name: 'Motorbike Tours', icon: MapTrifold },
    description: 'Tourist has breakfast at Sunrise Cafe. Barista mentions "Show your GUDBRO Pass at Motorbike Tours for 15% off." Tourist books. Cafe earns $3 commission.',
  },
  {
    scenario: 'Hotel → Restaurant',
    from: { name: 'Beach Villa', icon: Bed },
    to: { name: 'Local Restaurant', icon: Coffee },
    description: 'Guest checks in at Beach Villa. Room card says "GUDBRO partners: 10% off at these restaurants." Guest dines out. Villa earns referral bonus.',
  },
  {
    scenario: 'Tour → Hotel',
    from: { name: 'Day Trip Tours', icon: MapTrifold },
    to: { name: 'Mountain Lodge', icon: Bed },
    description: 'Tour guide recommends Mountain Lodge to guests looking to extend their trip. Guests book directly. Tour company earns commission.',
  },
];

export default function PartnershipNetworkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--neutral-900)] pt-24 md:pt-32 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[var(--primary)] opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[var(--secondary)] opacity-20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-[var(--secondary)]/20 px-4 py-1.5 text-sm font-medium text-[var(--secondary)]">
              Ecosystem Power
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              The GUDBRO{' '}
              <span className="text-gradient">Partnership Network</span>
            </h1>
            <p className="mt-6 text-xl text-[var(--neutral-300)]">
              Turn your customers into your neighbors&apos; customers, and vice versa.
              A cross-merchant ecosystem where everyone wins.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup" className="btn btn-primary btn-lg group">
                Join the Network
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/pricing" className="btn btn-secondary btn-lg text-white border-white hover:bg-white hover:text-[var(--neutral-900)]">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
              How the Network Works
            </h2>
            <p className="mt-4 text-lg text-[var(--neutral-600)]">
              A simple ecosystem that creates value for everyone
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="absolute left-full top-8 hidden h-0.5 w-8 bg-[var(--neutral-200)] lg:block" />
                )}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
                  <span className="text-2xl font-bold text-[var(--primary)]">{step.step}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--neutral-900)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--neutral-600)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUDBRO Pass */}
      <section className="section bg-[var(--neutral-50)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full bg-[var(--primary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--primary)]">
                Digital Loyalty
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
                The GUDBRO Pass
              </h2>
              <p className="mt-4 text-lg text-[var(--neutral-600)]">
                A single digital pass that works across all GUDBRO merchants. No app download,
                no registration—just a QR code and unique ID.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  'Works offline with alphanumeric code',
                  'QR code for quick scanning',
                  'Automatic at first GUDBRO purchase',
                  'Tracks discounts and loyalty points',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[var(--neutral-700)]">
                    <QrCode size={20} className="text-[var(--primary)]" weight="duotone" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pass mockup */}
            <div className="mx-auto max-w-sm">
              <div className="rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">GUDBRO PASS</p>
                    <p className="mt-1 font-mono text-2xl font-bold text-white">GB-2024-XXXX</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20">
                    <span className="text-3xl">🎫</span>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Member Since</span>
                    <span className="text-sm font-medium text-white">Jan 2024</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-white/80">Partner Visits</span>
                    <span className="text-sm font-medium text-white">12</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-white/80">Total Saved</span>
                    <span className="text-sm font-medium text-white">$47.50</span>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-white/60">
                  Show this pass at any GUDBRO partner for exclusive discounts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
              Benefits for Everyone
            </h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-[var(--neutral-200)] p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                  <benefit.icon size={28} className="text-[var(--primary)]" weight="duotone" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[var(--neutral-900)]">
                  {benefit.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {benefit.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--neutral-600)]">
                      <ArrowRight size={16} className="mt-0.5 flex-shrink-0 text-[var(--primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Examples */}
      <section className="section bg-[var(--neutral-50)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
              Real-World Examples
            </h2>
            <p className="mt-4 text-lg text-[var(--neutral-600)]">
              See how local businesses create value together
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {examples.map((example) => (
              <div key={example.scenario} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                      <example.from.icon size={20} className="text-[var(--primary)]" />
                    </div>
                    <span className="text-sm font-medium">{example.from.name}</span>
                  </div>
                  <ArrowRight size={20} className="text-[var(--neutral-400)]" />
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--secondary)]/10">
                      <example.to.icon size={20} className="text-[var(--secondary)]" />
                    </div>
                    <span className="text-sm font-medium">{example.to.name}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--neutral-600)]">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator concept */}
      <section className="section bg-[var(--neutral-900)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your Subscription Pays for Itself
            </h2>
            <p className="mt-4 text-xl text-[var(--neutral-300)]">
              Refer just 3-4 customers per month to partner businesses, and your $9/month Pro subscription is covered by referral commissions.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-6">
                <Users size={32} className="mx-auto text-[var(--primary-light)]" />
                <p className="mt-4 text-3xl font-bold">3-4</p>
                <p className="text-sm text-[var(--neutral-400)]">Referrals/month</p>
              </div>
              <div className="rounded-xl bg-white/10 p-6">
                <Tag size={32} className="mx-auto text-[var(--secondary)]" />
                <p className="mt-4 text-3xl font-bold">$2-3</p>
                <p className="text-sm text-[var(--neutral-400)]">Avg. commission</p>
              </div>
              <div className="rounded-xl bg-white/10 p-6">
                <TrendUp size={32} className="mx-auto text-[var(--accent)]" />
                <p className="mt-4 text-3xl font-bold">$9+</p>
                <p className="text-sm text-[var(--neutral-400)]">Monthly earnings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--primary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join the Network Today
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Start referring, start earning. Build your local business community.
            </p>
            <Link
              href="/signup"
              className="btn btn-lg mt-8 bg-white text-[var(--primary)] hover:bg-[var(--neutral-100)]"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
