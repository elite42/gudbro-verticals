'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Merchant, PromotionType, TriggerAction, PlacementType } from '@/types/promotion';

// Mock promotion data (in production would come from API)
interface PromoPageData {
  id: string;
  code: string;
  title: string;
  description: string;
  shortDescription: string;
  type: PromotionType;
  reward: {
    discountPercent?: number;
    discountFixed?: number;
    freeItemName?: string;
  };
  triggerAction: TriggerAction;
  triggerDescription: string;
  image: string | null;
  endDate: string;
  conditions: {
    minPurchase?: number;
    validDays?: number[];
    validTimeStart?: string;
    validTimeEnd?: string;
  };
  merchant: Merchant;
  placement: {
    id: string;
    name: string;
    type: PlacementType;
  };
}

const mockPromoData: PromoPageData = {
  id: '1',
  code: 'gennaio20',
  title: 'Sconto 20% sul primo ordine!',
  description: 'Vieni a trovarci e ottieni il 20% di sconto sul tuo primo ordine. Valido su tutto il menu!',
  shortDescription: 'Scansiona il QR al tavolo per attivare lo sconto',
  type: 'discount_percent',
  reward: {
    discountPercent: 20,
  },
  triggerAction: 'signup',
  triggerDescription: 'Registrati per attivare lo sconto',
  image: null,
  endDate: '2025-01-31',
  conditions: {
    minPurchase: 15,
    validDays: [0, 1, 2, 3, 4, 5, 6],
    validTimeStart: '08:00',
    validTimeEnd: '22:00',
  },
  merchant: {
    id: 'caffe-rossi',
    name: 'Caffè Rossi',
    logo: undefined,
    address: 'Via Roma 123, Milano',
    phone: '+39 02 1234567',
    rating: 4.6,
    reviewCount: 234,
    coordinates: {
      lat: 45.4654219,
      lng: 9.1859243,
    },
    placeId: 'ChIJcfMGTlDBhkcRr8KPnqWkVsY',
    openNow: true,
    hours: 'Lun-Ven 7:00-22:00 | Sab-Dom 8:00-23:00',
  },
  placement: {
    id: 'p1',
    name: 'Volantino Centro Storico',
    type: 'offline',
  },
};

export default function PromoLandingPage() {
  const params = useParams();
  const code = params.code as string;

  const [promo] = useState(mockPromoData);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [saved, setSaved] = useState(false);

  // Track view on mount
  useEffect(() => {
    // TODO: In production - API call to track QR scan
    // trackPromoView(code, promo.placement.id);
  }, [code]);

  const getGoogleMapsUrl = () => {
    const { lat, lng } = promo.merchant.coordinates;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${promo.merchant.placeId}`;
  };

  const handleGetDirections = () => {
    window.open(getGoogleMapsUrl(), '_blank');
  };

  const handleSavePromo = () => {
    // In production: Save to localStorage or user account
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: promo.title,
      text: `${promo.shortDescription} - ${promo.merchant.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Share was cancelled by user
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiato!');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative px-4 pt-8 pb-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              <span className="font-bold">GUDBRO</span>
            </Link>
            <button
              onClick={handleShare}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              aria-label="Condividi promozione"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>

          {/* Promo Badge */}
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Offerta Speciale
            </span>

            {/* Reward Display */}
            <div className="mb-4">
              {promo.reward.discountPercent && (
                <div className="text-7xl font-black">
                  -{promo.reward.discountPercent}%
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold mb-2">{promo.title}</h1>
            <p className="text-purple-100 text-sm">Valido fino al {formatDate(promo.endDate)}</p>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-4 relative z-10 pb-32">
        {/* Merchant Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-2xl text-white font-bold">
                {promo.merchant.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-gray-900 text-lg">{promo.merchant.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    {promo.merchant.rating}
                  </span>
                  <span>({promo.merchant.reviewCount} recensioni)</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{promo.merchant.address}</p>
              </div>
            </div>

            {/* Open status */}
            <div className="mt-3 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${promo.merchant.openNow ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${promo.merchant.openNow ? 'text-green-600' : 'text-red-600'}`}>
                {promo.merchant.openNow ? 'Aperto ora' : 'Chiuso'}
              </span>
              <span className="text-sm text-gray-400">· {promo.merchant.hours}</span>
            </div>
          </div>

          {/* Map Preview */}
          <div className="relative h-40 bg-gray-200">
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${promo.merchant.coordinates.lat},${promo.merchant.coordinates.lng}&zoom=15&size=600x200&markers=color:red%7C${promo.merchant.coordinates.lat},${promo.merchant.coordinates.lng}&key=YOUR_API_KEY`}
              alt="Mappa"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if API key not set
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x200/e5e7eb/9ca3af?text=Mappa+Non+Disponibile';
              }}
            />
            <button
              onClick={handleGetDirections}
              className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Indicazioni
            </button>
          </div>
        </div>

        {/* How to Redeem */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <h3 className="font-bold text-gray-900 mb-4">Come riscattare l'offerta</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Vai al locale</p>
                <p className="text-sm text-gray-500">Segui le indicazioni su Google Maps</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Scansiona il QR al tavolo</p>
                <p className="text-sm text-gray-500">Troverai un QR code su ogni tavolo</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">{promo.triggerDescription}</p>
                <p className="text-sm text-gray-500">Lo sconto verrà applicato automaticamente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Details */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <h3 className="font-bold text-gray-900 mb-3">Dettagli offerta</h3>
          <p className="text-gray-600 mb-4">
            {showFullDescription ? promo.description : promo.description.slice(0, 100)}
            {promo.description.length > 100 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-purple-600 ml-1"
              >
                {showFullDescription ? 'Mostra meno' : '...Leggi tutto'}
              </button>
            )}
          </p>

          {/* Conditions */}
          <div className="space-y-2 text-sm">
            {promo.conditions.minPurchase && (
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ordine minimo: €{promo.conditions.minPurchase}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Valido dalle {promo.conditions.validTimeStart} alle {promo.conditions.validTimeEnd}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Scade il {formatDate(promo.endDate)}</span>
            </div>
          </div>
        </div>

        {/* Placement info (debug/tracking) */}
        <p className="text-xs text-center text-gray-400">
          Codice: {code} · {promo.placement.name}
        </p>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={handleSavePromo}
            className={`flex-shrink-0 p-3 border rounded-xl transition-colors ${
              saved
                ? 'bg-green-50 border-green-200 text-green-600'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {saved ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            )}
          </button>
          <button
            onClick={handleGetDirections}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Portami là
          </button>
        </div>
      </div>
    </div>
  );
}
