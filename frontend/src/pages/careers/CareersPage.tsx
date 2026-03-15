import { FinalCTA } from "@/components/cta/FinalCTA";
import { Button } from "@/components/ui/forms/Button";

export default function CareersPage() {
  const jobs = [
    { title: "Senior Frontend Engineer (React/Next.js)", type: "Full-Time", location: "Remote (Global)" },
    { title: "Product Designer (UI/UX)", type: "Full-Time", location: "Remote (AMER/EMEA)" },
    { title: "Backend Engineer (Node.js)", type: "Contract", location: "Remote" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 text-center bg-background border-b border-border/40">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Build the <span className="text-primary">Future</span> With Us
          </h1>
          <p className="text-xl text-muted-foreground">
            We are always looking for exceptional talent to join our distributed team of engineers, designers, and strategists.
          </p>
        </div>
      </section>

      <section className="py-24 bg-accent/10">
         <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Open Positions</h2>
            <div className="space-y-6">
               {jobs.map((job, i) => (
                 <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-background rounded-2xl border border-border/50 shadow-sm hover:border-primary/50 transition-colors">
                    <div className="mb-4 sm:mb-0">
                       <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                       <div className="flex gap-4 text-sm text-muted-foreground font-medium">
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                       </div>
                    </div>
                    <Button>Apply Now</Button>
                 </div>
               ))}
               
               <div className="mt-12 text-center p-8 border border-border/30 rounded-2xl border-dashed">
                  <h3 className="text-xl font-semibold mb-2">Don't see a fit?</h3>
                  <p className="text-muted-foreground mb-6">Send your resume to careers@hexstack.dev and we'll keep you in mind for future openings.</p>
               </div>
            </div>
         </div>
      </section>

      <FinalCTA />
    </div>
  );
}
