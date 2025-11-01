import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavigationProps } from "@/components/navigation/navbar/NavigationProps";
import { useTheme } from "@/context/ThemeProvider";

export function DropdownButton({ navProps }: { navProps: NavigationProps }) {

  const {isDark} = useTheme()

  return (
    <AnimatePresence mode={"wait"}>
      <motion.button
        className={`${isDark ? "text-brand-off-white" : "text-brand-jet-black"}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={navProps.toggleMenu}>
        {navProps.isMenuOpen ? (
          <motion.div
            key="x-icon"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 720, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}>
            <X className="w-6 h-6" />
          </motion.div>
        ) : (
          <motion.div
            key="menu-icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <Menu key="menu-icon" className="w-6 h-6" />
          </motion.div>
        )}
      </motion.button>
    </AnimatePresence>
  );
}
