import { CaseStudiesPreview } from "@/components/casestudies/CaseStudiesPreview";
import { FinalCTA } from "@/components/cta/FinalCTA";

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 text-center bg-background border-b border-border/40">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Deep Dive <span className="text-secondary">Case Studies</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore the challenge, our approach, and the ultimate business impact of our most successful partnerships.
          </p>
        </div>
      </section>

      <CaseStudiesPreview />
      <FinalCTA />
    </div>
  );
}
