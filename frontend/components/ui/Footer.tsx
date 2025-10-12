import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-pf-slate/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} ProblemFinder. Crafted for explorers.</span>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/join" className="hover:text-white">
            Join
          </Link>
        </div>
      </div>
    </footer>
  );
}
