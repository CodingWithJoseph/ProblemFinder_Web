"use client"

import "../styles/index.css"
import "../styles/globals.css";
import {Inter} from "next/font/google";
import {usePathname} from "next/navigation";
import {ReactNode, useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import { NavigationProps } from "@/components/navigation/NavigationProps";
import { TopNavigation } from "@/components/navigation/navbar/TopNavigation";
import BottomNavigation from "@/components/navigation/navbar/BottomNavigation";


const inter = Inter({subsets: ["latin"], display: "swap"});


export default function ClientLayout({children}: { children: ReactNode }) {
    const pathname = usePathname();

    const [isMenuOpen, setMenuOpen] = useState(false);
    useEffect(() => setMenuOpen(false), [pathname]);


    const toggleMenu = () => {setMenuOpen(!isMenuOpen);};
    const onCloseMenu = () => {setMenuOpen(false);};

    const navProps: NavigationProps = { isMenuOpen, toggleMenu, onCloseMenu };

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} bg-pf-night text-pf-cloud`}>
                <div className="flex min-h-screen flex-col">
                    <main className="flex-1">
                        <AnimatePresence mode="wait">
                            <TopNavigation navProps={navProps} />
                            <motion.div
                                key={pathname}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1]}}>
                                {children}
                                <BottomNavigation navProps={navProps}  />
                            </motion.div>
                        </AnimatePresence>
                        </main>
                    </div>
            </body>
        </html>
    );
}
