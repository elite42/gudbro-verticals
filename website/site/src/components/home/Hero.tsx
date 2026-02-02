import Link from 'next/link';
import { ArrowRight, Play } from '@phosphor-icons/react/dist/ssr';

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero pt-24 md:pt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[var(--primary)] opacity-5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[var(--secondary)] opacity-5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)]">
              <span className="flex h-2 w-2 rounded-full bg-[var(--primary)]" />
              Now in Vietnam, Thailand & Indonesia
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--neutral-900)] sm:text-5xl lg:text-6xl">
              Your Business,{' '}
              <span className="text-gradient">Beautifully Digital</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--neutral-600)] lg:mx-0 lg:text-xl">
              Zero commission PWAs for cafes, tours, hotels & more in Southeast Asia.
              Go digital in minutes, not months.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/signup" className="btn btn-primary btn-lg group w-full sm:w-auto">
                Start Free
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <button className="btn btn-secondary btn-lg group w-full sm:w-auto">
                <Play size={20} weight="fill" />
                Watch Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-col items-center gap-6 lg:flex-row lg:items-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[var(--neutral-200)] text-xs font-medium text-[var(--neutral-600)]"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center gap-1 lg:justify-start">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-[var(--accent)]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-1 text-sm text-[var(--neutral-600)]">
                  Trusted by <span className="font-semibold">100+</span> businesses across Southeast Asia
                </p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Phone mockup */}
            <div className="relative mx-auto w-64 sm:w-72">
              {/* Phone frame */}
              <div className="relative rounded-[2.5rem] border-[8px] border-[var(--neutral-900)] bg-[var(--neutral-900)] p-1 shadow-2xl">
                {/* Notch */}
                <div className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-[var(--neutral-900)]" />

                {/* Screen */}
                <div className="aspect-[9/19] overflow-hidden rounded-[2rem] bg-white">
                  {/* App mockup content */}
                  <div className="h-full w-full bg-gradient-to-br from-[var(--neutral-50)] to-white p-4">
                    {/* Status bar */}
                    <div className="flex items-center justify-between text-xs text-[var(--neutral-500)]">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>

                    {/* App header */}
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[var(--primary)] flex items-center justify-center">
                        <span className="text-white font-bold">G</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Sunrise Cafe</p>
                        <p className="text-xs text-[var(--neutral-500)]">Digital Menu</p>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="mt-6 space-y-3">
                      {[
                        { name: 'Cà Phê Sữa Đá', price: '35K', emoji: '☕' },
                        { name: 'Bánh Mì Thịt', price: '45K', emoji: '🥖' },
                        { name: 'Phở Bò', price: '65K', emoji: '🍜' },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--neutral-100)] text-2xl">
                            {item.emoji}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-[var(--primary)] font-semibold">{item.price} VND</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Language selector */}
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="text-lg">🇻🇳</span>
                      <span className="text-lg">🇺🇸</span>
                      <span className="text-lg">🇰🇷</span>
                      <span className="text-lg">🇯🇵</span>
                      <span className="text-xs text-[var(--neutral-400)]">+46</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -right-4 top-20 rounded-xl bg-white p-3 shadow-lg sm:-right-8">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--secondary)]/10">
                    <span className="text-[var(--secondary)]">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium">0% Commission</p>
                    <p className="text-[10px] text-[var(--neutral-500)]">Keep 100% revenue</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 bottom-32 rounded-xl bg-white p-3 shadow-lg sm:-left-8">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                    <span className="text-[var(--primary)]">🌐</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium">50+ Languages</p>
                    <p className="text-[10px] text-[var(--neutral-500)]">Auto-translated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
