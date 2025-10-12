"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-glow" aria-hidden />
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center gap-8 px-6 py-24 text-left">
        <motion.span
          className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Build fast. Build often.
        </motion.span>
        <motion.h1
          className="text-4xl font-semibold leading-tight text-white md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Rapid experimentation for teams that thrive on momentum.
        </motion.h1>
        <motion.p
          className="max-w-2xl text-base text-white/70 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          ProblemFinder provides the tools and rituals to ship bold ideas faster than ever. We celebrate the
          builders who question limits and create clarity through action.
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/join"
            className="rounded-full bg-pf-sky px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-pf-night shadow-lg shadow-pf-sky/30 transition hover:shadow-pf-sky/50"
          >
            Join the beta
          </Link>
          <Link href="/about" className="text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white">
            Learn more
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
