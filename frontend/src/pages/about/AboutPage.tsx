"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/forms/Button";
import Link from "next/link";
import { ArrowRight, Code, Users, Target, Zap } from "lucide-react";
import { StatCounter } from "@/components/ui/utils/StatCounter";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden text-center">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              We are the architects of the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">digital frontier.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              HexStack was founded on a simple premise: technology should empower your business, not constrain it. We combine Silicon Valley engineering standards with stunning design to help you stand out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats/Values Section */}
      <section className="py-24 border-y border-border/40 bg-background/30 backdrop-blur-sm">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: Code, title: 100, suffix: "+", desc: "Projects Delivered" },
               { icon: Users, title: 50, suffix: "+", desc: "Global Clients" },
               { icon: Target, title: 10, suffix: "+", desc: "Industry Awards" },
               { icon: Zap, title: 99, suffix: "%", desc: "Client Retention" },
             ].map((stat, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 viewport={{ once: true }}
                 whileHover={{ 
                    rotateX: 10, 
                    rotateY: 10,
                    z: 50,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                 }}
                 className="text-center p-8 border border-border/50 rounded-3xl bg-background/40 glass group transition-all duration-500 perspective-1000"
               >
                 <div className="w-14 h-14 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                    <stat.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                 </div>
                 <h3 className="text-5xl font-bold mb-2 tracking-tighter">
                   <StatCounter value={stat.title} suffix={stat.suffix} />
                 </h3>
                 <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">{stat.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-32">
         <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-8 tracking-tight">Our Story</h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Starting as a boutique design studio, HexStack rapidly evolved into a full-scale digital agency capable of building complex SaaS and robust enterprise applications.
                  </p>
                  <p>
                    We believe that the best products live at the intersection of beautiful design and flawless engineering. Our team operates globally, bringing diverse perspectives to solve your most complex challenges.
                  </p>
                </div>
                <Button className="mt-10 h-14 px-8 bg-gradient-brand text-white border-0 text-base shadow-lg shadow-primary/20" asChild>
                  <Link href="/careers">Join Our Team <ArrowRight className="ml-2 w-5 h-5"/></Link>
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-[500px] rounded-[2rem] overflow-hidden glass border border-border/50 bg-accent/20"
              >
                 <Image 
                   src="/images/about-team.png" 
                   alt="HexStack Modern Agency Workspace" 
                   fill 
                   className="object-cover transition-transform duration-700 hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                 <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-white text-sm font-medium italic opacity-80">
                      "Our headquarters—where creativity meets cutting-edge engineering."
                    </p>
                 </div>
              </motion.div>
            </div>
         </div>
      </section>
    </div>
  );
}
