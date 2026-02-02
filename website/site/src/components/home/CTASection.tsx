import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  CurrencyCircleDollar,
  Clock,
} from '@phosphor-icons/react/dist/ssr';

const trustBadges = [
  {
    icon: ShieldCheck,
    text: 'Secure & Private',
  },
  {
    icon: CurrencyCircleDollar,
    text: '0% Commission',
  },
  {
    icon: Clock,
    text: 'Setup in 10 min',
  },
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] py-16 sm:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white opacity-5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white opacity-5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--secondary)] opacity-10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Headline */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Go Digital?
          </h2>
          <p className="mt-4 text-lg text-white/80 sm:text-xl">
            Join hundreds of businesses already growing with GUDBRO.
            Your customers are waiting.
          </p>

          {/* Email signup form */}
          <form className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border-0 bg-white/10 px-5 py-3.5 text-white placeholder:text-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/50 sm:w-80"
            />
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-[var(--primary)] transition-all hover:bg-[var(--neutral-100)] hover:gap-3"
            >
              Start Free
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-white/80">
                <badge.icon size={20} weight="duotone" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Alternative CTA */}
          <p className="mt-8 text-sm text-white/60">
            Prefer to see it first?{' '}
            <Link href="/demo" className="font-medium text-white underline hover:text-white/90">
              Book a live demo
            </Link>{' '}
            with our team.
          </p>
        </div>
      </div>
    </section>
  );
}
