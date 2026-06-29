import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedPage from '@/components/AnimatedPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Destination Weddings — WAH Momentz',
  description: 'Seamlessly curated destination weddings across India and the world — Udaipur, Jaipur, Goa, Kerala, Bali, Tuscany, and beyond.',
  keywords: 'destination wedding India, destination wedding planner, palace wedding Udaipur, Goa beach wedding, international destination wedding',
};

const destinations = [
  {
    city: 'Udaipur',
    country: 'Rajasthan, India',
    desc: 'The City of Lakes — floating palace venues, zenana mehandi, and breathtaking sunsets over Lake Pichola.',
    img: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=800&fit=crop',
    tag: 'Most Popular',
  },
  {
    city: 'Jaipur',
    country: 'Rajasthan, India',
    desc: 'The Pink City — majestic forts, vibrant culture, and opulent palace hotels for royal Indian weddings.',
    img: 'https://images.unsplash.com/photo-1512100937151-dce8f0814c3d?w=600&h=800&fit=crop',
    tag: 'Royal Heritage',
  },
  {
    city: 'Goa',
    country: 'India',
    desc: 'Golden beaches, colonial churches, lush resorts — the perfect setting for intimate or lavish beach weddings.',
    img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=800&fit=crop',
    tag: 'Beach Wedding',
  },
  {
    city: 'Kerala',
    country: 'India',
    desc: 'Backwaters, houseboats, lush tea gardens, and traditional Kerala ceremonies set in paradise.',
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=800&fit=crop',
    tag: 'Tropical',
  },
  {
    city: 'Bali',
    country: 'Indonesia',
    desc: 'Temple ceremonies, terraced rice fields, and luxury clifftop villas for the most romantic international backdrop.',
    img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&h=800&fit=crop',
    tag: 'International',
  },
  {
    city: 'Tuscany',
    country: 'Italy',
    desc: 'Rolling vineyards, Renaissance villas, and world-class cuisine for a truly fairy-tale European wedding.',
    img: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&h=800&fit=crop',
    tag: 'International',
  },
];

const why = [
  { icon: '🗺️', title: 'Global Vendor Network', desc: 'Trusted relationships with premium venues, caterers, decorators, and photographers in 15+ countries.' },
  { icon: '🛡️', title: 'End-to-End Management', desc: 'Visa coordination, travel logistics, accommodation, and on-ground coordination — all handled seamlessly.' },
  { icon: '🌐', title: 'Cultural Expertise', desc: 'Deep understanding of Indian wedding traditions combined with destination-specific requirements and regulations.' },
  { icon: '💬', title: 'Dedicated Travel Concierge', desc: 'A dedicated travel expert who manages guest experiences — transfers, itineraries, welcome dinners, and excursions.' },
];

const timeline = [
  { phase: '12–18 Months', title: 'Destination Selection', desc: 'Explore venue options, shortlist destinations, and choose the perfect backdrop for your celebration.' },
  { phase: '10–12 Months', title: 'Legal & Logistics', desc: 'Venue booking, legal documentation, travel coordination for guests, and vendor confirmation.' },
  { phase: '6–10 Months', title: 'Design & Curation', desc: 'Décor concepts, wedding stationery, welcome boxes, and guest experience itinerary design.' },
  { phase: '1–3 Months', title: 'Final Preparations', desc: 'Confirmation calls, final payments, guest communication, rehearsals, and on-ground team briefings.' },
  { phase: 'Wedding Week', title: 'Flawless Execution', desc: 'Our team on-site from arrival to departure — managing every detail so you simply enjoy.' },
];

