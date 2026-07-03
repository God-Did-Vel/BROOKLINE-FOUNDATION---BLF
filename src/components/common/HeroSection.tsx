'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  breadcrumb?: { label: string; href: string }[];
  bgImage?: string;
}

export default function HeroSection({
  title,
  subtitle,
  breadcrumb,
  bgImage = 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1920',
}: HeroSectionProps) {
  return (
    <section className="relative py-20 md:py-28 bg-navy text-white overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/90 to-navy pointer-events-none" />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Breadcrumbs */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs font-sans text-white/60 mb-6 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-gold transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            {breadcrumb.map((b, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3 h-3 text-white/30" />
                {idx === breadcrumb.length - 1 ? (
                  <span className="text-gold font-medium">{b.label}</span>
                ) : (
                  <Link href={b.href} className="hover:text-gold transition-colors">
                    {b.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-white leading-tight mb-6"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-base sm:text-sm md:text-xl text-white/80 max-w-2xl font-light leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
