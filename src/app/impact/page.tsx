'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Download, Award, Heart, GraduationCap, TrendingUp, CheckCircle } from 'lucide-react';
import Link from 'next/link';

import HeroSection from '@/components/common/HeroSection';

export default function ImpactPage() {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    async function loadStories() {
      const data = await api.getStories();
      setStories(data);
    }
    loadStories();
  }, []);

  // SVG Chart: Enrolled Girls over time (2018 - 2026)
  const chartData = [
    { year: '2018', count: 15, height: 20 },
    { year: '2020', count: 120, height: 45 },
    { year: '2022', count: 850, height: 75 },
    { year: '2024', count: 5200, height: 110 },
    { year: '2026', count: 10000, height: 160 },
  ];

  return (
    <div className="w-full bg-white">
      <HeroSection
        title="Our Community Impact"
        subtitle="Measuring the tangible progress of our advocacy campaigns, education fellowships, and entrepreneurship cooperatives."
        breadcrumb={[{ label: 'Impact', href: '/impact' }]}
        bgImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Impact Numbers Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <GraduationCap className="w-6 h-6 text-primary" />,
                title: '94% Retention Rate',
                desc: 'Of our scholarship recipients finish their secondary education and qualify for university or internship placement.',
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-primary" />,
                title: '3.5x Earning Capacity',
                desc: 'Average increase in monthly income reported by young women 12 months after graduating from our Vocational Pathways.',
              },
              {
                icon: <Award className="w-6 h-6 text-primary" />,
                title: '15,000+ Wellness Kits',
                desc: 'Health packages distributed alongside comprehensive hygiene workshops to combat school dropouts.',
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-soft-gray p-8 rounded-3xl border border-slate-100 flex flex-col gap-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                  {stat.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-navy">{stat.title}</h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* SVG Growth Chart & Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-soft-gray p-8 sm:p-12 rounded-[2rem] border border-slate-100">
            <div className="flex flex-col gap-6">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">GROWTH OVER TIME</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-navy">Annual Beneficiaries Reached</h2>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                What began as a localized effort in 2018 has scaled exponentially. By investing in scalable training curriculums, building dedicated technology spaces, and expanding sponsor networks, we are now positioned to support 10,000 adolescent girls and young women annually.
              </p>
              <div className="flex flex-col gap-3 font-sans text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>2018: First cohort of mentorship fellowships</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>2022: Added Tech Bootcamps & Mobile Wellness Clinics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>2026: Direct access across multiple school regions</span>
                </div>
              </div>
            </div>

            {/* Custom Responsive SVG Chart */}
            <div className="flex flex-col items-center bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm w-full">
              <span className="font-sans font-bold text-xs text-navy/60 uppercase tracking-widest mb-6">Enrollment Progression</span>
              <div className="flex items-end justify-between w-full h-56 px-4 border-b border-slate-100">
                {chartData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 w-1/5 group">
                    {/* Tooltip value */}
                    <div className="opacity-0 group-hover:opacity-100 bg-navy text-white text-[10px] font-bold py-1 px-2 rounded absolute -translate-y-10 transition-opacity pointer-events-none shadow-md">
                      {d.count.toLocaleString()}
                    </div>
                    {/* Bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: d.height }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut', delay: i * 0.1 }}
                      className="w-8 sm:w-10 rounded-t-lg bg-gradient-to-t from-primary to-primary/80 group-hover:from-gold group-hover:to-gold/80 transition-colors shadow-sm"
                    />
                    {/* Label */}
                    <span className="font-display font-semibold text-xs text-navy/70 pb-2">{d.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section: Beneficiary Quote Stories */}
      <section className="py-24 bg-soft-gray border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">REAL STORIES</span>
            <h2 className="font-display font-extrabold text-3xl text-navy mt-3">Success Spotlights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, idx) => (
              <motion.div
                key={story.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm flex flex-col gap-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-14 h-14 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-display font-bold text-base text-navy leading-none">{story.name}</h3>
                    <span className="font-sans text-[10px] text-gold uppercase tracking-wider font-semibold block mt-1">
                      {story.role}
                    </span>
                  </div>
                </div>
                <blockquote className="font-sans text-sm text-slate-500 italic leading-relaxed flex-grow">
                  "{story.quote}"
                </blockquote>
                <p className="font-sans text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {story.story}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Annual Reports (PDF Download) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary mb-4 block">TRANSPARENCY</span>
          <h2 className="font-display font-extrabold text-3xl text-navy mb-6">Annual & Financial Reports</h2>
          <p className="font-sans text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto mb-12">
            We are committed to absolute transparency. Download our comprehensive audits, program metrics, and administrative expense sheets.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { title: '2025 Annual Impact Report', size: '2.4 MB' },
              { title: '2024 Audited Financial Statement', size: '1.8 MB' },
            ].map((report, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-5 bg-soft-gray rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="text-left">
                  <span className="font-display font-semibold text-sm text-navy block">{report.title}</span>
                  <span className="font-sans text-[10px] text-slate-400 block mt-0.5">PDF • {report.size}</span>
                </div>
                <button
                  onClick={() => {
                    // Simulating a file download
                    alert(`Downloading simulated: ${report.title}`);
                  }}
                  className="p-3 rounded-xl bg-primary text-white hover:bg-primary-hover shadow transition-colors cursor-pointer"
                  aria-label="Download report"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
