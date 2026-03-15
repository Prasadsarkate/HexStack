import { PortfolioPreview } from "@/components/portfolio/PortfolioPreview";

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 text-center bg-accent/20">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Our <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A selection of high-impact digital products and experiences we've crafted for ambitious brands globally.
          </p>
        </div>
      </section>
      
      <PortfolioPreview />
      
      <section className="py-24 bg-background border-t border-border/40">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Want to see more industry-specific examples?</h2>
            <p className="text-muted-foreground mb-8">Reach out to our sales team and we'll prepare a custom deck tailored to your vertical.</p>
        </div>
      </section>
    </div>
  );
}
