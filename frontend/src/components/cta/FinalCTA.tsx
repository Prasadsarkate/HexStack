"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/forms/Button";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-accent/40 border border-border/50 rounded-3xl p-8 md:p-16 backdrop-blur-3xl overflow-hidden relative shadow-2xl">
          {/* Inner Glow */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/30 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Ready to transform <br className="hidden lg:block"/> your digital presence?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Let's discuss how HexStack can help you achieve your business goals with cutting-edge technology and design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-brand text-white border-0" asChild>
                  <Link href="/contact">
                    Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">
                    Learn about us
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-background/80 rounded-2xl p-8 border border-border/50 shadow-xl"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-xl mb-6 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Subscribe to our Newsletter</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Get monthly insights on tech, design, and scaling startups delivered straight to your inbox.
              </p>
              <form className="space-y-4" action="https://formsubmit.co/hexstack1@gmail.com" method="POST">
                <input type="hidden" name="_subject" value="New Newsletter Subscription" />
                <input type="hidden" name="_captcha" value="false" />
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    required
                    className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  We respect your privacy. No spam ever.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
