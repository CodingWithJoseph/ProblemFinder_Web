"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dropdown } from "../dropdown/Dropdown";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { NavigationProps } from "@/components/navigation/navbar/NavigationProps";

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
      delay: index * 0.25,
    },
  }),
};

export default function BottomNavigation({ navProps }: { navProps: NavigationProps }) {
  const pathname = usePathname();
  const { isDark } = useTheme();

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 200], [1, 0.85]);
  const y = useTransform(scrollY, [0, 200], [0, 10]);

  const bottomNavThreshold = 300;
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsCompact(latest > bottomNavThreshold);
    });
    return () => unsubscribe();
  }, [scrollY, bottomNavThreshold]);


  if (pathname !== "/") return null;

  return (
      <motion.nav
        style={{ scale, y }}
        className={
        `flex items-center justify-between rounded-xl fixed z-[100] bottom-6 left-1/2 
        -translate-x-1/2 w-full max-w-md py-5 px-10 backdrop-blur-md shadow-sm text-sm 
        transition-colors duration-700 ease-in-out border-1 border-brand-soft-charcoal
        ${
          isDark
            ? "text-brand-off-white bg-brand-charcoal"
            : "text-brand-jet-black bg-brand-off-white"
        }`}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}>
        <AnimatePresence mode="wait">
          {navProps.isMenuOpen || isCompact ? (
            <motion.div
              key="logo"
              variants={logoVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex items-center justify-between gap-12">
              <motion.div className="flex items-center justify-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`w-8 h-8 rounded-full transition-colors duration-700 ease-in-out ${
                    isDark
                      ? "bg-brand-off-white"
                      : "bg-brand-charcoal"
                  }`}
                />
                <span
                  className="tracking-tight"
                  style={{ fontSize: "1.125rem", fontWeight: 500 }}>
                  BlueLabs
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div className="flex items-center justify-between">
              <motion.div className="flex items-center justify-center gap-12">
                <motion.div
                  custom={1}
                  variants={linkVariants}
                  initial="open"
                  animate="closed"
                  exit="open">
                  <Link
                    href="/learn"
                    className={`text-brand-jet-black font-medium hover:text-brand-blue-primary transition ${isDark ? "text-brand-off-white" : "text-brand-jet-black"}`}>
                    Learn
                  </Link>
                </motion.div>
                <motion.div
                  custom={2}
                  variants={linkVariants}
                  initial="open"
                  animate="closed"
                  exit="open">
                  <Link
                    href="/about"
                    className={`text-brand-jet-black font-medium hover:text-brand-blue-primary transition ${isDark ? "text-brand-off-white" : "text-brand-jet-black"}`}>
                    About
                  </Link>
                </motion.div>
                <motion.div
                  custom={3}
                  variants={linkVariants}
                  initial="open"
                  animate="closed"
                  exit="open">
                  <Link
                    href="/auth"
                    className={`text-brand-jet-black font-medium hover:text-brand-blue-primary transition ${isDark ? "text-brand-off-white" : "text-brand-jet-black"}`}>
                    Join
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-shrink-0">
          <Dropdown navProps={navProps} />
        </div>
      </motion.nav>
  );
}
