'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const placeholderWeddings = [
  { _id: '1', title: 'A Royal Rajput Affair', slug: '#', images: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop'], location: 'Udaipur, Rajasthan', year: 2024, clientName: 'Ananya & Vikram', weddingStyle: 'Royal Heritage' },
  { _id: '2', title: 'Garden Enchantment', slug: '#', images: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop'], location: 'Bangalore', year: 2024, clientName: 'Priya & Arjun', weddingStyle: 'Garden Wedding' },
  { _id: '3', title: 'Goa Beach Wedding', slug: '#', images: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop'], location: 'Goa', year: 2024, clientName: 'Meera & Rohit', weddingStyle: 'Destination' },
  { _id: '4', title: 'Palace of Dreams', slug: '#', images: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop'], location: 'Jaipur, Rajasthan', year: 2023, clientName: 'Kavya & Siddharth', weddingStyle: 'Royal Heritage' },
  { _id: '5', title: 'Backwaters Romance', slug: '#', images: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop'], location: 'Kerala', year: 2023, clientName: 'Nisha & Pranav', weddingStyle: 'Destination' },
  { _id: '6', title: 'Delhi Winter Wedding', slug: '#', images: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop'], location: 'New Delhi', year: 2023, clientName: 'Riya & Kabir', weddingStyle: 'Intimate' },
  { _id: '7', title: 'Himalayan Retreat', slug: '#', images: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop'], location: 'Mussoorie', year: 2023, clientName: 'Anjali & Nikhil', weddingStyle: 'Destination' },
  { _id: '8', title: 'Heritage Haveli Celebration', slug: '#', images: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop'], location: 'Jodhpur', year: 2022, clientName: 'Deepa & Rahul', weddingStyle: 'Royal Heritage' },
  { _id: '9', title: 'A Modern Mumbai Love Story', slug: '#', images: ['https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop'], location: 'Mumbai', year: 2022, clientName: 'Simran & Aryan', weddingStyle: 'Modern' },
];

const filters = ['All', 'Royal Heritage', 'Destination', 'Garden Wedding', 'Modern', 'Intimate'];

export default function GalleryPage() {
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setWeddings(data.length > 0 ? data : placeholderWeddings as any);
        } else {
          setWeddings(placeholderWeddings as any);
        }
      } catch {
        setWeddings(placeholderWeddings as any);
      } finally {
        setLoading(false);
      }
    };
    fetchWeddings();
  }, []);

  const filtered = activeFilter === 'All'
    ? weddings
    : weddings.filter((w) => w.weddingStyle === activeFilter || (w.category as any)?.name === activeFilter);

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
                      onClick={() => setLightboxImg(wedding.images?.[0])}
                      style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }}
                    >
                      <Image
                        src={wedding.images?.[0] || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop'}
                        alt={wedding.title}
                        fill className="object-cover group-hover:scale-105 transition-transform duration-700"
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

                      {/* Info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                        <div className="font-sans text-xs text-champagne/60 uppercase tracking-widest mb-1">
                          {wedding.location} · {wedding.year}
                        </div>
                        <h3 className="font-cormorant text-xl font-[600] text-white">{wedding.title}</h3>
                        <p className="font-sans text-sm text-white/70 mt-1">{wedding.clientName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-cormorant text-3xl font-[300] italic text-warmgray">No weddings found for this style.</p>
                <button onClick={() => setActiveFilter('All')} className="mt-4 link-gold font-sans text-sm">
                  View all weddings →
                </button>
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
              fill className="object-contain"
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
