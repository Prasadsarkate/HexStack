"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  {
    title: "Agile & Fast Delivery",
    description: "We use modern agile methodologies to launch your product faster without compromising quality.",
  },
  {
    title: "Startups to Enterprise",
    description: "Whether you're raising a seed round or a Fortune 500 company, we know how to scale with you.",
  },
  {
    title: "Top 1% Engineering Talent",
    description: "Our dedicated developers and designers are rigorously vetted to ensure project success.",
  },
  {
    title: "Transparent Communication",
    description: "Daily updates, Jira tracking, and direct Slack access to your development squad.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 overflow-hidden relative">
      {/* Abstract Background Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-[1400px] px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Why partner with <br />
              <span className="text-primary">HexStack?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We aren't just another dev shop. We act as your technical co-founder and design partner, deeply invested in the long-term success of your product.
            </p>
            
            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Element Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-[500px] lg:h-[600px] w-full rounded-2xl border border-border/50 bg-accent/20 overflow-hidden flex items-center justify-center p-8 backdrop-blur-3xl shadow-2xl"
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT/.2),transparent_70%)]" />
             
             {/* Mock Dashboard UI snippets stacked */}
             <div className="relative w-full h-[80%] bg-background/80 rounded-xl border border-border shadow-2xl p-6 glass -rotate-3 hover:rotate-0 transition-transform duration-500">
               <div className="w-32 h-6 bg-accent rounded mb-6" />
               <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="flex gap-4 items-center">
                     <div className="w-10 h-10 rounded-full bg-accent animate-pulse" />
                     <div className="flex-1 space-y-2">
                       <div className="h-2 w-full bg-accent rounded" />
                       <div className="h-2 w-2/3 bg-accent/50 rounded" />
                     </div>
                   </div>
                 ))}
               </div>
             </div>
             
             <div className="absolute -bottom-10 -right-10 w-2/3 h-1/2 bg-background/90 rounded-xl border border-border shadow-2xl p-6 glass rotate-6 hover:rotate-0 transition-transform duration-500 delay-100">
                <div className="w-24 h-6 bg-primary/20 rounded mb-4" />
                <div className="h-32 w-full rounded bg-gradient-to-tr from-primary/20 to-secondary/20" />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
