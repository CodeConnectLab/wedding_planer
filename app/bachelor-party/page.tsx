import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedPage from '@/components/AnimatedPage';
import { Metadata } from 'next';
import { img } from '@/lib/images';
import { getSiteSettings } from '@/lib/data';
import { whatsappHref } from '@/lib/siteDefaults';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Bachelor & Bachelorette Party Planning — WAH Momentz',
  description: 'Unforgettable bachelor and bachelorette party planning — from intimate gatherings to vibrant celebrations tailored perfectly for the guest of honour.',
  keywords: 'bachelor party India, bachelorette party planner, pre-wedding party, bachelor party Delhi, bachelorette planning India',
};

const packages = [
  {
    name: 'The Classic Night',
    price: 'From ₹50,000',
    desc: 'A perfectly crafted evening with premium venue booking, curated décor, personalised cocktail menu, and on-site coordination.',
    features: ['Premium venue selection', 'Personalised décor theme', 'Cocktail bar setup', 'On-site coordinator', 'Photography coverage', 'Party favours'],
    accent: false,
  },
  {
    name: 'The Grand Affair',
    price: 'From ₹1,20,000',
    desc: 'A full-scale celebration — think surprise reveals, entertainment acts, celebrity appearances, custom itineraries, and flawless execution.',
    features: ['Everything in Classic +', 'Live entertainment', 'Custom party itinerary', 'Surprise elements', 'Personalised gift boxes', 'Videography'],
    accent: true,
  },
  {
    name: 'The Destination Escape',
    price: 'Custom Quote',
    desc: 'Multi-day destination experiences — Goa, Manali, Bali, Dubai — with complete travel management, activities, and private celebrations.',
    features: ['Full travel management', 'Multi-day itinerary', 'Private villa/resort', 'Adventure activities', 'Curated experiences', 'Dedicated trip manager'],
    accent: false,
  },
];

const experiences = [
  { icon: '🏝️', title: 'Beach Escape', desc: 'Goa, Pondicherry, Andamans — sun, sand, and unforgettable memories.' },
  { icon: '🌄', title: 'Mountain Adventure', desc: 'Manali, Kasol, Rishikesh — thrills and bonding in the mountains.' },
  { icon: '🍸', title: 'Rooftop Night Out', desc: 'Delhi, Mumbai, Bangalore — curated city nights at exclusive venues.' },
  { icon: '✈️', title: 'International Getaway', desc: 'Bali, Dubai, Bangkok, Europe — the ultimate pre-wedding escape.' },
  { icon: '🏄', title: 'Adventure Sports', desc: 'Bungee jumping, river rafting, paragliding — for the thrill-seekers.' },
  { icon: '🍳', title: 'Private Chef Experience', desc: 'Intimate dinner parties with curated menus and cocktail classes.' },
];

