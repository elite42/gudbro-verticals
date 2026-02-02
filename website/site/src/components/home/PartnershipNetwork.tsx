import {
  Coffee,
  MapTrifold,
  Bed,
  Handshake,
  ArrowsLeftRight,
  Tag,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

const benefits = [
  {
    title: 'For Customers',
    description: 'Exclusive discounts at partner businesses with your GUDBRO Pass',
    icon: Tag,
  },
  {
    title: 'For Referrers',
    description: 'Earn commission on sales you refer to partner businesses',
    icon: ArrowsLeftRight,
  },
  {
    title: 'For Partners',
    description: 'Receive qualified leads from trusted local sources',
    icon: Handshake,
  },
];

export function PartnershipNetwork() {
  return (
    <section className="section bg-[var(--neutral-900)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            <span className="inline-flex items-center rounded-full bg-[var(--secondary)]/20 px-4 py-1.5 text-sm font-medium text-[var(--secondary)]">
              Ecosystem Power
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              The GUDBRO Partnership Network
            </h2>
            <p className="mt-4 text-lg text-[var(--neutral-300)]">
              Turn your customers into your neighbors&apos; customers, and vice versa.
              Our cross-merchant ecosystem creates win-win-win scenarios.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/20">
                    <benefit.icon size={24} className="text-[var(--primary-light)]" weight="duotone" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-[var(--neutral-400)]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ROI message */}
            <div className="mt-8 rounded-xl bg-white/10 p-6 backdrop-blur">
              <p className="text-lg font-semibold text-white">
                &quot;Refer 3-4 customers per month → Your subscription pays for itself&quot;
              </p>
              <p className="mt-2 text-sm text-[var(--neutral-400)]">
                Real return on investment from day one
              </p>
            </div>

            <a
              href="/partnership-network"
              className="btn btn-primary btn-lg group mt-8 inline-flex items-center gap-2"
            >
              Learn About Partnerships
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Visual - Network Diagram */}
          <div className="relative">
            <div className="mx-auto max-w-md">
              {/* Central hub */}
              <div className="relative">
                {/* Connection lines */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 400 400"
                >
                  {/* Lines from center to each node */}
                  <line
                    x1="200"
                    y1="200"
                    x2="100"
                    y2="80"
                    className="stroke-[var(--primary)]"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    opacity="0.5"
                  />
                  <line
                    x1="200"
                    y1="200"
                    x2="300"
                    y2="80"
                    className="stroke-[var(--primary)]"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    opacity="0.5"
                  />
                  <line
                    x1="200"
                    y1="200"
                    x2="350"
                    y2="200"
                    className="stroke-[var(--primary)]"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    opacity="0.5"
                  />
                  <line
                    x1="200"
                    y1="200"
                    x2="300"
                    y2="320"
                    className="stroke-[var(--primary)]"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    opacity="0.5"
                  />
                  <line
                    x1="200"
                    y1="200"
                    x2="100"
                    y2="320"
                    className="stroke-[var(--primary)]"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    opacity="0.5"
                  />
                  <line
                    x1="200"
                    y1="200"
                    x2="50"
                    y2="200"
                    className="stroke-[var(--primary)]"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    opacity="0.5"
                  />

                  {/* Inter-node connections */}
                  <path
                    d="M 100 80 Q 200 50 300 80"
                    fill="none"
                    className="stroke-[var(--secondary)]"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                  <path
                    d="M 100 320 Q 200 350 300 320"
                    fill="none"
                    className="stroke-[var(--secondary)]"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.3"
                  />
                </svg>

                {/* Network grid */}
                <div className="relative aspect-square">
                  {/* Center - GUDBRO Customer */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] shadow-lg shadow-[var(--primary)]/30">
                      <span className="text-2xl font-bold text-white">G</span>
                      <span className="text-[10px] font-medium text-white/80">CUSTOMER</span>
                    </div>
                  </div>

                  {/* Top left - Coffeeshop */}
                  <div className="absolute left-4 top-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                      <Coffee size={28} className="text-[var(--primary-light)]" weight="duotone" />
                    </div>
                    <p className="mt-2 text-center text-xs font-medium text-[var(--neutral-300)]">Cafe</p>
                  </div>

                  {/* Top right - Tours */}
                  <div className="absolute right-4 top-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                      <MapTrifold size={28} className="text-[var(--secondary)]" weight="duotone" />
                    </div>
                    <p className="mt-2 text-center text-xs font-medium text-[var(--neutral-300)]">Tours</p>
                  </div>

                  {/* Right - Hotel */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                      <Bed size={28} className="text-[var(--accent)]" weight="duotone" />
                    </div>
                    <p className="mt-2 text-center text-xs font-medium text-[var(--neutral-300)]">Stays</p>
                  </div>

                  {/* Bottom right */}
                  <div className="absolute bottom-4 right-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                      <span className="text-2xl">🏍️</span>
                    </div>
                    <p className="mt-2 text-center text-xs font-medium text-[var(--neutral-300)]">Rentals</p>
                  </div>

                  {/* Bottom left */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                      <span className="text-2xl">💆</span>
                    </div>
                    <p className="mt-2 text-center text-xs font-medium text-[var(--neutral-300)]">Wellness</p>
                  </div>

                  {/* Left */}
                  <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                      <span className="text-2xl">🍜</span>
                    </div>
                    <p className="mt-2 text-center text-xs font-medium text-[var(--neutral-300)]">Restaurant</p>
                  </div>
                </div>
              </div>

              {/* GUDBRO Pass card */}
              <div className="mx-auto mt-8 max-w-xs rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white/80">GUDBRO PASS</p>
                    <p className="mt-1 font-mono text-lg font-bold text-white">GB-2024-XXXX</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    <span className="text-2xl">🎫</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/70">
                  Show this QR at any GUDBRO partner for exclusive discounts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
