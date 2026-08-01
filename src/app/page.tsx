import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { HeroSection } from "@/features/business/components/hero-section";
import { LocationSection } from "@/features/business/components/location-section";
import { ServicesSection } from "@/features/business/components/services-section";
import { CtaSection } from "@/features/business/components/cta-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16 pb-24 md:pb-0">
        <HeroSection />
        <LocationSection />
        <ServicesSection />
        <CtaSection />
      </main>
      <Footer />
      <FloatingActionButton />
    </>
  );
}
