"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeProvider";
//
export function Hero() {
  const { isDark } = useTheme();
  return (
    <motion.section className={"flex flex-col h-screen w-full text-brand-off-white"}>
      <div className={"flex-4 flex w-max-48 border-1 border-brand-soft-charcoal items-center bg-amber-700"}>
        <div className={"flex-1 flex flex-col items-center bg-brand-blue-primary"}>
          <h1
            style={{ fontSize: "clamp(2rem, 4vw, 5rem)", }}>
            Discover What People Actually Need
          </h1>
          <h1>Search Validate Build Repeat</h1>
          <motion.div className="flex ">
            <motion.div className="flex">
              <motion.textarea
                placeholder="What challenge do you wish technology could fix?"
                className="bg-transparent border-none outline-none align-top resize-none leading-snug"
              />
              <Link href="/demo">
                <motion.button className="">
                  <ArrowRight />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className={"flex-1"}>Section 2</div>
        <div className={"absolute inset-x-0 bottom-0 h-1/3 bg-[var(--color-gradient-blue)]"} />
      </div>

      <div className={"flex-3 flex w-full items-center justify-center bg-brand-jet-black"}>
        <div className="flex flex-col items-center mb-16">
          <div className="max-w-5xl w-full text-start">
            <h2
              className="leading-tight tracking-tight text-transparent bg-clip-text drop-shadow-sm font-semibold"
              style={{
                fontSize: "clamp(2rem, 4vw, 5rem)",
                backgroundImage: "var(--color-gradient-blue)",
              }}
            >
              Build Often. Build Fast.
            </h2>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
