import { HeroSection } from "@/components/hero/HeroSection";
import { ClientLogos } from "@/components/hero/ClientLogos";
import { ServicesOverview } from "@/components/services/ServicesOverview";
import { PortfolioPreview } from "@/components/portfolio/PortfolioPreview";
import { WhyChooseUs } from "@/components/services/WhyChooseUs";
import { CaseStudiesPreview } from "@/components/casestudies/CaseStudiesPreview";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { PricingPreview } from "@/components/pricing/PricingPreview";
import { FinalCTA } from "@/components/cta/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <ServicesOverview />
      <PortfolioPreview />
      <WhyChooseUs />
      <CaseStudiesPreview />
      <Testimonials />
      <PricingPreview />
      <FinalCTA />
    </>
  );
}
