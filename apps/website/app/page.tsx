import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/marketing/HeroSection';
import { ROIStatsSection } from '@/components/marketing/ROIStatsSection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { FiveDimensionsSection } from '@/components/marketing/FiveDimensionsSection';
import { DatabaseSection } from '@/components/marketing/DatabaseSection';
import { VerticalsSection } from '@/components/marketing/VerticalsSection';
import { FoodChallengesSection } from '@/components/marketing/FoodChallengesSection';
import { PricingSection } from '@/components/marketing/PricingSection';
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection';
import { CTASection } from '@/components/marketing/CTASection';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* ROI Stats - Proven Results */}
        <ROIStatsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* 5 Dimensions of Food Intelligence */}
        <FiveDimensionsSection />

        {/* Database Section */}
        <DatabaseSection />

        {/* Verticals Section */}
        <VerticalsSection />

        {/* Food Challenges Section - PRO Feature */}
        <FoodChallengesSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
