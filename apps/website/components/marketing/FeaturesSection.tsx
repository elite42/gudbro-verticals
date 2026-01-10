const features = [
  {
    icon: '📱',
    title: 'QR Code Generator',
    description:
      'Create unlimited QR codes for tables, rooms, or properties. Track scans and engagement in real-time.',
  },
  {
    icon: '🌍',
    title: 'AI Translation',
    description:
      '16+ languages with one click. AI understands context - menus, hotel info, local tips.',
  },
  {
    icon: '💱',
    title: 'Multi-Currency',
    description: "Show prices in guest's currency. VND, USD, EUR, KRW, JPY and more.",
  },
  {
    icon: '₿',
    title: 'Crypto Payments',
    description:
      'Accept Bitcoin, Ethereum, USDC and more. Zero fees, instant setup. Attract tech-savvy customers.',
    badge: 'NEW',
  },
  {
    icon: '🎨',
    title: 'Custom Branding',
    description: 'Your logo, your colors. Make it feel like your own app, not a generic solution.',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description:
      'See which items are popular, peak hours, and guest behavior. Data-driven decisions.',
  },
  {
    icon: '⚡',
    title: '5 Minute Setup',
    description: 'No coding required. Import your menu or start from our templates. Go live today.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-20 dark:bg-gray-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Features
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need for digital hospitality
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            From QR codes to AI translation, we&apos;ve built the tools to help you serve guests in
            their language, their currency, their way.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="dark:hover:bg-gray-750 group relative rounded-2xl bg-gray-50 p-8 transition-all duration-300 hover:bg-white hover:shadow-xl dark:bg-gray-800 dark:hover:shadow-gray-900/50"
            >
              {/* Badge */}
              {'badge' in feature && feature.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">
                  {feature.badge}
                </span>
              )}

              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-3xl shadow-sm transition-transform group-hover:scale-110 dark:bg-gray-700">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            See all features
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
