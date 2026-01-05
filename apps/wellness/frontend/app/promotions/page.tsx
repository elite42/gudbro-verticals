'use client';

import Link from 'next/link';
import { OfferCard } from '../../components/OfferCard';
import { wellnessConfig } from '../../config/wellness.config';
import { Header, BottomNav } from '@gudbro/menu-template/components';

export default function PromotionsPage() {
  const { business, ui, contact } = wellnessConfig;

  // Example promotions with type='promotion', validity dates, and discounts
  const promotions = [
    {
      id: 'promo-1',
      name: '-20% su Tutti i Massaggi',
      description: 'Sconto del 20% su tutti i massaggi corpo per tutto il mese!',
      price: 350000, // Original price
      duration: '60-90 min',
      icon: '💆‍♀️',
      type: 'promotion' as const,
      popular: true,
      validFrom: '2025-11-01',
      validTo: '2025-11-30',
      discount: {
        type: 'percentage' as const,
        value: 20,
      },
      services: ['Thai Massage', 'Swedish Massage', 'Hot Stone Massage', 'Aromatherapy Massage'],
    },
    {
      id: 'promo-2',
      name: 'Pacchetto San Valentino',
      description: 'Offerta speciale per coppie - due trattamenti al prezzo di uno!',
      price: 800000,
      duration: '120 min',
      icon: '💕',
      type: 'promotion' as const,
      validFrom: '2025-02-10',
      validTo: '2025-02-14',
      discount: {
        type: 'fixed' as const,
        value: 400000,
      },
      services: ['Couples Massage (2 persone)', 'Champagne & Fragole', 'Rose Petals Decoration'],
    },
    {
      id: 'promo-3',
      name: 'Happy Hour Facial',
      description: 'Sconto su trattamenti viso prenotati dalle 14:00 alle 16:00',
      price: 200000,
      duration: '45 min',
      icon: '🌟',
      type: 'promotion' as const,
      validFrom: '2025-11-01',
      validTo: '2025-12-31',
      discount: {
        type: 'percentage' as const,
        value: 30,
      },
      services: ['Korean Facial', 'Anti-aging Treatment', 'Deep Cleansing'],
      conditions: 'Valido solo lun-ven 14:00-16:00',
    },
    {
      id: 'promo-expired',
      name: 'Black Friday Deal (Scaduta)',
      description: 'Era: 50% di sconto su tutti i servizi',
      price: 500000,
      duration: '90 min',
      icon: '🖤',
      type: 'promotion' as const,
      validFrom: '2024-11-24',
      validTo: '2024-11-24',
      discount: {
        type: 'percentage' as const,
        value: 50,
      },
      services: ['Tutti i servizi'],
    },
  ];

  // Filter active vs expired
  const activePromotions = promotions.filter((promo) => {
    if (!promo.validFrom || !promo.validTo) return true;
    const now = new Date();
    const from = new Date(promo.validFrom);
    const to = new Date(promo.validTo);
    return now >= from && now <= to;
  });

  const expiredPromotions = promotions.filter((promo) => {
    if (!promo.validFrom || !promo.validTo) return false;
    const now = new Date();
    const to = new Date(promo.validTo);
    return now > to;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-24">
      {/* Header */}
      <Header config={wellnessConfig} showBackButton={true} variant="minimal" />

      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-12 text-white">
        <div className="container mx-auto text-center">
          <h1 className="mb-3 text-4xl font-bold">
            🎁 {ui?.labels?.promotions || 'Promozioni Speciali'}
          </h1>
          <p className="text-xl opacity-90">Approfitta delle nostre offerte a tempo limitato!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Active Promotions */}
        {activePromotions.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">✨ Offerte Attive</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activePromotions.map((promo) => (
                <OfferCard key={promo.id} offer={promo} variant="grid" />
              ))}
            </div>
          </div>
        )}

        {/* No active promotions message */}
        {activePromotions.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-6 text-6xl">🎁</div>
            <h2 className="mb-4 text-3xl font-bold text-gray-800">
              Nessuna Promozione Attiva Al Momento
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Torna presto per vedere le nostre offerte speciali!
            </p>
            <Link
              href={`https://zalo.me/${contact?.zaloId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:from-pink-600 hover:to-purple-600"
            >
              💬 Contattaci su Zalo
            </Link>
          </div>
        )}

        {/* Expired Promotions */}
        {expiredPromotions.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-500">⏰ Offerte Scadute</h2>
            <div className="grid grid-cols-1 gap-6 opacity-60 md:grid-cols-2 lg:grid-cols-3">
              {expiredPromotions.map((promo) => (
                <OfferCard key={promo.id} offer={promo} variant="grid" />
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              💝 Ricevi le Nostre Offerte Esclusive
            </h3>
            <p className="mb-6 text-gray-600">
              Contattaci su Zalo per essere sempre aggiornato sulle promozioni e offerte riservate
              ai nostri clienti VIP
            </p>
            <Link
              href={`https://zalo.me/${contact?.zaloId}?text=${encodeURIComponent('Vorrei ricevere informazioni sulle promozioni')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:from-pink-600 hover:to-purple-600"
            >
              💬 Iscriviti alle Offerte
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 text-center shadow-md">
            <div className="mb-3 text-4xl">⭐</div>
            <h4 className="mb-2 text-lg font-bold">Sconti Esclusivi</h4>
            <p className="text-sm text-gray-600">Fino al 50% di sconto su servizi selezionati</p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow-md">
            <div className="mb-3 text-4xl">🎉</div>
            <h4 className="mb-2 text-lg font-bold">Offerte Stagionali</h4>
            <p className="text-sm text-gray-600">Promozioni speciali per ogni occasione</p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow-md">
            <div className="mb-3 text-4xl">💎</div>
            <h4 className="mb-2 text-lg font-bold">Programma Fedeltà</h4>
            <p className="text-sm text-gray-600">Accumula punti e ricevi vantaggi esclusivi</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav config={wellnessConfig} />
    </div>
  );
}
