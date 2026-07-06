'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { ShieldCheck, HeartPulse, GraduationCap, Users, HeartHandshake } from 'lucide-react';

import HeroSection from '@/components/common/HeroSection';

export default function AboutPage() {
  const [settings, setSettings] = useState<any>({});
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const fetchedSettings = await api.getSettings();
      const fetchedPartners = await api.getPartners();
      setSettings(fetchedSettings);
      setPartners(fetchedPartners);
    }
    loadData();
  }, []);

  const coreValues = [
    {
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      title: 'Empowerment',
      desc: 'We foster self-determination in young women, equipping them with tools to define their own futures.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: 'Transparency',
      desc: 'We hold ourselves accountable to our donors, beneficiaries, and communities, publishing clear reports.',
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-primary" />,
      title: 'Resilience',
      desc: 'We develop long-term health and education structures that help communities withstand systemic shocks.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-primary" />,
      title: 'Inclusivity',
      desc: 'We support all adolescent girls, regardless of ethnicity, religion, or background, creating safe communities.',
    },
  ];

  const leadership = [
    {
      name: 'Dr. Evelyn Brokline',
      role: 'Founder & Board President',
      bio: 'Evelyn holds a PhD in International Development from Harvard and spent 15 years directing youth education programs at the UN before launching BLF.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Amina Al-Jamil',
      role: 'Executive Director',
      bio: 'Amina oversees global operations. Previously, she directed community healthcare networks in East Africa and is an advocate for menstrual hygiene equity.',
      image: 'https://res.cloudinary.com/duweg8kpv/image/upload/v1781488829/85678_w0jtpk.jpg',
    },
    {
      name: 'Marcus Vance',
      role: 'Director of Programs',
      bio: 'Marcus manages educational scholarships and vocational labs. He has a background in public administration and focuses on local grassroots scaling.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const timelineEvents = [
    { year: '2018', title: 'Foundation Launch', desc: 'Brokline Foundation starts its first mentorship circle for 15 adolescent girls in Boston.' },
    { year: '2020', title: 'STEM & Tech Expansion', desc: 'Opened our first Tech & Digital Skills Lab, providing laptops and coding classes to 100+ girls.' },
    { year: '2022', title: 'Health Outreach Kickoff', desc: 'Initiated period hygiene distributions and comprehensive health seminars, lowering school dropout rates.' },
    { year: '2024', title: 'Going Global', desc: 'Secured international grants, extending operations to support over 5,000 girls in under-resourced hubs.' },
  ];

  return (
    <div className="w-full bg-white">
      {/* Reusable Premium Hero Section */}
      <HeroSection
        title="About Brokline Foundation"
        subtitle="Discover our journey, core values, mission, and the dedicated team driving positive, sustainable change."
        breadcrumb={[{ label: 'About Us', href: '/about' }]}
        bgImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Section 1: Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">OUR ORIGINS</span>
            <h2 className="font-display font-extrabold text-3xl text-navy">Building Bridges of Opportunity</h2>
            <p className="font-sans text-slate-600 text-sm leading-relaxed">
              {settings.about_story || 'Founded in 2018, Brokline Foundation began with a simple observation: local development efforts are exponentially more successful when adolescent girls are given equal access to leadership and educational tools. What started as a local mentorship circle in Massachusetts has grown into an international non-profit impacting thousands of young women worldwide through targeted training, digital literacy, and community-led health programs.'}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" 
              alt="Community group learning"
              className="rounded-3xl shadow-lg border border-slate-100 object-cover aspect-[4/3] w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Mission & Vision */}
      <section className="py-20 bg-soft-gray border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl border border-slate-200/50 shadow-sm flex flex-col gap-4"
          >
            <span className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center font-display font-black text-primary text-xl shadow-inner">M</span>
            <h3 className="font-display font-bold text-2xl text-navy">Our Mission</h3>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              {settings.about_mission || 'To empower adolescent girls and young women while building healthier, more resilient communities through sustainable, locally-driven development initiatives.'}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-10 rounded-3xl border border-slate-200/50 shadow-sm flex flex-col gap-4"
          >
            <span className="w-12 h-12 rounded-2xl bg-gold/5 flex items-center justify-center font-display font-black text-gold text-xl shadow-inner">V</span>
            <h3 className="font-display font-bold text-2xl text-navy">Our Vision</h3>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              {settings.about_vision || 'A world where every young woman has the agency, education, and opportunity to lead, innovate, and thrive within a supportive, healthy community.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">HOW WE OPERATE</span>
            <h2 className="font-display font-extrabold text-3xl text-navy mt-3">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-soft-gray p-8 rounded-3xl border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shadow-inner">
                  {val.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-navy">{val.title}</h3>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Timeline */}
      <section className="py-24 bg-soft-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">OUR PATHWAY</span>
            <h2 className="font-display font-extrabold text-3xl text-navy mt-3">Milestones of Progress</h2>
          </div>

          <div className="relative border-l-2 border-slate-200 max-w-3xl mx-auto pl-8 flex flex-col gap-12">
            {timelineEvents.map((ev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Year dot connector */}
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-gold shadow-sm" />
                <span className="font-display font-extrabold text-xl text-gold">{ev.year}</span>
                <h3 className="font-display font-bold text-lg text-navy mt-1 mb-2">{ev.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">{ev.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Leadership Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">OUR LEADERS</span>
            <h2 className="font-display font-extrabold text-3xl text-navy mt-3">Meet the Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {leadership.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col items-center text-center gap-4 bg-soft-gray p-6 rounded-3xl border border-slate-100 hover:shadow-lg transition-all"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-slate-200 group-hover:border-gold transition-colors duration-300 shadow-md"
                />
                <div>
                  <h3 className="font-display font-bold text-lg text-navy leading-tight">{member.name}</h3>
                  <span className="font-sans text-xs text-gold uppercase tracking-wider font-semibold block mt-1">
                    {member.role}
                  </span>
                </div>
                <p className="font-sans text-xs text-slate-500 leading-relaxed px-4">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
