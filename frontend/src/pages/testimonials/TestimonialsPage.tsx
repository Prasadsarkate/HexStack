"use client";

import { motion } from "framer-motion";
import { Star, Quote, Play, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/forms/Button";
import Link from "next/link";

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "TechNexus Solutions",
    role: "CEO & Founder",
    content: "HexStack transformed our legacy systems into a high-octane SaaS platform. Their process is transparent, their engineering is top-tier, and the results speak for themselves. We saw a 40% increase in user retention within 3 months.",
    rating: 5,
    tag: "Web Development"
  },
  {
    name: "Sarah Chen",
    company: "Lumina Design",
    role: "Creative Director",
    content: "The UI/UX expertise at HexStack is world-class. They didn't just design a website; they designed an experience that our users love. Highly recommended for any brand that wants to stand out.",
    rating: 5,
    tag: "UI/UX Design"
  },
  {
    name: "Vikram Singh",
    company: "EduGrowth AI",
    role: "CTO",
    content: "Implementing AI into our workflow seemed daunting until we met HexStack. Their custom LLM integration saved us thousands of hours in manual data processing. They are true partners in innovation.",
    rating: 5,
    tag: "AI & Automation"
  },
  {
    name: "Priya Sharma",
    company: "SwiftLogistics",
    role: "Operations Head",
    content: "The custom software suite HexStack built for us is the backbone of our business now. Secure, scalable, and intuitive. Their post-launch support is also incredibly proactive.",
    rating: 5,
    tag: "Custom Software"
  },
  {
    name: "David Miller",
    company: "Global Metrics",
    role: "Marketing Director",
    content: "Our search visibility tripled after HexStack's SEO audit and programmatic rollout. They understand the technical side of search better than any agency we've worked with.",
    rating: 5,
    tag: "SEO Optimization"
  },
  {
    name: "Ananya Iyer",
    company: "HealthCore AI",
    role: "Founder",
    content: "Their 'Process-First' approach removed all the ambiguity from our project. Precise timelines, clear communication, and a final product that exceeded our expectations.",
    rating: 5,
    tag: "Process"
  }
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <section className="relative mb-24">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-[800px] h-[300px] bg-secondary/10 blur-[100px] rounded-full -z-10" />
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Success Stories</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the visionary leaders who have scaled their businesses with HexStack.
          </p>
        </div>
      </section>

      {/* Featured Video Section (Placeholder) */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 mb-32">
        <div className="aspect-video lg:aspect-[21/9] rounded-[3rem] glass border border-white/5 relative overflow-hidden flex items-center justify-center group cursor-pointer">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-40 group-hover:opacity-60 transition-opacity" />
           <div className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-full bg-white text-primary flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                 <Play className="w-8 h-8 fill-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Watch Case Study</h3>
              <p className="text-muted-foreground">How we helped Lumina Design achieve 3x growth.</p>
           </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2.5rem] glass border border-white/5 flex flex-col hover:border-primary/30 transition-all hover:bg-accent/5"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <p className="text-lg leading-relaxed mb-8 flex-1 italic text-foreground/90">
                "{t.content}"
              </p>
              <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                   <User className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                   <h4 className="font-bold">{t.name}</h4>
                   <p className="text-sm text-muted-foreground">{t.role} @ {t.company}</p>
                </div>
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-widest text-primary/50 font-bold">{t.tag}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-32 w-full max-w-[1400px] mx-auto px-4 md:px-6 text-center">
         <div className="p-16 rounded-[3rem] bg-accent/10 border border-white/5 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to be our next success story?</h2>
            <p className="text-muted-foreground mb-10">Join 50+ businesses that have unlocked their digital potential with us.</p>
            <div className="flex flex-wrap justify-center gap-4">
               <Button size="lg" className="bg-gradient-brand border-0 glow-primary" asChild>
                  <Link href="/quote">Start Your Project</Link>
               </Button>
               <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">View Portfolio <ExternalLink className="ml-2 w-4 h-4" /></Link>
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
