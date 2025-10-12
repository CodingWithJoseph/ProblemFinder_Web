"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

type ScrollSceneProps = {
  children: ReactNode;
};

export function ScrollScene({ children }: ScrollSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const translateY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <motion.div style={{ translateY, opacity }} className="mx-auto max-w-5xl px-6">
        {children}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/5 to-transparent" aria-hidden />
    </section>
  );
}
