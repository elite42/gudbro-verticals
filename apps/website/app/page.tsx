import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/marketing/HeroSection';
import { ROIStatsSection } from '@/components/marketing/ROIStatsSection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { AICoManagerSection } from '@/components/marketing/AICoManagerSection';
import { FiveDimensionsSection } from '@/components/marketing/FiveDimensionsSection';
import { FoodCostsSection } from '@/components/marketing/FoodCostsSection';
import { DatabaseSection } from '@/components/marketing/DatabaseSection';
import { VerticalsSection } from '@/components/marketing/VerticalsSection';
import { EventsPromotionsSection } from '@/components/marketing/EventsPromotionsSection';
import { AnalyticsSection } from '@/components/marketing/AnalyticsSection';
import { KitchenDisplaySection } from '@/components/marketing/KitchenDisplaySection';
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

        {/* AI Co-Manager Section - 13 AI Services */}
        <AICoManagerSection />

        {/* 5 Dimensions of Food Intelligence */}
        <FiveDimensionsSection />

        {/* Food Costs & Margins Section */}
        <FoodCostsSection />

        {/* Database Section */}
        <DatabaseSection />

        {/* Verticals Section */}
        <VerticalsSection />

        {/* Events & Promotions Section - 29 Event Types, 16 Promo Mechanics */}
        <EventsPromotionsSection />

        {/* Analytics Dashboard Section */}
        <AnalyticsSection />

        {/* Kitchen Display System Section */}
        <KitchenDisplaySection />

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
