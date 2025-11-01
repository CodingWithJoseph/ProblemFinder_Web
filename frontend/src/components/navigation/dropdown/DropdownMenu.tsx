"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { NavigationProps } from "@/components/navigation/navbar/NavigationProps";
import { useTheme } from "@/context/ThemeProvider";

export function DropdownMenu({ navProps }: { navProps: NavigationProps }) {
  const { isDark } = useTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence mode={"wait"}>
      {navProps.isMenuOpen && (
        <motion.nav
          key="dropdown-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`fixed inset-0 top-20 z-60 h-[35vh] w-full transition-colors duration-700 ease-in-out 
          ${isDark ? "bg-brand-charcoal" : "bg-brand-off-white"}`}>
          <div className="flex flex-col items-center py-6 gap-4 text-lg font-medium">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>,
    document.body,
  );
}
