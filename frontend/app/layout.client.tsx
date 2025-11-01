"use client";

import "../styles/index.css";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavigationProps } from "@/components/navigation/navbar/NavigationProps";
import { TopNavigation } from "@/components/navigation/navbar/TopNavigation";
import BottomNavigation from "@/components/navigation/navbar/BottomNavigation";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const onCloseMenu = () => setMenuOpen(false);

  const navProps: NavigationProps = { isMenuOpen, toggleMenu, onCloseMenu };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div>
          <header className="sticky top-0 z-50 w-full">
            <TopNavigation navProps={navProps} />
          </header>
          <main className="bg-brand-charcoal flex min-h-screen flex-col">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                {children}
              </motion.div>
              <BottomNavigation navProps={navProps} />
            </AnimatePresence>
          </main>
        </div>
      </body>
    </html>
  );
}
