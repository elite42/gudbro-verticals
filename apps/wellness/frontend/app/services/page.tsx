'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ServiceCard } from '../../components/ServiceCard';
import { wellnessConfig, getApiUrl, HUB_ID } from '../../config/wellness.config';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = getApiUrl();
  const hubId = HUB_ID;
  const { business, ui } = wellnessConfig;

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${apiUrl}/${hubId}/services`);
        const data = await res.json();
        setServices(data.data?.services || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  // Raggruppa servizi per categoria
  const groupedServices: { [key: string]: any[] } = {};
  services.forEach((service) => {
    const category = service.category || 'Altri Servizi';
    if (!groupedServices[category]) {
      groupedServices[category] = [];
    }
    groupedServices[category].push(service);
  });

  const categories = Object.keys(groupedServices);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center pb-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Caricamento servizi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-pink-600">
              {business.name}
            </Link>
            <Link href="/" className="text-gray-600 hover:text-pink-600">
              ← Indietro
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-3">💆 {ui?.labels?.items || 'I Nostri Servizi'}</h1>
          <p className="text-xl opacity-90">
            Scorri per categoria e swipe per esplorare i trattamenti
          </p>
        </div>
      </div>

      {/* Categories - Netflix Style */}
      <div className="py-6 space-y-8">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            {/* Category Header */}
            <div className="px-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {category}
              </h2>
              <p className="text-sm text-gray-600">
                {groupedServices[category].length} servizi disponibili
              </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative">
              <div
                className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {groupedServices[category].map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    variant="horizontal"
                  />
                ))}
              </div>

              {/* Scroll Hint - visible only on first category */}
              {categoryIndex === 0 && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="bg-gradient-to-l from-pink-100 to-transparent w-20 h-full flex items-center justify-end pr-2">
                    <span className="text-2xl animate-pulse">→</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Bottom */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Non trovi quello che cerchi?</h2>
          <p className="text-lg mb-6 opacity-90">
            Contattaci su Zalo e ti aiuteremo a trovare il trattamento perfetto
          </p>
          <Link
            href={`https://zalo.me/${wellnessConfig.contact?.zaloId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            💬 Contattaci su Zalo
          </Link>
        </div>
      </div>

      {/* CSS per nascondere scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
