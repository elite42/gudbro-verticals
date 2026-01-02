import Link from 'next/link';

const stats = [
  {
    value: '70%',
    label: 'of customers prefer digital menus',
    source: 'Tableo 2025',
    color: 'from-blue-500 to-blue-600',
  },
  {
    value: '+22%',
    label: 'increase in average order value',
    source: 'ComQI 2023',
    color: 'from-green-500 to-green-600',
  },
  {
    value: '+20%',
    label: 'more orders with visual menus',
    source: 'Qamarero',
    color: 'from-purple-500 to-purple-600',
  },
  {
    value: '<30 days',
    label: 'payback period for digital menus',
    source: 'Industry Average',
    color: 'from-orange-500 to-orange-600',
  },
];

const benefits = [
  {
    icon: '💰',
    title: 'Eliminate Print Costs',
    description: 'No more reprinting menus for price changes, seasonal items, or typos.',
  },
  {
    icon: '⏱️',
    title: 'Save Staff Time',
    description: 'Staff spend 30% less time explaining menu items to guests.',
  },
  {
    icon: '📈',
    title: 'Increase Revenue',
    description: 'Visual menus with photos and descriptions boost average order by 22%.',
  },
  {
    icon: '🌍',
    title: 'Serve International Guests',
    description: 'Menus in 16+ languages without hiring translators.',
  },
];

export function ROIStatsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider">
            Proven Results
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Digital Menus Pay for Themselves
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Based on real industry research, restaurants see measurable ROI within weeks of switching to digital menus.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative bg-gray-800 rounded-2xl p-6 text-center overflow-hidden group hover:bg-gray-750 transition-colors"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
              <p className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</p>
              <p className="text-sm text-gray-300 mb-2">{stat.label}</p>
              <p className="text-xs text-gray-500">{stat.source}</p>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <span className="text-3xl block mb-3">{benefit.icon}</span>
              <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/tools/savings-calculator"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Calculate Your Savings
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Free calculator - see your ROI in 60 seconds
          </p>
        </div>
      </div>
    </section>
  );
}