export default async function BachelorPartyPage() {
  const settings = await getSiteSettings();
  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-24">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-[75vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={img('party-sparklers-beach', 2000)}
              alt="Bachelor Party"
              fill className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-primary/65" />
          </div>

          <div className="container-custom relative z-10 text-white py-20">
            <div className="max-w-2xl">
              <div className="eyebrow text-champagne/70 mb-5" data-aos="fade-up">Pre-Wedding Celebrations</div>
              <h1
                className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-[300] italic leading-tight mb-6"
                data-aos="fade-up" data-aos-delay="100"
              >
                Bachelor &
                <br />
                <span className="font-[600] not-italic text-champagne">Bachelorette Parties</span>
              </h1>
              <p
                className="font-sans text-white/75 text-lg leading-relaxed mb-8"
                data-aos="fade-up" data-aos-delay="200"
              >
                A chance for the guest of honour to celebrate with their closest circle — saying a beautiful
                farewell to the single life and stepping into a new chapter with joy, laughter, and love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
                <Link href="/contact" className="btn-gold btn-shimmer relative">
                  <span>Plan My Party</span>
                </Link>
                <a
                  href={whatsappHref(settings.whatsappNumber, "Hi, I'd like to plan a bachelor party.")}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-outline-white flex items-center justify-center gap-2"
                >
                  <span>💬</span> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── PHILOSOPHY ───────────────────────────────────────── */}
        <section className="py-section bg-ivory">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right">
                <div className="eyebrow mb-4">Our Approach</div>
                <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary mb-6">
                  Tailored to the
                  <span className="font-[600] not-italic text-accent"> Guest of Honour</span>
                </h2>
                <p className="font-sans text-warmgray leading-relaxed mb-5">
                  Bachelor or bachelorette parties are a chance for the groom or bride-to-be to get together
                  with all of their closest friends and relatives — to say a heartfelt goodbye to the single
                  life and step joyfully into a new chapter with their chosen partner.
                </p>
                <p className="font-sans text-warmgray leading-relaxed mb-5">
                  Any bachelor party can be extraordinary, whether you prefer traditional celebrations
                  or something entirely unique. Some prefer a relaxed hangout, others crave vibrant nightlife
                  or an adventurous escape. Bachelor and bachelorette parties don't always need stereotypical
                  entertainment to be memorable — they simply need to be <em className="font-cormorant text-xl text-accent not-italic">authentically you</em>.
                </p>
                <p className="font-sans text-warmgray leading-relaxed mb-8">
                  Share your vision with us and our team will craft a celebration tailored perfectly for you —
                  one that creates memories you and your friends will talk about for decades.
                </p>
                <Link href="/contact" className="btn-gold inline-block">
                  <span>Tell Us Your Vision</span>
                </Link>
              </div>
              <div className="relative" data-aos="fade-left" data-aos-delay="100">
                <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-premium">
                  <Image
                    src={img('punjabi-groomsmen', 1000)}
                    alt="Friends celebrating"
                    fill className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCES ──────────────────────────────────────── */}
        <section className="py-section bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-14" data-aos="fade-up">
              <div className="eyebrow mb-3">Party Styles</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary">
                Choose Your <span className="font-[600] not-italic">Adventure</span>
              </h2>
              <div className="divider-gold my-5 mx-auto"><div className="divider-gold-diamond" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((exp, i) => (
                <div
                  key={exp.title}
                  className="service-card p-8 group"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{exp.icon}</div>
                  <h3 className="font-cormorant text-xl font-[600] text-primary mb-2">{exp.title}</h3>
                  <p className="font-sans text-sm text-warmgray leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ─────────────────────────────────────────── */}
        <section className="py-section bg-primary">
          <div className="container-custom">
            <div className="text-center mb-14" data-aos="fade-up">
              <div className="eyebrow text-champagne/70 mb-3">Packages</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-white">
                Find Your <span className="font-[600] not-italic text-champagne">Perfect Package</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg, i) => (
                <div
                  key={pkg.name}
                  className={`rounded-3xl p-8 ${pkg.accent
                    ? 'bg-accent text-white shadow-gold-lg'
                    : 'bg-white/5 border border-white/10 text-white hover:border-accent/30'
                  } transition-all duration-400`}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <h3 className={`font-cormorant text-2xl font-[600] mb-1 ${pkg.accent ? 'text-white' : 'text-champagne'}`}>
                    {pkg.name}
                  </h3>
                  <div className={`font-sans text-sm font-[700] uppercase tracking-wider mb-4 ${pkg.accent ? 'text-white/80' : 'text-accent'}`}>
                    {pkg.price}
                  </div>
                  <p className={`font-sans text-sm leading-relaxed mb-6 ${pkg.accent ? 'text-white/80' : 'text-warmgray'}`}>
                    {pkg.desc}
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 font-sans text-sm">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${pkg.accent ? 'bg-white/20 text-white' : 'bg-accent/20 text-accent'}`}>✓</span>
                        <span className={pkg.accent ? 'text-white/85' : 'text-warmgray'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`block text-center py-3 rounded-full font-sans font-[600] text-sm uppercase tracking-wider transition-all duration-300 ${
                      pkg.accent
                        ? 'bg-white text-accent hover:bg-ivory'
                        : 'border border-accent text-accent hover:bg-accent hover:text-white'
                    }`}
                  >
                    Book This Package
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY STRIP ────────────────────────────────────── */}
        <section className="py-section bg-ivory">
          <div className="container-custom">
            <div className="text-center mb-10" data-aos="fade-up">
              <h2 className="font-cormorant text-4xl font-[300] italic text-primary">
                Moments Worth <span className="font-[600] not-italic">Celebrating</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                img('party-sparklers', 600),
                img('party-toast', 600),
                img('party-confetti', 600),
                img('baraat-dance', 600),
              ].map((src, i) => (
                <div
                  key={i}
                  className="card-gallery relative aspect-square rounded-2xl overflow-hidden"
                  data-aos="zoom-in"
                  data-aos-delay={i * 80}
                >
                  <Image src={src} alt={`Party memory ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-20 bg-secondary text-center">
          <div className="container-custom" data-aos="fade-up">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary mb-5">
              Ready to Plan an
              <span className="font-[600] not-italic text-accent"> Unforgettable Party?</span>
            </h2>
            <p className="font-sans text-warmgray max-w-xl mx-auto mb-8">
              Share your guest of honour's personality, preferences, and wildest dreams — we'll handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold inline-block">
                <span>Start Planning</span>
              </Link>
              <Link href="/services" className="btn-outline-gold inline-block">
                View All Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AnimatedPage>
  );
}
