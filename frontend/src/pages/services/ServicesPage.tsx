import { ServicesOverview } from "@/components/services/ServicesOverview";
import { FinalCTA } from "@/components/cta/FinalCTA";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-10 text-center bg-accent/20">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive suite of digital solutions designed to accelerate growth, optimize operations, and elevate your brand.
          </p>
        </div>
      </section>
      
      <ServicesOverview />
      
      <section className="py-24 border-t border-border/40 bg-background/50">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold mb-8">Our Process</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative before:absolute before:top-1/2 before:left-0 before:w-full before:h-0.5 before:bg-border/50 before:-translate-y-1/2 hidden md:block">
              {/* Process line for desktop */}
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
             {[
               { step: "01", title: "Discovery", desc: "Understanding your goals and target audience." },
               { step: "02", title: "Strategy", desc: "Crafting a tailored roadmap and architecture." },
               { step: "03", title: "Execution", desc: "Agile development and iterative design." },
               { step: "04", title: "Launch", desc: "Deployment, monitoring, and scaling." }
             ].map((p, i) => (
               <div key={i} className="bg-background border border-border/50 p-6 rounded-2xl relative shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-background">
                    {p.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2 mt-4">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>
      
      <FinalCTA />
    </div>
  );
}
