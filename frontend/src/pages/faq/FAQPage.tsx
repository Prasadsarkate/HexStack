import { FinalCTA } from "@/components/cta/FinalCTA";

export default function FAQPage() {
  const faqs = [
    { q: "What is your typical project timeline?", a: "Most projects take between 4 to 12 weeks, depending on complexity. A simple marketing site might take 4 weeks, while a custom SaaS platform can take 3-4 months." },
    { q: "Do you offer post-launch support?", a: "Yes, all our engagements come with a 30-day warranty period, after which we offer various maintenance and retainer packages to keep your software running smoothly." },
    { q: "What technologies do you specialize in?", a: "Our core stack is React, Next.js, TypeScript, Node.js, and Python. We use modern cloud infrastructure like Vercel, AWS, and Supabase." },
    { q: "Do you work with startups in the seed stage?", a: "Absolutely. We love partnering with early-stage founders to build robust MVPs that attract investors and early adopters." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
       <section className="pt-32 pb-20 text-center bg-accent/20 border-b border-border/40">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Frequently Asked <span className="text-secondary">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about working with HexStack.
          </p>
        </div>
      </section>

      <section className="py-24">
         <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-3xl space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-background border border-border/50 rounded-2xl p-6 md:p-8">
                 <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                 <p className="text-muted-foreground text-lg leading-relaxed">{faq.a}</p>
              </div>
            ))}
         </div>
      </section>

      <FinalCTA />
    </div>
  );
}
