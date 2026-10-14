"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-slate-900/5" aria-hidden="true">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#0f9b84] via-[#14a38b] to-[#2dd4bf]"
        style={{ scaleX }}
      />
    </div>
  );
}
