import Link from 'next/link';
import {
  Coffee,
  MapTrifold,
  Bed,
  Sparkle,
  Car,
  ChartBar,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

const verticals = [
  {
    name: 'Coffeeshop',
    href: '/coffeeshop',
    icon: Coffee,
    description: 'Digital menus for cafes & restaurants',
    features: [
      'QR code menus',
      '50+ languages auto-translated',
      'Allergen & dietary filters',
    ],
    status: 'live',
    color: 'var(--primary)',
  },
  {
    name: 'Tours',
    href: '/tours',
    icon: MapTrifold,
    description: 'Booking platform for tour operators',
    features: [
      'Multi-currency pricing',
      'Route maps & galleries',
      'WhatsApp confirmations',
    ],
    status: 'beta',
    color: 'var(--secondary)',
  },
  {
    name: 'Stays',
    href: '/stays',
    icon: Bed,
    description: 'Direct bookings for accommodations',
    features: [
      '0% commission bookings',
      'In-stay services (minibar, laundry)',
      'Multi-property dashboard',
    ],
    status: 'coming',
    color: 'var(--accent)',
  },
  {
    name: 'Wellness',
    href: '/wellness',
    icon: Sparkle,
    description: 'Booking system for spas & wellness',
    features: [
      'Service menu with durations',
      'Staff/therapist selection',
      'Package deals & bundles',
    ],
    status: 'coming',
    color: '#EC4899',
  },
  {
    name: 'Rentals',
    href: '/rentals',
    icon: Car,
    description: 'Vehicle & equipment rental management',
    features: [
      'Flexible pricing tiers',
      'Digital contracts',
      'Deposit management',
    ],
    status: 'coming',
    color: '#8B5CF6',
  },
  {
    name: 'Backoffice',
    href: '/backoffice',
    icon: ChartBar,
    description: 'Unified dashboard for all verticals',
    features: [
      'Order management',
      'Analytics & insights',
      'Multi-location support',
    ],
    status: 'beta',
    color: 'var(--neutral-700)',
  },
];

const statusLabels: Record<string, { label: string; className: string }> = {
  live: {
    label: 'Live',
    className: 'bg-[var(--success)]/10 text-[var(--success)]',
  },
  beta: {
    label: 'Beta',
    className: 'bg-[var(--primary)]/10 text-[var(--primary)]',
  },
  coming: {
    label: 'Coming Soon',
    className: 'bg-[var(--neutral-200)] text-[var(--neutral-600)]',
  },
};

export function VerticalCards() {
  return (
    <section className="section bg-[var(--neutral-50)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
            One Platform, Six Verticals
          </h2>
          <p className="mt-4 text-lg text-[var(--neutral-600)]">
            Purpose-built PWAs for every type of tourism & hospitality business in Southeast Asia.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((vertical) => (
            <Link
              key={vertical.name}
              href={vertical.href}
              className="card group relative p-6 hover:border-[var(--primary)]"
            >
              {/* Status Badge */}
              <div className="absolute right-4 top-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusLabels[vertical.status].className
                  }`}
                >
                  {statusLabels[vertical.status].label}
                </span>
              </div>

              {/* Icon */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${vertical.color}15` }}
              >
                <vertical.icon
                  size={28}
                  style={{ color: vertical.color }}
                  weight="duotone"
                />
              </div>

              {/* Content */}
              <h3 className="mt-4 text-xl font-bold text-[var(--neutral-900)]">
                {vertical.name}
              </h3>
              <p className="mt-2 text-sm text-[var(--neutral-600)]">
                {vertical.description}
              </p>

              {/* Features */}
              <ul className="mt-4 space-y-2">
                {vertical.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[var(--neutral-600)]"
                  >
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-[var(--success)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--primary)] group-hover:gap-3 transition-all">
                Learn more
                <ArrowRight size={16} weight="bold" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
