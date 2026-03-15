"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/forms/Button";
import Link from "next/link";
import { ArrowRight, Code } from "lucide-react";
import { WordReveal } from "@/components/ui/utils/WordReveal";
import { Magnetic } from "@/components/ui/utils/Magnetic";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-3 py-1 text-sm font-medium text-muted-foreground mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
          Modern Digital Agency for Tech Startups
        </motion.div>
        
        <WordReveal 
          text="We build digital experiences that scale." 
          className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6 leading-tight max-w-5xl mx-auto text-glow-vibrant"
          gradientWords={["digital", "experiences", "scale."]}
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground mb-10"
        >
          HexStack transforms ambitious ideas into world-class software, highly
          converting websites, and stellar brand experiences.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Magnetic>
            <Button size="lg" className="w-full sm:w-auto bg-gradient-brand border-0 h-14 px-8 text-base shadow-lg shadow-primary/20 glow-primary hover:scale-105 transition-all" asChild>
              <Link href="/contact">
                Start Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base hover:glow-secondary transition-all" asChild>
              <Link href="/portfolio">
                <Code className="ml-2 h-4 w-4 mr-2" /> View Work
              </Link>
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
