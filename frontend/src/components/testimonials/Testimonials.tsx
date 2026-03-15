"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/layout/Card";

const testimonials = [
  {
    content: "HexStack delivered our complex SaaS architecture months ahead of schedule. Their attention to UX and clean code is unparalleled.",
    author: "Sarah Jenkins",
    role: "CTO, CloudScale",
    avatar: "SJ"
  },
  {
    content: "The rebranding and new web platform they designed completely transformed our market positioning. Truly exceptional work.",
    author: "Marcus Doe",
    role: "Founder, Zenith Retail",
    avatar: "MD"
  },
  {
    content: "We hired HexStack to optimize our SEO and marketing funnels. The ROI has been phenomenal, and their communication is top-notch.",
    author: "Elena Rivera",
    role: "VP Marketing, NovaApp",
    avatar: "ER"
  },
  {
    content: "The custom CRM they built for our logistics company saved us nearly 40 hours of manual data entry a week. Worth every penny.",
    author: "David Chen",
    role: "Operations Manager, FastLogix",
    avatar: "DC"
  },
  {
    content: "HexStack's AI automation integration completely changed how we handle customer support. Our response times dropped from hours to seconds.",
    author: "Jessica Alba",
    role: "Head of Support, FinTech Plus",
    avatar: "JA"
  },
  {
    content: "I've worked with many outsourced agencies, but HexStack feels like an internal team. Their React & Next.js expertise is top-tier.",
    author: "Michael Ross",
    role: "Lead Engineer, Spectra",
    avatar: "MR"
  },
  {
    content: "From wireframes to the final polished iOS app, the HexStack UX team was incredibly patient and creative. Our user retention is up 35%.",
    author: "Priya Patel",
    role: "Product Owner, HealthSync",
    avatar: "PP"
  },
  {
    content: "We needed a headless e-commerce store built in under 6 weeks before Black Friday. HexStack delivered a blazing fast Shopify storefront perfectly on time.",
    author: "Tom Henderson",
    role: "E-Commerce Director, Vibe Clothing",
    avatar: "TH"
  },
  {
    content: "Our organic traffic has tripled since HexStack took over our SEO and technical web core vitals. They actually know what they are doing.",
    author: "Samantha Liu",
    role: "Growth Marketer, B2B SaaS",
    avatar: "SL"
  },
  {
    content: "Their code quality is meticulous. We had a rigid security audit for our medical app, and the infrastructure HexStack built passed with flying colors.",
    author: "Dr. Robert Foster",
    role: "Founder, MedConnect",
    avatar: "RF"
  },
  {
    content: "They took a chaotic legacy WordPress backend and seamlessly migrated our 10,000+ articles to a modern scalable CMS without dropping our search rankings.",
    author: "Anita Singh",
    role: "Editor-in-Chief, DailyTech",
    avatar: "AS"
  },
  {
    content: "Working with HexStack was the best technical decision we made this year. They built our AI MVP in just 4 weeks, helping us secure our seed round.",
    author: "James Cooper",
    role: "Co-Founder, AI Labs",
    avatar: "JC"
  },
  {
    content: "Beautiful designs and flawless execution. They don't just write code; they think deeply about the business logic and user journey.",
    author: "Emily Watson",
    role: "Director of Design, Elevate",
    avatar: "EW"
  },
  {
    content: "Their maintenance and hosting support has giving us complete peace of mind. We haven't had a single minute of downtime since launch.",
    author: "Kevin O'Brien",
    role: "CEO, TradePro",
    avatar: "KO"
  },
  {
    content: "HexStack mapped out an automation strategy that linked our CRM, emails, and billing directly into Stripe. It's a game-changer.",
    author: "Linda Gomez",
    role: "Finance Lead, RemoteWorks",
    avatar: "LG"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
       {/* Background */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

       <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
         </div>

         <div className="relative w-full overflow-hidden flex py-10">
           {/* Fade overlay gradients for edges */}
           <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
           <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
           
           <motion.div
             className="flex gap-8 px-4 will-change-transform"
             animate={{ x: [0, "-50%"] }}
             transition={{
               ease: "linear",
               duration: 80,
               repeat: Infinity,
             }}
           >
             {[...testimonials, ...testimonials].map((t, index) => (
               <Card key={`${t.author}-${index}`} className="w-[350px] md:w-[450px] shrink-0 bg-background/60 flex flex-col hover:bg-background/90 transition-colors border-border/50">
                 <CardHeader className="pb-4">
                    <Quote className="w-8 h-8 text-primary/40 mb-2" />
                 </CardHeader>
                 <CardContent className="flex-1 flex flex-col justify-between pt-0 space-y-6">
                    <p className="text-muted-foreground text-lg leading-relaxed italic">
                      "{t.content}"
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-border/50 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                        {t.avatar}
                      </div>
                      <div className="overflow-hidden">
                        <CardTitle className="text-base font-semibold truncate">{t.author}</CardTitle>
                        <CardDescription className="truncate">{t.role}</CardDescription>
                      </div>
                    </div>
                 </CardContent>
               </Card>
             ))}
           </motion.div>
         </div>
       </div>
    </section>
  );
}
