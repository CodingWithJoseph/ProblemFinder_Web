"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/5 bg-pf-night/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide text-pf-sky">
          ProblemFinder
        </Link>
        <ul className="flex items-center gap-6 text-sm uppercase tracking-[0.2em] text-white/70">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href} className="relative">
                <Link href={link.href} className="transition-colors hover:text-pf-sky">
                  {link.label}
                </Link>
                {isActive ? (
                  <motion.span
                    layoutId="active-link"
                    className="absolute -bottom-2 left-0 h-0.5 w-full bg-pf-sky"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
