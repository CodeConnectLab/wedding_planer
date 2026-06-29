'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const budgetRanges = [
  'Under ₹10 Lakhs',
  '₹10–25 Lakhs',
  '₹25–50 Lakhs',
  '₹50 Lakhs–1 Crore',
  '₹1 Crore+',
  'Let us suggest',
];

const services = [
  'Full Wedding Planning',
  'Destination Wedding',
  'Wedding Décor Only',
  'Photography & Film',
  'Catering',
  'Entertainment',
  'Bachelor/Bachelorette Party',
  'Honeymoon Planning',
  'Corporate Event',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    brideName: '',
    groomName: '',
    email: '',
    phone: '',
    weddingDate: '',
    venue: '',
    guestCount: '',
    budget: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.brideName} & ${form.groomName}`,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: `Wedding Date: ${form.weddingDate}\nVenue: ${form.venue}\nGuest Count: ${form.guestCount}\nBudget: ${form.budget}\n\n${form.message}`,
        }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ brideName: '', groomName: '', email: '', phone: '', weddingDate: '', venue: '', guestCount: '', budget: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-ivory min-h-screen">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <div className="container-custom">
            <div className="eyebrow text-champagne/70 mb-4">Get In Touch</div>
            <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-[300] italic text-white mb-5">
              Let's Begin Your
              <span className="font-[600] not-italic text-champagne"> Love Story</span>
            </h1>
            <p className="font-sans text-warmgray max-w-xl mx-auto">
              Share your vision with us. Our team will respond within 24 hours with a personalised consultation proposal.
            </p>
          </div>
        </section>

        {/* ── CONTACT SECTION ──────────────────────────────────── */}
        <section className="py-section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Info sidebar */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-cormorant text-3xl font-[600] text-primary mb-3">
                    Talk to Our Team
                  </h2>
                  <p className="font-sans text-warmgray leading-relaxed">
                    Whether you're just starting to dream or ready to dive into planning — we'd love to hear from you.
                  </p>
                </div>

                {/* Contact cards */}
                <div className="space-y-4">
                  {[
                    { icon: FaPhone, label: 'Call Us', value: '+91 97111 48175', href: 'tel:+919711148175' },
                    { icon: FaEnvelope, label: 'Email Us', value: 'hello@wahmomentz.com', href: 'mailto:hello@wahmomentz.com' },
                    { icon: FaMapMarkerAlt, label: 'Our Studio', value: 'South Delhi, New Delhi — 110048', href: '#' },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-start gap-4 p-5 glass-card rounded-2xl hover:border-accent/40 transition-all duration-300 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-blush flex items-center justify-center flex-shrink-0 group-hover:bg-champagne transition-colors">
                        <Icon className="text-accent text-sm" />
                      </div>
                      <div>
                        <div className="font-sans text-xs text-warmgray uppercase tracking-wider mb-0.5">{label}</div>
                        <div className="font-sans font-[500] text-primary">{value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919711148175?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20wedding%20planning."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-700 text-white px-6 py-4 rounded-2xl hover:bg-green-800 transition-colors duration-300 group w-full justify-center"
                >
                  <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="font-sans font-[600]">Chat on WhatsApp</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/wahmomentz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-champagne/40 text-warmgray px-6 py-4 rounded-2xl hover:border-accent hover:text-accent transition-colors duration-300 group w-full justify-center"
                >
                  <FaInstagram className="text-xl" />
                  <span className="font-sans font-[500]">Follow Our Journey</span>
                </a>

                {/* Photo */}
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop"
                    alt="Our studio"
                    fill className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-cormorant text-2xl italic text-white text-center px-4">
                      "Every great love story deserves an extraordinary celebration."
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <div className="glass-card rounded-3xl p-8 sm:p-10">
                  <h3 className="font-cormorant text-2xl font-[600] text-primary mb-2">
                    Wedding Consultation Request
                  </h3>
                  <p className="font-sans text-sm text-warmgray mb-8">
                    Tell us about your dream wedding and we'll be in touch within 24 hours.
                  </p>

                  {status === 'sent' ? (
                    <div className="text-center py-16">
                      <div className="text-5xl mb-4">💌</div>
                      <h3 className="font-cormorant text-3xl font-[600] text-primary mb-3">
                        Thank You!
                      </h3>
                      <p className="font-sans text-warmgray max-w-sm mx-auto">
                        We've received your consultation request and will reach out within 24 hours to begin planning your dream wedding.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Couple names */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-sans text-xs text-warmgray uppercase tracking-wider block mb-2">
                            Bride's Name
                          </label>
                          <input
                            type="text"
                            name="brideName"
                            value={form.brideName}
                            onChange={handleChange}
                            placeholder="Ananya"
                            className="input-wedding"
                          />
                        </div>
                        <div>
                          <label className="font-sans text-xs text-warmgray uppercase tracking-wider block mb-2">
                            Groom's Name
                          </label>
                          <input
                            type="text"
                            name="groomName"
                            value={form.groomName}
                            onChange={handleChange}
                            placeholder="Vikram"
                            className="input-wedding"
                          />
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-sans text-xs text-warmgray uppercase tracking-wider block mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@email.com"
                            required
                            className="input-wedding"
                          />
                        </div>
                        <div>
                          <label className="font-sans text-xs text-warmgray uppercase tracking-wider block mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                            className="input-wedding"
                          />
                        </div>
                      </div>

                      {/* Date & Venue */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-sans text-xs text-warmgray uppercase tracking-wider block mb-2">
                            Wedding Date
                          </label>
                          <input
                            type="date"
                            name="weddingDate"
                            value={form.weddingDate}
                            onChange={handleChange}
                            className="input-wedding"
                          />
                        </div>
                        <div>
                          <label className="font-sans text-xs text-warmgray uppercase tracking-wider block mb-2">
                            Preferred Venue / City
                          </label>
                          <input
                            type="text"
                            name="venue"
                            value={form.venue}
                            onChange={handleChange}
                            placeholder="Udaipur, Jaipur, Delhi..."
                            className="input-wedding"
                          />
                        </div>
                      </div>

                      {/* Guest Count & Budget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-sans text-xs text-warmgray uppercase tracking-wider block mb-2">
                            Approximate Guest Count
                          </label>
                          <input
                            type="number"
                            name="guestCount"
                            value={form.guestCount}
                            onChange={handleChange}
                            placeholder="e.g. 300"
                            className="input-wedding"
                          />
                        </div>
                        <div>
                          <label className="font-sans text-xs text-warmgray uppercase tracking-wider block mb-2">
                            Budget Range
                          </label>
                          <select name="budget" value={form.budget} onChange={handleChange} className="input-wedding">
                            <option value="">Select budget range</option>
                            {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Service */}
                      <div>
                        <label className="font-sans text-xs text-warmgray uppercase tracking-wider block mb-2">
                          Service Required
                        </label>
                        <select name="service" value={form.service} onChange={handleChange} className="input-wedding">
                          <option value="">Select a service</option>
                          {services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="font-sans text-xs text-warmgray uppercase tracking-wider block mb-2">
                          Tell Us About Your Vision
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Describe your dream wedding — style, theme, must-haves, any special requirements..."
                          className="input-wedding resize-none"
                        />
                      </div>

                      {status === 'error' && (
                        <p className="font-sans text-sm text-red-500">
                          Something went wrong. Please try again or call us directly.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="btn-gold w-full py-4 text-base"
                      >
                        <span>{status === 'sending' ? 'Sending...' : 'Submit Consultation Request'}</span>
                      </button>

                      <p className="font-sans text-xs text-warmgray text-center">
                        We respect your privacy. Your details will never be shared with third parties.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
