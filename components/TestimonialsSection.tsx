'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import Link from 'next/link';

export interface Testimonial {
  _id: string;
  name: string;
  text: string;
  image?: string;
  rating: number;
  serviceType?: string;
  location?: string;
}

function useVisibleCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const update = () => setCount(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return count;
}

// Published testimonials from the admin panel (rendered server-side and passed in).
export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const visible = useVisibleCount();
  const maxIndex = Math.max(0, testimonials.length - visible);

  useEffect(() => {
    if (current > maxIndex) setCurrent(0);
  }, [current, maxIndex]);

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const timer = setInterval(() => setCurrent((p) => (p >= maxIndex ? 0 : p + 1)), 5000);
    return () => clearInterval(timer);
  }, [paused, maxIndex]);

  if (!testimonials.length) return null;

  const subtitle = (t: Testimonial) =>
    [t.serviceType && t.serviceType !== 'All' ? t.serviceType : '', t.location].filter(Boolean).join(' · ');

  return (
    <section
      className="py-section bg-secondary relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-blush/20 -translate-x-32 -translate-y-32 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-champagne/15 translate-x-32 translate-y-32 pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <div className="eyebrow mb-3">Love Letters to Us</div>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary">
            Words from Our
            <span className="font-[600] not-italic text-accent"> Couples</span>
          </h2>
          <div className="divider-gold my-5 mx-auto"><div className="divider-gold-diamond" /></div>
          <p className="font-sans text-warmgray max-w-xl mx-auto">
            The greatest joy is hearing how our work made your most important day truly extraordinary.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${current * (100 / visible)}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t._id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                  <div className="testimonial-card h-full flex flex-col">
                    {/* Stars */}
                    <div className="flex gap-1 mb-5 relative z-10">
                      {Array.from({ length: 5 }, (_, j) => (
                        <FaStar key={j} className={j < t.rating ? 'text-accent' : 'text-champagne/30'} />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p className="font-cormorant text-xl font-[400] text-primary leading-relaxed flex-1 relative z-10 pt-4">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    {/* Couple info */}
                    <div className="flex items-center gap-4 mt-6 pt-5 border-t border-champagne/30 relative z-10">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-champagne/40">
                        {t.image ? (
                          <Image src={t.image} alt={t.name} width={48} height={48} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full bg-blush flex items-center justify-center text-lg font-cormorant text-accent font-[600]">
                            {t.name[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-cormorant text-lg font-[600] text-primary">{t.name}</div>
                        {subtitle(t) && (
                          <div className="font-sans text-xs text-accent uppercase tracking-wider">{subtitle(t)}</div>
                        )}
                      </div>
                      <FaQuoteRight className="ml-auto text-champagne/30 text-2xl flex-shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {maxIndex > 0 && (
            <>
              <button
                onClick={() => setCurrent((p) => (p <= 0 ? maxIndex : p - 1))}
                aria-label="Previous"
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-card border border-champagne/30 text-accent flex items-center justify-center hover:border-accent hover:bg-blush transition-all duration-300 shadow-premium z-10"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                onClick={() => setCurrent((p) => (p >= maxIndex ? 0 : p + 1))}
                aria-label="Next"
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-card border border-champagne/30 text-accent flex items-center justify-center hover:border-accent hover:bg-blush transition-all duration-300 shadow-premium z-10"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-400 ${i === current ? 'w-7 h-2 bg-accent' : 'w-2 h-2 bg-champagne hover:bg-accent/50'}`}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10" data-aos="fade-up">
          <Link href="/contact" className="btn-outline-gold inline-block">
            Start Your Wedding Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
