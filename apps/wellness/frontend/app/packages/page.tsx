'use client';

import { OfferCard } from '../../components/OfferCard';
import { wellnessConfig } from '../../config/wellness.config';
import { Header, BottomNav } from '@gudbro/menu-template/components';

export default function PackagesPage() {
  const { business, ui } = wellnessConfig;

  // Packages are permanent offers (type='package')
  const packages = [
    {
      id: '1',
      name: 'VIP Package 1',
      duration: '60 min',
      price: 400000,
      services: [
        'Ear Cleaning - 취이 제거',
        'Face Shaving - 얼굴 면도',
        'Facial - 얼굴 관리',
        'Shampoo - 샴푸',
      ],
      description: 'Pacchetto completo per una pulizia profonda del viso e rilassamento',
      icon: '✨',
      type: 'package' as const,
    },
    {
      id: '2',
      name: 'VIP Package 2',
      duration: '90 min',
      price: 550000,
      services: [
        'Face Shaving - 얼굴 면도',
        'Ear Cleaning - 취이 제거',
        'Facial - 얼굴 관리',
        'Face Mask - 얼굴 팩',
        'Shampoo - 샴푸',
        'Head-Neck-Shoulder Massage - 머리-목-어깨 마사지',
      ],
      description: 'Il nostro pacchetto più completo con massaggio rilassante',
      icon: '💎',
      popular: true,
      type: 'package' as const,
    },
    {
      id: '3',
      name: 'Combo Foot Care',
      duration: '75 min',
      price: 450000,
      services: [
        'Foot Massage - 발 마사지',
        'Pedicure (no color) - 발 케어',
        'Heel Scrub - 발뒤꿈치 각질 제거',
      ],
      description: 'Trattamento completo per piedi stanchi e pelle morbida',
      icon: '🦶',
      type: 'package' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <Header config={wellnessConfig} showBackButton={true} variant="minimal" />

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-800">
            📦 {ui?.labels?.packages || 'Pacchetti VIP'}
          </h1>
          <p className="text-xl text-gray-600">Risparmia con i nostri combo esclusivi</p>
        </div>

        {/* Packages Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <OfferCard key={pkg.id} offer={pkg} variant="grid" />
          ))}
        </div>

        {/* Info Box */}
        <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
          <h3 className="mb-3 text-xl font-bold text-gray-800">
            💡 Perché scegliere un pacchetto?
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span>💰</span>
              <span>
                <strong>Risparmio garantito</strong> - Fino al 20% rispetto ai servizi singoli
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>⏰</span>
              <span>
                <strong>Tutto in un'unica sessione</strong> - Massimo relax senza interruzioni
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>✨</span>
              <span>
                <strong>Esperienza completa</strong> - Servizi pensati per funzionare insieme
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav config={wellnessConfig} />
    </div>
  );
}
