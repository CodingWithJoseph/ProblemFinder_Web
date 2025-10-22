"use client";

import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-[var(--color-gray-50)] overflow-hidden pt-24">
            {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-[0.05]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-6"
                    >
            <span className="inline-block px-4 py-2 rounded-full bg-black/5 text-black/70 text-sm tracking-wide">
              AI-POWERED PROBLEM DISCOVERY
            </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mb-8"
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                            fontWeight: 500,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Discover what the world{' '}
                        <span className="italic" style={{ fontWeight: 400 }}>
              truly
            </span>{' '}
                        needs
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-black/60 mb-12 max-w-2xl"
                        style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
                    >
                        BlueLabs uses advanced AI to analyze millions of online conversations, uncovering
                        real problems people face every day. Turn insights into innovation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-8 py-4 bg-black text-white rounded-full hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
                        >
                            <span>Explore Platform</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-white text-black border-2 border-black/10 rounded-full hover:border-black/20 transition-colors"
                        >
                            Watch Demo
                        </motion.button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-20 grid grid-cols-3 gap-8 max-w-2xl"
                    >
                        {[
                            { value: '2.8M+', label: 'Problems Analyzed' },
                            { value: '94%', label: 'Accuracy Rate' },
                            { value: '500+', label: 'Companies Trust Us' },
                        ].map((stat, idx) => (
                            <div key={idx} className="border-l-2 border-black/10 pl-4">
                                <div className="text-black mb-1" style={{ fontSize: '2rem', fontWeight: 500 }}>
                                    {stat.value}
                                </div>
                                <div className="text-black/50 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Floating element */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute right-12 top-1/3 hidden lg:block"
            >
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-50 to-violet-50 blur-3xl opacity-60" />
            </motion.div>
        </section>
    );
}
