import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedPage from '@/components/AnimatedPage';
import { Metadata } from 'next';
import { getServices, serviceHref } from '@/lib/data';
import { img, serviceImage } from '@/lib/images';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Wedding Services — WAH Momentz',
  description: 'Comprehensive luxury wedding planning services — destination weddings, décor, photography, catering, mehndi, entertainment, venues, and more.',
  keywords: 'wedding services India, destination wedding planner, wedding décor, wedding photography, wedding catering, mehndi artist',
};

// Fallback copy — the live list comes from Admin → Services.
const fallbackWeddingServices = [
  {
    icon: '✈️',
    title: 'Destination Weddings',
    desc: 'From Udaipur\'s serene lake palaces to Goa\'s sunlit shores and international locales in Bali, Tuscany, or Maldives — we create seamless destination celebrations that transport your guests into a dream.',
    highlights: ['25+ destination partnerships', 'International planning expertise', 'Full logistics management', 'Curated vendor network'],
    href: '/destination-weddings',
    img: img('venue-udaipur-palace', 900),
  },
  {
    icon: '🌸',
    title: 'Wedding Décor & Design',
    desc: 'Our award-winning design team creates breathtaking visual environments — lush floral mandaps, candlelit receptions, cinematic lighting rigs, and bespoke installations that feel uniquely yours.',
    highlights: ['Bespoke concept development', 'Floral artistry', 'Lighting design', 'Mandap & stage design'],
    href: '/services/wedding-decor',
    img: img('hero-grand-decor', 900),
  },
  {
    icon: '📸',
    title: 'Photography & Cinematography',
    desc: 'Artistic photographers and cinematic filmmakers who capture every stolen glance, tearful embrace, and joyful dance — producing timeless images and films you\'ll treasure for generations.',
    highlights: ['Pre-wedding shoots', 'Drone videography', 'Same-day edit reels', 'Fine art albums'],
    href: '/services/photography',
    img: img('couple-celebration', 900),
  },
  {
    icon: '🌿',
    title: 'Mehndi & Bridal Beauty',
    desc: 'Award-winning mehndi artists and bridal makeup teams who blend traditional artistry with contemporary techniques, ensuring the bride looks and feels absolutely radiant.',
    highlights: ['Traditional & modern mehndi', 'Bridal makeup & hairstyling', 'Bridesmaids packages', 'Trial sessions included'],
    href: '/services/mehndi',
    img: img('mehndi-closeup', 900),
  },
  {
    icon: '🍽️',
    title: 'Curated Catering',
    desc: 'A feast for the senses — from elaborate Rajasthani thalis to contemporary fusion menus and international cuisines, each dish is crafted by top chefs and presented with impeccable elegance.',
    highlights: ['Multi-cuisine expertise', 'Bar & beverage management', 'Dietary accommodations', 'Live cooking stations'],
    href: '/services/catering',
    img: img('catering-thalis', 900),
  },
  {
    icon: '🎵',
    title: 'Entertainment & Performances',
    desc: 'From classical Kathak performances to Bollywood choreography, live bands, DJ nights, and bespoke entertainment — we curate unforgettable experiences that keep guests enchanted all night.',
    highlights: ['Live bands & orchestras', 'Bollywood performers', 'Sangeet choreography', 'Celebrity management'],
    href: '/services/entertainment',
    img: img('sangeet-ladies', 900),
  },
  {
    icon: '🏛️',
    title: 'Venue Management',
    desc: 'Access to India\'s most stunning wedding venues — heritage palaces, luxury hotels, garden estates, and boutique properties — with complete logistics and vendor coordination managed by our team.',
    highlights: ['200+ curated venues', 'Palace & fort properties', 'Overseas venue access', 'Complete logistics'],
    href: '/services/venue-management',
    img: img('venue-lake-palace', 900),
  },
  {
    icon: '✉️',
    title: 'Invitation Design',
    desc: 'Bespoke wedding stationery that sets the tone before the first guest arrives — handcrafted invitations, custom monograms, digital save-the-dates, and full suite design from engagement to post-wedding.',
    highlights: ['Custom illustration', 'Luxury print materials', 'Digital invitations', 'Welcome kits design'],
    href: '/services/invitations',
    img: img('invitation-suite', 900),
  },
];

const fallbackEventServices = [
  {
    icon: '🥂',
    title: 'Bachelor & Bachelorette Parties',
    desc: 'Tailored pre-wedding celebrations — from intimate gatherings to epic adventures — designed around the personality and preferences of the guest of honour.',
    href: '/bachelor-party',
    img: img('party-sparklers-beach', 900),
  },
  {
    icon: '🌅',
    title: 'Honeymoon Planning',
    desc: 'Romantic, carefully curated honeymoon itineraries — from Maldivian overwater villas to European river cruises and intimate Himalayan retreats.',
    href: '/services/honeymoon',
    img: img('honeymoon-beach', 900),
  },
  {
    icon: '💍',
    title: 'Anniversary Celebrations',
    desc: 'Recreate the magic of your wedding day or create an entirely new celebration — intimate dinners, surprise parties, and milestone anniversary events.',
    href: '/services/anniversary',
    img: img('anniversary-dinner', 900),
  },
  {
    icon: '🎯',
    title: 'Corporate Events',
    desc: 'Large-scale corporate galas, product launches, dealer meets, road shows, and brand activations — executed with the same precision as our weddings.',
    href: '/services/corporate-events',
    img: img('event-corporate', 900),
  },
  {
    icon: '👗',
    title: 'Fashion Shows',
    desc: 'Runway events, designer showcase evenings, and fashion gala productions — we create the perfect stage for India\'s fashion moments.',
    href: '/services/fashion-shows',
    img: img('event-fashion', 900),
  },
  {
    icon: '🏆',
    title: 'Award Nights & Galas',
    desc: 'Black-tie award ceremonies, corporate recognition galas, and industry nights with full production — staging, lighting, sound, and celebrity hosting.',
    href: '/services/award-nights',
    img: img('event-gala', 900),
  },
];

