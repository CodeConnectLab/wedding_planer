'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaChevronDown, FaPhone } from 'react-icons/fa';
import useSiteConfig from '@/components/useSiteConfig';
import { telHref } from '@/lib/siteDefaults';

export default function Navbar() {
  const { settings, services } = useSiteConfig();
  const weddingServices = services.filter((s) => s.category === 'wedding');
  const eventServices = services.filter((s) => s.category === 'event');
  const phoneHref = telHref(settings.phone);
  const [isOpen, setIsOpen]           = useState(false);
  const [isScrolled, setIsScrolled]   = useState(false);
  // Only the homepage has a full-bleed hero behind the navbar; other pages need the solid style.
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef  = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleServicesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 180);
  };

  const solid = isScrolled || pathname !== '/';

  const navLinkClass = `
    relative font-sans text-sm font-[500] tracking-wide transition-colors duration-300
    ${solid ? 'text-primary hover:text-accent' : 'text-white hover:text-champagne'}
    after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px]
    after:bg-accent after:transition-all after:duration-300 hover:after:w-full
  `;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ${
          solid
            ? 'bg-ivory/95 backdrop-blur-sm shadow-premium border-b border-champagne/30'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative w-40 sm:w-52 h-14">
                <Image
                  src={settings.logo}
                  alt={settings.companyName}
                  fill
                  className={`object-contain object-left transition-all duration-500 ${
                    solid ? 'brightness-100' : 'brightness-0 invert'
                  }`}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-8">
              <Link href="/" className={navLinkClass}>Home</Link>
              <Link href="/about" className={navLinkClass}>About</Link>

              {/* Services Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <button
                  className={`${navLinkClass} flex items-center gap-1.5 bg-transparent border-0 cursor-pointer`}
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  Services
                  <FaChevronDown
                    className={`text-xs transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Mega Dropdown */}
                {servicesOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] glass-card rounded-2xl p-6 shadow-premium-lg border border-champagne/30"
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  >
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                      <div>
                        <p className="eyebrow text-xs mb-3 pb-2 border-b border-champagne/30">
                          Wedding Services
                        </p>
                        {weddingServices.map((s) => (
                          <Link
                            key={`${s.category}-${s.href}`}
                            href={s.href}
                            className="flex items-center gap-2.5 py-2 px-2 rounded-lg text-sm text-warmgray hover:text-accent hover:bg-blush/40 transition-all duration-200 group"
                            onClick={() => setServicesOpen(false)}
                          >
                            <span className="text-base group-hover:scale-110 transition-transform">{s.icon}</span>
                            <span className="font-sans font-[450]">{s.title}</span>
                          </Link>
                        ))}
                      </div>
                      <div>
                        <p className="eyebrow text-xs mb-3 pb-2 border-b border-champagne/30">
                          Events & Celebrations
                        </p>
                        {eventServices.map((s) => (
                          <Link
                            key={`${s.category}-${s.href}`}
                            href={s.href}
                            className="flex items-center gap-2.5 py-2 px-2 rounded-lg text-sm text-warmgray hover:text-accent hover:bg-blush/40 transition-all duration-200 group"
                            onClick={() => setServicesOpen(false)}
                          >
                            <span className="text-base group-hover:scale-110 transition-transform">{s.icon}</span>
                            <span className="font-sans font-[450]">{s.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-champagne/30 flex justify-between items-center">
                      <Link
                        href="/services"
                        className="text-accent text-sm font-[600] font-sans hover:text-burgundy transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        View All Services →
                      </Link>
                      <Link
                        href="/contact"
                        className="btn-gold text-xs py-2.5 px-5"
                        onClick={() => setServicesOpen(false)}
                      >
                        <span>Book Consultation</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/gallery" className={navLinkClass}>Gallery</Link>
              <Link href="/blogs" className={navLinkClass}>Blog</Link>
              <Link href="/faqs" className={navLinkClass}>FAQs</Link>

              {/* Phone + CTA */}
              <a
                href={phoneHref}
                className={`flex items-center gap-1.5 text-sm font-[500] transition-colors duration-300 ${
                  solid ? 'text-accent' : 'text-champagne'
                }`}
              >
                <FaPhone className="text-xs" />
                <span className="font-sans">{settings.phone}</span>
              </a>

              <Link
                href="/contact"
                className={`btn-gold text-xs py-2.5 px-6 ${!solid ? 'brightness-110' : ''}`}
              >
                <span>Plan Your Wedding</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden text-2xl transition-all duration-300 p-2 rounded-xl ${
                solid
                  ? 'text-primary'
                  : 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[190] bg-primary/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 z-[195] bg-ivory shadow-premium-lg transform transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden overflow-y-auto`}
      >
        <div className="p-6 pt-6">
          {/* Close button — sits below the fixed navbar (h-20 = 80px) */}
          <div className="flex justify-between items-center mb-6 mt-20">
            <div className="relative w-40 h-12">
              <Image src={settings.logo} alt={settings.companyName} fill className="object-contain object-left" />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-primary"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="space-y-1">
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Gallery', href: '/gallery' },
              { label: 'Blog', href: '/blogs' },
              { label: 'FAQs', href: '/faqs' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 px-4 text-primary hover:text-accent hover:bg-blush/40 font-sans font-[500] rounded-xl transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Services accordion */}
            <button
              className="w-full flex items-center justify-between py-3 px-4 text-primary hover:text-accent hover:bg-blush/40 font-sans font-[500] rounded-xl transition-all duration-200"
              onClick={() => setMobileServices(!mobileServices)}
            >
              <span>Services</span>
              <FaChevronDown className={`text-xs transition-transform duration-300 ${mobileServices ? 'rotate-180' : ''}`} />
            </button>

            {mobileServices && (
              <div className="ml-4 space-y-1 border-l-2 border-champagne/50 pl-4">
                {[...weddingServices, ...eventServices].map((s) => (
                  <Link
                    key={`${s.category}-${s.href}`}
                    href={s.href}
                    className="flex items-center gap-2 py-2 px-3 text-sm text-warmgray hover:text-accent rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{s.icon}</span>
                    <span className="font-sans">{s.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </nav>

          <div className="mt-8 space-y-3">
            <a
              href={phoneHref}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-full border-2 border-accent text-accent font-sans font-[600] text-sm"
            >
              <FaPhone className="text-xs" />
              {settings.phone}
            </a>
            <Link
              href="/contact"
              className="btn-gold block text-center py-3"
              onClick={() => setIsOpen(false)}
            >
              <span>Plan Your Wedding</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
