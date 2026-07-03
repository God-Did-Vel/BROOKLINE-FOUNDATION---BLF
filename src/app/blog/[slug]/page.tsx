'use client';

import React, { useState, useEffect, use } from 'react';
import { api } from '@/lib/api';
import { Calendar, User, ChevronLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      const data = await api.getBlogBySlug(resolvedParams.slug);
      setPost(data);
      setLoading(false);
    }
    loadPost();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="font-sans text-sm text-slate-400">Loading article...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white gap-4">
        <div className="font-display font-bold text-2xl text-navy">Article Not Found</div>
        <Link href="/blog" className="font-sans font-bold text-sm text-primary underline">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full bg-white pt-10 pb-24">
      
      {/* Header Banner Area */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs text-slate-400 hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        <span className="font-sans font-bold text-[10px] bg-primary/5 text-primary border border-primary/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          {post.category}
        </span>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-navy leading-tight mt-6 mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-100 py-4 font-sans text-xs text-slate-400 font-semibold">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              {post.author || 'BLF Advisor'}
            </span>
          </div>

          {/* Social shares */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" />
              Share:
            </span>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Share Facebook"><Facebook className="w-3.5 h-3.5" /></a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Share Twitter"><Twitter className="w-3.5 h-3.5" /></a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Share LinkedIn"><Linkedin className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>

      {/* Featured Banner Image */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-slate-100 relative">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content Body */}
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-sans text-base sm:text-lg text-slate-600 font-light leading-relaxed mb-8 italic border-l-4 border-gold pl-4">
          {post.excerpt}
        </p>

        <div className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed space-y-6">
          {post.content.split('\n\n').map((para: string, idx: number) => {
            if (para.trim()) {
              return <p key={idx}>{para.trim()}</p>;
            }
            return null;
          })}
        </div>
      </div>

    </article>
  );
}
