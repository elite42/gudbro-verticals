import Link from 'next/link';
import { Check, ArrowRight } from '@phosphor-icons/react/dist/ssr';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out GUDBRO',
    features: [
      'Up to 20 products',
      'Basic QR menu',
      '10 languages',
      'GUDBRO branding',
    ],
    cta: 'Start Free',
    href: '/signup?plan=free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For growing businesses',
    features: [
      'Unlimited products',
      '50+ languages',
      'Custom branding',
      'Analytics dashboard',
      'Partnership network access',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    href: '/signup?plan=pro',
    featured: true,
  },
  {
    name: 'Business',
    price: '$29',
    period: '/month',
    description: 'For multi-location businesses',
    features: [
      'Everything in Pro',
      'Up to 5 locations',
      'Team accounts',
      'API access',
      'White-label option',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    href: '/contact?plan=business',
    featured: false,
  },
];

export function PricingPreview() {
  return (
    <section className="section bg-[var(--neutral-50)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-[var(--secondary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--secondary)]">
            Simple Pricing
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
            Pricing That Grows With You
          </h2>
          <p className="mt-4 text-lg text-[var(--neutral-600)]">
            Start free, upgrade when you need more. Zero commission on all plans.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl ${
                tier.featured
                  ? 'border-2 border-[var(--primary)] bg-white shadow-xl shadow-[var(--primary)]/10'
                  : 'border border-[var(--neutral-200)] bg-white'
              }`}
            >
              {/* Featured badge */}
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[var(--primary)] px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Name */}
                <h3 className="text-lg font-semibold text-[var(--neutral-900)]">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[var(--neutral-900)]">
                    {tier.price}
                  </span>
                  <span className="text-[var(--neutral-500)]">{tier.period}</span>
                </div>

                {/* Description */}
                <p className="mt-2 text-sm text-[var(--neutral-600)]">
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={20}
                        weight="bold"
                        className="mt-0.5 flex-shrink-0 text-[var(--success)]"
                      />
                      <span className="text-sm text-[var(--neutral-700)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={tier.href}
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all ${
                    tier.featured
                      ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'
                      : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--neutral-600)]">
            All plans include 0% commission on orders.{' '}
            <Link href="/pricing" className="font-medium text-[var(--primary)] hover:underline">
              See full pricing comparison →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
