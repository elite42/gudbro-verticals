const features = [
  {
    icon: '📱',
    title: 'QR Code Generator',
    description: 'Create unlimited QR codes for tables, rooms, or properties. Track scans and engagement in real-time.',
  },
  {
    icon: '🌍',
    title: 'AI Translation',
    description: '16+ languages with one click. AI understands context - menus, hotel info, local tips.',
  },
  {
    icon: '💱',
    title: 'Multi-Currency',
    description: 'Show prices in guest\'s currency. VND, USD, EUR, KRW, JPY and more.',
  },
  {
    icon: '🎨',
    title: 'Custom Branding',
    description: 'Your logo, your colors. Make it feel like your own app, not a generic solution.',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'See which items are popular, peak hours, and guest behavior. Data-driven decisions.',
  },
  {
    icon: '⚡',
    title: '5 Minute Setup',
    description: 'No coding required. Import your menu or start from our templates. Go live today.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Features
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for digital hospitality
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From QR codes to AI translation, we've built the tools to help you
            serve guests in their language, their currency, their way.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            See all features
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
