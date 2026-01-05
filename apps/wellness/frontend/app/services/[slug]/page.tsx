'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [service, setService] = useState<any>(null);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3013/api/wellness';
  const hubId = '660e8400-e29b-41d4-a716-446655440000';

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${apiUrl}/${hubId}/services`);
        const data = await res.json();
        const services = data.data?.services || [];
        setAllServices(services);

        // Find service by slug
        const foundService = services.find((s: any) => s.slug === slug);
        setService(foundService);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-pink-500"></div>
          <p className="mt-4 text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Service Not Found</h1>
          <Link href="/services" className="text-pink-600 hover:text-pink-700">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-pink-600">
              Da Nang Luxury Spa
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link href="/" className="text-gray-600 hover:text-pink-600">
                Home
              </Link>
              <Link href="/services" className="text-gray-600 hover:text-pink-600">
                Services
              </Link>
              <Link href="/staff" className="text-gray-600 hover:text-pink-600">
                Our Team
              </Link>
              <Link
                href="/#booking"
                className="rounded-lg bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
              >
                Book Now
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-pink-600">
              Services
            </Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-pink-600">{service.name}</span>
          </div>
        </div>
      </div>

      {/* Service Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Image */}
            <div>
              <img
                src={service.image}
                alt={service.name}
                className="h-96 w-full rounded-2xl object-cover shadow-lg"
              />
            </div>

            {/* Details */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-pink-100 px-4 py-1 text-sm font-semibold uppercase text-pink-700">
                  {service.category}
                </span>
                {service.isPopular && (
                  <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                    ⭐ Popular
                  </span>
                )}
              </div>

              <h1 className="mb-4 text-4xl font-bold text-gray-800">{service.name}</h1>
              <p className="mb-6 text-lg text-gray-600">{service.description}</p>

              {/* Key Info */}
              <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 text-sm text-gray-500">Duration</p>
                    <p className="text-xl font-bold text-gray-800">{service.duration} minutes</p>
                  </div>
                  {service.pricing && Object.keys(service.pricing).length > 0 && (
                    <div>
                      <p className="mb-1 text-sm text-gray-500">Starting Price</p>
                      <p className="text-xl font-bold text-pink-600">
                        {(
                          Object.values(service.pricing)[0] as { base?: number }
                        )?.base?.toLocaleString()}{' '}
                        VND
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* What's Included */}
              {service.includes && service.includes.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">What's Included</h3>
                  <ul className="space-y-2">
                    {service.includes.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <svg
                          className="mr-2 h-5 w-5 text-pink-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.benefits.map((benefit: string, idx: number) => (
                      <span
                        key={idx}
                        className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Staff */}
              {service.staff && service.staff.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">
                    Available with Our Expert Therapists
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {service.staff.map((member: any) => (
                      <Link
                        key={member.id}
                        href={`/staff/${member.slug}`}
                        className="flex items-center gap-4 rounded-lg bg-white p-4 shadow transition-all hover:shadow-lg"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{member.name}</h4>
                          <p className="text-sm text-pink-600">{member.title}</p>
                          {member.rating && (
                            <div className="mt-1 flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={
                                      i < Math.floor(member.rating.average)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    }
                                  >
                                    ⭐
                                  </span>
                                ))}
                              </div>
                              <span className="text-xs text-gray-600">
                                {member.rating.average} ({member.rating.count} reviews)
                              </span>
                            </div>
                          )}
                        </div>
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                href="/#booking"
                className="block w-full transform rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-pink-600 hover:to-purple-600"
              >
                Book This Service Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {allServices.filter((s) => s.id !== service.id).length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-3xl font-bold text-gray-800">You Might Also Like</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {allServices
                .filter((s) => s.id !== service.id)
                .slice(0, 3)
                .map((relatedService) => (
                  <Link
                    key={relatedService.id}
                    href={`/services/${relatedService.slug}`}
                    className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-2xl"
                  >
                    <img
                      src={relatedService.image}
                      alt={relatedService.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-bold">{relatedService.name}</h3>
                      <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                        {relatedService.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{relatedService.duration} min</span>
                        <span className="font-semibold text-pink-600">Learn More →</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="mb-4 text-2xl font-bold">Da Nang Luxury Spa</h3>
          <p className="mb-6 text-gray-400">🌺 Your Wellness Sanctuary</p>
          <p className="text-sm text-gray-500">
            © 2025 Da Nang Luxury Spa. Powered by <span className="text-pink-400">Gudbro</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
