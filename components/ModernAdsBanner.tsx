'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTimes, FaArrowRight } from 'react-icons/fa';

interface Ad {
  _id: string;
  image: string;
  title: string;
  description: string;
  link?: string;
  buttonText?: string;
}

const DISMISS_KEY = 'wah-offer-dismissed';

// Promotional card for the "Ads Slider" entries published from the admin panel.
// Slides in after a short delay, rotates between offers and stays dismissed for the session.
export default function ModernAdsBanner() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) return;
    } catch {}

    let timer: ReturnType<typeof setTimeout>;
    fetch('/api/ads-slider')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Ad[]) => {
        if (!Array.isArray(data) || data.length === 0) return;
        setAds(data);
        timer = setTimeout(() => setVisible(true), 4000);
      })
      .catch(() => {});
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || ads.length < 2) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % ads.length), 6000);
    return () => clearInterval(timer);
  }, [visible, ads.length]);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {}
  };

  if (ads.length === 0) return null;
  const ad = ads[current];

  return (
    <div
      role="dialog"
      aria-label={ad.title}
      className={`fixed z-[160] left-4 right-4 bottom-20 sm:left-6 sm:right-auto sm:bottom-6 sm:w-[380px] transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-ivory shadow-premium-lg border border-champagne/50">
        <button
          onClick={dismiss}
          aria-label="Close offer"
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-primary/60 backdrop-blur text-white flex items-center justify-center hover:bg-primary transition-colors"
        >
          <FaTimes className="text-xs" />
        </button>

        <div className="relative h-28 sm:h-40">
          <Image key={ad._id} src={ad.image} alt={ad.title} fill sizes="380px" className="object-cover animate-fade-in-up" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
          <span className="absolute top-3 left-3 rounded-full bg-accent text-white text-[10px] font-sans font-[600] uppercase tracking-[0.2em] px-3 py-1">
            Special Offer
          </span>
          <h3 className="absolute bottom-3 left-4 right-4 font-cormorant text-2xl font-[600] text-white leading-tight">
            {ad.title}
          </h3>
        </div>

        <div className="p-4 pt-3">
          <p className="font-sans text-sm text-warmgray leading-relaxed line-clamp-2 sm:line-clamp-3">{ad.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <Link
              href={ad.link || '/contact'}
              onClick={dismiss}
              className="btn-gold text-xs py-2.5 px-5 inline-flex items-center gap-2"
            >
              <span>{ad.buttonText || 'Enquire Now'}</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
            {ads.length > 1 && (
              <div className="flex gap-1.5">
                {ads.map((a, i) => (
                  <button
                    key={a._id}
                    onClick={() => setCurrent(i)}
                    aria-label={`Offer ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === current ? 'w-5 bg-accent' : 'w-1.5 bg-champagne'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
