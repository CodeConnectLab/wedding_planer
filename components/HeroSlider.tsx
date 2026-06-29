'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Slide {
  _id: string;
  image: string;
  title: string;
  subtitle: string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent]   = useState(0);
  const [paused, setPaused]     = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [current, paused, slides.length, goTo]);

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  if (!slides?.length) return null;

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className={`object-cover transition-transform duration-[8000ms] ease-out ${
              idx === current ? 'scale-105' : 'scale-100'
            }`}
            priority={idx === 0}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-primary/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom pt-24 pb-20">
              <div className="max-w-3xl text-white">
                {/* Eyebrow */}
                <div
                  className={`flex items-center gap-3 mb-6 transition-all duration-700 ${idx === current ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8'}`}
                >
                  <div className="h-px w-10 bg-accent" />
                  <span className="eyebrow text-champagne/80">Luxury Wedding Planners</span>
                </div>

                {/* Headline */}
                <h2
                  className={`font-cormorant text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-[300] italic leading-[1.05] mb-6 transition-all duration-700 ${idx === current ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'}`}
                >
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p
                  className={`font-sans text-lg text-white/75 max-w-xl leading-relaxed mb-10 transition-all duration-700 ${idx === current ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-8'}`}
                >
                  {slide.subtitle}
                </p>

                {/* CTAs */}
                <div
                  className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${idx === current ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-8'}`}
                >
                  <Link href="/contact" className="btn-gold btn-shimmer relative">
                    <span>Plan Your Wedding</span>
                  </Link>
                  <Link href="/gallery" className="btn-outline-white">
                    View Our Weddings
                  </Link>
                </div>

                {/* Quick stats */}
                <div
                  className={`flex flex-wrap gap-8 mt-14 transition-all duration-700 ${idx === current ? 'opacity-100 translate-y-0 delay-[900ms]' : 'opacity-0 translate-y-8'}`}
                >
                  {[['500+', 'Weddings'], ['18+', 'Years'], ['25+', 'Cities']].map(([num, label]) => (
                    <div key={label}>
                      <div className="font-cormorant text-3xl font-[600] text-champagne leading-none">{num}</div>
                      <div className="font-sans text-xs text-white/55 uppercase tracking-wider mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Side Nav Dots */}
      <div className="hidden lg:flex absolute left-7 top-1/2 -translate-y-1/2 flex-col gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`rounded-full transition-all duration-400 ${
              idx === current
                ? 'w-2.5 h-8 bg-accent'
                : 'w-2.5 h-2.5 bg-white/35 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-dark border border-white/15 text-white flex items-center justify-center hover:border-accent/50 transition-all duration-300 hover:scale-105 hidden lg:flex"
      >
        <FaChevronLeft className="text-sm" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-dark border border-white/15 text-white flex items-center justify-center hover:border-accent/50 transition-all duration-300 hover:scale-105 hidden lg:flex"
      >
        <FaChevronRight className="text-sm" />
      </button>

      {/* Bottom indicators (mobile) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 lg:hidden">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`rounded-full transition-all duration-400 ${
              idx === current ? 'w-7 h-2 bg-accent' : 'w-2 h-2 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <div
          key={current}
          className="h-full bg-accent"
          style={{ animation: paused ? 'none' : 'progressBar 5.5s linear forwards' }}
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent z-10 pointer-events-none" />

      <style jsx>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
