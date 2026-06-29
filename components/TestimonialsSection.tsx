'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import Link from 'next/link';

interface Testimonial {
  _id: string;
  name: string;
  text: string;
  image?: string;
  rating: number;
  serviceType: string;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
}

interface TestimonialsSectionProps {
  serviceType?: string;
  showFeaturedOnly?: boolean;
  maxItems?: number;
}

const placeholders: Testimonial[] = [
  { _id: '1', name: 'Ananya & Vikram Mehta', text: 'WAH Momentz transformed our wedding into a fairy tale. Every detail was beyond what we could have imagined — the floral mandap, the lighting, the timing of every moment. Our guests still talk about it.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face', rating: 5, serviceType: 'Destination Wedding — Udaipur', isPublished: true, isFeatured: true, order: 1 },
  { _id: '2', name: 'Priya & Arjun Kapoor', text: 'We had been dreaming of a Goa beach wedding for years. The team made it effortless — handling everything from vendor coordination to guest logistics while we simply enjoyed every precious moment.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face', rating: 5, serviceType: 'Beach Wedding — Goa', isPublished: true, isFeatured: true, order: 2 },
  { _id: '3', name: 'Kavya & Siddharth Nair', text: 'The décor team created something so beautiful I cried the moment I walked in. They understood our vision perfectly and delivered something even more special than we had imagined.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=face', rating: 5, serviceType: 'Wedding Décor — Delhi', isPublished: true, isFeatured: true, order: 3 },
  { _id: '4', name: 'Meera & Rahul Sharma', text: 'From our first consultation call to the final farewell at the reception, WAH Momentz was thoughtful, professional, and genuinely invested in making our day perfect. Truly the best investment we made.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face', rating: 5, serviceType: 'Full Wedding Planning — Jaipur', isPublished: true, isFeatured: true, order: 4 },
  { _id: '5', name: 'Deepa & Nikhil Gupta', text: 'Our palace wedding in Jodhpur was absolutely breathtaking. The team\'s relationships with the venue and local vendors made everything smooth and magical. We couldn\'t have asked for better.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face', rating: 5, serviceType: 'Palace Wedding — Jodhpur', isPublished: true, isFeatured: true, order: 5 },
  { _id: '6', name: 'Simran & Aryan Malhotra', text: 'The photography and décor teams worked in perfect harmony. Every shot was editorial quality — we have the most gorgeous wedding album. WAH Momentz sets the gold standard for luxury planning.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face', rating: 5, serviceType: 'Wedding Planning — Mumbai', isPublished: true, isFeatured: true, order: 6 },
];

export default function TestimonialsSection({
  serviceType = 'all',
  showFeaturedOnly = false,
  maxItems = 6,
}: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      let url = '/api/testimonials';
      const params = new URLSearchParams();
      if (serviceType !== 'all') params.append('serviceType', serviceType);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        let data: Testimonial[] = await res.json();
        if (showFeaturedOnly) data = data.filter((t) => t.isFeatured);
        if (maxItems) data = data.slice(0, maxItems);
        setTestimonials(data.length > 0 ? data : placeholders.slice(0, maxItems));
      } else {
        setTestimonials(placeholders.slice(0, maxItems));
      }
    } catch {
      setTestimonials(placeholders.slice(0, maxItems));
    } finally {
      setLoading(false);
    }
  }, [serviceType, showFeaturedOnly, maxItems]);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  useEffect(() => {
    if (paused || testimonials.length < 2) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(timer);
  }, [paused, testimonials.length]);

  const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;

  if (loading) {
    return (
      <section className="py-section bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <div key={i} className="skeleton h-64 rounded-2xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials.length) return null;

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
              style={{ transform: `translateX(-${current * (100 / 3)}%)` }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={`${t._id}-${i}`} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
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
                        <div className="font-sans text-xs text-accent uppercase tracking-wider">{t.serviceType}</div>
                      </div>
                      <FaQuoteRight className="ml-auto text-champagne/30 text-2xl flex-shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous"
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-card border border-champagne/30 text-accent flex items-center justify-center hover:border-accent hover:bg-blush transition-all duration-300 shadow-premium z-10"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
            aria-label="Next"
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-card border border-champagne/30 text-accent flex items-center justify-center hover:border-accent hover:bg-blush transition-all duration-300 shadow-premium z-10"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-400 ${i === current ? 'w-7 h-2 bg-accent' : 'w-2 h-2 bg-champagne hover:bg-accent/50'}`}
            />
          ))}
        </div>

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
