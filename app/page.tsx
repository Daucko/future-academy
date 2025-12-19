import { Header } from '@/components/landing-page/header';
import { HeroSection } from '@/components/landing-page/hero-section';
import { StatsSection } from '@/components/landing-page/stats-section';
import { JourneyTimeline } from '@/components/landing-page/journey-timeline';
import { FeaturesSection } from '@/components/landing-page/features-section';
import { CTASection } from '@/components/landing-page/cta-section';
import { Footer } from '@/components/landing-page/footer';
import { FloatingChatButton } from '@/components/landing-page/floating-chat-button';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <JourneyTimeline />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingChatButton />
    </div>
  );
}
