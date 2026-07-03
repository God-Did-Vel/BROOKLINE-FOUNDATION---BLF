'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, Mail, Phone, ArrowRight, HandHelping, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't render global navbar on admin pages
  const isAdminPage = pathname?.startsWith('/admin');

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isAdminPage) return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Impact', path: '/impact' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="w-full relative z-40">
      {/* Top Information Bar (Subtle & Elegant) */}
      <div className="bg-navy text-white/80 py-2.5 px-6 font-sans text-xs border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="mailto:info@brooklinefoundation.org" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>info@brooklinefoundation.org</span>
            </a>
            <span className="text-white/20">|</span>
            <a href="tel:+16175550192" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>+234 80 3899 4633</span>
            </a>
          </div>

          <div className="flex items-center gap-3 text-white/90">
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-white/15">
              <Sparkles className="w-3 h-3 text-gold" />
              Empowering 10,000+ Girls Globally
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Sticky with Solid Premium Background) */}
      <header className="sticky top-0 bg-white border-b border-slate-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="https://res.cloudinary.com/duweg8kpv/image/upload/v1782941582/kk6-removebg-preview_1_o7wly7.png"
              alt="Brokline-Foundation"
              className="h-8 w-auto object-contain grayscale brightness-50 contrast-200"
            />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-navy leading-none tracking-tight text-lg md:text-xl group-hover:text-primary transition-colors">
                BROOKLINE
              </span>
              <span className="font-sans font-semibold text-[10px] tracking-[0.22em] text-gold leading-none mt-1">
                FOUNDATION - BLF
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Linear/Apple minimalist style) */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-sans font-semibold text-xs uppercase tracking-wider transition-all duration-200 py-2 relative ${
                    isActive ? 'text-primary' : 'text-slate-600 hover:text-navy'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/volunteer"
              className="flex items-center gap-1.5 font-sans font-semibold text-xs uppercase tracking-wider text-slate-700 hover:text-primary px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all duration-200"
            >
              <HandHelping className="w-4 h-4 text-primary" />
              Volunteer
            </Link>

            <Link
              href="/donate"
              className="flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-wider bg-gold text-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:bg-gold-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 border border-gold/50"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 text-navy hover:text-primary bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors duration-200 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-xl"
            >
              <div className="p-6 flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`font-display font-bold text-base py-2.5 px-4 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-primary/5 text-primary border-l-4 border-primary' 
                          : 'text-slate-700 hover:bg-slate-50 hover:text-navy'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <hr className="border-slate-100 my-2" />
                <div className="flex flex-col gap-2.5 pt-1">
                  <Link
                    href="/volunteer"
                    className="flex items-center justify-center gap-2 font-sans font-bold text-sm text-navy border border-slate-200 px-5 py-3 rounded-xl hover:bg-slate-50 transition-all"
                  >
                    <HandHelping className="w-4 h-4 text-primary" />
                    Volunteer with us
                  </Link>
                  <Link
                    href="/donate"
                    className="flex items-center justify-center gap-2 font-sans font-bold text-sm bg-gold text-white px-5 py-3 rounded-full shadow-md hover:bg-gold-hover transition-all"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    Donate Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
