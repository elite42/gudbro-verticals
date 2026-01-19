'use client';

import { BottomNavLocal } from '@/components/BottomNavLocal';
import { coffeeshopConfig } from '@/config/coffeeshop.config';

const values = [
  {
    icon: '🌱',
    title: 'Plant-Based Excellence',
    description:
      'Every dish is crafted from 100% plant-based ingredients, proving that sustainable eating can be delicious.',
  },
  {
    icon: '🌍',
    title: 'Local & Sustainable',
    description:
      'We source ingredients from local farms, supporting our community while reducing our environmental footprint.',
  },
  {
    icon: '❤️',
    title: 'Health First',
    description:
      'Clean food without compromise. No artificial additives, just whole foods that nourish your body.',
  },
  {
    icon: '🤝',
    title: 'Community Focused',
    description:
      'More than a cafe, we are a gathering place for people who care about what they eat and how it impacts the world.',
  },
];

const teamMembers = [
  {
    name: 'Chef Maria',
    role: 'Head Chef & Co-Founder',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop',
    bio: 'With 15 years of culinary experience, Maria brings creativity and passion to every dish.',
  },
  {
    name: 'David Nguyen',
    role: 'Co-Founder & Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    bio: 'Davids vision for sustainable dining drives our mission forward every day.',
  },
  {
    name: 'Lisa Chen',
    role: 'Pastry Chef',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=300&fit=crop',
    bio: 'Lisa creates desserts that prove plant-based can be indulgent and satisfying.',
  },
];

export function AboutClient() {
  const { business } = coffeeshopConfig;

  return (
    <div className="bg-theme-bg-secondary min-h-screen pb-28 lg:pb-8">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=600&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">Our Story</h1>
          <p className="max-w-2xl text-lg text-white/90 md:text-xl">
            Clean food opportunity for everyone
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-screen-xl px-4 py-12 lg:px-8 lg:py-20">
        {/* Introduction */}
        <section className="mb-16 lg:mb-24">
          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-theme-text-primary mb-6 text-3xl font-bold lg:text-4xl">
                Welcome to {business.name}
              </h2>
              <p className="text-theme-text-secondary mb-4">
                Founded in 2020 in the heart of Đà Nẵng, ROOTS was born from a simple belief:
                everyone deserves access to clean, delicious, plant-based food that nourishes both
                body and soul.
              </p>
              <p className="text-theme-text-secondary mb-4">
                What started as a small smoothie bar has grown into a beloved cafe where locals and
                travelers alike come to experience the vibrant flavors of Vietnamese-inspired
                plant-based cuisine.
              </p>
              <p className="text-theme-text-secondary">
                Every dish we serve tells a story of our commitment to health, sustainability, and
                the incredible potential of plant-based cooking.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl md:h-80 lg:h-96">
              <img
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop"
                alt="Our cafe interior"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16 lg:mb-24">
          <h2 className="text-theme-text-primary mb-12 text-center text-3xl font-bold lg:text-4xl">
            Our Values
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-theme-bg-elevated rounded-xl p-6 text-center transition-shadow hover:shadow-lg"
              >
                <span className="mb-4 block text-4xl">{value.icon}</span>
                <h3 className="text-theme-text-primary mb-2 text-lg font-bold">{value.title}</h3>
                <p className="text-theme-text-secondary text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16 lg:mb-24">
          <h2 className="text-theme-text-primary mb-12 text-center text-3xl font-bold lg:text-4xl">
            Meet Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-theme-bg-elevated overflow-hidden rounded-xl transition-shadow hover:shadow-lg"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-theme-text-primary text-lg font-bold">{member.name}</h3>
                  <p className="text-theme-brand-primary mb-3 text-sm">{member.role}</p>
                  <p className="text-theme-text-secondary text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-theme-brand-primary rounded-2xl p-8 text-center lg:p-12">
          <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">
            Ready to Experience ROOTS?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-white/90">
            Visit us today and discover why our community loves our plant-based creations.
          </p>
          <a
            href="/menu"
            className="text-theme-brand-primary hover:bg-theme-bg-secondary inline-block rounded-full bg-white px-8 py-3 font-bold transition-colors"
          >
            View Our Menu
          </a>
        </section>
      </div>

      {/* Bottom Navigation - Mobile only */}
      <BottomNavLocal />
    </div>
  );
}
