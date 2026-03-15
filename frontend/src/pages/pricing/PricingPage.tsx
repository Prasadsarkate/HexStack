import { PricingPreview } from "@/components/pricing/PricingPreview";
import { FinalCTA } from "@/components/cta/FinalCTA";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-10 text-center bg-accent/20">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Invest in digital infrastructure that pays dividends. We offer scalable engagement models for every stage of your business.
          </p>
        </div>
      </section>
      
      <PricingPreview />

       <section className="py-24 bg-background">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-4xl">
           <h2 className="text-3xl font-bold text-center mb-16">All engagements include:</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Dedicated Account Manager", 
                "Weekly Sprint Reviews", 
                "Full Source Code Ownership", 
                "Real-time Slack / Teams Channel",
                "Automated CI/CD Pipeline Setup",
                "Post-Launch Support & Warranty"
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 p-6 glass border border-border/50 rounded-2xl bg-accent/10">
                   <Check className="w-6 h-6 text-primary shrink-0" />
                   <span className="font-medium text-foreground">{feature}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
