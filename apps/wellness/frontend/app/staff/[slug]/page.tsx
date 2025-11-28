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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading therapist profile...</p>
        </div>
      </div>
    );
  }

  if (!staffMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Therapist Not Found</h1>
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
            <Link href="/" className="text-2xl font-bold text-pink-600">Da Nang Luxury Spa</Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-pink-600">Home</Link>
              <Link href="/services" className="text-gray-600 hover:text-pink-600">Services</Link>
              <Link href="/staff" className="text-gray-600 hover:text-pink-600">Our Team</Link>
              <Link href="/#booking" className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">Book Now</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/staff" className="hover:text-pink-600">Our Team</Link>
            <span className="mx-2">/</span>
            <span className="text-pink-600 font-semibold">{staffMember.name}</span>
          </div>
        </div>
      </div>

      {/* Staff Profile */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Profile Image */}
            <div>
              <img
                src={staffMember.image}
                alt={staffMember.name}
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Profile Details */}
            <div>
              {staffMember.isFeatured && (
                <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  ⭐ Featured Therapist
                </span>
              )}

              <h1 className="text-4xl font-bold mb-2 text-gray-800">{staffMember.name}</h1>
              <p className="text-xl text-pink-600 font-semibold mb-6">{staffMember.title}</p>

              {staffMember.rating && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(staffMember.rating.average) ? 'text-yellow-400 text-2xl' : 'text-gray-300 text-2xl'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-lg text-gray-600">
                    {staffMember.rating.average} ({staffMember.rating.count} reviews)
                  </span>
                </div>
              )}

              <p className="text-gray-600 text-lg mb-6">{staffMember.bio}</p>

              {/* Specialties */}
              {staffMember.specialties && staffMember.specialties.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {staffMember.specialties.map((specialty: string, idx: number) => (
                      <span key={idx} className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-semibold">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {staffMember.languages && staffMember.languages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {staffMember.languages.map((language: string, idx: number) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Locations */}
              {staffMember.locations && staffMember.locations.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Available At</h3>
                  <div className="bg-white rounded-lg p-4 shadow">
                    {staffMember.locations.map((locationId: string, idx: number) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {locationId === 'loc-city' ? 'City Center Spa' : 'My Khe Beach Spa'}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Premium Pricing Badge */}
              {staffMember.premiumPricing && (
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-pink-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-800">Premium Therapist</p>
                      <p className="text-sm text-gray-600">+{staffMember.premiumPercentage}% service fee</p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                href="/#booking"
                className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-lg font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Book with {staffMember.name.split(' ')[0]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      {services.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Services Offered by {staffMember.name.split(' ')[0]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: any) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                >
                  <img src={service.image} alt={service.name} className="w-full h-40 object-cover" />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-pink-600 uppercase">{service.category}</span>
                      <span className="text-xs text-gray-500">{service.duration} min</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>

                    {service.pricing && Object.keys(service.pricing).length > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">From:</span>
                        <span className="text-lg font-bold text-pink-600">
                          {Object.values(service.pricing)[0]?.base?.toLocaleString()} VND
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Da Nang Luxury Spa</h3>
          <p className="text-gray-400 mb-6">🌺 Your Wellness Sanctuary</p>
          <p className="text-sm text-gray-500">
            © 2025 Da Nang Luxury Spa. Powered by <span className="text-pink-400">Gudbro</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
