"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function BottomNav() {

    const pathname = usePathname();

    // Only render on home page
    if (pathname !== "/") return null;

    const { scrollY } = useScroll();

    // As the user scrolls, fade + scale the navbar slightly
    const opacity = useTransform(scrollY, [0, 200], [1, 0.85]);
    const scale = useTransform(scrollY, [0, 200], [1, 0.95]);
    const y = useTransform(scrollY, [0, 200], [0, 20]); // moves slightly downward when compacted

    return (
        <motion.nav
            style={{ opacity, scale, y }}
            className="fixed z-[100] bottom-6 left-1/2 -translate-x-1/2 rounded-xl py-2 px-8 bg-white text-black text-sm shadow-sm backdrop-blur-md"
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="flex items-center justify-center gap-8">
                <Link href="/learn" className="text-gray-800 font-medium hover:text-black transition">Learn</Link>
                <Link href="/about" className="text-gray-800 font-medium hover:text-black transition">About</Link>
                <Link href="/auth" className="text-gray-800 font-medium hover:text-black transition">Join</Link>
                <motion.button whileHover={{ scale: 1.1, backgroundColor: "#f5f5f5" }} whileTap={{ scale: 0.95 }} className="ml-2 rounded-md p-2 transition">
                    <Menu className="w-6 h-6 text-gray-800" />
                </motion.button>
            </div>
        </motion.nav>
    );
}