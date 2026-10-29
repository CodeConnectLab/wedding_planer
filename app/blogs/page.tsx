import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestBlogs } from '@/lib/data';
import { img } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Wedding Journal — WAH Momentz',
  description: 'Expert wedding planning advice, décor inspiration, real wedding stories, and trends from India\'s premier luxury wedding planning studio.',
  keywords: 'wedding blog India, wedding planning tips, wedding décor inspiration, real weddings India, luxury wedding trends',
};

export const dynamic = 'force-dynamic';

export default async function BlogsPage() {
  const posts = await getLatestBlogs(60);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-ivory min-h-screen">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <div className="container-custom">
            <div className="eyebrow text-champagne/70 mb-4">Inspiration & Expertise</div>
            <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-[300] italic text-white mb-5">
              The WAH Momentz
              <span className="font-[600] not-italic text-champagne"> Journal</span>
            </h1>
            <div className="divider-gold my-5 mx-auto"><div className="divider-gold-diamond" /></div>
            <p className="font-sans text-warmgray max-w-xl mx-auto">
              Expert wedding planning advice, real love stories, décor inspiration, and the latest trends
              from our studio — written by our team of specialists.
            </p>
          </div>
        </section>

        {!featured && (
          <section className="py-section text-center">
            <p className="font-cormorant text-3xl italic text-warmgray">New stories from our journal are coming soon.</p>
          </section>
        )}

        {/* ── FEATURED POST ─────────────────────────────────────── */}
        {featured && (
        <section className="py-section">
          <div className="container-custom">
            <Link
              href={`/blogs/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500"
              data-aos="fade-up"
            >
              <div className="relative h-72 lg:h-auto min-h-[320px] overflow-hidden">
                <Image
                  src={featured.featuredImage || img('hero-mandap', 1200)}
                  alt={featured.title}
                  fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="absolute top-6 left-6">
                  <span className="glass-dark rounded-full px-4 py-1.5 text-xs font-sans text-champagne/80 uppercase tracking-widest">
                    Featured
                  </span>
                </div>
              </div>
              <div className="bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-xs font-[600] text-accent uppercase tracking-widest">{featured.category}</span>
                  <span className="w-1 h-1 bg-champagne rounded-full" />
                  <span className="font-sans text-xs text-warmgray">{featured.readTime} min read</span>
                </div>
                <h2 className="font-cormorant text-3xl sm:text-4xl font-[600] text-primary mb-4 group-hover:text-accent transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="font-sans text-warmgray leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blush flex items-center justify-center font-cormorant text-accent font-[700] text-sm">
                    {(featured.author || 'W')[0]}
                  </div>
                  <div>
                    <div className="font-sans text-sm font-[500] text-primary">{featured.author}</div>
                    <div className="font-sans text-xs text-warmgray">
                      {new Date(featured.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
        )}

        {/* ── REST OF POSTS ─────────────────────────────────────── */}
        <section className="pb-section">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post: any, i: number) => (
                <Link
                  key={post._id}
                  href={`/blogs/${post.slug}`}
                  className="blog-card group"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.featuredImage || img('hero-mandap', 800)}
                      alt={post.title}
                      fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="glass-card rounded-full px-3 py-1 text-xs font-sans font-[500] text-accent">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-sans text-xs text-warmgray">
                        {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="w-1 h-1 bg-champagne rounded-full" />
                      <span className="font-sans text-xs text-warmgray">{post.readTime} min read</span>
                    </div>
                    <h3 className="font-cormorant text-xl font-[600] text-primary mb-2 group-hover:text-accent transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-sans text-sm text-warmgray leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blush flex items-center justify-center font-cormorant text-accent font-[700] text-xs">
                        {(post.author || 'W')[0]}
                      </div>
                      <span className="font-sans text-xs text-warmgray">{post.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <div className="container-custom" data-aos="fade-up">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-white mb-5">
              Inspired?
              <span className="font-[600] not-italic text-champagne"> Let&apos;s Plan Yours</span>
            </h2>
            <p className="font-sans text-warmgray max-w-lg mx-auto mb-8">
              Tell us about your dream celebration and our planners will get back to you within 24 hours.
            </p>
            <Link href="/contact" className="btn-gold inline-block">
              <span>Book a Free Consultation</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
