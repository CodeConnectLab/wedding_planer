import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Wedding Journal — WAH Momentz',
  description: 'Expert wedding planning advice, décor inspiration, real wedding stories, and trends from India\'s premier luxury wedding planning studio.',
  keywords: 'wedding blog India, wedding planning tips, wedding décor inspiration, real weddings India, luxury wedding trends',
};

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blogs?published=true`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

const placeholderPosts = [
  {
    _id: '1', slug: '#', title: '10 Questions to Ask Your Wedding Planner Before Signing',
    excerpt: 'Choosing the right wedding planner is one of the most important decisions you\'ll make. Here are the key questions every couple should ask before committing.',
    featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    category: 'Planning Tips', author: 'Priya Sharma', readTime: '5', createdAt: new Date('2025-06-01'),
  },
  {
    _id: '2', slug: '#', title: 'The Rise of Sustainable Weddings: Beautiful & Responsible',
    excerpt: 'Eco-conscious couples are redefining luxury with sustainable florals, zero-waste menus, and mindful venue choices that celebrate love without harming the planet.',
    featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    category: 'Décor Trends', author: 'Kavya Nair', readTime: '7', createdAt: new Date('2025-05-15'),
  },
  {
    _id: '3', slug: '#', title: 'Top 10 Royal Palaces in India for an Unforgettable Wedding',
    excerpt: 'From Udaipur\'s shimmering lake palaces to Jaipur\'s magnificent fort hotels — our curated guide to India\'s most spectacular wedding venues.',
    featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    category: 'Venues & Destinations', author: 'Rahul Kapoor', readTime: '8', createdAt: new Date('2025-04-20'),
  },
  {
    _id: '4', slug: '#', title: 'Mehndi Design Trends 2025: From Traditional to Contemporary',
    excerpt: 'The art of mehndi is evolving beautifully — from elaborate traditional patterns to minimalist fine-line designs. Explore the trends shaping bridal mehndi this year.',
    featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    category: 'Beauty & Style', author: 'Priya Sharma', readTime: '6', createdAt: new Date('2025-03-10'),
  },
  {
    _id: '5', slug: '#', title: 'How to Plan a Destination Wedding in Bali: A Complete Guide',
    excerpt: 'Everything you need to know about planning a stunning Bali wedding — from visa requirements and temple ceremonies to the best resorts and local vendors.',
    featuredImage: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&h=400&fit=crop',
    category: 'Destination Weddings', author: 'Arjun Mehta', readTime: '10', createdAt: new Date('2025-02-25'),
  },
  {
    _id: '6', slug: '#', title: 'The Perfect Sangeet: Planning a Night to Remember',
    excerpt: 'The Sangeet is one of the most joyful events of the wedding week. Here\'s how to plan performances, themes, and entertainment that will keep everyone dancing.',
    featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop',
    category: 'Events & Ceremonies', author: 'Kavya Nair', readTime: '6', createdAt: new Date('2025-01-18'),
  },
];

const categories = ['All', 'Planning Tips', 'Décor Trends', 'Venues & Destinations', 'Beauty & Style', 'Destination Weddings', 'Events & Ceremonies'];

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const posts = blogs.length > 0 ? blogs : placeholderPosts;
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

        {/* ── FEATURED POST ─────────────────────────────────────── */}
        <section className="py-section">
          <div className="container-custom">
            <Link
              href={featured.slug === '#' ? '/blogs' : `/blogs/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500"
              data-aos="fade-up"
            >
              <div className="relative h-72 lg:h-auto min-h-[320px] overflow-hidden">
                <Image
                  src={featured.featuredImage || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop'}
                  alt={featured.title}
                  fill className="object-cover group-hover:scale-105 transition-transform duration-700"
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
                    {(featured.author || 'R')[0]}
                  </div>
                  <div>
                    <div className="font-sans text-sm font-[500] text-primary">{featured.author}</div>
                    <div className="font-sans text-xs text-warmgray">
                      {new Date(featured.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ── REST OF POSTS ─────────────────────────────────────── */}
        <section className="pb-section">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post: any, i: number) => (
                <Link
                  key={post._id}
                  href={post.slug === '#' ? '/blogs' : `/blogs/${post.slug}`}
                  className="blog-card group"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.featuredImage || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop'}
                      alt={post.title}
                      fill className="object-cover group-hover:scale-105 transition-transform duration-700"
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
                        {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                        {(post.author || 'R')[0]}
                      </div>
                      <span className="font-sans text-xs text-warmgray">{post.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER CTA ────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <div className="container-custom" data-aos="fade-up">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-[300] italic text-white mb-5">
              Wedding Inspiration,
              <span className="font-[600] not-italic text-champagne"> Delivered Monthly</span>
            </h2>
            <p className="font-sans text-warmgray max-w-lg mx-auto mb-8">
              Join 5,000+ couples who receive our monthly journal — real weddings, expert advice, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 input-wedding bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <button className="btn-gold flex-shrink-0">
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
