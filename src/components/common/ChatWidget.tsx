'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, CheckCircle, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    const ok = await api.submitContactMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Quick Chat Message',
      message: formData.message,
    });

    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      alert('Could not send message. Please try again.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-[90vw] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-green p-6 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center text-gold shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base tracking-tight text-white">Brookline Assistant</h4>
                  <p className="font-sans text-[11px] text-white/70">Send us a quick message</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer relative z-10"
                aria-label="Close message widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 bg-slate-50/50">
              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center gap-4 animate-fade-in-up">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-inner">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h5 className="font-display font-bold text-lg text-navy">Message Dispatched!</h5>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed max-w-xs">
                    Thank you! Your inquiry has been sent directly to our support team. We will reply to your email promptly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-2 font-sans font-bold text-xs bg-navy text-white px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer shadow-sm"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-sans">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-navy focus:outline-none focus:border-primary transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-navy focus:outline-none focus:border-primary transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="General Inquiry / Support"
                      className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-navy focus:outline-none focus:border-primary transition-all"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Message *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="How can we help you today?"
                      className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs text-navy focus:outline-none focus:border-primary transition-all resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={submitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-1 bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-navy hover:bg-slate-900 text-white shadow-2xl border border-white/20 flex items-center justify-center relative cursor-pointer group"
        aria-label="Toggle chat"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold rounded-full border-2 border-navy animate-pulse" />
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform group-hover:rotate-90 duration-300" />
        ) : (
          <MessageSquare className="w-6 h-6 text-gold fill-gold/20" />
        )}
      </motion.button>
    </div>
  );
}