export default function DestinationWeddingsPage() {
  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-24">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=1080&fit=crop"
              alt="Destination Weddings"
              fill className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
          </div>

          <div className="container-custom relative z-10 text-white py-20">
            <div className="max-w-2xl">
              <div className="eyebrow text-champagne/70 mb-5" data-aos="fade-up">Across India & The World</div>
              <h1
                className="font-cormorant text-5xl sm:text-6xl lg:text-8xl font-[300] italic leading-tight mb-6"
                data-aos="fade-up" data-aos-delay="100"
              >
                Destination
                <br />
                <span className="font-[600] not-italic text-champagne">Weddings</span>
              </h1>
              <p
                className="font-sans text-white/75 text-lg leading-relaxed mb-8 max-w-lg"
                data-aos="fade-up" data-aos-delay="200"
              >
                Palace hotels on shimmering lakes, clifftop villas in Bali, vineyard estates in Tuscany —
                we create seamless destination weddings that transport your guests into a world of wonder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
                <Link href="/contact" className="btn-gold btn-shimmer relative">
                  <span>Plan My Destination Wedding</span>
                </Link>
                <Link href="/gallery" className="btn-outline-white">
                  View Destination Gallery
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── DESTINATIONS GRID ────────────────────────────────── */}
        <section className="py-section bg-ivory">
          <div className="container-custom">
            <div className="text-center mb-14" data-aos="fade-up">
              <div className="eyebrow mb-3">Where Dreams Unfold</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary">
                Dream <span className="font-[600] not-italic">Destinations</span>
              </h2>
              <div className="divider-gold my-5 mx-auto"><div className="divider-gold-diamond" /></div>
              <p className="font-sans text-warmgray max-w-2xl mx-auto">
                From Rajasthan's royal palaces to Tuscany's rolling vineyards — we plan weddings in the world's most breathtaking places.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest, i) => (
                <Link
                  key={dest.city}
                  href="/contact"
                  className="card-gallery group relative rounded-2xl overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="relative h-80">
                    <Image src={dest.img} alt={dest.city} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />

                    <div className="absolute top-4 right-4">
                      <span className="glass-dark rounded-full px-3 py-1 text-xs font-sans text-champagne/80 uppercase tracking-widest">
                        {dest.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="font-sans text-xs text-champagne/60 uppercase tracking-widest mb-1">{dest.country}</div>
                      <h3 className="font-cormorant text-2xl font-[700] text-white mb-2">{dest.city}</h3>
                      <p className="font-sans text-sm text-white/65 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                        {dest.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <p className="text-center font-sans text-sm text-warmgray mt-8" data-aos="fade-up">
              + 20 more destinations worldwide.{' '}
              <Link href="/contact" className="link-gold">Contact us</Link> to discuss your preferred location.
            </p>
          </div>
        </section>

        {/* ── WHY CHOOSE US ────────────────────────────────────── */}
        <section className="py-section bg-secondary">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right">
                <div className="eyebrow mb-4">Our Expertise</div>
                <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary mb-6">
                  Why Trust WAH Momentz
                  <span className="font-[600] not-italic text-accent"> Destination?</span>
                </h2>
                <p className="font-sans text-warmgray leading-relaxed mb-8">
                  Planning a wedding away from home requires a different level of expertise —
                  knowledge of local regulations, trusted vendor networks, and the ability to
                  coordinate complex logistics across time zones and cultures.
                </p>
                <div className="space-y-5">
                  {why.map((item, i) => (
                    <div key={item.title} className="flex items-start gap-4" data-aos="fade-up" data-aos-delay={i * 80}>
                      <div className="w-12 h-12 rounded-xl bg-blush flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="font-cormorant text-lg font-[600] text-primary mb-1">{item.title}</h4>
                        <p className="font-sans text-sm text-warmgray leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative" data-aos="fade-left" data-aos-delay="100">
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-premium">
                  <Image
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1000&fit=crop"
                    alt="Destination wedding ceremony"
                    fill className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-5 text-center shadow-gold">
                  <div className="font-cormorant text-3xl font-[700] text-accent">15+</div>
                  <div className="font-sans text-xs text-warmgray uppercase tracking-widest mt-1">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PLANNING TIMELINE ────────────────────────────────── */}
        <section className="py-section bg-primary">
          <div className="container-custom">
            <div className="text-center mb-14" data-aos="fade-up">
              <div className="eyebrow text-champagne/70 mb-3">Planning Process</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-white">
                The Destination
                <span className="font-[600] not-italic text-champagne"> Wedding Journey</span>
              </h2>
            </div>

            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div
                  key={item.phase}
                  className="flex gap-6 sm:gap-10 items-start group"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-accent/40 flex items-center justify-center text-xs font-sans font-[700] text-accent group-hover:border-accent transition-colors flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px h-12 bg-gradient-to-b from-accent/30 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="font-sans text-xs text-accent uppercase tracking-widest mb-1">{item.phase}</div>
                    <h4 className="font-cormorant text-xl font-[600] text-champagne mb-2">{item.title}</h4>
                    <p className="font-sans text-sm text-warmgray leading-relaxed max-w-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-20 bg-ivory text-center">
          <div className="container-custom" data-aos="fade-up">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary mb-5">
              Where in the World Shall
              <span className="font-[600] not-italic text-accent"> We Begin?</span>
            </h2>
            <p className="font-sans text-warmgray max-w-xl mx-auto mb-8">
              Tell us your dream destination and we'll show you exactly what's possible.
            </p>
            <Link href="/contact" className="btn-gold inline-block">
              <span>Request a Destination Proposal</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </AnimatedPage>
  );
}
