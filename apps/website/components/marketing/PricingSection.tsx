import Link from 'next/link';

const tiers = [
  {
    name: 'Free',
    id: 'free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for trying out GUDBRO',
    features: [
      '1 QR Code',
      '1 Team Member',
      '2 Languages',
      '100 AI Translations/month',
      'Basic Analytics',
      'GUDBRO Branding',
    ],
    cta: 'Start Free',
    href: '/sign-up?plan=free',
    popular: false,
  },
  {
    name: 'Starter',
    id: 'starter',
    price: { monthly: 29, yearly: 290 },
    description: 'For small businesses getting started',
    features: [
      '10 QR Codes',
      '3 Team Members',
      '5 Languages',
      '1,000 AI Translations/month',
      'Standard Analytics',
      'Custom Logo',
      'Email Support',
    ],
    cta: 'Start Free Trial',
    href: '/sign-up?plan=starter',
    popular: false,
  },
  {
    name: 'Pro',
    id: 'pro',
    price: { monthly: 79, yearly: 790 },
    description: 'For growing businesses with multiple locations',
    features: [
      '50 QR Codes',
      '10 Team Members',
      'All 16+ Languages',
      '10,000 AI Translations/month',
      'Advanced Analytics',
      'Full Branding Customization',
      'Custom Domain',
      'API Access',
      'Priority Support',
    ],
    cta: 'Start Free Trial',
    href: '/sign-up?plan=pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    price: { monthly: null, yearly: null },
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited QR Codes',
      'Unlimited Team Members',
      'All Languages',
      'Unlimited Translations',
      'Custom Analytics',
      'White Label',
      'Dedicated Account Manager',
      'SLA & Priority Support',
      'Custom Integrations',
    ],
    cta: 'Contact Sales',
    href: '/contact?plan=enterprise',
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Pricing
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Start free, upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? 'bg-gray-900 dark:bg-gray-950 text-white ring-4 ring-blue-500'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier name */}
              <h3 className={`text-lg font-semibold ${tier.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                {tier.price.monthly !== null ? (
                  <>
                    <span className={`text-4xl font-bold ${tier.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      ${tier.price.monthly}
                    </span>
                    <span className={tier.popular ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}>
                      /month
                    </span>
                  </>
                ) : (
                  <span className={`text-2xl font-bold ${tier.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    Custom
                  </span>
                )}
              </div>

              {/* Description */}
              <p className={`mt-4 text-sm ${tier.popular ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}>
                {tier.description}
              </p>

              {/* CTA */}
              <Link
                href={tier.href}
                className={`mt-6 block w-full rounded-full py-3 px-4 text-center text-sm font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                }`}
              >
                {tier.cta}
              </Link>

              {/* Features */}
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 ${tier.popular ? 'text-blue-400' : 'text-blue-600 dark:text-blue-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${tier.popular ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Have questions?{' '}
            <Link href="/faq" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Check our FAQ
            </Link>
            {' '}or{' '}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
