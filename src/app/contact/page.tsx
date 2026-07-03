'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Mail, Phone, MapPin, Send, Check, Facebook, Twitter, Instagram, Linkedin, HeartHandshake } from 'lucide-react';

import HeroSection from '@/components/common/HeroSection';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setSubmitting(true);
    const ok = await api.submitContactMessage(formData);
    
    setTimeout(() => {
      setSubmitting(false);
      if (ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Could not send message. Please try again.');
      }
    }, 1000);
  };

  return (
    <div className="w-full bg-white">
      <HeroSection
        title="Connect With Our Office"
        subtitle="Have questions about volunteer openings, donor sponsorships, or local partnership plans? Reach out below."
        breadcrumb={[{ label: 'Contact', href: '/contact' }]}
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Contact Content Area */}
      <section className="py-24 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Details & Mock Map */}
          <div className="flex flex-col gap-10">
            
            <div className="flex flex-col gap-6">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">CONTACT DETAILS</span>
              <h2 className="font-display font-extrabold text-3xl text-navy">Get In Touch</h2>
              <p className="font-sans text-sm text-slate-500 leading-relaxed">
                If you are a community representative seeking assistance, a potential donor looking to fund a specific school hub, or a member of the media, please contact us.
              </p>
            </div>

            {/* Address/Contact Cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: <MapPin className="w-5 h-5 text-primary" />,
                  title: 'Office Address',
                  desc: '100 Brookline Avenue, Suite 400, Boston, MA 02215',
                },
                {
                  icon: <Phone className="w-5 h-5 text-primary" />,
                  title: 'Phone Number',
                  desc: '+1 (617) 555-0192',
                  href: 'tel:+16175550192',
                },
                {
                  icon: <Mail className="w-5 h-5 text-primary" />,
                  title: 'Email Address',
                  desc: 'info@brooklinefoundation.org',
                  href: 'mailto:info@brooklinefoundation.org',
                },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-200/50 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-navy">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="font-sans text-xs sm:text-sm text-slate-500 hover:text-primary transition-colors block mt-1">
                        {item.desc}
                      </a>
                    ) : (
                      <span className="font-sans text-xs sm:text-sm text-slate-500 block mt-1 leading-relaxed">
                        {item.desc}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Mock Map Pin layout */}
            <div className="w-full h-56 rounded-3xl border border-slate-200/50 bg-slate-100 relative shadow-inner overflow-hidden flex items-center justify-center">
              {/* CSS Styled Map background grid */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 brightness-75 filter grayscale pointer-events-none"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600')" }}
              />
              {/* Radar waves and pin icon */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="absolute w-12 h-12 rounded-full bg-primary/20 border border-primary/40 animate-ping pointer-events-none" />
                <div className="w-10 h-10 rounded-full bg-primary border-2 border-white flex items-center justify-center text-white shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="mt-3 bg-navy text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-md border border-white/10 uppercase tracking-widest leading-none">
                  BLF HQ Boston
                </div>
              </div>
            </div>

          </div>

          {/* Contact message Form panel */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/50 shadow-md">
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-6 py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-inner">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-navy">Message Dispatched</h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed px-4">
                  Thank you! We have received your message. Our office staff will review details and reply as soon as possible.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 font-sans font-bold bg-navy hover:bg-slate-800 text-white px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Send another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                <div>
                  <span className="font-sans font-bold text-[10px] text-primary uppercase tracking-widest">SEND MESSAGE</span>
                  <h3 className="font-display font-extrabold text-xl text-navy mt-1">Inquiry Form</h3>
                </div>

                <hr className="border-slate-100" />

                <div className="flex flex-col gap-1">
                  <label className="font-sans font-bold text-xs text-navy/70">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-sans text-sm text-navy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={submitting}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans font-bold text-xs text-navy/70">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-sans text-sm text-navy"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={submitting}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans font-bold text-xs text-navy/70">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Donor sponsorship queries"
                    className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-sans text-sm text-navy"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={submitting}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-sans font-bold text-xs text-navy/70">Message Description *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter details..."
                    className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-sans text-sm text-navy resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={submitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-sans font-bold bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl border border-primary hover:border-primary-hover shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Sending Message...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
