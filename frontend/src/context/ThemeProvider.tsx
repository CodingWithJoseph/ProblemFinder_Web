"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { useScroll } from "framer-motion";

interface ThemeContextType {
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [isDark, setIsDark] = useState(true);
  const isDarkThreshold = 1000;

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const shouldBeDark = latest > isDarkThreshold;
      // Only update if the value actually changes
      // setIsDark(prev => prev === shouldBeDark ? prev : shouldBeDark);
    });
    return () => unsubscribe();
  }, [scrollY, isDarkThreshold]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ isDark }), [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}