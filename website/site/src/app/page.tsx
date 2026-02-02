import {
  Hero,
  StatsBar,
  VerticalCards,
  HowItWorks,
  PartnershipNetwork,
  Testimonials,
  PricingPreview,
  CTASection,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      {/* 7.1 Hero Section */}
      <Hero />

      {/* 7.2 Stats Bar */}
      <StatsBar />

      {/* 7.3 Vertical Cards */}
      <VerticalCards />

      {/* 7.4 How It Works */}
      <HowItWorks />

      {/* 7.5 Partnership Network Section */}
      <PartnershipNetwork />

      {/* 7.6 Testimonials */}
      <Testimonials />

      {/* 7.7 Pricing Preview */}
      <PricingPreview />

      {/* 7.9 Final CTA */}
      <CTASection />
    </>
  );
}
