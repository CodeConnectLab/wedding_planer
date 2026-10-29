'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebook, FaInstagram, FaYoutube, FaPinterest, FaLinkedin,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp,
} from 'react-icons/fa';
import useSiteConfig from '@/components/useSiteConfig';
import { telHref, whatsappHref } from '@/lib/siteDefaults';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blogs' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  const { settings } = useSiteConfig();

  const socialLinks = [
    { url: settings.instagramUrl, icon: FaInstagram, label: 'Instagram' },
    { url: settings.facebookUrl, icon: FaFacebook, label: 'Facebook' },
    { url: settings.youtubeUrl, icon: FaYoutube, label: 'YouTube' },
    { url: settings.pinterestUrl, icon: FaPinterest, label: 'Pinterest' },
    { url: settings.linkedinUrl, icon: FaLinkedin, label: 'LinkedIn' },
  ].filter((s) => s.url);

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px bg-gold-gradient opacity-60" />

      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C2185B 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column — 2 of 5 */}
          <div className="lg:col-span-2">
            <div className="relative w-44 h-16 mb-6">
              <Image
                src={settings.logo}
                alt={settings.companyName}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-warmgray text-sm leading-relaxed mb-6 max-w-xs">
              {settings.companyDescription}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a
                href={telHref(settings.phone)}
                className="flex items-center gap-3 text-sm text-warmgray hover:text-accent transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-accent/50 transition-colors">
                  <FaPhone className="text-accent text-xs" />
                </span>
                {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 text-sm text-warmgray hover:text-accent transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-accent/50 transition-colors">
                  <FaEnvelope className="text-accent text-xs" />
                </span>
                {settings.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-warmgray">
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-accent text-xs" />
                </span>
                <div>
                  {settings.address.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ url, icon: Icon, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-warmgray hover:border-accent hover:text-accent transition-all duration-300 hover:scale-110"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
              {settings.whatsappNumber && (
                <a
                  href={whatsappHref(settings.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-warmgray hover:border-green-400 hover:text-green-400 transition-all duration-300 hover:scale-110"
                >
                  <FaWhatsapp className="text-sm" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cormorant text-lg font-[600] text-white mb-5 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-[1.5px] after:bg-accent pb-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warmgray hover:text-accent transition-colors duration-200 hover:pl-1 block"
                    style={{ transition: 'color 0.2s, padding-left 0.2s' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wedding Services */}
          <div>
            <h4 className="font-cormorant text-lg font-[600] text-white mb-5 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-[1.5px] after:bg-accent pb-3">
              {settings.weddingsTitle}
            </h4>
            <ul className="space-y-2.5">
              {settings.weddingLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warmgray hover:text-accent transition-colors duration-200 hover:pl-1 block"
                    style={{ transition: 'color 0.2s, padding-left 0.2s' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="font-cormorant text-lg font-[600] text-white mb-5 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-[1.5px] after:bg-rose-brand pb-3">
              {settings.eventsTitle}
            </h4>
            <ul className="space-y-2.5">
              {settings.eventLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warmgray hover:text-accent transition-colors duration-200 hover:pl-1 block"
                    style={{ transition: 'color 0.2s, padding-left 0.2s' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            {settings.whatsappNumber && (
              <a
                href={whatsappHref(settings.whatsappNumber, "Hi, I'd like to enquire about wedding planning services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center gap-2.5 bg-green-700/20 border border-green-600/30 rounded-xl px-4 py-3 text-sm text-green-300 hover:bg-green-700/30 transition-all duration-300 group"
              >
                <FaWhatsapp className="text-lg group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-warmgray">
            <p>
              Copyright © {new Date().getFullYear()} {settings.copyrightText}
            </p>
            <div className="flex items-center gap-1">
              <span>Crafted with</span>
              <span className="text-rose-brand">♥</span>
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
