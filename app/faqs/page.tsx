'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FaChevronDown, FaMinus } from 'react-icons/fa';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

const placeholderFAQs: FAQ[] = [
  { _id: '1', question: 'How far in advance should we book WAH Momentz?', answer: 'We recommend booking 12–18 months in advance for destination weddings and 8–12 months for local weddings. Popular dates fill quickly — especially November through February. That said, we do take on shorter-timeline projects when availability allows.', category: 'Planning', order: 1, isActive: true },
  { _id: '2', question: 'What does your full wedding planning package include?', answer: 'Full planning covers everything from initial concept development, venue selection and booking, vendor management (décor, catering, photography, entertainment), budget tracking, timeline creation, guest management, and complete on-day coordination. You simply enjoy the day — we handle everything else.', category: 'Services', order: 2, isActive: true },
  { _id: '3', question: 'Do you plan destination weddings outside India?', answer: 'Yes — we have planned weddings in Bali, Tuscany, Dubai, Thailand, Sri Lanka, Maldives, Portugal, UK, and several other international destinations. We maintain a trusted vendor network in 15+ countries and handle all logistics including visa coordination and guest travel management.', category: 'Destination', order: 3, isActive: true },
  { _id: '4', question: 'How does your pricing work?', answer: 'Our pricing is custom-built for every couple based on scope, guest count, destination, and the services required. We offer three tiers: Full Planning, Partial Planning, and Day-of Coordination. Contact us for a personalised proposal — we\'re transparent and there are no hidden fees.', category: 'Pricing', order: 4, isActive: true },
  { _id: '5', question: 'Can we use our own vendors alongside your recommendations?', answer: 'Absolutely. We are happy to collaborate with vendors you already love. We can manage your existing bookings and fill any gaps with our curated recommendations. Our goal is your vision — not ours.', category: 'Planning', order: 5, isActive: true },
  { _id: '6', question: 'How many weddings do you take on each month?', answer: 'We deliberately limit the number of weddings we manage simultaneously to ensure every couple receives our complete attention. We typically manage 3–4 events per month, which is why early booking is essential.', category: 'About', order: 6, isActive: true },
  { _id: '7', question: 'Do you handle multi-faith or intercultural ceremonies?', answer: 'Yes — our team has deep experience with Hindu, Muslim, Christian, Sikh, Jain, and interfaith ceremonies, as well as western-style and multicultural blended celebrations. We work closely with your family and religious officiants to honour every tradition with care and precision.', category: 'Planning', order: 7, isActive: true },
  { _id: '8', question: 'What is your cancellation and rescheduling policy?', answer: 'We understand that circumstances can change. Our cancellation policy varies based on the services booked and timing. We always work with couples compassionately and are happy to discuss rescheduling options. Full details are provided in your contract.', category: 'Pricing', order: 8, isActive: true },
  { _id: '9', question: 'Can you help with just the décor, without full planning?', answer: 'Absolutely. Our Partial Planning service allows you to engage us for specific elements — just décor, just vendor management, or just on-day coordination. We\'re flexible and will design a package around exactly what you need.', category: 'Services', order: 9, isActive: true },
  { _id: '10', question: 'What happens if a vendor cancels last minute?', answer: 'With WAH Momentz, this risk is minimised by our rigorous vendor vetting process. However, if an emergency does arise, our extensive vendor network means we can rapidly source qualified replacements — often within hours. Your wedding day will not be compromised.', category: 'Planning', order: 10, isActive: true },
];

const categoryColors: Record<string, string> = {
  'Planning':    'bg-blush text-rose-brand',
  'Services':    'bg-champagne/40 text-accent',
  'Destination': 'bg-secondary text-warmgray',
  'Pricing':     'bg-ivory text-primary border border-champagne/30',
  'About':       'bg-blush/50 text-burgundy',
};

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await fetch('/api/faqs');
        if (res.ok) {
          const data: FAQ[] = await res.json();
          setFaqs(data.length > 0 ? data : placeholderFAQs);
        } else {
          setFaqs(placeholderFAQs);
        }
      } catch {
        setFaqs(placeholderFAQs);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category).filter(Boolean)))];
  const filtered = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-ivory min-h-screen">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <div className="container-custom">
            <div className="eyebrow text-champagne/70 mb-4">Questions & Answers</div>
            <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-[300] italic text-white mb-5">
              Everything You Need
              <span className="font-[600] not-italic text-champagne"> to Know</span>
            </h1>
            <div className="divider-gold my-5 mx-auto"><div className="divider-gold-diamond" /></div>
            <p className="font-sans text-warmgray max-w-xl mx-auto">
              Planning a wedding raises a thousand questions. Here are the most common ones — answered honestly and clearly.
            </p>
          </div>
        </section>

        {/* ── FILTERS ──────────────────────────────────────────── */}
        <div className="sticky top-20 z-50 bg-ivory/95 backdrop-blur-sm border-b border-champagne/20 py-4">
          <div className="container-custom">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 font-sans text-sm font-[500] px-5 py-2 rounded-full border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-accent text-white border-accent shadow-gold'
                      : 'bg-transparent text-warmgray border-champagne/40 hover:border-accent hover:text-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── FAQ LIST ─────────────────────────────────────────── */}
        <section className="py-section">
          <div className="container-custom max-w-4xl">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-16 rounded-xl" />)}
              </div>
            ) : (
              <div className="space-y-0">
                {filtered.map((faq, i) => (
                  <div key={faq._id} className="faq-item" data-aos="fade-up" data-aos-delay={i * 50}>
                    <button
                      onClick={() => setOpen(open === faq._id ? null : faq._id)}
                      className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        {faq.category && (
                          <span className={`font-sans text-xs font-[600] uppercase tracking-wider px-3 py-1 rounded-full flex-shrink-0 mt-0.5 ${categoryColors[faq.category] || 'bg-blush text-accent'}`}>
                            {faq.category}
                          </span>
                        )}
                        <h3 className="font-cormorant text-xl font-[600] text-primary group-hover:text-accent transition-colors duration-300 leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center mt-0.5 transition-all duration-300 ${
                        open === faq._id
                          ? 'bg-accent border-accent text-white'
                          : 'border-champagne text-warmgray group-hover:border-accent group-hover:text-accent'
                      }`}>
                        {open === faq._id
                          ? <FaMinus className="text-xs" />
                          : <FaChevronDown className="text-xs" />
                        }
                      </div>
                    </button>

                    <div className={`overflow-hidden transition-all duration-500 ease-out ${open === faq._id ? 'max-h-80 pb-6' : 'max-h-0'}`}>
                      <div className="pl-0 sm:pl-28">
                        <div
                          className="font-sans text-warmgray leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="font-cormorant text-3xl font-[300] italic text-warmgray">No FAQs in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── STILL HAVE QUESTIONS ─────────────────────────────── */}
        <section className="py-20 bg-secondary text-center">
          <div className="container-custom" data-aos="fade-up">
            <div className="text-4xl mb-4">💬</div>
            <h2 className="font-cormorant text-4xl font-[300] italic text-primary mb-4">
              Still Have Questions?
            </h2>
            <p className="font-sans text-warmgray max-w-md mx-auto mb-8">
              Our team is happy to answer anything you need — personally and honestly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold inline-block">
                <span>Ask Us Directly</span>
              </Link>
              <a
                href="https://wa.me/919711148175"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline-gold inline-flex items-center justify-center gap-2"
              >
                <span>💬</span> WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
