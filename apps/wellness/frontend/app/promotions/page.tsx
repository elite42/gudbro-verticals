'use client';

import { OfferCard } from '../../components/OfferCard';
import { wellnessConfig } from '../../config/wellness.config';
import { Header, BottomNav } from '../../../../menu-template/components';

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
        value: 20
      },
      services: [
        'Thai Massage',
        'Swedish Massage',
        'Hot Stone Massage',
        'Aromatherapy Massage'
      ]
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
        value: 400000
      },
      services: [
        'Couples Massage (2 persone)',
        'Champagne & Fragole',
        'Rose Petals Decoration'
      ]
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
        value: 30
      },
      services: [
        'Korean Facial',
        'Anti-aging Treatment',
        'Deep Cleansing'
      ],
      conditions: 'Valido solo lun-ven 14:00-16:00'
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
        value: 50
      },
      services: ['Tutti i servizi']
    }
  ];

  // Filter active vs expired
  const activePromotions = promotions.filter(promo => {
    if (!promo.validFrom || !promo.validTo) return true;
    const now = new Date();
    const from = new Date(promo.validFrom);
    const to = new Date(promo.validTo);
    return now >= from && now <= to;
  });

  const expiredPromotions = promotions.filter(promo => {
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
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">
            🎁 {ui?.labels?.promotions || 'Promozioni Speciali'}
          </h1>
          <p className="text-xl opacity-90">
            Approfitta delle nostre offerte a tempo limitato!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Active Promotions */}
        {activePromotions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              ✨ Offerte Attive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePromotions.map((promo) => (
                <OfferCard
                  key={promo.id}
                  offer={promo}
                  variant="grid"
                />
              ))}
            </div>
          </div>
        )}

        {/* No active promotions message */}
        {activePromotions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🎁</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Nessuna Promozione Attiva Al Momento
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Torna presto per vedere le nostre offerte speciali!
            </p>
            <Link
              href={`https://zalo.me/${contact?.zaloId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105"
            >
              💬 Contattaci su Zalo
            </Link>
          </div>
        )}

        {/* Expired Promotions */}
        {expiredPromotions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-500 mb-4">
              ⏰ Offerte Scadute
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
              {expiredPromotions.map((promo) => (
                <OfferCard
                  key={promo.id}
                  offer={promo}
                  variant="grid"
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              💝 Ricevi le Nostre Offerte Esclusive
            </h3>
            <p className="text-gray-600 mb-6">
              Contattaci su Zalo per essere sempre aggiornato sulle promozioni e offerte riservate ai nostri clienti VIP
            </p>
            <Link
              href={`https://zalo.me/${contact?.zaloId}?text=${encodeURIComponent('Vorrei ricevere informazioni sulle promozioni')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105"
            >
              💬 Iscriviti alle Offerte
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-4xl mb-3">⭐</div>
            <h4 className="font-bold text-lg mb-2">Sconti Esclusivi</h4>
            <p className="text-gray-600 text-sm">
              Fino al 50% di sconto su servizi selezionati
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-4xl mb-3">🎉</div>
            <h4 className="font-bold text-lg mb-2">Offerte Stagionali</h4>
            <p className="text-gray-600 text-sm">
              Promozioni speciali per ogni occasione
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-4xl mb-3">💎</div>
            <h4 className="font-bold text-lg mb-2">Programma Fedeltà</h4>
            <p className="text-gray-600 text-sm">
              Accumula punti e ricevi vantaggi esclusivi
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav config={wellnessConfig} />
    </div>
  );
}
