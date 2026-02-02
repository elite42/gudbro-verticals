'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Package,
  Translate,
  CurrencyCircleDollar,
  UsersThree,
} from '@phosphor-icons/react';

const stats = [
  {
    value: 4653,
    suffix: '+',
    label: 'Products Listed',
    description: 'Menu items, tours & services',
    icon: Package,
  },
  {
    value: 50,
    suffix: '+',
    label: 'Languages',
    description: 'Auto-translated content',
    icon: Translate,
  },
  {
    value: 10,
    suffix: '+',
    label: 'Currencies',
    description: 'VND, USD, EUR & more',
    icon: CurrencyCircleDollar,
  },
  {
    value: 100,
    suffix: '+',
    label: 'Businesses',
    description: 'Across Southeast Asia',
    icon: UsersThree,
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;
            let currentStep = 0;

            const timer = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;
              const easeOut = 1 - Math.pow(1 - progress, 3);
              setDisplayValue(Math.round(value * easeOut));

              if (currentStep >= steps) {
                clearInterval(timer);
                setDisplayValue(value);
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="relative -mt-8 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-[var(--neutral-200)]/50 sm:p-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`relative text-center ${
                  index < stats.length - 1
                    ? 'lg:border-r lg:border-[var(--neutral-200)]'
                    : ''
                }`}
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                  <stat.icon size={24} className="text-[var(--primary)]" weight="duotone" />
                </div>
                <div className="text-3xl font-bold text-[var(--neutral-900)] sm:text-4xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm font-semibold text-[var(--neutral-700)]">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-xs text-[var(--neutral-500)]">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
