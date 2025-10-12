import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./styles/**/*.{css}"],
  theme: {
    extend: {
      colors: {
        "pf-night": "#0b132b",
        "pf-slate": "#1c2541",
        "pf-sky": "#5bc0be",
        "pf-cloud": "#f5f7fa"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      backgroundImage: {
        "grid-glow": "radial-gradient(circle at 20% 20%, rgba(91, 192, 190, 0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(11, 19, 43, 0.6), transparent 55%), radial-gradient(circle at 50% 80%, rgba(245, 247, 250, 0.08), transparent 60%)"
      }
    }
  },
  plugins: []
};

export default config;
