import {
  UserPlus,
  ListPlus,
  QrCode,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

const steps = [
  {
    number: '01',
    title: 'Sign Up',
    description: 'Create your free account in under 2 minutes. No credit card required.',
    icon: UserPlus,
    detail: 'Just your email and business name',
  },
  {
    number: '02',
    title: 'Add Your Menu',
    description: 'Upload your products, services, or tours. We auto-translate to 50+ languages.',
    icon: ListPlus,
    detail: 'Drag & drop images, set prices',
  },
  {
    number: '03',
    title: 'Share QR Code',
    description: 'Print your custom QR code and let customers access your digital menu instantly.',
    icon: QrCode,
    detail: 'Works offline, no app download needed',
  },
];

export function HowItWorks() {
  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-[var(--primary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--primary)]">
            Simple Setup
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
            Go Digital in 3 Easy Steps
          </h2>
          <p className="mt-4 text-lg text-[var(--neutral-600)]">
            No technical skills required. Most businesses are live within 10 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-24 hidden h-0.5 w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/30 md:block" />
                )}

                <div className="relative flex flex-col items-center text-center">
                  {/* Number badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-white">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
                    <step.icon size={36} className="text-[var(--primary)]" weight="duotone" />
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-bold text-[var(--neutral-900)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--neutral-600)]">
                    {step.description}
                  </p>

                  {/* Detail chip */}
                  <div className="mt-4 rounded-lg bg-[var(--neutral-100)] px-3 py-1.5 text-xs font-medium text-[var(--neutral-700)]">
                    {step.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/signup"
            className="btn btn-primary btn-lg group inline-flex items-center gap-2"
          >
            Start Free Today
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <p className="mt-4 text-sm text-[var(--neutral-500)]">
            Free forever plan available • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
