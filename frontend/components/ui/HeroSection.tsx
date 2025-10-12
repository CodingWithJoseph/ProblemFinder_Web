"use client";

import Interactive3DHero from "./Interactive3DHero";

const navLinks = ["BUILD", "LEARN", "ABOUT", "JOIN"];

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0f172a] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <Interactive3DHero className="w-full h-full" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="text-2xl font-bold tracking-wider">VECTOR</div>
        <div className="flex gap-12 text-sm tracking-widest">
          {navLinks.map((label) => (
            <button
              key={label}
              className="transition-colors hover:text-gray-300"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </section>
  );
}
