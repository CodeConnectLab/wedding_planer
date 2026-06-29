import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

interface WeddingProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  category: { name: string } | string;
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  venue?: string;
  weddingStyle?: string;
  guestCount?: number;
  videoUrl?: string;
  tags?: string[];
}

async function getWedding(slug: string): Promise<WeddingProject | null> {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug, isPublished: true })
      .populate('category', 'name')
      .lean();
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const wedding = await getWedding(params.slug);
  if (!wedding) return { title: 'Wedding Not Found' };

  const couple = wedding.brideName && wedding.groomName
    ? `${wedding.brideName} & ${wedding.groomName}`
    : wedding.title;

  return {
    title: `${couple} — Royal Affairs Gallery`,
    description: wedding.description || `A luxury wedding celebration by Royal Affairs Wedding Planners.`,
    openGraph: {
      images: wedding.images?.[0] ? [{ url: wedding.images[0] }] : [],
    },
  };
}

export default async function GalleryDetailPage({ params }: { params: { slug: string } }) {
  const wedding = await getWedding(params.slug);
  if (!wedding) notFound();

  const couple = wedding.brideName && wedding.groomName
    ? `${wedding.brideName} & ${wedding.groomName}`
    : wedding.title;

  const categoryName = typeof wedding.category === 'object' && wedding.category !== null
    ? (wedding.category as { name: string }).name
    : (wedding.category as string) || 'Wedding';

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-ivory min-h-screen">
        {/* ── HERO IMAGE ───────────────────────────────────── */}
        {wedding.images?.[0] && (
          <div className="relative h-[70vh] overflow-hidden">
            <Image
              src={wedding.images[0]}
              alt={couple}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16">
              <div className="container-custom">
                <div className="eyebrow text-champagne/80 mb-3">{categoryName}</div>
                <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-[300] italic text-white leading-tight">
                  {couple}
                </h1>
                {(wedding.venue || wedding.weddingDate) && (
                  <div className="flex items-center gap-4 mt-4 flex-wrap">
                    {wedding.venue && (
                      <span className="font-sans text-champagne/90 text-sm">
                        📍 {wedding.venue}
                      </span>
                    )}
                    {wedding.weddingDate && (
                      <span className="font-sans text-champagne/90 text-sm">
                        📅 {new Date(wedding.weddingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    )}
                    {wedding.guestCount && (
                      <span className="font-sans text-champagne/90 text-sm">
                        👥 {wedding.guestCount.toLocaleString('en-IN')} Guests
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── WEDDING INFO ─────────────────────────────────── */}
        <section className="py-section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Story */}
              <div className="lg:col-span-2" data-aos="fade-right">
                <div className="eyebrow mb-4">The Story</div>
                <h2 className="font-cormorant text-4xl font-[300] italic text-primary mb-6">
                  A Celebration to <span className="font-[600] not-italic text-accent">Remember</span>
                </h2>
                <p className="font-sans text-warmgray leading-relaxed text-lg">
                  {wedding.description || 'Every love story deserves to be celebrated in extraordinary style. This wedding was a beautiful reflection of the couple\'s personality, traditions, and love for each other — brought to life by the Royal Affairs team.'}
                </p>

                {wedding.tags && wedding.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {wedding.tags.map((tag, i) => (
                      <span key={i} className="font-sans text-xs font-[500] px-3 py-1.5 rounded-full bg-blush text-accent border border-champagne/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Details sidebar */}
              <div className="space-y-4" data-aos="fade-left">
                {[
                  { label: 'Couple', value: couple },
                  wedding.venue && { label: 'Venue', value: wedding.venue },
                  wedding.weddingDate && { label: 'Date', value: new Date(wedding.weddingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                  wedding.weddingStyle && { label: 'Style', value: wedding.weddingStyle },
                  wedding.guestCount && { label: 'Guests', value: `${wedding.guestCount.toLocaleString('en-IN')} guests` },
                  { label: 'Category', value: categoryName },
                ].filter(Boolean).map((item: any, i) => (
                  <div key={i} className="p-4 glass-card rounded-xl">
                    <div className="font-sans text-xs uppercase tracking-widest text-warmgray mb-1">{item.label}</div>
                    <div className="font-cormorant text-lg font-[500] text-primary">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PHOTO GALLERY ────────────────────────────────── */}
        {wedding.images && wedding.images.length > 1 && (
          <section className="py-section bg-secondary">
            <div className="container-custom">
              <div className="text-center mb-12" data-aos="fade-up">
                <div className="eyebrow mb-4">Photography</div>
                <h2 className="font-cormorant text-4xl font-[300] italic text-primary">
                  The <span className="font-[600] not-italic text-accent">Moments</span>
                </h2>
              </div>
              <div
                className="columns-1 sm:columns-2 lg:columns-3 gap-4"
                style={{ columnFill: 'balance' }}
              >
                {wedding.images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="break-inside-avoid mb-4 overflow-hidden rounded-xl group"
                    data-aos="fade-up"
                    data-aos-delay={i * 50}
                  >
                    <Image
                      src={img}
                      alt={`${couple} - ${i + 2}`}
                      width={600}
                      height={400}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── VIDEO ────────────────────────────────────────── */}
        {wedding.videoUrl && (
          <section className="py-section">
            <div className="container-custom max-w-4xl" data-aos="fade-up">
              <div className="text-center mb-10">
                <div className="eyebrow mb-4">The Film</div>
                <h2 className="font-cormorant text-4xl font-[300] italic text-primary">
                  Watch the <span className="font-[600] not-italic text-accent">Story</span>
                </h2>
              </div>
              <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-premium">
                <iframe
                  src={wedding.videoUrl.includes('youtube.com/watch')
                    ? wedding.videoUrl.replace('watch?v=', 'embed/')
                    : wedding.videoUrl
                  }
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${couple} Wedding Film`}
                />
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <div className="container-custom" data-aos="fade-up">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-white mb-4">
              Begin Your Own Story
            </h2>
            <p className="font-sans text-warmgray max-w-md mx-auto mb-8">
              Every Royal Affairs wedding is as unique as the couple at its heart. Let us create yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold inline-block">
                <span>Start Planning</span>
              </Link>
              <Link href="/gallery" className="btn-outline-white inline-block">
                <span>View More Weddings</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
