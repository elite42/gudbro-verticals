import Link from 'next/link';

const verticals = [
  {
    id: 'restaurants',
    icon: '🍽️',
    title: 'Restaurants & Cafes',
    description: 'Digital menus with photos, allergen info, and customization options. Take orders directly.',
    features: ['Digital Menu', 'Order to Table', 'Allergen Filters', 'Customizations'],
    image: '/images/vertical-restaurant.jpg',
    color: 'from-orange-500 to-red-500',
    href: '/solutions/restaurants',
  },
  {
    id: 'hotels',
    icon: '🏨',
    title: 'Hotels',
    description: 'Room QR codes for WiFi, minibar prices, room service, spa booking, and local tips.',
    features: ['WiFi Info', 'Minibar Prices', 'Room Service', 'Spa Booking'],
    image: '/images/vertical-hotel.jpg',
    color: 'from-blue-500 to-indigo-500',
    href: '/solutions/hotels',
  },
  {
    id: 'airbnb',
    icon: '🏠',
    title: 'Airbnb & Rentals',
    description: 'Property QR with check-in instructions, house rules, WiFi, and local recommendations.',
    features: ['Self Check-in', 'House Rules', 'Local Tips', 'Host Contact'],
    image: '/images/vertical-airbnb.jpg',
    color: 'from-pink-500 to-rose-500',
    href: '/solutions/airbnb',
  },
  {
    id: 'food-trucks',
    icon: '🚚',
    title: 'Food Trucks & Street Food',
    description: 'Simple menus that work on mobile. Quick updates when items sell out.',
    features: ['Fast Menu', 'Out of Stock', 'Location Updates', 'Social Links'],
    image: '/images/vertical-foodtruck.jpg',
    color: 'from-green-500 to-emerald-500',
    href: '/solutions/food-trucks',
  },
];

export function VerticalsSection() {
  return (
    <section id="solutions" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Solutions
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Built for every hospitality business
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Whether you run a coffee shop, a boutique hotel, or an Airbnb,
            GUDBRO adapts to your needs.
          </p>
        </div>

        {/* Verticals grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {verticals.map((vertical) => (
            <Link
              key={vertical.id}
              href={vertical.href}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300"
            >
              {/* Gradient header */}
              <div className={`h-2 bg-gradient-to-r ${vertical.color}`} />

              <div className="p-8">
                {/* Icon and title */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {vertical.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {vertical.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {vertical.description}
                </p>

                {/* Features */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {vertical.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  Learn more
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Don&apos;t see your business type?{' '}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              Let&apos;s talk
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
