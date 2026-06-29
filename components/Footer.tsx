'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  FaFacebook, FaInstagram, FaYoutube, FaPinterest,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp,
} from 'react-icons/fa';

interface FooterSettings {
  companyName: string;
  companyDescription: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl?: string;
  pinterestUrl?: string;
  whatsappNumber?: string;
  copyrightText: string;
}

let footerCache: FooterSettings | null = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

const weddingLinks = [
  { label: 'Destination Weddings', href: '/destination-weddings' },
  { label: 'Wedding Décor', href: '/services/wedding-decor' },
  { label: 'Photography & Film', href: '/services/photography' },
  { label: 'Mehndi & Beauty', href: '/services/mehndi' },
  { label: 'Catering', href: '/services/catering' },
  { label: 'Entertainment', href: '/services/entertainment' },
];

const eventLinks = [
  { label: 'Bachelor Party', href: '/bachelor-party' },
  { label: 'Honeymoon Packages', href: '/services/honeymoon' },
  { label: 'Corporate Events', href: '/services/corporate-events' },
  { label: 'Award Nights', href: '/services/award-nights' },
  { label: 'Fashion Shows', href: '/services/fashion-shows' },
  { label: 'Conference & Expo', href: '/services/conference' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blogs' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  const [footerSettings, setFooterSettings] = useState<FooterSettings | null>(null);

  useEffect(() => {
    const fetchFooterSettings = async () => {
      const now = Date.now();
      if (footerCache && now - cacheTime < CACHE_DURATION) {
        setFooterSettings(footerCache);
        return;
      }
      try {
        const res = await fetch('/api/footer-settings');
        if (res.ok) {
          const data = await res.json();
          footerCache = data;
          cacheTime = now;
          setFooterSettings(data);
        }
      } catch {}
    };
    fetchFooterSettings();
  }, []);

  const defaultSettings: FooterSettings = {
    companyName: 'WAH Momentz',
    companyDescription:
      'India\'s premier luxury wedding planning studio. We craft bespoke celebrations that honour your love story — from intimate ceremonies to grand royal weddings.',
    logo: '/logo.svg',
    phone: '+91 97111 48175',
    email: 'hello@wahmomentz.com',
    address: 'South Delhi, New Delhi — 110048\nNCR · Mumbai · Udaipur · Jaipur',
    facebookUrl: 'https://facebook.com/wahmomentz',
    instagramUrl: 'https://instagram.com/wahmomentz',
    linkedinUrl: 'https://linkedin.com',
    youtubeUrl: 'https://youtube.com',
    pinterestUrl: 'https://pinterest.com',
    whatsappNumber: '919711148175',
    copyrightText: 'WAH Momentz. All Rights Reserved.',
  };

  const settings = footerSettings || defaultSettings;

  const socialLinks = [
    { url: settings.instagramUrl, icon: FaInstagram, label: 'Instagram' },
    { url: settings.facebookUrl, icon: FaFacebook, label: 'Facebook' },
    { url: settings.youtubeUrl, icon: FaYoutube, label: 'YouTube' },
    { url: settings.pinterestUrl, icon: FaPinterest, label: 'Pinterest' },
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
            backgroundImage: `radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)`,
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
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-warmgray text-sm leading-relaxed mb-6 max-w-xs">
              {settings.companyDescription}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a
                href={`tel:${settings.phone}`}
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
                  href={`https://wa.me/${settings.whatsappNumber}`}
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
              Weddings
            </h4>
            <ul className="space-y-2.5">
              {weddingLinks.map((link) => (
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
              Events
            </h4>
            <ul className="space-y-2.5">
              {eventLinks.map((link) => (
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
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20wedding%20planning%20services.`}
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
