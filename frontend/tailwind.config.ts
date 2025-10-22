import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                ...defaultTheme.colors,
                ...colors,
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "sans-serif"
                ]
            },
            backgroundImage: {
                "grid-glow":
                    "radial-gradient(circle at 20% 20%, rgba(91, 192, 190, 0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(11, 19, 43, 0.6), transparent 55%), radial-gradient(circle at 50% 80%, rgba(245, 247, 250, 0.08), transparent 60%)"
            }
        }
    },
    plugins: []
};

export default config;
