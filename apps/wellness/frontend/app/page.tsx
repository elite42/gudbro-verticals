'use client';

import { useState } from 'react';
import Link from 'next/link';
import { wellnessConfig } from '../config/wellness.config';

export default function HomePage() {
  const [language, setLanguage] = useState(wellnessConfig.i18n?.defaultLanguage || 'en');
  const [currency, setCurrency] = useState(wellnessConfig.i18n?.defaultCurrency || 'VND');

  // Extract config values for easier access
  const { business, contact, social, location, reviews, paymentMethods, i18n, ui } = wellnessConfig;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          {/* Logo + Name */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <img
              src={business.logo}
              alt={business.name}
              className="h-16 w-16 rounded-full object-cover shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-pink-600">{business.name}</h1>
              <p className="text-sm text-gray-600">{business.tagline}</p>
            </div>
          </div>

          {/* Social Icons + Language/Currency Selectors */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <a
                href={social?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl transition-transform hover:scale-110"
              >
                📘
              </a>
              <a
                href={social?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl transition-transform hover:scale-110"
              >
                📷
              </a>
              <a
                href={social?.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl transition-transform hover:scale-110"
              >
                🎵
              </a>
            </div>

            <div className="flex gap-2">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-pink-500"
              >
                {(i18n?.supportedLanguages || []).map((lang: { code: string; flag: string }) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.code.toUpperCase()}
                  </option>
                ))}
              </select>

              {/* Currency Selector */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-pink-500"
              >
                {(i18n?.supportedCurrencies || []).map((curr: string) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Card Grid */}
      <div className="container mx-auto space-y-4 px-4 py-6">
        {/* Row 1: Servizi + Promozioni */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Servizi Card */}
          <Link
            href="/services"
            className="transform rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-3 flex items-center gap-4">
              <div className="text-5xl">💆</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Servizi</h2>
                <p className="text-sm text-gray-600">Browse categorie & prezzi</p>
              </div>
            </div>
            <p className="mb-3 text-gray-600">Massaggi, trattamenti viso, unghie e molto altro</p>
            <div className="flex items-center justify-between font-semibold text-pink-600">
              <span>Vedi tutti i servizi</span>
              <span>→</span>
            </div>
          </Link>

          {/* Promozioni Card */}
          <Link
            href="/promotions"
            className="transform rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-3 flex items-center gap-4">
              <div className="text-5xl">🎁</div>
              <div>
                <h2 className="text-2xl font-bold">Promozioni</h2>
                <p className="text-sm opacity-90">Offerte speciali</p>
              </div>
            </div>
            <p className="mb-3 opacity-90">-20% su tutti i massaggi a Febbraio!</p>
            <div className="flex items-center justify-between font-semibold">
              <span>Scopri le promo</span>
              <span>→</span>
            </div>
          </Link>
        </div>

        {/* Row 2: Pacchetti VIP */}
        <Link
          href="/packages"
          className="block transform rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
        >
          <div className="mb-3 flex items-center gap-4">
            <div className="text-5xl">📦</div>
            <div>
              <h2 className="text-2xl font-bold">Pacchetti VIP</h2>
              <p className="text-sm opacity-90">Combo da 400.000 VND</p>
            </div>
          </div>
          <p className="mb-3 opacity-90">
            VIP 1: Ear cleaning + Facial + Shampoo (60min) | VIP 2: Full package (90min)
          </p>
          <div className="flex items-center justify-between font-semibold">
            <span>Vedi i pacchetti</span>
            <span>→</span>
          </div>
        </Link>

        {/* Row 3: Recensioni */}
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-4">
            <div className="text-5xl">⭐</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Lascia una Recensione</h2>
              <p className="text-sm text-gray-600">Aiutaci a crescere!</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={reviews?.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg bg-blue-500 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-600"
            >
              📱 Google
            </a>
            <a
              href={reviews?.tripadvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-green-700"
            >
              ✈️ TripAdvisor
            </a>
          </div>
        </div>

        {/* Row 4: Contatti */}
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-4">
            <div className="text-5xl">📞</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Contattaci</h2>
              <p className="text-sm text-gray-600">Prenota il tuo trattamento</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <a
              href={`https://zalo.me/${contact?.zaloId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-blue-500 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-600"
            >
              💬 Zalo
            </a>
            <a
              href={`https://wa.me/${contact?.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-500 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-green-600"
            >
              📱 WhatsApp
            </a>
            <a
              href={`tel:${contact?.phone}`}
              className="rounded-lg bg-pink-500 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-pink-600"
            >
              📞 Call
            </a>
          </div>
        </div>

        {/* Row 5: Metodi di Pagamento */}
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-4">
            <div className="text-5xl">💳</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Accettiamo</h2>
              <p className="text-sm text-gray-600">Metodi di pagamento disponibili</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((method: string, idx: number) => (
              <span
                key={idx}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700"
              >
                {method === 'Cash' && '💵'}
                {method === 'Card' && '💳'}
                {method === 'MoMo' && '📱'}
                {method === 'ZaloPay' && '💰'}
                {method === 'GrabPay' && '🚗'} {method}
              </span>
            ))}
          </div>
        </div>

        {/* Row 6: Come Raggiungerci */}
        <a
          href={location?.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block transform rounded-xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
        >
          <div className="mb-3 flex items-center gap-4">
            <div className="text-5xl">📍</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Come Raggiungerci</h2>
              <p className="text-sm text-gray-600">{location?.address}</p>
            </div>
          </div>
          <div className="mb-3 rounded-lg bg-gray-100 p-4">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location?.address || '')}`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
          <div className="flex items-center justify-between font-semibold text-pink-600">
            <span>Apri su Google Maps</span>
            <span>→</span>
          </div>
        </a>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gray-900 py-6 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2025 {business.name}. Powered by <span className="text-pink-400">Gudbro</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
