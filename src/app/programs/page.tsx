'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { GraduationCap, Users, HeartPulse, Briefcase, Monitor, Award, ArrowRight, Heart, X } from 'lucide-react';
import Link from 'next/link';

import HeroSection from '@/components/common/HeroSection';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeDetailProgram, setActiveDetailProgram] = useState<any | null>(null);

  useEffect(() => {
    async function loadPrograms() {
      const data = await api.getPrograms();
      setPrograms(data);
    }
    loadPrograms();
  }, []);

  const categories = ['All', 'Education', 'Leadership', 'Health', 'Empowerment', 'Digital Skills'];

  const filteredPrograms = selectedCategory === 'All' 
    ? programs 
    : programs.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase() || p.title.toLowerCase().includes(selectedCategory.toLowerCase()));

  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-8 h-8 text-gold" />;
      case 'Users': return <Users className="w-8 h-8 text-gold" />;
      case 'HeartPulse': return <HeartPulse className="w-8 h-8 text-gold" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-gold" />;
      case 'Monitor': return <Monitor className="w-8 h-8 text-gold" />;
      default: return <Award className="w-8 h-8 text-gold" />;
    }
  };

  return (
    <div className="w-full bg-white">
      <HeroSection
        title="Our Sustainable Programs"
        subtitle="Developing targeted, community-driven programs to create educational, economic, and health autonomy for adolescent girls and young women."
        breadcrumb={[{ label: 'Programs', href: '/programs' }]}
        bgImage="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Program Filters & Grid */}
      <section className="py-20 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-sans font-semibold text-sm transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-navy/80 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((prog, idx) => (
              <motion.div
                key={prog.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="h-52 overflow-hidden relative">
                  <img 
                    src={prog.image} 
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-white/50 shadow-sm flex items-center justify-center">
                    {getProgramIcon(prog.icon)}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="font-sans font-bold text-[10px] text-gold uppercase tracking-wider mb-2">
                    {prog.category}
                  </span>
                  <h3 className="font-display font-bold text-xl text-navy tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {prog.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-600 leading-relaxed mb-8 flex-grow">
                    {prog.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <button
                      onClick={() => setActiveDetailProgram(prog)}
                      className="inline-flex items-center gap-1.5 font-sans font-bold text-xs text-primary hover:text-primary-hover cursor-pointer"
                    >
                      Read full roadmap
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    
                    <Link
                      href="/donate"
                      className="p-2 rounded-lg bg-slate-50 hover:bg-gold/10 text-slate-400 hover:text-gold transition-colors"
                      title="Support this project"
                    >
                      <Heart className="w-4 h-4 fill-transparent hover:fill-gold" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {activeDetailProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDetailProgram(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto">
                {/* Hero banner image */}
                <div className="h-64 sm:h-80 w-full relative">
                  <img 
                    src={activeDetailProgram.image} 
                    alt={activeDetailProgram.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent flex items-end p-8">
                    <div className="text-white">
                      <span className="font-sans font-bold text-xs uppercase tracking-widest text-gold block mb-2">
                        {activeDetailProgram.category}
                      </span>
                      <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white leading-tight">
                        {activeDetailProgram.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-8 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                      {getProgramIcon(activeDetailProgram.icon)}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-sans font-bold text-slate-400 block">Initiative Focus</span>
                      <span className="font-sans font-semibold text-sm text-navy">{activeDetailProgram.category} Development</span>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-slate-500 italic border-l-4 border-gold pl-4 leading-relaxed">
                    {activeDetailProgram.description}
                  </p>

                  <div className="font-sans text-sm text-slate-700 leading-relaxed space-y-4">
                    {activeDetailProgram.content.split('\n\n').map((para: string, i: number) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  <hr className="border-slate-100 my-4" />

                  {/* Actions inside modal */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                      href="/donate"
                      onClick={() => setActiveDetailProgram(null)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans font-bold bg-gold text-white px-6 py-3.5 rounded-xl border border-gold hover:bg-gold-hover shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      Sponsor this Initiative
                    </Link>
                    <Link
                      href="/volunteer"
                      onClick={() => setActiveDetailProgram(null)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans font-semibold border border-primary/20 hover:bg-primary/5 text-primary px-6 py-3.5 rounded-xl transition-all duration-300"
                    >
                      Volunteer for this Program
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
