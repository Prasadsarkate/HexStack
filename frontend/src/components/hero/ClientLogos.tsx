"use client";

import { motion } from "framer-motion";

const logos = [
  "Acme Corp", "TechFlow", "Global V", "Stack Sync", "CloudNet", "DataSphere"
];

export function ClientLogos() {
  const allLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-16 border-y border-border/40 bg-background/30 backdrop-blur-sm relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-muted-foreground/60 mb-12 uppercase">
          TRUSTED BY INNOVATIVE STARTUPS AND ENTERPRISES GLOBALLY
        </p>
        
        <div className="relative w-full overflow-hidden">
           {/* Fade overlay gradients */}
           <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
           <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div 
              className="flex gap-16 md:gap-24 items-center whitespace-nowrap will-change-transform"
              animate={{ x: [0, "-50%"] }}
              transition={{
                ease: "linear",
                duration: 40,
                repeat: Infinity,
              }}
            >
             {allLogos.map((logo, index) => (
               <div
                 key={`${logo}-${index}`}
                 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground/30 hover:text-primary transition-colors cursor-default select-none"
               >
                 {logo}
               </div>
             ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
}
