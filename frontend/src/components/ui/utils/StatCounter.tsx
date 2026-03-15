"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function StatCounter({ value, suffix = "", duration = 2 }: StatCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: duration,
      ease: "easeOut",
    });

    return controls.stop;
  }, [count, value, duration]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [rounded]);

  return (
    <motion.span>
      {displayValue}
      {suffix}
    </motion.span>
  );
}