type ServiceCard = { key: string; icon: string; title: string; desc: string; highlights: string[]; href: string; img: string };

const toCard = (svc: any): ServiceCard => ({
  key: svc._id,
  icon: svc.icon || '💍',
  title: svc.title,
  desc: svc.shortDescription || svc.description,
  highlights: (svc.features || []).slice(0, 4),
  href: serviceHref(svc),
  img: serviceImage(svc, 900),
});

export default async function ServicesPage() {
  const dbServices = await getServices();
  const weddingServices: ServiceCard[] = dbServices.length
    ? dbServices.filter((svc: any) => svc.category !== 'event').map(toCard)
    : fallbackWeddingServices.map((svc) => ({ ...svc, key: svc.href }));
  const eventServices: ServiceCard[] = dbServices.length
    ? dbServices.filter((svc: any) => svc.category === 'event').map(toCard)
    : fallbackEventServices.map((svc) => ({ ...svc, key: svc.href, highlights: [] as string[] }));

  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-24">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={img('ritual-ballroom', 2000)}
              alt="Wedding Services"
              fill sizes="100vw" className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-primary/65" />
          </div>
          <div className="container-custom relative z-10 text-white">
            <div className="eyebrow text-champagne/70 mb-4" data-aos="fade-up">What We Offer</div>
            <h1
              className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-[300] italic leading-tight mb-6"
              data-aos="fade-up" data-aos-delay="100"
            >
              Full-Spectrum
              <br />
              <span className="font-[600] not-italic text-champagne">Wedding Services</span>
            </h1>
            <p className="font-sans text-white/70 max-w-xl leading-relaxed" data-aos="fade-up" data-aos-delay="200">
              Every service you need, curated to the highest standard — all under one trusted roof.
            </p>
          </div>
        </section>

        {/* ── WEDDING SERVICES ─────────────────────────────────── */}
        <section className="py-section bg-ivory">
          <div className="container-custom">
            <div className="text-center mb-16" data-aos="fade-up">
              <div className="eyebrow mb-3">Wedding Planning</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary">
                Wedding <span className="font-[600] not-italic">Services</span>
              </h2>
              <div className="divider-gold my-5 mx-auto"><div className="divider-gold-diamond" /></div>
            </div>

            <div className="space-y-16">
              {weddingServices.map((service, i) => (
                <div
                  key={service.key}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                >
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-14 h-14 rounded-2xl bg-blush flex items-center justify-center text-2xl mb-5">
                      {service.icon}
                    </div>
                    <h3 className="font-cormorant text-3xl font-[600] text-primary mb-4">{service.title}</h3>
                    <p className="font-sans text-warmgray leading-relaxed mb-6">{service.desc}</p>
                    {service.highlights.length > 0 && <ul className="grid grid-cols-2 gap-2 mb-6">
                      {service.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 font-sans text-sm text-warmgray">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>}
                    <Link href={service.href} className="btn-gold inline-block">
                      <span>Learn More</span>
                    </Link>
                  </div>
                  <div className={`relative h-80 rounded-2xl overflow-hidden shadow-premium hover-scale-img ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <Image src={service.img} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EVENTS SERVICES ──────────────────────────────────── */}
        {eventServices.length > 0 && (
        <section className="py-section bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-16" data-aos="fade-up">
              <div className="eyebrow mb-3">Beyond Weddings</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary">
                Events & <span className="font-[600] not-italic">Celebrations</span>
              </h2>
              <div className="divider-gold my-5 mx-auto"><div className="divider-gold-diamond" /></div>
              <p className="font-sans text-warmgray max-w-2xl mx-auto">
                Our expertise extends far beyond the wedding day. We plan every event surrounding your celebration and beyond.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventServices.map((service, i) => (
                <Link
                  key={service.key}
                  href={service.href}
                  className="card-wedding group block overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image src={service.img} alt={service.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 text-2xl">{service.icon}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-cormorant text-xl font-[600] text-primary mb-2 group-hover:text-accent transition-colors">{service.title}</h3>
                    <p className="font-sans text-sm text-warmgray leading-relaxed line-clamp-3">{service.desc}</p>
                    <div className="mt-4 link-gold text-sm">Explore →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <div className="container-custom" data-aos="fade-up">
            <div className="eyebrow text-champagne/70 mb-4">Ready to Begin?</div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-white mb-5">
              Let Us Create Something
              <span className="font-[600] not-italic text-champagne"> Extraordinary Together</span>
            </h2>
            <p className="font-sans text-warmgray max-w-xl mx-auto mb-8">
              Share your vision with us. Our team will design a bespoke proposal tailored perfectly for you.
            </p>
            <Link href="/contact" className="btn-gold inline-block">
              <span>Request a Consultation</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </AnimatedPage>
  );
}
