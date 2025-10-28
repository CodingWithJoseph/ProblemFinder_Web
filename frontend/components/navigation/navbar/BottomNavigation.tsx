"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dropdown } from "../dropdown/Dropdown";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { NavigationControls } from "../NavigationControls";
import { useEffect, useState } from "react";

const logoVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.2 },
  },
};

const linkVariants = {
  closed: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: index * 0.25,
    },
  }),
  open: (index: number) => ({
    x: -40,
    opacity: 0,
    transition: {
      duration: 0.3,
      delay: index * 0.05,
    },
  }),
};

export default function BottomNav({ navControls }: { navControls: NavigationControls }) {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 200], [1, 0.85]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.85]);
  const y = useTransform(scrollY, [0, 200], [0, 10]);

  const threshold = 150;
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsCompact(latest > threshold);
    });

    return () => unsubscribe();
  }, [scrollY, threshold]);

  return (
    <AnimatePresence mode={"wait"}>
      <motion.nav
        style={{ opacity, scale, y }}
        className="fixed z-[100] bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md py-6 px-10 bg-white text-black text-sm shadow-sm backdrop-blur-md flex items-center justify-between rounded-xl"
        transition={{ type: "spring", stiffness: 100, damping: 20 }}>
        <AnimatePresence mode={"wait"}>
          {navControls.isMenuOpen || isCompact ? (
            <motion.div
              key={"logo"}
              variants={logoVariants}
              initial={"closed"}
              animate={"open"}
              exit={"closed"}
              className="flex items-center justify-between gap-12">
              <motion.div className="flex items-center justify-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} className="w-8 h-8 rounded-full bg-black" />
                <span className="tracking-tight text-black group-hover:text-black/80 transition-colors" style={{ fontSize: "1.125rem", fontWeight: 500 }}>
                  BlueLabs
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={"links"}
              initial={"open"}
              animate={"closed"}
              exit={"open"}
              className="flex items-center justify-between">
              <motion.div variants={linkVariants} className="flex items-center justify-center gap-12">
                <motion.div custom={1} variants={linkVariants}>
                  <Link href="/learn" className="text-gray-800 font-medium hover:text-black transition">
                    Learn
                  </Link>
                </motion.div>
                <motion.div custom={2} variants={linkVariants}>
                  <Link href="/about" className="text-gray-800 font-medium hover:text-black transition">
                    About
                  </Link>
                </motion.div>
                <motion.div custom={3} variants={linkVariants}>
                  <Link href="/auth" className="text-gray-800 font-medium hover:text-black transition">
                    Join
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-shrink-0">
          <Dropdown navControls={navControls} />
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
