'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { Play, Eye, X, Image as ImageIcon, Film } from 'lucide-react';

import HeroSection from '@/components/common/HeroSection';

export default function GalleryPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PHOTO' | 'VIDEO'>('ALL');
  const [lightboxItem, setLightboxItem] = useState<any | null>(null);

  useEffect(() => {
    async function loadGallery() {
      const data = await api.getGallery();
      setGallery(data);
    }
    loadGallery();
  }, []);

  const filteredItems = activeFilter === 'ALL'
    ? gallery
    : gallery.filter(item => item.type === activeFilter);

  return (
    <div className="w-full bg-white">
      <HeroSection
        title="Moments & Activities Gallery"
        subtitle="A visual documentation of our community meetings, technology workshops, and scholarship distributions."
        breadcrumb={[{ label: 'Gallery', href: '/gallery' }]}
        bgImage="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Gallery Main section */}
      <section className="py-20 bg-soft-gray min-h-[500px]">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Media Type Filter buttons */}
          <div className="flex items-center justify-center gap-3 mb-16">
            {[
              { id: 'ALL', label: 'All Media', icon: null },
              { id: 'PHOTO', label: 'Photos', icon: <ImageIcon className="w-4 h-4" /> },
              { id: 'VIDEO', label: 'Videos', icon: <Film className="w-4 h-4" /> },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id as any)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-sans font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer border ${
                  activeFilter === btn.id
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-navy/70 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden rounded-3xl aspect-[4/3] shadow-sm hover:shadow-xl cursor-pointer border border-slate-200/50 bg-white"
                  onClick={() => setLightboxItem(item)}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.caption || 'BLF Impact event'}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  
                  {/* Decorative Video Play Overlay icon */}
                  {item.type === 'VIDEO' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <div className="w-12 h-12 rounded-full bg-navy/80 text-white border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white stroke-[2]" />
                      </div>
                    </div>
                  )}

                  {/* Caption details hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                    <div className="text-white">
                      <span className="font-sans font-bold text-[10px] text-gold uppercase tracking-widest block mb-1">
                        {item.type}
                      </span>
                      <p className="font-sans text-xs text-white/80 line-clamp-2 leading-relaxed">
                        {item.caption || 'Community activity overview.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-slate-200/50 rounded-[2rem] font-sans text-sm font-medium text-slate-400">
              No gallery items found in this section.
            </div>
          )}

        </div>
      </section>

      {/* Lightbox / Media Viewer Overlay */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-navy/95 backdrop-blur-sm">
            {/* Close Button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full flex flex-col items-center gap-4 relative"
            >
              {lightboxItem.type === 'VIDEO' ? (
                // Simulated Video Player
                <div className="w-full aspect-video rounded-2xl bg-black border border-white/10 shadow-2xl relative overflow-hidden flex items-center justify-center">
                  {/* Backdrop screenshot image */}
                  <img 
                    src={lightboxItem.imageUrl} 
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.25] blur-sm pointer-events-none"
                  />
                  <div className="relative z-10 text-center flex flex-col items-center gap-4 text-white p-6 max-w-md">
                    <div className="w-16 h-16 rounded-full bg-gold hover:bg-gold-hover text-white flex items-center justify-center shadow-lg transition-transform scale-105">
                      <Play className="w-6 h-6 fill-white stroke-[2] translate-x-0.5" />
                    </div>
                    <span className="font-display font-bold text-lg">Simulating Video Playback...</span>
                    <span className="font-sans text-xs text-white/50 leading-relaxed">
                      In the live project, this executes a responsive video stream or launches an embedded Youtube/Vimeo player.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full max-h-[75vh] flex justify-center bg-black/40 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img 
                    src={lightboxItem.imageUrl} 
                    alt={lightboxItem.caption || 'BLF Impact'}
                    className="max-w-full max-h-[75vh] object-contain"
                  />
                </div>
              )}

              {/* Caption description block */}
              {lightboxItem.caption && (
                <div className="text-center text-white/85 max-w-2xl px-6 py-2">
                  <p className="font-sans text-sm sm:text-base leading-relaxed">
                    {lightboxItem.caption}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
