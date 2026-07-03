'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Check, Heart, ShieldAlert, Award, FileText } from 'lucide-react';

import HeroSection from '@/components/common/HeroSection';

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [] as string[],
    availability: 'Flexible',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const skillOptions = [
    'Teaching & Tutoring',
    'Mentoring & Leadership Coaching',
    'Computer Literacy & Coding instruction',
    'Healthcare & Mental wellness campaigns',
    'Event Coordination & Logistics',
    'Fundraising & Grant Writing',
    'Digital Marketing & Photography',
  ];

  const handleCheckboxChange = (skill: string) => {
    setFormData((prev) => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || formData.skills.length === 0) {
      alert('Please fill out all required fields and select at least one skill.');
      return;
    }

    setSubmitting(true);

    const ok = await api.submitVolunteerApplication({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills.join(', '),
      availability: formData.availability,
    });

    setTimeout(() => {
      setSubmitting(false);
      if (ok) {
        setSuccess(true);
      } else {
        alert('Could not submit application. Please try again.');
      }
    }, 1000);
  };

  const resetForm = () => {
    setSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      skills: [],
      availability: 'Flexible',
      notes: '',
    });
  };

  return (
    <div className="w-full bg-white">
      <HeroSection
        title="Join Our Volunteer Network"
        subtitle="Dedicating your time and talent directly shapes the lives of young girls and constructs resilient local communities."
        breadcrumb={[{ label: 'Volunteer', href: '/volunteer' }]}
        bgImage="https://images.unsplash.com/photo-1573498791355-680dd03f9011?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main Form Section */}
      <section className="py-20 bg-soft-gray min-h-[600px] flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-6 w-full">
          
          <div className="bg-white p-8 sm:p-12 rounded-[2rem] border border-slate-200/50 shadow-xl">
            
            {success ? (
              // SUCCESS PAGE
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-6 py-6"
              >
                <div className="w-20 h-20 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="font-display font-extrabold text-3xl text-navy">Application Received</h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-md">
                  Thank you, <strong>{formData.name}</strong>! We have logged your details. Our volunteer coordinators will review your skillset and follow up within 3-5 business days.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-6 font-sans font-bold bg-navy hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  Apply again or Register peer
                </button>
              </motion.div>
            ) : (
              // REGULAR FORM
              <form onSubmit={handleVolunteerSubmit} className="flex flex-col gap-6">
                <div>
                  <span className="font-sans font-bold text-xs text-primary uppercase tracking-widest">ONBOARDING GATEWAY</span>
                  <h3 className="font-display font-extrabold text-2xl text-navy mt-1">Volunteer Application Form</h3>
                </div>

                <hr className="border-slate-100" />

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-sans font-bold text-xs text-navy/70">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
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
                    <label className="font-sans font-bold text-xs text-navy/70">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="E.g., +1 (617) 555-0100"
                      className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-sans text-sm text-navy"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Skills Checklist */}
                <div className="flex flex-col gap-3 mt-2">
                  <label className="font-sans font-bold text-xs text-navy/70">
                    Select Your Skills & Areas of Interest * (Choose at least one)
                  </label>
                  <div className="flex flex-col gap-2.5 bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
                    {skillOptions.map((skill) => {
                      const isChecked = formData.skills.includes(skill);
                      return (
                        <label 
                          key={skill}
                          className="flex items-center gap-3 cursor-pointer group text-sm text-navy/80 hover:text-navy"
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(skill)}
                            disabled={submitting}
                          />
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isChecked 
                              ? 'bg-primary border-primary text-white' 
                              : 'border-slate-300 bg-white group-hover:border-primary'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="font-sans font-medium">{skill}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Availability select */}
                <div className="flex flex-col gap-1">
                  <label className="font-sans font-bold text-xs text-navy/70">General Availability</label>
                  <select
                    className="bg-slate-50 border border-slate-200 p-3 rounded-xl focus:bg-white focus:border-primary outline-none transition-all font-sans text-sm text-navy cursor-pointer"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    disabled={submitting}
                  >
                    <option value="Flexible">Flexible (Mixed slots)</option>
                    <option value="Weekends">Weekends only</option>
                    <option value="Weekdays">Weekdays only</option>
                    <option value="Remote">Remote tasks only</option>
                  </select>
                </div>

                {/* Simulation check message */}
                <div className="flex items-start gap-2.5 text-xs text-slate-400 mt-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
                  <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>On submission, coordinates are uploaded. Standard resume document requirements will be requested via email callback.</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-sans font-bold bg-primary hover:bg-primary-hover text-white py-4 rounded-xl border border-primary hover:border-primary-hover shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-50 mt-4"
                >
                  {submitting ? 'Submitting Application...' : 'Submit Volunteer Application'}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}
