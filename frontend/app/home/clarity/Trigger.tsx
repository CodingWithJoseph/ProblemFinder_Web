import { useTheme } from "@/context/ThemeProvider";

export default function Trigger() {

  const isDark = {useTheme}
  return (
    <section className={`h-[100vh] w-full transition-colors duration-700 ease-in-out ${isDark ? "bg-[var(--color-brand-charcoal)]" : "bg-[var(--color-gray-50)]"}`}>
      <div className="h-full w-full relative">
        <img
          className="h-full w-full object-center object-cover"
          src={"images/transition_screen.webp"}
          alt={''}
        />
        {/* Gradient overlay */}
        <div className={"absolute inset-x-0 bottom-0 h-1/3 gradient-fade-dark"} />
      </div>
    </section>
  );
}