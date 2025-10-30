"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <motion.section className="flex h-screen flex-col bg-[var(--color-gray-50)] overflow-hidden ">
      {/* Top Half */}
      <motion.div className="flex-1 flex items-end justify-center pb-20">
        <motion.div className="max-w-4xl px-6 lg:px-12">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block rounded-full bg-black/5 px-4 py-2 text-sm tracking-wide text-black/70 mb-3 shadow-xs">
            AI-POWERED PROBLEM DISCOVERY
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-medium leading-tight tracking-tight text-black"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.02em",
            }}>
            Discover what the <span className='text-transparent bg-clip-text' style={{backgroundImage: "var(--gradient-earth)"}}>world</span> truly needs.
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* Bottom Half */}
      <motion.div className="flex-1 flex items-start justify-center">
        <motion.div className="flex w-4/5 max-w-3xl h-1/4 items-end rounded-lg bg-[var(--color-off-white)] px-4 py-4 shadow-sm">
          <motion.textarea
            placeholder="What challenge do you wish technology could fix?"
            className="w-full h-full bg-transparent border-none pr-4 outline-none align-top mr-2 resize-none leading-snug"
          />
          <Link href="/demo">
            <motion.button className="flex h-8 w-12 items-center justify-center rounded-full bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-blue-700)] transition-colors">
              <ArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
