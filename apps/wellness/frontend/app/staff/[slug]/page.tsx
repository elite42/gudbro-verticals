'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function StaffDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [staffMember, setStaffMember] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3013/api/wellness';
  const hubId = '660e8400-e29b-41d4-a716-446655440000';

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all staff
        const staffRes = await fetch(`${apiUrl}/${hubId}/staff`);
        const staffData = await staffRes.json();
        const allStaff = staffData.data?.staff || [];
        const member = allStaff.find((s: any) => s.slug === slug);
        setStaffMember(member);

        // Fetch services for this staff member
        if (member) {
          const servicesRes = await fetch(`${apiUrl}/${hubId}/services?staffId=${member.id}`);
          const servicesData = await servicesRes.json();
          setServices(servicesData.data?.services || []);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching staff details:', error);
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
          <p className="mt-4 text-gray-600">Loading therapist profile...</p>
        </div>
      </div>
    );
  }

  if (!staffMember) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Therapist Not Found</h1>
          <Link href="/staff" className="text-pink-600 hover:text-pink-700">
            ← Back to Our Team
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
            <Link href="/staff" className="hover:text-pink-600">
              Our Team
            </Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-pink-600">{staffMember.name}</span>
          </div>
        </div>
      </div>

      {/* Staff Profile */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Profile Image */}
            <div>
              <img
                src={staffMember.image}
                alt={staffMember.name}
                className="h-[500px] w-full rounded-2xl object-cover shadow-lg"
              />
            </div>

            {/* Profile Details */}
            <div>
              {staffMember.isFeatured && (
                <span className="mb-4 inline-block rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                  ⭐ Featured Therapist
                </span>
              )}

              <h1 className="mb-2 text-4xl font-bold text-gray-800">{staffMember.name}</h1>
              <p className="mb-6 text-xl font-semibold text-pink-600">{staffMember.title}</p>

              {staffMember.rating && (
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(staffMember.rating.average)
                            ? 'text-2xl text-yellow-400'
                            : 'text-2xl text-gray-300'
                        }
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-lg text-gray-600">
                    {staffMember.rating.average} ({staffMember.rating.count} reviews)
                  </span>
                </div>
              )}

              <p className="mb-6 text-lg text-gray-600">{staffMember.bio}</p>

              {/* Specialties */}
              {staffMember.specialties && staffMember.specialties.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {staffMember.specialties.map((specialty: string, idx: number) => (
                      <span
                        key={idx}
                        className="rounded-full bg-pink-100 px-4 py-2 font-semibold text-pink-700"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {staffMember.languages && staffMember.languages.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {staffMember.languages.map((language: string, idx: number) => (
                      <span key={idx} className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Locations */}
              {staffMember.locations && staffMember.locations.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-800">Available At</h3>
                  <div className="rounded-lg bg-white p-4 shadow">
                    {staffMember.locations.map((locationId: string, idx: number) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <svg
                          className="mr-2 h-5 w-5 text-pink-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {locationId === 'loc-city' ? 'City Center Spa' : 'My Khe Beach Spa'}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Premium Pricing Badge */}
              {staffMember.premiumPricing && (
                <div className="mb-6 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 p-4">
                  <div className="flex items-center">
                    <svg
                      className="mr-2 h-6 w-6 text-pink-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Premium Therapist</p>
                      <p className="text-sm text-gray-600">
                        +{staffMember.premiumPercentage}% service fee
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                href="/#booking"
                className="block w-full transform rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-pink-600 hover:to-purple-600"
              >
                Book with {staffMember.name.split(' ')[0]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      {services.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-3xl font-bold text-gray-800">
              Services Offered by {staffMember.name.split(' ')[0]}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service: any) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg transition-all hover:shadow-2xl"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase text-pink-600">
                        {service.category}
                      </span>
                      <span className="text-xs text-gray-500">{service.duration} min</span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-800">{service.name}</h3>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">{service.description}</p>

                    {service.pricing && Object.keys(service.pricing).length > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">From:</span>
                        <span className="text-lg font-bold text-pink-600">
                          {(
                            Object.values(service.pricing)[0] as { base?: number }
                          )?.base?.toLocaleString()}{' '}
                          VND
                        </span>
                      </div>
                    )}
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
