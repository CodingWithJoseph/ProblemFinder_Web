"use client"

import "../styles/globals.css";
import "../styles/index.css"
import {ReactNode} from "react";
import {Inter} from "next/font/google";
import BottomNavigation from "../components/navigation/BottomNavigation";
import {AnimatePresence, motion} from "framer-motion";
import {usePathname} from "next/navigation";

const inter = Inter({subsets: ["latin"], display: "swap"});


export default function ClientLayout({children}: { children: ReactNode }) {
    const pathname = usePathname();
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} bg-pf-night text-pf-cloud`}>
                <div className="flex min-h-screen flex-col">
                    <main className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pathname}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.2,
                                    ease: [0.22, 1, 0.36, 1],
                            }}>
                                {children}
                                <BottomNavigation/>
                            </motion.div>
                        </AnimatePresence>
                        </main>
                    </div>
            </body>
        </html>
    );
}
