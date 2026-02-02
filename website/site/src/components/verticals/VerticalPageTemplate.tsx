import Link from 'next/link';
import {
  ArrowRight,
  Check,
  QrCode,
  Globe,
  CurrencyCircleDollar,
  DeviceMobile,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';

interface Feature {
  title: string;
  description: string;
  icon: Icon;
}

interface VerticalPageProps {
  vertical: {
    name: string;
    tagline: string;
    description: string;
    icon: Icon;
    color: string;
    status: 'live' | 'beta' | 'coming';
    features: Feature[];
    benefits: string[];
    useCases: {
      title: string;
      description: string;
    }[];
    cta: {
      primary: string;
      secondary: string;
    };
  };
}

export function VerticalPageTemplate({ vertical }: VerticalPageProps) {
  const statusConfig = {
    live: { label: 'Live', className: 'bg-[var(--success)]/10 text-[var(--success)]' },
    beta: { label: 'Beta', className: 'bg-[var(--primary)]/10 text-[var(--primary)]' },
    coming: { label: 'Coming Soon', className: 'bg-[var(--neutral-200)] text-[var(--neutral-600)]' },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--neutral-50)] to-white pt-24 md:pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: vertical.color }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${vertical.color}20` }}
                >
                  <vertical.icon size={32} style={{ color: vertical.color }} weight="duotone" />
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusConfig[vertical.status].className}`}>
                  {statusConfig[vertical.status].label}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--neutral-900)] sm:text-5xl">
                GUDBRO {vertical.name}
              </h1>

              <p className="mt-2 text-xl font-medium" style={{ color: vertical.color }}>
                {vertical.tagline}
              </p>

              <p className="mt-4 text-lg text-[var(--neutral-600)]">
                {vertical.description}
              </p>

              {/* Quick benefits */}
              <ul className="mt-6 space-y-2">
                {vertical.benefits.slice(0, 4).map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-[var(--neutral-700)]">
                    <Check size={20} weight="bold" className="text-[var(--success)]" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/signup" className="btn btn-primary btn-lg group">
                  {vertical.cta.primary}
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/demo" className="btn btn-secondary btn-lg">
                  {vertical.cta.secondary}
                </Link>
              </div>
            </div>

            {/* Visual placeholder */}
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="aspect-[4/3] rounded-2xl shadow-2xl"
                style={{ backgroundColor: `${vertical.color}10` }}
              >
                <div className="flex h-full items-center justify-center">
                  <vertical.icon size={120} style={{ color: `${vertical.color}40` }} weight="duotone" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-[var(--neutral-600)]">
              Purpose-built features for {vertical.name.toLowerCase()} businesses
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {vertical.features.map((feature) => (
              <div key={feature.title} className="card p-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${vertical.color}15` }}
                >
                  <feature.icon size={24} style={{ color: vertical.color }} weight="duotone" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--neutral-900)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--neutral-600)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section bg-[var(--neutral-50)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
              Perfect For
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vertical.useCases.map((useCase, index) => (
              <div
                key={useCase.title}
                className="rounded-xl border border-[var(--neutral-200)] bg-white p-6"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white"
                  style={{ backgroundColor: vertical.color }}
                >
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--neutral-900)]">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--neutral-600)]">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 sm:py-24"
        style={{ background: `linear-gradient(135deg, ${vertical.color} 0%, ${vertical.color}dd 100%)` }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your {vertical.name}?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Join hundreds of businesses already using GUDBRO {vertical.name}.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="btn btn-lg bg-white text-[var(--neutral-900)] hover:bg-[var(--neutral-100)]"
              >
                Start Free Today
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
