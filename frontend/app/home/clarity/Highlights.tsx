import { useTheme } from "@/context/ThemeProvider";

export default function Highlights() {
  const { isDark } = useTheme();
  return (
    <section
      className={`flex h-screen p-20 transition-colors duration-700 ease-in-out ${isDark ? "bg-" : "bg-[var(--color-gray-50)]"}`}
    >
      <div className="relative flex flex-1 h-3/4 items-center justify-start overflow-hidden rounded-3xl"></div>
    </section>
  );
}