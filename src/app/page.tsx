"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import {
  GraduationCap,
  Users,
  HeartPulse,
  Briefcase,
  Monitor,
  ArrowRight,
  Heart,
  Award,
  ShieldCheck,
  HeartHandshake,
  Eye,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  UserPlus,
} from "lucide-react";

// Count-up helper component for Section 3 (Impact Stats)
function StatCounter({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const isPlus = value.includes("+");

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const end = numericValue;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 30);

    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center justify-center p-6 bg-navy/40 backdrop-blur-md rounded-2xl border border-white/10 text-center shadow-lg"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-gold tracking-tight mb-2">
        {count.toLocaleString()}
        {isPlus && "+"}
      </div>
      <div className="text-xs sm:text-sm font-sans font-medium text-white/70 uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [settings, setSettings] = useState<any>({});
  const [programs, setPrograms] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const fetchedSettings = await api.getSettings();
      const fetchedPrograms = await api.getPrograms();
      const fetchedStories = await api.getStories();
      const fetchedEvents = await api.getEvents();
      const fetchedBlogs = await api.getBlogs(true);
      const fetchedPartners = await api.getPartners();
      const fetchedGallery = await api.getGallery();

      setSettings(fetchedSettings);
      setPrograms(fetchedPrograms);
      setStories(fetchedStories);
      // Filter next 2 upcoming events
      const now = new Date();
      const upcoming = fetchedEvents
        .filter((e) => new Date(e.date) >= now)
        .slice(0, 2);
      setEvents(upcoming.length > 0 ? upcoming : fetchedEvents.slice(0, 2));
      setBlogs(fetchedBlogs.slice(0, 3));
      setPartners(fetchedPartners);
      setGallery(fetchedGallery.slice(0, 6));
    }
    loadData();
  }, []);

  const handleNextStory = () => {
    if (stories.length === 0) return;
    setStoryIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrevStory = () => {
    if (stories.length === 0) return;
    setStoryIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  // Map icon name string to Lucide component
  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-gold" />;
      case "Users":
        return <Users className="w-6 h-6 text-gold" />;
      case "HeartPulse":
        return <HeartPulse className="w-6 h-6 text-gold" />;
      case "Briefcase":
        return <Briefcase className="w-6 h-6 text-gold" />;
      case "Monitor":
        return <Monitor className="w-6 h-6 text-gold" />;
      default:
        return <Award className="w-6 h-6 text-gold" />;
    }
  };

  return (
    <div className="w-full bg-white relative">
      {/* SECTION 1 — HERO BANNER */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-navy">
        {/* Cinematic Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-pulse-slow pointer-events-none"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/duweg8kpv/image/upload/v1783043897/Young-Girls_thgfsq.jpg')",
            filter: "brightness(0.3)",
          }}
        />
        {/* Soft Radial Gold/Blue Gradient Layer */}
        <div className="absolute inset-0 bg-radial-blur pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
          >
            <span className="w-1 h-1 rounded-full bg-gold animate-ping" />
            <span className="font-sans text-xs uppercase tracking-widest text-gold">
              Brookline Foundation - blf
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-3xl md:text-4xl tracking-tight leading-tight max-w-3xl mb-6"
          >
            {settings.home_hero_title ||
              "Building Strong Girls. Transforming Communities. Creating Sustainable Impact."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-base sm:text-xs md:text-lg text-white/80 max-w-1xl mb-12 leading-relaxed font-light"
          >
            {settings.home_hero_subtitle ||
              "Empowering adolescent girls and young women through quality education, leadership mentorship, and sustainable economic initiatives."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <Link
              href="/donate"
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans font-bold bg-gold text-white px-8 py-4 rounded-xl border border-gold hover:bg-gold-hover hover:border-gold-hover shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white" />
              Donate Now
            </Link>
            <Link
              href="/programs"
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans font-bold border border-white/30 hover:border-white text-white bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Our Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — ABOUT BLF */}
      <section className="py-24 bg-soft-gray relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Styled border outline frame */}
            <div className="absolute -top-4 -left-4 w-1/2 h-1/2 border-t-2 border-l-2 border-gold rounded-tl-3xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 border-b-2 border-r-2 border-primary rounded-br-3xl pointer-events-none" />

            <img
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800"
              alt="Brookline girls learning together"
              className="rounded-3xl shadow-xl border border-slate-200 relative z-10 w-full object-cover aspect-[4/3]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
              WHO WE ARE
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight leading-tight">
              {settings.home_about_title ||
                "Empowering Girls, Strengthening Societies"}
            </h2>
            <p className="font-sans text-slate-600 text-base leading-relaxed">
              {settings.home_about_text ||
                "At Brookline Foundation, we believe that when you empower a girl, you lift an entire community. We provide under-resourced adolescent girls and young women with the resources, education, mentorship, and economic tools required to break the cycle of poverty and lead self-determined lives."}
            </p>
            <div className="mt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans font-bold text-sm text-primary hover:text-primary-hover group"
              >
                Learn More About Our Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — OUR IMPACT */}
      <section className="relative py-20 bg-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200')",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-gold">
              MAKING A DIFFERENCE
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-3">
              Our Footprint & Impact
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <StatCounter value="10000" label="Girls Empowered" index={0} />
            <StatCounter value="50" label="Communities Reached" index={1} />
            <StatCounter value="120" label="Projects Completed" index={2} />
            <StatCounter value="500" label="Active Volunteers" index={3} />
            <StatCounter value="20" label="Sponsors & Partners" index={4} />
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURED PROGRAMS */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-3">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
                WHAT WE DO
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight">
                Our Core Programs
              </h2>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 font-sans font-bold text-sm bg-primary/5 text-primary hover:bg-primary/10 px-5 py-2.5 rounded-xl transition-all duration-300"
            >
              View All Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 3).map((prog, idx) => (
              <motion.div
                key={prog.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col h-full bg-soft-gray rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2 rounded-xl border border-white/50 shadow-sm flex items-center justify-center">
                    {getProgramIcon(prog.icon)}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="font-sans font-bold text-[10px] text-gold uppercase tracking-wider mb-2">
                    {prog.category}
                  </span>
                  <h3 className="font-display font-bold text-xl text-navy tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {prog.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                    {prog.description}
                  </p>
                  <Link
                    href={`/programs#${prog.slug}`}
                    className="inline-flex items-center gap-1.5 font-sans font-bold text-xs text-primary hover:text-primary-hover group/link"
                  >
                    Read Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY BROOKLINE FOUNDATION? */}
      <section className="py-24 bg-soft-gray relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
              WHY BLF?
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight mt-3">
              What Makes Us Unique
            </h2>
            <p className="font-sans text-sm text-slate-500 mt-4 leading-relaxed">
              We stand apart through our commitment to sustainable development,
              verified transparency, and direct community ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-primary" />,
                title: "Proven Leadership",
                desc: "Led by experts and local practitioners who understand ground realities and local constraints.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "Total Transparency",
                desc: "Every dollar is accounted for with detailed annual audits and open impact reports.",
              },
              {
                icon: <HeartHandshake className="w-8 h-8 text-primary" />,
                title: "Sustainable Impact",
                desc: "We do not offer temporary aid. We construct schools, labs, and workshops to empower generations.",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Gender Focused",
                desc: "Targeted actions designed to bridge gender gaps in education, digital training, and economics.",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 text-center items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-navy">
                  {card.title}
                </h3>
                <p className="font-sans text-sm text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — SUCCESS STORIES */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        {/* Soft decorative background glows */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-gold">
              SUCCESS STORIES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-white mt-3">
              Voices of Transformation
            </h2>
          </div>

          <div className="relative min-h-[350px] flex items-center justify-center">
            {stories.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={storyIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
                >
                  <div className="md:col-span-1 flex justify-center">
                    <img
                      src={stories[storyIndex].image}
                      alt={stories[storyIndex].name}
                      className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-gold shadow-xl"
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-4">
                    <blockquote className="font-sans italic text-lg sm:text-xl text-white/90 leading-relaxed">
                      "{stories[storyIndex].quote}"
                    </blockquote>
                    <p className="font-sans text-sm text-white/70 leading-relaxed">
                      {stories[storyIndex].story}
                    </p>
                    <div className="mt-2">
                      <cite className="not-italic font-display font-bold text-base sm:text-lg text-gold leading-none">
                        {stories[storyIndex].name}
                      </cite>
                      <span className="block font-sans text-xs text-white/50 mt-1 uppercase tracking-widest">
                        {stories[storyIndex].role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="text-white/60">Loading beneficiary quotes...</div>
            )}

            {/* Slider controls */}
            {stories.length > 1 && (
              <div className="absolute bottom-[-60px] left-0 right-0 flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevStory}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center text-white transition-all cursor-pointer"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-sans text-xs tracking-widest text-white/50 font-bold">
                  {storyIndex + 1} / {stories.length}
                </span>
                <button
                  onClick={handleNextStory}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center text-white transition-all cursor-pointer"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7 — UPCOMING EVENTS */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-3">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
                COMMUNITY EVENTS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight">
                Outreach & Campaigns
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 font-sans font-bold text-sm bg-primary/5 text-primary hover:bg-primary/10 px-5 py-2.5 rounded-xl transition-all duration-300"
            >
              View Calendar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((ev, idx) => (
              <motion.div
                key={ev.id || idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group flex flex-col sm:flex-row bg-soft-gray border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative shrink-0">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {new Date(ev.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {ev.location.split(",")[0]}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-navy group-hover:text-primary transition-colors line-clamp-2">
                      {ev.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {ev.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-sans font-bold text-slate-400">
                      {ev.registered} registered
                    </span>
                    <Link
                      href={`/events`}
                      className="inline-flex items-center gap-1 font-sans font-bold text-xs text-primary group/event"
                    >
                      Register Now
                      <ArrowRight className="w-3 h-3 group-hover/event:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — LATEST NEWS & BLOG */}
      <section className="py-24 bg-soft-gray relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-3">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
                RESOURCES
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight">
                News & Insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-sans font-bold text-sm bg-primary/5 text-primary hover:bg-primary/10 px-5 py-2.5 rounded-xl transition-all duration-300"
            >
              Read More Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((post, idx) => (
              <motion.article
                key={post.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-4 left-4 bg-navy text-white text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-sans font-medium text-slate-400 block mb-2">
                    {new Date(post.createdAt || Date.now()).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" },
                    )}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-navy group-hover:text-primary transition-colors leading-snug mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-sans font-bold text-xs text-primary hover:text-primary-hover"
                  >
                    Read Article
                    <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — GALLERY PREVIEW */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-3">
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-primary">
                COMMUNITY VISUALS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy tracking-tight">
                Moments of Impact
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-sans font-bold text-sm bg-primary/5 text-primary hover:bg-primary/10 px-5 py-2.5 rounded-xl transition-all duration-300"
            >
              Explore Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {gallery.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3] shadow-sm hover:shadow-md cursor-pointer border border-slate-100"
              >
                <img
                  src={item.imageUrl}
                  alt={item.caption || "BLF Impact activity"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6 pointer-events-none">
                  <div className="text-white">
                    <p className="font-sans text-xs md:text-sm font-semibold text-gold mb-1">
                      {item.type}
                    </p>
                    <p className="font-sans text-[10px] md:text-xs text-white/80 line-clamp-2">
                      {item.caption || "Community outreach activity."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — PARTNERS & SPONSORS */}
<section className="py-16 bg-soft-gray border-y border-slate-100 overflow-hidden">
  {/* Header */}
  <div className="max-w-2xl mx-auto px-6 text-center mb-10">
    <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400 font-medium">
      Our partners & supporters
    </span>
    <h2 className="font-display text-3xl font-semibold text-navy mt-2 mb-2">
      Backed by institutions that care
    </h2>
    <p className="text-slate-500 text-sm leading-relaxed">
      Together with our partners, we extend our reach to every community that needs us.
    </p>
    <div className="flex items-center justify-center gap-3 mt-5">
      <span className="block w-12 h-px bg-slate-200" />
      <span className="block w-1.5 h-1.5 rounded-full bg-slate-300" />
      <span className="block w-12 h-px bg-slate-200" />
    </div>
  </div>

  {/* Lead sponsors */}
  <div className="max-w-4xl mx-auto px-6 mb-10">
    <p className="text-[10px] uppercase tracking-widest text-slate-400 text-center font-medium mb-5">
      Lead sponsors
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { name: "World Health Organisation", type: "Global health body",  color: "bg-blue-50 text-blue-600" },
        { name: "Gates Foundation",          type: "Philanthropy",        color: "bg-emerald-50 text-emerald-600" },
        { name: "UNICEF Health",             type: "International body",  color: "bg-violet-50 text-violet-600" },
      ].map((p) => (
        <div
          key={p.name}
          className="flex flex-col items-center gap-2.5 bg-white border border-blue-100 rounded-xl p-5 text-center hover:border-blue-300 transition-colors"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${p.color}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0v-6m0-6v.01M8 12h8" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-navy leading-tight">{p.name}</p>
          <p className="text-[11px] text-slate-400 tracking-wide uppercase">{p.type}</p>
          <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-0.5 rounded-full font-medium">
            Lead partner
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* Supporting partners marquee */}
  <div className="border-y border-slate-100 py-5 mb-10 overflow-hidden">
    <p className="text-[10px] uppercase tracking-widest text-slate-400 text-center font-medium mb-4">
      Supporting partners
    </p>
    <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
      {[...partners, ...partners].map((p, i) => (
        <div key={i} className="flex items-center gap-2 px-8 border-r border-slate-100 last:border-r-0 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
          <span className="text-[12px] font-medium text-slate-500 whitespace-nowrap">
            {p.name}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* Stats strip */}
  <div className="max-w-3xl mx-auto px-6 mb-10">
    <div className="grid grid-cols-3 divide-x divide-slate-100 border border-slate-100 rounded-xl overflow-hidden bg-white">
      {[
        { value: "40+",  label: "Partner organisations" },
        { value: "18",   label: "Countries reached" },
        { value: "$12M", label: "Funding secured" },
      ].map(({ value, label }) => (
        <div key={label} className="py-6 text-center">
          <p className="text-2xl font-semibold text-navy mb-1">{value}</p>
          <p className="text-[11px] text-slate-400 uppercase tracking-wider">{label}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Become a partner CTA */}
  <div className="text-center">
    <p className="text-sm text-slate-400 mb-3">Want to support our mission?</p>
    <a
      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg px-5 py-2.5 hover:bg-blue-50 transition-colors"
    >
      Become a partner →
    </a>
  </div>
</section>

      {/* SECTION 11 — CALL TO ACTION */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        {/* Cinematic gradient glows */}
        <div className="absolute inset-0 bg-radial-blur pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          <span className="font-sans font-bold text-xs uppercase tracking-widest text-gold mb-6">
            BECOME A PART OF THE STORY
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-6">
            Help Us Transform More Communities
          </h2>
          <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl mb-12 leading-relaxed font-light">
            Whether you choose to support financially, dedicate your skills as a
            volunteer, or partner with your organization, your engagement
            creates measurable, sustainable change.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/donate"
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans font-bold bg-gold text-navy px-8 py-4 rounded-xl border border-gold hover:bg-gold-hover hover:border-gold-hover shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-navy" />
              Donate Now
            </Link>
            <Link
              href="/volunteer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans font-semibold border border-white/20 hover:border-white text-white bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <UserPlus className="w-5 h-5" />
              Volunteer With Us
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans font-semibold text-white/80 hover:text-white px-6 py-3 transition-colors"
            >
              Contact Partnership Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
