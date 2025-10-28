"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {usePathname} from "next/navigation";
import {Dropdown} from "../dropdown/Dropdown";
import {NavigationControls} from "../NavigationControls";

export function TopNavigation( { navControls } : { navControls: NavigationControls }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <motion.nav
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            className="fixed top-0 left-0 right-0 z-50 h-28 bg-[var(--color-off-white)]/80 backdrop-blur-md border-b border-black/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{scale: 1.05}}
                        className="w-8 h-8 rounded-full bg-black"/>
                    <span className="tracking-tight text-black group-hover:text-black/80 transition-colors" style={{fontSize: "1.125rem", fontWeight: 500}}>
                        BlueLabs
                    </span>
                </Link>
                {isHome ? (
                    <Link href="/auth">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="px-6 py-2.5 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
                            Start Building
                        </motion.button>
                    </Link>
                ) : (
                    <Dropdown navControls={navControls} />
                )}

            </div>
        </motion.nav>
    );
}

