'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { img } from '@/lib/images';

interface Wedding {
  _id: string;
  title: string;
  slug: string;
  images: string[];
  location: string;
  year: number;
  clientName: string;
  brideName?: string;
  groomName?: string;
  weddingStyle?: string;
  category?: { name: string };
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function GalleryPage() {
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [weddingsRes, categoriesRes] = await Promise.all([fetch('/api/projects'), fetch('/api/categories')]);
        if (weddingsRes.ok) setWeddings(await weddingsRes.json());
        if (categoriesRes.ok) setCategories(await categoriesRes.json());
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Only offer filters that actually have weddings behind them.
  const filters = ['All', ...categories.map((c) => c.name).filter((name) => weddings.some((w) => w.category?.name === name))];

  const filtered = activeFilter === 'All'
    ? weddings
    : weddings.filter((w) => w.category?.name === activeFilter);

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-ivory min-h-screen">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <div className="container-custom">
            <div className="eyebrow text-champagne/70 mb-4">Our Portfolio</div>
            <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-[300] italic text-white mb-5">
              Every Wedding,
              <span className="font-[600] not-italic text-champagne"> A Masterpiece</span>
            </h1>
            <div className="divider-gold my-5 mx-auto"><div className="divider-gold-diamond" /></div>
            <p className="font-sans text-warmgray max-w-xl mx-auto">
              A curated gallery of extraordinary celebrations we have had the privilege of crafting — each one as unique as the couple it honours.
            </p>
          </div>
        </section>

        {/* ── FILTER TABS ──────────────────────────────────────── */}
        {filters.length > 1 && (
        <div className="sticky top-20 z-50 bg-ivory/95 backdrop-blur-sm border-b border-champagne/20 py-4">
          <div className="container-custom">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`flex-shrink-0 font-sans text-sm font-[500] px-5 py-2 rounded-full border transition-all duration-300 ${
                    activeFilter === f
                      ? 'bg-accent text-white border-accent shadow-gold'
                      : 'bg-transparent text-warmgray border-champagne/40 hover:border-accent hover:text-accent'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* ── GALLERY GRID ─────────────────────────────────────── */}
        <section className="py-section">
          <div className="container-custom">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="skeleton h-80 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filtered.map((wedding, i) => (
                  <div
                    key={wedding._id}
                    className="break-inside-avoid card-gallery group mb-6"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div
                      className="relative overflow-hidden rounded-2xl cursor-pointer shadow-premium"
                      onClick={() => wedding.images?.[0] && setLightboxImg(wedding.images[0])}
                      style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }}
                    >
                      <Image
                        src={wedding.images?.[0] || img('hero-mandap', 900)}
                        alt={wedding.title}
                        fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="card-gallery-overlay" />

                      {/* Style tag */}
                      {wedding.weddingStyle && (
                        <div className="absolute top-4 left-4">
                          <span className="glass-dark rounded-full px-3 py-1 text-xs font-sans text-champagne/80 uppercase tracking-widest">
                            {wedding.weddingStyle}
                          </span>
                        </div>
                      )}

                      <Link
                        href={`/gallery/${wedding.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-4 right-4 glass-dark rounded-full px-4 py-2 text-xs font-sans text-champagne uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        View Story →
                      </Link>

                      {/* Info overlay */}
                      {/* <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                        <div className="font-sans text-xs text-champagne/60 uppercase tracking-widest mb-1">
                          {wedding.location} · {wedding.year}
                        </div>
                        <h3 className="font-cormorant text-xl font-[600] text-white">{wedding.title}</h3>
                        <p className="font-sans text-sm text-white/70 mt-1">{wedding.clientName}</p>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-cormorant text-3xl font-[300] italic text-warmgray">
                  {weddings.length === 0 ? 'Our latest celebrations will appear here soon.' : 'No weddings found for this style.'}
                </p>
                {weddings.length > 0 && (
                  <button onClick={() => setActiveFilter('All')} className="mt-4 link-gold font-sans text-sm">
                    View all weddings →
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <div className="container-custom">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-white mb-5">
              Imagine Your Story
              <span className="font-[600] not-italic text-champagne"> In Our Gallery</span>
            </h2>
            <p className="font-sans text-warmgray max-w-lg mx-auto mb-8">
              Every wedding we plan becomes a unique chapter in our portfolio. Let's start writing yours.
            </p>
            <Link href="/contact" className="btn-gold inline-block">
              <span>Plan Your Wedding</span>
            </Link>
          </div>
        </section>
      </main>

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[500] bg-primary/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImg}
              alt="Wedding photo"
              fill sizes="100vw" className="object-contain"
            />
          </div>
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white text-xl flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            ×
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}
