"use client";

import { motion } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  gradientWords?: string[];
}

export function WordReveal({ text, className = "", delay = 0, gradientWords = [] }: WordRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => {
        const isGradient = gradientWords.some(gw => 
          word.toLowerCase().replace(/[.,!?;:]/g, "") === gw.toLowerCase().replace(/[.,!?;:]/g, "")
        );
        
        return (
          <motion.span
            variants={child}
            style={{ marginRight: "0.25em", willChange: "transform, opacity" }}
            key={index}
            className={isGradient ? "text-transparent bg-clip-text bg-gradient-brand-vibrant animate-gradient-slow drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" : ""}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
