'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { Calendar, MapPin, Check, X, AlertCircle } from 'lucide-react';

import HeroSection from '@/components/common/HeroSection';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [registeringEvent, setRegisteringEvent] = useState<any | null>(null);
  
  // Registration Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      const data = await api.getEvents();
      setEvents(data);
    }
    loadEvents();
  }, []);

  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) >= now);
  const pastEvents = events.filter(e => new Date(e.date) < now);

  const displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeringEvent) return;
    setSubmitting(true);
    
    // Call API register attendee endpoint to increment count
    const ok = await api.registerEventAttendee(registeringEvent.id);
    
    setTimeout(() => {
      setSubmitting(false);
      if (ok) {
        setSuccess(true);
        // Reload events to show updated registration numbers
        api.getEvents().then(setEvents);
      } else {
        alert('Could not process registration. Please try again.');
      }
    }, 1000);
  };

  const closeRegistration = () => {
    setRegisteringEvent(null);
    setFormData({ name: '', email: '', phone: '' });
    setSuccess(false);
  };

  return (
    <div className="w-full bg-white">
      <HeroSection
        title="Outreach Events & Workshops"
        subtitle="Participate in our youth development workshops, leadership summits, and community health distribution drives."
        breadcrumb={[{ label: 'Events', href: '/events' }]}
        bgImage="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Tabs Selector & Events Grid */}
      <section className="py-20 bg-soft-gray min-h-[500px]">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Tab buttons */}
          <div className="flex items-center justify-center gap-4 mb-16 border-b border-slate-200 pb-1 max-w-xs mx-auto">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-3 font-sans font-bold text-sm tracking-wide transition-colors relative cursor-pointer ${
                activeTab === 'upcoming' ? 'text-primary' : 'text-slate-400 hover:text-navy'
              }`}
            >
              Upcoming ({upcomingEvents.length})
              {activeTab === 'upcoming' && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-3 font-sans font-bold text-sm tracking-wide transition-colors relative cursor-pointer ${
                activeTab === 'past' ? 'text-primary' : 'text-slate-400 hover:text-navy'
              }`}
            >
              Past Outreach ({pastEvents.length})
              {activeTab === 'past' && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          </div>

          {/* Grid lists */}
          {displayEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayEvents.map((ev, idx) => (
                <motion.div
                  key={ev.id || idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white rounded-3xl border border-slate-200/50 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={ev.image} 
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary" />
                          {new Date(ev.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary" />
                          {ev.location}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-navy group-hover:text-primary transition-colors leading-snug">
                        {ev.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {ev.description}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-6 flex items-center justify-between">
                      <span className="font-sans text-xs text-slate-400 font-medium">
                        {ev.registered} seats reserved
                      </span>
                      {activeTab === 'upcoming' ? (
                        <button
                          onClick={() => setRegisteringEvent(ev)}
                          className="font-sans font-bold text-xs bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                        >
                          Register Free Seat
                        </button>
                      ) : (
                        <span className="font-sans font-semibold text-xs text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400 bg-white border border-slate-200/50 rounded-[2rem] font-sans text-sm font-medium">
              No outreach events listed in this category.
            </div>
          )}

        </div>
      </section>

      {/* Registration Modal Overlay */}
      <AnimatePresence>
        {registeringEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl"
            >
              <button
                onClick={closeRegistration}
                className="absolute top-4 right-4 text-slate-400 hover:text-navy cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {success ? (
                <div className="flex flex-col items-center text-center gap-4 py-6 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-navy">Registration Confirmed</h3>
                  <p className="font-sans text-sm text-slate-500 leading-relaxed px-4">
                    Thank you! Your seat for <strong>{registeringEvent.title}</strong> is reserved. We have sent confirmation details to your email address.
                  </p>
                  <button
                    onClick={closeRegistration}
                    className="mt-4 w-full font-sans font-bold bg-navy hover:bg-slate-800 text-white py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-5">
                  <div>
                    <span className="font-sans font-bold text-[10px] text-primary uppercase tracking-widest">EVENT REGISTRATION</span>
                    <h3 className="font-display font-bold text-xl text-navy mt-1 line-clamp-2">
                      {registeringEvent.title}
                    </h3>
                  </div>

                  <hr className="border-slate-100" />

                  <div className="flex flex-col gap-1">
                    <label className="font-sans font-bold text-xs text-navy/70">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans text-sm text-navy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={submitting}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-sans font-bold text-xs text-navy/70">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter email address"
                      className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans text-sm text-navy"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={submitting}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-sans font-bold text-xs text-navy/70">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter phone number"
                      className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans text-sm text-navy"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={submitting}
                    />
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-400 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Free entry registration. Confirmation code will be verified at the door.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-sans font-bold bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl border border-primary hover:border-primary-hover shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {submitting ? 'Reserving...' : 'Confirm Free Seat'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
