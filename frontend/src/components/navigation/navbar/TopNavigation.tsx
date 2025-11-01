"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Dropdown } from "../dropdown/Dropdown";
import { NavigationProps } from "./NavigationProps";
import { useTheme } from "@/context/ThemeProvider";

export function TopNavigation({ navProps }: { navProps: NavigationProps }) {
  const { isDark } = useTheme();
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`h-20 backdrop-blur-md shadow-xs transition-colors duration-700 ease-in-out border-1 border-brand-soft-charcoal
      ${
        isDark
          ? "text-brand-off-white bg-brand-charcoal"
          : "text-brand-jet-black bg-brand-off-white"
      }`}>
      <div className="max-w-7xl h-full mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        <Link
          href="/" prefetch={false}
          className={`flex items-center gap-2 group ${isDark ? "text-brand-off-white" : "text-brand-jet-black"}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`w-8 h-8 rounded-full transition-colors duration-700 ease-in-out ${
              isDark
                ? "bg-brand-off-white"
                : "bg-brand-charcoal"
            }`} />
          <span
            className="tracking-tight transition-colors"
            style={{ fontSize: "1.125rem", fontWeight: 500 }}>
            BlueLabs
          </span>
        </Link>
        {isHome ? (
          <Link href="/auth">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-brand-blue-primary text-white rounded-lg hover:bg-brand-blue-accent transition-colors">
              Try BlueLabs
            </motion.button>
          </Link>
        ) : (
          <Dropdown navProps={navProps} />
        )}
      </div>
    </motion.nav>
  );
}
