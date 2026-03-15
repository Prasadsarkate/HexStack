"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    company: "ZenoHealth",
    metric: "+350%",
    metricLabel: "User Retention",
    title: "Redesigning a health-tech platform for millions of users.",
  },
  {
    company: "PayStream",
    metric: "$2.4M",
    metricLabel: "Series A Raised",
    title: "Building a highly secure MVP for a fintech challenger.",
  },
];

export function CaseStudiesPreview() {
  return (
    <section className="py-24 border-y border-border/40">
      <div className="w-full max-w-[1400px] px-4 md:px-6">
        <div className="text-center w-full max-w-[1400px] mx-auto px-4 md:px-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            Proven <span className="text-secondary">Impact</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. See how we've moved the needle for high-growth companies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/casestudies" className="group block h-full">
                <div className="h-full rounded-2xl border border-border/50 bg-background/50 p-8 lg:p-12 hover:border-secondary/50 transition-colors relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase">{study.company}</span>
                      <ArrowUpRight className="text-muted-foreground group-hover:text-secondary transition-colors" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-semibold mb-12 text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                      {study.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-end gap-4 border-t border-border/40 pt-6">
                    <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground/30 leading-none">
                      {study.metric}
                    </span>
                    <span className="text-sm md:text-base text-muted-foreground font-medium pb-2">
                      {study.metricLabel}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/casestudies" className="inline-flex items-center text-primary font-medium hover:underline underline-offset-4">
             Read all case studies <ArrowUpRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
