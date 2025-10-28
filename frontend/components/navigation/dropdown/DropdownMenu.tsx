"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type DropdownMenuProps = {
  isMenuOpen: boolean;
};

export function DropdownMenu({ isMenuOpen }: DropdownMenuProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  });
  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence mode={'wait'}>
      {isMenuOpen && (
        <motion.nav
          key="dropdown-menu"
          initial={{ opacity: 0, y: -10}}
          animate={{ opacity: 1, y: 0}}
          exit={{ opacity: 0, y: -10}}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed top-27 left-0 right-0 z-60 bg-[var(--color-off-white)]/80 backdrop-blur-md border-b border-black/5">
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
