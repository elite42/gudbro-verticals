import { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Pricing - Simple, Transparent Plans | GUDBRO',
  description: 'Zero commission on all plans. Start free, upgrade when you need more. Simple pricing that grows with your business.',
};

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out GUDBRO and small businesses just starting.',
    features: [
      { name: 'Up to 20 products/services', included: true },
      { name: 'Basic QR menu/catalog', included: true },
      { name: '10 languages', included: true },
      { name: 'GUDBRO branding on menu', included: true },
      { name: 'Email support', included: true },
      { name: 'Custom branding', included: false },
      { name: 'Analytics dashboard', included: false },
      { name: 'Partnership network', included: false },
      { name: 'Priority support', included: false },
      { name: 'API access', included: false },
    ],
    cta: 'Start Free',
    href: '/signup?plan=free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For growing businesses that want the full GUDBRO experience.',
    features: [
      { name: 'Unlimited products/services', included: true },
      { name: 'Full-featured PWA', included: true },
      { name: '50+ languages', included: true },
      { name: 'Your own branding', included: true },
      { name: 'Analytics dashboard', included: true },
      { name: 'Partnership network access', included: true },
      { name: 'GUDBRO Pass integration', included: true },
      { name: 'Priority email support', included: true },
      { name: 'Multiple locations', included: false },
      { name: 'API access', included: false },
    ],
    cta: 'Start Pro Trial',
    href: '/signup?plan=pro',
    featured: true,
    savings: 'Most popular',
  },
  {
    name: 'Business',
    price: '$29',
    period: '/month',
    description: 'For multi-location businesses and those needing advanced features.',
    features: [
      { name: 'Everything in Pro', included: true },
      { name: 'Up to 5 locations', included: true },
      { name: 'Team accounts (5 users)', included: true },
      { name: 'API access', included: true },
      { name: 'White-label option', included: true },
      { name: 'Dedicated account manager', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Priority phone support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Bulk operations', included: true },
    ],
    cta: 'Contact Sales',
    href: '/contact?plan=business',
    featured: false,
  },
];

const faqs = [
  {
    question: 'Is there really no commission?',
    answer: 'Yes! We charge a flat monthly fee, not a percentage of your sales. Whether you make $100 or $10,000, your GUDBRO fee stays the same.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. No contracts, no cancellation fees. Cancel anytime from your dashboard and you won\'t be charged again.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers. For businesses in Vietnam, we also accept local payment methods.',
  },
  {
    question: 'Do you offer annual discounts?',
    answer: 'Yes! Pay annually and get 2 months free. That\'s $90/year for Pro (vs $108 monthly) and $290/year for Business (vs $348 monthly).',
  },
  {
    question: 'What happens if I exceed my limits on Free?',
    answer: 'We\'ll notify you when you\'re approaching limits. You can upgrade anytime, or we\'ll simply stop accepting new products until you upgrade.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Yes, upgrade or downgrade anytime. When upgrading, you\'ll be charged the prorated difference. When downgrading, your credit applies to future months.',
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--neutral-50)] to-white pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-[var(--secondary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--secondary)]">
              Simple, Transparent Pricing
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--neutral-900)] sm:text-5xl">
              Zero Commission. Always.
            </h1>
            <p className="mt-4 text-lg text-[var(--neutral-600)]">
              Unlike Booking.com (15-25%) or Klook (15-20%), we charge a flat monthly fee.
              Keep 100% of what you earn.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative -mt-8 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl ${
                  tier.featured
                    ? 'border-2 border-[var(--primary)] bg-white shadow-xl shadow-[var(--primary)]/10 scale-105 z-10'
                    : 'border border-[var(--neutral-200)] bg-white'
                }`}
              >
                {tier.savings && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[var(--primary)] px-4 py-1 text-sm font-semibold text-white">
                      {tier.savings}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-xl font-semibold text-[var(--neutral-900)]">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-[var(--neutral-900)]">
                      {tier.price}
                    </span>
                    <span className="text-[var(--neutral-500)]">{tier.period}</span>
                  </div>
                  <p className="mt-4 text-sm text-[var(--neutral-600)]">
                    {tier.description}
                  </p>

                  <Link
                    href={tier.href}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all ${
                      tier.featured
                        ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'
                        : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight size={16} />
                  </Link>

                  <ul className="mt-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature.name} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check
                            size={20}
                            weight="bold"
                            className="mt-0.5 flex-shrink-0 text-[var(--success)]"
                          />
                        ) : (
                          <X
                            size={20}
                            weight="bold"
                            className="mt-0.5 flex-shrink-0 text-[var(--neutral-300)]"
                          />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included ? 'text-[var(--neutral-700)]' : 'text-[var(--neutral-400)]'
                          }`}
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Comparison */}
      <section className="section bg-[var(--neutral-900)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See How Much You Save
            </h2>
            <p className="mt-4 text-lg text-[var(--neutral-300)]">
              Commission-based platforms take a percentage of every sale. We don&apos;t.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Monthly Revenue</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Booking.com (20%)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Klook (15%)</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--secondary)]">GUDBRO Pro</th>
                </tr>
              </thead>
              <tbody>
                {[500, 1000, 2000, 5000].map((revenue) => (
                  <tr key={revenue} className="border-b border-white/5">
                    <td className="px-6 py-4 text-sm">${revenue}</td>
                    <td className="px-6 py-4 text-center text-sm text-red-400">-${revenue * 0.2}</td>
                    <td className="px-6 py-4 text-center text-sm text-red-400">-${revenue * 0.15}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-[var(--secondary)]">
                      -$9
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-[var(--neutral-400)]">
            At $2,000/month revenue, Booking.com takes $400. GUDBRO takes $9. You save $391.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl bg-[var(--neutral-50)] p-6">
                <h3 className="font-semibold text-[var(--neutral-900)]">{faq.question}</h3>
                <p className="mt-2 text-sm text-[var(--neutral-600)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--primary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Keep 100% of Your Revenue?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Start free today. No credit card required.
            </p>
            <Link
              href="/signup"
              className="btn btn-lg mt-8 bg-white text-[var(--primary)] hover:bg-[var(--neutral-100)]"
            >
              Start Free Today
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
