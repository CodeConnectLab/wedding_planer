'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaPlus, FaMinus } from 'react-icons/fa';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

interface FAQSectionProps {
  maxItems?: number;
  showViewAllButton?: boolean;
}

const placeholderFAQs: FAQ[] = [
  { _id: '1', question: 'How far in advance should we book WAH Momentz?', answer: 'We recommend booking at least 12–18 months in advance for destination weddings and 8–12 months for local weddings. Popular dates — especially winter (November–February) — fill very quickly. That said, we do accommodate shorter timelines when possible, so please reach out and we\'ll advise on availability.', category: 'Planning', order: 1, isActive: true },
  { _id: '2', question: 'What does full wedding planning include?', answer: 'Our full planning package covers everything: initial concept development and mood boarding, vendor research and selection, budget management, timeline creation, guest coordination, décor design, rehearsal dinner planning, and complete on-day execution with a dedicated coordinator. We essentially become your extended wedding team.', category: 'Services', order: 2, isActive: true },
  { _id: '3', question: 'Do you plan weddings outside India?', answer: 'Yes — we have successfully planned weddings in Bali, Tuscany, Dubai, Thailand, Sri Lanka, Maldives, Portugal, and several other international destinations. We maintain a curated network of trusted local vendors in 15+ countries and have extensive experience managing the logistics of international weddings for Indian families.', category: 'Destination', order: 3, isActive: true },
  { _id: '4', question: 'How does pricing work?', answer: 'Our pricing is customised for every couple based on the scope of services, number of guests, destination, and wedding duration. We offer full planning, partial planning (for couples who need support with specific elements), and day-of coordination packages. Contact us to receive a bespoke proposal.', category: 'Pricing', order: 4, isActive: true },
  { _id: '5', question: 'Can you work with our existing vendors?', answer: 'Absolutely. We are happy to work with vendors you have already chosen and love. We can also complement your existing bookings with our recommendations for any gaps. Our goal is always your vision — not ours.', category: 'Planning', order: 5, isActive: true },
  { _id: '6', question: 'Do you handle multi-faith or intercultural weddings?', answer: 'Yes — our team has deep experience with Hindu, Muslim, Christian, Sikh, Jain, and inter-faith ceremonies, as well as western-style weddings and multicultural blends. We work closely with your family and religious officiants to honour every tradition with respect and precision.', category: 'Planning', order: 6, isActive: true },
];

export default function FAQSection({ maxItems = 6, showViewAllButton = true }: FAQSectionProps) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  const fetchFAQs = useCallback(async () => {
    try {
      const res = await fetch('/api/faqs');
      if (res.ok) {
        let data: FAQ[] = await res.json();
        data = data.slice(0, maxItems);
        setFaqs(data.length > 0 ? data : placeholderFAQs.slice(0, maxItems));
      } else {
        setFaqs(placeholderFAQs.slice(0, maxItems));
      }
    } catch {
      setFaqs(placeholderFAQs.slice(0, maxItems));
    } finally {
      setLoading(false);
    }
  }, [maxItems]);

  useEffect(() => { fetchFAQs(); }, [fetchFAQs]);

  const toggle = (id: string) => setOpen(open === id ? null : id);

  if (loading) {
    return (
      <section className="py-section bg-ivory">
        <div className="container-custom">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!faqs.length) return null;

  return (
    <section className="py-section bg-ivory">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Left — intro */}
          <div className="lg:sticky lg:top-28" data-aos="fade-right">
            <div className="eyebrow mb-4">Questions & Answers</div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary mb-5 leading-tight">
              Everything You Need
              <span className="font-[600] not-italic text-accent"> to Know</span>
            </h2>
            <div className="divider-gold mb-5">
              <div className="divider-gold-diamond" />
            </div>
            <p className="font-sans text-warmgray leading-relaxed mb-8">
              Planning a wedding raises a thousand questions. We've answered the most common ones below —
              and our team is always available to answer yours personally.
            </p>

            {showViewAllButton && (
              <Link href="/faqs" className="btn-gold inline-block">
                <span>View All FAQs</span>
              </Link>
            )}

            {/* Contact nudge */}
            <div className="mt-8 p-5 glass-card rounded-2xl">
              <p className="font-sans text-sm text-warmgray mb-3">
                Can't find what you're looking for?
              </p>
              <Link
                href="/contact"
                className="font-sans text-sm font-[600] text-accent hover:text-burgundy transition-colors"
              >
                Ask us directly →
              </Link>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="space-y-0" data-aos="fade-left" data-aos-delay="100">
            {faqs.map((faq, i) => (
              <div key={faq._id} className="faq-item">
                <button
                  onClick={() => toggle(faq._id)}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                  aria-expanded={open === faq._id}
                >
                  <h3 className="font-cormorant text-lg font-[600] text-primary group-hover:text-accent transition-colors duration-300 leading-snug">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mt-0.5 transition-all duration-300 ${
                    open === faq._id
                      ? 'bg-accent border-accent text-white'
                      : 'border-champagne text-warmgray group-hover:border-accent group-hover:text-accent'
                  }`}>
                    {open === faq._id
                      ? <FaMinus className="text-[10px]" />
                      : <FaChevronDown className="text-[10px] transition-transform duration-300" />
                    }
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    open === faq._id ? 'max-h-80 pb-5' : 'max-h-0'
                  }`}
                >
                  <div
                    className="font-sans text-warmgray leading-relaxed text-sm"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
