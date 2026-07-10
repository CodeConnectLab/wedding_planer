import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedHomepage from '@/components/AnimatedHomepage';
import ModernAdsBanner from '@/components/ModernAdsBanner';

const HeroSlider       = dynamic(() => import('@/components/HeroSlider'), { loading: () => <div className="skeleton h-screen" /> });
const VideoSection     = dynamic(() => import('@/components/VideoSection'), { loading: () => <div className="skeleton h-64" /> });
const FAQSection       = dynamic(() => import('@/components/FAQSection'), { loading: () => <div className="skeleton h-64" /> });

async function getSliders() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/slider`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

export const metadata = {
  title: 'WAH Momentz — Luxury Wedding Planners India',
  description: 'India\'s premier luxury wedding planning studio. Crafting bespoke celebrations — destination weddings, royal ceremonies, intimate gatherings — tailored to every love story.',
  keywords: 'luxury wedding planner India, destination wedding, Indian wedding planning, wedding decorators Delhi, royal wedding',
  openGraph: {
    title: 'WAH Momentz — Luxury Wedding Planners India',
    description: 'Crafting unforgettable love stories since 2007.',
    images: ['/og-image.jpg'],
  },
};

// ── Data ─────────────────────────────────────────────────────────────────────

const services = [
  { icon: '✈️', title: 'Destination Weddings', desc: 'Seamlessly curated weddings across Udaipur, Jaipur, Goa, Kerala and exotic international locales — every detail handled with precision.', href: '/destination-weddings' },
  { icon: '🌸', title: 'Wedding Décor', desc: 'From floral mandaps to cinematic lighting, our décor team transforms venues into breathtaking dreamscapes unique to your story.', href: '/services/wedding-decor' },
  { icon: '📸', title: 'Photography & Film', desc: 'Artistic photographers and cinematic filmmakers who capture every stolen glance, tearful embrace, and joyful dance — timelessly.', href: '/services/photography' },
  { icon: '🏛️', title: 'Venue Management', desc: 'From palace properties to boutique resorts, we manage every venue detail — logistics, décor, catering coordination, and guest experience.', href: '/services/venue-management' },
  { icon: '🍽️', title: 'Catering Excellence', desc: 'A curated feast spanning regional Indian cuisines and international menus, styled with elegance to delight every palate.', href: '/services/catering' },
  { icon: '🌿', title: 'Mehndi & Beauty', desc: 'Award-winning mehndi artists and bridal beauty teams to ensure you look and feel absolutely radiant on your most important day.', href: '/services/mehndi' },
];

const stats = [
  { number: '500+', label: 'Weddings Celebrated' },
  { number: '18+', label: 'Years of Excellence' },
  { number: '25+', label: 'Cities Covered' },
  { number: '98%', label: 'Couples Delighted' },
];

const weddingStyles = [
  { title: 'Royal Heritage', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop', tag: 'Palace Wedding' },
  { title: 'Garden Enchantment', img: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=800&fit=crop', tag: 'Outdoor Wedding' },
  { title: 'Destination Dreams', img: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&h=800&fit=crop', tag: 'Destination Wedding' },
  { title: 'Intimate Luxury', img: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&h=800&fit=crop', tag: 'Intimate Ceremony' },
];

const marqueeItems = [
  'Destination Weddings', 'Wedding Décor', 'Photography & Film',
  'Mehndi & Beauty', 'Catering', 'Entertainment',
  'Venue Management', 'Invitation Design', 'Bachelor Party',
  'Honeymoon Packages', 'Anniversary Party',
  'Corporate Events', 'Fashion Shows', 'Award Nights', 'Conference & Expo',
];

// ── Component ─────────────────────────────────────────────────────────────────

export default async function Home() {
  const [sliders, projects] = await Promise.all([getSliders(), getProjects()]);
  const featuredWeddings = projects.slice(0, 6);

  return (
    <AnimatedHomepage>
      <Navbar />
      <ModernAdsBanner />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        {sliders.length > 0 ? (
          <HeroSlider slides={sliders} />
        ) : (
          <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&h=1080&fit=crop"
                alt="Luxury Indian Wedding"
                fill
                className="object-cover"
                priority
              />
              <div className="hero-gradient-overlay absolute inset-0" />
              <div className="absolute inset-0 bg-primary/20" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-32 right-16 w-64 h-64 rounded-full border border-champagne/20 animate-float-slow hidden xl:block" />
            <div className="absolute bottom-32 right-32 w-32 h-32 rounded-full border border-accent/15 animate-float hidden xl:block" />

            <div className="relative z-10 container-custom pt-28 pb-20">
              <div className="max-w-3xl">
                {/* Eyebrow */}
                <div
                  className="flex items-center gap-3 mb-6 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                >
                  <div className="h-px w-10 bg-accent" />
                  <span className="eyebrow text-champagne">Luxury Wedding Planners</span>
                </div>

                {/* Headline */}
                <h1
                  className="font-cormorant text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-[300] italic text-white leading-[1.05] mb-6 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
                >
                  Where Love Stories
                  <br />
                  <span className="text-gold-gradient not-italic font-[600]">
                    Become Legends
                  </span>
                </h1>

                {/* Sub */}
                <p
                  className="font-sans text-lg text-white/75 max-w-xl leading-relaxed mb-10 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                  India's most trusted luxury wedding planning studio — crafting emotionally rich,
                  visually stunning celebrations tailored to your unique love story since 2007.
                </p>

                {/* CTAs */}
                <div
                  className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
                >
                  <Link href="/contact" className="btn-gold btn-shimmer relative">
                    <span>Begin Your Journey</span>
                  </Link>
                  <Link href="/gallery" className="btn-outline-white">
                    View Our Weddings
                  </Link>
                </div>

                {/* Quick stats */}
                <div
                  className="flex flex-wrap gap-8 mt-14 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
                >
                  {[['500+', 'Weddings'], ['18+', 'Years'], ['25+', 'Cities']].map(([num, label]) => (
                    <div key={label} className="text-white">
                      <div className="font-cormorant text-3xl font-[600] text-champagne leading-none">{num}</div>
                      <div className="font-sans text-xs text-white/60 uppercase tracking-wider mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent" />
          </section>
        )}

        {/* ── MARQUEE STRIP ────────────────────────────────────── */}
        <div className="bg-primary py-4 overflow-hidden border-y border-accent/20">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-4 px-6 whitespace-nowrap">
                <span className="font-cormorant text-lg italic text-champagne/80">{item}</span>
                <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
              </span>
            ))}
          </div>
        </div>

        {/* ── ABOUT SECTION ────────────────────────────────────── */}
        <section className="py-section bg-ivory">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
              {/* Images */}
              <div className="relative" data-aos="fade-right">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-premium hover-scale-img">
                      <Image
                        src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop"
                        alt="Wedding ceremony"
                        fill className="object-cover"
                      />
                    </div>
                    <div className="relative h-40 rounded-2xl overflow-hidden shadow-premium hover-scale-img">
                      <Image
                        src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=400&fit=crop"
                        alt="Wedding couple"
                        fill className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative h-40 rounded-2xl overflow-hidden shadow-premium hover-scale-img">
                      <Image
                        src="https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&h=400&fit=crop"
                        alt="Wedding decor"
                        fill className="object-cover"
                      />
                    </div>
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-premium hover-scale-img">
                      <Image
                        src="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&h=800&fit=crop"
                        alt="Bridal portrait"
                        fill className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Years badge */}
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-card rounded-2xl p-5 text-center shadow-gold min-w-32"
                  data-aos="zoom-in"
                  data-aos-delay="400"
                >
                  <div className="font-cormorant text-4xl font-[700] text-accent leading-none">18+</div>
                  <div className="font-sans text-xs text-warmgray uppercase tracking-widest mt-1">Years of Craft</div>
                </div>
              </div>

              {/* Content */}
              <div data-aos="fade-left" data-aos-delay="100">
                <div className="eyebrow mb-4">About WAH Momentz</div>
                <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-[300] italic text-primary leading-tight mb-6">
                  Crafting Celebrations
                  <br />
                  <span className="font-[600] not-italic text-accent">That Last Forever</span>
                </h2>
                <p className="font-sans text-warmgray leading-relaxed mb-5">
                  Since 2007, WAH Momentz has been India's most trusted name in luxury wedding planning.
                  We don't just plan events — we tell love stories through meticulously curated experiences
                  that honour your heritage while embracing modern elegance.
                </p>
                <p className="font-sans text-warmgray leading-relaxed mb-8">
                  From intimate ceremonies in boutique haveli settings to grand palace weddings with
                  hundreds of guests, our team of 40+ specialists brings unparalleled attention to
                  every element — from the fragrance of the flowers to the final sparkle of the fireworks.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className="stat-card"
                      data-aos="zoom-in"
                      data-aos-delay={i * 100 + 200}
                    >
                      <div className="font-cormorant text-3xl font-[700] text-accent leading-none mb-1">
                        <span data-counter={stat.number.replace(/\D/g, '')}>{stat.number.startsWith('0') ? '0' : '0'}</span>
                        {stat.number.includes('+') ? '+' : stat.number.includes('%') ? '%' : ''}
                      </div>
                      <div className="font-sans text-xs text-warmgray uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="btn-outline-gold inline-flex items-center gap-2"
                >
                  Discover Our Story →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WEDDING STYLES / GALLERY PREVIEW ─────────────────── */}
        <section className="py-section bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-14" data-aos="fade-up">
              <div className="eyebrow mb-3">Our Portfolio</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-[300] italic text-primary">
                Every Wedding,
                <span className="font-[600] not-italic"> A Masterpiece</span>
              </h2>
              <div className="divider-gold my-5 mx-auto">
                <div className="divider-gold-diamond" />
              </div>
              <p className="font-sans text-warmgray max-w-2xl mx-auto leading-relaxed">
                A glimpse into the extraordinary celebrations we've had the privilege of crafting for our couples.
              </p>
            </div>

            {featuredWeddings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredWeddings.map((wedding: any, i: number) => (
                  <Link
                    key={wedding._id}
                    href={`/gallery/${wedding.slug}`}
                    className="card-gallery group"
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                  >
                    <div className="relative h-80">
                      <Image
                        src={wedding.images?.[0] || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop'}
                        alt={wedding.title}
                        fill className="object-cover"
                      />
                      <div className="card-gallery-overlay" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                        <div className="font-sans text-xs text-champagne/70 uppercase tracking-widest mb-1">
                          {wedding.location}
                        </div>
                        <h3 className="font-cormorant text-2xl font-[600] text-white">{wedding.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Placeholder gallery */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {weddingStyles.map((style, i) => (
                  <Link
                    key={style.title}
                    href="/gallery"
                    className="card-gallery group"
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                  >
                    <div className={`relative ${i === 0 || i === 3 ? 'h-96' : 'h-72'}`}>
                      <Image src={style.img} alt={style.title} fill className="object-cover" />
                      <div className="card-gallery-overlay" />
                      <div className="absolute top-4 left-4">
                        <span className="glass-dark rounded-full px-3 py-1 text-xs font-sans text-champagne/80 uppercase tracking-widest">
                          {style.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                        {/* <h3 className="font-cormorant text-xl font-[600] text-white">{style.title}</h3> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="300">
              <Link href="/gallery" className="btn-gold btn-shimmer relative inline-block">
                <span>Explore Full Gallery</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────── */}
        <section className="py-section bg-ivory relative overflow-hidden">
          {/* Background motif */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.025] pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&h=1200&fit=crop"
              alt=""
              fill className="object-cover"
            />
          </div>

          <div className="container-custom relative z-10">
            <div className="text-center mb-14" data-aos="fade-up">
              <div className="eyebrow mb-3">What We Do</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-[300] italic text-primary">
                Full-Spectrum
                <span className="font-[600] not-italic text-accent"> Wedding Services</span>
              </h2>
              <div className="divider-gold my-5 mx-auto">
                <div className="divider-gold-diamond" />
              </div>
              <p className="font-sans text-warmgray max-w-2xl mx-auto">
                From the first spark of planning to the final farewell, we orchestrate every element
                of your celebration with expertise and artistry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="service-card p-8 group block"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="w-14 h-14 rounded-2xl bg-blush flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:bg-champagne transition-all duration-400">
                    {service.icon}
                  </div>
                  <h3 className="font-cormorant text-2xl font-[600] text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-sans text-warmgray text-sm leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <span className="link-gold font-sans text-sm font-[500]">
                    Explore service →
                  </span>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10" data-aos="fade-up">
              <Link href="/services" className="btn-outline-gold inline-block">
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* ── PROCESS / HOW IT WORKS ───────────────────────────── */}
        <section className="py-section bg-primary relative overflow-hidden">
          {/* Warm grain overlay */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: 'url("/grain.png")', backgroundRepeat: 'repeat' }}
          />

          <div className="container-custom relative z-10">
            <div className="text-center mb-14" data-aos="fade-up">
              <div className="eyebrow text-champagne/70 mb-3">Our Process</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-[300] italic text-white">
                From Vision to
                <span className="font-[600] not-italic text-champagne"> Reality</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Consultation', desc: 'A personal conversation to understand your vision, desires, and the unique essence of your love story.' },
                { step: '02', title: 'Concept & Design', desc: 'Our creative team crafts a bespoke wedding concept — mood boards, theme, colour palette, and style direction.' },
                { step: '03', title: 'Planning & Curation', desc: 'We orchestrate every detail — venue, vendors, timelines, logistics — managing it all so you simply enjoy.' },
                { step: '04', title: 'Flawless Execution', desc: 'On your day, our team is on-ground ensuring every moment unfolds exactly as you dreamed.' },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="text-center group"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="relative w-16 h-16 rounded-full border-2 border-accent/40 flex items-center justify-center mx-auto mb-6 group-hover:border-accent transition-colors duration-400">
                    <span className="font-cormorant text-xl font-[700] text-accent">{item.step}</span>
                    {i < 3 && (
                      <div className="hidden lg:block absolute top-1/2 left-full w-full h-px bg-gradient-to-r from-accent/30 to-transparent -translate-y-1/2 ml-2" />
                    )}
                  </div>
                  <h3 className="font-cormorant text-xl font-[600] text-champagne mb-3">{item.title}</h3>
                  <p className="font-sans text-sm text-warmgray leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION ──────────────────────────────────────── */}
        <FAQSection maxItems={6} showViewAllButton={true} />

        {/* ── VIDEO SECTION ────────────────────────────────────── */}
        <VideoSection featuredOnly={true} maxVideos={3} showCategories={false} />

        {/* ── CTA SECTION ──────────────────────────────────────── */}
        <section className="py-section relative overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&h=800&fit=crop"
              alt="Wedding celebration"
              fill className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-primary/70" />
          </div>

          {/* Decorative rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-accent/10 animate-float-slow pointer-events-none hidden lg:block" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-accent/10 animate-float pointer-events-none hidden lg:block" />

          <div className="container-custom relative z-10 text-center">
            <div className="eyebrow text-champagne/70 mb-4" data-aos="fade-up">
              Begin Your Story
            </div>
            <h2
              className="font-cormorant text-4xl sm:text-5xl lg:text-7xl font-[300] italic text-white mb-6 leading-tight"
              data-aos="fade-up" data-aos-delay="100"
            >
              Your Dream Wedding
              <br />
              <span className="font-[600] not-italic text-champagne">Awaits You</span>
            </h2>
            <p
              className="font-sans text-white/60 max-w-xl mx-auto mb-10 leading-relaxed"
              data-aos="fade-up" data-aos-delay="200"
            >
              Let's begin with a conversation. Our team is ready to listen, dream alongside you,
              and create something truly extraordinary.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="fade-up" data-aos-delay="300"
            >
              <Link href="/contact" className="btn-gold btn-shimmer relative">
                <span>Schedule a Consultation</span>
              </Link>
              <a
                href="https://wa.me/919891106761?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20wedding%20planning%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white flex items-center justify-center gap-2"
              >
                <span className="text-lg">💬</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── BLOG PREVIEW ─────────────────────────────────────── */}
        <section className="py-section bg-ivory">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
              <div data-aos="fade-right">
                <div className="eyebrow mb-3">Inspiration & Advice</div>
                <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary">
                  From Our <span className="font-[600] not-italic">Journal</span>
                </h2>
              </div>
              <Link
                href="/blogs"
                className="font-sans text-sm font-[500] text-accent hover:text-burgundy transition-colors mt-4 sm:mt-0"
                data-aos="fade-left"
              >
                View All Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  category: 'Planning Tips',
                  title: '10 Questions to Ask Your Wedding Planner Before Signing',
                  excerpt: 'Choosing the right wedding planner is one of the most important decisions you\'ll make. Here are the key questions every couple should ask.',
                  img: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&h=400&fit=crop',
                  date: 'June 2025',
                  readTime: '5 min read',
                  slug: '#'
                },
                {
                  category: 'Décor Trends',
                  title: 'The Rise of Sustainable Weddings: Beautiful & Responsible',
                  excerpt: 'Eco-conscious couples are redefining luxury with sustainable floral arrangements, zero-waste menus, and mindful venue choices.',
                  img: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&h=400&fit=crop',
                  date: 'May 2025',
                  readTime: '7 min read',
                  slug: '#'
                },
                {
                  category: 'Destination',
                  title: 'Top 10 Royal Palaces in India for an Unforgettable Wedding',
                  excerpt: 'From Udaipur\'s lake palaces to Jaipur\'s fort hotels — our curated guide to India\'s most spectacular wedding venues.',
                  img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
                  date: 'April 2025',
                  readTime: '8 min read',
                  slug: '#'
                },
              ].map((post, i) => (
                <Link
                  key={post.title}
                  href={post.slug === '#' ? '/blogs' : `/blogs/${post.slug}`}
                  className="blog-card group"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="glass-card rounded-full px-3 py-1 text-xs font-sans font-[500] text-accent">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-sans text-xs text-warmgray">{post.date}</span>
                      <span className="w-1 h-1 bg-champagne rounded-full" />
                      <span className="font-sans text-xs text-warmgray">{post.readTime}</span>
                    </div>
                    <h3 className="font-cormorant text-xl font-[600] text-primary mb-3 group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-warmgray leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 link-gold text-sm">Read more →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </AnimatedHomepage>
  );
}
