'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubsubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubsubscribed(true);
      setEmail('');
    }, 1200);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/90 pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-64 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
             <img
              src="https://res.cloudinary.com/duweg8kpv/image/upload/v1782941582/kk6-removebg-preview_1_o7wly7.png"
              alt="Brokline-Foundation"
              className="h-8 w-auto object-contain grayscale brightness-50 contrast-200"
            />
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-white leading-none tracking-tight text-lg">
                  BROOKLINE
                </span>
                <span className="font-sans font-medium text-[10px] tracking-[0.25em] text-gold leading-none mt-1">
                  FOUNDATION - BLF
                </span>
              </div>
            </Link>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              Empowering adolescent girls and young women to build healthier, self-reliant communities through education, tech skills, and economic development.
            </p>
            {/* Social media icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold hover:text-navy flex items-center justify-center transition-all duration-300" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold hover:text-navy flex items-center justify-center transition-all duration-300" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold hover:text-navy flex items-center justify-center transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-gold hover:text-navy flex items-center justify-center transition-all duration-300" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="font-display font-semibold text-base tracking-wide text-gold">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors duration-300">About Our Story</Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-gold transition-colors duration-300">Sustainable Programs</Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-gold transition-colors duration-300">Our Community Impact</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gold transition-colors duration-300">Upcoming Events</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold transition-colors duration-300">Latest News & Blog</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold transition-colors duration-300">Community Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-5">
            <h4 className="font-display font-semibold text-base tracking-wide text-gold">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>100 Brookline Avenue, Suite 400,<br />Boston, MA 02215</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+234 80 3899 4633" className="hover:text-gold transition-colors duration-300">+234 80 3899 4633</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:info@brooklinefoundation.org" className="hover:text-gold transition-colors duration-300">info@brooklinefoundation.org</a>
              </li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="flex flex-col gap-5">
            <h4 className="font-display font-semibold text-base tracking-wide text-gold">Newsletter</h4>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              Stay updated on outreach campaigns, success stories, and donation impacts.
            </p>
            {subscribed ? (
              <div className="bg-primary/20 border border-primary/30 text-white rounded-xl p-4 text-sm font-medium text-center animate-fade-in-up">
                ✨ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl focus-within:border-gold/50 transition-all duration-300">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="bg-transparent border-0 outline-0 ring-0 flex-1 px-3 text-sm text-white placeholder-white/40 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gold hover:bg-gold-hover text-navy p-2.5 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer disabled:opacity-55"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Lower footer copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-1.5">
            <span>© {currentYear} Brookline Foundation. All Rights Reserved.</span>
            <span>•</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
