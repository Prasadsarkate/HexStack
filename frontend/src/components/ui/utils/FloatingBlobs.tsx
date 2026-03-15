"use client";

import { motion } from "framer-motion";

export function FloatingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] select-none gpu-accelerate">
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/18 rounded-full blur-[60px] will-change-transform"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 70, 0],
          scale: [1, 1.05, 1],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-indigo-600/18 rounded-full blur-[70px] will-change-transform"
      />
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-500/08 rounded-full blur-[50px] will-change-transform"
      />
    </div>
  );
}
