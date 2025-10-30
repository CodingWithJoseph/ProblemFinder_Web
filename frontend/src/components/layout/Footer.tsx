"use client";

import { motion } from "framer-motion";
import { ArrowUp } from 'lucide-react';

const footerLinks = {
  index: [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'OUR SOLUTIONS', href: '#solutions' },
    { label: 'INSIGHTS', href: '#insights' },
    { label: 'CASE STUDIES', href: '#cases' },
  ],
  stayConnected: [
    { label: 'CONTACT US', href: '#contact' },
    { label: 'CAREERS', href: '#careers' },
    { label: 'LINKEDIN', href: 'https://linkedin.com' },
    { label: 'TWITTER', href: 'https://twitter.com' },
    { label: 'GITHUB', href: 'https://github.com' },
  ],
  legal: [
    { label: 'NEWSLETTER', href: '#newsletter' },
    { label: 'PRIVACY POLICY', href: '#privacy' },
    { label: 'TERMS OF SERVICE', href: '#terms' },
    { label: 'COOKIE POLICY', href: '#cookies' },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#FF9B7F] rounded-t-[3rem] md:rounded-t-[5rem] px-8 md:px-16 py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto">
          {/* Logo */}
          <div className="mb-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm" />
              <span className="text-white tracking-tight" style={{ fontSize: '1.5rem', fontWeight: 500 }}>
                BlueLabs
              </span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
            {/* Index Column */}
            <div>
              <h3
                className="text-white/90 mb-8 tracking-wide"
                style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em' }}
              >
                INDEX
              </h3>
              <nav className="space-y-4">
                {footerLinks.index.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    className="block text-white/80 hover:text-white transition-colors"
                    style={{ fontSize: '0.875rem', letterSpacing: '0.02em' }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Stay Connected Column */}
            <div>
              <h3
                className="text-white/90 mb-8 tracking-wide"
                style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em' }}
              >
                STAY CONNECTED
              </h3>
              <nav className="space-y-4">
                {footerLinks.stayConnected.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    className="block text-white/80 hover:text-white transition-colors"
                    style={{ fontSize: '0.875rem', letterSpacing: '0.02em' }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Legal Column */}
            <div>
              <h3
                className="text-white/90 mb-8 tracking-wide"
                style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em' }}
              >
                LEGAL
              </h3>
              <nav className="space-y-4">
                {footerLinks.legal.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    className="block text-white/80 hover:text-white transition-colors"
                    style={{ fontSize: '0.875rem', letterSpacing: '0.02em' }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-12 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-white/70 text-sm tracking-wide">
                ALL RIGHTS RESERVED. THE BLUELABS GROUP © 2025
              </p>
              <motion.button
                onClick={scrollToTop}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
