"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useScroll } from "framer-motion";

// Define the shape of your context value
interface ThemeContextType {
  isDark: boolean;
}

// Create context with a default value
const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [isDark, setIsDark] = useState(false);
  const isDarkThreshold = 2000;

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsDark(latest > isDarkThreshold);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <ThemeContext.Provider value={{ isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
