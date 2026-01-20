'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Calendar, Tag, Trophy, Gift, Percent, Ticket } from 'lucide-react';

export default function MarketingPage() {
  const t = useTranslations('marketing');

  const marketingFeatures = [
    {
      name: t('events'),
      description: t('eventsDesc'),
      href: '/marketing/events',
      icon: Calendar,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: t('promotions'),
      description: t('promotionsDesc'),
      href: '/marketing/promotions',
      icon: Tag,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      name: t('challenges'),
      description: t('challengesDesc'),
      href: '/marketing/challenges',
      icon: Trophy,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
    },
    {
      name: t('giftCards'),
      description: t('giftCardsDesc'),
      href: '/marketing/gift-cards',
      icon: Gift,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
    },
    {
      name: t('promoCodes'),
      description: t('promoCodesDesc'),
      href: '/marketing/promo-codes',
      icon: Percent,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
    },
    {
      name: t('coupons'),
      description: t('couponsDesc'),
      href: '/marketing/coupons',
      icon: Ticket,
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'bg-cyan-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-1 text-gray-500">{t('description')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {marketingFeatures.map((feature) => (
          <Link
            key={feature.name}
            href={feature.href}
            className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-lg ${feature.bgColor} p-3`}>
                <feature.icon
                  className={`h-6 w-6 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                  style={{
                    stroke: 'url(#gradient)',
                  }}
                />
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {feature.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-2">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-900">{t('aiPoweredMarketing')}</h3>
            <p className="mt-1 text-sm text-blue-700">{t('aiPoweredMarketingDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
