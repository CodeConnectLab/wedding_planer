import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ivory flex flex-col items-center justify-center text-center px-6 pt-24 pb-20">
        {/* Decorative rings */}
        <div className="relative mb-12">
          <div className="w-48 h-48 rounded-full border border-champagne/30 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border border-champagne/50 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-blush flex items-center justify-center">
                <span className="font-cormorant text-5xl text-accent font-[300] italic">404</span>
              </div>
            </div>
          </div>
          {/* Floating rings */}
          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full border-2 border-champagne/40 animate-float" />
          <div className="absolute -bottom-2 -left-6 w-5 h-5 rounded-full border border-rose-brand/30 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="eyebrow mb-4">Page Not Found</div>

        <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-[300] italic text-primary mb-4 leading-tight">
          This Page Has
          <span className="font-[600] not-italic text-accent"> Wandered Off</span>
        </h1>

        <div className="flex items-center gap-4 my-5 justify-center">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-champagne" />
          <span className="text-champagne text-xl">◇</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-champagne" />
        </div>

        <p className="font-sans text-warmgray max-w-md mx-auto leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have been moved. Let us guide you back to the
          celebration — every great wedding story has a few unexpected turns.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-gold inline-block">
            <span>Return Home</span>
          </Link>
          <Link href="/contact" className="btn-outline-gold inline-block">
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-16 pt-10 border-t border-champagne/20 w-full max-w-lg">
          <p className="font-sans text-xs uppercase tracking-widest text-warmgray mb-6">Explore Our Work</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { href: '/services', label: 'Services' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/destination-weddings', label: 'Destination Weddings' },
              { href: '/about', label: 'About Us' },
              { href: '/blogs', label: 'Journal' },
              { href: '/faqs', label: 'FAQs' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-warmgray hover:text-accent transition-colors px-4 py-2 rounded-full border border-champagne/30 hover:border-accent/40"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
