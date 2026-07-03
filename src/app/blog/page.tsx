'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import HeroSection from '@/components/common/HeroSection';

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function loadBlogs() {
      const data = await api.getBlogs(true);
      setBlogs(data);
    }
    loadBlogs();
  }, []);

  const categories = ['All', 'Education & Tech', 'Mentorship', 'Health & Advocacy'];

  const filteredBlogs = blogs.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || 
                            post.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-white">
      <HeroSection
        title="Latest News & Insights"
        subtitle="Read stories of change, educational toolkits, and updates from our community development workers."
        breadcrumb={[{ label: 'Blog', href: '/blog' }]}
        bgImage="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Main Blog Section */}
      <section className="py-20 bg-soft-gray min-h-[600px]">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Search and Category Filter Panel */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16 bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm">
            {/* Category selection scroll bar */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-slate-50 text-navy/70 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Input Search Box */}
            <div className="relative w-full md:w-80 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:bg-white focus-within:border-primary transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search articles..."
                className="bg-transparent border-0 ring-0 outline-none w-full p-2.5 font-sans text-sm text-navy placeholder-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Grid listing articles */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post, idx) => (
                <motion.article
                  key={post.id || idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-lg transition-all flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <span className="absolute bottom-4 left-4 bg-navy text-white text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/15">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-primary" />
                          {post.author || 'BLF'}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-navy group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-4">
                        {post.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-6">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 font-sans font-bold text-xs text-primary hover:text-primary-hover group/btn"
                      >
                        Read Article
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-slate-200/50 rounded-[2rem] font-sans text-sm font-medium text-slate-400">
              No matching articles found.
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
