import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedPage from '@/components/AnimatedPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — WAH Momentz',
  description:
    'The story of WAH Momentz — 19+ years of crafting extraordinary wedding celebrations across India. Meet our team of passionate wedding specialists.',
  keywords: 'about WAH Momentz, wedding planners India, luxury wedding planning team, wedding planning company India',
};

const values = [
  { icon: '💎', title: 'Uncompromising Excellence', desc: 'Every detail, every vendor, every moment — held to the highest standard of luxury and artistry.' },
  { icon: '❤️', title: 'Emotionally Led', desc: 'We start with your love story and let it guide every creative and logistical decision we make.' },
  { icon: '🌿', title: 'Responsible Luxury', desc: 'Sustainable practices, local artisans, and responsible sourcing — beautiful celebrations that tread gently.' },
  { icon: '🤝', title: 'Transparent Partnership', desc: 'No hidden costs, no surprises. We partner with you openly, from the first call to the final bow.' },
];

export default function AboutPage() {
  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-24">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&h=900&fit=crop"
              alt="About WAH Momentz"
              fill className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-primary/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
          </div>
          <div className="container-custom relative z-10 text-white">
            <div className="eyebrow text-champagne/70 mb-4" data-aos="fade-up">Our Story</div>
            <h1
              className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-[300] italic leading-tight mb-6"
              data-aos="fade-up" data-aos-delay="100"
            >
              Crafted by Passion,
              <br />
              <span className="font-[600] not-italic text-champagne">Perfected by Love</span>
            </h1>
            <p className="font-sans text-white/70 max-w-xl leading-relaxed" data-aos="fade-up" data-aos-delay="200">
              For over 19 years, WAH Momentz has been the trusted name behind India's most extraordinary weddings.
            </p>
          </div>
        </section>

        {/* ── OUR STORY ────────────────────────────────────────── */}
        <section className="py-section bg-ivory">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div data-aos="fade-right">
                <div className="eyebrow mb-4">Who We Are</div>
                <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary mb-6">
                  19 Years of
                  <span className="font-[600] not-italic text-accent"> Love Stories</span>
                </h2>
                <p className="font-sans text-warmgray leading-relaxed mb-5">
                  WAH Momentz was born in 2007 from a simple conviction: that your wedding day should be
                  the most exquisitely personal experience of your life — not just a well-executed event,
                  but a deeply felt story that reflects everything you are as a couple.
                </p>
                <p className="font-sans text-warmgray leading-relaxed mb-5">
                  Founded by Smriti Tandon, who had spent years working with India's premier hotels and
                  event companies, WAH Momentz grew from a boutique studio into India's
                  most respected luxury wedding planning house — while never losing the personalised
                  attention that made us who we are.
                </p>
                <p className="font-sans text-warmgray leading-relaxed mb-8">
                  Today, we bring decades of expertise to every celebration we touch. We have planned
                  over 500 weddings across 25+ cities in India.
                </p>
                <Link href="/contact" className="btn-gold inline-block">
                  <span>Begin Your Journey</span>
                </Link>
              </div>

              <div className="relative" data-aos="fade-left" data-aos-delay="100">
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-premium">
                  <Image
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1000&fit=crop"
                    alt="Our team at work"
                    fill className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-6 shadow-gold" data-aos="zoom-in" data-aos-delay="300">
                  <div className="font-cormorant text-4xl font-[700] text-accent leading-none">500+</div>
                  <div className="font-sans text-xs text-warmgray uppercase tracking-widest mt-1">Weddings Celebrated</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────────── */}
        <section className="py-section bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-14" data-aos="fade-up">
              <div className="eyebrow mb-3">Our Philosophy</div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary">
                What We Believe In
              </h2>
              <div className="divider-gold my-5 mx-auto"><div className="divider-gold-diamond" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={v.title} className="service-card p-8 text-center group" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{v.icon}</div>
                  <h3 className="font-cormorant text-xl font-[600] text-primary mb-3">{v.title}</h3>
                  <p className="font-sans text-sm text-warmgray leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS BANNER ─────────────────────────────────────── */}
        <section className="py-16 bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { num: '500+', label: 'Weddings Completed' },
                { num: '19+', label: 'Years of Experience' },
                { num: '25+', label: 'Cities Covered' },
              ].map((s, i) => (
                <div key={s.label} data-aos="zoom-in" data-aos-delay={i * 100}>
                  <div className="font-cormorant text-4xl font-[700] text-champagne">{s.num}</div>
                  <div className="font-sans text-xs text-warmgray uppercase tracking-widest mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-20 bg-secondary text-center">
          <div className="container-custom" data-aos="fade-up">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-primary mb-5">
              Ready to Start Planning
              <span className="font-[600] not-italic text-accent"> Your Dream Wedding?</span>
            </h2>
            <p className="font-sans text-warmgray max-w-xl mx-auto mb-8">
              Every great wedding begins with a conversation. Let's talk about your vision, your story, and how we can bring it to life.
            </p>
            <Link href="/contact" className="btn-gold inline-block">
              <span>Schedule a Free Consultation</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </AnimatedPage>
  );
}
